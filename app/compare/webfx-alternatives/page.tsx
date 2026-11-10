import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Scale } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ItemListSchema } from '@/components/schema/ItemListSchema';
import WebFxComparisonClient from './WebFxComparisonClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'WebFX Alternatives & Agency Comparison (2026 Breakdown) | AJPR World',
  description: 'An objective 2026 comparison of WebFX pricing, MarketingCloudFX software lock-in, and account models compared to agile software engineering studios.',
  alternates: {
    canonical: 'https://ajprworld.com/compare/webfx-alternatives',
  },
  openGraph: {
    title: 'WebFX Alternatives & Agency Comparison (2026 Breakdown) | AJPR World',
    description: 'An objective 2026 comparison of WebFX pricing, MarketingCloudFX software lock-in, and account models compared to agile software engineering studios.',
    url: 'https://ajprworld.com/compare/webfx-alternatives',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebFX Alternatives Comparison - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebFX Alternatives & Agency Comparison (2026 Breakdown) | AJPR World',
    description: 'Transparent comparison of WebFX vs modern agile engineering studios: pricing, code ownership, and execution speed.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const topWebfxAlternatives = [
  {
    name: 'AJPR World',
    description: 'Best overall WebFX alternative for direct senior engineer access, Next.js software architecture, Generative Engine Optimization (GEO), and transparent retainers with zero platform lock-in.',
    url: 'https://ajprworld.com'
  },
  {
    name: 'SmartSites',
    description: 'Best for small to mid-sized businesses looking for PPC management and WordPress development without enterprise-tier setup fees.',
    url: 'https://ajprworld.com/compare/smartsites-alternatives'
  },
  {
    name: 'Single Grain',
    description: 'Best for venture-backed tech companies and high-growth SaaS founders seeking digital marketing and podcast production.',
    url: 'https://ajprworld.com/compare/single-grain-alternatives'
  },
  {
    name: 'Disruptive Advertising',
    description: 'Best for e-commerce companies investing heavily in Meta, Google Shopping, and TikTok ad optimization.',
    url: 'https://ajprworld.com/compare'
  },
  {
    name: 'Web Tonic',
    description: 'Best for regional service trades and contractors seeking local review generation and standard web design.',
    url: 'https://ajprworld.com/compare/webtonic-alternatives'
  }
];

const faqs = [
  {
    question: 'Is WebFX worth the cost for small to mid-sized businesses?',
    answer: 'WebFX is a well-established agency with over 25 years in business, but their pricing includes substantial corporate overhead to support 500+ employees and proprietary software development. For brands seeking direct senior strategist access, flexible month-to-month contracts, and complete data ownership without software lock-in, an agile specialist agency like AJPR World often provides significantly higher ROI.'
  },
  {
    question: 'What happens to MarketingCloudFX data if I leave WebFX?',
    answer: 'MarketingCloudFX is a proprietary closed-ecosystem tool owned by WebFX. If you terminate your engagement, you lose access to the platform dashboard, call recordings, and internal lead score history. At AJPR World, we build all tracking into client-owned accounts (GA4, Looker Studio, HubSpot, Google Ads) so you retain 100% data ownership forever.'
  },
  {
    question: 'How do WebFX pricing models compare to AJPR World?',
    answer: 'WebFX typically requires tiered retainers starting at $3,000–$5,000/month with substantial setup fees and 6–12 month contract commitments. AJPR World offers transparent fixed retainers starting from $1,500/month for local growth and $3,500/month for scaling B2B/e-commerce brands, with no long-term lock-in traps.'
  },
  {
    question: 'Who actually works on my account at AJPR World vs WebFX?',
    answer: 'At large legacy firms like WebFX, communication flows through an account coordinator who relays tasks to offshore or junior production queues. At AJPR World, you partner directly with senior software engineers, technical SEO architects, and acquisition strategists who execute your campaigns firsthand.'
  }
];

export default function WebFxAlternativesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <ItemListSchema 
        name="Top 5 WebFX Alternatives (2026 Agency Evaluation)"
        description="Objective comparison of leading WebFX alternatives evaluated on pricing transparency, client data ownership, Next.js engineering capabilities, and team seniority."
        items={topWebfxAlternatives}
      />
      <Script
        id="webfx-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "WebFX Alternatives & Agency Comparison",
            "description": "Objective side-by-side evaluation of WebFX vs modern agile engineering agencies.",
            "brand": {
              "@type": "Brand",
              "name": "AJPR World"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "48",
              "bestRating": "5",
              "worstRating": "1"
            },
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "1500",
              "highPrice": "7500",
              "priceCurrency": "USD",
              "offerCount": "5"
            }
          })
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">WebFX Alternatives</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> 2026 Agency Evaluation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            WebFX Reviews, Pricing & Top 5 Alternatives (2026 Breakdown)
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
            WebFX is one of the largest digital marketing firms in the United States. But is a 500-person enterprise agency with proprietary software lock-in the right partner for your growth goals? Review an objective side-by-side analysis of the top alternatives.
          </p>

          {/* Editorial Comparison: Objective Evaluation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed shadow-xs space-y-3">
            <div className="font-semibold text-slate-900 dark:text-white text-base">
              The Strategic Difference: 500-Person Enterprise Agency vs. Direct Senior Engineering Studio
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              <strong>When WebFX makes sense:</strong> If your company is a mid-market or enterprise organization that wants an all-in-one corporate agency with hundreds of team members and proprietary CRM software (MarketingCloudFX), WebFX offers established enterprise infrastructure.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              <strong>When AJPR World makes sense:</strong> If you want to work directly with senior software engineers without junior account manager handoffs, avoid proprietary software lock-in, and get custom Next.js platforms built in 2–4 weeks with 100% code ownership, AJPR World provides an agile, transparent partnership.
            </p>
          </div>
        </div>

        {/* Interactive Masterclass Comparison Client */}
        <WebFxComparisonClient
          topAlternatives={topWebfxAlternatives}
          faqs={faqs}
        />
      </div>
    </div>
  );
}
