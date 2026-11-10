"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';
import { useRegion } from '@/components/providers/RegionProvider';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  features: any;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "AI MVP 2–4 Week Sprint",
    slug: "ai-mvp-sprint",
    description: "Production-ready custom AI agent system, Next.js 16 architecture, and full vector database integration.",
    price: 4500,
    currency: "USD",
    features: [
      "2 to 4 Week Rapid Deployment",
      "Next.js 16 & TypeScript Architecture",
      "Vector Embeddings & RAG Ingestion",
      "PostgreSQL Database & Auth",
      "100% Full IP & GitHub Transfer",
      "30-Day Post-Launch Support"
    ]
  },
  {
    id: 2,
    name: "AI Business Automation Systems",
    slug: "ai-business-automation",
    description: "Automated workflow pipelines, CRM synchronization, inbound lead triage, and custom API integrations.",
    price: 7500,
    currency: "USD",
    features: [
      "Custom Automated Workflow Pipelines",
      "Automated Inbound Lead Qualification",
      "CRM & Slack / WhatsApp Integration",
      "Deterministic Business Logic & Guardrails",
      "API Rate-Limiting & Cost Governance",
      "Production Deployment & Monitoring"
    ]
  },
  {
    id: 3,
    name: "Full-Stack Web Engineering",
    slug: "web-engineering-sprint",
    description: "Sub-second Next.js web application, custom backend API, responsive design system, and 99+ Core Web Vitals.",
    price: 3500,
    currency: "USD",
    features: [
      "Sub-150ms TTFB Global Edge Stack",
      "Next.js App Router & Tailwind CSS",
      "PostgreSQL / Supabase Database Architecture",
      "Automated CI/CD Deployment Gates",
      "Full Source Code & Git Ownership",
      "14 to 21 Day Delivery Window"
    ]
  },
  {
    id: 4,
    name: "Growth & SEO Engineering",
    slug: "growth-seo-retainer",
    description: "Generative Engine Optimization (GEO), programmatic SEO hubs, Core Web Vitals maintenance, and high-converting funnel optimization.",
    price: 1500,
    currency: "USD",
    features: [
      "Generative Engine Optimization (GEO)",
      "Programmatic Next.js Search Hubs",
      "JSON-LD Schema & AI Search Citations",
      "Sub-Second Latency Maintenance",
      "Bi-Weekly Engineering Sprints",
      "Direct Senior Architect Slack Access"
    ]
  }
];

export default function PricingClient({ products = [] }: { products?: Product[] }) {
  const activeProducts = products && products.length > 0 ? products : DEFAULT_PRODUCTS;
  const { addToCart, setIsCartOpen } = useCart();
  const { isIndia } = useRegion();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    const finalPrice = isIndia ? Math.round(Number(product.price) * 85) : Number(product.price);
    addToCart({
      type: 'package',
      name: product.name,
      price: finalPrice,
      details: product.description,
      quantity: 1,
      currency: isIndia ? 'INR' : 'USD'
    });
    setIsCartOpen(true);
  };

  const getFeatures = (featuresJson: any) => {
    if (!featuresJson) return [];
    try {
      return typeof featuresJson === 'string' ? JSON.parse(featuresJson) : featuresJson;
    } catch (e) {
      return [];
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<'ai' | 'engineering'>('ai');

  const aiProducts = activeProducts.filter(p => 
    p.slug.startsWith('ai-') || p.slug.includes('business-system')
  );
  const engineeringProducts = activeProducts.filter(p => 
    !p.slug.startsWith('ai-') && !p.slug.includes('business-system')
  );

  const displayedProducts = selectedCategory === 'ai' 
    ? (aiProducts.length > 0 ? aiProducts : activeProducts)
    : (engineeringProducts.length > 0 ? engineeringProducts : activeProducts);

  return (
    <div className="py-24 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider"
          >
            Fixed-Scope Implementation & Transparent Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            High-Performance Systems, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Upfront Investment.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
          >
            No hidden fees, no opaque hourly billing. Choose production-grade AI Agent systems or custom engineering.
          </motion.p>

          {/* Category Switcher */}
          <div className="mt-10 inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'ai'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              AI Automation & Agent Systems
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:bg-white/20 dark:text-white font-bold ml-1">HOT</span>
            </button>
            <button
              onClick={() => setSelectedCategory('engineering')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'engineering'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Web Apps & Custom Engineering
            </button>
          </div>
        </div>

        {/* AI Interactive Banner if AI selected */}
        {selectedCategory === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-100/70 via-indigo-50/70 to-purple-100/70 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-blue-200 dark:border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <div className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Live Interactive Demo</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Experience the AI Sales Command Center Simulator</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Test live lead qualification, instant scoring, CRM ingestion, and guardrail routing before you buy.</p>
            </div>
            <a
              href="/ai-systems#simulator"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold whitespace-nowrap shadow-lg shadow-blue-500/30 transition-all"
            >
              Launch Simulator Demo →
            </a>
          </motion.div>
        )}

        <div className={`grid gap-8 max-w-7xl mx-auto ${displayedProducts.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {displayedProducts.map((product, index) => {
            const features = getFeatures(product.features);
            const isPopular = selectedCategory === 'ai' ? index === 2 : index === 1;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-3xl p-7 backdrop-blur-sm border transition-all duration-300 flex flex-col justify-between ${
                  isPopular || hoveredId === product.id 
                    ? 'bg-white dark:bg-slate-800/90 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]' 
                    : 'bg-white/90 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-md dark:shadow-none'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    RECOMMENDED
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-6 min-h-[48px] leading-relaxed">{product.description}</p>
                  
                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {isIndia 
                        ? `₹${Math.round(Number(product.price) * 85).toLocaleString('en-IN')}`
                        : `$${Number(product.price).toLocaleString('en-US')}`}
                    </span>
                    <span className="text-slate-500 ml-2 text-xs uppercase font-medium">{isIndia ? 'INR' : (product.currency || 'USD')}</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {isIndia ? 'One-time sprint • GST invoice included' : 'One-time implementation'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-xs leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isPopular || hoveredId === product.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent'
                  }`}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Select System
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Managed AI Retainers Section if AI selected */}
        {selectedCategory === 'ai' && (
          <div className="max-w-7xl mx-auto mt-20 p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider mb-2">Layer 4: Continuous Ops</div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Managed AI Operations & Retainers
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Keep your AI agents, webhook listeners, and automation pipelines performing at 99.9% uptime with prompt optimization and proactive maintenance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Maintenance Tier</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$199<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">24/7 uptime monitoring, error alerts, webhook repair & token monitoring.</p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> 24/7 Uptime & Error Monitoring</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Webhook & API Token Health</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> 24-Hour SLA Response</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => {
                    addToCart({
                      type: 'package',
                      name: 'AI Maintenance Retainer',
                      price: 199,
                      details: '24/7 uptime monitoring, webhook error fixes, and health verification',
                      quantity: 1
                    });
                    setIsCartOpen(true);
                  }}
                  variant="outline" 
                  className="w-full border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Add Maintenance ($199/mo)
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/50 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">POPULAR</div>
                <div>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Growth & Tuning</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$499<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Continuous prompt engineering, 2 new sub-workflows/mo & bi-weekly sync.</p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Everything in Maintenance</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> 2 New Custom Automations/Month</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Monthly Prompt & Temperature Tuning</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> 8-Hour SLA Priority</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => {
                    addToCart({
                      type: 'package',
                      name: 'AI Growth & Tuning Retainer',
                      price: 499,
                      details: '2 new workflows/mo, monthly prompt tuning, 8-hour SLA',
                      quantity: 1
                    });
                    setIsCartOpen(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Add Growth Retainer ($499/mo)
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Dedicated AI Pod</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {isIndia ? '₹49,999' : '$999'}
                    <span className="text-xs text-slate-500 font-normal">/mo</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    {isIndia ? 'Fractional Head of AI & Automation with direct WhatsApp/Slack channel & 2h SLA.' : 'Fractional Head of AI & Automation with private Slack channel & 2h SLA.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Unlimited Workflow Optimizations</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> {isIndia ? 'Dedicated WhatsApp & Slack Channel' : 'Dedicated Private Slack Channel'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> 2-Hour Critical Response SLA</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" /> Executive Monthly Analytics Briefing</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => {
                    addToCart({
                      type: 'package',
                      name: 'Dedicated AI Engineering Pod',
                      price: isIndia ? 49999 : 999,
                      details: isIndia ? 'Fractional Head of AI, private WhatsApp/Slack channel, 2h SLA' : 'Fractional Head of AI, private Slack channel, 2-hour SLA',
                      quantity: 1,
                      currency: isIndia ? 'INR' : 'USD'
                    });
                    setIsCartOpen(true);
                  }}
                  variant="outline" 
                  className="w-full border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isIndia ? 'Add Dedicated Pod (₹49,999/mo)' : 'Add Dedicated Pod ($999/mo)'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 2026 Transparent Cost & Retainer Guides */}
        <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Explore Dedicated 2026 Cost & Retainer Guides
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              We believe in radical pricing transparency. Check real retainer breakdowns, hourly rates, and ROI expectations for every marketing channel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/pricing/seo-cost"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm dark:shadow-none transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider mb-2">SEO Retainers</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                How Much Does SEO Cost? (2026 Guide) →
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isIndia 
                  ? 'Realistic retainers range from ₹24,999 to ₹1,49,000/mo. Compare hourly vs project vs ongoing performance tiers.'
                  : 'Realistic retainers range from $1,500 to $10,000/mo. Compare hourly vs project vs ongoing performance tiers.'}
              </p>
            </a>

            <a
              href="/pricing/ppc-cost"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm dark:shadow-none transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider mb-2">Google & Meta Ads</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                PPC Management Cost Breakdown →
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isIndia
                  ? 'Discover standard flat fees (₹24,999–₹75,000/mo) vs % of ad spend (10-20%) with zero media markups.'
                  : 'Discover standard flat fees ($1,500–$5,000/mo) vs % of ad spend (10-20%) with zero media markups.'}
              </p>
            </a>

            <a
              href="/pricing/website-cost"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm dark:shadow-none transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider mb-2">Web Design Scope</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                Custom Website Cost Guide (2026) →
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isIndia
                  ? 'From ₹1,49,000 startup sites to ₹5,00,000+ custom Next.js platforms. See exact scope and timeline deliverables.'
                  : 'From $3,500 startup sites to $25,000+ custom Next.js platforms. See exact scope and timeline deliverables.'}
              </p>
            </a>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-sm font-bold text-slate-900 dark:text-white">Need a customized agency budget projection?</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Calculate recommended monthly retainers and projected 12-month revenue with our free calculator.</div>
            </div>
            <a
              href="/tools/agency-pricing-calculator"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Open Agency ROI Calculator →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
