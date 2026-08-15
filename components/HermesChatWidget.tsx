'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat, UIMessage } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, Network } from 'lucide-react';

export default function HermesChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // Pre-chat form states
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  
  const { messages, sendMessage, status, setMessages } = useChat();
  
  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, hasSubmittedDetails]);

  const handlePreChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadMessage) return;

    setHasSubmittedDetails(true);

    const systemInitMessage = `[SYSTEM: LEAD ACQUIRED]\nName: ${leadName}\nEmail: ${leadEmail}\nPhone: ${leadPhone}\nMessage: ${leadMessage}`;
    
    // We no longer manually setMessages because sendMessage already appends to the UI.
    // Instead, we will filter out the system metadata in the render function.

    // We send the hidden metadata to the AI to trigger the lead extraction & initial response
    sendMessage({ 
      role: 'user', 
      parts: [{ type: 'text', text: systemInitMessage }]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(input.trim()) {
      sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[60] p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-colors ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[60] w-full max-w-sm sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col bg-white dark:bg-[#202124] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Agent Hermes</h3>
                  <p className="text-xs text-indigo-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!hasSubmittedDetails ? (
              /* Pre-chat Form */
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#1a1b1e]">
                <div className="mb-6 text-center">
                  <Bot className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Let's get started!</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Please provide a few details so we can assist you better.</p>
                </div>
                <form onSubmit={handlePreChatSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input
                      required
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                      placeholder="John Doe"
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
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
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
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-[#292A2D] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white resize-none"
                      placeholder="I'm looking to build..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Start Chat
                  </button>
                </form>
              </div>
            ) : (
              /* Active Chat Area */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#1a1b1e]">
                  {messages.map((m: UIMessage) => {
                    // Check if this is the hidden system lead message
                    const isSystemLead = m.role === 'user' && m.parts?.some((p: any) => p.type === 'text' && p.text.includes('[SYSTEM: LEAD ACQUIRED]'));
                    
                    if (isSystemLead) {
                      return null; // Completely hide the form submission from the chat UI
                    }

                    return (
                      <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                            m.role === 'user'
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-white dark:bg-[#292A2D] border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {m.parts?.map((part: any, index: number) => {
                            if (part.type === 'text') {
                              return <span key={index}>{part.text}</span>;
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-[#292A2D] border border-gray-100 dark:border-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-[#202124] border-t border-gray-100 dark:border-gray-800">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Reply..."
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    Powered by AJPR AI Engine
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

