'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Shield, Zap, Star } from 'lucide-react'

// ─── REPLACE THIS WITH YOUR CALENDLY URL ───────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/ajprworld/strategy-call'
// ──────────────────────────────────────────────────────────────────────────

const fadeInUp: any = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const benefits = [
    { icon: Zap, label: 'Free 30-Min Call', desc: 'No pitch, no pressure — just clarity on your biggest challenge.' },
    { icon: Shield, label: 'No Commitment', desc: "We'll tell you honestly if we're the right fit. No hard sell." },
    { icon: Clock, label: 'Instant Confirmation', desc: 'Pick a time and get a calendar invite within seconds.' },
    { icon: Star, label: 'Expert Consultation', desc: "Talk directly with AJPR World's founders, not a sales rep." },
]

const agenda = [
    { num: '01', title: 'Your Current State', desc: 'Where you are today — tech stack, team, growth blockers.' },
    { num: '02', title: 'Your Goal', desc: 'Where you want to be in 90 days and what success looks like.' },
    { num: '03', title: 'Our Recommendation', desc: "We'll outline the exact systems and approach we'd recommend." },
    { num: '04', title: 'Next Steps', desc: "If there's a fit, we'll map out a clear scope and timeline." },
]

export default function BookCallPage() {
    const [calendlyLoaded, setCalendlyLoaded] = useState(false)

    useEffect(() => {
        const link = document.createElement('link')
        link.href = 'https://assets.calendly.com/assets/external/widget.css'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.onload = () => setCalendlyLoaded(true)
        document.head.appendChild(script)

        return () => {
            try { document.head.removeChild(link) } catch {}
            try { document.head.removeChild(script) } catch {}
        }
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-300 font-sans">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

                <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Free Strategy Call — Limited Slots
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05] mb-6">
                        Book Your Free<br />
                        <span className="text-blue-600 dark:text-blue-400">30-Min Strategy Call</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Walk away with a clear growth roadmap — no fluff, no hard sell. Just an honest conversation about your business and how to scale it.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {benefits.map((b, i) => (
                        <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                                <b.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{b.label}</p>
                            <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:w-7/12 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0a0f1e] min-h-[700px]"
                    >
                        {calendlyLoaded ? (
                            <div
                                className="calendly-inline-widget"
                                data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=2563eb`}
                                style={{ minWidth: '320px', height: '700px' }}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[700px] gap-4">
                                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-slate-500 dark:text-slate-500 text-sm">Loading calendar...</p>
                            </div>
                        )}
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:w-5/12 w-full space-y-8">
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">What We Cover in 30 Minutes</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Every call is structured to give you maximum clarity in minimum time.</p>
                        </motion.div>

                        <div className="space-y-4">
                            {agenda.map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} className="flex gap-4 p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 text-sm">
                                        {item.num}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.title}</p>
                                        <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={fadeInUp} className="p-6 rounded-xl bg-blue-600/5 dark:bg-blue-500/5 border border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Trusted by Founders Across India</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                        From pre-revenue startups to businesses doing ₹1Cr+ — we have helped founders across tech, ecommerce, SaaS, and services scale with custom systems.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center pt-2">
                            <p className="text-slate-500 dark:text-slate-500 text-sm">
                                Prefer email?{' '}
                                <a href="mailto:aman@ajprworld.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                    aman@ajprworld.com
                                </a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
