'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
    CheckCircle2, ArrowRight, MapPin, Zap, MousePointerClick, 
    Shield, TrendingUp, Search, Calendar, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function RoofingLandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 selection:bg-blue-500/30">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] mix-blend-screen" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-4"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            Exclusive For US & Canadian Roofing Contractors
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
                        >
                            Double Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Exclusive Leads</span> With a High-Converting Web Engine.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            Stop buying shared leads from Angi or HomeAdvisor. We build premium, SEO-optimized websites and local marketing systems that capture high-intent homeowners directly in your territory.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <Link href="/book-call">
                                <Button className="h-14 px-8 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] transition-all duration-300 w-full sm:w-auto group">
                                    Book Your Free Growth Strategy
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="#system">
                                <Button variant="outline" className="h-14 px-8 text-base font-bold border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 w-full sm:w-auto">
                                    See How We Do It
                                </Button>
                            </Link>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                        >
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Exclusive Leads Only</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Dominate Local Search</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Top 1% Conversion Rates</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* THE PAIN POINT AGITATOR */}
            <section className="py-24 bg-white dark:bg-[#060a13] border-y border-slate-200 dark:border-white/5 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Tired of competing on price with 5 other roofers for the same shared lead?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            When you buy leads from directories, you enter a race to the bottom. Your prospects see you as a commodity. We position you as the premium authority in your city by building <strong className="text-slate-900 dark:text-white">owned marketing assets</strong> that generate exclusive, high-ticket roofing jobs.
                        </p>
                    </div>
                </div>
            </section>

            {/* THE 3-PILLAR SYSTEM */}
            <section id="system" className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">The 3-Pillar Growth System</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">How we turn your website from a digital brochure into a lead-generation machine.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        
                        {/* Pillar 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MapPin className="w-24 h-24 text-blue-600" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center mb-6">
                                <Search className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Local Maps Domination</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Over 60% of homeowners click the Google Maps pack when searching for "roofer near me". We optimize your Google Business Profile and local citations to put you in the top 3.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> GBP Optimization & Audits
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Local Citation Building
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Review Generation Strategies
                                </li>
                            </ul>
                        </motion.div>

                        {/* Pillar 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="w-24 h-24 text-indigo-600" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. High-Velocity Web Engine</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                If your site takes longer than 3 seconds to load, 50% of homeowners will leave. We build lightning-fast React architectures that rank higher and retain visitors.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Next.js / React Architecture
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Sub-2 Second Load Times
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Flawless Mobile Experience
                                </li>
                            </ul>
                        </motion.div>

                        {/* Pillar 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MousePointerClick className="w-24 h-24 text-pink-600" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-600/20 flex items-center justify-center mb-6">
                                <TrendingUp className="w-7 h-7 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Conversion-First Design</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Traffic is useless if it doesn't convert into estimates. We design high-trust user interfaces that guide homeowners seamlessly to a "Request Quote" button.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> Strategic Trust Badges (GAF, BBB)
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> High-Converting Quote Forms
                                </li>
                                <li className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> Before & After Project Galleries
                                </li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8 bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Ready to dominate your territory?
                        </h2>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Book a free 30-minute discovery call with our team. We'll audit your current online presence and map out a bespoke strategy to capture more roofing leads.
                        </p>
                        
                        <div className="pt-6">
                            <Link href="/book-call">
                                <Button className="h-16 px-10 text-lg font-bold bg-white text-blue-600 hover:bg-slate-100 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl group">
                                    <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                                    Schedule Discovery Call
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Industry Solutions & Cross Links */}
            <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 text-center">
                        Explore Related Vertical Solutions & Pricing
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/industries/home-services" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
                            Home Services Marketing Hub →
                        </Link>
                        <Link href="/industries" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
                            All Industry Solutions →
                        </Link>
                        <Link href="/services/web-development" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
                            Custom Web Engineering →
                        </Link>
                        <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
                            Local SEO Retainer Pricing →
                        </Link>
                        <Link href="/free-audit" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
                            Claim Free Local SEO Audit →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
