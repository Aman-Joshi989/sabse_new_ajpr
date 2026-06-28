'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Play, Square, Activity, Database, Shield, CheckCircle, Terminal, Layers, RefreshCw, AlertCircle } from 'lucide-react'
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
      const timeStr = new Date().toLocaleTimeString()
      let logMsg = stepInfo.message
      
      if (stepInfo.type === 'code') {
        if (selectedTask === 0) {
          logMsg = `// Stripe Integration Controller\nexport async function POST(req: Request) {\n  const body = await req.text();\n  const sig = req.headers.get('stripe-signature')!;\n  const event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);\n  await handleSubscriptionChange(event.data.object);\n  return Response.json({ received: true });\n}`
        } else if (selectedTask === 1) {
          logMsg = `// prisma/schema.prisma\nmodel Subscription {\n  id        String   @id @default(uuid())\n  userId    String   @unique\n  status    String\n  createdAt DateTime @default(now())\n\n  @@index([status, createdAt])\n}`
        } else {
          logMsg = `// E2E Test Suite\ntest('user login flow', async ({ page }) => {\n  await page.goto('/login');\n  await page.fill('input[type="email"]', 'test@ajprworld.com');\n  await page.click('button[type="submit"]');\n  await expect(page).toHaveURL('/dashboard');\n});`
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
    { name: 'Demos', item: 'https://ajprworld.com/demo-cpu' },
    { name: 'RuFlo Swarm Simulator', item: 'https://ajprworld.com/demo-ruflo' }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 md:px-8">
      {/* Breadcrumb Schema for search engine optimization */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors text-sm">
            &larr; Back to Home
          </Link>
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-blue-600/25 text-blue-450 border border-blue-500/30">
                Beta
              </Badge>
              <Badge className="bg-emerald-600/25 text-emerald-450 border border-emerald-500/30">
                V3 Engine
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              RuFlo V3 Swarm Simulator
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Visualize multi-agent coordination, consensus protocols, and self-learning loops in real-time.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 shadow-lg shadow-blue-500/20 flex items-center gap-2"
              onClick={handleStartSimulation}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 fill-current" /> Run Swarm
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-800 hover:bg-slate-900 text-slate-350 font-bold px-6"
              onClick={handleStopSimulation}
              disabled={!isRunning}
            >
              <Square className="w-4 h-4" /> Stop
            </Button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Tasks & Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Task Selection Card */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Layers className="w-5 h-5 text-blue-400" /> Select Mission
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Select a workflow to deploy the agent swarm.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {PRESET_TASKS.map((task, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isRunning) setSelectedTask(idx)
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedTask === idx
                        ? 'bg-blue-950/40 border-blue-500/50 shadow-md shadow-blue-950/40'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    } ${isRunning ? 'opacity-65 cursor-not-allowed' : ''}`}
                    disabled={isRunning}
                  >
                    <h3 className="font-bold text-white text-base">{task.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{task.desc}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Metrics Display Card */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-emerald-400" /> Swarm Telemetry
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time resource tracking and protocol metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Active Coordinator</span>
                  <span className="text-base font-bold text-blue-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping inline-block" />
                    {metrics.activeAgent}
                  </span>
                </div>
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Consensus Rounds</span>
                  <span className="text-xl font-mono font-bold text-white">{metrics.rounds}</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Messages Sent</span>
                  <span className="text-xl font-mono font-bold text-white">{metrics.messages}</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Estimated Cost</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">${metrics.cost}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Interactive Network Diagram */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-xl h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Cpu className="w-5 h-5 text-purple-400" /> Swarm Topology: Hierarchical-Mesh
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Observe the flow of instructions between active worker threads.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8 min-h-[350px]">
                <svg className="w-full max-w-[500px] h-[350px]" viewBox="0 0 500 350">
                  {/* Lines representing network connections */}
                  <g className="stroke-slate-800 stroke-[2] dash-array">
                    <line x1="250" y1="175" x2="250" y2="60" />
                    <line x1="250" y1="175" x2="380" y2="175" />
                    <line x1="250" y1="175" x2="250" y2="290" />
                    <line x1="250" y1="175" x2="120" y2="175" />
                    <line x1="250" y1="60" x2="380" y2="175" className="stroke-slate-900 stroke-[1.5]" />
                    <line x1="380" y1="175" x2="250" y2="290" className="stroke-slate-900 stroke-[1.5]" />
                    <line x1="250" y1="290" x2="120" y2="175" className="stroke-slate-900 stroke-[1.5]" />
                    <line x1="120" y1="175" x2="250" y2="60" className="stroke-slate-900 stroke-[1.5]" />
                  </g>

                  {/* Node: Swarm Coordinator */}
                  <g className="cursor-pointer">
                    <circle
                      cx="250"
                      cy="175"
                      r="32"
                      className={`transition-colors duration-500 fill-slate-950 stroke-[3] ${
                        metrics.activeAgent === 'Coordinator' ? 'stroke-blue-500' : 'stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="179" textAnchor="middle" className="fill-white text-[9px] font-bold font-mono">
                      Coord
                    </text>
                  </g>

                  {/* Node: Architect */}
                  <g>
                    <circle
                      cx="250"
                      cy="60"
                      r="28"
                      className={`transition-colors duration-500 fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Architect' ? 'stroke-purple-500 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="63" textAnchor="middle" className="fill-slate-300 text-[9px] font-bold">
                      Architect
                    </text>
                  </g>

                  {/* Node: Coder */}
                  <g>
                    <circle
                      cx="380"
                      cy="175"
                      r="28"
                      className={`transition-colors duration-500 fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Coder' ? 'stroke-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'stroke-slate-800'
                      }`}
                    />
                    <text x="380" y="178" textAnchor="middle" className="fill-slate-300 text-[9px] font-bold">
                      Coder
                    </text>
                  </g>

                  {/* Node: Tester */}
                  <g>
                    <circle
                      cx="250"
                      cy="290"
                      r="28"
                      className={`transition-colors duration-500 fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Tester' ? 'stroke-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'stroke-slate-800'
                      }`}
                    />
                    <text x="250" y="293" textAnchor="middle" className="fill-slate-300 text-[9px] font-bold">
                      Tester
                    </text>
                  </g>

                  {/* Node: Reviewer */}
                  <g>
                    <circle
                      cx="120"
                      cy="175"
                      r="28"
                      className={`transition-colors duration-500 fill-slate-950 stroke-[2] ${
                        metrics.activeAgent === 'Reviewer' ? 'stroke-cyan-500 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'stroke-slate-800'
                      }`}
                    />
                    <text x="120" y="178" textAnchor="middle" className="fill-slate-300 text-[9px] font-bold">
                      Reviewer
                    </text>
                  </g>

                  {metrics.activeAgent === 'Consensus' && (
                    <circle
                      cx="250"
                      cy="175"
                      r="40"
                      className="fill-none stroke-yellow-500 stroke-[2] animate-ping opacity-60"
                    />
                  )}
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Console Log Terminal */}
        <div className="mb-8">
          <Card className="bg-[#05070f] border-slate-900 shadow-2xl overflow-hidden">
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
                <div className="text-slate-655 flex flex-col items-center justify-center py-16 gap-3">
                  <Activity className="w-8 h-8 opacity-40 animate-pulse" />
                  <p>Click "Run Swarm" to initiate agent execution pipeline.</p>
                </div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-slate-500 select-none">{log.timestamp}</span>
                  <span
                    className={`font-bold shrink-0 ${
                      log.source === 'Coordinator'
                        ? 'text-blue-400'
                        : log.source === 'Architect'
                        ? 'text-purple-400'
                        : log.source === 'Coder'
                        ? 'text-emerald-400'
                        : log.source === 'Tester'
                        ? 'text-amber-400'
                        : log.source === 'Reviewer'
                        ? 'text-cyan-400'
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
    </div>
  )
}
