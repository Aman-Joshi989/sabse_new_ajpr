'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Globe, Users, Award, Target, Sparkles, Clock } from 'lucide-react'
import PricingSection from '@/components/PricingSection'

export default function WebDevelopmentPage() {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20">
            {/* Hero */}
            <section className="py-24 text-center px-4">
                <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800">
                    <Sparkles className="w-5 h-5 mr-2" /> Beyond Vendors
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Your Vision Deserves a Technology Partner
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-8">
                    Why settle for a vendor when you truly need a partner who understands your industry, grasps your vision, guides you, and delivers quality solutions on time.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 hover:from-blue-700 hover:to-cyan-700">
                    Request Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </section>

            {/* Service Offerings */}
            <section id="service-offerings" className="py-24 px-4">
                <h2 className="text-4xl font-bold text-center mb-6">Service Offerings</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    Get the full spectrum of software development services all in one place, with flexible engagement models to suit your every need.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        'UI/UX Design & Prototyping',
                        'Custom Web Applications',
                        'Progressive Web Apps (PWA)',
                        'API & Microservices',
                        'E-commerce Development',
                        'Performance Optimization'
                    ].map((service, i) => (
                        <Card key={i} className="hover-lift">
                            <CardHeader>
                                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                                <CardTitle className="text-xl font-semibold">{service}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 dark:text-slate-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at accumsan nisi, a fermentum nisl.
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <PricingSection />
            {/* Success Stories */}
            <section className="py-24 bg-white dark:bg-slate-900 px-4">
                <h2 className="text-4xl font-bold text-center mb-6">Software Engineering Success Stories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
                    {[
                        { value: '25+', label: 'Years Excellence' },
                        { value: '150+', label: 'Active Clients' },
                        { value: '4.8', label: 'Average CSAT Score' },
                        { value: '95%', label: 'Customer Retention' },
                    ].map((stat, i) => (
                        <div key={i} className="hover-lift">
                            <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                            <div className="text-lg text-slate-600 dark:text-slate-300">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Differentiators */}
            <section className="py-24 px-4">
                <h2 className="text-4xl font-bold text-center mb-6">What Sets Us Apart</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    Experience a distinctive blend of innovation, expertise, and customer-centric approach.
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: Users, title: 'Unmatched Expertise', description: 'Seasoned developers, architects, and designers equipped with latest technologies.' },
                        { icon: Target, title: 'Tailored Solutions', description: 'Bespoke software solutions designed for your unique business challenges.' },
                        { icon: Award, title: 'Quality Process', description: 'Industry best practices and high coding standards for maintainable solutions.' },
                        { icon: Clock, title: 'Agile Delivery', description: 'Faster time-to-market with complete transparency at every step.' },
                    ].map((item, i) => (
                        <Card key={i} className="hover-lift">
                            <CardContent className="flex items-start space-x-4">
                                <item.icon className="w-8 h-8 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Industry Expertise */}
            <section className="py-24 bg-white dark:bg-slate-900 px-4">
                <h2 className="text-4xl font-bold text-center mb-6">Expertise Across Industries</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    Stay ahead with best practices, emerging trends, and top-tier security standards in your industry.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {['Healthcare', 'Finance', 'Education', 'E-commerce', 'IoT', 'Social Impact'].map((industry, i) => (
                        <Card key={i} className="hover-lift text-center p-8">
                            <Globe className="w-10 h-10 text-green-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">{industry}</h3>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Customer Speak */}
            <section className="py-24 px-4">
                <h2 className="text-4xl font-bold text-center mb-6">Customer Speak</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    Hear what our customers have to say about partnering with us.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            text: "AJPR World transformed our digital presence. Their attention to detail and timely delivery exceeded our expectations.",
                            name: "Abhishek Nirman",
                        },
                        {
                            text: "Working with AJPR World was seamless. Their creativity and strategy gave us a brand-new direction.",
                            name: "Ritika Sharma",
                        },
                        {
                            text: "The team at AJPR World is outstanding! They deliver more than promised and truly care about client success.",
                            name: "Arjun Mehta",
                        },
                    ].map((testimonial, i) => (
                        <Card key={i} className="hover-lift">
                            <CardContent className="space-y-4">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                <p className="text-slate-600 dark:text-slate-300 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="text-right font-semibold">- {testimonial.name}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center px-4 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                <h2 className="text-4xl font-bold mb-4">Ready to Take the First Step?</h2>
                <p className="max-w-3xl mx-auto text-lg mb-8">
                    Let us understand your objectives, set up milestones, estimate costs, and plan your project. Walk away with a clear action plan and ballpark estimate.
                </p>
                <Button size="lg" className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" asChild>
                    <Link href="/contact">
                        Request Your Consultation <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </section>
        </div>
    )
}
