'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, ExternalLink, Copy, Check, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BACKLINK_CATALOG, BacklinkSource } from '@/lib/backlinks-catalog';

export default function BacklinkResearchPage() {
  const [targetUrl, setTargetUrl] = useState('https://ajprworld.com');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

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

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied anchor text to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
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
