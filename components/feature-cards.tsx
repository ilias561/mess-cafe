'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
        <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
        <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Specialty Coffee',
    body: 'Single-origin, μικρά ψητήρια, χειροποίητα φλιτζάνια. Κάθε κόκκος έχει ιστορία.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="5" r="3" />
      </svg>
    ),
    title: 'Healthy Brunch',
    body: 'Poke bowls, acai, smoothies και γλυκά χωρίς ζάχαρη. Τροφή που σε κρατά ζωντανό.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeLinecap="round" />
      </svg>
    ),
    title: 'Lake Views',
    body: 'Στον 1ο όροφο του ΚΕΠΑΒΙ, με θέα στη λίμνη Ιωαννίνων. Ένα σκηνικό για ήσυχα πρωινά.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Community',
    body: 'Events, workshops, open mics. Ένα μέρος για να γνωριστείς με ανθρώπους που αξίζει.',
  },
]

export default function FeatureCards() {
  return (
    <section className="border-t border-line/30 bg-cream px-6 pb-20 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE_TUPLE, delay: i * 0.08 }}
              className="flex flex-col gap-4 rounded-2xl border border-line/40 bg-bone-warm/60 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-olive/8">
                {card.icon}
              </div>
              <div>
                <p className="font-serif text-[18px] leading-snug tracking-tight text-charcoal">
                  {card.title}
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-concrete">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
