'use client';

import { login } from '@/app/actions';
import { useActionState, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Check, 
  ShieldCheck, 
  Shield, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <Check className="w-3 h-3 font-bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Client Workspaces</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Monitor project milestones in real-time, view task sprint updates, pay invoices securely, and download file deliverables.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <Check className="w-3 h-3 font-bold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Developer Workspace</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Access assigned repositories, update sprint task boards, manage deployment status, and coordinate on code reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
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
                  className="object-contain block dark:hidden"
                  priority
               />
               <Image
                  src="/logo/ajpr-logo-white.png"
                  alt="AJPR World"
                  fill
                  className="object-contain hidden dark:block"
                  priority
               />
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Access Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium text-center max-w-sm">
              Enter your credentials to access your administrative console, client workspace, or developer portal.
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pr-11 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-slate-100 text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Looking for Admin Console with 2FA?</span>
              <Link href="/admin/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Admin Login &rarr;
              </Link>
            </div>

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
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-sm text-slate-700 dark:text-white font-bold text-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Log in with Google</span>
            </Link>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-500 font-medium">Don&apos;t have an account yet?</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
                <Link href="/signup/client" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Create Client Account &rarr;
                </Link>
                <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                <Link href="/signup/developer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Join Developer Network &rarr;
                </Link>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
