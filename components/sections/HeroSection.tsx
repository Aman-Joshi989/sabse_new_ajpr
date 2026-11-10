'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
    ArrowRight, 
    Calendar, 
    ShieldCheck, 
    Zap, 
    Lock, 
    DollarSign 
} from 'lucide-react';

interface HeroSectionProps {
    services?: any[];
}

export default function HeroSection({ services = [] }: HeroSectionProps) {
    return (
        <section className="relative min-h-[75vh] flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#030712] pt-14 pb-16 md:pt-20 md:pb-24">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>
            
            {/* Ambient Dual Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Studio Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/70 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-6 shadow-xs animate-fade-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span>Senior Software Engineering & AI Studio</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
                        We build custom software, <br className="hidden sm:inline" />
                        web platforms, and AI systems.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10 animate-fade-up">
                        Direct engineering for founders and ambitious teams. We take your product from architecture to production in weeks—with transparent pricing and 100% code ownership.
                    </p>

                    {/* Dual Action Primary CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-up">
                        <Button 
                            size="lg" 
                            className="h-12 px-8 text-sm md:text-base rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/book-call">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                Book a Strategy Call
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-12 px-8 text-sm md:text-base rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/pricing">
                                <DollarSign className="w-4 h-4 text-slate-500" />
                                View Pricing & Sprints
                            </Link>
                        </Button>
                    </div>

                    {/* Trust & Guarantee Strip */}
                    <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 flex items-center justify-center text-blue-600 shrink-0">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">2–4 Week Delivery</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Guaranteed MVP sprint</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 shrink-0">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">100% Code Ownership</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Full repo & IP transfer</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-600 shrink-0">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">30-Day Bug Warranty</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Total stability guarantee</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/70 flex items-center justify-center text-amber-600 shrink-0">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">Fixed Flat Pricing</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Zero hourly creep</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
