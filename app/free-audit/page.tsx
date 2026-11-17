import { Metadata } from 'next';
import InstantAuditScanner from '@/components/InstantAuditScanner';
import { ShieldCheck, Zap, Video, ArrowRight, Star, Gauge } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Technical & Architecture Audit (48-Hr) | AJPR World',
  description: 'Submit your URL or GitHub repo. Lead Architect Aman Joshi records a 5-min teardown of your top 3 speed, query, and architecture bottlenecks in 48 hours.',
  alternates: {
    canonical: 'https://ajprworld.com/free-audit',
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
  },
};

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-20 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 space-y-12 sm:space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>Interactive Architecture & Speed Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Free Website Speed & Architecture Audit
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Run an instant 5-second diagnostic on your TTFB, security headers, and AI search readiness. Then get a <strong>personalized 5-minute video teardown</strong> from Founder & Lead Architect Aman Joshi.
          </p>
        </div>

        {/* Primary Interactive Engine: Instant Scanner */}
        <div className="max-w-4xl mx-auto">
          <InstantAuditScanner />
        </div>

        {/* Supporting Proof & Deliverables Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Instant Live Telemetry</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We test your live edge response, HSTS security headers, mobile Core Web Vitals, and JSON-LD schema density in real time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">5-Min Video Teardown</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aman Joshi inspects your DOM, queries, and network waterfall on video. Clear actionable fixes with zero sales pitches.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Free & Independent</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No junior account reps, no aggressive email sequences. Implement the recommendations yourself or partner with our senior pod.
            </p>
          </div>

        </div>

        {/* Verified Client Social Proof Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Verified Enterprise Results
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
            &ldquo;AJPR World rebuilt our core university portal to scale to 50,000+ students with zero downtime and sub-second speed. Their technical architecture review saved us months of engineering time and eliminated recurring server crashes.&rdquo;
          </p>

          <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <span>Dr. B. S. Bisht &bull; Kumaun University Nainital</span>
            <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold">
              View Case Study <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
