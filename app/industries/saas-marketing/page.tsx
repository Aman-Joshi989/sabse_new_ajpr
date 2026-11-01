import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Laptop, CheckCircle2, ArrowRight, Zap, Target, Cpu, TrendingUp, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'SaaS Marketing Agency: SEO, Demand Gen & Growth | AJPR',
  description: 'Scale product-led and enterprise SaaS pipeline. Technical SEO, GEO search optimization, and high-intent product comparison hubs that convert demos.',
  alternates: {
    canonical: 'https://ajprworld.com/industries/saas-marketing',
  },
  openGraph: {
    title: 'SaaS Marketing Agency: SEO, Demand Gen & Growth | AJPR',
    description: 'Scale product-led and enterprise SaaS pipeline. Technical SEO, GEO search optimization, and high-intent product comparison hubs that convert demos.',
    url: 'https://ajprworld.com/industries/saas-marketing',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SaaS Marketing Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Marketing Agency: SEO, Demand Gen & Growth | AJPR',
    description: 'Bottom-of-funnel SaaS demand generation, programmatic comparison hubs, and pipeline velocity.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How do SaaS companies drive high-intent demo signups from SEO?',
    answer: 'Instead of targeting top-of-funnel informational keywords that rarely convert, we focus on bottom-of-funnel commercial terms: "competitor alternatives", "[product] vs [competitor]", integration queries, and specific use-case software queries where buyers are actively comparing solutions.'
  },
  {
    question: 'What is Generative Engine Optimization (GEO) for SaaS brands?',
    answer: 'GEO ensures your SaaS product is cited when enterprise decision-makers ask ChatGPT, Google AI Overviews, or Perplexity for software recommendations. We optimize technical entity schemas, Wikipedia/Wikidata entity associations, and third-party software reviews.'
  },
  {
    question: 'How long does it take for a SaaS marketing campaign to impact ARR?',
    answer: 'Bottom-of-funnel comparison and alternative pages typically begin indexing and converting within 60 to 90 days. Mid-market and enterprise sales cycles (30-90 days) mean pipeline compounding accelerates substantially between months 4 and 9.'
  },
  {
    question: 'Do you handle technical documentation and developer SEO?',
    answer: 'Yes. For developer-focused and API-first SaaS companies, public documentation and API reference pages often drive the highest organic signups. We audit headless architectures, Next.js rendering, and canonical structures to maximize doc crawlability.'
  }
];

export default function SaasMarketingPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'B2B SaaS Digital Marketing & Demand Gen',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'Global',
    description: 'Data-driven B2B SaaS demand generation, programmatic comparison hubs, technical SEO, and AI search visibility.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-saas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/industries" className="hover:text-blue-600 transition-colors">Industries</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">SaaS Marketing</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Laptop className="w-3.5 h-3.5" /> B2B SaaS & Tech Demand Generation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            SaaS Marketing Agency: SEO, Demand Gen & Pipeline Growth
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Stop burning venture capital on $80 Google Ads clicks. We build high-converting programmatic comparison engines, developer doc architectures, and AI search visibility that compound qualified demo requests.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">B2B SaaS Growth Metric</div>
              <div className="text-2xl sm:text-3xl font-bold">+312% Inbound Demo Pipeline</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                Achieved by capturing competitor alternative traffic and intercepting ChatGPT software recommendation prompts with Generative Engine Optimization.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Scale Your SaaS Pipeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tactical SaaS Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Our 4-Stage SaaS Inbound Flywheel
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Programmatic Competitor Interception</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Build high-ranking "Alternatives to [Competitor]" and "[Competitor A] vs [Competitor B]" hubs that capture prospects right before they swipe their corporate card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Generative Engine Optimization (GEO)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ensure LLMs like ChatGPT, Claude, and Perplexity list your software when users prompt: "What is the best CRM for fintech startups?" or "Top API monitoring tools".
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">PLG & Free Tool Lead Magnets</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Engineer interactive calculators, code generators, and schema validators that attract thousands of organic backlinks and convert free users into paid seats.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Multi-Touch Pipeline Attribution</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect Google Analytics 4 and HubSpot to track Closed-Won ARR back to first-touch organic search queries, giving your board verified ROI data.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            SaaS Demand Generation FAQs
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

        {/* Contextual Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related SaaS Solutions & Comparisons
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/geo-optimization" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Generative Engine Optimization (GEO) →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              B2B SEO Retainer Pricing Guide →
            </Link>
            <Link href="/tools/agency-pricing-calculator" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SaaS Acquisition Cost Calculator →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Accelerate Inbound ARR?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base">
            Request an audit of your competitor comparison gaps and search footprint. We will prepare an actionable blueprint within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Get Free SaaS Pipeline Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
