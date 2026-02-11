"use client";
import React, { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-6">
      {isOpen && (
        <div className="w-[440px] h-[620px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="bg-vibrant-gradient p-8 text-white relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="size-14 rounded-2xl bg-center bg-cover border-2 border-white/30 shadow-2xl"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_yJGRZvo9rmp4eug-5VT1zpdkoHQqhsn2msQZQKTOwEDQdPSZbJgERulJavO_1Gn16Yn7spfk14kxzOXNmSUzo5boHStdLoFXBWKXn9B5gNmJqAaKejJJXVnVi10uIfdSyqm70tFHCSA-mYfPW3a7cr13i5zZnEFwXHIGy9KlMtT6ZFvgjHUyK5EUIrZWwy2VDG1ZDnmJOGgyKMCRsotF-JtZ19_GWN7JNjRuquu9RQjgPD8dLBCuTPd39RYMGAcBoIaSiLTY5w')",
                    }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 size-4 bg-status-green border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-black text-xl leading-none mb-1">
                    Mark Thompson
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Client • Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 group"
              >
                <span className="material-symbols-outlined text-white transition-transform group-hover:rotate-90">
                  close
                </span>
              </button>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-8 overflow-y-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-chat-bubble-light dark:text-white p-5 rounded-3xl rounded-tl-none text-sm font-semibold shadow-sm border border-blue-50 dark:border-slate-800 leading-relaxed">
                Hey Alex, I've just reviewed the updated payment flow in the demo.
                It looks great! One small thing - can we increase the font size on
                the success message?
              </div>
              <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">
                Mark • 11:32 AM
              </span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%] self-end">
              <div className="bg-black text-white p-5 rounded-3xl rounded-tr-none text-sm font-semibold shadow-xl leading-relaxed">
                Absolutely, Mark! I'll bump that up to 18px and bold it for
                better visibility. I'm pushing that change to the staging
                environment right now.
              </div>
              <span className="text-[10px] text-slate-400 font-bold mr-1 self-end uppercase tracking-tighter">
                You • 11:35 AM
              </span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-chat-bubble-light dark:text-white p-5 rounded-3xl rounded-tl-none text-sm font-semibold shadow-sm border border-blue-50 dark:border-slate-800 leading-relaxed">
                Perfect, thanks! Also, regarding the outstanding payment of
                ₹52,200 - my accounts team will process it by this Friday.
              </div>
              <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">
                Mark • 11:40 AM
              </span>
            </div>
          </div>
          <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex items-center gap-4">
              <button className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all">
                <span className="material-symbols-outlined">add</span>
              </button>
              <div className="relative flex-1">
                <input
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm px-6 py-4 pr-14 focus:ring-2 focus:ring-accent-start transition-all font-bold placeholder:text-slate-400"
                  placeholder="Message Mark..."
                  type="text"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black size-10 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <span className="material-symbols-outlined font-black text-xl">
                    send
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-vibrant-gradient size-24 rounded-full flex items-center justify-center text-white shadow-[0_25px_60px_rgba(59,130,246,0.45)] hover:scale-110 active:scale-95 transition-all group ring-[12px] ring-white/20 dark:ring-slate-900/40 relative"
      >
        <span className="material-symbols-outlined text-5xl font-light">
          chat_bubble
        </span>
        <div className="absolute -top-1 -right-1 size-8 bg-red-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-xs font-black shadow-lg">
          3
        </div>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </button>
    </div>
  );
}
