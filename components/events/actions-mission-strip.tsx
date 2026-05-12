'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type UseInViewOptions,
} from 'framer-motion'

import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

import foodPhoto from '../../public/images/hero-bowl.jpg'
import solidarityPhoto from '../../public/images/keep-rising.jpg'
import communityPhoto from '../../public/images/keep-rising-team.jpg'

/* ─────────────────────────── data ─────────────────────────── */

type Accent = 'mustard' | 'terracotta' | 'olive'
type PillarId = 'food' | 'solidarity' | 'community'

type Pillar = {
  id: PillarId
  title: string
  body: string
  accent: Accent
}

const pillars: readonly Pillar[] = [
  {
    id: 'food',
    title: 'Φαγητό',
    body: 'Καθαρό φαγητό και ζεστά ροφήματα για παιδιά και οικογένειες που το χρειάζονται. Φρέσκες ύλες, χωρίς συμβιβασμούς.',
    accent: 'mustard',
  },
  {
    id: 'solidarity',
    title: 'Αλληλεγγύη',
    body: 'Μπαζάρ και συλλογές για μονές, ορφανοτροφεία και δομές της πόλης. Όταν έχουμε, μοιραζόμαστε.',
    accent: 'terracotta',
  },
  {
    id: 'community',
    title: 'Κοινότητα',
    body: 'Workshops, ανοιχτές βραδιές και συναντήσεις που φέρνουν κόσμο σε επαφή. Ο χώρος αλλάζει σχήμα ανάλογα με τη στιγμή.',
    accent: 'olive',
  },
] as const

// Tailwind class maps — never interpolate colour names into classNames.
const cardBg: Record<Accent, string> = {
  mustard: 'bg-mustard/[0.12]',
  terracotta: 'bg-terracotta/[0.12]',
  olive: 'bg-olive/[0.12]',
}
const accentBar: Record<Accent, string> = {
  mustard: 'bg-mustard',
  terracotta: 'bg-terracotta',
  olive: 'bg-olive',
}
const iconRing: Record<Accent, string> = {
  mustard: 'bg-mustard/15 text-mustard',
  terracotta: 'bg-terracotta/15 text-terracotta',
  olive: 'bg-olive/15 text-olive-deep',
}
const accentText: Record<Accent, string> = {
  mustard: 'text-mustard',
  terracotta: 'text-terracotta',
  olive: 'text-olive',
}
const cardBottomBorder: Record<Accent, string> = {
  mustard: 'border-b-2 border-b-mustard/20',
  terracotta: 'border-b-2 border-b-terracotta/20',
  olive: 'border-b-2 border-b-olive/20',
}

const pillarPhoto: Record<PillarId, StaticImageData> = {
  food: foodPhoto,
  solidarity: solidarityPhoto,
  community: communityPhoto,
}

const pillarPhotoAlt: Record<PillarId, string> = {
  food: 'Φρέσκο bowl από το M.E.S.S.',
  solidarity: 'Φορτηγό γεμάτο τρόφιμα για δωρεά — #KeepRising',
  community: 'Η ομάδα του M.E.S.S. μαζί στον χώρο',
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/* ────────────────── botanical corner (decorative) ────────────────── */

function BotanicalCorner({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 162 C32 138 52 112 72 90 C92 68 118 46 158 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M28 142 C40 126 54 116 66 102"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
      <path
        d="M66 102 C48 84 22 76 6 58 C20 65 42 72 62 90 Z"
        fill="currentColor"
        opacity="0.52"
      />
      <path
        d="M66 102 C48 86 30 78 12 66"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.26"
      />
      <path
        d="M118 46 C124 24 146 10 168 6 C154 20 136 30 120 48 Z"
        fill="currentColor"
        opacity="0.56"
      />
      <path
        d="M118 46 C132 28 148 16 165 8"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.26"
      />
      <path
        d="M86 70 C72 52 54 42 36 40 C50 46 68 56 84 72 Z"
        fill="currentColor"
        opacity="0.44"
      />
      <path
        d="M140 32 C148 16 162 8 174 4 C164 16 152 22 138 34 Z"
        fill="currentColor"
        opacity="0.44"
      />
      <path
        d="M46 120 C30 112 14 96 10 78 C22 88 34 102 48 116 Z"
        fill="currentColor"
        opacity="0.36"
      />
      <path
        d="M150 26 C156 14 166 6 176 2 C168 12 158 18 148 28 Z"
        fill="currentColor"
        opacity="0.40"
      />
      <circle cx="158" cy="20" r="2.5" fill="currentColor" opacity="0.45" />
      <circle cx="150" cy="14" r="1.8" fill="currentColor" opacity="0.38" />
      <circle cx="164" cy="14" r="1.5" fill="currentColor" opacity="0.32" />
      <circle cx="168" cy="22" r="1.2" fill="currentColor" opacity="0.28" />
      <circle cx="90" cy="68" r="1.5" fill="currentColor" opacity="0.28" />
      <circle cx="68" cy="100" r="1.2" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

/* ───────────────────────── icons (alive) ───────────────────────── */

type IconProps = { animateIcon: boolean; svgClassName?: string }

function FoodIcon({ animateIcon, svgClassName = 'h-7 w-7' }: IconProps) {
  // 3 curved steam wisps that draw + fade out in sequence; bowl is static.
  const steamPaths = [
    'M11 14 C13 11 9 9 11 6',
    'M16 14 C18 11 14 9 16 6',
    'M21 14 C23 11 19 9 21 6',
  ]
  return (
    <svg
      viewBox="0 0 32 32"
      className={svgClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* steam */}
      {steamPaths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animateIcon
              ? { pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }
              : { pathLength: 1, opacity: 0.7 }
          }
          transition={
            animateIcon
              ? {
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                  times: [0, 0.5, 1],
                }
              : { duration: 0 }
          }
        />
      ))}
      {/* bowl */}
      <path d="M5 18 H27" />
      <path d="M6 18 C7.5 23.5 11.5 26 16 26 C20.5 26 24.5 23.5 26 18" />
    </svg>
  )
}

function SolidarityIcon({ animateIcon, svgClassName = 'h-7 w-7' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={svgClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* left arc (hand reaching in) */}
      <path d="M4 22 C4 14 9 12 13 14" />
      {/* right arc (hand reaching in) */}
      <path d="M28 22 C28 14 23 12 19 14" />
      {/* connecting line at meeting point */}
      <path d="M13 14 L19 14" opacity="0.6" />
      {/* heart at meeting point — heartbeat */}
      <motion.path
        d="M16 12 C14.7 10 12 10.8 12 13 C12 15 14 16.4 16 18 C18 16.4 20 15 20 13 C20 10.8 17.3 10 16 12 Z"
        fill="currentColor"
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={animateIcon ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={
          animateIcon
            ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
      />
    </svg>
  )
}

function CommunityIcon({ animateIcon, svgClassName = 'h-7 w-7' }: IconProps) {
  const nodes = [
    { cx: 16, cy: 7 },
    { cx: 7, cy: 24 },
    { cx: 25, cy: 24 },
  ] as const
  return (
    <svg
      viewBox="0 0 32 32"
      className={svgClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* connecting lines (faint) */}
      <path d="M16 9 L8 22" opacity="0.45" strokeWidth="1.2" />
      <path d="M16 9 L24 22" opacity="0.45" strokeWidth="1.2" />
      <path d="M9 24 L23 24" opacity="0.45" strokeWidth="1.2" />
      {/* nodes — pulse in sequence */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r="2.4"
          fill="currentColor"
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animateIcon ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={
            animateIcon
              ? {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  )
}

function PillarIcon({
  id,
  animateIcon,
  compact,
}: {
  id: PillarId
  animateIcon: boolean
  compact?: boolean
}) {
  const svgClassName = compact ? 'h-5 w-5 md:h-7 md:w-7' : 'h-7 w-7'
  if (id === 'food') return <FoodIcon animateIcon={animateIcon} svgClassName={svgClassName} />
  if (id === 'solidarity')
    return <SolidarityIcon animateIcon={animateIcon} svgClassName={svgClassName} />
  return <CommunityIcon animateIcon={animateIcon} svgClassName={svgClassName} />
}

/* ──────────────────────── count-up stat ──────────────────────── */

function CountUp({
  to,
  suffix = '',
  duration = 1.6,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(`0${suffix}`)

  useEffect(() => {
    const unsub = mv.on('change', (v) => {
      setDisplay(`${Math.round(v)}${suffix}`)
    })
    return () => unsub()
  }, [mv, suffix])

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      mv.set(to)
      return
    }
    const controls = animate(mv, to, { duration, ease: EASE_OUT })
    return () => controls.stop()
  }, [inView, mv, prefersReducedMotion, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}

/* ───────────────────────── main component ───────────────────────── */

type MissionVariant = 'default' | 'lead'

const viewportDefault: UseInViewOptions = { once: true, margin: '-15% 0px' }
/** Tighter trigger so above-the-fold content animates on first paint */
const viewportLead: UseInViewOptions = { once: true, amount: 0.08 }

export default function ActionsMissionStrip({
  variant = 'default',
}: {
  variant?: MissionVariant
}) {
  const prefersReducedMotion = useReducedMotion()
  const animateAmbient = !prefersReducedMotion
  const isLead = variant === 'lead'
  const motionViewport = isLead ? viewportLead : viewportDefault
  const wordStagger = isLead ? 0.035 : 0.06
  const pillarStagger = isLead ? 0.07 : 0.14

  const headlineWords = 'Τρεις τρόποι που στεκόμαστε δίπλα στην πόλη.'.split(' ')

  return (
    <section
      className={cn(
        'relative overflow-hidden px-6 md:px-12',
        isLead
          ? 'border-t border-line/50 bg-bone pt-20 pb-6 md:pt-32 md:pb-16'
          : 'border-t border-line/50 bg-gradient-to-b from-cream via-bone-warm to-bone py-24 md:py-32',
      )}
    >
      {/* warm radial accent behind pillars (very soft) */}
      {isLead && (
        <div
          className="pointer-events-none absolute inset-x-0 top-24 flex justify-center md:top-32"
          aria-hidden
        >
          <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,164,60,0.10),_transparent_65%)] blur-2xl" />
        </div>
      )}
      {/* ─── ambient decorative layer ─── */}
      {/* botanical, top-left */}
      <motion.div
        className="pointer-events-none absolute -left-2 -top-2 text-[#2d5a27]"
        animate={
          animateAmbient ? { opacity: [0.1, 0.18, 0.1] } : { opacity: 0.14 }
        }
        transition={
          animateAmbient
            ? { duration: 8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
        aria-hidden
      >
        <BotanicalCorner />
      </motion.div>
      {/* botanical, bottom-right (mirrored) */}
      <motion.div
        className="pointer-events-none absolute -bottom-2 -right-2 text-[#2d5a27]"
        style={{ transform: 'scale(-1, -1)' }}
        animate={
          animateAmbient ? { opacity: [0.1, 0.18, 0.1] } : { opacity: 0.14 }
        }
        transition={
          animateAmbient
            ? { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }
            : { duration: 0 }
        }
        aria-hidden
      >
        <BotanicalCorner />
      </motion.div>

      {/* top-center rule with pulse dot */}
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-2',
          isLead ? 'top-6' : 'top-8',
        )}
        aria-hidden
      >
        <span className="block h-px w-9 bg-[#2d5a27]/40" />
        <motion.span
          className="block h-[5px] w-[5px] rounded-full bg-olive"
          animate={
            animateAmbient
              ? { scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }
              : { scale: 1, opacity: 1 }
          }
          transition={
            animateAmbient
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0 }
          }
        />
        <span className="block h-px w-9 bg-[#2d5a27]/40" />
      </div>

      {/* ─── content ─── */}
      <div className="relative mx-auto max-w-[1400px]">
        {/* header — hidden in lead variant since the hero header covers it */}
        {!isLead && (
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewport}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="font-sans text-[11px] uppercase tracking-[0.22em] text-olive"
            >
              ΠΩΣ ΒΟΗΘΑΜΕ · <span className="text-mustard">#KEEPRISING</span>
            </motion.p>

            <h2
              className="mt-5 font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight text-charcoal"
            >
              {headlineWords.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <span className="inline-block overflow-hidden align-baseline">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%' }}
                      whileInView={{ y: 0 }}
                      viewport={motionViewport}
                      transition={{
                        duration: 0.7,
                        delay: i * wordStagger,
                        ease: EASE_OUT,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < headlineWords.length - 1 ? ' ' : ''}
                </Fragment>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewport}
              transition={{
                duration: 0.7,
                delay: headlineWords.length * wordStagger + 0.1,
                ease: EASE_OUT,
              }}
              className="mx-auto mt-5 max-w-[44ch] font-sans text-[15px] leading-relaxed text-concrete"
            >
              Καθαρό φαγητό. Αλληλεγγύη. Κοινότητα. Όχι ως slogans — ως πράξεις.
            </motion.p>
          </div>
        )}

        {/* pillars */}
        <div
          className={cn(
            'grid md:grid-cols-3',
            isLead ? 'mt-5 gap-3 md:mt-12 md:gap-6' : 'mt-14 gap-6 md:mt-20 md:gap-8',
          )}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={isLead ? viewportLead : { once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: index * pillarStagger,
                ease: EASE_OUT,
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              className={cn(
                'group relative overflow-hidden rounded-[6px] border border-line/40 transition-shadow duration-300',
                cardBottomBorder[pillar.accent],
                isLead
                  ? 'flex flex-row items-start gap-3 bg-bone-warm p-4 md:flex-col md:gap-0 md:p-0'
                  : 'flex flex-col gap-5 p-8 ' + cardBg[pillar.accent],
                isLead &&
                  pillar.accent === 'mustard' &&
                  'md:hover:shadow-[0_8px_30px_-10px_rgba(196,164,60,0.25)]',
                isLead &&
                  pillar.accent === 'terracotta' &&
                  'md:hover:shadow-[0_8px_30px_-10px_rgba(197,101,77,0.25)]',
                isLead &&
                  pillar.accent === 'olive' &&
                  'md:hover:shadow-[0_8px_30px_-10px_rgba(101,118,82,0.25)]',
              )}
            >
              {/* ── desktop: photo header with icon overlay ── */}
              {isLead && (
                <div className="relative hidden md:block">
                  <div className="relative h-[140px] w-full overflow-hidden">
                    <Image
                      src={pillarPhoto[pillar.id]}
                      alt={pillarPhotoAlt[pillar.id]}
                      fill
                      sizes="(min-width: 768px) 33vw, 0px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className={cn(
                      'absolute inset-0',
                      pillar.accent === 'mustard' && 'bg-gradient-to-t from-mustard/20 to-transparent',
                      pillar.accent === 'terracotta' && 'bg-gradient-to-t from-terracotta/20 to-transparent',
                      pillar.accent === 'olive' && 'bg-gradient-to-t from-olive/20 to-transparent',
                    )} />
                  </div>
                  {/* icon overlapping photo bottom edge */}
                  <motion.div
                    className={cn(
                      'absolute -bottom-5 left-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-bone-warm shadow-sm',
                      iconRing[pillar.accent],
                    )}
                    animate={
                      animateAmbient ? { scale: [1, 1.06, 1] } : { scale: 1 }
                    }
                    transition={
                      animateAmbient
                        ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }
                        : { duration: 0 }
                    }
                  >
                    <PillarIcon id={pillar.id} animateIcon={animateAmbient} compact={false} />
                  </motion.div>
                </div>
              )}

              {/* ── mobile: photo thumbnail ── */}
              {isLead && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full md:hidden">
                  <Image
                    src={pillarPhoto[pillar.id]}
                    alt={pillarPhotoAlt[pillar.id]}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* ── default variant: icon only (no photo) ── */}
              {!isLead && (
                <>
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-[3px] w-12 transition-all duration-300 group-hover:w-full',
                      accentBar[pillar.accent],
                    )}
                    aria-hidden
                  />
                  <motion.div
                    className={cn(
                      'flex shrink-0 items-center justify-center rounded-full h-16 w-16',
                      iconRing[pillar.accent],
                    )}
                    animate={
                      animateAmbient ? { scale: [1, 1.06, 1] } : { scale: 1 }
                    }
                    transition={
                      animateAmbient
                        ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }
                        : { duration: 0 }
                    }
                  >
                    <PillarIcon id={pillar.id} animateIcon={animateAmbient} compact={false} />
                  </motion.div>
                </>
              )}

              <div className={cn(
                'min-w-0',
                isLead && 'md:px-6 md:pb-6 md:pt-8',
              )}>
                <h3
                  className={cn(
                    'font-serif leading-snug tracking-tight',
                    accentText[pillar.accent],
                    isLead ? 'text-[20px] md:text-[26px]' : 'text-[28px]',
                  )}
                >
                  {pillar.title}
                </h3>
                <p
                  className={cn(
                    'mt-1.5 font-sans leading-relaxed text-charcoal/75 md:mt-3',
                    isLead ? 'text-[13px] md:text-[13.5px]' : 'text-[14.5px]',
                  )}
                >
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* stats */}
        <div className={isLead ? 'mt-6 md:mt-10' : 'mt-16 md:mt-20'}>
          <div
            className={cn(
              'mx-auto h-px w-12 bg-[#2d5a27]/40',
              isLead ? 'mb-5 md:mb-6' : 'mb-12',
            )}
            aria-hidden
          />
          <div className="grid grid-cols-3 gap-4 text-center md:gap-6">
            <motion.div
              className="flex flex-col items-center"
              animate={
                animateAmbient ? { scale: [1, 1.03, 1] } : { scale: 1 }
              }
              transition={
                animateAmbient
                  ? { duration: 3, repeat: Infinity, ease: EASE_OUT, delay: 0.4 }
                  : { duration: 0 }
              }
            >
              <span className="font-serif text-[clamp(28px,3.5vw,40px)] leading-none text-mustard">
                <CountUp to={2023} />
              </span>
              <span className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
                από το
              </span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              animate={
                animateAmbient ? { scale: [1, 1.03, 1] } : { scale: 1 }
              }
              transition={
                animateAmbient
                  ? { duration: 3, repeat: Infinity, ease: EASE_OUT, delay: 0.7 }
                  : { duration: 0 }
              }
            >
              <span className="font-serif text-[clamp(28px,3.5vw,40px)] leading-none text-mustard">
                <CountUp to={12} />
              </span>
              <span className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
                δράσεις
              </span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              animate={
                animateAmbient ? { scale: [1, 1.03, 1] } : { scale: 1 }
              }
              transition={
                animateAmbient
                  ? { duration: 3, repeat: Infinity, ease: EASE_OUT, delay: 1 }
                  : { duration: 0 }
              }
            >
              <span className="font-serif text-[clamp(28px,3.5vw,40px)] leading-none text-mustard">
                <CountUp to={80} suffix="+" />
              </span>
              <span className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
                παιδιά υποστηρίξαμε
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
