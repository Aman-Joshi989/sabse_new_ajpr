'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Loader2, Target, CheckCircle2, Globe, ExternalLink, ArrowRight, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function OutrankPage() {
  const [competitorUrl, setCompetitorUrl] = useState('https://patkarinfotech.com');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

  const competitorPresets = [
    { name: 'Patkar Infotech', url: 'https://patkarinfotech.com', focus: 'Custom Software & Dev' },
    { name: 'Appinventiv AI', url: 'https://appinventiv.com/services/ai-development/', focus: 'Enterprise AI & Apps' },
    { name: 'Chepri Systems', url: 'https://chepri.com', focus: 'Digital Transformation' },
    { name: 'WebFX Alternatives', url: 'https://www.webfx.com', focus: 'SEO & Inbound Marketing' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorUrl.trim()) {
      toast.error("Please enter a competitor URL.");
      return;
    }

    setLoading(true);
    setReport(null);
    setBlogSlug(null);
    toast.info("Deploying Recon & Execution Agents (Scraping & Synthesizing)...");

    try {
      const res = await fetch('/api/agents/outrank-competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorUrl,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret' 
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to run agent.');
      }

      setReport(data.data.markdownReport);
      setBlogSlug(data.data.generatedBlogSlug);
      toast.success("Competitor successfully outranked and published!");
    } catch (err: any) {
      toast.error(err.message || 'Failed to execute outrank protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="text-orange-500 w-8 h-8 fill-orange-500" /> 
            Competitor Outrank Protocol
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Enter a competitor&apos;s URL. The AI scrapes their page, isolates their content and keyword gaps, and automatically publishes a superior 1,500+ word counter-strategy article to your blog and search engines.
          </p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs px-3 py-1 font-semibold">
          Autonomous Interceptor
        </Badge>
      </div>

      {/* Target Competitor Input Card */}
      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-orange-200 dark:border-orange-900/30 p-8 shadow-md relative overflow-hidden space-y-5">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-500 to-red-600"></div>
        
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-500" /> Target Competitor URL
            </label>
            <Input 
              placeholder="https://competitor.com/services/software-development" 
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] h-12 text-base font-mono"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Zap className="h-5 w-5 mr-2" />
            )}
            {loading ? "Executing Protocol..." : "Execute Outrank"}
          </Button>
        </form>

        {/* Quick Presets */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Quick Target Presets (Click to Load):
          </p>
          <div className="flex flex-wrap gap-2">
            {competitorPresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setCompetitorUrl(preset.url)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  competitorUrl === preset.url
                    ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <strong>{preset.name}</strong> <span className="opacity-70 text-[11px]">({preset.focus})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Accomplished Output */}
      {report && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-emerald-200 dark:border-emerald-900/30 bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-bold text-emerald-900 dark:text-emerald-100">Mission Accomplished: Competitor Outranked</h2>
            </div>
            <Badge className="bg-emerald-600 text-white text-xs">Published & Pushed to IndexNow</Badge>
          </div>
          <div className="p-6 md:p-8 prose prose-emerald dark:prose-invert max-w-none">
            <ReactMarkdown components={{ h1: 'h2' }} remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
            
            {blogSlug && (
              <div className="mt-8 p-6 bg-white dark:bg-[#202124] rounded-lg border border-emerald-200 dark:border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Live Published Counter-Article</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Target URL: <code className="text-emerald-600 dark:text-emerald-400 font-mono">/blog/{blogSlug}</code>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${blogSlug}`} target="_blank">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs">
                      View Live Article <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 text-gray-500 dark:text-gray-400 space-y-6 bg-white dark:bg-[#292A2D] rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <Target className="w-6 h-6 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Infiltrating Competitor Strategy...</h3>
            <p className="text-sm max-w-md mx-auto text-slate-500">
              Scraping page structure, extracting high-intent keywords, writing 1,500+ words of superior depth, and submitting directly to IndexNow search engine crawlers.
            </p>
          </div>
        </div>
      )}

      {/* How It Improves Ahrefs & Google Traffic */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" /> How Outrank Protocol Directly Drives Ahrefs & Google Traffic
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">1. Keyword Discovery</strong>
            Ahrefs crawls top 100 Google SERPs. When our article covers 3x more technical nuances than the competitor, Ahrefs detects 50-150 new ranking keywords.
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">2. Commercial Intercept</strong>
            Competitors charge high retainers for simple code. Our counter-articles present transparent pricing calculators, converting traffic directly into client bookings.
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-semibold">3. Instant Search Pings</strong>
            Instead of waiting 30 days for Google to discover your page, our automated IndexNow trigger alerts search bots within minutes of generation.
          </div>
        </div>
      </div>
    </div>
  );
}
