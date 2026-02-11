import React from "react";

export default function Milestones({ milestones }: { milestones: any[] }) {
  const completed = milestones.filter(m => m.status === 'completed');
  const inProgress = milestones.filter(m => m.status !== 'completed');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md-card">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center justify-between">
          Completed
          <span className="bg-vibrant-gradient size-2 rounded-full"></span>
        </h4>
        <div className="flex flex-col gap-5">
          {completed.map((m) => (
            <div key={m.id} className="flex items-center gap-4 group">
              <span className="material-symbols-outlined text-status-green text-2xl">check_circle</span>
              <span className="text-sm font-bold text-slate-400 line-through decoration-slate-300">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md-card">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center justify-between">
          In Progress
          <span className="text-vibrant-gradient font-black">ACTIVE</span>
        </h4>
        <div className="flex flex-col gap-4">
          {inProgress.map((m) => (
            <div 
              key={m.id} 
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                m.status === 'in_progress' 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg scale-105 shimmer-effect' 
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400'
              }`}
            >
               {m.status === 'in_progress' ? (
                 <div className="size-3 rounded-full bg-white animate-pulse"></div>
               ) : (
                 <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
               )}
              <span className="text-sm font-bold">
                {m.name}
              </span>
            </div>
           ))}
        </div>
      </div>
    </div>
  );
}
