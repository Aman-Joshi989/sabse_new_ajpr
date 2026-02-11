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
        description: 'Build modern, responsive web apps with Next.js, React, and TypeScript.',
        features: ['Next.js 14', 'TypeScript', 'SEO Optimization', 'PWA'],
        gradient: 'from-blue-500 to-cyan-500',
        price: '₹25,000+',
        delivery: '2-4 weeks',
    },
    {
        icon: Zap,
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure, deployment automation, and server management.',
        features: ['AWS / Azure / GCP', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Arch'],
        gradient: 'from-blue-500 to-cyan-500',
        price: 'Custom Quote',
        delivery: 'Project Based',
    },
    {
        icon: Globe,
        title: 'Digital Marketing',
        description: 'Data-driven strategies to grow your online presence and reach your target audience.',
        features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting'],
        gradient: 'from-blue-400 to-indigo-500',
        price: 'Custom Quote',
        delivery: 'Monthly Retainer',
    },
    {
        icon: Scale,
        title: 'Legal & Court Services',
        description: 'Expert handling of criminal, civil, labour, and SARFAESI cases.',
        features: ['Litigation', 'Documentation', 'Consultation', 'Compliance'],
        gradient: 'from-purple-500 to-pink-500',
        price: '₹10,000+',
        delivery: '1-2 weeks',
    },
    {
        icon: Calculator,
        title: 'Tax & Financial Services',
        description: 'GST, Income Tax, TDS/TCS returns, audit, and financial planning.',
        features: ['GST Returns', 'ITR Filing', 'TDS Returns', 'Form 15CA'],
        gradient: 'from-green-500 to-emerald-500',
        price: '₹5,000+',
        delivery: '1 week',
    },
    // {
    //     icon: Users,
    //     title: 'HR & Payroll Management',
    //     description: 'Complete payroll, ESI/PF compliance, HR policies, and more.',
    //     features: ['Payroll Setup', 'ECR Returns', 'Employee Documents', 'Compliance'],
    //     gradient: 'from-orange-500 to-red-500',
    //     price: '₹8,000+',
    //     delivery: '1-2 weeks',
    // },
    {
        icon: Briefcase,
        title: 'Company Registration',
        description: 'Company, LLP, GST, TAN, PAN, MSME, and legal entity setup.',
        features: ['Company ROC', 'GST & TAN', 'MSME Registration', 'DSC'],
        gradient: 'from-indigo-500 to-purple-500',
        price: '₹7,000+',
        delivery: '3-5 days',
    },
    {
        icon: FileText,
        title: 'Documentation Services',
        description: 'Agreements, MoA/AoA, deed drafting, NOCs, and notary.',
        features: ['Agreements', 'MoA/AoA', 'Sale & Transfer Deeds', 'Notary'],
        gradient: 'from-teal-500 to-green-500',
        price: '₹2,000+',
        delivery: '2-3 days',
    },
    {
        icon: Shield,
        title: 'Aviation Security (BCAS)',
        description: 'AEP, E-Sahaj, security program clearance, and compliance.',
        features: ['AEP', 'E-Sahaj', 'Security Docs', 'Renewals'],
        gradient: 'from-rose-500 to-pink-500',
        price: '₹15,000+',
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
        <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className={`text-center mb-16 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl font-bold">Our Services</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Comprehensive solutions across technology, legal, finance, HR, and compliance.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceData.map((s, i) => (
                        <Card key={i} className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 dark:bg-slate-900 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                            <CardHeader className="p-6 flex items-center">
                                <div className={`p-4 rounded-full bg-gradient-to-r ${s.gradient} text-white mr-4`}>
                                    {React.createElement(s.icon, { className: 'h-6 w-6' })}
                                </div>
                                <CardTitle className="text-xl font-semibold">{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 p-6 space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">{s.description}</p>
                                <ul className="space-y-2">
                                    {s.features.map((f, i2) => (
                                        <li key={i2} className="flex items-center text-slate-700 dark:text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-slate-500">
                                        <span className="font-semibold">{s.price}</span> | {s.delivery}
                                    </div>
                                    <Button size="sm" asChild>
                                        <Link href="/contact">
                                            <ArrowRight className="h-4 w-4 mr-1" /> Get Quote
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
