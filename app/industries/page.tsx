import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Wrench, Laptop, Stethoscope, ShoppingBag, ShieldCheck, Building2, Factory, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Marketing Solutions & Vertical SEO | AJPR',
  description: 'Specialized digital marketing, SEO, and paid acquisition tailored to your vertical: Home Services, SaaS, Healthcare, and E-commerce brands.',
  alternates: {
    canonical: 'https://ajprworld.com/industries',
  },
  openGraph: {
    title: 'Industry Marketing Solutions & Vertical SEO | AJPR',
    description: 'Specialized digital marketing, SEO, and paid acquisition tailored to your vertical: Home Services, SaaS, Healthcare, and E-commerce brands.',
    url: 'https://ajprworld.com/industries',
    siteName: 'AJPR World',
    type: 'website',
  },
};

const industries = [
  {
    title: 'Home Services Marketing',
    subtitle: 'HVAC, Roofing, Plumbing & Electrical',
    slug: '/industries/home-services',
    icon: Wrench,
    metric: '+184% Booked Jobs',
    metricDetail: 'Average increase in emergency service calls within 90 days',
    description: 'Dominate Google Local Services Ads, local 3-pack rankings, and automated dispatch lead flows for residential and commercial contractors.',
    badge: 'High ROI Local Lead Gen',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-500'
  },
  {
    title: 'B2B SaaS & Tech Marketing',
    subtitle: 'Product-Led & Enterprise Software',
    slug: '/industries/saas-marketing',
    icon: Laptop,
    metric: '4.2x Lower CAC',
    metricDetail: 'Compared to traditional cold outbound & paid social',
    description: 'Capture high-intent bottom-of-funnel buyers with programmatic product comparison hubs, developer documentation SEO, and GEO search.',
    badge: 'Pipeline & Demo Engine',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-500'
  },
  {
    title: 'Healthcare & Dental Marketing',
    subtitle: 'Medical Clinics & Specialty Practices',
    slug: '/industries/healthcare-marketing',
    icon: Stethoscope,
    metric: '+240 New Patients / mo',
    metricDetail: 'Attracted via local search and reputation management',
    description: 'HIPAA-compliant patient acquisition engines, physician directory optimization, verified review capture, and medical practice SEO.',
    badge: 'HIPAA Compliant',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-500'
  },
  {
    title: 'Ecommerce & DTC Growth',
    subtitle: 'Shopify Brands & High-Volume DTC',
    slug: '/industries/ecommerce-marketing',
    icon: ShoppingBag,
    metric: '4.8x Blended ROAS',
    metricDetail: 'Across Google Shopping, Meta Ads, and Organic Search',
    description: 'Scale organic collection pages, optimize faceted navigation, implement product schema, and drive customer retention via Klaviyo.',
    badge: 'Shopify Plus Partner',
    color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-500'
  }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Vertical Specialization
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Industry-Specific Marketing That Drives Real Revenue
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Generic marketing strategies deliver generic results. We build specialized search, paid acquisition, and conversion funnels tailored to the unique economic unit economics of your vertical.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-blue-600">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {ind.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {ind.title}
                  </h2>
                  <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-4">
                    {ind.subtitle}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {ind.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-6">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{ind.metric}</div>
                    <div className="text-xs text-slate-500">{ind.metricDetail}</div>
                  </div>
                </div>

                <Link
                  href={ind.slug}
                  className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-900 dark:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
                >
                  View Vertical Strategy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Specialist Trade & Platform Engines */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Specialized Trade & Platform Systems
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Deep-dive platforms engineered for contractor exclusivity, enterprise CMS scalability, and high-volume e-commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/roofing-contractors"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Trade Specialization
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                  Roofing Contractors Web & Lead Engine
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Capture exclusive local homeowner estimates without paying high commissions for shared leads on Angi or HomeAdvisor.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Roofing Engine &rarr;
              </span>
            </Link>

            <Link
              href="/platforms/shopify-seo"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Ecommerce Platform
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors mb-2">
                  Shopify SEO & Technical Architecture
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Eliminate duplicate collection URLs, optimize faceted crawl budgets, and implement rich Product schema on Shopify Plus.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Shopify SEO &rarr;
              </span>
            </Link>

            <Link
              href="/platforms/webflow-agency"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  CMS Architecture
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                  Webflow Development & Enterprise SEO
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Award-winning visual design paired with clean client-first CSS, dynamic CMS collections, and sub-second load speeds.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Webflow Agency &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Comparison Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Want to see how we compare to legacy agencies?</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Compare our direct senior execution and transparent retainers against traditional high-overhead firms like WebFX and Web Tonic.
            </p>
          </div>
          <Link
            href="/compare/webfx-alternatives"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold whitespace-nowrap transition-colors"
          >
            Compare WebFX vs AJPR →
          </Link>
        </div>
      </div>
    </div>
  );
}
