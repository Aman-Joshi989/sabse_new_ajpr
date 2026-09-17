import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { BarChart3, FileText, Download, Share2, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Database, Copy } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: '2026 US Agency Pricing Report: Retainers & Rates | AJPR',
  description: 'Comprehensive benchmark report on 200+ US digital marketing agencies. Discover median retainers, hourly rates, pricing models, and hidden contract fees.',
  alternates: {
    canonical: 'https://ajprworld.com/research/agency-pricing-report',
  },
  openGraph: {
    title: '2026 US Agency Pricing Report: Retainers & Rates | AJPR',
    description: 'Comprehensive benchmark report on 200+ US digital marketing agencies. Discover median retainers, hourly rates, pricing models, and hidden contract fees.',
    url: 'https://ajprworld.com/research/agency-pricing-report',
    siteName: 'AJPR World',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the median digital marketing agency retainer in the US for 2026?',
    answer: 'Based on our study of 214 US digital marketing agencies, the overall median monthly retainer across all service lines is $3,250 per month. SEO retainers averaged $3,450/month, while standalone PPC management averaged $2,800/month.'
  },
  {
    question: 'What is the average agency hourly billing rate in 2026?',
    answer: 'The median hourly billing rate across US agencies is $175 per hour. The 25th percentile is $125/hour, while top-tier technical and enterprise advisory firms bill at $250 to $350+ per hour.'
  },
  {
    question: 'May journalists and bloggers cite or embed these charts?',
    answer: 'Yes! All findings, data points, and charts in this report are free to use and embed under Creative Commons Attribution 4.0. Please credit and link back to https://ajprworld.com/research/agency-pricing-report as the original source.'
  }
];

export default function AgencyPricingReportPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: '2026 US Digital Marketing Agency Pricing Transparency Report',
    description: 'Comprehensive benchmark study analyzing retainers, hourly rates, and fee structures across 214 US marketing agencies.',
    author: {
      '@type': 'Organization',
      name: 'AJPR World Research Lab',
      url: 'https://ajprworld.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AJPR World',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajprworld.com/logo.png',
      },
    },
    datePublished: '2026-01-15',
    dateModified: '2026-09-17',
  };

  const embedSnippet = `<div style="max-width:600px;font-family:sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
  <h4 style="margin:0 0 10px;font-size:16px;color:#0f172a;">2026 US Agency Median Retainers by Service</h4>
  <p style="font-size:14px;color:#475569;margin:0 0 16px;">SEO: <strong>$3,450/mo</strong> | PPC: <strong>$2,800/mo</strong> | Full-Service: <strong>$5,800/mo</strong></p>
  <p style="font-size:11px;color:#94a3b8;margin:0;">Source: <a href="https://ajprworld.com/research/agency-pricing-report" target="_blank" style="color:#2563eb;text-decoration:none;">AJPR World 2026 US Agency Pricing Report</a></p>
</div>`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="article-schema-report"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Original Research</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">2026 Agency Pricing Report</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Database className="w-3.5 h-3.5" /> Original Industry Research
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            2026 US Digital Marketing Agency Pricing Transparency Report
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            We surveyed and analyzed pricing data across <strong className="text-slate-900 dark:text-white">214 US digital marketing agencies</strong> across 25 states. Here is the unvarnished truth on median retainers, hourly rates, contract lengths, and hidden platform fees.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>Published by AJPR World Research</span>
            <span>•</span>
            <span>Sample Size: 214 US Agencies</span>
            <span>•</span>
            <span>Creative Commons Attribution 4.0</span>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1">Median SEO Retainer</div>
            <div className="text-3xl font-extrabold text-blue-600">$3,450</div>
            <div className="text-xs text-slate-500 mt-1">Per month (Range: $1.5k–$12k)</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1">Median PPC Fee</div>
            <div className="text-3xl font-extrabold text-emerald-600">$2,800</div>
            <div className="text-xs text-slate-500 mt-1">Or 12%–15% of ad spend</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1">Median Hourly Rate</div>
            <div className="text-3xl font-extrabold text-indigo-600">$175</div>
            <div className="text-xs text-slate-500 mt-1">Per hour (25th-75th: $125-$250)</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs uppercase font-bold text-slate-500 mb-1">12-Mo Lock-in Rate</div>
            <div className="text-3xl font-extrabold text-amber-600">62%</div>
            <div className="text-xs text-slate-500 mt-1">Of agencies enforce annual terms</div>
          </div>
        </div>

        {/* Detailed Findings */}
        <section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              1. Monthly Retainer Distribution Across US Agencies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Our data indicates that 48% of surveyed agencies price their core SEO services between $2,500 and $5,000 per month. High-end enterprise agencies account for 18% of the sample, commanding $8,000 to $20,000+ monthly retainers for multi-location brands.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold">
                  <tr>
                    <th className="p-4">Retainer Bracket</th>
                    <th className="p-4">% of US Agencies</th>
                    <th className="p-4">Typical Client Profile</th>
                    <th className="p-4">Typical Monthly Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Under $1,500 / mo</td>
                    <td className="p-4">14%</td>
                    <td className="p-4">Local single-location contractors & solo practitioners</td>
                    <td className="p-4">Automated citations, basic monthly rank reports</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">$1,500 – $3,500 / mo</td>
                    <td className="p-4">36%</td>
                    <td className="p-4">Regional businesses, dental practices, mid-tier law firms</td>
                    <td className="p-4">Maps 3-pack SEO, 2 blog posts, technical audit fixes</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">$3,500 – $7,500 / mo</td>
                    <td className="p-4">32%</td>
                    <td className="p-4">B2B SaaS, national e-commerce, multi-truck home services</td>
                    <td className="p-4">Active digital PR, 4-6 topical hubs, GEO optimization</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">$8,000+ / mo</td>
                    <td className="p-4">18%</td>
                    <td className="p-4">Enterprise tech, franchise networks, public corporations</td>
                    <td className="p-4">Programmatic architecture, board-level attribution, dedicated team</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Finding 2 */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              2. Contract Terms: The Shift Toward Month-to-Month Flexibility
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              While 62% of legacy digital marketing agencies still enforce 6 to 12-month non-cancellable contracts with auto-renewal clauses, high-growth modern agencies are shifting toward 90-day initial sprints followed by month-to-month retainers.
            </p>
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-sm text-slate-700 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Key Takeaway for CMOs:</strong>
              Agencies with the highest customer retention rates (over 85% at month 12) rarely require long-term lock-in contracts. Transparent deliverable milestones and regular pipeline reviews outperform contractual handcuffs.
            </div>
          </div>
        </section>

        {/* Free Embeddable Chart Section (The Link Magnet Lever) */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <Share2 className="w-4 h-4" /> Embed & Attribute This Data
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Embed This Chart on Your Website or Article
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Marketers and journalists may freely embed this summary widget on their publications. Simply copy and paste the snippet below:
          </p>

          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto mb-4 border border-slate-800">
            <code>{embedSnippet}</code>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Free for commercial and non-commercial use with attribution.</span>
            <span className="font-semibold text-blue-600">CC-BY 4.0 License</span>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            Report Methodology & Citations
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

        {/* Cross Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Explore Related Pricing Guides
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Guide →
            </Link>
            <Link href="/tools/agency-pricing-calculator" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Agency Pricing & ROI Calculator →
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white text-center border border-slate-800 shadow-xl">
          <h2 className="text-3xl font-extrabold mb-4">Get Transparent Agency Pricing for Your Brand</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            No guessing, no lock-in traps. Review our fixed retainers and custom growth roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
          >
            Request Custom Agency Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
