import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import profilePic from '../../public/images/aman-joshi-profile.png'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowUpRight, Github, Linkedin, Cpu, Database, Code2 
} from 'lucide-react'
import { getPortfolioItems, getSiteSettings } from '@/lib/db/queries'
import { Metadata } from 'next'
import { cleanMetaDescription } from '@/app/layout'
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoMetadata('/aman-joshi');
  if (override) {
    return {
      title: override.title,
      description: override.description,
      alternates: {
        canonical: 'https://ajprworld.com/aman-joshi',
      },
      openGraph: {
        title: override.title,
        description: override.description,
        url: 'https://ajprworld.com/aman-joshi',
        type: 'website',
        images: ['https://ajprworld.com/og-image.jpg']
      }
    };
  }

  const settings = await getSiteSettings();
  const founderName = settings?.founder_name || 'Aman Joshi';
  const founderTitle = settings?.founder_title || 'Founder & Systems Architect';
  const rawDescription = settings?.founder_bio || 'Aman Joshi is a systems architect, tech entrepreneur, and the founder of AJPR World, engineering high-concurrency digital platforms and business automation systems.';
  
  // Truncate to recommended ~155 characters for SEO
  const description = cleanMetaDescription(rawDescription, 155);
  
  return {
    title: `${founderName} - ${founderTitle} | AJPR World (AJPR)`,
    description,
    alternates: {
      canonical: 'https://ajprworld.com/aman-joshi',
    },
    openGraph: {
      title: `${founderName} - ${founderTitle} | AJPR World (AJPR)`,
      description,
      url: 'https://ajprworld.com/aman-joshi',
      type: 'profile',
      images: ['https://ajprworld.com/images/aman-joshi-profile.png']
    }
  }
}

export default async function AmanJoshiPage() {
  let projects: any[] = []
  let settings: any = null
  try {
    const [fetchedProjects, fetchedSettings] = await Promise.all([
      getPortfolioItems(),
      getSiteSettings()
    ])
    projects = fetchedProjects || []
    settings = fetchedSettings || null
  } catch (e) {
    console.error("Failed to load projects/settings for Aman Joshi profile:", e)
  }

  const contactEmail = settings?.contact_email || 'hello@ajprworld.com'
  const contactPhone = settings?.contact_phone || '+91 9997205257'
  const founderName = settings?.founder_name || 'Aman Joshi'
  const founderTitle = settings?.founder_title || 'Founder & Systems Architect'
  const founderBio = settings?.founder_bio || 'I partner with high-growth startups and established brands to build robust digital infrastructures, automate complex backend workloads, and integrate secure enterprise-grade systems.'
  const founderBadge = settings?.founder_badge || 'Founder Profile'
  const founderLinkedin = settings?.founder_linkedin || 'https://www.linkedin.com/in/aman-joshi-/'
  const founderGithub = settings?.founder_github || 'https://github.com/Aman-Joshi989'
  
  const exp1Title = settings?.founder_exp1_title || 'Systems Architecting'
  const exp1Desc = settings?.founder_exp1_desc || 'Designing scalable multi-tenant architectures, cloud database pipelines, and high-concurrency backend API interfaces built for scale.'
  const exp2Title = settings?.founder_exp2_title || 'Business Automation'
  const exp2Desc = settings?.founder_exp2_desc || 'Eliminating manual business overhead by scripting custom autonomous workflows, database triggers, and third-party API orchestrations.'
  const exp3Title = settings?.founder_exp3_title || 'Execution Excellence'
  const exp3Desc = settings?.founder_exp3_desc || 'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.'

  // Schema for Aman Joshi
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: founderName,
    image: 'https://ajprworld.com/images/aman-joshi-profile.png',
    url: 'https://ajprworld.com/aman-joshi',
    jobTitle: founderTitle,
    email: contactEmail,
    telephone: contactPhone,
    worksFor: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com'
    },
    description: founderBio,
    knowsAbout: [
      'Custom AI MVP Development',
      'Next.js 16 Web Engineering',
      'Generative Engine Optimization (GEO)',
      'Technical SEO & Core Web Vitals',
      'PostgreSQL & pgvector',
      'Autonomous AI Agent Architecture'
    ],
    sameAs: [
      founderLinkedin,
      founderGithub
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-12 items-center mb-24 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="lg:col-span-8 space-y-6 text-left relative z-10">
            <Badge className="bg-blue-600 text-white border-none font-black tracking-widest px-4 py-1.5 uppercase text-xs">
              {founderBadge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
              {founderName}
            </h1>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
              {founderTitle}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              {founderBio}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold" asChild>
                <Link href="/book-call">Book 30-Min Strategy Call</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-slate-300 dark:border-slate-700 font-bold" asChild>
                <Link href="/contact">Direct Message</Link>
              </Button>
              <div className="flex gap-2">
                <a href={founderLinkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </a>
                <a href={founderGithub} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center relative z-10">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-2xl relative overflow-hidden group hover:shadow-blue-500/40 hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-slate-100 dark:bg-[#0B0F19] m-0.5 rounded-[2.4rem] overflow-hidden">
                <Image 
                  src={profilePic}
                  alt={founderName}
                  fill
                  className="object-cover object-top scale-110 group-hover:scale-105 transition-transform duration-700"
                  priority
                  quality={100}
                  placeholder="blur"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Commands */}
        <section className="mb-24 grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{exp1Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {exp1Desc}
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{exp2Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {exp2Desc}
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{exp3Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {exp3Desc}
            </p>
          </div>
        </section>

        {/* Selected Portfolio / Contributions */}
        {projects && projects.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              Featured Infrastructure Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project: any) => (
                <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <Badge variant="outline" className="mb-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-none">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>
                  <Button variant="link" className="p-0 text-blue-600 dark:text-blue-400 font-bold self-start" asChild>
                    <Link href="/portfolio">
                      View Architecture details <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Systems & Engineering Pillars */}
        <section className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Core Deliverables
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Architectural Domains & Services
              </h2>
            </div>
            <Link 
              href="/book-call" 
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start"
            >
              Book 1-on-1 Scoping Call with Aman &rarr;
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Custom Next.js Web Systems",
                desc: "Enterprise Next.js 16 platforms with sub-100ms TTFB, PostgreSQL schemas, and full source code ownership.",
                href: "/services/web-development"
              },
              {
                title: "Autonomous AI MVPs & Agents",
                desc: "Functional LLM workflows, LangGraph triage pods, and custom vector search applications delivered in 2–4 weeks.",
                href: "/ai-systems"
              },
              {
                title: "Website Security & Maintenance",
                desc: "24/7 uptime monitoring, automated zero-day vulnerability patching, and encrypted backup recovery.",
                href: "/services/website-security-maintenance"
              },
              {
                title: "2026 Website Cost Calculator",
                desc: "Transparent financial model comparing SMB websites against high-concurrency SaaS applications.",
                href: "/pricing/website-cost"
              },
              {
                title: "Predictable Flat Sprints",
                desc: "Transparent fixed-scope sprints and dedicated senior pods with zero hourly billing creep.",
                href: "/pricing"
              },
              {
                title: "Free Architecture Audit",
                desc: "Receive a comprehensive code, security, and Core Web Vitals diagnostic within 48 hours.",
                href: "/free-audit"
              }
            ].map((pillar, idx) => (
              <Link 
                key={idx} 
                href={pillar.href}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{pillar.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  Explore architecture &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
