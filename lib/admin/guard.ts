import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { decrypt } from '@/lib/auth';

/**
 * Phase 1 Security Architecture Notice:
 * The admin role and identity are verified against the decrypted JWT session cookie ('session')
 * and validated against the fail-closed ADMIN_EMAILS environment variable.
 * 
 * Note: Session claims are cached in the JWT and remain valid until token expiry (24h).
 * In Phase 2, this will be upgraded to an authoritative, real-time database lookup against
 * the dedicated admin_users and admin_roles tables.
 * 
 * CRITICAL PRIVACY & SECURITY DIRECTIVE:
 * Never print, log, commit, or echo user emails, session tokens, or personal identifiers in server logs.
 */

export const SESSION_COOKIE_NAME = 'session';

export interface AdminSessionUser {
  id: string | number;
  email: string;
  role: string;
  name?: string;
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
 * Reads the session cookie using cookies(), verifies the session and admin authorization,
 * and executes redirect outside of try/catch to avoid intercepting NEXT_REDIRECT.
 */
export async function requireAdmin(): Promise<AdminSessionUser> {
  let targetRedirect: string | null = null;
  let adminUser: AdminSessionUser | null = null;

  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      targetRedirect = '/login';
    } else {
      const payload = await decrypt(sessionToken);
      const user = payload?.user;

      if (!user || user.role !== 'admin' || !isEmailAuthorizedAdmin(user.email)) {
        targetRedirect = '/login';
      } else {
        adminUser = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      }
    }
  } catch {
    targetRedirect = '/login';
  }

  if (targetRedirect) {
    redirect(targetRedirect);
  }

  return adminUser!;
}

/**
 * Guard for Route Handlers (API endpoints under app/api/admin/** and app/api/agents/**).
 * Reads the session cookie from NextRequest, verifies admin authorization,
 * and returns generic errors ({ error: 'Unauthorized' } 401 or { error: 'Forbidden' } 403).
 */
export async function requireAdminApi(
  request: NextRequest
): Promise<{ user: AdminSessionUser; response?: never } | { user?: never; response: NextResponse }> {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return {
        response: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      };
    }

    const payload = await decrypt(sessionToken);
    const user = payload?.user;

    if (!user) {
      return {
        response: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      };
    }

    if (user.role !== 'admin' || !isEmailAuthorizedAdmin(user.email)) {
      return {
        response: NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        )
      };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    };
  } catch {
    return {
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    };
  }
}

/**
 * Guard for Server Actions ('use server').
 * Reads the session cookie using cookies(), verifies admin authorization,
 * and throws generic errors ('Unauthorized' or 'Forbidden') instead of redirecting.
 */
export async function requireAdminForAction(): Promise<AdminSessionUser> {
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
  if (!user) {
    throw new Error('Unauthorized');
  }

  if (user.role !== 'admin' || !isEmailAuthorizedAdmin(user.email)) {
    throw new Error('Forbidden');
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
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

