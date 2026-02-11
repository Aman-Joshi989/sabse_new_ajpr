'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Megaphone, CheckCircle, ArrowRight, Search, Share2, BarChart } from 'lucide-react'

const marketingServices = [
    'Search Engine Optimization (SEO)',
    'Google Ads Management',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Website Analytics',
    'Brand Strategy',
    'Online Reputation Management',
    'Local Business Listings',
    'Conversion Optimization'
]

const features = [
    {
        icon: Search,
        title: 'SEO & Search Marketing',
        description: 'Improve your search rankings and drive organic traffic to your website.'
    },
    {
        icon: Share2,
        title: 'Social Media Marketing',
        description: 'Build your brand presence across all major social media platforms.'
    },
    {
        icon: BarChart,
        title: 'Analytics & Reporting',
        description: 'Track performance and ROI with detailed analytics and reporting.'
    }
]

export default function DigitalMarketingPage() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800">
                        <Megaphone className="w-4 h-4 mr-2" />
                        Digital Marketing
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">Digital Marketing Services</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Grow your business online with our comprehensive digital marketing strategies
                        that drive traffic, generate leads, and increase conversions.
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <Card key={index} className="p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl">
                                <CardContent className="p-0">
                                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full mb-6">
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
                <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-0 shadow-lg mb-16">
                    <CardContent className="p-0">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Marketing Services</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {marketingServices.map((service, index) => (
                                <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="font-medium">{service}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Packages */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: 'Starter',
                            price: '₹15,000/month',
                            features: ['SEO optimization', 'Social media setup', 'Content creation (5 posts)', 'Basic analytics', 'Monthly report']
                        },
                        {
                            title: 'Growth',
                            price: '₹30,000/month',
                            features: ['Complete SEO', 'Google Ads management', 'Social media marketing', 'Content marketing', 'Email campaigns', 'Advanced analytics'],
                            popular: true
                        },
                        {
                            title: 'Enterprise',
                            price: '₹50,000/month',
                            features: ['Full service marketing', 'Custom strategy', 'Dedicated account manager', 'Priority support', 'Unlimited revisions', 'Weekly reporting']
                        }
                    ].map((plan, index) => (
                        <Card key={index} className={`p-8 text-center hover-lift border-0 shadow-lg hover:shadow-xl relative ${plan.popular ? 'ring-2 ring-pink-500' : ''}`}>
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white">
                                    Most Popular
                                </Badge>
                            )}
                            <CardContent className="p-0">
                                <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                                <div className="text-3xl font-bold text-pink-600 mb-6">{plan.price}</div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-pink-600 to-purple-600' : 'bg-gradient-to-r from-pink-500 to-purple-500'}`} asChild>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600" asChild>
                        <Link href="/contact">
                            Start Your Marketing Campaign
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
