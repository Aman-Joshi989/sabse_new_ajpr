import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-vibrant-gradient size-10 rounded-lg flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined">terminal</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#0f172a] dark:text-white text-base font-black leading-tight">
              DEVFLOW
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Developer Console
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            href="#"
          >
            <span className="material-symbols-outlined fill-1">dashboard</span>
            <span className="text-sm font-bold">Project Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">task</span>
            <span className="text-sm font-semibold">Active Tasks</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">account_tree</span>
            <span className="text-sm font-semibold">Repository</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-sm font-semibold">Earnings</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">tune</span>
            <span className="text-sm font-semibold">Dev Settings</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Availability
          </p>
          <button className="w-full bg-black text-white dark:bg-white dark:text-black py-2.5 rounded-lg text-xs font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="size-2 bg-status-green rounded-full animate-pulse"></span>
            ACTIVE STATUS
          </button>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div
            className="size-10 rounded-full bg-center bg-cover border-2 border-white dark:border-slate-800 shadow-sm"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJP8C2crw-apoYQJPPWluywOo9Aqkjn0liQCjX1RIIBRoRgKuLmCmhVwbUTD5Nlk5SfznSY3INIHx88DmBffSyqmpdjYbvGeshtOUr3NSiOH4r08oWjO17CJN8_7LFySfoeWjV_n4MZhAu2FsXZAPvy4Ek-nBsqQfhFJnp2H4ydGdVmFTdTVcFStKnvIKlfme6EVewWP8_1OsQ_5yKxQIOPTjX1lO63uCcEJu83wnu8gtINTNNkbRWyoJUMU5DhiJaLzMxGjY74g')",
            }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">
              Senior Full Stack
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
