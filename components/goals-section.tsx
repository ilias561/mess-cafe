'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AmbientVideo from '@/components/ambient-video'
import { EASE } from '@/lib/motion'
import { videoSrc } from '@/lib/media'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

const goals = [
  {
    num: '01',
    title: 'Modular',
    body: 'Τα πάντα στον χώρο κινούνται. Η κίνηση είναι η βασικότερη αρχή της ζωής.',
  },
  {
    num: '02',
    title: 'Events',
    body: 'Ο χώρος αλλάζει σχήμα ανάλογα με την περίσταση. Workshops, live, κοινοτικές συναντήσεις, παρουσιάσεις — ό,τι χωράει η στιγμή.',
  },
  {
    num: '03',
    title: 'Sustainable',
    body: 'Φρέσκες, τοπικές ύλες. Όσο λιγότερη επεξεργασία γίνεται — γάλα αμυγδάλου, βρώμης, καρυδιού, iceberg, τοματίνι από τον δικό μας μπαξέ.',
  },
  {
    num: '04',
    title: 'Space',
    body: 'Ο αγαπημένος μας χώρος. Ελπίζουμε και δικός σας.',
  },
]

/* ── #KEEPRISING circular seal ── */
function KeepRisingSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -6, scale: 0.88 }}
      whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE_TUPLE }}
      className="relative inline-flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-bone/25 md:h-[160px] md:w-[160px]"
      aria-label="#keeprising"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <path
            id="seal-circle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="rgba(245,241,232,0.45)"
          style={{ fontSize: '9.5px', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
        >
          <textPath href="#seal-circle">
            #KEEPRISING · #KEEPRISING ·{' '}
          </textPath>
        </text>
      </svg>
      <span
        className="font-serif text-[28px] leading-none tracking-tight text-bone/50"
        aria-hidden
      >
        ↑
      </span>
    </motion.div>
  )
}

export default function GoalsSection() {
  return (
    <section
      id="goals"
      className="relative scroll-mt-28 bg-olive-deep px-6 py-24 md:px-12 md:py-32"
    >
      {/* Thin terracotta rule at top */}
      <div className="mx-auto mb-20 max-w-[1400px]">
        <div className="h-px w-[60px] bg-terracotta/50" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">

        {/* ── LEFT: 7 cols ── */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard"
          >
            ΟΙ ΣΤΟΧΟΙ ΜΑΣ · #KEEPRISING
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-[16ch] font-serif text-[clamp(48px,6vw,88px)] leading-[1.02] tracking-tight text-bone"
          >
            Δεν είναι καφέ. Είναι ιδέα.
          </motion.h2>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-[560px] font-sans text-[17px] leading-[1.75] text-bone/80"
          >
            Ενότητα, δημιουργικότητα, ευεξία — αρμονικά δεμένα στον ίδιο χώρο.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
            className="mt-4 max-w-[560px] font-sans text-[17px] leading-[1.75] text-bone/80"
          >
            Ένας πιο χαλαρός τρόπος ζωής, μέσα στις πιεστικές ανάγκες του σήμερα.
          </motion.p>

          {/* Pull-quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
            className="mt-10 border-l-2 border-mustard/70 pl-6"
          >
            <p className="font-serif text-[20px] italic leading-snug text-bone/90 md:text-[22px]">
              «Τα πάντα ρεί.»
            </p>
            <p className="mt-2 font-sans text-[13px] not-italic text-concrete">
              — Ηράκλειτος
            </p>
          </motion.blockquote>

          {/* Numbered goals */}
          <div className="mt-12 flex flex-col gap-8">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE_TUPLE, delay: i * 0.1 }}
                className="flex gap-6 border-t border-bone/10 pt-6"
              >
                <span className="shrink-0 font-sans text-[13px] font-medium tabular-nums text-mustard/70">
                  {goal.num}.
                </span>
                <div>
                  <p className="font-serif text-[22px] leading-snug tracking-tight text-bone">
                    {goal.title}
                  </p>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-bone/65">
                    {goal.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
            className="mt-10"
          >
            <Link
              href="/actions"
              className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-10 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber hover:shadow-lg"
            >
              Δες τις δράσεις μας
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" aria-hidden>
                <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: 5 cols — Keep Rising IG post card ── */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE_TUPLE }}
          >
            {/* Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]">
              <Image
                src="/images/keep-rising-2.jpg"
                alt="Η ομάδα του M.E.S.S. με τις προσφορές του μπαζάρ Keep Rising για τη μονή Ντουραχάνι"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Eyebrow row */}
            <div className="mt-5 flex items-center gap-3">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-terracotta" aria-hidden />
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
                8 ΜΑΡΤΙΟΥ · #KEEPRISING
              </p>
            </div>

            {/* Caption */}
            <div className="mt-4 max-w-[40em] font-sans text-[14px] leading-[1.7] text-bone/70">
              <p>Ένα μεγάλο ευχαριστώ σε όλους όσους στήριξαν το μπαζάρ μας με την παρουσία και την αγάπη τους. 🖤</p>
              <p className="mt-3">Χάρη σε εσάς καταφέραμε να προσφέρουμε για φιλανθρωπικό σκοπό παπούτσια, φρούτα, λαχανικά και χαρτικά είδη στα παιδάκια που φιλοξενεί η μονή Ντουραχάνι.</p>
              <p className="mt-3">Με το Keep Rising προσπαθούμε μέσα από τέτοιες δράσεις να περνάμε αξίες προσφοράς και αλληλεγγύης.</p>
              <p className="mt-3">Ευχαριστούμε θερμά και τους συνεργάτες μας για τη στήριξη.</p>
            </div>

            {/* Mentions */}
            <p className="mt-4 font-sans text-[13px] leading-[1.6] text-bone/55">
              <a href="https://www.instagram.com/cage.thrift/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@cage.thrift</a>{' '}
              <a href="https://www.instagram.com/rare_pair_kicks/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@rare_pair_kicks</a>{' '}
              <a href="https://www.instagram.com/coolwolf_store/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@coolwolf_store</a>{' '}
              <a href="https://www.instagram.com/vintagecloset_skg/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@vintagecloset_skg</a>{' '}
              <a href="https://www.instagram.com/planet_m_jewelry/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@planet_m_jewelry</a>{' '}
              <a href="https://www.instagram.com/tane_twatattoo/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@tane_twatattoo</a>{' '}
              <a href="https://www.instagram.com/asanakis._/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@asanakis._</a>{' '}
              <a href="https://www.instagram.com/apostolos_cortez/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@apostolos_cortez</a>{' '}
              <a href="https://www.instagram.com/_karydis/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">@_karydis</a>
            </p>

            {/* Hashtags */}
            <p className="mt-3 font-sans text-[13px] text-mustard/70">
              <a href="https://www.instagram.com/explore/tags/messioannina/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">#messioannina</a>{' '}
              <a href="https://www.instagram.com/explore/tags/keeprising/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">#keeprising</a>
            </p>

            {/* Footer link */}
            <div className="mt-6">
              <a
                href="https://www.instagram.com/p/DVn6qGhlgVW/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[12px] uppercase tracking-[0.18em] text-bone/50 underline decoration-terracotta underline-offset-[5px] hover:decoration-2"
              >
                Δες την ανάρτηση στο Instagram →
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Cinematic video strip */}
      <div className="mt-16 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="overflow-hidden rounded-[2px]"
          style={{ aspectRatio: '16/9' }}
        >
          <AmbientVideo
            srcs={[videoSrc('/videos/ai/hf-2.mp4'), videoSrc('/videos/ai/hf-1.mp4')]}
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            ariaHidden
          />
        </motion.div>
      </div>

      {/* ── #KEEPRISING seal — bottom-right, overlapping boundary ── */}
      <div className="absolute bottom-0 right-6 translate-y-1/2 md:right-12">
        <KeepRisingSeal />
      </div>
    </section>
  )
}
