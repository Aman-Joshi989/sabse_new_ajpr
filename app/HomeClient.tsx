'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Database, Code2, Cpu, GitMerge, Layout, Layers, ShieldCheck, CheckCircle, X, Terminal, Globe, Smartphone, Lock, Cloud, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import HeroSection from '@/components/sections/HeroSection'

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
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(148, 163, 184, 0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

interface HomeClientProps {
  services?: any[];
  blogs?: any[];
  settings?: any;
}

export default function HomeClient({ services = [], blogs = [], settings }: HomeClientProps) {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Fallback static services if DB is empty
  const defaultServices = [
    {
      title: "Custom Web Development",
      description: "Engineering next-generation web applications, high-performance API architectures, and data-driven systems.",
      slug: "custom-web-development-ai-solutions",
      category: "Systems"
    },
    {
      title: "AI Chatbot Development",
      description: "Creating advanced LLM-powered virtual assistants with vector search integrations and flawless contextual retention.",
      slug: "ai-chatbot-development",
      category: "AI"
    },
    {
      title: "Business Automation",
      description: "Streamlining operational friction by orchestrating intelligent autonomous workflows and pipeline automation.",
      slug: "business-ai-automation",
      category: "Operations"
    },
    {
      title: "SaaS Architecture",
      description: "Building commercial-grade multi-tenant software-as-a-service platforms equipped with robust subscription tiers.",
      slug: "saas-product-development",
      category: "Architecture"
    },
    {
      title: "Digital Growth SEO",
      description: "Fusing mathematical optimization with content generation to maximize online search engine reach.",
      slug: "ai-digital-marketing-services",
      category: "Growth"
    },
    {
      title: "Cloud Infrastructure",
      description: "Deploying highly available, auto-scaling cloud architectures on AWS, GCP, and Vercel networks.",
      slug: "cloud-solutions",
      category: "Cloud"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-slate-200 dark:selection:bg-slate-800 font-sans transition-colors duration-300">

      {/* Floating Promo Banner - Clean Integration */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0, transition: { duration: 0.2 } }}
            className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 relative z-50 flex items-center justify-center px-4"
          >
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse hidden sm:block"></span>
              <strong className="text-slate-900 dark:text-white">LaunchPad Pro:</strong> The Complete Startup Growth Kit.
              <Link href="/startup-growth-kit" className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-2">
                Explore Now &rarr;
              </Link>
            </p>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full mx-auto">
        {/* 1. HERO SECTION */}
        <HeroSection services={displayServices} />

        {/* 2. INFINITE TRUST MARQUEE */}
        <section className="py-6 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden relative flex">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 mx-6 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> React & Next.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><Database className="w-4 h-4" /> PostgreSQL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><Cloud className="w-4 h-4" /> Cloud Infrastructure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> TypeScript</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200"><Cpu className="w-4 h-4" /> 99.99% Uptime</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </section>

        {/* 3. CORE VALUE PROPOSITIONS */}
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="mb-20 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">Built for scale, <br className="hidden md:block"/>not just presence.</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">We do not build static brochure sites. We architect high-performance digital systems designed to compound your growth and handle immense scale.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Database,
                  title: "System Architecture",
                  desc: "We engineer data-heavy, scalable platforms designed to handle high concurrency without degrading performance."
                },
                {
                  icon: Code2,
                  title: "Execution-First",
                  desc: "Predictable deployment. We ship production-ready, enterprise-grade software free of technical debt and over-engineered bloat."
                },
                {
                  icon: Cpu,
                  title: "AI Automation",
                  desc: "We embed intelligent workflows into your core business logic, reducing manual overhead and multiplying product velocity."
                }
              ].map((prop, index) => (
                <MouseGlowCard
                  key={index}
                  className="space-y-6 p-8 border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-1 bg-white dark:bg-[#0a0f1c] rounded-2xl shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg">
                    <prop.icon className="w-6 h-6 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{prop.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prop.desc}</p>
                </MouseGlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* 4. LIVE SWARM ENGINE DEMO */}
        <section className="py-24 relative overflow-hidden border-y border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0f1c]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-300 border-none font-bold tracking-widest px-4 py-1.5 uppercase text-xs mb-8 rounded-full">
              Live AI Orchestration
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              Witness Multi-Agent Swarms
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-2xl mx-auto">
              Interact with specialized, concurrent AI agent teams (Architect, Coder, Tester) running live automated workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold transition-all shadow-lg" asChild>
                <Link href="/chat-agents">Talk to Agent Swarms &rarr;</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-md border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 font-semibold transition-all" asChild>
                <Link href="/demo-ruflo">Launch Simulator</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 5. CORE ENGINEERING & AI SERVICES */}
        <section id="solutions" className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                Engineering Capabilities
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Deploying state-of-the-art architectures, custom intelligent models, and scaling infrastructures.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayServices.map((service: any, index: number) => {
                const href = service.slug ? `/services/${service.slug}` : '#';
                const tag = service.category || "Solution";
                return (
                  <Link href={href} key={index} className="group flex flex-col justify-between p-8 bg-white dark:bg-[#030712] border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="space-y-4">
                      <Badge variant="outline" className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-wider text-[10px] rounded-md">
                        {tag}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {service.description || service.desc}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      Explore Solution <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. PORTFOLIO CASE STUDIES */}
        <section className="py-24 md:py-32 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0f1c]">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Engineering Outcomes.</h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">Real architectural challenges transformed into scalable digital systems.</p>
              </div>
              <Link href="/portfolio" className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-blue-600 transition-colors border-b border-slate-900 dark:border-white hover:border-blue-600 pb-1">
                View Architecture Log <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  title: "Project Fintech Schema",
                  category: "Backend Architecture",
                  impact: "Supported 100k+ concurrent users and reduced API latency by 45%.",
                  tags: ["Node.js", "PostgreSQL", "Microservices"],
                  image: "/images/visuals/fintech_backend.png"
                },
                {
                  title: "Logistics Routing Intelligence",
                  category: "AI Algorithms",
                  impact: "Automated routing logic, cutting manual operational costs significantly.",
                  tags: ["Python", "TensorFlow", "React"],
                  image: "/images/visuals/ai_logistics.png"
                },
                {
                  title: "Scalable Cloud Pipeline",
                  category: "Cloud Infrastructure",
                  impact: "Distributed high-availability deployments for a global scale.",
                  tags: ["AWS", "Docker", "Kubernetes"],
                  image: "/images/visuals/cloud_infrastructure.png"
                },
                {
                  title: "High-Performance Scaling Core",
                  category: "System Strategy",
                  impact: "Architected aggressive growth structure supporting massive surges.",
                  tags: ["Redis", "Load Balancing", "Golang"],
                  image: "/images/visuals/system_scaling.png"
                }
              ].map((study, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center transition-all">
                    <Image src={study.image} alt={study.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="space-y-3">
                    <Badge variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-bold text-[10px] uppercase bg-white dark:bg-[#030712]">{study.category}</Badge>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">{study.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{study.impact}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 px-2.5 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. HOW WE WORK */}
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">The Deployment Framework</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">A predictable engineering process that removes guesswork from complex builds.</p>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
              {[
                {
                  step: "01",
                  icon: Layout,
                  title: "Architecture & Scope",
                  desc: "We map constraints, define data models, and architect the exact backend infrastructure required to scale. Measure twice, code once."
                },
                {
                  step: "02",
                  icon: Code2,
                  title: "Agile Engineering",
                  desc: "We execute the build. Robust database structuring, secure APIs, and minimal front-end interfaces developed in high-velocity sprints."
                },
                {
                  step: "03",
                  icon: ShieldCheck,
                  title: "Deployment & Scaling",
                  desc: "We launch, perform rigorous load testing, and actively scale the infrastructure as your transactional volume compounds."
                }
              ].map((phase, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-[#030712] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm shadow-sm">
                    {phase.step}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0a0f1c] shadow-sm hover:shadow-md transition-shadow float-right group-odd:float-left">
                    <phase.icon className="w-6 h-6 text-slate-900 dark:text-white mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{phase.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. LATEST BLOG POSTS SECTION */}
        {blogs && blogs.length > 0 && (
          <section className="py-24 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0a0f1c]/50">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
              <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                    Engineering Log
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xl">Deep dives into architecture, SEO mechanics, and startup growth strategies.</p>
                </div>
                <Button variant="outline" className="h-10 px-6 rounded-md border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:bg-[#030712] transition-colors" asChild>
                  <Link href="/blog">View All Entries</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {blogs.slice(0, 3).map((blog: any) => (
                  <div key={blog.id} className="bg-white dark:bg-[#030712] border border-slate-200 dark:border-slate-800 p-8 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors flex flex-col justify-between">
                    <div>
                      <Badge className="mb-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-none rounded-md px-2.5 py-1">
                        {blog.author || 'Architecture'}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-8 leading-relaxed">
                        {blog.description || blog.seo_description || 'Explore the latest insights from our digital engineering experts.'}
                      </p>
                    </div>
                    <Link href={`/blog/${blog.slug}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors flex items-center">
                      Read Entry <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. FINAL CTA SECTION */}
        <section className="py-32 relative text-center overflow-hidden bg-white dark:bg-[#030712]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">Stop Managing Tech Debt. <br />Start Scaling.</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mb-10">Partner with an engineering team dedicated to long-term architectural success and rapid deployment.</p>
            <Button size="lg" className="h-14 px-10 text-lg rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold transition-all shadow-xl" asChild>
              <Link href="/book-call">Initiate Project <ArrowRight className="w-5 h-5 ml-2"/></Link>
            </Button>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 3rem)); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: fit-content;
        }
      `}</style>
    </div>
  )
}
