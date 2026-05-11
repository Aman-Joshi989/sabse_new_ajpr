'use client'

import React, { useState, useRef } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Database, Code2, Cpu, GitMerge, Layout, Layers, ShieldCheck, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustBadges } from '@/components/ui/TrustBadges'

const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

// -------------------------------------------------------------
// Interactive Components
// -------------------------------------------------------------

const MouseGlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.15), transparent 40%)`
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  )
}

const TerminalSimulator = () => {
  const [activeTab, setActiveTab] = useState('architecture.ts')

  const snippets: Record<string, string> = {
    'architecture.ts': `// AJPR World Next-Gen Architecture\nimport { ScaleCluster } from '@ajpr/core';\n\nconst cluster = new ScaleCluster({\n  nodes: 'auto-scaling',\n  database: 'PostgreSQL-Neon',\n  caching: 'Redis-Edge'\n});\n\nawait cluster.deploy();\nconsole.log('Infrastructure instantly replicated.');`,
    'api.go': `// High-Concurrency Go Router\npackage main\n\nimport "github.com/ajpr/fast-router"\n\nfunc main() {\n    r := router.New(router.Config{\n        Concurrency: "Maximum",\n        Latency: "< 10ms",\n    })\n    r.Listen(":8080")\n}`,
    'deploy.sh': `#!/bin/bash\n# Activating CI/CD Pipeline\n==> Running unit tests... [PASS]\n==> Building container... [PASS]\n==> Pushing to registry... [PASS]\n==> Rolling update across 50 nodes... [SUCCESS]\nSystem fully operational at 99.99% uptime.`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f1c] shadow-2xl mt-16 text-left relative z-10"
    >
      <div className="flex bg-slate-100 dark:bg-slate-900 px-4 py-3 items-center border-b border-slate-200 dark:border-slate-800">
        <div className="flex space-x-2 mr-6">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
        </div>
        <div className="flex space-x-6">
          {Object.keys(snippets).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs md:text-sm font-mono transition-colors ${activeTab === tab ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm md:text-base font-mono text-slate-800 dark:text-slate-300">
          <motion.code
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {snippets[activeTab]}
          </motion.code>
        </pre>
      </div>
    </motion.div>
  )
}

// -------------------------------------------------------------
// Main Page
// -------------------------------------------------------------

export default function HomePage() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-blue-600/30 font-sans transition-colors duration-300">

      {/* Floating Promo Banner */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ y: 150, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 150, x: "-50%", opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 z-[100] w-[95%] max-w-3xl"
          >
            <div className="bg-slate-900 dark:bg-slate-50 border border-slate-700 dark:border-slate-300 p-2.5 sm:p-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 relative pr-8 sm:pr-14">

              <div className="flex-1 flex items-start sm:items-center gap-2 sm:gap-3 w-full">
                <span className="text-xl sm:text-2xl drop-shadow-md hidden sm:block">🚀</span>
                <p className="text-xs sm:text-sm font-medium text-white dark:text-slate-900 leading-snug">
                  <strong className="text-amber-400 dark:text-amber-600 font-black mr-1 block sm:inline">LaunchPad Pro:</strong>
                  Complete Startup Growth Kit built for scale.
                </p>
              </div>

              <div className="shrink-0 flex items-center w-full sm:w-auto mt-1 sm:mt-0">
                <Button size="sm" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg h-8 sm:h-9 px-3 sm:px-6 text-xs sm:text-sm" asChild>
                  <Link href="/startup-growth-kit">Explore Now</Link>
                </Button>
              </div>

              <button
                onClick={() => setIsBannerVisible(false)}
                className="absolute top-2 sm:top-1/2 sm:-translate-y-1/2 right-2 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-900 bg-slate-800/50 dark:bg-slate-200/50 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-full transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-4 sm:px-0 sm:w-[80%] mx-auto min-h-screen">

        {/* 1. HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center pt-20 pb-20 overflow-hidden">
          {/* Animated Dynamic Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-600/20 dark:bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-cyan-600/10 dark:bg-cyan-500/20 blur-[120px] rounded-full mix-blend-screen"
            />
          </div>

          {/* Animated SVG Data Circuits and Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated SVG Tech Paths */}
            <svg className="absolute w-full h-full opacity-60 dark:opacity-80 mix-blend-overlay" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="glowLine1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="glowLine2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <motion.path
                d="M -200 600 Q 200 300 600 500 T 1600 300"
                stroke="url(#glowLine1)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
              />
              <motion.path
                d="M -100 200 C 300 50 500 600 900 500 S 1300 100 1600 200"
                stroke="url(#glowLine2)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 1 }}
              />
              <motion.path
                d="M 100 800 C 400 400 800 900 1200 300 S 1500 800 1800 600"
                stroke="url(#glowLine1)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatType: "reverse", delay: 2 }}
              />
            </svg>

            {/* Floating UI Elements */}
            <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] hidden lg:block opacity-30 dark:opacity-40">
              <Database className="w-16 h-16 text-blue-500" />
            </motion.div>
            <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[25%] right-[10%] hidden lg:block opacity-30 dark:opacity-40">
              <Cpu className="w-24 h-24 text-cyan-500" />
            </motion.div>
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[35%] right-[15%] hidden xl:block opacity-30 dark:opacity-40">
              <GitMerge className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto space-y-6">
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
                Engineering Scalable <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                  Digital Systems.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
                We architect AI-first product infrastructure and complex web platforms for scaling companies. We transform operational bottlenecks into high-performance digital engines.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button size="lg" className="h-12 px-8 text-base rounded-none bg-blue-600 hover:bg-blue-500 text-white font-bold transition-transform shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] border border-blue-500/50 hover:scale-[1.05]" asChild>
                  <Link href="/contact">Book Strategy Call <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-none border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 bg-white dark:bg-[#030712] text-slate-900 dark:text-white font-bold transition-transform hover:scale-[1.05]" asChild>
                  <Link href="/portfolio">View Our Architecture</Link>
                </Button>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex justify-center mt-6">
                <TrustBadges />
              </motion.div>

              {/* Interactive Terminal placed inside Hero */}
              <TerminalSimulator />
            </motion.div>
          </div>
        </section>

        {/* 2. TRUST STRIP */}
        <section className="py-8 border-y border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-white/[0.01] backdrop-blur-sm overflow-hidden relative">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-8 gap-y-4 text-xs md:text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span className="cursor-default hover:text-blue-500 transition-colors">React & Next.js</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 animate-pulse" />
              <span className="cursor-default hover:text-blue-500 transition-colors">PostgreSQL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 animate-pulse" />
              <span className="cursor-default hover:text-blue-500 transition-colors">AWS Infrastructure</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 animate-pulse" />
              <span className="cursor-default hover:text-blue-500 transition-colors">TypeScript</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 animate-pulse" />
              <span className="cursor-default hover:text-green-500 transition-colors">99.99% Uptime</span>
            </div>
          </div>
        </section>

        {/* 2.5 STARTUP GROWTH KIT FEATURE (Strategic Placement) */}
        <section className="py-24 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-teal-400/5 to-transparent dark:from-amber-400/5 dark:via-teal-400/5 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
            <Badge className="bg-amber-400 text-slate-900 border-none font-black tracking-widest px-4 py-1.5 uppercase text-xs mb-6 hover:bg-amber-500">
              New Startups
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
              LaunchPad Pro <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-teal-500">Startup Growth Kit</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-2xl mx-auto">
              Everything a new-age startup needs — from an ultra-dynamic digital identity to AI-powered growth, managed by your own dedicated human mentor.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" /> Website & App</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" /> Brand Kit</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" /> AI Strategy</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" /> 1-on-1 Mentor</span>
            </div>
            <Button size="lg" className="h-14 px-10 text-lg rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black transition-all hover:scale-[1.02] hover:shadow-2xl" asChild>
              <Link href="/startup-growth-kit">Explore The Kit <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </section>

        {/* 3. CORE VALUE PROPOSITIONS */}
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="mb-20 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Built for scale, not just presence.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">AJPR World is a product engineering company. We do not build static brochure sites; we architect systems designed to compound your growth.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Database,
                  title: "System Architecture",
                  desc: "We engineer data-heavy, scalable platforms designed to handle high concurrency without degrading performance. Solid foundations for massive scale."
                },
                {
                  icon: Code2,
                  title: "Execution-First Engineering",
                  desc: "Predictable deployment. We ship production-ready, enterprise-grade software free of technical debt and over-engineered bloat."
                },
                {
                  icon: Cpu,
                  title: "AI-Driven Automation",
                  desc: "We embed intelligent workflows into your core business logic, reducing manual overhead and multiplying product velocity."
                }
              ].map((prop, index) => (
                <MouseGlowCard
                  key={index}
                  className="space-y-6 p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-2 cursor-crosshair bg-white dark:bg-[#030712] rounded-xl"
                >
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800/30 rounded-lg">
                    <prop.icon className="w-7 h-7 text-blue-600 dark:text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{prop.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prop.desc}</p>
                </MouseGlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CASE STUDIES (Placeholder realistic structure) */}
        <section className="py-24 md:py-32 border-y border-slate-200 dark:border-slate-800/50">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Engineering Outcomes.</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">Real architectural challenges transformed into scalable digital systems.</p>
              </div>
              <Link href="/portfolio" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:underline underline-offset-4">
                View Complete Portfolio <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  title: "Project Fintech Schema",
                  category: "Backend Architecture & Automation",
                  impact: "Supported 100k+ concurrent users and reduced API latency by 45%.",
                  tags: ["Node.js", "PostgreSQL", "Microservices"],
                  image: "/images/visuals/fintech_backend.png"
                },
                {
                  title: "Logistics Routing Intelligence",
                  category: "AI & Optimization Algorithms",
                  impact: "Automated routing logic, cutting manual operational costs by $300k/yr.",
                  tags: ["Python", "TensorFlow", "React"],
                  image: "/images/visuals/ai_logistics.png"
                },
                {
                  title: "Scalable Cloud Data Pipeline",
                  category: "Cloud Infrastructure",
                  impact: "Distributed high-availability CI/CD deployments for a global SaaS scale.",
                  tags: ["AWS", "Docker", "Kubernetes"],
                  image: "/images/visuals/cloud_infrastructure.png"
                },
                {
                  title: "High-Performance Scaling Core",
                  category: "System Scaling Strategy",
                  impact: "Architected aggressive growth structure supporting massive traffic surges.",
                  tags: ["Redis", "Load Balancing", "Golang"],
                  image: "/images/visuals/system_scaling.png"
                }
              ].map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <Image src={study.image} alt={study.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-none bg-slate-50 dark:bg-slate-800/50">{study.category}</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{study.title}</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{study.impact}</p>
                    <div className="flex gap-4 pt-2">
                      {study.tags.map(tag => (
                        <span key={tag} className="text-sm font-bold text-slate-500">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HOW WE WORK (3-Step Framework) */}
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">The Deployment Framework.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">A predictable engineering process that removes guesswork from complex builds.</p>
            </div>

            <div className="space-y-16 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-600/0 before:via-blue-500/20 dark:before:via-blue-600/30 before:to-transparent">
              {[
                {
                  step: "01",
                  icon: Layout,
                  title: "Architecture & Scope",
                  desc: "We map your constraints, define data models, and architect the exact backend infrastructure required to scale. Measure twice, code once."
                },
                {
                  step: "02",
                  icon: Code2,
                  title: "Agile Engineering",
                  desc: "We execute the build. Robust database structuring, secure APIs, and premium, minimal front-end interfaces developed in high-velocity sprints."
                },
                {
                  step: "03",
                  icon: ShieldCheck,
                  title: "Deployment & Scaling",
                  desc: "We launch, perform rigorous load testing, and actively scale the infrastructure as your user base and transactional volume compounds."
                }
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-slate-50 dark:bg-[#030712] border-2 border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-black text-xl shadow-[0_0_0_8px_#f8fafc] dark:shadow-[0_0_0_8px_#030712]">
                    {phase.step}
                  </div>
                  <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-8 border border-slate-200 dark:border-slate-800 shadow-sm float-right group-odd:float-left">
                    <phase.icon className="w-8 h-8 text-blue-600 dark:text-blue-500 mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{phase.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA CTA */}
        <section className="py-32 relative border-t border-slate-200 dark:border-slate-800/50 text-center overflow-hidden">
          {/* Animated Dynamic Blur Blobs (About Page Style) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-[120px] rounded-[100%] mix-blend-screen"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none mix-blend-overlay" />

          {/* Animated Connectivity Network */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30 mix-blend-overlay">
            <svg className="absolute w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="netGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <motion.circle cx="20%" cy="30%" r="4" fill="#3b82f6" animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.circle cx="80%" cy="70%" r="4" fill="#06b6d4" animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
              <motion.circle cx="30%" cy="80%" r="3" fill="#8b5cf6" animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
              <motion.circle cx="70%" cy="20%" r="5" fill="#3b82f6" animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} />
              <motion.path d="M 200 180 L 700 120 L 800 420 L 300 480 Z" stroke="url(#netGradient)" strokeWidth="1" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }} />
              <motion.path d="M 200 180 L 800 420" stroke="url(#netGradient)" strokeWidth="0.5" strokeDasharray="2 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }} />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[1.1]">Stop Managing Tech Debt. <br />Start Scaling.</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mb-12">Partner with an engineering team dedicated to long-term architectural success and rapid deployment.</p>
            <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] border border-blue-500/50 hover:scale-[1.02]" asChild>
              <Link href="/contact">Build With Us</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  )
}
