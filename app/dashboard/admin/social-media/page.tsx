'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Loader2, Target, CheckCircle2, TrendingUp, Search, Linkedin, Twitter, Youtube, Instagram, MessageCircle, Bot, Inbox, Check } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SocialMediaPage() {
  const [targetNiche, setTargetNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [savedLeads, setSavedLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  
  const [linkedInStats, setLinkedInStats] = useState<{ connected: boolean; followers: number | null }>({ connected: false, followers: null });
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/agents/social-leads/db');
      if (res.ok) {
        const data = await res.json();
        setSavedLeads(data.leads || []);
      }
    } catch (e) {
      console.error("Failed to fetch leads");
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchLinkedInStats();
  }, []);

  const fetchLinkedInStats = async () => {
    try {
      const res = await fetch('/api/agents/social-leads/analytics');
      if (res.ok) {
        const data = await res.json();
        setLinkedInStats(data);
      }
    } catch (e) {
      console.error("Failed to fetch analytics");
    } finally {
      setLoadingStats(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetNiche.trim()) {
      toast.error("Please enter a target niche or service.");
      return;
    }

    setLoading(true);
    setReport(null);
    toast.info("Deploying Social Lead Recon Agent...");

    try {
      const res = await fetch('/api/agents/social-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetNiche,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret' 
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to run agent.');
      }

      setReport(data.data.markdownReport);
      toast.success("Lead Generation complete!");
      // Refresh DB leads just in case
      fetchLeads();
    } catch (err: any) {
      toast.error(err.message || 'Failed to execute lead protocol.');
    } finally {
      setLoading(false);
    }
  };

  const markContacted = async (id: number) => {
    try {
      const res = await fetch('/api/agents/social-leads/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'contacted' })
      });
      if (res.ok) {
        toast.success("Marked as contacted!");
        setSavedLeads(savedLeads.map(l => l.id === id ? { ...l, status: 'contacted' } : l));
      }
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="text-blue-500 w-8 h-8" /> 
            Social Media & Lead Generation
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Track your cross-platform audience growth and automatically hunt for high-intent B2B leads.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-sm font-medium">
          <Bot className="w-4 h-4" />
          Autonomous Agent: Active
        </div>
      </div>

      {/* Analytics Mock Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LinkedIn */}
        <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-500">LinkedIn</p>
              {loadingStats ? (
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                </div>
              ) : linkedInStats.connected ? (
                <h3 className="text-2xl font-bold mt-1">
                  {linkedInStats.followers !== null ? linkedInStats.followers.toLocaleString() : 'Error'}
                </h3>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs h-7 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.location.href = '/api/auth/linkedin'}
                >
                  Connect Account
                </Button>
              )}
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Twitter */}
        <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-500">Twitter / X</p>
              <h3 className="text-2xl font-bold mt-1">850</h3>
            </div>
            <div className="p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
              <Twitter className="w-6 h-6 text-sky-500" />
            </div>
          </div>
        </div>
        
        {/* Just 2 boxes for brevity, assume the others exist */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Manual Trigger */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-blue-200 dark:border-blue-900/30 p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" /> 
                Manual Lead Sniper
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Force the agent to run right now for a specific niche, overriding the background schedule.
              </p>
            </div>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Target Service
                </label>
                <Input 
                  placeholder="e.g., Technical SEO" 
                  value={targetNiche}
                  onChange={(e) => setTargetNiche(e.target.value)}
                  className="bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
                  disabled={loading}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg"
              >
                {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Target className="h-5 w-5 mr-2" />}
                {loading ? "Hunting..." : "Run Agent Now"}
              </Button>
            </form>
          </div>

          {/* Results (Only shows if run manually) */}
          {report && (
            <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#DADCE0] dark:border-[#3C4043] bg-gray-50 dark:bg-[#202124]">
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" /> Live Output
                </h2>
              </div>
              <div className="p-4 prose prose-blue dark:prose-invert max-w-none text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Autonomous Lead Inbox */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] shadow-sm overflow-hidden h-[800px] flex flex-col">
            <div className="p-6 border-b border-[#DADCE0] dark:border-[#3C4043] flex items-center justify-between bg-gray-50 dark:bg-[#202124]">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-gray-500" /> 
                  Autonomous Lead Inbox
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Leads found by the cron job while you sleep.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loadingLeads}>
                {loadingLeads ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingLeads ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : savedLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Inbox className="w-12 h-12 mb-2 opacity-50" />
                  <p>Inbox is empty. The agent hasn't found anything yet.</p>
                </div>
              ) : (
                savedLeads.map((lead) => (
                  <div key={lead.id} className={`p-5 rounded-lg border ${lead.status === 'contacted' ? 'bg-gray-50 border-gray-200 opacity-70 dark:bg-[#202124] dark:border-[#3C4043]' : 'bg-white border-blue-100 dark:bg-[#292A2D] dark:border-blue-900/30'} shadow-sm`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {lead.niche}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-lg">{lead.platform_url}</h3>
                      </div>
                      {lead.status !== 'contacted' && (
                        <Button size="sm" variant="outline" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => markContacted(lead.id)}>
                          <Check className="w-4 h-4 mr-1" /> Mark Contacted
                        </Button>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-[#202124] p-3 rounded text-sm italic text-gray-600 dark:text-gray-300 mb-4">
                      "{lead.content}"
                    </div>

                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Why it's hot:</span>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{lead.reason}</p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-blue-500 tracking-wider">Drafted DM:</span>
                      <div className="mt-1 bg-[#F8F9FA] dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] p-3 rounded font-mono text-sm whitespace-pre-wrap">
                        {lead.draft_dm}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
