"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Rocket, LayoutDashboard, Flag, FolderOpen, Receipt, Settings, X } from "lucide-react";
import { toast } from "sonner";

export default function Sidebar({ activeTab }: { activeTab: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestText, setRequestText] = useState("");

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setRequestText("");
    toast.success("Request submitted to your account manager!");
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'milestones', icon: Flag, label: 'Milestones' },
    { id: 'files', icon: FolderOpen, label: 'Files' },
    { id: 'invoices', icon: Receipt, label: 'Invoices' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col justify-between p-6 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-vibrant-gradient size-10 rounded-xl flex items-center justify-center text-white shadow-md-card shadow-amber-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#0f172a] dark:text-white text-base font-black leading-tight block">
                AJPR WORLD
              </span>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Client Portal
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={`/dashboard/client?tab=${item.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-[1.02]' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-[1.02]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                  <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 relative z-10">
              Need help?
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 rounded-xl text-xs font-black shadow-lg hover:shadow-xl active:scale-95 transition-all relative z-10"
            >
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
              <p className="text-sm font-bold truncate">Aman Joshi</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                AJPR World Owner
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Submit a Request</h2>
              <p className="text-sm text-slate-500 mb-6">Need a change, extra hours, or technical support? Let us know below.</p>
              
              <form onSubmit={handleNewRequest} className="flex flex-col gap-4">
                <textarea 
                  className="w-full min-h-[120px] p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none transition-all"
                  placeholder="Describe what you need..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                >
                  SEND REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
