import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle2, Star, Zap, Target, Search, BarChart3, LayoutDashboard, Smartphone, Code, Cpu, Cloud, HelpCircle, MessageSquare, ShieldCheck } from 'lucide-react';

export const revalidate = 86400; // Cache for 24 hours

const CITIES = [
    'austin', 'denver', 'phoenix', 'scottsdale', 'charlotte', 'tampa', 'nashville', 
    'dallas', 'atlanta', 'miami', 'chicago', 'boston', 'seattle',
    'new-york', 'san-francisco', 'london', 'toronto', 'sydney', 'dubai', 'singapore',
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'
];

const SERVICES = [
    { slug: 'digital-marketing', name: 'Digital Marketing Company', desc: 'Full-funnel digital marketing, Google Maps 3-pack dominance, and high-ROAS paid ads.', icon: BarChart3 },
    { slug: 'seo-agency', name: 'SEO & Search Engine Optimization', desc: 'Rank #1 on Google for high-intent commercial keywords and Generative AI search.', icon: Search },
    { slug: 'web-design', name: 'Web Design & UI/UX', desc: 'Conversion-engineered websites and landing pages that turn traffic into paying clients.', icon: LayoutDashboard },
    { slug: 'web-development', name: 'Web Development (Next.js & React)', desc: 'Ultra-fast headless architectures with sub-50ms load times and 95+ Core Web Vitals.', icon: Code },
    { slug: 'ppc-agency', name: 'Google Ads & Paid Search (PPC)', desc: 'High-converting Google Ads and Meta Ads campaigns designed for maximum commercial ROAS.', icon: Target },
    { slug: 'social-media-marketing', name: 'Social Media Marketing', desc: 'Brand positioning, viral content production, and organic audience cultivation.', icon: Smartphone },
    { slug: 'custom-software', name: 'Custom Software Development', desc: 'Bespoke web applications, SaaS platforms, and internal operational workflows.', icon: Code },
    { slug: 'app-development', name: 'Mobile App Development', desc: 'Native and cross-platform iOS and Android applications with offline-first speed.', icon: Smartphone },
    { slug: 'ai-solutions', name: 'AI & Chatbot Automation', desc: 'RAG knowledge bases, automated AI sales agents, and real-time WhatsApp routing.', icon: Cpu },
    { slug: 'cloud-architecture', name: 'Cloud Architecture & DevOps', desc: 'Scalable AWS, GCP, and Vercel cloud deployments with enterprise redundancy.', icon: Cloud },
    { slug: 'website-security', name: 'Website Security & Maintenance', desc: '24/7 uptime monitoring, WordPress security hardening, daily cloud backups, and emergency SLAs.', icon: ShieldCheck }
];

const METRO_INFO: Record<string, { state: string; region: string; context: string; proof: string; proofMetric: string; country?: string; coordinates?: string }> = {
    singapore: {
        state: 'Central Region',
        region: 'Marina Bay & One-North Innovation Hub',
        context: 'Singapore enterprises and high-growth APAC startups require proactive website security hardening, rapid malware decontamination, autonomous AI voice workflows, and automated PPC lead generation.',
        proof: 'Neutralized critical website vulnerabilities and restored 99.99% uptime for a Singapore cross-border e-commerce brand.',
        proofMetric: '<15-Min P0 Response',
        country: 'SG',
        coordinates: '1.3521;103.8198'
    },
    london: {
        state: 'Greater London',
        region: 'Tech City & Silicon Roundabout',
        context: 'London fintechs, high-growth scaleups, and professional service practices partner with AJPR World for rapid Next.js 16 platforms, headless architectures, and Generative Engine Optimization (GEO).',
        proof: 'Delivered a headless fintech platform sprint in 21 days with 99.9% uptime SLA and 100% code transfer.',
        proofMetric: '21-Day MVP Delivery',
        country: 'GB',
        coordinates: '51.5074;-0.1278'
    },
    dubai: {
        state: 'Emirate of Dubai',
        region: 'DIFC & Dubai Internet City',
        context: 'Dubai’s rapid digital transformation mandates enterprise-grade website hardening, immediate malware extraction, and precision multi-channel PPC campaigns across UAE and GCC markets.',
        proof: 'Architected high-ROAS acquisition funnels generating $340k+ in qualified pipeline for UAE enterprise B2B services.',
        proofMetric: '$340k B2B Pipeline',
        country: 'AE',
        coordinates: '25.2048;55.2708'
    },
    austin: {
        state: 'Texas',
        region: 'Central Texas / Silicon Hills',
        context: 'Austin’s competitive tech and startup ecosystem demands aggressive bottom-of-funnel customer acquisition, Next.js web platforms, and automated business workflows.',
        proof: 'Scaled an Austin B2B SaaS startup organic pipeline from $22k to $148k MRR in 7 months.',
        proofMetric: '+570% Inbound Pipeline',
        country: 'US',
        coordinates: '30.2672;-97.7431'
    },
    denver: {
        state: 'Colorado',
        region: 'Front Range Urban Corridor',
        context: 'Denver businesses compete across booming outdoor, B2B technology, and home contracting verticals where local search intent is paramount.',
        proof: 'Delivered +184% increase in booked high-ticket service jobs for a Denver regional HVAC contractor.',
        proofMetric: '+184% Booked Jobs',
        country: 'US',
        coordinates: '39.7392;-104.9903'
    },
    'new-york': {
        state: 'New York',
        region: 'Silicon Alley & Manhattan Financial District',
        context: 'New York venture-backed startups and established financial institutions require bulletproof Next.js web applications, sub-50ms TTFB, and technical SEO architecture.',
        proof: 'Engineered a real-time analytics dashboard delivering 98+ Google Lighthouse scores and zero downtime.',
        proofMetric: '98+ Lighthouse Score',
        country: 'US',
        coordinates: '40.7128;-74.0060'
    },
    'san-francisco': {
        state: 'California',
        region: 'Bay Area / Silicon Valley',
        context: 'Silicon Valley AI labs and SaaS platforms partner with AJPR World for rapid prototype-to-production engineering sprints and autonomous AI agent integrations.',
        proof: 'Shipped a multi-tenant AI workflow product in 28 days with complete repository transfer and AWS deployment.',
        proofMetric: '28-Day Full Delivery',
        country: 'US',
        coordinates: '37.7749;-122.4194'
    },
    toronto: {
        state: 'Ontario',
        region: 'Downtown Toronto & Kitchener-Waterloo Corridor',
        context: 'Canadian tech innovators and B2B enterprises leverage AJPR World for high-performance software engineering, cross-border SEO, and automated ops systems.',
        proof: 'Reduced customer churn by 42% through self-healing webhook architectures and automated notification routing.',
        proofMetric: '-42% Customer Churn',
        country: 'CA',
        coordinates: '43.6532;-79.3832'
    },
    sydney: {
        state: 'New South Wales',
        region: 'Sydney Tech Central & Barangaroo',
        context: 'Australian e-commerce brands and APAC enterprises partner with AJPR World for Next.js store migrations, Core Web Vitals optimization, and 24/7 technical monitoring.',
        proof: 'Doubled organic traffic across ANZ search queries within 90 days following platform architecture migration.',
        proofMetric: '2x ANZ Organic Growth',
        country: 'AU',
        coordinates: '-33.8688;151.2093'
    },
    haldwani: {
        state: 'Uttarakhand',
        region: 'Kumaon Commercial Gateway / Nainital District',
        context: 'Haldwani is the economic engine of Uttarakhand and the gateway to Kumaon. Local enterprises across healthcare, Nainital and Corbett resorts, coaching institutes, and retail partner with AJPR World to dominate Google Search and drive predictable inbound customers.',
        proof: 'Ranked #1 for local commercial search queries and delivered +340% increase in inbound customer calls for Kumaon regional clients.',
        proofMetric: '+340% Local Lead Gen',
        country: 'IN',
        coordinates: '29.2183;79.5126'
    },
    nainital: {
        state: 'Uttarakhand',
        region: 'Lake District of Kumaon',
        context: 'Nainital’s booming hospitality economy relies on high-converting mobile search funnels and Google Maps dominance to capture direct resort bookings and eliminate heavy OTA fees.',
        proof: 'Generated over ₹42 Lakhs in direct hotel booking revenue for Nainital and Corbett resorts through search campaigns.',
        proofMetric: '₹42L Direct Bookings',
        country: 'IN',
        coordinates: '29.3919;79.4542'
    },
    dehradun: {
        state: 'Uttarakhand',
        region: 'State Capital & Doon Valley',
        context: 'Dehradun’s dense education, boarding school, coaching, and healthcare corridor requires authoritative programmatic SEO and conversion-focused landing funnels.',
        proof: 'Scaled student enrollment inquiries by +220% for Dehradun premier educational institutes.',
        proofMetric: '+220% Admissions Inquiries',
        country: 'IN',
        coordinates: '30.3165;78.0322'
    },
    rudrapur: {
        state: 'Uttarakhand',
        region: 'SIDCUL Industrial Hub / Udham Singh Nagar',
        context: 'Rudrapur’s industrial manufacturing giants, automotive supply chains, and B2B logistics firms require technical search visibility and corporate web architecture.',
        proof: 'Generated ₹1.8 Cr qualified commercial B2B quotation pipeline for industrial suppliers.',
        proofMetric: '₹1.8 Cr B2B RFQs',
        country: 'IN',
        coordinates: '28.9800;79.4000'
    },
    scottsdale: {
        state: 'Arizona',
        region: 'Scottsdale & East Valley Tech Corridor',
        context: 'Scottsdale businesses, luxury clinics, and B2B companies require 24/7 website maintenance, zero-downtime security hardening, and high-ROAS Google Ads.',
        proof: 'Eliminated recurring downtime and scaled organic conversions by +215% for a Scottsdale multi-clinic healthcare group.',
        proofMetric: '99.99% Uptime SLA',
        country: 'US',
        coordinates: '33.4942;-111.9261'
    }
};

export async function generateStaticParams() {
    return CITIES.map(city => ({ city }));
}

function formatName(slug: string) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const city = params.city.toLowerCase();

    if (!CITIES.includes(city)) {
        return { title: 'Location Not Found' };
    }

    const cityName = formatName(city);
    const metro = METRO_INFO[city];
    const isIndia = metro?.country === 'IN' || ['haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'].includes(city);

    const title = city === 'haldwani'
        ? 'Digital Marketing & Software Development Company in Haldwani, Uttarakhand | AJPR World'
        : `Digital Marketing, SEO & Web Development in ${cityName} | AJPR World`;

    const description = city === 'haldwani'
        ? 'AJPR World is the leading digital marketing and software development company in Haldwani, Uttarakhand. We engineer top Google rankings, sub-50ms Next.js web applications, high-ROAS ads, and AI automation for businesses across Kumaon.'
        : `Scale your business in ${cityName} with AJPR World. Expert digital marketing, local SEO, Next.js web engineering, and AI solutions with transparent pricing.`;

    return {
        alternates: { canonical: `https://ajprworld.com/locations/${city}` },
        title,
        description,
        keywords: city === 'haldwani' ? [
            'digital marketing company in haldwani',
            'software development company haldwani',
            'best digital marketing agency haldwani',
            'web development company haldwani',
            'SEO services Haldwani',
            'DigiPhlox alternative Haldwani',
            'The Infinix competitor Haldwani',
            'AJPR World'
        ] : undefined,
        other: {
            'geo.region': isIndia ? 'IN-UT' : 'US',
            'geo.placename': `${cityName}, ${metro?.state || (isIndia ? 'Uttarakhand' : '')}`,
            'geo.position': metro?.coordinates || (isIndia ? '29.2183;79.5126' : '30.2672;-97.7431'),
            'ICBM': metro?.coordinates ? metro.coordinates.replace(';', ', ') : (isIndia ? '29.2183, 79.5126' : '30.2672, -97.7431')
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://ajprworld.com/locations/${city}`,
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `AJPR World ${cityName} Hub`,
                }
            ],
        }
    };
}

export default async function CityHubPage(props: Props) {
    const params = await props.params;
    const city = params.city.toLowerCase();

    if (!CITIES.includes(city)) {
        notFound();
    }

    const cityName = formatName(city);
    const metro = METRO_INFO[city];
    const isHaldwani = city === 'haldwani';
    const isIndia = metro?.country === 'IN' || ['haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'].includes(city);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: isHaldwani ? 'AJPR World - Digital Marketing & Software Company in Haldwani' : `AJPR World - ${cityName}`,
        url: `https://ajprworld.com/locations/${city}`,
        logo: 'https://ajprworld.com/logo.png',
        image: 'https://ajprworld.com/og-image.jpg',
        description: isHaldwani 
            ? 'AJPR World provides world-class digital marketing, local SEO, custom Next.js web development, and AI solutions in Haldwani, Uttarakhand.'
            : `AJPR World delivers premium digital solutions and growth engineering in ${cityName}.`,
        telephone: '+91-9997205257',
        priceRange: isIndia ? '₹₹' : metro?.country === 'SG' ? 'S$$$' : '$$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressRegion: metro?.state || (isIndia ? 'Uttarakhand' : metro?.country === 'SG' ? 'Central Region' : 'Global'),
            postalCode: isHaldwani ? '263139' : undefined,
            addressCountry: metro?.country || (isIndia ? 'IN' : 'US')
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: metro?.coordinates ? metro.coordinates.split(';')[0] : (isIndia ? '29.2183' : '30.2672'),
            longitude: metro?.coordinates ? metro.coordinates.split(';')[1] : (isIndia ? '79.5126' : '-97.7431')
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00'
        }
    };

    const haldwaniLocalities = [
        'Kaladhungi Road', 'Nainital Road', 'Tikonia', 'Kathgodam', 
        'Mukhani', 'Heera Nagar', 'Bareilly Road', 'Transport Nagar', 
        'Kusumkhera', 'Gas Godam Road', 'Rampur Road', 'Subhash Nagar'
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 font-sans">
            <Script
                id={`city-hub-schema-${city}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/locations" className="hover:text-blue-600 transition-colors">Locations</Link>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-slate-200">{cityName} Hub</span>
                </nav>

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <MapPin className="w-4 h-4" />
                        {cityName}, {metro?.state || (isIndia ? 'Uttarakhand' : metro?.country || 'Global')} Operational Hub
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        {isHaldwani ? (
                            <>#1 <span className="text-blue-600 dark:text-blue-500">Digital Marketing & Software</span> Company in Haldwani</>
                        ) : (
                            <>Full-Stack Growth & Technology in <span className="text-blue-600 dark:text-blue-500">{cityName}</span></>
                        )}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        {metro?.context || `AJPR World empowers ambitious brands in ${cityName} with cutting-edge software engineering, Generative Engine Optimization (GEO), high-ROAS paid ads, and measurable revenue pipeline.`}
                    </p>

                    {/* Proof callout */}
                    {metro && (
                        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white text-left shadow-xl border border-blue-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-1">{cityName} Market Benchmark</div>
                                <div className="text-2xl font-bold">{metro.proofMetric}</div>
                                <p className="text-sm text-blue-100/80 mt-1 max-w-xl">{metro.proof}</p>
                            </div>
                            <Link href={`/free-audit?utm_source=${city}-hub`} className="px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-all whitespace-nowrap">
                                Claim {cityName} Audit →
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/locations/${city}/digital-marketing`} className="px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2">
                            Explore Digital Marketing in {cityName}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="px-8 py-4 w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-full transition-all">
                            Speak with Senior Strategist
                        </Link>
                    </div>
                </div>

                {/* Micro-Localities for Haldwani */}
                {isHaldwani && (
                    <div className="mb-16 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center justify-center gap-1.5">
                            <MapPin className="w-4 h-4" /> Haldwani & Kumaon Commercial Corridors We Serve
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {haldwaniLocalities.map((loc) => (
                                <span key={loc} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    {loc}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Services Grid */}
                <div className="mb-20">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Comprehensive Digital Capabilities
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                            All Technology & Growth Services in {cityName}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Select a dedicated service to explore localized strategies, client benchmarks, and transparent retainers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((s) => (
                            <Link
                                key={s.slug}
                                href={`/locations/${city}/${s.slug}`}
                                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xl transition-all duration-300 block"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <s.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                                    <span>{s.name}</span>
                                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {s.desc}
                                </p>
                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                                    View {cityName} Details &rarr;
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Haldwani Competitor Research & Rankings Callout */}
                {isHaldwani && (
                    <div className="mb-20 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">Independent Agency Audit</span>
                                <h3 className="text-2xl font-bold mt-2 mb-4">
                                    Top 7 Digital Marketing Companies in Haldwani (2026 Rankings)
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                    Read our objective, data-backed 2026 review comparing AJPR World, DigiPhlox, The Infinix, AdNex Media, and Moris Media across pricing, mobile speed, SEO results, and tech stacks.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link 
                                        href="/blog/top-digital-marketing-companies-in-haldwani"
                                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all"
                                    >
                                        Read Full Haldwani Rankings &rarr;
                                    </Link>
                                    <Link 
                                        href="/compare/digiphlox-alternatives"
                                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all border border-slate-700"
                                    >
                                        DigiPhlox Comparison &rarr;
                                    </Link>
                                    <Link 
                                        href="/compare/the-infinix-alternatives"
                                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all border border-slate-700"
                                    >
                                        The Infinix Comparison &rarr;
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-xs space-y-3">
                                <div className="font-bold text-sm text-white mb-2">Haldwani Market Scorecard</div>
                                <div className="flex justify-between py-1 border-b border-slate-700/60">
                                    <span className="text-slate-400">#1 Tech-Driven Growth:</span>
                                    <span className="font-bold text-blue-400">AJPR World</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-700/60">
                                    <span className="text-slate-400">#2 Local Retail SME Branding:</span>
                                    <span className="text-slate-300">DigiPhlox</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-700/60">
                                    <span className="text-slate-400">#3 Traditional Footfall:</span>
                                    <span className="text-slate-300">The Infinix</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-slate-400">#4 Creative Visual Ads:</span>
                                    <span className="text-slate-300">AdNex Media</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back link */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <Link href="/locations" className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                        &larr; View All Locations & Global Service Metros
                    </Link>
                </div>
            </div>
        </div>
    );
}
