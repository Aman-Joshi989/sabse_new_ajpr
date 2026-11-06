import { sql } from './queries';
import { decryptTotpSecret } from '@/lib/admin/totp';

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
 * Loads all admin users and their assigned roles.
 * Never returns password hashes or 2FA secrets.
 */
export async function listAdminUsers(): Promise<AdminUserRecord[]> {
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
    ORDER BY r.hierarchy_tier ASC, u.created_at ASC;
  `;
  return rows || [];
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
 * Retrieves the list of permission slugs granted to an admin user.
 * Superadmin (tier 0) returns wildcard ['*'] which satisfies any permission.
 */
export async function getAdminPermissions(adminId: string): Promise<string[]> {
  try {
    const admin = await getAdminUserById(adminId);
    if (!admin) return [];

    // Superadmin has absolute authority over all actions
    if (admin.role_slug === 'superadmin' || admin.hierarchy_tier === 0) {
      return ['*'];
    }

    const rows = await sql`
      SELECT p.slug
      FROM admin_role_permissions rp
      JOIN admin_permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = ${admin.role_id};
    `;

    return (rows || []).map((r: any) => r.slug);
  } catch {
    return [];
  }
}

/**
 * Checks whether an admin possesses a specific permission.
 */
export async function hasAdminPermission(
  adminId: string,
  permissionSlug: string
): Promise<boolean> {
  const permissions = await getAdminPermissions(adminId);
  return permissions.includes('*') || permissions.includes(permissionSlug);
}

/**
 * Validates strict hierarchy boundary:
 * An administrator can only act upon (modify, promote, deactivate) a target
 * if their hierarchy tier is strictly higher in authority (lower number).
 * Tier 0 (superadmin) can act on tiers 1+, but tier 1 cannot act on tier 0 or tier 1.
 */
export function canAdminActOnTargetTier(actorTier: number, targetTier: number): boolean {
  return actorTier < targetTier;
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

/**
 * Retrieves the 2FA configuration for an admin.
 * Securely decrypts the stored TOTP secret.
 */
export async function getAdminTwoFactorState(adminId: string): Promise<{
  enabled: boolean;
  decryptedSecret: string | null;
  backupCodes: string[];
} | null> {
  const rows = await sql`
    SELECT two_factor_enabled, two_factor_secret, two_factor_backup_codes
    FROM admin_users
    WHERE id = ${adminId}
    LIMIT 1;
  `;
  if (!rows || rows.length === 0) return null;
  const row = rows[0];

  let decryptedSecret: string | null = null;
  if (row.two_factor_secret) {
    try {
      decryptedSecret = decryptTotpSecret(row.two_factor_secret);
    } catch {
      decryptedSecret = null;
    }
  }

  let backupCodes: string[] = [];
  if (Array.isArray(row.two_factor_backup_codes)) {
    backupCodes = row.two_factor_backup_codes;
  } else if (typeof row.two_factor_backup_codes === 'string') {
    try {
      backupCodes = JSON.parse(row.two_factor_backup_codes);
    } catch {
      backupCodes = [];
    }
  }

  return {
    enabled: Boolean(row.two_factor_enabled),
    decryptedSecret,
    backupCodes,
  };
}

/**
 * Enables 2FA for an admin after initial verification.
 * Stores AES-256 encrypted secret and hashed backup codes.
 */
export async function enableAdminTwoFactor(
  adminId: string,
  encryptedSecret: string,
  hashedBackupCodes: string[]
): Promise<boolean> {
  const backupJson = JSON.stringify(hashedBackupCodes);
  await sql`
    UPDATE admin_users
    SET 
      two_factor_enabled = true,
      two_factor_secret = ${encryptedSecret},
      two_factor_backup_codes = ${backupJson}::jsonb,
      updated_at = NOW()
    WHERE id = ${adminId};
  `;
  return true;
}

/**
 * Disables 2FA for an admin user and clears secrets.
 */
export async function disableAdminTwoFactor(adminId: string): Promise<boolean> {
  await sql`
    UPDATE admin_users
    SET 
      two_factor_enabled = false,
      two_factor_secret = NULL,
      two_factor_backup_codes = '[]'::jsonb,
      updated_at = NOW()
    WHERE id = ${adminId};
  `;
  return true;
}

/**
 * Updates remaining hashed backup codes after a code has been consumed.
 */
export async function updateAdminBackupCodes(
  adminId: string,
  remainingHashes: string[]
): Promise<boolean> {
  const backupJson = JSON.stringify(remainingHashes);
  await sql`
    UPDATE admin_users
    SET 
      two_factor_backup_codes = ${backupJson}::jsonb,
      updated_at = NOW()
    WHERE id = ${adminId};
  `;
  return true;
}

