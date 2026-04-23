'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import MaskReveal from '@/components/mask-reveal'
import { EASE } from '@/lib/motion'
import { images } from '@/lib/images'

const paragraphs = [
  'Το M.E.S.S. γεννήθηκε από δύο ανθρώπους που ήθελαν να φτιάξουν ένα μέρος με ρυθμό, αλλά χωρίς θόρυβο. Στον 1ο όροφο του ΚΕΠΑΒΙ, στην Ιωάννινα, το Κεραμί έγινε η αφορμή να στηθεί ένας χώρος που αγκαλιάζει την πόλη χωρίς να την ακολουθεί βιαστικά.',
  'Η φιλοσοφία μας μένει σταθερή: specialty καφές με συνέπεια, φαγητό ως φάρμακο και καθημερινές επιλογές που στηρίζουν σώμα και ενέργεια. Κάθε φλιτζάνι και κάθε πιάτο υπηρετεί την ίδια ιδέα: ποιότητα με καθαρή πρόθεση.',
  'Ανάμεσα στις ταχύτητες της ημέρας, το M.E.S.S. λειτουργεί σαν ήσυχο καταφύγιο. Ένα σημείο για εργασία, για σύνδεση, για μικρές παύσεις που τελικά γίνονται ιστορίες.',
]

const bodyVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const paraVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export default function StoriaSection() {
  return (
    <section
      id="philosophy"
      className="relative scroll-mt-20 overflow-hidden px-6 py-32 md:px-12"
      style={{ backgroundColor: '#2A2520' }}
    >
      {/* SVG noise texture overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        aria-hidden
      >
        <filter id="noise-storia">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-storia)" />
      </svg>

      {/* Radial mustard glow top-left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(212,165,80,0.13), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">

        {/* ── Left: text (60%) ── */}
        <div className="order-2 md:order-1 md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 font-sans text-[11px] uppercase tracking-[0.22em] text-mustard/80"
          >
            Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ
          </motion.p>

          {/* Heading with clip-path mask reveal */}
          <MaskReveal className="mb-10" delay={0.05}>
            <h2
              className="font-serif text-[clamp(32px,4.5vw,60px)] leading-[1.08] tracking-tight text-balance"
              style={{ color: '#F5F0E6' }}
            >
              Ξεκινήσαμε με ένα φλιτζάνι. Τώρα έχουμε 211 ιστορίες.
            </h2>
          </MaskReveal>

          {/* Staggered paragraphs */}
          <motion.div
            variants={bodyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-6"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={paraVariants}
                className="max-w-[580px] font-sans text-[16px] leading-[1.75]"
                style={{ color: 'rgba(245,240,230,0.72)' }}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* Signature + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
            className="mt-12 flex flex-col gap-6"
          >
            <p
              className="font-serif text-[15px] italic"
              style={{ color: 'rgba(245,240,230,0.45)' }}
            >
              — Οι ιδρυτές του M.E.S.S.
            </p>

            <Link
              href="#menu"
              className="group inline-flex w-fit items-center gap-1.5 font-sans text-sm font-medium"
              style={{ color: '#e8b547' }}
            >
              Δες το μενού
              <span
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
              <span
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-mustard transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Right: portrait image with offset frame (40%) ── */}
        <div className="order-1 flex items-start justify-center md:order-2 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative w-full max-w-[400px]"
          >
            {/* Decorative mustard frame offset 12px bottom-right */}
            <div
              className="pointer-events-none absolute z-0 rounded-[4px] border"
              style={{
                inset: 0,
                transform: 'translate(12px, 12px)',
                borderColor: 'rgba(232,181,71,0.35)',
              }}
              aria-hidden
            />

            {/* Photo */}
            <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-[#3a3028]">
              <Image
                src={images.aboutBar}
                alt="Το bar και η ζώνη σέρβις του M.E.S.S."
                fill
                unoptimized
                loading="lazy"
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
