'use client'

import { useRef } from 'react'
import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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

const BONE = '#f5f1e8'
const FOREST = '#2d5a27'
const PANTRY_DEEP = '#3a2418'
const INK_CHARCOAL = '#2b2b28'

export default function GalleryMenuPreview() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 0.86, 1],
    [INK_CHARCOAL, BONE, BONE, INK_CHARCOAL, INK_CHARCOAL],
  )

  const hero = featuredMenuItems[0]
  const railItems = featuredMenuItems.slice(1)

  return (
    <ClimateShell
      id="menu-preview"
      bgEnter={BONE}
      bgPeak={PANTRY_DEEP}
      bgExit={FOREST}
      particles="shimmer"
      particleCount={10}
      ringClassName="ring-mustard/35"
      vignetteAlpha={0.55}
    >
      <div ref={scrollRef} className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-28">
            <motion.div style={reduce ? undefined : { color: textColor }}>
              <Eyebrow tone="dark">ΦΑΓΗΤΟ ΩΣ ΦΑΡΜΑΚΟ</Eyebrow>
              <ScrollDrift distance={26}>
                <AnaglyphHeading as="h2" tone="light" className="mt-3">
                  Η φιλοσοφία του μενού μας.
                </AnaglyphHeading>
              </ScrollDrift>
              <p className="mt-6 font-serif text-[clamp(17px,1.5vw,20px)] leading-relaxed tracking-tight">
                {PHILOSOPHY_LEAD}
              </p>
            </motion.div>
            <p className="mt-4 font-sans text-[clamp(16px,1.3vw,19px)] leading-relaxed text-charcoal/80">
              {PHILOSOPHY_BODY}
            </p>
            <Link
              href="/food-for-medicine#menu"
              className="ui-link mt-10 inline-flex items-center gap-4 font-sans text-[12px] uppercase tracking-[0.28em] text-charcoal hover:text-mustard"
            >
              <span aria-hidden className="block h-px w-10 bg-mustard" />
              Δείτε το μενού μας →
            </Link>
          </div>

          {hero ? (
            <div className="md:col-span-6 md:col-start-7">
              <MenuHeroDish item={hero} />
            </div>
          ) : null}
        </div>

        {railItems.length > 0 ? (
          <Reveal asGroup gap={0.1} className="mt-20 md:mt-28">
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
    </ClimateShell>
  )
}

function MenuHeroDish({ item }: { item: (typeof featuredMenuItems)[0] }) {
  const reduce = useReducedMotion()

  return (
    <figure className="relative">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-mustard/40">
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={
            reduce ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {item.image ? (
            <FadeImage
              src={item.image}
              alt={item.name}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          ) : null}
        </motion.div>
        <CornerTicks />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent"
        />
        <div className="absolute bottom-0 left-0 p-4">
          <NumberedCaption index="10" label={item.cat} className="mt-0 [&_span]:text-bone/90" />
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
  const thumbCol = zigzag
    ? 'md:col-start-10 md:col-span-2'
    : 'md:col-start-9 md:col-span-3'

  return (
    <Reveal.Item>
      <div className="mt-12 md:mt-20">
        {showRuleAbove ? (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-12 md:mb-20">
            <HairlineRule origin="left" className="md:col-span-10 md:col-start-2" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start md:gap-8">
          <div className="md:col-span-1 md:col-start-1 md:pt-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">
              {index}
            </span>
          </div>

          <Reveal direction="left" className="md:col-span-6 md:col-start-2">
            <MicroEyebrow className="text-olive">{item.cat}</MicroEyebrow>
            <div className="mt-2 border-t border-mustard/30 pt-3">
              <h3 className="font-serif text-[clamp(22px,2vw,28px)] tracking-tight text-charcoal">
                {item.name}
              </h3>
            </div>
            <p className="mt-3 font-sans text-[14px] leading-relaxed text-concrete">{item.desc}</p>
          </Reveal>

          {item.image ? (
            <MaskRevealBlock direction="up" className={`${thumbCol}`}>
              <div className="relative aspect-square w-full overflow-hidden">
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
