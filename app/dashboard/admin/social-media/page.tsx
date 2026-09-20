'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Loader2, Target, CheckCircle2, TrendingUp, Search, Linkedin, Twitter, Youtube, Instagram, MessageCircle, Bot, Inbox, Check, Settings2, BarChart3, ArrowUpRight, Send, Sparkles, Copy, Calendar, Layers, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { CURATED_LINKEDIN_POSTS, LinkedInContentItem } from '@/lib/linkedin-posts';

export default function SocialMediaPage() {
  const [targetNiche, setTargetNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [savedLeads, setSavedLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  
  const [linkedInStats, setLinkedInStats] = useState<{ connected: boolean; followers: number | null }>({ connected: false, followers: null });
  const [loadingStats, setLoadingStats] = useState(true);

  const [ayrshareStats, setAyrshareStats] = useState<any>(null);
  const [loadingAyrshare, setLoadingAyrshare] = useState(true);

  // Auto-Publish State
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'linkedin', 'facebook']);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedQueuePost, setSelectedQueuePost] = useState<LinkedInContentItem | null>(null);
  const [triggeringCron, setTriggeringCron] = useState<string | null>(null);

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
    fetchAyrshareStats();
  }, []);

  const fetchAyrshareStats = async () => {
    try {
      const res = await fetch('/api/ayrshare/analytics');
      if (res.ok) {
        const data = await res.json();
        setAyrshareStats(data);
      }
    } catch (e) {
      console.error("Failed to fetch ayrshare stats");
    } finally {
      setLoadingAyrshare(false);
    }
  };

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

  const mockGrowthData = [
    { name: 'Mon', followers: 1240 },
    { name: 'Tue', followers: 1245 },
    { name: 'Wed', followers: 1258 },
    { name: 'Thu', followers: 1262 },
    { name: 'Fri', followers: 1280 },
    { name: 'Sat', followers: 1310 },
    { name: 'Sun', followers: 1342 },
  ];

  const mockEngagementData = [
    { name: 'Twitter', likes: 400, comments: 240, shares: 140 },
    { name: 'LinkedIn', likes: 800, comments: 400, shares: 200 },
    { name: 'Instagram', likes: 1200, comments: 600, shares: 100 },
  ];

  const handleAutoPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent) return;
    setPublishing(true);
    setPublishResult(null);
    try {
      const res = await fetch('/api/ayrshare/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: postContent,
          platforms: selectedPlatforms
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPublishResult({ success: true, message: 'Successfully published to selected networks!' });
        setPostContent('');
      } else {
        setPublishResult({ success: false, message: data.error || 'Failed to publish' });
      }
    } catch (e: any) {
      setPublishResult({ success: false, message: e.message || 'Error occurred' });
    } finally {
      setPublishing(false);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-500 w-8 h-8" /> 
            Advanced Social Media Hub
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Track real-time analytics, auto-publish content, and hunt for B2B leads autonomously.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-[#DADCE0] dark:border-[#3C4043] flex items-center gap-2"
            onClick={() => window.open('https://app.ayrshare.com/', '_blank')}
          >
            <Settings2 className="w-4 h-4" /> Aggregator Settings
          </Button>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-sm font-medium shadow-sm">
            <Bot className="w-4 h-4" />
            Autonomous Agent: Active
          </div>
        </div>
      </div>

      {/* Advanced Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Audience Growth (Large Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold">Total Audience Growth</h2>
              <p className="text-sm text-gray-500">Cross-platform follower trajectory</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-sm font-bold">
              <TrendingUp className="w-4 h-4" /> +8.2%
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Area type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Breakdown (Bar Chart) */}
        <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Engagement Breakdown</h2>
            <p className="text-sm text-gray-500">Likes, Comments & Shares</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockEngagementData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} width={70} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="likes" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="comments" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="shares" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Network Connections */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Linked Networks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* LinkedIn (Real DB connection) */}
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <p className="font-bold text-gray-700 dark:text-gray-200">LinkedIn</p>
                </div>
                {loadingStats ? (
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading API...
                  </div>
                ) : linkedInStats.connected ? (
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                      {linkedInStats.followers !== null ? linkedInStats.followers.toLocaleString() : 'Error'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> live via oauth</p>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold w-full"
                    onClick={() => window.location.href = '/api/auth/linkedin'}
                  >
                    Connect via API
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 dark:bg-sky-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Twitter className="w-5 h-5 text-sky-500" />
                  <p className="font-bold text-gray-700 dark:text-gray-200">Twitter / X</p>
                </div>
                {loadingAyrshare ? (
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                ) : ayrshareStats?.platforms?.twitter?.connected ? (
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                      {ayrshareStats.platforms.twitter.followers !== null ? ayrshareStats.platforms.twitter.followers.toLocaleString() : 'N/A'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> live via ayrshare</p>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="mt-3 w-full border-sky-200 text-sky-600 hover:bg-sky-50" onClick={() => window.open('https://app.ayrshare.com/', '_blank')}>
                    Connect via Ayrshare
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <p className="font-bold text-gray-700 dark:text-gray-200">YouTube</p>
                </div>
                {loadingAyrshare ? (
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                ) : ayrshareStats?.platforms?.youtube?.connected ? (
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                      {ayrshareStats.platforms.youtube.followers !== null ? ayrshareStats.platforms.youtube.followers.toLocaleString() : 'N/A'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> live via ayrshare</p>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="mt-3 w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => window.open('https://app.ayrshare.com/', '_blank')}>
                    Connect via Ayrshare
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 dark:bg-pink-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <p className="font-bold text-gray-700 dark:text-gray-200">Instagram</p>
                </div>
                {loadingAyrshare ? (
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                ) : ayrshareStats?.platforms?.instagram?.connected ? (
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                      {ayrshareStats.platforms.instagram.followers !== null ? ayrshareStats.platforms.instagram.followers.toLocaleString() : 'N/A'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> live via ayrshare</p>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="mt-3 w-full border-pink-200 text-pink-600 hover:bg-pink-50" onClick={() => window.open('https://app.ayrshare.com/', '_blank')}>
                    Connect via Ayrshare
                  </Button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LinkedIn High-Reach Content Engine & Queue */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1E293B] to-slate-950 text-white rounded-xl border border-blue-500/20 p-6 shadow-xl overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> High-Reach Thought Leadership
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Linkedin className="w-6 h-6 text-blue-400" /> LinkedIn Automated Post Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Curated viral posts, carousel slide blueprints, and automated 3x/week publishing schedule (Mon, Wed, Fri @ 8:30 AM EST).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              Cron Active (0 13 * * 1,3,5)
            </span>
          </div>
        </div>

        {/* Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {CURATED_LINKEDIN_POSTS.map((post, idx) => (
            <div 
              key={post.id}
              className="bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 rounded-lg p-5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-600 text-white">
                    {post.day} Drop
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {post.theme}
                  </span>
                </div>
                <div className="bg-slate-900/80 rounded p-3 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto mb-4 border border-slate-700">
                  {post.text.slice(0, 240)}...
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-slate-700 text-slate-200 hover:bg-blue-600 hover:text-white"
                    onClick={() => {
                      setPostContent(`${post.text}\n\n${post.hashtags.join(' ')}`);
                      setSelectedPlatforms(['linkedin']);
                      toast.success(`Loaded "${post.day} Drop" into Studio editor below!`);
                    }}
                  >
                    Load into Studio
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-slate-700 text-slate-200 hover:bg-slate-700"
                    onClick={() => {
                      navigator.clipboard.writeText(post.firstComment);
                      toast.success('Copied first-comment link to clipboard!');
                    }}
                  >
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy 1st Comment
                  </Button>
                  {post.carouselSlides && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-slate-700 text-blue-300 hover:bg-slate-700"
                      onClick={() => {
                        setSelectedQueuePost(selectedQueuePost?.id === post.id ? null : post);
                      }}
                    >
                      <Layers className="w-3.5 h-3.5 mr-1" /> {selectedQueuePost?.id === post.id ? 'Hide Slides' : `${post.carouselSlides.length} Carousel Slides`}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="h-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold ml-auto"
                    disabled={triggeringCron === post.id}
                    onClick={async () => {
                      setTriggeringCron(post.id);
                      try {
                        const res = await fetch(`/api/cron/linkedin-engagement?index=${idx}`);
                        const data = await res.json();
                        if (data.success) {
                          toast.success(`Published "${post.theme}" to LinkedIn!`);
                        } else {
                          toast.info(`LinkedIn notice: ${data.error || 'Triggered! Check company feed.'}`);
                        }
                      } catch (err: any) {
                        toast.error(`Trigger failed: ${err.message}`);
                      } finally {
                        setTriggeringCron(null);
                      }
                    }}
                  >
                    {triggeringCron === post.id ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                    Post Now
                  </Button>
                </div>

                {/* Collapsible Carousel Slide Blueprint */}
                {selectedQueuePost?.id === post.id && post.carouselSlides && (
                  <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-blue-500/30 text-xs space-y-3">
                    <p className="font-bold text-blue-400 uppercase tracking-wider text-[11px] flex items-center justify-between">
                      <span>Visual Carousel Design Blueprint ({post.carouselSlides.length} Slides)</span>
                      <span className="text-slate-400 font-normal">Aspect: 1080x1350px (4:5)</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {post.carouselSlides.map((slide) => (
                        <div key={slide.slideNumber} className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <p className="font-bold text-slate-200">Slide {slide.slideNumber}: {slide.headline}</p>
                          <p className="text-slate-400 mt-0.5 text-[11px]">{slide.subheadline}</p>
                          {slide.points && (
                            <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-slate-300 text-[10px]">
                              {slide.points.map((pt, i) => (
                                <li key={i}>{pt}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Publish Studio */}
      <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 dark:bg-purple-900/10 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
        <div className="mb-6 relative z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Send className="w-5 h-5 text-purple-500" />
            Auto-Publish Studio
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-3xl">
            Write a single post and blast it to all your connected social networks instantly. Ayrshare handles the formatting and API limits.
          </p>
        </div>

        <form onSubmit={handleAutoPublish} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Select Networks
            </label>
            <div className="flex flex-wrap gap-3">
              {['twitter', 'linkedin', 'facebook', 'instagram', 'youtube'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors flex items-center gap-2 capitalize ${
                    selectedPlatforms.includes(platform) 
                      ? 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300' 
                      : 'bg-white border-[#DADCE0] text-gray-600 hover:bg-gray-50 dark:bg-[#202124] dark:border-[#3C4043] dark:text-gray-400'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${selectedPlatforms.includes(platform) ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Post Content
            </label>
            <textarea
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What do you want to share with your audience?"
              className="w-full bg-gray-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              disabled={publishing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              {publishResult && (
                <p className={`text-sm font-medium ${publishResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
                  {publishResult.message}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={publishing || !postContent || selectedPlatforms.length === 0}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg"
            >
              {publishing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {publishing ? "Publishing..." : "Blast to All Networks"}
            </Button>
          </div>
        </form>
      </div>

      {/* Leads and Sniper Section */}
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
                <ReactMarkdown components={{ h1: 'h2' }} remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
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
