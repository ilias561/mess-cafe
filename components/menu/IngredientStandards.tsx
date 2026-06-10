'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'
import StaticPicture from '@/components/static-picture'
import { ingredientStandards } from '@/lib/ingredient-standards'

export default function IngredientStandards() {
  return (
    <section className="bg-bone px-6 py-14 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <m.div
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
        </m.div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:gap-8 lg:grid-cols-3">
          {ingredientStandards.map((it, i) => (
            <m.article
              key={it.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
              className="ui-card-elevated group overflow-hidden rounded-[2px] border border-line/60 bg-bone-warm"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-canopy-night">
                <StaticPicture
                  src={`/images/ingredients/${it.slug}.jpg`}
                  alt={it.name}
                  className="ui-img-hover h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[18px] italic leading-snug tracking-tight text-charcoal">
                  {it.name}
                </h3>
                <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-concrete">{it.better}</p>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
