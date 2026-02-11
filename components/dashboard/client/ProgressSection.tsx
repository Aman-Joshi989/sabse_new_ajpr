import React from "react";

export default function ProgressSection({ percent, hoursUsed, deadline }: { percent: number, hoursUsed: number, deadline: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md-card flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-vibrant-gradient opacity-5 blur-3xl -mr-16 -mt-16"></div>
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
            Done
          </span>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">
          Development Phase 04
        </h3>
        <p className="text-slate-500 text-base leading-relaxed mb-6 font-medium">
          Infrastructure build is progressing rapidly. We are currently
          finalizing the API endpoints and performing security stress tests.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
              Time Invested
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {hoursUsed} Hours
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
              Next Deadline
            </p>
            <p className="text-xl font-black text-vibrant-gradient uppercase">{deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
