'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Monitor, Star, Menu, X, ArrowUpRight, Github, Globe, Layout, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { PortfolioCard } from './PortfolioCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PortfolioClientProps {
  initialProjects: any[];
}

// Data sets matched to requested structure
const impactMetrics = [
  { value: "20%+", label: "Engagement Growth" },
  { value: "2x", label: "Backend Performance Boost" },
  { value: "70%", label: "Automation Implementation" },
  { value: "10+", label: "Multi-Industry Expertise" },
]

const executionPhases = [
  { step: "01", title: "Architecture & Growth Strategy", description: "Mapping out the digital ecosystem to align with revenue goals and scale without technical debt." },
  { step: "02", title: "System Design & Development", description: "Engineering the frontend and complex backend logic with enterprise-grade tech stacks." },
  { step: "03", title: "Automation & AI Layer", description: "Integrating intelligent models to replace manual tasks and multiply operational efficiency." },
  { step: "04", title: "Optimization & Scale", description: "Continuous performance tuning, conversion rate optimization, and managing the load." }
]

const audiences = [
  { title: "Funded Startups", pain: "Your architecture limits your ability to scale after series funding.", solution: "We rebuild your tech stack for high availability and rapid growth." },
  { title: "Scaling Ecommerce Brands", pain: "Poor conversion rates and messy inventory systems dragging margins.", solution: "We optimize backend performance and implement seamless checkout funnels." },
  { title: "Growth-Focused Agencies", pain: "Lacking the deep technical expertise to execute complex client demands in-house.", solution: "We become your invisible enterprise-grade tech backbone." },
  { title: "Operationally Stuck SMEs", pain: "Manual processes and disconnected legacy software are stifling your growth.", solution: "We automate your entire operation into a cohesive digital machine." },
]

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const projects = initialProjects;
  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category))) as string[]]

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p: any) => p.category === selectedCategory)

  // Motion transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white selection:bg-blue-600/50 selection:text-white font-sans transition-colors duration-300">
      <div ref={containerRef} className="w-[80%] mx-auto min-h-screen">
        {/* Custom Cursor Trailing Effect */}
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[100] mix-blend-difference hidden md:block"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
        />

        {/* 1. Authority Hero Section */}
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-20">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center z-20 px-4 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-100 dark:bg-blue-900/20 mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 dark:text-blue-300">Strategic Technology Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-8 text-slate-900 dark:text-white"
            >
              We Build Infrastructure That <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-600">
                Scales Revenue.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed mb-12"
            >
              AJPR WORLD partners with ambitious businesses to design scalable digital systems, AI automation, and performance-driven technology stacks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-full text-base font-bold text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-105" asChild>
                <Link href="#case-studies">View Case Studies</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 h-12 px-8 rounded-full text-base font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white" asChild>
                <Link href="/contact">Book Strategy Call <ArrowUpRight className="ml-2 w-4 h-4 text-slate-900 dark:text-slate-400" /></Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>

        {/* 2. Social Proof / Impact Metrics Strip */}
        <div className="border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative z-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              {impactMetrics.map((metric, idx) => (
                <div key={idx} className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">{metric.value}</div>
                  <div className="text-sm font-bold tracking-widest text-slate-500 uppercase">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Strategic Positioning Section */}
        <section className="py-32 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-slate-900 dark:text-white">We Don't Build Websites. <br /><span className="text-blue-600 dark:text-blue-500">We Engineer Growth Systems.</span></h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-12">
              AJPR WORLD elevates beyond basic development. We act as your growth engineers, focusing strictly on high-leverage infrastructure that directly impacts your bottom line.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['System Architecture', 'Revenue Optimization', 'Backend Scalability', 'Automation Infrastructure', 'AI-first Execution'].map((pill, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-sm">
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Featured Case Studies (Premium Format) */}
        <section id="case-studies" className="py-24 relative z-20">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">Featured Engineering.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Deep dives into exactly how we solve complex problems for high-growth brands.</p>
            </div>

            {/* Sticky Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-32">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project: any, index: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                  >
                    {/* Left: Device Mockup / Image */}
                    <div className={`relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] border border-slate-200 dark:border-slate-700 shadow-2xl ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      <img
                        src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0F19] via-transparent to-transparent opacity-90" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Case Study</span>
                        <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
                      </div>
                    </div>

                    {/* Right: Strategic Breakdown */}
                    <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div>
                        <h3 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{project.description}</p>
                      </div>

                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <h4 className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-2">The Challenge</h4>
                          <p className="text-slate-600 dark:text-slate-300">Legacy systems causing performance bottlenecks, poor conversion rates, and high manual operational load preventing scale.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest mb-2">Our Strategic Approach</h4>
                          <p className="text-slate-600 dark:text-slate-300">Complete architectural rebuild focusing on scalable database design, modern front-end performance, and continuous integration pipelines.</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tech Stack Engineered</h4>
                        <div className="flex flex-wrap gap-2">
                          {(project.tags || ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'AWS']).map((tech: string, i: number) => (
                            <span key={i} className="px-3 py-1 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300">{tech}</span>
                          ))}
                        </div>
                      </div>

                      {/* Mock Results if no stats exist in DB */}
                      <div className="grid grid-cols-2 gap-4">
                        {(project.stats ? Object.entries(project.stats) : [['Performance', '+140%'], ['Conversions', 'up 2x']]).map(([label, value], i) => (
                          <div key={i} className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{String(value)}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-slate-900 text-white dark:bg-white dark:text-[#0B0F19] hover:bg-slate-800 dark:hover:bg-slate-200 h-14 px-8 rounded-full font-bold text-lg w-full sm:w-auto" asChild>
                        <Link href={project.url || "#"} target="_blank">View Live Infrastructure <ArrowUpRight className="ml-2 w-5 h-5" /></Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 5. Who We Work Best With */}
        <section className="py-32 relative bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Built For High-Growth Ecosystems.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">If your tech is holding you back, we rebuild it for scale.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {audiences.map((aud, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{aud.title}</h3>
                  <p className="text-slate-600 dark:text-slate-500 font-medium mb-4"><strong className="text-rose-600 dark:text-rose-400">The Problem:</strong> {aud.pain}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium"><strong className="text-emerald-600 dark:text-emerald-400">The Execution:</strong> {aud.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Execution Framework */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Our Execution Model.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">A rigorous, enterprise-level framework designed for perfect delivery.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {executionPhases.map((phase, i) => (
                <div key={i} className="relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:bg-slate-50 dark:hover:bg-slate-900 overflow-hidden transition-colors group shadow-sm">
                  <div className="text-7xl font-black text-slate-200 dark:text-slate-800/30 absolute -top-4 -right-2 tracking-tighter group-hover:text-blue-100 dark:group-hover:text-blue-900/20 transition-colors">{phase.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">{phase.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Technology Ecosystem Section */}
        <section className="py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-12">The Ecosystem We Command</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto opacity-70">
              {['React & Next.js', 'Node.js & Python', 'Django & Laravel', 'PostgreSQL & Redis', 'AWS Architecture', 'OpenAI & Custom ML'].map((tech, i) => (
                <div key={i} className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300">{tech}</div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Final High-Ticket CTA */}
        <section className="py-32 px-4 container mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid-slate-900/[0.03] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/10 dark:from-blue-600/20 to-purple-600/10 dark:to-purple-600/20 mix-blend-overlay" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">If You're Serious About Scaling, Let's Talk.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed">We focus on long-term execution partnerships, accepting a limited number of ambitious clients.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-16 px-10 rounded-full text-lg font-bold text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-105" asChild>
                  <Link href="/contact">Apply for Partnership</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm h-16 px-10 rounded-full text-lg font-bold text-slate-900 dark:text-white transition-all" asChild>
                  <Link href="/contact">Schedule Strategy Call</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}