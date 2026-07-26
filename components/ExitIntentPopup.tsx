"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already seen or submitted
    const hasSeen = localStorage.getItem('exit_intent_seen');
    if (hasSeen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves out of the top of the window (towards the back button or URL bar)
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        setIsVisible(true);
        localStorage.setItem('exit_intent_seen', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('exit_intent_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/20 rounded-tr-full -ml-8 -mb-8 pointer-events-none" />
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white/50 dark:bg-slate-800/50 rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 relative z-10">
          {!submitted ? (
            <>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                Wait! Don't leave empty-handed.
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Get a <strong className="text-blue-600 dark:text-blue-400">Free AI SEO Audit</strong> for your startup. Drop your email and we'll scan your site for growth opportunities instantly.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@startup.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 group"
                >
                  Get My Free Audit
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                You're on the list!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Check your inbox shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
