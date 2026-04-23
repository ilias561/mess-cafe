'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Image from 'next/image'
import MaskReveal from '@/components/mask-reveal'
import { EASE } from '@/lib/motion'
import { images } from '@/lib/images'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

const imageReveal = {
  initial: { opacity: 0, y: 64, scale: 1.04 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-15% 0px -15% 0px' },
  transition: { duration: 1.1, ease: EASE_TUPLE },
}

const aboutImages = [
  {
    key: 'aboutInterior',
    src: images.aboutInterior,
    alt: 'Café interior with plants and natural light',
    aspect: 'aspect-[4/5]',
    caption: 'Ο ΠΡΩΤΟΣ ΟΡΟΦΟΣ',
  },
  {
    key: 'aboutBar',
    src: images.aboutBar,
    alt: 'Coffee bar and service area',
    aspect: 'aspect-[3/2]',
    caption: 'ΤΟ BAR',
  },
  {
    key: 'aboutStairs',
    src: images.aboutStairs,
    alt: 'Stairs and workspace seating',
    aspect: 'aspect-square',
    caption: 'ΣΚΑΛΑ ΠΡΟΣ ΜΕΖΟΝΙ',
  },
  {
    key: 'aboutPlants',
    src: images.aboutPlants,
    alt: 'Dense plants against concrete',
    aspect: 'aspect-[4/5]',
    caption: 'ΦΥΤΑ & ΦΩΣ',
  },
] as const

function CountUp({
  to,
  duration = 1.2,
  decimals = 0,
}: {
  to: number
  duration?: number
  decimals?: number
}) {
  const [display, setDisplay] = useState('0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : ''))
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, to, {
      duration,
      ease: EASE_TUPLE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => ctrl.stop()
  }, [inView, to, duration, decimals])

  return <span ref={ref}>{display}</span>
}

const stats = [
  {
    id: 'rating',
    // Fade-in the final value — a rating isn't a quantity you "count up to"
    renderValue: () => (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE_TUPLE }}
      >
        4.8★
      </motion.span>
    ),
    label: '165 κριτικές Google',
  },
  {
    id: 'hours',
    renderValue: () => <>08—22</>,
    label: '7 μέρες την εβδομάδα',
  },
  {
    id: 'floor',
    renderValue: () => <>#211</>,
    label: 'ΚΕΠΑΒΙ · Ιωάννινα',
  },
] as const

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-line/30 bg-cream px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">

        {/* LEFT: sticky */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <motion.p
              className="eyebrow mb-6 font-sans text-olive"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              Ο ΧΩΡΟΣ
            </motion.p>

            <MaskReveal className="mb-8" delay={0.06}>
              <h2 className="font-serif text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-tight text-balance text-charcoal">
                Ένας χώρος που μένει στο μυαλό.
              </h2>
            </MaskReveal>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
              className="mb-6 max-w-md font-sans text-[17px] leading-relaxed text-concrete"
            >
              Δύο επίπεδα, άφθονο πράσινο και θέα στη λίμνη Ιωαννίνων. Ένα σκηνικό για ήσυχα πρωινά, δημιουργικές συναντήσεις και brunch που θυμάσαι.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
              className="max-w-md font-sans text-[17px] leading-relaxed text-concrete"
            >
              Ανοιχτά 08:00 — 22:00, 7 μέρες την εβδομάδα.
            </motion.p>

            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  className="min-w-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.22 + i * 0.08 }}
                >
                  <p className="font-serif text-[clamp(36px,8vw,48px)] leading-none tracking-tight text-charcoal">
                    {stat.renderValue()}
                  </p>
                  <p className="mt-2 font-sans text-[10px] uppercase leading-snug tracking-[0.16em] text-olive sm:text-[11px]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: natural flow, taller than left */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {aboutImages.map((img, i) => (
            <div key={img.key}>
              <motion.div
                {...imageReveal}
                transition={{ ...imageReveal.transition, delay: i * 0.12 }}
                className={`relative w-full overflow-hidden ${img.aspect}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 + 0.3 }}
                className="eyebrow mt-2 font-sans text-olive"
              >
                {img.caption}
              </motion.p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
