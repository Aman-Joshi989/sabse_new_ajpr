"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerUserAction } from "@/app/actions";
import { 
  ArrowRight, 
  Loader2, 
  Code2, 
  CheckCircle2, 
  Terminal, 
  GitBranch, 
  Coins, 
  Laptop,
  Layers
} from "lucide-react";

export default function DeveloperSignup() {
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
    } else {
      window.location.href = '/dashboard/developer';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] font-display flex items-center justify-center p-4 lg:p-8 py-12">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden grid md:grid-cols-12">
        
        {/* Left Side: Dev Network Brand */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-block text-xl font-black tracking-tight text-white mb-8">
              AJPR <span className="text-indigo-400">DEVFLOW</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-6 border border-indigo-500/30">
              <Code2 className="w-3.5 h-3.5" /> Elite Engineering Network
            </div>

            <h2 className="text-3xl font-black leading-tight mb-4">
              Build Production AI & High-Performance Systems.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Join vetted engineers building full-stack Next.js web applications, autonomous agent workflows, and scalable architectures for US & international startups.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Guaranteed milestone & hourly payouts on time</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Modern stacks: Next.js 15, TypeScript, Postgres, AI APIs</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Asynchronous, high-autonomy engineering culture</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Clear specs, zero bureaucratic overhead</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-8 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Already have an active developer login? </span>
            <Link href="/login" className="text-indigo-400 hover:underline font-bold">
              Sign In to Console &rarr;
            </Link>
          </div>
        </div>

        {/* Right Side: Application Form */}
        <div className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Apply to Developer Network
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Submit your engineering profile. We review and assign sprints within 48 hours.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-semibold border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="role" value="developer" />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                  placeholder="Alex Rivera"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                  placeholder="alex@example.com"
                />
              </div>
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
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Core Stack & Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skills"
                required
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                placeholder="Next.js, TypeScript, PostgreSQL, Tailwind, Docker, LangChain"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  GitHub or Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio_url"
                  required
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                  placeholder="https://github.com/yourhandle"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Hourly Rate (₹ / hr)
                </label>
                <input
                  type="number"
                  name="hourly_rate"
                  required
                  min={500}
                  step={100}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white text-sm"
                  placeholder="1500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Submit Application & Enter Network <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-xs text-slate-500 font-medium">
            Already verified?{" "}
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">
              Sign In to DevFlow Console
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
