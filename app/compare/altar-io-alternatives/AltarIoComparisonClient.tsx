'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, 
  Sparkles, Cpu, Clock, Layers, Rocket, Terminal, Zap, Check, 
  HelpCircle, ChevronRight, Calculator, FileCode, Server, Database, Lock, Eye
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

interface AltarIoComparisonClientProps {
  topAlternatives: AlternativeItem[];
  faqs: FaqItem[];
}

export default function AltarIoComparisonClient({
  topAlternatives,
  faqs,
}: AltarIoComparisonClientProps) {
  // Interactive Calculator State
  const [scopeType, setScopeType] = useState<'lean' | 'agent' | 'saas'>('lean');
  const [teamSize, setTeamSize] = useState<number>(2);

  // Filter tab for comparison matrix
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'cost' | 'speed' | 'tech'>('all');

  // Interactive Architecture Tab
  const [archTab, setArchTab] = useState<'ajpr' | 'legacy'>('ajpr');

  // Dynamic calculations based on scope
  const scopeConfig = {
    lean: {
      label: 'Lean AI MVP (RAG / Knowledge Assistant)',
      altarCost: 45000,
      altarWeeks: 12,
      altarDiscoveryWeeks: 4,
      ajprCost: 4500,
      ajprWeeks: 3,
      ajprDiscoveryDays: 2,
      description: 'Single-purpose AI utility, semantic search with pgvector, document ingestion, and authenticated Next.js dashboard.',
    },
    agent: {
      label: 'Autonomous Multi-Agent Workflow',
      altarCost: 75000,
      altarWeeks: 16,
      altarDiscoveryWeeks: 6,
      ajprCost: 7500,
      ajprWeeks: 4,
      ajprDiscoveryDays: 3,
      description: 'Multi-step autonomous agent pipelines (lead routing, CRM sync, autonomous code/email generation) with error guardrails.',
    },
    saas: {
      label: 'Full AI SaaS Platform (Multi-Tenant)',
      altarCost: 95000,
      altarWeeks: 20,
      altarDiscoveryWeeks: 6,
      ajprCost: 12500,
      ajprWeeks: 6,
      ajprDiscoveryDays: 3,
      description: 'Multi-tenant architecture, Stripe subscription billing, granular RBAC permissions, vector similarity search, and admin telemetry.',
    },
  };

  const currentScope = scopeConfig[scopeType];
  const runwaySaved = currentScope.altarCost - currentScope.ajprCost;
  const weeksSaved = currentScope.altarWeeks - currentScope.ajprWeeks;
  const savingsPercent = Math.round((runwaySaved / currentScope.altarCost) * 100);

  // Comparison matrix rows
  const matrixRows = [
    {
      category: 'cost',
      metric: 'Typical Project Investment',
      altar: '$40,000 – $90,000+ ($120–$180/hr)',
      ajpr: '$4,500 Sprint or $5,500/mo Pod',
      legacy: '$35,000 – $75,000',
      ajprWinner: true,
      note: '70% to 90% capital savings directed toward growth',
    },
    {
      category: 'speed',
      metric: 'Discovery vs Delivery Timeline',
      altar: '4–6 wks discovery + 8–10 wks build (12–16 wks total)',
      ajpr: '48h constraint scoping + 2–4 wks deployment',
      legacy: '4 wks discovery + 12 wks build',
      ajprWinner: true,
      note: 'Functional software in users hands 3 months sooner',
    },
    {
      category: 'tech',
      metric: 'Core Technology Stack',
      altar: 'Angular, React, Node.js, standard REST',
      ajpr: 'Next.js 16 App Router, React 19, TypeScript, PostgreSQL (Neon / Supabase), pgvector',
      legacy: 'PHP, Django, WordPress, Express',
      ajprWinner: true,
      note: 'Edge-rendered, sub-second TTFB, 99+ Core Web Vitals',
    },
    {
      category: 'tech',
      metric: 'AI-Native Architecture & Vector DB',
      altar: 'Generic third-party API integration',
      ajpr: 'Native pgvector HNSW indexing, semantic caching, token cost optimizer & agent swarms',
      legacy: 'Basic OpenAI wrapper (if supported)',
      ajprWinner: true,
      note: 'Enterprise-grade RAG with 60% lower token burn',
    },
    {
      category: 'cost',
      metric: 'Code & IP Ownership',
      altar: 'Assigned on final contract settlement',
      ajpr: '100% Client GitHub repo from Day 1 (Full IP transfer)',
      legacy: 'Varied (often withheld until final signoff)',
      ajprWinner: true,
      note: 'Zero agency lock-in, zero proprietary software licenses',
    },
    {
      category: 'speed',
      metric: 'Direct Senior Engineer Channel',
      altar: 'Account managers & project coordinators',
      ajpr: 'Direct Slack channel with Senior Engineers & AI Architects',
      legacy: 'Tiered ticketing and email support',
      ajprWinner: true,
      note: 'Zero telephone game; instant technical execution',
    },
    {
      category: 'tech',
      metric: 'AI Search (GEO) & Citation Readiness',
      altar: 'None (Engineering only)',
      ajpr: 'Full Generative Engine Optimization (ChatGPT, Perplexity, Gemini citations)',
      legacy: 'None (Requires separate SEO agency)',
      ajprWinner: true,
      note: 'Built-in visibility across modern AI search engines',
    },
    {
      category: 'cost',
      metric: 'Post-Launch Warranty & Support',
      altar: 'Separate monthly maintenance contract ($2k–$5k/mo)',
      ajpr: '30-Day Post-Launch Warranty Included Free',
      legacy: 'Hourly billable maintenance ($150/hr)',
      ajprWinner: true,
      note: 'Guaranteed post-launch peace of mind',
    },
  ];

  const filteredRows = matrixRows.filter((r) => matrixFilter === 'all' || r.category === matrixFilter);

  return (
    <div className="space-y-16">
      {/* Interactive Quick Verdict Card (Above-The-Fold Extraction Engine) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-950 border border-blue-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Executive Benchmark Audit
            </div>
            <span className="text-xs font-mono text-slate-400">
              Verified: Q1 2026 Agency Cost Standards
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Quick Verdict: Why Ambitious Startups Switch from Altar.io to AJPR World
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            According to AJPR World's 2026 Startup Studio Benchmark, while <strong>Altar.io</strong> provides thorough product scoping for early validation, their <strong>$40,000 – $90,000+ budgets</strong> and <strong>10–16 week timelines</strong> (including 4–6 weeks of discovery workshops before writing a single line of code) burn crucial startup runway.
          </p>

          {/* Primary Verdict Feature Card */}
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Typical MVP Budget</div>
              <div className="text-xl font-mono font-black text-white">$4,500 <span className="text-xs text-emerald-400 font-semibold font-sans">(-90% vs $45k+)</span></div>
              <div className="text-xs text-slate-400">Fixed-price sprint, zero hidden fees</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Speed to Working Code</div>
              <div className="text-xl font-mono font-black text-white">2 – 4 Weeks <span className="text-xs text-emerald-400 font-semibold font-sans">(-10 wks faster)</span></div>
              <div className="text-xs text-slate-400">48h constraint scoping + immediate build</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Code & IP Guarantee</div>
              <div className="text-xl font-mono font-black text-emerald-400">100% Client Owned</div>
              <div className="text-xs text-slate-400">Private GitHub repository from Day 1</div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200">
                <strong>Need your AI MVP launched this month?</strong> Schedule a 30-min architecture scoping call.
              </div>
            </div>
            <Link
              href="/book-call"
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all text-center shrink-0"
            >
              Book 30-Min Strategy Call <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Tool: Startup Runway & Timeline Calculator */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" /> Interactive ROI Simulator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calculate Your Runway & Time Savings (Altar.io vs AJPR World)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Select your software architecture scope to compare upfront capital requirements, discovery delays, and launch dates:
          </p>
        </div>

        {/* Scope Type Selector */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { id: 'lean', title: 'Lean AI MVP', subtitle: 'RAG / AI Utility', price: '$4,500' },
            { id: 'agent', title: 'AI Automation System', subtitle: 'Automated Workflows', price: '$7,500' },
            { id: 'saas', title: 'Full AI SaaS', subtitle: 'Multi-Tenant & Stripe', price: '$12,500' },
          ].map((scope) => (
            <button
              key={scope.id}
              onClick={() => setScopeType(scope.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                scopeType === scope.id
                  ? 'bg-blue-600/10 border-blue-600 dark:border-blue-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">{scope.subtitle}</span>
                <span className={`text-xs font-mono font-bold ${scopeType === scope.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                  {scope.price}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{scope.title}</h3>
            </button>
          ))}
        </div>

        {/* Scope Description Banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
          <strong>Scope Definition:</strong> {currentScope.description}
        </div>

        {/* Side-by-Side Savings Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Altar.io Traditional Card */}
          <div className="p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Altar.io / Traditional Studio</span>
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                ${currentScope.altarCost.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Average contract budget required</p>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Discovery Workshops:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{currentScope.altarDiscoveryWeeks} Weeks (No Code)</span>
              </div>
              <div className="flex justify-between">
                <span>Total Delivery Timeline:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{currentScope.altarWeeks} Weeks (~{Math.round(currentScope.altarWeeks / 4)} Mos)</span>
              </div>
              <div className="flex justify-between">
                <span>Hourly Equivalent:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">$120 – $180/hr</span>
              </div>
            </div>
          </div>

          {/* AJPR World High-Velocity Card */}
          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border-2 border-blue-600 dark:border-blue-500 space-y-4 relative shadow-lg">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              High Velocity
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">AJPR World Fixed Sprint</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-3xl font-mono font-black text-blue-600 dark:text-blue-400">
                ${currentScope.ajprCost.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Flat fixed price, 100% full repo transfer</p>
            </div>
            <div className="space-y-2 pt-2 border-t border-blue-200 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Scoping & Constraints:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentScope.ajprDiscoveryDays} Days Alignment</span>
              </div>
              <div className="flex justify-between">
                <span>Total Delivery Timeline:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentScope.ajprWeeks} Weeks Guaranteed</span>
              </div>
              <div className="flex justify-between">
                <span>Tech Stack:</span>
                <span className="font-bold text-slate-900 dark:text-white">Next.js 16 + PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Capital & Runway Saved Summary */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">Your Startup Advantage</span>
              <div className="text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-2">
                ${runwaySaved.toLocaleString()}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Runway preserved ({savingsPercent}% savings)</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Launch <strong>{weeksSaved} weeks sooner</strong> to validate with real buyers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Invest preserved ${runwaySaved.toLocaleString()} into customer acquisition</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero agency markup or junior developer rotation</span>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer" asChild>
              <Link href="/book-call">Claim This Sprint Scope</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Inspector: Modern Edge vs Legacy Monolith */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" /> Technical Deep Dive
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Architecture Comparison: Edge AI Stack vs Legacy Monolith
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inspect how AJPR World engineers AI software compared to standard agency stacks:
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0">
            <button
              onClick={() => setArchTab('ajpr')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                archTab === 'ajpr' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              AJPR World (Edge AI)
            </button>
            <button
              onClick={() => setArchTab('legacy')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                archTab === 'legacy' ? 'bg-rose-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Altar.io / Legacy Agency
            </button>
          </div>
        </div>

        {archTab === 'ajpr' ? (
          <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-blue-50/50 dark:bg-slate-950 border border-blue-200 dark:border-blue-500/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs uppercase font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Modern Sub-Second AI Architecture
              </div>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">01. Next.js 16 App Router:</span>
                  <span>Server Components stream responses with sub-45ms TTFB and zero client bundle bloat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">02. PostgreSQL + pgvector:</span>
                  <span>HNSW indexing for instant cosine similarity vector queries without expensive third-party vector lock-in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">03. Semantic Caching Layer:</span>
                  <span>Deduplicates recurring user queries, saving 40% to 60% on OpenAI / Anthropic token costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">04. Generative Engine Optimization:</span>
                  <span>Built-in ItemList & FAQ JSON-LD graphs ensure AI search engines (Perplexity, ChatGPT) cite your app.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto space-y-1">
              <div className="text-slate-500">// Example: Edge Semantic Search with pgvector</div>
              <div className="text-purple-400">import <span className="text-white">&#123; sql &#125;</span> from <span className="text-emerald-400">&apos;@/lib/db&apos;</span>;</div>
              <div className="text-purple-400">export async function <span className="text-blue-400">findRelevantContext</span>(queryVector: number[]) &#123;</div>
              <div className="pl-4 text-slate-400">const embedding = JSON.stringify(queryVector);</div>
              <div className="pl-4 text-slate-400">return await sql`</div>
              <div className="pl-8 text-emerald-300">SELECT id, content, 1 - (embedding &lt;=&gt; $&#123;embedding&#125;::vector) AS similarity</div>
              <div className="pl-8 text-emerald-300">FROM kb_embeddings</div>
              <div className="pl-8 text-emerald-300">WHERE 1 - (embedding &lt;=&gt; $&#123;embedding&#125;::vector) &gt; 0.82</div>
              <div className="pl-8 text-emerald-300">ORDER BY similarity DESC LIMIT 5;</div>
              <div className="pl-4 text-slate-400">`;</div>
              <div className="text-purple-400">&#125;</div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-rose-50/50 dark:bg-slate-950 border border-rose-200 dark:border-rose-500/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs uppercase font-bold">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Traditional Monolithic Architecture
              </div>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-rose-400 font-bold shrink-0">01. Heavy Monolithic Backends:</span>
                  <span>Heavy containerized Django/Express APIs with 600ms+ cold starts and high server idle expenses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-rose-400 font-bold shrink-0">02. Disconnected Vector SaaS:</span>
                  <span>Separate Pinecone or Weaviate subscriptions incurring $100+/mo recurring overhead before launch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-rose-400 font-bold shrink-0">03. Zero Semantic Caching:</span>
                  <span>Every user interaction hits raw LLM APIs, resulting in compounding $500–$2,000 monthly token bills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-rose-400 font-bold shrink-0">04. No AI Search Architecture:</span>
                  <span>Zero GEO or structured entity data, leaving the product invisible on Perplexity, Copilot, and ChatGPT.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-2">
              <div className="text-rose-400 font-bold">Architecture Constraints:</div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Average Mobile TTFB:</span>
                <span className="text-rose-400 font-bold">1,250ms (Slow)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Lighthouse Performance:</span>
                <span className="text-amber-400 font-bold">58 / 100</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Monthly Cloud Overhead:</span>
                <span className="text-rose-400 font-bold">$350 – $750/month</span>
              </div>
              <div className="flex justify-between">
                <span>Codebase Portability:</span>
                <span className="text-slate-400">Proprietary scaffolding</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Filterable Detailed Comparison Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Detailed Feature Matrix: Altar.io vs AJPR World vs Traditional Dev Shops
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Filter by category to evaluate pricing, delivery timelines, and engineering depth:
            </p>
          </div>

          {/* Matrix Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium overflow-x-auto">
            {[
              { id: 'all', label: 'All Criteria' },
              { id: 'cost', label: 'Cost & Runway' },
              { id: 'speed', label: 'Speed & Timeline' },
              { id: 'tech', label: 'Tech Stack & IP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMatrixFilter(tab.id as any)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  matrixFilter === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 w-1/4">Altar.io</th>
                <th className="p-4 w-1/4 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold">
                  AJPR World (Senior Pod)
                </th>
                <th className="p-4 w-1/4">Traditional Dev Shops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{row.metric}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{row.note}</div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {row.altar}
                  </td>
                  <td className="p-4 bg-blue-50/40 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white">
                    <div className="flex items-start gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {row.ajpr}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {row.legacy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Evaluated Top 5 Altar.io Alternatives Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Review: Top 5 Altar.io Alternatives in 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Independent evaluations based on cost transparency, engineering depth, and startup speed:
          </p>
        </div>

        <div className="space-y-4">
          {topAlternatives.map((alt, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all ${
                i === 0
                  ? 'bg-gradient-to-r from-blue-50/80 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900 border-blue-500/40 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">0{i + 1}.</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{alt.name}</h3>
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                        #1 Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                    {alt.description}
                  </p>
                </div>

                <Link
                  href={alt.url}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    i === 0
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {i === 0 ? 'Book Strategy Call' : 'Explore Profile'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Embed */}
      <section>
        <ToolLeadCapture
          title="Download the 2026 AI Product Studio Selection Guide & RFP Checklist"
          subtitle="Get our 12-point engineering scope checklist, vector database cost calculator, and vendor evaluation matrix used by 50+ startup founders."
          badge="Free Engineering Guide"
          ctaText="Download Studio Selection Guide & Checklist"
          toolSource="compare-altar-io-alternatives"
          reportSummary={{
            headline: "Altar.io Alternative & MVP Studio Evaluation (2026)",
            metrics: {
              "Target Agency": "Altar.io Discovery Workshops",
              "Alternative Model": "AJPR World 2–4 Week AI Sprints ($4,500)"
            }
          }}
        />
      </section>

      {/* Cross-Link Silo Hub */}
      <section className="p-8 rounded-3xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Explore Related Engineering Benchmarks & Agency Comparisons
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Data-driven reports, pricing calculators, and objective evaluations to inform your software decisions:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            href="/compare/rootstrap-alternatives"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">AI Studio Audit</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Rootstrap Alternatives</h4>
            <p className="text-xs text-slate-500 mt-1">Comparing $50k–$150k enterprise quotes vs agile sprints.</p>
          </Link>

          <Link
            href="/pricing/website-cost"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Pricing Guide</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Website Cost Calculator</h4>
            <p className="text-xs text-slate-500 mt-1">Interactive breakdown for web builds from $3,500 to $45,000+.</p>
          </Link>

          <Link
            href="/services/website-maintenance-cost"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">SLA Breakdown</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Maintenance Costs 2026</h4>
            <p className="text-xs text-slate-500 mt-1">Transparent retainer benchmarks ($149 – $899/mo) with 24/7 SLA.</p>
          </Link>

          <Link
            href="/compare/webfx-alternatives"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Competitor Audit</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">WebFX Alternatives</h4>
            <p className="text-xs text-slate-500 mt-1">Comparing MarketingCloudFX software lock-in vs open source.</p>
          </Link>

          <Link
            href="/pricing/seo-cost"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Growth Retainers</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">SEO & GEO Cost Guide</h4>
            <p className="text-xs text-slate-500 mt-1">Generative Engine Optimization tiers from $1,500/month.</p>
          </Link>

          <Link
            href="/tools/agency-pricing-calculator"
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
          >
            <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Free Calculator</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Agency ROI Estimator</h4>
            <p className="text-xs text-slate-500 mt-1">Calculate true savings of pods vs in-house $200k hires.</p>
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions: Choosing an Altar.io Alternative
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center shadow-xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Launch Your AI MVP in 2–4 Weeks
        </h2>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Eliminate $60,000 consulting markups and lengthy discovery phases. Build with senior engineers, modern Next.js 16 architecture, and complete code ownership.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-call"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Book 30-Min Strategy Call
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white font-bold rounded-xl text-sm transition-all"
          >
            View Transparent Sprint Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
