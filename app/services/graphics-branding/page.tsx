'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Palette, CheckCircle, ArrowRight, Image as ImageIcon, Layout, Box, Share2 } from 'lucide-react'

const brandingServices = [
    'Logo Design & Visual Identity',
    'Brand Guidelines & Stationery',
    'Social Media Graphic Kits',
    'Marketing & Presentation Design',
    'Packaging & Merchandise Design',
    'Digital Identity Strategy',
    'Website UI/UX Design Content',
    'Custom Illustration & Icons',
    'Email Newsletter Design',
    'Print & Outdoor Advertising'
]

const services = [
    {
        icon: Palette,
        title: 'Logo & Visual Identity',
        description: 'We create iconic logos and visual systems that capture your brand essence and leave a lasting impression.'
    },
    {
        icon: Layout,
        title: 'Digital Branding',
        description: 'Consistent and professional branding across all digital platforms, ensuring a unified brand voice.'
    },
    {
        icon: Box,
        title: 'Brand Collaterals',
        description: 'From business cards to brochures, we design professional assets that reflect your brand quality.'
    }
]

export default function GraphicsBrandingPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900" id="graphics-branding">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-0">
                        <Palette className="w-4 h-4 mr-2" />
                        Graphics & Branding
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Elevate Your Brand Identity</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Transform your business with professional graphics and digital branding.
                        We create visual stories that connect with your audience and drive growth.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {[
                        { step: '1', title: 'Discovery', description: 'Exploring your brand values' },
                        { step: '2', title: 'Conceptualization', description: 'Designing unique directions' },
                        { step: '3', title: 'Refinement', description: 'Perfecting the chosen vision' },
                        { step: '4', title: 'Delivery', description: 'Handing over high-res assets' }
                    ].map((step, index) => (
                        <Card key={index} className="p-6 text-center hover-lift border-0 shadow-lg bg-slate-50 dark:bg-slate-800/50">
                            <CardContent className="p-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    {step.step}
                                </div>
                                <h3 className="font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Services List */}
                <Card className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">Professional Branding Services</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {brandingServices.map((service, index) => (
                                <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-sm">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                                    <span className="font-medium text-slate-700 dark:text-slate-200">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing / Packages for Graphics */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: 'Startup Identity',
                            price: '₹9,999',
                            features: ['2 Logo concepts', 'Brand color palette', 'Social media profile kit', 'Standard Business card', 'Email signature'],
                            popular: false
                        },
                        {
                            title: 'Complete Branding',
                            price: '₹19,999',
                            features: ['Unlimited Logo revisions', 'Complete Brand Book', 'Letterhead & Envelopes', 'Social Media Templates', '3D Mockups', 'Iconography set'],
                            popular: true
                        },
                        {
                            title: 'Digital Presence',
                            price: '₹24,999',
                            features: ['Brand Identity Kit', 'UI/UX Design Concept', 'PowerPoint Theme', 'Ad Banner Templates', 'YouTube Branding', '1 Month Support'],
                            popular: false
                        }
                    ].map((plan, index) => (
                        <Card key={index} className={`p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl relative bg-white dark:bg-slate-900 ${plan.popular ? 'ring-2 ring-pink-500' : ''}`}>
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white border-0">
                                    Best Value
                                </Badge>
                            )}
                            <CardContent className="p-0">
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{plan.title}</h3>
                                <div className="text-3xl font-bold text-pink-600 mb-6">{plan.price}</div>
                                <ul className="space-y-3 mb-8 text-left">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gradient-to-r from-pink-500 to-rose-500'} hover:opacity-90 transition-opacity`} asChild>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-pink-500/20" asChild>
                        <Link href="/contact">
                            Discuss Your Brand Strategy
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
