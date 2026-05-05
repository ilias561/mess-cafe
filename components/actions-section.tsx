'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'
import AmbientVideo from '@/components/ambient-video'

const MAX_VISIBLE = 3

type ActionsSectionProps = {
  actionCards: Event[]
}

export default function ActionsSection({ actionCards }: ActionsSectionProps) {
  const visible = actionCards.slice(0, MAX_VISIBLE)
  const hasMore = actionCards.length > MAX_VISIBLE

  return (
    <section id="actions" className="scroll-mt-24 bg-bone px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Cinematic video strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mb-10 overflow-hidden rounded-[2px]"
          style={{ aspectRatio: '16/9' }}
        >
          <AmbientVideo
            srcs={['/videos/ai/hf-2.mp4', '/videos/ai/hf-1.mp4']}
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            ariaHidden
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-10 max-w-[860px]"
        >
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΔΡΑΣΕΙΣ · COMMUNITY</p>
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] leading-[1.04] tracking-tight text-charcoal">
            Περισσότερο από έναν καφέ.
          </h2>
          <p className="mt-4 max-w-3xl font-sans text-[15px] leading-relaxed text-concrete">
            Workshops, πολιτιστικές βραδιές, παρουσιάσεις βιβλίων, live μουσική. Ο χώρος μας γίνεται σκηνή για τις ιστορίες των Ιωαννίνων.
          </p>
        </motion.div>

        {visible.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {visible.map((card, index) => (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
              >
                <Link
                  href={`/actions/${card.slug}`}
                  className="group/card flex flex-col overflow-hidden rounded-[2px] bg-bone-warm shadow-[0_2px_10px_rgba(43,43,40,0.06)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(43,43,40,0.11)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.coverImage}
                      alt={card.coverAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
                      style={{ objectPosition: card.coverObjectPosition ?? 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col gap-1.5 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-terracotta" aria-hidden />
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-olive">{card.categoryLabel}</p>
                    </div>
                    <h3 className="font-serif text-[20px] leading-tight tracking-tight text-charcoal">
                      {card.title}
                    </h3>
                    <p className="line-clamp-2 font-sans text-[13px] leading-relaxed text-concrete">
                      {card.description}
                    </p>
                    <span className="mt-2 inline-block font-sans text-[13px] text-charcoal underline decoration-mustard underline-offset-[4px] transition-colors duration-150 group-hover/card:text-terracotta group-hover/card:decoration-terracotta">
                      Μάθε περισσότερα →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          {hasMore ? (
            <Link
              href="/actions"
              className="inline-block rounded-[2px] border border-charcoal/20 bg-bone-warm px-6 py-3 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:border-charcoal/40 hover:shadow-[0_4px_16px_rgba(43,43,40,0.08)]"
            >
              Δες όλες τις δράσεις ({actionCards.length}) →
            </Link>
          ) : (
            <Link
              href="/actions"
              className="inline-block font-sans text-sm font-medium text-charcoal underline decoration-mustard underline-offset-[6px]"
            >
              Δες όλες τις δράσεις →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
