'use client';

import { login } from '@/app/actions';
import { useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl grid lg:grid-cols-2">
        
        {/* Left Column: Portal Information (Boosts word count for SEO crawlers and provides premium UX) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              Secure Access Hub
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-300 bg-clip-text text-transparent">
              AJPR World Portal
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Welcome to the AJPR World Secure Workspace. This unified collaborative hub is designed exclusively for clients, stakeholders, and certified developers to track developments and manage software projects.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Client Workspaces</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Monitor project milestones in real-time, view task sprint updates, pay invoices securely, and download file deliverables.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Developer Workspace</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Access assigned repositories, update sprint task boards, manage deployment status, and coordinate on code reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-sm font-bold">lock</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Sovereign Protection</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Sessions are encrypted using secure JSON Web Tokens (JWT) and guarded by AES-256 communication layers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex justify-between items-center">
            <span>AJPR World &copy; {new Date().getFullYear()}</span>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Need help?</Link>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link href="/" className="relative w-40 h-14 mb-2 hover:scale-[1.02] transition-transform block">
               <Image
                  src="/logo/ajpr-logo.png"
                  alt="AJPR World"
                  fill
                  className="object-contain"
                  priority
               />
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Access Portal
            </h1>
            <p className="text-sm text-slate-500 font-medium text-center">
              Enter your credentials to access your secure client or developer workspace.
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
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
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
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
              />
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
              className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 font-medium">Or</span>
              </div>
            </div>

            <Link
              href="/api/auth/google"
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-sm text-slate-700 dark:text-white font-bold"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Log in with Google
            </Link>
          </form>
        </div>

      </div>
    </div>
  );
}
