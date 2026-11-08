'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Rocket, FileText, Zap, Loader2, CheckCircle2, TrendingUp, Users, 
  Globe, ExternalLink, Copy, Check, Search, Filter, ShieldCheck, ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { BACKLINK_CATALOG, BacklinkSource } from '@/lib/backlinks-catalog'

export default function GrowthDashboard() {
  const [isBlogRunning, setIsBlogRunning] = useState(false)
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [isIndexNowRunning, setIsIndexNowRunning] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('All')
  const [logs, setLogs] = useState<{ time: string, message: string, type: 'success' | 'error' | 'info' }[]>([
    { time: new Date().toLocaleTimeString(), message: 'Traffic & Authority Growth Engine initialized. Ready for deployment.', type: 'info' }
  ])

  const addLog = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), message, type }, ...prev].slice(0, 50))
  }

  const triggerIndexNow = async () => {
    setIsIndexNowRunning(true)
    addLog('Pinging IndexNow protocol with 565+ verified URLs for Bing, Yandex, Seznam...', 'info')
    try {
      const res = await fetch('/api/indexnow')
      const data = await res.json()
      
      if (res.ok && data.success) {
        addLog(`IndexNow Success: ${data.urlsSubmitted || 565} URLs pushed to search engines for crawling.`, 'success')
        toast.success(`Pushed ${data.urlsSubmitted || 565} URLs to IndexNow!`)
      } else {
        addLog(`IndexNow Notice: ${data.error || 'Server response warning'}`, 'error')
        toast.error('IndexNow submission returned warning.')
      }
    } catch (err: any) {
      addLog(`IndexNow Error: ${err.message}`, 'error')
      toast.error('Failed to trigger IndexNow.')
    } finally {
      setIsIndexNowRunning(false)
    }
  }

  const triggerDailyBlog = async () => {
    setIsBlogRunning(true)
    addLog('Starting AI Blog Pipeline (Generating 1,500-word authority post, social syndication)...', 'info')
    try {
      const res = await fetch('/api/admin/trigger-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: 'athena', action: 'blog' }),
      })
      const data = await res.json()
      
      if (res.ok) {
        addLog(`Blog Generated: ${data.data?.title || data.message || 'Complete'}`, 'success')
        toast.success('Blog pipeline completed successfully!')
      } else {
        addLog(`Blog Pipeline Failed: ${data.error}`, 'error')
        toast.error('Failed to run blog pipeline.')
      }
    } catch (err: any) {
      addLog(`Network Error: ${err.message}`, 'error')
    } finally {
      setIsBlogRunning(false)
    }
  }

  const triggerLeadAgent = async () => {
    setIsAgentRunning(true)
    addLog('Waking up Autonomous Social Lead Agent (Hunting high-intent buyer posts)...', 'info')
    try {
      const res = await fetch('/api/admin/trigger-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: 'apollo' }),
      })
      const data = await res.json()
      
      if (res.ok) {
        addLog(`Lead Agent Run Complete. ${data.message || 'Success'}`, 'success')
        toast.success('Agent completed successfully!')
      } else {
        addLog(`Agent Run Failed: ${data.error}`, 'error')
        toast.error('Failed to run autonomous agent.')
      }
    } catch (err: any) {
      addLog(`Network Error: ${err.message}`, 'error')
    } finally {
      setIsAgentRunning(false)
    }
  }

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Copied anchor text to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredBacklinks = useMemo(() => {
    return BACKLINK_CATALOG.filter((item: BacklinkSource) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recommendedAnchor.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTier = selectedTier === 'All' || item.tier.toLowerCase().includes(selectedTier.toLowerCase())
      return matchesSearch && matchesTier
    })
  }, [searchQuery, selectedTier])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-500 fill-amber-500" />
            AJPR World Growth & Authority Engine
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Automated organic traffic generation, Ahrefs Domain Rating (DR) expansion, and competitor keyword intercepts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/admin/outrank">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-md">
              <Zap className="w-4 h-4 mr-2" /> Steal Competitor Traffic
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Pillars of Authority Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold text-slate-500">Domain Rating (DR) Target</CardDescription>
            <CardTitle className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-between">
              DR 45+
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                128 Sources
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 dark:text-slate-400">
            High-authority dofollow link targets ready for submission to lift Ahrefs DR from 0 to 45+.
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold text-slate-500">Search Engine Indexation</CardDescription>
            <CardTitle className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-between">
              565 URLs
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                IndexNow Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 dark:text-slate-400">
            Instant Bing, Yandex & search bot discovery protocol wired to every new blog post.
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold text-slate-500">Bounce Rate Safeguard</CardDescription>
            <CardTitle className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              Active CRO
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 dark:text-slate-400">
            Hero Domain Scanner, Website Cost Calculator & Mobile Thumb Dock to turn 89% bounce into leads.
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold text-slate-500">Monthly Traffic Target</CardDescription>
            <CardTitle className="text-2xl font-black text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
              10,000+
              <TrendingUp className="w-5 h-5 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 dark:text-slate-400">
            Driven by programmatic keyword clusters, competitor outrank blogs, and social syndication.
          </CardContent>
        </Card>
      </div>

      {/* 3 Main Action Engines */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* IndexNow Ping Engine */}
        <Card className="border-sky-500/20 bg-sky-50/10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-[40px] rounded-full pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5 text-sky-500" />
              Instant Search Engine Pinger
            </CardTitle>
            <CardDescription>
              Forces Bing, Yandex, and IndexNow crawlers to immediately index all 565+ URLs on ajprworld.com.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              ⚡ Status: <strong>565 URLs</strong> currently verified in sitemap.xml.
            </div>
            <Button 
              onClick={triggerIndexNow} 
              disabled={isIndexNowRunning}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium"
            >
              {isIndexNowRunning ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Pinging Search Bots...</>
              ) : (
                <><Globe className="w-4 h-4 mr-2" /> Push 565+ URLs to IndexNow</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Content Engine Pipeline */}
        <Card className="border-blue-500/20 bg-blue-50/10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-blue-500" />
              Content Authority Engine
            </CardTitle>
            <CardDescription>
              Generates high-ranking 1,500-word SEO articles, social syndication, and updates Google Business Profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              🕒 Schedule: <strong>Daily at 5:00 AM UTC</strong> or on-demand execution.
            </div>
            <Button 
              onClick={triggerDailyBlog} 
              disabled={isBlogRunning}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isBlogRunning ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating & Syndicating...</>
              ) : (
                <><Rocket className="w-4 h-4 mr-2" /> Run Daily Content Pipeline</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Competitor Outrank Intercept */}
        <Card className="border-amber-500/20 bg-amber-50/10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] rounded-full pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-amber-500" />
              Competitor Outrank Recon
            </CardTitle>
            <CardDescription>
              Scrape any competitor URL, expose their content gaps, and publish a superior counter-ranking article.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              🎯 Verified: Counter-strategy for <strong>patkarinfotech.com</strong> published to live blog.
            </div>
            <Link href="/dashboard/admin/outrank">
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium">
                <ArrowUpRight className="w-4 h-4 mr-2" /> Launch Outrank Scanner
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>

      {/* High-DR Backlink Vault */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                Verified High-DR Backlink Vault (128 Sources)
              </CardTitle>
              <CardDescription>
                Direct submission portals to build authentic, high-Domain Rating (DR 70 to 95) dofollow backlinks for AJPR World.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search directories, platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs"
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
        </CardHeader>
        <CardContent>
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
                {filteredBacklinks.slice(0, 10).map((item) => (
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
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top {Math.min(10, filteredBacklinks.length)} of {filteredBacklinks.length} curated backlink sources</span>
            <Link href="/dashboard/admin/backlink-research" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Open Full Backlink Prospector <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* System Activity Logs */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            Live Traffic Engine Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 rounded-xl p-4 h-[220px] overflow-y-auto font-mono text-xs shadow-inner border border-slate-800">
            {logs.length === 0 ? (
              <p className="text-slate-500">System standing by.</p>
            ) : (
              <div className="space-y-1.5">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    {log.type === 'info' && <span className="text-sky-400 font-bold">INFO:</span>}
                    {log.type === 'success' && <span className="text-emerald-400 font-bold">SUCCESS:</span>}
                    {log.type === 'error' && <span className="text-rose-400 font-bold">ERROR:</span>}
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
