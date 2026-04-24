'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Mounts once in layout. After any client-side navigation that includes a
 * hash (e.g. /blog → /#about), smooth-scrolls to the target element.
 * Works in tandem with RouteScrollTop which now skips scroll-to-top when a
 * hash is present.
 */
export default function AnchorScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    // Wait for DOM to settle after navigation before scrolling
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
