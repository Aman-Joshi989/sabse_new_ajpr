'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Palette, CheckCircle, ArrowRight, Image as ImageIcon, Layout, Box, Share2, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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

const portfolioItems = [
    { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', title: 'Brand Identity Mockup' },
    { image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop', title: 'Creative Graphic Design' },
    { image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop', title: 'Logo Conception' },
    { image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop', title: 'Corporate Branding Kit' },
    { image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', title: 'Social Media Templates' },
    { image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=1000&auto=format&fit=crop', title: 'UI/UX Brand Integration' },
]

const testimonials = [
    { name: "Priya Sharma", role: "CEO, TechNova", content: "AJPR World completely transformed our brand identity. The new logo and brand guidelines gave us the professional edge we needed to secure our Series A funding." },
    { name: "Rahul Verma", role: "Founder, Brew&Co", content: "Their packaging design is top-notch. Our products now stand out on the shelves, and our social media engagement has doubled thanks to their graphic kits." },
    { name: "Anita Desai", role: "Marketing Director", content: "Working with the AJPR design team was seamless. They understood our vision perfectly and delivered a cohesive digital brand strategy that our customers love." }
]

const faqs = [
    { question: "How many logo revisions do you offer?", answer: "We offer multiple revision rounds depending on the package you choose. Our 'Complete Branding' package includes unlimited revisions until you are 100% satisfied with the final design." },
    { question: "Do I get full copyright ownership of the designs?", answer: "Yes! Once the project is complete and fully paid for, all copyrights and original source files (AI, PSD, EPS) are transferred to you." },
    { question: "How long does a branding project take?", answer: "A typical startup identity takes 1-2 weeks, while comprehensive enterprise branding can take 3-4 weeks. We establish clear timelines during our initial discovery call." },
    { question: "What files will I receive?", answer: "You will receive a complete brand package including high-resolution PNGs, JPGs, vector SVGs, source files, and a PDF brand guideline document." }
]

export default function GraphicsBrandingClient() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    return (
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden" id="graphics-branding">
            <div className="container mx-auto px-4">
                
                {/* Hero Section */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeIn}
                    className="text-center mb-20"
                >
                    <Badge className="mb-6 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-0 px-4 py-1.5 text-sm">
                        <Palette className="w-4 h-4 mr-2" />
                        Premium Graphics & Branding
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">
                        Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Brand Identity</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                        Transform your business with professional graphics and digital branding.
                        We create visual stories that connect with your audience and drive massive growth.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-pink-500/25 transition-all" asChild>
                            <Link href="/contact">
                                Discuss Your Strategy
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors" asChild>
                            <Link href="#portfolio">View Our Work</Link>
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-slate-500 font-medium">Trusted by 50+ visionary brands worldwide.</p>
                </motion.div>

                {/* Portfolio Showcase */}
                <motion.div 
                    id="portfolio"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center text-slate-900 dark:text-white">Recent Work & Visual Concepts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md"
                            >
                                <img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <h3 className="text-white font-bold text-xl">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Process Steps */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Our Proven Branding Process</h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-6"
                    >
                        {[
                            { step: '1', title: 'Discovery', description: 'Exploring your brand values & market positioning' },
                            { step: '2', title: 'Conceptualization', description: 'Designing unique visual directions and moodboards' },
                            { step: '3', title: 'Refinement', description: 'Perfecting the chosen vision with your feedback' },
                            { step: '4', title: 'Delivery', description: 'Handing over high-res, ready-to-use brand assets' }
                        ].map((step, index) => (
                            <motion.div variants={fadeIn} key={index}>
                                <Card className="p-8 text-center h-full hover-lift border-0 shadow-lg bg-slate-50 dark:bg-slate-800/50 transition-all hover:bg-pink-50 dark:hover:bg-pink-900/20">
                                    <CardContent className="p-0">
                                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                                            {step.step}
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Services List */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <Card className="p-8 md:p-12 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-0 shadow-xl mb-24 rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl"></div>
                        
                        <CardContent className="p-0 relative z-10">
                            <h3 className="text-3xl font-bold mb-10 text-center text-slate-900 dark:text-white">Comprehensive Branding Services</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {brandingServices.map((service, index) => (
                                    <div key={index} className="flex items-center p-5 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700/50">
                                        <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg mr-4">
                                            <CheckCircle className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                                        </div>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Testimonials */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Client Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <Card key={idx} className="p-8 border-0 shadow-lg bg-white dark:bg-slate-800 relative">
                                <div className="absolute top-4 right-4 flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <CardContent className="p-0 pt-4">
                                    <p className="text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                                    <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Pricing / Packages */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Transparent Branding Packages</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                title: 'Startup Identity',
                                price: 'Custom Quote',
                                features: ['2 Logo concepts', 'Brand color palette', 'Social media profile kit', 'Standard Business card', 'Email signature'],
                                popular: false
                            },
                            {
                                title: 'Complete Branding',
                                price: 'Custom Quote',
                                features: ['Unlimited Logo revisions', 'Complete Brand Book', 'Letterhead & Envelopes', 'Social Media Templates', '3D Mockups', 'Iconography set'],
                                popular: true
                            },
                            {
                                title: 'Digital Presence',
                                price: 'Custom Quote',
                                features: ['Brand Identity Kit', 'UI/UX Design Concept', 'PowerPoint Theme', 'Ad Banner Templates', 'YouTube Branding', '1 Month Support'],
                                popular: false
                            }
                        ].map((plan, index) => (
                            <Card key={index} className={`p-8 text-center hover-lift border-0 shadow-lg hover:shadow-2xl transition-shadow relative bg-white dark:bg-slate-900 ${plan.popular ? 'ring-2 ring-pink-500 scale-105 z-10' : ''}`}>
                                {plan.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white border-0 px-3 py-1">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardContent className="p-0">
                                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{plan.title}</h3>
                                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6">{plan.price}</div>
                                    <ul className="space-y-4 mb-8 text-left">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-slate-900 dark:bg-slate-800 text-white'} hover:opacity-90 transition-opacity py-6 text-lg rounded-xl`} asChild>
                                        <Link href="/contact">Request Proposal</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-3xl mx-auto mb-24"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-slate-200 dark:border-slate-700">
                                <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Final CTA */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Beautiful?</h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Let's build a visual identity that captures your vision and accelerates your business growth.
                        </p>
                        <Button size="lg" className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-pink-500/50 transition-all border-0" asChild>
                            <Link href="/contact">
                                Start Your Project Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
