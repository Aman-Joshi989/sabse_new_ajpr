'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Calculator, 
    Clock, 
    DollarSign, 
    Sparkles, 
    ArrowRight, 
    ShieldAlert, 
    CheckCircle2, 
    Users,
    TrendingDown,
    Zap
} from 'lucide-react';
import ToolLeadCapture from '@/components/ToolLeadCapture';
import RelatedTools from '@/components/RelatedTools';

export default function AdminCostCalculatorPage() {
    const [emailHours, setEmailHours] = useState<number>(10);
    const [bookkeepingHours, setBookkeepingHours] = useState<number>(4);
    const [dataEntryHours, setDataEntryHours] = useState<number>(6);
    const [hourlyRate, setHourlyRate] = useState<number>(65);
    const [teamSize, setTeamSize] = useState<number>(1);

    // Total calculations
    const weeklyHoursPerPerson = emailHours + bookkeepingHours + dataEntryHours;
    const totalWeeklyHours = weeklyHoursPerPerson * teamSize;
    const totalMonthlyHours = totalWeeklyHours * 4.33;
    const totalAnnualHours = totalWeeklyHours * 52;

    const monthlyCost = Math.round(totalMonthlyHours * hourlyRate);
    const annualCost = Math.round(totalAnnualHours * hourlyRate);

    // Automation estimates (assuming 75% of administrative tasks are automated)
    const annualHoursSaved = Math.round(totalAnnualHours * 0.75);
    const annualMoneySaved = Math.round(annualCost * 0.75);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Business Admin Cost & Automation ROI Calculator',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'description': 'Calculate monthly burned payroll on administrative busywork and see your return on autonomous AI workflows.',
        'url': 'https://ajprworld.com/tools/admin-cost-calculator'
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
                    <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 rounded-full text-xs font-bold uppercase tracking-wider">
                        Operational Efficiency Audit
                    </span>
                </div>

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
                        <DollarSign className="w-3.5 h-3.5" /> Stop Burning Billable Hours on Maintenance
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        Business Admin Cost & Automation ROI Calculator
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        The average business owner and engineering lead loses up to 40% of their productive capacity to repetitive operational busywork. Calculate your exact annual capital drag below and discover how much you save with automated systems.
                    </p>
                </div>

                {/* Calculator Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Input Sliders */}
                    <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <Calculator className="w-5 h-5 text-blue-600" />
                            Input Your Weekly Admin Burden
                        </h2>

                        {/* Slider 1: Email Hours */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Email & Client Inquiry Triage
                                </label>
                                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                    {emailHours} hrs/wk
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="30" 
                                value={emailHours} 
                                onChange={(e) => setEmailHours(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <p className="text-[11px] text-slate-400">US benchmark: 11.2 hours/week spent on inbox management.</p>
                        </div>

                        {/* Slider 2: Invoicing / Bookkeeping */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Invoicing, Receipts & Bookkeeping
                                </label>
                                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                    {bookkeepingHours} hrs/wk
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="20" 
                                value={bookkeepingHours} 
                                onChange={(e) => setBookkeepingHours(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <p className="text-[11px] text-slate-400">Chasing payments, creating estimates, reconciling bank statements.</p>
                        </div>

                        {/* Slider 3: Manual Data Entry */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Manual Data Entry & Tool Syncing
                                </label>
                                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                    {dataEntryHours} hrs/wk
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="25" 
                                value={dataEntryHours} 
                                onChange={(e) => setDataEntryHours(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <p className="text-[11px] text-slate-400">Updating CRMs, spreadsheets, Notion, and sending manual status updates.</p>
                        </div>

                        {/* Slider 4: Hourly Billable Value */}
                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center text-sm">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Hourly Rate / Opportunity Value
                                </label>
                                <span className="font-mono font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                                    ${hourlyRate}/hr
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="20" 
                                max="250" 
                                step="5"
                                value={hourlyRate} 
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                            <p className="text-[11px] text-slate-400">What your time is worth when doing high-leverage client work or sales.</p>
                        </div>

                        {/* Slider 5: Team Size */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Team Members Suffering This Drag
                                </label>
                                <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                                    {teamSize} {teamSize === 1 ? 'person' : 'people'}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="15" 
                                value={teamSize} 
                                onChange={(e) => setTeamSize(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>

                    {/* Right: Results Display */}
                    <div className="lg:col-span-6 space-y-6">
                        
                        {/* Primary Impact Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Your Current Operational Drag
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                                    <p className="text-xs font-semibold text-red-600 dark:text-red-400">Monthly Burned Payroll</p>
                                    <p className="text-2xl sm:text-3xl font-black text-red-700 dark:text-red-300 mt-1 font-mono">
                                        ${monthlyCost.toLocaleString()}
                                    </p>
                                    <p className="text-[11px] text-red-500 dark:text-red-400/80 mt-1">Paid just for maintenance</p>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Annual Hours Lost</p>
                                    <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                                        {totalAnnualHours.toLocaleString()} hrs
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">Lost to context-switching</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1 text-center">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Annual Hidden Cost of Busywork:</span>
                                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                                    ${annualCost.toLocaleString()} / year
                                </p>
                            </div>

                            {/* Potential Savings Banner */}
                            <div className="p-5 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 space-y-2">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm">
                                    <Zap className="w-4 h-4 text-green-600 fill-green-600" />
                                    <span>With AJPR World Autonomous Workflows:</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Reclaim Every Year:</p>
                                        <p className="text-lg font-bold text-green-700 dark:text-green-300 font-mono">
                                            {annualHoursSaved.toLocaleString()} hours
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Capital Recaptured:</p>
                                        <p className="text-lg font-bold text-green-700 dark:text-green-300 font-mono">
                                            ${annualMoneySaved.toLocaleString()} / yr
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Lead Capture Form */}
                        <ToolLeadCapture
                            title="Get Your Custom Automation Action Plan"
                            subtitle={`Save an estimated ${annualHoursSaved.toLocaleString()} hours and $${annualMoneySaved.toLocaleString()} every year. We'll email you a 1-page roadmap detailing the exact automations to deploy first.`}
                            badge="Personalized Action Plan"
                            ctaText="Email Me My Automation Plan"
                            toolSource="admin_cost_calculator"
                            reportSummary={{
                                headline: `Annual Admin Drag: $${annualCost.toLocaleString()} (${totalAnnualHours} hrs/yr)`,
                                metrics: {
                                    'Weekly Hours Lost': totalWeeklyHours,
                                    'Monthly Cost': `$${monthlyCost}`,
                                    'Annual Savings Potential': `$${annualMoneySaved}`,
                                    'Team Size': teamSize
                                }
                            }}
                        />

                        {/* CTA Box */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl space-y-4">
                            <h4 className="font-bold text-lg text-white">
                                Ready to recapture {weeklyHoursPerPerson * teamSize} hours every week?
                            </h4>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                We engineer custom automated pipelines—from AI invoice parsing and automated onboarding to custom client dashboards—saving founders hundreds of hours.
                            </p>
                            <Link 
                                href="/book-call" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-blue-600/30"
                            >
                                Book a Free 15-Min Automation Audit <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                    </div>
                </div>

                <RelatedTools currentSlug="/tools/admin-cost-calculator" />

            </div>
        </div>
    );
}
