'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRegion } from '@/components/providers/RegionProvider';
import { 
    ArrowRight, 
    Calendar, 
    ShieldCheck, 
    Zap, 
    Lock, 
    DollarSign,
    Receipt,
    Star,
    Globe,
    Sparkles
} from 'lucide-react';

interface HeroSectionProps {
    services?: any[];
}

export default function HeroSection({ services = [] }: HeroSectionProps) {
    const { isIndia } = useRegion();
    const router = useRouter();
    const [quickDomain, setQuickDomain] = useState('');

    const handleQuickScan = (e: React.FormEvent) => {
        e.preventDefault();
        const clean = quickDomain.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
        if (clean) {
            router.push(`/free-audit?domain=${encodeURIComponent(clean)}`);
        } else {
            router.push('/free-audit');
        }
    };

    return (
        <section className="relative min-h-[75vh] flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#030712] pt-14 pb-16 md:pt-20 md:pb-24">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>
            
            {/* Ambient Dual Orbs (pure radial gradient without heavy Gaussian blur filter) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(79,70,229,0.06),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Social Proof & Rating Badge Strip */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-2xs">
                        <div className="flex items-center text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">5.0 Star Rating</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span>Shipped for 100k+ Users</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">100 Mobile Lighthouse</span>
                    </div>

                    {/* Main Heading */}
                    <h1 
                        id="hero-heading"
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6"
                    >
                        We build custom software, <br className="hidden sm:inline" />
                        web platforms, and AI systems.
                    </h1>

                    {/* Subtitle */}
                    <p 
                        id="hero-summary"
                        className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10"
                    >
                        A senior software engineering studio providing direct systems architecture for founders and ambitious teams. We take your product from architecture to production in weeks—with transparent pricing and 100% code ownership.
                    </p>

                    {/* Dual Action Primary CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <Button 
                            size="lg" 
                            className="h-12 px-8 text-sm md:text-base rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/book-call" prefetch={false}>
                                <Calendar className="w-4 h-4 text-blue-500" />
                                {isIndia ? 'Book Architecture Call (IST)' : 'Book a Strategy Call'}
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-12 px-8 text-sm md:text-base rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/pricing" prefetch={false}>
                                <DollarSign className="w-4 h-4 text-slate-500" />
                                {isIndia ? 'View INR Pricing & Sprints' : 'View Pricing & Sprints'}
                            </Link>
                        </Button>
                    </div>

                    {/* Interactive Instant Diagnostic Bar (Zero Friction Engagement Hook) */}
                    <div className="mt-8 max-w-xl mx-auto p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none text-left">
                        <form onSubmit={handleQuickScan} className="flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={quickDomain}
                                    onChange={(e) => setQuickDomain(e.target.value)}
                                    placeholder="Enter your website URL (e.g. acme.com)"
                                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 gap-1.5 shrink-0 cursor-pointer"
                            >
                                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                                <span>Free 5s Audit</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </form>
                        <div className="mt-2.5 px-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Inspects TTFB, SSL, Security & AI Citation Schema</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-slate-400">Try live:</span>
                                <button
                                    type="button"
                                    onClick={() => router.push('/free-audit?domain=stripe.com')}
                                    className="hover:text-blue-500 underline font-mono text-[10px] cursor-pointer"
                                >
                                    stripe.com
                                </button>
                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                <button
                                    type="button"
                                    onClick={() => router.push('/free-audit?domain=linear.app')}
                                    className="hover:text-blue-500 underline font-mono text-[10px] cursor-pointer"
                                >
                                    linear.app
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Low-Friction Exploration Links */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                        <Link 
                            href="/free-audit" 
                            prefetch={false}
                            className="inline-flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span>Request 48-Hour Video Teardown</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                        </Link>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">•</span>
                        <Link 
                            href="/portfolio" 
                            prefetch={false}
                            className="inline-flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <span>Client Architecture Log</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                        </Link>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">•</span>
                        <Link 
                            href="/tools/agency-pricing-calculator" 
                            prefetch={false}
                            className="inline-flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <span>ROI & Cost Calculator</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                        </Link>
                    </div>



                    {/* Trust & Guarantee Strip */}
                    <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">2–4 Week Delivery</div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-400">Guaranteed MVP sprint</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">100% Code Ownership</div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-400">Full repo & IP transfer</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-400 shrink-0">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">30-Day Bug Warranty</div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-400">Total stability guarantee</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/60 shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/70 flex items-center justify-center text-amber-800 dark:text-amber-400 shrink-0">
                                {isIndia ? <Receipt className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">
                                    {isIndia ? 'GST Tax Invoicing' : 'Fixed Flat Pricing (USD)'}
                                </div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                                    {isIndia ? '100% compliant INR billing' : 'Zero hourly creep'}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
