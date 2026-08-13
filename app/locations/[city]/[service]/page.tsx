import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MapPin, Code, Cpu, Smartphone, LayoutDashboard, Cloud, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { getSeoContent } from '@/lib/db/queries';

export const revalidate = 86400; // ISR: Cache for 24 hours

// List of targeted cities in Uttarakhand
const CITIES = [
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 
    'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'
];

// List of core services
const SERVICES = [
    { slug: 'custom-software', name: 'Custom Software Development', icon: Code },
    { slug: 'web-development', name: 'Web Development', icon: LayoutDashboard },
    { slug: 'app-development', name: 'Mobile App Development', icon: Smartphone },
    { slug: 'ai-solutions', name: 'AI & Machine Learning Solutions', icon: Cpu },
    { slug: 'cloud-architecture', name: 'Cloud Architecture & DevOps', icon: Cloud }
];

export async function generateStaticParams() {
    const params = [];
    // Pre-build the most critical high-value combos
    const priorityCities = ['haldwani', 'nainital', 'uttarakhand'];
    for (const city of priorityCities) {
        for (const service of SERVICES) {
            params.push({ city, service: service.slug });
        }
    }
    return params;
}

type Props = {
    params: Promise<{ city: string; service: string }>;
};

function formatName(slug: string) {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const route = `/locations/${params.city}/${params.service}`;
    const seoData = await getSeoContent(route);

    const cityName = formatName(params.city);
    const serviceDetails = SERVICES.find(s => s.slug === params.service);
    
    if (!serviceDetails || !CITIES.includes(params.city.toLowerCase())) {
        if (!seoData) return {
    alternates: { canonical: `/locations/${city}/${service}` }, title: 'Not Found' };
    }

    const serviceName = serviceDetails?.name || formatName(params.service);
    const title = seoData?.meta_title || `${serviceName} in ${cityName} | AJPR World`;
    const description = seoData?.meta_description || `Top ${serviceName} agency in ${cityName}. AJPR World builds premium software, apps & AI solutions to scale your business.`;

    return {
        title,
        description,
        keywords: `${serviceName} ${cityName}, Best IT Company ${cityName}, Tech Agency ${cityName}, Top Software Developer ${cityName}, AJPR World ${cityName}`,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://ajprworld.com/locations/${params.city}/${params.service}`,
        }
    };
}

export default async function LocationServicePage(props: Props) {
    const params = await props.params;
    const route = `/locations/${params.city}/${params.service}`;
    const seoData = await getSeoContent(route);

    const cityName = formatName(params.city);
    const serviceDetails = SERVICES.find(s => s.slug === params.service);

    if (!seoData && (!serviceDetails || !CITIES.includes(params.city.toLowerCase()))) {
        notFound();
    }

    const ServiceIcon = serviceDetails?.icon || Code;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seoData?.h1_title || `${serviceDetails?.name} in ${cityName}`,
        provider: {
            '@type': 'LocalBusiness',
            name: 'AJPR World',
            image: 'https://ajprworld.com/logo.png',
            address: {
                '@type': 'PostalAddress',
                addressLocality: cityName,
                addressRegion: 'Uttarakhand',
                addressCountry: 'IN'
            }
        },
        areaServed: {
            '@type': 'City',
            name: cityName
        },
        description: seoData?.meta_description || `Premium ${serviceDetails?.name} services provided by AJPR World for businesses in ${cityName}.`
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
            <Script
                id={`local-schema-${params.city}-${params.service}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <MapPin className="w-4 h-4" />
                        Serving {cityName} & Beyond
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        {seoData?.h1_title ? (
                            <span dangerouslySetInnerHTML={{ __html: seoData.h1_title.replace(serviceDetails?.name || '', `<span class="text-blue-600 dark:text-blue-500">${serviceDetails?.name}</span>`) }} />
                        ) : (
                            <>The Premier <span className="text-blue-600 dark:text-blue-500">{serviceDetails?.name}</span> Agency in {cityName}</>
                        )}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        {seoData?.hero_subtitle || `AJPR World partners with ambitious brands and enterprises in ${cityName} to engineer scalable, cutting-edge digital solutions that drive massive growth.`}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/free-audit?utm_source=${cityName}-${params.service}`} className="px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            Get Your Free Growth Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Main Content & Elite CTA Layout */}
                <div className="grid lg:grid-cols-3 gap-12 mb-20 relative">
                    
                    <div className="lg:col-span-2">
                        {seoData?.body_html ? (
                            <div 
                                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
                                dangerouslySetInnerHTML={{ __html: seoData.body_html }}
                            />
                        ) : (
                            <>
                                {/* Feature Grid (Fallback) */}
                                <div className="grid md:grid-cols-3 gap-8 mb-20">
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <ServiceIcon className="w-12 h-12 text-blue-600 mb-6" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Enterprise Architecture</h3>
                                        <p className="text-slate-600 dark:text-slate-400">We don't build standard templates. Our {serviceDetails?.name?.toLowerCase()} relies on modern, scalable architecture designed for high traffic.</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <Cpu className="w-12 h-12 text-blue-600 mb-6" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI-Powered Engineering</h3>
                                        <p className="text-slate-600 dark:text-slate-400">We integrate the latest LLMs and automation into your business processes, giving you a massive advantage over competitors in {cityName}.</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <MapPin className="w-12 h-12 text-blue-600 mb-6" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Local {cityName} Expertise</h3>
                                        <p className="text-slate-600 dark:text-slate-400">We understand the local market dynamics. We build tech that perfectly aligns with your target audience in {cityName} and Uttarakhand.</p>
                                    </div>
                                </div>
                            </>
                        )}

                        {seoData ? null : (
                            <>
                                <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your business in {cityName}?</h2>
                                    <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                                        Stop settling for mediocre tech. Partner with AJPR World for world-class {serviceDetails?.name?.toLowerCase()} that actually delivers ROI.
                                    </p>
                                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl">
                                        Contact Us Today
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Elite Sticky CTA Sidebar */}
                    <div className="hidden lg:block relative">
                        <div className="sticky top-28 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                            <div className="absolute -top-4 -right-4 p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Get Your Free Growth Audit</h3>
                            <p className="text-slate-400 mb-6">
                                Join 15+ other businesses in {cityName} who scaled their revenue using our tech. We'll analyze your current setup for free.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Performance & SEO Review
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Architecture Assessment
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Actionable Growth Plan
                                </li>
                            </ul>
                            <Link href={`/free-audit?utm_source=${cityName}-${params.service}`} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2">
                                Claim Free Audit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <p className="text-xs text-slate-500 text-center mt-4">No credit card required. 100% free.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
