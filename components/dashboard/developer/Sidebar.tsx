import Link from "next/link";
import React from "react";
import { 
  Terminal, 
  LayoutDashboard, 
  ListTodo, 
  GitBranch, 
  Wallet, 
  Settings, 
  LogOut,
  User as UserIcon 
} from "lucide-react";
import { logout } from "@/app/actions";

interface SidebarProps {
  user?: {
    name?: string;
    role?: string;
    email?: string;
  };
  activeTab?: string;
}

export default function Sidebar({ user, activeTab = 'dashboard' }: SidebarProps) {
  const displayName = user?.name || "Senior Developer";
  const displayRole = user?.role ? `${user.role.toUpperCase()} NETWORK` : "DEVFLOW CONSOLE";

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0f172a] dark:text-white text-base font-black leading-tight block">
              AJPR DEVFLOW
            </span>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              {displayRole}
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          <Link
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            href="/dashboard/developer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm">Project Dashboard</span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'tasks'
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            href="/dashboard/developer?tab=tasks"
          >
            <ListTodo className="w-4 h-4" />
            <span className="text-sm font-semibold">Active Tasks</span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'repos'
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            href="/dashboard/developer?tab=repos"
          >
            <GitBranch className="w-4 h-4" />
            <span className="text-sm font-semibold">Repository</span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'earnings'
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            href="/dashboard/developer?tab=earnings"
          >
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-semibold">Earnings</span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            href="/dashboard/developer?tab=settings"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-semibold">Dev Settings</span>
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Network Availability
          </p>
          <div className="w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-2 rounded-xl text-xs font-bold border border-emerald-500/20 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            ACTIVE TALENT POOL
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">
                {user?.email || "developer@ajprworld.com"}
              </p>
            </div>
          </div>
          <form action={logout}>
            <button 
              type="submit" 
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
