import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle2, ArrowRight, DollarSign, Layout, HelpCircle, ShieldCheck, Zap, Globe } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { TopicalClusterWidget } from '@/components/seo/TopicalClusterWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Website Cost in 2026: Web Design Pricing Guide | AJPR',
  description: 'How much does a custom website cost in 2026? Review real project tiers from $3,500 startup sites to $30,000+ custom web apps with transparent deliverables.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing/website-cost',
  },
  openGraph: {
    title: 'Website Cost in 2026: Web Design Pricing Guide | AJPR',
    description: 'How much does a custom website cost in 2026? Review real project tiers from $3,500 startup sites to $30,000+ custom web apps with transparent deliverables.',
    url: 'https://ajprworld.com/pricing/website-cost',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Website Cost Pricing Guide - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Cost in 2026: Web Design Pricing Guide | AJPR',
    description: 'Real web design costs and transparent agency tiers for US startups and growing enterprises.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How much does a custom website cost in 2026?',
    answer: 'A professional agency-built website typically costs between $3,500 and $25,000. Basic 5-page small business sites range from $3,500 to $7,000. Mid-market B2B websites with custom CMS architecture and conversion design range from $7,500 to $18,000. Complex enterprise platforms and custom web applications start at $20,000 to $50,000+.'
  },
  {
    question: 'Why do website design quotes vary so drastically?',
    answer: 'Pricing depends on custom design vs pre-made templates, technical SEO architecture, content copywriting, performance optimization (Core Web Vitals), and custom backend integrations (CRM, billing, customer portals). Cheap $500 sites use bloated generic templates that load slowly and fail to convert visitors.'
  },
  {
    question: 'How much does website maintenance cost per month?',
    answer: 'Routine hosting, security patches, DNS management, and uptime monitoring typically cost $100 to $300/month. Full-service maintenance retainers including monthly CRO improvements, content updates, and technical optimization range from $500 to $1,500/month.'
  },
  {
    question: 'How long does it take to design and launch a custom website?',
    answer: 'A streamlined marketing site takes 3 to 6 weeks from strategy to deployment. Larger B2B web projects with custom illustrations, CRM integrations, and 25+ unique templates typically require 8 to 12 weeks.'
  },
  {
    question: 'Should I choose Next.js, Webflow, or WordPress?',
    answer: 'For blazing performance, SEO indexation speed, and custom applications, Next.js is the modern gold standard. For marketing teams that want visual editing with zero developer dependencies, Webflow is our top recommendation. We avoid legacy WordPress setups due to plugin vulnerabilities and sluggish page speeds.'
  }
];

export default function WebsiteCostPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website Design & Development Pricing',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'United States',
    description: 'Custom Next.js and Webflow website design, development, and conversion architecture with transparent project pricing.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Startup Marketing Site',
        price: '4500',
        priceCurrency: 'USD',
        description: '5-8 high-converting pages built on modern Next.js or Webflow.',
      },
      {
        '@type': 'Offer',
        name: 'Growth B2B Platform',
        price: '12000',
        priceCurrency: 'USD',
        description: 'Custom design system, CMS collections, programmatic landing pages, and CRM integration.',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-website-cost"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Website Cost</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layout className="w-3.5 h-3.5" /> 2026 Web Design Pricing Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            How Much Does a Custom Website Cost in 2026?
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            In 2026, a professionally designed, high-converting business website costs between <strong className="text-slate-900 dark:text-white">$3,500 and $25,000</strong>. Your investment scales with page count, technical performance requirements, and custom software integrations.
          </p>

          {/* Proof Block Above the Fold */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/90 to-slate-900 text-white border border-indigo-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1">Architecture Performance Proof</div>
              <div className="text-2xl sm:text-3xl font-bold">0.6s Load Time & 99/100 Core Web Vitals</div>
              <p className="text-sm text-indigo-100/80 mt-1 max-w-xl">
                Our custom Next.js builds deliver instant page loads, boosting organic conversion rates by an average of +42% over WordPress sites.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Get Website Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pricing Tiers Table */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Website Cost Breakdown by Project Scope
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Review exactly what each budget level delivers so you can select the right tier for your growth goals:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Startup Tier */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Seed & Local Services</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Foundation Site</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$3,500 – $7,000</span>
                <span className="text-sm text-slate-500"> one-time</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Fast, professional 5–8 page website designed to establish credibility and convert local leads.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Custom mobile-responsive UI design</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Technical SEO & Schema integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Contact form & Calendly integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 3-week delivery guarantee</li>
              </ul>
              <Link href="/contact?scope=foundation-site" className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm transition-colors">
                Choose Foundation
              </Link>
            </div>

            {/* Growth Tier */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-indigo-600 relative shadow-lg flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Recommended
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Scaling B2B & Modern DTC</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Growth Platform</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$7,500 – $18,000</span>
                <span className="text-sm text-slate-500"> one-time</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Designed to scale organic search traffic with dynamic CMS clusters, interactive calculators, and CRM pipelines.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Next.js 16 or Webflow custom architecture</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> 10–25 custom page templates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Programmatic SEO template readiness</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> HubSpot / Salesforce CRM data integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Sub-1s page speed performance score</li>
              </ul>
              <Link href="/contact?scope=growth-platform" className="w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/25">
                Build Growth Site
              </Link>
            </div>

            {/* Custom App / Enterprise */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Custom Web Apps & Portals</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Enterprise Web App</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$20,000 – $45,000+</span>
                <span className="text-sm text-slate-500"> one-time</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Full-stack custom software with authentication, database architecture, payment gateways, and client portals.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Next.js + Tailwind + Serverless Database</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> User authentication & subscription billing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Custom API integrations & dashboards</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Enterprise SLA & security hardening</li>
              </ul>
              <Link href="/contact?scope=enterprise-app" className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm transition-colors">
                Discuss Custom App
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions About Website Pricing
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

        {/* Topical Cluster Silo Hub */}
        <TopicalClusterWidget
          currentSiloTitle="Custom Software & Web Engineering Cost Hub"
          pillarHref="/services/web-development"
          pillarAnchor="Explore Custom Software & Web Engineering"
          relatedLinks={[
            {
              badge: "Core Service",
              title: "Custom Software Development",
              href: "/services/web-development",
              description: "Production Next.js full-stack engineering, PostgreSQL schemas, and sub-50ms TTFB."
            },
            {
              badge: "Free Diagnostic",
              title: "Free Technical & Speed Audit",
              href: "/free-audit",
              description: "Audit your website Core Web Vitals, mobile responsiveness, and security headers in 60s."
            },
            {
              badge: "Open Source Lab",
              title: "RuFlo AI Swarm Simulator",
              href: "/demo-ruflo",
              description: "Interactive visual simulator for high-throughput autonomous AI agent networks."
            }
          ]}
        />

        {/* Regional Custom Software Hubs */}
        <section className="mb-16 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Regional Engineering Centers
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Metro Custom Software Development Hubs
              </h3>
            </div>
            <Link href="/locations" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              View All Locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { city: 'Dallas', slug: 'dallas', tag: 'Texas' },
              { city: 'Phoenix', slug: 'phoenix', tag: 'Arizona' },
              { city: 'Tampa', slug: 'tampa', tag: 'Florida' },
              { city: 'Seattle', slug: 'seattle', tag: 'Washington' },
              { city: 'Boston', slug: 'boston', tag: 'Massachusetts' },
              { city: 'Austin', slug: 'austin', tag: 'Texas' },
              { city: 'London', slug: 'london', tag: 'United Kingdom' },
              { city: 'Singapore', slug: 'singapore', tag: 'APAC' },
              { city: 'Dubai', slug: 'dubai', tag: 'UAE' },
              { city: 'Haldwani', slug: 'haldwani', tag: 'India HQ' },
            ].map((metro) => (
              <Link
                key={metro.slug}
                href={`/locations/${metro.slug}/custom-software`}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 hover:shadow-sm transition-all group"
              >
                <span className="block text-[11px] font-semibold text-slate-400 group-hover:text-indigo-500 uppercase tracking-wider">
                  {metro.tag}
                </span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {metro.city} Software Dev
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Internal Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Cost Guides & Platforms
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Guide →
            </Link>
            <Link href="/platforms/webflow-agency" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Webflow Development & SEO Agency →
            </Link>
            <Link href="/platforms/shopify-seo" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Shopify SEO Agency →
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800/40 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Transform Your Website Into a Lead Machine</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base">
            Get an exact fixed-price proposal tailored to your technical requirements and timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Get Custom Proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700"
            >
              View Recent Client Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
