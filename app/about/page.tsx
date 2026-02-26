'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    ArrowRight,
    Search,
    Brain,
    Rocket,
    BarChart3,
    Code2,
    Database,
    LineChart,
    Settings,
    Store,
    Users,
    UserCircle,
    Building2,
    CheckCircle2
} from 'lucide-react'

// Features Data
const features = [
    {
        icon: Rocket,
        title: 'Speed with Structure',
        description: 'Rapid deployment without compromising on scalable architecture and clean code.'
    },
    {
        icon: Brain,
        title: 'AI-First Thinking',
        description: 'Integrating intelligent automation and LLMs to multiply your operational efficiency.'
    },
    {
        icon: Database,
        title: 'Deep Technical Expertise',
        description: 'Enterprise-grade backend architectures and dynamic, high-performance web applications.'
    },
    {
        icon: LineChart,
        title: 'Growth-Focused Execution',
        description: 'Every line of code and system built is optimized for conversions and measurable ROI.'
    }
]

// Target Audience Data
const targetAudience = [
    {
        icon: Rocket,
        title: 'Startups',
        painPoint: 'Need to build an MVP quickly but require scalable architecture for future funding rounds.',
        solution: 'We build rapid, scalable foundations that grow as fast as your user base.'
    },
    {
        icon: Store,
        title: 'Ecommerce Brands',
        painPoint: 'Struggling with slow load times, poor conversion rates, and messy inventory systems.',
        solution: 'We optimize performance and integrate seamless backend solutions for higher ROI.'
    },
    {
        icon: Building2,
        title: 'Agencies',
        painPoint: 'Lacking deep technical expertise in-house to fulfill complex client demands.',
        solution: 'We act as your dedicated tech partner, providing enterprise-grade execution.'
    },
    {
        icon: Users,
        title: 'SMEs',
        painPoint: 'Burdened by manual processes and outdated digital infrastructures limiting growth.',
        solution: 'We automate operations and modernize your tech stack to maximize efficiency.'
    },
    {
        icon: UserCircle,
        title: 'Personal Brands',
        painPoint: 'Need a premium digital presence that actually converts audience into revenue.',
        solution: 'We design high-converting platforms tailored to your unique authority.'
    }
]

// Services Summary Data
const capabilities = [
    { icon: Code2, label: 'Custom Web Apps' },
    { icon: Brain, label: 'AI & Automation' },
    { icon: Database, label: 'Backend Architecture' },
    { icon: Search, label: 'Conversion Optimization' },
    { icon: Settings, label: 'Growth Infrastructure' }
]

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring" as const, stiffness: 100 }
    }
}

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 font-sans">
            <div className="w-[80%] mx-auto min-h-screen">

                {/* 1. HERO SECTION */}
                <section className="relative pt-40 pb-32 overflow-hidden flex items-center min-h-[90vh]">
                    {/* Dark Modern Grid & Glow Background */}
                    <div className="absolute inset-0 bg-grid-slate-900/[0.03] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-5xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-blue-900/50 bg-blue-100 dark:bg-blue-900/20 backdrop-blur-md mb-8"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Technology & Growth Partner</span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
                                Building Systems That <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                                    Scale Businesses.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                                We design, develop, and automate powerful digital infrastructures that help modern businesses grow faster, operate smarter, and convert better.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105" asChild>
                                    <Link href="/contact">Work With Us</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all text-slate-900 dark:text-white" asChild>
                                    <Link href="/portfolio">See Our Work <ArrowRight className="ml-2 w-4 h-4 text-slate-900 dark:text-white" /></Link>
                                </Button>
                            </div>

                            {/* Capabilities Strip */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800/50"
                            >
                                <p className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold mb-6">Execution Expertise</p>
                                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                    {capabilities.map((item, idx) => (
                                        <div key={idx} className="flex items-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                                            <item.icon className="w-4 h-4 mr-2 text-blue-500" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. OUR STORY (Visionary Focus) */}
                <section className="py-24 relative z-20 bg-slate-100/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">Systematic Growth. <br />Zero Inefficiencies.</h2>
                            <div className="space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                <p>
                                    <strong className="text-slate-900 dark:text-white">AJPR WORLD</strong> was founded with a singular vision: to eliminate operational chaos in modern businesses by building powerful, automated digital systems.
                                </p>
                                <p>
                                    We don't believe in vanity metrics or generic templates. Driven by an execution-first mindset, we engineer custom solutions that bridge the gap between complex technology and tangible business ROI.
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 font-bold">
                                    We are your long-term execution machine.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. WHAT MAKES US DIFFERENT */}
                <section className="py-32 relative">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">The Execution Blueprint.</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">Why ambitious brands choose us as their growth infrastructure partner.</p>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {features.map((feature, i) => (
                                <motion.div key={i} variants={itemVariants}>
                                    <Card className="h-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors duration-300">
                                        <CardContent className="p-8">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                                                <feature.icon className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {feature.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 4. MISSION & VISION */}
                <section className="py-24 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-[#030712] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="p-10 rounded-3xl bg-white/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-4">Our Mission</h3>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                    To build scalable digital infrastructures that empower businesses to grow without operational chaos.
                                </p>
                            </div>
                            <div className="p-10 rounded-3xl bg-white/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-500 uppercase mb-4">Our Vision</h3>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                    To become a global technology growth partner for ambitious, forward-thinking brands.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. WHO WE HELP */}
                <section className="py-32 relative">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">Who We Empower.</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">Transforming challenges into automated growth engines.</p>
                        </div>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {targetAudience.map((audience, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:border-blue-300 dark:group-hover:border-blue-500/30 transition-all">
                                            <audience.icon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{audience.title}</h3>
                                            <div className="space-y-1">
                                                <p className="text-slate-600 dark:text-slate-500 text-sm font-medium"><span className="text-rose-600 dark:text-rose-400/80">Pain:</span> {audience.painPoint}</p>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium"><span className="text-emerald-600 dark:text-emerald-400/80">Solution:</span> {audience.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. FOUNDER SPOTLIGHT REMOVED */}

                {/* 7. CTA SECTION */}
                <section className="py-32 px-4 container mx-auto">
                    <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Ready to Scale the Smart Way?</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed">Stop letting technical limitations dictate your growth speed. Let's build a digital infrastructure that accelerates your business.</p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button size="lg" className="rounded-full h-14 px-10 bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 hover:scale-105 transition-all shadow-xl font-bold text-lg" asChild>
                                    <Link href="/contact">Book a Strategy Call</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white bg-transparent transition-all" asChild>
                                    <Link href="/services">Start Your Project</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
