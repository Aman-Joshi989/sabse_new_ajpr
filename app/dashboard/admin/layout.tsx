'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  FileText, Users, UserCog, Database, LayoutTemplate, 
  Inbox, Search, Bell, Settings, Globe, Activity, Menu, X, ArrowLeft, CreditCard
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutTemplate },
    { name: 'Users', href: '/dashboard/admin/users', icon: UserCog },
    { name: 'Projects', href: '/dashboard/admin/projects', icon: Database },
    { name: 'Services', href: '/dashboard/admin/services', icon: Database },
    { name: 'Blog', href: '/dashboard/admin/blog', icon: FileText },
    { name: 'Portfolio', href: '/dashboard/admin/portfolio', icon: LayoutTemplate },
    { name: 'Bookings', href: '/dashboard/admin/bookings', icon: Users },
    { name: 'Inbox', href: '/dashboard/admin/contact-submissions', icon: Inbox },
    { name: 'Payments', href: '/dashboard/admin/payments', icon: CreditCard },
    { name: 'SEO & Geo', href: '/dashboard/admin/seo', icon: Globe },
    { name: 'SEO Tracker', href: '/dashboard/admin/seo-tracker', icon: Activity },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard/admin') {
      return pathname === '/dashboard/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#202124] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#292A2D] border-r border-[#DADCE0] dark:border-[#3C4043] shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#DADCE0] dark:border-[#3C4043]">
          <Link href="/dashboard/admin" className="text-lg font-medium tracking-tight text-[#5F6368] dark:text-[#E8EAED]">
            Admin <span className="text-[#202124] dark:text-white font-normal">Console</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#E8F0FE] text-[#1A73E8] dark:bg-[#1A73E8]/20 dark:text-[#8AB4F8]'
                    : 'text-[#3C4043] hover:bg-[#F1F3F4] dark:text-[#E8EAED] dark:hover:bg-[#3C4043]/50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-[#DADCE0] dark:border-[#3C4043] space-y-1">
          <Link
            href="/"
            className="flex items-center px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-3" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#292A2D] border-r border-[#DADCE0] dark:border-[#3C4043] z-50 p-4 flex flex-col gap-4 lg:hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#DADCE0] dark:border-[#3C4043]">
                <span className="text-lg font-medium text-[#202124] dark:text-white">Admin Console</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#E8F0FE] text-[#1A73E8] dark:bg-[#1A73E8]/20 dark:text-[#8AB4F8]'
                          : 'text-[#3C4043] hover:bg-[#F1F3F4] dark:text-[#E8EAED] dark:hover:bg-[#3C4043]/50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="border-t border-[#DADCE0] dark:border-[#3C4043] pt-4">
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-3" />
                  Back to Website
                </Link>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header App Bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043]">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-[#5F6368] dark:text-[#9AA0A6] hover:text-black dark:hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-xl font-medium tracking-tight text-[#5F6368] dark:text-[#E8EAED] lg:hidden">
              Admin Console
            </div>
          </div>
          
          {/* Fake Search Bar to mimic Google Cloud Console */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 bg-[#F1F3F4] dark:bg-[#303134] rounded-md px-4 py-2 border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white dark:focus-within:bg-[#202124] transition-all">
            <Search className="w-5 h-5 text-[#5F6368] dark:text-[#9AA0A6] mr-3" />
            <input 
              type="text" 
              placeholder="Search resources, services, and docs" 
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-[#5F6368] dark:placeholder:text-[#9AA0A6] text-[#202124] dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4 text-[#5F6368] dark:text-[#9AA0A6]">
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#202124] dark:hover:text-white" />
            <Link href="/dashboard/admin/seo">
              <Settings className="w-5 h-5 cursor-pointer hover:text-[#202124] dark:hover:text-white" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center font-medium text-sm ml-2">
              A
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] dark:bg-[#202124] p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
