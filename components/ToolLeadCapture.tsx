'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ToolLeadCaptureProps {
    title: string;
    subtitle: string;
    badge?: string;
    ctaText?: string;
    toolSource: string;
    reportSummary: {
        headline: string;
        metrics?: Record<string, string | number>;
    };
}

export default function ToolLeadCapture({
    title,
    subtitle,
    badge = "Free Action Plan",
    ctaText = "Email Me My Custom Report",
    toolSource,
    reportSummary
}: ToolLeadCaptureProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            toast.error('Please provide both your name and email.');
            return;
        }

        setStatus('loading');

        try {
            const metricsText = reportSummary.metrics 
                ? Object.entries(reportSummary.metrics).map(([k, v]) => `${k}: ${v}`).join(' | ')
                : '';

            const payload = {
                name: name.trim(),
                email: email.trim(),
                companySize: company.trim() || 'Not specified',
                budget: reportSummary.headline,
                techStack: metricsText || toolSource,
                utm_source: toolSource,
                utm_medium: 'interactive_tool_lead_capture',
                utm_campaign: 'productivity_suite'
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus('success');
                toast.success('Your report request has been received!');
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Failed to submit. Please try again.');
                setStatus('error');
            }
        } catch (err) {
            toast.error('A network error occurred. Please try again.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-950/40 via-slate-900 to-slate-950 border border-green-800/60 text-white text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/30">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Report Requested!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>! We’ve logged your audit details for <span className="text-green-400">{email}</span>. Our Lead Architect is preparing your personalized breakdown.
                </p>
                <div className="pt-2">
                    <a
                        href="/book-call"
                        className="inline-flex items-center gap-2 text-xs font-bold text-green-400 hover:text-green-300 underline"
                    >
                        Want to skip the wait? Book a 15-min discovery call &rarr;
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="space-y-4 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-blue-500" /> {badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Your Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Alex Miller"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Work Email *
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Company Name or Website (Optional)
                    </label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Media or acme.com"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-2 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Preparing Report...
                        </>
                    ) : (
                        <>
                            {ctaText} <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>

                <p className="text-[10px] text-center text-slate-400 mt-2">
                    🔒 Zero spam. We send your custom breakdown directly to your inbox.
                </p>
            </form>
        </div>
    );
}
