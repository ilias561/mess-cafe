'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { EASE } from '@/lib/motion'

const UNDERLINE_ID = 'nav-active-line'

const navLinks = [
  { label: 'Menu', href: '/menu', sectionId: null },
  { label: 'Ιστορία', href: '#storia', sectionId: 'storia' },
  { label: 'Χώρος', href: '#about', sectionId: 'about' },
  { label: 'Κριτικές', href: '#reviews', sectionId: 'reviews' },
  { label: 'Επικοινωνία', href: '#footer', sectionId: 'footer' },
]

function isOpenNow() {
  const d = new Date()
  const mins = d.getHours() * 60 + d.getMinutes()
  return mins >= 480 && mins < 1320 // 08:00–22:00
}

function OpenBadge({ onDark = false }: { onDark?: boolean }) {
  const open = isOpenNow()
  const dotColor = open
    ? onDark ? 'bg-[#6fcf6f]' : 'bg-[#4a9e4a]'
    : 'bg-mustard'
  const textColor = open
    ? onDark ? 'text-[#6fcf6f]' : 'text-[#3d8a3d]'
    : onDark ? 'text-mustard' : 'text-[#8a6500]'

  return (
    <span className={`flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.16em] ${textColor}`}>
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {open && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${dotColor}`} />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotColor}`} />
      </span>
      {open ? 'Ανοιχτά τώρα' : 'Κλειστά'}
    </span>
  )
}

function OliveMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 shrink-0" aria-hidden>
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" className="text-olive" />
      <circle cx="16" cy="14" r="5" fill="currentColor" className="text-olive" />
      <path
        d="M10 24c1.5-3 3.5-5 6-5s4.5 2 6 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className="text-olive"
      />
    </svg>
  )
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const headerH = useTransform(scrollY, [0, 80], [80, 64])
  const bgAlpha = useTransform(scrollY, [0, 80], [0, 0.85])
  const blurOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const bg = useMotionTemplate`rgba(245,240,230,${bgAlpha})`

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.sectionId).filter(Boolean) as string[]
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // ESC closes mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [menuOpen])

  return (
    <>
      <motion.header
        style={{ height: headerH, backgroundColor: bg }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Blur layer — fades in as user scrolls */}
        <motion.div
          style={{ opacity: blurOpacity }}
          className="pointer-events-none absolute inset-0 backdrop-blur-[12px]"
          aria-hidden
        />
        {/* 1px bottom border */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]"
          aria-hidden
        />

        <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6 md:px-10">

          {/* ── Left: Logo ── */}
          <Link href="/" className="flex shrink-0 items-center gap-3 text-charcoal">
            <OliveMark />
            <span className="font-serif text-[22px] font-medium tracking-tight">M.E.S.S.</span>
          </Link>

          {/* ── Center: Open indicator + nav links ── */}
          <LayoutGroup id="desktop-nav">
            <nav
              className="hidden items-center gap-0.5 md:flex"
              aria-label="Κύρια πλοήγηση"
            >
              <span className="mr-4 border-r border-line/40 pr-4">
                <OpenBadge />
              </span>

              {navLinks.map((link) => {
                const isActive = link.sectionId ? activeSection === link.sectionId : false
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative px-3 py-1.5 font-sans text-sm font-medium text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  >
                    {link.label}

                    {/* Hover underline: draws from left */}
                    <motion.span
                      className="absolute bottom-0 left-3 right-3 h-px origin-left bg-mustard"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />

                    {/* Active section underline with shared layoutId */}
                    {isActive && (
                      <motion.span
                        layoutId={UNDERLINE_ID}
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-mustard"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </LayoutGroup>

          {/* ── Right: Phone icon + CTA + Hamburger ── */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="tel:+306945777808"
              aria-label="Κάλεσέ μας"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line/50 text-charcoal transition-colors hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>

            <Link
              href="#footer"
              className="hidden rounded-full bg-mustard px-6 py-2.5 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 md:inline-block"
            >
              Κράτηση
            </Link>

            {/* Hamburger — mobile only */}
            <motion.button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-bone-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.94 }}
            >
              {menuOpen
                ? <X className="h-5 w-5" strokeWidth={1.5} />
                : <Menu className="h-5 w-5" strokeWidth={1.5} />
              }
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer (slides from right) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Κινητό μενού"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-charcoal px-8 pt-8 pb-10 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            {/* Top: indicator + close */}
            <div className="mb-12 flex items-center justify-between">
              <OpenBadge onDark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Κλείσιμο μενού"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Large serif nav links */}
            <nav className="flex flex-1 flex-col gap-1" aria-label="Κινητό μενού">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.06, duration: 0.38, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    className="block py-2 font-serif text-[clamp(36px,8vw,52px)] font-medium leading-tight tracking-tight text-bone transition-colors hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:rounded-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Pinned CTAs */}
            <motion.div
              className="mt-auto flex flex-col gap-3 border-t border-bone/10 pt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.38, ease: EASE }}
            >
              <Link
                href="#footer"
                className="flex justify-center rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
                onClick={() => setMenuOpen(false)}
              >
                Κράτηση
              </Link>
              <a
                href="tel:+306945777808"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-bone/20 px-8 py-3.5 font-sans text-sm font-medium text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                694 577 7808
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
