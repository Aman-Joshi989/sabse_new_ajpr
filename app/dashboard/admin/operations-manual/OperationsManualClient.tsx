"use client";

import { useState } from 'react';
import { 
  BookOpen, CheckSquare, Send, PhoneCall, BarChart, 
  Copy, Check, AlertCircle, Clock, ShieldCheck, FileText, 
  ExternalLink, ChevronRight, Sparkles, MessageSquare, Target
} from 'lucide-react';

export default function OperationsManualClient() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'publishing' | 'templates' | 'leads' | 'kpis'>('checklist');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Checkbox states for interactive daily tasks
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (id: string) => {
    setCheckedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const emailTemplates = [
    {
      key: 'digital-pr-study',
      title: '1. Digital PR Pitch (US Agency Pricing Report)',
      subject: 'Data: Real US Agency Retainers & Hourly Rates (Study of 200+ Agencies)',
      body: `Hi [First Name],

I noticed your recent coverage of marketing agency economics and wanted to share fresh benchmark data that might be useful for your readers.

We analyzed 214 US digital marketing agencies across 25 states and published the 2026 US Agency Pricing Transparency Report:
- Median SEO retainer: $3,450/month (ranges from $1,500 to $12,000/mo)
- Median PPC fee: $2,800/month or 12%-15% of ad spend
- Median hourly billing rate: $175/hour
- 62% of legacy agencies still enforce 12-month lock-in contracts

You can view the full methodology, data breakdowns, and embeddable charts here:
https://ajprworld.com/research/agency-pricing-report

You are completely welcome to cite the figures or embed the charts freely. Let me know if you’d like custom commentary from our CEO, Aman Joshi, or segmented data for a specific vertical.

Best regards,
[Staff Name]
AJPR World Research Lab
ajprworld.com`
    },
    {
      key: 'haro-journalist',
      title: '2. HARO / Qwoted Journalist Source Response',
      subject: 'Source Response: [Query Title] — AJPR World CEO',
      body: `Hi [Journalist Name],

Responding to your query regarding [topic of query]. Here is insight from Aman Joshi, Founder & CEO of AJPR World (a full-service digital marketing and engineering agency):

Quote:
"[Insert 2-3 concise, punchy sentences answering the exact question with concrete numbers or a contrarian perspective. E.g.: 'Many founders believe organic traffic is dropping due to AI search, but in reality, high-intent conversational queries in ChatGPT are converting 3.4x higher than standard organic clicks when entity schema is correctly aligned.']"

Bio:
Aman Joshi is the Founder and CEO of AJPR World (ajprworld.com), an enterprise digital growth and technology agency helping US startups and mid-market brands scale organic pipeline.

Headshot and website: https://ajprworld.com/aman-joshi

Feel free to use these quotes directly or reach back out if you need additional data!

Best,
[Staff Name]`
    },
    {
      key: 'client-review-request',
      title: '3. Client Offboarding / Review Request (Clutch & Google)',
      subject: 'Quick question regarding your experience with AJPR World',
      body: `Hi [Client Name],

It has been a pleasure working alongside you and the team on [Project / Campaign Name] over the past few months. Seeing your pipeline grow by [X% / metric achieved] has been a huge milestone for us.

Could you take 90 seconds to share your feedback on our work? Reviews are the lifeblood of our agency and directly help other founders find us:

1. Clutch Review Link: [Insert Clutch Review URL]
2. Google Business Profile Review Link: [Insert Direct Google Review URL]

Even 2 or 3 sentences highlighting the results and our communication style would mean the world to our team.

Thank you again for your trust and partnership!

Warm regards,
[Staff Name]
AJPR World`
    },
    {
      key: 'local-citation-pitch',
      title: '4. Local Chamber / Association Partnership Outreach',
      subject: 'Member inquiry / Local business listing for AJPR World ([City])',
      body: `Hi [Contact Name],

I am reaching out on behalf of AJPR World. We provide digital growth, web design, and search marketing services to businesses across [City Name] and the greater [Metro Region].

We are looking to expand our community involvement and would like to inquire about:
1. Being listed in your official member business directory
2. Contributing a complimentary digital marketing / local SEO workshop or guide for your members

Could you point me to the right person or provide the membership verification details?

Thank you,
[Staff Name]
AJPR World
ajprworld.com`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Staff Playbook & Standard Operating Procedures
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              SEO Operations & Execution Manual
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Step-by-step instructions for our staff to execute the SEO Attack Plan, manage incoming leads, publish content, and conduct outreach without chaos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/research/agency-pricing-report"
              target="_blank"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              View Research Report <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/pricing/seo-cost"
              target="_blank"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center gap-1.5"
            >
              View Pricing Guide <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#DADCE0] dark:border-[#3C4043]">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> Daily & Weekly Checklist
          </button>
          <button
            onClick={() => setActiveTab('publishing')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'publishing'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" /> 9-Point On-Page Publishing SOP
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'templates'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Send className="w-4 h-4" /> 1-Click Outreach Templates
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <PhoneCall className="w-4 h-4" /> 15-Min Lead Intake & Pricing SLA
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'kpis'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BarChart className="w-4 h-4" /> KPI Scorecard & Audit Schedule
          </button>
        </div>
      </div>

      {/* TAB 1: DAILY & WEEKLY CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Morning Rhythm */}
          <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
              <Clock className="w-4 h-4 text-blue-600" />
              Daily Morning Staff Rhythm (Completed by 10:00 AM)
            </div>
            <div className="space-y-3 text-xs">
              {[
                { id: 'd1', label: 'Check CRM (Leads) & Contact Submissions for inbound pricing requests.' },
                { id: 'd2', label: 'Check HARO / Qwoted / Featured queries for agency & marketing quotes.' },
                { id: 'd3', label: 'Monitor Google Search Console for any 404 crawl errors or indexation warnings.' },
                { id: 'd4', label: 'Follow up on open proposals sent within the last 48 hours.' },
                { id: 'd5', label: 'Review any client review submissions on Google Business Profile or Clutch.' }
              ].map(t => (
                <label key={t.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={!!checkedTasks[t.id]}
                    onChange={() => toggleTask(t.id)}
                    className="mt-0.5 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className={`${checkedTasks[t.id] ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Weekly Cadence */}
          <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Weekly Execution Rhythm (Every Friday Review)
            </div>
            <div className="space-y-3 text-xs">
              {[
                { id: 'w1', label: 'Send 25 Digital PR pitches for the 2026 Agency Pricing Report to journalists.' },
                { id: 'w2', label: 'Publish or update 2-3 target cluster pages (city, industry, or evergreen).' },
                { id: 'w3', label: 'Submit offboarding clients for Clutch & Google Business Profile reviews.' },
                { id: 'w4', label: 'Submit local citation & directory listing requests for 2 priority US metros.' },
                { id: 'w5', label: 'Log weekly cluster ranking movements and referring domains in the KPI sheet.' }
              ].map(t => (
                <label key={t.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={!!checkedTasks[t.id]}
                    onChange={() => toggleTask(t.id)}
                    className="mt-0.5 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className={`${checkedTasks[t.id] ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 9-POINT ON-PAGE PUBLISHING SOP */}
      {activeTab === 'publishing' && (
        <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              The 9-Point On-Page SEO Standard Operating Procedure
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Every single landing page, city page, industry page, or blog post MUST satisfy these 9 criteria before being pushed to production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">1. Title Tag (&lt; 60 Chars)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Formula: <code className="text-slate-900 dark:text-white font-mono">[Primary Keyword] | [Differentiator] — AJPR</code>
                <br />Primary keyword MUST come first. Strictly under 60 characters to prevent SERP truncation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">2. Meta Description (145-158 Chars)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Must lead with a concrete number, proof point, or price range. Must include target keyword naturally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">3. Single H1 Tag</span>
              <p className="text-slate-600 dark:text-slate-400">
                State primary keyword naturally exactly ONCE. Never use multiple H1s on a single page.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">4. First 100 Words Rule</span>
              <p className="text-slate-600 dark:text-slate-400">
                State the target keyword + the specific financial or operational outcome the visitor desires in the opening paragraph.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">5. Above-the-Fold Proof Block</span>
              <p className="text-slate-600 dark:text-slate-400">
                Must contain at least one verifiable quantitative result (e.g. +184% booked jobs, 4.8x ROAS, or 0.6s page speed) above the fold.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">6. People Also Ask H2s</span>
              <p className="text-slate-600 dark:text-slate-400">
                Structure subheadings to directly answer Google PAA questions. Provides immediate fodder for Google Featured Snippets & AI Overviews.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">7. Contextual Internal Links (3-5)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Link to related cluster money pages (e.g. from industry page link to pricing guide and compare page) with descriptive anchor text.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">8. JSON-LD Schema Markup</span>
              <p className="text-slate-600 dark:text-slate-400">
                Always include <code className="font-mono">FAQPage</code> and <code className="font-mono">Service</code> or <code className="font-mono">LocalBusiness</code> schema using our built-in schema components.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 block mb-1">9. Tri-Stage CTA Placement</span>
              <p className="text-slate-600 dark:text-slate-400">
                One primary action (Book a Call or Free Audit) repeated at: Top (Hero), Middle (after proof block), and End (closing banner).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 1-CLICK OUTREACH TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {emailTemplates.map(tpl => (
            <div key={tpl.key} className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {tpl.title}
                </h3>
                <button
                  onClick={() => copyToClipboard(`Subject: ${tpl.subject}\n\n${tpl.body}`, tpl.key)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === tpl.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Template
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-slate-500 mb-2 font-mono">
                <strong>Subject:</strong> {tpl.subject}
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-200 dark:border-slate-800 leading-relaxed">
                {tpl.body}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: 15-MIN LEAD INTAKE & PRICING SLA */}
      {activeTab === 'leads' && (
        <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>The 15-Minute Response Rule:</strong> Inbound leads from pricing guides, calculators, and audit forms MUST be acknowledged via personalized email or SMS within 15 minutes during business hours. Fast response increases close rates by over 300%.
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            {/* Step-by-Step Response Protocol */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Step-by-Step Lead Intake Protocol
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Step 1: Website Quick-Crawl (5 mins)</strong>
                  Run the prospect’s domain through the internal audit tool or Ahrefs. Note their estimated organic traffic, domain rating, and top 3 competitor gaps.
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Step 2: Send Initial Video / Loom or Email (10 mins)</strong>
                  Acknowledge their inquiry, attach 2 quick screenshots showing where they are losing search clicks to competitors, and propose a 20-minute strategy call.
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Step 3: Map to Transparent Pricing Tier</strong>
                  Never guess on pricing. Use our published tier brackets:
                  <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                    <li><strong>Foundation:</strong> $1,500 - $3,000/mo (Local / Single Metro)</li>
                    <li><strong>Growth:</strong> $3,500 - $7,500/mo (National B2B SaaS / DTC)</li>
                    <li><strong>Enterprise:</strong> $8,000 - $20,000+/mo (Multi-Location / Tech)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Proposal Email Template */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" /> First-Touch Lead Response Template
                </h3>
                <button
                  onClick={() => copyToClipboard(`Hi [Name],\n\nThanks for reaching out through our pricing guide regarding your growth goals at [Company]!\n\nI ran a preliminary crawl of your website and noticed two immediate opportunities:\n1. Your competitors are capturing ~[X]% of high-intent search traffic for [target keyword]\n2. Several Core Web Vitals and collection URL duplicate loops are holding back page speed\n\nBased on your revenue goals, our recommended package is the Growth Retainer ($3,500/mo) which covers technical maintenance, active digital PR, and 4 monthly topical cluster guides with no long-term lock-in traps.\n\nAre you free for a quick 15-minute screen share on Thursday at 2:00 PM EST to walk through the raw audit data?\n\nBest,\n[Staff Name]\nAJPR World\najprworld.com/book-call`, 'lead-email')}
                  className="px-2.5 py-1 text-xs rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 font-semibold"
                >
                  {copiedKey === 'lead-email' ? 'Copied!' : 'Copy Script'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-200 dark:border-slate-800 leading-relaxed">
{`Hi [Name],

Thanks for reaching out through our pricing guide regarding your growth goals at [Company]!

I ran a preliminary crawl of your website and noticed two immediate opportunities:
1. Your competitors are capturing ~[X]% of high-intent search traffic for [target keyword]
2. Several Core Web Vitals and collection URL duplicate loops are holding back page speed

Based on your revenue goals, our recommended package is the Growth Retainer ($3,500/mo) which covers technical maintenance, active digital PR, and 4 monthly topical cluster guides with no long-term lock-in traps.

Are you free for a quick 15-minute screen share on Thursday at 2:00 PM EST to walk through the raw audit data?

Best,
[Staff Name]
AJPR World
ajprworld.com/book-call`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KPI LOGGING & SCORECARD */}
      {activeTab === 'kpis' && (
        <div className="bg-white dark:bg-[#292A2D] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              KPI Scorecard & Monthly Logging Framework
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Do not report vanity rankings for single keywords. The staff reports on these 6 compounding business metrics:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3">Cadence</th>
                  <th className="p-3">Tool to Use</th>
                  <th className="p-3">Healthy Benchmark</th>
                  <th className="p-3">Action if Below Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Cluster Search Rankings</td>
                  <td className="p-3">Weekly</td>
                  <td className="p-3">Ahrefs / SEMrush / GSC</td>
                  <td className="p-3 text-emerald-600 font-bold">+5% to +15% weekly movement</td>
                  <td className="p-3">Add 2 internal links from top-ranking pages + update FAQ schema.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Referring Domains (RDs)</td>
                  <td className="p-3">Monthly</td>
                  <td className="p-3">Ahrefs Site Explorer</td>
                  <td className="p-3 text-emerald-600 font-bold">+10 to +25 clean RDs / mo</td>
                  <td className="p-3">Ramp up Digital PR outreach for the 2026 Agency Pricing Report.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Organic Qualified Leads</td>
                  <td className="p-3">Monthly</td>
                  <td className="p-3">Admin CRM / GA4 Funnel</td>
                  <td className="p-3 text-emerald-600 font-bold">15+ high-intent requests / mo</td>
                  <td className="p-3">Audit pricing page proof blocks & CTA contrast on mobile.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">AI Search Citations</td>
                  <td className="p-3">Monthly</td>
                  <td className="p-3">ChatGPT / Perplexity Prompts</td>
                  <td className="p-3 text-emerald-600 font-bold">Mentioned in top 3 recommendations</td>
                  <td className="p-3">Follow GEO guide: increase Wikipedia/Wikidata entity citations.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
