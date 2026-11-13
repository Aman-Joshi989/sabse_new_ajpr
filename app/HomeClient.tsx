'use client'

import React, { useState } from 'react'
import { 
  ArrowRight, Database, Code2, Cpu, GitMerge, Layout, Layers, ShieldCheck, 
  CheckCircle, CheckCircle2, Terminal, Globe, Smartphone, Lock, Cloud, Sparkles, 
  Mail, DollarSign, Zap, AlertCircle, Calculator, Bot, HelpCircle, Check, Calendar, ArrowUpRight, Clock, ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import HeroSection from '@/components/sections/HeroSection'
import CoreValuesSection from '@/components/sections/CoreValuesSection'
import AccountabilityPledgeSection from '@/components/sections/AccountabilityPledgeSection'
import AuthorityNetworkSection from '@/components/sections/AuthorityNetworkSection'
import { HOMEPAGE_FAQS } from '@/lib/homepage-faqs'
import { trackBookCall } from '@/lib/analytics'
import { useRegion } from '@/components/providers/RegionProvider'

const MouseGlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden transition-colors ${className || ''}`}>
    {children}
  </div>
)

interface HomeClientProps {
  services?: any[];
  blogs?: any[];
  settings?: any;
}

export default function HomeClient({ services = [], blogs = [], settings }: HomeClientProps) {
  // Fallback static services if DB is empty
  const defaultServices = [
    {
      title: "Custom Web Development",
      description: "Engineering next-generation web applications, high-performance API architectures, and data-driven systems.",
      slug: "custom-web-development-ai-solutions",
      category: "Systems",
      keywords: ["React", "Next.js", "Node.js", "API Design"]
    },
    {
      title: "AI Chatbot Development",
      description: "Creating advanced LLM-powered virtual assistants with vector search integrations and flawless contextual retention.",
      slug: "ai-chatbot-development",
      category: "AI",
      keywords: ["LLM", "Vector DB", "RAG", "Automation"]
    },
    {
      title: "Business Automation",
      description: "Streamlining operational friction by orchestrating intelligent autonomous workflows and pipeline automation.",
      slug: "business-ai-automation",
      category: "Operations",
      keywords: ["Workflow", "CI/CD", "Zapier", "Scripting"]
    },
    {
      title: "SaaS Architecture",
      description: "Building commercial-grade multi-tenant software-as-a-service platforms equipped with robust subscription tiers.",
      slug: "saas-product-development",
      category: "Architecture",
      keywords: ["Multi-tenant", "Stripe", "Auth", "Scalable"]
    },
    {
      title: "Digital Growth SEO",
      description: "Fusing mathematical optimization with content generation to maximize online search engine reach.",
      slug: "ai-digital-marketing-services",
      category: "Growth",
      keywords: ["Technical SEO", "Core Web Vitals", "Content"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Deploying highly available, auto-scaling cloud architectures on AWS, GCP, and Vercel networks.",
      slug: "cloud-solutions",
      category: "Cloud",
      keywords: ["AWS", "GCP", "Docker", "Kubernetes"]
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const { isIndia, isUS, currencySymbol } = useRegion();

  const [activeScope, setActiveScope] = useState<'web' | 'ai' | 'saas' | 'growth'>('web');

  const scopeConfigs = {
    web: {
      title: "Custom Web Application",
      tagline: isIndia
        ? "High-speed Next.js platform, bespoke UI & scalable backend architecture"
        : "Ultra-fast Next.js platform, bespoke UI & edge API architecture",
      timeline: "2–3 Weeks",
      priceRange: isIndia ? "₹1,49,000 – ₹2,99,000" : "$4,500 – $7,500",
      stack: ["Next.js 15 (App Router)", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel Edge"],
      features: isIndia ? [
        "100% Code & GitHub Repository Transfer",
        "Sub-150ms TTFB & 99+ Core Web Vitals",
        "Custom API Integrations & Database Schema",
        "GST-Compliant Commercial Invoice",
        "30-Day Post-Launch Technical Warranty"
      ] : [
        "100% Code & GitHub Repository Ownership",
        "Sub-150ms TTFB & 99+ Core Web Vitals",
        "Custom API Integrations & Database Schema",
        "SEO-Engineered OpenGraph & Structured Schema",
        "30-Day Post-Launch Technical Warranty"
      ],
      idealFor: isIndia
        ? "Indian startups and scaling brands requiring an enterprise-grade digital platform."
        : "Ambitious companies requiring a lightning-fast, high-converting digital platform."
    },
    ai: {
      title: isIndia ? "Custom AI MVP & Automation" : "Custom AI MVP & Agents",
      tagline: isIndia
        ? "Intelligent AI workflows, WhatsApp/CRM bots & custom internal tooling"
        : "Autonomous multi-agent workflows, vector search & tool calling",
      timeline: "2–4 Weeks",
      priceRange: isIndia ? "₹1,85,000 – ₹3,49,000" : "$5,500 – $9,500",
      stack: ["OpenAI / Claude / Groq", "LangChain & LangGraph", "Pinecone / pgvector", "Next.js", "Python FastAPI"],
      features: [
        "Custom Contextual Agent Workflows",
        "Vector Embeddings & Document Retrieval (RAG)",
        "Autonomous Task Routing & API Execution",
        "API Guardrails & Cost-Limiting Governance",
        "Admin Monitoring & Prompt Evaluation Dashboard"
      ],
      idealFor: isIndia
        ? "Founders seeking to validate an AI product idea or automate repetitive business operations."
        : "Founders seeking to validate an AI product idea or automate repetitive internal operations."
    },
    saas: {
      title: "Full-Stack SaaS Platform",
      tagline: "Multi-tenant software with auth, subscriptions & billing portals",
      timeline: "3–4 Weeks",
      priceRange: isIndia ? "₹2,49,000 – ₹4,99,000" : "$7,500 – $14,000",
      stack: ["Next.js", "Supabase / PostgreSQL", isIndia ? "Stripe / Razorpay Billing" : "Stripe Billing", "Tailwind UI", "Docker"],
      features: isIndia ? [
        "Multi-Tenant User & Role Architecture",
        "Stripe / Razorpay Subscriptions & Invoicing",
        "Real-Time Database & Analytics Tables",
        "Secure Session Management & 2FA Ready",
        "Clean Modular Code Base Ready for Scale"
      ] : [
        "Multi-Tenant User & Role Architecture",
        "Stripe Subscriptions & Customer Portal",
        "Real-Time Database & Analytics Tables",
        "Secure Session Management & 2FA Ready",
        "Clean Modular Code Base Ready for Scale"
      ],
      idealFor: "SaaS startups ready to ship an MVP and charge monthly recurring subscriptions."
    },
    growth: {
      title: "Digital Growth & Search Engine",
      tagline: "Generative Engine Optimization & technical SEO for high organic reach",
      timeline: "1–2 Weeks Setup",
      priceRange: isIndia ? "₹24,999 – ₹49,999 / month" : "$2,500 / month",
      stack: ["Dynamic SEO Routes", "JSON-LD Rich Schema", "IndexNow Fast Indexing", "Ahrefs & Search Console"],
      features: [
        "Ranking Optimization for ChatGPT, Perplexity & Google",
        "Programmatic Landing Page Generation",
        "Automated Multi-Platform Social Syndication",
        "Technical Debt & Core Web Vitals Remediation",
        "Weekly Executive ROI & Conversion Reporting"
      ],
      idealFor: "Companies seeking compounding organic customer acquisition without massive ad spend."
    }
  };

  const currentScope = scopeConfigs[activeScope];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-slate-200 dark:selection:bg-slate-800 font-sans">
      <div className="w-full mx-auto">
        {/* 1. HERO SECTION */}
        <HeroSection services={displayServices} />

        {/* 2. INFINITE TRUST MARQUEE */}
        <section className="py-6 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden relative flex">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} aria-hidden={i > 0} className="flex items-center gap-12 px-6 text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> React & Next.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><Database className="w-4 h-4" /> PostgreSQL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><Cloud className="w-4 h-4" /> Cloud Infrastructure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> TypeScript</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200"><Cpu className="w-4 h-4" /> 99.99% Uptime</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </section>

        {/* 3. CORE VALUE PROPOSITIONS */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="mb-20 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">Built for scale, <br className="hidden md:block"/>not just presence.</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">As a Senior Software Engineering & AI Studio, we do not build static brochure sites. We architect high-concurrency digital platforms, automated backend workflows, and AI systems designed to compound revenue and scale without operational chaos.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Database,
                  title: "System Architecture",
                  desc: "We engineer data-heavy, scalable platforms designed to handle high concurrency without degrading performance."
                },
                {
                  icon: Code2,
                  title: "Execution-First",
                  desc: "Predictable deployment. We ship production-ready, enterprise-grade software free of technical debt and over-engineered bloat."
                },
                {
                  icon: Cpu,
                  title: "AI Automation",
                  desc: "We embed intelligent workflows into your core business logic, reducing manual overhead and multiplying product velocity."
                }
              ].map((prop, index) => (
                <MouseGlowCard
                  key={index}
                  className="space-y-6 p-8 border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-1 bg-white dark:bg-[#0a0f1c] rounded-2xl shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg">
                    <prop.icon className="w-6 h-6 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{prop.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prop.desc}</p>
                </MouseGlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* 3.2 THE TOTAL ACCOUNTABILITY PLEDGE */}
        <AccountabilityPledgeSection />

        {/* 3.5 INTERACTIVE SCOPE & SPRINT PLANNER */}
        <section className="py-16 md:py-20 bg-slate-50/70 dark:bg-[#070c18] border-y border-slate-200/80 dark:border-slate-800/80 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl mb-12">
              <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                Interactive Sprint Planner
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                What are you looking to build?
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                Select your project type below to see recommended architecture, estimated delivery timelines, and guaranteed deliverables.
              </p>
            </div>

            {/* Scope Selection Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { id: 'web', label: 'Web Application', icon: Code2, badge: 'Fast Launch' },
                { id: 'ai', label: 'AI MVP & Agents', icon: Cpu, badge: 'High Demand' },
                { id: 'saas', label: 'SaaS Platform', icon: Layers, badge: 'Full-Stack' },
                { id: 'growth', label: 'Growth & SEO', icon: Zap, badge: 'Compounding' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeScope === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveScope(tab.id as any)}
                    className={`p-4 md:p-5 rounded-2xl text-left transition-all duration-200 border relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-[#0d1527] border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                        : 'bg-white/60 dark:bg-[#0a0f1c]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {tab.badge}
                      </span>
                    </div>
                    <div>
                      <div className={`font-bold text-sm md:text-base ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {tab.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scope Details Interactive Card */}
            <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Overview & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {currentScope.title}
                      </h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        {currentScope.timeline} Sprint
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentScope.tagline}
                    </p>
                  </div>

                  {/* Architecture Stack */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                      Production Architecture Stack:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentScope.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                      Guaranteed Inclusions & Deliverables:
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {currentScope.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Timeline, Investment & Direct Action */}
                <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800/80 space-y-6">
                  <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      <span>Delivery Target</span>
                      <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                        <Clock className="w-3.5 h-3.5" /> Guaranteed
                      </span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                      {currentScope.timeline}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {currentScope.idealFor}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-md hover:shadow-lg transition-all text-sm gap-2"
                      asChild
                    >
                      <Link 
                        href={`/book-call?topic=${encodeURIComponent(currentScope.title)}`}
                        onClick={() => trackBookCall(`interactive_scope_${currentScope.title}`)}
                      >
                        <Calendar className="w-4 h-4 text-blue-500" />
                        Book Architecture Call for this Build
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </Link>
                    </Button>
                    <div className="text-center">
                      <Link 
                        href="/pricing" 
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                      >
                        Explore detailed cost breakdowns &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 4. THE 5 OPERATIONAL BOTTLENECKS WE ELIMINATE */}
        <section className="py-20 bg-slate-100/80 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 dark:from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl mb-16">
              <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                Engineering Outcomes
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                {isIndia ? (
                  <>The 5 Operational Bottlenecks <br className="hidden md:block" />We Eliminate for Indian Businesses.</>
                ) : (
                  <>The 5 Operational Bottlenecks <br className="hidden md:block" />We Eliminate for US Businesses.</>
                )}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {isIndia
                  ? "Most Indian founders, agency owners, and growing companies lose 20–40% of their operational velocity to administrative drag, fragmented software, and unreliable agencies. Here is how our engineering eliminates each bottleneck."
                  : "Most founders, agency owners, and growing companies lose 20–40% of their operational velocity to administrative drag, SaaS clutter, and delayed software execution. Here is how our engineering eliminates each bottleneck."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  number: "01",
                  title: "The Email & Admin Black Hole",
                  stat: isIndia ? "100+ messages/day • 10+ hrs/wk lost" : "120 emails/day • 11+ hrs/wk lost",
                  problem: isIndia
                    ? "Founders and professionals lose over 25% of their entire workweek triaging inboxes, chasing unpaid invoices, and answering repetitive WhatsApp queries."
                    : "US professionals lose over 28% of their entire workweek triaging inboxes, chasing late invoices, and answering repetitive client queries.",
                  solution: "We build custom autonomous triage agents and AI inboxes that handle repetitive communication in your exact brand tone.",
                  link: "/tools/client-response-generator",
                  linkText: "Try Free Email Drafter",
                  icon: Mail
                },
                {
                  number: "02",
                  title: "Wearing 5 Operational Hats",
                  stat: "20%–40% daily productivity tax",
                  problem: "Founders juggle customer service, sales, invoicing, social media, and IT daily. Rapid context-switching drains strategic focus.",
                  solution: "We architect automated backend pipelines that run on auto-pilot—from lead qualification to automated project onboarding.",
                  link: "/tools/admin-cost-calculator",
                  linkText: "Calculate Admin Cost",
                  icon: Calculator
                },
                {
                  number: "03",
                  title: "SaaS Bloat & Broken Integrations",
                  stat: isIndia ? "51% unused software • ₹40,000–₹1,50,000/mo waste" : "51% unused software • $500-$2,500/mo waste",
                  problem: "Paying for 10+ subscriptions (HubSpot, Zapier, Calendly, Airtable) where data gets siloed and connections constantly break.",
                  solution: "We consolidate your tech stack into a single, high-speed Next.js + PostgreSQL portal with zero per-seat licensing fees.",
                  link: "/tools/saas-bloat-audit",
                  linkText: "Audit Your SaaS Bloat",
                  icon: Layers
                },
                {
                  number: "04",
                  title: isIndia ? "High Tech Hiring Friction & Agency Overheads" : "Prohibitive US Labor Costs",
                  stat: isIndia ? "₹18L–₹35L/yr CTC + high attrition" : "$150k-$220k/yr + 28% overhead per dev",
                  problem: isIndia
                    ? "Hiring senior full-stack developers in Bengaluru, Mumbai, or Delhi costs ₹18L–₹35L CTC with 60-day notice periods, while standard agencies deliver slow, buggy WordPress templates."
                    : "US in-house engineering and domestic agencies charging $200/hr burn through startup runway in just 3 to 6 months.",
                  solution: isIndia
                    ? "Direct senior systems architecture (Aman Joshi & core engineers) delivering production Next.js apps & AI systems in 2–4 weeks at predictable flat INR sprint fees."
                    : "Direct senior systems architecture (Aman Joshi & core engineers) delivering production-grade MVPs in 14–30 days at 70% lower cost.",
                  link: "/book-call",
                  linkText: isIndia ? "Book Architecture Call (IST)" : "Book Architecture Call",
                  icon: DollarSign
                },
                {
                  number: "05",
                  title: "The AI Adoption Gap",
                  stat: "80% test ChatGPT • Only 18% deploy in production",
                  problem: "Businesses know AI saves money, but don't know how to connect LLMs to databases securely without 'automating chaos.'",
                  solution: "We deploy production-grade agentic workflows (LangGraph, custom RAG, vector databases) built for actual business ROI.",
                  link: "/tools/ai-cost-estimator",
                  linkText: "Estimate AI Project",
                  icon: Bot
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-8 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:shadow-none"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-bold">{item.number}</span>
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:bg-blue-600 transition-colors">
                          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.title}
                      </h3>

                      <div className="inline-block px-3 py-1 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs font-bold font-mono">
                        {item.stat}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        <strong className="text-slate-800 dark:text-slate-300">The Problem:</strong> {item.problem}
                      </p>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                        <strong className="text-blue-600 dark:text-blue-400">Our Solution:</strong> {item.solution}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/60">
                      <Link 
                        href={item.link}
                        className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 group-hover:translate-x-1 transition-all gap-1.5"
                      >
                        {item.linkText} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* Master Tools Box */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                    Free Toolkit
                  </span>
                  <h3 className="text-2xl font-black tracking-tight leading-tight">
                    {isIndia ? "Explore Our Free Business Productivity Suite" : "Explore Our Free US Productivity Suite"}
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Interactive calculators, audit tools, and template generators designed to eliminate operational friction and save you hours every week.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/20">
                  <Link 
                    href="/tools"
                    className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors shadow-md gap-2"
                  >
                    Open All Free Tools <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CORE ENGINEERING & AI SERVICES */}
        <section id="solutions" className="py-24 relative bg-slate-50/50 dark:bg-[#050914] border-y border-slate-200 dark:border-slate-800/80">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <Badge variant="outline" className="mb-6 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                  Our Expertise
                </Badge>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                  Engineering Capabilities
                </h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                  Deploying state-of-the-art architectures, custom intelligent models, and scaling infrastructures to drive your business forward.
                </p>
              </div>
              <div className="hidden md:block shrink-0">
                 <Button variant="outline" className="h-12 px-6 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1c] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold" asChild>
                    <Link href="/services" prefetch={false}>View All Solutions</Link>
                 </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayServices.slice(0, 3).map((service: any, index: number) => {
                const href = service.slug ? `/services/${service.slug}` : '#';
                const tag = service.category || "Solution";
                return (
                  <MouseGlowCard key={index} className="h-full bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800/80 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
                    <Link href={href} className="flex flex-col h-full p-8 md:p-10 relative z-10 group/link">
                      <div className="flex-grow space-y-6">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] rounded-full px-3 py-1">
                            {tag}
                          </Badge>
                          <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover/link:bg-blue-600 group-hover/link:border-blue-600 transition-all duration-300 shadow-sm">
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors group-hover/link:-rotate-45" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-4">
                            {service.description || service.desc}
                          </p>
                          {service.keywords && service.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {service.keywords.map((keyword: string, idx: number) => (
                                <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 px-2.5 py-1 rounded-md transition-colors group-hover/link:bg-blue-50 dark:group-hover/link:bg-blue-900/20 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                          Explore Solution
                        </span>
                        <div className="flex space-x-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-400 transition-colors delay-75"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-500 transition-colors delay-150"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-600 transition-colors delay-300"></span>
                        </div>
                      </div>
                    </Link>
                  </MouseGlowCard>
                );
              })}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                 <Button variant="outline" className="h-12 w-full px-6 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1c] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold" asChild>
                    <Link href="/services" prefetch={false}>View All Solutions</Link>
                 </Button>
            </div>
          </div>
        </section>

        {/* 6. PORTFOLIO CASE STUDIES */}
        <section className="py-16 md:py-20 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0f1c]">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Engineering Outcomes.</h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">Real architectural challenges transformed into scalable digital systems.</p>
              </div>
              <Link href="/portfolio" prefetch={false} className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-blue-600 transition-colors border-b border-slate-900 dark:border-white hover:border-blue-600 pb-1">
                View Architecture Log <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  title: "Project Fintech Schema",
                  category: "Backend Architecture",
                  impact: "Supported 100k+ concurrent users and reduced API latency by 45%.",
                  tags: ["Node.js", "PostgreSQL", "Microservices"],
                  image: "/images/visuals/fintech_backend.png"
                },
                {
                  title: "Logistics Routing Intelligence",
                  category: "AI Algorithms",
                  impact: "Automated routing logic, cutting manual operational costs significantly.",
                  tags: ["Python", "TensorFlow", "React"],
                  image: "/images/visuals/ai_logistics.png"
                },
                {
                  title: "Scalable Cloud Pipeline",
                  category: "Cloud Infrastructure",
                  impact: "Distributed high-availability deployments for a global scale.",
                  tags: ["AWS", "Docker", "Kubernetes"],
                  image: "/images/visuals/cloud_infrastructure.png"
                },
                {
                  title: "High-Performance Scaling Core",
                  category: "System Strategy",
                  impact: "Architected aggressive growth structure supporting massive surges.",
                  tags: ["Redis", "Load Balancing", "Golang"],
                  image: "/images/visuals/system_scaling.png"
                }
              ].map((study, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center transition-all">
                    <Image src={study.image} alt={study.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="space-y-3">
                    <Badge variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-bold text-[10px] uppercase bg-white dark:bg-[#030712]">{study.category}</Badge>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">{study.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{study.impact}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800/70 px-2.5 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6.5 TRANSPARENT ENGAGEMENT MODELS */}
        <section className="py-20 bg-white dark:bg-[#030712] relative border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mb-16">
              <Badge variant="outline" className="mb-4 border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                Transparent Pricing
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Predictable Sprints. Zero Agency Bloat.
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose between fixed-price rapid sprints or a dedicated senior engineering pod. Every plan includes 100% code ownership and sub-150ms performance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {/* Tier 1: Fixed MVP Sprint */}
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Fixed-Scope Delivery</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">MVP Sprint</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">For founders & teams needing a launch-ready product shipped fast.</p>
                  </div>
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {isIndia ? "₹1,49,000" : "$4,500"}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold ml-2">/ one-off sprint</span>
                    {isIndia && <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">GST Tax Invoicing Included</div>}
                  </div>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Guaranteed 2–4 Week Delivery</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Full GitHub Repo & IP Transfer</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Next.js 15, PostgreSQL & API Backend</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> 99+ Core Web Vitals Guaranteed</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> 30-Day Post-Launch Warranty</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <Button className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs" asChild>
                    <Link href="/book-call?topic=MVP%20Sprint" onClick={() => trackBookCall('home_pricing_mvp_sprint')}>Book Sprint Scoping</Link>
                  </Button>
                </div>
              </div>

              {/* Tier 2: Dedicated Engineering Pod */}
              <div className="p-8 rounded-3xl bg-blue-50/50 dark:bg-[#0c1424] border-2 border-blue-600 dark:border-blue-500 shadow-xl relative flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  Most Popular
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Continuous Velocity</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">Dedicated Engineering</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {isIndia
                        ? "Replaces full-time tech hiring & ₹10L+ unpredictable agency billing."
                        : "Replaces full-time US hires & $20k/mo bloated agency retainers."}
                    </p>
                  </div>
                  <div className="pb-4 border-b border-blue-200 dark:border-blue-900/60">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {isIndia ? "₹1,85,000" : "$5,500"}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold ml-2">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" /> Senior Engineer + AI Architect Pod</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" /> Unlimited Tasks & Rapid Sprints</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" /> Direct Slack Channel & Daily Syncs</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" /> Full-Stack, AI Models & DevOps</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" /> Pause or Cancel Anytime (Zero Lock-In)</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-blue-200 dark:border-blue-900/60">
                  <Button className="w-full h-11 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs shadow-md" asChild>
                    <Link href="/book-call?topic=Dedicated%20Engineering" onClick={() => trackBookCall('home_pricing_dedicated_pod')}>Start Dedicated Pod</Link>
                  </Button>
                </div>
              </div>

              {/* Tier 3: Growth & AI Automation */}
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Compounding Reach</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">Growth & AI Retainer</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Engineered search dominance across Perplexity, ChatGPT & Google.</p>
                  </div>
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {isIndia ? "₹49,999" : "$2,500"}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold ml-2">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Generative Engine Optimization (GEO)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Technical SEO & Core Web Vitals Tuning</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Automated Multi-Platform Social Syndication</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Programmatic Content Architecture</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Weekly Executive Lead & Rank Reporting</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <Button variant="outline" className="w-full h-11 rounded-xl border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white" asChild>
                    <Link href="/book-call?topic=Growth%20Retainer" onClick={() => trackBookCall('home_pricing_growth_retainer')}>Explore Growth Retainer</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Investment Benchmarks & Calculator Direct Access */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">Transparent Engineering Benchmarks</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Explore interactive calculators and 2026 pricing breakdowns:</p>
                </div>
                <Link 
                  href="/pricing" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline shrink-0"
                >
                  View Full Pricing & Retainers <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Link
                  href="/pricing/website-cost"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                  <Calculator className="w-3.5 h-3.5 text-blue-500" />
                  Website Cost Calculator (2026)
                </Link>
                <Link
                  href="/pricing/seo-cost"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  SEO & AI Search Retainer Pricing
                </Link>
                <Link
                  href="/services/website-maintenance-cost"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  Website Maintenance Cost Breakdown
                </Link>
                <Link
                  href="/tools/agency-pricing-calculator"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Agency vs In-House ROI Estimator
                </Link>
                <Link
                  href="/tools/saas-bloat-audit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-500" />
                  SaaS Bloat & Waste Audit Tool
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6.8 COMPETITOR COMPARISON MATRIX */}
        <section className="py-20 bg-slate-50/70 dark:bg-[#070c18] border-b border-slate-200 dark:border-slate-800 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mb-12">
              <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                Competitive Breakdown
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Why Ambitious Brands Choose Us Over Legacy Agencies.
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                See how AJPR World stacks up against 500-person legacy agencies (like WebFX), slow traditional dev shops, and the exorbitant cost of in-house hiring.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f1c] shadow-xl">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider font-bold">
                    <th className="p-5 text-slate-600 dark:text-slate-400 w-1/4">Evaluation Metric</th>
                    <th className="p-5 text-slate-600 dark:text-slate-400 w-1/4">Legacy Agencies (e.g., WebFX)</th>
                    <th className="p-5 text-slate-600 dark:text-slate-400 w-1/4">
                      {isIndia ? "In-House Senior Dev (India)" : "In-House US Developer"}
                    </th>
                    <th className="p-5 bg-blue-600/10 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 w-1/4 border-l border-blue-200 dark:border-blue-800 font-extrabold">
                      AJPR World
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs md:text-sm">
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Delivery Velocity</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">3 to 6 months of scope creep & delays</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">3+ months hiring + 2 months onboarding</td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> 14 to 30 Days Guaranteed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Who Actually Works on It</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Junior account coordinator relaying to offshore pool</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Single dev (limited to one skillset)</td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Direct Senior Systems Engineers
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Contract Commitments</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">6 to 12-month non-cancellable lock-in</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Full-time salary + benefits + severance liability</td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Fixed Sprints or Month-to-Month
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Code & Data Ownership</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Proprietary platform lock-in (e.g., MarketingCloudFX)</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Company owns code</td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> 100% Client-Owned (Full Repo Transfer)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Total Investment</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">
                      {isIndia ? "₹45,000–₹1,50,000/mo + hidden scope creep" : "$5,000–$15,000/mo + software upsell fees"}
                    </td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">
                      {isIndia ? "₹18,00,000–₹32,00,000/yr CTC + hiring recruiter fees" : "$180,000–$240,000/yr + 28% overhead"}
                    </td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> {isIndia ? "₹1,49,000 sprint or ₹1,85,000/mo pod (Flat fee)" : "$4,500 sprint or $5,500/mo pod (70% savings)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-slate-900 dark:text-white">Technology Stack</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">WordPress, template builders, legacy PHP</td>
                    <td className="p-5 text-slate-600 dark:text-slate-400">Constrained to single engineer's stack</td>
                    <td className="p-5 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white border-l border-blue-200 dark:border-blue-800">
                      <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Next.js 15, PostgreSQL, AI Agents & Edge
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Agency Comparisons & Alternative Audits */}
            <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Objective Agency Alternatives &amp; Architecture Audits
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Independent breakdowns of trade agencies, legacy retainers, and proprietary software lock-in:
                  </p>
                </div>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline shrink-0"
                >
                  View All Agency Comparisons <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/compare/rootstrap-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  Rootstrap Alternatives (AI Studio Evaluation)
                </Link>
                <Link
                  href="/compare/altar-io-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  Altar.io Alternatives (Startup Studio Review)
                </Link>
                <Link
                  href="/compare/webtonic-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  Web Tonic Alternatives (2026 Evaluation)
                </Link>
                <Link
                  href="/compare/webfx-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  WebFX Alternatives & Retainer Audit
                </Link>
                <Link
                  href="/compare/smartsites-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  SmartSites Alternatives (PPC & CWV Audit)
                </Link>
                <Link
                  href="/compare/single-grain-alternatives"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  Single Grain Alternatives (SaaS & Tech SEO)
                </Link>
                <Link
                  href="/services/website-security-maintenance"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Website Security & 24/7 SLA Guarantee
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. HOW WE WORK */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">The Deployment Framework</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">A predictable engineering process that removes guesswork from complex builds.</p>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
              {[
                {
                  step: "01",
                  icon: Layout,
                  title: "Architecture & Scope",
                  desc: "We map constraints, define data models, and architect the exact backend infrastructure required to scale. Measure twice, code once."
                },
                {
                  step: "02",
                  icon: Code2,
                  title: "Agile Engineering",
                  desc: "We execute the build. Robust database structuring, secure APIs, and minimal front-end interfaces developed in high-velocity sprints."
                },
                {
                  step: "03",
                  icon: ShieldCheck,
                  title: "Deployment & Scaling",
                  desc: "We launch, perform rigorous load testing, and actively scale the infrastructure as your transactional volume compounds."
                }
              ].map((phase, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-[#030712] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm shadow-sm">
                    {phase.step}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0a0f1c] shadow-sm hover:shadow-md transition-shadow float-right group-odd:float-left">
                    <phase.icon className="w-6 h-6 text-slate-900 dark:text-white mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{phase.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CORE VALUES */}
        <CoreValuesSection />

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 bg-slate-50/50 dark:bg-[#070c18] border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                Clear Answers
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Everything you need to know about working with AJPR World, our delivery timelines, and intellectual property rights.
              </p>
            </div>

            <div className="space-y-4">
              {HOMEPAGE_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-2 shadow-xs"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-slate-900 dark:text-white text-base py-4 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 text-slate-600 dark:text-slate-400 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center p-6 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Have a specific question about your project?
              </p>
              <Link 
                href="/book-call" 
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Schedule a 15-minute quick discovery call &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 8.8 THE AUTHORITY & INTERNAL BACKLINK NETWORK */}
        <AuthorityNetworkSection />

        {/* 9. FINAL CTA SECTION */}
        <section className="py-24 relative text-center overflow-hidden bg-white dark:bg-[#030712]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              Stop Managing Tech Debt. <br />Start Scaling.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-xl mx-auto">
              Partner with dedicated senior engineers to build production-grade software and autonomous pipelines in weeks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 text-base rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold transition-all shadow-xl w-full sm:w-auto" asChild>
                <Link href="/book-call" prefetch={false} onClick={() => trackBookCall('home_bottom_cta')}>Book Free Strategy Call <ArrowRight className="w-5 h-5 ml-2"/></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold w-full sm:w-auto" asChild>
                <Link href="/pricing" prefetch={false}>Explore Pricing & Sprints</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
