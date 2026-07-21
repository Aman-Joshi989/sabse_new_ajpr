'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `LaunchPad Pro: All-In-One Startup Growth Kit | AJPR World`,
  description: `Accelerate your launch with the LaunchPad Pro Startup Growth Kit. Get the essential digital infrastructure, software, and tools to scale your business instantly.`,
  alternates: {
    canonical: 'https://ajprworld.com/startup-growth-kit',
  },
  openGraph: {
    title: `LaunchPad Pro: All-In-One Startup Growth Kit | AJPR World`,
    description: `Accelerate your launch with the LaunchPad Pro Startup Growth Kit. Get the essential digital infrastructure, software, and tools to scale your business instantly.`,
    url: 'https://ajprworld.com/startup-growth-kit',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};

  Globe, Shield, Smartphone, Palette, Briefcase, Calculator,
  Zap, Code2, Users, CheckCircle, ArrowRight, Video, UserCog, Laptop
} from 'lucide-react'

export default function StartupGrowthKitPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
      <div className="w-[80%] mx-auto min-h-screen py-16 md:py-24">

        {/* HERO SECTION */}
        <div className={`relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-8 md:p-16 mb-16 shadow-2xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-slate-900 to-slate-900 dark:from-indigo-500/20 dark:via-slate-950 dark:to-slate-950 -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 z-10 relative">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-6 bg-teal-500/10 text-teal-400 border-teal-500/30 font-bold tracking-widest px-4 py-1.5 uppercase text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                2026 Edition — AI-First Approach
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                LaunchPad <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-400">Pro</em><br />
                Startup Growth Kit
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                Everything a new-age startup needs — from digital identity to AI-powered growth, managed by real humans who care about your success.
              </p>
            </div>
            <div className="text-left md:text-right bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shrink-0">
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-2">All-in-One Package</div>
              <div className="text-slate-900 bg-amber-400 px-6 py-3 rounded-xl font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                🚀 Budget-Friendly for New Startups
              </div>
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className={`w-full overflow-hidden bg-amber-400 py-4 mb-16 rounded-xl flex items-center shadow-lg transition-transform duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex space-x-8 whitespace-nowrap animate-[marquee_20s_linear_infinite] px-4 font-bold text-slate-900 uppercase tracking-widest text-sm">
            <span>✦ AI-Driven Strategies</span>
            <span>✦ Personal Brand Manager</span>
            <span>✦ On-Site Video Production</span>
            <span>✦ Social-First Design</span>
            <span>✦ Mutual Growth Model</span>
            <span>✦ Custom Software Solutions</span>
            <span>✦ AI-Driven Strategies</span>
            <span>✦ Personal Brand Manager</span>
          </div>
        </div>

        {/* 4 PILLARS GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <Card className={`group overflow-hidden border-t-4 border-t-indigo-500 border-x-slate-200 border-b-slate-200 dark:border-x-white/5 dark:border-b-white/5 bg-white dark:bg-white/[0.02] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-8 h-8 text-indigo-500" />
                <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Digital Presence</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Ultra-Dynamic Website', desc: 'SEO-ready, mobile-first, fast-loading.' },
                { name: 'VPS Cloud Hosting', desc: 'Lightning-fast server. 99.9% uptime.' },
                { name: 'SEO — #1 Google', desc: 'On-page SEO, keyword mapping.' },
                { name: 'Policy & Legal Pages', desc: 'Professionally drafted for compliance.' },
                { name: 'Five-Layer Security', desc: 'SSL, JWT, DDoS shield, MD5 encryption.' }
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-default">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pillar 2 */}
          <Card className={`group overflow-hidden border-t-4 border-t-teal-500 border-x-slate-200 border-b-slate-200 dark:border-x-white/5 dark:border-b-white/5 bg-white dark:bg-white/[0.02] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="w-8 h-8 text-teal-500" />
                <span className="text-xs font-black uppercase tracking-widest text-teal-500">Social & Brand</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Social Setup & Management', desc: 'Instagram, LinkedIn, YouTube Shorts.' },
                { name: '60 Trend-Led Posts / Year', desc: 'Reels, carousels aligned to viral trends.' },
                { name: 'Google Profile + PR', desc: 'GMB setup & PR articles published.' },
                { name: 'Brand Trademark', desc: 'Trademark your name & logo.' },
                { name: 'Follower Growth: 2k–10k', desc: 'Organic growth campaigns.' }
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-default">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pillar 3 */}
          <Card className={`group overflow-hidden border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200 dark:border-x-white/5 dark:border-b-white/5 bg-white dark:bg-white/[0.02] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-8 h-8 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-500">Brand Identity</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Logo & Business Card', desc: 'Crafted professionally in all formats.' },
                { name: 'Full Brand Kit', desc: 'Guidelines, palette, 3D mockups.' },
                { name: 'Company Profile (8-Page)', desc: 'Premium brochure to impress investors.' },
                { name: 'Business Email Suite', desc: '5 professional emails with spam filter.' },
                { name: 'Annual Maintenance', desc: '1-year AMC — bugs fixed, zero downtime.' }
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-default">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pillar 4 */}
          <Card className={`group overflow-hidden border-t-4 border-t-rose-500 border-x-slate-200 border-b-slate-200 dark:border-x-white/5 dark:border-b-white/5 bg-white dark:bg-white/[0.02] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="w-8 h-8 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-widest text-rose-500">AI & Automation</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'AI Business Strategy', desc: 'Monthly data-driven market analysis.' },
                { name: 'Custom AI Chatbot', desc: 'WhatsApp & website bot for 24/7 lead gen.' },
                { name: 'Personalised ERP / CRM', desc: 'Software tailored completely to you.' },
                { name: 'GST & Invoicing Suite', desc: 'Cloud billing and client portal.' },
                { name: 'WhatsApp API Automation', desc: 'Automate journeys & follow-ups via API.' }
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-default">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* UPSELL ROW */}
        <div className={`grid lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl shrink-0 h-fit">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex flex-wrap items-center gap-2">
                  On-Site Video Production
                  <Badge className="bg-rose-500 hover:bg-rose-600 border-none text-[9px] uppercase tracking-widest px-2 py-0 h-5">New</Badge>
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Our team visits your location to shoot founder stories, product demos, office tours & Reels — studio quality without studio cost.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 flex gap-4">
              <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 p-3 rounded-xl shrink-0 h-fit">
                <UserCog className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex flex-wrap items-center gap-2">
                  Dedicated Growth Mentor
                  <Badge className="bg-rose-500 hover:bg-rose-600 border-none text-[9px] uppercase tracking-widest px-2 py-0 h-5">New</Badge>
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">A real human assigned to your startup — weekly check-ins, personalised guidance, and accountability for your milestones.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 flex gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 p-3 rounded-xl shrink-0 h-fit">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex flex-wrap items-center gap-2">
                  Mobile App (WebApp + APK)
                  <Badge className="bg-rose-500 hover:bg-rose-600 border-none text-[9px] uppercase tracking-widest px-2 py-0 h-5">New</Badge>
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">A branded mobile app to showcase your startup, take orders, and engage customers — built as a webapp with APK for Android.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HIGHLIGHTS */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-slate-900 dark:bg-slate-950 p-8 md:p-10 rounded-3xl border border-slate-800 relative overflow-hidden">
            <Badge variant="outline" className="mb-6 bg-teal-500/10 text-teal-400 border-teal-500/30 font-bold tracking-widest px-4 py-1.5 uppercase text-[10px]">
              🤝 Mutual Growth Promise
            </Badge>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">We grow only when<br />you grow.</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">Unlike agencies that take upfront fees and vanish — our model is built on trust, results, and long-term partnership. Your success is our portfolio.</p>
            <Shield className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 rotate-12" />
          </div>

          <div className="bg-amber-400 p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <Badge variant="outline" className="mb-6 bg-slate-900/10 text-slate-900 border-slate-900/20 font-bold tracking-widest px-4 py-1.5 uppercase text-[10px]">
              ⚡ What Others Don't Give
            </Badge>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-snug">AI strategy + human touch + video — all in one kit.</h3>
            <p className="text-slate-900/80 font-semibold leading-relaxed max-w-sm">Most agencies offer templates. We offer tailored AI strategy sessions, on-site content shoots, a personal mentor, AND custom-built software for your specific business model.</p>
            <Zap className="absolute -bottom-8 -right-8 w-48 h-48 text-slate-900/10 rotate-12" />
          </div>
        </div>

        {/* MEGA BOTTOM CTA */}
        <div className={`bg-gradient-to-br from-indigo-900 to-slate-900 dark:from-indigo-950 dark:to-slate-950 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="z-10 flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">LaunchPad Pro — All-In-One Startup Kit</h2>
            <p className="text-indigo-200 font-medium text-lg leading-relaxed mb-8 max-w-2xl">
              One partner. One solution. Every tool, strategy, and human support your startup needs from Day 1 to Scale.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Website + App', 'Full Branding', 'Social Media', 'AI Strategy', 'Video Shoot', 'Custom Software', 'Personal Mentor', '1 Year AMC'].map((pill, i) => (
                <span key={i} className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md">
                  ✦ {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="z-10 shrink-0 text-center lg:text-right">
            <Button size="lg" className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-900 font-black text-base px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all hover:-translate-y-1" asChild>
              <Link href="/contact">
                Book Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="text-indigo-300/60 font-medium text-xs mt-4 uppercase tracking-widest">
              No commitment · 30-min strategy call
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
