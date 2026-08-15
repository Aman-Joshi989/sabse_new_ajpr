import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Package } from 'lucide-react'
import { ServiceIconMap } from '@/components/ui/ServiceIcons'
import React from 'react'
import { getPublishedServices } from '@/lib/db/queries'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Services | Software, AI & DevOps | AJPR',
  description: 'Explore AJPR World\'s premium technology services. From custom SaaS development to AI automation and cloud architecture, we build systems that scale.',
  alternates: {
    canonical: 'https://ajprworld.com/services',
  },
  openGraph: {
    title: `Premium Technology Services | Software, AI & DevOps | AJPR World`,
    description: `We engineer growth. Explore our premium services including custom web development, SaaS product engineering, AI voice agents, and technical SEO.`,
    url: 'https://ajprworld.com/services',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};




export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export default async function ServicesPage() {
    const services = await getPublishedServices()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
                {/* Background ambient glowing details - Modern Premium */}
                <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-[radial-gradient(circle_at_70%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none"></div>
                <div className="absolute top-40 -left-20 w-[60%] h-[120%] bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
                
                {/* Tech grid overlay */}
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp3uolnn/image/upload/v1723528256/grid-pattern_qayf0d.png')] opacity-20 bg-[length:32px_32px] pointer-events-none mix-blend-overlay"></div>
                
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
                        <div className="inline-flex px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-xs font-bold tracking-widest text-blue-300 uppercase mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                            Enterprise Capabilities
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                            Our Premium Services
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            Engineering scalable digital systems, robust cloud infrastructure, and data-driven growth strategies. We build engines for exponential growth.
                        </p>
                    </div>
                </div>
            </section>

            <div className="w-[85%] max-w-7xl mx-auto min-h-screen pt-16 pb-24">
                <section>
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {services.map((s: any, i: number) => {
                                const IconComponent = ServiceIconMap[s.icon_name || 'Package'] || Package;
                                const featuresList = typeof s.features === 'string' ? JSON.parse(s.features) : (s.features || []);
                                
                                let displayPrice = '';
                                if (s.price_type === 'custom') {
                                    displayPrice = 'Custom Quote';
                                } else if (s.price_type === 'starting_at') {
                                    displayPrice = `₹${parseFloat(s.price).toLocaleString()}+`;
                                } else {
                                    displayPrice = `₹${parseFloat(s.price).toLocaleString()}`;
                                }

                                return (
                                <Card
                                    key={s.id}
                                    id={s.slug}
                                    className="group overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-[#0A0F1F] backdrop-blur-sm animate-fade-up relative"
                                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                                >
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    
                                    <CardHeader className="p-6 flex flex-row items-center gap-4 relative">
                                        <div className={`p-4 rounded-xl bg-gradient-to-br ${s.gradient || 'from-blue-600 to-indigo-800'} text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl font-black text-slate-900 dark:text-white leading-tight">{s.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 p-6 space-y-6 relative">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">{s.description}</p>
                                        
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                                            <ul className="space-y-3">
                                                {featuresList.slice(0, 3).map((f: string, i2: number) => (
                                                    <li key={i2} className="flex items-start text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                        <CheckCircle className="w-4 h-4 text-blue-500 mr-3 mt-0.5 shrink-0" />{f}
                                                    </li>
                                                ))}
                                                {featuresList.length > 3 && (
                                                    <li className="text-xs text-slate-500 font-medium ml-7 pt-1">
                                                        + {featuresList.length - 3} more features
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                                <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">{displayPrice}</span> <br /> {s.delivery_time}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="h-10 px-4 text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                                                    <Link href={`/services/${s.slug}`}>
                                                        Details
                                                    </Link>
                                                </Button>
                                                <Button size="sm" className="h-10 px-5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" asChild>
                                                    <Link href="/contact">
                                                        Quote <ArrowRight className="h-3 w-3 ml-1.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )})}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
