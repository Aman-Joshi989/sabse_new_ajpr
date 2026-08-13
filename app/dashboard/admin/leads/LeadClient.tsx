"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { changeLeadStatus } from "./actions";
import { toast } from "sonner";
import { Mail, Briefcase, Code, DollarSign, ExternalLink } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  email: string;
  company_size: string | null;
  budget: string | null;
  tech_stack: string | null;
  status: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

const COLUMNS = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'contacted', title: 'Contacted', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 'qualified', title: 'Qualified', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { id: 'closed', title: 'Closed Won', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
];

export default function LeadClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = async (statusId: string) => {
    if (!draggedLead) return;
    if (draggedLead.status === statusId) return;

    // Optimistic UI update
    setLeads(leads.map(l => l.id === draggedLead.id ? { ...l, status: statusId } : l));
    
    const res = await changeLeadStatus(draggedLead.id, statusId);
    if (!res.success) {
      toast.error("Failed to update status");
      // Revert on failure
      setLeads(leads);
    } else {
      toast.success(`Moved ${draggedLead.name} to ${statusId}`);
    }
    setDraggedLead(null);
  };

  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const handleAIAnalyze = async (lead: Lead) => {
    setAnalyzingId(lead.id);
    setAiResult(null);
    try {
      const res = await fetch('/api/admin/lead-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data.text);
      } else {
        toast.error("AI Analysis failed");
      }
    } catch (e) {
      toast.error("Network error");
    }
    setAnalyzingId(null);
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      {aiResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-blue-500/50 p-6 rounded-2xl max-w-2xl w-full shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">✨ AI Sales Strategy</span>
            </h2>
            <div className="whitespace-pre-wrap text-slate-300 text-sm font-medium">
              {aiResult}
            </div>
            <button onClick={() => setAiResult(null)} className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition">Close</button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">High-Ticket CRM</h1>
        <p className="text-slate-400">Manage incoming leads from your free-audit funnel. Drag and drop to update status.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px]">
        {COLUMNS.map(col => (
          <div 
            key={col.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col.id)}
            className={`rounded-2xl border bg-slate-900/50 p-4 flex flex-col transition-all duration-300 ${
              draggedLead ? 'border-dashed border-blue-500/50 bg-blue-500/5' : 'border-slate-800'
            }`}
          >
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold w-max mb-4 border ${col.color}`}>
              {col.title} ({leads.filter(l => l.status === col.id).length})
            </div>
            
            <div className="flex-1 space-y-4">
              {leads.filter(l => l.status === col.id).map(lead => (
                <motion.div
                  layoutId={`lead-${lead.id}`}
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead)}
                  className="group relative bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 cursor-grab active:cursor-grabbing hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all"
                >
                  <h3 className="text-white font-medium flex justify-between items-start">
                    {lead.name}
                    <div className="flex gap-2">
                      <button onClick={() => handleAIAnalyze(lead)} className="text-slate-400 hover:text-purple-400">
                        {analyzingId === lead.id ? <span className="animate-spin">✨</span> : '✨'}
                      </button>
                      <a href={`mailto:${lead.email}`} className="text-slate-400 hover:text-blue-400"><Mail className="w-4 h-4"/></a>
                    </div>
                  </h3>
                  
                  <div className="mt-3 space-y-2 text-xs text-slate-400">
                    {lead.budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500" /> 
                        <span className="text-slate-300 font-medium">{lead.budget}</span>
                      </div>
                    )}
                    {lead.company_size && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" /> {lead.company_size}
                      </div>
                    )}
                    {lead.tech_stack && (
                      <div className="flex items-center gap-2">
                        <Code className="w-3.5 h-3.5 text-slate-500" /> {lead.tech_stack}
                      </div>
                    )}
                  </div>

                  {(lead.utm_source || lead.utm_campaign) && (
                    <div className="mt-4 pt-3 border-t border-slate-700/50 text-[10px] text-slate-500 flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" />
                      <span>{lead.utm_source || 'direct'} / {lead.utm_campaign || 'none'}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
