import type { Variants, Transition } from 'framer-motion'

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  outStrong: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const

export const duration = {
  micro: 0.15,
  fast: 0.3,
  base: 0.55,
  slow: 0.8,
} as const

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
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
