'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
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

interface SingleGrainComparisonClientProps {
  topAlternatives: AlternativeItem[];
  faqs: FaqItem[];
}

export default function SingleGrainComparisonClient({
  topAlternatives,
  faqs,
}: SingleGrainComparisonClientProps) {
  const monthsId = useId();

  // Interactive Simulator State
  const [horizonMonths, setHorizonMonths] = useState<number>(12);
  const [saasTier, setSaasTier] = useState<'growth' | 'scale'>('growth');

  // Filter tab for comparison matrix
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'tech' | 'pricing' | 'programmatic'>('all');

  // Interactive Architecture Tab
  const [archTab, setArchTab] = useState<'ajpr' | 'singlegrain'>('ajpr');

  const singleGrainMonthly = saasTier === 'growth' ? 8500 : 15000;
  const ajprMonthly = saasTier === 'growth' ? 3500 : 5500;

  const totalSingleGrainCost = singleGrainMonthly * horizonMonths;
  const totalAjprCost = ajprMonthly * horizonMonths;
  const netCapitalSaved = totalSingleGrainCost - totalAjprCost;

  // Programmatic SEO scaling: 30-50 high-converting landing pages/mo with AJPR vs 4-6 manual blogs/mo
  const ajprProgrammaticPages = horizonMonths * 35;
  const singleGrainManualPosts = horizonMonths * 4;

  const comparisonRows = [
    {
      category: 'programmatic',
      feature: 'Programmatic SEO & Scaled Landing Pages',
      singlegrain: 'Manual freelance copywriting (4–6 posts/mo)',
      ajpr: 'Next.js 16 Programmatic Engine (30–50 pages/mo)',
      impact: '10x larger organic footprint across high-intent long-tail keywords',
    },
    {
      category: 'tech',
      feature: 'Hands-on Software & Codebase Access',
      singlegrain: 'No engineering; content and paid ads only',
      ajpr: 'Direct Full-Stack Next.js 16, React 19, and PostgreSQL commits',
      impact: 'Eliminates developer backlogs; we build landing pages and tools directly in your repo',
    },
    {
      category: 'tech',
      feature: 'Autonomous AI Agent & RAG Pipelines',
      singlegrain: 'Outsourced / third-party AI writing tools',
      ajpr: 'Custom LangGraph/pgvector AI search agents & lead routing',
      impact: 'Automates customer acquisition workflows with grounded AI data',
    },
    {
      category: 'pricing',
      feature: 'Retainer Pricing & Contract Terms',
      singlegrain: '$8,000 – $20,000/mo (Minimum 6–12 month contract)',
      ajpr: '$1,500 – $3,500/mo (Month-to-month, zero lock-in)',
      impact: 'Save $50,000–$100,000+ in agency overhead with 100% agility',
    },
    {
      category: 'programmatic',
      feature: 'Generative Engine Optimization (GEO)',
      singlegrain: 'Traditional SEO keyword tracking and backlink PR',
      ajpr: 'Full JSON-LD graphs, /llms.txt, AI Overview citation indexing',
      impact: 'Wins primary citations across ChatGPT, Perplexity, and Google AI',
    },
    {
      category: 'tech',
      feature: 'Web Performance & Core Web Vitals',
      singlegrain: 'Dependent on client’s internal dev team to implement',
      ajpr: 'Guaranteed 99/100 Core Web Vitals (sub-50ms TTFB)',
      impact: 'Directly improves conversion rates and organic search rank',
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
          <Sparkles className="w-4 h-4" /> Quick Verdict: Single Grain Alternatives at a Glance
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Why Tech & SaaS Founders Choose AJPR World over Single Grain in 2026
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          <p>
            While <strong>Single Grain</strong> is known for podcast branding and high-tier enterprise retainers ($8,000–$20,000/month), early-stage and high-growth SaaS companies need <strong>hands-on software development</strong>, <strong>sub-second Next.js speed</strong>, and <strong>programmatic search engines</strong> that build pipeline without burning cash.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Technical Execution</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Real Engineers</div>
              <p className="text-xs text-slate-500 mt-1">We commit directly to your GitHub repo, shipping custom Next.js features and interactive tools.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Scale Velocity</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">10x Output</div>
              <p className="text-xs text-slate-500 mt-1">Programmatic SEO generates hundreds of indexable landing pages vs 4 manual blog posts.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-400">Retainer Economics</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">60% Cost Reduction</div>
              <p className="text-xs text-slate-500 mt-1">Sprint retainers from $1,500–$3,500/mo with month-to-month flexibility and zero lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive SaaS Growth & Capital Preservation Simulator */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> Interactive SaaS Growth Simulator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Compare 12-Month SaaS Retainer Outlay & Programmatic Output
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Simulate total capital expenditure and programmatic keyword footprint between high-overhead branding agencies and agile technical growth engineering:
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">
              Growth Stage & Scope
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSaasTier('growth')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  saasTier === 'growth'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">B2B SaaS Growth</div>
                <div className="text-[11px] text-slate-500 mt-1">Single Grain: $8.5k/mo vs AJPR: $3.5k/mo</div>
              </button>
              <button
                onClick={() => setSaasTier('scale')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  saasTier === 'scale'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">Full-Funnel Scale</div>
                <div className="text-[11px] text-slate-500 mt-1">Single Grain: $15k/mo vs AJPR: $5.5k/mo</div>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={monthsId} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Growth Horizon (Months)
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                {horizonMonths} Months
              </span>
            </div>
            <input 
              id={monthsId}
              type="range" 
              min={3} 
              max={24} 
              step={1}
              value={horizonMonths}
              onChange={(e) => setHorizonMonths(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>3 Mos</span>
              <span>12 Mos (Standard Cycle)</span>
              <span>24 Mos</span>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">
              Single Grain Retainer Outlay
            </span>
            <div className="text-3xl font-black text-red-600 dark:text-red-400 mt-2">
              ${totalSingleGrainCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Delivers approx. <strong>{singleGrainManualPosts} manual blog articles</strong> and high overhead podcasts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              AJPR World Technical Retainer
            </span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
              ${totalAjprCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Delivers approx. <strong>{ajprProgrammaticPages} programmatic landing pages</strong>, full-stack Next.js code, and AI agents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 shadow-md">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Direct Capital Saved
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
              ${netCapitalSaved.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Runway preserved for hiring, paid acquisition experiments, or runway extension.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            Ready to scale your organic search footprint with real software engineering rather than just blog writing?
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0" asChild>
            <Link href="/book-call">
              Request Technical Growth Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3. Interactive Architecture & Programmatic Model Inspector */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Server className="w-3.5 h-3.5" /> Methodology Inspector
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Programmatic SEO & AI Agents vs Manual Content Agencies
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare how search acquisition is built and scaled between modern software engineering and traditional agency copywriting:
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
            AJPR World: Programmatic Code + AI Engine
          </button>
          <button
            onClick={() => setArchTab('singlegrain')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              archTab === 'singlegrain'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Single Grain: Manual Agency Retainer Model
          </button>
        </div>

        {archTab === 'ajpr' ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold tracking-wider">
                Full-Stack Technical Growth System
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold">
                10x Acquisition Velocity
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-1">
                  <Database className="w-4 h-4" /> Programmatic Hubs
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dynamic Search Architecture</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  We generate hundreds of data-driven, schema-validated landing pages (e.g., integrations, competitors, use-cases) powered by Next.js 16 App Router.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase mb-1">
                  <Cpu className="w-4 h-4" /> Generative AI (GEO)
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Search Citations</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Structured JSON-LD ItemList schemas and `/llms.txt` manifests built specifically to capture top citations in ChatGPT, Perplexity, and Google AI Overviews.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase mb-1">
                  <FileCode className="w-4 h-4" /> Direct GitHub Access
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Dev Bottlenecks</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Senior engineers write code directly into your repository. No tickets stuck in marketing backlog queues for months.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold tracking-wider">
                Legacy Agency Retainer Model
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                High Overhead & Slow Execution
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <Clock className="w-4 h-4" /> Slow Manual Output
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">4–6 Articles per Month</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Each article requires extensive editing rounds, multi-tier approvals, and produces low keyword footprint for high monthly fees.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <XCircle className="w-4 h-4" /> No Software Capability
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Marketing-Only Advice</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Agencies deliver recommendations in Google Docs, leaving implementation to your already overworked engineering team.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                  <DollarSign className="w-4 h-4" /> High Retainer Minimums
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">$8,000–$20,000/Month</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Substantial portion of retainer goes toward executive overhead, corporate branding, and multi-layered account management.
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
              onClick={() => setMatrixFilter('programmatic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'programmatic'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Programmatic SEO & GEO
            </button>
            <button
              onClick={() => setMatrixFilter('tech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'tech'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Code & Engineering
            </button>
            <button
              onClick={() => setMatrixFilter('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixFilter === 'pricing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pricing & Terms
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 w-1/4">Single Grain</th>
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
                    {row.singlegrain}
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
          The 5 Best Single Grain Alternatives Evaluated for 2026
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
        toolName="Single Grain Competitor & Programmatic SEO Audit"
        ctaText="Get Custom Programmatic SEO & Architecture Audit"
      />

      {/* 7. FAQs */}
      <section className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions: Choosing a Single Grain Alternative
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
          Ready to Scale Your SaaS Organic Footprint with Real Code?
        </h3>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Skip the $15,000 agency retainers for blog articles. Deploy automated programmatic SEO hubs, Next.js 16 sub-second speed, and Generative Engine Optimization.
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
