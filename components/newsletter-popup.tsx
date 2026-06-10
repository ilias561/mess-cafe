'use client'

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { EASE } from '@/lib/motion'
import {
  dispatchNewsletterClose,
  dispatchNewsletterOpen,
} from '@/lib/overlay-events'
import { subscribeToNewsletter } from '@/lib/newsletter/subscribe'

const SESSION_DISMISSED_KEY = 'mess_newsletter_dismissed_session'
const LOCAL_DISMISSED_UNTIL_KEY = 'mess_newsletter_dismissed_until'
const LOCAL_SUBSCRIBED_KEY = 'mess_newsletter_subscribed'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function shouldSkipPath(pathname: string) {
  // /food-for-medicine: don't interrupt menu browsing — the page is very long,
  // so the 60%-scroll trigger fires right in the middle of reading dishes.
  return pathname.startsWith('/reservations')
    || pathname.startsWith('/food-for-medicine')
    || pathname.startsWith('/admin')
    || pathname === '/_not-found'
}

function isPermanentlyDismissed() {
  if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === '1') return true
  if (localStorage.getItem(LOCAL_SUBSCRIBED_KEY) === '1') return true
  const dismissedUntil = Number(localStorage.getItem(LOCAL_DISMISSED_UNTIL_KEY) ?? 0)
  return dismissedUntil > Date.now()
}

export default function NewsletterPopup() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const [email, setEmail] = useState('')
  const [acceptedGdpr, setAcceptedGdpr] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const shouldDisable = useMemo(
    () => status === 'loading' || !acceptedGdpr || email.trim().length === 0,
    [acceptedGdpr, email, status],
  )

  const dismiss = useCallback(() => {
    setOpen(false)
    sessionStorage.setItem(SESSION_DISMISSED_KEY, '1')
    localStorage.setItem(LOCAL_DISMISSED_UNTIL_KEY, `${Date.now() + THIRTY_DAYS_MS}`)
  }, [])

  useEffect(() => {
    if (shouldSkipPath(pathname)) {
      setOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    if (shouldSkipPath(pathname) || isPermanentlyDismissed()) return

    let shown = false
    const showPopup = () => {
      if (shown) return
      shown = true
      setOpen(true)
    }

    const onScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      if (pageHeight <= 0) return
      if ((window.scrollY / pageHeight) >= 0.6) {
        showPopup()
      }
    }

    const timer = window.setTimeout(showPopup, 45000)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
    // Intentionally mount-only: do not re-trigger entrance on client route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Coordinate the WhatsApp float off the popup's actual VISIBILITY, not just
    // `open` — the popup hides itself at the footer (open stays true), and the
    // float should reappear there instead of staying suppressed for the session.
    if (open && !footerInView) {
      dispatchNewsletterOpen()
    } else {
      dispatchNewsletterClose()
    }
  }, [open, footerInView])

  useEffect(() => {
    if (!open) return
    const footer = document.getElementById('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [open])

  useEffect(() => {
    if (!open || !dialogRef.current) return
    const node = dialogRef.current
    const focusables = node.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss()
      }
      if (event.key !== 'Tab' || !first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (shouldDisable) return

    setStatus('loading')
    setError('')
    const result = await subscribeToNewsletter(email.trim())
    if (!result.ok) {
      setStatus('error')
      setError(result.message ?? 'Δεν ήταν δυνατή η εγγραφή.')
      return
    }

    setStatus('success')
    localStorage.setItem(LOCAL_SUBSCRIBED_KEY, '1')
    sessionStorage.setItem(SESSION_DISMISSED_KEY, '1')
  }

  const visible = open && !footerInView

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-[120] w-[calc(100%-48px)] max-w-[380px] md:bottom-6 md:right-6"
          role="dialog"
          aria-labelledby="newsletter-title"
          aria-describedby="newsletter-description"
          ref={dialogRef}
        >
          <div className="rounded-[2px] border border-charcoal/15 border-t-terracotta bg-cream p-4 shadow-[0_16px_38px_rgba(43,43,40,0.16)]">
            <button
              type="button"
              aria-label="Κλείσιμο"
              onClick={dismiss}
              className="ui-interactive absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-charcoal/70 hover:bg-charcoal/8 md:right-3 md:top-3 md:h-9 md:w-9"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-terracotta">NEWSLETTER</p>
            <h3 id="newsletter-title" className="u-balance mt-2 font-serif text-[22px] leading-tight text-charcoal">
              Ιστορίες, menu, events.
            </h3>
            <p id="newsletter-description" className="mt-1 font-sans text-[13px] text-concrete">
              Μία φορά τον μήνα. Χωρίς spam.
            </p>

            {status === 'success' ? (
              <p className="mt-4 rounded-[2px] bg-olive-deep px-3 py-2 font-sans text-[13px] text-charcoal">
                Ευχαριστούμε! Έλεγξε το email σου.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="ui-field w-full rounded-[2px] border border-line/70 bg-charcoal/10 px-3 py-2.5 font-sans text-[14px] text-charcoal placeholder:text-charcoal/55"
                />
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={acceptedGdpr}
                    onChange={(event) => setAcceptedGdpr(event.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-mustard"
                  />
                  <span className="font-sans text-[12px] leading-snug text-concrete">
                    Συμφωνώ με την επικοινωνία μέσω email
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={shouldDisable}
                  className="ui-interactive w-full rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? 'Αποστολή...' : 'Εγγραφή'}
                </button>
                {status === 'error' && (
                  <p className="font-sans text-[12px] text-red-700">{error}</p>
                )}
              </form>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
