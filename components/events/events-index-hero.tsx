'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MaskReveal from '@/components/mask-reveal'
import { fadeUp, fadeUpDelayed } from '@/lib/motion'

export default function EventsIndexHero() {
  return (
    <section className="px-6 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-12">
        <div>
          <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΟΙ ΔΡΑΣΕΙΣ ΜΑΣ
          </motion.p>
          <motion.h1
            {...fadeUpDelayed(0.08)}
            className="mt-6 max-w-[14ch] font-serif text-[clamp(44px,6.5vw,96px)] leading-[0.98] tracking-[-0.02em] text-charcoal md:max-w-[16ch]"
          >
            Περισσότερο από έναν καφέ.
          </motion.h1>
          <motion.p
            {...fadeUpDelayed(0.14)}
            className="mt-8 max-w-[72ch] font-sans text-[16px] leading-[1.7] text-concrete md:text-[17px]"
          >
            Workshops, μουσικές βραδιές, πολιτιστικά ραντεβού και συνεργασίες που κρατούν τον χώρο μας ανοιχτό στην κοινότητα.
          </motion.p>
        </div>

        <MaskReveal className="relative mx-auto w-full max-w-[420px] md:mx-0 md:max-w-none" delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80&auto=format&fit=crop"
              alt="Ζεστό στιγμιότυπο live μουσικής σε μικρό χώρο"
              fill
              sizes="(min-width: 768px) 34vw, 92vw"
              className="object-cover"
            />
          </div>
        </MaskReveal>
      </div>
    </section>
  )
}
