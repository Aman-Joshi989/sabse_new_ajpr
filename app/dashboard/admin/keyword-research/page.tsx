'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function KeywordResearchPage() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a seed topic.");
      return;
    }

    setLoading(true);
    setReport(null);
    toast.info("Initializing LangGraph Keyword Crew...");

    try {
      const res = await fetch('/api/agents/keyword-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          audience,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret' 
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to run agent.');
      }

      setReport(data.data.markdownReport);
      toast.success("Keyword Strategy generated successfully!");
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate keyword research.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Keyword Researcher</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Powered by LangGraph and real-time Google search data via SerpAPI.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Seed Topic (Keyword)</label>
            <Input 
              placeholder="e.g. Next.js 15 routing tutorial" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
              disabled={loading}
            />
          </div>
          
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience (Optional)</label>
            <Input 
              placeholder="e.g. Senior Frontend Developers" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-[#1A73E8] hover:bg-[#1557B0] text-white"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {loading ? "Researching..." : "Run AI Research"}
          </Button>
        </form>
      </div>

      {report && (
        <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#DADCE0] dark:border-[#3C4043] bg-gray-50 dark:bg-[#202124]">
            <h2 className="font-semibold text-gray-900 dark:text-white">AI Strategy Report</h2>
          </div>
          <div className="p-6 md:p-8 prose prose-blue dark:prose-invert max-w-none">
            <ReactMarkdown components={{ h1: 'h2' }} remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500 dark:text-gray-400 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A73E8]" />
          <p className="text-sm animate-pulse">
            The AI crew is actively querying Google, classifying intent, and building a strategy...
          </p>
        </div>
      )}
    </div>
  );
}
