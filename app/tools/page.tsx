import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
    Sparkles, 
    Mail, 
    Calculator, 
    Layers, 
    Bot, 
    ArrowRight, 
    Clock, 
    ShieldCheck,
    CheckCircle2,
    Zap,
    Wand2
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Business & Automation Tools | AJPR World',
    description: 'Access free interactive calculators, ROI estimators, and AI workflow tools designed to streamline operations and eliminate administrative drag.',
    alternates: {
        canonical: 'https://ajprworld.com/tools',
    },
    openGraph: {
        title: 'Free Business & Automation Tools | AJPR World',
        description: 'Access free interactive calculators, ROI estimators, and AI workflow tools designed to streamline operations and eliminate administrative drag.',
        url: 'https://ajprworld.com/tools',
        siteName: 'AJPR World',
        images: ['https://ajprworld.com/og-image.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Business & Automation Tools | AJPR World',
        description: 'Access free interactive calculators, ROI estimators, and AI workflow tools designed to streamline operations and eliminate administrative drag.',
        creator: '@ajprworld',
        images: ['https://ajprworld.com/og-image.jpg']
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Free Productivity & Automation Tools for US Businesses',
    'description': 'Interactive calculators, generators, and audit tools designed for US business owners.',
    'itemListElement': [
        {
            '@type': 'SoftwareApplication',
            'position': 1,
            'name': 'Client Response & Difficult Email Generator',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'All',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
            'url': 'https://ajprworld.com/tools/client-response-generator'
        },
        {
            '@type': 'SoftwareApplication',
            'position': 2,
            'name': 'US Business Admin Cost & Automation ROI Calculator',
            'applicationCategory': 'FinanceApplication',
            'operatingSystem': 'All',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
            'url': 'https://ajprworld.com/tools/admin-cost-calculator'
        },
        {
            '@type': 'SoftwareApplication',
            'position': 3,
            'name': 'SaaS Bloat & Redundant Subscription Audit Checklist',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'All',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
            'url': 'https://ajprworld.com/tools/saas-bloat-audit'
        }
    ]
};

interface ToolCard {
    slug: string;
    title: string;
    description: string;
    solves: string;
    badge: string;
    icon: any;
    color: string;
    timeToValue: string;
}

const toolsList: ToolCard[] = [
    {
        slug: '/tools/client-response-generator',
        title: 'Instant Client Response & Difficult Email Drafter',
        description: 'Tackle scope creep, overdue invoices, and rate objections in seconds with battle-tested assertive, diplomatic, and executive email templates.',
        solves: 'Solves Problem #1: The 11 hr/week inbox black hole',
        badge: 'Inbox & Communication',
        icon: Mail,
        color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60',
        timeToValue: 'Instant (10 sec)'
    },
    {
        slug: '/tools/admin-cost-calculator',
        title: 'US Business Admin Cost & Automation ROI Calculator',
        description: 'Calculate exactly how many billable dollars and payroll hours your business loses each month to manual busywork, and see your return on autonomous AI workflows.',
        solves: 'Solves Problem #2 & #4: Wearing 5 hats & high labor drag',
        badge: 'Financial & ROI',
        icon: Calculator,
        color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60',
        timeToValue: '1 minute'
    },
    {
        slug: '/tools/saas-bloat-audit',
        title: 'SaaS Bloat & Subscription Cost Auditor',
        description: 'Audit your active software subscriptions (HubSpot, Zapier, Calendly, Airtable) to uncover annual wasted license spend and see the consolidation blueprint.',
        solves: 'Solves Problem #3: Paying $1,500/mo for broken app silos',
        badge: 'Software Optimization',
        icon: Layers,
        color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60',
        timeToValue: '2 minutes'
    },
    {
        slug: '/tools/ai-cost-estimator',
        title: 'AI MVP Architecture & Cost Estimator',
        description: 'Interactive AI architect that analyzes your product or automation concept to generate a production tech stack, development timeline, and cost estimate.',
        solves: 'Solves Problem #5: The AI Adoption Gap',
        badge: 'AI & Engineering',
        icon: Bot,
        color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/60',
        timeToValue: 'Interactive Chat'
    },
    {
        slug: '/tools/action-figure-generator',
        title: 'AI Action Figure & Toy Box Studio',
        description: 'Design and generate custom mint-in-box 3D action figures sealed in retro blister packaging with custom accessories, power stats, and Midjourney / DALL-E prompts.',
        solves: 'Viral Brand Marketing & Custom AI Avatars',
        badge: 'Viral & Creative AI',
        icon: Wand2,
        color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900/60',
        timeToValue: 'Instant (10 sec)'
    }
];

export default function ToolsHubPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-6xl mx-auto">
                
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-3.5 h-3.5" /> 100% Free Utilities &bull; No Sign-Up Required
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
                        Tools Built to Make Work Easy for US Founders & Teams
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        Practical, interactive utilities to eliminate administrative busywork, quantify software waste, and build high-leverage business systems.
                    </p>
                </div>

                {/* Grid of Tools */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {toolsList.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link 
                                key={tool.slug}
                                href={tool.slug}
                                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tool.color}`}>
                                            <Icon className="w-3.5 h-3.5" /> {tool.badge}
                                        </span>
                                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {tool.timeToValue}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight mb-2">
                                            {tool.title}
                                        </h2>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400/90 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg w-fit">
                                            {tool.solves}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                                        Launch Tool &rarr;
                                    </span>
                                    <span className="text-xs text-slate-400">Free to use</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Conversion Banner */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" /> Need Custom Development or Automation?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            We Engineer the Custom Systems Behind These Tools
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            From automating complex backend workflows to developing full-stack SaaS portals and AI agents, we help US businesses eliminate technical debt.
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Link 
                                href="/book-call" 
                                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2"
                            >
                                Book a Systems Architecture Call <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link 
                                href="/portfolio" 
                                className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-sm"
                            >
                                View Case Studies
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
