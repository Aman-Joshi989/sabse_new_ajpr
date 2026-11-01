import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Target, BarChart3, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, Layers, Users, Rocket, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import ToolLeadCapture from '@/components/ToolLeadCapture';

export const revalidate = 86400; // Cache for 24 hours

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'B2B Growth Marketing Agency & Consulting (2026) | AJPR World',
  description: 'Data-driven B2B growth marketing agency. We engineer full-funnel customer acquisition: technical SEO, demand generation, Generative Engine Optimization (GEO), and high-yield pipeline funnels. Transparent pricing.',
  alternates: {
    canonical: 'https://ajprworld.com/services/b2b-growth-marketing',
  },
  openGraph: {
    title: 'B2B Growth Marketing Agency & Consulting (2026) | AJPR World',
    description: 'Data-driven B2B growth marketing agency. We engineer full-funnel customer acquisition: technical SEO, demand generation, Generative Engine Optimization (GEO), and high-yield pipeline funnels.',
    url: 'https://ajprworld.com/services/b2b-growth-marketing',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B2B Growth Marketing Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Growth Marketing Agency & Consulting | AJPR World',
    description: 'Scale qualified pipeline, lower CAC, and dominate search engines with senior B2B growth engineers.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'What does a B2B growth marketing agency do?',
    answer: 'A B2B growth marketing agency designs and executes full-funnel customer acquisition systems specifically for business-to-business brands. Unlike traditional agencies that focus merely on vanity impressions or blog volume, AJPR World engineers technical programmatic SEO, high-intent Google and LinkedIn ad funnels, Generative Engine Optimization (GEO) for AI citations, and high-converting landing page architectures tied directly to pipeline revenue and qualified sales meetings.'
  },
  {
    question: 'How much do B2B growth marketing services and retainers cost in 2026?',
    answer: 'Most reputable US B2B growth marketing agencies charge between $3,500 and $15,000 per month. AJPR World provides 100% transparent flat retainers: Foundation Sprint at $1,500/month, Growth Scale at $3,500/month, and Enterprise Pipeline at $7,500/month, with zero long-term lock-in and direct access to senior technical practitioners.'
  },
  {
    question: 'What is the difference between lead generation and B2B growth marketing?',
    answer: 'Lead generation typically focuses on capturing contact emails through gated PDFs, often yielding low-intent contacts that waste sales team capacity. B2B growth marketing creates demand throughout the entire buyer journey: educating buyers, engineering high-ranking comparison content, capturing high-intent organic and AI search queries, and delivering sales-qualified opportunities (SQOs) ready to purchase.'
  },
  {
    question: 'How does Generative Engine Optimization (GEO) fit into B2B growth marketing?',
    answer: 'Over 40% of B2B technology buyers now research software and agency vendors inside AI tools like ChatGPT, Perplexity, and Google Gemini before ever visiting a search engine. We structure your entity graph, Wikipedia/Wikidata citations, and comparative reviews so LLMs actively recommend and cite your business in conversational answers.'
  },
  {
    question: 'How quickly can we expect measurable growth pipeline results?',
    answer: 'Our high-intent paid acquisition and CRO funnels generate qualified inbound pipeline within the first 14 to 30 days. Technical SEO improvements, programmatic search clusters, and Generative Engine Optimization compound significantly between months 3 and 6, delivering sustainable, low-CAC customer acquisition.'
  }
];

export default function B2bGrowthMarketingPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Services', item: 'https://ajprworld.com/services' },
    { name: 'B2B Growth Marketing Agency', item: 'https://ajprworld.com/services/b2b-growth-marketing' },
  ];

  const serviceOffers = [
    {
      title: 'Foundation Growth Sprint',
      price: '$1,500',
      period: '/month',
      description: 'Ideal for early-stage B2B startups and niche service providers building their initial demand engine.',
      features: [
        'High-Intent Search Architecture Audit',
        'Conversion-Focused Landing Page Polish',
        'Topical Entity Graph & Schema Injection',
        'Google & LinkedIn High-Intent Ad Setup',
        'Direct Slack Access to Lead Growth Architect',
        'Bi-weekly Live Strategy & Pipeline Calls'
      ]
    },
    {
      title: 'Scale & Demand Generation',
      price: '$3,500',
      period: '/month',
      badge: 'Most Popular',
      description: 'Designed for scaling B2B SaaS and commercial service companies ($1M–$20M ARR) ready to dominate their category.',
      features: [
        'Full-Funnel Organic & Paid Acquisition Engine',
        'Generative Engine Optimization (GEO) for ChatGPT & Perplexity',
        'Programmatic SEO Cluster Building (10+ pages/mo)',
        'Competitor Comparison Page Intercepts',
        'Multi-Touch CRM & Pipeline Attribution Tracking',
        'Weekly Pipeline Sprints & Continuous CRO Testing'
      ]
    },
    {
      title: 'Enterprise Category Leader',
      price: '$7,500',
      period: '/month',
      description: 'For high-velocity enterprises requiring end-to-end growth engineering, custom AI agent funnels, and global expansion.',
      features: [
        'Dedicated Growth Engineering Pod',
        'Custom Multi-Agent AI Lead Triage Workflows',
        'International Multi-Region SEO & GEO Expansion',
        'Custom Next.js Interactive Calculators & Free Tools',
        'Executive Board-Ready Looker Studio Analytics',
        'SLA-Backed 24/7 Response Time & Dedicated Architect'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <ServiceSchema
        name="B2B Growth Marketing Agency & Consulting Services"
        description="Data-driven B2B growth marketing agency. Full-funnel demand generation, technical SEO, Generative Engine Optimization, and high-yield paid acquisition."
        providerName="AJPR World"
        url="https://ajprworld.com/services/b2b-growth-marketing"
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-medium">B2B Growth Marketing</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-14">
          <Badge variant="outline" className="px-3.5 py-1.5 text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 text-xs font-semibold uppercase tracking-wider mb-4 gap-1.5 inline-flex items-center">
            <TrendingUp className="w-3.5 h-3.5" /> High-Yield B2B Demand Generation
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            B2B Growth Marketing Agency <span className="text-blue-600 dark:text-blue-400">& Engineering</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
            Stop burning marketing budget on vanity impressions and disconnected agencies. We engineer data-backed B2B customer acquisition pipelines: combining high-intent technical SEO, Generative Engine Optimization (GEO) for AI search, and high-converting modern web systems.
          </p>

          {/* Quick Verdict AI Direct Extract Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/20 shadow-xl shadow-blue-500/5 mb-8">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" /> Quick Summary: The AJPR Growth Advantage
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>AJPR World</strong> is a full-funnel B2B growth marketing firm that replaces bloated agency retainers with transparent, engineering-led execution. We specialize in scaling high-intent organic search pipelines, capturing ChatGPT & Perplexity conversational buyer citations, and developing high-converting custom Next.js web applications—with published pricing starting from <strong>$1,500/month</strong> and zero long-term contract lock-in.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/book-call"
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              Book 30-Min Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
            >
              Explore Growth Retainers
            </Link>
          </div>
        </div>

        {/* Core Capabilities Grid */}
        <div className="mb-20">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Engineering-Led B2B Growth Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Traditional agencies outsource their engineering. We are senior software engineers and growth architects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">High-Intent Technical SEO</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                We target bottom-of-funnel decision-makers ready to purchase. Programmatic comparison hubs, solution pages, and Core Web Vitals optimization that drive qualified pipeline.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Competitor Alternative Clusters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Commercial Buyer Intent Keywords</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Programmatic Multi-Location Pages</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Generative Engine Optimization</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                Dominate conversational AI answers. We structure entity relationships, structured ItemList schemas, and authoritative citations so ChatGPT, Perplexity, and Gemini cite your brand.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> AI Overview Featured Cards</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Factual Entity Graph Consensus</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Synthetic Prompt Monitoring</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">High-Yield Paid Acquisition</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                Google Search and LinkedIn Ads built with strict multi-touch attribution. We eliminate ad spend waste by bidding exclusively on ready-to-convert problem and competitor terms.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /> Negative Keyword Sculpting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /> Dynamic Landing Page Personalization</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /> Pipeline Revenue Attribution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transparent Retainers Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Transparent Flat B2B Growth Retainers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              No hidden fees, no opaque hourly markups, and zero 12-month lock-in. Month-to-month flexibility aligned with your ARR milestones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceOffers.map((offer) => (
              <div 
                key={offer.title} 
                className={`p-8 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between transition-all relative ${
                  offer.badge 
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl' 
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {offer.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                    {offer.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{offer.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{offer.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{offer.price}</span>
                    <span className="text-sm font-semibold text-slate-500">{offer.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/book-call"
                  className={`w-full py-3 px-4 rounded-xl text-center text-sm font-bold transition-all ${
                    offer.badge
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  Select {offer.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture Widget */}
        <div className="mb-20">
          <ToolLeadCapture
            title="Get Your Free B2B Growth Pipeline Diagnostic"
            subtitle="Receive our tailored demand generation blueprint and technical SEO analysis directly to your inbox."
            badge="B2B Growth Diagnostic"
            ctaText="Request Custom Pipeline Audit"
            toolSource="b2b-growth-marketing-page"
            reportSummary={{
              headline: "Uncover Leaking Pipeline & High-CAC Inefficiencies",
              metrics: {
                "Target Organic Pipeline": "3.5x Inbound",
                "AI Search Citation Rate": "+280% Target",
                "Average Delivery Window": "14 Days"
              }
            }}
          />
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Frequently Asked Questions About B2B Growth Marketing
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Clear answers to the most common questions asked by B2B founders, CMOs, and heads of growth.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.question}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pl-4.5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-800/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to Accelerate Your Qualified Inbound Pipeline?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Book a 30-minute growth architecture review with our senior team. We will review your current search visibility, AI citation footprint, and paid acquisition economics.
            </p>
            <Link
              href="/book-call"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-base transition-all shadow-xl shadow-blue-500/25"
            >
              Book Strategy Session <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
