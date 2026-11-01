import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, Zap, Code2, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { PROGRAMMATIC_SOLUTIONS } from '@/lib/solutions-data';

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Engineering Solutions & Tech Stack Sprints | AJPR World',
  description: 'Explore custom software development and AI engineering solutions tailored for modern tech stacks: Next.js, Python FastAPI, AI Agent Swarms, and Cloud DevOps.',
  alternates: {
    canonical: 'https://ajprworld.com/solutions',
  },
  openGraph: {
    title: 'Engineering Solutions & Tech Stack Sprints | AJPR World',
    description: 'Explore custom software development and AI engineering solutions tailored for modern tech stacks: Next.js, Python FastAPI, AI Agent Swarms, and Cloud DevOps.',
    url: 'https://ajprworld.com/solutions',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Engineering Solutions - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Solutions & Tech Stack Sprints | AJPR World',
    description: 'High-velocity 4-week software and AI engineering sprints for US startups and growing enterprises.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

export default function SolutionsIndexPage() {
  const solutions = Object.values(PROGRAMMATIC_SOLUTIONS);
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Solutions', item: 'https://ajprworld.com/solutions' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-24">
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative pt-32 pb-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800 text-center">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
            Specialized Tech Stack Pods
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Targeted Engineering Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              For Fast-Moving Founders
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Choose your target stack or business requirement. We build and deploy production-grade software in 2 to 4 weeks with complete IP ownership.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/pricing">View Pricing & Sprints</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className="group p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {sol.timeline}
                    </span>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Fixed-Scope Sprint
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
                    {sol.query}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {sol.subheadline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {sol.techStack.slice(0, 2).join(' • ')}
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Explore Sprint <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

