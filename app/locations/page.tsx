import { Metadata } from 'next';
import Link from 'next/link';
import { 
    MapPin, 
    Code, 
    Cpu, 
    Smartphone, 
    LayoutDashboard, 
    Cloud, 
    ArrowRight, 
    Search, 
    Target, 
    BarChart3,
    Globe,
    Building2,
    ShieldCheck
} from 'lucide-react';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

export const revalidate = 86400; // Cache for 24 hours

export const metadata: Metadata = {
    metadataBase: new URL('https://ajprworld.com'),
    title: 'Areas We Serve | Regional Hubs & US Metros | AJPR World',
    description: 'Explore US metros, regional Uttarakhand centers, and global tech corridors where AJPR World engineers custom software, AI solutions, SEO, and high-yield digital marketing.',
    alternates: {
        canonical: 'https://ajprworld.com/locations'
    },
    openGraph: {
        title: 'Areas We Serve | Regional Hubs & US Metros | AJPR World',
        description: 'Explore US metros, regional Uttarakhand centers, and global tech corridors where AJPR World engineers custom software, AI solutions, SEO, and high-yield digital marketing.',
        url: 'https://ajprworld.com/locations',
        siteName: 'AJPR World',
        type: 'website',
        images: [
            {
                url: 'https://ajprworld.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AJPR World Locations',
            }
        ],
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Areas We Serve | Regional Hubs & US Metros | AJPR World',
        description: 'Explore US metros, regional Uttarakhand centers, and global tech corridors where AJPR World engineers custom software, AI solutions, SEO, and high-yield digital marketing.',
        images: ['https://ajprworld.com/og-image.jpg'],
        creator: '@ajprworld',
        site: '@ajprworld',
    }
};

const US_METROS = [
    'austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 
    'dallas', 'atlanta', 'miami', 'chicago', 'boston', 'seattle',
    'new-york', 'san-francisco'
];

const GLOBAL_HUBS = [
    'london', 'singapore', 'dubai', 'toronto', 'sydney'
];

const REGIONAL_METROS = [
    'haldwani', 'dehradun', 'nainital', 'rudrapur', 'haridwar', 'roorkee', 'kashipur', 'pantnagar', 'uttarakhand'
];

const SERVICES = [
    { slug: 'seo-agency', name: 'SEO Agency', icon: Search },
    { slug: 'ppc-agency', name: 'PPC Agency', icon: Target },
    { slug: 'web-design', name: 'Web Design Company', icon: LayoutDashboard },
    { slug: 'digital-marketing', name: 'Digital Marketing Agency', icon: BarChart3 },
    { slug: 'social-media-marketing', name: 'Social Media Marketing', icon: Smartphone },
    { slug: 'custom-software', name: 'Custom Software Development', icon: Code },
    { slug: 'web-development', name: 'Web Development', icon: LayoutDashboard },
    { slug: 'app-development', name: 'Mobile App Development', icon: Smartphone },
    { slug: 'ai-solutions', name: 'AI & Machine Learning Solutions', icon: Cpu },
    { slug: 'cloud-architecture', name: 'Cloud Architecture & DevOps', icon: Cloud },
    { slug: 'website-security', name: 'Website Security & Maintenance', icon: ShieldCheck }
];

function formatName(slug: string) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function LocationsIndex() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] font-sans selection:bg-blue-600/30">
            <BreadcrumbSchema 
                items={[
                    { name: 'Home', item: 'https://ajprworld.com' },
                    { name: 'Locations', item: 'https://ajprworld.com/locations' }
                ]}
            />

            {/* Header */}
            <div className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#0B0F19] border-b border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px]" />
                </div>
                <div className="container relative z-10 px-4 mx-auto max-w-6xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-200 dark:border-blue-800/50">
                        <MapPin className="w-4 h-4" /> Global Presence, Local Impact
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                        Areas We Serve
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        AJPR World provides world-class growth marketing, custom engineering, and Generative Engine Optimization to ambitious businesses across Uttarakhand, the United States, and global tech corridors.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-7xl space-y-24">
                
                {/* 1. Uttarakhand & Regional Engineering Hubs */}
                <div>
                    <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                                <Building2 className="w-4 h-4" /> Headquarters & Regional Delivery
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Uttarakhand & Regional Delivery Centers
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Local digital marketing, SEO, web design, and software engineering rooted in Haldwani and northern India.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {REGIONAL_METROS.map((city) => {
                            const isHQ = city === 'haldwani';
                            return (
                                <div 
                                    key={city} 
                                    className={`p-8 rounded-2xl border transition-all duration-300 group ${
                                        isHQ 
                                            ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/40 shadow-lg ring-1 ring-blue-500/20' 
                                            : 'bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/10 hover:shadow-xl dark:hover:shadow-2xl'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                            <MapPin className={`w-6 h-6 ${isHQ ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`} />
                                            <Link href={`/locations/${city}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {formatName(city)}
                                            </Link>
                                        </h3>
                                        {isHQ && (
                                            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
                                                Company HQ
                                            </span>
                                        )}
                                    </div>
                                    <ul className="space-y-2.5">
                                        {SERVICES.slice(0, 6).map((service) => (
                                            <li key={service.slug}>
                                                <Link 
                                                    href={`/locations/${city}/${service.slug}`}
                                                    className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium group/link transition-colors"
                                                >
                                                    <span className="flex items-center gap-2.5 text-xs">
                                                        <service.icon className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                                                        {service.name}
                                                    </span>
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5">
                                        <Link 
                                            href={`/locations/${city}`}
                                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            Explore all {formatName(city)} services <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. US Priority Metros */}
                <div>
                    <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                            <Globe className="w-4 h-4" /> Enterprise & Growth Markets
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            United States Priority Metros
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            High-intent local SEO, conversion-focused web architecture, and growth marketing across top US business hubs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {US_METROS.map((city) => (
                            <div key={city} className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-white/10 p-8 rounded-2xl hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300 group">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/10 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                                    <Link href={`/locations/${city}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {formatName(city)}
                                    </Link>
                                </h3>
                                <ul className="space-y-2.5">
                                    {SERVICES.slice(0, 6).map((service) => (
                                        <li key={service.slug}>
                                            <Link 
                                                href={`/locations/${city}/${service.slug}`}
                                                className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium group/link transition-colors"
                                            >
                                                <span className="flex items-center gap-2.5 text-xs">
                                                    <service.icon className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                                                    {service.name}
                                                </span>
                                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5">
                                    <Link 
                                        href={`/locations/${city}`}
                                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                        Explore all {formatName(city)} services <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Global Tech Hubs */}
                <div>
                    <div className="mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                            <Globe className="w-4 h-4" /> International Tech Corridors
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Global Tech Hubs
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Serving high-growth startups and established enterprises across key international financial centers.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {GLOBAL_HUBS.map((city) => (
                            <div key={city} className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-white/10 p-8 rounded-2xl hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300 group">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/10 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                                    <Link href={`/locations/${city}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {formatName(city)}
                                    </Link>
                                </h3>
                                <ul className="space-y-2.5">
                                    {SERVICES.slice(0, 6).map((service) => (
                                        <li key={service.slug}>
                                            <Link 
                                                href={`/locations/${city}/${service.slug}`}
                                                className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium group/link transition-colors"
                                            >
                                                <span className="flex items-center gap-2.5 text-xs">
                                                    <service.icon className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                                                    {service.name}
                                                </span>
                                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5">
                                    <Link 
                                        href={`/locations/${city}`}
                                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                        Explore all {formatName(city)} services <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
