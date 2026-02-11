'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Users, CheckCircle, ArrowRight, FileText, Calculator, Shield } from 'lucide-react'

const hrServices = [
    'Complete Payroll Processing',
    'ESI & PF Registration',
    'Monthly ECR Returns',
    'Employee Documentation',
    'Appointment Letters',
    'HR Policy Development',
    'Attendance Management',
    'Performance Appraisals',
    'Exit Formalities',
    'Compliance Management'
]

const features = [
    {
        icon: Calculator,
        title: 'Payroll Management',
        description: 'Automated salary processing, tax calculations, and statutory deductions.'
    },
    {
        icon: FileText,
        title: 'HR Documentation',
        description: 'Employee contracts, policies, and all required HR documentation.'
    },
    {
        icon: Shield,
        title: 'Compliance',
        description: 'Ensure 100% compliance with labor laws and statutory requirements.'
    }
]

export default function HRPayrollPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                {/* <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800">
                        <Users className="w-4 h-4 mr-2" />
                        HR & Payroll
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">HR & Payroll Management</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Comprehensive HR and payroll solutions to manage your workforce efficiently
                        while ensuring complete compliance with labor laws.
                    </p>
                </div> */}

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                                <CardContent className="p-0">
                                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-6">
                                        <IconComponent className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Services List */}
                <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our HR Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {hrServices.map((service, index) => (
                                <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="font-medium">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing Plans */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: 'Basic Payroll',
                            price: '₹3,000/month',
                            employees: 'Up to 10 employees',
                            features: ['Salary processing', 'ESI/PF deductions', 'Payslips generation', 'Basic reports']
                        },
                        {
                            title: 'Standard HR',
                            price: '₹8,000/month',
                            employees: 'Up to 25 employees',
                            features: ['Complete payroll', 'HR documentation', 'Compliance management', 'Monthly returns', 'Employee portal'],
                            popular: true
                        },
                        {
                            title: 'Enterprise',
                            price: '₹15,000/month',
                            employees: 'Unlimited employees',
                            features: ['Full HR suite', 'Advanced reporting', 'Custom policies', 'Performance management', 'Dedicated support']
                        }
                    ].map((plan, index) => (
                        <Card key={index} className={`p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl relative ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}>
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                                    Most Popular
                                </Badge>
                            )}
                            <CardContent className="p-0">
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <div className="text-3xl font-bold text-orange-600 mb-2">{plan.price}</div>
                                <div className="text-sm text-slate-500 mb-6">{plan.employees}</div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-orange-500 to-red-500'}`} asChild>
                                    <Link href="/contact">Choose Plan</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600" asChild>
                        <Link href="/contact">
                            Get HR Consultation
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
