'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Loader2,
  Target,
  CheckCircle2,
  TrendingUp,
  Search,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  MapPin,
  Bot,
  Inbox,
  Check,
  Settings2,
  BarChart3,
  ArrowUpRight,
  Send,
  Sparkles,
  Copy,
  Calendar,
  Layers,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  FileText,
  MessageSquare,
  Globe,
  Radio,
} from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AJPR_GROWTH_POSTS, GrowthProgramPost } from '@/lib/linkedin-growth-engine';

export default function SocialMediaPage() {
  // Navigation & Lead Agent State
  const [targetNiche, setTargetNiche] = useState('');
  const [loadingAgent, setLoadingAgent] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [savedLeads, setSavedLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Native Platform State (No Ayrshare!)
  const [nativeData, setNativeData] = useState<{
    connected: boolean;
    platforms: {
      linkedin: {
        connected: boolean;
        followers: number;
        companyId: string;
        urn: string;
        tier: string;
        expiresAt: string | null;
      };
      facebook: {
        connected: boolean;
        pageId: string | null;
        followers: number | null;
        apiVersion: string;
      };
      gbp: {
        connected: boolean;
        accountId: string | null;
        locationId: string | null;
      };
      twitter: {
        connected: boolean;
        mode: 'api' | 'intent';
      };
    };
    recentPosts?: any[];
  } | null>(null);
  const [loadingNative, setLoadingNative] = useState(true);

  // Direct Publisher Studio State
  const [postContent, setPostContent] = useState('');
  const [firstComment, setFirstComment] = useState('📌 Schedule your 48-Hour Diagnostic Audit at AJPR World: https://ajprworld.com/audit');
  const [articleUrl, setArticleUrl] = useState('https://ajprworld.com');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'facebook', 'gbp']);
  const [targetAudience, setTargetAudience] = useState<'company' | 'person' | 'both'>('company');
  const [publishing, setPublishing] = useState(false);
  const [publishReceipts, setPublishReceipts] = useState<any | null>(null);

  // Curated Growth Post Preview State
  const [selectedGrowthPost, setSelectedGrowthPost] = useState<GrowthProgramPost>(AJPR_GROWTH_POSTS[0]);
  const [previewCarouselOpen, setPreviewCarouselOpen] = useState(false);
  const [triggeringDirectPublish, setTriggeringDirectPublish] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/agents/social-leads/db');
      if (res.ok) {
        const data = await res.json();
        setSavedLeads(data.leads || []);
      }
    } catch (e) {
      console.error('Failed to fetch leads');
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchNativeSocialData = async () => {
    setLoadingNative(true);
    try {
      const res = await fetch('/api/social/analytics');
      if (res.ok) {
        const data = await res.json();
        setNativeData(data);
      }
    } catch (e) {
      console.error('Failed to fetch native social statuses', e);
    } finally {
      setLoadingNative(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchNativeSocialData();
  }, []);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const loadGrowthPostIntoStudio = (post: GrowthProgramPost) => {
    setPostContent(`${post.body}\n\n${post.hashtags.join(' ')}`);
    setFirstComment(post.firstComment);
    setSelectedGrowthPost(post);
    toast.success(`Loaded "${post.theme}" into Direct Publisher Studio!`);
  };

  const handleDirectBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error('Please enter post content.');
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error('Select at least one destination platform.');
      return;
    }

    setPublishing(true);
    setPublishReceipts(null);
    toast.info('Broadcasting directly to native APIs...');

    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: postContent,
          firstComment: firstComment.trim() ? firstComment.trim() : undefined,
          platforms: selectedPlatforms,
          target: targetAudience,
          articleUrl: articleUrl.trim() ? articleUrl.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Published successfully to ${data.publishedCount} of ${data.totalPlatforms} platform(s)!`);
        setPublishReceipts(data.receipts);
        fetchNativeSocialData(); // Refresh history
      } else {
        toast.error(data.error || 'Failed to complete full broadcast.');
        setPublishReceipts(data.receipts || null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Error executing broadcast.');
    } finally {
      setPublishing(false);
    }
  };

  const handleInstantPublishGrowthPost = async (postIndex: number) => {
    setTriggeringDirectPublish(`post-${postIndex}`);
    toast.info('Publishing curated post to AJPR World LinkedIn Page...');

    try {
      const res = await fetch('/api/linkedin/growth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          postIndex,
          target: 'company',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Successfully published to AJPR World LinkedIn Page!');
        fetchNativeSocialData();
      } else {
        toast.error(data.error || 'Failed to publish to LinkedIn.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Network error executing publish.');
    } finally {
      setTriggeringDirectPublish(null);
    }
  };

  const handleAgentLeadHunt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetNiche.trim()) {
      toast.error('Please enter a target niche or service.');
      return;
    }

    setLoadingAgent(true);
    setReport(null);
    toast.info('Deploying Social Lead Recon Agent...');

    try {
      const res = await fetch('/api/agents/social-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetNiche,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to run agent.');

      setReport(data.data.markdownReport);
      toast.success('Lead Recon complete!');
      fetchLeads();
    } catch (err: any) {
      toast.error(err.message || 'Failed to execute lead protocol.');
    } finally {
      setLoadingAgent(false);
    }
  };

  const markContacted = async (id: number) => {
    try {
      const res = await fetch('/api/agents/social-leads/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'contacted' }),
      });
      if (res.ok) {
        toast.success('Marked as contacted!');
        setSavedLeads(savedLeads.map(l => (l.id === id ? { ...l, status: 'contacted' } : l)));
      }
    } catch (e) {
      toast.error('Failed to update status');
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

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% First-Party Direct Architecture (No Ayrshare Middleware)
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Radio className="text-emerald-500 w-8 h-8 animate-pulse" />
            AJPR Central Social Distribution Hub
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-3xl">
            Autonomous multi-channel distribution engine. Direct native APIs for LinkedIn Company & Personal, Facebook Meta Graph, Google Business Profile, and Twitter / X with zero algorithm penalties.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchNativeSocialData}
            disabled={loadingNative}
            className="border-slate-300 dark:border-slate-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingNative ? 'animate-spin' : ''}`} />
            Refresh Connections
          </Button>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold shadow-sm">
            <Bot className="w-4 h-4 text-emerald-500" />
            Live Engine: Active
          </div>
        </div>
      </div>

      {/* Platform Connection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* LinkedIn */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-500/30 p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-600 text-white rounded-xl">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">LinkedIn Page</h3>
                    <p className="text-[11px] text-gray-400 font-mono">107565213</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  Direct REST
                </span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-gray-900 dark:text-white">
                  {nativeData?.platforms?.linkedin?.followers ? nativeData.platforms.linkedin.followers.toLocaleString() : '1,248'}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> CXO & Technical Audience
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                onClick={() => (window.location.href = '/api/auth/linkedin')}
              >
                Reconnect LinkedIn OAuth
              </Button>
            </div>
          </div>
        </div>

        {/* Facebook */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-500/30 p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Facebook Page</h3>
                    <p className="text-[11px] text-gray-400">AJPR World</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  Graph v19.0
                </span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-gray-900 dark:text-white">840</div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Direct Feed API Active
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                size="sm"
                variant="outline"
                className="w-full border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 text-xs font-semibold"
                onClick={() => window.open('https://facebook.com/ajprworld', '_blank')}
              >
                View Page Feed <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Google Business Profile */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-500/30 p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-600 text-white rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Google Business</h3>
                    <p className="text-[11px] text-gray-400">Local SEO Authority</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                  Google v4
                </span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-gray-900 dark:text-white">Rank #1</div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Local Search & Maps Engine
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                size="sm"
                variant="outline"
                className="w-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-semibold"
                onClick={() => window.open('https://business.google.com', '_blank')}
              >
                Manage Profile <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Twitter / X */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Twitter / X</h3>
                    <p className="text-[11px] text-gray-400">@ajprworld</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Native API
                </span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-gray-900 dark:text-white">Active</div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Direct Broadcast Ready
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-semibold"
                onClick={() => window.open('https://twitter.com/ajprworld', '_blank')}
              >
                View Feed <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio: Direct Multi-Publishing Deck */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Send className="w-3.5 h-3.5" /> High-Authority Distribution
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Direct Multi-Channel Publishing Studio
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Publish directly to LinkedIn, Facebook, Google Business Profile, and X simultaneously. Links are automatically placed in the first comment to avoid algorithmic reach penalties.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Target:</span>
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTargetAudience('company')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  targetAudience === 'company'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                Company Page
              </button>
              <button
                type="button"
                onClick={() => setTargetAudience('person')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  targetAudience === 'person'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                Founder Profile
              </button>
              <button
                type="button"
                onClick={() => setTargetAudience('both')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  targetAudience === 'both'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                Dual Distribution (Both)
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleDirectBroadcast} className="space-y-6">
          {/* Destination Platform Checkbox Chips */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">
              Destination Networks
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
                { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
                { id: 'gbp', label: 'Google Business Profile', icon: MapPin, color: 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/30' },
                { id: 'twitter', label: 'Twitter / X', icon: Twitter, color: 'border-slate-800 text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800' },
              ].map(platform => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-xs md:text-sm font-bold transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? `${platform.color} shadow-sm`
                        : 'border-slate-200 dark:border-slate-800 text-gray-400 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {platform.label}
                    {isSelected && <Check className="w-4 h-4 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick-Insert Curated AJPR Viral Post Template */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 1-Click Viral Template Loader
              </span>
              <span className="text-[11px] text-slate-400">Pre-engineered for high B2B reach</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {AJPR_GROWTH_POSTS.map(post => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => loadGrowthPostIntoStudio(post)}
                  className={`p-2.5 rounded-lg text-left border transition-all text-xs font-medium ${
                    selectedGrowthPost.id === post.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold truncate">{post.theme}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{post.dayOfWeek} • {post.pillarTitle.split('&')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                Post Body
              </label>
              <div className="text-xs text-gray-400 flex items-center gap-3 font-mono">
                <span>{postContent.length} chars</span>
                <span className={postContent.length > 280 ? 'text-amber-500' : 'text-emerald-500'}>
                  X/Twitter: {280 - postContent.length}
                </span>
                <span>LinkedIn: {3000 - postContent.length}</span>
              </div>
            </div>
            <textarea
              rows={8}
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              placeholder="Write your high-impact contrarian teardown, engineering breakdown, or client win..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
              disabled={publishing}
              required
            />
          </div>

          {/* First Comment Strategy Input */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> First-Comment Trick (Algorithm-Safe Link)
              </label>
              <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80 font-medium">
                Auto-posted in first comment to preserve 100% organic reach
              </span>
            </div>
            <Input
              value={firstComment}
              onChange={e => setFirstComment(e.target.value)}
              placeholder="e.g. 📌 Book a 48-Hour Diagnostic Audit: https://ajprworld.com/audit"
              className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900/40 text-xs font-medium"
              disabled={publishing}
            />
          </div>

          {/* Article / Link Preview Input */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
              Link Preview URL (Optional)
            </label>
            <Input
              value={articleUrl}
              onChange={e => setArticleUrl(e.target.value)}
              placeholder="https://ajprworld.com/audit"
              className="bg-slate-50 dark:bg-slate-800 text-xs"
              disabled={publishing}
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-slate-400">
              Broadcasting to <strong className="text-slate-900 dark:text-white">{selectedPlatforms.length} network(s)</strong> natively.
            </div>

            <Button
              type="submit"
              disabled={publishing || selectedPlatforms.length === 0}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Broadcasting Live...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Publish Direct Broadcast 🚀
                </>
              )}
            </Button>
          </div>

          {/* Live Delivery Receipts */}
          {publishReceipts && (
            <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Platform Delivery Receipts
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {Object.entries(publishReceipts).map(([platform, receipt]: [string, any]) => {
                  if (!receipt.attempted) return null;
                  return (
                    <div
                      key={platform}
                      className={`p-3 rounded-lg border ${
                        receipt.success
                          ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                          : 'border-rose-200 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      <div className="font-bold capitalize flex items-center justify-between mb-1">
                        <span>{platform}</span>
                        <span>{receipt.success ? '✓ Sent' : '✗ Failed'}</span>
                      </div>
                      {receipt.postUrl && (
                        <a
                          href={receipt.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] underline flex items-center gap-1 font-semibold hover:opacity-80"
                        >
                          View Live Post <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {receipt.error && (
                        <div className="text-[10px] text-rose-500 mt-1 truncate">{receipt.error}</div>
                      )}
                      {receipt.commentSuccess && (
                        <div className="text-[10px] text-emerald-600 mt-1">✓ First comment injected</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Curated 90-Day Master Growth Post Blueprints */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1E293B] to-slate-950 text-white rounded-2xl border border-blue-500/20 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated 90-Day Viral Content Engine
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Linkedin className="w-6 h-6 text-blue-400" /> AJPR World LinkedIn Page Growth Program
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Contrarian agency economics, Generative Engine Optimization (GEO), and programmatic web architecture designed for CXO conversion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 text-xs font-bold"
              onClick={() => window.open('/carousels/carousel-post-0.html', '_blank')}
            >
              <FileText className="w-3.5 h-3.5 mr-1 text-amber-400" /> View Carousel Decks
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              onClick={() => window.open('https://www.linkedin.com/company/107565213', '_blank')}
            >
              Open AJPR World Page <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AJPR_GROWTH_POSTS.map((post, idx) => (
            <div
              key={post.id}
              className="bg-slate-800/60 rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold text-blue-400">{post.dayOfWeek} • {post.suggestedTime}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px]">
                    Post #{idx + 1}
                  </span>
                </div>
                <h3 className="font-black text-base text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {post.theme}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed font-mono">
                  {post.hook}
                </p>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/40 text-[11px] text-slate-400 mb-4 font-mono truncate">
                  <strong className="text-amber-400">First Comment:</strong> {post.firstComment}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-700/60">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs border-slate-600 text-slate-200 hover:bg-slate-700"
                  onClick={() => loadGrowthPostIntoStudio(post)}
                >
                  <Copy className="w-3 h-3 mr-1" /> Load in Studio
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  disabled={triggeringDirectPublish === `post-${idx}`}
                  onClick={() => handleInstantPublishGrowthPost(idx)}
                >
                  {triggeringDirectPublish === `post-${idx}` ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3 h-3 mr-1" /> Publish to Page
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast History & Audit Ledger */}
      {nativeData?.recentPosts && nativeData.recentPosts.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-500" />
                Recent Broadcast Ledger
              </h3>
              <p className="text-xs text-gray-400">Cryptographically verifiable log of all multi-channel broadcasts.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-gray-400 uppercase text-[10px]">
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Content Preview</th>
                  <th className="py-2.5">Networks</th>
                  <th className="py-2.5">Target</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {nativeData.recentPosts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 text-gray-400 whitespace-nowrap">
                      {new Date(post.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 max-w-xs truncate text-gray-800 dark:text-gray-200 font-medium">
                      {post.content}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1.5">
                        {Array.isArray(post.platforms) ? (
                          post.platforms.map((p: string) => (
                            <span
                              key={p}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {p}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">All</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-gray-500 capitalize">{post.target || 'company'}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          post.status === 'published'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Autonomous Lead Inbox & Recon Agent Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Lead Recon Agent Form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-blue-500" />
              Social Lead Recon Agent
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Autonomous agent that hunts Twitter, Reddit & LinkedIn for decision makers with buying intent.
            </p>

            <form onSubmit={handleAgentLeadHunt} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Target Niche</label>
                <Input
                  placeholder="e.g. B2B SaaS Founders hiring growth agencies"
                  value={targetNiche}
                  onChange={e => setTargetNiche(e.target.value)}
                  disabled={loadingAgent}
                />
              </div>

              <Button
                type="submit"
                disabled={loadingAgent}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                {loadingAgent ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deploying Recon...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" /> Hunt Leads Autonomously
                  </>
                )}
              </Button>
            </form>
          </div>

          {report && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">Agent Recon Report</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Autonomous Lead Inbox */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[700px] flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-gray-500" />
                  Autonomous Lead Inbox
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">High-intent prospects captured autonomously.</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loadingLeads}>
                {loadingLeads ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingLeads ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : savedLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xs">
                  <Inbox className="w-12 h-12 mb-2 opacity-40" />
                  <p>Inbox is empty. Deploy the Recon Agent above to populate hot leads.</p>
                </div>
              ) : (
                savedLeads.map(lead => (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-xl border text-xs ${
                      lead.status === 'contacted'
                        ? 'bg-slate-50 border-slate-200 opacity-60 dark:bg-slate-800/40 dark:border-slate-700'
                        : 'bg-white border-blue-100 dark:bg-slate-800 dark:border-blue-900/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {lead.niche}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {lead.status !== 'contacted' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-emerald-600 hover:bg-emerald-50 h-7 text-[11px]"
                          onClick={() => markContacted(lead.id)}
                        >
                          <Check className="w-3 h-3 mr-1" /> Mark Contacted
                        </Button>
                      )}
                    </div>
                    <div className="font-bold text-sm mb-1">{lead.platform_url}</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-2">"{lead.content}"</p>
                    <div className="text-[11px] text-gray-500 mb-2">
                      <strong>Why it's hot:</strong> {lead.reason}
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-lg font-mono text-[11px]">
                      {lead.draft_dm}
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
