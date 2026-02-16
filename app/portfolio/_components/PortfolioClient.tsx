'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Monitor, Star, Menu, X, ArrowUpRight, Github, Globe, Layout, Layers, ShieldCheck } from 'lucide-react'
import { PortfolioCard } from './PortfolioCard'
import { Button } from '@/components/ui/button'

interface PortfolioClientProps {
  initialProjects: any[];
}

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
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
    <section ref={containerRef} className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white">

      {/* Custom Cursor Trailing Effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />

      {/* Hero Section - Immersive Parallax */}
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs uppercase tracking-[0.3em] font-black text-slate-400">Award Winning Agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-8"
          >
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient">
              DIGITAL CODES.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            We bridge the gap between imagination and reality with cutting-edge
            technology and visionary design.
          </motion.p>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animation-delay-2000" />

          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
        </motion.div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-[50] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 scale-105'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="container mx-auto px-4 py-24">
        {/* Bento Grid Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                image={project.image_url}
                title={project.title}
                subtitle={project.description}
                category={project.category}
                tags={project.tags}
                stats={project.stats ? Object.entries(project.stats).map(([label, value]) => ({ label, value: String(value) })) : []}
                date={project.year}
                href={project.url}
                author="AJPR WORLD"
                isFeatured={index % 3 === 0} // Make every 3rd project featured/large
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Agency Stats/Values Marquee */}
      <div className="py-24 border-y border-white/5 bg-white/[0.02] overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12">
          {[
            { icon: Layout, text: "UI/UX DESIGN" },
            { icon: Layers, text: "FULL STACK" },
            { icon: Zap, text: "PERFORMANCE" },
            { icon: ShieldCheck, text: "SECURITY" },
            { icon: Globe, text: "SEO READY" },
            { icon: Star, text: "CLIENT FOCUS" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-3xl font-black text-slate-800 italic">
              <item.icon className="w-8 h-8 text-purple-600" />
              <span>{item.text}</span>
              <span className="text-white">/</span>
            </div>
          ))}
          {/* Repeat for infinite effect */}
          {[
            { icon: Layout, text: "UI/UX DESIGN" },
            { icon: Layers, text: "FULL STACK" },
            { icon: Zap, text: "PERFORMANCE" },
            { icon: ShieldCheck, text: "SECURITY" },
            { icon: Globe, text: "SEO READY" },
            { icon: Star, text: "CLIENT FOCUS" }
          ].map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 text-3xl font-black text-slate-800 italic">
              <item.icon className="w-8 h-8 text-purple-600" />
              <span>{item.text}</span>
              <span className="text-white">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action - Immersive */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8">READY TO START <br /> YOUR STORY?</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
              Let's join forces and build a digital legacy together.
              Our team is ready to turn your vision into code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 h-16 px-10 rounded-2xl text-lg font-bold">
                Get a Quote <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 h-16 px-10 rounded-2xl text-lg font-bold">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Glow effect for footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s linear infinite;
        }
      `}</style>
    </section>
  )
}