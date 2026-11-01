import React from 'react';
import Link from 'next/link';
import { 
    Mail, 
    Calculator, 
    Layers, 
    Bot, 
    ArrowRight, 
    TrendingUp, 
    Wand2 
} from 'lucide-react';

interface RelatedToolsProps {
    currentSlug: string;
}

const ALL_TOOLS = [
    {
        slug: '/tools/agency-pricing-calculator',
        title: 'Agency Pricing & ROI Calculator',
        description: 'Model 12-month SEO/PPC retainer ROI against your customer value.',
        icon: TrendingUp,
        badge: 'ROI Modeling'
    },
    {
        slug: '/tools/client-response-generator',
        title: 'Client Response Email Drafter',
        description: 'Assertive, diplomatic templates for invoices, scope creep, and rate objections.',
        icon: Mail,
        badge: 'Email Drafter'
    },
    {
        slug: '/tools/admin-cost-calculator',
        title: 'Admin Cost & Labor Drag Calculator',
        description: 'Calculate burned monthly payroll lost to manual busywork.',
        icon: Calculator,
        badge: 'Labor Drag'
    },
    {
        slug: '/tools/saas-bloat-audit',
        title: 'SaaS Bloat & Subscription Audit',
        description: 'Uncover redundant software licenses and consolidation blueprints.',
        icon: Layers,
        badge: 'SaaS Audit'
    },
    {
        slug: '/tools/ai-cost-estimator',
        title: 'AI MVP Architecture & Cost Estimator',
        description: 'Interactive AI architect scoping production stack and budget.',
        icon: Bot,
        badge: 'AI Estimator'
    },
    {
        slug: '/tools/action-figure-generator',
        title: 'AI Action Figure Toy Box Studio',
        description: 'Generate blister pack action figures and Midjourney prompts.',
        icon: Wand2,
        badge: 'Creative AI'
    }
];

export default function RelatedTools({ currentSlug }: RelatedToolsProps) {
    const otherTools = ALL_TOOLS.filter(t => t.slug !== currentSlug).slice(0, 3);

    return (
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Explore Other Free Business & ROI Tools
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        High-leverage calculators and generators designed for US founders and growth teams.
                    </p>
                </div>
                <Link 
                    href="/tools" 
                    className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
                >
                    View all 6 free tools &rarr;
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={tool.slug}
                            href={tool.slug}
                            className="group p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                        {tool.badge}
                                    </span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 leading-snug">
                                    {tool.title}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                                <span>Launch Free Tool</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

