import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle2, ArrowRight, DollarSign, Target, HelpCircle, ShieldCheck, BarChart3, AlertCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'PPC Management Cost: 2026 Pricing & Retainer Guide | AJPR World',
  description: 'Discover PPC management costs in 2026. Compare flat retainers ($1,500–$5,000/mo) vs % of ad spend, agency fee models, ROAS targets, and performance benchmarks.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing/ppc-cost',
  },
  openGraph: {
    title: 'PPC Management Cost: 2026 Pricing & Retainer Guide | AJPR World',
    description: 'Discover PPC management costs in 2026. Compare flat retainers ($1,500–$5,000/mo) vs % of ad spend, agency fee models, ROAS targets, and performance benchmarks.',
    url: 'https://ajprworld.com/pricing/ppc-cost',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PPC Management Cost Guide - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Management Cost: 2026 Pricing & Retainer Guide | AJPR',
    description: 'Compare flat agency fees vs percentage-of-ad-spend pricing for Google Ads and paid media campaigns.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How much does PPC management cost per month in 2026?',
    answer: 'In 2026, PPC agency management fees typically range from $1,500 to $5,000 per month as a flat monthly retainer for ad spends under $25,000/month. For larger budgets, agencies charge a percentage of ad spend (typically 10% to 20%), or a hybrid model (e.g., $2,500 base + 10% of ad spend over $25,000).'
  },
  {
    question: 'Is percentage of ad spend better than a flat retainer?',
    answer: 'Flat retainers ($1,500-$3,500/mo) are better for smaller budgets ($3,000-$20,000 ad spend) because costs are predictable. For large brands spending $50k+/month, a tiered percentage model (10-12%) aligns agency incentives to actively optimize daily search queries, negative keywords, and landing page conversion rates.'
  },
  {
    question: 'What is a realistic Google Ads setup fee?',
    answer: 'Professional agencies charge between $1,000 and $3,500 for initial account architecture setup. This includes server-side conversion tracking, Google Tag Manager dataLayer setup, negative keyword lists, audience segmentation, copy creation, and landing page conversion audits.'
  },
  {
    question: 'What is a good ROAS for PPC campaigns?',
    answer: 'A healthy Return on Ad Spend (ROAS) depends on profit margins. For e-commerce with 50% margins, a 3.5x to 5.0x ROAS generates strong profitability. For high-ticket B2B SaaS or local services (HVAC, legal), success is measured by Cost Per Qualified Lead (CPL) and Pipeline Value rather than simple top-line ROAS.'
  },
  {
    question: 'Do agencies mark up the ad spend?',
    answer: 'At AJPR World, never. You pay Google or Meta directly via your own credit card so you retain 100% account ownership and credit card rewards. Beware of agencies that bill you lump-sum ad spend with hidden markups.'
  }
];

export default function PpcCostPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PPC Management Pricing & Retainers',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'United States',
    description: 'Data-driven Google Ads, Meta Ads, and Performance Max management with transparent flat fees and ROAS optimization.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '39',
      bestRating: '5',
      worstRating: '1'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Growth PPC Management',
        price: '2000',
        priceCurrency: 'USD',
        description: 'For ad budgets from $3,000 to $15,000/month.',
      },
      {
        '@type': 'Offer',
        name: 'Scale PPC & Paid Social',
        price: '4500',
        priceCurrency: 'USD',
        description: 'For ad budgets from $15,000 to $50,000/month with multi-channel attribution.',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-ppc-cost"
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
          <span className="text-slate-900 dark:text-slate-200">PPC Management Cost</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Target className="w-3.5 h-3.5" /> 2026 PPC Agency Pricing Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            How Much Does PPC Management Cost in 2026?
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            PPC management costs typically run between <strong className="text-slate-900 dark:text-white">$1,500 and $5,000 per month</strong> in flat agency retainers, or <strong className="text-slate-900 dark:text-white">10% to 20% of total ad spend</strong> for enterprise campaigns.
          </p>

          {/* Proof Block Above the Fold */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Live Agency Performance Proof</div>
              <div className="text-2xl sm:text-3xl font-bold">4.8x Average Return on Ad Spend (ROAS)</div>
              <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
                Achieved across $450k+ managed quarterly spend with zero hidden markup fees. We eliminate negative keyword waste and optimize landing page conversions.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              Get Free PPC Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pricing Models Breakdown */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Standard PPC Agency Pricing Models (With Real Numbers)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            PPC agencies charge using three primary fee structures. Understanding the math behind each model helps you avoid overpaying or incentivizing wasteful ad spending:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Model 1: Flat Monthly Retainer */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Best For Under $25k Spend</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Flat Monthly Retainer</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$1,500 – $3,500</span>
                <span className="text-sm text-slate-500"> / mo</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Predictable monthly agency fee regardless of slight ad spend fluctuations. No incentive for the agency to inflate your ad budget needlessly.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Best for budget certainty</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Full transparency on media cost</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Weekly bid & negative keyword pruning</li>
              </ul>
            </div>

            {/* Model 2: % of Ad Spend */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-blue-600 shadow-lg flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Industry Standard
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Best For $25k+ Spend</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Tiered % of Ad Spend</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">10% – 18%</span>
                <span className="text-sm text-slate-500"> of spend</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Scales smoothly with advertising volume. Typically structured on a sliding scale (e.g. 15% on first $50k, 10% on spend above $50k).
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Direct alignment with high-volume scaling</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Dedicated daily ad specialist</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Performance Max + Search + Retargeting</li>
              </ul>
            </div>

            {/* Model 3: Performance & Hybrid */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise Growth</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Hybrid Base + Incentive</h3>
              <div className="my-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$2,500 + ROAS</span>
                <span className="text-sm text-slate-500"> bonus</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Lower base retainer combined with a performance kicker when ROAS or Cost-Per-Acquisition targets exceed agreed benchmark thresholds.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Highest skin-in-the-game</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Requires verified analytics tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Ideal for established high-ticket brands</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ad Spend vs Agency Fee Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Ad Spend vs Monthly Management Cost Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Monthly Ad Spend</th>
                  <th className="p-4">Average Fee (US)</th>
                  <th className="p-4">Effective Fee %</th>
                  <th className="p-4">Channels Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">$3,000 – $7,500</td>
                  <td className="p-4 text-blue-600 font-bold">$1,500 / mo flat</td>
                  <td className="p-4">20% – 50%</td>
                  <td className="p-4">Google Search + Local Services Ads</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">$10,000 – $25,000</td>
                  <td className="p-4 text-blue-600 font-bold">$2,000 – $3,500 / mo</td>
                  <td className="p-4">14% – 20%</td>
                  <td className="p-4">Google Search + Performance Max + Retargeting</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">$30,000 – $75,000</td>
                  <td className="p-4 text-blue-600 font-bold">12% of spend</td>
                  <td className="p-4">12%</td>
                  <td className="p-4">Full Funnel: Google, YouTube, Meta, Bing</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">$100,000+</td>
                  <td className="p-4 text-blue-600 font-bold">8% – 10% of spend</td>
                  <td className="p-4">8% – 10%</td>
                  <td className="p-4">Multi-touch attribution, custom creative sprints, CRO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Red Flags / Warning Box */}
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 mb-16 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <strong className="block text-slate-900 dark:text-white font-semibold mb-1">
              Watch Out: Never Let an Agency Run Ads Through Their Own Ad Account
            </strong>
            Some agencies demand you transfer advertising funds to their account, allowing them to pocket hidden margins or hold your historical conversion data hostage if you leave. Always demand that media bills directly to your card on your own Google Ads or Meta Ads manager.
          </div>
        </div>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions About PPC Costs
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

        {/* Regional & Metro PPC Management Hubs */}
        <section className="mb-16 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Localized Advertising Retainers
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Regional PPC Agencies & Metro Performance Hubs
              </h3>
            </div>
            <Link href="/locations" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View All Global Locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { city: 'Miami', slug: 'miami', tag: 'Florida' },
              { city: 'Tampa', slug: 'tampa', tag: 'Florida' },
              { city: 'Phoenix', slug: 'phoenix', tag: 'Arizona' },
              { city: 'Dallas', slug: 'dallas', tag: 'Texas' },
              { city: 'Austin', slug: 'austin', tag: 'Texas' },
              { city: 'Chicago', slug: 'chicago', tag: 'Illinois' },
              { city: 'Nashville', slug: 'nashville', tag: 'Tennessee' },
              { city: 'Seattle', slug: 'seattle', tag: 'Washington' },
              { city: 'London', slug: 'london', tag: 'United Kingdom' },
              { city: 'Singapore', slug: 'singapore', tag: 'APAC / Asia' },
            ].map((metro) => (
              <Link
                key={metro.slug}
                href={`/locations/${metro.slug}/ppc-agency`}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 hover:shadow-sm transition-all group"
              >
                <span className="block text-[11px] font-semibold text-slate-400 group-hover:text-blue-500 uppercase tracking-wider">
                  {metro.tag}
                </span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {metro.city} PPC Agency
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Internal Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Compare More Pricing & Solutions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
            <Link href="/pricing/website-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Website Cost Guide →
            </Link>
            <Link href="/compare/webfx-alternatives" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              WebFX Alternatives & Pricing Review →
            </Link>
            <Link href="/services/b2b-growth-marketing" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              B2B Growth Marketing Agency →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Stop Bleeding Ad Budget on Inefficient PPC</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base">
            Request a complimentary 20-point PPC audit. We will pinpoint your highest-cost wasted search terms and identify your quickest ROAS wins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              Claim Free PPC Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/agency-pricing-calculator"
              className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700"
            >
              Model Agency ROI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
