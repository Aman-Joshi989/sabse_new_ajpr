'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Play, CheckCircle2, AlertCircle, Loader2, Network, Shield, Target, PenTool, Wrench, Handshake, DollarSign, Palette, Search, TrendingUp, Navigation, Eye } from 'lucide-react';

// Dynamically import the heavy React Flow component to preserve optimal space complexity
const AgentFlow = dynamic(() => import('./AgentFlow'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 dark:bg-[#202124] rounded-xl border border-gray-200 dark:border-gray-700"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
});

import AgentLogs from './AgentLogs';

const agents = [
  {
    id: 'apollo',
    name: 'Apollo',
    role: 'Lead Generation Specialist',
    icon: Target,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    description: 'Scrapes B2B targets and runs outbound sequences.',
    actions: [{ label: 'Hunt Leads', id: 'hunt' }],
  },
  {
    id: 'athena',
    name: 'Athena',
    role: 'Content & SEO Director',
    icon: PenTool,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    description: 'Generates SEO blogs and social media content.',
    actions: [
      { label: 'Write Blog', id: 'blog' },
      { label: 'Social Post', id: 'post' },
    ],
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    role: 'Technical Architect',
    icon: Wrench,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    description: 'Scopes complex AI MVPs and system architectures.',
    actions: [{ label: 'Mock Proposal', id: 'proposal' }],
  },
  {
    id: 'hermes',
    name: 'Hermes',
    role: 'Lead Sales Consultant',
    icon: Network,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    description: 'Handles inbound chat and pushes for discovery calls.',
    actions: [{ label: 'Check Inbox', id: 'inbox' }],
  },
  {
    id: 'hera',
    name: 'Hera',
    role: 'Customer Success',
    icon: Shield,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    description: 'Manages onboarding and client relations.',
    actions: [{ label: 'Send Reports', id: 'reports' }],
  },
  {
    id: 'plutus',
    name: 'Plutus',
    role: 'Finance & Invoicing',
    icon: DollarSign,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    description: 'Generates invoices and tracks profitability.',
    actions: [{ label: 'Audit Invoices', id: 'audit' }],
  },
  {
    id: 'daedalus',
    name: 'Daedalus',
    role: 'UI/UX Architect',
    icon: Palette,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    description: 'Runs UX audits and suggests A/B tests for services.',
    actions: [{ label: 'Run Audit', id: 'audit' }],
  },
  {
    id: 'thoth',
    name: 'Thoth',
    role: 'SEO Content Strategist',
    icon: Search,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    description: 'Researches keywords and synthesizes SEO blogs.',
    actions: [{ label: 'Draft Blog', id: 'draft' }],
  },
  {
    id: 'midas',
    name: 'Midas',
    role: 'Business Strategist',
    icon: TrendingUp,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    description: 'Analyzes market gaps and drafts new services.',
    actions: [{ label: 'Draft Service', id: 'draft' }],
  },
  {
    id: 'artemis',
    name: 'Artemis',
    role: 'Backlink Outreach Scout',
    icon: Navigation,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    description: 'Hunts for backlinks and sends outreach emails.',
    actions: [{ label: 'Hunt Links', id: 'hunt' }],
  },
  {
    id: 'zeus',
    name: 'Zeus',
    role: 'The Overseer',
    icon: Eye,
    color: 'text-zinc-500',
    bg: 'bg-zinc-500/10',
    description: 'Monitors all agents and generates daily health reports.',
    actions: [{ label: 'Check Status', id: 'status' }],
  },
  {
    id: 'aegis',
    name: 'Aegis',
    role: 'Chief Cybersecurity Officer',
    icon: Shield,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    description: 'Monitors threat vectors, authentication, and logs anomalies.',
    actions: [{ label: 'Run Scan', id: 'scan' }],
  },
  {
    id: 'nexus',
    name: 'Nexus',
    role: 'Operations Overseer',
    icon: Network,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    description: 'Reviews agent performance logs and reports on workforce health.',
    actions: [{ label: 'Audit Agents', id: 'audit' }],
  }
];

export default function AgentCommandCenter() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Record<string, 'success' | 'error' | null>>({});

  const handleTrigger = async (agentId: string, actionId: string) => {
    const key = `${agentId}-${actionId}`;
    setLoading((prev) => ({ ...prev, [key]: true }));
    setStatus((prev) => ({ ...prev, [key]: null }));

    try {
      const res = await fetch('/api/admin/trigger-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, action: actionId }),
      });

      if (!res.ok) throw new Error('Trigger failed');

      setStatus((prev) => ({ ...prev, [key]: 'success' }));
    } catch (error) {
      console.error(error);
      setStatus((prev) => ({ ...prev, [key]: 'error' }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
      
      // Clear status after 3s
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, [key]: null }));
      }, 3000);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Network className="w-8 h-8 text-indigo-500" />
          AI Agent Command Center
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Monitor and manually trigger your autonomous agency workforce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#292A2D] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${agent.bg} ${agent.color}`}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {agent.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {agent.description}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-[#202124] space-y-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Manual Overrides
              </p>
              <div className="flex flex-wrap gap-2">
                {agent.actions.map((action) => {
                  const key = `${agent.id}-${action.id}`;
                  const isLoading = loading[key];
                  const currentStatus = status[key];

                  return (
                    <button
                      key={action.id}
                      onClick={() => handleTrigger(agent.id, action.id)}
                      disabled={isLoading}
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#3C4043] border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      ) : currentStatus === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : currentStatus === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-400" />
                      )}
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Visual Connection Map (React Flow) */}
      <div className="mt-12 bg-white dark:bg-[#292A2D] rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pipeline Workflow</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Drag nodes to reorganize or connect them to build new custom pipelines.</p>
        </div>
        
        <AgentFlow />
      </div>

      {/* Live Agent Logs Feed */}
      <AgentLogs />

    </div>
  );
}
