import Link from "next/link";
import React from "react";

export default function ProjectOverview({ title, status }: { title: string, status: string }) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-6 mb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Project Overview
        </h2>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="bg-gradient-to-r from-emerald-500 to-green-600 px-2.5 py-1 rounded text-white text-[10px] font-black uppercase shadow-sm">
            {status}
          </span>
          <span className="text-sm font-bold">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95"
          href="/demo-shining"
          target="_blank"
        >
          VIEW DEMO
        </Link>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl text-sm font-black shadow-sm hover:shadow-md transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
          PROJECT BRIEF
        </button>
      </div>
    </div>
  );
}
