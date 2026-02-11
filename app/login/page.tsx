'use client';

import { login } from '@/app/actions';
import { useActionState } from 'react';

import Image from 'next/image';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative w-48 h-16 mb-2">
             <Image
                src="/logo/ajpr-logo.png"
                alt="AJPR World"
                fill
                className="object-contain"
                priority
             />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Access Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium text-center">
            Enter your credentials to access the client or developer portal.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              required
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-accent-start outline-none transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-accent-start outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
