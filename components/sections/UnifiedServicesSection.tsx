'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    Code2, Palette, Smartphone, Cloud, Database, Shield,
    Scale, FileText, Calculator, Users, Briefcase, FilePlus,
    Globe, Zap, ArrowRight, CheckCircle, Star
} from 'lucide-react'
import React from 'react'

const allServiceCategories = {
    'Technology Solutions': {
        icon: Code2,
        gradient: 'from-blue-500 to-cyan-500',
        services: [
            'Custom Web Development (Next.js, React)',
            'Mobile App Development (React Native, Flutter)',
            'UI/UX Design & Prototyping',
            'Cloud Solutions & DevOps',
            'Database Design & Management',
            'API Development & Integration',
            'E-commerce Platforms',
            'Digital Marketing Solutions',
            'SEO & Performance Optimization',
            'Cybersecurity Implementation'
        ]
    },
    'Legal & Court Services': {
        icon: Scale,
        gradient: 'from-purple-500 to-pink-500',
        services: [
            'Criminal, Civil & Labour Court Cases',
            'SARFAESI & NPA Act Expertise',
            'Contract & Agreement Drafting',
            'Legal Documentation & Affidavits',
            'Power of Attorney (GPA)',
            'Sale Deed & Transfer Deed',
            'Marriage Certificate Assistance',
            'Court Representation & Litigation',
            'Legal Consultation & Advice',
            'Notary Services'
        ]
    },
    'Tax & Financial Services': {
        icon: Calculator,
        gradient: 'from-green-500 to-emerald-500',
        services: [
            'GST Returns (GSTR-1, 2B, 3B)',
            'Income Tax Returns (ITR)',
            'TDS & TCS Returns',
            'Form 15CA Processing',
            'Day-to-Day Accounting',
            'Inventory Management',
            'Financial Consultation',
            'Tax Planning & Compliance',
            'CIBIL Score Improvement',
            'Bank Loan Assistance'
        ]
    },
    // 'HR & Payroll Management': {
    //     icon: Users,
    //     gradient: 'from-orange-500 to-red-500',
    //     services: [
    //         'Complete Payroll Processing',
    //         'ESI & PF Registration',
    //         'Monthly ESI & PF Returns (ECR)',
    //         'HR Compliance Management',
    //         'Employee Documentation',
    //         'Appointment Letter Drafting',
    //         'Attendance Management Systems',
    //         'Performance Management Tools',
    //         'Training & Development Programs',
    //         'Exit Formalities & Clearance'
    //     ]
    // },
    'Business Registration': {
        icon: Briefcase,
        gradient: 'from-indigo-500 to-purple-500',
        services: [
            'Company Registration (Startup)',
            'GST Registration',
            'TAN & PAN Registration',
            'Udyam/MSME Registration',
            'Import/Export Code (IEC)',
            'Trademark Registration',
            'MCA Compliances & ROC Filings',
            'Digital Signature Certificate (DSC)',
            'GeM Portal Registration',
            'Professional Tax Registration'
        ]
    },
    'Documentation Services': {
        icon: FileText,
        gradient: 'from-teal-500 to-green-500',
        services: [
            'Company Profile Creation',
            'MOA & AOA Drafting',
            'Director Identification (DIN)',
            'Rent Agreements & NOCs',
            'Stamp Duty Documentation',
            'Property Documentation',
            'Passport & Driving License Assistance',
            'Identity Card Services',
            'Income Certificate Processing',
            'Online Verification Services'
        ]
    },
    'Specialized Services': {
        icon: Shield,
        gradient: 'from-rose-500 to-pink-500',
        services: [
            'BCAS Aviation Security Compliance',
            'Airport AEP & E-Sahaj Services',
            'Vehicle Challan & RC Services',
            'Family ID Card Processing',
            'Property Tax & Development Fees',
            'Police Verification Services',
            'Tehsil Office Work',
            'Mutation & Registry Services',
            'Dakhil Kharj Processing',
            'All Government Liaison Work'
        ]
    }
}

export default function UnifiedServicesSection() {
    const [activeCategory, setActiveCategory] = useState('Technology Solutions')
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section id="all-services" ref={sectionRef} className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-40 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-green-400 to-cyan-600 rounded-full blur-3xl animate-float animation-delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600">
                        <Star className="w-4 h-4 mr-2" />
                        Complete Service Portfolio
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="block text-slate-900 dark:text-white mb-2">Everything You Need,</span>
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                            Under One Roof
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        As a dynamic startup, we've built expertise across technology, legal, financial, and business services.
                        No matter what challenge you're facing, we have the solution.
                    </p>
                </div>

                {/* Service Categories Tabs */}
                <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                    {Object.entries(allServiceCategories).map(([category, data]) => {
                        const IconComponent = data.icon
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 hover-lift ${activeCategory === category
                                    ? `bg-gradient-to-r ${data.gradient} text-white shadow-lg scale-105`
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md hover:scale-102'
                                    }`}
                            >
                                <IconComponent className="w-5 h-5 mr-2" />
                                <span className="font-medium text-sm">{category}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Active Category Services */}
                <div className={`transition-all duration-500 ${isVisible ? 'animate-fade-up animation-delay-400' : 'opacity-0'}`}>
                    <Card className={`bg-gradient-to-br ${allServiceCategories[activeCategory as keyof typeof allServiceCategories].gradient} p-1 shadow-2xl`}>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12">
                            <div key={activeCategory} className="animate-scale-in">
                                {/* Category Header */}
                                <div className="flex items-center justify-center mb-8">
                                    {React.createElement(
                                        allServiceCategories[activeCategory as keyof typeof allServiceCategories].icon,
                                        { className: `w-12 h-12 mr-4 bg-gradient-to-r ${allServiceCategories[activeCategory as keyof typeof allServiceCategories].gradient} bg-clip-text text-transparent` }
                                    )}
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                        {activeCategory}
                                    </h3>
                                </div>

                                {/* Services Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {allServiceCategories[activeCategory as keyof typeof allServiceCategories].services.map((service, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all duration-300 hover-lift stagger-animation"
                                        >
                                            <CheckCircle className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 bg-gradient-to-r ${allServiceCategories[activeCategory as keyof typeof allServiceCategories].gradient} bg-clip-text text-transparent`} />
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                                                {service}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
                    {[
                        { label: 'Service Categories', value: '7+', icon: Briefcase },
                        { label: 'Individual Services', value: '70+', icon: CheckCircle },
                        { label: 'Industries Served', value: '15+', icon: Globe },
                        { label: 'Client Satisfaction', value: '100%', icon: Star }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <Card key={index} className="text-center p-6 hover-lift bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg">
                                <CardContent className="space-y-4 p-0">
                                    <div className="mx-auto w-fit p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                                        <IconComponent className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* CTA */}
                <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                    <Card className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 text-white p-8 md:p-12 border-0 shadow-2xl">
                        <CardContent className="p-0 space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold">
                                Don't See What You Need?
                            </h3>
                            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                                As a versatile startup, we're always ready to tackle new challenges.
                                Tell us what you need, and we'll find a way to help.
                            </p>
                            <Button size="lg" variant="secondary" className="hover-lift" asChild>
                                <Link href="#contact">
                                    <Zap className="mr-2 h-5 w-5" />
                                    Discuss Your Project
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
