'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { adminLoginAction, AdminLoginState } from './actions';

const initialState: AdminLoginState = {};

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialState);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 font-sans relative overflow-hidden">
      {/* Background ambient security grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      {/* Top Bar: Security Classification */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-300 tracking-wider">CENTRAL COMMAND GATEWAY</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 hidden sm:inline">AUTHENTICATION LAYER 0</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="hidden md:inline">SYSTEM STATUS: <span className="text-emerald-400 font-semibold">SECURE</span></span>
          <Link 
            href="/" 
            className="hover:text-slate-300 transition-colors flex items-center gap-1 text-slate-400"
          >
            &larr; Return to AJPR World
          </Link>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl shadow-2xl backdrop-blur-xl p-8 sm:p-10 space-y-6">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <div className="relative w-36 h-12">
                <Image
                  src="/logo/ajpr-logo.png"
                  alt="AJPR World"
                  fill
                  className="object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                  priority
                />
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Restricted Operations Area
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Central Command Login
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Authoritative authentication for verified operations administrators and systems engineers.
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label 
                htmlFor="admin-email" 
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium"
              >
                Administrator Identity
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  placeholder="admin@ajprworld.com"
                  autoFocus
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="admin-password" 
                  className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium"
                >
                  Passkey Credential
                </label>
              </div>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            {state?.error && (
              <div 
                role="alert"
                className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2.5 animate-in fade-in duration-200"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="leading-tight">{state.error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/40 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>VERIFYING CREDENTIALS...</span>
                </>
              ) : (
                <>
                  <span>ENTER CENTRAL COMMAND</span>
                  <span className="text-emerald-300 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </>
              )}
            </button>
          </form>

          {/* Security Compliance Disclaimer */}
          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>AUDIT LEDGER ACTIVE</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-normal">
              Every authentication attempt is cryptographically recorded in the immutable audit log with IP, timestamp, and session hash. Unauthorized access attempts are flagged.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/70 px-6 py-3 text-center text-[11px] font-mono text-slate-600">
        AJPR World Autonomous Operating System &bull; Level 0 Security Zone
      </footer>
    </div>
  );
}
