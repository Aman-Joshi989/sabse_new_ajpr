'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sprout, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  Eye, 
  Compass, 
  TrendingUp, 
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export interface CoreValueItem {
  id: string
  name: string
  tagline: string
  description: string
  metric: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

export const CORE_VALUES: CoreValueItem[] = [
  {
    id: 'inspiration',
    name: 'Inspiration',
    tagline: 'Bold Innovation & Modern Architectures',
    description: 'We reject cookie-cutter templates and conventional thinking. We bring relentless creative energy and frontier AI architectures to every project, inspiring breakthroughs that leave competitors behind.',
    metric: 'Pioneering AI & Next.js 16 Stacks',
    icon: Sparkles,
    gradient: 'from-amber-500 to-rose-500'
  },
  {
    id: 'disciplined',
    name: 'Disciplined',
    tagline: 'Rigorous Engineering & Predictable Delivery',
    description: 'World-class software requires unwavering discipline. From strict type safety and automated CI/CD test gates to sub-second edge rendering, we maintain zero tolerance for sloppy code or missed deadlines.',
    metric: '100% Type-Safe & Automated Test Gates',
    icon: ShieldCheck,
    gradient: 'from-rose-600 to-red-600'
  },
  {
    id: 'accountability',
    name: 'Accountability',
    tagline: 'Total Ownership of Every Business Outcome',
    description: 'We take end-to-end ownership of what we engineer. No finger-pointing, no excuses, and zero vendor ghosting. If an edge case appears, our senior team steps up, resolves it rapidly, and guarantees system stability.',
    metric: 'Direct Senior Architect Access & SLA',
    icon: Scale,
    gradient: 'from-red-600 to-purple-600'
  },
  {
    id: 'transparency',
    name: 'Transparency',
    tagline: '100% Open Repositories, Metrics, & Pricing',
    description: 'Radical honesty at every phase. Clients maintain full ownership of git repositories, unedited analytics dashboards, and clear milestone-based pricing with zero hidden software markups or lock-ins.',
    metric: 'Zero Vendor Lock-In & Open Git Access',
    icon: Eye,
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'aligned',
    name: 'Aligned',
    tagline: 'One Mission: Your Revenue & Market Dominance',
    description: 'We act as an integrated engineering pod within your leadership team. Every architectural choice, database schema, and campaign system is synchronized with your specific business revenue objectives.',
    metric: 'Synchronized with Business Bottom Line',
    icon: Compass,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'results-oriented',
    name: 'Results Oriented',
    tagline: 'Obsessed with Speed, Conversions, & Measurable ROI',
    description: 'We measure success not by billable hours logged, but by tangible commercial impact: sub-second page latency, organic search dominance, automated hours saved, and high-converting customer pipelines.',
    metric: '0.4s Edge Latency & Top Search Ranks',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-600'
  }
]

interface CoreValuesSectionProps {
  className?: string
  showDetailedGrid?: boolean
  showCta?: boolean
}

export default function CoreValuesSection({
  className = '',
  showDetailedGrid = true,
  showCta = true
}: CoreValuesSectionProps) {
  return (
    <section 
      aria-labelledby="core-values-heading"
      className={`relative py-20 md:py-28 overflow-hidden bg-slate-50/60 dark:bg-[#070b14] border-y border-slate-200/80 dark:border-slate-800/80 ${className}`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 dark:bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-bold tracking-wide uppercase mb-5">
            <Sprout className="w-3.5 h-3.5" />
            <span>Our Non-Negotiable Foundation</span>
          </div>

          <h2 
            id="core-values-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            The Principles That Drive <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Every System We Build
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            At AJPR WORLD, these six core values govern our engineering culture, client relationships, and operational execution. They ensure we consistently out-deliver conventional agencies.
          </p>
        </div>

        {/* Dual Layout: Signature Minimalist Card (Left) + High-Performance Value Pillars (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Signature Authentic Core Values Card (matching the brand graphic) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/40 p-8 sm:p-10 backdrop-blur-xl">
              
              {/* Header with Crimson Sprout Icon */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 shrink-0">
                  <Sprout className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-red-700 dark:text-red-500">
                    Core Values
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    AJPR WORLD Operating Code
                  </p>
                </div>
              </div>

              {/* Clean Checklist as in Reference */}
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-2" role="list">
                {CORE_VALUES.map((val, idx) => (
                  <li 
                    key={val.id}
                    className="py-4 sm:py-4.5 flex items-center justify-between group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 px-3 -mx-3 rounded-xl transition-colors cursor-default"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3.5] text-white dark:text-slate-950" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-rose-400 transition-colors">
                        {val.name}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Trust Subtext */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:divide-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified standard across all client contracts and engineering sprints.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Execution Context (Why This Matters for Your Business) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-white to-rose-50/30 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-rose-950/20 border border-slate-200/90 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-black/30">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-rose-400">
                The Agency Paradigm Shift
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 mb-4 tracking-tight">
                Why Conventional Agencies Fail & How Our Values Protect You
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6">
                Most businesses have suffered through agencies that overpromise in the pitch and underdeliver in the sprint—sloppy code, lack of accountability, opaque retainer fees, and zero measurable ROI.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6">
                We designed AJPR WORLD to be the absolute antithesis of that broken model. By anchoring every sprint to these six values, we ensure seamless communication, rapid technical velocity, and complete strategic alignment with your growth targets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sub-Second Execution</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Optimized architectures built for speed and instant conversion.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Total IP Ownership</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">You own 100% of the code, data schemas, and assets we build.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100%</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Code Ownership</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">&lt;0.5s</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Global Latency</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">0</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Vendor Lock-In</div>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed 6-Pillar Value Grid */}
        {showDetailedGrid && (
          <div className="mt-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                How Each Value Translates Into Client Advantage
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Every principle directly improves code quality, reduces operational friction, and accelerates time-to-market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((val) => {
                const Icon = val.icon
                return (
                  <motion.div
                    key={val.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-rose-500/40 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {val.metric}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-rose-400 transition-colors">
                        {val.name}
                      </h4>
                      <p className="text-xs font-semibold text-red-600/90 dark:text-rose-400/90 mt-1 mb-3">
                        {val.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {val.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>Strict Standard</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        Active in every sprint <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Optional Action CTA */}
        {showCta && (
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-4">
                Want to partner with an engineering pod that lives these values every day?
              </span>
              <Button asChild className="rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 shadow-md shadow-red-600/20">
                <Link href="/book-call">
                  Book a Strategy Call <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

