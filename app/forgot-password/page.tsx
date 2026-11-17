'use client';

import { useActionState, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { requestPasswordResetAction, ForgotPasswordState } from './actions';

const initialState: ForgotPasswordState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    initialState
  );
  const [submittedEmail, setSubmittedEmail] = useState('');

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
            <span className="material-symbols-outlined text-xs">lock_reset</span>
            Account Recovery
          </div>

          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            Enter your registered email address and we&apos;ll deliver a secure, time-limited reset link to your inbox.
          </p>
        </div>

        {/* Success View */}
        {state?.success ? (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">mark_email_read</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Check Your Inbox
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {state.message}
              </p>
              {submittedEmail && (
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 py-1 px-3 rounded-lg inline-block mt-1">
                  {submittedEmail}
                </p>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-left text-xs text-slate-500 space-y-1.5">
              <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-amber-500">info</span>
                Didn&apos;t receive the email?
              </div>
              <p className="text-[11px] leading-relaxed">
                Check your spam folder or verify you typed the correct address. The link will remain active for 60 minutes.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          /* Form View */
          <form
            action={formAction}
            onSubmit={(e) => {
              const form = e.currentTarget;
              const emailInput = form.elements.namedItem('email') as HTMLInputElement;
              if (emailInput) setSubmittedEmail(emailInput.value);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  mail
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@ajprworld.com"
                  required
                  autoFocus
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
              </div>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </>
              )}
            </button>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
