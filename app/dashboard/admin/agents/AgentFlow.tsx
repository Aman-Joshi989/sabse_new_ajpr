'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'thoth',
    position: { x: 50, y: -50 },
    data: { label: '📖 Thoth (SEO Writer)' },
    style: { background: '#fdf4ff', border: '1px solid #d946ef', color: '#d946ef', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'apollo',
    position: { x: 50, y: 150 },
    data: { label: '🎯 Apollo (Prospecting)' },
    style: { background: '#fef2f2', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'athena',
    position: { x: 50, y: 50 },
    data: { label: '✍️ Athena (Inbound/SEO)' },
    style: { background: '#faf5ff', border: '1px solid #a855f7', color: '#a855f7', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'hephaestus',
    position: { x: 300, y: 50 },
    data: { label: '⚙️ Hephaestus (Architect)' },
    style: { background: '#eff6ff', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'hermes',
    position: { x: 300, y: 150 },
    data: { label: '🤝 Hermes (Sales Closer)' },
    style: { background: '#fffbeb', border: '1px solid #f59e0b', color: '#f59e0b', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'plutus',
    position: { x: 600, y: 100 },
    data: { label: '💰 Plutus (Finance)' },
    style: { background: '#ecfeff', border: '1px solid #06b6d4', color: '#06b6d4', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'hera',
    position: { x: 600, y: 200 },
    data: { label: '🛡️ Hera (Success)' },
    style: { background: '#ecfdf5', border: '1px solid #10b981', color: '#10b981', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'daedalus',
    position: { x: 300, y: -50 },
    data: { label: '🎨 Daedalus (UI/UX)' },
    style: { background: '#f5f3ff', border: '1px solid #8b5cf6', color: '#8b5cf6', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'midas',
    position: { x: 600, y: 0 },
    data: { label: '📈 Midas (Strategy)' },
    style: { background: '#fefce8', border: '1px solid #eab308', color: '#eab308', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'artemis',
    position: { x: 50, y: 250 },
    data: { label: '🏹 Artemis (Outreach)' },
    style: { background: '#fdf2f8', border: '1px solid #ec4899', color: '#ec4899', borderRadius: '8px', padding: '10px', transition: 'all 0.3s ease' },
  },
  {
    id: 'zeus',
    position: { x: 300, y: -150 },
    data: { label: '👁️ Zeus (The Overseer)' },
    style: { background: '#f4f4f5', border: '2px solid #71717a', color: '#71717a', borderRadius: '8px', padding: '12px', fontWeight: 'bold', transition: 'all 0.3s ease' },
  },
];

const initialEdges: Edge[] = [
  // Zeus oversees all
  { id: 'ez1', source: 'zeus', target: 'apollo', animated: true, style: { stroke: '#a1a1aa' } },
  { id: 'ez2', source: 'zeus', target: 'athena', animated: true, style: { stroke: '#a1a1aa' } },
  { id: 'ez3', source: 'zeus', target: 'hephaestus', animated: true, style: { stroke: '#a1a1aa' } },
  { id: 'ez4', source: 'zeus', target: 'hermes', animated: true, style: { stroke: '#a1a1aa' } },
  { id: 'ez5', source: 'zeus', target: 'hera', animated: true, style: { stroke: '#a1a1aa' } },
  { id: 'ez6', source: 'zeus', target: 'plutus', animated: true, style: { stroke: '#a1a1aa' } },
  
  // Pipeline connections
  { id: 'e1', source: 'athena', target: 'hermes', animated: true },
  { id: 'e2', source: 'apollo', target: 'hermes', animated: true },
  { id: 'e3', source: 'hephaestus', target: 'hermes', animated: false },
  { id: 'e4', source: 'hermes', target: 'plutus', animated: true },
  { id: 'e5', source: 'hermes', target: 'hera', animated: true },
  { id: 'e6', source: 'plutus', target: 'hera', animated: false, label: 'Payment Cleared' },
  { id: 'e7', source: 'thoth', target: 'athena', animated: true },
  { id: 'e8', source: 'daedalus', target: 'hephaestus', animated: true },
  { id: 'e9', source: 'midas', target: 'plutus', animated: true },
  { id: 'e10', source: 'artemis', target: 'hermes', animated: true },
];

export default function AgentFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [logs, setLogs] = useState<any[]>([]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/agent-logs');
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
        
        // Find agents that ran in the last 15 minutes
        const activeAgents = new Set<string>();
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        
        data.logs.forEach((log: any) => {
          if (new Date(log.created_at) > fifteenMinsAgo) {
            activeAgents.add(log.agent_name.toLowerCase());
          }
        });

        // Update node styles to show glowing animation for active agents
        setNodes((nds) => 
          nds.map((node) => {
            const isActive = activeAgents.has(node.id);
            const targetBoxShadow = isActive ? '0 0 15px var(--tw-shadow-color)' : 'none';
            
            // Prevent unnecessary deep re-renders if style hasn't changed
            if (node.style?.boxShadow === targetBoxShadow) {
              return node;
            }

            return {
              ...node,
              style: {
                ...node.style,
                boxShadow: targetBoxShadow,
                '--tw-shadow-color': (node.style as any).color
              }
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [setNodes]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [fetchLogs]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
      {/* Node Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap zoomable pannable nodeColor={(n) => {
            if (n.style?.background) return n.style.background as string;
            return '#fff';
          }} />
          <Background color="#ccc" gap={16} />
        </ReactFlow>
        <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Mapping
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="w-full lg:w-80 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col bg-gray-50 dark:bg-gray-900/50">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold flex items-center justify-between">
          <span>Brain Feed</span>
          <span className="text-xs text-gray-500">Last 15 Logs</span>
        </div>
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3 text-sm">
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">Waiting for agent activity...</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-2 items-start bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${log.status === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{log.agent_name}: </span>
                  <span className="text-gray-600 dark:text-gray-400">{log.action}</span>
                  <div className="text-[10px] text-gray-400 mt-1">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
