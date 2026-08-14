import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'
import AnimatedServiceText from './AnimatedServiceText'

const defaultServices = [
    "Web Development",
    "Mobile Apps",
    "Digital Solutions",
    "UI/UX Design",
    "Cloud Solutions",
    "Custom Software",
    "SaaS Architecture",
    "AI Integration"
]

interface HeroSectionProps {
    services?: any[]
}

export default function HeroSection({ services = [] }: HeroSectionProps) {
    const displayServices = services && services.length > 0 
        ? services.map(s => s.title) 
        : defaultServices;

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#030712] pt-20 pb-20">
            {/* Subtle Vercel-style Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
            
            {/* Soft Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-sm font-medium text-slate-800 dark:text-slate-300 mb-8 animate-fade-up">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                        Architecting the future of digital products
                    </div>

                    {/* Main Heading (SEO Preserved) */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8 animate-fade-up [animation-delay:200ms]">
                        Engineering Scalable <br className="hidden md:block" />
                        <div className="relative flex justify-center w-full max-w-[800px] mx-auto mt-2 overflow-hidden align-bottom min-h-[1.5em] md:min-h-[1.3em]">
                            <AnimatedServiceText services={displayServices} />
                        </div>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-10 animate-fade-up [animation-delay:400ms]">
                        We build high-performance web platforms, custom software, and AI-first product infrastructure for companies that demand excellence.
                    </p>

                    {/* Clean CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:600ms]">
                        <Button 
                            size="lg" 
                            className="h-12 px-8 text-base rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold transition-all w-full sm:w-auto"
                            asChild
                        >
                            <Link href="/book-call">
                                Book Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-12 px-8 text-base rounded-md border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold transition-all w-full sm:w-auto"
                            asChild
                        >
                            <Link href="/portfolio">
                                <Terminal className="mr-2 w-4 h-4 text-slate-500" />
                                View Architecture
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
            
            {/* Custom Keyframes for the text slide animation */}
            <style jsx global>{`
                @keyframes slideUpFade {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    )
}
