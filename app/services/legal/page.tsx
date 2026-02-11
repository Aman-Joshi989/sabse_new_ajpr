'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Scale, CheckCircle, ArrowRight, Gavel, FileText, Users } from 'lucide-react'

const legalServices = [
    'Criminal Case Representation',
    'Civil Litigation',
    'Labour Court Cases',
    'SARFAESI & NPA Act',
    'Contract Drafting',
    'Legal Documentation',
    'Court Filing & Procedures',
    'Legal Consultation',
    'Notary Services',
    'Affidavit Preparation'
]

const expertise = [
    {
        icon: Gavel,
        title: 'Court Representation',
        description: 'Expert representation in criminal, civil, and labour courts with proven track record.'
    },
    {
        icon: FileText,
        title: 'Legal Documentation',
        description: 'Comprehensive legal document preparation, contracts, and agreement drafting.'
    },
    {
        icon: Users,
        title: 'Consultation Services',
        description: 'Professional legal advice and consultation for individuals and businesses.'
    }
]

export default function LegalServicesPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                        <Scale className="w-4 h-4 mr-2" />
                        Legal Services
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">Expert Legal Services</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Professional legal representation and consultation services for criminal, civil,
                        and labour court cases with experienced advocates and legal experts.
                    </p>
                </div>

                {/* Expertise Areas */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {expertise.map((area, index) => {
                        const IconComponent = area.icon
                        return (
                            <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                                <CardContent className="p-0">
                                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6">
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
                <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Legal Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {legalServices.map((service, index) => (
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
                        { title: 'Consultation', price: '₹2,000', features: ['30 min session', 'Legal advice', 'Case assessment'] },
                        { title: 'Documentation', price: '₹5,000+', features: ['Contract drafting', 'Legal documents', 'Notary services'] },
                        { title: 'Court Cases', price: '₹15,000+', features: ['Court representation', 'Case filing', 'Complete handling'] }
                    ].map((plan, index) => (
                        <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                            <CardContent className="p-0">
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <div className="text-3xl font-bold text-purple-600 mb-6">{plan.price}</div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                        <Link href="/contact">
                            Book Legal Consultation
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
