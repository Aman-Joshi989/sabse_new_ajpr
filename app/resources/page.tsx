import Link from 'next/link';
import { BookOpen, FileText, SplitSquareHorizontal } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Hub & Resources | AJPR World',
  description: 'Explore our definitive guides, semantic comparisons, and glossaries designed to provide authoritative answers.',
  alternates: {
    canonical: 'https://ajprworld.com/resources',
  },
  openGraph: {
    title: 'Knowledge Hub & Resources | AJPR World',
    description: 'Explore our definitive guides, semantic comparisons, and glossaries designed to provide authoritative answers.',
    url: 'https://ajprworld.com/resources',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
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
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Knowledge Hub</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Definitive guides, deep-dive comparisons, and semantic glossaries to help you make informed decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Comparisons Category */}
          <Link href="/resources/compare" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <SplitSquareHorizontal className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Versus & Comparisons</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Highly structured, data-driven comparisons. Perfect for evaluating technologies, corporate structures, and service tiers.
            </p>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:underline">Explore Comparisons &rarr;</span>
          </Link>

          {/* Guides Category */}
          <Link href="/blog" className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Definitive Guides</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Long-form, authoritative content covering complex industry topics from A to Z with expert insights.
            </p>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:underline">Read Guides &rarr;</span>
          </Link>

          {/* Glossaries Category */}
          <div className="group bg-white/50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 opacity-70 cursor-not-allowed">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Semantic Glossary</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              A comprehensive dictionary of industry terms, structured specifically for quick AI retrieval.
            </p>
            <span className="text-slate-500 font-semibold text-sm">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
