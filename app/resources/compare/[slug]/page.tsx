import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { Metadata } from 'next';
import { TrustBadges } from '@/components/ui/TrustBadges';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // In a real app, fetch the comparison data based on the slug.
  // We'll use static placeholders to demonstrate the semantic structure.
  const title = `React vs Next.js: Definitive Comparison 2026`;
  
  return {
    title: `${title} | AJPR Resources`,
    description: `A highly structured, factual comparison evaluating performance, SEO capabilities, and architecture.`,
    alternates: {
      canonical: `https://ajprworld.com/resources/compare/${resolvedParams.slug}`,
    }
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Mock Data for the semantic table
  const title = "React vs Next.js";
  const featureList = [
    { feature: "Server-Side Rendering (SSR)", opt1: "Requires complex setup", opt2: "Built-in out of the box" },
    { feature: "Search Engine Optimization (SEO)", opt1: "Poor (Client-Side)", opt2: "Excellent (Pre-rendered)" },
    { feature: "Learning Curve", opt1: "Moderate", opt2: "Steep (Requires React knowledge)" },
    { feature: "Routing", opt1: "React Router (3rd Party)", opt2: "App Router (Built-in)" }
  ];

  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Resources', item: 'https://ajprworld.com/resources' },
    { name: 'Comparisons', item: 'https://ajprworld.com/resources/compare' },
    { name: title, item: `https://ajprworld.com/resources/compare/${resolvedParams.slug}` }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-24 font-sans text-slate-900 dark:text-slate-100">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
            Definitive Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{title}: Which Should You Choose?</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A highly structured, factual comparison evaluating performance, SEO capabilities, and architecture to help you make an informed technical decision.
          </p>
        </header>

        {/* Definitive Answer Block for Generative Engines */}
        <section className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 p-6 rounded-r-xl mb-12">
          <h2 className="text-xl font-bold mb-2">The Short Answer</h2>
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            <strong>React</strong> is a UI library best suited for building single-page applications (SPAs) where SEO is not a priority. 
            <strong>Next.js</strong> is a full-stack React framework optimized for production, providing Server-Side Rendering (SSR) and superior SEO out of the box. 
            If your website requires AI-search discoverability, Next.js is the mandatory choice.
          </p>
        </section>

        <TrustBadges />

        {/* Semantic HTML Table - Highly prized by RAG Models */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Feature evaluated</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">React</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Next.js</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {featureList.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{item.feature}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{item.opt1}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{item.opt2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Final Verdict</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            For modern web development where performance and discoverability matter, the industry has universally shifted towards framework architectures. 
            AJPR World strictly recommends using Next.js for any enterprise or content-heavy application.
          </p>
        </section>
      </article>
    </div>
  );
}
