'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Mail, 
    Copy, 
    Check, 
    Sparkles, 
    ArrowRight, 
    Clock, 
    ShieldCheck, 
    RotateCcw,
    Send,
    HelpCircle,
    ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import RelatedTools from '@/components/RelatedTools';
import ToolLeadCapture from '@/components/ToolLeadCapture';
import { trackBookCall } from '@/lib/analytics';

type ScenarioKey = 
    | 'scope-creep'
    | 'late-invoice'
    | 'price-objection'
    | 'decline-low-budget'
    | 'project-delay'
    | 'asking-for-review';

type ToneKey = 'assertive' | 'diplomatic' | 'executive' | 'friendly';

interface ScenarioData {
    title: string;
    description: string;
    templates: Record<ToneKey, string>;
}

const scenarios: Record<ScenarioKey, ScenarioData> = {
    'scope-creep': {
        title: 'Scope Creep Pushback',
        description: 'Client is asking for additional features or work outside the agreed contract.',
        templates: {
            assertive: `Hi [Client Name],

Thanks for sending this over. This new request ([specific feature/request]) falls outside the agreed scope for our current sprint and contract.

I'd be happy to build this for you. We have two clean options:
1. We can add this to the backlog for Phase 2 once the current milestone launches.
2. We can draft a quick change order for $[Amount] and extend the delivery target by [X days].

Let me know which option works best so we keep the current release on schedule.

Best,
[Your Name]`,
            diplomatic: `Hi [Client Name],

Thank you for sharing this idea! It's a great addition that would definitely improve the platform.

Reviewing our current project roadmap, this feature isn't part of our active milestone agreement. To ensure we deliver the current deliverables on time and with high quality, would you prefer we quote this as an add-on sprint, or prioritize it right after our planned launch?

Looking forward to your thoughts!

Best regards,
[Your Name]`,
            executive: `[Client Name] — 

Got the request for [feature]. 

This is outside the active scope. I can quote this as a change order (estimated $[Amount], +[X] days), or queue it up for the post-launch phase so we hit our current delivery deadline. 

Let me know your preference.

Best,
[Your Name]`,
            friendly: `Hey [Client Name],

Hope you're having a great week! I love the concept behind [feature].

Since our current focus is nailing the core launch agreed in our initial spec, this falls outside our current scope. How about we get the current version across the finish line first, and I'll put together a quick proposal to roll this out immediately after?

Cheers,
[Your Name]`
        }
    },
    'late-invoice': {
        title: 'Overdue Invoice Follow-Up',
        description: 'Client has an unpaid invoice past the agreed payment terms (Net 15/30).',
        templates: {
            assertive: `Hi [Client Name],

This is a follow-up regarding invoice #[Number] for $[Amount], which was due on [Due Date] and is now [X] days overdue.

Per our service agreement, please ensure payment is remitted by end-of-day tomorrow to avoid any suspension of ongoing development work and deployment pipelines.

You can complete the payment directly using this link: [Payment Link].

Please confirm once processed.

Best,
[Your Name]`,
            diplomatic: `Hi [Client Name],

I hope all is well with you.

I'm checking in regarding invoice #[Number] for $[Amount], which had a due date of [Due Date]. I understand accounts payable can occasionally get delayed, so I wanted to bring this to your attention in case it slipped through.

A copy of the invoice is attached for your records. Please let me know if you need any additional billing details from my side to get this scheduled.

Thank you,
[Your Name]`,
            executive: `[Client Name] — 

Invoice #[Number] ($[Amount]) is now past due (Due: [Due Date]). 

Please remit payment today via [Payment Link] or let me know the scheduled payment batch date so we maintain continuous project delivery.

Thanks,
[Your Name]`,
            friendly: `Hey [Client Name],

Just floating this to the top of your inbox! Invoice #[Number] for $[Amount] was due on [Due Date]. 

Here's the quick pay link: [Payment Link].

Let me know if you have any questions or need anything else from our end!

Thanks so much,
[Your Name]`
        }
    },
    'price-objection': {
        title: 'Defending Agency & Dev Rates',
        description: 'Prospect asks for a discount or claims another contractor is cheaper.',
        templates: {
            assertive: `Hi [Prospect Name],

Thanks for the transparency. Our pricing reflects direct senior systems architecture, zero technical debt, and production-grade software delivered in 2–4 weeks.

While there are certainly cheaper offshore freelancers or low-code options, our clients partner with us to avoid having to rebuild broken software six months down the line.

Our rate is firm at $[Price/Rate]. If budget is the primary constraint right now, we can trim non-essential features from the MVP to hit your target budget of $[Target Budget].

Let me know if you'd like to adjust the feature scope.

Best,
[Your Name]`,
            diplomatic: `Hi [Prospect Name],

I completely understand the need to manage capital closely at this stage.

Our pricing is based on delivering enterprise-level reliability, dedicated senior oversight, and a predictable timeline. We focus on building scalable systems right the first time, which ultimately saves our clients thousands in refactoring costs.

If we need to align with a specific budget, I'd be glad to recommend which secondary features we can postpone for v2 while still delivering a high-converting, robust v1.

Would that work for your team?

Best regards,
[Your Name]`,
            executive: `[Prospect Name] — 

Understood. Our $[Price] pricing is fixed because it guarantees senior engineering, reliable delivery, and production scalability without cutting corners.

We can't discount our rate, but we can reduce scope to fit your $[Target] budget if you want to launch lean. 

Let me know if you want to review a scaled-down scope.

Best,
[Your Name]`,
            friendly: `Hey [Prospect Name],

Totally get where you're coming from—cash flow is king, especially when launching new initiatives!

We don't compete on being the cheapest because we guarantee clean architecture, strict timelines, and direct senior engineering that doesn't break at scale. 

If you'd like, I can help you pare down the wishlist so we hit your target budget without sacrificing core quality. Happy to hop on a quick 10-minute call to map that out!

Cheers,
[Your Name]`
        }
    },
    'decline-low-budget': {
        title: 'Declining Low-Budget Inquiries',
        description: 'Politely declining a lead whose budget is below your minimum engagement fee.',
        templates: {
            assertive: `Hi [Name],

Thank you for reaching out with details about your project.

Based on the requirements you've shared, this is below our minimum project engagement threshold of $[Minimum Fee]. To maintain the high quality and dedicated attention we provide each client, we are unable to take on projects below this level.

I recommend looking into platforms like Upwork or using a no-code starter template which might better match your current capital allocation.

Wishing you great success with the launch.

Best,
[Your Name]`,
            diplomatic: `Hi [Name],

Thank you for considering us for your project! It sounds like an exciting vision.

Our current project minimum starts at $[Minimum Fee] to ensure we can provide full architectural planning, high-velocity engineering, and dedicated post-launch support. Because of this, we won't be the right fit for your current budget.

I would suggest checking specialized founder communities or no-code alternatives as a great way to bootstrap the first iteration.

Best of luck with the build!

Warm regards,
[Your Name]`,
            executive: `[Name] — 

Thanks for reaching out. 

Our minimum engagement size is $[Minimum Fee]. Given your current budget constraints, we won't be able to partner on this build. 

Wishing you the best on your launch.

Best,
[Your Name]`,
            friendly: `Hey [Name],

Thanks so much for thinking of us for your project! 

Right now, our team focuses strictly on builds starting at $[Minimum Fee] to give each client our full engineering bandwidth. As much as I'd love to help, we aren't going to be the most cost-effective option for you right now.

I hope you find the right developer to get this off the ground, and please feel free to reach back out when you're ready to scale v2!

All the best,
[Your Name]`
        }
    },
    'project-delay': {
        title: 'Communicating a Realistic Timeline Shift',
        description: 'Delivering honest, professional updates when technical discovery requires a timeline adjustment.',
        templates: {
            assertive: `Hi [Client Name],

I am writing with an important update regarding our deployment milestone for [Project Name].

During our integration testing, we identified a critical edge case in [specific area: e.g., auth security/database sync]. Rather than rushing a fragile build to production, we are taking an extra [X days] to properly harden the system.

Our revised production release date is now [New Date].

All other deliverables remain on schedule, and you can test the staging preview here: [Staging URL].

Best,
[Your Name]`,
            diplomatic: `Hi [Client Name],

I wanted to provide a quick transparency update on our development progress.

Our team has completed [major milestone], but we uncovered an architectural optimization in [area] that requires a bit more care to ensure long-term stability under heavy load. To ensure you receive a bulletproof platform, we are moving the launch target to [New Date].

We want to make sure your users have a flawless day-one experience. Thank you for your partnership, and I'll share another progress report on [Day].

Best regards,
[Your Name]`,
            executive: `[Client Name] — 

Update on [Project]: Staging is 90% ready, but we are taking an extra [X days] to resolve an edge case in [Area]. 

Revised release date: [New Date]. Staging link for review: [URL]. 

Will update you on [Day].

Best,
[Your Name]`,
            friendly: `Hey [Client Name],

Quick heads up on the build! Everything is looking fantastic on the staging server, but we caught an issue in [Area] that we want to polish before letting real users touch it.

We're shifting our target launch date by [X days] to [New Date] so we don't compromise on speed or reliability. You can check out the latest build in the staging environment anytime!

Thanks for understanding, and I'll keep you posted!

Cheers,
[Your Name]`
        }
    },
    'asking-for-review': {
        title: 'Asking for a Review / Testimonial',
        description: 'Post-launch request to get a high-converting testimonial or Google/LinkedIn review.',
        templates: {
            assertive: `Hi [Client Name],

Now that [Project Name] has successfully launched and is performing smoothly in production, could you take 60 seconds to leave a brief review?

Social proof is essential for our business, and a sentence or two about your experience with our engineering speed and communication would mean a great deal.

Here is the direct link: [Review Link].

Thank you for your partnership!

Best,
[Your Name]`,
            diplomatic: `Hi [Client Name],

It's been an absolute pleasure collaborating with you on [Project Name]! I'm thrilled to see the positive reception it's already getting.

If you've enjoyed working together, would you be open to writing a short testimonial that we could feature on our site? A quick sentence on how we helped you overcome [Client Pain Point] would be hugely valuable.

You can submit it directly here: [Review Link].

Thank you again for trusting us with your build!

Warm regards,
[Your Name]`,
            executive: `[Client Name] — 

Glad to see [Project] live and running smoothly. 

Could you drop a quick 1-sentence review here: [Review Link]? Would appreciate the feedback.

Thanks,
[Your Name]`,
            friendly: `Hey [Client Name]!

So exciting to see [Project Name] officially out in the wild! 🚀

Quick favor: if you're happy with how the build turned out, could you leave us a quick review? It takes under a minute and really helps a boutique engineering team like ours.

Here's the link: [Review Link].

Thanks a ton, and let me know how the user feedback is rolling in!

Cheers,
[Your Name]`
        }
    }
};

export default function ClientResponseGeneratorPage() {
    const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('scope-creep');
    const [selectedTone, setSelectedTone] = useState<ToneKey>('assertive');
    const [customDetails, setCustomDetails] = useState('');
    const [copied, setCopied] = useState(false);

    const activeTemplate = scenarios[selectedScenario].templates[selectedTone];

    // Replace placeholders if customDetails is provided
    const displayText = customDetails 
        ? activeTemplate.replace(/\[specific feature\/request\]|\[feature\]|\[Amount\]|\[X days\]/g, customDetails)
        : activeTemplate;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(displayText);
            setCopied(true);
            toast.success('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy to clipboard.');
        }
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Client Response & Difficult Email Generator',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'description': 'Draft professional client responses for scope creep, late invoices, rate objections, and project delays in seconds.',
        'url': 'https://ajprworld.com/tools/client-response-generator'
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-5xl mx-auto">
                
                {/* Header Breadcrumbs */}
                <div className="mb-8 flex items-center justify-between">
                    <Link 
                        href="/tools" 
                        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    >
                        &larr; All Free Tools
                    </Link>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 rounded-full text-xs font-bold uppercase tracking-wider">
                        Solves Problem #1: The Admin Drag
                    </span>
                </div>

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> Stop Spending 11 Hours/Week on Emails
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        Instant Client Response & Difficult Email Drafter
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        The average US professional loses 28% of their workweek to inbox friction. Select your awkward client scenario below, choose your tone, and get a battle-tested professional response in 2 seconds.
                    </p>
                </div>

                {/* Main Generator Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Panel: Scenario & Tone Selector */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* 1. Scenarios */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                1. Select Awkward Situation
                            </h2>
                            <div className="space-y-2">
                                {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
                                    const isSelected = selectedScenario === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedScenario(key)}
                                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-sm font-semibold ${
                                                isSelected 
                                                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 shadow-sm' 
                                                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                                            }`}
                                        >
                                            <span>{scenarios[key].title}</span>
                                            <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Tone Selector */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                2. Pick Your Tone
                            </h2>
                            <div className="grid grid-cols-2 gap-2.5">
                                {[
                                    { key: 'assertive', label: 'Firm & Assertive', desc: 'No apologies, boundary-setting' },
                                    { key: 'diplomatic', label: 'Diplomatic', desc: 'Polite, client-retention focus' },
                                    { key: 'executive', label: 'Executive Brief', desc: '3 sentences max, ultra-concise' },
                                    { key: 'friendly', label: 'Friendly & Warm', desc: 'Casual, positive collaboration' }
                                ].map((tone) => {
                                    const isSelected = selectedTone === tone.key;
                                    return (
                                        <button
                                            key={tone.key}
                                            onClick={() => setSelectedTone(tone.key as ToneKey)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                isSelected
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                        >
                                            <p className="text-xs font-bold leading-tight">{tone.label}</p>
                                            <p className={`text-[10px] mt-1 leading-snug ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                                {tone.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Optional Quick Fill */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Quick Details (Optional)
                            </label>
                            <input
                                type="text"
                                value={customDetails}
                                onChange={(e) => setCustomDetails(e.target.value)}
                                placeholder="e.g. mobile responsiveness, $1,500, 3 days"
                                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <p className="text-[11px] text-slate-400">
                                Tip: Type a feature, dollar amount, or timeframe to auto-populate the email.
                            </p>
                        </div>
                    </div>

                    {/* Right Panel: Output & Instant Copy */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            Generated Response
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {scenarios[selectedScenario].title} &bull; <span className="capitalize">{selectedTone}</span> tone
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                            copied 
                                                ? 'bg-green-600 text-white shadow-md' 
                                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                                        }`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" /> Copy Email
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200 selection:bg-blue-200 dark:selection:bg-blue-900">
                                    {displayText}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                                <span>Word Count: ~{displayText.split(/\s+/).length} words</span>
                                <span>Estimated Reading Time: 20 seconds</span>
                            </div>
                        </div>

                        {/* Frictionless Email Capture */}
                        <ToolLeadCapture
                            title="Email Me the Complete Agency Client Response Playbook"
                            subtitle="Get all 24 production-tested email templates, scope defense scripts, and price objection frameworks sent directly to your inbox."
                            badge="Full 24-Template Playbook"
                            ctaText="Send Me All 24 Email Scripts"
                            toolSource="client_response_generator"
                            reportSummary={{
                                headline: `Scenario: ${scenarios[selectedScenario].title} (${selectedTone} tone)`,
                                metrics: {
                                    'Selected Scenario': scenarios[selectedScenario].title,
                                    'Tone Style': selectedTone,
                                    'Custom Details': customDetails || 'Standard template'
                                }
                            }}
                        />

                        {/* Conversion Box */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10 space-y-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Full Automation Alternative
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                    Want to stop drafting emails manually altogether?
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                                    We build custom AI customer triage agents that read inbound requests, draft responses in your exact brand tone, and sync directly with your CRM.
                                </p>
                                <div className="pt-2">
                                    <Link 
                                        href="/book-call" 
                                        onClick={() => trackBookCall('tool_client_response_gen')}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-blue-600/30"
                                    >
                                        Build an AI Inbox Agent <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <RelatedTools currentSlug="/tools/client-response-generator" />

            </div>
        </div>
    );
}
