'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import AmbientVideo from '@/components/ambient-video'
import { Reveal } from '@/components/reveal'
import MaskRevealBlock from '@/components/mask-reveal-block'
import {
  PalmFrond,
  MonsteraLeaf,
  FernSprig,
  MonsteraTall,
  PalmCluster,
  LeafBorderStrip,
} from '@/components/decor/leaf-shapes'
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
    <ClimateShell>
      <div className="mx-auto max-w-[1400px]">

        {/* ── PHASE 1: sticky text left + looping editorial video right ── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">

          {/* LEFT — sticky text */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="block h-px w-10 bg-mustard" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-olive">
                    Η φιλοσοφία μας
                  </span>
                </div>

                <h2 className="mt-7 font-serif text-[clamp(34px,4.6vw,52px)] leading-[1.02] tracking-[-0.012em] text-charcoal">
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
                      <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">
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
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-charcoal/55">
                  M.E.S.S. · ΚΕΠΑΒΙ, Ιωάννινα
                </span>
              </Reveal>
            </div>
          </div>

          {/* RIGHT — looping editorial pair, original landscape ratio */}
          <div className="md:col-span-7">
            <MaskRevealBlock direction="up">
              <Tile aspect="aspect-video" caption="ΣΤΙΓΜΕΣ · σε επανάληψη">
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

        {/* ── RELEASE: animated divider out of the sticky zone ── */}
        <ReleaseDivider />

        {/* ── CENTERPIECE: minimal — video held by the leaves, no matte chrome ── */}
        <Centerpiece />

        {/* ── Aftermath: editorial split spread, smaller, 3 rows ── */}
        <SplitSpread />

      </div>
    </ClimateShell>
  )
}

/* ───────────────────────────────────────────────────────────── */

/**
 * CLIMATE SHELL
 *   Wraps the philosophy section. Scroll-driven transitions:
 *   - Floating-card chrome (rounded corners, outer margin, hairline ring)
 *   - Background deepens (bone → olive-deep) as user enters the section
 *   - Leaves slide in from TOP, LEFT, RIGHT, CENTER (4 entry vectors)
 *   - Continuous gentle sway on the leaves once they arrive
 *   - Reverses on exit (just before #KEEPRISING)
 */
function ClimateShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Background color: light forest → DEEP near-black forest (much more dramatic)
  // Activates earlier so the transition is visible during entry
  const bg = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    ['#2d5a27', '#2d5a27', '#18391a', '#18391a', '#2d5a27', '#2d5a27'],
  )

  // Card chrome — kicks in early so the floating card forms quickly on entry
  const cardInset = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    ['0px', '0px', '14px', '14px', '0px', '0px'],
  )
  const cardRadius = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    ['0px', '0px', '28px', '28px', '0px', '0px'],
  )
  const ringOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.14, 0.84, 0.94, 1],
    [0, 0, 1, 1, 0, 0],
  )

  // Vignette + textures — same driver, kicks in just after the bg starts darkening
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.14, 0.84, 0.94, 1],
    [0, 0, 1, 1, 0, 0],
  )

  // Leaves — entries are FAST and bold
  const topLeafY = useTransform(scrollYProgress, [0, 0.05, 0.22], ['-120%', '-120%', '0%'])
  const topLeafOp = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.78, 0.95], [0, 0, 1, 1, 0])

  const leftLeafX = useTransform(scrollYProgress, [0, 0.08, 0.26], ['-110%', '-110%', '0%'])
  const leftLeafOp = useTransform(scrollYProgress, [0, 0.08, 0.26, 0.74, 0.92], [0, 0, 1, 1, 0])

  const rightLeafX = useTransform(scrollYProgress, [0, 0.08, 0.26], ['110%', '110%', '0%'])
  const rightLeafOp = useTransform(scrollYProgress, [0, 0.08, 0.26, 0.74, 0.92], [0, 0, 1, 1, 0])

  // BOTTOM — leaves rising up from below
  const bottomLeafY = useTransform(scrollYProgress, [0, 0.1, 0.3], ['120%', '120%', '0%'])
  const bottomLeafOp = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 0.9], [0, 0, 1, 1, 0])

  // Center fern — scales out
  const centerScale = useTransform(scrollYProgress, [0, 0.12, 0.32], [0.2, 0.2, 1])
  const centerOp = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.7, 0.9], [0, 0, 0.7, 0.7, 0])

  // Particle opacity (fade in/out with climate)
  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0, 1, 1, 0, 0],
  )

  return (
    <motion.section
      ref={ref}
      id="philosophy"
      className="scroll-mt-28 relative"
      style={reduce ? { background: '#2d5a27' } : { background: bg }}
    >
      {/* Floating card wrapper — bg is animated by the same `bg` color driver */}
      <motion.div
        className="relative isolate overflow-hidden border-t border-line/30"
        style={
          reduce
            ? { background: '#2d5a27' }
            : {
                background: bg,
                marginLeft: cardInset,
                marginRight: cardInset,
                marginTop: cardInset,
                marginBottom: cardInset,
                borderRadius: cardRadius,
              }
        }
      >
        {/* Card hairline ring */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ring-mustard/35"
          style={reduce ? { opacity: 0 } : { opacity: ringOpacity }}
        />

        {/* Vignette overlay — radial darken from corners */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit]"
          style={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: vignetteOpacity,
                  background:
                    'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
                }
          }
        />

        {/* Floating particles + card hairline only — no leaves */}
        {!reduce && (
          <>
            {/* Floating particles — slowly drift upward through the canopy */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[6]"
              style={{ opacity: particleOpacity }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <FloatingParticle key={i} index={i} />
              ))}
            </motion.div>
          </>
        )}

        {/* Actual content — sits above the canopy */}
        <div className="relative z-20 px-6 py-20 md:px-12 md:py-28">{children}</div>
      </motion.div>
    </motion.section>
  )
}

/** Single floating mote drifting up — adds atmosphere */
function FloatingParticle({ index }: { index: number }) {
  // Pseudo-random but deterministic placement
  const left = `${(index * 37) % 100}%`
  const startTop = `${80 + ((index * 13) % 20)}%`
  const size = 2 + (index % 3)
  const duration = 10 + (index % 6)
  const delay = (index * 0.7) % 4

  return (
    <motion.span
      className="absolute block rounded-full bg-mustard/60"
      style={{ left, top: startTop, width: size, height: size }}
      animate={{
        y: [0, -300, -600],
        opacity: [0, 1, 0],
        x: [0, 12, -8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  )
}

/**
 * Sway — continuous gentle rotation, runs in a separate motion layer
 * so it composes cleanly with the parent's entry-progress animations.
 */
function Sway({
  children,
  amp,
  duration,
}: {
  children: ReactNode
  amp: number
  duration: number
}) {
  return (
    <motion.div
      className="h-full w-full"
      animate={{ rotate: [0, amp, 0, -amp * 0.6, 0], y: [0, -6, 0, -3, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────────────── */

function ReleaseDivider() {
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
          transition={reduce ? undefined : { duration: 0.7, delay: 0.6, ease: ease.outStrong }}
        >
          Ο χώρος σε κίνηση
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

/* ───────────────────────────────────────────────────────────── */

/**
 * CENTERPIECE — asymmetric, motion-rich, native video aspect
 *   - Video at NATIVE aspect-[9/16] so the entire shot is visible (no crop)
 *   - Anchored LEFT in a 12-col grid (not centered)
 *   - Right side carries the editorial typography (heading, italic caption, signature)
 *   - Visible continuous motion: video scale-pulse loop + slow drift on signature
 *   - Scroll-driven parallax on the video container
 *   - No more white-bg leaves (the screenshot PNG didn't blend — dropped entirely)
 */
function Centerpiece() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <div ref={ref} className="relative isolate overflow-x-clip py-6 md:py-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">

        {/* LEFT — video at native 9/16, off-center anchored */}
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
              {/* Continuous breathing scale loop — visible motion at all times */}
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

              {/* Single mustard hairline directly on the video */}
              <span aria-hidden className="pointer-events-none absolute inset-0 border border-mustard/40" />

              {/* Corner ticks outside the hairline */}
              <span aria-hidden className="pointer-events-none absolute -left-2 -top-2 block h-4 w-4 border-l-2 border-t-2 border-mustard" />
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-2 block h-4 w-4 border-r-2 border-t-2 border-mustard" />
              <span aria-hidden className="pointer-events-none absolute -left-2 -bottom-2 block h-4 w-4 border-l-2 border-b-2 border-mustard" />
              <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-2 block h-4 w-4 border-r-2 border-b-2 border-mustard" />
            </div>
          </figure>
        </motion.div>

        {/* RIGHT — editorial typography composition */}
        <motion.div
          className="md:col-start-8 md:col-span-4"
          style={reduce ? undefined : { y: textY }}
          initial={reduce ? false : { opacity: 0, x: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={reduce ? undefined : { duration: 1.0, ease: ease.outStrong, delay: 0.35 }}
        >
          {/* Eyebrow with animated rule */}
          <div className="flex items-center gap-3">
            <motion.span
              aria-hidden
              className="block h-px w-12 origin-left bg-mustard"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={reduce ? undefined : { duration: 0.9, ease: ease.outStrong, delay: 0.5 }}
            />
            <span className="font-sans text-[11px] uppercase tracking-[0.36em] text-olive">
              Η σκηνή μας
            </span>
          </div>

          {/* Large display heading */}
          <h3 className="mt-6 font-serif text-[clamp(32px,3.4vw,46px)] leading-[1.02] tracking-[-0.012em] text-charcoal motion-safe:md:[text-shadow:1.5px_0_0_rgba(232,181,71,0.35),-1.5px_0_0_rgba(180,210,255,0.30)]">
            Ένας χώρος{' '}
            <span className="italic text-mustard">σε κίνηση</span>
          </h3>

          {/* Italic body */}
          <p className="mt-6 max-w-[34ch] font-serif text-[clamp(15px,1.3vw,18px)] italic leading-[1.55] text-charcoal/75">
            Μικρές στιγμές από την καθημερινότητα στο M.E.S.S. — φως, υλικά, άνθρωποι.
          </p>

          {/* Animated signature row — continuous slow horizontal drift */}
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
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-charcoal/55">
              M.E.S.S. · Ιωάννινα
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────── */

/**
 * SPLIT SPREAD — asymmetric, off-center magazine-style layout
 *   - Uses the full section width (no inner max-w wrapper) → not centered
 *   - Each tile is anchored via col-start / col-span so rows feel placed, not boxed
 *   - Row 1: wide LEFT-anchored + tall hanging RIGHT
 *   - Row 2: tall slightly LEFT + wide pushing to RIGHT edge (mirrored rhythm)
 *   - Row 3: cinematic wide anchored LEFT, empty space on the right
 *   - Images stay small via reduced col-spans (5/4/6 instead of 7/5)
 */
function SplitSpread() {
  return (
    <div className="relative mt-16 md:mt-24">

      {/* Eyebrow */}
      <div className="mb-8 flex items-center gap-3 md:mb-12">
        <span aria-hidden className="block h-px w-10 bg-mustard/70" />
        <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-charcoal/55">
          Λεπτομέρειες · ο χώρος μας
        </span>
      </div>

      {/* Row 1 — wide on LEFT (col 1–5), tall hanging RIGHT (col 8–11) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-start-1 md:col-span-5 md:-translate-y-4">
          <MaskRevealBlock direction="left">
            <KenBurnsTile
              src={images.new1}
              alt="Εσωτερικός χώρος του καφέ με φυσικό φως"
              aspect="aspect-[3/2]"
              caption="ΧΩΡΟΣ · Φυσικό φως"
              index="02"
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
              caption="ΛΕΠΤΟΜΕΡΕΙΕΣ · Υλικά & υφές"
              index="03"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </MaskRevealBlock>
        </div>
      </div>

      {/* Row 2 — tall slightly LEFT (col 2–5), wide pushing to RIGHT edge (col 7–12) */}
      <div className="mt-24 grid grid-cols-1 gap-6 md:mt-36 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-start-2 md:col-span-4 md:translate-y-12">
          <MaskRevealBlock direction="left">
            <KenBurnsTile
              src={images.aboutPlants}
              alt="Πυκνή βλάστηση σε μπετόνινο τοίχο"
              aspect="aspect-[4/5]"
              caption="ΦΥΤΑ · Πράσινο & φως"
              index="04"
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
              caption="ΥΛΙΚΑ · Φυσικά & ταπεινά"
              index="05"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </MaskRevealBlock>
        </div>
      </div>

      {/* Row 3 — wide cinematic anchored LEFT (col 1–9), empty col 10–12 with a vertical caption rail */}
      <div className="mt-24 grid grid-cols-1 gap-6 md:mt-36 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-start-1 md:col-span-9">
          <MaskRevealBlock direction="up">
            <KenBurnsTile
              src={images.aboutBar}
              alt="Μπαρ specialty coffee και περιοχή σερβιρίσματος"
              aspect="aspect-[16/9]"
              caption="ΤΟ BAR · Καθημερινό τελετουργικό"
              index="06"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </MaskRevealBlock>
        </div>
        {/* Vertical rail on the right side — balances the empty negative space */}
        <div className="hidden md:col-start-11 md:col-span-2 md:flex md:translate-y-2 md:flex-col md:items-start md:gap-4">
          <span aria-hidden className="block h-12 w-px bg-mustard/70" />
          <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-olive/80">
            Σειρά<br />6 σκηνών
          </p>
          <p className="font-serif text-[13px] italic leading-snug text-charcoal/60">
            από τον χώρο
          </p>
        </div>
      </div>

      {/* Pull-quote closer — anchored LEFT, not centered */}
      <Reveal delay={0.4} className="mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-start-2 md:col-span-7">
            <p className="font-serif text-[clamp(20px,2.2vw,28px)] italic leading-[1.4] text-charcoal/80">
              «Ένας χώρος μπροστά στη λίμνη — υγιεινό lifestyle, κοινότητα, ευεξία.»
            </p>
            <p className="mt-5 inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.32em] text-olive/80">
              <span aria-hidden className="block h-px w-8 bg-mustard/60" />
              M.E.S.S. · 2025
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
  caption,
  index,
  sizes,
}: {
  src: string
  alt: string
  aspect: string
  caption: string
  index: string
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
      <figcaption className="mt-3 flex items-baseline gap-3">
        <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">
          {index}
        </span>
        <span aria-hidden className="block h-px w-6 bg-mustard/50" />
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-olive/80">
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}

/* ───────────────────────────────────────────────────────────── */

function Tile({
  children,
  aspect,
  caption,
}: {
  children: ReactNode
  aspect: string
  caption: string
}) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {children}
      </div>
      <figcaption className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-olive/80">
        {caption}
      </figcaption>
    </figure>
  )
}
