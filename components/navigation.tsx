'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getOpenStatus } from '@/lib/hours'
import { EASE } from '@/lib/motion'

const MOBILE_MENU_ID = 'mobile-menu-drawer'

const navLinks = [
  { label: 'Αρχική', href: '/', sectionId: null, isCta: false },
  { label: 'Ποιοι είμαστε', href: '/#about-us', sectionId: 'about-us', isCta: false },
  { label: 'Οι στόχοι μας', href: '/#goals', sectionId: 'goals', isCta: false },
  { label: 'Οι δράσεις μας', href: '/actions', sectionId: null, isCta: false },
  { label: 'Μενού', href: '/menu', sectionId: null, isCta: false },
  { label: 'Κράτηση για event', href: '/reservations', sectionId: null, isCta: true },
  { label: 'Blog', href: '/blog', sectionId: null, isCta: false },
  { label: 'Επικοινωνία', href: '/#contact', sectionId: 'contact', isCta: false },
] as const

function OpenBadge({
  light = false,
  showText = true,
  className = '',
}: {
  light?: boolean
  showText?: boolean
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
      {showText && <span className="hidden xl:inline">{status.label}</span>}
    </span>
  )
}

function OliveMark({ light = false }: { light?: boolean }) {
  const colorClass = light ? 'text-bone' : 'text-olive'
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 shrink-0" aria-hidden>
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" className={colorClass} />
      <circle cx="16" cy="14" r="5" fill="currentColor" className={colorClass} />
      <path
        d="M10 24c1.5-3 3.5-5 6-5s4.5 2 6 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className={colorClass}
      />
    </svg>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasPastHero, setHasPastHero] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const sectionLinks = useMemo(
    () => navLinks.filter((l) => l.sectionId).map((l) => l.sectionId as string),
    [],
  )

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

  // Header handoff: transparent over hero -> soft cream after hero
  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(window.innerHeight - 80, 120)
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
      if (currentScrollY < 120) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && pathname === '/') {
        // collapse nav on scroll-down only on the homepage; keep it pinned everywhere else
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

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0] ?? firstFocusableRef.current
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

  const navTextColor = 'text-charcoal'
  const headerClasses = 'bg-[rgba(245,240,230,0.94)] backdrop-blur-[14px] border-b border-black/[0.06]'

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-md bg-mustard px-4 py-2 font-sans text-sm font-medium text-charcoal transition-transform focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2"
      >
        Μετάβαση στο περιεχόμενο
      </a>

      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 h-20 transition-all duration-300 ease-in-out ${headerClasses}`}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-8">
          <Link href="/" className={`flex shrink-0 items-center gap-3 transition-colors ${navTextColor}`}>
            <OliveMark light={false} />
            <span className="font-serif text-[22px] font-medium tracking-tight">M.E.S.S.</span>
          </Link>

          <nav
            className={`hidden items-center lg:flex ${navTextColor}`}
            aria-label="Κύρια πλοήγηση"
          >
              {navLinks.map((link) => {
                const isHomeAnchor = link.href.startsWith('/#')
                const isRouteActive = !isHomeAnchor && (
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)
                )
                const isAnchorActive = isHomeAnchor && pathname === '/' && link.sectionId
                  ? activeSection === link.sectionId
                  : false
                const isActive = isRouteActive || isAnchorActive
                const shiftRightCluster = link.label === 'Το μενού μας'
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
                    className={`group relative py-1.5 font-sans text-[13px] font-medium tracking-[0.04em] text-charcoal transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 xl:mx-[10px] 2xl:mx-[14px] ${
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
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />

                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-px bg-mustard"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
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
              href="tel:+306945777808"
              aria-label="Κάλεσέ μας"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-charcoal transition-colors hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>

            <motion.button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-bone-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
              aria-controls={MOBILE_MENU_ID}
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              type="button"
              aria-label="Κλείσιμο μενού"
              className="absolute inset-0 bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id={MOBILE_MENU_ID}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Κινητό μενού"
              className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-bone px-6 pt-6 pb-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex items-center justify-between">
                <OpenBadge showText className="text-charcoal" />
                <button
                  ref={firstFocusableRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Κλείσιμο μενού"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col gap-5"
                aria-label="Σύνδεσμοι πλοήγησης"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
              >
                {navLinks.map((link) => {
                  const isHomeAnchor = link.href.startsWith('/#')
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
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
                        className={`inline-flex w-fit items-center rounded-full px-2 py-1 font-serif text-[clamp(32px,10vw,40px)] leading-tight tracking-tight text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 ${
                          link.isCta ? 'bg-[rgba(212,165,80,0.2)] px-4 py-2' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              <motion.div
                className="mt-10 border-t border-black/10 pt-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.28, ease: EASE }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+306945777808"
                    className="flex min-h-[44px] items-center justify-center rounded-full border border-charcoal/20 px-5 py-3 font-sans text-sm font-medium text-charcoal"
                  >
                    Κάλεσέ μας
                  </a>
                  <Link
                    href="/reservations"
                    className="flex min-h-[44px] items-center justify-center rounded-full bg-mustard px-5 py-3 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
                    onClick={() => setMenuOpen(false)}
                  >
                    Κράτηση για event
                  </Link>
                </div>
                <a
                  href="https://www.instagram.com/m.e.s.s._ioannina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-sans text-sm text-charcoal/70 underline underline-offset-4"
                >
                  @m.e.s.s._ioannina
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
