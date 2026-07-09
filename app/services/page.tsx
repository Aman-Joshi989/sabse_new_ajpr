import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    Code2, Scale, Calculator, Users, Briefcase, FileText, Shield,
    ArrowRight, CheckCircle, Zap, Globe, Smartphone, Palette, Package
} from 'lucide-react'
import React from 'react'
import { getPublishedServices } from '@/lib/db/queries'

// Mapping string names from DB to Lucide icons
const iconMap: Record<string, any> = {
    'Code2': Code2,
    'Scale': Scale,
    'Calculator': Calculator,
    'Users': Users,
    'Briefcase': Briefcase,
    'FileText': FileText,
    'Shield': Shield,
    'Zap': Zap,
    'Globe': Globe,
    'Smartphone': Smartphone,
    'Palette': Palette,
    'Package': Package
}

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export default async function ServicesPage() {
    const services = await getPublishedServices()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
            <div className="w-[80%] mx-auto min-h-screen">
                <section className="pt-32 pb-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 animate-fade-in">
                            <h1 className="text-3xl md:text-5xl font-black mb-4">Our Services</h1>
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                Engineering scalable digital systems, robust cloud infrastructure, and data-driven growth strategies.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((s: any, i: number) => {
                                const IconComponent = iconMap[s.icon_name || 'Package'] || Package;
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
                                    className="group overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 bg-white dark:bg-white/[0.02] backdrop-blur-sm animate-fade-up"
                                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                                >
                                    <CardHeader className="p-6 flex flex-row items-center gap-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${s.gradient || 'from-slate-500 to-slate-800'} text-white shadow-lg`}>
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{s.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 p-6 space-y-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium line-clamp-2">{s.description}</p>
                                        <ul className="space-y-2">
                                            {featuresList.slice(0, 4).map((f: string, i2: number) => (
                                                <li key={i2} className="flex items-start text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />{f}
                                                </li>
                                            ))}
                                            {featuresList.length > 4 && (
                                                <li className="text-xs text-slate-500 font-medium ml-6">
                                                    + {featuresList.length - 4} more features
                                                </li>
                                            )}
                                        </ul>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/5">
                                            <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                                <span className="font-bold text-slate-900 dark:text-white text-sm">{displayPrice}</span> <br /> {s.delivery_time}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                                                    <Link href={`/services/${s.slug}`}>
                                                        Details
                                                    </Link>
                                                </Button>
                                                <Button size="sm" className="h-9 px-4 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white" asChild>
                                                    <Link href="/contact">
                                                        Quote <ArrowRight className="h-3 w-3 ml-1" />
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
