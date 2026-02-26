'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    Code2, Scale, Calculator, Users, Briefcase, FileText, Shield,
    ArrowRight, CheckCircle, Zap, Globe, Smartphone, Palette
} from 'lucide-react'
import React from 'react'

const serviceData = [
    {
        icon: Code2,
        title: 'Custom Web Development',
        slug: 'web-development',
        description: 'Build modern, responsive web apps with Next.js, React, and TypeScript.',
        features: ['Next.js 14', 'TypeScript', 'SEO Optimization', 'PWA'],
        gradient: 'from-blue-500 to-cyan-500',
        price: '₹34,999+',
        delivery: '2-4 weeks',
    },
    {
        icon: Palette,
        title: 'Graphics & Digital Branding',
        slug: 'graphics-branding',
        description: 'Professional visual identity and branding solutions to make your business stand out.',
        features: ['Logo Design', 'Brand Identity', 'Social Media Kits', 'Marketing Collaterals'],
        gradient: 'from-pink-500 to-rose-500',
        price: '₹19,999+',
        delivery: '1-2 weeks',
    },
    {
        icon: Zap,
        title: 'Cloud Solutions',
        slug: 'cloud-solutions',
        description: 'Scalable cloud infrastructure, deployment automation, and server management.',
        features: ['AWS / Azure / GCP', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Arch'],
        gradient: 'from-blue-500 to-cyan-500',
        price: 'Custom Quote',
        delivery: 'Project Based',
    },
    {
        icon: Globe,
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Data-driven strategies to grow your online presence and reach your target audience.',
        features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting'],
        gradient: 'from-blue-400 to-indigo-500',
        price: 'Custom Quote',
        delivery: 'Monthly Retainer',
    },
    {
        icon: Scale,
        title: 'Legal & Court Services',
        slug: 'legal',
        description: 'Expert handling of criminal, civil, labour, and SARFAESI cases.',
        features: ['Litigation', 'Documentation', 'Consultation', 'Compliance'],
        gradient: 'from-purple-500 to-pink-500',
        price: '₹10,000+',
        delivery: '1-2 weeks',
    },
    {
        icon: Calculator,
        title: 'Tax & Financial Services',
        slug: 'financial',
        description: 'GST, Income Tax, TDS/TCS returns, audit, and financial planning.',
        features: ['GST Returns', 'ITR Filing', 'TDS Returns', 'Form 15CA'],
        gradient: 'from-green-500 to-emerald-500',
        price: '₹5,000+',
        delivery: '1 week',
    },
    {
        icon: Briefcase,
        title: 'Company Registration',
        slug: 'business',
        description: 'Company, LLP, GST, TAN, PAN, MSME, and legal entity setup.',
        features: ['Company ROC', 'GST & TAN', 'MSME Registration', 'DSC'],
        gradient: 'from-indigo-500 to-purple-500',
        price: '₹7,000+',
        delivery: '3-5 days',
    },
    {
        icon: FileText,
        title: 'Documentation Services',
        slug: 'legal', // Matches sub-directory logic if needed, or stays separate
        description: 'Agreements, MoA/AoA, deed drafting, NOCs, and notary.',
        features: ['Agreements', 'MoA/AoA', 'Sale & Transfer Deeds', 'Notary'],
        gradient: 'from-teal-500 to-green-500',
        price: '₹2,000+',
        delivery: '2-3 days',
    },
    {
        icon: Shield,
        title: 'Aviation Security (BCAS)',
        slug: 'contact', // No page found, go to contact
        description: 'AEP, E-Sahaj, security program clearance, and compliance.',
        features: ['AEP', 'E-Sahaj', 'Security Docs', 'Renewals'],
        gradient: 'from-rose-500 to-pink-500',
        price: '₹19,999+',
        delivery: '1-2 weeks',
    }
]

export default function ServicesPage() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setIsVisible(true)
        }, { threshold: 0.1 })
        if (sectionRef.current) obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
            <div className="w-[80%] mx-auto min-h-screen">
                <section ref={sectionRef} className="pt-32 pb-24">
                    <div className="container mx-auto px-4">
                        <div className={`text-center mb-16 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-3xl md:text-5xl font-black mb-4">Our Services</h2>
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                Comprehensive solutions across technology, legal, finance, HR, and compliance.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceData.map((s, i) => (
                                <Card
                                    key={i}
                                    id={s.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}
                                    className={`group overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 bg-white dark:bg-white/[0.02] backdrop-blur-sm ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <CardHeader className="p-6 flex flex-row items-center gap-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}>
                                            {React.createElement(s.icon, { className: 'h-5 w-5' })}
                                        </div>
                                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{s.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 p-6 space-y-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{s.description}</p>
                                        <ul className="space-y-2">
                                            {s.features.map((f, i2) => (
                                                <li key={i2} className="flex items-start text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />{f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/5">
                                            <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.price}</span> <br /> {s.delivery}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                                                    <Link href={s.slug === 'contact' ? '/contact' : `/services/${s.slug}`}>
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
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
