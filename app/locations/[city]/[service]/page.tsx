import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MapPin, Code, Cpu, Smartphone, LayoutDashboard, Cloud, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

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
    const cityName = formatName(params.city);
    const serviceDetails = SERVICES.find(s => s.slug === params.service);
    
    if (!serviceDetails || !CITIES.includes(params.city.toLowerCase())) {
        return { title: 'Not Found' };
    }

    const title = `${serviceDetails.name} in ${cityName} | AJPR World`;
    const description = `Top ${serviceDetails.name} agency in ${cityName}. AJPR World builds premium software, apps & AI solutions to scale your business.`;

    return {
        title,
        description,
        keywords: `${serviceDetails.name} ${cityName}, Best IT Company ${cityName}, Tech Agency ${cityName}, Top Software Developer ${cityName}, AJPR World ${cityName}`,
        openGraph: {
            title,
            description,
            type: 'website',
        }
    };
}

export default async function LocationServicePage(props: Props) {
    const params = await props.params;
    const cityName = formatName(params.city);
    const serviceDetails = SERVICES.find(s => s.slug === params.service);

    if (!serviceDetails || !CITIES.includes(params.city.toLowerCase())) {
        notFound();
    }

    const ServiceIcon = serviceDetails.icon;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${serviceDetails.name} in ${cityName}`,
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
        description: `Premium ${serviceDetails.name} services provided by AJPR World for businesses in ${cityName}.`
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
                        <MapPin className="w-4 h-4" />
                        Serving {cityName} & Beyond
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        The Premier <span className="text-blue-600 dark:text-blue-500">{serviceDetails.name}</span> Agency in {cityName}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        AJPR World partners with ambitious brands and enterprises in {cityName} to engineer scalable, cutting-edge digital solutions that drive massive growth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                            Get a Free Consultation
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/portfolio" className="px-8 py-4 w-full sm:w-auto bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full transition-all flex items-center justify-center">
                            View Our Work
                        </Link>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <ServiceIcon className="w-12 h-12 text-blue-600 mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Enterprise Architecture</h3>
                        <p className="text-slate-600 dark:text-slate-400">We don't build standard templates. Our {serviceDetails.name.toLowerCase()} relies on modern, scalable architecture designed for high traffic.</p>
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

                {/* Why Choose Us */}
                <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your business in {cityName}?</h2>
                    <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                        Stop settling for mediocre tech. Partner with AJPR World for world-class {serviceDetails.name.toLowerCase()} that actually delivers ROI.
                    </p>
                    <Link href="/contact" className="px-10 py-5 bg-white text-blue-600 font-extrabold rounded-full transition-all hover:bg-slate-50 shadow-xl hover:shadow-2xl inline-block">
                        Start Your Project Today
                    </Link>
                </div>
            </div>
        </div>
    );
}
