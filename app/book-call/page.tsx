'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Shield, Zap, Star, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react'

// ─── REPLACE THIS WITH YOUR CALENDLY URL ───────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/ajprworld/strategy-call'
// ──────────────────────────────────────────────────────────────────────────

const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const benefits = [
    { icon: Zap, label: 'Free 30-Min Call', desc: 'No sales pitch or pressure — just pure strategy on how to hit your technical and growth milestones.' },
    { icon: Shield, label: 'No Commitment', desc: "We'll let you know honestly if we aren't the right fit. No persistent follow-ups or spam." },
    { icon: Clock, label: 'Instant Booking', desc: 'Secure your slot instantly in our calendar and receive direct email and calendar invites.' },
    { icon: Star, label: 'Direct Consulting', desc: 'Talk directly with AJPR World founders who actively engineer MVPs and run SEO setups.' },
]

const agenda = [
    { num: '01', title: 'Technical Assessment', desc: 'Analyze your current tech stack, system architecture, database performance, or marketing bottlenecks.' },
    { num: '02', title: 'Target Objectives', desc: 'Define what success looks like for your product development, branding, or traffic growth in the next 90 days.' },
    { num: '03', title: 'Actionable Solutions', desc: 'Map out concrete architectures, automation pipelines, or GEO strategies recommended for your business.' },
    { num: '04', title: 'Scope & Collaboration', desc: 'If there is a mutual fit, we outline a detailed, low-friction path to get your project moving.' },
]

export default function BookCallPage() {
    const [calendlyLoaded, setCalendlyLoaded] = useState(false)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Detect initial theme preference
        const checkTheme = () => {
            const dark = document.documentElement.classList.contains('dark')
            setIsDark(dark)
        }
        checkTheme()

        // Listen for theme changes dynamically
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        // Inject Calendly CSS
        const link = document.createElement('link')
        link.href = 'https://assets.calendly.com/assets/external/widget.css'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        // Inject Calendly JS
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.onload = () => setCalendlyLoaded(true)
        document.head.appendChild(script)

        return () => {
            observer.disconnect()
            try { document.head.removeChild(link) } catch {}
            try { document.head.removeChild(script) } catch {}
        }
    }, [])

    const getCalendlyUrl = () => {
        const baseUrl = CALENDLY_URL
        const params = new URLSearchParams({
            hide_gdpr_banner: '1',
            hide_landing_page_details: '1',
        })
        
        if (isDark) {
            params.append('background_color', '030712')
            params.append('text_color', 'f3f4f6')
            params.append('primary_color', '3b82f6')
        } else {
            params.append('background_color', 'ffffff')
            params.append('text_color', '1f2937')
            params.append('primary_color', '2563eb')
        }
        
        return `${baseUrl}?${params.toString()}`
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 transition-colors duration-500 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] mix-blend-screen" />
            </div>

            {/* Subtle Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_100%)] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                
                {/* Hero Header */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold">
                        <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
                        Ready to Build, Scale, & Dominate search?
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                        Schedule Your Free<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:to-indigo-400">Strategy Session</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        Speak directly with our technical founders. We will map out a custom system architecture, automation flow, or search strategy tailored to your growth goals.
                    </motion.p>
                </motion.div>

                {/* Benefits Section */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {benefits.map((b, i) => (
                        <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 backdrop-blur-md shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 flex items-center justify-center mb-4">
                                <b.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">{b.label}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Interactive Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left: Agenda & Trust */}
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-5 w-full space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <motion.div variants={fadeInUp}>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our 30-Minute Agenda</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mt-2">Zero fluff. Every strategy session is optimized to give you quick, actionable value.</p>
                            </motion.div>

                            <div className="space-y-4">
                                {agenda.map((item, i) => (
                                    <motion.div key={i} variants={fadeInUp} className="flex gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm">
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 text-sm">
                                            {item.num}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{item.title}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Founder profile / Trust block */}
                        <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-500/5 dark:to-indigo-500/5 border border-blue-500/20 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
                            <div className="flex gap-4 items-start relative z-10">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border overflow-hidden flex items-center justify-center font-black text-blue-600 text-lg">
                                    AJ
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">Direct & Personalized Strategy</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                                        We don't hand you off to salesmen. Your call is scheduled directly with AJPR World’s leadership and core engineering team so you can talk architecture and scaling without filters.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Message CTA */}
                        <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">Have a quick question?</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Reach out via mail for rapid support.</p>
                                </div>
                            </div>
                            <a href="mailto:aman@ajprworld.com" className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white">
                                <ArrowUpRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Embedded Calendar Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-7 w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-2xl dark:shadow-indigo-500/5 bg-white dark:bg-[#030712] order-1 lg:order-2 self-stretch flex flex-col min-h-[750px] relative z-10"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500" />
                        
                        {calendlyLoaded ? (
                            <iframe
                                src={getCalendlyUrl()}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                className="w-full flex-grow min-h-[746px] rounded-b-2xl"
                                title="Select a Date & Time - Calendly"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center flex-grow h-[746px] gap-4">
                                <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Securing scheduler access...</p>
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
