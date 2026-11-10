import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Scale } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ItemListSchema } from '@/components/schema/ItemListSchema';
import WebTonicComparisonClient from './WebTonicComparisonClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Web Tonic Alternatives & Agency Comparison (2026 Guide) | AJPR World',
  description: 'An objective 2026 comparison of Web Tonic pricing, services, and trade-offs against modern web studios. Discover when traditional agencies make sense vs. direct engineering.',
  alternates: {
    canonical: 'https://ajprworld.com/compare/webtonic-alternatives',
  },
  openGraph: {
    title: 'Web Tonic Alternatives & Agency Comparison (2026 Guide) | AJPR World',
    description: 'An objective 2026 comparison of Web Tonic pricing, services, and trade-offs against modern web studios.',
    url: 'https://ajprworld.com/compare/webtonic-alternatives',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Tonic Alternatives & Agency Comparison - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Tonic Alternatives & Agency Comparison (2026 Guide) | AJPR World',
    description: 'An objective 2026 comparison of Web Tonic pricing, services, and trade-offs against modern web studios.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const topAlternatives = [
  {
    name: 'AJPR World',
    description: 'Best overall Web Tonic alternative for full-stack Next.js engineering, Generative Engine Optimization (GEO), and transparent fixed pricing ($1,500 – $3,500/mo).',
    url: 'https://ajprworld.com'
  },
  {
    name: 'WebFX',
    description: 'Best for enterprise companies needing a large 500+ employee agency and proprietary MarketingCloudFX reporting software.',
    url: 'https://ajprworld.com/compare/webfx-alternatives'
  },
  {
    name: 'SmartSites',
    description: 'Best for small local businesses prioritizing PPC ad management and traditional WordPress site maintenance.',
    url: 'https://ajprworld.com/compare/smartsites-alternatives'
  },
  {
    name: 'Disruptive Advertising',
    description: 'Best for mid-market e-commerce brands investing primarily in multi-channel paid social campaigns (Meta, TikTok).',
    url: 'https://ajprworld.com/compare'
  },
  {
    name: 'Single Grain',
    description: 'Best for VC-backed tech startups focused on crypto, Web3, and brand podcast production.',
    url: 'https://ajprworld.com/compare/single-grain-alternatives'
  }
];

const faqs = [
  {
    question: 'How does AJPR World differ from Web Tonic?',
    answer: 'While Web Tonic has built strong review volume and local trade presence in regional markets, AJPR World offers nationwide US full-service digital growth, full-stack Next.js 16 and Webflow engineering, Generative Engine Optimization (GEO) for ChatGPT and Perplexity citations, and 100% transparent pricing starting from $1,500/month.'
  },
  {
    question: 'What platforms do you support compared to Web Tonic?',
    answer: 'Both agencies have strong Webflow and Shopify competencies. In addition, AJPR World specializes in custom Next.js full-stack software, headless e-commerce architectures, and programmatic SEO hubs that scale to hundreds of high-ranking landing pages.'
  },
  {
    question: 'Do you publish transparent pricing?',
    answer: 'Yes. Web Tonic generally keeps pricing hidden behind sales calls, whereas AJPR World publishes transparent retainer tiers starting from $1,500/month for localized growth and $3,500/month for scaling multi-channel brands with zero long-term contract lock-in.'
  },
  {
    question: 'How does AJPR World optimize for Google AI Overviews and ChatGPT?',
    answer: 'We implement Generative Engine Optimization (GEO). We inject high-density factual definitions, ItemList schemas, and structured entity graphs so AI engines like Perplexity, ChatGPT, and Google Gemini accurately cite your business in conversational answers.'
  },
  {
    question: 'Is Web Tonic the same company as WP-Tonic?',
    answer: 'No. Web Tonic is an international full-service web design and digital marketing agency, whereas WP-Tonic is a managed WordPress hosting and development platform specializing in LMS (Learning Management Systems) and membership websites. AJPR World provides superior modern alternatives to both by delivering custom Next.js full-stack software, headless course/membership platforms, and high-converting SEO funnels.'
  }
];

export default function WebTonicAlternativesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <ItemListSchema 
        name="Top 5 Web Tonic Alternatives (2026 Agency Evaluation)"
        description="Comprehensive evaluation of the leading alternatives to Web Tonic based on technical capability, pricing transparency, and Generative Engine Optimization."
        items={topAlternatives}
      />
      <Script
        id="review-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Web Tonic Alternatives & Agency Comparison",
            "description": "Objective side-by-side evaluation of Web Tonic vs high-velocity modern engineering agencies.",
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
              "highPrice": "6500",
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
          <span className="text-slate-900 dark:text-slate-200">Web Tonic Alternatives</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> 2026 Agency Evaluation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Web Tonic Reviews, Pricing & Top 5 Alternatives (2026 Breakdown)
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Evaluating Web Tonic for your web design or marketing needs? Review an objective side-by-side analysis of pricing transparency, modern Next.js 16 engineering, Generative Engine Optimization (GEO), and code ownership.
          </p>
        </div>

        {/* Interactive Masterclass Comparison Client */}
        <WebTonicComparisonClient
          topAlternatives={topAlternatives}
          faqs={faqs}
        />
      </div>
    </div>
  );
}
