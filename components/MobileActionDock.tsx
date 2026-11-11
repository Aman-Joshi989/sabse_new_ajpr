'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Calculator, GitMerge, Calendar } from 'lucide-react';

export default function MobileActionDock() {
  const pathname = usePathname();

  // Suppress on dashboard, admin, and login routes
  if (
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login')
  ) {
    return null;
  }

  return (
    <nav 
      aria-label="Mobile Quick Actions" 
      className="md:hidden fixed bottom-3 inset-x-3 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
    >
      <div className="bg-slate-900/95 dark:bg-[#0b1120]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl flex items-center justify-between text-center gap-1">
        <Link
          href="/free-audit"
          className="flex-1 py-2 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5"
        >
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold tracking-tight">Free Audit</span>
        </Link>

        <Link
          href="/pricing/website-cost"
          className="flex-1 py-2 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-tight">Calculator</span>
        </Link>

        <Link
          href="/compare"
          className="flex-1 py-2 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5"
        >
          <GitMerge className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-bold tracking-tight">Compare</span>
        </Link>

        <Link
          href="/book-call"
          className="flex-1 py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5 shadow-md shadow-blue-600/30 font-bold"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold tracking-tight">Book Call</span>
        </Link>
      </div>
    </nav>
  );
}

