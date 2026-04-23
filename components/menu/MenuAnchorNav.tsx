'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
      className="sticky top-20 z-40 border-y border-charcoal/10 bg-bone/80 backdrop-blur-md"
      aria-label="Menu sections"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-3 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Back to home */}
        <Link
          href="/"
          className="flex w-fit shrink-0 items-center gap-1.5 font-sans text-[12px] uppercase tracking-[0.14em] text-concrete transition-colors hover:text-charcoal"
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

        <div className="flex w-full flex-nowrap gap-5 overflow-x-auto lg:flex-wrap lg:justify-end">
          {anchors.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`shrink-0 border-b pb-1 font-sans text-sm transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 ${
                active === id
                  ? 'border-mustard text-charcoal'
                  : 'border-transparent text-concrete hover:text-charcoal'
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
