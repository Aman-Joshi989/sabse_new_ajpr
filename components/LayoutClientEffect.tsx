'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function LayoutClientEffect() {
  const pathname = usePathname()
  
  useEffect(() => {
    const isFullScreen = pathname === '/chat-agents' || pathname === '/demo-ruflo'
    
    const htmlEl = document.documentElement
    const bodyEl = document.body
    const mainEl = document.querySelector('main')

    if (isFullScreen) {
      htmlEl.classList.add('overflow-hidden', 'h-screen')
      bodyEl.classList.add('overflow-hidden', 'h-screen')
      mainEl?.classList.remove('min-h-screen')
    } else {
      htmlEl.classList.remove('overflow-hidden', 'h-screen')
      bodyEl.classList.remove('overflow-hidden', 'h-screen')
      mainEl?.classList.add('min-h-screen')
    }

    // Cleanup on unmount or route change
    return () => {
      htmlEl.classList.remove('overflow-hidden', 'h-screen')
      bodyEl.classList.remove('overflow-hidden', 'h-screen')
    }
  }, [pathname])

  return null
}
