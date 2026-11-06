'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
  Sparkles, Cpu, Clock, Layers, Rocket, Zap, Check, 
  HelpCircle, ChevronRight, Calculator, FileCode, Server, Database, Lock, Unlock, TrendingUp
} from 'lucide-react';
import ToolLeadCapture from '@/components/ToolLeadCapture';
import { Button } from '@/components/ui/button';

interface AlternativeItem {
  name: string;
  description: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface WebFxComparisonClientProps {
  topAlternatives: AlternativeItem[];
  faqs: FaqItem[];
}

export default function WebFxComparisonClient({
  topAlternatives,
  faqs,
}: WebFxComparisonClientProps) {
  const contractMonthsId = useId();
  const retainerId = useId();

  // Interactive Retainer & Lock-In Simulator State
  const [contractMonths, setContractMonths] = useState<number>(12);
  const [webfxTier, setWebfxTier] = useState<'mid' | 'enterprise'>('mid');

  // Filter tab for comparison matrix
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'ownership' | 'pricing' | 'team'>('all');

  // Interactive Lock-In Blueprint Inspector Tab
  const [lockInTab, setLockInTab] = useState<'ajpr' | 'webfx'>('ajpr');

  const webfxMonthly = webfxTier === 'mid' ? 4500 : 8500;
  const ajprMonthly = webfxTier === 'mid' ? 2500 : 4500;

  const totalWebfxCost = webfxMonthly * contractMonths;
  const totalAjprCost = ajprMonthly * contractMonths;
  const netSavings = totalWebfxCost - totalAjprCost;

  const comparisonRows = [
    {
      category: 'ownership',
      feature: 'Analytics & Attribution Data Ownership',
      webfx: 'Locked in proprietary MarketingCloudFX platform',
      ajpr: '100% Client-Owned (GA4, Looker Studio, BigQuery, Supabase)',
      impact: 'If you leave WebFX, you lose all attribution data; with AJPR you keep everything',
    },
    {
      category: 'ownership',
      feature: 'Website Codebase & Hosting Control',
      webfx: 'Often hosted on agency infrastructure or CMS templates',
      ajpr: 'Private GitHub repository & direct Vercel/AWS client account',
      impact: 'Total independence; no hostage code or developer lockout',
    },
    {
      category: 'team',
      feature: 'Team Communication & Seniority',
      webfx: 'Junior Account Coordinator routing to internal task queues',
      ajpr: 'Direct Slack channel with Lead Engineers & Growth Architects',
      impact: 'Same-day code and marketing sprints with zero translation friction',
    },
    {
      category: 'pricing',
      feature: 'Contract Terms & Commitments',
      webfx: '6 to 12-month non-cancelable contracts with auto-renewal',
      ajpr: 'Month-to-month retainers (30-day notice, zero lock-in)',
      impact: 'Zero financial risk; engagement continues only if ROI is proven',
    },
    {
      category: 'pricing',
      feature: 'Software Licensing Fees',
      webfx: 'Bundled MarketingCloudFX seat licenses ($300–$1,000/mo)',
      ajpr: '$0 Platform Tax (We build on modern open-source foundations)',
      impact: 'Every dollar invested goes directly into engineering and growth',
    },
    {
      category: 'team',
      feature: 'Modern Search & GEO Capabilities',
      webfx: 'Legacy SEO keyword tracking & content syndication',
      ajpr: 'Generative Engine Optimization (GEO) for ChatGPT & Perplexity',
      impact: 'Captures recommendations in modern AI synthesis answer engines',
    },
  ];

  const filteredRows = comparisonRows.filter(row => {
    if (matrixFilter === 'all') return true;
    return row.category === matrixFilter;
  });

  return (
    <div className="space-y-16">
      {/* 1. Quick Verdict Highlight Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-md">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" /> Quick Verdict: WebFX Alternatives at a Glance
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Why Modern Brands Switch from WebFX to AJPR World in 2026
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          <p>
            <strong>WebFX</strong> is an established 500-person agency, but their <strong>proprietary software lock-in (MarketingCloudFX)</strong>, <strong>6–12 month contract traps</strong>, and <strong>junior account coordinator layers</strong> create unnecessary expense and frustration. High-growth brands switch to AJPR World for senior engineer execution and total data freedom.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Data Independence</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                <Unlock className="w-4 h-4 text-emerald-500" /> 100% Owned
              </div>
              <p className="text-xs text-slate-500 mt-1">Zero platform lock-in. All analytics, code, and CRM pipelines live in your accounts forever.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Direct Senior Access</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Direct Slack</div>
              <p className="text-xs text-slate-500 mt-1">Work directly with principal developers and growth architects, not junior relays.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Cost & Contracts</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Month-to-Month</div>
              <p className="text-xs text-slate-500 mt-1">Save $24,000–$48,000/year compared to enterprise agency retainers with zero lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Enterprise Retainer & Savings Simulator */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> Interactive Cost & Lock-in Calculator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Compare 12-Month Agency Retainers & True Data Independence
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Calculate total cash outlay and operational savings by choosing agile senior engineering over enterprise agency bureaucracy:
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">
              Scope & Business Scale
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWebfxTier('mid')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  webfxTier === 'mid'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">Growth / Mid-Market</div>
                <div className="text-[11px] text-slate-500 mt-1">WebFX: $4,500/mo vs AJPR: $2,500/mo</div>
              </button>
              <button
                onClick={() => setWebfxTier('enterprise')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  webfxTier === 'enterprise'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">Full Enterprise Stack</div>
                <div className="text-[11px] text-slate-500 mt-1">WebFX: $8,500/mo vs AJPR: $4,500/mo</div>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={contractMonthsId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Contract Duration (Months)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                {contractMonths} Months
              </span>
            </div>
            <input 
              id={contractMonthsId}
              type="range" 
              min={3} 
              max={24} 
              step={1}
              value={contractMonths}
              onChange={(e) => setContractMonths(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>3 Mos</span>
              <span>12 Mos (Typical Contract)</span>
              <span>24 Mos</span>
            </div>
          </div>
        </div>

        {/* Comparison Totals */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">
              WebFX Total Outlay
            </span>
            <div className="text-3xl font-black text-red-600 dark:text-red-400 mt-2">
              ${totalWebfxCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Includes MarketingCloudFX software fees, agency overhead, and mandatory contract lock-in.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              AJPR World Retainer
            </span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
              ${totalAjprCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Senior engineering, custom Next.js builds, Generative AI SEO, and 100% data ownership.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 shadow-md">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Net Capital Saved
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
              ${netSavings.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Direct capital preserved for hiring, paid acquisition scaling, or product R&D.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            Have a pending WebFX proposal? Let our technical team review it confidentially and show you what you're paying for.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0" asChild>
            <Link href="/book-call">
              Request Confidential Proposal Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3. Interactive Data Ownership & Software Lock-In Inspector */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" /> Platform Freedom Inspector
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            What Happens to Your Marketing Assets When You Leave?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare data retention, tracking ownership, and switching costs between an agency with proprietary software vs open architecture:
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mb-8">
          <button
            onClick={() => setLockInTab('ajpr')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              lockInTab === 'ajpr'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AJPR World: 100% Open Data Sovereignty
          </button>
          <button
            onClick={() => setLockInTab('webfx')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              lockInTab === 'webfx'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            WebFX: Proprietary MarketingCloudFX Lock-In
          </button>
        </div>

        {lockInTab === 'ajpr' ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-wider">
                Full Data Sovereignty Architecture
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold">
                Zero Switching Cost
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-1">
                  <Database className="w-4 h-4" /> Client-Owned GA4 & BigQuery
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Historical Data Stays Yours</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Every analytics event, multi-touch attribution journey, and conversion record is written into your Google Cloud project. You never lose a single data point.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase mb-1">
                  <FileCode className="w-4 h-4" /> GitHub Private Organization
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Complete Source Code Transfer</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  All Next.js 16 components, Tailwind UI systems, and API integrations are committed directly to your private GitHub repo from Day 1.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase mb-1">
                  <Server className="w-4 h-4" /> Direct Ad Platform Accounts
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Direct Billing & Ownership</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Google Ads, Meta Ads, and LinkedIn Campaign Manager accounts are owned directly by your business. We manage as delegated admins with zero spend markups.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold tracking-wider">
                Proprietary Ecosystem Lock-In Risks
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                High Risk of Disruption
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Lock className="w-4 h-4" /> MarketingCloudFX Portal
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lost Reports Upon Departure</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Call tracking, lead scoring, and ROI reporting are tied directly to WebFX's proprietary software. If you leave, your dashboard access terminates.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Layers className="w-4 h-4" /> Closed Tool Ecosystem
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Proprietary Call Tracking</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Call recordings and dynamic telephone number pools must be re-architected from scratch when transitioning away from MarketingCloudFX.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" /> Administrative Overhead
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lengthy Renewal Cycles</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Contracts often enforce strict 60 or 90-day non-renewal notification clauses, forcing businesses to commit to annual cycles prematurely.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Filterable Feature Matrix */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Feature & Contract Comparison Matrix
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Filter by operational categories to evaluate service transparency:
            </p>
          </div>

          <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setMatrixFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setMatrixFilter('ownership')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'ownership'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Data Ownership
            </button>
            <button
              onClick={() => setMatrixFilter('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'pricing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pricing & Lock-in
            </button>
            <button
              onClick={() => setMatrixFilter('team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'team'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Team & GEO AI
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 w-1/4">WebFX</th>
                <th className="p-4 w-1/3 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  AJPR World (Recommended)
                </th>
                <th className="p-4 w-1/4 hidden md:table-cell">Business Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {filteredRows.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {row.webfx}
                  </td>
                  <td className="p-4 bg-blue-50/30 dark:bg-blue-950/10 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{row.ajpr}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">
                    {row.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Top 5 Alternatives Directory */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
          The 5 Best WebFX Alternatives Evaluated for 2026
        </h3>
        <div className="space-y-4">
          {topAlternatives.map((alt, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                idx === 0 
                  ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">#{idx + 1}</span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{alt.name}</h4>
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        Editor's Choice
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {alt.description}
                  </p>
                </div>
                <Link
                  href={alt.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 shrink-0 mt-2 sm:mt-0"
                >
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Lead Capture & Proposal Audit */}
      <ToolLeadCapture
        toolName="WebFX Competitor & Lock-in Audit"
        ctaText="Get Free Agency Contract & Attribution Audit"
      />

      {/* 7. FAQs */}
      <section className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions: Choosing a WebFX Alternative
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                {faq.question}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white text-center shadow-xl space-y-6">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready for Direct Senior Talent with Zero Software Lock-In?
        </h3>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Skip the junior account relays, enterprise markups, and proprietary software traps. Partner directly with senior software engineers and growth architects.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-call"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
          >
            Book 30-Min Strategy Call
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
          >
            View Transparent Retainer Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
