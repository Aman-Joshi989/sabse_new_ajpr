'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { X, ArrowRight, Zap, CheckCircle2, ShieldCheck, Sparkles, Globe, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ExitIntentPopup() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
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

    // 1. Desktop: Mouse leaves top of viewport toward tabs/address bar
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        setIsVisible(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        cleanupListeners()
      }
    }

    // 2. Mobile & Touch: User scrolls down significantly then rapidly scrolls back up (intent to leave/close)
    let maxScrollY = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > maxScrollY) {
        maxScrollY = currentScrollY
      }
      if (maxScrollY > 500 && maxScrollY - currentScrollY > 220) {
        setIsVisible(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        cleanupListeners()
      }
    }

    // 3. Dwell engagement: User spends 45s exploring without converting
    const dwellTimer = setTimeout(() => {
      if (!sessionStorage.getItem('exitIntentShown') && !localStorage.getItem('exitIntentDismissed')) {
        setIsVisible(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        cleanupListeners()
      }
    }, 45000)

    const cleanupListeners = () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(dwellTimer)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      cleanupListeners()
    }
  }, [shouldDisable, user, pathname])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('exitIntentShown', 'true')
    localStorage.setItem('exitIntentDismissed', 'true')
  }

  const handleAuditRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !websiteUrl) return
    setStatus('loading')
    setErrorMessage('')

    try {
      const cleanDomain = websiteUrl.replace(/^https?:\/\//i, '').split('/')[0]
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0],
          email: email.trim(),
          company: cleanDomain,
          budget: 'Free 48h Video Audit',
          projectGoal: `EXIT-INTENT TEARDOWN: ${websiteUrl.trim()}. User requested 48-hour video teardown.`,
          utm_source: 'exit_intent_modal',
          utm_medium: 'modal_lead_capture',
          utm_campaign: 'retention_bounce_reduction'
        })
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setWebsiteUrl('')
        sessionStorage.setItem('exitIntentShown', 'true')
        localStorage.setItem('exitIntentDismissed', 'true')
        setTimeout(() => setIsVisible(false), 4500)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to submit request. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error occurred. Please check connection and try again.')
    }
  }

  if (shouldDisable || !isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-xl rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Subtle ambient gradient */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

        <button 
          type="button"
          onClick={handleClose}
          aria-label="Close Audit Popup"
          title="Close"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full transition-colors z-[60] cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Close Audit Popup</span>
        </button>

        <div className="p-7 sm:p-9 relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free • Custom Video Teardown</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-2">
            Is slow architecture or hidden code debt costing you clients?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
            Get a <strong>custom 3-minute video teardown</strong> of your app's performance, mobile latency, and conversion blockers — delivered to your inbox in <strong>48 hours</strong> by Founder & Lead Architect <strong>Aman Joshi</strong>.
          </p>

          {/* Value points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/60 rounded-lg p-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero sales pitch — just raw engineering fixes</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/60 rounded-lg p-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Lighthouse 100/100 benchmark blueprint</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/60 rounded-lg p-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Strictly confidential (max 5 audits/week)</span>
            </div>
          </div>

          {status === 'success' ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 p-6 rounded-2xl text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">Audit Reserved Successfully!</h3>
              <p className="text-xs sm:text-sm text-emerald-300/90 max-w-sm mx-auto">
                Aman Joshi is queuing your application for inspection. Expect your custom 3-minute video breakdown within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAuditRequest} className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="Your Website or Web App (e.g. acme.com)" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  placeholder="Your Work Email (e.g. founder@acme.com)" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 h-auto rounded-xl text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {status === 'loading' ? (
                  <span>Queuing Audit...</span>
                ) : (
                  <>
                    <span>Send Me The 48-Hour Video Teardown</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {status === 'error' && (
                <p className="text-rose-400 text-xs text-center font-medium">{errorMessage}</p>
              )}
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>🔒 No spam, ever. 100% engineer-to-founder.</span>
            <button 
              type="button"
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-200 transition-colors underline cursor-pointer"
            >
              No thanks, close window
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
