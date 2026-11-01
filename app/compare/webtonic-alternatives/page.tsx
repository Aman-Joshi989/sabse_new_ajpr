import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Scale, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Globe, Award, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Web Tonic Alternatives: 2026 Agency Comparison | AJPR',
  description: 'Looking for Web Tonic alternatives? Compare full-service US marketing capabilities, technical SEO depth, pricing transparency, and ROI reporting.',
  alternates: {
    canonical: 'https://ajprworld.com/compare/webtonic-alternatives',
  },
  openGraph: {
    title: 'Web Tonic Alternatives: 2026 Agency Comparison | AJPR',
    description: 'Looking for Web Tonic alternatives? Compare full-service US marketing capabilities, technical SEO depth, pricing transparency, and ROI reporting.',
    url: 'https://ajprworld.com/compare/webtonic-alternatives',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Tonic Alternatives Comparison - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Tonic Alternatives: 2026 Agency Comparison | AJPR',
    description: 'Objective comparison of Web Tonic vs senior engineering agencies: services, pricing, and results.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How does AJPR World differ from Web Tonic?',
    answer: 'While Web Tonic has built strong review volume and local trade presence (especially in Quebec and regional markets), AJPR World offers national full-service US coverage across all client segments, full-stack Next.js and Webflow development, Generative Engine Optimization (GEO), and proprietary link-earning research studies.'
  },
  {
    question: 'What platforms do you support compared to Web Tonic?',
    answer: 'Both agencies have strong Webflow and Shopify competencies. In addition, AJPR World specializes in custom Next.js 16 full-stack software, headless e-commerce architectures, and programmatic SEO hubs that scale to hundreds of landing pages.'
  },
  {
    question: 'Do you publish transparent pricing?',
    answer: 'Yes. Web Tonic generally keeps pricing hidden behind sales calls, whereas AJPR World publishes transparent retainer tiers starting from $1,500/month for localized growth and $3,500/month for scaling multi-channel brands.'
  }
];

export default function WebTonicAlternativesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Web Tonic Alternatives</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> Agency Evaluation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Web Tonic Alternatives: 2026 Agency Comparison
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Reviewing alternatives to Web Tonic? We analyze where Web Tonic excels, where technical gaps exist, and how AJPR World delivers broader US market reach, deeper technical SEO, and transparent pricing.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">Full-Service Growth Partner</div>
              <div className="text-2xl sm:text-3xl font-bold">National US Focus & Full-Stack Tech</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                From high-intent localized search to Generative Engine Optimization and custom Next.js web applications.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-600/25"
            >
              Get Custom Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Comparison Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Feature Comparison: Web Tonic vs AJPR World
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Capability</th>
                  <th className="p-4 w-1/3">Web Tonic</th>
                  <th className="p-4 w-1/3 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">AJPR World</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Geographic Market Focus</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Strong regional presence (Quebec trades & local services)</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Nationwide US focus across all client segments
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Content Strategy Depth</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Thin evergreen knowledgebase; primarily news-style updates</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Deep authoritative pillar hubs & original research studies
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">AI / Generative Engine Optimization</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Limited public GEO methodology</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated GEO optimization (ChatGPT & Perplexity citations)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Pricing Transparency</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Opaque; requires sales outreach</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Transparent fixed retainers & scope deliverables
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Interactive Free Tools</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">None visible</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Active suite of free calculators & audit utilities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Agency Alternatives & Pricing
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/webfx-alternatives" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              WebFX Alternatives & Pricing Comparison →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Scale With an Experienced US Partner</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base">
            Get an honest review of your search rankings, speed bottlenecks, and conversion funnels.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Claim Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
