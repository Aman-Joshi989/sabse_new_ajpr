import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Zap, Code2, LineChart, CheckCircle2, ArrowRight, ShieldCheck, Gauge, Globe, FileCode2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { TopicalClusterWidget } from '@/components/seo/TopicalClusterWidget';

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Technical SEO Services, GBP Optimization & Core Web Vitals | AJPR World',
  description: 'Technical SEO engineering: Core Web Vitals, Google Business Profile (GBP) optimization, Digital PR SEO backlinks, semantic JSON-LD schema, and Next.js indexing.',
  alternates: {
    canonical: 'https://ajprworld.com/services/technical-seo',
  },
  openGraph: {
    title: 'Technical SEO Services & Core Web Vitals Optimization | AJPR World',
    description: 'Technical SEO engineering: Core Web Vitals optimization, semantic JSON-LD schema architecture, crawl efficiency, and Next.js server-side indexing.',
    url: 'https://ajprworld.com/services/technical-seo',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Technical SEO Services - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical SEO Services | AJPR World',
    description: 'Fix indexing bottlenecks, pass Core Web Vitals, and build scalable organic search infrastructure.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How is AJPR World’s Technical SEO different from traditional SEO agencies?',
    answer: 'Traditional agencies focus exclusively on writing blog articles and buying low-grade backlinks. AJPR World is an engineering firm: we optimize server response times (TTFB), resolve Next.js dynamic rendering bottlenecks, inject semantic JSON-LD entity graphs, eliminate orphan pages, and pass Google’s Core Web Vitals (LCP, INP, CLS) in code.'
  },
  {
    question: 'How do you optimize modern JavaScript and Next.js applications for search crawlers?',
    answer: 'We audit and configure Incremental Static Regeneration (ISR), Server-Side Rendering (SSR), self-referencing canonical tags, clean sitemap XML generation, and edge-level header caching to ensure Googlebot and generative search engines can parse 100% of your content without client-side execution delays.'
  },
  {
    question: 'Does technical SEO help with AI search visibility (GEO)?',
    answer: 'Yes, absolutely. LLMs and Generative AI engines (ChatGPT, Perplexity, Gemini) rely on dense factual information architecture, clean semantic entity graphs (schema.org), and crawlable markdown/HTML to discover, summarize, and cite your brand.'
  },
  {
    question: 'What is Google Business Profile (GBP) optimization and why does it drive local traffic?',
    answer: 'Google Business Profile (GBP) optimization combines primary/secondary category engineering, LocalBusiness schema synchronization, geo-tagged service photos, and localized landing page NAP consistency to secure Google Maps 3-Pack rankings.'
  },
  {
    question: 'How do PR SEO services and Digital PR boost organic rankings?',
    answer: 'PR SEO services combine data-driven industry research and reactive journalism to earn high-DR editorial backlinks from authoritative publications, accelerating domain rating and entity trust across London, US, and global markets.'
  },
  {
    question: 'How do SEO platforms compare for agency use in terms of pricing and features?',
    answer: 'Ahrefs ($129–$449/mo) and Semrush ($139–$499/mo) lead in backlink and keyword intelligence, while Screaming Frog ($259/yr) handles deep technical crawl diagnostics. Pairing enterprise diagnostics with AJPR World technical execution eliminates SaaS bloat.'
  },
  {
    question: 'How quickly do Core Web Vitals improvements reflect in Google Search Console?',
    answer: 'Google evaluates Core Web Vitals over a rolling 28-day Field Data collection cycle (CrUX). Code-level lab improvements take effect immediately upon deployment, with official Search Console validation green status typically consolidating within 2 to 4 weeks.'
  }
];

export default function TechnicalSeoPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Services', item: 'https://ajprworld.com/services' },
    { name: 'Technical SEO Services', item: 'https://ajprworld.com/services/technical-seo' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ServiceSchema
        name="Technical SEO Services"
        description="Comprehensive technical search engine optimization, Core Web Vitals engineering, Next.js App Router crawlability, semantic JSON-LD entity schema, and indexing bottleneck removal."
        providerName="AJPR World"
        url="https://ajprworld.com/services/technical-seo"
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-100/80 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <Badge className="mb-6 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
            Engineering-Led Search Optimization
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            Technical SEO Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400">
              Built for Modern Web Architectures
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Eliminate crawl debt, resolve JavaScript indexing bottlenecks, and pass Core Web Vitals with code-level optimizations that compound organic revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Get Technical SEO Audit</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-colors" asChild>
              <Link href="/pricing/seo-cost">Review SEO Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Audit & Optimization Breakdown */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Code-Level Technical SEO Deliverables
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
              We fix the underlying infrastructure issues that prevent Googlebot and AI crawlers from indexing your high-value pages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Core Web Vitals Engineering</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct code refactoring to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sub-500ms Time To First Byte (TTFB)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Font display & render-blocking CSS elimination</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileCode2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Semantic JSON-LD & Entity Graphs</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Multi-layered schema architecture covering Organization, LocalBusiness, Service, Product, and FAQPage for Google Rich Snippets & AI citation.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Rich Result validation in GSC</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Knowledge graph entity interconnection</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Crawl Budget & Indexing Efficiency</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Eliminate orphan pages, canonical conflicts, redirect loops, and crawl traps with automated XML sitemaps, IndexNow pings, and robots.txt tuning.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Zero orphan URL architecture</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Real-time search engine index pinging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical SEO, GBP & PR FAQ Section */}
      <section className="container mx-auto px-4 max-w-4xl py-12">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            Technical Engineering &amp; Local SEO
          </Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical SEO, GBP Optimization &amp; Digital PR FAQs
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cluster Interlink Widget */}
      <div className="container mx-auto px-4 max-w-5xl">
        <TopicalClusterWidget
          currentSiloTitle="Technical SEO, GBP Optimization & AI Citations Silo"
          pillarHref="/services/b2b-growth-marketing"
          pillarAnchor="B2B Growth Marketing Agency & Retainers"
          relatedLinks={[
            {
              badge: "AI Citations",
              title: "Generative Engine Optimization (GEO)",
              href: "/services/geo-optimization",
              description: "Rank inside ChatGPT, Perplexity, and Google AI Overviews with entity graphs."
            },
            {
              badge: "Pricing Guide",
              title: "SEO Retainer Cost in 2026",
              href: "/pricing/seo-cost",
              description: "Compare transparent monthly SEO retainers ($1,500–$8,500/mo) and international SEO."
            },
            {
              badge: "London PR & Local HQ",
              title: "Digital PR Agency London & Haldwani GBP",
              href: "/locations/london/digital-marketing",
              description: "High-authority UK digital PR backlinks and Google Business Profile local pack dominance."
            }
          ]}
        />
      </div>

      {/* Conversion Section */}
      <section className="container mx-auto px-4 max-w-4xl pt-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl text-center space-y-6">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1">
            Accelerate Organic Visibility
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to Unblock Your Website’s Organic Traffic Bottleneck?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Get an in-depth technical crawl audit, Core Web Vitals remediation plan, and structured data roadmap from senior engineers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Book Strategy Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold text-sm transition-colors" asChild>
              <Link href="/pricing">View Pricing & Sprints</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

