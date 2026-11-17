'use server';

import { requestPasswordReset } from '@/lib/auth/password-reset';

export interface ForgotPasswordState {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function requestPasswordResetAction(
  prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  try {
    const email = (formData.get('email') as string || '').trim();

    if (!email || !email.includes('@')) {
      return { error: 'Please enter a valid email address.' };
    }

    const result = await requestPasswordReset(email);
    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    console.error('[ForgotPasswordAction] Error:', error);
    return {
      error: 'An unexpected error occurred while processing your request. Please try again.',
    };
  }
}
