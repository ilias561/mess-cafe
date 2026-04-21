'use client'

import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'

const PILL_ID = 'menu-nav-pill'

const anchors = [
  { id: 'brunch', label: 'Brunch' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'salads', label: 'Salads' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'treats', label: 'Treats' },
]

export default function MenuAnchorNav() {
  const [active, setActive] = useState('brunch')

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

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 52
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      className="sticky top-0 z-40 border-b border-line/30 bg-bone/95 backdrop-blur-md"
      aria-label="Menu sections"
    >
      <div className="mx-auto flex max-w-[1400px] items-center px-6 md:px-12">
        {/* Back to home */}
        <Link
          href="/"
          className="mr-6 flex shrink-0 items-center gap-1.5 border-r border-line/40 pr-6 font-sans text-[12px] uppercase tracking-[0.14em] text-concrete transition-colors hover:text-charcoal"
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

        {/* Category tabs with pill-shaped active indicator */}
        <LayoutGroup id={PILL_ID}>
          <div className="flex overflow-x-auto">
            {anchors.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative shrink-0 px-2 py-2 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-1 focus-visible:rounded-full"
                style={{
                  color: active === id
                    ? 'var(--color-charcoal)'
                    : 'var(--color-concrete)',
                }}
              >
                {/* Animated pill background */}
                {active === id && (
                  <motion.span
                    layoutId={PILL_ID}
                    className="absolute inset-x-0 inset-y-1 rounded-full"
                    style={{ backgroundColor: 'rgba(232,181,71,0.15)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden
                  />
                )}
                <span className="relative z-10 px-2 py-0.5">{label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </nav>
  )
}
