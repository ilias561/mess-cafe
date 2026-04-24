'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteScrollTop() {
  const pathname = usePathname()

  useEffect(() => {
    // If navigating to an anchor (hash present), let AnchorScroll handle it
    if (window.location.hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
