'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToId } from '@/lib/lenis'

/**
 * Mounts once in layout. After any client-side navigation that includes a
 * hash (e.g. /food-for-medicine → /#philosophy), smooth-scrolls to the target element.
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
      scrollToId(id)
    }, 150)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
