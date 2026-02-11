'use client';

import React, { useState } from "react";
import { logHoursAction } from "@/app/actions";

export default function ProjectProgress({ percent, hoursUsed, totalHours, deadline }: { percent: number, hoursUsed: number, totalHours: number, deadline: string }) {
  const [logging, setLogging] = useState(false);
  const [hoursToAdd, setHoursToAdd] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Re-calculate progress for optimistic updating or just display passed props (server revalidates)
  // For simplicity, we rely on server revalidation to update the props after action.

  const handleLogHours = async () => {
    setIsSubmitting(true);
    await logHoursAction(1, hoursToAdd); // Hardcoded project ID 1 for this demo
    setIsSubmitting(false);
    setLogging(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-material-1 flex flex-col md:flex-row items-center gap-10">
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="size-44" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }}></stop>
              <stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 1 }}></stop>
            </linearGradient>
          </defs>
          <circle
            className="text-slate-100 dark:text-slate-800 stroke-current"
            cx="50"
            cy="50"
            fill="transparent"
            r="42"
            strokeWidth="10"
          ></circle>
          <circle
            className="progress-ring__circle"
            cx="50"
            cy="50"
            fill="transparent"
            r="42"
            stroke="url(#grad1)"
            strokeLinecap="round"
            strokeWidth="10"
            style={{
              strokeDasharray: 264,
              strokeDashoffset: 264 - (264 * percent / 100),
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900 dark:text-white">
            {percent}%
          </span>
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest leading-none mt-1">
            Complete
          </span>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left w-full">
        <h3 className="text-2xl font-black mb-3">Project Progress</h3>
        <p className="text-slate-500 text-base leading-relaxed mb-6 font-medium">
          Sprint 4 is active. Log your development hours to update the burn-down chart and client invoice status.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
              Total Dev Hours
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {hoursUsed}h <span className="text-slate-400 text-sm">/ {totalHours}h</span>
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
              Release Date
            </p>
            <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 uppercase">
                {deadline}
            </p>
          </div>
        </div>

        {/* Time Logging */}
        {!logging ? (
            <button 
                onClick={() => setLogging(true)}
                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
            >
                Log Hours
            </button>
        ) : (
            <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg animate-in fade-in slide-in-from-top-2">
                <button 
                    onClick={() => setHoursToAdd(Math.max(1, hoursToAdd - 1))}
                    className="size-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:scale-105 transition-all text-lg font-bold"
                >
                    -
                </button>
                <div className="flex-1 text-center font-black text-lg">
                    {hoursToAdd} hrs
                </div>
                <button 
                    onClick={() => setHoursToAdd(hoursToAdd + 1)}
                    className="size-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:scale-105 transition-all text-lg font-bold"
                >
                    +
                </button>
                <button 
                    onClick={handleLogHours}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-500 text-white rounded font-bold text-xs uppercase hover:bg-green-600 transition-colors"
                >
                    {isSubmitting ? '...' : 'Save'}
                </button>
                <button 
                    onClick={() => setLogging(false)}
                    className="px-3 py-2 text-slate-400 hover:text-slate-600"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
