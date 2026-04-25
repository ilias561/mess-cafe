'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteScrollTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Let AnchorScroll handle hash navigations
    if (window.location.hash) return
    // Do not override scroll restoration on browser back/forward
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (nav?.type === 'back_forward') return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
