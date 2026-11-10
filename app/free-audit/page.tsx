import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { ShieldCheck, Zap, BarChart3, Cpu, CheckCircle2, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Technical & Architecture Audit (48-Hr Turnaround) | AJPR World',
  description: 'Get an actionable technical architecture and web performance audit from senior engineers. Uncover bottlenecks, Core Web Vitals issues, and high-impact optimizations.',
  alternates: {
    canonical: 'https://ajprworld.com/free-audit'
  },
  openGraph: {
    title: 'Free Technical & Architecture Audit (48-Hr Turnaround) | AJPR World',
    description: 'Get an actionable technical architecture and web performance audit from senior engineers. Uncover bottlenecks, Core Web Vitals issues, and high-impact optimizations.',
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 sm:py-28 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Copy & Benefits */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>Zero-Cost Technical Review</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Is your tech stack holding back your revenue?
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                Apply for a comprehensive Technical, Architecture, & SEO Audit. Our senior engineering pod analyzes your system and delivers an actionable, 3-page roadmap to maximize speed, conversion, and scalability.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Performance & Core Web Vitals</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We pinpoint bottlenecks causing slow TTFB, FID lags, and dropped mobile Google rankings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Architecture & Data Schemas</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Senior review of database query indices, API latency limits, and security vulnerabilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">AI Readiness & Modern Next.js Sprints</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Evaluates LLM token efficiency, vector database options (pgvector), and 2–4 week MVP feasibility.
                  </p>
                </div>
              </div>
            </div>

            {/* Client Reassurance Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>100% Free & No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                <span>Delivered Within 24 Hours</span>
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
