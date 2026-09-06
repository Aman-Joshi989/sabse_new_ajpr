'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Layers, 
    CheckSquare, 
    Square, 
    DollarSign, 
    ArrowRight, 
    TrendingDown, 
    AlertTriangle, 
    Sparkles, 
    CheckCircle 
} from 'lucide-react';
import ToolLeadCapture from '@/components/ToolLeadCapture';

interface ToolItem {
    id: string;
    name: string;
    category: string;
    avgCost: number; // in USD/mo
    replacedBy: string;
}

const SaaSList: ToolItem[] = [
    { id: 'hubspot', name: 'HubSpot / Salesforce CRM', category: 'Sales & CRM', avgCost: 150, replacedBy: 'Custom Client Database & Pipeline' },
    { id: 'zapier', name: 'Zapier / Make Automation', category: 'Integration', avgCost: 59, replacedBy: 'Native Webhook & Background Tasks' },
    { id: 'calendly', name: 'Calendly / Acuity Scheduling', category: 'Scheduling', avgCost: 20, replacedBy: 'Embedded Calendar & Booking Engine' },
    { id: 'typeform', name: 'Typeform / Formstack', category: 'Lead Forms', avgCost: 45, replacedBy: 'Interactive Multi-Step Lead Capture' },
    { id: 'airtable', name: 'Airtable / Monday.com', category: 'Internal Database', avgCost: 60, replacedBy: 'High-Performance PostgreSQL Portal' },
    { id: 'zendesk', name: 'Zendesk / Intercom Chat', category: 'Customer Support', avgCost: 95, replacedBy: 'Custom AI Assistant & Helpdesk' },
    { id: 'mailchimp', name: 'Mailchimp / Klaviyo', category: 'Email Outreach', avgCost: 85, replacedBy: 'Transactional Zepto/Resend Integration' },
    { id: 'clickup', name: 'ClickUp / Asana Tasks', category: 'Project Tracking', avgCost: 35, replacedBy: 'Minimalist Client Project Board' },
    { id: 'docusign', name: 'DocuSign / PandaDoc', category: 'Contracts', avgCost: 35, replacedBy: 'Automated Agreement Verification' },
    { id: 'quickbooks', name: 'QuickBooks / FreshBooks', category: 'Invoicing', avgCost: 45, replacedBy: 'Stripe/Razorpay Billing Webhooks' },
];

export default function SaasBloatAuditPage() {
    const [selectedTools, setSelectedTools] = useState<string[]>([
        'hubspot', 'zapier', 'calendly', 'typeform', 'airtable'
    ]);
    const [teamSeats, setTeamSeats] = useState<number>(3);

    const toggleTool = (id: string) => {
        setSelectedTools(prev => 
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const monthlyTotal = selectedTools.reduce((acc, toolId) => {
        const item = SaaSList.find(t => t.id === toolId);
        if (!item) return acc;
        // Assume seat scaling for CRM / Task tools
        const isSeatBased = ['hubspot', 'airtable', 'clickup', 'zendesk'].includes(item.id);
        const cost = isSeatBased ? item.avgCost * Math.max(1, teamSeats * 0.7) : item.avgCost;
        return acc + cost;
    }, 0);

    const roundedMonthly = Math.round(monthlyTotal);
    const roundedAnnual = Math.round(roundedMonthly * 12);
    const estimatedWasted = Math.round(roundedAnnual * 0.51); // 51% industry waste

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'SaaS Bloat & Redundant Subscription Cost Auditor',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'description': 'Audit paid SaaS licenses, uncover annual wasted capital, and see software consolidation recommendations.',
        'url': 'https://ajprworld.com/tools/saas-bloat-audit'
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-5xl mx-auto">
                
                {/* Top Breadcrumb */}
                <div className="mb-8 flex items-center justify-between">
                    <Link 
                        href="/tools" 
                        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    >
                        &larr; All Free Tools
                    </Link>
                    <span className="px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-full text-xs font-bold uppercase tracking-wider">
                        Solves Problem #3: SaaS Bloat
                    </span>
                </div>

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-widest mb-4">
                        <Layers className="w-3.5 h-3.5" /> Stop Paying $1,500/Month for Broken Integrations
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        SaaS Bloat & Subscription Cost Auditor
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        51% of paid SaaS licenses go completely unused in US businesses. Check the software subscriptions your team currently pays for to uncover your annual wasted capital and see the consolidation blueprint.
                    </p>
                </div>

                {/* Main Audit Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Interactive Checklist */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Select Your Active Software Subscriptions
                            </h2>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                {selectedTools.length} tools selected
                            </span>
                        </div>

                        {/* Team Seats Selector */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Active Team Seats</p>
                                <p className="text-[11px] text-slate-400">Multiplies per-seat software licenses</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {[1, 3, 5, 10].map(seat => (
                                    <button
                                        key={seat}
                                        onClick={() => setTeamSeats(seat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                            teamSeats === seat 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                                        }`}
                                    >
                                        {seat} {seat === 1 ? 'user' : 'users'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Checklist items */}
                        <div className="space-y-2.5">
                            {SaaSList.map(tool => {
                                const isChecked = selectedTools.includes(tool.id);
                                return (
                                    <div
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                            isChecked 
                                                ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 text-slate-900 dark:text-white shadow-sm' 
                                                : 'bg-slate-50/40 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isChecked ? (
                                                <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" />
                                            ) : (
                                                <Square className="w-5 h-5 text-slate-400 shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-sm font-bold leading-snug">{tool.name}</p>
                                                <p className="text-[11px] text-slate-400">{tool.category}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                                            ~${tool.avgCost}/mo
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Results & Consolidation Blueprint */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Financial Burn Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Total Software Burn
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly SaaS Bill:</span>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                                        ${roundedMonthly.toLocaleString()} / mo
                                    </span>
                                </div>

                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex justify-between items-center">
                                    <div>
                                        <span className="text-xs text-red-600 dark:text-red-400 font-bold">Annual Software Spend:</span>
                                        <p className="text-[10px] text-red-500">Includes recurring per-seat fees</p>
                                    </div>
                                    <span className="text-2xl font-black text-red-700 dark:text-red-300 font-mono">
                                        ${roundedAnnual.toLocaleString()} / yr
                                    </span>
                                </div>

                                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Estimated Wasted Spend (51% Rule):</span>
                                    </div>
                                    <p className="text-xl font-extrabold text-amber-700 dark:text-amber-300 font-mono">
                                        ~${estimatedWasted.toLocaleString()} / year
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Spent on unused features, broken Zapier syncs, and redundant data storage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Direct Lead Capture Form */}
                        <ToolLeadCapture
                            title="Get Your 1-Page Consolidation Blueprint"
                            subtitle={`You are spending ~$${roundedAnnual.toLocaleString()}/yr on ${selectedTools.length} separate tools, with an estimated ~$${estimatedWasted.toLocaleString()} wasted on unused licenses. We'll send you a custom architecture blueprint showing how to replace them with a unified portal.`}
                            badge="Software Audit Blueprint"
                            ctaText="Email Me My Consolidation Blueprint"
                            toolSource="saas_bloat_audit"
                            reportSummary={{
                                headline: `Annual SaaS Spend: $${roundedAnnual.toLocaleString()} (${selectedTools.length} tools, ~${teamSeats} seats)`,
                                metrics: {
                                    'Selected Tools': selectedTools.join(', '),
                                    'Monthly Spend': `$${roundedMonthly}`,
                                    'Estimated Wasted Spend': `$${estimatedWasted}/yr`,
                                    'Team Seats': teamSeats
                                }
                            }}
                        />

                        {/* Consolidation Pitch */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" /> The Unified Alternative
                            </span>
                            <h4 className="font-bold text-xl text-white tracking-tight">
                                Consolidate into One Custom Platform
                            </h4>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                Instead of juggling {selectedTools.length} separate monthly tools with fragile integrations, AJPR World builds you a **single, unified Next.js + PostgreSQL web application** that handles your CRM, client portal, and automated scheduling with $0 monthly licensing fees.
                            </p>
                            <div className="pt-2">
                                <Link 
                                    href="/book-call" 
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-blue-600/30"
                                >
                                    Get a Software Consolidation Quote <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
