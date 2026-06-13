'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const anchors = [
  { id: 'brunch', label: 'Breakfast' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'salads', label: 'Salads' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'treats', label: 'Treats' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'smoothies', label: 'Smoothies' },
]

// Matches Navigation's `h-16` (64px) on non-hero pages. The anchor nav sits flush
// against the bottom of the main nav.
const NAV_HEIGHT = 64

export default function MenuAnchorNav() {
  const [active, setActive] = useState('brunch')
  const navRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    anchors.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Keep the active chip in view as the page scrolls past sections — on phones
  // the strip overflows, so without this the highlight walks off-screen.
  // Scrolled manually on the strip (not scrollIntoView) so the page never moves.
  useEffect(() => {
    const strip = stripRef.current
    const chip = strip?.querySelector<HTMLButtonElement>(`[data-anchor="${active}"]`)
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return
    const target = chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [active])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    // Measure the actual anchor-nav height so the section heading clears the
    // sticky stack on every viewport (mobile is 2 rows tall, desktop is 1).
    const anchorH = navRef.current?.offsetHeight ?? 112
    const top = el.getBoundingClientRect().top + window.scrollY - (NAV_HEIGHT + anchorH)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-16 z-40 border-b border-line bg-bone/95 backdrop-blur-[10px]"
      aria-label="Menu sections"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-2 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex min-h-11 w-fit shrink-0 items-center gap-1.5 py-1 font-sans text-[12px] uppercase tracking-[0.14em] text-concrete transition-colors hover:text-charcoal lg:min-h-0 lg:py-0"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 fill-none stroke-current"
            strokeWidth="1.5"
          >
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Αρχική
        </Link>

        <div
          ref={stripRef}
          className="no-scrollbar -mx-1 flex w-full flex-nowrap gap-2.5 overflow-x-auto scroll-pl-1 scroll-pr-6 lg:mx-0 lg:flex-wrap lg:justify-end lg:gap-5 lg:scroll-pl-0 lg:scroll-pr-0"
        >
          {anchors.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              data-anchor={id}
              onClick={() => scrollTo(id)}
              aria-label={`Μετάβαση στην ενότητα ${label}`}
              className={`ui-link inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 lg:min-h-0 lg:rounded-none lg:border-b lg:px-0 lg:py-1 lg:pb-1 ${
                active === id
                  ? 'bg-mustard text-ink-dark lg:bg-transparent lg:border-mustard lg:text-charcoal'
                  : 'bg-bone-warm/60 text-concrete hover:text-charcoal lg:bg-transparent lg:border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
