'use server';

import { resetPasswordWithToken, validateResetToken } from '@/lib/auth/password-reset';

export interface ResetPasswordState {
  error?: string;
  success?: boolean;
}

export async function checkTokenValidAction(token: string) {
  try {
    return await validateResetToken(token);
  } catch (error: any) {
    return { valid: false, error: 'Failed to validate reset token.' };
  }
}

export async function resetPasswordAction(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  try {
    const token = (formData.get('token') as string || '').trim();
    const password = (formData.get('password') as string || '').trim();
    const confirmPassword = (formData.get('confirmPassword') as string || '').trim();

    if (!token) {
      return { error: 'Reset token is missing or invalid.' };
    }

    if (!password) {
      return { error: 'Please enter a new password.' };
    }

    if (password.length < 8) {
      return { error: 'Password must be at least 8 characters long.' };
    }

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match. Please ensure both fields are identical.' };
    }

    const result = await resetPasswordWithToken(token, password);

    if (!result.success) {
      return { error: result.error || 'Failed to reset password.' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('[ResetPasswordAction] Error:', error);
    return {
      error: 'An unexpected error occurred while resetting your password. Please try again.',
    };
  }
}
