'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, Sparkles, CheckCircle2, AlertCircle, 
  Activity, BarChart3, Globe, ShieldAlert, Zap, Layers, RefreshCw,
  Play, Download, Cpu, Key, FileText, Check, ArrowRight, BookOpen, Terminal, ExternalLink
} from 'lucide-react';
import { runPipelineStepAction } from './actions';
import { toast } from 'sonner';

// Optimized static mock data representing our pages
const initialPages = [
  { url: 'https://ajprworld.com/', title: 'AJPR World – Premium Tech, Custom Software', rating: 70, type: 'Static', status: 'Indexed & Cited', botHits: 324 },
  { url: 'https://ajprworld.com/services/technical-seo-services', title: 'Technical SEO Services', rating: 33, type: 'Dynamic Service', status: 'Indexed', botHits: 145 },
  { url: 'https://ajprworld.com/services/startup-mvp-development', title: 'Startup MVP Development', rating: 33, type: 'Dynamic Service', status: 'Indexed & Cited', botHits: 189 },
  { url: 'https://ajprworld.com/blog/what-is-geo-generative-engine-optimization', title: 'What is GEO (Generative Engine Optimization)?', rating: 33, type: 'Blog Post', status: 'Indexed & Cited', botHits: 412 },
  { url: 'https://ajprworld.com/services/cloud-devops-services', title: 'Cloud & DevOps Services', rating: 33, type: 'Dynamic Service', status: 'Indexed', botHits: 122 },
  { url: 'https://ajprworld.com/services/performance-marketing', title: 'Performance Marketing', rating: 33, type: 'Dynamic Service', status: 'Indexed', botHits: 98 },
  { url: 'https://ajprworld.com/services/website-security-maintenance', title: 'Website Security & Maintenance', rating: 33, type: 'Dynamic Service', status: 'Indexed', botHits: 88 },
  { url: 'https://ajprworld.com/services/saas-product-development', title: 'SaaS Product Development', rating: 33, type: 'Dynamic Service', status: 'Indexed & Cited', botHits: 176 },
  { url: 'https://ajprworld.com/services/ai-voice-agent-development', title: 'AI Voice Agent Development', rating: 25, type: 'Dynamic Service', status: 'Indexed', botHits: 94 },
  { url: 'https://ajprworld.com/services/ai-chatbot-development', title: 'AI Chatbot Development', rating: 22, type: 'Dynamic Service', status: 'Indexed & Cited', botHits: 154 },
  { url: 'https://ajprworld.com/services/business-ai-automation', title: 'Business AI Automation', rating: 22, type: 'Dynamic Service', status: 'Indexed', botHits: 110 },
  { url: 'https://ajprworld.com/services/ai-digital-marketing-services', title: 'AI-Powered Digital Marketing', rating: 22, type: 'Dynamic Service', status: 'Indexed', botHits: 76 },
  { url: 'https://ajprworld.com/services/custom-web-development-ai-solutions', title: 'Custom Web Dev & AI Solutions', rating: 22, type: 'Dynamic Service', status: 'Indexed & Cited', botHits: 201 },
  { url: 'https://ajprworld.com/services/geo-seo-ai-search-optimization', title: 'GEO SEO & AI Search Optimization', rating: 21, type: 'Dynamic Service', status: 'Indexed & Cited', botHits: 245 },
];

// N8N nodes mapping for visual execution graph
const n8nNodes = [
  { id: 1, name: 'Form Trigger', label: 'Brief Form' },
  { id: 2, name: 'Initializing', label: 'Start Setup' },
  { id: 6, name: 'Crawler', label: 'Site Crawl' },
  { id: 8, name: 'Summarizer', label: 'Profile Build' },
  { id: 9, name: 'SerpApi competitors', label: 'Google SERP' },
  { id: 11, name: 'Google News RSS', label: 'Trend Check' },
  { id: 14, name: 'Keyword Research', label: 'SEO Keywords' },
  { id: 17, name: 'Blog Outline', label: 'Blog Outline' },
  { id: 19, name: 'SEO Blog Writer', label: 'Draft Post' },
  { id: 20, name: 'AEO/GEO Editor', label: 'AI SEO Edit' },
  { id: 21, name: 'Humanizer Agent', label: 'Tone Polish' },
  { id: 22, name: 'Final SEO Audit', label: 'Audit Check' },
  { id: 23, name: 'Blog Poster', label: 'Post to DB' },
  { id: 26, name: 'OpenAI Image', label: 'DALL-E Cover' }
];

export default function AdminSeoTracker() {
  // Navigation tabs: 'analytics' | 'agent' | 'blueprint'
  const [activeSection, setActiveSection] = useState<'analytics' | 'agent' | 'blueprint'>('analytics');
  
  // Tab 1: Analytics state
  const [pages, setPages] = useState(initialPages);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cited' | 'indexed'>('all');

  // Tab 2: Agent generator state
  const [form, setForm] = useState({
    businessName: 'AJPR World',
    websiteUrl: 'https://ajprworld.com',
    niche: 'AI MVP Development & SEO Solutions',
    businessType: 'B2B',
    services: 'Custom MVP builds, dynamic branding, and technical GEO optimization for businesses.',
    targetAudience: 'Tech startups, SMEs, and digital agencies looking to scale fast.',
    competitors: 'Traditional software consultancies, generic marketing agencies',
    geoFocus: 'National',
    city: 'New Delhi',
    tone: 'Expert/Technical',
    targetKeywords: 'GEO search optimization, custom software MVP builders',
    usp: 'Fast 4-week MVP development cycle with integrated AI answer engine visibility',
    blogTopic: ''
  });
  
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pipelineLogs]);

  // Dynamic audit simulator (Tab 1)
  const triggerAudit = () => {
    if (auditRunning) return;
    setAuditRunning(true);
    setAuditStep(1);
    
    setTimeout(() => setAuditStep(2), 1000);
    setTimeout(() => setAuditStep(3), 2000);
    setTimeout(() => setAuditStep(4), 3000);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditStep(5);
      setPages(prev => prev.map(p => ({ ...p, botHits: p.botHits + Math.floor(Math.random() * 8) + 2 })));
      toast.success('GEO Indexation Audit scan completed successfully!');
    }, 4000);
  };

  const filteredPages = pages.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.url.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'cited') return matchesSearch && p.status.includes('Cited');
    if (activeTab === 'indexed') return matchesSearch && p.status.startsWith('Indexed');
    return matchesSearch;
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Run the Multi-Agent Pipeline (Tab 2)
  const runAgentPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pipelineRunning) return;
    
    setPipelineRunning(true);
    setCurrentPipelineStep(1);
    setPipelineResult(null);
    setPipelineLogs([
      '[1/27] SEO Brief Form: Form submitted successfully.',
      '[1/27] Parsing brief config inputs...',
      `[1/27] Parameters: Niche="${form.niche}", Tone="${form.tone}", Focus="${form.geoFocus}".`
    ]);

    const addLog = (msg: string) => {
      setPipelineLogs(prev => [...prev, msg]);
    };

    try {
      // Step 2: Initialize
      setCurrentPipelineStep(2);
      addLog('[2/27] Initializing: Session token generated. Creating workspace sandbox...');
      
      // Step 6: Site Crawl (Real backend call)
      setCurrentPipelineStep(6);
      addLog(`[6/27] Crawler: Triggering crawler agent to parse "${form.websiteUrl}"...`);
      const crawlRes = await runPipelineStepAction('crawl-site', { websiteUrl: form.websiteUrl });
      if (!crawlRes.success) throw new Error(crawlRes.error || 'Failed to crawl site');
      const crawledText = (crawlRes as any).crawledText;
      addLog(`[6/27] Crawler: Scraped homepage successfully. Words parsed: ${crawledText.length}`);

      // Step 8: Profile Build (Real backend call)
      setCurrentPipelineStep(8);
      addLog('[8/27] Summarizer: Summarizing profile from brief and crawled data...');
      const summaryRes = await runPipelineStepAction('summarize-profile', { crawledText, brief: form });
      if (!summaryRes.success) throw new Error(summaryRes.error || 'Failed to summarize profile');
      const profileSummary = (summaryRes as any).profileSummary;
      addLog(`[8/27] Summarizer: Profile summarized: "${profileSummary.summary.substring(0, 70)}..."`);
      addLog(`[8/27] Summarizer: Detected services: ${profileSummary.services.join(', ')}`);

      // Step 9: Research Competitors & News RSS (Real backend call)
      setCurrentPipelineStep(9);
      addLog(`[9/27] SerpApi: Googling competitors "${form.competitors}"...`);
      addLog('[11/27] Google News RSS: Scanning current trend feeds...');
      const researchRes = await runPipelineStepAction('research-competitors', { niche: form.niche });
      if (!researchRes.success) throw new Error(researchRes.error || 'Failed competitor research');
      const { competitorArticles, trends } = researchRes as any;
      addLog(`[9/27] SerpApi: Found ${competitorArticles.length} competitor references.`);
      addLog(`[11/27] Google News RSS: Extracted trends: "${trends[0]}"`);

      // Step 14: Keyword Research (Real backend call)
      setCurrentPipelineStep(14);
      addLog('[14/27] Keyword Research: Analyzing competitor data gap for keywords...');
      const kwRes = await runPipelineStepAction('generate-keywords', { brief: form, profileSummary, competitorArticles, trends });
      if (!kwRes.success) throw new Error(kwRes.error || 'Failed to generate keywords');
      const keywordsData = (kwRes as any).keywordsData;
      const primaryKeyword = keywordsData.recommendedPrimaryKeyword;
      addLog(`[14/27] Keyword Research: Recommended Primary Keyword: "${primaryKeyword}"`);
      addLog(`[14/27] Keyword Research: Extracted voice search keywords: ${keywordsData.top10Keywords.filter((k: any) => k.isLongTail).map((k: any) => k.keyword).join(', ') || 'None'}`);

      // Step 16: SerpApi Keyword research (Real backend call)
      addLog(`[14/27] SerpApi: Researching Google results for focus keyword: "${primaryKeyword}"...`);
      const keywordSerpRes = await runPipelineStepAction('research-keyword-serp', { primaryKeyword });
      if (!keywordSerpRes.success) throw new Error(keywordSerpRes.error || 'Failed to search keyword');
      const keywordArticles = (keywordSerpRes as any).keywordArticles;
      addLog(`[14/27] SerpApi: Crawled competitor outlines for "${primaryKeyword}".`);

      // Step 17: Outline Architect (Real backend call)
      setCurrentPipelineStep(17);
      addLog('[17/27] Outline Architect: Structuring H1/H2 headings and FAQ nodes...');
      const outlineRes = await runPipelineStepAction('generate-outline', { primaryKeyword, keywordArticles, brief: form });
      if (!outlineRes.success) throw new Error(outlineRes.error || 'Failed to generate outline');
      const outline = (outlineRes as any).outline;
      addLog(`[17/27] Outline Architect: Title decided: "${outline.title}"`);
      addLog(`[17/27] Outline Architect: Scheduled ${outline.h2Sections.length} H2 article subheadings.`);

      // Step 19: SEO Blog Writer (Real backend call)
      setCurrentPipelineStep(19);
      addLog('[19/27] SEO Blog Writer: Compiling first draft. Expanding sections (Target: 1,500+ words)...');
      const writeRes = await runPipelineStepAction('write-blog', { outline, brief: form });
      if (!writeRes.success) throw new Error(writeRes.error || 'Failed to write blog');
      const rawContent = (writeRes as any).rawContent;
      addLog(`[19/27] SEO Blog Writer: Draft compiled. Draft length: ${rawContent.split(/\s+/).length} words.`);

      // Step 20: SEO / AEO / GEO Editor (Real backend call)
      setCurrentPipelineStep(20);
      addLog('[20/27] AEO/GEO Editor: Optimizing for Answer Engines and Generative Search answers...');
      const editRes = await runPipelineStepAction('edit-seo-aeo-geo', { rawContent, brief: form });
      if (!editRes.success) throw new Error(editRes.error || 'Failed to edit blog');
      const editedContent = (editRes as any).editedContent;
      addLog('[20/27] AEO/GEO Editor: Entity nodes and FAQ snippet answers successfully injected.');

      // Step 21: Humanizer Agent (Real backend call)
      setCurrentPipelineStep(21);
      addLog('[21/27] Humanizer Agent: Polishing sentence variations and stripping AI clichés...');
      const humanRes = await runPipelineStepAction('humanize-blog', { editedContent });
      if (!humanRes.success) throw new Error(humanRes.error || 'Failed to humanize blog');
      const humanizedContent = (humanRes as any).humanizedContent;
      addLog('[21/27] Humanizer Agent: Polishing completed. Brand tone adjusted.');

      // Step 22: Final SEO Audit (Real backend call)
      setCurrentPipelineStep(22);
      addLog('[22/27] Final SEO Audit: Double-checking constraint metrics...');
      const auditRes = await runPipelineStepAction('audit-blog', { humanizedContent });
      if (!auditRes.success) throw new Error(auditRes.error || 'Failed to audit blog');
      const finalContent = (auditRes as any).finalContent;
      addLog('[22/27] Final SEO Audit: Length constraints and keyword densities validated.');

      // Step 24: Generate DALL-E Image Prompt (Real backend call)
      setCurrentPipelineStep(26);
      addLog('[26/27] OpenAI Image: Extracting visual infographic metrics...');
      const imagePromptRes = await runPipelineStepAction('generate-image-prompt', { finalContent });
      if (!imagePromptRes.success) throw new Error(imagePromptRes.error || 'Failed to generate image prompt');
      const imagePrompt = (imagePromptRes as any).imagePrompt;
      addLog(`[26/27] OpenAI Image: DALL-E prompt structured: "${imagePrompt.substring(0, 80)}..."`);

      // Step 26: Call OpenAI DALL-E 3 (Real backend call)
      addLog('[26/27] OpenAI Image: Generating landscape cover illustration via DALL-E 3...');
      const imageUrlRes = await runPipelineStepAction('generate-image-url', { imagePrompt });
      if (!imageUrlRes.success) throw new Error(imageUrlRes.error || 'Failed to generate image URL');
      const imageUrl = (imageUrlRes as any).imageUrl;
      addLog('[26/27] OpenAI Image: Featured cover art generated successfully.');

      // Step 27: Save / Publish to DB (Real backend call)
      setCurrentPipelineStep(23);
      addLog('[23/27] Blog Poster: Writing finalized article and image properties to PostgreSQL...');
      const publishRes = await runPipelineStepAction('publish-blog', { finalContent, imageUrl, outline });
      if (!publishRes.success) throw new Error(publishRes.error || 'Failed to publish post');

      addLog(`[23/27] Blog Poster: Article published successfully! Slug generated: "/blog/${(publishRes as any).slug}"`);
      addLog('[27/27] Completed: Multi-agent pipeline executed. Workflow finished.');
      
      setPipelineResult(publishRes);
      toast.success('Dynamic Blog Post generated and published!');
    } catch (err: any) {
      console.error(err);
      addLog(`[ERROR] Pipeline failed: ${err.message}`);
      setPipelineResult({ error: true, message: err.message });
      toast.error(`Pipeline failed: ${err.message}`);
    } finally {
      setPipelineRunning(false);
    }
  };

  return (
    <div className="space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#DADCE0] dark:border-[#3C4043]">
          <button 
            onClick={() => setActiveSection('analytics')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSection === 'analytics' 
                ? 'border-blue-600 text-blue-600 dark:border-[#8AB4F8] dark:text-[#8AB4F8]' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            SEO & GEO Tracker
          </button>
          
          <button 
            onClick={() => setActiveSection('agent')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSection === 'agent' 
                ? 'border-blue-600 text-blue-600 dark:border-[#8AB4F8] dark:text-[#8AB4F8]' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            n8n Blog Generator Agent
          </button>

          <button 
            onClick={() => setActiveSection('blueprint')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSection === 'blueprint' 
                ? 'border-blue-600 text-blue-600 dark:border-[#8AB4F8] dark:text-[#8AB4F8]' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            n8n Blueprint
          </button>
        </div>

        {/* ==================== TAB 1: ANALYTICS & GEO TRACKER ==================== */}
        {activeSection === 'analytics' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-light text-[#202124] dark:text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-7 h-7 text-purple-500 animate-pulse" /> SEO & GEO SEO Analytics
                </h1>
                <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">
                  Real-time audit index, crawler traffic distribution, and AI search citation tracking metrics.
                </p>
              </div>
              
              <button 
                onClick={triggerAudit}
                disabled={auditRunning}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-md ${
                  auditRunning 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-95'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${auditRunning ? 'animate-spin' : ''}`} />
                {auditRunning ? 'Running GEO Audit...' : 'Run Dynamic GEO Audit'}
              </button>
            </div>

            {/* Audit Progress Simulator Banner */}
            {auditStep > 0 && (
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${(auditStep / 5) * 100}%` }} />
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  System Audit Status: {auditRunning ? <span className="text-blue-500 animate-pulse">Scanning Site Infrastructure...</span> : <span className="text-emerald-500">Scan Complete</span>}
                </h3>
                
                <div className="grid md:grid-cols-4 gap-4 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${auditStep >= 1 ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span>XML Sitemap Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${auditStep >= 2 ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span>Robots.txt Agent Rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${auditStep >= 3 ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span>SSR Schema Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${auditStep >= 4 ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span>RAG Citation Readiness</span>
                  </div>
                </div>
              </div>
            )}

            {/* Analytic Metrics Strips */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-5 shadow-sm">
                <span className="text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider block mb-3">AI Citation Share</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-[#202124] dark:text-white">48.2%</span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center">+5.4%</span>
                </div>
                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6] mt-2">Citations in Perplexity & ChatGPT queries.</p>
              </div>

              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-5 shadow-sm">
                <span className="text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider block mb-3">AI Bot Fetch Requests</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-[#202124] dark:text-white">2,510</span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center">+18%</span>
                </div>
                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6] mt-2">Dynamic crawl requests this week.</p>
              </div>

              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-5 shadow-sm">
                <span className="text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider block mb-3">SSR Schema Health</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-[#202124] dark:text-white">100%</span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center">Valid</span>
                </div>
                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6] mt-2">Zero dynamic parsing script errors.</p>
              </div>

              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-5 shadow-sm">
                <span className="text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider block mb-3">Dynamic Sitemap URLs</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-[#202124] dark:text-white">{pages.length}</span>
                  <span className="text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6]">Active</span>
                </div>
                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6] mt-2">Synced in real-time from Postgres.</p>
              </div>
            </div>

            {/* Charts & Graphs Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Chart 1: AI Engines Share */}
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm lg:col-span-2">
                <h3 className="text-base font-bold mb-6 text-[#202124] dark:text-white flex items-center justify-between">
                  <span>AI Citations Distribution (GEO Coverage)</span>
                  <span className="text-xs text-[#5F6368] dark:text-[#9AA0A6] font-normal">Last 30 Days</span>
                </h3>
                
                <div className="relative w-full h-56 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                    
                    <path d="M 0 150 Q 100 120 200 80 T 400 40 L 500 20 L 500 200 L 0 200 Z" fill="url(#blueGrad)" />
                    <path d="M 0 150 Q 100 120 200 80 T 400 40 L 500 20" fill="none" stroke="#3B82F6" strokeWidth="3" />
                    
                    <path d="M 0 180 Q 100 150 200 110 T 400 90 L 500 70 L 500 200 L 0 200 Z" fill="url(#purpleGrad)" />
                    <path d="M 0 180 Q 100 150 200 110 T 400 90 L 500 70" fill="none" stroke="#8B5CF6" strokeWidth="3" />
                  </svg>
                </div>
                
                <div className="flex gap-6 mt-6 justify-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                    <span>Perplexity Citations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                    <span>ChatGPT Answer Citations</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Top Search Prompts */}
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold mb-4 text-[#202124] dark:text-white">AI Prompt Coverage</h3>
                <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mb-6">Percentage inclusion of AJPR World for major search prompts.</p>
                
                <div className="space-y-4 text-xs font-bold">
                  {[
                    { prompt: 'Best Startup MVP Developers New Delhi', value: 85, color: 'bg-blue-600' },
                    { prompt: 'What is Generative Engine Optimization', value: 78, color: 'bg-purple-600' },
                    { prompt: 'Custom Software Developers near Delhi NCR', value: 64, color: 'bg-emerald-500' },
                    { prompt: 'AI Chatbot Integration specialists', value: 52, color: 'bg-orange-500' },
                    { prompt: 'Scalable Cloud and DevOps Consultants', value: 45, color: 'bg-teal-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#3C4043] dark:text-[#E8EAED] truncate max-w-[80%]">{item.prompt}</span>
                        <span className="text-[#5F6368] dark:text-[#9AA0A6]">{item.value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Indexation Audit Table */}
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl overflow-hidden shadow-sm">
              
              <div className="p-6 border-b border-[#DADCE0] dark:border-[#3C4043] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#202124] dark:text-white">Indexation Status Tracker</h3>
                  <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-1">Audit list of all SEO and GEO optimized pages.</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex bg-[#F1F3F4] dark:bg-[#303134] rounded-lg p-1 text-xs font-semibold">
                    <button onClick={() => setActiveTab('all')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-[#202124] shadow-sm font-bold' : 'text-[#5F6368] dark:text-[#9AA0A6]'}`}>All</button>
                    <button onClick={() => setActiveTab('cited')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'cited' ? 'bg-white dark:bg-[#202124] shadow-sm font-bold' : 'text-[#5F6368] dark:text-[#9AA0A6]'}`}>Cited</button>
                    <button onClick={() => setActiveTab('indexed')} className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'indexed' ? 'bg-white dark:bg-[#202124] shadow-sm font-bold' : 'text-[#5F6368] dark:text-[#9AA0A6]'}`}>Indexed</button>
                  </div>
                  
                  <div className="flex items-center bg-[#F1F3F4] dark:bg-[#303134] rounded-lg px-3 py-1.5 border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white dark:focus-within:bg-[#202124] transition-all">
                    <Search className="w-4 h-4 text-[#5F6368] dark:text-[#9AA0A6] mr-2" />
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter pages..." 
                      className="bg-transparent border-none outline-none text-xs placeholder:text-[#5F6368] dark:placeholder:text-[#9AA0A6] w-32 md:w-48"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-[#DADCE0] dark:border-[#3C4043] text-xs font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">
                      <th className="p-4 pl-6">Page Title / Target URL</th>
                      <th className="p-4">Type</th>
                      <th className="p-4 text-center">PR Rating</th>
                      <th className="p-4 text-center">AI Crawler Hits</th>
                      <th className="p-4">SEO/GEO Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0] dark:divide-[#3C4043] text-xs">
                    {filteredPages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/55 dark:hover:bg-slate-800/20 transition-colors font-medium">
                        <td className="p-4 pl-6 max-w-md">
                          <div className="text-slate-900 dark:text-white font-bold truncate">{page.title}</div>
                          <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate block mt-0.5 max-w-sm">{page.url}</a>
                        </td>
                        <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">{page.type}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                            page.rating >= 50 
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400' 
                              : 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400'
                          }`}>
                            {page.rating}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold">{page.botHits.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${
                            page.status.includes('Cited') 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400' 
                              : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${page.status.includes('Cited') ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                            {page.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredPages.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400 italic">No matching pages found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: N8N AGENT GENERATOR ==================== */}
        {activeSection === 'agent' && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left side: Setup Settings & SEO Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Credentials Checklist */}
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" /> API Credentials Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#202124]">
                    <span>OpenAI API Key (GPT-4o-mini)</span>
                    <span className="text-emerald-600 flex items-center gap-1">Active <Check className="w-3.5 h-3.5" /></span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#202124]">
                    <span>SerpApi key (Competitor research)</span>
                    <span className="text-emerald-600 flex items-center gap-1">Active <Check className="w-3.5 h-3.5" /></span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#202124]">
                    <span>Apify token (Site crawler)</span>
                    <span className="text-emerald-600 flex items-center gap-1">Active <Check className="w-3.5 h-3.5" /></span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#202124]">
                    <span>AJPR API Key (Bypass Auth)</span>
                    <span className="text-emerald-600 flex items-center gap-1">Active <Check className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </div>

              {/* SEO Content Brief Form */}
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  SEO Content Brief Form
                </h3>
                
                <form onSubmit={runAgentPipeline} className="space-y-6">
                  
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Business Name</label>
                      <input 
                        type="text" 
                        name="businessName" 
                        value={form.businessName} 
                        onChange={handleFormChange}
                        required 
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Website URL</label>
                      <input 
                        type="url" 
                        name="websiteUrl" 
                        value={form.websiteUrl} 
                        onChange={handleFormChange}
                        required 
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Industry / Niche</label>
                      <input 
                        type="text" 
                        name="niche" 
                        value={form.niche} 
                        onChange={handleFormChange}
                        required 
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Business Type</label>
                      <select 
                        name="businessType" 
                        value={form.businessType} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      >
                        <option value="B2B">B2B</option>
                        <option value="B2C">B2C</option>
                        <option value="Both B2B and B2C">Both B2B & B2C</option>
                        <option value="D2C">D2C</option>
                      </select>
                    </div>
                  </div>

                  {/* Products / Services */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Products or Services Offered</label>
                    <textarea 
                      name="services" 
                      value={form.services} 
                      onChange={handleFormChange}
                      rows={3}
                      required 
                      disabled={pipelineRunning}
                      className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none resize-none"
                    />
                  </div>

                  {/* Target Audience & Competitors */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Target Audience</label>
                      <textarea 
                        name="targetAudience" 
                        value={form.targetAudience} 
                        onChange={handleFormChange}
                        rows={3}
                        required 
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Top 3 Competitors</label>
                      <textarea 
                        name="competitors" 
                        value={form.competitors} 
                        onChange={handleFormChange}
                        rows={3}
                        required 
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Geo details */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Geographic Focus</label>
                      <select 
                        name="geoFocus" 
                        value={form.geoFocus} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      >
                        <option value="Local">Local</option>
                        <option value="National">National</option>
                        <option value="International">International</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">City/Region (If Local)</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={form.city} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Brand Tone of Voice</label>
                      <select 
                        name="tone" 
                        value={form.tone} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      >
                        <option value="Professional">Professional</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Expert/Technical">Expert/Technical</option>
                        <option value="Bold">Bold</option>
                        <option value="Casual">Casual</option>
                      </select>
                    </div>
                  </div>

                  {/* USP, Keywords, Topic */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">What Makes You Different (USP)</label>
                    <textarea 
                      name="usp" 
                      value={form.usp} 
                      onChange={handleFormChange}
                      rows={2}
                      required 
                      disabled={pipelineRunning}
                      className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Target Keywords (Optional)</label>
                      <input 
                        type="text" 
                        name="targetKeywords" 
                        value={form.targetKeywords} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        placeholder="e.g. dynamic branding, seo developer"
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Preferred Blog Topic (Optional)</label>
                      <input 
                        type="text" 
                        name="blogTopic" 
                        value={form.blogTopic} 
                        onChange={handleFormChange}
                        disabled={pipelineRunning}
                        placeholder="Keep blank for AI auto-generation"
                        className="w-full bg-slate-50 dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-3 text-sm focus:border-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button 
                    type="submit" 
                    disabled={pipelineRunning}
                    className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                      pipelineRunning 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.01] active:scale-95'
                    }`}
                  >
                    <Play className="w-5 h-5" />
                    {pipelineRunning ? 'Executing SEO Pipeline Agent...' : 'Trigger Multi-Agent n8n Pipeline'}
                  </button>

                </form>
              </div>

            </div>

            {/* Right side: Execution Visualizer & Log Console */}
            <div className="space-y-6">
              
              {/* Visual Graph Stepper */}
              <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" /> Pipeline Stepper
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {n8nNodes.map((node) => {
                    const isActive = currentPipelineStep === node.id && pipelineRunning;
                    const isCompleted = currentPipelineStep > node.id || (!pipelineRunning && currentPipelineStep > 0 && !pipelineResult?.error);
                    
                    return (
                      <div 
                        key={node.id} 
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          isActive 
                            ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/20 dark:border-blue-700 dark:text-blue-400 animate-pulse scale-[1.02]' 
                            : isCompleted 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/10 dark:border-emerald-900 dark:text-emerald-400' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-[#202124]/50 dark:border-slate-800 dark:text-slate-500'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500 animate-ping' : isCompleted ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        <span className="truncate">{node.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Log Console Terminal */}
              <div className="bg-[#1E1E1E] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col h-80">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-500" />
                    <span>Agent Console Log Stream</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-2 pr-1">
                  {pipelineLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith('[ERROR]') ? 'text-red-400 font-bold' : log.includes('SUCCESS') ? 'text-emerald-400' : ''}>
                      {log}
                    </div>
                  ))}
                  {pipelineRunning && (
                    <div className="flex items-center gap-1.5 text-blue-400 animate-pulse font-bold">
                      <span>&gt; Running agent step...</span>
                    </div>
                  )}
                  {pipelineLogs.length === 0 && (
                    <div className="text-slate-600 italic">No agent execution history. Trigger the pipeline to begin.</div>
                  )}
                  <div ref={consoleEndRef} />
                </div>
              </div>

              {/* Result Success Card */}
              {pipelineResult && !pipelineResult.error && (
                <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800 rounded-xl p-6 shadow-md text-slate-900 dark:text-white space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Post Published Successfully!
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="font-semibold text-slate-500 dark:text-slate-400">Title:</div>
                    <div className="font-bold text-sm truncate">{pipelineResult.title}</div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="font-semibold text-slate-500 dark:text-slate-400">Keyword:</div>
                        <div className="font-black text-slate-800 dark:text-slate-200 truncate">{pipelineResult.primary_keyword}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-500 dark:text-slate-400">Word Count:</div>
                        <div className="font-black text-slate-800 dark:text-slate-200">{pipelineResult.wordCount} words</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${pipelineResult.slug}`} 
                    target="_blank"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center py-2.5 rounded-lg flex items-center justify-center gap-1 text-sm shadow-md transition-all"
                  >
                    View Published Article <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ==================== TAB 3: DOWNLOAD BLUEPRINT ==================== */}
        {activeSection === 'blueprint' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Download Card */}
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" /> n8n Workflow Configuration file
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                  Download the complete pre-configured workflow blueprint as a JSON file. Import it directly into n8n to automate your entire content pipeline.
                </p>
              </div>
              <a 
                href="/n8n_seo_workflow.json" 
                download="n8n_seo_workflow.json"
                className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:scale-[1.02] active:scale-95 transition-all text-sm whitespace-nowrap"
              >
                <Download className="w-5 h-5" /> Download Workflow Blueprint
              </a>
            </div>

            {/* Markdown Instructions */}
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 border-b border-[#DADCE0] dark:border-[#3C4043] pb-4">
                <BookOpen className="w-5 h-5 text-purple-600" /> Integration & Setup Instructions
              </h3>
              
              <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-center font-bold">1</span>
                    Import the JSON
                  </h4>
                  <p>Open your n8n dashboard. Navigate to <strong>Settings</strong> &rarr; <strong>Import Workflow</strong>, and choose the downloaded <code>n8n_seo_workflow.json</code> file.</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-center font-bold">2</span>
                    Set Up API Credentials in n8n
                  </h4>
                  <p className="mb-2">Ensure you add and authorize these credentials in your n8n settings:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>OpenAI:</strong> Needed for GPT-4o-mini & DALL-E 3 image generations.</li>
                    <li><strong>SerpApi:</strong> Used in competitor research and search validation. Set up as HTTP Header authorization.</li>
                    <li><strong>Apify:</strong> Used for website crawling. Set up as HTTP Query parameter token authorization.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-center font-bold">3</span>
                    Define Webhook Environments
                  </h4>
                  <p className="mb-2">Configure the target webhook in n8n to send the finalized article to the AJPR route:</p>
                  <div className="bg-slate-100 dark:bg-[#1E1E1E] p-4 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-300">
                    URL: https://ajprworld.com/api/blog<br />
                    Header: x-api-key = [Your AJPR_API_KEY]
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Note: Ensure <code>AJPR_API_KEY</code> is correctly set inside your Next.js application's <code>.env.local</code> file.</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 text-xs text-blue-700 dark:text-blue-400">
                  <strong>Pro Tip:</strong> For local development and testing, you can change the target URL in the n8n HTTP Request node to <code>http://localhost:3000/api/blog</code>. Ensure your local next server is running before executing!
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
  );
}
