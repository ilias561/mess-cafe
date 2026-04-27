'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type ActionsSectionProps = {
  actionCards: Event[]
}

export default function ActionsSection({ actionCards }: ActionsSectionProps) {
  return (
    <section id="actions" className="scroll-mt-24 bg-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-14 max-w-[860px]"
        >
          <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΔΡΑΣΕΙΣ · COMMUNITY</p>
          <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[1.04] tracking-tight text-charcoal">
            Περισσότερο από έναν καφέ.
          </h2>
          <p className="mt-5 max-w-3xl font-sans text-[16px] leading-relaxed text-concrete">
            Workshops, πολιτιστικές βραδιές, παρουσιάσεις βιβλίων, live μουσική. Ο χώρος μας γίνεται σκηνή για τις ιστορίες των Ιωαννίνων.
          </p>
        </motion.div>

        {actionCards.length > 0 && (
          <div
            className={`grid gap-6 ${
              actionCards.length === 1
                ? 'grid-cols-1 md:max-w-[520px]'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {actionCards.map((card, index) => (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
              >
                <Link
                  href={`/actions/${card.slug}`}
                  className="group/card flex flex-col overflow-hidden rounded-[2px] bg-bone-warm shadow-[0_2px_12px_rgba(43,43,40,0.06)] transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(43,43,40,0.12)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={card.coverImage}
                      alt={card.coverAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
                      style={{ objectPosition: card.coverObjectPosition ?? 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col gap-2 p-6">
                    <div className="flex items-center gap-2">
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-terracotta" aria-hidden />
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-olive">{card.categoryLabel}</p>
                    </div>
                    <h3 className="font-serif text-[clamp(22px,2.5vw,28px)] leading-tight tracking-tight text-charcoal">
                      {card.title}
                    </h3>
                    <p className="line-clamp-2 font-sans text-[14px] leading-relaxed text-concrete">
                      {card.description}
                    </p>
                    <span className="mt-3 inline-block font-sans text-sm text-charcoal underline decoration-mustard underline-offset-[5px] transition-colors duration-150 group-hover/card:text-terracotta group-hover/card:decoration-terracotta">
                      Μάθε περισσότερα →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/actions"
            className="inline-block font-sans text-sm font-medium text-charcoal underline decoration-mustard underline-offset-[6px]"
          >
            Δες όλες τις δράσεις →
          </Link>
        </div>
      </div>
    </section>
  )
}
