import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Scale } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ItemListSchema } from '@/components/schema/ItemListSchema';
import AgencyMatchmakerClient from './AgencyMatchmakerClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Agency Comparisons & Alternatives Hub (2026 Guide) | AJPR World',
  description: 'Objective, transparent comparisons of digital agencies and software studios: Web Tonic, WebFX, Rootstrap, Altar.io, and regional alternatives, pricing & trade-offs.',
  alternates: {
    canonical: 'https://ajprworld.com/compare',
  },
  openGraph: {
    title: 'Agency Comparisons & Alternatives Hub (2026 Guide) | AJPR World',
    description: 'Objective, transparent comparisons of digital agencies and software studios: Web Tonic, WebFX, Rootstrap, Altar.io, and regional alternatives, pricing & trade-offs.',
    url: 'https://ajprworld.com/compare',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agency Comparisons & Alternatives Hub - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency Comparisons & Alternatives Hub (2026 Guide) | AJPR World',
    description: 'Objective, transparent comparisons of digital marketing agencies and software studios.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const comparisonItemList = [
  {
    name: '7 Best Web Tonic Alternatives in 2026 (Reviews & Pricing Breakdown)',
    description: 'Detailed analysis of Web Tonic pricing, retainer costs, client reviews, and the 7 best alternatives for high-velocity software engineering.',
    url: 'https://ajprworld.com/compare/webtonic-alternatives'
  },
  {
    name: 'Rootstrap Alternatives: 2026 AI Product Studio Evaluation',
    description: 'Comparing Rootstrap $50k–$150k enterprise quotes against AJPR World 2–4 week AI MVP sprints ($4,500) and Next.js 16 architectures.',
    url: 'https://ajprworld.com/compare/rootstrap-alternatives'
  },
  {
    name: 'Altar.io Alternatives: 2026 Startup Studio Evaluation',
    description: 'Compare Altar.io $40k–$90k discovery and development quotes with AJPR World fixed 2–4 week AI sprints ($4,500).',
    url: 'https://ajprworld.com/compare/altar-io-alternatives'
  },
  {
    name: '7 Best SmartSites Alternatives in 2026 (PPC & Web Studios Compared)',
    description: 'Comparing SmartSites PPC management and WordPress builds against custom Next.js 16 architectures with sub-second Core Web Vitals.',
    url: 'https://ajprworld.com/compare/smartsites-alternatives'
  },
  {
    name: 'Top 6 WebFX Alternatives & Competitors in 2026 (Pricing & Tech Stack)',
    description: 'Breakdown of WebFX pricing, MarketingCloudFX lock-in, and independent agile agency alternatives.',
    url: 'https://ajprworld.com/compare/webfx-alternatives'
  },
  {
    name: 'Single Grain Alternatives for Tech Startups',
    description: 'SaaS and tech venture marketing comparison with agile software engineering and AI agent workflows.',
    url: 'https://ajprworld.com/compare/single-grain-alternatives'
  },
  {
    name: 'DigiPhlox Alternatives: Haldwani Digital Marketing & SEO Comparison',
    description: 'Comparing DigiPhlox vs AJPR World: Next.js 15 vs WordPress, mobile speed, Google AI Overviews, and flat INR pricing.',
    url: 'https://ajprworld.com/compare/digiphlox-alternatives'
  },
  {
    name: 'The Infinix Alternatives & Agency Review in Haldwani',
    description: 'Detailed comparison of The Infinix vs AJPR World: services, technical SEO capabilities, and local Google Maps results.',
    url: 'https://ajprworld.com/compare/the-infinix-alternatives'
  }
];

const comparisons = [
  {
    title: '7 Best Web Tonic Alternatives in 2026 (Reviews & Pricing Breakdown)',
    slug: '/compare/webtonic-alternatives',
    target: 'Web Tonic vs AJPR World vs Traditional Agencies',
    description: 'An objective review of Web Tonic pricing, retainer structures, regional trade strengths, Next.js engineering depth, and transparent sprint models.',
    badge: 'Trending Analysis',
    category: 'us-agency' as const,
    highlights: ['US Market Reach', 'Sub-Second Next.js 16', 'Transparent Retainers ($1,500/mo)', 'Generative AI (GEO)']
  },
  {
    title: 'Rootstrap Alternatives: 2026 AI Product Studio Evaluation',
    slug: '/compare/rootstrap-alternatives',
    target: 'Rootstrap vs AJPR World vs Traditional Studios',
    description: 'Compare Rootstrap pricing ($50k–$150k) and 4-month timelines with AJPR World guaranteed 2–4 week AI MVP sprints, Next.js 16 architecture, and $4,500 fixed pricing.',
    badge: 'AI Studio Review #1',
    category: 'ai' as const,
    highlights: ['2–4 Week Sprints', '70% Cost Reduction ($4,500)', 'Next.js 16 + pgvector', '100% Client Repo Transfer']
  },
  {
    title: 'Altar.io Alternatives: 2026 Startup Studio Evaluation',
    slug: '/compare/altar-io-alternatives',
    target: 'Altar.io vs AJPR World vs Traditional Consultancies',
    description: 'Evaluate Altar.io discovery workshops ($40k–$90k) against AJPR World 2–4 week production AI MVP delivery, full TypeScript stack, and zero discovery bloat.',
    badge: 'MVP Studio Review #2',
    category: 'ai' as const,
    highlights: ['2–4 Week Build', '$4,500 Fixed Sprints', 'Next.js 16 + React 19', 'Full Code Ownership']
  },
  {
    title: '7 Best SmartSites Alternatives in 2026 (PPC & Web Studios)',
    slug: '/compare/smartsites-alternatives',
    target: 'SmartSites vs AJPR World',
    description: 'Compare SmartSites PPC management and WordPress builds against custom Next.js 16 architectures with sub-second Core Web Vitals and flat retainers.',
    badge: 'PPC & Speed Focus',
    category: 'us-agency' as const,
    highlights: ['Sub-1s Core Web Vitals', 'Custom Next.js vs WordPress', 'Transparent Ad Management', 'No Long Contracts']
  },
  {
    title: 'Top 6 WebFX Alternatives & Competitors in 2026',
    slug: '/compare/webfx-alternatives',
    target: 'WebFX vs AJPR World vs Traditional Agencies',
    description: 'A fair, comprehensive analysis of WebFX pricing, MarketingCloudFX software lock-in, junior account rotation, and why modern brands choose agile specialist partners.',
    badge: 'Enterprise Review',
    category: 'us-agency' as const,
    highlights: ['Pricing Transparency', 'Direct Senior Access', 'Zero Software Lock-in', '100% Data Ownership']
  },
  {
    title: 'Single Grain Alternatives for Tech Startups',
    slug: '/compare/single-grain-alternatives',
    target: 'Single Grain vs AJPR World',
    description: 'Comparing Single Grain for SaaS and tech ventures? Discover an agile partner providing hands-on software development, AI agent pipelines, and high-velocity GEO.',
    badge: 'SaaS & AI Focus',
    category: 'us-agency' as const,
    highlights: ['Hands-on Software Engineering', 'AI Agent Workflows', '$1,500 - $3,500/mo Retainers', 'SaaS Growth Architecture']
  },

  {
    title: 'DigiPhlox Alternatives & Comparison in Haldwani',
    slug: '/compare/digiphlox-alternatives',
    target: 'DigiPhlox vs AJPR World',
    description: 'Compare DigiPhlox vs AJPR World in Haldwani, Uttarakhand. Side-by-side analysis of Next.js 15 vs WordPress, mobile speed, Google AI Overviews, and flat INR pricing.',
    badge: 'Regional Haldwani #1',
    category: 'local' as const,
    highlights: ['Sub-50ms Next.js Speed', 'Google Maps 3-Pack', 'Flat INR Retainers (₹14,999/mo)', 'Generative AI (GEO)']
  },
  {
    title: 'The Infinix Alternatives & Agency Review',
    slug: '/compare/the-infinix-alternatives',
    target: 'The Infinix vs AJPR World',
    description: 'Looking for modern alternatives to The Infinix in Haldwani? Compare services, technical SEO capabilities, modern web development, and results side by side.',
    badge: 'Regional Local #2',
    category: 'local' as const,
    highlights: ['Custom Next.js Web Apps', 'Transparent Retainers', 'Local Google Maps Dominance', 'Month-to-Month Terms']
  }
];

export default function CompareHubPage() {
  const compareFaqs = [
    {
      question: 'What are the best ColorWhistle and Smart WebTech alternatives in 2026?',
      answer: 'For founders moving beyond standard WordPress builds from ColorWhistle or Smart WebTech, the top alternatives are AJPR World (for custom Next.js 16 applications, 2–4 week AI MVP sprints, and 100% code ownership from $1,500/mo), WebFX (for enterprise marketing automation), and Rootstrap (for venture-backed mobile builds).'
    },
    {
      question: 'How does SmartSites vs Scorpion compare for digital marketing agencies?',
      answer: 'Scorpion specializes in legal, medical, and home-service franchises with proprietary CMS lock-in, whereas SmartSites centers on SMB WordPress sites and paid search. Founders wanting sub-second Next.js web platforms with zero contract lock-in and full GitHub ownership choose AJPR World over both.'
    },
    {
      question: "How does ZealousWeb's pricing compare to other web agencies?",
      answer: 'Traditional offshore/hybrid agencies like ZealousWeb typically bid custom project scopes ($5,000–$25,000+) or hourly buckets ($25–$75/hr) that vary by team seniority. Modern engineering studios like AJPR World publish flat sprint rates ($1,500–$3,500/mo retainers or $4,500 fixed MVPs) directly upfront.'
    },
    {
      question: 'Which agency is best for measurable PR and B2B SaaS growth: Gabriel Marketing Group, Merritt Group, or AJPR World?',
      answer: 'Gabriel Marketing Group and Merritt Group are traditional B2B tech PR firms suited for venture-backed companies running analyst briefings and earned media retainers ($8,000–$20,000/mo). Growth-stage SaaS teams seeking measurable pipeline via technical SEO, Digital PR backlinks, and Generative Engine Optimization (GEO) for ChatGPT/Perplexity citations partner with AJPR World starting at $1,500–$3,500/mo.'
    }
  ];

  const compareCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Top Digital Agency Comparisons & Alternatives Hub (2026 Directory)',
    description: 'Objective, data-driven comparisons of top digital marketing agencies, software product studios, and local web development companies.',
    brand: {
      '@type': 'Brand',
      name: 'AJPR World'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '56',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={compareFaqs} />
      <Script
        id="compare-hub-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareCatalogSchema) }}
      />
      <ItemListSchema 
        name="Digital Marketing Agency Alternatives & Comparisons (2026 Directory)"
        description="Side-by-side agency comparisons, software lock-in analysis, and retainers for modern growth brands."
        items={comparisonItemList}
      />
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> Buyer’s Decision Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Digital Agency Comparisons, Reviews & Top Alternatives (2026)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Hiring the wrong digital agency costs tens of thousands in lost revenue, wasted months, and hostage source code. We publish transparent, data-backed comparisons across <Link href="/pricing/seo-cost" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">2026 SEO retainer costs</Link>, <Link href="/pricing/website-cost" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">website pricing</Link>, and <Link href="/services/b2b-growth-marketing" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">B2B growth capabilities</Link>.
          </p>
        </div>

        {/* Interactive Masterclass Matchmaker Client */}
        <AgencyMatchmakerClient
          comparisons={comparisons}
        />

        {/* Quick Alternative & Pricing FAQ Directory */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Agency Alternative &amp; Pricing Questions (2026)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {compareFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
