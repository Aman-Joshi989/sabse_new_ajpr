"use client";

import React, { useState } from "react";
import { X, Plus, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { updateProjectAction, createMilestoneAction, updateMilestoneAction, deleteMilestoneAction, createProjectAction, deleteProjectAction } from "@/app/actions";

export default function ProjectEditorModal({ 
  project, 
  milestones = [],
  users = [],
  onClose 
}: { 
  project: any, 
  milestones?: any[],
  users?: any[],
  onClose: () => void 
}) {
  const isNew = !project;
  
  // Project State
  const [title, setTitle] = useState(project?.title || "");
  const [clientId, setClientId] = useState(project?.client_id || "");
  const [developerId, setDeveloperId] = useState(project?.developer_id || "");
  const [status, setStatus] = useState(project?.status || "Not Started");
  const [progress, setProgress] = useState(project?.progress_percent || 0);
  const [hoursUsed, setHoursUsed] = useState(project?.hours_used || 0);
  const [totalHours, setTotalHours] = useState(project?.total_hours || 100);
  const [totalValue, setTotalValue] = useState(project?.total_value || 0);
  const [pendingValue, setPendingValue] = useState(project?.pending_value || 0);
  
  // Milestone State
  const [localMilestones, setLocalMilestones] = useState<any[]>(milestones);
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveProject = async () => {
    setLoading(true);
    try {
      if (isNew) {
         const res = await createProjectAction({ 
             title, 
             client_id: clientId ? parseInt(clientId) : undefined,
             developer_id: developerId ? parseInt(developerId) : undefined
         });
         if(res.success) {
            toast.success("Project created successfully!");
            onClose();
         } else {
            toast.error(res.error || "Failed to create project");
         }
      } else {
         const data = {
             title,
             status,
             progress_percent: parseInt(progress),
             hours_used: parseInt(hoursUsed),
             total_hours: parseInt(totalHours),
             total_value: parseInt(totalValue),
             pending_value: parseInt(pendingValue),
             client_id: clientId ? parseInt(clientId) : undefined,
             developer_id: developerId ? parseInt(developerId) : undefined
         };
         const res = await updateProjectAction(project.id, data);
         if(res.success) {
             toast.success("Project updated successfully!");
         } else {
             toast.error(res.error || "Failed to update project");
         }
      }
    } catch(e: any) {
        toast.error(e.message);
    }
    setLoading(false);
  };

  const handleDeleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project? All associated milestones and tasks will be deleted.")) return;
    setLoading(true);
    const res = await deleteProjectAction(project.id);
    if (res.success) {
        toast.success("Project deleted successfully!");
        onClose();
    } else {
        toast.error(res.error || "Failed to delete project");
    }
    setLoading(false);
  };

  const handleAddMilestone = async () => {
      if(!newMilestoneName.trim() || isNew) return;
      const res = await createMilestoneAction(project.id, newMilestoneName, 'pending');
      if(res.success) {
          setLocalMilestones([...localMilestones, res.milestone]);
          setNewMilestoneName("");
          toast.success("Milestone added");
      }
  };

  const handleUpdateMilestone = async (mId: number, name: string, status: string) => {
      const res = await updateMilestoneAction(mId, name, status);
      if(res.success) {
          setLocalMilestones(localMilestones.map(m => m.id === mId ? res.milestone : m));
          toast.success("Milestone updated");
      }
  };

  const handleDeleteMilestone = async (mId: number) => {
      const res = await deleteMilestoneAction(mId);
      if(res.success) {
          setLocalMilestones(localMilestones.filter(m => m.id !== mId));
          toast.success("Milestone deleted");
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a1b1e] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        <div className="sticky top-0 bg-white dark:bg-[#1a1b1e] border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {isNew ? "Create New Project" : `Edit Project: ${project.title}`}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* LEFT COL: Project Details */}
            <div className="flex flex-col gap-6">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-2">Project Details</h3>
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Assign Client</label>
                    <select value={clientId} onChange={e => setClientId(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                        <option value="">Unassigned</option>
                        {users.filter(u => u.role === 'client').map(u => (
                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Assign Developer</label>
                    <select value={developerId} onChange={e => setDeveloperId(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                        <option value="">Unassigned</option>
                        {users.filter(u => u.role === 'developer').map(u => (
                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                </div>
                
                {!isNew && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="QA">QA</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Progress %</label>
                            <input type="number" value={progress} onChange={e => setProgress(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Hours Used</label>
                            <input type="number" value={hoursUsed} onChange={e => setHoursUsed(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Total Hours</label>
                            <input type="number" value={totalHours} onChange={e => setTotalHours(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Total Value (₹)</label>
                            <input type="number" value={totalValue} onChange={e => setTotalValue(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">Pending Value (₹)</label>
                            <input type="number" value={pendingValue} onChange={e => setPendingValue(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                        </div>
                    </div>
                </>
                )}

                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={handleSaveProject} 
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                  >
                    {loading ? "Saving..." : "Save Project Details"}
                  </button>
                  
                  {!isNew && (
                  <button 
                    onClick={handleDeleteProject} 
                    disabled={loading}
                    className="px-6 bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 font-bold rounded-xl transition-all flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  )}
                </div>
            </div>

            {/* RIGHT COL: Milestones (Only if not new) */}
            {!isNew ? (
                <div className="flex flex-col gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-2">Milestones</h3>
                    
                    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {localMilestones.map(m => (
                            <div key={m.id} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <select 
                                    value={m.status} 
                                    onChange={(e) => handleUpdateMilestone(m.id, m.name, e.target.value)}
                                    className="p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <input 
                                    type="text" 
                                    value={m.name} 
                                    onChange={(e) => {
                                        const newName = e.target.value;
                                        setLocalMilestones(localMilestones.map(lm => lm.id === m.id ? { ...lm, name: newName } : lm));
                                    }}
                                    onBlur={(e) => handleUpdateMilestone(m.id, e.target.value, m.status)}
                                    className="flex-1 bg-transparent border-none text-sm font-semibold focus:ring-0"
                                />
                                <button onClick={() => handleDeleteMilestone(m.id)} className="text-red-500 hover:text-red-600 p-2">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {localMilestones.length === 0 && <p className="text-sm text-slate-500">No milestones yet.</p>}
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <input 
                            type="text" 
                            placeholder="New milestone name..." 
                            value={newMilestoneName}
                            onChange={e => setNewMilestoneName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddMilestone()}
                            className="flex-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" 
                        />
                        <button onClick={handleAddMilestone} className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:scale-105 transition-transform">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500 text-center">Save the project first to add milestones.</p>
                </div>
            )}
            
        </div>
      </div>
    </div>
  );
}
