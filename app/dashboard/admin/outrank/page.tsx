'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Loader2, Target, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function OutrankPage() {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorUrl.trim()) {
      toast.error("Please enter a competitor URL.");
      return;
    }

    setLoading(true);
    setReport(null);
    setBlogSlug(null);
    toast.info("Deploying Recon & Execution Agents...");

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
      toast.success("Competitor successfully outranked!");
    } catch (err: any) {
      toast.error(err.message || 'Failed to execute outrank protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="text-orange-500 w-8 h-8" /> 
            Competitor Outrank Protocol
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Enter a competitor's URL. The AI will scrape their site, identify their weaknesses, and instantly publish a superior counter-strategy article to your blog to steal their traffic.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-orange-200 dark:border-orange-900/30 p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-500" /> Target Competitor URL
            </label>
            <Input 
              placeholder="https://their-website.com/services/seo" 
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] h-12 text-lg"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Zap className="h-5 w-5 mr-2" />
            )}
            {loading ? "Executing..." : "Execute Outrank"}
          </Button>
        </form>
      </div>

      {report && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-emerald-200 dark:border-emerald-900/30 bg-emerald-100 dark:bg-emerald-900/40 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-bold text-emerald-900 dark:text-emerald-100">Mission Accomplished</h2>
          </div>
          <div className="p-6 md:p-8 prose prose-emerald dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
            
            {blogSlug && (
              <div className="mt-8 p-6 bg-white dark:bg-[#202124] rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                <h3 className="text-lg font-bold mt-0 mb-2">View Live Article</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The counter-strategy article has been fully written and published to your database.
                </p>
                <Link href={`/blog/${blogSlug}`} target="_blank">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Read the Live Article
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 text-gray-500 dark:text-gray-400 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <Target className="w-6 h-6 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Infiltrating Competitor...</h3>
            <p className="text-sm max-w-md mx-auto">
              Scraping their site architecture, finding content gaps, generating a counter-strategy, and publishing a 1,500+ word article to your database. This takes about 60 seconds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
