'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    ArrowRight, Zap, Lightbulb, Target, Globe, Play,
    Code2, Scale, Calculator, Smartphone, Briefcase, Star,
    Sparkles, Rocket, TrendingUp, Users, Award
} from 'lucide-react'

const allServices = [
    "Web Development",
    "GST Returns",
    "Mobile Apps",
    "Legal Documentation",
    "Digital Solutions",
    "Company Registration",
    "UI/UX Design",
    "Tax Compliance",
    "Cloud Solutions",
    "Court Cases"
]

const floatingElements = [
    { icon: Code2, position: { top: '10%', left: '10%' }, delay: 0 },
    { icon: Scale, position: { top: '20%', right: '15%' }, delay: 1 },
    { icon: Calculator, position: { top: '60%', left: '8%' }, delay: 2 },
    { icon: Smartphone, position: { top: '70%', right: '10%' }, delay: 0.5 },
    { icon: Briefcase, position: { top: '40%', left: '5%' }, delay: 1.5 },
    { icon: Globe, position: { top: '15%', right: '8%' }, delay: 2.5 }
]

export default function HeroSection() {
    const [currentService, setCurrentService] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const heroRef = useRef<HTMLElement>(null)

    useEffect(() => {
        setIsVisible(true)
        const interval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % allServices.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 flex items-center"
        >
            {/* Animated Particle Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Gradient Orbs */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-3xl animate-float animation-delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float animation-delay-600"></div>

                {/* Floating Particles */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating Service Icons */}
            <div className="absolute inset-0">
                {floatingElements.map((element, index) => {
                    const IconComponent = element.icon
                    return (
                        <div
                            key={index}
                            className="absolute opacity-10 hover:opacity-30 transition-opacity duration-500"
                            style={{
                                ...element.position,
                                transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`,
                                animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${element.delay}s`
                            }}
                        >
                            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
                                <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`max-w-6xl mx-auto text-center transition-all duration-1500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    {/* Startup Badge with Glow Effect */}
                    <div className="mb-8">
                        <Badge className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-8 py-3 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 shimmer-effect hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
                            <div className="relative flex items-center">
                                <Lightbulb className="w-6 h-6 mr-3 animate-bounce-gentle" />
                                Multi-Service Startup • We Do It All
                                <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
                            </div>
                        </Badge>
                    </div>

                    {/* Main Heading with Typewriter Effect */}
                    <div className="space-y-6 mb-12">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                            <span className="block text-slate-900 dark:text-white mb-4 animate-fade-down">
                                Your One-Stop Solution for
                            </span>
                            <div className="relative h-24 md:h-32 overflow-hidden">
                                <span
                                    key={currentService}
                                    className="absolute inset-0 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-scale-in font-black"
                                    style={{
                                        backgroundSize: '200% 200%',
                                        animation: 'gradientShift 3s ease-in-out infinite, scaleIn 0.5s ease-out'
                                    }}
                                >
                                    {allServices[currentService]}
                                </span>
                            </div>
                        </h1>
                    </div>

                    {/* Enhanced Subtitle */}
                    <div className={`space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-400' : 'opacity-0'}`}>
                        <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed font-medium">
                            From cutting-edge <span className="font-bold text-blue-600 hover:scale-105 transition-transform duration-300 inline-block cursor-pointer">web development</span> to comprehensive
                            <span className="font-bold text-purple-600 hover:scale-105 transition-transform duration-300 inline-block cursor-pointer"> legal & financial services</span>,
                            we're the versatile startup that grows with your business needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-lg">
                            {['🚀 Tech Solutions', '⚖️ Legal Services', '💼 Business Support', '📊 Financial Management'].map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
                        <Button
                            size="lg"
                            className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
                            asChild
                        >
                            <Link href="#all-services">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <Target className="mr-3 h-6 w-6 group-hover:animate-bounce-gentle" />
                                Explore All Services
                                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="group px-12 py-6 text-xl rounded-full border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                            asChild
                        >
                            <Link href="#contact">
                                <Play className="mr-3 h-6 w-6 group-hover:animate-bounce-gentle text-blue-600" />
                                Watch Our Story
                            </Link>
                        </Button>
                    </div>

                    {/* Interactive Service Categories */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                        {[
                            { icon: Code2, label: 'Tech Solutions', count: '15+ Services', color: 'from-blue-500 to-cyan-500', hoverColor: 'hover:from-blue-600 hover:to-cyan-600' },
                            { icon: Scale, label: 'Legal Services', count: '20+ Services', color: 'from-purple-500 to-pink-500', hoverColor: 'hover:from-purple-600 hover:to-pink-600' },
                            { icon: Calculator, label: 'Financial & Tax', count: '18+ Services', color: 'from-green-500 to-emerald-500', hoverColor: 'hover:from-green-600 hover:to-emerald-600' },
                            { icon: Globe, label: 'Business Support', count: '25+ Services', color: 'from-orange-500 to-red-500', hoverColor: 'hover:from-orange-600 hover:to-red-600' }
                        ].map((category, index) => {
                            const IconComponent = category.icon
                            return (
                                <div
                                    key={index}
                                    className={`group cursor-pointer p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-white/50 dark:border-slate-700/50`}
                                    style={{ animationDelay: `${1 + (index * 0.1)}s` }}
                                >
                                    <div className={`mx-auto w-fit p-4 mb-6 rounded-2xl bg-gradient-to-r ${category.color} ${category.hoverColor} text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        <IconComponent className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {category.label}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                        {category.count}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Trust Indicators */}
                    <div className={`mt-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-1000' : 'opacity-0'}`}>
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 dark:text-slate-400">
                            <div className="flex items-center group cursor-pointer">
                                <Award className="w-6 h-6 mr-3 text-yellow-500 group-hover:animate-bounce-gentle" />
                                <span className="text-lg font-medium group-hover:text-blue-600 transition-colors duration-300">100% Success Rate</span>
                            </div>
                            <div className="w-1 h-6 bg-slate-300 dark:bg-slate-700"></div>
                            <div className="flex items-center group cursor-pointer">
                                <Users className="w-6 h-6 mr-3 text-blue-500 group-hover:animate-bounce-gentle" />
                                <span className="text-lg font-medium group-hover:text-purple-600 transition-colors duration-300">5  0+ Happy Clients</span>
                            </div>
                            <div className="w-1 h-6 bg-slate-300 dark:bg-slate-700"></div>
                            <div className="flex items-center group cursor-pointer">
                                <TrendingUp className="w-6 h-6 mr-3 text-green-500 group-hover:animate-bounce-gentle" />
                                <span className="text-lg font-medium group-hover:text-green-600 transition-colors duration-300">3+ Years Excellence</span>
                            </div>
                            <div className="w-1 h-6 bg-slate-300 dark:bg-slate-700"></div>
                            <div className="flex items-center group cursor-pointer">
                                <Star className="w-6 h-6 mr-3 text-purple-500 group-hover:animate-bounce-gentle" />
                                <span className="text-lg font-medium group-hover:text-purple-600 transition-colors duration-300">70+ Services</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce-gentle cursor-pointer group" onClick={() => document.getElementById('all-services')?.scrollIntoView({ behavior: 'smooth' })}>
                    <div className="w-8 h-12 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center group-hover:border-blue-500 transition-colors duration-300">
                        <div className="w-2 h-4 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse group-hover:bg-blue-500 transition-colors duration-300"></div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 group-hover:text-blue-500 transition-colors duration-300">Scroll to explore</p>
                </div>
            </div>
        </section>
    )
}
