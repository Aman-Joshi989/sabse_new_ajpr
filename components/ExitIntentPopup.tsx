'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { X, ArrowRight, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ExitIntentPopup() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Suppress exit-intent popup on dashboard, admin, auth, or checkout routes, or for logged-in users
  const isExcludedRoute = 
    !pathname ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/checkout')

  const shouldDisable = isExcludedRoute || !!user

  useEffect(() => {
    // Defense-in-depth: check both pathname and window.location
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
    const isExcluded = 
      !currentPath ||
      currentPath.startsWith('/dashboard') ||
      currentPath.startsWith('/admin') ||
      currentPath === '/login' ||
      currentPath === '/register' ||
      currentPath.startsWith('/checkout')

    if (isExcluded || !!user || shouldDisable) return

    // Check if we've already shown or dismissed it this session
    if (sessionStorage.getItem('exitIntentShown') || localStorage.getItem('exitIntentDismissed')) return

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves up towards the address bar or outside viewport
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
  }, [shouldDisable])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('exitIntentShown', 'true')
    localStorage.setItem('exitIntentDismissed', 'true')
  }

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
        sessionStorage.setItem('exitIntentShown', 'true')
        localStorage.setItem('exitIntentDismissed', 'true')
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

  if (shouldDisable || !isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Background Gradients */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-400/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <button 
          type="button"
          onClick={handleClose}
          aria-label="Close Growth Checklist Popup"
          title="Close"
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-900 rounded-full transition-colors z-[60] cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Close Growth Checklist Popup</span>
        </button>

        <div className="p-8 md:p-10 relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl rotate-3">
            <Zap className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Wait! You're leaving money on the table.</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Claim your <strong className="text-slate-900 dark:text-white">FREE Ultimate 2026 Growth Checklist</strong> before you leave. Get our internal 50-point checklist we use to scale startups from $0 to $1M.
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
                {status === 'loading' ? 'Sending...' : 'Yes, Send Me The Checklist!'} <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-slate-400 font-medium">🔒 100% Free. No credit card required.</p>
              {status === 'error' && (
                <p className="text-rose-500 text-sm font-semibold">{errorMessage}</p>
              )}
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a 
              href="/tools" 
              onClick={handleClose}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>⚡ Or calculate your lost admin payroll instantly with our Free Tools</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          <button 
            onClick={handleClose}
            className="mt-4 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            No thanks, I prefer letting my competitors win.
          </button>
        </div>
      </div>
    </div>
  )
}
