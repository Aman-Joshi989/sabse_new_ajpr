'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Database, Code2, Cpu, GitMerge, Layout, Layers, ShieldCheck, CheckCircle, Terminal, Globe, Smartphone, Lock, Cloud, Sparkles } from 'lucide-react'
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
  // Fallback static services if DB is empty
  const defaultServices = [
    {
      title: "Custom Web Development",
      description: "Engineering next-generation web applications, high-performance API architectures, and data-driven systems.",
      slug: "custom-web-development-ai-solutions",
      category: "Systems",
      keywords: ["React", "Next.js", "Node.js", "API Design"]
    },
    {
      title: "AI Chatbot Development",
      description: "Creating advanced LLM-powered virtual assistants with vector search integrations and flawless contextual retention.",
      slug: "ai-chatbot-development",
      category: "AI",
      keywords: ["LLM", "Vector DB", "RAG", "Automation"]
    },
    {
      title: "Business Automation",
      description: "Streamlining operational friction by orchestrating intelligent autonomous workflows and pipeline automation.",
      slug: "business-ai-automation",
      category: "Operations",
      keywords: ["Workflow", "CI/CD", "Zapier", "Scripting"]
    },
    {
      title: "SaaS Architecture",
      description: "Building commercial-grade multi-tenant software-as-a-service platforms equipped with robust subscription tiers.",
      slug: "saas-product-development",
      category: "Architecture",
      keywords: ["Multi-tenant", "Stripe", "Auth", "Scalable"]
    },
    {
      title: "Digital Growth SEO",
      description: "Fusing mathematical optimization with content generation to maximize online search engine reach.",
      slug: "ai-digital-marketing-services",
      category: "Growth",
      keywords: ["Technical SEO", "Core Web Vitals", "Content"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Deploying highly available, auto-scaling cloud architectures on AWS, GCP, and Vercel networks.",
      slug: "cloud-solutions",
      category: "Cloud",
      keywords: ["AWS", "GCP", "Docker", "Kubernetes"]
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-slate-200 dark:selection:bg-slate-800 font-sans">
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
        <section className="py-16 md:py-20 relative">
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



        {/* 5. CORE ENGINEERING & AI SERVICES */}
        <section id="solutions" className="py-24 relative bg-slate-50/50 dark:bg-[#050914] border-y border-slate-200 dark:border-slate-800/80">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <Badge variant="outline" className="mb-6 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
                  Our Expertise
                </Badge>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                  Engineering Capabilities
                </h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                  Deploying state-of-the-art architectures, custom intelligent models, and scaling infrastructures to drive your business forward.
                </p>
              </div>
              <div className="hidden md:block shrink-0">
                 <Button variant="outline" className="h-12 px-6 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1c] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold" asChild>
                    <Link href="/services">View All Solutions</Link>
                 </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayServices.slice(0, 3).map((service: any, index: number) => {
                const href = service.slug ? `/services/${service.slug}` : '#';
                const tag = service.category || "Solution";
                return (
                  <MouseGlowCard key={index} className="h-full bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800/80 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
                    <Link href={href} className="flex flex-col h-full p-8 md:p-10 relative z-10 group/link">
                      <div className="flex-grow space-y-6">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] rounded-full px-3 py-1">
                            {tag}
                          </Badge>
                          <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover/link:bg-blue-600 group-hover/link:border-blue-600 transition-all duration-300 shadow-sm">
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors group-hover/link:-rotate-45" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-4">
                            {service.description || service.desc}
                          </p>
                          {service.keywords && service.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {service.keywords.map((keyword: string, idx: number) => (
                                <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-md transition-colors group-hover/link:bg-blue-50 dark:group-hover/link:bg-blue-900/20 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                          Explore Solution
                        </span>
                        <div className="flex space-x-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-400 transition-colors delay-75"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-500 transition-colors delay-150"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover/link:bg-blue-600 transition-colors delay-300"></span>
                        </div>
                      </div>
                    </Link>
                  </MouseGlowCard>
                );
              })}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                 <Button variant="outline" className="h-12 w-full px-6 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1c] text-slate-700 dark:text-slate-300 font-semibold" asChild>
                    <Link href="/services">View All Solutions</Link>
                 </Button>
            </div>
          </div>
        </section>

        {/* 6. PORTFOLIO CASE STUDIES */}
        <section className="py-16 md:py-20 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0f1c]">
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
                    <Image src={study.image} alt={study.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
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
        <section className="py-16 md:py-20 relative">
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



        {/* 9. FINAL CTA SECTION */}
        <section className="py-20 relative text-center overflow-hidden bg-white dark:bg-[#030712]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

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
