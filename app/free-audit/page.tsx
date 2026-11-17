import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { ShieldCheck, Zap, BarChart3, Cpu, CheckCircle2, Clock, Star, Video, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Technical & Architecture Audit (48-Hr) | AJPR World',
  description: 'Submit your URL or GitHub repo. Lead Architect Aman Joshi records a 5-min teardown of your top 3 speed, query, and architecture bottlenecks in 48 hours.',
  alternates: {
    canonical: 'https://ajprworld.com/free-audit'
  },
  openGraph: {
    title: 'Free Technical & Architecture Audit (48-Hr) | AJPR World',
    description: 'Submit your URL or GitHub repo. Lead Architect Aman Joshi records a 5-min teardown of your top 3 speed, query, and architecture bottlenecks in 48 hours.',
    url: 'https://ajprworld.com/free-audit',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Technical & SEO Audit | AJPR World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Copy, Deliverables & Verified Social Proof */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-4">
                <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>Zero-Cost Engineering Teardown</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Free 48-Hour Systems & Code Architecture Audit
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                Submit your staging URL, live app, or GitHub repository. Founder & Lead Architect Aman Joshi will record a <strong>personalized 5-minute video teardown</strong> identifying your 3 biggest performance bottlenecks, query flaws, and bundle bloat.
              </p>
            </div>

            {/* What You Receive Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Video className="w-4 h-4" /> What You Receive Within 48 Hours:
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>5-Minute Loom Video Walkthrough:</strong> Code & network inspection showing exact lines and scripts slowing you down.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Core Web Vitals & Latency Breakdown:</strong> Real-device diagnostics on TTFB, TBT, and Largest Contentful Paint (LCP).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>3 High-Leverage Fixes:</strong> Clear actionable roadmap you can implement with your team immediately.</span>
                </div>
              </div>
            </div>

            {/* Verified Client Social Proof Card */}
            <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Verified Client Results
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;AJPR World rebuilt our core university portal to scale to 50,000+ students with zero downtime and sub-second speed. Their technical architecture review saved us months of engineering time.&rdquo;
              </p>
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between pt-1">
                <span>Dr. B. S. Bisht &bull; Kumaun University Nainital</span>
                <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold">
                  View Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Client Reassurance Bar */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>100% Free &bull; No Sales Call</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                <span>Delivered Within 48 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Side: Lead Form */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2rem] blur-xl opacity-20 pointer-events-none" />
            <div className="relative">
              <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
