import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Terminal, Calendar, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react'
import AnimatedServiceText from './AnimatedServiceText'

const defaultServices = [
    "Web Applications",
    "AI Agents & MVPs",
    "SaaS Platforms",
    "Growth Systems",
    "Cloud Architecture",
    "API Infrastructure"
]

interface HeroSectionProps {
    services?: any[]
}

export default function HeroSection({ services = [] }: HeroSectionProps) {
    const displayServices = services && services.length > 0 
        ? services.map(s => s.title) 
        : defaultServices;

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

                    {/* Dual Frictionless CTAs */}
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
                            className="h-12 px-8 text-sm md:text-base rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold transition-all w-full sm:w-auto gap-2"
                            asChild
                        >
                            <Link href="/pricing">
                                <DollarSign className="w-4 h-4 text-slate-500" />
                                View Pricing & Sprints
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Free Tech Audit Bonus */}
                    <p className="mt-3.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        ✨ Complimentary Architecture & Technical SEO Audit included ($1,500 value)
                    </p>

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
    )
}
