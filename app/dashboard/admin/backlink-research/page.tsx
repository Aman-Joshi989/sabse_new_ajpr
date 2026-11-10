'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, ExternalLink, Copy, Check, ShieldCheck, Sparkles, Globe, TrendingUp, Zap, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BACKLINK_CATALOG, BacklinkSource } from '@/lib/backlinks-catalog';

const HIGH_YIELD_GSC_QUERIES = [
  {
    id: 'webtonic',
    query: 'web tonic alternatives',
    impressions: 19138,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/compare/webtonic-alternatives',
    anchor: 'Web Tonic Alternatives',
    catalogFilter: 'Web Tonic',
    pitchTitle: 'Web Tonic Alternatives & Agency Comparison (2026)',
    tagline: 'Objective breakdown of Web Tonic pricing, retainer costs ($1,500 vs $5,000+), speed, and top alternatives.',
    pitchDescription: 'Comprehensive 2026 side-by-side evaluation of Web Tonic vs high-velocity modern engineering agencies. Evaluates Core Web Vitals (sub-second Next.js vs standard templates), pricing transparency, code ownership, and Generative Engine Optimization (GEO).',
    recommendedPlatforms: ['AlternativeTo (DR 79)', 'Alternative Me (DR 75)', 'SourceForge (DR 93)', 'GoodFirms (DR 86)'],
  },
  {
    id: 'b2b-growth',
    query: 'b2b growth marketing agency',
    impressions: 763,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/services/b2b-growth-marketing',
    anchor: 'B2B Growth Marketing Agency',
    catalogFilter: 'B2B',
    pitchTitle: 'AJPR World - Full-Funnel B2B Growth Marketing Agency',
    tagline: 'Senior engineering-led B2B customer acquisition: technical SEO, GEO for AI citations, and high-yield pipeline funnels.',
    pitchDescription: 'AJPR World is a premier B2B growth marketing firm replacing bloated agency retainers with transparent, engineering-led execution. We specialize in scaling high-intent organic search pipelines, capturing ChatGPT & Perplexity citations, and developing high-converting custom Next.js web applications starting from $1,500/month.',
    recommendedPlatforms: ['GoodFirms (DR 86)', 'TrustRadius (DR 84)', 'Product Hunt (DR 91)', 'Indie Hackers (DR 81)'],
  },
  {
    id: 'intl-seo',
    query: 'international seo price',
    impressions: 141,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/pricing/seo-cost',
    anchor: 'International SEO Price Guide (2026)',
    catalogFilter: 'Research',
    pitchTitle: '2026 International SEO Pricing & Retainer Benchmark Report',
    tagline: 'Realistic breakdown of international SEO pricing ($3,500-$10,000/mo) across US, UK, Singapore, and Australia.',
    pitchDescription: 'Comprehensive pricing guide breaking down multi-region international SEO retainers, hreflang architectures, translation budgets, and deliverable timelines with zero agency markups.',
    recommendedPlatforms: ['Medium (DR 96)', 'Dev.to (DR 89)', 'Hashnode (DR 84)', 'Indie Hackers (DR 81)'],
  },
  {
    id: 'singapore-ppc',
    query: 'ppc singapore & ppc services',
    impressions: 275,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/locations/singapore/ppc-agency',
    anchor: 'PPC Agency Singapore',
    catalogFilter: 'PPC',
    pitchTitle: 'AJPR World - High-ROAS PPC Agency Singapore & APAC',
    tagline: 'High-ROAS Google Ads, paid search management, and conversion rate engineering for Singapore and APAC brands.',
    pitchDescription: 'Direct senior performance marketing and Next.js engineering pod managing Google Search, Performance Max, and conversion rate optimization for Singapore and APAC growth brands with 100% account ownership and zero markups.',
    recommendedPlatforms: ['GoodFirms (DR 86)', 'Clutch (DR 90)', 'Product Hunt (DR 91)', 'Fazier (DR 82)'],
  },
  {
    id: 'london-mvp',
    query: 'startup mvp development london',
    impressions: 85,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/locations/london/custom-software',
    anchor: 'Startup MVP Development London',
    catalogFilter: 'Software',
    pitchTitle: 'Startup MVP Development & Custom Software London (2026)',
    tagline: 'Rapid 2–4 week AI MVP delivery, Next.js 16 architectures, and complete IP transfer for UK startups.',
    pitchDescription: 'AJPR World provides direct senior software engineering pods for ambitious London and UK founders. Production-grade Next.js 16 platforms, PostgreSQL, and autonomous AI systems delivered in 14–30 days with transparent fixed pricing.',
    recommendedPlatforms: ['AlternativeTo (DR 79)', 'BetaList (DR 75)', 'Product Hunt (DR 91)', 'SourceForge (DR 93)'],
  },
  {
    id: 'singapore-ai',
    query: 'business process automation singapore',
    impressions: 85,
    clicks: 0,
    targetUrl: 'https://ajprworld.com/locations/singapore/ai-solutions',
    anchor: 'Business Process Automation Singapore',
    catalogFilter: 'AI',
    pitchTitle: 'Business Process Automation & Autonomous AI Workflows Singapore',
    tagline: 'Autonomous AI workflows, custom agent swarms, and enterprise systems integration in Singapore.',
    pitchDescription: 'Turn repetitive business processes into intelligent, automated operating systems. AJPR World architects LeadOS, SupportOS, and OpsOS powered by AI agents with deterministic guardrails for APAC enterprises.',
    recommendedPlatforms: ['Futurepedia (DR 77)', 'There is an AI (DR 74)', 'Product Hunt (DR 91)', 'SourceForge (DR 93)'],
  },
  {
    id: 'haldwani-digital',
    query: 'digital marketing company in haldwani',
    impressions: 2,
    clicks: 1,
    targetUrl: 'https://ajprworld.com/locations/haldwani/digital-marketing',
    anchor: 'Best Digital Marketing Company in Haldwani',
    catalogFilter: 'Local',
    pitchTitle: 'AJPR World - Top Digital Marketing Company in Haldwani, Uttarakhand',
    tagline: 'Data-backed SEO, high-ROAS Google Ads, and custom Next.js websites for Haldwani and Kumaon businesses.',
    pitchDescription: 'AJPR World is the leading digital marketing and web engineering firm in Haldwani, Uttarakhand. Serving Tikonia, Kaladhungi Rd, Kathgodam, and Kumaon with transparent monthly retainers starting at ₹14,999/mo.',
    recommendedPlatforms: ['Google Business Profile', 'GoodFirms (DR 86)', 'Clutch (DR 90)', 'Justdial'],
  },
];

export default function BacklinkResearchPage() {
  const [targetUrl, setTargetUrl] = useState('https://ajprworld.com');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  const [expandedQuery, setExpandedQuery] = useState<string | null>('webtonic');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword.");
      return;
    }

    setLoading(true);
    setReport(null);
    toast.info("Initializing LangGraph Backlinks Crew...");

    try {
      const res = await fetch('/api/agents/backlink-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl,
          keyword,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret' 
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to run agent.');
      }

      setReport(data.data.markdownReport);
      toast.success("Backlink Strategy generated successfully!");
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate backlink research.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: number | string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied anchor text to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeployQuery = (q: typeof HIGH_YIELD_GSC_QUERIES[0]) => {
    setTargetUrl(q.targetUrl);
    setKeyword(q.query);
    toast.success(`Loaded campaign for "${q.query}" into SERP scanner!`);
  };

  const handleCopyPacket = (q: typeof HIGH_YIELD_GSC_QUERIES[0]) => {
    const packet = `DIRECTORY SUBMISSION PACKET:
Target Keyword: ${q.query} (${q.impressions.toLocaleString()} impressions)
Submission Title: ${q.pitchTitle}
Target Destination URL: ${q.targetUrl}
Recommended Anchor Text: ${q.anchor}
Tagline: ${q.tagline}

Description:
${q.pitchDescription}

Top Submission Portals:
${q.recommendedPlatforms.join('\n')}`;

    navigator.clipboard.writeText(packet);
    setCopiedId(q.id);
    toast.success(`Copied ready-to-paste directory packet for "${q.query}"!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFilterCatalog = (filterTerm: string) => {
    setCatalogSearch(filterTerm);
    toast.info(`Filtered Authority Vault for "${filterTerm}" targets.`);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    BACKLINK_CATALOG.forEach(b => set.add(b.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredCatalog = useMemo(() => {
    return BACKLINK_CATALOG.filter((item: BacklinkSource) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        item.recommendedAnchor.toLowerCase().includes(catalogSearch.toLowerCase());
      
      const matchesTier = selectedTier === 'All' || item.tier.toLowerCase().includes(selectedTier.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [catalogSearch, selectedTier, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            AI Backlink Prospector & Authority Vault
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Build high-DR backlinks to scale your Ahrefs Domain Rating from 0 to 45+, climb Google SERPs, and capture referral traffic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 text-xs px-3 py-1 font-semibold">
            128 Verified High-DR Portals
          </Badge>
        </div>
      </div>

      {/* GSC High-Yield Action Hub */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900/90 dark:via-[#292A2D] dark:to-slate-900/90 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 p-6 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Live GSC High-Yield Traffic Accelerator (650 Tracked Queries)
              </h2>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Google is actively serving AJPR World for 650 queries. These top 4 impression magnets are hovering on Page 2 (Rank 8–12). Use the 1-click tools below to acquire authority backlinks and push them into the Top 3.
            </p>
          </div>
          <Badge className="bg-indigo-600 text-white border-0 text-xs px-3 py-1 font-bold shrink-0 self-start sm:self-center">
            26,300+ Total Impressions
          </Badge>
        </div>

        {/* 4 Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HIGH_YIELD_GSC_QUERIES.map((q) => {
            const isExpanded = expandedQuery === q.id;
            return (
              <div 
                key={q.id}
                className="p-5 rounded-xl bg-white dark:bg-[#202124] border border-indigo-100 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 font-mono">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> {q.query}
                    </span>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                      {q.impressions.toLocaleString()} Impr.
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {q.tagline}
                  </p>

                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    Target: <span className="text-blue-600 dark:text-blue-400 font-semibold">{q.targetUrl.replace('https://ajprworld.com', '')}</span>
                  </div>
                </div>

                {/* Expanded Packet Drawer */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs animate-in fade-in duration-200">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <span>Recommended Anchor:</span>
                        <button
                          onClick={() => copyToClipboard(q.anchor, `anchor-${q.id}`)}
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          {copiedId === `anchor-${q.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          Copy Anchor
                        </button>
                      </div>
                      <div className="font-mono text-slate-800 dark:text-slate-200 text-[11px] bg-white dark:bg-slate-950 p-1.5 rounded border border-slate-200 dark:border-slate-800">
                        &quot;{q.anchor}&quot;
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <strong>Top Portals:</strong> {q.recommendedPlatforms.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                    onClick={() => handleDeployQuery(q)}
                  >
                    <Search className="w-3 h-3 mr-1" />
                    Scan SERP
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                    onClick={() => handleFilterCatalog(q.catalogFilter)}
                  >
                    Filter Vault
                  </Button>

                  <Button
                    size="sm"
                    className="h-8 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white ml-auto"
                    onClick={() => handleCopyPacket(q)}
                  >
                    {copiedId === q.id ? (
                      <Check className="w-3 h-3 mr-1 text-white" />
                    ) : (
                      <Copy className="w-3 h-3 mr-1" />
                    )}
                    {copiedId === q.id ? 'Copied!' : 'Copy Packet'}
                  </Button>

                  <button
                    onClick={() => setExpandedQuery(isExpanded ? null : q.id)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded"
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Live SERP Prospector */}
      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Real-Time Google SERP Link Scanner
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter your target niche keyword. The AI scrapes Google's top results, classifies sites into blogs/directories, and drafts customized cold outreach pitches.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Website URL</label>
            <Input 
              placeholder="e.g. https://ajprworld.com" 
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
              disabled={loading}
            />
          </div>
          
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Keyword / Competitor Niche</label>
            <Input 
              placeholder="e.g. best custom software development companies" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {loading ? "Scanning SERPs..." : "Find Link Opportunities"}
          </Button>
        </form>
      </div>

      {report && (
        <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#DADCE0] dark:border-[#3C4043] bg-gray-50 dark:bg-[#202124] flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" /> AI Link Building Strategy Report
            </h2>
            <Badge className="bg-emerald-500/10 text-emerald-600 text-xs">Generated</Badge>
          </div>
          <div className="p-6 md:p-8 prose prose-blue dark:prose-invert max-w-none">
            <ReactMarkdown components={{ h1: 'h2' }} remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500 dark:text-gray-400 space-y-4 bg-white dark:bg-[#292A2D] rounded-xl border border-slate-200 dark:border-slate-800">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A73E8]" />
          <p className="text-sm font-medium animate-pulse">
            The AI crew is scanning Google SERPs, deducing high-DR domains, and drafting outreach templates...
          </p>
        </div>
      )}

      {/* 128 Verified High-DR Backlink Vault */}
      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Verified High-DR Authority Directory (128 Portals)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Curated platforms with DR 70 to 95. Submit your profile, open source simulator, or free audit tool to gain immediate dofollow backlinks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search catalog..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="pl-9 h-8 text-xs bg-gray-50 dark:bg-[#202124]"
              />
            </div>
            <div className="flex items-center gap-1">
              {['All', 'Elite', 'Strong'].map((tier) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setSelectedTier(tier)}
                >
                  {tier}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase font-semibold">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">DR</th>
                <th className="p-3">Category</th>
                <th className="p-3">Target Asset</th>
                <th className="p-3">Recommended Anchor</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredCatalog.slice(0, 25).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    {item.name}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {item.pricing}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                      item.dr >= 90 
                        ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' 
                        : item.dr >= 75
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                    }`}>
                      DR {item.dr}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{item.category}</td>
                  <td className="p-3">
                    <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 truncate max-w-[140px] block">
                      {item.targetUrl.replace('https://ajprworld.com', '') || '/'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 max-w-[220px]">
                      <span className="truncate text-slate-600 dark:text-slate-300" title={item.recommendedAnchor}>
                        &quot;{item.recommendedAnchor}&quot;
                      </span>
                      <button 
                        onClick={() => copyToClipboard(item.recommendedAnchor, item.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                        title="Copy anchor text"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <a 
                      href={item.submissionUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-medium"
                    >
                      Submit Link <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {Math.min(25, filteredCatalog.length)} of {filteredCatalog.length} curated backlink sources</span>
          <span>Tip: Submit 3-5 platforms weekly to safely grow Domain Rating</span>
        </div>
      </div>
    </div>
  );
}
