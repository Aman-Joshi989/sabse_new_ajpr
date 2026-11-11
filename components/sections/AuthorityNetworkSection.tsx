'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Cloud, 
  Calculator, 
  DollarSign, 
  Globe, 
  Scale, 
  User, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRegion } from '@/components/providers/RegionProvider';

export default function AuthorityNetworkSection() {
  const { isIndia } = useRegion();

  const clusters = [
    {
      title: "Core Engineering Sprints",
      description: "Direct systems architecture, full-stack Next.js platforms, and production AI models with 100% code ownership.",
      icon: Code2,
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      links: [
        { title: "Custom Web Development", href: "/services/web-development", note: "Next.js, Tailwind, APIs" },
        { title: "AI MVP & Autonomous Systems", href: "/ai-systems", note: "LangGraph, RAG, agents" },
        { title: "Website Security & Maintenance", href: "/services/website-security-maintenance", note: "24/7 SLA, zero-day patching" },
        { title: "Technical SEO & GEO Optimization", href: "/services/technical-seo", note: "Core Web Vitals, entity graphs" },
        { title: "SaaS Product Architecture", href: "/services/saas-product-development", note: "Multi-tenant, Stripe billing" },
        { title: "Cloud DevOps & Infrastructure", href: "/services/cloud-solutions", note: "AWS, GCP, 99.99% uptime" },
      ]
    },
    {
      title: "Cost Calculators & Audits",
      description: "Objective financial models, ROI estimators, and interactive engineering tools built for founders.",
      icon: Calculator,
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      links: [
        { title: "Website Cost Calculator 2026", href: "/pricing/website-cost", note: "SMB vs. Enterprise scope" },
        { title: "SEO & AI Search Retainer Guide", href: "/pricing/seo-cost", note: isIndia ? "₹49,999/mo benchmarks" : "$1,500/mo benchmarks" },
        { title: "Agency vs. In-House Estimator", href: "/tools/agency-pricing-calculator", note: "Compare real payroll tax" },
        { title: "Hidden Admin Drag Calculator", href: "/tools/admin-cost-calculator", note: "Audit lost founder hours" },
        { title: "SaaS Bloat Diagnostic", href: "/tools/saas-bloat-audit", note: "Eliminate unused seats" },
        { title: "Free 48-Hour Architecture Audit", href: "/free-audit", note: "Codebase & schema review" },
      ]
    },
    {
      title: "Global Delivery & Metro Hubs",
      description: "On-the-ground regional engineering knowledge, local time-zone overlap, and verified business billing.",
      icon: Globe,
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      links: [
        { title: "Singapore Technology Hub", href: "/locations/singapore/ppc-agency", note: "Marina Bay & One-North" },
        { title: "London Software Studio", href: "/locations/london/custom-software", note: "UK & European sprints" },
        { title: "Haldwani Regional Center", href: "/locations/haldwani/digital-marketing", note: "Uttarakhand & North India" },
        { title: "New York & Austin Hubs", href: "/locations/new-york/web-development", note: "US EST/CST overlap" },
        { title: "San Francisco Engineering", href: "/locations/san-francisco/custom-software", note: "PST compatible sprints" },
        { title: "Explore All Metro Locations", href: "/locations", note: "10+ global tech hubs" },
      ]
    },
    {
      title: "Alternative Benchmarks",
      description: "Data-backed architectural comparisons against traditional legacy agencies and offshore shops.",
      icon: Scale,
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      links: [
        { title: "WebFX Alternatives Comparison", href: "/compare/webfx-alternatives", note: "Pricing & code ownership" },
        { title: "Rootstrap Alternatives Review", href: "/compare/rootstrap-alternatives", note: "MVP sprint velocity" },
        { title: "Web Tonic Alternatives Audit", href: "/compare/webtonic-alternatives", note: "Next.js vs. WordPress" },
        { title: "Agency Comparisons Directory", href: "/compare", note: "Objective 2026 reports" },
        { title: "Full Transparent Pricing", href: "/pricing", note: "Fixed sprints & retainers" },
        { title: "Client Delivery Portfolio", href: "/portfolio", note: "Case studies & repos" },
      ]
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800/80 relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
            Engineering & Architecture Graph
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            The AJPR World Knowledge & Services Network
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Explore our interconnected engineering ecosystem—from custom software architectures and verified cost calculators to global metro hubs and direct founder scoping.
          </p>
        </div>

        {/* 4-Cluster Authority Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {clusters.map((cluster, idx) => {
            const Icon = cluster.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/70 dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cluster.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {cluster.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {cluster.description}
                  </p>

                  {/* Contextual Deep Links */}
                  <ul className="space-y-2.5">
                    {cluster.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link 
                          href={link.href}
                          className="group block p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 transition-all"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <span>{link.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-500" />
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            {link.note}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Verified 2026 Spec</span>
                  <Link href={cluster.links[0].href} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    View cluster &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Human Leadership Anchor Bar */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative shrink-0">
              <Image
                src="/images/aman-joshi-profile.png"
                alt="Aman Joshi"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Online"></span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Led by Systems Architect Aman Joshi
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Every project is architected and code-reviewed directly by senior engineers. Zero sales middlemen, 100% IP ownership.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link 
              href="/aman-joshi"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Read Architect Bio
            </Link>
            <Link 
              href="/book-call"
              className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              Book 30-Min Strategy Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
