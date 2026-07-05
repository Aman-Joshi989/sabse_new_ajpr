import { getServiceBySlug, getPublishedServices } from '@/lib/db/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { ArrowLeft, CheckCircle2, Star, Shield, Clock, Zap, Target } from 'lucide-react'
import { FAQSchema } from '@/components/schema/FAQSchema'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { ServiceSchema } from '@/components/schema/ServiceSchema'
import { TrustBadges } from '@/components/ui/TrustBadges'
import { RelatedContent } from '@/components/RelatedContent'

export const dynamic = 'force-dynamic'

function getServiceGradient(gradient: string) {
    const map: Record<string, string> = {
        'from-violet-500 to-indigo-600': 'from-[#5B21B6] via-[#4F46E5] to-[#1E1B4B]',
        'from-blue-500 to-cyan-500': 'from-[#1D4ED8] via-[#06B6D4] to-[#0F172A]',
        'from-blue-400 to-indigo-500': 'from-[#2563EB] via-[#6366F1] to-[#0F172A]',
        'from-blue-600 to-indigo-800': 'from-[#1E3A8A] via-[#2563EB] to-[#0F172A]',
        'from-purple-600 to-blue-600': 'from-[#7E22CE] via-[#3B82F6] to-[#0F172A]',
        'from-green-500 to-emerald-500': 'from-[#047857] via-[#10B981] to-[#064E3B]',
        'from-purple-500 to-pink-500': 'from-[#6D28D9] via-[#EC4899] to-[#500724]',
        'from-orange-500 to-red-500': 'from-[#C2410C] via-[#EF4444] to-[#450A0A]',
        'from-indigo-500 to-purple-500': 'from-[#4338CA] via-[#8B5CF6] to-[#2E1065]',
        'from-red-500 to-pink-500': 'from-[#B91C1C] via-[#EC4899] to-[#500724]'
    };
    return map[gradient] || 'from-[#1E3A8A] via-[#2563EB] to-[#0F172A]';
}

function cleanMetaDescription(desc: string, maxLen = 155): string {
    if (!desc) return '';
    const clean = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= maxLen) return clean;
    const sliced = clean.slice(0, maxLen - 3);
    const lastSpace = sliced.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.7) {
        return clean.slice(0, lastSpace).trim() + '...';
    }
    return sliced.trim() + '...';
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, location: string }> }): Promise<Metadata> {
    const { slug, location } = await params
    const service = await getServiceBySlug(slug)
    
    // Capitalize location for display (e.g. "new-york" -> "New York")
    const displayLocation = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    if (!service) {
        return {
            title: 'Service Not Found | AJPR World'
        }
    }

    const safeDesc = cleanMetaDescription(service.description || '');

    return {
        title: `${service.title} in ${displayLocation} | AJPR World Services`,
        description: safeDesc,
        openGraph: {
            title: `${service.title} in ${displayLocation} | AJPR World Services`,
            description: safeDesc,
            url: `https://ajprworld.com/services/${service.slug}/${location}`,
            siteName: 'AJPR World',
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${service.title} in ${displayLocation} - AJPR World`,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} in ${displayLocation} | AJPR World Services`,
            description: safeDesc,
            creator: '@ajprworld',
            images: ['https://ajprworld.com/og-image.jpg']
        },
        alternates: {
            canonical: `https://ajprworld.com/services/${service.slug}/${location}`,
        }
    }
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string, location: string }> }) {
    const { slug, location } = await params
    const service = await getServiceBySlug(slug)

    const displayLocation = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    if (!service) {
        notFound()
    }

    const BannerIcon = service.icon_name && (Icons as any)[service.icon_name] 
        ? (Icons as any)[service.icon_name] 
        : Target;

    const featuresList = typeof service.features === 'string' ? JSON.parse(service.features) : (service.features || [])

    let displayPrice = '';
    if (service.price_type === 'custom') {
        displayPrice = 'Custom Quote';
    } else if (service.price_type === 'starting_at') {
        displayPrice = `Starting at ₹${parseFloat(service.price).toLocaleString()}`;
    } else {
        displayPrice = `₹${parseFloat(service.price).toLocaleString()}`;
    }

    // Generate dynamic FAQs for SEO based on service data
    const dynamicFaqs = [
        {
            question: `What is ${service.title}?`,
            answer: service.description
        },
        {
            question: `How long does it take to deliver ${service.title}?`,
            answer: `The estimated delivery time for ${service.title} is ${service.delivery_time || 'customized based on your specific requirements'}.`
        },
        {
            question: `What is the cost of ${service.title}?`,
            answer: `The pricing for ${service.title} is ${displayPrice}. Contact us for a detailed quote.`
        }
    ];

    if (featuresList && featuresList.length > 0) {
        dynamicFaqs.push({
            question: `What features are included in ${service.title}?`,
            answer: `Key features include: ${featuresList.join(', ')}.`
        });
    }

    const breadcrumbs = [
        { name: 'Home', item: 'https://ajprworld.com' },
        { name: 'Services', item: 'https://ajprworld.com/services' },
        { name: service.title, item: `https://ajprworld.com/services/${service.slug}` },
        { name: displayLocation, item: `https://ajprworld.com/services/${service.slug}/${location}` }
    ];

    const allServices = await getPublishedServices();
    const relatedItems = allServices
        .filter((s: any) => s.slug !== service.slug)
        .slice(0, 6)
        .map((s: any) => ({
            title: s.title,
            url: `/services/${s.slug}/${location}`,
            excerpt: s.description || 'Learn more about our services.'
        }));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 font-sans pb-24">
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema faqs={dynamicFaqs} />
            <ServiceSchema 
                name={`${service.title} in ${displayLocation}`}
                description={service.description}
                providerName="AJPR World"
                url={`https://ajprworld.com/services/${service.slug}/${location}`}
            />
            <div className={`w-full bg-gradient-to-br ${getServiceGradient(service.gradient)} pt-32 pb-20 px-4 text-white relative overflow-hidden`}>
                {/* Background ambient glowing details */}
                <div className="absolute top-0 right-0 w-[45%] h-[80%] bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -bottom-20 left-10 w-[30%] h-[60%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>

                <div className="w-[80%] mx-auto relative z-10">
                    <Button variant="ghost" className="text-white hover:bg-white/20 mb-8" asChild>
                        <Link href="/services">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                        </Link>
                    </Button>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                                {service.category} • Top Rated in {displayLocation}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-sm">
                                {service.title} in {displayLocation}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-medium mb-8 max-w-xl leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-base h-14 px-8 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all" asChild>
                                    <Link href="/contact">Get Started Today</Link>
                                </Button>
                                <div className="text-white/80 font-medium text-sm flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Secure & Confidential
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                            {/* Abstract visual representation of the service */}
                            <div className="relative w-72 h-72 group">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-full animate-pulse group-hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute inset-4 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-12 transition-transform duration-700">
                                    <BannerIcon className="w-32 h-32 text-white/80" strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-[80%] mx-auto mt-16">
                <div className="grid md:grid-cols-3 gap-12">
                    
                    {/* Left: Features & Details */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Dynamic Citable TL;DR Executive Summary (Optimized for AI RAG Citation) */}
                        <div className="p-8 bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/20 rounded-3xl relative overflow-hidden backdrop-blur-sm text-left">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                            <h3 className="text-lg font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4 flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2.5 animate-pulse" />
                                Executive Summary (TL;DR)
                            </h3>
                            <p className="text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-0">
                                {service.title} by AJPR World is a premium, enterprise-ready service tailored to accelerate your business growth. It leverages high-performance modern tech stacks, optimized SEO structures, and robust engineering to deliver custom value. Key highlights include: {featuresList && featuresList.length > 0 ? featuresList.slice(0, 3).join(', ') : 'bespoke engineering'} and expert consulting support.
                            </p>
                        </div>

                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">What's Included</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {featuresList.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{feature}</span>
                                    </div>
                                ))}
                                {featuresList.length === 0 && (
                                    <p className="text-slate-500 italic">No features listed yet.</p>
                                )}
                            </div>
                        </section>

                        <section className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800/50">
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose AJPR World?</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <Star className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Expert Team</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Our professionals have decades of combined experience in delivering top-tier solutions.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Fast Execution</h4>
                                        <p className="text-slate-600 dark:text-slate-400">We prioritize speed without compromising on the exceptional quality you expect.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Dynamic Visual FAQ Section (Optimized for both AI Bots and Humans) */}
                        <section className="mt-12 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {dynamicFaqs.map((faq, idx) => (
                                    <div key={idx} className="p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm text-left">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Sticky Pricing Card */}
                    <div className="relative">
                        <div className="sticky top-32 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Investment</h3>
                            <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">
                                {displayPrice}
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium">Estimated Delivery: <strong className="text-slate-900 dark:text-white">{service.delivery_time || 'TBD'}</strong></span>
                                </div>
                            </div>

                            <Button className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" asChild>
                                <Link href="/contact">Request a Quote</Link>
                            </Button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                No credit card required. We will discuss your exact needs before proceeding.
                            </p>
                            <TrustBadges />
                        </div>
                    </div>
                </div>

                {/* Semantic Internal Linking Silo */}
                <RelatedContent title="Other Services You May Need" items={relatedItems} />
            </div>
        </div>
    )
}
