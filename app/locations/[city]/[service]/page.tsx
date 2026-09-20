import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MapPin, Code, Cpu, Smartphone, LayoutDashboard, Cloud, ArrowRight, CheckCircle2, ChevronRight, Zap, Target, Search, BarChart3, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { getSeoContent } from '@/lib/db/queries';

export const revalidate = 86400; // ISR: Cache for 24 hours

// List of targeted cities including US Priority Metros
const CITIES = [
    'austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 
    'dallas', 'atlanta', 'miami', 'chicago', 'boston', 'seattle',
    'new-york', 'san-francisco', 'london', 'toronto', 'sydney', 'dubai', 'singapore',
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'
];

// List of core agency & engineering services
const SERVICES = [
    { slug: 'seo-agency', name: 'SEO Agency', icon: Search },
    { slug: 'ppc-agency', name: 'PPC Agency', icon: Target },
    { slug: 'web-design', name: 'Web Design Company', icon: LayoutDashboard },
    { slug: 'digital-marketing', name: 'Digital Marketing Agency', icon: BarChart3 },
    { slug: 'social-media-marketing', name: 'Social Media Marketing Agency', icon: Smartphone },
    { slug: 'custom-software', name: 'Custom Software Development', icon: Code },
    { slug: 'web-development', name: 'Web Development', icon: LayoutDashboard },
    { slug: 'app-development', name: 'Mobile App Development', icon: Smartphone },
    { slug: 'ai-solutions', name: 'AI & Machine Learning Solutions', icon: Cpu },
    { slug: 'cloud-architecture', name: 'Cloud Architecture & DevOps', icon: Cloud }
];

// Localized market data & proof points to prevent duplicate doorway filtering
const METRO_DATA: Record<string, { state: string; region: string; context: string; proof: string; proofMetric: string }> = {
    austin: {
        state: 'Texas',
        region: 'Central Texas / Silicon Hills',
        context: 'Austin’s competitive tech and startup ecosystem demands aggressive bottom-of-funnel customer acquisition and high-velocity demand gen.',
        proof: 'Scaled an Austin B2B SaaS startup organic pipeline from $22k to $148k MRR in 7 months.',
        proofMetric: '+570% Inbound Pipeline'
    },
    denver: {
        state: 'Colorado',
        region: 'Front Range Urban Corridor',
        context: 'Denver businesses compete across booming outdoor, B2B technology, and home contracting verticals where local search intent is paramount.',
        proof: 'Delivered +184% increase in booked high-ticket service jobs for a Denver regional HVAC contractor.',
        proofMetric: '+184% Booked Jobs'
    },
    phoenix: {
        state: 'Arizona',
        region: 'Valley of the Sun',
        context: 'Phoenix’s fast-growing population creates massive demand for healthcare, real estate, and trade contractors requiring Maps 3-pack dominance.',
        proof: 'Captured top-3 Google Maps rankings for 42 high-intent search terms across Scottsdale & Phoenix.',
        proofMetric: 'Top-3 Maps Positions'
    },
    charlotte: {
        state: 'North Carolina',
        region: 'Piedmont Region',
        context: 'As a primary US financial and healthcare hub, Charlotte companies require rigorous compliance and enterprise-grade SEO architecture.',
        proof: 'Lowered blended customer acquisition cost (CAC) by 46% for a Charlotte financial services advisory.',
        proofMetric: '46% CAC Reduction'
    },
    tampa: {
        state: 'Florida',
        region: 'Tampa Bay Metro Area',
        context: 'Tampa’s booming consumer, construction, and e-commerce markets reward agile paid search and localized organic collection hubs.',
        proof: 'Generated 4.9x return on ad spend (ROAS) on Google Search and Performance Max for a Tampa retailer.',
        proofMetric: '4.9x Blended ROAS'
    },
    nashville: {
        state: 'Tennessee',
        region: 'Middle Tennessee',
        context: 'Nashville’s healthcare enterprise ecosystem and booming hospitality sector demand specialized digital marketing funnels.',
        proof: 'Generated +210 new patient appointments per month for a multi-location Nashville healthcare network.',
        proofMetric: '+210 New Patients/mo'
    },
    dallas: {
        state: 'Texas',
        region: 'Dallas-Fort Worth Metroplex',
        context: 'DFW is one of the largest corporate B2B headquarters markets in North America, requiring deep technical SEO and account-based marketing.',
        proof: 'Generated 340+ enterprise B2B sales pipeline leads across Texas corporate corridors in 6 months.',
        proofMetric: '340+ Enterprise Leads'
    },
    atlanta: {
        state: 'Georgia',
        region: 'Metro Atlanta',
        context: 'Atlanta’s fintech, supply chain, and B2B SaaS corridor requires data-backed growth marketing with multi-touch attribution.',
        proof: 'Increased organic search traffic by +265% for an Atlanta logistics tech platform while lowering paid CPC.',
        proofMetric: '+265% Organic Traffic'
    },
    miami: {
        state: 'Florida',
        region: 'South Florida',
        context: 'Miami’s international commerce, luxury DTC, and fintech sectors demand high-converting mobile UX and multichannel paid social.',
        proof: 'Scaled a direct-to-consumer lifestyle brand to $1.2M in quarterly revenue with paid ads and Shopify SEO.',
        proofMetric: '$1.2M DTC Revenue'
    },
    chicago: {
        state: 'Illinois',
        region: 'Chicagoland',
        context: 'Chicago’s industrial manufacturing, professional services, and high-density legal markets require technical SEO and transparent retainers.',
        proof: 'Outranked national competitors for commercial manufacturing queries, generating $850k in qualified RFQs.',
        proofMetric: '$850k in B2B RFQs'
    }
};

export async function generateStaticParams() {
    const params = [];
    const priorityCities = ['austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 'dallas', 'atlanta'];
    const priorityServices = ['seo-agency', 'ppc-agency', 'web-design', 'digital-marketing'];
    for (const city of priorityCities) {
        for (const service of priorityServices) {
            params.push({ city, service });
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
        if (!seoData) return { title: 'Not Found' };
    }

    const serviceName = serviceDetails?.name || formatName(params.service);
    const title = seoData?.meta_title || `${serviceName} in ${cityName} | AJPR World`;
    const description = seoData?.meta_description || `Top-rated ${serviceName} in ${cityName}. We engineer data-driven SEO, high-ROAS PPC, and custom websites that drive real revenue.`;

    return {
        alternates: { canonical: `https://ajprworld.com${route}` },
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://ajprworld.com/locations/${params.city}/${params.service}`,
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'AJPR World',
                }
            ],
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
    const localMetro = METRO_DATA[params.city.toLowerCase()];
    const serviceName = serviceDetails?.name || formatName(params.service);

    const localFaqs = [
        {
            question: `How much does a ${serviceName} cost in ${cityName}?`,
            answer: `In ${cityName}, professional ${serviceName.toLowerCase()} retainers typically range from $1,500 to $7,500 per month depending on local market competition and growth goals. At AJPR World, we provide transparent fixed-fee retainers with no hidden markups.`
        },
        {
            question: `How long does it take to see results from ${serviceName} in ${cityName}?`,
            answer: `Local search momentum and keyword rankings typically show significant traction within 60 to 90 days. Paid search campaigns (Google & Meta Ads) can drive qualified leads within the first 7 to 14 days of campaign launch.`
        },
        {
            question: `Do you offer in-person or remote collaboration for ${cityName} businesses?`,
            answer: `We serve ${cityName} clients with dedicated US senior strategists, weekly asynchronous Loom video updates, real-time Slack communication, and monthly executive Zoom strategy sessions.`
        }
    ];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seoData?.h1_title || `${serviceName} in ${cityName}`,
        provider: {
            '@type': 'LocalBusiness',
            name: 'AJPR World',
            image: 'https://ajprworld.com/logo.png',
            address: {
                '@type': 'PostalAddress',
                addressLocality: cityName,
                addressRegion: localMetro?.state || 'US',
                addressCountry: 'US'
            }
        },
        areaServed: {
            '@type': 'City',
            name: cityName
        },
        description: seoData?.meta_description || `Top-rated ${serviceName} services provided by AJPR World for businesses in ${cityName}.`
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: localFaqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
            <Script
                id={`local-schema-${params.city}-${params.service}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Script
                id={`local-faq-${params.city}-${params.service}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/locations" className="hover:text-blue-600 transition-colors">Locations</Link>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-slate-200">{cityName} {serviceName}</span>
                </nav>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <MapPin className="w-4 h-4" />
                        Serving {cityName}, {localMetro?.state || 'US'}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        {seoData?.h1_title ? (
                            <span dangerouslySetInnerHTML={{ __html: seoData.h1_title }} />
                        ) : (
                            <>Top-Rated <span className="text-blue-600 dark:text-blue-500">{serviceName}</span> in {cityName}</>
                        )}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        {seoData?.hero_subtitle || (
                            localMetro?.context 
                                ? `${localMetro.context} AJPR World partners with ambitious businesses in ${cityName} to deliver predictable, data-driven revenue growth.`
                                : `AJPR World partners with ambitious brands in ${cityName} to engineer scalable digital marketing, high-ROAS paid campaigns, and cutting-edge software solutions.`
                        )}
                    </p>

                    {/* Proof Block Above the Fold */}
                    {localMetro && (
                        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white text-left shadow-xl border border-blue-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-1">Local Client Benchmark: {cityName}</div>
                                <div className="text-2xl font-bold">{localMetro.proofMetric}</div>
                                <p className="text-sm text-blue-100/80 mt-1 max-w-xl">{localMetro.proof}</p>
                            </div>
                            <Link href="/contact" className="px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-all whitespace-nowrap">
                                Get {cityName} Proposal →
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/free-audit?utm_source=${cityName}-${params.service}`} className="px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2">
                            Claim Free {cityName} Market Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing/seo-cost" className="px-8 py-4 w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-full transition-all">
                            View Transparent Pricing
                        </Link>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid lg:grid-cols-3 gap-12 mb-20 relative">
                    <div className="lg:col-span-2">
                        {seoData?.body_html ? (
                            <div 
                                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
                                dangerouslySetInnerHTML={{ __html: seoData.body_html }}
                            />
                        ) : (
                            <>
                                {/* Feature Grid */}
                                <div className="grid md:grid-cols-3 gap-6 mb-16">
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <ServiceIcon className="w-10 h-10 text-blue-600 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Local Market Intel</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            We study {cityName} competitor search profiles and search intent gaps to capture high-value customer inquiries before rivals can react.
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <Target className="w-10 h-10 text-blue-600 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">High-Intent Acquisition</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            No vanity metrics. Every {serviceName.toLowerCase()} campaign is calibrated to generate qualified phone calls, booked jobs, and revenue pipeline.
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <Zap className="w-10 h-10 text-blue-600 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Modern Technical Edge</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            From Generative Engine Optimization (GEO in ChatGPT & AI Overviews) to sub-second Next.js speed, we deploy 2026-grade technology.
                                        </p>
                                    </div>
                                </div>

                                {/* Local Strategy Breakdown */}
                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 mb-16">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        Why Choose AJPR World as Your {cityName} {serviceName}?
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                        Unlike legacy agencies like WebFX that lock clients into multi-tiered proprietary software or assign accounts to rotating junior reps, AJPR World operates with radical transparency. You work directly with experienced senior growth practitioners, pay clear flat-fee retainers, and retain 100% ownership of your accounts, creative assets, and conversion data.
                                    </p>
                                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            Month-to-month flexibility with no punitive 12-month lock-in traps
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            Direct access to senior growth strategists rather than account coordinators
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            Comprehensive multi-touch attribution reporting tied to actual revenue
                                        </li>
                                    </ul>
                                </div>

                                {/* Distinct Local FAQ */}
                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                        <HelpCircle className="w-6 h-6 text-blue-600" />
                                        Frequently Asked Questions in {cityName}
                                    </h2>
                                    <div className="space-y-4">
                                        {localFaqs.map((faq, idx) => (
                                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
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
                            <h3 className="text-2xl font-bold text-white mb-4">Get Your {cityName} Audit</h3>
                            <p className="text-slate-400 mb-6 text-sm">
                                Join dozens of high-growth businesses in {cityName} who scaled their pipeline with AJPR. We will analyze your local rankings and conversion funnels for free.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    {cityName} Competitor Keyword Gap
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Google Maps & Technical Health
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Custom Revenue Growth Roadmap
                                </li>
                            </ul>
                            <Link href={`/free-audit?utm_source=${cityName}-${params.service}`} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 text-sm">
                                Claim {cityName} Audit
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <p className="text-xs text-slate-500 text-center mt-4">No credit card required. 100% free.</p>
                        </div>
                    </div>
                </div>

                {/* Related Cross Links */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                        Related Services & Pricing
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                            SEO Retainers Guide →
                        </Link>
                        <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                            PPC Cost & Retainers →
                        </Link>
                        <Link href="/compare/webfx-alternatives" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                            WebFX Alternatives & Pricing Comparison →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
