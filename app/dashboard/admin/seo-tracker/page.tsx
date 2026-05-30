'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, Search, Sparkles, CheckCircle2, AlertCircle, 
  Activity, BarChart3, Globe, ShieldAlert, Zap, Layers, RefreshCw
} from 'lucide-react'

// Optimized static mock data representing our 14 pages
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
]

export default function AdminSeoTracker() {
  const [pages, setPages] = useState(initialPages)
  const [auditRunning, setAuditRunning] = useState(false)
  const [auditStep, setAuditStep] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'cited' | 'indexed'>('all')

  const triggerAudit = () => {
    if (auditRunning) return
    setAuditRunning(true)
    setAuditStep(1)
    
    // Simulate multi-stage audit steps with timing intervals
    setTimeout(() => setAuditStep(2), 1200)
    setTimeout(() => setAuditStep(3), 2400)
    setTimeout(() => setAuditStep(4), 3600)
    setTimeout(() => {
      setAuditRunning(false)
      setAuditStep(5)
      // Slightly increment bot hits mock data upon successful scan
      setPages(prev => prev.map(p => ({ ...p, botHits: p.botHits + Math.floor(Math.random() * 8) + 2 })))
    }, 4800)
  }

  const filteredPages = pages.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.url.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeTab === 'cited') return matchesSearch && p.status.includes('Cited')
    if (activeTab === 'indexed') return matchesSearch && p.status.startsWith('Indexed')
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#202124] text-[#202124] dark:text-[#E8EAED] font-sans pb-16">
      
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043] mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin" className="text-[#5F6368] dark:text-[#9AA0A6] hover:text-[#202124] dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-xl font-medium tracking-tight text-[#5F6368] dark:text-[#E8EAED]">
            Admin <span className="text-[#202124] dark:text-white font-normal">Console</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          <Activity className="w-3.5 h-3.5 mr-1 animate-pulse" />
          GEO Tracker Operational
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
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
              <span className="text-4xl font-light text-[#202124] dark:text-white">23</span>
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
            
            {/* SVG Visual Graph representing AI citation share */}
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
                
                {/* Horizontal gridlines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#E5E7EB" strokeWidth="0.5" className="dark:stroke-slate-800" />
                
                {/* Simulated Chart Paths */}
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
              <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-1">Audit list of all 14 SEO and GEO optimized pages.</p>
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
    </div>
  )
}
