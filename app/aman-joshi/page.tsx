import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowUpRight, Github, Linkedin, Twitter, Mail, 
  Cpu, Database, Code2, ShieldAlert, Award, FileText, CheckCircle2 
} from 'lucide-react'
import { getPortfolioItems } from '@/lib/db/queries'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Aman Joshi - Systems Architect & Founder of AJPR World',
    description: 'Aman Joshi is a systems architect, tech entrepreneur, and the founder of AJPR World, engineering high-concurrency digital platforms and business automation systems.',
    alternates: {
      canonical: 'https://ajprworld.com/aman-joshi',
    }
  }
}

export default async function AmanJoshiPage() {
  let projects: any[] = []
  try {
    projects = await getPortfolioItems()
  } catch (e) {
    console.error("Failed to load projects for Aman Joshi profile:", e)
  }

  // Schema for Aman Joshi
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aman Joshi',
    url: 'https://ajprworld.com/aman-joshi',
    jobTitle: 'Founder & Systems Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com'
    },
    description: 'Aman Joshi is a systems architect and tech entrepreneur specializing in high-concurrency web engines and AI-driven automation systems.',
    sameAs: [
      'https://www.linkedin.com/in/amanjoshi', // Fallback URLs
      'https://github.com/amanjoshi'
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="w-[80%] mx-auto min-h-screen pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-12 items-center mb-24 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="lg:col-span-8 space-y-6 text-left relative z-10">
            <Badge className="bg-blue-600 text-white border-none font-black tracking-widest px-4 py-1.5 uppercase text-xs">
              Founder Profile
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
              Aman Joshi
            </h1>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
              Systems Architect & Founder, AJPR World
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              I partner with high-growth startups and established brands to build robust digital infrastructures, automate complex backend workloads, and integrate secure enterprise-grade systems.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold" asChild>
                <Link href="/contact">Book Strategy Session</Link>
              </Button>
              <div className="flex gap-2">
                <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </a>
                <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center relative z-10">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 p-1 flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#0B0F19] m-0.5 rounded-[2.4rem] flex items-center justify-center">
                <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400">AJ</span>
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
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Systems Architecting</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Designing scalable multi-tenant architectures, cloud database pipelines, and high-concurrency backend API interfaces built for scale.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Business Automation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Eliminating manual business overhead by scripting custom autonomous workflows, database triggers, and third-party API orchestrations.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Execution Execution</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.
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

      </div>
    </div>
  )
}
