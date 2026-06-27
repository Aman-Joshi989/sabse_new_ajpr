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
          </form>
        </div>

      </div>
    </div>
  );
}
