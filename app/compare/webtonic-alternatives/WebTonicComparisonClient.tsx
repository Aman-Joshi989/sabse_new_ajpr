'use client';

import React, { useState, useId, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
  Sparkles, Cpu, Clock, Layers, Rocket, Zap, Check, 
  HelpCircle, ChevronRight, Calculator, FileCode, Server, Database, Globe, TrendingUp, MapPin
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

interface WebTonicComparisonClientProps {
  topAlternatives: AlternativeItem[];
  faqs: FaqItem[];
}

export default function WebTonicComparisonClient({
  topAlternatives,
  faqs,
}: WebTonicComparisonClientProps) {
  const visitorsId = useId();
  const aovId = useId();

  // Interactive Conversion & Speed Revenue Simulator State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(3500);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(450);

  // Filter tab for comparison matrix
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'speed' | 'pricing' | 'geo'>('all');

  // Interactive Architecture Tab
  const [archTab, setArchTab] = useState<'ajpr' | 'webtonic'>('ajpr');
  const [showStickyDock, setShowStickyDock] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyDock(true);
      } else {
        setShowStickyDock(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Conversion rates:
  // Standard template site (Web Tonic): ~1.6% conversion rate
  // Sub-second Next.js custom platform (AJPR World): ~3.4% conversion rate
  const webtonicMonthlyRevenue = Math.round(monthlyVisitors * 0.016 * averageOrderValue);
  const ajprMonthlyRevenue = Math.round(monthlyVisitors * 0.034 * averageOrderValue);
  const monthlyIncrementalRevenue = ajprMonthlyRevenue - webtonicMonthlyRevenue;
  const annualIncrementalRevenue = monthlyIncrementalRevenue * 12;

  const comparisonRows = [
    {
      category: 'speed',
      feature: 'Mobile Performance & Core Web Vitals',
      webtonic: 'Standard WordPress / Shopify themes (60–75/100 CWV)',
      ajpr: 'Next.js 16 + React 19 Sub-Second Edge (99–100/100 CWV)',
      impact: '0.4s load speed doubles mobile conversion rate over standard templates',
    },
    {
      category: 'geo',
      feature: 'Search Optimization Scope',
      webtonic: 'Local business directories & traditional review widgets',
      ajpr: 'National Programmatic SEO + Generative Engine Optimization (GEO)',
      impact: 'Captures top recommendations in ChatGPT, Perplexity, and Google AI Overviews',
    },
    {
      category: 'pricing',
      feature: 'Pricing Transparency',
      webtonic: 'Hidden quotes requiring sales calls and proposals',
      ajpr: '100% Transparent published tiers ($1,500 – $3,500/mo)',
      impact: 'Zero surprise invoices; sprint-based month-to-month contracts',
    },
    {
      category: 'speed',
      feature: 'Full-Stack Software Engineering',
      webtonic: 'Limited to CMS styling and third-party plugin setup',
      ajpr: 'Custom databases (PostgreSQL/Supabase), custom APIs, SaaS tools',
      impact: 'Build custom client portals, calculators, and automated booking systems',
    },
    {
      category: 'geo',
      feature: 'Data & Code Ownership',
      webtonic: 'Often hosted on agency infrastructure or managed CMS',
      ajpr: '100% Client-Owned GitHub repository and cloud hosting accounts',
      impact: 'Complete intellectual property independence from Day 1',
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
          <Sparkles className="w-4 h-4" /> Quick Verdict: Web Tonic Alternatives at a Glance
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Why Businesses Choose AJPR World over Web Tonic in 2026
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          <p>
            While <strong>Web Tonic</strong> serves local trade businesses with standard website templates, companies seeking <strong>sub-second Next.js engineering</strong>, <strong>nationwide organic search scale</strong>, and <strong>Generative Engine Optimization (GEO)</strong> partner with AJPR World for senior technical execution.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Web Speed</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Sub-Second</div>
              <p className="text-xs text-slate-500 mt-1">Next.js 16 edge architecture delivers 100/100 Core Web Vitals for higher conversion rates.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">GEO Authority</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">AI Citations</div>
              <p className="text-xs text-slate-500 mt-1">We optimize your brand entity to get cited in ChatGPT, Perplexity, and Google AI Overviews.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Pricing Clarity</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">100% Published</div>
              <p className="text-xs text-slate-500 mt-1">Transparent sprint pricing from $1,500/mo with zero long-term contract lock-in traps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Conversion & Speed Revenue Simulator */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> Interactive Revenue Simulator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Calculate Revenue Impact of Upgrading from Standard Templates to Sub-Second Next.js
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Google & Deloitte research proves every 100ms improvement in site speed increases retail conversions by 8.4%. Calculate your projected upside:
            </p>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={visitorsId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Monthly Website Traffic (Visitors)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                {monthlyVisitors.toLocaleString()}
              </span>
            </div>
            <input 
              id={visitorsId}
              type="range" 
              min={1000} 
              max={25000} 
              step={500}
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>1,000/mo</span>
              <span>12,000/mo</span>
              <span>25,000/mo</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={aovId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Average Customer Value (Deal Size)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                ${averageOrderValue.toLocaleString()}
              </span>
            </div>
            <input 
              id={aovId}
              type="range" 
              min={100} 
              max={3000} 
              step={50}
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>$100</span>
              <span>$1,500</span>
              <span>$3,000</span>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">
              Web Tonic / Template Baseline
            </span>
            <div className="text-3xl font-black text-red-600 dark:text-red-400 mt-2">
              ${webtonicMonthlyRevenue.toLocaleString()}/mo
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Estimated monthly revenue at standard 1.6% template conversion rate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              AJPR World Next.js Platform
            </span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
              ${ajprMonthlyRevenue.toLocaleString()}/mo
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Projected monthly revenue at 3.4% high-velocity conversion rate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 shadow-md">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Annual Incremental Growth
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
              +${annualIncrementalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Projected extra annual top-line revenue generated by upgrading to high-speed engineering.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            Ready to upgrade your website from a passive brochure into an automated revenue driver?
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0" asChild>
            <Link href="/book-call">
              Book Strategy Call & CRO Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3. Interactive Architecture & Methodology Inspector */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Server className="w-3.5 h-3.5" /> Technical Architecture Inspector
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Custom Next.js 16 Web Application vs Standard Agency Templates
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare how websites are engineered, hosted, and scaled between modern software development and agency template assembly:
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
            AJPR World: Sub-Second Next.js 16 Architecture
          </button>
          <button
            onClick={() => setArchTab('webtonic')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              archTab === 'webtonic'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Web Tonic: Standard CMS / Template Setup
          </button>
        </div>

        {archTab === 'ajpr' ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-wider">
                Full-Stack High-Velocity Stack
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold">
                100/100 Core Web Vitals
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-1">
                  <Globe className="w-4 h-4" /> Edge Prerendering
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sub-50ms Global TTFB</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Pages are statically pre-rendered and globally cached. Users experience instant, app-like page transitions without loading spinners.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase mb-1">
                  <Database className="w-4 h-4" /> Full-Stack Software
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Custom Portals & Tools</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  We build real software: client portals, pricing calculators, PostgreSQL databases, and automated lead triage workflows.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase mb-1">
                  <Sparkles className="w-4 h-4" /> Generative AI (GEO)
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Search Authority</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Full schema networks and `/llms.txt` integration ensure your company is cited by ChatGPT, Perplexity, and Google AI Overviews.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold tracking-wider">
                Standard Agency Template Limitations
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                Performance & Scaling Cap
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Clock className="w-4 h-4" /> Shared Server Latency
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">3–5 Second Mobile Load</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Traditional CMS plugins and heavy page builders create code bloat, failing Google Core Web Vitals on mobile devices.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Layers className="w-4 h-4" /> Plugin Vulnerabilities
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Third-Party Addon Bloat</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Relying on dozens of plugins for basic features introduces security risks and requires ongoing maintenance fees to prevent breakage.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <MapPin className="w-4 h-4" /> Regional Ceiling
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Limited to Local Keywords</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Standard agency SEO targets basic local business directories without building national programmatic scale or AI engine citations.
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
              Filter by specific technical capabilities to evaluate agency efficiency:
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
              onClick={() => setMatrixFilter('geo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'geo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              GEO & Search
            </button>
            <button
              onClick={() => setMatrixFilter('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'pricing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pricing & Ownership
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 w-1/4">Web Tonic</th>
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
                    {row.webtonic}
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
          The 5 Best Web Tonic Alternatives Evaluated for 2026
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

      {/* 6. Lead Capture Tool */}
      <ToolLeadCapture
        title="Request Your Free Website Speed & Conversion Audit"
        subtitle="Uncover hidden latency bottlenecks in template websites and see the incremental revenue gained from sub-second Next.js engineering."
        badge="Free Web Speed Audit"
        ctaText="Get Free Website Speed & Conversion Audit"
        toolSource="compare-webtonic-alternatives"
        reportSummary={{
          headline: "Web Tonic vs Full-Stack Next.js Evaluation (2026)",
          metrics: {
            "Competitor Target": "Web Tonic Template Builds",
            "Alternative Model": "AJPR World Custom Edge Engineering"
          }
        }}
      />

      {/* 7. FAQs */}
      <section className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions: Choosing a Web Tonic Alternative
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
          Ready to Upgrade to Sub-Second Software Engineering?
        </h3>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Rebuild your digital presence on modern Next.js 16 edge infrastructure with 100% transparent pricing and complete source code ownership.
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

      {/* Floating Sticky Conversion Bar */}
      {showStickyDock && (
        <aside
          aria-label="Sticky Quote Audit Offer"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl p-3 sm:p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white shadow-2xl flex items-center justify-between gap-3 animate-fade-up"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate text-white">Evaluating a Web Tonic proposal?</div>
              <div className="text-[11px] text-slate-300 truncate">Free 48-hr scope, tech stack & fee audit.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" className="bg-[#E05A36] hover:bg-orange-600 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-md cursor-pointer shrink-0" asChild>
              <Link href="/free-audit?source=webtonic-sticky">
                Audit Quote Free &rarr;
              </Link>
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}

