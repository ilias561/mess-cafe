'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Instagram, Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getOpenStatus } from '@/lib/hours'
import { EASE, ease } from '@/lib/motion'

const MOBILE_MENU_ID = 'mobile-menu-drawer'

/** Single source for grep / copy consistency (desktop nav + mobile drawer CTA). */
const RESERVATIONS_LABEL = 'Κράτηση για event' as const
const SITE_PHONE_E164 = '+306945777808' as const

const navLinks = [
  { label: 'Αρχική', href: '/', sectionId: null, isCta: false },
  { label: 'Ποιοι είμαστε', href: '/#about-us', sectionId: 'about-us', isCta: false },
  { label: 'Οι στόχοι μας', href: '/#goals', sectionId: 'goals', isCta: false },
  { label: 'Οι δράσεις μας', href: '/actions', sectionId: null, isCta: false },
  { label: 'Μενού', href: '/menu', sectionId: null, isCta: false },
  { label: RESERVATIONS_LABEL, href: '/reservations', sectionId: null, isCta: true },
  { label: 'Blog', href: '/blog', sectionId: null, isCta: false },
  { label: 'Επικοινωνία', href: '/#contact', sectionId: 'contact', isCta: false },
] as const

type NavLink = (typeof navLinks)[number]

function isNavLinkActive(link: NavLink, pathname: string, activeSection: string | null) {
  // Hash anchors on home (e.g. /#about-us): only that section, when in view
  if (link.href.startsWith('/#') && link.sectionId) {
    return pathname === '/' && activeSection === link.sectionId
  }

  // "Αρχική" — active on home only while no section link is highlighted
  if (link.href === '/') {
    if (pathname !== '/') return false
    const anySectionHighlighted = navLinks.some((l) => Boolean(l.sectionId) && activeSection === l.sectionId)
    return !anySectionHighlighted
  }

  // Other routes: exact match or nested path (never treat `/` as prefix of other routes)
  return pathname === link.href || pathname.startsWith(`${link.href}/`)
}

function MobileDrawerHoursChip({ className = '' }: { className?: string }) {
  const status = getOpenStatus()
  return (
    <span
      className={`inline-flex max-w-[min(100%,200px)] items-center gap-1.5 ${className}`}
      title={status.label}
      aria-live="polite"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-mustard'}`}
        />
      </span>
      <span className="font-sans text-[11px] font-medium tracking-wide text-espresso">
        {status.open ? 'Ανοιχτά τώρα' : status.label}
      </span>
    </span>
  )
}

function OpenBadge({
  light = false,
  showText = true,
  showLabelAlways = false,
  className = '',
}: {
  light?: boolean
  showText?: boolean
  /** When true, status label is visible at all breakpoints (e.g. mobile menu drawer). */
  showLabelAlways?: boolean
  className?: string
}) {
  const status = getOpenStatus()
  const dotColor = status.open
    ? 'bg-green-600'
    : 'bg-mustard'
  const textColor = light
    ? 'text-bone/90'
    : 'text-charcoal/80'
  const pulseColor = status.open ? 'bg-green-400' : 'bg-mustard'
  const titleText = status.label

  return (
    <span
      className={`flex items-center gap-2 font-sans text-[12px] font-medium ${textColor} ${className}`}
      title={titleText}
      aria-label={titleText}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {status.open && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${pulseColor}`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
      </span>
      {showText && (
        <span className={showLabelAlways ? 'max-w-[min(100%,220px)] leading-snug' : 'hidden xl:inline'}>
          {status.label}
        </span>
      )}
    </span>
  )
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  const [failed, setFailed] = useState(false)
  const px = compact ? 24 : 32
  const cls = compact ? 'h-6 w-6 shrink-0' : 'h-8 w-8 shrink-0'
  if (failed) {
    return (
      <svg viewBox="0 0 32 32" fill="none" className={`${cls} rounded-full`} aria-hidden>
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="5" fill="currentColor" />
        <path d="M10 24c1.5-3 3.5-5 6-5s4.5 2 6 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <Image
      src="/images/logo-mess.svg"
      alt="M.E.S.S. logo"
      width={px}
      height={px}
      className={`${cls} rounded-full object-cover`}
      priority
      onError={() => setFailed(true)}
    />
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasPastHero, setHasPastHero] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const prevMenuOpenRef = useRef(false)
  const sectionLinks = useMemo(
    () => navLinks.filter((l) => l.sectionId).map((l) => l.sectionId as string),
    [],
  )
  const mobileDrawerNavLinks = useMemo(() => navLinks.filter((l) => !l.isCta), [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionLinks.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sectionLinks])

  // Track desktop vs mobile (affects hero height and nav style)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Header handoff: transparent over dark mobile hero → cream after
  // Desktop hero is bone-colored (min-h-screen), mobile hero is 600vh sticky scroll
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerWidth >= 768
        ? window.innerHeight - 60          // desktop: just past the viewport
        : window.innerHeight * 5 - 60      // mobile: past the 600vh sticky scroll
      setHasPastHero(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerWidth >= 768 ? window.innerHeight : window.innerHeight * 5
      const inHero = pathname === '/' && currentScrollY < heroHeight
      if (currentScrollY < 120 || inHero) {
        // Always show nav at top and during hero scroll-scrub
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && pathname === '/') {
        // Collapse nav on scroll-down only after hero on homepage
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, pathname])

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    // Ensure nav is visible when landing on any non-homepage route
    if (pathname !== '/') setIsVisible(true)
  }, [pathname])

  // ESC closes mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Restore focus to menu trigger when drawer closes
  useEffect(() => {
    if (prevMenuOpenRef.current && !menuOpen) {
      menuButtonRef.current?.focus()
    }
    prevMenuOpenRef.current = menuOpen
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

  const handleAnchorNavigation = (sectionId: string) => {
    if (pathname !== '/') return false
    const id = sectionId
    const target = document.getElementById(id)
    if (!target) return false
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
    return true
  }

  // Desktop hero is bone/light — never go transparent with white text there.
  // Only mobile hero is dark (canvas video), so the transparent white-text mode is mobile-only.
  const isInHero = !isDesktop && pathname === '/' && !hasPastHero
  const navTextColor = isInHero ? 'text-white' : 'text-charcoal'
  const headerClasses = isInHero
    ? 'bg-transparent'
    : 'bg-[rgba(245,240,230,0.94)] backdrop-blur-[14px] border-b border-black/[0.06]'
  const navHeight = isInHero ? 'h-12' : 'h-16'

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-md bg-mustard px-4 py-2 font-sans text-sm font-medium text-charcoal transition-transform duration-200 ease-out focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2"
      >
        Μετάβαση στο περιεχόμενο
      </a>

      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-[height,background-color,border-color] duration-300 ease-in-out ${navHeight} ${headerClasses}`}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 px-5 lg:gap-4 lg:px-8">
          <Link
            href="/"
            className={`flex min-w-0 max-w-[min(100%,52vw)] shrink items-center gap-2 transition-colors sm:max-w-none sm:gap-3 ${navTextColor}`}
          >
            <BrandLogo />
            <span className="truncate font-serif text-[22px] font-medium tracking-tight">M.E.S.S.</span>
          </Link>

          <nav
            className={`hidden items-center lg:flex ${navTextColor}`}
            aria-label="Κύρια πλοήγηση"
          >
              {navLinks.map((link) => {
                const isHomeAnchor = link.href.startsWith('/#')
                const isActive = isNavLinkActive(link, pathname, activeSection)
                const shiftRightCluster = link.isCta
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      if (isHomeAnchor && link.sectionId) {
                        const didNavigate = handleAnchorNavigation(link.sectionId)
                        if (didNavigate) {
                          e.preventDefault()
                        }
                      }
                      if (!isHomeAnchor) {
                        setMenuOpen(false)
                      }
                    }}
                    className={`group relative py-1.5 font-sans text-[13px] font-medium tracking-[0.04em] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 xl:mx-[10px] 2xl:mx-[14px] ${link.isCta ? 'ui-interactive' : 'ui-link'} ${isInHero ? 'text-white/90 hover:text-white' : 'text-charcoal'} ${
                      shiftRightCluster ? 'ml-5 xl:ml-7 2xl:ml-9' : ''
                    } ${
                      link.isCta
                        ? 'rounded-full bg-[rgba(212,165,80,0.12)] px-[14px] py-[6px] hover:bg-mustard hover:text-charcoal'
                        : 'px-0'
                    }`}
                  >
                    {link.label}

                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-px origin-left bg-mustard"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2, ease: ease.out }}
                    />

                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-px bg-mustard"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: ease.out }}
                      />
                    )}
                  </Link>
                )
              })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <OpenBadge light={false} showText className="hidden min-[1200px]:flex" />
            <OpenBadge light={false} showText={false} className="flex min-[1200px]:hidden" />
            <a
              href={`tel:${SITE_PHONE_E164}`}
              aria-label="Κάλεσέ μας"
              className={`ui-interactive flex h-11 w-11 items-center justify-center rounded-full border hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 ${isInHero ? 'border-white/30 text-white' : 'border-black/20 text-charcoal'}`}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>

            <motion.button
              ref={menuButtonRef}
              type="button"
              className={`ui-interactive flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 lg:hidden ${
                isInHero ? 'text-white hover:bg-white/10' : 'text-charcoal hover:bg-bone-warm'
              }`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
              aria-controls={MOBILE_MENU_ID}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen
                ? <X className="h-5 w-5" strokeWidth={1.5} />
                : <Menu className="h-5 w-5" strokeWidth={1.5} />
              }
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Κλείσιμο μενού"
              className="absolute inset-0 bg-black/45 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id={MOBILE_MENU_ID}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Κύριο μενού"
              className="absolute top-0 right-0 flex h-full w-[88vw] max-w-[360px] flex-col overflow-y-auto bg-bone-warm shadow-[-16px_0_48px_rgba(42,29,20,0.14)]"
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 260 }}
              dragElastic={reduceMotion ? undefined : { left: 0, right: 0.35 }}
              dragDirectionLock
              onDragEnd={(_, info) => {
                if (reduceMotion) return
                if (info.offset.x > 72 || info.velocity.x > 420) {
                  setMenuOpen(false)
                }
              }}
              initial={reduceMotion ? { opacity: 1, x: 0 } : { x: '100%', opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0.15, ease: EASE } } : { x: '100%', opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: EASE }
              }
            >
              <div className="flex shrink-0 items-start justify-between gap-3 px-6 pt-6 pb-4">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-fit max-w-full items-center gap-2.5 text-espresso transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
                  >
                    <BrandLogo compact />
                    <span className="font-serif text-[20px] font-medium leading-none tracking-tight">M.E.S.S.</span>
                  </Link>
                  <MobileDrawerHoursChip />
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Κλείσιμο μενού"
                  className="ui-interactive flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso text-bone hover:bg-espresso/90 active:bg-espresso/80"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
                </button>
              </div>

              <div className="mx-6 h-px shrink-0 bg-olive/25" aria-hidden />

              <nav className="min-h-0 flex-1 px-6 pt-5 pb-8" aria-label="Σύνδεσμοι πλοήγησης">
                <ul className="flex flex-col">
                  {mobileDrawerNavLinks.map((link) => {
                    const isHomeAnchor = link.href.startsWith('/#')
                    const isActive = isNavLinkActive(link, pathname, activeSection)
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={(e) => {
                            if (isHomeAnchor && link.sectionId) {
                              const didNavigate = handleAnchorNavigation(link.sectionId)
                              if (didNavigate) {
                                e.preventDefault()
                                return
                              }
                            }
                            setMenuOpen(false)
                          }}
                          aria-current={isActive ? 'page' : undefined}
                          className={`ui-link relative -mx-6 block py-3.5 pr-6 font-sans text-[22px] font-medium leading-[1.4] tracking-normal text-espresso [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif] active:text-mustard ${isActive ? 'pl-[42px]' : 'pl-6'}`}
                        >
                          {isActive && (
                            <span
                              className="pointer-events-none absolute top-1/2 left-6 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-mustard"
                              aria-hidden
                            />
                          )}
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mx-6 mt-1 h-px shrink-0 bg-olive/25" aria-hidden />

              <div className="shrink-0 px-6 pt-5 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${SITE_PHONE_E164}`}
                    className="ui-interactive flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-full border border-espresso px-3 font-sans text-[15px] font-medium text-espresso hover:border-espresso/80 active:border-mustard active:text-mustard"
                  >
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    Κάλεσέ μας
                  </a>
                  <Link
                    href="/reservations"
                    className="ui-interactive flex h-12 min-h-[48px] items-center justify-center rounded-full bg-mustard px-3 text-center font-sans text-[15px] font-medium text-espresso hover:bg-amber"
                    onClick={() => setMenuOpen(false)}
                  >
                    {RESERVATIONS_LABEL}
                  </Link>
                </div>
              </div>

              <div className="mt-auto flex shrink-0 flex-col gap-3 px-6 pb-8">
                <a
                  href="https://www.instagram.com/m.e.s.s._ioannina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-link inline-flex w-fit items-center gap-2 font-sans text-[13px] text-espresso/70 hover:text-espresso"
                >
                  <Instagram className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  @m.e.s.s._ioannina
                </a>
                <p className="font-sans text-[11px] tracking-wider text-espresso/50 uppercase">
                  M.E.S.S. CAFÉ · IOANNINA · #KEEPRISING
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
