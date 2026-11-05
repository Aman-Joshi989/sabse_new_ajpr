'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Globe, Users, Award, Target, Sparkles, Clock, Code2, ShieldCheck, Cpu, Layers } from 'lucide-react'
import PricingSection from '@/components/PricingSection'
import { TopicalClusterWidget } from '@/components/seo/TopicalClusterWidget'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { ServiceSchema } from '@/components/schema/ServiceSchema'
import { FAQSchema } from '@/components/schema/FAQSchema'

const webDevFaqs = [
    {
        question: "What makes AJPR World different from a traditional web dev agency?",
        answer: "Unlike traditional agencies that pass your project to junior contractors and pad invoices with bloated management fees, AJPR World provides direct senior software engineering pods. We build production-ready Next.js and full-stack systems delivered in agile 14- to 30-day sprints with 100% IP ownership."
    },
    {
        question: "How much do web dev agency services cost at AJPR World?",
        answer: "Our web development sprints start with transparent, flat-rate pricing: MVP sprints typically range from $1,500 to $4,500 with zero surprise billings, while dedicated monthly engineering pods start at flat monthly retainers. You receive full code repositories, CI/CD setups, and milestone guarantees."
    },
    {
        question: "What tech stack does your web dev agency specialize in?",
        answer: "We engineer primarily with modern, battle-tested technologies: Next.js 15/16 App Router, React, TypeScript, Node.js, PostgreSQL (Neon, Supabase, RDS), Tailwind CSS, Redis caching, and Vercel/AWS cloud infrastructure for sub-150ms TTFB."
    },
    {
        question: "How fast can your web dev agency launch a production-ready application?",
        answer: "Our focused sprint architecture allows us to ship fully functional, high-performance web applications and MVPs in 14 to 30 days, complete with authentication, database models, payment integrations, and automated testing."
    }
]

export default function WebDevelopmentPage() {
    const breadcrumbs = [
        { name: 'Home', item: 'https://ajprworld.com' },
        { name: 'Services', item: 'https://ajprworld.com/services' },
        { name: 'Web Dev Agency', item: 'https://ajprworld.com/services/web-development' }
    ]

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20">
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={webDevFaqs} />
            <ServiceSchema 
                name="Web Dev Agency & Custom Web Engineering"
                description="High-performance web dev agency specializing in Next.js, React, full-stack software development, and rapid MVP engineering shipped in 14-30 days."
                providerName="AJPR World"
                url="https://ajprworld.com/services/web-development"
            />

            {/* Hero */}
            <section className="py-24 text-center px-4 max-w-5xl mx-auto">
                <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-950 dark:to-cyan-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 px-4 py-1.5 text-xs uppercase tracking-widest font-bold">
                    <Sparkles className="w-4 h-4 mr-2" /> Top-Rated Full-Stack Web Dev Agency
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
                    Full-Stack Web Dev Agency for High-Growth Startups & Modern Brands
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-normal">
                    Why settle for a bloated traditional firm when you can partner with an agile, senior-led web dev agency? We engineer high-performance Next.js web applications, dynamic SaaS platforms, and custom software shipped in 14 to 30 days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/20 font-bold rounded-xl" asChild>
                        <Link href="/book-call">
                            Book Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 py-4 rounded-xl border-slate-300 dark:border-slate-700 font-semibold" asChild>
                        <Link href="/pricing">View Transparent Sprints</Link>
                    </Button>
                </div>
            </section>

            {/* Service Offerings */}
            <section id="service-offerings" className="py-20 px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase">
                        End-to-End Capabilities
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Core Services from Our Web Dev Agency
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Get the full spectrum of modern software engineering all in one place, backed by senior developers and flexible sprint engagement models.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: 'Custom Web Application Development',
                            description: 'Build robust, highly scalable, and secure web applications customized to your business logic. Our web dev agency leverages Next.js, React, and PostgreSQL for maximum resilience.'
                        },
                        {
                            title: 'UI/UX Design & Rapid Prototyping',
                            description: 'Craft intuitive, user-centric, and high-fidelity wireframes and Figma prototypes. Modern typography, clean design systems, and seamless conversion flows.'
                        },
                        {
                            title: 'Full-Stack SaaS & MVP Engineering',
                            description: 'Turn your product vision into a live, monetizable SaaS platform in 3 to 4 weeks. Includes multi-tenant database design, user authentication, and billing integration.'
                        },
                        {
                            title: 'API & Microservices Architecture',
                            description: 'Architect secure, performant, and high-throughput API endpoints and modular microservices. Flawless integrations with payment gateways, CRMs, and third-party APIs.'
                        },
                        {
                            title: 'E-commerce & Custom Checkout Flows',
                            description: 'Design dynamic digital storefronts with sub-second page loads. Automated inventory sync, intelligent search, and conversion-optimized payment funnels.'
                        },
                        {
                            title: 'Core Web Vitals & Speed Optimization',
                            description: 'Audit and tune code bundles, edge caching, and server response times. We guarantee sub-150ms TTFB and 95+ Google Lighthouse scores.'
                        }
                    ].map((item, i) => (
                        <Card key={i} className="hover-lift border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl bg-white dark:bg-slate-900/60">
                            <CardHeader>
                                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {item.description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <PricingSection />

            {/* Differentiators */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase">
                        The Agency Advantage
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Why Ambitious Companies Choose Our Web Dev Agency
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Experience a distinctive blend of technical excellence, agile speed, and transparent communication.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: Users, title: 'Senior-Only Engineering Pods', description: 'Zero hand-offs to junior freelancers. You collaborate directly with senior full-stack architects and seasoned product engineers.' },
                        { icon: Target, title: 'Tailored Business Architecture', description: 'Bespoke web solutions built to scale with your user base, avoiding cookie-cutter templates and unmaintainable technical debt.' },
                        { icon: Award, title: '100% Code & IP Ownership', description: 'Every line of code, design asset, and deployment workflow belongs entirely to you upon sprint milestone delivery.' },
                        { icon: Clock, title: '14 to 30 Day Guaranteed Delivery', description: 'Faster time-to-market with rigorous daily updates, continuous deployment previews, and full sprint visibility.' },
                    ].map((item, i) => (
                        <Card key={i} className="hover-lift border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40">
                            <CardContent className="p-8 flex items-start space-x-4">
                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Web Dev Agency FAQs */}
            <section className="py-24 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase">
                        Got Questions?
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Web Dev Agency Frequently Asked Questions
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400">
                        Everything you need to know about working with our full-stack web development agency.
                    </p>
                </div>

                <div className="space-y-6">
                    {webDevFaqs.map((faq, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Topical Cluster Silo Hub */}
            <section className="py-12 px-4 max-w-6xl mx-auto">
                <TopicalClusterWidget
                    currentSiloTitle="Custom Software & Web Engineering Architecture"
                    pillarHref="/services/web-development"
                    pillarAnchor="Full-Stack Web Dev Agency & Custom Engineering"
                    relatedLinks={[
                        {
                            badge: "Maintenance Services",
                            title: "Website Maintenance Services & SLAs",
                            href: "/services/website-security-maintenance",
                            description: "Proactive 24/7 website maintenance, security patching, and uptime monitoring."
                        },
                        {
                            badge: "Cost Guide",
                            title: "Website Maintenance Cost Breakdown (2026)",
                            href: "/services/website-maintenance-cost",
                            description: "Complete guide to monthly website maintenance retainers and cost factors."
                        },
                        {
                            badge: "Free Diagnostic",
                            title: "Free Architecture & Codebase Audit",
                            href: "/free-audit",
                            description: "Comprehensive analysis of your web application's speed, security, and scalability."
                        }
                    ]}
                />
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl mx-4 mb-16 shadow-2xl">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1">
                        Start Your Engineering Sprint
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Ready to Build With a Senior Web Dev Agency?
                    </h2>
                    <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Let us understand your roadmap, estimate engineering costs, and plan your sprint. Walk away with an actionable architecture spec and fixed milestone quote.
                    </p>
                    <div className="pt-2">
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-black px-9 py-6 rounded-2xl shadow-xl hover:scale-105 transition-all text-base" asChild>
                            <Link href="/book-call">
                                Book Your Free Strategy Session <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
