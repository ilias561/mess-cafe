'use client'

import type { ElementType, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { VIEWPORT_ONCE, ease } from '@/lib/motion'

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function Eyebrow({
  tone = 'dark',
  children,
  className,
}: {
  tone?: 'dark' | 'light'
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span aria-hidden className="block h-px w-10 bg-mustard" />
      <span
        className={cn(
          'font-sans text-[11px] uppercase tracking-[0.26em]',
          tone === 'dark' ? 'text-olive' : 'text-mustard/80',
        )}
      >
        {children}
      </span>
    </div>
  )
}

export function MicroEyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-sans text-[10px] uppercase tracking-[0.32em] text-charcoal/55',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function NumberedCaption({
  index,
  label,
  className,
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <figcaption className={cn('mt-3 flex items-baseline gap-3', className)}>
      <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">
        {index}
      </span>
      <span aria-hidden className="block h-px w-6 bg-mustard/50" />
      <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-olive/80">
        {label}
      </span>
    </figcaption>
  )
}

export function HairlineRule({
  origin = 'left',
  delay = 0,
  className,
}: {
  origin?: 'left' | 'right' | 'center'
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const originClass =
    origin === 'right'
      ? 'origin-right'
      : origin === 'center'
        ? 'origin-center'
        : 'origin-left'

  return (
    <motion.span
      aria-hidden
      className={cn('block h-px bg-mustard/70', originClass, className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={
        reduce ? undefined : { duration: 1.2, delay, ease: ease.outStrong }
      }
    />
  )
}

export function CornerTicks({
  color = 'mustard',
  className,
}: {
  color?: 'mustard'
  className?: string
}) {
  const border = color === 'mustard' ? 'border-mustard' : 'border-mustard'
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-2 -top-2 block h-4 w-4 border-l-2 border-t-2',
          border,
          className,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-2 -top-2 block h-4 w-4 border-r-2 border-t-2',
          border,
          className,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-2 -bottom-2 block h-4 w-4 border-l-2 border-b-2',
          border,
          className,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-2 -bottom-2 block h-4 w-4 border-r-2 border-b-2',
          border,
          className,
        )}
      />
    </>
  )
}

export function ReleaseDivider({ label }: { label: string }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative mt-20 mb-10 md:mt-28 md:mb-14" aria-hidden>
      <div className="flex items-center gap-6">
        <motion.span
          className="block h-px origin-left bg-mustard/70"
          style={{ flex: 1 }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={reduce ? undefined : { duration: 1.2, ease: ease.outStrong }}
        />
        <motion.span
          className="font-sans text-[10px] uppercase tracking-[0.32em] text-charcoal/55"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={
            reduce ? undefined : { duration: 0.7, delay: 0.6, ease: ease.outStrong }
          }
        >
          {label}
        </motion.span>
        <motion.span
          className="block h-px origin-right bg-mustard/70"
          style={{ flex: 1 }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={reduce ? undefined : { duration: 1.2, ease: ease.outStrong }}
        />
      </div>
    </div>
  )
}

const ANAGLYPH_LIGHT =
  'motion-safe:md:[text-shadow:1.5px_0_0_rgba(232,181,71,0.35),-1.5px_0_0_rgba(180,210,255,0.30)]'
const ANAGLYPH_DARK =
  'motion-safe:md:[text-shadow:1.5px_0_0_rgba(232,181,71,0.45),-1.5px_0_0_rgba(255,255,255,0.20)]'

export function AnaglyphHeading({
  as: Tag = 'h2',
  tone = 'light',
  className,
  children,
}: {
  as?: 'h2' | 'h3'
  tone?: 'dark' | 'light'
  className?: string
  children: ReactNode
}) {
  const Component = Tag as ElementType
  const sizeClass =
    Tag === 'h2'
      ? 'text-[clamp(34px,4.6vw,52px)]'
      : 'text-[clamp(32px,3.4vw,46px)]'

  return (
    <Component
      className={cn(
        'font-serif leading-[1.02] tracking-[-0.012em] text-charcoal',
        sizeClass,
        tone === 'dark' ? ANAGLYPH_DARK : ANAGLYPH_LIGHT,
        className,
      )}
    >
      {children}
    </Component>
  )
}
