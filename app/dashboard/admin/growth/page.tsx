'use client'

import { useState } from 'react'
import { Rocket, FileText, Zap, Loader2, CheckCircle2, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function GrowthDashboard() {
  const [isBlogRunning, setIsBlogRunning] = useState(false)
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [logs, setLogs] = useState<{ time: string, message: string, type: 'success' | 'error' | 'info' }[]>([])

  const addLog = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), message, type }, ...prev].slice(0, 50))
  }

  const triggerDailyBlog = async () => {
    setIsBlogRunning(true)
    addLog('Starting AI Blog Pipeline (Generating content, Ayrshare, GBP)...', 'info')
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
    addLog('Waking up Autonomous Lead Agent...', 'info')
    try {
      const res = await fetch('/api/admin/trigger-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: 'apollo' }),
      })
      const data = await res.json()
      
      if (res.ok) {
        addLog(`Agent Run Complete. ${data.message || 'Success'}`, 'success')
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Growth Control Center</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage and manually trigger your autonomous marketing engines.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Blog Pipeline Card */}
        <Card className="border-blue-500/20 bg-blue-50/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Content Engine Pipeline
            </CardTitle>
            <CardDescription>
              Generates a trending 1,500-word SEO blog, posts to Facebook/Twitter via Ayrshare, and updates Google Business Profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <ClockIcon className="w-4 h-4" /> Next scheduled run: <strong className="text-slate-900 dark:text-white">5:00 AM Daily</strong>
              </div>
              <Button 
                onClick={triggerDailyBlog} 
                disabled={isBlogRunning}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isBlogRunning ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running Pipeline (Takes ~30s)...</>
                ) : (
                  <><Rocket className="w-4 h-4 mr-2" /> Run Pipeline Now</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lead Agent Card */}
        <Card className="border-emerald-500/20 bg-emerald-50/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Autonomous Lead Agent
            </CardTitle>
            <CardDescription>
              Scrapes social media APIs for people needing your services, evaluates them with AI, and drafts outbound DMs in your database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <ClockIcon className="w-4 h-4" /> Next scheduled run: <strong className="text-slate-900 dark:text-white">8:00 AM Daily</strong>
              </div>
              <Button 
                onClick={triggerLeadAgent} 
                disabled={isAgentRunning}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isAgentRunning ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Agent Hunting (Takes ~60s)...</>
                ) : (
                  <><Zap className="w-4 h-4 mr-2" /> Dispatch Lead Agent Now</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            System Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 rounded-xl p-4 h-[300px] overflow-y-auto font-mono text-sm shadow-inner border border-slate-800">
            {logs.length === 0 ? (
              <p className="text-slate-500">System is standing by. Trigger a pipeline above.</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    {log.type === 'info' && <span className="text-blue-400">INFO:</span>}
                    {log.type === 'success' && <span className="text-emerald-400">SUCCESS:</span>}
                    {log.type === 'error' && <span className="text-rose-400">ERROR:</span>}
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

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
