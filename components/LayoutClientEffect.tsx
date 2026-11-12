'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Applies full-viewport overflow rules strictly for /chat-agents and avoids
 * DOM mutations/reflows on initial mount across public pages.
 */
export default function LayoutClientEffect() {
  const pathname = usePathname()
  const wasFullScreen = useRef(false)

  useEffect(() => {
    const isFullScreen = pathname === '/chat-agents'
    if (!isFullScreen && !wasFullScreen.current) {
      return
    }

    const htmlEl = document.documentElement
    const bodyEl = document.body
    const mainEl = document.querySelector('main')

    if (isFullScreen) {
      htmlEl.classList.add('overflow-hidden', 'h-screen')
      bodyEl.classList.add('overflow-hidden', 'h-screen')
      mainEl?.classList.remove('min-h-screen')
      wasFullScreen.current = true
    } else {
      htmlEl.classList.remove('overflow-hidden', 'h-screen')
      bodyEl.classList.remove('overflow-hidden', 'h-screen')
      mainEl?.classList.add('min-h-screen')
      wasFullScreen.current = false
    }

    return () => {
      if (wasFullScreen.current) {
        htmlEl.classList.remove('overflow-hidden', 'h-screen')
        bodyEl.classList.remove('overflow-hidden', 'h-screen')
      }
    }
  }, [pathname])

  return null
}
