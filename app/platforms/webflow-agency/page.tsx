import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Layout, CheckCircle2, ArrowRight, Sparkles, Layers, Zap, Code2, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: 'Webflow SEO & Development Agency | AJPR World',
  description: 'Custom Webflow development and enterprise SEO optimization. Build blazing-fast marketing sites that outrank competitors and convert B2B prospects.',
  alternates: {
    canonical: 'https://ajprworld.com/platforms/webflow-agency',
  },
  openGraph: {
    title: 'Webflow SEO & Development Agency | AJPR World',
    description: 'Custom Webflow development and enterprise SEO optimization. Build blazing-fast marketing sites that outrank competitors and convert B2B prospects.',
    url: 'https://ajprworld.com/platforms/webflow-agency',
    siteName: 'AJPR World',
    type: 'article',
    images: ['https://ajprworld.com/og-image.jpg'],
  },
};

const faqs = [
  {
    question: 'Is Webflow good for SEO compared to WordPress?',
    answer: 'Yes, Webflow typically outperforms WordPress for marketing websites out of the box because it produces clean, semantic W3C-compliant HTML, has native SSL, generates automated XML sitemaps, and does not require 30+ vulnerable plugins that slow down site speed.'
  },
  {
    question: 'Can you build programmatic SEO pages in Webflow?',
    answer: 'Yes. Webflow CMS Collections support up to 10,000 items (or more with Webflow Enterprise). We design scalable CMS templates that allow you to programmatically publish hundreds of localized or industry-specific landing pages using structured dynamic fields.'
  },
  {
    question: 'How do you handle custom interactions without hurting Core Web Vitals?',
    answer: 'We avoid heavy third-party animation libraries and build lightweight CSS transitions and native Webflow interactions with GPU hardware acceleration. We ensure First Input Delay (FID) and Interaction to Next Paint (INP) remain firmly in the green zone.'
  },
  {
    question: 'Can my marketing team edit Webflow pages without developers?',
    answer: 'That is the primary benefit of Webflow. Once our engineers design and build your custom design system, your marketing team can publish new blogs, edit copy, update case studies, and launch landing pages in seconds without writing a single line of code.'
  }
];

export default function WebflowAgencyPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Webflow Development & SEO Optimization',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    image: ['https://ajprworld.com/og-image.jpg'],
    areaServed: 'Global',
    description: 'Enterprise Webflow design, CMS collection architecture, technical SEO, and conversion optimization.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-webflow"
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
          <span className="text-slate-900 dark:text-slate-200">Webflow Agency</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layout className="w-3.5 h-3.5" /> Platform Specialist Wedge
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Webflow SEO & Development Agency: High-Speed Web Design
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Empower your marketing team with visual autonomy while maintaining enterprise-grade technical SEO. We design and develop custom Webflow sites that rank on Google, load in under 1 second, and convert high-ticket B2B buyers.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">Webflow Migration Benchmark</div>
              <div className="text-2xl sm:text-3xl font-bold">0.7s Page Speed & 3x Organic Lead Velocity</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                Achieved after migrating a B2B cybersecurity client from bloated WordPress to a clean, componentized Webflow CMS architecture.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Get Custom Webflow Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Why High-Growth Companies Build on Webflow With AJPR
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Scalable CMS Collection Architecture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We engineer flexible CMS schemas for case studies, team profiles, feature comparisons, and localized landing pages with dynamic SEO open graph tags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Flawless 100/100 Core Web Vitals</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero bloated themes. We write semantic HTML5, implement next-gen WebP/AVIF imagery, and structure CSS utility classes (Client-First framework) for maximum rendering speed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Custom Code & API Integrations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When native Webflow reaches its limits, our engineers inject custom JavaScript, connect headless APIs, and integrate HubSpot, Marketo, or Segment with custom webhook pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Programmatic Webflow SEO Templates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Dominate long-tail search by publishing hundreds of high-quality, template-driven landing pages (e.g. integrations, city pages, persona guides) effortlessly through CSV/CMS imports.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Webflow Development & SEO FAQs
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
            Related Web Development & Cost Guides
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/website-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Custom Website Pricing Guide (2026) →
            </Link>
            <Link href="/platforms/shopify-seo" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Shopify SEO Agency →
            </Link>
            <Link href="/portfolio" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Client Portfolio & Case Studies →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-700 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Build a Webflow Site That Actually Converts</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base">
            Get an exact fixed-price quote and architecture plan for your upcoming Webflow build or WordPress migration.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Claim Free Webflow Scope Review <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
