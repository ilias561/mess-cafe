'use client'

import { useRef } from 'react'
import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/reveal'
import ScrollDrift from '@/components/scroll-drift'
import MaskRevealBlock from '@/components/mask-reveal-block'
import { ClimateShell } from '@/components/decor/climate-shell'
import {
  AnaglyphHeading,
  CornerTicks,
  Eyebrow,
  HairlineRule,
  MicroEyebrow,
  NumberedCaption,
} from '@/components/decor/ornaments'
import { featuredMenuItems } from '@/lib/menu-featured'

const PHILOSOPHY_LEAD =
  'Μέσα από χρόνια μελέτης για την κατανόηση του ανθρώπινου σώματος, καταλήξαμε σε μια φιλοσοφία μαγειρέματος όπου το φαγητό κατέχει θέση φαρμάκου για τον ανθρώπινο οργανισμό.'
const PHILOSOPHY_BODY =
  'Δουλεύουμε αποκλειστικά με φρέσκα υλικά, τοπικά προϊόντα, και χρησιμοποιούμε μόνο ελαιόλαδο, βούτυρο και λάδι καρύδας. Το ψωμί μας είναι προζυμένιο αργής ωρίμανσης και ψήνεται σε παραδοσιακό ξυλόφουρνο.'

const FOREST = '#2d5a27'
const MUSTARD_FIELD = '#e8b547'

const MENU_ANAGLYPH_SHADOW =
  'motion-safe:md:[text-shadow:1.5px_0_0_rgba(217,138,95,0.35),-1.5px_0_0_rgba(45,90,39,0.30)]'

export default function GalleryMenuPreview() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const hero = featuredMenuItems[0]
  const railItems = featuredMenuItems.slice(1)

  return (
    <ClimateShell
      id="menu-preview"
      bgEnter={FOREST}
      bgPeak={MUSTARD_FIELD}
      bgExit={FOREST}
      particles="shimmer"
      particleCount={10}
      ringClassName="ring-ink-dark/20"
      vignetteAlpha={0.35}
      contentClipping={false}
    >
      <div ref={scrollRef} className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-16">
          <div className="text-ink-dark md:col-span-5 md:sticky md:top-28">
            <Eyebrow
              tone="light"
              className="[&_span:first-child]:bg-ink-dark/40 [&_span:last-child]:text-ink-dark"
            >
              ΦΑΓΗΤΟ ΩΣ ΦΑΡΜΑΚΟ
            </Eyebrow>
            <ScrollDrift distance={26}>
              <AnaglyphHeading
                as="h2"
                tone="dark"
                className={`mt-3 text-ink-dark ${MENU_ANAGLYPH_SHADOW}`}
              >
                Η φιλοσοφία του μενού μας.
              </AnaglyphHeading>
            </ScrollDrift>
            <p className="mt-6 font-serif text-[clamp(17px,1.5vw,20px)] leading-relaxed tracking-tight text-ink-dark/85">
              {PHILOSOPHY_LEAD}
            </p>
            <p className="mt-4 font-sans text-[clamp(16px,1.3vw,19px)] leading-relaxed text-ink-dark/65">
              {PHILOSOPHY_BODY}
            </p>
            <Link
              href="/food-for-medicine"
              className="ui-link mt-10 inline-flex min-h-11 items-center gap-4 py-2 font-sans text-[12px] uppercase tracking-[0.16em] text-ink-dark hover:text-ink-dark/70 md:min-h-0 md:py-0"
            >
              <span aria-hidden className="block h-px w-10 bg-ink-dark/40" />
              Δείτε το μενού μας →
            </Link>
          </div>

          {hero ? (
            <div className="md:col-span-6 md:col-start-7">
              <MenuHeroDish item={hero} />
              {railItems.length > 0 ? (
                <Reveal asGroup gap={0.1} className="mt-20 text-ink-dark md:mt-28">
                  {railItems.map((item, idx) => (
                    <TastingRailRow
                      key={item.name}
                      item={item}
                      index={String(11 + idx).padStart(2, '0')}
                      zigzag={idx % 2 === 1}
                      showRuleAbove={idx > 0}
                    />
                  ))}
                </Reveal>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </ClimateShell>
  )
}

function MenuHeroDish({ item }: { item: (typeof featuredMenuItems)[0] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // Only run the slow scale loop while the dish is on-screen.
  const inView = useInView(ref, { margin: '200px' })

  return (
    <figure ref={ref} className="relative">
      {/* Square, not 4/5: the dish photos are 4:3 with the round plate spanning
          ~66% of the width — a 4/5 cover crop shows only 60% and slices the
          plate's sides off (user report 2026-06-12); square shows 75%, the
          whole plate with margin. */}
      <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink-dark/30">
        <m.div
          className="absolute inset-0"
          animate={!reduce && inView ? { scale: [1, 1.04, 1] } : undefined}
          transition={
            reduce ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {item.image ? (
            // 135vw: the square box crops the 4:3 dish photo by HEIGHT
            // (~88vw × 4/3 ≈ 117vw of source needed), so width-based sizes
            // under-pick — the 65vw cap fetched w768 for ~1400+ device px
            // (visibly pixelated). 135vw → w1600 on 3× phones, w1200 on 2×.
            <FadeImage
              src={item.image}
              alt={item.name}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 768px) 135vw, 42vw"
              className="object-cover"
            />
          ) : null}
        </m.div>
        <CornerTicks />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
        />
        <div className="absolute bottom-0 left-0 p-4">
          <NumberedCaption index="10" label={item.cat} className="mt-0 [&_span]:text-bone" />
        </div>
      </div>
    </figure>
  )
}

function TastingRailRow({
  item,
  index,
  zigzag,
  showRuleAbove,
}: {
  item: (typeof featuredMenuItems)[0]
  index: string
  zigzag: boolean
  showRuleAbove: boolean
}) {
  // one column wider than the original 2/3-span — the thumbs read too small
  // next to the type on desktop (user report 2026-06-12)
  const thumbCol = zigzag
    ? 'md:col-start-9 md:col-span-3'
    : 'md:col-start-8 md:col-span-4'

  return (
    <Reveal.Item>
      <div className="mt-12 md:mt-20">
        {showRuleAbove ? (
          <div className="mb-12 grid grid-cols-1 md:mb-20 md:grid-cols-12">
            <HairlineRule
              origin="left"
              className="bg-ink-dark/25 md:col-span-10 md:col-start-2"
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start md:gap-8">
          <div className="md:col-span-1 md:col-start-1 md:pt-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-dark/70">
              {index}
            </span>
          </div>

          <Reveal direction="left" className="md:col-span-6 md:col-start-2">
            <MicroEyebrow className="text-ink-dark/65">{item.cat}</MicroEyebrow>
            <div className="mt-2 border-t border-ink-dark/30 pt-3">
              <h3 className="font-serif text-[clamp(22px,2vw,28px)] tracking-tight text-ink-dark">
                {item.name}
              </h3>
            </div>
            <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-dark/65">
              {item.desc}
            </p>
          </Reveal>

          {item.image ? (
            <MaskRevealBlock direction="up" className={`${thumbCol}`}>
              <div className="relative aspect-square w-full overflow-hidden">
                {/* 100vw: the square crops the wider dish photo by height
                    (~88vw × aspect ≈ 107vw of source needed) — 100vw lands on
                    w1200 at 3× DPR (0.96× fit); the old 65vw cap fetched w768
                    (0.61×, soft). */}
                <FadeImage
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 22vw"
                  className="object-cover"
                />
              </div>
            </MaskRevealBlock>
          ) : null}
        </div>
      </div>
    </Reveal.Item>
  )
}
