'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Building, CheckCircle, ArrowRight, FileText, Users, Shield } from 'lucide-react'

const registrationServices = [
    'Private Limited Company',
    'Limited Liability Partnership (LLP)',
    'One Person Company (OPC)',
    'Partnership Firm',
    'Proprietorship',
    'GST Registration',
    'TAN Registration',
    'PAN Registration',
    'MSME/Udyam Registration',
    'Digital Signature Certificate'
]

const expertise = [
    {
        icon: Building,
        title: 'Company Formation',
        description: 'Complete company registration process from name approval to incorporation certificate.'
    },
    {
        icon: FileText,
        title: 'Documentation',
        description: 'All required documents including MOA, AOA, and board resolutions prepared professionally.'
    },
    {
        icon: Shield,
        title: 'Compliance Setup',
        description: 'Ensure your business meets all regulatory requirements from day one.'
    }
]

export default function BusinessRegistrationPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                        <Building className="w-4 h-4 mr-2" />
                        Business Registration
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">Company Registration Services</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Start your business journey with proper legal foundation. We handle all aspects
                        of company registration, compliance setup, and regulatory requirements.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {[
                        { step: '1', title: 'Name Approval', description: 'Reserve your company name' },
                        { step: '2', title: 'Documentation', description: 'Prepare all required documents' },
                        { step: '3', title: 'Filing', description: 'Submit application to ROC' },
                        { step: '4', title: 'Incorporation', description: 'Receive incorporation certificate' }
                    ].map((step, index) => (
                        <Card key={index} className="p-6 text-center hover-lift border-0 shadow-lg">
                            <CardContent className="p-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    {step.step}
                                </div>
                                <h3 className="font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Services List */}
                <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center">Registration Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {registrationServices.map((service, index) => (
                                <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="font-medium">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: 'Pvt Ltd Company',
                            price: '₹12,999',
                            features: ['Name approval', 'MOA/AOA drafting', 'ROC filing', 'Incorporation certificate', 'PAN & TAN', 'Bank account opening support'],
                            popular: true
                        },
                        {
                            title: 'LLP Registration',
                            price: '₹8,999',
                            features: ['Name approval', 'LLP agreement', 'ROC filing', 'Certificate of incorporation', 'PAN application', 'Basic compliance'],
                            popular: false
                        },
                        {
                            title: 'OPC Registration',
                            price: '₹9,999',
                            features: ['Name approval', 'MOA/AOA preparation', 'Filing with ROC', 'Incorporation certificate', 'PAN & TAN', 'Nominee appointment'],
                            popular: false
                        }
                    ].map((plan, index) => (
                        <Card key={index} className={`p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl relative ${plan.popular ? 'ring-2 ring-indigo-500' : ''}`}>
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white">
                                    Most Popular
                                </Badge>
                            )}
                            <CardContent className="p-0">
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <div className="text-3xl font-bold text-indigo-600 mb-6">{plan.price}</div>
                                <ul className="space-y-3 mb-8 text-left">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} asChild>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                        <Link href="/contact">
                            Start Your Business Today
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
