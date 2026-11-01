import Link from 'next/link';
import { BookOpen, FileText, SplitSquareHorizontal, BarChart3, Wrench, DollarSign } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Knowledge Hub & Resources | AJPR World',
  description: 'Explore our definitive guides, semantic comparisons, glossaries, original research, and interactive tools designed to provide authoritative answers.',
  alternates: {
    canonical: 'https://ajprworld.com/resources',
  },
  openGraph: {
    title: 'Knowledge Hub & Resources | AJPR World',
    description: 'Explore our definitive guides, semantic comparisons, glossaries, original research, and interactive tools designed to provide authoritative answers.',
    url: 'https://ajprworld.com/resources',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Knowledge Hub & Resources - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Hub & Resources | AJPR World',
    description: 'Authoritative playbooks, pricing research, and developer tools for engineering teams.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Resources', item: 'https://ajprworld.com/resources' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-24 font-sans text-slate-900 dark:text-slate-100">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Knowledge Hub & Resources</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Definitive guides, objective agency comparisons, semantic glossaries, original pricing research, and free business tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Comparisons Category */}
          <Link href="/compare" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <SplitSquareHorizontal className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Versus & Comparisons</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Objective, data-driven comparisons of WebFX, Web Tonic, and traditional agency retainers versus senior execution.
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:underline">Compare Agencies &rarr;</span>
          </Link>

          {/* Guides Category */}
          <Link href="/blog" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Definitive Guides & Blog</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Long-form, authoritative engineering and growth marketing guides with vetted benchmarks, E-E-A-T analysis, and playbooks.
              </p>
            </div>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:underline">Read Guides &rarr;</span>
          </Link>

          {/* Glossaries Category */}
          <Link href="/glossary" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Tech & AI Glossary</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                A comprehensive dictionary of modern software, AI automation, serverless architecture, and growth terminology.
              </p>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm group-hover:underline">Explore Glossary &rarr;</span>
          </Link>

          {/* Research Category */}
          <Link href="/research/agency-pricing-report" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">2026 Agency Pricing Report</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Proprietary benchmark study surveying 214 US digital marketing agencies on retainers, hourly rates, and ROI.
              </p>
            </div>
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm group-hover:underline">Read Research Report &rarr;</span>
          </Link>

          {/* Free Tools Category */}
          <Link href="/tools" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Free Business Tools Hub</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Interactive calculators for admin labor drag, SaaS bloat audits, email drafters, and marketing ROI models.
              </p>
            </div>
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:underline">Access Free Tools &rarr;</span>
          </Link>

          {/* Pricing Guides Category */}
          <Link href="/pricing" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Transparent Pricing Hub</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Honest, flat-rate pricing guides for custom website development, monthly SEO retainers, and PPC management.
              </p>
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm group-hover:underline">View Pricing Guides &rarr;</span>
          </Link>
        </div>

        {/* Quick Directory Nav */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>Looking for our complete index of services and locations?</span>
          <Link href="/sitemap" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1">
            Browse Full HTML Sitemap &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
