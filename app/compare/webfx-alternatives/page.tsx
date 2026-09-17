import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, DollarSign, Users, Award, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: 'WebFX Alternatives: 2026 Agency Comparison & Review | AJPR',
  description: 'Comparing WebFX alternatives? See our transparent side-by-side analysis of pricing, team senior expertise, proprietary lock-in, and deliverable agility.',
  alternates: {
    canonical: 'https://ajprworld.com/compare/webfx-alternatives',
  },
  openGraph: {
    title: 'WebFX Alternatives: 2026 Agency Comparison & Review | AJPR',
    description: 'Comparing WebFX alternatives? See our transparent side-by-side analysis of pricing, team senior expertise, proprietary lock-in, and deliverable agility.',
    url: 'https://ajprworld.com/compare/webfx-alternatives',
    siteName: 'AJPR World',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Is WebFX worth the cost for small to mid-sized businesses?',
    answer: 'WebFX is a well-established agency with over 25 years in business, but their pricing includes substantial overhead to support 500+ employees and proprietary software development. For brands seeking direct senior strategist access, flexible month-to-month contracts, and complete data ownership without software lock-in, an agile specialist agency like AJPR World often provides significantly higher ROI.'
  },
  {
    question: 'What happens to MarketingCloudFX data if I leave WebFX?',
    answer: 'MarketingCloudFX is a proprietary closed-ecosystem tool owned by WebFX. If you terminate your engagement, you lose access to the platform dashboard, call recordings, and internal lead score history. At AJPR World, we build all tracking into client-owned accounts (GA4, Looker Studio, HubSpot, Google Ads) so you retain 100% data ownership forever.'
  },
  {
    question: 'How do WebFX pricing models compare to AJPR World?',
    answer: 'WebFX typically requires tiered retainers starting at $3,000-$5,000/month with setup fees and longer-term contract commitments. AJPR World offers transparent fixed retainers starting from $1,500/month for local growth and $3,500/month for scaling B2B/e-commerce, with no long-term lock-in traps.'
  },
  {
    question: 'Who actually works on my account at AJPR World vs WebFX?',
    answer: 'At large legacy firms like WebFX, communication flows through an account coordinator who relays requests to offshore or junior production queues. At AJPR World, you partner directly with senior SEO engineers and paid acquisition strategists who execute your campaigns firsthand.'
  }
];

export default function WebFxAlternativesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />

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
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" /> 2026 Agency Evaluation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            WebFX Alternatives: Transparent Agency Comparison (2026)
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            WebFX is one of the largest digital marketing agencies in the United States. But is a 500-person enterprise firm with proprietary software lock-in the right partner for your growth goals? Review an objective side-by-side analysis.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 to-slate-900 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">The AJPR Agility Advantage</div>
              <div className="text-2xl sm:text-3xl font-bold">100% Senior Practitioner Execution</div>
              <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
                Zero middle-manager bloat. You work directly with technical SEO architects and paid media specialists on flexible month-to-month terms.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-600/25"
            >
              Get Custom Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Side-by-Side: WebFX vs AJPR World
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                <tr>
                  <th className="p-4">Key Criteria</th>
                  <th className="p-4 w-1/3">WebFX</th>
                  <th className="p-4 w-1/3 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">AJPR World</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Account Management Model</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Junior account coordinator relaying tasks to internal production pools</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Direct access to senior growth strategists
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Platform Lock-in</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Tied to proprietary MarketingCloudFX platform; data lost if you leave</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 100% client-owned (GA4, Looker, BigQuery)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Contract Terms</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Typically 6 to 12-month non-cancellable commitments</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Month-to-month retainers with 30-day notice
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Pricing Transparency</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">High published ranges with opaque scope tiers and software surcharges</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Radical pricing transparency with fixed deliverable tiers
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Technical SEO & Next.js</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Generalist CMS focus (WordPress, Shopify) with standard audits</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Full-stack Next.js, Webflow & GEO AI optimization
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Media Spend Billing</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">Often billed through agency accounts with spend percentages</td>
                  <td className="p-4 bg-blue-50/50 dark:bg-blue-950/20 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Direct-to-platform billing (Google/Meta) on your card
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose Which */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">When WebFX Is a Good Fit</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                You are a Fortune 1000 enterprise that requires vendor procurement safety and a 500+ person headcount.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                You want an all-in-one software dashboard and don't mind proprietary lock-in.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                You have an annual marketing budget exceeding $100k+ and prefer corporate agency branding.
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">When AJPR World Is the Better Choice</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                You want direct collaboration with senior practitioners rather than being handed off to an account coordinator.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                You refuse to be locked into 12-month non-cancellable agency contracts.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                You want bleeding-edge technical capabilities: Generative Engine Optimization (ChatGPT search), sub-1s Next.js web design, and custom API integrations.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                You demand full ownership of your data, tracking scripts, and ad accounts.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions About WebFX Alternatives
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

        {/* Contextual Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Agency Pricing & Comparisons
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/webtonic-alternatives" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Web Tonic Alternatives Review →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Retainer Cost Guide →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Breakdown →
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Partner With an Agile Growth Team?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-base">
            Skip the 500-person bureaucracy. Let us review your current marketing stack and provide a transparent, high-impact growth proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Schedule Free Strategy Review <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
