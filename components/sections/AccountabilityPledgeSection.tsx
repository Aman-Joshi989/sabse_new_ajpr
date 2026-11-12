'use client'

import React from 'react'
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Clock, 
  DollarSign, 
  Terminal, 
  ArrowRight,
  Sprout,
  Users2,
  FileCheck2,
  Zap,
  PhoneCall
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRegion } from '@/components/providers/RegionProvider'

export default function AccountabilityPledgeSection() {
  const { isIndia } = useRegion()

  const RESPONSIBILITY_PILLARS = [
    {
      icon: ShieldCheck,
      title: "30-Day Zero-Excuses Bug & Stability Warranty",
      promise: "Every sprint deliverable is covered by our 30-day post-launch warranty. If an edge case, latency bottleneck, or bug arises in our code, we fix it immediately on our own time.",
      legacyAgency: isIndia 
        ? "Bills ₹2,500–₹5,000/hr to fix their own oversights or claims it was 'out of scope.'" 
        : "Bills $150–$250/hr to fix their own oversights or claims it was 'out of scope.'",
      color: "emerald"
    },
    {
      icon: DollarSign,
      title: "Milestone-Locked Pricing (Zero Surprise Invoices)",
      promise: "The fixed milestone quote we agree on is the exact price you pay. Zero hidden change orders, zero billing for discovery decks, and zero monthly retainer traps.",
      legacyAgency: "Quotes low to win the bid, then floods you with unexpected scope change fees.",
      color: "blue"
    },
    {
      icon: Lock,
      title: "100% Private GitHub & Code IP Ownership",
      promise: "Every commit is pushed directly to your private company GitHub. You own 100% of the repository, database schemas, and documentation. Zero proprietary vendor lock-in.",
      legacyAgency: "Holds custom code hostage in closed hosting accounts to force indefinite lock-in.",
      color: "indigo"
    },
    {
      icon: Clock,
      title: "On-Time Sprint SLA (14 to 30 Days)",
      promise: "We ship functional, test-covered software in 2 to 4 week sprints. If we miss an agreed launch milestone due to our execution, we work without charge until it is live.",
      legacyAgency: "Endless 6-to-9 month timelines that burn startup runway before real users see software.",
      color: "purple"
    }
  ]
  return (
    <section 
      aria-labelledby="accountability-heading"
      className="py-20 md:py-28 relative overflow-hidden bg-slate-50/70 dark:bg-[#060a14] border-y border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Background Soft Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>The AJPR World Total Accountability Pledge</span>
          </div>

          <h2 
            id="accountability-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            We Don't Just Write Code. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              We Take 100% Responsibility For the Outcome.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Conventional agencies hide behind contract fine print, blame third-party tools, and vanish when issues occur. At AJPR WORLD, we assume complete ownership of your system architecture, delivery timelines, and post-launch stability.
          </p>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {RESPONSIBILITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                      Standard SLA
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block mb-0.5">
                            AJPR World Guarantee
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {pillar.promise}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span><strong className="text-slate-700 dark:text-slate-300">Conventional Agency:</strong> {pillar.legacyAgency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Enforced in Sprint Agreement</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    Non-Negotiable Standard <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* The Authentic Leadership Commitment Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5" /> Direct Personal Commitment
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                "We don't take on 50 clients at once. We take on 3 to 5 and assume 100% responsibility for their technical success."
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                When you partner with AJPR WORLD, your project is not passed down to interns or offshore subcontractors. You get a dedicated pod of senior full-stack and AI engineers with direct Slack/WhatsApp access and daily commits. If any deployment fails, our architects step in immediately until it’s resolved. That is our definition of authentic engineering.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-blue-400" />
                  <span>Direct Senior Pod Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>Mutual NDA & IP Transfer Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Sub-4h Response Time SLA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <Button 
                asChild
                className="h-13 py-3 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-red-600/25"
              >
                <Link href="/book-call">
                  <PhoneCall className="w-4 h-4 mr-2" /> Book 15-Min Direct Discovery Call <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>

              <Button 
                asChild
                variant="outline"
                className="h-12 rounded-2xl border-slate-700 bg-slate-800/70 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
              >
                <Link href="/pricing">
                  {isIndia ? 'Review Transparent Sprint Pricing (₹1,49,000+)' : 'Review Transparent Sprint Pricing ($4,500+)'}
                </Link>
              </Button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 Zero obligation • Confidential architecture scoping session
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

