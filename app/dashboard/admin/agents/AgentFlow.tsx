'use client';

import React, { useCallback } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'apollo',
    position: { x: 50, y: 150 },
    data: { label: '🎯 Apollo (Prospecting)' },
    style: { background: '#fef2f2', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'athena',
    position: { x: 50, y: 50 },
    data: { label: '✍️ Athena (Inbound/SEO)' },
    style: { background: '#faf5ff', border: '1px solid #a855f7', color: '#a855f7', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'hephaestus',
    position: { x: 300, y: 50 },
    data: { label: '⚙️ Hephaestus (Architect)' },
    style: { background: '#eff6ff', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'hermes',
    position: { x: 300, y: 150 },
    data: { label: '🤝 Hermes (Sales Closer)' },
    style: { background: '#fffbeb', border: '1px solid #f59e0b', color: '#f59e0b', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'plutus',
    position: { x: 600, y: 100 },
    data: { label: '💰 Plutus (Finance)' },
    style: { background: '#ecfeff', border: '1px solid #06b6d4', color: '#06b6d4', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'hera',
    position: { x: 600, y: 200 },
    data: { label: '🛡️ Hera (Success)' },
    style: { background: '#ecfdf5', border: '1px solid #10b981', color: '#10b981', borderRadius: '8px', padding: '10px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'athena', target: 'hermes', animated: true },
  { id: 'e2', source: 'apollo', target: 'hermes', animated: true },
  { id: 'e3', source: 'hephaestus', target: 'hermes', animated: false },
  { id: 'e4', source: 'hermes', target: 'plutus', animated: true },
  { id: 'e5', source: 'hermes', target: 'hera', animated: true },
  { id: 'e6', source: 'plutus', target: 'hera', animated: false, label: 'Payment Cleared' },
];

export default function AgentFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '400px' }} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
    </div>
  );
}
