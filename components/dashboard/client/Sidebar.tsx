import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-vibrant-gradient size-10 rounded-lg flex items-center justify-center text-white shadow-md-card">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#0f172a] dark:text-white text-base font-black leading-tight">
              NEXUS
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Client Portal
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            href="#"
          >
            <span className="material-symbols-outlined fill-1">dashboard</span>
            <span className="text-sm font-bold">Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">event_note</span>
            <span className="text-sm font-semibold">Milestones</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">folder_open</span>
            <span className="text-sm font-semibold">Files</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-semibold">Invoices</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-semibold">Settings</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Need help?
          </p>
          <button className="w-full bg-black text-white dark:bg-white dark:text-black py-2.5 rounded-lg text-xs font-black shadow-md-card hover:shadow-md-card-hover active:translate-y-px transition-all">
            NEW REQUEST
          </button>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div
            className="size-10 rounded-full bg-center bg-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_yJGRZvo9rmp4eug-5VT1zpdkoHQqhsn2msQZQKTOwEDQdPSZbJgERulJavO_1Gn16Yn7spfk14kxzOXNmSUzo5boHStdLoFXBWKXn9B5gNmJqAaKejJJXVnVi10uIfdSyqm70tFHCSA-mYfPW3a7cr13i5zZnEFwXHIGy9KlMtT6ZFvgjHUyK5EUIrZWwy2VDG1ZDnmJOGgyKMCRsotF-JtZ19_GWN7JNjRuquu9RQjgPD8dLBCuTPd39RYMGAcBoIaSiLTY5w')",
            }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold truncate">Mark Thompson</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">
              Nexus Owner
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
