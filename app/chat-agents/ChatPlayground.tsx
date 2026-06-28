'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Send, User, Bot, HelpCircle, Layers, CheckCircle2, ChevronRight, MessageSquare, Terminal, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  content: string
  thoughts?: string
  timestamp: string
}

const PRESETS = [
  "Design a secure PostgreSQL database schema for SaaS subscriptions",
  "Write an express middleware that blocks SQL injection and rate limits IPs",
  "Build a Playwright script that tests user signup and checkout flows"
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
      avatar: <Cpu className="w-4.5 h-4.5 text-blue-400" />,
      color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
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
        avatar: <Cpu className="w-4.5 h-4.5 text-blue-400" />,
        color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
        content: `Routing task to swarm with ${topology} topology. Active workspace context configured. Beginning collaborative agent reasoning loop.`,
        timestamp: routerTime
      }
    ])

    // State array for workflow execution based on toggled agents
    const steps: { agent: string; thoughts: string; content: string; color: string; avatar: React.ReactNode }[] = []

    if (activeAgents.architect) {
      steps.push({
        agent: 'Architect Agent',
        thoughts: 'We need to design a modular, scalable architecture. Storing design specifications in memory namespace "swarm_collaboration". Focus on PostgreSQL table schema design.',
        content: `### System Architecture Proposed:\n\n* **Tables**: \`users\`, \`subscriptions\`, \`billing_invoices\`.\n* **Relations**: One-to-many relationship from \`users\` to \`billing_invoices\`. One-to-one mapping for \`subscriptions\`.\n* **Database Provider**: Neon serverless Postgres for instant scale.`,
        color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
        avatar: <Layers className="w-4.5 h-4.5 text-purple-400" />
      })
    }

    if (activeAgents.coder) {
      steps.push({
        agent: 'Coder Agent',
        thoughts: 'Implementing prisma client models based on the schema design stored by Architect. Optimizing column type mappings and indexing constraints.',
        content: `### Database Models (Prisma Schema):\n\n\`\`\`prisma\nmodel User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  name      String?\n  createdAt DateTime @default(now())\n  subscription Subscription?\n}\n\`\`\``,
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
        avatar: <Bot className="w-4.5 h-4.5 text-emerald-400" />
      })
    }

    if (activeAgents.security) {
      steps.push({
        agent: 'Security Agent',
        thoughts: 'Reviewing SQL design and database configurations. Checking for indexing performance gaps and data isolation rules. Validating uuid integrity.',
        content: `### Security Audit Result: PASS\n\n* **PII Protection**: Encryption recommended for sensitive billing details.\n* **Vulnerabilities**: Verified zero raw SQL entrypoints. Input queries use parameterized commands natively via Prisma.`,
        color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
        avatar: <Eye className="w-4.5 h-4.5 text-cyan-400" />
      })
    }

    if (activeAgents.tester) {
      steps.push({
        agent: 'Tester Agent',
        thoughts: 'Creating unit tests to validate the Prisma client connection and model integrity constraints.',
        content: `### Test Suite Mock-up:\n\n\`\`\`typescript\ntest('should create user record', async () => {\n  const user = await db.user.create({\n    data: { email: 'test@ajprworld.com' }\n  });\n  expect(user.id).toBeDefined();\n});\n\`\`\``,
        color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
        avatar: <CheckCircle2 className="w-4.5 h-4.5 text-amber-400" />
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
        avatar: <User className="w-4.5 h-4.5 text-slate-200" />,
        color: 'text-slate-200 border-slate-700 bg-slate-800/10',
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative">
      {/* Breadcrumb Schema for search engine optimization */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] left-[20%] w-[550px] h-[550px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar: Control Panel */}
      <div className="w-full lg:w-80 border-r border-slate-900 bg-slate-950/80 backdrop-blur-md p-6 flex flex-col gap-8 relative z-10">
        <div>
          <Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors text-sm flex items-center gap-1.5 mb-6">
            &larr; Back to Home
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" /> Swarm Controls
          </h2>
          <p className="text-slate-450 text-xs mt-1.5 leading-relaxed">
            Configure swarm coordination styles and enable/disable worker agents.
          </p>
        </div>

        {/* Topology Select */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topology</span>
          <div className="flex flex-col gap-2">
            {[
              { id: 'hierarchical', title: 'Hierarchical Swarm', desc: 'Central coordinator dictates work' },
              { id: 'p2p', title: 'Peer-to-Peer Mesh', desc: 'Agents cross-verify and write in parallel' },
              { id: 'consensus', title: 'Hive-Mind Consensus', desc: 'Consensus voting resolves conflicts' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => !isTyping && setTopology(t.id as any)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  topology === t.id
                    ? 'bg-blue-950/40 border-blue-500/50 text-white shadow-sm'
                    : 'bg-slate-900/30 border-slate-900 hover:border-slate-800 text-slate-355'
                } ${isTyping ? 'opacity-65 cursor-not-allowed' : ''}`}
                disabled={isTyping}
              >
                <div className="font-semibold text-xs">{t.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Agents */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Swarm Members</span>
          <div className="flex flex-col gap-3.5 bg-slate-900/20 border border-slate-900/40 p-4 rounded-xl">
            {[
              { key: 'architect', label: 'Architect Agent', color: 'text-purple-400' },
              { key: 'coder', label: 'Coder Agent', color: 'text-emerald-400' },
              { key: 'security', label: 'Security Agent', color: 'text-cyan-400' },
              { key: 'tester', label: 'Tester Agent', color: 'text-amber-400' }
            ].map(agent => (
              <div key={agent.key} className="flex items-center justify-between">
                <Label htmlFor={`toggle-${agent.key}`} className={`text-xs font-medium cursor-pointer ${agent.color}`}>
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

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-[calc(100vh-60px)] lg:h-screen relative z-10">
        {/* Chat Header */}
        <div className="border-b border-slate-900 px-6 py-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Swarm Workspace</h3>
              <p className="text-xs text-slate-450">Active Swarm: swarm-1782-t3tken</p>
            </div>
          </div>
          <Badge className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 font-mono text-[10px]">
            ACTIVE
          </Badge>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border ${msg.color}`}>
                {msg.avatar}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className={`flex items-center gap-2 text-xs ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  <span className="font-bold text-slate-300">{msg.sender}</span>
                  <span className="text-slate-500 text-[10px]">{msg.timestamp}</span>
                </div>
                
                {msg.thoughts && (
                  <div className="text-[11px] font-mono text-purple-400/90 border-l border-purple-500/20 pl-3.5 py-1 mb-2 leading-relaxed max-w-xl">
                    <span className="text-purple-500/60 font-bold block text-[10px] uppercase tracking-wider mb-0.5">Agent Thoughts</span>
                    {msg.thoughts}
                  </div>
                )}
                
                <div className={`p-4 rounded-xl border leading-relaxed text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-900/40 border-slate-900 text-slate-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-3xl"
            >
              <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border text-purple-400 border-purple-500/20 bg-purple-500/5 animate-pulse">
                <Cpu className="w-4.5 h-4.5 animate-spin" />
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-350">{typingAgent || 'Swarm'} is thinking...</span>
                </div>
                {typingThoughts && (
                  <div className="text-[11px] font-mono text-purple-400/90 border-l border-purple-500/30 pl-3.5 py-1 leading-relaxed animate-pulse">
                    <span className="text-purple-500/60 font-bold block text-[10px] uppercase tracking-wider mb-0.5">Swarm Reasoning</span>
                    {typingThoughts}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Controls */}
        <div className="border-t border-slate-900 p-6 bg-slate-950/80 backdrop-blur-md flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInput(p)}
                className="text-[11px] border border-slate-900 hover:border-slate-800 bg-slate-900/30 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-full transition-colors max-w-xs truncate"
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
            className="flex gap-3"
          >
            <input
              type="text"
              placeholder={isTyping ? "Swarm is working..." : "Ask the Ruflo swarm to write, test, or review code..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900/40 border border-slate-900 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none placeholder-slate-500 text-slate-200 transition-colors"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4.5 h-4.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
