'use client'

import { useEffect, useState } from 'react'

/**
 * True below md (768px). False during SSR and the first client paint, so gate
 * *animations* with it, not layout — the pre-hydration frame must stay correct.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return isMobile
}
