'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useChat, UIMessage } from '@ai-sdk/react';
import { Bot, X, Send, Loader2, Network, UserCheck, MessageCircle, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { useRegion } from '@/components/providers/RegionProvider';

function RealAgentCard({ leadName, leadEmail, isIndia }: { leadName?: string; leadEmail?: string; isIndia?: boolean }) {
  const whatsappUrl = `https://wa.me/919997205257?text=${encodeURIComponent(
    `Hi Aman! I was chatting with Agent Hermes on AJPR World and want to connect directly about our project. (Name: ${leadName || 'Visitor'}, Email: ${leadEmail || 'N/A'})`
  )}`;

  return (
    <div className="my-2 p-3.5 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-indigo-200/80 dark:border-indigo-800/80 rounded-2xl space-y-2.5 shadow-sm text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            Connect with Real Agent (Aman Joshi)
          </p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          Architect Online
        </span>
      </div>
      <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
        Prefer speaking to our Lead Systems Architect directly? Connect right now:
      </p>
      <div className="space-y-1.5 pt-0.5">
        {isIndia ? (
          <>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5" />
                Chat Instantly on WhatsApp
              </span>
              <span className="text-[10px] bg-emerald-700/60 px-1.5 py-0.5 rounded font-normal">Direct</span>
            </a>

            <a
              href="/book-call"
              className="flex items-center justify-between w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Schedule 15-Min Architecture Call (IST)
              </span>
              <span className="text-[10px] bg-indigo-700/60 px-1.5 py-0.5 rounded font-normal">Calendar</span>
            </a>

            <div className="grid grid-cols-2 gap-1.5">
              <a
                href="tel:+919997205257"
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#202124] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium transition-colors"
              >
                <Phone className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>Call Direct</span>
              </a>
              <a
                href="mailto:hello@ajprworld.com?subject=Direct%20Inquiry%20via%20Website%20Chat"
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#202124] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium transition-colors"
              >
                <Mail className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>Email Architect</span>
              </a>
            </div>
          </>
        ) : (
          <>
            <a
              href="/book-call"
              className="flex items-center justify-between w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Schedule 15-Min Scoping Call (US Hours)
              </span>
              <span className="text-[10px] bg-indigo-700/60 px-1.5 py-0.5 rounded font-normal">Calendar</span>
            </a>

            <a
              href="mailto:hello@ajprworld.com?subject=US%20Inquiry%20via%20Website%20Chat"
              className="flex items-center justify-between w-full px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
                Email Lead Architect Directly
              </span>
              <span className="text-[10px] bg-slate-800 dark:bg-slate-200 px-1.5 py-0.5 rounded font-mono">hello@ajprworld.com</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function HermesChatWidget() {
  const pathname = usePathname();
  const { isCartOpen } = useCart();
  const { isIndia } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [forceShowHandoff, setForceShowHandoff] = useState(false);
  
  // Pre-chat form states
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  
  const { messages, sendMessage, status, setMessages, error } = useChat();
  
  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, hasSubmittedDetails, forceShowHandoff]);

  const handlePreChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadMessage) return;

    setHasSubmittedDetails(true);

    const systemInitMessage = `[SYSTEM: LEAD ACQUIRED]\nName: ${leadName}\nEmail: ${leadEmail}\nPhone: ${leadPhone}\nMessage: ${leadMessage}`;
    
    sendMessage({ 
      role: 'user', 
      parts: [{ type: 'text', text: systemInitMessage }]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(input.trim()) {
      const userText = input.trim();
      setInput('');

      if (/\b(human|real person|real agent|speak to someone|call me|whatsapp|representative)\b/i.test(userText)) {
        setForceShowHandoff(true);
      }

      sendMessage({ role: 'user', parts: [{ type: 'text', text: userText }] });
    }
  };

  const handleRequestHumanHandoff = () => {
    setForceShowHandoff(true);
    if (!hasSubmittedDetails) {
      setHasSubmittedDetails(true);
    }
    try {
      sendMessage({
        role: 'user',
        parts: [{ type: 'text', text: 'Please connect me with a real person / human agent.' }]
      });
    } catch {
      // ignore
    }
  };

  if (isCartOpen || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        aria-label="Open Agent Hermes AI Chat"
        title="Open Agent Hermes AI Chat"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[60] p-3.5 md:p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-[60] w-full max-w-sm sm:w-[410px] h-[580px] max-h-[85vh] flex flex-col bg-white dark:bg-[#202124] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-up"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 bg-indigo-600 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">Agent Hermes</h3>
                  <p className="text-[11px] text-indigo-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRequestHumanHandoff}
                  className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-full text-[11px] font-semibold text-white flex items-center gap-1 transition-colors shadow-sm"
                  title="Connect with a real person"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Talk to Human</span>
                </button>
                <button
                  type="button"
                  aria-label="Close Agent Hermes AI Chat"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!hasSubmittedDetails ? (
              /* Pre-chat Form */
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#1a1b1e]">
                <div className="mb-5 text-center">
                  <Bot className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Start Conversation</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Provide quick details so we can assist or connect you with our team.</p>
                </div>
                <form onSubmit={handlePreChatSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input
                      required
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                      placeholder="Alex Morgan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                      placeholder="alex@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">How can we help? *</label>
                    <textarea
                      required
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white resize-none"
                      placeholder="I'm looking to build..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Start Chat
                  </button>
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleRequestHumanHandoff}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Skip AI, connect with real agent directly
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Active Chat Area */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-[#1a1b1e]">
                  {messages.map((m: UIMessage) => {
                    // Check if this is the hidden system lead message
                    const isSystemLead = m.role === 'user' && m.parts?.some((p: any) => p.type === 'text' && p.text.includes('[SYSTEM: LEAD ACQUIRED]'));
                    
                    if (isSystemLead) {
                      return null; // Completely hide the form submission from the chat UI
                    }

                    const hasHandoffAction = m.role === 'assistant' && m.parts?.some((p: any) => p.type === 'text' && p.text.includes('[ACTION: HUMAN_HANDOFF]'));

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[88%] p-3 rounded-2xl text-sm leading-relaxed ${
                            m.role === 'user'
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-white dark:bg-[#292A2D] border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {m.parts?.map((part: any, index: number) => {
                            if (part.type === 'text') {
                              const cleanText = part.text.replace(/\[ACTION:\s*HUMAN_HANDOFF\]/gi, '').trim();
                              return cleanText ? <span key={index}>{cleanText}</span> : null;
                            }
                            return null;
                          })}
                        </div>
                        {hasHandoffAction && (
                          <div className="w-full max-w-[95%]">
                            <RealAgentCard leadName={leadName} leadEmail={leadEmail} isIndia={isIndia} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {forceShowHandoff && (
                    <div className="w-full max-w-[95%]">
                      <RealAgentCard leadName={leadName} leadEmail={leadEmail} isIndia={isIndia} />
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-[#292A2D] border border-gray-100 dark:border-gray-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="space-y-2 pt-1">
                      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-200 text-center">
                        Agent Hermes is momentarily unavailable. You can connect with our team directly below:
                      </div>
                      <div className="w-full max-w-[95%]">
                        <RealAgentCard leadName={leadName} leadEmail={leadEmail} isIndia={isIndia} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-[#202124] border-t border-gray-100 dark:border-gray-800">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question or type 'Talk to a human'..."
                      className="w-full pl-3.5 pr-11 py-2.5 bg-gray-50 dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-700 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                    />
                    <button
                      type="submit"
                      aria-label="Send message"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-1.5 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 px-1">
                    <span>Powered by AJPR AI Engine</span>
                    <button
                      type="button"
                      onClick={handleRequestHumanHandoff}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <UserCheck className="w-3 h-3" /> Talk to human
                    </button>
                  </div>
                </form>
              </>
            )}
        </div>
      )}
    </>
  );
}

