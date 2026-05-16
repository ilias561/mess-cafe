'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { duration, ease } from '@/lib/motion'

type PreviewItem = {
  cat: string
  catId: string
  name: string
  desc: string
  price: string
  image?: string
  video?: string
}

const items: PreviewItem[] = [
  {
    cat: 'BRUNCH',
    catId: 'brunch',
    name: 'Avocado Toast',
    desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
    price: '9€',
    image: '/images/menu/piata-0009.jpg',
  },
  {
    cat: 'BOWLS',
    catId: 'bowls',
    name: 'Teriyaki Chicken Poke Bowl',
    desc: 'Άγριο ρύζι, κοτόπουλο τεριγιάκι, λαχανικά, αυγό ποσέ, σουσάμι.',
    price: '11€',
    image: '/images/menu/piata-0025.jpg',
  },
  {
    cat: 'TREATS',
    catId: 'treats',
    name: 'Chia Pudding',
    desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.',
    price: '4€',
    image: '/images/menu/glyka-0002.jpg',
  },
  {
    cat: 'TREATS',
    catId: 'treats',
    name: 'Chocolate Cake',
    desc: 'Με γλυκοπατάτα, χουρμάδες, χωρίς ζάχαρη.',
    price: '3.5€',
    image: '/images/menu/glyka-0004.jpg',
  },
]

function PreviewCardMedia({ item }: { item: PreviewItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !item.video) return

    let hasPlayed = false
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true
            void video.play().catch(() => {})
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [item.video])

  if (item.video) {
    return (
      <video
        ref={videoRef}
        src={item.video}
        muted
        playsInline
        preload="metadata"
        aria-label={item.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-signature)] group-hover:scale-[1.03]"
        onEnded={(e) => {
          e.currentTarget.pause()
        }}
      />
    )
  }

  if (item.image) {
    return (
      <FadeImage
        src={item.image}
        alt={item.name}
        width={640}
        height={800}
        unoptimized
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-signature)] group-hover:scale-[1.03]"
      />
    )
  }

  return null
}

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
}

const lineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
}

export default function MenuPreview() {
  return (
    <section id="menu" className="scroll-mt-28 bg-bone-warm px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 font-sans text-olive">MENU HIGHLIGHTS</p>
            <h2 className="font-serif text-[clamp(40px,5vw,56px)] leading-[1.02] tracking-tight text-charcoal">
              Αγαπημένα μας.
            </h2>
          </div>
          <div>
            <Link
              href="/menu"
              className="ui-link font-sans text-sm font-medium text-olive underline decoration-line underline-offset-[6px] transition-opacity duration-200 ease-out hover:opacity-70"
            >
              Όλο το menu →
            </Link>
          </div>
        </Reveal>

        <Reveal asGroup className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {items.map((item) => (
            <Reveal.Item key={item.name}>
              <Link href={`/menu#${item.catId}`} className="block w-full text-inherit no-underline">
                <motion.article
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  transition={{ duration: duration.fast, ease: ease.out }}
                  className="group w-full"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-bone">
                    <PreviewCardMedia item={item} />
                  </div>

                  <div className="mt-4">
                    <div className="flex w-full items-center justify-between">
                      <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{item.cat}</p>
                      <p className="shrink-0 font-serif text-[18px] text-mustard">{item.price}</p>
                    </div>
                    <div className="relative mt-1 inline-block max-w-full">
                      <h3 className="font-serif text-[22px] leading-snug tracking-tight text-charcoal">{item.name}</h3>
                      <motion.span
                        variants={lineVariants}
                        transition={{ duration: duration.base, ease: ease.out }}
                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-olive"
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 font-sans text-[13px] leading-relaxed text-concrete">{item.desc}</p>
                  </div>
                </motion.article>
              </Link>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
