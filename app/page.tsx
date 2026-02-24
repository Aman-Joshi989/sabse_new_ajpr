'use client'

import { motion } from 'framer-motion'
import { Layout, Cpu, Server, Zap, Layers, Network, Terminal, Cloud, Code2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ProcessJourney from '@/components/ProcessJourney'

const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 selection:bg-blue-500/30 font-sans transition-colors duration-300">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-800/[0.04] bg-[bottom_1px_center] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-900/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto space-y-8">
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Engineering Scalable <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                Digital Systems.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-3xl mx-auto">
              AJPR WORLD designs high-performance web platforms and automation-driven systems while building its next generation of software products.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-105" asChild>
                <Link href="/portfolio">Explore Our Work</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white font-bold transition-all" asChild>
                <Link href="#innovation">See What We're Building</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT WE DO TODAY */}
      <section className="py-24 relative border-y border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">What We Build.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium tracking-wide">Clear. Real. No hype.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Layout, title: 'Scalable Web Platforms', desc: 'Enterprise-grade React and Next.js applications built to handle massive scale without performance degradation.' },
              { icon: Cpu, title: 'Automation & AI Systems', desc: 'Intelligent layers that replace manual workflows, multiplying operational efficiency across departments.' },
              { icon: Server, title: 'Backend Architecture', desc: 'Robust data modeling, secure API development, and distributed systems engineering using PostgreSQL and Node.' },
              { icon: Zap, title: 'Performance Optimization', desc: 'We audit, refactor, and accelerate existing codebases to maximize load speeds and user retention.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
              >
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-500 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENGINEERING PHILOSOPHY */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">Built on <br />Systems Thinking.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">We don't just write code; we architect solutions designed for the long term. Our engineering philosophy is rooted in stability, predictability, and immense scale.</p>

              <ul className="space-y-6">
                {[
                  { icon: Layers, text: 'Modular architecture' },
                  { icon: Network, text: 'Long-term scalability' },
                  { icon: Terminal, text: 'Automation-first mindset' },
                  { icon: Cloud, text: 'Cloud-native deployment' }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-xl text-slate-700 dark:text-slate-300 font-bold tracking-tight"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-5 border border-blue-200 dark:border-blue-800/30">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-2xl group bg-slate-50 dark:bg-slate-900">
                <img
                  src="/images/systems_thinking_illustration.png"
                  alt="Systems Architecture Illustration"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 dark:opacity-80 dark:mix-blend-luminosity mix-blend-normal dark:hover:mix-blend-normal hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 dark:from-[#030712]/60 via-transparent to-white/10 dark:to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProcessJourney />

      {/* 5. FUTURE VISION */}
      <section className="py-24 bg-blue-50/50 dark:bg-blue-950/20 border-y border-blue-200/50 dark:border-blue-900/20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">From Systems to Products.</h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-blue-200/70 font-medium leading-relaxed max-w-3xl mx-auto">
              The expertise we gain by solving complex problems for our service clients actively fuels our transition into product innovation. We are assembling the technical primitives required to launch our own scalable software company.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT WE'RE BUILDING (Innovation) */}
      <section id="innovation" className="py-32 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-10 md:p-16 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/30 dark:border-purple-800/30 mb-6 uppercase tracking-widest text-xs font-bold px-4 py-1">
                Internal Projects
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Innovation in Progress.</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                AJPR WORLD is actively developing internal software products focused on automation, operational efficiency, and scalable digital infrastructure.
              </p>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-12">
                More details coming soon.
              </p>

              <Button size="lg" className="h-14 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-bold transition-all shadow-xl dark:shadow-white/5" asChild>
                <Link href="/contact">Join Early Access List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA / FOOTER PREAMBLE */}
      <section className="py-32 relative text-center pb-40">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Build Today. <br /><span className="text-blue-600 dark:text-blue-500">Scale Tomorrow.</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 bg-transparent dark:text-white font-bold transition-all" asChild>
              <Link href="/contact">Stay Updated</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
