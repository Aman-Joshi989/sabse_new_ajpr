'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calculator, CheckCircle, ArrowRight, FileText, TrendingUp, PieChart } from 'lucide-react'

const financialServices = [
    'GST Returns (GSTR-1, 2B, 3B)',
    'Income Tax Returns (ITR)',
    'TDS & TCS Returns',
    'Form 15CA Processing',
    'Day-to-Day Accounting',
    'Inventory Management',
    'Financial Planning',
    'Tax Consultation',
    'Audit Services',
    'CIBIL Score Improvement'
]

const expertise = [
    {
        icon: FileText,
        title: 'Tax Compliance',
        description: 'Complete GST, Income Tax, and TDS return filing with 100% accuracy and timely submission.'
    },
    {
        icon: TrendingUp,
        title: 'Financial Planning',
        description: 'Strategic financial planning and consultation to optimize your business finances.'
    },
    {
        icon: PieChart,
        title: 'Accounting Services',
        description: 'Professional bookkeeping, accounting, and inventory management services.'
    }
]

export default function FinancialServicesPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
                        <Calculator className="w-4 h-4 mr-2" />
                        Financial Services
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">Tax & Financial Services</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Comprehensive tax compliance, financial planning, and accounting services to keep
                        your business financially healthy and legally compliant.
                    </p>
                </div>

                {/* Expertise Areas */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {expertise.map((area, index) => {
                        const IconComponent = area.icon
                        return (
                            <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                                <CardContent className="p-0">
                                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full mb-6">
                                        <IconComponent className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300">{area.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Services List */}
                <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Financial Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {financialServices.map((service, index) => (
                                <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="font-medium">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {[
                        { title: 'GST Returns', price: '₹2,000/month', period: 'Monthly' },
                        { title: 'Income Tax', price: '₹3,000', period: 'Per Return' },
                        { title: 'TDS Returns', price: '₹1,500', period: 'Quarterly' },
                        { title: 'Full Accounting', price: '₹8,000/month', period: 'Complete Service' }
                    ].map((plan, index) => (
                        <Card key={index} className="p-6 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                            <CardContent className="p-0">
                                <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                                <div className="text-2xl font-bold text-green-600 mb-2">{plan.price}</div>
                                <div className="text-sm text-slate-500 mb-4">{plan.period}</div>
                                <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-emerald-600" asChild>
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600" asChild>
                        <Link href="/contact">
                            Get Financial Consultation
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
