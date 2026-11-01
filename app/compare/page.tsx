import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale, CheckCircle2, ShieldCheck, DollarSign, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Agency Comparisons & Alternatives Hub (2026) | AJPR',
  description: 'Objective, data-driven comparisons of top US digital marketing agencies, WebFX alternatives, pricing models, and agency selection frameworks.',
  alternates: {
    canonical: 'https://ajprworld.com/compare',
  },
  openGraph: {
    title: 'Agency Comparisons & Alternatives Hub (2026) | AJPR',
    description: 'Objective, data-driven comparisons of top US digital marketing agencies, WebFX alternatives, pricing models, and agency selection frameworks.',
    url: 'https://ajprworld.com/compare',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agency Comparisons & Alternatives Hub - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency Comparisons & Alternatives Hub (2026) | AJPR',
    description: 'Objective, data-driven comparisons of top US digital marketing agencies and WebFX alternatives.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const comparisons = [
  {
    title: 'Web Tonic Alternatives: 2026 Agency Evaluation',
    slug: '/compare/webtonic-alternatives',
    target: 'Web Tonic vs AJPR World vs Traditional Agencies',
    description: 'An objective review of Web Tonic’s regional trade strengths, full-service US marketing capabilities, Next.js engineering depth, and transparent pricing.',
    badge: 'Trending Search #1',
    highlights: ['US Market Reach', 'Deep Technical SEO', 'Transparent Retainers', 'Generative AI Citations']
  },
  {
    title: 'WebFX Alternatives & Competitor Review',
    slug: '/compare/webfx-alternatives',
    target: 'WebFX vs AJPR World vs Traditional Agencies',
    description: 'A fair, comprehensive analysis of WebFX pricing, MarketingCloudFX software lock-in, junior account rotation, and why modern brands choose agile specialist partners.',
    badge: 'Enterprise Review',
    highlights: ['Pricing Transparency', 'Direct Senior Access', 'Zero Software Lock-in', '100% Data Ownership']
  },
  {
    title: 'SmartSites Alternatives & Agency Review',
    slug: '/compare/smartsites-alternatives',
    target: 'SmartSites vs AJPR World',
    description: 'Compare SmartSites PPC management and WordPress builds against custom Next.js 16 architectures with sub-second Core Web Vitals and flat retainers.',
    badge: 'PPC & Speed Focus',
    highlights: ['Sub-1s Core Web Vitals', 'Custom Next.js vs WordPress', 'Transparent Ad Management', 'No Long Contracts']
  },
  {
    title: 'Single Grain Alternatives for Tech Startups',
    slug: '/compare/single-grain-alternatives',
    target: 'Single Grain vs AJPR World',
    description: 'Comparing Single Grain for SaaS and tech ventures? Discover an agile partner providing hands-on software development, AI agent pipelines, and high-velocity GEO.',
    badge: 'SaaS & AI Focus',
    highlights: ['Hands-on Software Engineering', 'AI Agent Workflows', '$1,500 - $3,500/mo Retainers', 'SaaS Growth Architecture']
  }
];

export default function CompareHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> Buyer’s Decision Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Digital Marketing Agency Comparisons & Alternatives
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Hiring the wrong digital marketing agency costs tens of thousands in lost revenue and wasted time. We publish objective, data-backed comparisons to help you select the ideal partner for your budget and growth stage.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="space-y-8 mb-20">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 w-fit">
                  {item.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">{item.target}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>

              <Link
                href={item.slug}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md"
              >
                Read Full Comparison Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Agency Selection Framework */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            5 Red Flags When Hiring a Digital Marketing Agency
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
            Before signing any contract, watch out for these common warning signs that indicate high overhead and poor execution:
          </p>

          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Proprietary Software Lock-in:</strong>
                Agencies that force you onto their internal platform (e.g. MarketingCloudFX) often keep your conversion and tracking history hostage if you leave.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Junior Account Rep Handoffs:</strong>
                The senior executive pitching you is rarely the person doing the work. You get handed off to a recent graduate managing 25+ accounts.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">12-Month Non-Cancellable Contracts:</strong>
                High-performing agencies earn your business every 30 days. If an agency demands an ironclad 12-month contract, they lack confidence in their retention.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Opaque Pricing & Hidden Media Markups:</strong>
                If the agency will not publish transparent retainer tiers or insists on billing ad spend through their own credit card, margins are being disguised.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">Vanity Keyword Metrics Over Revenue:</strong>
                Reporting on rankings for zero-intent keywords rather than qualified inbound calls, demo pipeline, and return on ad spend.
              </div>
            </div>
          </div>
        </section>

        {/* Related Research & Pricing Data */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Agency Pricing & Evaluation Benchmarks
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/research/agency-pricing-report" className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              2026 US Agency Pricing Report (214 Agencies) →
            </Link>
            <Link href="/tools/agency-pricing-calculator" className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Agency ROI & Retainer Calculator →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost →
            </Link>
            <Link href="/pricing" className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Transparent Pricing Packages →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 text-center border border-slate-800 shadow-xl">
          <h2 className="text-3xl font-extrabold mb-4">Want an Honest, Transparent Partner?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Work directly with senior growth strategists on flexible month-to-month terms with transparent pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
          >
            Schedule Strategy Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
