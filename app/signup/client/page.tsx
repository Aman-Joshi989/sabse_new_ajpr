"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerUserAction } from "@/app/actions";
import { 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Zap, 
  GitBranch, 
  BarChart3,
  Layers
} from "lucide-react";

export default function ClientSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerUserAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] font-display flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden grid md:grid-cols-12">
        
        {/* Left Side: Brand & Value Prop */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-block text-xl font-black tracking-tight text-white mb-8">
              AJPR <span className="text-blue-400">WORLD</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs uppercase tracking-wider mb-6 border border-blue-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Client Portal Access
            </div>

            <h2 className="text-3xl font-black leading-tight mb-4">
              Direct Sprint Transparency & Live Delivery.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Track engineering sprints, inspect live milestone progress, review invoices, and communicate directly with your dedicated architects.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Real-time sprint progress & burndown tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Transparent milestone & invoice management</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Direct asynchronous channel with lead engineers</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% intellectual property & code ownership</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-8 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Need an immediate architecture consultation? </span>
            <Link href="/book-call" className="text-blue-400 hover:underline font-bold">
              Book a call with Aman Joshi &rarr;
            </Link>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Create Client Account
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Initialize your project workspace. No credit card required.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-semibold border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="role" value="client" />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
                placeholder="Jane Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Work Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
                placeholder="jane@company.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Password (min. 6 characters)
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 dark:text-white text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Initialize Client Portal <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-xs text-slate-500 font-medium">
            Already registered?{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
              Sign In to Your Workspace
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
