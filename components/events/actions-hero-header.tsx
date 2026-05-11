'use client'

import { Fragment, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

import { fadeUp, fadeUpDelayed, ease, VIEWPORT_ONCE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'
import { formatGreekDate } from '@/lib/format-date'

type Props = {
  nextEvent: Event | null
}

const heroWords = 'Περισσότερο από έναν καφέ.'.split(' ')

const KEEP_RISING_STRIP =
  'ΚΑΘΑΡΟ ΦΑΓΗΤΟ ΓΙΑ ΟΣΟΥΣ ΤΟ ΧΡΕΙΑΖΟΝΤΑΙ · ΜΠΑΖΑΡ ΑΛΛΗΛΕΓΓΥΗΣ · ΑΝΟΙΧΤΕΣ ΠΟΡΤΕΣ ΓΙΑ ΚΑΘΕ ΗΛΙΚΙΑ · WORKSHOPS & ΠΟΛΙΤΙΣΜΟΣ · #KEEPRISING'

const COUNTER_STRIP_PARTS = ['Φαγητό', 'Αλληλεγγύη', 'Κοινότητα'] as const

const SCRIBBLE_PATH =
  'M 2 12 C 12 8, 28 14, 52 10 S 92 16, 108 9 C 118 6, 124 14, 130 12'

function CounterStripSegment() {
  return (
    <>
      {COUNTER_STRIP_PARTS.map((part, idx) => (
        <Fragment key={`${part}-${idx}`}>
          {idx > 0 ? (
            <span className="text-mustard" aria-hidden>
              {' '}
              ·{' '}
            </span>
          ) : null}
          <span>{part}</span>
        </Fragment>
      ))}
    </>
  )
}

export default function ActionsHeroHeader({ nextEvent }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const grainFilterId = useId().replace(/:/g, '')
  const sectionRef = useRef<HTMLElement>(null)
  const [pointerLeanEnabled, setPointerLeanEnabled] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 1 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 1 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2])
  const rotateX = useTransform(springY, [-0.5, 0.5], [1, -1])

  useEffect(() => {
    if (prefersReducedMotion) {
      setPointerLeanEnabled(false)
      return
    }
    const mq = window.matchMedia('(hover: hover) and (min-width: 768px)')
    const sync = () => setPointerLeanEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [prefersReducedMotion])

  const scribbleDelay = heroWords.length * 0.05 + 0.25

  const onSectionPointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!pointerLeanEnabled) return
    const el = sectionRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - (r.left + r.width / 2)) / r.width
    const ny = (e.clientY - (r.top + r.height / 2)) / r.height
    mouseX.set(nx)
    mouseY.set(ny)
  }

  const onSectionPointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onSectionPointerMove}
      onMouseLeave={onSectionPointerLeave}
      className="relative overflow-hidden bg-bone px-6 pt-24 pb-6 md:px-12 md:pt-40 md:pb-10"
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.06]"
        aria-hidden
      >
        <svg className="h-full w-full">
          <defs>
            <filter id={grainFilterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"
              />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${grainFilterId})`} />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute top-0 right-0 h-[360px] w-[360px] translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--color-forest) 7%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.span
          className="pointer-events-none absolute top-1 right-4 z-10 hidden origin-top-right select-none md:inline-flex"
          aria-hidden
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -2, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: ease.inOut }
          }
        >
          <span className="inline-flex -rotate-[8deg] items-center rounded-full bg-mustard px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wider text-charcoal">
            ΑΠΟ 2024
          </span>
        </motion.span>

        <div className="max-w-[40rem] text-center md:text-left">
          <motion.p
            {...fadeUp}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/60"
          >
            <span className="inline-block -rotate-[1.5deg] rounded-[2px] border border-dashed border-concrete/40 px-2.5 py-1">
              SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
            </span>
          </motion.p>

          <motion.div {...fadeUpDelayed(0.04)} className="mt-4">
            <motion.div
              className="will-change-transform"
              style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
            >
              <motion.div
                style={
                  pointerLeanEnabled
                    ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
                    : undefined
                }
              >
                <h1 className="font-serif text-[clamp(32px,4.8vw,64px)] leading-[0.98] tracking-[-0.02em] text-charcoal">
                  {heroWords.map((word, i) => {
                    const isLast = i === heroWords.length - 1
                    if (isLast) {
                      const body = word.replace(/\.$/, '')
                      return (
                        <Fragment key={`${word}-${i}`}>
                          <span className="inline-block overflow-hidden align-baseline">
                            <span className="relative inline-block">
                              <motion.span
                                className="inline-block"
                                initial={
                                  prefersReducedMotion
                                    ? { y: 0, opacity: 1 }
                                    : { y: '100%', opacity: 0 }
                                }
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={fadeUp.viewport}
                                transition={{
                                  ...(fadeUp.transition ?? {}),
                                  delay: i * 0.05,
                                }}
                              >
                                {body}
                              </motion.span>
                              <svg
                                className="pointer-events-none absolute -bottom-1.5 left-0 h-[18px] w-full overflow-visible"
                                viewBox="0 0 130 18"
                                preserveAspectRatio="none"
                                aria-hidden
                              >
                                <motion.path
                                  d={SCRIBBLE_PATH}
                                  fill="none"
                                  stroke="var(--color-forest)"
                                  strokeWidth={3}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={
                                    prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                                  }
                                  whileInView={{ pathLength: 1 }}
                                  viewport={VIEWPORT_ONCE}
                                  transition={
                                    prefersReducedMotion
                                      ? { duration: 0 }
                                      : {
                                          duration: 1.2,
                                          ease: ease.outStrong,
                                          delay: scribbleDelay,
                                        }
                                  }
                                />
                              </svg>
                            </span>
                          </span>
                          <span className="inline-block overflow-hidden align-baseline">
                            <motion.span
                              className="inline-block"
                              initial={
                                prefersReducedMotion
                                  ? { y: 0, opacity: 1 }
                                  : { y: '100%', opacity: 0 }
                              }
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={fadeUp.viewport}
                              transition={{
                                ...(fadeUp.transition ?? {}),
                                delay: i * 0.05 + 0.06,
                              }}
                            >
                              .
                            </motion.span>
                          </span>
                        </Fragment>
                      )
                    }

                    return (
                      <Fragment key={`${word}-${i}`}>
                        <span className="inline-block overflow-hidden align-baseline">
                          <motion.span
                            className="inline-block"
                            initial={
                              prefersReducedMotion
                                ? { y: 0, opacity: 1 }
                                : { y: '100%', opacity: 0 }
                            }
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={fadeUp.viewport}
                            transition={{
                              ...(fadeUp.transition ?? {}),
                              delay: i * 0.05,
                            }}
                          >
                            {word}
                          </motion.span>
                        </span>
                        {i < heroWords.length - 1 ? ' ' : ''}
                      </Fragment>
                    )
                  })}
                </h1>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUpDelayed(0.08)} className="mt-5">
            {prefersReducedMotion ? (
              <div className="space-y-2 text-center md:text-left">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-olive/70">
                  {KEEP_RISING_STRIP}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/55">
                  <CounterStripSegment />
                </p>
              </div>
            ) : (
              <div className="actions-hero-marquee-group -mx-6 md:-mx-12">
                <div className="overflow-hidden">
                  <div className="marquee-track flex w-max font-sans text-[11px] uppercase tracking-[0.18em] text-olive/70">
                    <span className="inline-flex shrink-0 items-center px-8">{KEEP_RISING_STRIP}</span>
                    <span className="inline-flex shrink-0 items-center px-8">{KEEP_RISING_STRIP}</span>
                  </div>
                </div>
                <div className="mt-1.5 overflow-hidden">
                  <div className="marquee-track-reverse flex w-max font-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/55">
                    <span className="inline-flex shrink-0 items-center px-8">
                      <CounterStripSegment />
                    </span>
                    <span className="inline-flex shrink-0 items-center px-8">
                      <CounterStripSegment />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {nextEvent && (
            <motion.div {...fadeUpDelayed(0.11)} className="mt-5">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -1.5, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 5, repeat: Infinity, ease: ease.inOut }
                }
              >
                <Link
                  href={`/actions/${nextEvent.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bone-warm px-3 py-[7px] font-sans text-[11px] tracking-[0.02em] text-charcoal transition-colors hover:border-charcoal/40"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-terracotta" />
                  <span className="text-concrete">
                    Επόμενη: <span className="font-medium text-charcoal">{nextEvent.title}</span>
                  </span>
                  <span className="text-concrete">·</span>
                  <span className="text-charcoal">{formatGreekDate(nextEvent.date)}</span>
                  <span className="text-terracotta">→</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
