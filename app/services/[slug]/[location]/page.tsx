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
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

function getServiceGradient(gradient: string) {
    // Ultra-premium dark theme gradients
    const map: Record<string, string> = {
        'from-violet-500 to-indigo-600': 'from-[#0A0514] via-[#1A0B2E] to-[#0A0514]',
        'from-blue-500 to-cyan-500': 'from-[#051124] via-[#0A192F] to-[#051124]',
        'from-blue-400 to-indigo-500': 'from-[#0A0F1F] via-[#131A33] to-[#0A0F1F]',
        'from-blue-600 to-indigo-800': 'from-[#060D1F] via-[#0D1836] to-[#060D1F]',
        'from-purple-600 to-blue-600': 'from-[#110A1F] via-[#1A1636] to-[#110A1F]',
        'from-green-500 to-emerald-500': 'from-[#03140C] via-[#062417] to-[#03140C]',
        'from-purple-500 to-pink-500': 'from-[#170514] via-[#2A0923] to-[#170514]',
        'from-orange-500 to-red-500': 'from-[#1C0804] via-[#2D0F08] to-[#1C0804]',
        'from-indigo-500 to-purple-500': 'from-[#0B081A] via-[#16102E] to-[#0B081A]',
        'from-red-500 to-pink-500': 'from-[#1A050A] via-[#2A0915] to-[#1A050A]'
    };
    return map[gradient] || 'from-[#060D1F] via-[#0D1836] to-[#060D1F]';
}

function getRobustMetaDescription(desc: string, featuresStr: string, minLen = 110, maxLen = 155): string {
    let text = (desc || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    if (text.length < minLen && featuresStr) {
        try {
            const features = typeof featuresStr === 'string' ? JSON.parse(featuresStr) : featuresStr;
            if (Array.isArray(features) && features.length > 0) {
                const featuresText = 'Key features include: ' + features.join(', ') + '.';
                if (text.length > 0 && !text.endsWith('.')) {
                    text = text + '. ' + featuresText;
                } else if (text.length > 0) {
                    text = text + ' ' + featuresText;
                } else {
                    text = featuresText;
                }
            }
        } catch(e) {}
    }

    if (text.length <= maxLen && text.length >= minLen) return text;
    
    const sliced = text.slice(0, maxLen - 3);
    const lastSpace = sliced.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.7) {
        return text.slice(0, lastSpace).trim() + '...';
    }
    return sliced.trim() + '...';
}

function getSeoTitle(baseTitle: string, location?: string): string {
  const fullBrand = ' | AJPR World Services';
  const shortBrand = ' | AJPR';
  const maxLen = 60;

  const titleWithLocation = location ? `${baseTitle} in ${location}` : baseTitle;

  if ((titleWithLocation + fullBrand).length <= maxLen) {
    return titleWithLocation + fullBrand;
  }

  if ((titleWithLocation + shortBrand).length <= maxLen) {
    return titleWithLocation + shortBrand;
  }
  
  if (location) {
     const suffix = ` in ${location}${shortBrand}`;
     if (suffix.length >= maxLen) {
        return `${titleWithLocation.slice(0, maxLen - shortBrand.length - 3)}...${shortBrand}`;
     }
     const allowedLen = maxLen - suffix.length - 3;
     const sliced = baseTitle.slice(0, allowedLen);
     const lastSpace = sliced.lastIndexOf(' ');
     const truncated = lastSpace > allowedLen * 0.7 ? sliced.slice(0, lastSpace).trim() : sliced.trim();
     return `${truncated}...${suffix}`;
  }

  const allowedLen = maxLen - shortBrand.length - 3;
  const sliced = baseTitle.slice(0, allowedLen);
  const lastSpace = sliced.lastIndexOf(' ');
  const truncated = lastSpace > allowedLen * 0.7 ? sliced.slice(0, lastSpace).trim() : sliced.trim();
  return `${truncated}...${shortBrand}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, location: string }> }): Promise<Metadata> {
    const { slug, location } = await params
    
    const override = await getSeoMetadata(`/services/${slug}/${location}`);
    if (override) {
        return {
            title: override.title,
            description: override.description,
            openGraph: {
                title: override.title,
                description: override.description,
                url: `https://ajprworld.com/services/${slug}/${location}`,
                siteName: 'AJPR World',
                locale: 'en_US',
                type: 'website',
            }
        };
    }

    const service = await getServiceBySlug(slug)
    
    // Capitalize location for display (e.g. "new-york" -> "New York")
    const displayLocation = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    if (!service) {
        return {
            title: 'Service Not Found | AJPR World'
        }
    }

    const safeDesc = getRobustMetaDescription(service.description || '', service.features || '');
    const seoTitle = getSeoTitle(service.title, displayLocation);

    return {
        title: seoTitle,
        description: safeDesc,
        openGraph: {
            title: seoTitle,
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
            title: seoTitle,
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
            <div className={`w-full bg-gradient-to-br ${getServiceGradient(service.gradient)} pt-32 pb-24 px-4 text-white relative overflow-hidden`}>
                {/* Background ambient glowing details - Modern Premium */}
                <div className="absolute top-0 right-0 w-full h-[150%] bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none"></div>
                <div className="absolute -bottom-40 -left-20 w-[80%] h-[120%] bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
                
                {/* Tech grid overlay */}
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp3uolnn/image/upload/v1723528256/grid-pattern_qayf0d.png')] opacity-10 bg-[length:32px_32px] pointer-events-none mix-blend-overlay"></div>
                
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                <div className="w-[85%] max-w-7xl mx-auto relative z-10">
                    <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/10 mb-8 rounded-full h-10 px-6 backdrop-blur-md border border-white/5" asChild>
                        <Link href="/services">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                        </Link>
                    </Button>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-xs font-bold tracking-widest text-blue-300 uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                {service.category} • Top Rated in {displayLocation}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                                {service.title} in {displayLocation}
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-xl leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 font-bold text-base h-14 px-8 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-95 transition-all" asChild>
                                    <Link href="/contact">Get Started Today</Link>
                                </Button>
                                <div className="text-slate-400 font-medium text-sm flex items-center gap-2 ml-4">
                                    <Shield className="w-4 h-4 text-blue-400" /> Secure & Confidential
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-end relative">
                            {/* Premium Abstract Visual Representation */}
                            <div className="relative w-80 h-80 flex items-center justify-center">
                                {/* Orbit rings */}
                                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                <div className="absolute inset-4 border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                                <div className="absolute inset-10 border border-purple-500/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
                                
                                {/* Glowing backdrop */}
                                <div className="absolute w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
                                
                                {/* Floating Glass Card */}
                                <div className="relative w-56 h-56 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex items-center justify-center animate-float-slow transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl opacity-50"></div>
                                    <BannerIcon className="w-24 h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" strokeWidth={1.5} />
                                </div>
                                
                                {/* Floating particles */}
                                <div className="absolute -top-4 right-10 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] animate-bounce" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute bottom-10 -left-4 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
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
                        {/* Dynamic Citable TL;DR Executive Summary */}
                        <div className="p-8 bg-white dark:bg-[#080D1A] border border-slate-200 dark:border-slate-800 rounded-3xl relative overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none text-left">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse" />
                                Executive Summary (TL;DR)
                            </h3>
                            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed mb-0">
                                <strong className="text-slate-900 dark:text-white font-black">{service.title} in {displayLocation}</strong> by AJPR World is a premium, enterprise-ready service tailored to accelerate your business growth. It leverages high-performance modern tech stacks, optimized SEO structures, and robust engineering to deliver custom value. Key highlights include: <span className="text-blue-600 dark:text-blue-400">{featuresList && featuresList.length > 0 ? featuresList.slice(0, 3).join(', ') : 'bespoke engineering'}</span> and expert consulting support.
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
                        <div className="sticky top-32 p-8 bg-white dark:bg-[#080D1A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/30 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            <div className="absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                            
                            <h3 className="text-lg font-black tracking-wide text-slate-500 uppercase mb-3">Investment</h3>
                            <div className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                                {displayPrice}
                            </div>
                            
                            <div className="space-y-4 mb-8 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                <div className="flex items-start gap-4 text-slate-600 dark:text-slate-400">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 shrink-0">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Estimated Delivery</div>
                                        <div className="text-sm font-medium">{service.delivery_time || 'Custom Timeline'}</div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" asChild>
                                <Link href="/contact">Request a Custom Quote</Link>
                            </Button>
                            
                            <p className="text-center text-xs font-medium text-slate-400 mt-6 px-4 leading-relaxed">
                                No credit card required. We will discuss your exact needs before proceeding.
                            </p>
                            
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <TrustBadges />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Service Areas (SEO Internal Linking to fix orphan pages) */}
                <div className="mt-16 mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Global Service Areas</h2>
                    <div className="flex flex-wrap gap-3">
                        {['new-york', 'london', 'san-francisco', 'singapore', 'dubai'].map(city => (
                            <Link 
                                key={city} 
                                href={`/services/${service.slug}/${city}`}
                                className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                                    city === location 
                                        ? 'bg-blue-600 text-white border-blue-600' 
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-600'
                                }`}
                            >
                                {service.title} in {city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Semantic Internal Linking Silo */}
                <RelatedContent title="Other Services You May Need" items={relatedItems} />
            </div>
        </div>
    )
}
