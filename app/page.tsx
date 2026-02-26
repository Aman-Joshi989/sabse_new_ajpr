'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Database, Code2, Cpu, GitMerge, Layout, Layers, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-blue-600/30 font-sans transition-colors duration-300">
      <div className="w-[80%] mx-auto min-h-screen">

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

          {/* Animated Grid / SVG geometric elements */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none">
            <svg className="absolute inset-0 h-full w-full opacity-[0.05] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="geometric-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0l30 30-30 30L0 30z" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
            </svg>
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
                <Button size="lg" className="h-12 px-8 text-base rounded-none bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] border border-blue-500/50 hover:scale-[1.02]" asChild>
                  <Link href="/contact">Book Strategy Call <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-none border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 bg-white dark:bg-[#030712] text-slate-900 dark:text-white font-bold transition-all" asChild>
                  <Link href="/portfolio">View Our Architecture</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. TRUST STRIP */}
        <section className="py-8 border-y border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-white/[0.01] backdrop-blur-sm overflow-hidden relative">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-8 gap-y-4 text-xs md:text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span>React & Next.js</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
              <span>PostgreSQL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
              <span>AWS Infrastructure</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
              <span>TypeScript</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
              <span>99.99% Uptime</span>
            </div>
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="space-y-6 p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800/30">
                    <prop.icon className="w-7 h-7 text-blue-600 dark:text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{prop.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prop.desc}</p>
                </motion.div>
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
