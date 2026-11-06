'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
  Sparkles, Cpu, Clock, Layers, Rocket, Zap, Check, 
  HelpCircle, ChevronRight, Calculator, FileCode, Server, Database, Globe, TrendingUp
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

interface SmartSitesComparisonClientProps {
  topAlternatives: AlternativeItem[];
  faqs: FaqItem[];
}

export default function SmartSitesComparisonClient({
  topAlternatives,
  faqs,
}: SmartSitesComparisonClientProps) {
  const adSpendId = useId();
  const cpcId = useId();

  // Interactive Ad Speed & Bounce Waste Calculator State
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(5000);
  const [cpc, setCpc] = useState<number>(4.5);

  // Filter tab for comparison matrix
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'speed' | 'pricing' | 'tech'>('all');

  // Interactive Architecture Tab
  const [archTab, setArchTab] = useState<'ajpr' | 'smartsites'>('ajpr');

  // Math for Ad Speed Waste
  // Average bounce rate on 3.8s mobile WordPress page: ~42%
  // Average bounce rate on 0.5s sub-second Next.js page: ~11%
  const totalClicks = Math.round(monthlyAdSpend / (cpc || 1));
  const wpBouncedClicks = Math.round(totalClicks * 0.42);
  const nextjsBouncedClicks = Math.round(totalClicks * 0.11);
  const savedClicks = wpBouncedClicks - nextjsBouncedClicks;
  const monthlyWastedAdDollars = Math.round(savedClicks * cpc);
  const annualSavedDollars = monthlyWastedAdDollars * 12;

  const comparisonRows = [
    {
      category: 'speed',
      feature: 'Mobile Page Load Speed (LCP)',
      smartsites: '3.2s – 4.8s (WordPress plugins/Elementor)',
      ajpr: '0.4s – 0.8s (Next.js 16 Edge Rendering)',
      traditional: '3.0s – 5.5s (PHP/WordPress)',
      impact: 'Next.js delivers 3x lower bounce rates on paid traffic',
    },
    {
      category: 'speed',
      feature: 'Google Core Web Vitals Score',
      smartsites: '45–75 / 100 (Frequent mobile CLS & LCP fails)',
      ajpr: '98–100 / 100 (Guaranteed green thresholds)',
      traditional: '50–70 / 100',
      impact: 'Higher Google Quality Score lowers your PPC CPC by up to 28%',
    },
    {
      category: 'pricing',
      feature: 'PPC Management Fee Structure',
      smartsites: '15% – 20% of ad spend or high markup retainers',
      ajpr: '0% Ad Markup (Flat advisory sprint or pod)',
      traditional: '15% – 20% variable spend cut',
      impact: '100% of your budget goes to ads; no incentive to bloat spend',
    },
    {
      category: 'pricing',
      feature: 'Contract Terms & Flexibility',
      smartsites: 'Typically 6 to 12-month lock-in agreements',
      ajpr: 'Month-to-month retainers (30-day notice, zero lock-in)',
      traditional: 'Annual contracts with early cancellation penalties',
      impact: 'Complete financial flexibility aligned with real ROI',
    },
    {
      category: 'tech',
      feature: 'Underlying Tech Stack',
      smartsites: 'Standard WordPress, Shopify, Elementor templates',
      ajpr: 'Next.js 16, React 19, TypeScript, PostgreSQL, Vercel Edge',
      traditional: 'Monolithic PHP CMS',
      impact: 'Zero plugin security exploits; instant sub-second page transitions',
    },
    {
      category: 'tech',
      feature: 'Generative Engine Optimization (GEO)',
      smartsites: 'Traditional keyword stuffing & basic meta tags',
      ajpr: 'JSON-LD schema, /llms.txt, AI Overview citation indexing',
      traditional: 'Legacy backlink blasting',
      impact: 'Captures top recommendations in ChatGPT, Perplexity, and Google AI',
    },
    {
      category: 'tech',
      feature: 'Direct Access to Senior Talent',
      smartsites: 'Junior Account Coordinator as intermediary',
      ajpr: 'Direct Slack/Discord access to Lead Engineers & Strategists',
      traditional: 'Multi-layer account executive hierarchy',
      impact: 'Zero translation loss, rapid same-day technical turnarounds',
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
          <Sparkles className="w-4 h-4" /> Quick Verdict: SmartSites Alternatives at a Glance
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Why Growth Founders Choose AJPR World over SmartSites in 2026
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          <p>
            While <strong>SmartSites</strong> has built a high-volume business managing standard WordPress templates and Google Ads for small local contractors, their <strong>15%–20% ad management cuts</strong>, <strong>6–12 month contract lock-ins</strong>, and <strong>slow WordPress load times</strong> cap growth for ambitious tech and scale-up brands.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Web Performance</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">0.4s vs 3.8s</div>
              <p className="text-xs text-slate-500 mt-1">Next.js 16 App Router scores 100/100 Core Web Vitals vs bloated WordPress plugins.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Ad Fee Transparency</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">0% Markup</div>
              <p className="text-xs text-slate-500 mt-1">Flat sprint pricing. No 15% hidden tax incentivizing bloated ad budgets.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">GEO & Modern Search</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">AI Citations</div>
              <p className="text-xs text-slate-500 mt-1">Schema.org + /llms.txt manifests ensure priority indexing on ChatGPT and Perplexity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Mobile Speed & Ad Waste ROI Simulator */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> Interactive ROI Simulator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Calculate Mobile Ad Traffic Bounced by Slow WordPress Sites
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Google research proves 53% of mobile visits are abandoned if a page takes over 3 seconds to load. See how much budget a Next.js 16 rebuild saves:
            </p>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={adSpendId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Monthly Ad Spend (Google & Meta)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                ${monthlyAdSpend.toLocaleString()}
              </span>
            </div>
            <input 
              id={adSpendId}
              type="range" 
              min={1000} 
              max={30000} 
              step={500}
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>$1,000/mo</span>
              <span>$15,000/mo</span>
              <span>$30,000/mo</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={cpcId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Estimated Cost Per Click (CPC)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                ${cpc.toFixed(2)}
              </span>
            </div>
            <input 
              id={cpcId}
              type="range" 
              min={1.0} 
              max={15.0} 
              step={0.5}
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>$1.00 (Local)</span>
              <span>$7.50 (B2B)</span>
              <span>$15.00 (Legal/Fintech)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">
              SmartSites / WordPress Lag
            </span>
            <div className="text-3xl font-black text-red-600 dark:text-red-400 mt-2">
              {wpBouncedClicks.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Estimated visitors bouncing monthly due to 3.8s page latency (42% dropoff rate).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              AJPR World Next.js 16
            </span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
              {nextjsBouncedClicks.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Estimated dropoffs with sub-0.5s edge load speed (industry-leading 11% baseline).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 shadow-md">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Annual Ad Budget Salvaged
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
              ${annualSavedDollars.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Ad dollars recaptured annually from bounced clicks, paying for your Next.js rebuild in months.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            Want us to audit your existing landing page speed and calculate your exact paid traffic loss?
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0" asChild>
            <Link href="/book-call">
              Request Free CRO & Speed Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3. Interactive Architecture & Service Model Inspector */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Server className="w-3.5 h-3.5" /> Technical Architecture Inspector
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Monolithic WordPress vs Edge Next.js 16 Architecture
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare how requests are processed, why WordPress sites slow down under ad traffic, and how modern edge architecture scales:
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mb-8">
          <button
            onClick={() => setArchTab('ajpr')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              archTab === 'ajpr'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AJPR World Edge Architecture (Next.js 16)
          </button>
          <button
            onClick={() => setArchTab('smartsites')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              archTab === 'smartsites'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SmartSites Traditional Setup (WordPress/PHP)
          </button>
        </div>

        {/* Dynamic Architectural Blueprint Display */}
        {archTab === 'ajpr' ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-wider">
                Target Architecture: Sub-Second Edge Global Network
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold">
                100/100 Core Web Vitals
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-1">
                  <Globe className="w-4 h-4" /> Global Edge CDN
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Vercel Edge Network</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Static assets and prerendered HTML cached across 300+ worldwide nodes. Time-to-First-Byte (TTFB) &lt; 40ms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase mb-1">
                  <Cpu className="w-4 h-4" /> React 19 App Router
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">React Server Components</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Zero client JavaScript bloat. Server-rendered HTML indexed instantly by Googlebot and LLM crawlers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase mb-1">
                  <Database className="w-4 h-4" /> Database & AI
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Neon PostgreSQL + pgvector</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Serverless relational storage with microsecond branching and native semantic vector search.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase mb-1">
                  <Sparkles className="w-4 h-4" /> Machine Discovery
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">GEO & LLM Manifests</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Integrated `/llms.txt`, full Schema.org microdata, and IndexNow pinging for AI engine citations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold tracking-wider">
                Legacy Architecture: Single-Server PHP Monolith
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                High Latency & Vulnerabilities
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Server className="w-4 h-4" /> Central Origin Server
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Shared Apache / Nginx</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Single server in one geographic region. High TTFB (600ms–1.5s) for mobile users far from the datacenter.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Layers className="w-4 h-4" /> Plugin Bloat
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">30+ Third-Party Plugins</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Elementor, Slider Revolution, and analytics tags inject megabytes of blocking CSS/JS, destroying Core Web Vitals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Database className="w-4 h-4" /> MySQL Bottleneck
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Blocking DB Queries</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Every page load runs dozens of unoptimized wp_posts queries. Spikes in paid traffic crash the web server.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" /> Maintenance Overhead
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Constant Security Patches</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Weekly plugin vulnerability updates required to prevent brute-force attacks and SQL injection exploits.
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
              Feature & Service Model Comparison
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Filter by specific agency criteria to see where AJPR World delivers superior ROI:
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
              onClick={() => setMatrixFilter('speed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'speed'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Speed & CWV
            </button>
            <button
              onClick={() => setMatrixFilter('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'pricing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pricing & Contracts
            </button>
            <button
              onClick={() => setMatrixFilter('tech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'tech'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tech & AI
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 w-1/4">SmartSites</th>
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
                    {row.smartsites}
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
          The 5 Best SmartSites Alternatives Evaluated for 2026
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

      {/* 6. Lead Capture & Strategy Session */}
      <ToolLeadCapture
        toolName="SmartSites Competitor & Speed Audit"
        ctaText="Get Custom Next.js Speed & PPC Audit"
      />

      {/* 7. FAQs */}
      <section className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions: Choosing a SmartSites Alternative
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
          Ready to Upgrade from Slow WordPress to Sub-Second Next.js 16?
        </h3>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Stop bleeding 40%+ of your paid ad budget to mobile page latency. Rebuild your digital presence on modern edge infrastructure with zero contract lock-in.
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
