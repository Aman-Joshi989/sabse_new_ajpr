import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MapPin, Code, Cpu, Smartphone, LayoutDashboard, Cloud, ArrowRight, CheckCircle2, ChevronRight, Zap, Target, Search, BarChart3, HelpCircle, Star, ShieldCheck, Phone, MessageSquare } from 'lucide-react';
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
    { slug: 'cloud-architecture', name: 'Cloud Architecture & DevOps', icon: Cloud },
    { slug: 'website-security', name: 'Website Security & Maintenance', icon: ShieldCheck }
];

// Localized market data & proof points to prevent duplicate doorway filtering
const METRO_DATA: Record<string, { 
    state: string; 
    region: string; 
    context: string; 
    proof: string; 
    proofMetric: string;
    country?: string;
    postalCode?: string;
    coordinates?: string;
    currency?: string;
    priceRange?: string;
}> = {
    austin: {
        state: 'Texas',
        region: 'Central Texas / Silicon Hills',
        context: 'Austin’s competitive tech and startup ecosystem demands aggressive bottom-of-funnel customer acquisition and high-velocity demand gen.',
        proof: 'Scaled an Austin B2B SaaS startup organic pipeline from $22k to $148k MRR in 7 months.',
        proofMetric: '+570% Inbound Pipeline',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    denver: {
        state: 'Colorado',
        region: 'Front Range Urban Corridor',
        context: 'Denver businesses compete across booming outdoor, B2B technology, and home contracting verticals where local search intent is paramount.',
        proof: 'Delivered +184% increase in booked high-ticket service jobs for a Denver regional HVAC contractor.',
        proofMetric: '+184% Booked Jobs',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    phoenix: {
        state: 'Arizona',
        region: 'Valley of the Sun',
        context: 'Phoenix’s fast-growing population creates massive demand for healthcare, real estate, and trade contractors requiring Maps 3-pack dominance.',
        proof: 'Captured top-3 Google Maps rankings for 42 high-intent search terms across Scottsdale & Phoenix.',
        proofMetric: 'Top-3 Maps Positions',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    charlotte: {
        state: 'North Carolina',
        region: 'Piedmont Region',
        context: 'As a primary US financial and healthcare hub, Charlotte companies require rigorous compliance and enterprise-grade SEO architecture.',
        proof: 'Lowered blended customer acquisition cost (CAC) by 46% for a Charlotte financial services advisory.',
        proofMetric: '46% CAC Reduction',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    tampa: {
        state: 'Florida',
        region: 'Tampa Bay Metro Area',
        context: 'Tampa’s booming consumer, construction, and e-commerce markets reward agile paid search and localized organic collection hubs.',
        proof: 'Generated 4.9x return on ad spend (ROAS) on Google Search and Performance Max for a Tampa retailer.',
        proofMetric: '4.9x Blended ROAS',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    nashville: {
        state: 'Tennessee',
        region: 'Middle Tennessee',
        context: 'Nashville’s healthcare enterprise ecosystem and booming hospitality sector demand specialized digital marketing funnels.',
        proof: 'Generated +210 new patient appointments per month for a multi-location Nashville healthcare network.',
        proofMetric: '+210 New Patients/mo',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    dallas: {
        state: 'Texas',
        region: 'Dallas-Fort Worth Metroplex',
        context: 'DFW is one of the largest corporate B2B headquarters markets in North America, requiring deep technical SEO and account-based marketing.',
        proof: 'Generated 340+ enterprise B2B sales pipeline leads across Texas corporate corridors in 6 months.',
        proofMetric: '340+ Enterprise Leads',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    atlanta: {
        state: 'Georgia',
        region: 'Metro Atlanta',
        context: 'Atlanta’s fintech, supply chain, and B2B SaaS corridor requires data-backed growth marketing with multi-touch attribution.',
        proof: 'Increased organic search traffic by +265% for an Atlanta logistics tech platform while lowering paid CPC.',
        proofMetric: '+265% Organic Traffic',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    miami: {
        state: 'Florida',
        region: 'South Florida',
        context: 'Miami’s international commerce, luxury DTC, and fintech sectors demand high-converting mobile UX and multichannel paid social.',
        proof: 'Scaled a direct-to-consumer lifestyle brand to $1.2M in quarterly revenue with paid ads and Shopify SEO.',
        proofMetric: '$1.2M DTC Revenue',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    chicago: {
        state: 'Illinois',
        region: 'Chicagoland',
        context: 'Chicago’s industrial manufacturing, professional services, and high-density legal markets require technical SEO and transparent retainers.',
        proof: 'Outranked national competitors for commercial manufacturing queries, generating $850k in qualified RFQs.',
        proofMetric: '$850k in B2B RFQs',
        country: 'US',
        currency: '$',
        priceRange: '$$$'
    },
    // Regional & Indian Commercial Hubs
    haldwani: {
        state: 'Uttarakhand',
        region: 'Kumaon Commercial Gateway / Nainital District',
        context: 'As the premier financial and commercial gateway to Kumaon, Haldwani businesses compete fiercely across healthcare, Nainital & Corbett hospitality resorts, coaching institutes, real estate, and retail requiring Google Maps 3-pack dominance and high-converting modern web engineering.',
        proof: 'Ranked #1 for local commercial search queries and delivered +340% increase in inbound customer inquiries for Kumaon regional enterprises.',
        proofMetric: '+340% Local Lead Gen',
        country: 'IN',
        postalCode: '263139',
        coordinates: '29.2183;79.5126',
        currency: '₹',
        priceRange: '₹₹'
    },
    nainital: {
        state: 'Uttarakhand',
        region: 'Lake District of Kumaon',
        context: 'Nainital’s booming tourism economy, heritage hotels, luxury lakeside resorts, and adventure operators rely on high-converting mobile search funnels and top Google Maps visibility.',
        proof: 'Generated over ₹42 Lakhs in direct hotel booking revenue for Nainital and Corbett resorts through search campaigns.',
        proofMetric: '₹42L Direct Bookings',
        country: 'IN',
        postalCode: '263001',
        coordinates: '29.3919;79.4542',
        currency: '₹',
        priceRange: '₹₹'
    },
    dehradun: {
        state: 'Uttarakhand',
        region: 'State Capital & Doon Valley',
        context: 'Dehradun’s dense education, boarding school, coaching, and healthcare corridor requires authoritative programmatic SEO and conversion-focused landing funnels.',
        proof: 'Scaled student enrollment inquiries by +220% for Dehradun premier educational institutes.',
        proofMetric: '+220% Admissions Inquiries',
        country: 'IN',
        postalCode: '248001',
        coordinates: '30.3165;78.0322',
        currency: '₹',
        priceRange: '₹₹'
    },
    rudrapur: {
        state: 'Uttarakhand',
        region: 'SIDCUL Industrial Hub / Udham Singh Nagar',
        context: 'Rudrapur’s industrial manufacturing giants, automotive supply chains, and B2B logistics firms require technical search visibility and corporate web architecture.',
        proof: 'Generated ₹1.8 Cr qualified commercial B2B quotation pipeline for industrial suppliers.',
        proofMetric: '₹1.8 Cr B2B RFQs',
        country: 'IN',
        postalCode: '263153',
        coordinates: '28.9800;79.4000',
        currency: '₹',
        priceRange: '₹₹'
    },
    haridwar: {
        state: 'Uttarakhand',
        region: 'Holy City & Industrial Corridor',
        context: 'Haridwar’s blend of spiritual tourism, hotel chains, and SIDCUL industrial manufacturing requires targeted localized search funnels.',
        proof: 'Captured top-3 Google Maps rankings for hospitality and industrial suppliers in Haridwar.',
        proofMetric: 'Top-3 Maps Rankings',
        country: 'IN',
        postalCode: '249401',
        coordinates: '29.9457;78.1642',
        currency: '₹',
        priceRange: '₹₹'
    },
    roorkee: {
        state: 'Uttarakhand',
        region: 'IIT Tech Corridor / Haridwar District',
        context: 'Roorkee’s engineering, manufacturing, and tech-driven ecosystem demands modern software development and performance digital marketing.',
        proof: 'Drove 4.8x ROAS for technical equipment and education services in Roorkee.',
        proofMetric: '4.8x Ad ROAS',
        country: 'IN',
        postalCode: '247667',
        coordinates: '29.8543;77.8880',
        currency: '₹',
        priceRange: '₹₹'
    },
    kashipur: {
        state: 'Uttarakhand',
        region: 'Industrial & Agro-Commercial Hub',
        context: 'Kashipur’s paper mills, agro-processing, and packaging industries require robust B2B lead generation and organic visibility.',
        proof: 'Generated 180+ qualified B2B distributor inquiries for Kashipur manufacturers.',
        proofMetric: '180+ B2B Leads',
        country: 'IN',
        postalCode: '244713',
        coordinates: '29.2104;78.9619',
        currency: '₹',
        priceRange: '₹₹'
    },
    pantnagar: {
        state: 'Uttarakhand',
        region: 'Industrial Estate & Airport Corridor',
        context: 'Pantnagar’s automobile manufacturing corridor and industrial estates demand high-efficiency B2B enterprise digital solutions.',
        proof: 'Delivered high-intent corporate supplier RFQs across Pantnagar industrial clusters.',
        proofMetric: '+190% Inbound Inquiries',
        country: 'IN',
        postalCode: '263145',
        coordinates: '29.0222;79.4908',
        currency: '₹',
        priceRange: '₹₹'
    },
    uttarakhand: {
        state: 'Uttarakhand',
        region: 'Statewide / Hill & Terai Economy',
        context: 'Across Uttarakhand from Kumaon to Garhwal, forward-thinking businesses partner with AJPR World to modernize their digital presence, capture high-value clients, and scale revenue.',
        proof: 'Managed search and growth campaigns across major Uttarakhand districts generating ₹5+ Crores in client revenue.',
        proofMetric: '₹5+ Cr Client Revenue',
        country: 'IN',
        postalCode: '263139',
        coordinates: '30.0668;79.0193',
        currency: '₹',
        priceRange: '₹₹'
    },
    london: {
        state: 'Greater London',
        region: 'City & Tech City Corridor',
        context: 'London’s fiercely competitive tech startup ecosystem and financial district require world-class digital PR, rapid MVP engineering, and high-velocity B2B growth marketing.',
        proof: 'Launched a London fintech MVP from spec to production in 28 days with full SOC 2 compliance readiness.',
        proofMetric: '28-Day MVP Delivery',
        country: 'GB',
        postalCode: 'EC1A 1BB',
        coordinates: '51.5074;-0.1278',
        currency: '£',
        priceRange: '£££'
    },
    singapore: {
        state: 'Central Region',
        region: 'Marina Bay & One-North Innovation Hub',
        context: 'Singapore enterprises and high-growth APAC startups require proactive website security hardening, rapid malware decontamination, autonomous AI voice workflows, and automated PPC lead generation.',
        proof: 'Neutralized critical website vulnerabilities and restored 99.99% uptime for a Singapore cross-border e-commerce brand.',
        proofMetric: '<15-Min P0 Response',
        country: 'SG',
        postalCode: '018989',
        coordinates: '1.3521;103.8198',
        currency: 'S$',
        priceRange: 'S$$$'
    },
    dubai: {
        state: 'Emirate of Dubai',
        region: 'DIFC & Dubai Internet City',
        context: 'Dubai’s rapid digital transformation mandates enterprise-grade website hardening, immediate malware extraction, and precision multi-channel PPC campaigns across UAE and GCC markets.',
        proof: 'Completed full website malware sanitization, security hardening, and WAF deployment for a Dubai luxury brokerage within 4 hours.',
        proofMetric: '100% Threat Elimination',
        country: 'AE',
        postalCode: '00000',
        coordinates: '25.2048;55.2708',
        currency: 'AED',
        priceRange: 'AED AED AED'
    }
};

export async function generateStaticParams() {
    const params = [];
    const priorityCities = ['austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 'dallas', 'atlanta', 'london', 'singapore', 'haldwani', 'nainital', 'dehradun', 'rudrapur'];
    const priorityServices = ['seo-agency', 'ppc-agency', 'web-design', 'digital-marketing', 'custom-software', 'ai-solutions'];
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
    const localMetro = METRO_DATA[params.city.toLowerCase()];
    const isHaldwani = params.city.toLowerCase() === 'haldwani';
    const isDigitalMarketing = params.service === 'digital-marketing';
    const isSingaporePpc = params.city.toLowerCase() === 'singapore' && params.service === 'ppc-agency';
    const isSingaporeAi = params.city.toLowerCase() === 'singapore' && params.service === 'ai-solutions';
    const isLondonMvp = params.city.toLowerCase() === 'london' && (params.service === 'custom-software' || params.service === 'web-development');
    const isIndia = localMetro?.country === 'IN';

    let title = seoData?.meta_title;
    if (!title) {
        if (isSingaporePpc) {
            title = 'PPC Agency & Paid Search Management Singapore | AJPR World';
        } else if (isSingaporeAi) {
            title = 'Business Process Automation & AI Systems Singapore | AJPR World';
        } else if (isLondonMvp) {
            title = 'Startup MVP Development & Custom Next.js Software London | AJPR World';
        } else if (isHaldwani && isDigitalMarketing) {
            title = 'Best Digital Marketing & SEO Company in Haldwani | AJPR World';
        } else if (isHaldwani) {
            title = `Top ${serviceName} in Haldwani, Uttarakhand | AJPR World`;
        } else if (isIndia) {
            title = `Top ${serviceName} in ${cityName}, ${localMetro?.state || 'Uttarakhand'} | AJPR World`;
        } else {
            title = `${serviceName} in ${cityName} | AJPR World`;
        }
    }

    let description = seoData?.meta_description;
    if (!description) {
        if (isSingaporePpc) {
            description = 'Top PPC management in Singapore. High-ROAS Google Ads, paid search architecture, and conversion rate engineering for growing APAC brands.';
        } else if (isSingaporeAi) {
            description = 'Business process automation, AI workflow engineering, and custom systems integration for companies in Singapore.';
        } else if (isLondonMvp) {
            description = 'Startup MVP development and custom Next.js software engineering in London. Rapid 2–4 week sprints with 100% code ownership.';
        } else if (isHaldwani && isDigitalMarketing) {
            description = 'Looking for the best digital marketing company in Haldwani? AJPR World delivers data-backed SEO, high-ROAS Google Ads, and custom Next.js websites for local businesses in Nainital & Kumaon.';
        } else if (isIndia) {
            description = `Data-driven ${serviceName.toLowerCase()} in ${cityName}, ${localMetro?.state || 'Uttarakhand'}. We engineer SEO, Google Ads, and custom software that drive measurable revenue.`;
        } else {
            description = `Professional ${serviceName.toLowerCase()} in ${cityName}. We engineer scalable software, high-converting web applications, and search growth.`;
        }
    }

    return {
        alternates: { canonical: `https://ajprworld.com${route}` },
        title,
        description,
        keywords: isHaldwani ? [
            'digital marketing company in haldwani',
            'digital marketing agency in haldwani',
            'best digital marketing agency in haldwani uttarakhand',
            'top marketing company in haldwani',
            'seo services haldwani',
            'web development haldwani',
            'DigiPhlox alternative',
            'The Infinix competitor haldwani',
            'AJPR World'
        ] : undefined,
        other: {
            'geo.region': isIndia ? 'IN-UT' : 'US',
            'geo.placename': `${cityName}, ${localMetro?.state || ''}`,
            'geo.position': localMetro?.coordinates || (isIndia ? '29.2183;79.5126' : '30.2672;-97.7431'),
            'ICBM': localMetro?.coordinates ? localMetro.coordinates.replace(';', ', ') : (isIndia ? '29.2183, 79.5126' : '30.2672, -97.7431')
        },
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
                    alt: `${serviceName} in ${cityName} - AJPR World`,
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
    const isIndia = localMetro?.country === 'IN';
    const isHaldwani = params.city.toLowerCase() === 'haldwani';
    const isDigitalMarketing = params.service === 'digital-marketing';

    const localFaqs = isIndia ? [
        {
            question: `How much does a ${serviceName} cost in ${cityName}?`,
            answer: `In ${cityName}, professional ${serviceName.toLowerCase()} retainers typically range from ₹14,999 to ₹54,999 per month depending on local market competition and growth goals. At AJPR World, we provide transparent fixed-fee retainers in INR with zero hidden fees and no lock-in contracts.`
        },
        {
            question: `How long does it take to see results from ${serviceName} in ${cityName}?`,
            answer: `Local search momentum and Google Maps 3-pack rankings in ${cityName} typically show significant traction within 45 to 90 days. High-ROAS Google Search and Meta Ads campaigns generate qualified customer inquiries within the first 7 to 14 days of campaign launch.`
        },
        {
            question: `Do you offer in-person or local support for ${cityName} businesses?`,
            answer: `Yes! AJPR World was founded in Haldwani and maintains a strong operational presence across Kumaon and Delhi NCR. We offer direct in-person strategy reviews across Haldwani, Kathgodam, and Nainital, alongside real-time WhatsApp and Slack support.`
        },
        {
            question: `Why choose AJPR World over other local agencies in Haldwani like DigiPhlox or The Infinix?`,
            answer: `Unlike traditional local agencies relying on slow WordPress templates and basic social media graphics, AJPR World engineers custom, sub-50ms Next.js 15 platforms with built-in Generative Engine Optimization (GEO). We don't just optimize for Google; we get your brand cited in ChatGPT, Claude, and Perplexity, while driving actual revenue pipeline instead of vanity likes.`
        }
    ] : [
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
        '@type': 'ProfessionalService',
        name: isHaldwani && isDigitalMarketing
            ? 'AJPR World - Digital Marketing Company in Haldwani'
            : (seoData?.h1_title || `${serviceName} in ${cityName}`),
        image: 'https://ajprworld.com/logo.png',
        url: `https://ajprworld.com/locations/${params.city}/${params.service}`,
        telephone: '+91-9997205257',
        priceRange: localMetro?.priceRange || (isIndia ? '₹₹' : '$$$'),
        address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressRegion: localMetro?.state || (isIndia ? 'Uttarakhand' : 'US'),
            postalCode: localMetro?.postalCode || (isIndia ? '263139' : undefined),
            addressCountry: localMetro?.country || (isIndia ? 'IN' : 'US')
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: localMetro?.coordinates ? localMetro.coordinates.split(';')[0] : (isIndia ? '29.2183' : '30.2672'),
            longitude: localMetro?.coordinates ? localMetro.coordinates.split(';')[1] : (isIndia ? '79.5126' : '-97.7431')
        },
        areaServed: [
            {
                '@type': 'City',
                name: cityName
            },
            ...(isHaldwani ? [
                { '@type': 'City', name: 'Kathgodam' },
                { '@type': 'City', name: 'Nainital' },
                { '@type': 'City', name: 'Bhimtal' },
                { '@type': 'City', name: 'Rudrapur' }
            ] : [])
        ],
        description: seoData?.meta_description || `Top-rated ${serviceName} services provided by AJPR World for businesses in ${cityName}.`,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: isHaldwani ? '46' : '38',
            bestRating: '5',
            worstRating: '1'
        }
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

    const haldwaniLocalities = [
        'Kaladhungi Road', 'Nainital Road', 'Tikonia', 'Kathgodam', 
        'Mukhani', 'Heera Nagar', 'Bareilly Road', 'Transport Nagar', 
        'Kusumkhera', 'Gas Godam Road', 'Rampur Road', 'Subhash Nagar'
    ];

    const haldwaniPricingTiers = [
        {
            name: 'Local Starter',
            price: '₹14,999',
            period: '/month',
            desc: 'For local businesses and clinics aiming to dominate Google Maps and Haldwani local search.',
            features: [
                'Google Business Profile (Maps 3-Pack) Optimization',
                'Targeted Local SEO (10 High-Intent Keywords)',
                'On-Page Optimization & Schema Injection',
                'Local Citation Syndication (Justdial, IndiaMART)',
                'Monthly Transparent Performance Reporting'
            ],
            badge: 'Local Footfall'
        },
        {
            name: 'Growth Retainer',
            price: '₹29,999',
            period: '/month',
            desc: 'Complete digital marketing engine for hotels, coaching institutes, and growing regional brands.',
            features: [
                'Full-Funnel Organic SEO & Content Strategy',
                'High-ROAS Google Ads & Meta Ads Management',
                'High-Converting Next.js Landing Page Design',
                'Instant WhatsApp Lead Routing & Chat Automation',
                'Competitor Tracking (DigiPhlox & The Infinix)',
                'Bi-Weekly Strategic Growth Reviews'
            ],
            badge: 'Most Popular',
            featured: true
        },
        {
            name: 'Scale & Dominate',
            price: '₹54,999',
            period: '/month',
            desc: 'Enterprise market leadership for luxury resorts, super-specialty hospitals, and regional leaders.',
            features: [
                'Generative Engine Optimization (GEO in ChatGPT & AI Overviews)',
                'Custom Full-Stack Next.js 15 Web Application',
                'Multi-Channel Paid Ad Dominance (Search, Meta, YouTube)',
                'Automated CRM Integration & Lead Scoring',
                'Dedicated Senior Systems & Growth Strategist',
                'Real-Time Private Slack & Priority Support'
            ],
            badge: 'Full Dominance'
        }
    ];

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
                        Serving {cityName}, {localMetro?.state || (isIndia ? 'Uttarakhand' : 'US')}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        {seoData?.h1_title ? (
                            <span dangerouslySetInnerHTML={{ __html: seoData.h1_title }} />
                        ) : isHaldwani && isDigitalMarketing ? (
                            <>#1 <span className="text-blue-600 dark:text-blue-500">Digital Marketing Company</span> in Haldwani, Uttarakhand</>
                        ) : (
                            <>Top-Rated <span className="text-blue-600 dark:text-blue-500">{serviceName}</span> in {cityName}</>
                        )}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        {seoData?.hero_subtitle || (
                            isHaldwani && isDigitalMarketing
                                ? 'Rank #1 on Google and capture high-intent customers across Haldwani, Nainital, Kathgodam, and Kumaon. We combine Generative Engine Optimization (GEO), high-ROAS Google Ads, WhatsApp lead funnels, and sub-second Next.js engineering.'
                                : localMetro?.context 
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
                        <Link href={isIndia ? '#pricing-section' : '/pricing/seo-cost'} className="px-8 py-4 w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-full transition-all">
                            View {isIndia ? 'INR Packages' : 'Transparent Pricing'}
                        </Link>
                    </div>
                </div>

                {/* Haldwani Micro-Localities & Coverage Bar */}
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
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Google Maps 3-Pack</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            We optimize your Google Business Profile to rank in the top 3 on Google Maps for local commercial searches in {cityName}.
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                        <Target className="w-10 h-10 text-blue-600 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">High-Intent Lead Funnels</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            No vanity metrics. Every {serviceName.toLowerCase()} campaign is calibrated to generate qualified phone calls, WhatsApp leads, and real sales.
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

                                {/* Haldwani Industry Solutions */}
                                {isHaldwani && (
                                    <div className="mb-16">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                            Specialized Digital Solutions for Haldwani Industries
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">🏨 Nainital & Corbett Resorts</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    Direct booking engine optimization to cut 20%+ OTA commission fees from MakeMyTrip and Booking.com with high-intent Google Ads.
                                                </p>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">🏥 Healthcare & Clinics</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    Local patient acquisition for super-specialty hospitals and clinics along Kaladhungi Road and Nainital Road with Google Maps dominance.
                                                </p>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">🎓 Coaching & Schools</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    High-volume student admission inquiry funnels for NEET, JEE, and foundation coaching centers in Tikonia and Mukhani.
                                                </p>
                                            </div>
                                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">🏢 Real Estate & Commercial</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    High-ticket buyer lead generation for property developers, plots, residential apartments, and commercial complexes in Haldwani.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Local Strategy Breakdown */}
                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 mb-16">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        Why Choose AJPR World as Your {cityName} {serviceName}?
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                        {isIndia
                                            ? `Unlike traditional agencies in Haldwani that lock clients into slow WordPress templates or assign accounts to junior coordinators, AJPR World operates with senior technical depth and radical transparency. You get sub-50ms web architectures, Generative Engine Optimization, clear flat retainers, and 100% ownership of your accounts.`
                                            : `Unlike legacy agencies like WebFX that lock clients into multi-tiered proprietary software or assign accounts to rotating junior reps, AJPR World operates with radical transparency. You work directly with experienced senior growth practitioners, pay clear flat-fee retainers, and retain 100% ownership of your accounts, creative assets, and conversion data.`}
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

                                {/* Haldwani Local Testimonial */}
                                {isHaldwani && (
                                    <div className="mb-16 p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                                        <div className="flex items-center gap-1 text-amber-500 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-amber-500" />
                                            ))}
                                        </div>
                                        <blockquote className="text-base text-slate-800 dark:text-slate-200 italic font-medium mb-4">
                                            &ldquo;Local expertise with global standards. AJPR World understood our requirements perfectly and delivered beyond expectations. Their Google Maps and SEO work gave us a predictable influx of customer calls every week.&rdquo;
                                        </blockquote>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                                                AS
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-slate-900 dark:text-white">Amit Singh</div>
                                                <div className="text-xs text-slate-500">Business Owner &bull; Haldwani, Uttarakhand</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                            
                            {isIndia && (
                                <Link 
                                    href={`https://api.whatsapp.com/send?phone=919997205257&text=Hi%20AJPR%20World,%20I%20want%20to%20discuss%20${encodeURIComponent(serviceName)}%20services%20for%20my%20business%20in%20${encodeURIComponent(cityName)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-full mt-3 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Chat on WhatsApp (Direct)
                                </Link>
                            )}

                            <p className="text-xs text-slate-500 text-center mt-4">No credit card required. 100% free.</p>
                        </div>
                    </div>
                </div>

                {/* Local INR Pricing Section for India */}
                {isIndia && (
                    <div id="pricing-section" className="mb-20 pt-12 border-t border-slate-200 dark:border-slate-800">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Transparent Retainers
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                                {cityName} Growth & Marketing Packages
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Flat monthly fees in INR. No hidden costs. 100% account ownership. Month-to-month contracts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {haldwaniPricingTiers.map((tier) => (
                                <div 
                                    key={tier.name}
                                    className={`relative rounded-3xl p-8 transition-all flex flex-col justify-between ${
                                        tier.featured
                                            ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/25 ring-2 ring-blue-500'
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                                tier.featured
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                            }`}>
                                                {tier.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                        <p className={`text-xs mb-6 ${tier.featured ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {tier.desc}
                                        </p>
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold">{tier.price}</span>
                                            <span className={`text-xs ${tier.featured ? 'text-blue-100' : 'text-slate-400'}`}>{tier.period}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8 text-xs">
                                            {tier.features.map((feat) => (
                                                <li key={feat} className="flex items-start gap-2">
                                                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.featured ? 'text-blue-200' : 'text-emerald-500'}`} />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link 
                                        href={`/contact?package=${encodeURIComponent(tier.name)}&city=${params.city}`}
                                        className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition-all ${
                                            tier.featured 
                                                ? 'bg-white text-blue-600 hover:bg-blue-50' 
                                                : 'bg-blue-600 text-white hover:bg-blue-500'
                                        }`}
                                    >
                                        Select {tier.name} →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Google Maps Embed for Haldwani */}
                {isHaldwani && (
                    <div className="mb-20 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                        <div className="p-4 mb-2 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-base">Haldwani, Uttarakhand Service Territory</h3>
                                <p className="text-xs text-slate-500">Google Maps Geo Coordinates: 29.2183° N, 79.5126° E &bull; PIN Code: 263139</p>
                            </div>
                            <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">
                                Active Service Area
                            </span>
                        </div>
                        <div className="w-full h-80 rounded-2xl overflow-hidden">
                            <iframe 
                                title="Haldwani Uttarakhand Service Area Map"
                                src="https://maps.google.com/maps?q=Haldwani,%20Uttarakhand&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                )}

                {/* Internal Linking Mesh: Sister Services in this City & Other Metros */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-12 space-y-10">
                    {/* 1. Other Services in this Metro */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Other Technology & Growth Services in {cityName}
                            </h3>
                            <Link href="/locations" className="text-xs font-semibold text-blue-600 hover:underline">
                                View all service areas &rarr;
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {SERVICES.filter(s => s.slug !== params.service).map(s => (
                                <Link
                                    key={s.slug}
                                    href={`/locations/${params.city}/${s.slug}`}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition-all text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 block"
                                >
                                    <span className="font-semibold block mb-0.5">{s.name}</span>
                                    <span className="text-[10px] text-slate-400">{cityName} Hub &rarr;</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 2. Same Service in Other Metros */}
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            {serviceName} Across Other Priority Hubs
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {CITIES.filter(c => c !== params.city.toLowerCase()).slice(0, 12).map(c => (
                                <Link
                                    key={c}
                                    href={`/locations/${c}/${params.service}`}
                                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800"
                                >
                                    {serviceName} in {formatName(c)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 3. Related Guides & Research */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                            Related Pricing Guides & Frameworks
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {isHaldwani && (
                                <Link href="/blog/top-digital-marketing-companies-in-haldwani" className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs transition-colors border border-blue-200 dark:border-blue-800">
                                    Top 7 Marketing Companies in Haldwani (2026 Rankings) →
                                </Link>
                            )}
                            {isHaldwani && (
                                <Link href="/compare/digiphlox-alternatives" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                    DigiPhlox Alternatives & Comparison →
                                </Link>
                            )}
                            {isHaldwani && (
                                <Link href="/compare/the-infinix-alternatives" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                    The Infinix Alternatives & Comparison →
                                </Link>
                            )}
                            <Link href="/services/b2b-growth-marketing" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                B2B Growth Marketing Agency →
                            </Link>
                            <Link href="/services/geo-optimization" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                Generative Engine Optimization (GEO) →
                            </Link>
                            <Link href="/pricing/seo-cost" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                2026 SEO Retainers Guide →
                            </Link>
                            <Link href="/pricing/ppc-cost" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                PPC Management Cost Breakdown →
                            </Link>
                            <Link href="/tools/agency-pricing-calculator" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                Agency ROI & Pricing Calculator →
                            </Link>
                            <Link href="/compare/webfx-alternatives" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                WebFX Alternatives & Comparison →
                            </Link>
                            <Link href="/research/agency-pricing-report" className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
                                2026 US Agency Pricing Report →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
