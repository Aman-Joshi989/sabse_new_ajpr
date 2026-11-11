"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, ChevronDown, ChevronUp, Plus, Minus, 
  Bookmark, Check, ExternalLink, ShieldCheck, Share2, 
  Linkedin, Twitter, BookOpen, Clock, Calendar, ArrowLeft, ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

interface BlogArticleClientProps {
  post: any;
  contentWithLinks: string;
  headings: HeadingItem[];
  formattedDate: string;
  updatedDate: string;
  readingTime: number;
  articleUrl: string;
  shareText: string;
  relatedPosts: any[];
}

export default function BlogArticleClient({
  post,
  contentWithLinks,
  headings,
  formattedDate,
  updatedDate,
  readingTime,
  articleUrl,
  shareText,
  relatedPosts,
}: BlogArticleClientProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false);
  const [savedPreferred, setSavedPreferred] = useState(false);
  const [showEditorialModal, setShowEditorialModal] = useState(false);
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Defensively strip code block fences to prevent raw terminal dumps
  const sanitizedContent = useMemo(() => {
    let text = (contentWithLinks || '').trim();
    while (/^```(?:markdown|md)?\s*\r?\n?/i.test(text)) {
      text = text.replace(/^```(?:markdown|md)?\s*\r?\n?/i, '').trim();
    }
    while (/\r?\n?```\s*$/i.test(text)) {
      text = text.replace(/\r?\n?```\s*$/i, '').trim();
    }
    return text;
  }, [contentWithLinks]);

  // Diagnostic Audit Lead Form State
  const [auditForm, setAuditForm] = useState({
    name: '',
    workEmail: '',
    websiteUrl: '',
    primaryChallenge: 'Organic Search & Traffic Growth',
    monthlyBudget: '$3,500 - $7,500/mo',
  });
  const [auditStatus, setAuditStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [auditFeedback, setAuditFeedback] = useState('');

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuditStatus('loading');
    setAuditFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: auditForm.name || 'Audit Applicant',
          email: auditForm.workEmail,
          websiteUrl: auditForm.websiteUrl,
          budgetRange: auditForm.monthlyBudget,
          message: `DIAGNOSTIC AUDIT REQUEST:
Website: ${auditForm.websiteUrl}
Primary Bottleneck: ${auditForm.primaryChallenge}
Budget Bracket: ${auditForm.monthlyBudget}
Source Article: ${post.title} (${articleUrl})`,
        }),
      });

      if (res.ok) {
        setAuditStatus('success');
        setAuditFeedback('Audit request received! Our senior growth team will analyze your site and deliver the diagnostic report within 48 hours.');
      } else {
        const data = await res.json();
        setAuditStatus('error');
        setAuditFeedback(data.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setAuditStatus('error');
      setAuditFeedback('Network error. Please try again.');
    }
  };

  // Dynamic 3-4 bullet takeaways for the AI summary based on article slug
  const getSummaryBullets = () => {
    if (post.slug === 'marketing-strategy-consultant-cost-rates') {
      return [
        "Marketing consultant hourly rates range from $150 to $350/hr for senior practitioners, while diagnostic sprints run $2,500 to $7,500.",
        "Monthly strategic retainers benchmark at $3,000–$5,000/mo for early scaleups and $6,000–$12,000/mo for mid-market B2B brands.",
        "Watch out for media spend percentage markups (15-20%) and mandatory proprietary dashboard fees that mask markups.",
        "Always demand a 90-day execution milestone before committing to any long-term annual contract."
      ];
    }
    if (post.slug === 'b2b-marketing-strategy-in-house-vs-agency-vs-consultant') {
      return [
        "In-house Marketing Directors carry a total year-one cost of $193k–$271k including payroll taxes, tech stack, and 60-90 day onboarding ramp.",
        "Legacy agencies average $60k–$144k/year but often reassign accounts to junior coordinators with restrictive 12-month lock-ins.",
        "Agile strategic consultants ($42k–$90k/yr) provide direct practitioner expertise, 30-day terms, and rapid 7-14 day execution sprints.",
        "High-performing companies use a hybrid model: 1 internal visionary plus an agile technical agency managing SEO, GEO, and conversion funnels."
      ];
    }
    if (post.slug === 'best-b2b-growth-marketing-agencies-us') {
      return [
        "Evaluate US marketing agencies on 5 core pillars: pricing transparency, technical depth, Generative Engine Optimization (GEO), and contract flexibility.",
        "Top vetted firms for 2026 include AJPR World (growth engineering & GEO), Refine Labs (enterprise SaaS demand gen), and WebFX (legacy high-volume).",
        "Insist on seeing live Looker Studio or CRM attribution dashboards instead of static PowerPoint vanity decks.",
        "Verify an agency's own website performance—if their Core Web Vitals score below 85 on mobile, avoid them."
      ];
    }
    return [
      "Thoroughly vet marketing strategy consultants across 6 operational pillars: commercial track record, client attribution modeling, direct senior access, and proprietary lock-in risks.",
      "Require hard evidence of organic pipeline yield and CAC reduction rather than vanity traffic or generic impressions before committing budget.",
      "Beware of long-term lock-in contracts (6–12 months) and agencies that refuse to provide transparent pricing tiers or direct account ownership.",
      "Prioritize partners with deep technical competencies (Core Web Vitals, programmatic architectures, and Generative Engine Optimization in ChatGPT & Perplexity)."
    ];
  };

  const summaryBullets = getSummaryBullets();

  const handleMakePreferred = () => {
    setSavedPreferred(true);
    // Copy feed URL or toast
    navigator.clipboard.writeText('https://ajprworld.com/feed.xml');
    setTimeout(() => setSavedPreferred(false), 3000);
  };

  const category = post.category || 'Growth Marketing';

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 pt-28 pb-24">
      
      {/* Breadcrumb Section (Matching Web Tonic) */}
      <div className="max-w-4xl mx-auto px-6 mb-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Growth Marketing</Link>
          <span className="text-slate-300 dark:text-slate-700">&gt;</span>
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">News</Link>
          <span className="text-slate-300 dark:text-slate-700">&gt;</span>
          <span className="hover:text-slate-900 dark:hover:text-white transition-colors">{category}</span>
          <span className="text-slate-300 dark:text-slate-700">&gt;</span>
          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Article Header (Web Tonic Signature Typography) */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Subtitle / Lead Deck */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
            {post.excerpt || post.meta_description || "Six vetting pillars for picking a marketing strategy consultant, the evidence to demand before signing, and the red flags worth walking away"}
          </p>

          {/* E-E-A-T Author & Verification Bar (Exact Web Tonic Grid) */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-6">
              
              {/* Written By */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                  Written By
                </span>
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                    <Image
                      src="/images/aman-joshi-profile.png"
                      alt="Aman Joshi"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href="/aman-joshi" className="font-bold text-sm text-slate-900 dark:text-white hover:underline block leading-tight">
                      Aman Joshi
                    </Link>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Founder & CEO</span>
                  </div>
                </div>
              </div>

              {/* Verified By */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                  Verified By
                </span>
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center text-white font-bold text-xs">
                    AJ
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block leading-tight">
                      AJPR Engineering Board
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Technical Peer Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Read Time & Published Dates */}
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-6 space-y-1">
              <div>Read time: {readingTime} min</div>
              <div>Published: {formattedDate} | Updated: {updatedDate}</div>
            </div>

            {/* Category Pill & Preferred Source Action Button */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-[#E05A36] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {category.toUpperCase()}
              </span>

              <button
                onClick={handleMakePreferred}
                className="px-4 py-1.5 rounded-full border border-[#E05A36] text-[#E05A36] dark:border-orange-400 dark:text-orange-400 text-xs font-semibold hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all flex items-center gap-1.5"
              >
                {savedPreferred ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> RSS Feed URL Copied!
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" /> MAKE US A PREFERRED SOURCE
                  </>
                )}
              </button>
            </div>

            {/* Editorial Policy & Vetting Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span>
                Learn about our{' '}
                <button
                  onClick={() => setShowEditorialModal(true)}
                  className="text-[#E05A36] dark:text-orange-400 underline font-medium hover:text-orange-600"
                >
                  Editorial Policy
                </button>
              </span>
              <span>
                Learn about our{' '}
                <button
                  onClick={() => setShowMethodologyModal(true)}
                  className="text-[#E05A36] dark:text-orange-400 underline font-medium hover:text-orange-600"
                >
                  Data-Driven Vetting Methodology
                </button>
              </span>
            </div>
          </div>
        </header>

        {/* Interactive Top Modules: Table of Contents & AI Summary Widget */}
        <div className="space-y-4 mb-10">
          
          {/* Table of Contents Module (Web Tonic Signature Accordion) */}
          {headings.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="font-serif italic text-lg sm:text-xl text-slate-800 dark:text-slate-200 font-semibold group-hover:text-[#E05A36] transition-colors">
                  Table of contents
                </span>
                <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:bg-[#E05A36] group-hover:text-white transition-all text-sm font-bold">
                  {tocOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              {tocOpen && (
                <nav className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      onClick={() => setTocOpen(false)}
                      className={`block text-slate-600 dark:text-slate-400 hover:text-[#E05A36] dark:hover:text-orange-400 transition-colors ${
                        h.level === 3 ? 'pl-4 text-xs' : 'font-medium'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* "SUMMARIZE THIS ARTICLE WITH AI" Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <button
              onClick={() => setAiSummaryOpen(!aiSummaryOpen)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Summarize This Article With AI
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                {aiSummaryOpen ? 'Hide Summary' : '30-Sec Overview'}
                {aiSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {aiSummaryOpen && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AI Key Takeaways (Estimated Reading Time Saved: {Math.max(1, readingTime - 1)} mins)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {summaryBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36] mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image (Clean aspect ratio matching Web Tonic) */}
        {(post.cover_image || post.image_url) && (
          <div className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden mb-12 border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
            <Image
              src={post.cover_image || post.image_url}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body Content (Clean Editorial Typography) */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-[#E05A36] dark:prose-a:text-orange-400 hover:prose-a:underline prose-li:marker:text-[#E05A36]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <h2 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-14 mb-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text = String(children);
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <h3 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
                    {children}
                  </h3>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-orange-500 bg-orange-50/40 dark:bg-orange-950/20 rounded-r-xl p-4 my-6 text-slate-800 dark:text-slate-200 italic shadow-sm">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-left text-sm divide-y divide-slate-200 dark:divide-slate-800">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="bg-slate-100 dark:bg-slate-800/60 p-3 font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-3 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  {children}
                </td>
              ),
            }}
          >
            {sanitizedContent}
          </ReactMarkdown>
        </div>

        {/* Social Share & Attribution Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Share2 className="w-4 h-4" /> Share This Strategy:
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-black hover:text-white dark:hover:bg-blue-600 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Share on X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-md shrink-0">
            <Image
              src="/images/aman-joshi-profile.png"
              alt="Aman Joshi"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aman Joshi</h3>
              <span className="text-xs px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold rounded-full">
                Founder & Systems Architect
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Aman leads strategy and engineering at AJPR World, helping US startups, B2B enterprises, and high-growth brands scale organic pipeline through radical transparency, Generative Engine Optimization, and full-stack software architecture.
            </p>
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <a href="https://www.linkedin.com/in/aman-joshi-/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" /> Connect on LinkedIn
              </a>
              <span>•</span>
              <Link href="/pricing" className="hover:underline">
                View Transparent Pricing & Retainers &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* High-Converting Closing CTA Box */}
        <div className="my-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> No Lock-in Traps. Radical Transparency.
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Hire an Agile Marketing & Tech Partner?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We eliminate junior middleman bloat. Partner directly with senior growth practitioners on month-to-month retainers.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={() => setShowAuditModal(true)}
                className="px-6 py-3.5 bg-[#E05A36] hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30 inline-flex items-center gap-2 text-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Request 48-Hour Diagnostic Audit (Free)
              </button>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-sm inline-flex items-center gap-1.5"
              >
                Schedule Strategy Review <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Continue Reading
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Explore more actionable data studies and growth blueprints.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-[#E05A36] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related.id || related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {related.cover_image ? (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={related.cover_image}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative h-44 w-full bg-gradient-to-br from-orange-500/10 to-blue-500/10 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                      <BookOpen className="w-10 h-10 text-slate-400" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E05A36] mb-2">
                      {related.category || 'Strategy'}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors line-clamp-2 leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-[#E05A36] group-hover:translate-x-1 transition-transform">
                      Read article &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Topical Cluster Knowledge Mesh */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E05A36]">Topical Authority Hub</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Explore Engineering Blueprints, Pricing & Alternatives
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E05A36] hover:underline"
            >
              Browse All Capabilities &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/compare/webtonic-alternatives"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Ranked Comparison</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                7 Best Web Tonic Alternatives (2026)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Objective breakdown of Web Tonic pricing, retainers, and Next.js modern engineering alternatives.
              </p>
            </Link>

            <Link
              href="/compare/smartsites-alternatives"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">PPC & Web Studios</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                SmartSites Alternatives & Review
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Comparing SmartSites PPC and WordPress builds with sub-second Next.js web application architecture.
              </p>
            </Link>

            <Link
              href="/pricing/seo-cost"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Retainer Benchmarks</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                SEO Retainer Cost in 2026
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Real data on monthly retainers ($1,500–$8,500/mo), B2B SaaS pricing, and deliverables with zero markup.
              </p>
            </Link>

            <Link
              href="/pricing/website-cost"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Transparent Pricing</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                Website Development Cost Guide
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Comparing $3,500 SMB platforms against $20,000+ custom enterprise web applications in 2026.
              </p>
            </Link>

            <Link
              href="/services/web-development"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Core Architecture</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                Full-Stack Next.js Engineering
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Sub-second page speeds, custom PostgreSQL architectures, and 99+ Core Web Vitals performance.
              </p>
            </Link>

            <Link
              href="/ai-systems"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">AI MVPs</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                Autonomous AI Systems & Sprints
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                2–4 week AI product sprints with complete GitHub repository transfer and 100% intellectual property ownership.
              </p>
            </Link>

            <Link
              href="/services/b2b-growth-marketing"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">B2B Demand Gen</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                B2B Growth Marketing Agency
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Account-based marketing, programmatic search expansion, and high-converting demand generation.
              </p>
            </Link>

            <Link
              href="/compare"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#E05A36] hover:shadow-md transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Agency Directory</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E05A36] transition-colors">
                All Agency Comparisons Hub
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Transparent side-by-side matrices evaluating US agencies, local studios, and engineering pods.
              </p>
            </Link>
          </div>
        </section>
      </div>

      {/* Editorial Policy Modal */}
      {showEditorialModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              AJPR World Editorial Policy
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <p>
                At AJPR World, our mission is to provide radical transparency and verifiable data for founders, CMOs, and growth practitioners.
              </p>
              <p>
                <strong>Independent Verification:</strong> Every article and guide is authored by active senior practitioners and independently verified by a technical review lead to ensure statistical validity and operational accuracy.
              </p>
              <p>
                <strong>No Paid Placements:</strong> We never accept payment, sponsored backlinks, or affiliate commissions to endorse inferior software or disguise marketing recommendations.
              </p>
            </div>
            <button
              onClick={() => setShowEditorialModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Vetting Methodology Modal */}
      {showMethodologyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Data-Driven Vetting Methodology
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <p>
                Our industry benchmark studies and provider vetting guides are backed by verified empirical testing:
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Quantitative scraping and manual audit of 200+ active provider proposals and retainers.</li>
                <li>Performance benchmarking using Google PageSpeed Insights, Ahrefs Site Explorer, and LLM synthetic citation tracking.</li>
                <li>Strict client privacy: All proprietary business metrics are anonymized before publication.</li>
              </ul>
            </div>
            <button
              onClick={() => setShowMethodologyModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 48-Hour Diagnostic Audit Request Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-[#E05A36] border border-orange-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Direct Practitioner Audit
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAuditModal(false);
                  setAuditStatus('idle');
                  setAuditFeedback('');
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Request 48-Hour Marketing Diagnostic
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Complimentary for qualified US businesses ($1,500 value). We inspect your search engine rankings, Generative AI citation footprint, Core Web Vitals, and conversion leaks—delivered directly to your inbox.
            </p>

            {auditStatus === 'success' ? (
              <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-center space-y-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-green-900 dark:text-green-200">
                  Diagnostic Request Submitted
                </h4>
                <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                  {auditFeedback}
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-block px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Want to speak sooner? Schedule Call &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Jenkins"
                    value={auditForm.name}
                    onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Company Website URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourcompany.com"
                    value={auditForm.websiteUrl}
                    onChange={(e) => setAuditForm({ ...auditForm, websiteUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@yourcompany.com"
                    value={auditForm.workEmail}
                    onChange={(e) => setAuditForm({ ...auditForm, workEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Primary Growth Bottleneck
                  </label>
                  <select
                    value={auditForm.primaryChallenge}
                    onChange={(e) => setAuditForm({ ...auditForm, primaryChallenge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E05A36]"
                  >
                    <option value="Organic Search & Traffic Growth">Organic Search & Traffic Growth</option>
                    <option value="GEO & ChatGPT/Claude AI Search Citations">GEO & ChatGPT/Claude AI Search Citations</option>
                    <option value="Paid Ad Spend Efficiency & High CAC">Paid Ad Spend Efficiency & High CAC</option>
                    <option value="Fractional CMO & Strategy Roadmap">Fractional CMO & Strategy Roadmap</option>
                    <option value="Website CRO & Tech Re-architecture">Website CRO & Tech Re-architecture</option>
                  </select>
                </div>

                {auditFeedback && auditStatus === 'error' && (
                  <p className="text-xs text-red-500 font-medium">
                    {auditFeedback}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={auditStatus === 'loading'}
                  className="w-full py-3 px-6 bg-[#E05A36] hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {auditStatus === 'loading' ? 'Analyzing...' : 'Deliver My 48-Hour Diagnostic Audit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
