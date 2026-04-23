'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

type PreFooterCtaProps = {
  variant?: 'olive' | 'mustard' | 'charcoal'
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
    bg: 'bg-olive-deep',
    text: 'text-bone',
    eyebrow: 'text-mustard',
    primary: 'bg-mustard text-charcoal hover:bg-amber',
    secondary: 'border-bone/30 text-bone hover:border-bone/60',
  },
  mustard: {
    bg: 'bg-mustard',
    text: 'text-charcoal',
    eyebrow: 'text-charcoal/70',
    primary: 'bg-charcoal text-bone hover:bg-olive',
    secondary: 'border-charcoal/30 text-charcoal hover:border-charcoal/60',
  },
  charcoal: {
    bg: 'bg-charcoal',
    text: 'text-bone',
    eyebrow: 'text-mustard',
    primary: 'bg-mustard text-charcoal hover:bg-amber',
    secondary: 'border-bone/30 text-bone hover:border-bone/60',
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
    <section className={`${s.bg} ${s.text} px-6 py-24 md:px-12 md:py-32`}>
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`font-sans text-[11px] uppercase tracking-[0.22em] ${s.eyebrow}`}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-6 max-w-[18ch] font-serif text-[clamp(40px,6vw,76px)] leading-[1.02] tracking-[-0.02em]"
        >
          {heading}
        </motion.h2>
        {body && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-[60ch] font-sans text-[16px] leading-[1.7] opacity-80 md:text-[17px]"
          >
            {body}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href={primaryHref}
            className={`rounded-full px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 ${s.primary}`}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`rounded-full border px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 ${s.secondary}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}
