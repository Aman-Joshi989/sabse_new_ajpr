'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, MapPin, Clock, ArrowRight, Sparkles, 
  Users, Target, Trophy, Laptop, ShieldCheck, Heart,
  Sprout, Scale, Eye, Compass, TrendingUp
} from 'lucide-react'

const openings = [
  {
    title: 'Full Stack Engineer',
    department: 'Technology',
    type: 'Full-time',
    location: 'Faridabad, HR / Hybrid',
    experience: '2-4 years',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    title: 'Legal Associate',
    department: 'Legal Services',
    type: 'Full-time',
    location: 'Faridabad, HR / On-site',
    experience: '1-3 years',
    skills: ['LLB', 'Corporate Law', 'Documentation', 'Research']
  },
  {
    title: 'Data Analyst & Automation Specialist',
    department: 'Operations',
    type: 'Full-time',
    location: 'Remote (India)',
    experience: '2+ years',
    skills: ['Python', 'SQL', 'FastAPI', 'Workflow Orchestration', 'n8n']
  }
]

const values = [
  {
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    title: "Inspiration",
    desc: "We bring fresh creative energy and frontier AI architectures, rejecting stale templates."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-rose-500" />,
    title: "Disciplined",
    desc: "Zero tolerance for sloppy code. 100% type safety, rigorous tests, and on-time sprint delivery."
  },
  {
    icon: <Scale className="w-5 h-5 text-purple-500" />,
    title: "Accountability",
    desc: "Complete end-to-end ownership. We stand behind everything we build without excuses."
  },
  {
    icon: <Eye className="w-5 h-5 text-blue-500" />,
    title: "Transparency",
    desc: "Open repositories, transparent milestone pricing, and unvarnished performance metrics."
  },
  {
    icon: <Compass className="w-5 h-5 text-emerald-500" />,
    title: "Aligned",
    desc: "Our technical execution is 100% locked to client business revenue and commercial targets."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
    title: "Results Oriented",
    desc: "Obsessed with real commercial impact: sub-second speeds, top SERPs, and pipeline conversion."
  }
]

function CareersContent() {
  const searchParams = useSearchParams();
  const utmParams = new URLSearchParams();
  
  if (searchParams) {
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    });
  }

  const utmString = utmParams.toString();
  const getApplyLink = (role: string) => {
    const roleParam = `role=${encodeURIComponent(role)}`;
    return `/careers/apply?${roleParam}${utmString ? `&${utmString}` : ''}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="w-[80%] mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-100/60 dark:bg-blue-900/10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 dark:text-blue-300">Join AJPR World</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight"
          >
            Build the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-indigo-500">
              Autonomous Systems.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Work with a dynamic team delivering premium solutions in software engineering, legal compliance, and systems automation.
          </motion.p>
        </div>
      </section>

      {/* Core Values Strip */}
      <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm">
        <div className="w-[85%] max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Our 6 Core Values</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">The non-negotiable principles guiding every engineer and team member.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-24">
        <div className="w-[80%] mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Active Openings</h2>
            <p className="text-slate-500 mt-2 font-medium">Explore current opportunities to collaborate on complex projects.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openings.map((job, idx) => (
              <Card key={idx} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:shadow-xl transition-all duration-350 flex flex-col justify-between overflow-hidden rounded-2xl group">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 border-none font-bold uppercase tracking-wider text-[9px] text-slate-500">{job.department}</Badge>
                    <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 border-none font-bold text-[10px]">{job.type}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mt-4 font-semibold">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> {job.location}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-blue-500" /> {job.experience}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs border-none text-slate-600 dark:text-slate-350">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-850 text-white dark:bg-white dark:text-[#030712] dark:hover:bg-slate-200 rounded-xl font-bold h-11" size="sm">
                    <Link href={getApplyLink(job.title)}>
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submission Info & Developer Network */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Don’t see a matching position?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
                  We are always looking for ambitious developers, automation specialists, and domain experts. Send us your CV for future openings.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-xl font-bold px-8 h-12 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white w-full">
                <Link href={getApplyLink("Open Application")}>Send Open Application</Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-8 text-center shadow-sm text-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Freelance & Contractor Network
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Join the AJPR Developer Network</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                  Work on high-impact customer projects, take on paid sprint contracts, and collaborate with our engineering swarms.
                </p>
              </div>
              <Button asChild className="rounded-xl font-bold px-8 h-12 bg-blue-600 hover:bg-blue-500 text-white w-full">
                <Link href="/signup/developer">Register as Developer &rarr;</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default function CareersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CareersContent />
    </Suspense>
  )
}
