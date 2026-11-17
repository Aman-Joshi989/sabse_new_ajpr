'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Briefcase, MapPin, Clock, ArrowRight, Sparkles,
  DollarSign, Terminal, ExternalLink, HelpCircle,
  Flame, Github, Linkedin, Eye, CheckCircle2
} from 'lucide-react'

export interface JobOpeningItem {
  id: string
  title: string
  department: string
  job_type?: string
  type?: string
  location: string
  experience: string
  compensation: string
  short_summary?: string
  shortSummary?: string
  skills: string[]
  responsibilities: string[]
  must_haves?: string[]
  mustHaves?: string[]
  highlights: string[]
}

const STUDIO_METRICS = [
  { value: '0.19s', label: 'Average Edge TTFB', detail: 'Sub-second speed across all live client platforms' },
  { value: '14 Days', label: 'MVP Sprint Velocity', detail: 'From architecture blueprint to live production release' },
  { value: '100%', label: 'Client IP Ownership', detail: 'Direct GitHub repository access with zero vendor lock-in' },
  { value: '4 Timezones', label: 'Global Client Base', detail: 'Active product delivery across US, UK, SG, and India' },
]

const HIRING_STEPS = [
  {
    step: '01',
    title: 'GitHub & Portfolio Review',
    duration: 'Within 48 Hours',
    description: 'Submit your profile with links to real projects, GitHub repos, or live apps. Founder Aman Joshi personally reviews your work — no automated ATS filters or rejection algorithms.'
  },
  {
    step: '02',
    title: '30-Min Architecture Conversation',
    duration: 'Video Call',
    description: 'A focused, peer-to-peer technical dialogue with Lead Architect Aman Joshi. We discuss real systems you have built, trade-offs you have navigated, and your problem-solving process. Zero inverted-binary-tree puzzles.'
  },
  {
    step: '03',
    title: 'Paid Trial Sprint or Direct Offer',
    duration: 'Within 3–5 Days',
    description: 'If there is mutual alignment, we test working together on a small paid trial milestone or extend a direct offer with transparent compensation, clear milestones, and immediate onboarding.'
  }
]

const CULTURE_PILLARS = [
  {
    icon: Flame,
    title: 'High Velocity, Zero Bureaucracy',
    description: 'No 7-layer management approvals or endless sync meetings. PRs are reviewed within hours, CI/CD deploys to production, and you have the autonomy to make smart engineering calls.'
  },
  {
    icon: Terminal,
    title: 'Modern Frontier Stack',
    description: 'We build exclusively with Next.js 16, React 19, TypeScript, PostgreSQL, Python, and frontier AI models. You will never spend months wrestling with 8-year-old legacy PHP or jQuery monoliths.'
  },
  {
    icon: ExternalLink,
    title: 'Asynchronous & Remote-First',
    description: 'We care about delivered output, code quality, and shipped velocity — not what time you sit at your desk or logged keystrokes. Work when you are in flow with flexible global hours.'
  },
  {
    icon: DollarSign,
    title: 'Transparent Compensation & Sprint Upside',
    description: 'We believe elite engineering deserves fair, prompt compensation. Enjoy competitive monthly retainers, transparent milestone bonuses, and prompt payouts on completed sprints.'
  }
]

const FAQS = [
  {
    q: 'How fast will I hear back after submitting my application?',
    a: 'Every single application is reviewed personally by Founder & Lead Architect Aman Joshi within 48 business hours. You will receive a direct email response regardless of the outcome — no ghosting.'
  },
  {
    q: 'Are these positions strictly remote or on-site?',
    a: 'All engineering positions are remote-first, allowing you to work from anywhere across India or globally. For candidates in Uttarakhand or Delhi NCR who enjoy occasional in-person whiteboarding, we also support hybrid collaboration at our Haldwani studio hub.'
  },
  {
    q: 'What is the interview process like?',
    a: 'We respect your time. Our hiring process consists of 2 stages: a 48-hour GitHub/portfolio evaluation followed by a single 30-minute technical architecture conversation with Aman Joshi. We do not do 6-round corporate gauntlets.'
  },
  {
    q: 'Can I apply for part-time or contract sprint work instead of full-time?',
    a: 'Yes. Our Developer Network is designed specifically for talented engineers who want to take on fixed-scope 2–4 week client sprints while maintaining freelance independence or other commitments.'
  }
]

function CareersClientInner({ initialJobs }: { initialJobs: JobOpeningItem[] }) {
  const searchParams = useSearchParams()
  const [selectedDept, setSelectedDept] = useState<string>('All')
  const [activeModalJob, setActiveModalJob] = useState<JobOpeningItem | null>(null)

  const utmParams = new URLSearchParams()
  if (searchParams) {
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value)
      }
    })
  }

  const utmString = utmParams.toString()
  const getApplyLink = (role: string) => {
    const roleParam = `role=${encodeURIComponent(role)}`
    return `/careers/apply?${roleParam}${utmString ? `&${utmString}` : ''}`
  }

  // Derive unique departments dynamically from available jobs
  const jobDepts = Array.from(new Set(initialJobs.map((j) => j.department))).filter(Boolean)
  const departments = ['All', ...jobDepts]

  const filteredJobs = selectedDept === 'All'
    ? initialJobs
    : initialJobs.filter((j) => j.department === selectedDept)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-blue-600/30">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[600px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[160px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-6">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Engineering & AI Studio &bull; Real Openings</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]"
            >
              Build High-Velocity Software. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Zero Corporate Bureaucracy.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed"
            >
              AJPR World is a senior software engineering and autonomous AI studio. We build sub-200ms Next.js web applications, multi-agent swarms, and search architectures for high-growth clients across the US, UK, Singapore, and India.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="rounded-2xl px-8 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 cursor-pointer">
                <a href="#openings">
                  View Active Openings ({initialJobs.length}) <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl px-7 h-12 border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm cursor-pointer">
                <Link href={getApplyLink("Open Application")}>
                  Submit Open CV <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Reassurance Strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 48-Hour Application Review
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Technical Founder Review
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Remote-First Team
              </span>
            </div>

          </div>
        </section>

        {/* STUDIO METRICS BANNER */}
        <section className="py-8 border-y border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STUDIO_METRICS.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVE OPENINGS SECTION */}
        <section id="openings" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 max-w-6xl space-y-10">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Immediate Hiring Needs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Active Engineering & Growth Roles
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                  Select a category or click any position to inspect full responsibilities, tech stack, and compensation details.
                </p>
              </div>

              {/* Department Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 self-start md:self-auto">
                {departments.map((dept) => {
                  const isActive = selectedDept === dept
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {dept}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Job Openings Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => {
                  const jobType = job.job_type || job.type || 'Full-time'
                  const summary = job.short_summary || job.shortSummary || ''
                  return (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 rounded-3xl flex flex-col justify-between overflow-hidden group">
                        
                        <CardHeader className="p-6 pb-4 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 font-bold text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-300">
                              {job.department}
                            </Badge>
                            <Badge className="bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 font-semibold text-[10px]">
                              {jobType}
                            </Badge>
                          </div>

                          <CardTitle className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </CardTitle>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {summary}
                          </p>

                          <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-200">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">{job.compensation}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 space-y-5">
                          {/* Skills preview */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Core Stack</div>
                            <div className="flex flex-wrap gap-1.5">
                              {(job.skills || []).slice(0, 4).map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                  {skill}
                                </span>
                              ))}
                              {(job.skills || []).length > 4 && (
                                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                                  +{(job.skills || []).length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card CTA Actions */}
                          <div className="pt-2 grid grid-cols-2 gap-2.5">
                            <Button
                              variant="outline"
                              onClick={() => setActiveModalJob(job)}
                              className="rounded-xl h-10 text-xs font-bold border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1.5" /> Details
                            </Button>
                            <Button
                              asChild
                              className="rounded-xl h-10 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs"
                            >
                              <Link href={getApplyLink(job.title)}>
                                Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>

                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Custom Open Application Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-block">
                  Freelance Pods & Custom Disciplines
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Don’t see an exact title matching your superpowers?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  We are always eager to meet high-caliber engineers in Rust, Go, Python, cloud infrastructure, or security. Send us your GitHub profile and open CV.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button asChild size="lg" className="rounded-2xl px-6 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md cursor-pointer">
                  <Link href={getApplyLink("Open Application")}>
                    Send Open CV &rarr;
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl px-6 h-12 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm cursor-pointer">
                  <Link href="/signup/developer">
                    Join Developer Network
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* WHY BUILD WITH AJPR (CULTURE & BENTO) */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20">
          <div className="container mx-auto px-4 max-w-6xl space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Our Engineering Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Why Engineers Love Building Here
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                We designed our studio to be the exact working environment we wished existed when we worked at bloated agencies.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {CULTURE_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* TRANSPARENT 3-STEP HIRING PROCESS */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Straightforward Hiring
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Our 3-Step Hiring Process
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                No 6-round ATS gauntlets or unpaid 40-hour take-home projects. We respect your craft and time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {HIRING_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-slate-300 dark:text-slate-800 font-mono">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800/50">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* NOTE FROM LEAD ARCHITECT AMAN JOSHI */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center gap-8">
              
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-blue-500/20 shrink-0 shadow-lg">
                <Image
                  src="/images/aman-joshi-profile.png"
                  alt="Aman Joshi, Lead Architect & Founder"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    A Message from the Founder
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Aman Joshi &bull; Lead Systems Architect
                  </h3>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;I built AJPR World because I was frustrated with bloated digital consultancies that charge huge retainers, outsource to inexperienced freelancers, and deliver slow websites that break. Here, we operate like an elite engineering lab. Every line of code matters. If you take deep pride in craft and want to build systems that scale effortlessly, I would love to work with you.&rdquo;
                </blockquote>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs">
                  <a
                    href="https://github.com/Aman-Joshi989"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub: Aman-Joshi989
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aman-joshi989"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn Profile
                  </a>
                  <Link
                    href="/aman-joshi"
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 font-medium"
                  >
                    View Founder Profile &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CANDIDATE FAQS */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Everything You Need to Know
              </h2>
            </div>

            <div className="grid gap-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Have a unique question about working with us? Reach out directly.
              </p>
              <Button asChild variant="outline" className="rounded-xl font-bold border-slate-300 dark:border-slate-800 text-xs">
                <Link href="/contact">Contact Founder & Team &rarr;</Link>
              </Button>
            </div>
          </div>
        </section>

      </div>

      {/* ROLE DETAILS DIALOG / MODAL */}
      <Dialog open={!!activeModalJob} onOpenChange={(open) => !open && setActiveModalJob(null)}>
        {activeModalJob && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans">
            <DialogHeader className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">
                  {activeModalJob.department}
                </Badge>
                <Badge className="bg-blue-600/10 text-blue-600 border border-blue-500/20 text-[10px] font-bold">
                  {activeModalJob.job_type || activeModalJob.type || 'Full-time'}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {activeModalJob.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeModalJob.short_summary || activeModalJob.shortSummary || ''}
              </DialogDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <div><strong>Location:</strong> {activeModalJob.location}</div>
                <div><strong>Experience:</strong> {activeModalJob.experience}</div>
                <div className="sm:col-span-2 text-blue-600 dark:text-blue-400 font-bold">
                  <strong>Compensation:</strong> {activeModalJob.compensation}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {/* Responsibilities */}
              {(activeModalJob.responsibilities || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                    What You Will Own & Build
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {activeModalJob.responsibilities.map((r, i) => (
                      <li key={i} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Must-Haves */}
              {(activeModalJob.must_haves || activeModalJob.mustHaves || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                    Must-Have Foundations
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {(activeModalJob.must_haves || activeModalJob.mustHaves || []).map((m, i) => (
                      <li key={i} className="leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Target Tech Stack */}
              {(activeModalJob.skills || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                    Target Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalJob.skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {(activeModalJob.highlights || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wide">
                    Role Highlights & Studio Perks
                  </h5>
                  <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-300">
                    {activeModalJob.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setActiveModalJob(null)}
                className="w-full sm:w-auto text-xs font-semibold cursor-pointer"
              >
                Close
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto rounded-xl px-6 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                <Link href={getApplyLink(activeModalJob.title)}>
                  Apply for this Position <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

    </div>
  )
}

export default function CareersClient({ initialJobs }: { initialJobs: JobOpeningItem[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading careers...</div>}>
      <CareersClientInner initialJobs={initialJobs} />
    </Suspense>
  )
}
