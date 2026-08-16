'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Terminal, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AgentLog {
  id: string;
  agent_name: string;
  action: string;
  created_at: string;
}

export default function AgentLogs() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/agent-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 bg-gray-900 dark:bg-black rounded-xl border border-gray-800 shadow-sm overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
        <h2 className="text-gray-100 font-bold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          Live Agent Swarm Reports
        </h2>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
      </div>
      
      <div className="p-4 max-h-[500px] overflow-y-auto space-y-4 bg-gray-900">
        {logs.length === 0 && !loading ? (
          <div className="text-gray-500 text-center py-8">No agent activity logged recently.</div>
        ) : (
          logs.map((log) => (
            <motion.div 
              key={log.id} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
            >
              <div className="flex justify-between items-start mb-2 border-b border-gray-700/50 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>[{log.agent_name}]</span>
                  <span className="text-gray-300 font-normal">reported:</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
              
              <div className="mt-2 text-gray-300 text-xs whitespace-pre-wrap leading-relaxed">
                {log.action}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
