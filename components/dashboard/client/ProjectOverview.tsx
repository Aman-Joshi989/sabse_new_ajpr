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
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-lg text-sm font-black shadow-material-1 hover:shadow-material-2 transition-all hover:scale-105 active:scale-95"
          href="/demo"
          target="_blank"
        >
          <span className="material-symbols-outlined text-base">
            visibility
          </span>
          VIEW DEMO
        </Link>
        <button className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg text-sm font-black shadow-md-card hover:shadow-md-card-hover transition-all">
          <span className="material-symbols-outlined text-base">
            description
          </span>
          PROJECT BRIEF
        </button>
      </div>
    </div>
  );
}
