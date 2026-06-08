'use client'

import { useRef } from 'react'
import { FadeImage } from '@/components/fade-image'
import KeepRisingWordmark from '@/components/keep-rising-wordmark'
import Link from 'next/link'
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Reveal } from '@/components/reveal'
import MaskRevealBlock from '@/components/mask-reveal-block'
import ScrollDrift from '@/components/scroll-drift'
import { ClimateShell } from '@/components/decor/climate-shell'
import {
  AnaglyphHeading,
  CornerTicks,
  Eyebrow,
  HairlineRule,
  ReleaseDivider,
} from '@/components/decor/ornaments'
import type { Event } from '@/lib/events/events'

const MAX_VISIBLE = 3
const FOREST = '#2d5a27'
const CANOPY_NIGHT = '#0e2208'

type ActionsSectionProps = {
  actionCards: Event[]
}

function CanopyLight({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const tx = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const ty = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 0.55, 0.85, 0.55, 0])

  if (reduce) return null
  return (
    <m.div
      aria-hidden
      // No mix-blend-screen: a blended layer forces the GPU to re-read + re-blend
      // the backdrop every scroll frame (the backdrop is scrolling), and it turns
      // visible exactly at the philosophy→actions hand-off. The warm gradient
      // alpha already reads as a soft glow on its own.
      className="pointer-events-none absolute inset-0"
      style={{ x: tx, y: ty, opacity }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
        style={{
          // No filter:blur — radial gradients are already soft, and a 48px blur
          // on a moving + mix-blended element re-rasterized every scroll frame
          // right as the Actions section enters. Softer gradient stops instead.
          background:
            'radial-gradient(ellipse 60% 45% at 30% 25%, rgba(232,181,71,0.16), transparent 70%), radial-gradient(ellipse 50% 40% at 70% 70%, rgba(216,232,204,0.12), transparent 66%)',
        }}
      />
    </m.div>
  )
}

function formatEventDate(iso: string): string {
  if (!iso.trim()) return ''
  try {
    return new Intl.DateTimeFormat('el-GR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function ActionsSection({ actionCards }: ActionsSectionProps) {
  const visible = actionCards.slice(0, MAX_VISIBLE)
  const hasMore = actionCards.length > MAX_VISIBLE
  const beamRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: beamProgress } = useScroll({
    target: beamRef,
    offset: ['start end', 'end start'],
  })

  return (
    <ClimateShell
      id="actions"
      bgEnter={FOREST}
      bgPeak={CANOPY_NIGHT}
      bgExit={FOREST}
      particles="dust"
      particleCount={9}
      ringClassName="ring-mustard/30"
      vignetteAlpha={0.45}
    >
      <div ref={beamRef} className="relative">
        <CanopyLight scrollYProgress={beamProgress} />
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow tone="light">ΟΙ ΣΤΟΧΟΙ ΜΑΣ · COMMUNITY</Eyebrow>
              <ScrollDrift distance={20}>
                <KeepRisingWordmark className="mt-5 text-left" />
              </ScrollDrift>
              <p className="mt-7 max-w-[55ch] font-serif text-[clamp(17px,1.4vw,20px)] italic leading-[1.55] text-charcoal/70">
                Δεν είμαστε απλώς ένα καφέ, είμαστε μια ιδέα. Σκοπός του M.E.S.S. είναι να βοηθήσει στη
                δημιουργία μιας κοινότητας μέσω της αλληλοϋποστήριξης, της κοινωνικής βοήθειας και του ευ
                ζην. Το KeepRising είναι ο τρόπος που μετατρέπουμε την ιδεολογία σε πράξη μέσω διάφορων
                κοινωνικών δράσεων, τις οποίες θα βρείτε{' '}
                <Link
                  href="/actions"
                  className="ui-link inline-flex min-h-11 items-center py-1 font-medium text-charcoal md:min-h-0 md:py-0"
                >
                  παρακάτω
                </Link>
                .
              </p>
            </div>

          </div>

          {visible.length > 0 && (
            <>
              <ReleaseDivider label="Οι δράσεις" />

              <Reveal asGroup gap={0.12}>
                {visible.map((card, idx) => (
                  <ActionSpread
                    key={card.slug}
                    card={card}
                    side={idx % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </Reveal>
            </>
          )}

          <div className="mt-12 grid grid-cols-12 md:mt-28">
            <div className="col-span-12 flex items-center gap-5 md:col-span-7 md:col-start-2">
              <HairlineRule origin="left" className="w-16" />
              <Link
                href="/actions"
                className="ui-link inline-flex min-h-11 items-center py-2.5 font-sans text-[12px] uppercase tracking-[0.16em] text-charcoal hover:text-mustard md:min-h-0 md:py-0"
              >
                {hasMore
                  ? `Δες όλες τις δράσεις (${actionCards.length}) →`
                  : 'Δες όλες τις δράσεις →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ClimateShell>
  )
}

function ActionSpread({
  card,
  side,
}: {
  card: Event
  side: 'left' | 'right'
}) {
  const imageCol =
    side === 'left'
      ? 'md:col-start-1 md:col-span-5 md:row-start-1'
      : 'md:col-start-8 md:col-span-5 md:row-start-1'
  const typeCol =
    side === 'left'
      ? 'md:col-start-8 md:col-span-4 md:row-start-1'
      : 'md:col-start-2 md:col-span-4 md:row-start-1'

  const dateLabel = formatEventDate(card.date)

  return (
    <Reveal.Item>
      <Link
        href={`/actions/${card.slug}`}
        className="group/spread mt-14 block grid grid-cols-1 gap-6 md:mt-36 md:grid-cols-12 md:gap-8"
      >
        <div className={`order-1 ${imageCol}`}>
          <MaskRevealBlock direction={side === 'left' ? 'left' : 'up'}>
            <ActionImage
              src={card.coverImage}
              alt={card.coverAlt || `Εκδήλωση: ${card.title}`}
              objectPosition={card.coverObjectPosition ?? 'center'}
            />
          </MaskRevealBlock>
        </div>

        <div className={`order-2 flex flex-col justify-start ${typeCol}`}>
          {dateLabel ? (
            <p className="mt-4 font-serif text-[clamp(28px,3vw,40px)] italic leading-none text-mustard">
              {dateLabel}
            </p>
          ) : null}
          <AnaglyphHeading
            as="h3"
            tone="dark"
            className={`type-card u-balance ${dateLabel ? 'mt-3' : 'mt-4'} transition-colors duration-500 group-hover/spread:text-mustard`}
          >
            {card.title}
          </AnaglyphHeading>
          <p className="mt-4 max-w-[36ch] font-serif text-[clamp(15px,1.2vw,17px)] italic leading-[1.55] text-charcoal/70">
            {card.description}
          </p>
          <span className="ui-link mt-6 inline-block font-sans text-[13px] text-charcoal group-hover/spread:text-mustard">
            Συνέχεια →
          </span>
        </div>
      </Link>
    </Reveal.Item>
  )
}

function ActionImage({
  src,
  alt,
  objectPosition,
}: {
  src: string
  alt: string
  objectPosition: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // will-change only while near the viewport — keeps each card image from staying
  // GPU-promoted when scrolled away (these stack right at the actions boundary).
  const inView = useInView(ref, { margin: '200px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-3%'])

  return (
    <figure ref={ref} className="group/image relative">
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <m.div
          className="absolute inset-0 transition-[transform,filter] duration-500 ease-out group-hover/spread:scale-[1.04] group-hover/spread:brightness-[1.06] group-hover/spread:saturate-[1.08]"
          style={reduce ? { willChange: 'auto' } : { scale, y, willChange: inView ? 'transform' : 'auto' }}
        >
          <FadeImage
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </m.div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-250 group-hover/spread:opacity-100">
          <CornerTicks />
        </div>
      </div>
    </figure>
  )
}
