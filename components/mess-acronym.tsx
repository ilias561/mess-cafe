'use client'

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ease } from '@/lib/motion'

/* ── MESS acronym: Modular · Events · Sustainable · Space ── */
const messPillars = [
  {
    letter: 'M.',
    word: 'Modular',
    body: 'Τα πάντα κινούνται. Η κίνηση είναι η βασικότερη αρχή της ζωής.',
    footnote: 'τα πάντα ρεί — Ηράκλειτος',
  },
  {
    letter: 'E.',
    word: 'Events',
    body: 'Ο χώρος μετασχηματίζεται. Από καφέ, σε workshop, σε σκηνή για events. Κάθε μέρα μπορεί να πάρει άλλο σχήμα.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Sustainable',
    body: 'Επιλογές που σέβονται το σώμα, τον άνθρωπο, τη λίμνη.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Space',
    body: '1ος όροφος, ΚΕΠΑΒΙ. Ιωάννινα. Μπροστά στη λίμνη.',
    footnote: undefined,
  },
]

const desktopOffsets = [
  { x: -120, y: -80 },
  { x: 120, y: -80 },
  { x: -120, y: 80 },
  { x: 120, y: 80 },
] as const

const mobileOffsets = [-40, 40, -40, 40] as const

export default function MessAcronym() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const rowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.94, 1])
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, 40])

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <m.section
      ref={sectionRef}
      aria-label="M.E.S.S. — Modular, Events, Sustainable, Space"
      className="border-y border-line bg-gradient-to-b from-cream via-bone-warm to-bone-warm px-6 py-14 md:min-h-[50vh] md:px-12 md:py-20"
      style={reduce || !isDesktop ? undefined : { backgroundPositionY: bgShift }}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="text-center font-sans text-[11px] uppercase tracking-[0.16em] text-olive">Τι σημαίνει M.E.S.S.</p>

        <m.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6"
          style={reduce || !isDesktop ? undefined : { scale: rowScale }}
        >
          {messPillars.map((pillar, idx) => (
            <m.article
              key={`${pillar.letter}-${pillar.word}-${idx}`}
              className="ui-card-elevated group/col flex flex-col gap-3 rounded-[3px] border border-line/40 bg-bone-warm p-6 transition-opacity duration-250 focus-within:opacity-100 md:p-5"
              tabIndex={0}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              onFocusCapture={() => setHoveredIndex(idx)}
              onBlurCapture={() => setHoveredIndex(null)}
              animate={{
                opacity: hoveredIndex === null || hoveredIndex === idx ? 1 : 0.55,
              }}
              transition={{ duration: 0.25 }}
            >
              <m.p
                className="font-serif leading-none tracking-tight text-charcoal"
                style={{ fontSize: 'clamp(120px,18vw,240px)' }}
                aria-hidden
                initial={
                  reduce
                    ? false
                    : {
                        x: isDesktop ? desktopOffsets[idx].x : mobileOffsets[idx],
                        y: isDesktop ? desktopOffsets[idx].y : 0,
                        opacity: 0,
                      }
                }
                whileInView={reduce ? undefined : { x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, ease: ease.outStrong, delay: idx * 0.08 }}
                whileHover={reduce ? undefined : { scale: 1.08 }}
              >
                {pillar.letter.replace('.', '')}
                <span className="text-mustard">.</span>
              </m.p>
              <div>
                <m.p
                  className="inline-block border-b border-transparent font-serif text-[32px] leading-snug tracking-tight text-charcoal transition-all duration-250 group-hover/col:-translate-y-1 group-hover/col:border-mustard group-focus-within/col:-translate-y-1 group-focus-within/col:border-mustard"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease: ease.outStrong, delay: idx * 0.08 + 0.3 }}
                >
                  {pillar.word}
                </m.p>
                <p className="mt-2 max-w-[22ch] font-sans text-[13px] leading-relaxed text-concrete opacity-60 transition-opacity duration-250 group-hover/col:opacity-100 group-focus-within/col:opacity-100">
                  {pillar.body}
                </p>
                {pillar.footnote && (
                  <p className="mt-3 max-w-[22ch] font-serif text-[12px] italic text-concrete opacity-60 transition-opacity duration-250 group-hover/col:opacity-100 group-focus-within/col:opacity-100">
                    {pillar.footnote}
                  </p>
                )}
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </m.section>
  )
}
