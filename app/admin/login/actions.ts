'use server';

import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt, SESSION_COOKIE_OPTIONS } from '@/lib/auth';
import { isEmailAuthorizedAdmin, SESSION_COOKIE_NAME } from '@/lib/admin/guard';
import { getAdminUserByEmail, createAdminAuditLog } from '@/lib/db/admin-queries';
import { sql } from '@/lib/db/queries';

export interface AdminLoginState {
  error?: string;
  success?: boolean;
}

// In-memory sliding window rate limiter for failed admin login attempts
interface RateLimitRecord {
  attempts: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lock

function checkRateLimit(ip: string): { blocked: boolean; remainingMs?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { blocked: false };
  }

  // Check active block
  if (record.blockedUntil && record.blockedUntil > now) {
    return { blocked: true, remainingMs: record.blockedUntil - now };
  }

  // Check window expiry
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(ip);
    return { blocked: false };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    return { blocked: true, remainingMs: BLOCK_DURATION_MS };
  }

  return { blocked: false };
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || (now - record.firstAttempt > WINDOW_MS)) {
    loginAttempts.set(ip, { attempts: 1, firstAttempt: now });
  } else {
    record.attempts += 1;
    if (record.attempts >= MAX_ATTEMPTS) {
      record.blockedUntil = now + BLOCK_DURATION_MS;
    }
  }
}

function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export async function adminLoginAction(
  prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  let targetRedirect: string | null = null;

  try {
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    // 0. Rate limiting enforcement
    const rateCheck = checkRateLimit(ipAddress);
    if (rateCheck.blocked) {
      await createAdminAuditLog({
        adminEmail: 'rate_limit_exceeded',
        action: 'ADMIN_LOGIN_RATE_LIMITED',
        ipAddress,
        userAgent,
        metadata: { blockedMs: rateCheck.remainingMs },
      });
      return { error: 'Too many authentication attempts. Access locked for 15 minutes.' };
    }

    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = (formData.get('password') as string || '').trim();

    if (!email || !password) {
      recordFailedAttempt(ipAddress);
      return { error: 'Invalid credentials' };
    }

    // Fail closed if email is not an authorized administrator
    if (!isEmailAuthorizedAdmin(email)) {
      recordFailedAttempt(ipAddress);
      await createAdminAuditLog({
        adminEmail: email,
        action: 'ADMIN_LOGIN_REJECTED',
        ipAddress,
        userAgent,
        metadata: { reason: 'unauthorized_email' },
      });
      return { error: 'Invalid credentials' };
    }

    const admin = await getAdminUserByEmail(email);

    if (!admin) {
      // Transitional bootstrap mode: If admin_users has not been populated with this admin yet,
      // allow fallback authentication if password matches the primary admin credential
      const fallbackHash = process.env.ADMIN_BOOTSTRAP_PASSWORD_HASH;
      if (fallbackHash && (await bcrypt.compare(password, fallbackHash))) {
        clearAttempts(ipAddress);
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const sessionToken = await encrypt({
          user: {
            id: 'bootstrap-owner',
            email,
            role: 'admin',
            roleSlug: 'superadmin',
            hierarchyTier: 0,
            sessionVersion: 1,
          },
          expires,
        });

        (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
          expires,
          ...SESSION_COOKIE_OPTIONS,
        });

        await createAdminAuditLog({
          adminEmail: email,
          action: 'ADMIN_BOOTSTRAP_LOGIN_SUCCESS',
          ipAddress,
          userAgent,
          metadata: { mode: 'bootstrap' },
        });

        targetRedirect = '/dashboard/admin';
      } else {
        recordFailedAttempt(ipAddress);
        await createAdminAuditLog({
          adminEmail: email,
          action: 'ADMIN_LOGIN_FAILED',
          ipAddress,
          userAgent,
          metadata: { reason: 'user_not_found' },
        });
        return { error: 'Invalid credentials' };
      }
    } else {
      if (!admin.is_active) {
        recordFailedAttempt(ipAddress);
        await createAdminAuditLog({
          adminId: admin.id,
          adminEmail: admin.email,
          action: 'ADMIN_LOGIN_BLOCKED_INACTIVE',
          ipAddress,
          userAgent,
          metadata: { reason: 'account_inactive' },
        });
        return { error: 'Invalid credentials' };
      }

      // Fetch password hash securely
      const rows = await sql`
        SELECT password_hash FROM admin_users WHERE id = ${admin.id} LIMIT 1;
      `;
      const hash = rows[0]?.password_hash;

      if (!hash || !(await bcrypt.compare(password, hash))) {
        recordFailedAttempt(ipAddress);
        await createAdminAuditLog({
          adminId: admin.id,
          adminEmail: admin.email,
          action: 'ADMIN_LOGIN_FAILED',
          ipAddress,
          userAgent,
          metadata: { reason: 'bad_password' },
        });
        return { error: 'Invalid credentials' };
      }

      // Successful password verification: clear rate limit tracker
      clearAttempts(ipAddress);

      // Update last login timestamp
      await sql`
        UPDATE admin_users 
        SET last_login_at = NOW(), updated_at = NOW() 
        WHERE id = ${admin.id};
      `;

      // Log success
      await createAdminAuditLog({
        adminId: admin.id,
        adminEmail: admin.email,
        action: 'ADMIN_LOGIN_SUCCESS',
        ipAddress,
        userAgent,
        metadata: { role: admin.role_slug, tier: admin.hierarchy_tier },
      });

      // Issue 24h JWT session with session_version tracking
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const sessionToken = await encrypt({
        user: {
          id: admin.id,
          email: admin.email,
          role: 'admin',
          name: admin.full_name || undefined,
          roleSlug: admin.role_slug,
          hierarchyTier: admin.hierarchy_tier,
          sessionVersion: admin.session_version,
        },
        expires,
      });

      (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
        expires,
        ...SESSION_COOKIE_OPTIONS,
      });

      targetRedirect = '/dashboard/admin';
    }
  } catch (error) {
    return { error: 'An unexpected error occurred during authentication' };
  }

  if (targetRedirect) {
    redirect(targetRedirect);
  }

  return { success: true };
}
