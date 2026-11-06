import { sql } from './queries';

export interface AdminRole {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  hierarchy_tier: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  full_name: string | null;
  role_id: string;
  role_slug: string;
  role_name: string;
  hierarchy_tier: number;
  is_active: boolean;
  two_factor_enabled: boolean;
  session_version: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLogEntry {
  id: number;
  admin_id: string | null;
  admin_email: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

/**
 * Loads an admin user and their assigned role by email.
 * Never returns password hashes or 2FA secrets.
 */
export async function getAdminUserByEmail(email: string): Promise<AdminUserRecord | null> {
  const normalized = email.toLowerCase().trim();
  const rows = await sql`
    SELECT 
      u.id,
      u.email,
      u.full_name,
      u.role_id,
      r.slug AS role_slug,
      r.name AS role_name,
      r.hierarchy_tier,
      u.is_active,
      u.two_factor_enabled,
      u.session_version,
      u.last_login_at,
      u.created_at,
      u.updated_at
    FROM admin_users u
    JOIN admin_roles r ON u.role_id = r.id
    WHERE LOWER(u.email) = ${normalized}
    LIMIT 1;
  `;
  return rows[0] || null;
}

/**
 * Loads an admin user by ID for real-time session verification.
 */
export async function getAdminUserById(id: string): Promise<AdminUserRecord | null> {
  const rows = await sql`
    SELECT 
      u.id,
      u.email,
      u.full_name,
      u.role_id,
      r.slug AS role_slug,
      r.name AS role_name,
      r.hierarchy_tier,
      u.is_active,
      u.two_factor_enabled,
      u.session_version,
      u.last_login_at,
      u.created_at,
      u.updated_at
    FROM admin_users u
    JOIN admin_roles r ON u.role_id = r.id
    WHERE u.id = ${id}
    LIMIT 1;
  `;
  return rows[0] || null;
}

/**
 * Verifies that an admin user exists, is active, and the session version matches.
 * Used by requireAdmin() to enforce immediate session revocation.
 */
export async function verifyAdminSessionActive(
  adminId: string,
  sessionVersion?: number
): Promise<{ valid: boolean; user?: AdminUserRecord; reason?: string }> {
  try {
    const admin = await getAdminUserById(adminId);
    if (!admin) {
      return { valid: false, reason: 'Admin user not found' };
    }
    if (!admin.is_active) {
      return { valid: false, reason: 'Admin account is deactivated' };
    }
    if (sessionVersion !== undefined && admin.session_version !== sessionVersion) {
      return { valid: false, reason: 'Session has been revoked' };
    }
    return { valid: true, user: admin };
  } catch (error) {
    console.error('Error verifying admin session in DB:', error);
    return { valid: false, reason: 'Database error' };
  }
}

/**
 * Writes an immutable security audit entry into admin_audit_logs.
 * Never stores passwords, tokens, or credentials in metadata.
 */
export async function createAdminAuditLog(entry: {
  adminId?: string | null;
  adminEmail: string;
  action: string;
  targetType?: string | null;
  targetId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, any> | null;
}): Promise<void> {
  try {
    const metaJson = entry.metadata ? JSON.stringify(entry.metadata) : null;
    await sql`
      INSERT INTO admin_audit_logs (
        admin_id,
        admin_email,
        action,
        target_type,
        target_id,
        ip_address,
        user_agent,
        metadata
      ) VALUES (
        ${entry.adminId || null},
        ${entry.adminEmail},
        ${entry.action},
        ${entry.targetType || null},
        ${entry.targetId || null},
        ${entry.ipAddress || null},
        ${entry.userAgent || null},
        ${metaJson}
      );
    `;
  } catch (error) {
    console.error('Failed to write admin audit log:', error);
  }
}

/**
 * Retrieves audit logs for the security and central command view.
 */
export async function getAdminAuditLogs(limit: number = 50): Promise<AdminAuditLogEntry[]> {
  const safeLimit = Math.min(Math.max(1, limit), 200);
  const rows = await sql`
    SELECT 
      id,
      admin_id,
      admin_email,
      action,
      target_type,
      target_id,
      ip_address,
      user_agent,
      metadata,
      created_at
    FROM admin_audit_logs
    ORDER BY created_at DESC
    LIMIT ${safeLimit};
  `;
  return rows || [];
}
