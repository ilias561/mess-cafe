'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'

type PreFooterCtaProps = {
  variant?: 'olive' | 'forest-gold' | 'charcoal'
  eyebrow: string
  heading: string
  body?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

const variantStyles = {
  olive: {
    bg: 'bg-forest',
    text: 'text-charcoal',
    eyebrow: 'text-mustard',
    primary: 'bg-mustard text-ink-dark hover:bg-amber',
    secondary: 'border-charcoal/30 text-charcoal hover:border-charcoal/60',
  },
  'forest-gold': {
    bg: 'bg-forest',
    text: 'text-mustard',
    eyebrow: 'text-mustard/70',
    primary: 'bg-mustard text-ink-dark hover:bg-amber',
    secondary: 'border-mustard/40 text-mustard hover:border-mustard/70',
  },
  charcoal: {
    bg: 'bg-forest',
    text: 'text-charcoal',
    eyebrow: 'text-mustard/80',
    primary: 'bg-mustard text-ink-dark hover:bg-amber',
    secondary: 'border-charcoal/30 text-charcoal hover:border-charcoal/60',
  },
}

export default function PreFooterCta({
  variant = 'olive',
  eyebrow,
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PreFooterCtaProps) {
  const s = variantStyles[variant]
  return (
    <section className={`${s.bg} ${s.text} px-6 py-20 md:px-12 md:py-24`}>
      <div className="mx-auto max-w-[1400px]">
        <m.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`font-sans text-[11px] uppercase tracking-[0.16em] ${s.eyebrow}`}
        >
          {eyebrow}
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="type-display u-balance mt-6 max-w-[18ch] font-serif"
        >
          {heading}
        </m.h2>
        {body && (
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-[60ch] font-sans text-[16px] leading-[1.7] opacity-80 md:text-[17px]"
          >
            {body}
          </m.p>
        )}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href={primaryHref}
            className={`ui-interactive rounded-full px-8 py-3.5 font-sans text-sm font-medium ${s.primary}`}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`ui-interactive rounded-full border px-8 py-3.5 font-sans text-sm font-medium ${s.secondary}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </m.div>
      </div>
    </section>
  )
}
