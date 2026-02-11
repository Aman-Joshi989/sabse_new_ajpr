'use client';

import React, { useState } from "react";
import { updateTaskStatusAction } from "@/app/actions";

export default function ActiveTaskHeader({ task }: { task?: any }) {
  const [loading, setLoading] = useState(false);

  const handleStopTimer = async () => {
    if (!task) return;
    setLoading(true);
    // Move task back to 'todo' to stop the timer/active state
    await updateTaskStatusAction(task.id, 'todo');
    setLoading(false);
  };

  // If no task is active, show prompt to pick one
  return (
    <div className="flex flex-wrap justify-between items-start gap-6 mb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Active Task
        </h2>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-black uppercase flex items-center gap-2 ${task ? 'text-status-green' : 'text-slate-400'}`}>
            <span className={`size-2 rounded-full ${task ? 'bg-status-green animate-pulse' : 'bg-slate-300'}`}></span>
            {task ? 'Working Now' : 'No Active Task'}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-bold text-slate-500">
            {task ? `${task.title} - ${task.tag}` : 'Drag a task to In Progress'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
            onClick={handleStopTimer}
            disabled={!task || loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-black shadow-lg transition-all ${
            task 
            ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}>
          <span className="material-symbols-outlined text-base">
            {loading ? 'hourglass_empty' : 'stop_circle'}
          </span>
          {loading ? 'STOPPING...' : 'STOP TIMER'}
        </button>
      </div>
    </div>
  );
}
