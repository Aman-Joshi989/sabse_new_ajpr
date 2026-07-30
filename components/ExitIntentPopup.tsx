'use client'

import React, { useEffect, useState } from 'react'
import { X, ArrowRight, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Check if we've already shown it this session
    if (sessionStorage.getItem('exitIntentShown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves up towards the address bar
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        setIsVisible(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setIsVisible(false), 3000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to claim offer')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error occurred')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Background Gradients */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-400/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 rounded-full transition-colors z-[60] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl rotate-3">
            <Zap className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Wait! You're leaving money on the table.</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Claim your <strong className="text-slate-900 dark:text-white">FREE AI Growth Audit</strong> before you leave. We'll hand you the exact blueprint to steal traffic from your competitors and unlock hidden revenue.
          </p>

          {status === 'success' ? (
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 p-6 rounded-2xl">
              <Target className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-1">Audit Requested!</h3>
              <p className="text-sm">We'll be in touch at that email address shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your best email address..." 
                className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={status === 'loading'} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 px-6 py-4 h-auto rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                {status === 'loading' ? 'Claiming...' : 'Yes, Send Me The Free Audit!'} <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-slate-400 font-medium">🔒 100% Free. No credit card required.</p>
              {status === 'error' && (
                <p className="text-rose-500 text-sm font-semibold">{errorMessage}</p>
              )}
            </form>
          )}
          
          <button 
            onClick={() => setIsVisible(false)}
            className="mt-6 text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            No thanks, I prefer letting my competitors win.
          </button>
        </div>
      </div>
    </div>
  )
}
