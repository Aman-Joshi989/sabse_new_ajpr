"use client";

import { submitMessage } from "@/app/actions";
import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget({ initialMessages = [], role, senderName }: { initialMessages: any[], role: 'client' | 'developer', senderName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
	// Simple polling simulation or re-sync if needed, 
	// but for now relying on initial + local optimistic update 
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if(!inputValue.trim()) return;
    
    // Optimistic update
    const tempMsg = {
        id: Date.now(),
        content: inputValue,
        sender_name: senderName,
        sender_role: role,
        created_at: new Date().toISOString()
    };
    setMessages([...messages, tempMsg]);
    setInputValue("");

    await submitMessage(inputValue, senderName, role);
  };

  const opponentRole = role === 'client' ? 'developer' : 'client';
  const opponentName = role === 'client' ? 'Alex Rivera' : 'Mark Thompson';
  const opponentStatus = role === 'client' ? 'working now' : 'online';

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-6">
      {isOpen && (
        <div className="w-[420px] h-[600px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md-elevation flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="bg-vibrant-gradient p-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="size-12 rounded-xl bg-center bg-cover border border-white/30"
                    style={{
                      backgroundImage:
                        opponentRole === 'developer' 
                        ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJP8C2crw-apoYQJPPWluywOo9Aqkjn0liQCjX1RIIBRoRgKuLmCmhVwbUTD5Nlk5SfznSY3INIHx88DmBffSyqmpdjYbvGeshtOUr3NSiOH4r08oWjO17CJN8_7LFySfoeWjV_n4MZhAu2FsXZAPvy4Ek-nBsqQfhFJnp2H4ydGdVmFTdTVcFStKnvIKlfme6EVewWP8_1OsQ_5yKxQIOPTjX1lO63uCcEJu83wnu8gtINTNNkbRWyoJUMU5DhiJaLzMxGjY74g')"
                        : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_yJGRZvo9rmp4eug-5VT1zpdkoHQqhsn2msQZQKTOwEDQdPSZbJgERulJavO_1Gn16Yn7spfk14kxzOXNmSUzo5boHStdLoFXBWKXn9B5gNmJqAaKejJJXVnVi10uIfdSyqm70tFHCSA-mYfPW3a7cr13i5zZnEFwXHIGy9KlMtT6ZFvgjHUyK5EUIrZWwy2VDG1ZDnmJOGgyKMCRsotF-JtZ19_GWN7JNjRuquu9RQjgPD8dLBCuTPd39RYMGAcBoIaSiLTY5w')"
                    }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 size-3.5 bg-status-green border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-black text-base">{opponentName}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                    {opponentStatus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 overflow-y-auto flex flex-col gap-6">
             {messages.map((msg: any) => {
                 const isMe = msg.sender_role === role;
                 return (
                    <div key={msg.id} className={`flex flex-col gap-2 max-w-[85%] ${isMe ? 'self-end' : ''}`}>
                      <div className={`${isMe ? 'bg-black text-white rounded-tr-none shadow-sm' : 'bg-chat-bubble-light dark:text-white rounded-tl-none border border-blue-50 dark:border-slate-700'} p-4 rounded-2xl text-sm font-semibold`}>
                        {msg.content}
                      </div>
                      <span className={`text-[10px] text-slate-400 font-bold uppercase ${isMe ? 'mr-1 self-end' : 'ml-1'}`}>
                        {msg.sender_name.split(' ')[0]} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                 );
             })}
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative">
              <input
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm px-5 py-4 pr-14 focus:ring-2 focus:ring-primary transition-all font-bold placeholder:text-slate-400"
                placeholder="Type your message..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black size-10 rounded-xl flex items-center justify-center shadow-md-card active:translate-y-px">
                <span className="material-symbols-outlined font-black">
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-violet-600 size-16 rounded-full flex items-center justify-center text-white shadow-md-fab hover:scale-110 active:scale-95 transition-all duration-300 group relative ring-4 ring-white dark:ring-slate-900 hover:shadow-lg hover:shadow-blue-500/50"
      >
        <span className="material-symbols-outlined text-4xl font-light">
          chat_bubble
        </span>
        <div className="absolute right-full mr-4 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Chat with Developer
        </div>
      </button>
    </div>
  );
}
