import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Cpu, CheckCircle2, ArrowRight, Sparkles, Network, Database, LineChart, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: 'Generative Engine Optimization (GEO) Agency | AJPR',
  description: 'Optimize your brand for ChatGPT, Google AI Overviews, and Perplexity. Generative Engine Optimization strategies backed by knowledge graph citations.',
  alternates: {
    canonical: 'https://ajprworld.com/services/geo-optimization',
  },
  openGraph: {
    title: 'Generative Engine Optimization (GEO) Agency | AJPR',
    description: 'Optimize your brand for ChatGPT, Google AI Overviews, and Perplexity. Generative Engine Optimization strategies backed by knowledge graph citations.',
    url: 'https://ajprworld.com/services/geo-optimization',
    siteName: 'AJPR World',
    type: 'article',
    images: ['https://ajprworld.com/og-image.jpg'],
  },
};

const faqs = [
  {
    question: 'What is Generative Engine Optimization (GEO)?',
    answer: 'Generative Engine Optimization (GEO) is the practice of optimizing digital assets, entity relationships, and factual content structures so that large language models (LLMs) like ChatGPT, Google Gemini/AI Overviews, and Perplexity actively cite and recommend your brand in conversational answers.'
  },
  {
    question: 'How does GEO differ from traditional SEO?',
    answer: 'Traditional SEO focuses on keyword rankings, backlinks, and search engine crawlers parsing HTML. GEO focuses on semantic entity graphs, citation consensus across high-trust databases (Wikipedia, Wikidata, G2, authoritative publications), factual information density, and format structures that LLMs can parse into direct generative answers.'
  },
  {
    question: 'How do you track if your brand is being cited by AI search engines?',
    answer: 'We deploy automated synthetic prompt monitoring across hundreds of commercial query variations in ChatGPT, Google AI Overviews, Perplexity, and Claude. We track citation frequency, brand sentiment, competitive co-citation share, and referral traffic driven by AI search platforms.'
  },
  {
    question: 'Does Google AI Overviews reduce organic website traffic?',
    answer: 'For simple informational queries (e.g., "what time is it in London"), zero-click answers have reduced traffic. However, for commercial and decision-stage queries, being cited as the recommended authority in an AI Overview generates significantly higher click-through intent and conversion rates than standard blue links.'
  }
];

export default function GeoOptimizationPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Generative Engine Optimization (GEO) Services',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    image: ['https://ajprworld.com/og-image.jpg'],
    areaServed: 'Global',
    description: 'Specialized optimization for ChatGPT, Google AI Overviews, Perplexity, and conversational AI search discovery.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-geo"
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
          <span className="text-slate-900 dark:text-slate-200">GEO Optimization</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" /> Next-Gen AI Search Strategy
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Generative Engine Optimization (GEO): Rank in ChatGPT & AI Overviews
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Search is no longer just ten blue links. Millions of buyers ask conversational questions directly into ChatGPT, Google Gemini, and Perplexity. We optimize your brand entity to ensure you are the cited authority when AI answers.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">AI Citation Growth Benchmark</div>
              <div className="text-2xl sm:text-3xl font-bold">+280% Citation Frequency in AI Overviews</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                Achieved across 250 commercial software queries by restructuring entity schema, original research studies, and verified third-party consensus citations.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Get Free GEO Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tactical GEO Framework */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            The 4 Pillars of Generative Engine Optimization
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Entity Establishment & Knowledge Graph Linking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your brand to recognized entity databases (Wikidata, Google Knowledge Graph, industry registers) with precise JSON-LD Organization and SameAs schema markup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Third-Party Consensus & Digital PR</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                LLMs synthesize answers from multiple independent sources. We earn citations and co-mentions across authoritative publications, podcasts, and review directories to establish factual consensus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Factual Extraction Architecture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We re-engineer your core pages with structured definition sentences, explicit comparison tables, and FAQ schemas that AI parsers can easily extract into direct conversational citations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">LLM Visibility & Share-of-Voice Tracking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Track your brand’s citation frequency across ChatGPT, Perplexity, and AI Overviews with automated daily synthetic prompting and sentiment analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison: SEO vs GEO */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Traditional SEO vs Generative Engine Optimization (GEO)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Dimension</th>
                  <th className="p-4 w-1/2">Traditional SEO</th>
                  <th className="p-4 w-1/2 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">GEO (Generative Engine Optimization)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Primary Goal</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Rank #1-3 on Google search results page</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-medium">Be cited and recommended in conversational AI responses</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Algorithm Engine</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Google RankBrain, PageRank, keyword indexes</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-medium">LLM neural embeddings (GPT-4o, Gemini 1.5, Claude 3.5)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Key Signals</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Keyword density, page speed, backlink volume</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-medium">Entity consensus, factual clarity, authoritative co-mentions</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Traffic Source</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Clicking blue links from desktop/mobile search</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-medium">Clicking citations in ChatGPT, Perplexity, and AI Overviews</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions About GEO
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
            Related Growth Resources & Research
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/research/agency-pricing-report" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              US Agency Pricing & Research Report (2026) →
            </Link>
            <Link href="/industries/saas-marketing" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SaaS Demand Gen & GEO Integration →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO & GEO Retainer Pricing →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Future-Proof Your Brand Against AI Disruption</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base">
            Find out if ChatGPT and Google AI Overviews are citing you or your competitors. Request a comprehensive GEO audit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Claim Free GEO Visibility Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
