'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { ingredientStandards } from '@/lib/ingredient-standards'

export default function IngredientStandards() {
  return (
    <section className="bg-bone px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[60ch]"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">Τα πρότυπά μας</p>
          <h2 className="mt-2 font-serif text-[clamp(26px,3.5vw,40px)] italic leading-tight tracking-tight text-charcoal">
            Καθαρά υλικά, χωρίς συμβιβασμούς.
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-concrete">
            Κάθε πιάτο ξεκινά από αυτό που βάζουμε μέσα. Επιλέγουμε συστατικά και μεθόδους που είναι καλύτερα από τις
            συνηθισμένες εναλλακτικές.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 md:mt-14 lg:grid-cols-6">
          {ingredientStandards.map((it, i) => (
            <motion.article
              key={it.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
              className="flex flex-col items-start"
            >
              <div className="aspect-square w-full max-w-[96px] overflow-hidden rounded-full bg-bone-warm">
                <img
                  src={`/images/ingredients/${it.slug}.jpg`}
                  alt={it.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <h3 className="mt-3 font-serif text-[16px] italic leading-snug tracking-tight text-charcoal">
                {it.name}
              </h3>
              <p className="mt-1 font-sans text-[12px] leading-relaxed text-concrete">{it.better}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
