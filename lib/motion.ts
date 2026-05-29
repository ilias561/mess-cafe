import type { Variants, Transition } from 'framer-motion'

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  outStrong: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const

/** CSS transition scale: 150ms / 250ms / 500ms — aligned with Tailwind duration-150/250/500 */
export const duration = {
  micro: 0.15,
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
} as const

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export type RevealDirection = 'up' | 'left' | 'right'

/** Refined directional reveals — short travel + opacity fade. Reduced-motion handled by callers. */
export const directionalReveal: Record<RevealDirection, Variants> = {
  up: reveal,
  left: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
}

export const revealTransition: Transition = {
  duration: duration.base,
  ease: ease.out,
}

export const stagger = (gap = 0.08, delay = 0): Transition => ({
  staggerChildren: gap,
  delayChildren: delay,
})

export const VIEWPORT_ONCE = { once: true, margin: '-15% 0px' as const }

export function revealGroupVariants(gap = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: stagger(gap, delay),
    },
  }
}

/** @deprecated Prefer `ease.out` — kept for imports across the codebase */
export const EASE = ease.out

export const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: duration.slow, ease: ease.out },
}

export const fadeUpSoft = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: duration.base, ease: ease.out },
}

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: duration.base, ease: ease.out },
}

export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: VIEWPORT_ONCE,
  transition: stagger(0.08, 0),
}

export function fadeUpDelayed(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: duration.base, ease: ease.out, delay },
  }
}

// Slow, deep upward drift — for hero-adjacent sections
export const driftUp: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0 },
}

// Mask wipe from bottom — for image/video panels
export const maskWipe: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)' },
}

// Mask wipe from left — for editorial blocks
export const maskWipeLeft: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)' },
}

// Blur-in — for headings
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
}

export const slowReveal: Transition = { duration: duration.slow, ease: ease.outStrong }
