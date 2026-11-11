'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Search,
  Brain,
  Rocket,
  Code2,
  Database,
  LineChart,
  Settings,
  Store,
  Users,
  UserCircle,
  Building2,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Mail,
  ShieldCheck
} from 'lucide-react'
import CoreValuesSection from '@/components/sections/CoreValuesSection'
import AccountabilityPledgeSection from '@/components/sections/AccountabilityPledgeSection'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
}

interface AboutClientProps {
  services?: any[];
  settings?: any;
}

export default function AboutClient({ services = [], settings }: AboutClientProps) {
  
  // Features Data
  const features = [
    {
      icon: Rocket,
      title: 'Speed with Structure',
      description: 'Rapid deployment without compromising on scalable architecture and clean code.'
    },
    {
      icon: Brain,
      title: 'AI-First Thinking',
      description: 'Integrating intelligent automation and LLMs to multiply your operational efficiency.'
    },
    {
      icon: Database,
      title: 'Deep Technical Expertise',
      description: 'Enterprise-grade backend architectures and dynamic, high-performance web applications.'
    },
    {
      icon: LineChart,
      title: 'Growth-Focused Execution',
      description: 'Every line of code and system built is optimized for conversions and measurable ROI.'
    }
  ]

  // Target Audience Data
  const targetAudience = [
    {
      icon: Rocket,
      title: 'Startups',
      painPoint: 'Need to build an MVP quickly but require scalable architecture for future funding rounds.',
      solution: 'We build rapid, scalable foundations that grow as fast as your user base.'
    },
    {
      icon: Store,
      title: 'Ecommerce Brands',
      painPoint: 'Struggling with slow load times, poor conversion rates, and messy inventory systems.',
      solution: 'We optimize performance and integrate seamless backend solutions for higher ROI.'
    },
    {
      icon: Building2,
      title: 'Agencies',
      painPoint: 'Lacking deep technical expertise in-house to fulfill complex client demands.',
      solution: 'We act as your dedicated tech partner, providing enterprise-grade execution.'
    },
    {
      icon: Users,
      title: 'SMEs',
      painPoint: 'Burdened by manual processes and outdated digital infrastructures limiting growth.',
      solution: 'We automate operations and modernize your tech stack to maximize efficiency.'
    },
    {
      icon: UserCircle,
      title: 'Personal Brands',
      painPoint: 'Need a premium digital presence that actually converts audience into revenue.',
      solution: 'We design high-converting platforms tailored to your unique authority.'
    }
  ]

  // Map dynamic services to capabilities strip
  const displayCapabilities = services.length > 0
    ? services.slice(0, 5).map((s: any) => {
        let Icon = Rocket
        if (s.icon_name === 'Code2') Icon = Code2
        else if (s.icon_name === 'Brain') Icon = Brain
        else if (s.icon_name === 'Database') Icon = Database
        else if (s.icon_name === 'Search') Icon = Search
        else if (s.icon_name === 'Settings') Icon = Settings
        return { label: s.title, icon: Icon }
      })
    : [
        { icon: Code2, label: 'Custom Web Apps' },
        { icon: Brain, label: 'AI & Automation' },
        { icon: Database, label: 'Backend Architecture' },
        { icon: Search, label: 'Conversion Optimization' },
        { icon: Settings, label: 'Growth Infrastructure' }
      ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-blue-500/30 font-sans transition-colors duration-300">
      <div className="w-full min-h-screen">

        {/* 1. HERO SECTION */}
        <section className="relative pt-36 pb-28 overflow-hidden flex items-center min-h-[85vh]">
          {/* Premium Dark Hero Background */}
          <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-[radial-gradient(circle_at_70%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none"></div>
          <div className="absolute top-40 -left-20 w-[60%] h-[120%] bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp3uolnn/image/upload/v1723528256/grid-pattern_qayf0d.png')] opacity-20 bg-[length:32px_32px] pointer-events-none mix-blend-overlay"></div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none"></div>

          <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-800 dark:via-white to-slate-600 dark:to-white/60">
                Building Systems That <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Scale Businesses.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                {settings?.seo_description || 'We design, develop, and automate powerful digital infrastructures that help modern businesses grow faster, operate smarter, and convert better.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-xl h-14 px-8 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1" asChild>
                  <Link href="/contact">Work With Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base font-bold border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 bg-white dark:bg-white/5 backdrop-blur-md transition-all text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white hover:-translate-y-1" asChild>
                  <Link href="/portfolio">See Our Work <ArrowRight className="ml-2 w-4 h-4 text-slate-900 dark:text-white" /></Link>
                </Button>
              </div>

              {/* Capabilities Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-20 pt-10 border-t border-slate-200 dark:border-white/10"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-6">Execution Expertise</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {displayCapabilities.map((item, idx) => (
                    <div key={idx} className="flex items-center text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                      <item.icon className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. OUR STORY */}
        <section className="py-24 relative z-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">Systematic Growth. <br />Zero Inefficiencies.</h2>
              <div className="space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white">AJPR WORLD</strong> was founded with a singular vision: to eliminate operational chaos in modern businesses by building powerful, automated digital systems.
                </p>
                <p>
                  We don't believe in vanity metrics or generic templates. Driven by an execution-first mindset, we engineer custom solutions that bridge the gap between complex technology and tangible business ROI.
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">
                  We are your direct execution machine.
                </p>
              </div>

              {/* Founder Spotlight Card */}
              <div className="mt-12 text-left bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative shrink-0">
                    <Image
                      src="/images/aman-joshi-profile.png"
                      alt="Aman Joshi"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-2xl object-cover object-top shadow-lg ring-2 ring-blue-500/20"
                      priority
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Active"></span>
                  </div>
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aman Joshi</h3>
                        <span className="text-[11px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Founder & Systems Architect
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Direct 1-on-1 Architecture Pod &bull; Zero Middlemen &bull; 100% Code Ownership
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      &ldquo;When you partner with AJPR World, you get senior engineering craftsmanship from day one. We take your idea from system architecture to a scalable, production-ready MVP in weeks.&rdquo;
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <Button size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold" asChild>
                        <Link href="/book-call">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" /> Book 30-Min Strategy Call
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl border-slate-300 dark:border-slate-700 font-bold" asChild>
                        <Link href="/aman-joshi">
                          Read Architect Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                      <a
                        href="https://wa.me/919997205257?text=Hi%20Aman,%20I'd%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 px-2 py-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp (+91 99972 05257)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT MAKES US DIFFERENT */}
        <section className="py-32 relative bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">The Execution Blueprint.</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400">Why ambitious brands choose us as their growth infrastructure partner.</p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-6"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full bg-white dark:bg-white/5 backdrop-blur-xl border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-300">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                        <feature.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. MISSION & VISION */}
        <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-2xl">
                <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4">Our Mission</h3>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  To build scalable digital infrastructures that empower businesses to grow without operational chaos.
                </p>
              </div>
              <div className="p-10 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-2xl">
                <h3 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Our Vision</h3>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  To become a global technology growth partner for ambitious, forward-thinking brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CORE VALUES */}
        <CoreValuesSection />

        {/* 5.5 TOTAL ACCOUNTABILITY PLEDGE */}
        <AccountabilityPledgeSection />

        {/* 6. WHO WE HELP */}
        <section className="py-32 relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">Who We Empower.</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400">Transforming challenges into automated growth engines.</p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {targetAudience.map((audience, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-6 md:p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-900/30 group-hover:border-blue-500/30 transition-all">
                      <audience.icon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{audience.title}</h3>
                      <div className="space-y-1">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium"><span className="text-rose-400">Pain:</span> {audience.painPoint}</p>
                        <p className="text-slate-600 dark:text-slate-300 font-medium"><span className="text-emerald-400">Solution:</span> {audience.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA SECTION */}
        <section className="py-32 px-4 container mx-auto bg-slate-50 dark:bg-slate-950">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[bottom_1px_center] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Ready to Scale the Smart Way?</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 font-medium leading-relaxed">Stop letting technical limitations dictate your growth speed. Let's build a digital infrastructure that accelerates your business.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="rounded-xl h-14 px-10 bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-900/20 font-bold text-lg" asChild>
                  <Link href="/book-call">Book a Strategy Call</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-14 px-10 text-lg border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white bg-white dark:bg-white/5 backdrop-blur-md transition-all hover:scale-105" asChild>
                  <Link href="/services">Start Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
