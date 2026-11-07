import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle2, Cpu, Code2, Layers, ShieldCheck, 
  Clock, Zap, Sparkles, ChevronRight, HelpCircle, Server, Terminal, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { PROGRAMMATIC_SOLUTIONS, ProgrammaticSolution } from '@/lib/solutions-data';

export const revalidate = 86400; // Cache for 24 hours (ISR)

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROGRAMMATIC_SOLUTIONS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = PROGRAMMATIC_SOLUTIONS[slug];

  if (!solution) {
    return {
      title: 'Solution Not Found | AJPR World',
      description: 'The requested technology solution could not be found.',
    };
  }

  const url = `https://ajprworld.com/solutions/${slug}`;

  return {
    metadataBase: new URL('https://ajprworld.com'),
    title: solution.title,
    description: solution.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: solution.title,
      description: solution.metaDescription,
      url,
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${solution.query} - AJPR World`,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.title,
      description: solution.metaDescription,
      images: ['https://ajprworld.com/og-image.jpg'],
      creator: '@ajprworld',
      site: '@ajprworld',
    },
  };
}

export default async function ProgrammaticSolutionPage(props: Props) {
  const { slug } = await props.params;
  const solution = PROGRAMMATIC_SOLUTIONS[slug];

  if (!solution) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Solutions', item: 'https://ajprworld.com/solutions' },
    { name: solution.query, item: `https://ajprworld.com/solutions/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={solution.faqs} />
      <ServiceSchema
        name={solution.query}
        description={solution.subheadline}
        providerName="AJPR World"
        url={`https://ajprworld.com/solutions/${slug}`}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> High-Velocity Engineering Pod
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            {solution.headline}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {solution.subheadline}
          </p>

          {/* Primary CTA Buttons pointing to /pricing and /book-call */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-13 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] transition-all" asChild>
              <Link href="/pricing">
                Explore Pricing & Sprints <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-13 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <Link href="/book-call">
                Book Architecture Call
              </Link>
            </Button>
          </div>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">Timeline</span>
              <strong className="text-base text-white font-bold flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-blue-400" /> {solution.timeline}
              </strong>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">Sprint Tier</span>
              <strong className="text-base text-white font-bold flex items-center gap-1.5 mt-1">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Fixed-Price
              </strong>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">Ownership</span>
              <strong className="text-base text-white font-bold flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> 100% IP & Code
              </strong>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">Engineering</span>
              <strong className="text-base text-white font-bold flex items-center gap-1.5 mt-1">
                <Terminal className="w-4 h-4 text-cyan-400" /> Senior Pod Only
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070c18] py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">Core Technology Stack</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2.5">
            {solution.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Breakdown */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 uppercase tracking-wider text-xs px-3 py-1 font-bold">
              What We Ship
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              End-to-End Sprint Deliverables
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto mt-2">
              Every deliverable is production-tested, fully documented, and delivered directly to your GitHub organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solution.deliverables.map((item, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#050914] border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Architectural Layers & Technical Decisions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto mt-2">
              How we structure your system to ensure sub-second response times and effortless vertical scaling.
            </p>
          </div>

          <div className="space-y-4">
            {solution.architecturePoints.map((point, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    {point.layer}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{point.tech}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">{point.description}</p>
                </div>
                <div className="shrink-0">
                  <Badge variant="outline" className="border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10 text-xs font-semibold">
                    Production Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mt-2">
              Everything you need to know about scoping, delivery, and code ownership.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {solution.faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-2 shadow-xs"
              >
                <AccordionTrigger className="text-left font-bold text-slate-900 dark:text-white text-base hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Immediate CTA Box Pointing to Pricing & Sprints */}
      <section className="container mx-auto px-4 max-w-4xl pt-4">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-400" /> Start Shipping Next Week
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to Build Your {solution.query}?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Review our transparent sprint packages and dedicated engineering pod rates. No 6-month locks, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/pricing">
                View Pricing & Sprints <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <Link href="/book-call">
                Book 15-Min Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-linking to Related Solutions & Free Tools (Eliminates orphan pages) */}
      <section className="container mx-auto px-4 max-w-5xl mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 text-center">
          Explore Related Engineering Solutions & Calculators
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {solution.relatedSlugs.map((relSlug) => {
            const rel = PROGRAMMATIC_SOLUTIONS[relSlug];
            if (!rel) return null;
            return (
              <Link
                key={relSlug}
                href={`/solutions/${relSlug}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all hover:scale-105"
              >
                {rel.query} &rarr;
              </Link>
            );
          })}
          <Link
            href="/tools"
            className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:underline"
          >
            All Free Tools & Calculators &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

