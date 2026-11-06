import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, Globe, Award, HelpCircle, Zap, Code, Sparkles, Cpu, Clock, Layers } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ItemListSchema } from '@/components/schema/ItemListSchema';
import ToolLeadCapture from '@/components/ToolLeadCapture';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Top 5 Rootstrap Alternatives for AI Startups in 2026 (Pricing & Sprints Compared) | AJPR',
  description: 'Compare the top 5 Rootstrap alternatives in 2026. Discover how AJPR World delivers production-ready AI MVP sprints in 2–4 weeks for $4,500 vs $50k–$150k enterprise agency quotes.',
  alternates: {
    canonical: 'https://ajprworld.com/compare/rootstrap-alternatives',
  },
  openGraph: {
    title: 'Top 5 Rootstrap Alternatives for AI Startups in 2026 (Pricing & Sprints Compared) | AJPR',
    description: 'Compare the top 5 Rootstrap alternatives in 2026. Discover how AJPR World delivers production-ready AI MVP sprints in 2–4 weeks for $4,500 vs $50k–$150k enterprise agency quotes.',
    url: 'https://ajprworld.com/compare/rootstrap-alternatives',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rootstrap Alternatives 2026 Comparison - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 5 Rootstrap Alternatives for AI Startups in 2026 | AJPR World',
    description: 'Objective comparison of Rootstrap vs agile AI product studios: pricing, sprint velocity, tech stack, and code ownership.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const topAlternatives = [
  {
    name: 'AJPR World',
    description: 'Best overall Rootstrap alternative for venture-backed and bootstrapped startups needing 2–4 week AI MVP delivery, full Next.js 16 + React 19 + PostgreSQL architecture, and transparent flat pricing ($4,500 sprint).',
    url: 'https://ajprworld.com'
  },
  {
    name: 'Altar.io',
    description: 'Best for European founders seeking extended product discovery workshops and traditional bespoke scoping.',
    url: 'https://ajprworld.com/compare'
  },
  {
    name: 'Netguru',
    description: 'Best for enterprise corporations requiring a massive 500+ person design and engineering bench.',
    url: 'https://ajprworld.com/compare'
  },
  {
    name: 'Simform',
    description: 'Best for enterprise-scale cloud migrations and complex multi-region AWS/GCP infrastructure pipelines.',
    url: 'https://ajprworld.com/compare'
  },
  {
    name: 'In-House Senior Developer',
    description: 'Best for post-Series A startups with $250k+ annual budget for dedicated full-time engineering hires.',
    url: 'https://ajprworld.com/pricing/website-cost'
  }
];

const faqs = [
  {
    question: 'How does AJPR World differ from Rootstrap?',
    answer: 'Rootstrap is an established, high-overhead enterprise agency charging $150–$250/hour with typical MVP budgets starting at $50,000–$150,000 and 3–6 month timelines. AJPR World is a senior, agile engineering firm that delivers production-grade AI MVPs in fixed 2–4 week sprints for a transparent flat fee of $4,500 (or $5,500/mo for a dedicated engineering pod) with 100% full repo and IP transfer.'
  },
  {
    question: 'Why do traditional agencies like Rootstrap quote $50,000+ for an MVP?',
    answer: 'Large agencies carry high administrative overhead, dedicated account managers, sales commissions, and lengthy 4–6 week discovery phases before writing code. AJPR World eliminates agency bloat: senior engineers and AI architects scope constraints in 48 hours and begin building immediately on modern Next.js 16, React 19, and PostgreSQL foundations.'
  },
  {
    question: 'What technology stack does AJPR World use for AI MVPs?',
    answer: 'We build on modern, sub-second architectures: Next.js 16 App Router, React 19, TypeScript, PostgreSQL (Neon / Supabase), pgvector, Tailwind CSS, and edge deployment via Vercel or AWS. For AI, we deploy context-aware RAG pipelines, fine-tuned open-weight models, and autonomous agent workflows.'
  },
  {
    question: 'Do I own 100% of the code and intellectual property?',
    answer: 'Yes, 100%. From Day 1, all code is written directly to your private GitHub organization with full IP assignment upon sprint completion. Unlike agencies that push proprietary CMS tools or software subscriptions, you retain total ownership with zero vendor lock-in.'
  },
  {
    question: 'How fast can we launch an AI MVP sprint with AJPR World?',
    answer: 'Following a 30-minute strategy call and scoping alignment, sprints kick off within 48 to 72 hours. Your functional, production-ready MVP is delivered within 14 to 28 days with a 30-day post-launch warranty.'
  }
];

export default function RootstrapAlternativesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <ItemListSchema 
        name="Top 5 Rootstrap Alternatives for AI Startups (2026 Evaluation)"
        description="Comprehensive evaluation of leading Rootstrap alternatives based on technical velocity, sprint pricing, code ownership, and AI MVP architecture."
        items={topAlternatives}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Rootstrap Alternatives</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> 2026 Product Studio Evaluation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Top 5 Rootstrap Alternatives in 2026: Pricing, Velocity & AI MVPs Compared
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Searching for alternatives to Rootstrap? Compare pricing models, delivery speeds, code ownership, and AI engineering depth between traditional enterprise studios and agile, fixed-sprint partners.
          </p>
        </div>

        {/* AI Overview / Direct Extract: Quick Verdict Block */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-md">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" /> Quick Verdict: Best Rootstrap Alternatives at a Glance
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Which Rootstrap Alternative Is Best for Your Startup?
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            <p>
              According to AJPR World's 2026 Startup Engineering Audit, while <strong>Rootstrap</strong> offers high-caliber engineering for venture-backed brands, their <strong>$50,000 – $150,000+ budgets</strong> and <strong>3–6 month timelines</strong> create severe friction for fast-moving founders. Modern startups looking to validate and launch AI products choose from these alternatives:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">1. AJPR World: </span>
                    <strong className="text-slate-900 dark:text-white">#1 Rated for Velocity & Value.</strong>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Guaranteed 2–4 week AI MVP sprints for a flat <strong>$4,500</strong> (or $5,500/mo dedicated engineering pod). Built on Next.js 16, React 19, PostgreSQL, and autonomous AI agents with 100% full GitHub IP transfer.
                    </p>
                  </div>
                  <Link 
                    href="/book-call" 
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
                  >
                    Book Sprint Scoping <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">2. Altar.io:</span>
                <span><strong>Best for European founders.</strong> Specialized in early validation and investor decks, though charges $40k–$90k with extended discovery phases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">3. Netguru:</span>
                <span><strong>Best for enterprise corporations.</strong> Large agency capacity with 500+ engineers, best suited for companies with $100k+ quarterly software budgets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">4. Simform:</span>
                <span><strong>Best for enterprise cloud migrations.</strong> Excellent for large-scale microservices and AWS infrastructure, but lacks rapid MVP sprint packaging.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">5. In-House Senior US Hire:</span>
                <span><strong>Best for post-Series A ventures.</strong> Gives total dedicated control, but incurs $180k–$240k/yr salary plus 28% overhead and a 3-month hiring cycle.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Detailed Comparison: Rootstrap vs AJPR World vs Traditional Dev Shops
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Criteria</th>
                  <th className="p-4 w-1/4">Rootstrap</th>
                  <th className="p-4 w-1/4 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">AJPR World</th>
                  <th className="p-4 w-1/4">Traditional Dev Agencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Typical MVP Investment</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">$50,000 – $150,000+ ($150–$250/hr)</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> $4,500 Sprint or $5,500/mo Pod
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">$40,000 – $100,000+</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Delivery Timeline</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">12 – 24 Weeks (3–6 Months)</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Guaranteed 2 – 4 Weeks
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">16 – 20 Weeks</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Core Technology Stack</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Ruby on Rails, Python, React Native</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Next.js 16, React 19, PostgreSQL, pgvector
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">PHP, Python Django, Node.js</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Code & IP Ownership</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Standard contract on final settlement</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 100% Client Repo from Day 1
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Varied (often withheld until final signoff)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">AI Search & Growth Readiness</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Engineering only (No SEO/GEO)</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Built-in Generative AI (GEO) Architecture
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Separate marketing agency required</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Direct Senior Access</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Account managers & project coordinators</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Direct Slack Channel with Senior Engineers
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Tiered ticketing support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive: Why Founders Choose AJPR World over Rootstrap */}
        <section className="mb-16 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Why Ambitious Startups Choose AJPR World over Rootstrap
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">4-Week Delivery vs 4-Month Discovery</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In the AI era, speed is your primary defensive moat. While traditional agencies spend 6 weeks drafting user personas and wireframe decks, AJPR World builds and deploys functional software in 2–4 weeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">70% Cost Reduction ($4,500 Fixed Sprints)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We eliminate sales reps, corporate office leases, and account manager bloat. You pay exclusively for senior engineering hours, saving $45,000+ that you can direct toward user acquisition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sub-Second Modern Next.js Architecture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We engineer with Next.js 16, React 19, and PostgreSQL with pgvector. Your web application scores 99+ on Google Core Web Vitals, outperforming legacy Ruby and Django monoliths on mobile devices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Autonomous Agent & RAG Pipelines</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Rather than shallow OpenAI API wrappers, we architect grounded RAG pipelines with vector databases, semantic caching, token optimization, and autonomous multi-step agents.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Capture Embed */}
        <section className="mb-16">
          <ToolLeadCapture
            title="Download the 2026 AI MVP Development & Agency RFP Framework"
            subtitle="Get our 12-point engineering scope checklist, vector database cost calculator, and vendor evaluation matrix used by 50+ startup founders."
          />
        </section>

        {/* Cross-Link Silo Hub */}
        <section className="mb-16 p-8 rounded-3xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore Related Engineering Benchmarks & Agency Comparisons
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Data-driven reports, pricing calculators, and objective evaluations to inform your software decisions:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="/pricing/website-cost"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Pricing Guide</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Website Cost Calculator</h4>
              <p className="text-xs text-slate-500 mt-1">Interactive breakdown for web builds from $3,500 to $45,000+.</p>
            </Link>

            <Link
              href="/services/website-maintenance-cost"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">SLA Breakdown</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Maintenance Costs 2026</h4>
              <p className="text-xs text-slate-500 mt-1">Transparent retainer benchmarks ($149 – $899/mo) with 24/7 SLA.</p>
            </Link>

            <Link
              href="/compare/webfx-alternatives"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Competitor Audit</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">WebFX Alternatives</h4>
              <p className="text-xs text-slate-500 mt-1">Comparing MarketingCloudFX software lock-in vs open source.</p>
            </Link>

            <Link
              href="/compare/webtonic-alternatives"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Agency Audit</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Web Tonic Alternatives</h4>
              <p className="text-xs text-slate-500 mt-1">Regional trade focus vs full-stack custom engineering.</p>
            </Link>

            <Link
              href="/pricing/seo-cost"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Growth Retainers</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">SEO & GEO Cost Guide</h4>
              <p className="text-xs text-slate-500 mt-1">Generative Engine Optimization tiers from $1,500/month.</p>
            </Link>

            <Link
              href="/tools/agency-pricing-calculator"
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-800 transition-colors group"
            >
              <span className="text-xs font-mono uppercase text-slate-400 group-hover:text-blue-500 font-bold">Free Calculator</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600">Agency ROI Estimator</h4>
              <p className="text-xs text-slate-500 mt-1">Calculate true savings of pods vs in-house $200k hires.</p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions: Choosing a Rootstrap Alternative
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your AI MVP in 2–4 Weeks?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Skip the $80,000 agency markups and 4-month waiting periods. Get senior engineers, modern Next.js 16 architecture, and complete code ownership.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-call"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all shadow-md"
            >
              Book 30-Min Strategy Call
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white font-bold rounded-xl text-sm transition-all"
            >
              View Transparent Sprint Pricing
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

