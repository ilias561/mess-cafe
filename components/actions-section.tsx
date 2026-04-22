'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '@/lib/motion'

const actionCards = [
  {
    eyebrow: 'WORKSHOP',
    title: 'Workshops καφέ',
    description: 'Barista training και specialty coffee tastings για ομάδες και αρχάριους.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=960&q=80&auto=format&fit=crop',
  },
  {
    eyebrow: 'ΠΟΛΙΤΙΣΜΟΣ',
    title: 'Πολιτιστικές βραδιές',
    description: 'Ποίηση, παρουσιάσεις βιβλίων και talks που φέρνουν κόσμο γύρω από ιδέες.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=960&q=80&auto=format&fit=crop',
  },
  {
    eyebrow: 'ΜΟΥΣΙΚΗ',
    title: 'Live μουσική',
    description: 'Τζαζ και ακουστικά sets από local artists σε χαμηλό, ατμοσφαιρικό φωτισμό.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=960&q=80&auto=format&fit=crop',
  },
  {
    eyebrow: 'ΣΥΝΕΡΓΑΣΙΑ',
    title: 'Τοπικές συνεργασίες',
    description: 'Δράσεις με τοπικούς παραγωγούς και δημιουργικά brands της περιοχής.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=960&q=80&auto=format&fit=crop',
  },
] as const

export default function ActionsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -360 : 360,
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
          <button
            type="button"
            aria-label="Προηγούμενες δράσεις"
            onClick={() => scrollByAmount('left')}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/70 bg-bone/95 text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Επόμενες δράσεις"
            onClick={() => scrollByAmount('right')}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/70 bg-bone/95 text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-24"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#e8b547 #efe8d8' }}
          >
            {actionCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
                className="group/card flex h-[420px] min-w-[320px] snap-start flex-col overflow-hidden rounded-[2px] border border-line/50 bg-bone-warm transition-all duration-400 ease-out hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-[60%] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    loading="lazy"
                    sizes="320px"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover/card:scale-[1.04]"
                  />
                </div>
                <div className="flex h-[40%] flex-col px-5 py-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{card.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-[24px] leading-tight tracking-tight text-charcoal">{card.title}</h3>
                  <p className="mt-2 line-clamp-2 font-sans text-[14px] leading-relaxed text-concrete">{card.description}</p>
                  <span className="mt-auto inline-block font-sans text-sm text-charcoal underline decoration-mustard underline-offset-[5px]">
                    Μάθε περισσότερα →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 md:hidden">
          {actionCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: EASE, delay: index * 0.12 }}
              className="overflow-hidden rounded-[2px] border border-line/50 bg-bone-warm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{card.eyebrow}</p>
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
