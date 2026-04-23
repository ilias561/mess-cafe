'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, fadeUpDelayed } from '@/lib/motion'

export default function BlogIndexHero() {
  return (
    <section className="px-6 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-12">
        <div>
          <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΙΣΤΟΡΙΕΣ ΑΠΟ ΤΟ M.E.S.S.
          </motion.p>
          <motion.h1
            {...fadeUpDelayed(0.08)}
            className="mt-6 max-w-[14ch] font-serif text-[clamp(44px,6.5vw,96px)] leading-[0.98] tracking-[-0.02em] text-charcoal md:max-w-[16ch]"
          >
            Καφές, γεύσεις και ό,τι συμβαίνει στην κοινότητα.
          </motion.h1>
          <motion.p
            {...fadeUpDelayed(0.14)}
            className="mt-8 max-w-[70ch] font-sans text-[16px] leading-[1.7] text-concrete md:text-[17px]"
          >
            Σημειώσεις από την κουζίνα, τους μπαρίστα και τους ανθρώπους που γεμίζουν τον χώρο.
          </motion.p>
        </div>

        <motion.div {...fadeUpDelayed(0.2)} className="relative mx-auto w-full max-w-[420px] md:mx-0 md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80&auto=format&fit=crop"
              alt="Ατμοσφαιρική γωνία καφέ με χαμηλό φωτισμό"
              fill
              sizes="(min-width: 768px) 34vw, 92vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
