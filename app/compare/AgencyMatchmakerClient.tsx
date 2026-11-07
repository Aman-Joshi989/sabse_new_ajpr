'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
  Sparkles, Cpu, Clock, Layers, Rocket, Zap, Check, 
  HelpCircle, ChevronRight, Calculator, FileCode, Server, Database, Search, Filter, ShieldAlert
} from 'lucide-react';
import ToolLeadCapture from '@/components/ToolLeadCapture';
import { Button } from '@/components/ui/button';

interface ComparisonCard {
  title: string;
  slug: string;
  target: string;
  description: string;
  badge: string;
  category: 'ai' | 'us-agency' | 'local';
  highlights: string[];
}

interface AgencyMatchmakerClientProps {
  comparisons: ComparisonCard[];
}

export default function AgencyMatchmakerClient({
  comparisons,
}: AgencyMatchmakerClientProps) {
  // Matchmaker Scenario State
  const [selectedScenario, setSelectedScenario] = useState<'ai-mvp' | 'speed-ppc' | 'lock-in' | 'saas-growth'>('ai-mvp');

  // Search & Category Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'ai' | 'us-agency' | 'local'>('all');

  const scenarios = {
    'ai-mvp': {
      title: 'Validating & Launching a New AI MVP',
      traditionalAgency: 'Rootstrap / Altar.io ($50k–$150k, 4–6 months)',
      ajprSolution: 'AJPR World Fixed AI Sprint ($4,500, 2–4 weeks)',
      savings: 'Save $45,000+ & Launch 3 Months Earlier',
      deepDiveLink: '/compare/rootstrap-alternatives',
      deepDiveLabel: 'Read Rootstrap Alternatives Review',
      techVerdict: 'Next.js 16 + React 19 + pgvector vs legacy Ruby on Rails / monoliths.',
    },
    'speed-ppc': {
      title: 'Fixing Slow WordPress Sites & 15% Ad Markups',
      traditionalAgency: 'SmartSites ($3.5k/mo + 15% ad tax, WordPress)',
      ajprSolution: 'AJPR World Sub-Second Retainer (0% ad markup, Next.js 16)',
      savings: 'Recapture $18,000/yr in Bounced Mobile Traffic',
      deepDiveLink: '/compare/smartsites-alternatives',
      deepDiveLabel: 'Read SmartSites Alternatives Review',
      techVerdict: '0.4s Edge rendering (100/100 Core Web Vitals) vs 3.8s bloated WordPress plugins.',
    },
    'lock-in': {
      title: 'Eliminating Proprietary Tool Lock-In (MarketingCloudFX)',
      traditionalAgency: 'WebFX (12-month lock-in, closed portal, junior staff)',
      ajprSolution: 'AJPR World 100% Client-Owned Sovereign Stack (Direct Senior Slack)',
      savings: 'Save $24,000–$48,000/yr + Retain All Data',
      deepDiveLink: '/compare/webfx-alternatives',
      deepDiveLabel: 'Read WebFX Alternatives Review',
      techVerdict: 'All analytics in GA4/BigQuery and code in private GitHub; zero hostage assets.',
    },
    'saas-growth': {
      title: 'Scaling B2B Tech with AI Agents & Generative Engine Optimization',
      traditionalAgency: 'Single Grain / Enterprise Consultancies ($8k–$15k/mo)',
      ajprSolution: 'AJPR World Autonomous Growth Pod ($3.5k–$5.5k/mo)',
      savings: 'Cut Retainer Costs by 60% with Real Engineers',
      deepDiveLink: '/compare/single-grain-alternatives',
      deepDiveLabel: 'Read Single Grain Alternatives Review',
      techVerdict: 'Automated AI retrieval pipelines + schema indexing for ChatGPT and Perplexity citations.',
    },
  };

  const currentScenario = scenarios[selectedScenario];

  // Filtered comparisons
  const filteredComparisons = comparisons.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16">
      {/* 1. Interactive Agency Fit Matchmaker */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Decision Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            What Is Your Primary Technical or Marketing Challenge?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Click your scenario below to see an instant financial, technical, and speed comparison:
          </p>
        </div>

        {/* Scenario Toggle Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setSelectedScenario('ai-mvp')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedScenario === 'ai-mvp'
                ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1">
              <Rocket className="w-3.5 h-3.5" /> AI MVP Sprint
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Launch in 2–4 Wks
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Vs $50k+ Agency Quotes
            </div>
          </button>

          <button
            onClick={() => setSelectedScenario('speed-ppc')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedScenario === 'speed-ppc'
                ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5" /> Web Speed & Ads
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Next.js vs WordPress
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              0.4s vs 3.8s Latency
            </div>
          </button>

          <button
            onClick={() => setSelectedScenario('lock-in')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedScenario === 'lock-in'
                ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Data Freedom
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Zero Lock-In
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Own 100% of Code & Data
            </div>
          </button>

          <button
            onClick={() => setSelectedScenario('saas-growth')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedScenario === 'saas-growth'
                ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
              <Cpu className="w-3.5 h-3.5" /> AI & GEO SEO
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              AI Engine Rank
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              ChatGPT & Perplexity Top
            </div>
          </button>
        </div>

        {/* Dynamic Scenario Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Selected Dilemma</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {currentScenario.title}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs self-start sm:self-auto">
              {currentScenario.savings}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40">
              <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> Legacy Agency Approach
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                {currentScenario.traditionalAgency}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                High overhead, mandatory discovery meetings, proprietary contract lock-ins, and slow turnaround times.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800/80 shadow-xs">
              <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> AJPR World Agile Engineering
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                {currentScenario.ajprSolution}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5">
                {currentScenario.techVerdict}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={currentScenario.deepDiveLink}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              {currentScenario.deepDiveLabel} <ArrowRight className="w-4 h-4" />
            </Link>

            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer" asChild>
              <Link href="/book-call">
                Book 30-Min Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Directory Filter Controls */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Browse All Agency Comparisons & Alternative Audits
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Data-backed reviews, pricing teardowns, and architecture evaluations:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search agencies (e.g., Rootstrap, WebFX)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({comparisons.length})
              </button>
              <button
                onClick={() => setCategoryFilter('ai')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'ai'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                AI & MVP
              </button>
              <button
                onClick={() => setCategoryFilter('us-agency')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'us-agency'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                US Agencies
              </button>
              <button
                onClick={() => setCategoryFilter('local')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'local'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Regional
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid gap-6">
          {filteredComparisons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 w-fit">
                  {item.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">{item.target}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  Published in 2026 Agency Alternatives Directory
                </span>
                <Link
                  href={item.slug}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Read Full Comparison <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filteredComparisons.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">No Comparisons Match Your Search</h4>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Rootstrap", "WebFX", or "AI".</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Agency Selection Red Flags Framework */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          5 Warning Signs When Hiring a Digital Agency in 2026
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed max-w-3xl">
          Whether you partner with AJPR World or another firm, insist on transparency. Never sign an agency contract if they exhibit these critical red flags:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm mb-2">
              <ShieldAlert className="w-4 h-4 shrink-0" /> 1. Closed Ecosystem & Hostage Code
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If an agency hosts your site on proprietary systems or refuses to grant repository access until the final payment, your business is hostage. At AJPR World, all code is written in your private GitHub from Day 1.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm mb-2">
              <Clock className="w-4 h-4 shrink-0" /> 2. Paid 6-Week "Discovery" Bloat
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Charging $15,000+ for endless discovery decks before writing code burns startup runway. Real user feedback on functional software is 10x more valuable than theoretical user journeys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm mb-2">
              <DollarSign className="w-4 h-4 shrink-0" /> 3. Hidden Percentage Ad Spend Taxes
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Agencies taking 15% to 20% of media spend are financially incentivized to maximize your budget rather than optimize conversion rates. AJPR World charges flat advisory fees with 0% ad tax.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm mb-2">
              <Layers className="w-4 h-4 shrink-0" /> 4. Junior Account Relays
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sales pitches are conducted by founders, but day-to-day execution is handed to recent graduates. AJPR World provides direct Slack collaboration with principal engineers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Lead Capture Tool */}
      <ToolLeadCapture
        toolName="Agency Proposal & Contract Audit"
        ctaText="Submit Agency Proposal for Free Technical Review"
      />

      {/* 5. Bottom Conversion CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white text-center shadow-xl space-y-6">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready for Modern Engineering Without Agency Bloat?
        </h3>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Whether you need a rapid 2–4 week AI MVP sprint ($4,500) or an agile dedicated engineering pod, we deliver production-grade software with complete code ownership.
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
            Explore Transparent Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}

