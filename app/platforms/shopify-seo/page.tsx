import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShoppingBag, CheckCircle2, ArrowRight, Code2, Layers, Search, Zap, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Shopify SEO Agency: Organic Revenue & Store Growth | AJPR',
  description: 'Fix Shopify crawl bloat, collection architecture, and product schema. We help Shopify and Shopify Plus stores scale organic revenue with technical SEO.',
  alternates: {
    canonical: 'https://ajprworld.com/platforms/shopify-seo',
  },
  openGraph: {
    title: 'Shopify SEO Agency: Organic Revenue & Store Growth | AJPR',
    description: 'Fix Shopify crawl bloat, collection architecture, and product schema. We help Shopify and Shopify Plus stores scale organic revenue with technical SEO.',
    url: 'https://ajprworld.com/platforms/shopify-seo',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shopify SEO Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify SEO Agency: Organic Revenue & Store Growth | AJPR',
    description: 'Fix crawl traps, duplicate collection URLs, and scale Shopify organic sales.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'Why does Shopify create duplicate product URLs?',
    answer: 'By default, Shopify links to products through collection paths (/collections/mens/products/sneaker). This creates multiple duplicate URLs for the same product. While Shopify adds a rel=canonical tag pointing to /products/sneaker, Google often ignores canonicals if internal links consistently point to the collection path. We modify Liquid theme files to link directly to canonical root URLs across the entire store.'
  },
  {
    question: 'Can you do SEO on Shopify without installing bulky apps?',
    answer: 'Yes, in fact, we recommend avoiding third-party SEO apps that inject heavy JavaScript and slow down your Core Web Vitals. We implement custom schema, meta templates, and crawl controls directly inside your Shopify Liquid code for zero performance overhead.'
  },
  {
    question: 'How do you optimize Shopify collection filter pages?',
    answer: 'Faceted navigation (filters for color, size, material) can generate thousands of thin, duplicate URLs that exhaust your Google crawl budget. We configure noindex or canonical rules for non-commercial filter permutations while creating dedicated, indexable landing pages for high-volume search phrases like "mens black waterproof boots".'
  },
  {
    question: 'Do you support Shopify Plus and headless Shopify architectures?',
    answer: 'Yes. We optimize standard Shopify stores, Shopify Plus enterprise setups, and headless Next.js or Hydrogen frontends connecting to Shopify via Storefront GraphQL API.'
  }
];

export default function ShopifySeoPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shopify SEO & Technical Optimization',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'Global',
    description: 'Technical Shopify and Shopify Plus SEO, Liquid theme optimization, product schema, and collection architecture.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-shopify"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Shopify SEO</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShoppingBag className="w-3.5 h-3.5" /> Platform Specialist Wedge
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Shopify SEO Agency: Technical E-Commerce Optimization
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Shopify is incredible for e-commerce, but its default architecture is notorious for crawl bloat, duplicate product URLs, and slow app code. We fix Shopify’s underlying technical constraints so your collection pages dominate Google search.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Shopify Plus Technical Result</div>
              <div className="text-2xl sm:text-3xl font-bold">+142% Organic Revenue & 0.8s Page Speed</div>
              <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
                Achieved by removing 7 bloated SEO apps, hardcoding custom Product schema into Liquid, and fixing collection URL duplicate loops.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              Get Free Shopify SEO Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tactical Features */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            What We Fix Under the Hood on Shopify
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Canonical Liquid Theme Repair</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We update collection template code to force all internal links to direct canonical URLs, stopping PageRank dissipation and resolving duplicate content flags in Google Search Console.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Faceted Navigation & Tag Architecture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Control the indexing of filtered collection URLs so Google only indexes high-search-intent subcategories, preventing infinite crawl traps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Native JSON-LD Product Schema</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ditch buggy schema plugins. We hardcode enterprise Product, Offer, AggregateRating, and InStock schema into your theme for maximum Google rich snippet visibility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Shopify Speed & Core Web Vitals Optimization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Audit and remove zombie app scripts, optimize responsive images, and inline critical CSS to achieve sub-second LCP (Largest Contentful Paint) times.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-emerald-600" />
            Shopify SEO FAQs
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
            Related Platforms & Solutions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/platforms/webflow-agency" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Webflow Development & SEO Agency →
            </Link>
            <Link href="/industries/ecommerce-marketing" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Full-Service Ecommerce Marketing →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Shopify SEO Pricing & Retainers →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-emerald-600 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Fix Your Shopify Store’s Hidden SEO Bottlenecks</h2>
          <p className="text-emerald-100 max-w-xl mx-auto mb-8 text-base">
            Get a deep technical crawl review of your Shopify theme, collection URL loops, and Core Web Vitals score.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-emerald-50 transition-all shadow-lg"
          >
            Claim Free Shopify Technical Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
