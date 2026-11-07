'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ToolLeadCaptureProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    ctaText?: string;
    toolSource?: string;
    reportSummary?: {
        headline: string;
        metrics?: Record<string, string | number>;
    };
    toolName?: string;
}

export default function ToolLeadCapture({
    title,
    subtitle,
    badge = "Free Action Plan",
    ctaText = "Email Me My Custom Report",
    toolSource,
    reportSummary,
    toolName
}: ToolLeadCaptureProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const finalTitle = title || (toolName ? `Request Your Free ${toolName}` : "Request Your Free Action Plan");
    const finalSubtitle = subtitle || "Discover exactly where your competitors outrank you and how our engineering pod can help you scale.";
    const finalToolSource = toolSource || (toolName ? toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : "general-lead-capture");
    const finalReportSummary = reportSummary || {
        headline: toolName || "Competitive Agency Audit",
        metrics: {
            "Audit Target": toolName || "Digital Agency Evaluation",
            "Date": new Date().toISOString().split('T')[0]
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            toast.error('Please provide both your name and email.');
            return;
        }

        setStatus('loading');

        try {
            const metricsText = finalReportSummary.metrics 
                ? Object.entries(finalReportSummary.metrics).map(([k, v]) => `${k}: ${v}`).join(' | ')
                : '';

            const payload = {
                name: name.trim(),
                email: email.trim(),
                companySize: company.trim() || 'Not specified',
                budget: finalReportSummary.headline,
                techStack: metricsText || finalToolSource,
                utm_source: finalToolSource,
                utm_medium: 'interactive_tool_lead_capture',
                utm_campaign: 'productivity_suite'
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const resData = await res.json().catch(() => ({}));
                if (resData.referenceId) {
                    setReferenceId(resData.referenceId);
                }
                setStatus('success');
                toast.success('Your report request has been received!');
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Failed to submit. Please try again.');
                setStatus('error');
            }
        } catch {
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
                {referenceId && (
                    <div className="inline-block bg-green-900/60 text-green-300 border border-green-700/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Ref: #{referenceId}
                    </div>
                )}
                <h3 className="text-xl font-bold text-white">Report Requested!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>! We’ve dispatched a confirmation to <span className="text-green-400">{email}</span>. Our Lead Architect is preparing your personalized breakdown.
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
                    {finalTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {finalSubtitle}
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
                        placeholder="e.g. acme.com"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting Request...
                            </>
                        ) : (
                            <>
                                <Mail className="w-3.5 h-3.5" /> {ctaText} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </>
                        )}
                    </button>
                </div>

                <p className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                    Zero spam guarantee. We analyze your scope and deliver an honest technical assessment within 24 hours.
                </p>
            </form>
        </div>
    );
}
