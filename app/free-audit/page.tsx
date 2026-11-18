import { Metadata } from 'next';
import InstantAuditScanner from '@/components/InstantAuditScanner';
import { 
  ShieldCheck, 
  Zap, 
  Video, 
  ArrowRight, 
  Star, 
  Gauge, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Lock,
  Code2
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Website Speed & Architecture Audit (48-Hr Teardown) | AJPR World',
  description: 'Instant 5-second diagnostic for TTFB, security headers, and AI citation readiness. Get a custom 5-minute video teardown by Founder Aman Joshi within 48 hours.',
  alternates: {
    canonical: 'https://ajprworld.com/free-audit',
  },
  openGraph: {
    title: 'Free Website Speed & Architecture Audit (48-Hr Teardown) | AJPR World',
    description: 'Instant 5-second diagnostic for TTFB, security headers, and AI citation readiness. Get a custom 5-minute video teardown by Founder Aman Joshi within 48 hours.',
    url: 'https://ajprworld.com/free-audit',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Technical & Architecture Audit | AJPR World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const AUDIT_FAQS = [
  {
    question: "How is this different from automated tools like Google PageSpeed Insights?",
    answer: "Automated scanners report generic scores like 'eliminate render-blocking resources' without context. Aman Joshi personally opens your application in Chrome DevTools and your network waterfall to show you the exact lines of code, bundle payloads, unindexed database queries, or uncompressed media causing the slowdown—plus word-for-word instructions on how your developers can fix them."
  },
  {
    question: "Is this genuinely 100% free with no sales pressure?",
    answer: "Yes, completely free. You will receive a private 5-minute Loom video directly in your inbox. There are zero pushy sales calls, no aggressive email sequences, and no credit card required. You can either hand the recommendations to your internal team to implement, or reach out if you'd like our senior pod to handle it in a fixed sprint."
  },
  {
    question: "What if our app is behind a login or staging environment?",
    answer: "If your platform requires authentication, simply provide temporary guest credentials or a staging link when submitting your email. We are also happy to execute a standard mutual NDA beforehand."
  },
  {
    question: "How fast do I receive my video teardown?",
    answer: "Every teardown is recorded and delivered within 48 hours on business days directly to your work email (or WhatsApp if requested). We limit intake to 5 audits per week to ensure senior architect-level attention for each review."
  }
];

export default function FreeAuditPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://ajprworld.com/free-audit#app',
        'name': 'AJPR World Instant Architecture & Speed Audit Scanner',
        'url': 'https://ajprworld.com/free-audit',
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'creator': {
          '@type': 'Person',
          'name': 'Aman Joshi',
          'jobTitle': 'Founder & Lead Architect',
          'url': 'https://ajprworld.com'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://ajprworld.com/free-audit#faq',
        'mainEntity': AUDIT_FAQS.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-20 relative overflow-hidden transition-colors duration-300">
      {/* Structured Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            Run an instant 5-second diagnostic on your TTFB, security headers, and AI search readiness. Then get a <strong>custom 5-minute video teardown</strong> delivered within <strong>48 hours</strong> by Founder & Lead Architect <strong>Aman Joshi</strong>.
          </p>
        </div>

        {/* Primary Interactive Engine: Instant Scanner */}
        <div className="max-w-4xl mx-auto">
          <InstantAuditScanner />
        </div>

        {/* Supporting Proof & Deliverables Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          
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

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-4">
            {AUDIT_FAQS.map((faq, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0">0{i+1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Founder Guarantee Strip */}
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Reviewed personally by Lead Architect Aman Joshi &bull; Strictly limited to 5 sites/week</span>
            </div>
            <Link 
              href="/book-call" 
              className="font-bold underline hover:text-blue-700 dark:hover:text-blue-300 shrink-0"
            >
              Prefer a live call? Book 15 mins &rarr;
            </Link>
          </div>

          {/* Related Architecture Exploration (Pages/Session Multiplier) */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">
              Explore Senior Engineering Sprints & Case Studies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/portfolio"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-2 group shadow-2xs"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                  <span>🏆 Client Case Studies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  See how we solved latency, database locking, and scaling bottlenecks for 50k+ active users.
                </p>
              </Link>

              <Link
                href="/pricing"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-2 group shadow-2xs"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                  <span>💰 Transparent Sprints</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Fixed sprint pricing, zero hourly agency bloat, and 100% code ownership in your GitHub repo.
                </p>
              </Link>

              <Link
                href="/tools/agency-pricing-calculator"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-2 group shadow-2xs"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                  <span>🧮 Agency ROI Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Calculate savings and velocity comparing traditional agencies vs senior studio engineering.
                </p>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
