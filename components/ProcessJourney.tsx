'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Map, Code2, ShieldAlert, Rocket } from 'lucide-react'

const steps = [
    {
        id: 'idea',
        icon: Lightbulb,
        title: "1. The Big Idea",
        shortDesc: "Understanding the dream.",
        detail: "Imagine drawing a picture of your dream treehouse. First, we sit down with you, listen closely, and figure out exactly what your app should look like and what super cool features it needs."
    },
    {
        id: 'blueprint',
        icon: Map,
        title: "2. The Blueprint",
        shortDesc: "Drawing the map.",
        detail: "Before bringing in the wood and nails, we draw a very clear map. We plan out where every button goes and how everything connects so that nothing gets confusing later on."
    },
    {
        id: 'build',
        icon: Code2,
        title: "3. Building Blocks",
        shortDesc: "Snapping the pieces together.",
        detail: "This is where we put on our hard hats! Our engineers start snapping together the different pieces of code, exactly like building a giant, complex Lego set."
    },
    {
        id: 'test',
        icon: ShieldAlert,
        title: "4. Trying to Break It",
        shortDesc: "Testing if it's super strong.",
        detail: "Before anyone else plays in the treehouse, we jump on the floors to make sure they won't break. We hunt down secret errors (we call them bugs) and fix them so the app is perfectly safe."
    },
    {
        id: 'launch',
        icon: Rocket,
        title: "5. Blast Off!",
        shortDesc: "Giving it to the world.",
        detail: "The shiny new app is ready! We push the massive GO button and put it on the internet for everyone to safely use, enjoy, and help your business grow."
    }
]

export default function ProcessJourney() {
    const [hoveredStep, setHoveredStep] = useState<string | null>(null)

    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-[#030712] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">How We Build.</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                        Our engineering process explained so simply, even a kid could understand it. Hover over our journey below to see how we bring ideas to life.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 relative">

                    {/* Left Side: The Vertical Line Journey */}
                    <div className="lg:w-1/2 relative">
                        {/* The actual vertical line */}
                        <div className="absolute left-8 lg:left-12 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />

                        <div className="space-y-4">
                            {steps.map((step, index) => {
                                const isHovered = hoveredStep === step.id
                                return (
                                    <div
                                        key={step.id}
                                        className="relative flex items-center pl-24 pr-4 py-6 cursor-pointer group"
                                        onMouseEnter={() => setHoveredStep(step.id)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        {/* Glowing Node on the line */}
                                        <div className={`absolute left-6 lg:left-10 w-5 h-5 rounded-full border-4 transition-all duration-300 z-10 
                      ${isHovered
                                                ? 'bg-blue-500 border-blue-200 dark:border-blue-900 scale-150 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                                                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}
                                        />

                                        {/* Step Title Area */}
                                        <div className="flex-1 transition-transform duration-300 group-hover:translate-x-2">
                                            <h3 className={`text-2xl font-black tracking-tight transition-colors duration-300 
                         ${isHovered ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                                {step.title}
                                            </h3>
                                            {/* Description on Mobile (visible only on small screens or when hovered) */}
                                            <div className="lg:hidden mt-2">
                                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">{step.shortDesc}</p>
                                                <AnimatePresence>
                                                    {isHovered && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-4 mt-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                                                {step.detail}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Side: The Explainer Card (Desktop Only) */}
                    <div className="hidden lg:flex lg:w-1/2 items-center justify-center sticky top-32 h-[500px]">
                        <AnimatePresence mode="wait">
                            {hoveredStep ? (
                                <motion.div
                                    key={hoveredStep}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    {steps.map((step) => {
                                        if (step.id !== hoveredStep) return null
                                        const Icon = step.icon
                                        return (
                                            <div key={step.id} className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden group">

                                                {/* Background Decoration */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />

                                                <div className="relative z-10 flex flex-col h-full justify-center space-y-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800/50 shadow-inner">
                                                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h4>
                                                        <p className="text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase text-sm mb-6">{step.shortDesc}</p>
                                                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                            {step.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]"
                                >
                                    <p className="text-slate-400 dark:text-slate-500 font-medium text-lg flex flex-col items-center">
                                        <Lightbulb className="w-8 h-8 opacity-50 mb-4" />
                                        Hover over a step to see how it works.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}
