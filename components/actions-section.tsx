'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type ActionsSectionProps = {
  actionCards: Event[]
}

export default function ActionsSection({ actionCards }: ActionsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!scrollerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current
    const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0)
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < maxScrollLeft - 4)
  }

  useEffect(() => {
    updateScrollState()
    const node = scrollerRef.current
    if (!node) return
    node.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      node.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [actionCards.length])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return
    const card = scrollerRef.current.querySelector('article')
    const cardWidth = card instanceof HTMLElement ? card.offsetWidth : 320
    const gap = 20
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }

  return (
    <section id="actions" className="group scroll-mt-24 bg-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-12 max-w-[860px]"
        >
          <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΔΡΑΣΕΙΣ · COMMUNITY</p>
          <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[1.04] tracking-tight text-charcoal">
            Περισσότερο από έναν καφέ.
          </h2>
          <p className="mt-5 max-w-3xl font-sans text-[16px] leading-relaxed text-concrete">
            Workshops, πολιτιστικές βραδιές, παρουσιάσεις βιβλίων, live μουσική. Ο χώρος μας γίνεται σκηνή για τις ιστορίες των Ιωαννίνων.
          </p>
        </motion.div>

        <div className="relative hidden md:block">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#e8b547 #efe8d8' }}
          >
            {actionCards.map((card, index) => (
              <motion.article
                key={card.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
                className="group/card flex h-[420px] min-w-[320px] snap-start flex-col overflow-hidden rounded-[2px] border border-line/50 bg-bone-warm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(43,43,40,0.10)]"
              >
                <div className="relative h-[60%] overflow-hidden">
                  <Image
                    src={card.coverImage}
                    alt={card.coverAlt}
                    fill
                    loading="lazy"
                    sizes="320px"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover/card:scale-[1.04]"
                  />
                </div>
                <div className="flex h-[40%] flex-col px-5 py-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{card.categoryLabel}</p>
                  <h3 className="mt-2 font-serif text-[24px] leading-tight tracking-tight text-charcoal">{card.title}</h3>
                  <p className="mt-2 line-clamp-2 font-sans text-[14px] leading-relaxed text-concrete">{card.description}</p>
                  <span className="mt-auto inline-block font-sans text-sm text-charcoal underline decoration-mustard underline-offset-[5px]">
                    Μάθε περισσότερα →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block">
            <button
              type="button"
              aria-label="Προηγούμενες δράσεις"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              className="pointer-events-auto absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/70 bg-bone/95 text-charcoal transition-all duration-200 hover:-translate-y-[52%] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Επόμενες δράσεις"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              className="pointer-events-auto absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/70 bg-bone/95 text-charcoal transition-all duration-200 hover:-translate-y-[52%] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:hidden">
          {actionCards.map((card, index) => (
            <motion.article
              key={card.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: EASE, delay: index * 0.12 }}
              className="overflow-hidden rounded-[2px] border border-line/50 bg-bone-warm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.coverImage}
                  alt={card.coverAlt}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{card.categoryLabel}</p>
                <h3 className="mt-2 font-serif text-[30px] leading-[1.02] tracking-tight text-charcoal">{card.title}</h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-concrete">{card.description}</p>
                <span className="mt-3 inline-block font-sans text-sm text-charcoal underline decoration-mustard underline-offset-[5px]">
                  Μάθε περισσότερα →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

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
