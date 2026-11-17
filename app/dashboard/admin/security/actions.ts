'use server';

import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { requireAdminForAction } from '@/lib/admin/guard';
import {
  generateTotpSecret,
  generateBackupCodes,
  getTotpUri,
  verifyTotpToken,
  encryptTotpSecret,
} from '@/lib/admin/totp';
import {
  getAdminTwoFactorState,
  enableAdminTwoFactor,
  disableAdminTwoFactor,
  updateAdminBackupCodes,
  createAdminAuditLog,
  listAdminUsers,
  getAdminUserById,
  canAdminActOnTargetTier,
  revokeAllAdminSessions,
  getAdminAuditLogs,
  AdminUserRecord,
} from '@/lib/db/admin-queries';
import { isEmailAuthorizedAdmin } from '@/lib/admin/guard';
import { encrypt, decrypt } from '@/lib/auth';
import { sql } from '@/lib/db/queries';

export interface SetupTwoFactorResult {
  secret?: string;
  uri?: string;
  plaintextBackupCodes?: string[];
  setupToken?: string;
  error?: string;
}

export interface SecurityActionResult {
  success?: boolean;
  error?: string;
  plaintextBackupCodes?: string[];
}

/**
 * Step 1: Initiates 2FA enrollment.
 * Generates an uncommitted secret, setup URI, and backup codes wrapped in a short-lived token.
 */
export async function startTwoFactorEnrollmentAction(): Promise<SetupTwoFactorResult> {
  try {
    const admin = await requireAdminForAction();

    const secret = generateTotpSecret();
    const backup = generateBackupCodes(8);
    const uri = getTotpUri(admin.email, secret);

    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const setupToken = await encrypt({
      twoFactorSetup: {
        adminId: String(admin.id),
        secret,
        hashedBackupCodes: backup.hashed,
      },
      expires,
    });

    return {
      secret,
      uri,
      plaintextBackupCodes: backup.plaintext,
      setupToken,
    };
  } catch (error: any) {
    return { error: error.message || 'Failed to start 2FA enrollment' };
  }
}

/**
 * Step 2: Confirms 2FA enrollment by validating the first 6-digit TOTP code.
 * Commits the encrypted secret and hashed backup codes to admin_users.
 */
export async function confirmTwoFactorEnrollmentAction(
  setupToken: string,
  code: string
): Promise<SecurityActionResult> {
  try {
    const admin = await requireAdminForAction();
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    if (!setupToken || !code) {
      return { error: 'Verification code is required' };
    }

    let payload: any = null;
    try {
      payload = await decrypt(setupToken);
    } catch {
      return { error: 'Setup session expired. Please start over.' };
    }

    const setup = payload?.twoFactorSetup;
    if (!setup || setup.adminId !== String(admin.id) || !setup.secret) {
      return { error: 'Invalid setup session. Please start over.' };
    }

    const isValid = verifyTotpToken(code.trim(), setup.secret);
    if (!isValid) {
      return { error: 'Invalid 6-digit code. Please verify the time on your authenticator app.' };
    }

    // Encrypt secret with AES-256-GCM before saving to database
    const encryptedSecret = encryptTotpSecret(setup.secret);
    await enableAdminTwoFactor(String(admin.id), encryptedSecret, setup.hashedBackupCodes);

    await createAdminAuditLog({
      adminId: String(admin.id),
      adminEmail: admin.email,
      action: 'ADMIN_2FA_ENABLED',
      ipAddress,
      userAgent,
      metadata: { method: 'rfc6238_totp' },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to confirm 2FA enrollment' };
  }
}

/**
 * Disables 2FA for the current administrator after validating password.
 */
export async function disableTwoFactorAction(
  passwordConfirmation: string
): Promise<SecurityActionResult> {
  try {
    const admin = await requireAdminForAction();
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    if (!passwordConfirmation) {
      return { error: 'Password confirmation is required' };
    }

    const rows = await sql`
      SELECT password_hash FROM admin_users WHERE id = ${String(admin.id)} LIMIT 1;
    `;
    const hash = rows[0]?.password_hash;

    if (!hash || !(await bcrypt.compare(passwordConfirmation.trim(), hash))) {
      await createAdminAuditLog({
        adminId: String(admin.id),
        adminEmail: admin.email,
        action: 'ADMIN_2FA_DISABLE_FAILED',
        ipAddress,
        userAgent,
        metadata: { reason: 'bad_password' },
      });
      return { error: 'Incorrect password' };
    }

    await disableAdminTwoFactor(String(admin.id));

    await createAdminAuditLog({
      adminId: String(admin.id),
      adminEmail: admin.email,
      action: 'ADMIN_2FA_DISABLED',
      ipAddress,
      userAgent,
      metadata: {},
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to disable 2FA' };
  }
}

/**
 * Regenerates a fresh set of 8 single-use recovery backup codes.
 */
export async function regenerateBackupCodesAction(
  passwordConfirmation: string
): Promise<SecurityActionResult> {
  try {
    const admin = await requireAdminForAction();
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    if (!passwordConfirmation) {
      return { error: 'Password confirmation is required' };
    }

    const rows = await sql`
      SELECT password_hash FROM admin_users WHERE id = ${String(admin.id)} LIMIT 1;
    `;
    const hash = rows[0]?.password_hash;

    if (!hash || !(await bcrypt.compare(passwordConfirmation.trim(), hash))) {
      return { error: 'Incorrect password' };
    }

    const twoFactorState = await getAdminTwoFactorState(String(admin.id));
    if (!twoFactorState?.enabled) {
      return { error: 'Two-factor authentication is not enabled.' };
    }

    const backup = generateBackupCodes(8);
    await updateAdminBackupCodes(String(admin.id), backup.hashed);

    await createAdminAuditLog({
      adminId: String(admin.id),
      adminEmail: admin.email,
      action: 'ADMIN_2FA_BACKUP_CODES_REGENERATED',
      ipAddress,
      userAgent,
      metadata: { count: 8 },
    });

    return {
      success: true,
      plaintextBackupCodes: backup.plaintext,
    };
  } catch (error: any) {
    return { error: error.message || 'Failed to regenerate backup codes' };
  }
}

/**
 * Lists all registered administrators and their roles.
 * Protected by 'security:manage' permission.
 */
export async function listAdminUsersAction(): Promise<{ success: boolean; users?: AdminUserRecord[]; error?: string }> {
  try {
    await requireAdminForAction({ permission: 'security:manage' });
    const users = await listAdminUsers();
    return { success: true, users };
  } catch (error: any) {
    return { success: false, error: error.message || 'Unauthorized' };
  }
}

/**
 * Activates or deactivates an administrator with strict hierarchy boundary checks.
 * Deactivation immediately increments session_version, causing immediate session revocation.
 */
export async function toggleAdminUserActiveAction(
  targetAdminId: string,
  active: boolean
): Promise<{ success?: boolean; error?: string }> {
  try {
    const actor = await requireAdminForAction({ permission: 'security:manage' });
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    const target = await getAdminUserById(targetAdminId);
    if (!target) {
      return { error: 'Administrator not found' };
    }

    // Hierarchy boundary check: actor cannot modify equal or higher tier
    const actorTier = actor.hierarchyTier ?? 99;
    if (!canAdminActOnTargetTier(actorTier, target.hierarchy_tier)) {
      await createAdminAuditLog({
        adminId: String(actor.id),
        adminEmail: actor.email,
        action: 'ADMIN_HIERARCHY_VIOLATION_BLOCKED',
        ipAddress,
        userAgent,
        metadata: {
          targetId: target.id,
          targetTier: target.hierarchy_tier,
          actorTier,
        },
      });
      return { error: 'Hierarchy Boundary Violation: You cannot modify an administrator of equal or greater authority.' };
    }

    // Toggle active status and increment session_version for instant revocation
    await sql`
      UPDATE admin_users
      SET 
        is_active = ${active},
        session_version = session_version + 1,
        updated_at = NOW()
      WHERE id = ${targetAdminId};
    `;

    await createAdminAuditLog({
      adminId: String(actor.id),
      adminEmail: actor.email,
      action: active ? 'ADMIN_USER_ACTIVATED' : 'ADMIN_USER_DEACTIVATED',
      targetType: 'ADMIN_USER',
      targetId: target.id,
      ipAddress,
      userAgent,
      metadata: { targetEmail: target.email, newStatus: active },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update administrator status' };
  }
}

/**
 * Creates a new administrator with strict tier boundary validation.
 */
export async function createAdminUserAction(data: {
  email: string;
  password: string;
  fullName: string;
  roleSlug: string;
}): Promise<{ success?: boolean; error?: string }> {
  try {
    const actor = await requireAdminForAction({ permission: 'security:manage' });
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    const cleanEmail = (data.email || '').trim().toLowerCase();
    if (!cleanEmail || !data.password || !data.roleSlug) {
      return { error: 'All fields are required' };
    }

    if (!isEmailAuthorizedAdmin(cleanEmail)) {
      return { error: 'Email address is not in the authorized ADMIN_EMAILS environment allowlist.' };
    }

    // Role lookup
    const roleRows = await sql`
      SELECT id, hierarchy_tier FROM admin_roles WHERE slug = ${data.roleSlug} LIMIT 1;
    `;
    if (!roleRows || roleRows.length === 0) {
      return { error: 'Invalid administrative role selected' };
    }
    const role = roleRows[0];

    // Hierarchy boundary check: actor cannot create a role of equal or higher authority
    const actorTier = actor.hierarchyTier ?? 99;
    if (!canAdminActOnTargetTier(actorTier, role.hierarchy_tier)) {
      return { error: 'Cannot create an administrator with equal or greater authority than your own tier.' };
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    await sql`
      INSERT INTO admin_users (
        email,
        password_hash,
        full_name,
        role_id,
        is_active,
        two_factor_enabled
      ) VALUES (
        ${cleanEmail},
        ${passwordHash},
        ${data.fullName.trim() || null},
        ${role.id},
        true,
        false
      );
    `;

    await createAdminAuditLog({
      adminId: String(actor.id),
      adminEmail: actor.email,
      action: 'ADMIN_USER_CREATED',
      targetType: 'ADMIN_USER',
      ipAddress,
      userAgent,
      metadata: { newAdminEmail: cleanEmail, role: data.roleSlug },
    });

    return { success: true };
  } catch (error: any) {
    if (error.message?.includes('unique constraint') || error.code === '23505') {
      return { error: 'An administrator with this email already exists.' };
    }
    return { error: error.message || 'Failed to create administrator' };
  }
}

/**
 * Superadmin Panic Button:
 * Instantly revokes ALL active sessions across all administrators globally.
 * Restricted strictly to Tier 0 Superadministrators.
 */
export async function emergencyRevokeAllSessionsAction(): Promise<{ success?: boolean; affectedCount?: number; error?: string }> {
  try {
    const actor = await requireAdminForAction({ minRole: 'superadmin', minTier: 0 });
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    const { affectedCount } = await revokeAllAdminSessions();

    await createAdminAuditLog({
      adminId: String(actor.id),
      adminEmail: actor.email,
      action: 'ADMIN_EMERGENCY_GLOBAL_SESSION_REVOCATION',
      ipAddress,
      userAgent,
      metadata: { affectedCount, initiatedBy: actor.email },
    });

    return { success: true, affectedCount };
  } catch (error: any) {
    return { error: error.message || 'Unauthorized or failed to execute global session revocation' };
  }
}

/**
 * Exports immutable audit logs in CSV or JSON format with CSV injection sanitization.
 * Protected by 'audit:view' permission.
 */
export async function exportAuditLogsAction(
  format: 'csv' | 'json' = 'json',
  limit: number = 200
): Promise<{ success: boolean; data?: string; filename?: string; error?: string }> {
  try {
    const actor = await requireAdminForAction({ permission: 'audit:view' });
    const logs = await getAdminAuditLogs(limit);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `admin-audit-logs-${timestamp}.${format}`;

    if (format === 'json') {
      return {
        success: true,
        data: JSON.stringify(logs, null, 2),
        filename,
      };
    }

    // CSV format with CSV Injection formula mitigation (prepend single quote if begins with =, +, -, @)
    const sanitizeCsvCell = (val: any): string => {
      if (val === null || val === undefined) return '""';
      let str = String(val);
      if (/^[=+\-@\t\r]/.test(str)) {
        str = `'${str}`;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const headersList = ['ID', 'Timestamp', 'Action', 'Identity', 'Target Type', 'Target ID', 'IP Address', 'User Agent'];
    const rows = logs.map(l => [
      sanitizeCsvCell(l.id),
      sanitizeCsvCell(l.created_at),
      sanitizeCsvCell(l.action),
      sanitizeCsvCell(l.admin_email),
      sanitizeCsvCell(l.target_type || ''),
      sanitizeCsvCell(l.target_id || ''),
      sanitizeCsvCell(l.ip_address || ''),
      sanitizeCsvCell(l.user_agent || ''),
    ].join(','));

    const csvData = [headersList.join(','), ...rows].join('\n');

    return {
      success: true,
      data: csvData,
      filename,
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to export audit logs' };
  }
}

/**
 * Changes administrator password securely:
 * 1. Requires valid authenticated admin session
 * 2. Validates current password
 * 3. Enforces min 8 chars
 * 4. Hashes new password and updates both admin_users and users tables
 * 5. Increments session_version and re-issues active session cookie to keep admin logged in
 * 6. Emits ADMIN_PASSWORD_CHANGED audit log
 */
export async function changeAdminPasswordAction(params: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await requireAdminForAction();
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    if (!params.currentPassword || !params.newPassword || !params.confirmPassword) {
      return { success: false, error: 'All fields are required.' };
    }

    if (params.newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    if (params.newPassword !== params.confirmPassword) {
      return { success: false, error: 'New passwords do not match.' };
    }

    // 1. Fetch current hash from admin_users or users
    let hash: string | null = null;
    const adminRows = await sql`
      SELECT password_hash FROM admin_users WHERE id = ${String(admin.id)} LIMIT 1;
    `;
    if (adminRows[0]?.password_hash) {
      hash = adminRows[0].password_hash;
    } else {
      const userRows = await sql`
        SELECT password FROM users WHERE LOWER(email) = ${admin.email.toLowerCase()} LIMIT 1;
      `;
      hash = userRows[0]?.password;
    }

    if (!hash || !(await bcrypt.compare(params.currentPassword.trim(), hash))) {
      await createAdminAuditLog({
        adminId: String(admin.id),
        adminEmail: admin.email,
        action: 'ADMIN_PASSWORD_CHANGE_FAILED',
        ipAddress,
        userAgent,
        metadata: { reason: 'bad_current_password' },
      });
      return { success: false, error: 'Current password is incorrect.' };
    }

    // 2. Hash new password
    const newHash = await bcrypt.hash(params.newPassword.trim(), 12);

    // 3. Update admin_users
    const nextSessionVersion = (admin.sessionVersion || 1) + 1;
    await sql`
      UPDATE admin_users 
      SET password_hash = ${newHash}, 
          session_version = ${nextSessionVersion}, 
          updated_at = NOW() 
      WHERE id = ${String(admin.id)} OR LOWER(email) = ${admin.email.toLowerCase()};
    `;

    // 4. Update users table
    await sql`
      UPDATE users 
      SET password = ${newHash} 
      WHERE LOWER(email) = ${admin.email.toLowerCase()};
    `;

    // 5. Update session cookie with new sessionVersion
    const { cookies } = await import('next/headers');
    const { SESSION_COOKIE_NAME } = await import('@/lib/admin/guard');
    const { SESSION_COOKIE_OPTIONS } = await import('@/lib/auth');

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const newSessionToken = await encrypt({
      user: {
        id: admin.id,
        email: admin.email,
        role: 'admin',
        name: admin.name,
        roleSlug: admin.roleSlug || 'superadmin',
        hierarchyTier: admin.hierarchyTier ?? 0,
        sessionVersion: nextSessionVersion,
      },
      expires,
    });

    (await cookies()).set(SESSION_COOKIE_NAME, newSessionToken, {
      expires,
      ...SESSION_COOKIE_OPTIONS,
    });

    // 6. Audit log
    await createAdminAuditLog({
      adminId: String(admin.id),
      adminEmail: admin.email,
      action: 'ADMIN_PASSWORD_CHANGED',
      ipAddress,
      userAgent,
      metadata: { role: admin.roleSlug },
    });

    return { success: true };
  } catch (error: any) {
    console.error('[ChangePassword] Error:', error);
    return { success: false, error: error.message || 'Failed to update password.' };
  }
}


