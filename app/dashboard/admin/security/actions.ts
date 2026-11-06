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
} from '@/lib/db/admin-queries';
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
