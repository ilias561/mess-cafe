'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  NEWSLETTER_CLOSE_EVENT,
  NEWSLETTER_OPEN_EVENT,
} from '@/lib/overlay-events'

type Props = { whatsappNumber: string }

export default function WhatsAppFloatClient({ whatsappNumber }: Props) {
  const pathname = usePathname()
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [newsletterOpen, setNewsletterOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setNewsletterOpen(true)
    const onClose = () => setNewsletterOpen(false)
    window.addEventListener(NEWSLETTER_OPEN_EVENT, onOpen)
    window.addEventListener(NEWSLETTER_CLOSE_EVENT, onClose)
    return () => {
      window.removeEventListener(NEWSLETTER_OPEN_EVENT, onOpen)
      window.removeEventListener(NEWSLETTER_CLOSE_EVENT, onClose)
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/') return
    const btn = btnRef.current
    if (!btn) return

    const update = () => {
      // Hero is min-h-screen (~one viewport); fade in over ~80% of that scroll distance
      const heroScrollEnd = window.innerHeight * 0.8
      const p = Math.min(1, window.scrollY / heroScrollEnd)
      // opacity: 0.12 at top → 1 after hero; scale: 0.5 → 1
      const opacity = 0.12 + p * 0.88
      const scale   = 0.5  + p * 0.5
      btn.style.opacity   = String(opacity.toFixed(3))
      btn.style.transform = `scale(${scale.toFixed(3)})`
    }

    // RAF-gate the scroll write: Lenis fires many scroll events per frame, and a
    // synchronous style mutation on each one forces repeated style/layout work on
    // the main thread during the exact gesture the user feels. Coalesce to ≤1/frame.
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        update()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [pathname])

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null
  if (newsletterOpen) return null

  return (
    <a
      ref={btnRef}
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Επικοινωνία στο WhatsApp"
      className="ui-interactive fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(14,34,8,0.28)] md:bottom-6 md:right-6 md:h-14 md:w-14"
      style={{ transformOrigin: 'bottom right' }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white md:h-7 md:w-7" aria-hidden>
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .17 5.3.17 11.84c0 2.09.55 4.14 1.58 5.95L0 24l6.38-1.67a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.89-5.31 11.9-11.85a11.8 11.8 0 0 0-3.45-8.45Zm-8.46 18.3h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.79.99 1.01-3.69-.24-.38a9.84 9.84 0 0 1-1.52-5.26c0-5.44 4.45-9.87 9.93-9.87 2.65 0 5.13 1.03 7 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.46 9.87-9.9 9.88Zm5.42-7.42c-.3-.15-1.79-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.25-.6-.5-.52-.68-.53l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.79-.73 2.04-1.44.25-.71.25-1.31.17-1.44-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  )
}
