import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShoppingBag, CheckCircle2, ArrowRight, TrendingUp, BarChart3, Tag, RefreshCw, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Ecommerce Marketing Agency: Shopify & DTC Growth | AJPR',
  description: 'Grow your DTC brand with high-converting Shopify SEO, Google Shopping, and retention marketing. Data-driven customer acquisition that lowers blended CAC.',
  alternates: {
    canonical: 'https://ajprworld.com/industries/ecommerce-marketing',
  },
  openGraph: {
    title: 'Ecommerce Marketing Agency: Shopify & DTC Growth | AJPR',
    description: 'Grow your DTC brand with high-converting Shopify SEO, Google Shopping, and retention marketing. Data-driven customer acquisition that lowers blended CAC.',
    url: 'https://ajprworld.com/industries/ecommerce-marketing',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ecommerce Marketing Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Marketing Agency: Shopify & DTC Growth | AJPR',
    description: 'DTC customer acquisition, Google Shopping optimization, and organic store revenue growth.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How do you fix Shopify duplicate content and crawl bloat?',
    answer: 'By default, Shopify creates duplicate URLs for products inside collections (/collections/shoes/products/sneaker vs /products/sneaker) and creates infinite crawlable filter combinations. We adjust Liquid theme code to force canonical root product URLs and configure meta robots tags on thin collection tag pages.'
  },
  {
    question: 'What is a realistic ROAS for DTC Google Shopping campaigns?',
    answer: 'A healthy DTC target is 3.5x to 5.0x blended ROAS across Google Shopping and Meta Ads. By optimizing Google Merchant Center product titles, custom feed labels, and negative keyword lists, we eliminate non-converting search queries.'
  },
  {
    question: 'How does Product Schema markup improve e-commerce revenue?',
    answer: 'Adding valid Product, Review, AggregateRating, and Offer schema to Shopify templates triggers eye-catching rich snippets in Google Search results—displaying star ratings, price, and in-stock badges that increase click-through rates by up to 35%.'
  },
  {
    question: 'How do you lower Customer Acquisition Cost (CAC) for e-commerce?',
    answer: 'We scale high-ranking category collection pages to capture zero-click organic shoppers, while implementing automated post-purchase email and SMS flows in Klaviyo to drive repeat purchases, effectively lowering your blended CAC.'
  }
];

export default function EcommerceMarketingPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ecommerce Digital Marketing & Shopify SEO',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'Global',
    description: 'Full-funnel DTC marketing, Shopify technical SEO, Google Shopping optimization, and email retention marketing.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-ecommerce"
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
          <span className="text-slate-900 dark:text-slate-200">Ecommerce Marketing</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShoppingBag className="w-3.5 h-3.5" /> DTC & Shopify Scaling Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Ecommerce Marketing Agency: Shopify & DTC Growth Partner
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Scale your online store with technical Shopify SEO, precision Google Shopping feeds, and automated customer retention funnels that compound lifetime customer value.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-950/90 to-slate-900 text-white border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">DTC Growth Case Study</div>
              <div className="text-2xl sm:text-3xl font-bold">4.8x Blended ROAS & +142% Organic Sales</div>
              <p className="text-sm text-purple-100/80 mt-1 max-w-xl">
                Generated for a lifestyle Shopify Plus retailer by cleaning up collection crawl bloat and restructuring Performance Max asset groups.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-purple-600/25"
            >
              Scale Your Ecommerce Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tactical Ecommerce Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Our 4-Stage DTC Profitability Engine
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Shopify Technical SEO & Collection Architecture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Eliminate canonical duplicate URL loops, resolve faceted tag bloat, and turn high-margin category collections into top-ranking search magnets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Google Shopping & Performance Max Optimization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Enrich Merchant Center feeds with custom product titles, promotional annotations, and high-margin product tier segmentations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Klaviyo Retention & Lifecycle Flows</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Turn first-time buyers into repeat brand evangelists with automated browse abandonment, post-purchase replenishment triggers, and VIP loyalty segments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Conversion Rate Optimization (CRO)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A/B test product page layouts, trust badges, 1-click upsells, and friction-free checkout flows to lift Average Order Value (AOV).
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-purple-600" />
            Ecommerce Marketing FAQs
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
            Related Platform & PPC Guides
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/platforms/shopify-seo" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Dedicated Shopify SEO Agency Page →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Guide →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Ecommerce SEO Pricing & Retainers →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-purple-700 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Scale Your Shopify Revenue Profitably</h2>
          <p className="text-purple-100 max-w-xl mx-auto mb-8 text-base">
            Request an audit of your Shopify crawl architecture and Google Shopping feed to unlock high-intent revenue.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-purple-50 transition-all shadow-lg"
          >
            Claim Free Shopify Growth Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
