'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
    ArrowRight, 
    Calendar, 
    ShieldCheck, 
    Zap, 
    Lock, 
    DollarSign, 
    Globe, 
    Sparkles, 
    Calculator,
    GitMerge
} from 'lucide-react';
import AnimatedServiceText from './AnimatedServiceText';

const defaultServices = [
    "Web Applications",
    "AI Agents & MVPs",
    "SaaS Platforms",
    "Growth Systems",
    "Cloud Architecture",
    "API Infrastructure"
];

interface HeroSectionProps {
    services?: any[];
}

export default function HeroSection({ services = [] }: HeroSectionProps) {
    const router = useRouter();
    const [domain, setDomain] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const displayServices = services && services.length > 0 
        ? services.map(s => s.title) 
        : defaultServices;

    const handleQuickScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain.trim()) {
            router.push('/free-audit');
            return;
        }
        setIsSubmitting(true);
        const cleanDomain = domain.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
        router.push(`/free-audit?domain=${encodeURIComponent(cleanDomain)}`);
    };

    return (
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#030712] pt-12 pb-16 md:pt-16 md:pb-24">
            {/* Subtle Vercel-style Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>
            
            {/* Soft Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/10 dark:bg-blue-500/15 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Live Availability Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-300 mb-6 shadow-xs animate-fade-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Now Booking Q3/Q4 Sprints &bull; 2–4 Week Delivery &bull; Senior Engineers Only</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
                        We Engineer Scalable <br />
                        <span className="relative inline-flex justify-center w-full max-w-[800px] mx-auto mt-1 overflow-hidden align-bottom min-h-[1.4em]">
                            <AnimatedServiceText services={displayServices} />
                        </span>
                    </h1>

                    {/* Subtitle - Eliminates customer confusion immediately */}
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal mb-8 animate-fade-up">
                        Direct senior engineering for ambitious companies. We assume 100% responsibility for your system architecture, delivery timeline, and code ownership. No junior hand-offs, no retainer traps—just production-grade Next.js & AI software shipped in 14 to 30 days.
                    </p>

                    {/* Interactive Instant Domain Diagnostic Scanner (Hero Conversion Hook) */}
                    <div className="mb-8 max-w-xl mx-auto w-full animate-fade-up">
                        <form 
                            onSubmit={handleQuickScan} 
                            className="relative flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 shadow-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
                        >
                            <div className="flex items-center gap-2.5 px-3 w-full sm:w-auto flex-1">
                                <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder="Enter your website or app domain (e.g. acme.com)"
                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none py-2 font-medium"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                size="sm" 
                                disabled={isSubmitting}
                                className="w-full sm:w-auto h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 shrink-0 shadow-md cursor-pointer transition-transform active:scale-95"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {isSubmitting ? 'Scanning...' : 'Scan Stack Free'}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </form>

                        {/* Fast Low-Friction Interactive Jumpers (Cuts Bounce Rate) */}
                        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
                            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold uppercase tracking-wider mr-1">
                                Popular Tools:
                            </span>
                            <Link 
                                href="/pricing/website-cost" 
                                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5 font-medium shadow-2xs"
                            >
                                <Calculator className="w-3 h-3 text-blue-500" />
                                Website Cost (2026)
                            </Link>
                            <Link 
                                href="/tools/saas-bloat-audit" 
                                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5 font-medium shadow-2xs"
                            >
                                <Zap className="w-3 h-3 text-amber-500" />
                                SaaS Bloat Audit
                            </Link>
                            <Link 
                                href="/compare" 
                                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5 font-medium shadow-2xs"
                            >
                                <GitMerge className="w-3 h-3 text-emerald-500" />
                                Agency Matchmaker
                            </Link>
                        </div>
                    </div>

                    {/* Dual Action Primary CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-up">
                        <Button 
                            size="lg" 
                            className="h-12 px-8 text-sm md:text-base rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/book-call">
                                <Calendar className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                                Book Free Strategy Call
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
                                <DollarSign className="w-4 h-4 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white" />
                                View Pricing & Sprints
                            </Link>
                        </Button>
                    </div>

                    {/* Trust & Guarantee Strip */}
                    <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 shrink-0">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">2–4 Week Delivery</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Guaranteed MVP sprint</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">100% IP Ownership</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Full repo & code transfer</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 shrink-0">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">30-Day Bug Warranty</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Total stability guarantee</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 shrink-0">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">Flat Pricing</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Zero hidden change orders</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Custom Keyframes */}
            <style jsx global>{`
                @keyframes slideUpFade {
                    0% { opacity: 0; transform: translateY(16px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
