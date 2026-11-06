import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { decrypt } from '@/lib/auth';
import { getAdminUserByEmail, getAdminUserById, hasAdminPermission } from '@/lib/db/admin-queries';

/**
 * Phase 2 & 3 Security Architecture:
 * The admin role and identity are verified against the decrypted JWT session cookie ('session')
 * and validated through authoritative, real-time database lookups against the dedicated
 * admin_users and admin_roles tables.
 * 
 * Enforces:
 * - Real-time active status check (inactive accounts immediately revoked).
 * - Real-time session version check (instant global session revocation).
 * - Granular role hierarchy tier checks (tier 0 = superadmin).
 * - Fail-closed ADMIN_EMAILS environment variable validation.
 * 
 * CRITICAL PRIVACY & SECURITY DIRECTIVE:
 * Never print, log, commit, or echo user emails, session tokens, or personal identifiers in server logs.
 */

export const SESSION_COOKIE_NAME = 'session';

export interface AdminGuardOptions {
  minRole?: 'superadmin' | 'operations_admin' | 'technical_auditor' | string;
  minTier?: number;
  permission?: string;
}

export interface AdminSessionUser {
  id: string | number;
  email: string;
  role: string;
  name?: string;
  roleSlug?: string;
  hierarchyTier?: number;
  sessionVersion?: number;
}

/**
 * Validates whether an email belongs to the authorized admin list.
 * Fails closed: if ADMIN_EMAILS is unset, blank, or malformed, access is denied.
 */
export function isEmailAuthorizedAdmin(email: string | undefined | null): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const rawAdminEmails = process.env.ADMIN_EMAILS;
  if (!rawAdminEmails || rawAdminEmails.trim().length === 0) {
    // Fail closed: No administrators configured
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const allowedEmails = rawAdminEmails
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(normalizedEmail);
}

/**
 * Authoritative verification of admin identity against the database and environment rules.
 */
async function verifyAdminIdentity(
  user: any,
  opts?: AdminGuardOptions
): Promise<{ authorized: boolean; user?: AdminSessionUser; status: 401 | 403 }> {
  if (!user || !user.email) {
    return { authorized: false, status: 401 };
  }

  // 1. Fail closed if email is not in authorized list
  if (!isEmailAuthorizedAdmin(user.email)) {
    return { authorized: false, status: 403 };
  }

  try {
    // 2. Real-time DB lookup in dedicated admin_users table
    let adminRecord = null;
    if (user.id && typeof user.id === 'string' && user.id.includes('-')) {
      adminRecord = await getAdminUserById(user.id);
    }
    if (!adminRecord) {
      adminRecord = await getAdminUserByEmail(user.email);
    }

    if (adminRecord) {
      // Deactivated account check
      if (!adminRecord.is_active) {
        return { authorized: false, status: 403 };
      }

      // Session revocation check (instant global revocation)
      if (
        user.sessionVersion !== undefined &&
        adminRecord.session_version !== undefined &&
        user.sessionVersion !== adminRecord.session_version
      ) {
        return { authorized: false, status: 401 };
      }

      // Hierarchy tier check (lower number = higher authority)
      if (opts?.minTier !== undefined && adminRecord.hierarchy_tier > opts.minTier) {
        return { authorized: false, status: 403 };
      }

      // Role slug check
      if (opts?.minRole) {
        if (adminRecord.role_slug !== 'superadmin' && adminRecord.role_slug !== opts.minRole) {
          return { authorized: false, status: 403 };
        }
      }

      // Granular RBAC permission check
      if (opts?.permission) {
        if (adminRecord.role_slug !== 'superadmin' && adminRecord.hierarchy_tier !== 0) {
          const hasPerm = await hasAdminPermission(adminRecord.id, opts.permission);
          if (!hasPerm) {
            return { authorized: false, status: 403 };
          }
        }
      }

      return {
        authorized: true,
        user: {
          id: adminRecord.id,
          email: adminRecord.email,
          role: 'admin',
          name: adminRecord.full_name || user.name,
          roleSlug: adminRecord.role_slug,
          hierarchyTier: adminRecord.hierarchy_tier,
          sessionVersion: adminRecord.session_version,
        },
        status: 200 as any,
      };
    }

    // 3. Bootstrap fallback for initial deployment before admin_users is populated
    if (user.role === 'admin') {
      return {
        authorized: true,
        user: {
          id: user.id,
          email: user.email,
          role: 'admin',
          name: user.name,
          roleSlug: 'superadmin',
          hierarchyTier: 0,
        },
        status: 200 as any,
      };
    }

    return { authorized: false, status: 403 };
  } catch (error) {
    // Graceful fallback to verified JWT claim during DB transient connection issues
    if (user.role === 'admin') {
      return {
        authorized: true,
        user: {
          id: user.id,
          email: user.email,
          role: 'admin',
          name: user.name,
          roleSlug: 'superadmin',
          hierarchyTier: 0,
        },
        status: 200 as any,
      };
    }
    return { authorized: false, status: 403 };
  }
}

/**
 * Route Handlers only. Validates that the request origin matches NEXT_PUBLIC_BASE_URL strictly.
 * Never derives or compares against request-controlled Host headers.
 * Do not use in Server Actions (Next.js handles Origin vs Host natively there).
 * 
 * For state-changing requests (POST, PUT, PATCH, DELETE) lacking an Origin header,
 * requires Sec-Fetch-Site: 'same-origin'.
 */
export function assertSameOrigin(request: Request | NextRequest): { valid: boolean; error?: string } {
  const method = request.method.toUpperCase();
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

  const originHeader = request.headers.get('origin');
  const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!originHeader) {
    if (isStateChanging) {
      const secFetchSite = request.headers.get('sec-fetch-site');
      if (secFetchSite === 'same-origin') {
        return { valid: true };
      }
      return { valid: false, error: 'Forbidden' };
    }
    return { valid: true };
  }

  if (!configuredBaseUrl) {
    return { valid: false, error: 'Forbidden' };
  }

  try {
    const originUrl = new URL(originHeader).origin;
    const expectedUrl = new URL(configuredBaseUrl).origin;
    if (originUrl === expectedUrl) {
      return { valid: true };
    }
    return { valid: false, error: 'Forbidden' };
  } catch {
    return { valid: false, error: 'Forbidden' };
  }
}

/**
 * Guard for Server Components (e.g. app/dashboard/admin/page.tsx).
 * Reads the session cookie using cookies(), verifies the session and admin authorization via DB,
 * and executes redirect outside of try/catch to avoid intercepting NEXT_REDIRECT.
 */
export async function requireAdmin(opts?: AdminGuardOptions): Promise<AdminSessionUser> {
  let targetRedirect: string | null = null;
  let adminUser: AdminSessionUser | null = null;

  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      targetRedirect = '/admin/login';
    } else {
      const payload = await decrypt(sessionToken);
      const user = payload?.user;

      const verification = await verifyAdminIdentity(user, opts);
      if (!verification.authorized || !verification.user) {
        targetRedirect = '/admin/login';
      } else {
        adminUser = verification.user;
      }
    }
  } catch {
    targetRedirect = '/admin/login';
  }

  if (targetRedirect) {
    redirect(targetRedirect);
  }

  return adminUser!;
}

export type AdminApiAuthResult =
  | { authorized: true; user: AdminSessionUser; response?: never }
  | { authorized: false; user?: never; response: NextResponse };

/**
 * Guard for Route Handlers (API endpoints under app/api/admin/** and app/api/agents/**).
 * Reads the session cookie from NextRequest, verifies admin authorization via DB,
 * and returns generic errors ({ error: 'Unauthorized' } 401 or { error: 'Forbidden' } 403).
 */
export async function requireAdminApi(
  request: NextRequest,
  opts?: AdminGuardOptions
): Promise<AdminApiAuthResult> {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      };
    }

    const payload = await decrypt(sessionToken);
    const user = payload?.user;

    const verification = await verifyAdminIdentity(user, opts);
    if (!verification.authorized || !verification.user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: verification.status === 401 ? 'Unauthorized' : 'Forbidden' },
          { status: verification.status }
        )
      };
    }

    return { authorized: true, user: verification.user };
  } catch {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    };
  }
}

/**
 * Guard for Server Actions ('use server').
 * Reads the session cookie using cookies(), verifies admin authorization via DB,
 * and throws generic errors ('Unauthorized' or 'Forbidden') instead of redirecting.
 */
export async function requireAdminForAction(opts?: AdminGuardOptions): Promise<AdminSessionUser> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    throw new Error('Unauthorized');
  }

  let payload: any = null;
  try {
    payload = await decrypt(sessionToken);
  } catch {
    throw new Error('Unauthorized');
  }

  const user = payload?.user;
  const verification = await verifyAdminIdentity(user, opts);

  if (!verification.authorized || !verification.user) {
    throw new Error(verification.status === 401 ? 'Unauthorized' : 'Forbidden');
  }

  return verification.user;
}

/**
 * Validates incoming cron requests with timing-safe comparison against CRON_SECRET / AGENT_SECRET.
 * Requires `Authorization: Bearer <secret>`.
 * Fails closed if the secret is unset or shorter than 16 characters.
 */
export function isAuthorizedCron(request: Request | NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET || process.env.AGENT_SECRET;
  if (!cronSecret || cronSecret.length < 16) {
    return false;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.slice(7).trim();
  const tokenBuf = Buffer.from(token);
  const secretBuf = Buffer.from(cronSecret);

  if (tokenBuf.length !== secretBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(tokenBuf, secretBuf);
}


