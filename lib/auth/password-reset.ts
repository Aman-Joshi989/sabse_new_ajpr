import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db/queries';
import { sendPasswordResetEmail } from '@/lib/email/contact-mailer';

/**
 * Ensures password_reset_tokens table exists with correct indices
 */
export async function ensureResetTokensTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_tokens(token);
      CREATE INDEX IF NOT EXISTS idx_password_reset_email ON password_reset_tokens(email);
    `;
  } catch (err) {
    console.error('[PasswordReset] Failed to ensure table exists:', err);
  }
}

/**
 * Initiates the password reset flow:
 * Generates a high-entropy 64-char crypto token, stores it in DB with 1h expiry,
 * and delivers a branded password reset email.
 */
export async function requestPasswordReset(rawEmail: string): Promise<{ success: boolean; message: string }> {
  if (!rawEmail || typeof rawEmail !== 'string') {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const email = rawEmail.trim().toLowerCase();
  await ensureResetTokensTable();

  // Check account existence in users or admin_users
  const userRows = await sql`
    SELECT id, email, name FROM users WHERE LOWER(email) = ${email} LIMIT 1;
  `;
  const adminRows = await sql`
    SELECT id, email, full_name as name FROM admin_users WHERE LOWER(email) = ${email} LIMIT 1;
  `;

  const account = userRows[0] || adminRows[0];

  // For security against email enumeration, always return positive response even if account not found
  if (!account) {
    console.log(`[PasswordReset] Request for non-existent email: ${email} (fail-soft response)`);
    return {
      success: true,
      message: 'If an account exists with this email address, you will receive a secure password reset link shortly.',
    };
  }

  // Invalidate any older unused tokens for this email
  await sql`
    UPDATE password_reset_tokens 
    SET used = true 
    WHERE LOWER(email) = ${email} AND used = false;
  `;

  // Generate 64-character crypto token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await sql`
    INSERT INTO password_reset_tokens (email, token, expires_at, used)
    VALUES (${email}, ${token}, ${expiresAt.toISOString()}, false);
  `;

  // Construct reset URL
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ajprworld.com').replace(/\/+$/, '');
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  // Send branded email
  try {
    const emailResult = await sendPasswordResetEmail({
      to: email,
      name: account.name || 'User',
      resetUrl,
      expiresInMinutes: 60,
    });

    console.log(`[PasswordReset] Reset email dispatched for ${email}. Result:`, emailResult);
  } catch (emailErr) {
    console.error(`[PasswordReset] Failed to dispatch reset email for ${email}:`, emailErr);
  }

  return {
    success: true,
    message: 'If an account exists with this email address, you will receive a secure password reset link shortly.',
  };
}

/**
 * Validates whether a token is valid, unexpired, and unused.
 */
export async function validateResetToken(token: string): Promise<{
  valid: boolean;
  email?: string;
  error?: string;
}> {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Invalid or missing password reset token.' };
  }

  await ensureResetTokensTable();

  const rows = await sql`
    SELECT id, email, expires_at, used
    FROM password_reset_tokens
    WHERE token = ${token.trim()}
    LIMIT 1;
  `;

  const tokenRecord = rows[0];

  if (!tokenRecord) {
    return { valid: false, error: 'Password reset link is invalid or has expired.' };
  }

  if (tokenRecord.used) {
    return { valid: false, error: 'This password reset link has already been used. Please request a new one.' };
  }

  const expiresAt = new Date(tokenRecord.expires_at).getTime();
  if (Date.now() > expiresAt) {
    return { valid: false, error: 'This password reset link has expired. Please request a fresh reset link.' };
  }

  return {
    valid: true,
    email: tokenRecord.email,
  };
}

/**
 * Applies a new password using a verified token.
 * Updates both users and admin_users (if exists), bumps session_version to revoke old sessions,
 * and invalidates the token.
 */
export async function resetPasswordWithToken(
  token: string,
  newPasswordPlain: string
): Promise<{ success: boolean; error?: string }> {
  const validation = await validateResetToken(token);
  if (!validation.valid || !validation.email) {
    return { success: false, error: validation.error || 'Invalid reset token.' };
  }

  if (!newPasswordPlain || newPasswordPlain.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const email = validation.email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(newPasswordPlain, 10);

  // 1. Update users table if user exists
  await sql`
    UPDATE users 
    SET password = ${passwordHash} 
    WHERE LOWER(email) = ${email};
  `;

  // 2. Update admin_users table if user exists (and bump session_version to revoke all previous active sessions)
  await sql`
    UPDATE admin_users 
    SET password_hash = ${passwordHash}, 
        session_version = session_version + 1, 
        updated_at = NOW() 
    WHERE LOWER(email) = ${email};
  `;

  // 3. Mark token as consumed
  await sql`
    UPDATE password_reset_tokens 
    SET used = true 
    WHERE token = ${token.trim()};
  `;

  console.log(`[PasswordReset] Password reset successfully executed for ${email}.`);
  return { success: true };
}
