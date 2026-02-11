'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import {
    Cloud, Shield, Zap, Server, Database, Lock,
    CheckCircle, XCircle, ArrowRight, ChevronDown, Check,
    Globe, Cpu, Network
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Competitor Data
const comparisonData = [
    {
        service: 'Google One',
        logo: '/logo/logo_google_one.svg',
        color: 'text-blue-500',
        free: '15 GB',
        plan100: '₹130 / mo',
        plan2TB: '₹650 / mo',
        usp: 'Ecosystem Integration',
        icon: Cloud
    },
    {
        service: 'JioCloud',
        logo: '/logo/logo_jiocloud.svg',
        color: 'text-blue-700',
        free: '100 GB*',
        plan100: 'Bundled*',
        plan2TB: 'N/A',
        usp: 'Bundled with Jio Ecosystem',
        icon: Cloud
    },
    {
        service: 'Zoho WorkDrive',
        logo: '/logo/logo_zoho.svg',
        color: 'text-yellow-600',
        free: '5 GB',
        plan100: '₹170 / user',
        plan2TB: 'Team focused',
        usp: 'Business Collaboration Suite',
        icon: Database
    },
    {
        service: 'AJPR Cloud',
        logo: '/logo/ajpr-logo.png', // Using standard logo as container is white
        color: 'text-blue-600',
        isHighlight: true,
        free: '20 GB',
        plan100: '₹99 / mo',
        plan2TB: '₹549 / mo',
        usp: 'Ad-free, UPI, Fast Speed',
        icon: Shield
    }
]

export default function CloudSolutionsPage() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black opacity-80"></div>
                     {/* Animated CSS Background Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
                    
                    {/* Floating Icons as Abstract Art */}
                    <div className="absolute top-20 right-20 text-blue-500/10 animate-float hidden md:block">
                        <Cloud size={200} />
                    </div>
                    <div className="absolute bottom-20 left-20 text-purple-500/10 animate-float animation-delay-1000 hidden md:block">
                        <Database size={180} />
                    </div>
                    <div className="absolute top-40 left-1/4 text-cyan-500/10 animate-float animation-delay-500 hidden md:block">
                        <Network size={120} />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors px-4 py-1 text-sm">
                        Next-Gen Cloud Storage
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-up leading-tight">
                        Secure. Scalable. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">Sovereign Cloud.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-200">
                        Experience higher speeds with locally hosted servers. 
                        Military-grade encryption meets Indian data sovereignty.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-500/30" asChild>
                            <Link href="/contact">Get Started Free</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full px-8 py-6 text-lg" asChild>
                            <Link href="#comparison">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Price Comparison Section */}
            <section id="comparison" className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cloud Storage Price Comparison</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">India - Feb 2026 Strategy Report</p>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[900px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            {/* Table Header */}
                            <div className="grid grid-cols-6 gap-4 p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <div className="col-span-1">Service</div>
                                <div className="col-span-1">Free Tier</div>
                                <div className="col-span-1">100 GB Plan</div>
                                <div className="col-span-1">2 TB Plan</div>
                                <div className="col-span-2">Main USP / Advantage</div>
                            </div>

                            {/* Table Rows */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {comparisonData.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className={`grid grid-cols-6 gap-4 p-6 items-center transition-colors duration-300 
                                            ${item.isHighlight 
                                                ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-500' 
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="col-span-1 flex items-center space-x-3">
                                            <div className={`relative h-10 w-10 flex-shrink-0 bg-white rounded-full overflow-hidden border border-slate-200 dark:border-slate-700`}>
                                                <Image 
                                                    src={item.logo} 
                                                    alt={`${item.service} Logo`} 
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <span className={`font-bold ${item.isHighlight ? 'text-blue-700 dark:text-blue-400 text-lg' : 'text-slate-700 dark:text-slate-300'}`}>
                                                {item.service}
                                            </span>
                                            {item.isHighlight && <Badge className="bg-blue-500 text-white text-[10px] ml-2">BEST VALUE</Badge>}
                                        </div>
                                        <div className="col-span-1 font-medium text-slate-600 dark:text-slate-400">{item.free}</div>
                                        <div className="col-span-1 font-medium text-slate-600 dark:text-slate-400">{item.plan100}</div>
                                        <div className="col-span-1 font-medium text-slate-600 dark:text-slate-400">{item.plan2TB}</div>
                                        <div className="col-span-2 font-medium text-slate-600 dark:text-slate-400 flex items-center">
                                            {item.isHighlight && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                                            {item.usp}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Features Grid - Minimalist placeholders since image gen failed */}
             <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-lg">
                            <CardHeader>
                                <Shield className="h-10 w-10 text-blue-500 mb-4" />
                                <CardTitle className="text-xl">Military-Grade Security</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 dark:text-slate-400">
                                Your data is encrypted with AES-256 protocols, ensuring complete privacy and sovereign protection.
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-lg">
                            <CardHeader>
                                <Zap className="h-10 w-10 text-yellow-500 mb-4" />
                                <CardTitle className="text-xl">Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 dark:text-slate-400">
                                Local servers ensure low latency and high-speed data transfer for seamless collaboration.
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-lg">
                            <CardHeader>
                                <Database className="h-10 w-10 text-purple-500 mb-4" />
                                <CardTitle className="text-xl">Scalable Storage</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 dark:text-slate-400">
                                Start small and scale indefinitely. Our infrastructure grows with your business needs.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

        </div>
    )
}
