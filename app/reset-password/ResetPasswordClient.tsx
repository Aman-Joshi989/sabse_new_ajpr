'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { resetPasswordAction, checkTokenValidAction, ResetPasswordState } from './actions';

const initialState: ResetPasswordState = {};

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenError, setTokenError] = useState<string>('');
  const [associatedEmail, setAssociatedEmail] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      setTokenValid(false);
      setTokenError('Missing password reset token. Please check the link in your email.');
      return;
    }

    let isMounted = true;
    checkTokenValidAction(token).then((res) => {
      if (!isMounted) return;
      setIsValidating(false);
      if (res.valid) {
        setTokenValid(true);
        if (res.email) setAssociatedEmail(res.email);
      } else {
        setTokenValid(false);
        setTokenError(res.error || 'This password reset link is invalid or has expired.');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Client-side criteria checks
  const hasMinLength = password.length >= 8;
  const hasSpecialOrNumber = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Link href="/" className="relative w-36 h-12 mb-2 hover:scale-[1.02] transition-transform block">
            <Image
              src="/logo/ajpr-logo.png"
              alt="AJPR World"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-400 text-xs font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-xs">key</span>
            Set New Password
          </div>

          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Create New Password
          </h1>
          {associatedEmail ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Updating password for <strong className="text-slate-800 dark:text-slate-200 font-mono">{associatedEmail}</strong>
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Choose a strong, unique password to secure your account.
            </p>
          )}
        </div>

        {/* Loading Token Validation State */}
        {isValidating && (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium">Verifying reset token security...</p>
          </div>
        )}

        {/* Invalid Token State */}
        {!isValidating && tokenValid === false && (
          <div className="space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">link_off</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Invalid or Expired Link
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tokenError || 'This reset link has either expired (over 60 minutes) or has already been used.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/forgot-password"
                className="w-full inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                Request Fresh Reset Link
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
              <Link
                href="/login"
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 py-2 transition-colors"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Success State */}
        {!isValidating && state?.success && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Password Successfully Reset!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your credentials have been securely updated and previous sessions have been safely rotated.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                Sign In With New Password
                <span className="material-symbols-outlined text-sm font-bold">login</span>
              </Link>
            </div>
          </div>
        )}

        {/* Reset Password Form */}
        {!isValidating && tokenValid === true && !state?.success && (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="token" value={token} />

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                New Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pr-11 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>

            {/* Password Strength Checklist */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 text-[11px]">
              <div className="font-semibold text-slate-600 dark:text-slate-300">
                Security Requirements:
              </div>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-xs font-bold ${hasMinLength ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {hasMinLength ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span className={hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400'}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-xs font-bold ${hasSpecialOrNumber ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {hasSpecialOrNumber ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span className={hasSpecialOrNumber ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400'}>
                  Includes a number or special character
                </span>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-xs font-bold ${passwordsMatch ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {passwordsMatch ? 'check_circle' : 'cancel'}
                  </span>
                  <span className={passwordsMatch ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-500 font-medium'}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || !hasMinLength || (confirmPassword.length > 0 && !passwordsMatch)}
              className="mt-2 w-full bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  Save New Password
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Cancel and Return to Sign In
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
