import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle2, ArrowRight, DollarSign, TrendingUp, HelpCircle, ShieldCheck, Sparkles, BarChart3 } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ItemListSchema } from '@/components/schema/ItemListSchema';

const seoPricingTiers = [
  {
    name: 'Foundation SEO Tier ($1,500 – $3,000/mo)',
    description: 'For local service businesses and startups. Full technical crawl fixes, local map pack optimization, and 2 monthly content assets.',
    url: 'https://ajprworld.com/pricing/seo-cost#tiers'
  },
  {
    name: 'Growth & Multi-Region Tier ($3,500 – $6,500/mo)',
    description: 'For scaling B2B companies and regional brands. Generative Engine Optimization (GEO), 6 monthly thought-leadership articles, and digital PR backlink acquisition.',
    url: 'https://ajprworld.com/pricing/seo-cost#tiers'
  },
  {
    name: 'Enterprise & Programmatic Tier ($7,500 – $12,500+/mo)',
    description: 'For nationwide platforms and enterprise brands. Programmatic cluster expansion, daily crawl budget management, international hreflang, and dedicated SEO architects.',
    url: 'https://ajprworld.com/pricing/seo-cost#tiers'
  }
];

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'SEO Cost in 2026: Pricing Guide & Retainers | AJPR',
  description: 'How much does SEO cost in 2026? Realistic retainers range from $1,500-$10,000/mo. Compare hourly, project, and package rates with transparent pricing.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing/seo-cost',
  },
  openGraph: {
    title: 'SEO Cost in 2026: Pricing Guide & Retainers | AJPR',
    description: 'How much does SEO cost in 2026? Realistic retainers range from $1,500-$10,000/mo. Compare hourly, project, and package rates with transparent pricing.',
    url: 'https://ajprworld.com/pricing/seo-cost',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SEO Cost Guide & Retainers - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Cost in 2026: Pricing Guide & Retainers | AJPR',
    description: 'Data-driven breakdown of SEO agency costs, retainers, and deliverable timelines.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How much does SEO cost per month in 2026?',
    answer: 'In 2026, most reputable US digital marketing agencies charge between $1,500 and $7,500 per month for ongoing SEO retainers. Small local businesses typically invest $1,500-$3,000/month, mid-market companies spend $3,500-$7,500/month, and enterprise organizations spend upwards of $10,000-$25,000/month depending on competition and content volume.'
  },
  {
    question: 'How much do SEO agencies charge per hour?',
    answer: 'Experienced US-based SEO strategists and senior agencies charge between $125 and $300 per hour. Junior freelancers charge $50-$100/hr, whereas specialized technical SEO architects or enterprise consultants bill at $250-$500/hr.'
  },
  {
    question: 'Is paying $500 a month for SEO worth it?',
    answer: 'Generally no. Retainers below $1,000/month typically rely on automated directory blasts, low-quality AI spun content, or offshore link farms that trigger Google algorithmic penalties. High-impact SEO requires dedicated technical audits, custom editorial content, and manual digital PR outreach that cannot be profitably delivered for $500/month.'
  },
  {
    question: 'How long before SEO starts generating positive ROI?',
    answer: 'Most businesses experience early indexation and keyword momentum within 60 to 90 days. Meaningful organic revenue and customer acquisition scale significantly between months 4 and 9 as topical authority and backlink equity compound.'
  },
  {
    question: 'What is the difference between SEO retainer vs project pricing?',
    answer: 'A monthly retainer ($2,500-$7,500/mo) covers continuous optimization, new content production, technical maintenance, and active link building. Project pricing ($5,000-$25,000) is best for one-off scopes like technical migrations, website architecture redesigns, or comprehensive technical audits.'
  },
  {
    question: 'What is the average international SEO price and retainer in 2026?',
    answer: 'International SEO retainers generally range between $3,500 and $12,500 per month depending on the number of target countries, multi-lingual keyword research, ccTLD or subfolder architecture, and hreflang configuration. AJPR World provides global multi-region SEO retainers starting at $3,500/month with transparent deliverables.'
  },
  {
    question: 'How much does a B2B SaaS SEO retainer cost per month?',
    answer: 'A dedicated B2B SaaS SEO retainer typically costs between $3,500 and $8,500 per month. Deliverables focus on bottom-of-funnel customer acquisition: programmatic competitor alternative hubs, product feature landing pages, technical Core Web Vitals maintenance, and direct CRM pipeline attribution.'
  },
  {
    question: 'How much does a website migration agency cost?',
    answer: 'A professional technical website migration typically costs between $3,500 and $15,000 depending on URL count, CMS platform migration (e.g., WordPress to Next.js or Shopify), and database complexity. The scope includes complete 1-to-1 301 redirect mapping, staging audit, canonical enforcement, and zero-traffic-drop monitoring.'
  },
  {
    question: 'What should a business budget for SEO in 2026?',
    answer: 'In 2026, businesses should budget between $1,500 and $6,000 per month for organic search and Generative Engine Optimization (GEO). Annual budgets of $18,000 to $50,000 enable scaling companies to build durable topical authority, capture Google AI Overview citation cards, and lower long-term paid acquisition costs.'
  }
];

export default function SeoCostPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO Pricing & Retainer Services',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'United States',
    description: 'Transparent monthly SEO retainer packages, technical audits, and performance-driven search marketing.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Growth SEO Retainer',
        price: '2500',
        priceCurrency: 'USD',
        description: 'For growing brands scaling organic pipeline and local authority.',
      },
      {
        '@type': 'Offer',
        name: 'Scale & Enterprise SEO',
        price: '6000',
        priceCurrency: 'USD',
        description: 'Comprehensive technical SEO, digital PR, and programmatic cluster expansion.',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <ItemListSchema 
        name="SEO Cost & Retainer Tiers (2026 Agency Benchmark)"
        description="Comprehensive pricing tiers and deliverable benchmarks for US SEO agency retainers."
        items={seoPricingTiers}
      />
      <Script
        id="service-schema-seo-cost"
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
          <span className="text-slate-900 dark:text-slate-200">SEO Cost</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <DollarSign className="w-3.5 h-3.5" /> 2026 Transparent Pricing Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            How Much Does SEO Cost in 2026?
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
            SEO cost in 2026 ranges between <strong className="text-slate-900 dark:text-white">$1,500 and $10,000 per month</strong> for a professional US digital marketing agency retainer. The exact investment depends on your market competition, technical complexity, and target organic revenue goals.
          </p>

          {/* AI Overview / Generative AI Quick Verdict Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-md">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Quick Summary: 2026 SEO Pricing at a Glance
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Standard Monthly SEO Retainer Benchmarks
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase">Local & SMB</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">$1.5k – $3k <span className="text-xs font-normal text-slate-500">/mo</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Technical hygiene, local citation audit, Google Maps rank.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-sm">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Growth & B2B SaaS</span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">$3.5k – $6.5k <span className="text-xs font-normal text-slate-500">/mo</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">GEO (ChatGPT/Perplexity citations), editorial hubs, backlink PR.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase">Enterprise</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">$7.5k – $12.5k+ <span className="text-xs font-normal text-slate-500">/mo</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Programmatic clusters, multi-region hreflang, custom Next.js.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Hourly consultant rates average <strong>$125 – $300/hr</strong>. One-time technical audits average <strong>$3,500 – $7,500</strong>.
              </p>
              <Link href="/book-call" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all">
                Book Free SEO Audit Call <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Proof Block Above the Fold */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-1">Proven Agency Benchmark</div>
              <div className="text-2xl sm:text-3xl font-bold">+312% Organic Pipeline Growth</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                Real result delivered for our B2B SaaS client in 8 months, lowering their Customer Acquisition Cost (CAC) by 4.2x compared to paid search ads.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Get Custom Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pricing Tiers Table */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            SEO Pricing Models: Retainer Tiers Compared
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Unlike legacy firms that hide their rates behind lengthy sales calls, here is exactly what real, high-performance SEO retainers cost and what deliverables they include.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Local & Startup</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Foundation Tier</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$1,500 - $3,000</span>
                <span className="text-sm text-slate-500"> / month</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Ideal for local service businesses, medical clinics, and regional contractors dominating a single metro area.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Full technical site crawl & error fixes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Google Business Profile local 3-pack SEO</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 2 high-intent localized pages/mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Monthly keyword & ranking reporting</li>
              </ul>
              <Link href="/contact?plan=foundation" className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm transition-colors">
                Select Foundation
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-blue-600 relative shadow-lg flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Most Popular
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Mid-Market & Scale</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Growth Tier</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$3,500 - $7,500</span>
                <span className="text-sm text-slate-500"> / month</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Designed for B2B tech, national brands, and high-volume e-commerce competing for commercial revenue keywords.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Core Web Vitals & technical architecture</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> 4-6 authoritative topical cluster pieces/mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Active digital PR & white-hat link acquisition</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Generative Engine (ChatGPT & AI search) optimization</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Dedicated senior SEO strategist</li>
              </ul>
              <Link href="/contact?plan=growth" className="w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25">
                Scale With Growth
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise & Multi-Location</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Enterprise Tier</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$8,000 - $20,000+</span>
                <span className="text-sm text-slate-500"> / month</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                For enterprise SaaS, nationwide franchise networks, and international websites with tens of thousands of URLs.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Programmatic SEO engine setup & maintenance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Original industry research studies for link magnets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Comprehensive CRO & conversion rate testing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Executive board-ready revenue attribution reporting</li>
              </ul>
              <Link href="/contact?plan=enterprise" className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm transition-colors">
                Contact Enterprise Team
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Hourly Rates vs Retainers */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            SEO Hourly Rates vs Project-Based Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Depending on your team’s internal bandwidth, you may choose between hourly advisory, one-off sprint projects, or ongoing monthly retainers:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Pricing Model</th>
                  <th className="p-4">Average Cost (US)</th>
                  <th className="p-4">Best Suited For</th>
                  <th className="p-4">Typical Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Monthly Retainer</td>
                  <td className="p-4 text-blue-600 font-bold">$2,000 – $10,000 / mo</td>
                  <td className="p-4">Long-term organic pipeline compounding</td>
                  <td className="p-4">Technical fixes, monthly content, active digital PR, ranking growth</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Hourly Consulting</td>
                  <td className="p-4 text-blue-600 font-bold">$125 – $300 / hr</td>
                  <td className="p-4">In-house marketing teams needing strategic review</td>
                  <td className="p-4">Strategy calls, ad-hoc audits, code review, team training</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Technical Audit Sprint</td>
                  <td className="p-4 text-blue-600 font-bold">$3,500 – $12,000 / project</td>
                  <td className="p-4">Pre-launch, site migration, or post-penalty recovery</td>
                  <td className="p-4">Full log file analysis, architecture overhaul, schema implementation</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Content Cluster Package</td>
                  <td className="p-4 text-blue-600 font-bold">$4,000 – $15,000 / sprint</td>
                  <td className="p-4">Establishing authority in a new vertical or topic</td>
                  <td className="p-4">Pillar page + 8 supporting long-form guides + internal linking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Free Tool Cross Link */}
        <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Calculate Your Custom SEO & PPC ROI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Use our interactive agency calculator to estimate the required SEO retainer, expected pipeline yield, and breakeven timeline for your industry.
            </p>
          </div>
          <Link
            href="/tools/agency-pricing-calculator"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all whitespace-nowrap shadow-md"
          >
            Open ROI Calculator
          </Link>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions About SEO Costs
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

        {/* Related Clusters / Contextual Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Pricing Guides & Solutions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Guide →
            </Link>
            <Link href="/pricing/website-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Website Cost Guide →
            </Link>
            <Link href="/compare/webfx-alternatives" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              WebFX Alternatives & Pricing Comparison →
            </Link>
            <Link href="/services/geo-optimization" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Generative Engine Optimization (GEO) →
            </Link>
            <Link href="/services/b2b-growth-marketing" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              B2B Growth Marketing Agency & Retainers →
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready for Transparent, Predictable SEO Growth?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base sm:text-lg">
            No long-term lock-in traps, no offshore outsourcing, and no hidden fees. We analyze your website and provide an honest roadmap with fixed pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all shadow-lg shadow-black/10 flex items-center gap-2"
            >
              Request Free Strategy & Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/free-audit"
              className="px-8 py-4 rounded-full bg-blue-500/30 hover:bg-blue-500/40 text-white font-semibold transition-all border border-white/20"
            >
              Run Instant Site Audit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
