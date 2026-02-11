'use client';

import React, { useState, useOptimistic } from "react";
import { updateTaskStatusAction } from "@/app/actions";

export default function TaskKanban({ tasks }: { tasks: any[] }) {
  // Use optimistic UI for instant feedback
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (state: any[], updatedTask: { id: number; status: string }) => {
        return state.map(t => t.id === updatedTask.id ? { ...t, status: updatedTask.status } : t);
    }
  );

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    
    // Optimistic Update
    addOptimisticTask({ id: taskId, status });

    // Server Action
    await updateTaskStatusAction(taskId, status);
  };

  const todo = optimisticTasks.filter(t => t.status === 'todo');
  const inProgress = optimisticTasks.filter(t => t.status === 'in_progress');
  const done = optimisticTasks.filter(t => t.status === 'done');

  const Column = ({ title, status, items, bgClass, countClass }: any) => (
    <div 
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
        className={`${bgClass} p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-material-1 flex flex-col min-h-[300px] transition-colors`}
    >
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
          {title}
          <span className={`${countClass} px-2 py-0.5 rounded text-[10px]`}>
            {items.length}
          </span>
        </h4>
        <div className="flex flex-col gap-3">
          {items.map((t: any) => (
            <div 
                key={t.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, t.id)}
                className={`p-4 rounded-xl border cursor-move transition-all active:scale-95 hover:shadow-md ${
                    status === 'in_progress' 
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 border-transparent shadow-lg' 
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-300'
                } ${status === 'done' ? 'opacity-60' : ''}`}
            >
              <p className={`text-xs font-bold mb-2 ${status === 'in_progress' ? 'text-white' : 'text-slate-900 dark:text-white'} ${status === 'done' ? 'line-through' : ''}`}>
                  {t.title}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    status === 'in_progress' 
                    ? 'bg-white/20 text-white' 
                    : `bg-${t.tag_color || 'blue'}-100 text-${t.tag_color || 'blue'}-600`
                }`}>
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
          {items.length === 0 && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-400 font-bold uppercase tracking-widest opacity-50">
                  Drop Here
              </div>
          )}
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Column 
        title="To-Do" 
        status="todo" 
        items={todo} 
        bgClass="bg-white dark:bg-slate-900" 
        countClass="bg-slate-100 dark:bg-slate-800"
      />
      <Column 
        title="In Progress" 
        status="in_progress" 
        items={inProgress} 
        bgClass="bg-blue-50/50 dark:bg-slate-900" 
        countClass="bg-blue-100 text-blue-600"
      />
      <Column 
        title="Completed" 
        status="done" 
        items={done} 
        bgClass="bg-white dark:bg-slate-900" 
        countClass="bg-green-100 text-green-600"
      />
    </div>
  );
}
