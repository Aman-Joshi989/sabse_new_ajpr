'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Play, Square, Activity, Database, Shield, CheckCircle, Terminal, Layers, RefreshCw, Sparkles, MapPin, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'

interface LogEntry {
  source: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'code'
  timestamp: string
}

const PRESET_TASKS = [
  {
    title: 'Payment Gateway Integration',
    desc: 'Integrate Stripe SDK, webhooks, and secure transaction logs.',
    logs: [
      { source: 'Coordinator', message: 'Starting swarm execution for: Payment Gateway Integration', type: 'info' },
      { source: 'Consensus', message: 'Initiating Raft leader election...', type: 'info' },
      { source: 'Consensus', message: 'Consensus achieved. Architect elected as Leader (Term 3).', type: 'success' },
      { source: 'Architect', message: 'Designing checkout architecture with Stripe webhooks.', type: 'info' },
      { source: 'Architect', message: 'Saved schema to Shared Memory namespace "stripe-checkout".', type: 'success' },
      { source: 'Coder', message: 'Retrieved design decisions from Namespace "stripe-checkout".', type: 'info' },
      { source: 'Coder', message: 'Implementing Stripe controller endpoints with robust signature verification.', type: 'info' },
      { source: 'Coder', message: 'Code Draft generated successfully.', type: 'code' },
      { source: 'Tester', message: 'Analyzing checkout controller for test coverage.', type: 'info' },
      { source: 'Tester', message: 'Generated 4 unit tests covering payment success, failure, and signature replay attacks.', type: 'success' },
      { source: 'Reviewer', message: 'Scanning implementation against security guardrails.', type: 'info' },
      { source: 'Reviewer', message: 'Passed. Zero PII leaks, validated input schemas, secure error handling.', type: 'success' },
      { source: 'Coordinator', message: 'Swarm task completed successfully. Cleanup executed.', type: 'success' }
    ]
  },
  {
    title: 'Database Schema Migration',
    desc: 'Create secure Prisma migrations and optimize indexes for active tables.',
    logs: [
      { source: 'Coordinator', message: 'Starting swarm execution for: Database Schema Migration', type: 'info' },
      { source: 'Consensus', message: 'Initiating Raft leader election...', type: 'info' },
      { source: 'Consensus', message: 'Consensus achieved. Architect elected as Leader (Term 3).', type: 'success' },
      { source: 'Architect', message: 'Designing PostgreSQL schema migration with index optimizations.', type: 'info' },
      { source: 'Architect', message: 'Saved schema to Shared Memory namespace "db-migration".', type: 'success' },
      { source: 'Coder', message: 'Retrieved design from Namespace "db-migration".', type: 'info' },
      { source: 'Coder', message: 'Generating Prisma migration script and creating compound indexes.', type: 'info' },
      { source: 'Coder', message: 'Code Draft generated successfully.', type: 'code' },
      { source: 'Tester', message: 'Running dry-run database migration on sandboxed container.', type: 'info' },
      { source: 'Tester', message: 'Migration test passed in 1.2s. 0 schema conflicts detected.', type: 'success' },
      { source: 'Reviewer', message: 'Auditing migration query plan for potential table locks.', type: 'info' },
      { source: 'Reviewer', message: 'Review Passed. Index creation is concurrently safe.', type: 'success' },
      { source: 'Coordinator', message: 'Swarm task completed successfully.', type: 'success' }
    ]
  },
  {
    title: 'E2E Playwright Browser Audit',
    desc: 'Automate login, dashboard navigation, and performance checks.',
    logs: [
      { source: 'Coordinator', message: 'Starting swarm execution for: E2E Playwright Browser Audit', type: 'info' },
      { source: 'Consensus', message: 'Initiating Raft leader election...', type: 'info' },
      { source: 'Consensus', message: 'Consensus achieved. Architect elected as Leader (Term 3).', type: 'success' },
      { source: 'Architect', message: 'Defining user journeys and test boundaries for the webapp.', type: 'info' },
      { source: 'Architect', message: 'Saved setup to Shared Memory namespace "playwright-audit".', type: 'success' },
      { source: 'Coder', message: 'Retrieved user journeys from Namespace "playwright-audit".', type: 'info' },
      { source: 'Coder', message: 'Writing Playwright automation script to test authentication flows.', type: 'info' },
      { source: 'Coder', message: 'Code Draft generated successfully.', type: 'code' },
      { source: 'Tester', message: 'Initializing Playwright sandbox worker.', type: 'info' },
      { source: 'Tester', message: 'Executing chromium instance... Navigated to /login... [OK]', type: 'success' },
      { source: 'Tester', message: 'Dashboard navigation checks succeeded in 2.8s.', type: 'success' },
      { source: 'Reviewer', message: 'Evaluating test reports for speed regressions.', type: 'info' },
      { source: 'Reviewer', message: 'Passed. Average First Contentful Paint: 0.9s.', type: 'success' },
      { source: 'Coordinator', message: 'Swarm task completed successfully.', type: 'success' }
    ]
  }
]

export default function SwarmSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedTask, setSelectedTask] = useState(0)
  const [activeStep, setActiveStep] = useState(-1)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [metrics, setMetrics] = useState({
    rounds: 0,
    messages: 0,
    cost: 0.00,
    latency: 0,
    activeAgent: 'Coordinator'
  })
  
  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  const handleStartSimulation = () => {
    if (isRunning) return
    setIsRunning(true)
    setLogs([])
    setActiveStep(0)
    setMetrics({
      rounds: 0,
      messages: 0,
      cost: 0.00,
      latency: 0,
      activeAgent: 'Coordinator'
    })
  }

  const handleStopSimulation = () => {
    setIsRunning(false)
    setActiveStep(-1)
  }

  // Simulation Tick Loop
  useEffect(() => {
    if (!isRunning || activeStep === -1) return

    const currentTaskData = PRESET_TASKS[selectedTask]
    const totalSteps = currentTaskData.logs.length

    if (activeStep >= totalSteps) {
      setIsRunning(false)
      return
    }

    const stepInfo = currentTaskData.logs[activeStep]
    const timer = setTimeout(() => {
      // Add log
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      let logMsg = stepInfo.message
      
      if (stepInfo.type === 'code') {
        if (selectedTask === 0) {
          logMsg = `// Stripe Integration Controller\nexport async function POST(req: Request) {\n  const body = await req.text();\n  const sig = req.headers.get('stripe-signature')!;\n  const event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);\n  await handleSubscriptionChange(event.data.object);\n  return Response.json({ received: true });\n}`
        } else if (selectedTask === 1) {
          logMsg = `// prisma/schema.prisma\nmodel Subscription {\n  id        String   @id @default(uuid())\n  userId    String   @unique\n  status    String\n  createdAt DateTime @default(now())\n\n  @@index([status, createdAt])\n}`
        } else {
          logMsg = `// E2E Test Suite\ntest('user login flow', async ({ page }) => {\n  await page.goto('/login');\n  await page.fill('input[type="email"]', 'admin@ajprworld.com');\n  await page.click('button[type="submit"]');\n  await expect(page).toHaveURL('/dashboard');\n});`
        }
      }

      setLogs((prev) => [
        ...prev,
        {
          source: stepInfo.source,
          message: logMsg,
          type: stepInfo.type as any,
          timestamp: timeStr
        }
      ])

      // Update metrics
      setMetrics((prev) => {
        const isRaft = stepInfo.source === 'Consensus'
        const isCoordinator = stepInfo.source === 'Coordinator'
        const nextRounds = isRaft ? prev.rounds + 1 : prev.rounds
        const nextMessages = prev.messages + 1
        const nextCost = prev.cost + (stepInfo.type === 'code' ? 0.012 : 0.003)
        const nextLatency = prev.latency + Math.floor(Math.random() * 400) + 200

        return {
          rounds: nextRounds,
          messages: nextMessages,
          cost: parseFloat(nextCost.toFixed(3)),
          latency: nextLatency,
          activeAgent: stepInfo.source
        }
      })

      setActiveStep((prev) => prev + 1)
    }, 1800)

    return () => clearTimeout(timer)
  }, [isRunning, activeStep, selectedTask])

  const breadcrumbItems = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Demos', item: 'https://ajprworld.com/demo-ruflo' },
    { name: 'Swarm Simulator', item: 'https://ajprworld.com/demo-ruflo' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 py-24 px-4 md:px-8 transition-colors duration-300 relative">
      {/* Breadcrumb Schema for search engine optimization */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-12 w-[500px] h-[500px] bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none font-bold uppercase tracking-wider text-[10px]">
              Swarm Coordinator
            </Badge>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-450 border-none font-bold uppercase tracking-wider text-[10px]">
              V3 Monorepo
            </Badge>
          </div>
          <Link href="/" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Swarm Simulator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Observe concurrent execution threads, consensus protocols, and self-learning pipelines in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 shadow-md shadow-blue-600/15 flex items-center gap-2 rounded-xl"
              onClick={handleStartSimulation}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 fill-current" /> Run Swarm
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold px-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
              onClick={handleStopSimulation}
              disabled={!isRunning}
            >
              <Square className="w-4 h-4" /> Stop
            </Button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Tasks & Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Task Selection Card */}
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Layers className="w-5 h-5 text-blue-500" /> Select Mission
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-405 font-medium">
                  Select a workflow to test multi-agent concurrent scaling.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex flex-col gap-4">
                {PRESET_TASKS.map((task, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isRunning) setSelectedTask(idx)
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedTask === idx
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/50 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isRunning}
                  >
                    <h3 className="font-bold text-slate-905 dark:text-white text-base leading-tight">{task.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-relaxed font-medium">{task.desc}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Metrics Display Card */}
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Activity className="w-5 h-5 text-emerald-500" /> Swarm Telemetry
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-405 font-medium">
                  Real-time synchronization logs and execution metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold">Active Node</span>
                  <span className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping inline-block" />
                    {metrics.activeAgent}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold">Consensus Rounds</span>
                  <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">{metrics.rounds}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold">Messages Sent</span>
                  <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">{metrics.messages}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-bold">Swarm Cost</span>
                  <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-450">${metrics.cost}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Interactive Network Diagram */}
          <div className="lg:col-span-7">
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm rounded-2xl h-full flex flex-col">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Cpu className="w-5 h-5 text-purple-500" /> Node Topology Diagram
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-405 font-medium">
                  Watch node relationships activate as communication passes between workers.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex items-center justify-center min-h-[350px]">
                <svg className="w-full max-w-[500px] h-[350px]" viewBox="0 0 500 350">
                  {/* Lines representing network connections */}
                  <g className="stroke-slate-200 dark:stroke-slate-800 stroke-[2] dash-array">
                    <line x1="250" y1="175" x2="250" y2="60" />
                    <line x1="250" y1="175" x2="380" y2="175" />
                    <line x1="250" y1="175" x2="250" y2="290" />
                    <line x1="250" y1="175" x2="120" y2="175" />
                    <line x1="250" y1="60" x2="380" y2="175" className="stroke-slate-100 dark:stroke-slate-850 stroke-[1.5]" />
                    <line x1="380" y1="175" x2="250" y2="290" className="stroke-slate-100 dark:stroke-slate-850 stroke-[1.5]" />
                    <line x1="250" y1="290" x2="120" y2="175" className="stroke-slate-100 dark:stroke-slate-850 stroke-[1.5]" />
                    <line x1="120" y1="175" x2="250" y2="60" className="stroke-slate-100 dark:stroke-slate-850 stroke-[1.5]" />
                  </g>

                  {/* Node: Swarm Coordinator */}
                  <g className="cursor-pointer">
                    <circle
                      cx="250"
                      cy="175"
                      r="32"
                      className={`transition-colors duration-500 fill-white dark:fill-slate-950 stroke-[3] ${
                        metrics.activeAgent === 'Coordinator' ? 'stroke-blue-500 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'stroke-slate-200 dark:stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="178" textAnchor="middle" className="fill-slate-800 dark:fill-white text-[9px] font-bold font-mono">
                      Coord
                    </text>
                  </g>

                  {/* Node: Architect */}
                  <g>
                    <circle
                      cx="250"
                      cy="60"
                      r="28"
                      className={`transition-colors duration-500 fill-white dark:fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Architect' ? 'stroke-purple-500 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'stroke-slate-200 dark:stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="63" textAnchor="middle" className="fill-slate-700 dark:fill-slate-350 text-[9px] font-bold">
                      Architect
                    </text>
                  </g>

                  {/* Node: Coder */}
                  <g>
                    <circle
                      cx="380"
                      cy="175"
                      r="28"
                      className={`transition-colors duration-500 fill-white dark:fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Coder' ? 'stroke-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'stroke-slate-200 dark:stroke-slate-800'
                      }`}
                    />
                    <text x="380" y="178" textAnchor="middle" className="fill-slate-700 dark:fill-slate-350 text-[9px] font-bold">
                      Coder
                    </text>
                  </g>

                  {/* Node: Tester */}
                  <g>
                    <circle
                      cx="250"
                      cy="290"
                      r="28"
                      className={`transition-colors duration-500 fill-white dark:fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Tester' ? 'stroke-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'stroke-slate-200 dark:stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="293" textAnchor="middle" className="fill-slate-700 dark:fill-slate-350 text-[9px] font-bold">
                      Tester
                    </text>
                  </g>

                  {/* Node: Reviewer */}
                  <g>
                    <circle
                      cx="120"
                      cy="175"
                      r="28"
                      className={`transition-colors duration-500 fill-white dark:fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Reviewer' ? 'stroke-cyan-500 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'stroke-slate-200 dark:stroke-slate-800'
                      }`}
                    />
                    <text x="120" y="178" textAnchor="middle" className="fill-slate-700 dark:fill-slate-350 text-[9px] font-bold">
                      Reviewer
                    </text>
                  </g>

                  {metrics.activeAgent === 'Consensus' && (
                    <circle
                      cx="250"
                      cy="175"
                      r="40"
                      className="fill-none stroke-yellow-500 stroke-[2] animate-ping opacity-50"
                    />
                  )}
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Console Log Terminal */}
        <Card className="bg-[#05070f] border border-slate-950 dark:border-slate-900 shadow-2xl rounded-2xl overflow-hidden">
          <div className="flex bg-[#0a0f1d] px-4 py-3 items-center justify-between border-b border-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5 ml-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                ruflo-swarm-stdout.log
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {isRunning && (
                <span className="flex items-center gap-1 text-blue-400 animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Execution active
                </span>
              )}
              <span>UTF-8</span>
            </div>
          </div>
          <CardContent className="p-6 font-mono text-xs md:text-sm text-slate-300 leading-relaxed min-h-[250px] max-h-[400px] overflow-y-auto flex flex-col gap-2.5">
            {logs.length === 0 && (
              <div className="text-slate-500 flex flex-col items-center justify-center py-16 gap-3">
                <Activity className="w-8 h-8 opacity-40 animate-pulse" />
                <p className="font-medium text-slate-400">Click "Run Swarm" to initiate agent execution pipeline.</p>
              </div>
            )}
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-slate-600 select-none">{log.timestamp}</span>
                <span
                  className={`font-bold shrink-0 ${
                    log.source === 'Coordinator'
                      ? 'text-blue-405'
                      : log.source === 'Architect'
                      ? 'text-purple-400'
                      : log.source === 'Coder'
                      ? 'text-emerald-400'
                      : log.source === 'Tester'
                      ? 'text-amber-450'
                      : log.source === 'Reviewer'
                      ? 'text-cyan-405'
                      : 'text-yellow-500'
                  }`}
                >
                  [{log.source}]
                </span>
                
                {log.type === 'code' ? (
                  <div className="w-full bg-[#0a0f1f]/80 p-4 rounded-xl border border-slate-900 mt-2 font-mono text-slate-300 select-all overflow-x-auto whitespace-pre">
                    <code>{log.message}</code>
                  </div>
                ) : (
                  <span>{log.message}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
