'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import AmbientVideo from '@/components/ambient-video'
import { Reveal } from '@/components/reveal'
import MaskRevealBlock from '@/components/mask-reveal-block'
import { ClimateShell } from '@/components/decor/climate-shell'
import {
  AnaglyphHeading,
  CornerTicks,
  Eyebrow,
  HairlineRule,
  MicroEyebrow,
} from '@/components/decor/ornaments'
import { VIEWPORT_ONCE, ease } from '@/lib/motion'
import { videoSrc } from '@/lib/media'
import { images } from '@/lib/images'

const philosophyGoals = [
  'Να επικεντρωθεί στην υγεία.',
  'Να δημιουργήσει κοινότητα.',
  'Να μαζέψει ανθρώπους ίδιας φιλοσοφίας — έναν χώρο που δρα ως μαγνήτης για ανθρώπους της ίδιας νοοτροπίας.',
] as const

const philosophyVideo = videoSrc('/videos/mess-philosophy.mp4')
const aboutEditorialVideos = [
  videoSrc('/videos/about-editorial-1.mp4'),
  videoSrc('/videos/about-editorial-2.mp4'),
] as const

export default function PhilosophySection() {
  return (
    <ClimateShell
      id="philosophy"
      bgEnter="#2d5a27"
      bgPeak="#18391a"
      bgExit="#2d5a27"
      particles="mustard"
      particleCount={8}
    >
      <div className="mx-auto max-w-[1400px]">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Eyebrow tone="dark">Η φιλοσοφία μας</Eyebrow>

                <h2 className="type-section u-balance mt-7 font-serif text-charcoal">
                  Ποιοι είμαστε{' '}
                  <span className="italic text-mustard">&amp;</span>
                  <br className="hidden sm:block" />{' '}
                  η φιλοσοφία μας
                </h2>

                <p className="mt-7 max-w-[44ch] font-serif text-[clamp(17px,1.4vw,20px)] italic leading-[1.55] text-charcoal/75">
                  Φύση, ευεξία, χαλάρωση. Στις εγκαταστάσεις του ΚΕΠΑΒΙ δημιουργήσαμε μια μικρή όαση, που σκοπό έχει:
                </p>
              </Reveal>

              <Reveal asGroup gap={0.1} delay={0.15} className="mt-12 flex flex-col">
                {philosophyGoals.map((goal, index) => (
                  <Reveal.Item key={goal}>
                    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t border-charcoal/10 py-6 first:border-t-0 first:pt-0">
                      <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-mustard tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="font-serif text-[clamp(19px,1.55vw,22px)] leading-snug tracking-[-0.005em] text-charcoal">
                        {goal}
                      </p>
                    </div>
                  </Reveal.Item>
                ))}
              </Reveal>

              <Reveal delay={0.35} className="mt-12 inline-flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-charcoal/30" />
                <MicroEyebrow>M.E.S.S. · ΚΕΠΑΒΙ, Ιωάννινα</MicroEyebrow>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-7">
            <MaskRevealBlock direction="up">
              <Tile aspect="aspect-video">
                <AmbientVideo
                  srcs={[...aboutEditorialVideos]}
                  poster={images.aboutInterior}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: '50% 35%' }}
                  ariaLabel="Βίντεο από τον χώρο του M.E.S.S. — πλάνα διαδόχως"
                />
              </Tile>
            </MaskRevealBlock>
          </div>
        </div>

        <Centerpiece />

        <SplitSpread />

      </div>
    </ClimateShell>
  )
}

function Centerpiece() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <div ref={ref} className="relative isolate overflow-x-clip py-6 md:py-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">

        <motion.div
          className="md:col-start-2 md:col-span-5"
          style={reduce ? undefined : { y: videoY }}
          initial={reduce ? false : { opacity: 0, x: -60, scale: 0.96 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={reduce ? undefined : { duration: 1.2, ease: ease.outStrong }}
        >
          <figure className="relative">
            <div className="relative aspect-[9/16] w-full max-w-[380px] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <AmbientVideo
                  src={philosophyVideo}
                  poster={images.messPhilosophyPoster}
                  className="absolute inset-0 h-full w-full object-cover"
                  ariaLabel="Βίντεο από τον χώρο του M.E.S.S."
                />
              </motion.div>

              <span aria-hidden className="pointer-events-none absolute inset-0 border border-mustard/40" />
              <CornerTicks />
            </div>
          </figure>
        </motion.div>

        <motion.div
          className="md:col-start-8 md:col-span-4"
          style={reduce ? undefined : { y: textY }}
          initial={reduce ? false : { opacity: 0, x: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={reduce ? undefined : { duration: 1.0, ease: ease.outStrong, delay: 0.35 }}
        >
          <div className="flex items-center gap-3">
            <HairlineRule origin="left" className="w-12" delay={0.5} />
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Η σκηνή μας
            </span>
          </div>

          <AnaglyphHeading as="h3" tone="light" className="mt-6">
            Ένας χώρος{' '}
            <span className="italic text-mustard">σε κίνηση</span>
          </AnaglyphHeading>

          <p className="mt-6 max-w-[34ch] font-serif text-[clamp(15px,1.3vw,18px)] italic leading-[1.55] text-charcoal/75">
            Μικρές στιγμές από την καθημερινότητα στο M.E.S.S. — φως, υλικά, άνθρωποι.
          </p>

          <motion.div
            className="mt-10 flex items-center gap-3"
            animate={reduce ? undefined : { x: [0, 6, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <span aria-hidden className="block h-px w-8 bg-mustard/60" />
            <MicroEyebrow>M.E.S.S. · Ιωάννινα</MicroEyebrow>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function SplitSpread() {
  return (
    <div className="relative mt-16 md:mt-24">

      <div className="mb-8 flex items-center gap-3 md:mb-12">
        <span aria-hidden className="block h-px w-10 bg-mustard/70" />
        <MicroEyebrow>Λεπτομέρειες · ο χώρος μας</MicroEyebrow>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-start-1 md:col-span-5 md:-translate-y-4">
          <MaskRevealBlock direction="left">
            <KenBurnsTile
              src={images.new1}
              alt="Εσωτερικός χώρος του καφέ με φυσικό φως"
              aspect="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </MaskRevealBlock>
        </div>
        <div className="md:col-start-8 md:col-span-4 md:translate-y-16">
          <MaskRevealBlock direction="up" delay={0.15}>
            <KenBurnsTile
              src={images.aboutInterior}
              alt="Εσωτερικός χώρος, γενικό πλάνο"
              aspect="aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </MaskRevealBlock>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-6 md:mt-36 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-start-2 md:col-span-4 md:translate-y-12">
          <MaskRevealBlock direction="left">
            <KenBurnsTile
              src={images.aboutPlants}
              alt="Πυκνή βλάστηση σε μπετόνινο τοίχο"
              aspect="aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </MaskRevealBlock>
        </div>
        <div className="md:col-start-7 md:col-span-6 md:-translate-y-4">
          <MaskRevealBlock direction="up" delay={0.15}>
            <KenBurnsTile
              src={images.new2}
              alt="Λεπτομέρεια διακόσμησης και υλικών στον χώρο"
              aspect="aspect-[3/2]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </MaskRevealBlock>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-6 md:mt-36 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-start-1 md:col-span-9">
          <MaskRevealBlock direction="up">
            <KenBurnsTile
              src={images.aboutBar}
              alt="Μπαρ specialty coffee και περιοχή σερβιρίσματος"
              aspect="aspect-[16/9]"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </MaskRevealBlock>
        </div>
        <div className="hidden md:col-start-11 md:col-span-2 md:flex md:translate-y-2 md:flex-col md:items-start md:gap-4">
          <span aria-hidden className="block h-12 w-px bg-mustard/70" />
          <MicroEyebrow className="text-olive/80">
            Σειρά
            <br />
            6 σκηνών
          </MicroEyebrow>
          <p className="font-serif text-[13px] italic leading-snug text-charcoal/60">
            από τον χώρο
          </p>
        </div>
      </div>

      <Reveal delay={0.4} className="mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-start-2 md:col-span-7">
            <p className="font-serif text-[clamp(20px,2.2vw,28px)] italic leading-[1.4] text-charcoal/80">
              «Ένας χώρος μπροστά στη λίμνη — υγιεινό lifestyle, κοινότητα, ευεξία.»
            </p>
            <p className="mt-5 inline-flex items-center gap-3">
              <span aria-hidden className="block h-px w-8 bg-mustard/60" />
              <MicroEyebrow className="text-olive/80">M.E.S.S. · 2025</MicroEyebrow>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function KenBurnsTile({
  src,
  alt,
  aspect,
  sizes,
}: {
  src: string
  alt: string
  aspect: string
  sizes: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  return (
    <figure ref={ref} className="group">
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={reduce ? undefined : { scale, y }}
        >
          <FadeImage
            src={src}
            alt={alt}
            fill
            unoptimized
            loading="lazy"
            sizes={sizes}
            className="object-cover transition-[filter] duration-700 group-hover:brightness-110"
          />
        </motion.div>
      </div>
    </figure>
  )
}

function Tile({
  children,
  aspect,
}: {
  children: ReactNode
  aspect: string
}) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {children}
      </div>
    </figure>
  )
}
