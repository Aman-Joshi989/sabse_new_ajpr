'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, Send, User, Bot, HelpCircle, Layers, CheckCircle2, 
  ChevronRight, MessageSquare, Terminal, Eye, Sparkles, TerminalSquare, ShieldCheck, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'

interface Message {
  id: string
  sender: string
  role: 'user' | 'agent' | 'router'
  avatar: React.ReactNode
  color: string
  glowColor: string
  content: string
  thoughts?: string
  timestamp: string
}

const PRESETS = [
  "🛡️ Block SQL injections & rate limit IPs",
  "🗄️ Design a secure SaaS subscription schema",
  "🎭 Write a Playwright signup test script"
]

export default function ChatPlayground() {
  const [topology, setTopology] = useState<'hierarchical' | 'p2p' | 'consensus'>('hierarchical')
  const [activeAgents, setActiveAgents] = useState({
    architect: true,
    coder: true,
    tester: false,
    security: true
  })
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'RuFlo Router',
      role: 'router',
      avatar: <Cpu className="w-5 h-5 text-blue-400" />,
      color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      glowColor: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
      content: 'RuFlo Multi-Agent swarm active. Select a topology and toggle agents in the sidebar. Type a prompt to watch the swarm collaborate on a solution!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingThoughts, setTypingThoughts] = useState<string | null>(null)
  const [typingAgent, setTypingAgent] = useState<string | null>(null)
  
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, typingThoughts])

  const toggleAgent = (key: 'architect' | 'coder' | 'tester' | 'security') => {
    setActiveAgents(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const simulateSwarmResponse = async (userPrompt: string) => {
    setIsTyping(true)
    
    // Stage 1: Router decides the execution path
    setTypingAgent('RuFlo Router')
    setTypingThoughts('Analyzing prompt syntax... Checking complexity threshold. Threshold >30% - selecting Sonnet Engine (Tier 3). Mapping workflows to active swarm nodes.')
    await new Promise(resolve => setTimeout(resolve, 2200))
    
    const routerTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'RuFlo Router',
        role: 'router',
        avatar: <Cpu className="w-5 h-5 text-blue-400" />,
        color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
        glowColor: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
        content: `Routing task to swarm with ${topology} topology. Active workspace context configured. Beginning collaborative agent reasoning loop.`,
        timestamp: routerTime
      }
    ])

    // State array for workflow execution based on toggled agents
    const steps: { agent: string; thoughts: string; content: string; color: string; glowColor: string; avatar: React.ReactNode }[] = []

    if (activeAgents.architect) {
      steps.push({
        agent: 'Architect Agent',
        thoughts: 'We need to design a modular, scalable architecture. Storing design specifications in memory namespace "swarm_collaboration". Focus on PostgreSQL table schema design.',
        content: `### System Architecture Proposed:\n\n* **Tables**: \`users\`, \`subscriptions\`, \`billing_invoices\`.\n* **Relations**: One-to-many relationship from \`users\` to \`billing_invoices\`. One-to-one mapping for \`subscriptions\`.\n* **Database Provider**: Neon serverless Postgres for instant scale.`,
        color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
        glowColor: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]',
        avatar: <Layers className="w-5 h-5 text-purple-400" />
      })
    }

    if (activeAgents.coder) {
      steps.push({
        agent: 'Coder Agent',
        thoughts: 'Implementing prisma client models based on the schema design stored by Architect. Optimizing column type mappings and indexing constraints.',
        content: `### Database Models (Prisma Schema):\n\n\`\`\`prisma\nmodel User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  name      String?\n  createdAt DateTime @default(now())\n  subscription Subscription?\n}\n\`\`\``,
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
        glowColor: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
        avatar: <Bot className="w-5 h-5 text-emerald-400" />
      })
    }

    if (activeAgents.security) {
      steps.push({
        agent: 'Security Agent',
        thoughts: 'Reviewing SQL design and database configurations. Checking for indexing performance gaps and data isolation rules. Validating uuid integrity.',
        content: `### Security Audit Result: PASS\n\n* **PII Protection**: Encryption recommended for sensitive billing details.\n* **Vulnerabilities**: Verified zero raw SQL entrypoints. Input queries use parameterized commands natively via Prisma.`,
        color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
        glowColor: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]',
        avatar: <Eye className="w-5 h-5 text-cyan-400" />
      })
    }

    if (activeAgents.tester) {
      steps.push({
        agent: 'Tester Agent',
        thoughts: 'Creating unit tests to validate the Prisma client connection and model integrity constraints.',
        content: `### Test Suite Mock-up:\n\n\`\`\`typescript\ntest('should create user record', async () => {\n  const user = await db.user.create({\n    data: { email: 'test@ajprworld.com' }\n  });\n  expect(user.id).toBeDefined();\n});\n\`\`\``,
        color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
        glowColor: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
        avatar: <CheckCircle2 className="w-5 h-5 text-amber-400" />
      })
    }

    // Execute each step
    for (const step of steps) {
      setTypingAgent(step.agent)
      setTypingThoughts(step.thoughts)
      await new Promise(resolve => setTimeout(resolve, 2500))

      const stepTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: step.agent,
          role: 'agent',
          avatar: step.avatar,
          color: step.color,
          glowColor: step.glowColor,
          content: step.content,
          thoughts: step.thoughts,
          timestamp: stepTime
        }
      ])
    }

    setIsTyping(false)
    setTypingThoughts(null)
    setTypingAgent(null)
  }

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return
    
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'User',
        role: 'user',
        avatar: <User className="w-5 h-5 text-slate-200" />,
        color: 'text-slate-200 border-slate-700 bg-slate-800/10',
        glowColor: 'shadow-[0_0_15px_rgba(255,255,255,0.05)]',
        content: text,
        timestamp: userTime
      }
    ])
    setInput('')
    
    simulateSwarmResponse(text)
  }

  const breadcrumbItems = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Demos', item: 'https://ajprworld.com/demo-cpu' },
    { name: 'RuFlo AI Chat Playground', item: 'https://ajprworld.com/chat-agents' }
  ]

  return (
    <div className="min-h-screen bg-[#070b15] text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Cyberpunk Grid & Background Glows */}
      <div className="absolute inset-0 bg-[#070b15] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-indigo-600/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/5 to-pink-600/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow-alt" />

      {/* Sidebar Panel */}
      <div className="w-full lg:w-85 border-b lg:border-b-0 lg:border-r border-slate-900/80 bg-slate-950/40 backdrop-blur-2xl p-6 lg:p-8 flex flex-col gap-8 relative z-10 shrink-0">
        <div>
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-400 transition-colors text-xs font-semibold uppercase tracking-wider gap-1.5 mb-6 group">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
          </Link>
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-blue-500" /> Swarm Engine
          </h2>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Configure multi-agent communication topologies and toggle coordinator nodes.
          </p>
        </div>

        {/* Topologies */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Topology Configuration
          </span>
          <div className="flex flex-col gap-2">
            {[
              { id: 'hierarchical', title: 'Hierarchical Orchestrator', desc: 'Centralized routing & supervisor assignment' },
              { id: 'p2p', title: 'Peer-to-Peer Mesh', desc: 'Parallel verification & distributed pipelines' },
              { id: 'consensus', title: 'Consensus Coordinator', desc: 'State election voting & resolution checks' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => !isTyping && setTopology(t.id as any)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                  topology === t.id
                    ? 'bg-blue-600/10 border-blue-500/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                    : 'bg-slate-900/25 border-slate-900/60 hover:border-slate-800/80 text-slate-400 hover:text-slate-200'
                } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isTyping}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  {t.title}
                  {topology === t.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-normal">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Swarm Members */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" /> Active Workers
          </span>
          <div className="flex flex-col gap-4 bg-slate-900/10 border border-slate-900 p-5 rounded-2xl relative overflow-hidden">
            {[
              { key: 'architect', label: 'Architect Agent', color: 'text-purple-400' },
              { key: 'coder', label: 'Coder Agent', color: 'text-emerald-400' },
              { key: 'security', label: 'Security Agent', color: 'text-cyan-400' },
              { key: 'tester', label: 'Tester Agent', color: 'text-amber-400' }
            ].map(agent => (
              <div key={agent.key} className="flex items-center justify-between">
                <Label htmlFor={`toggle-${agent.key}`} className={`text-xs font-semibold cursor-pointer ${agent.color}`}>
                  {agent.label}
                </Label>
                <Switch
                  id={`toggle-${agent.key}`}
                  checked={(activeAgents as any)[agent.key]}
                  onCheckedChange={() => !isTyping && toggleAgent(agent.key as any)}
                  disabled={isTyping}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col h-[calc(100vh-60px)] lg:h-screen relative z-10 bg-slate-950/20 backdrop-blur-3xl">
        
        {/* Workspace Header */}
        <div className="border-b border-slate-900/80 px-6 py-4 flex items-center justify-between bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Swarm Workspace</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">ID: swarm-1782-t3tken</span>
              </div>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider">
            CONNECTED
          </Badge>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${msg.color} ${msg.glowColor}`}>
                  {msg.avatar}
                </div>
                
                <div className="flex flex-col gap-2 max-w-full">
                  <div className={`flex items-center gap-2 text-xs ${isUser ? 'justify-end' : ''}`}>
                    <span className="font-bold text-slate-350">{msg.sender}</span>
                    <span className="text-slate-600 text-[10px]">{msg.timestamp}</span>
                  </div>

                  {msg.thoughts && (
                    <div className="bg-[#111625]/60 border border-purple-500/10 rounded-xl p-4 max-w-2xl shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/40" />
                      <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[9px] uppercase tracking-widest mb-1.5">
                        <TerminalSquare className="w-3.5 h-3.5" /> Swarm Cogitation
                      </div>
                      <p className="text-[11px] font-mono text-purple-300/80 leading-relaxed">{msg.thoughts}</p>
                    </div>
                  )}

                  <div className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/10 font-medium'
                      : 'bg-slate-900/30 border-slate-900/60 text-slate-200 shadow-sm relative'
                  }`}>
                    {/* Render Code Blocks with custom IDE styling */}
                    {msg.content.includes('```') ? (
                      <div className="space-y-4">
                        {msg.content.split('```').map((block, bIdx) => {
                          if (bIdx % 2 !== 0) {
                            const lines = block.split('\n')
                            const lang = lines[0] || 'code'
                            const codeContent = lines.slice(1).join('\n')
                            return (
                              <div key={bIdx} className="rounded-xl overflow-hidden border border-slate-800/80 bg-[#070b15]/60 font-mono text-xs my-3 max-w-2xl">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/60">
                                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{lang}</span>
                                  <div className="flex space-x-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                                  </div>
                                </div>
                                <pre className="p-4 overflow-x-auto text-slate-300"><code>{codeContent}</code></pre>
                              </div>
                            )
                          }
                          return <div key={bIdx} className="whitespace-pre-wrap">{block}</div>
                        })}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-4xl"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-purple-400 border-purple-500/20 bg-purple-500/5 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Cpu className="w-5 h-5 animate-spin" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-400">{typingAgent || 'Swarm'} is thinking...</span>
                </div>
                {typingThoughts && (
                  <div className="bg-[#111625]/60 border border-purple-500/10 rounded-xl p-4 max-w-2xl shadow-sm relative overflow-hidden animate-pulse">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/40" />
                    <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[9px] uppercase tracking-widest mb-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Swarm Cogitation
                    </div>
                    <p className="text-[11px] font-mono text-purple-300/80 leading-relaxed">{typingThoughts}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-900/80 p-6 bg-slate-950/40 backdrop-blur-md flex flex-col gap-4 relative">
          
          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInput(p.replace(/[^a-zA-Z0-9\s]/g, '').trim())}
                className="text-[10px] border border-slate-900 hover:border-slate-800 bg-slate-900/20 text-slate-400 hover:text-slate-200 px-4 py-2 rounded-full transition-all duration-300 font-bold uppercase tracking-wider max-w-xs truncate"
                disabled={isTyping}
              >
                {p}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="flex gap-3 relative items-center"
          >
            <input
              type="text"
              placeholder={isTyping ? "Swarm is generating code..." : "Ask the Ruflo swarm to write, test, or review code..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900/30 border border-slate-900 focus:border-blue-500/40 rounded-xl px-5 py-4 text-sm focus:outline-none placeholder-slate-500 text-slate-200 transition-colors duration-300"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12 w-12 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/10"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
