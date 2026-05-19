'use client'

import { FadeImage } from '@/components/fade-image'
import { Reveal } from '@/components/reveal'
import { todaysSpecials } from '@/lib/menu-featured'

export default function MenuSpecialsSection() {
  return (
    <section id="specials" className="scroll-mt-[140px] border-b border-line/30 bg-bone px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΗΜΕΡΑ</p>
          <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight text-charcoal">
            Προτεινόμενα Σήμερα
          </h2>
        </Reveal>

        <Reveal asGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {todaysSpecials.map((item) => (
            <Reveal.Item key={item.name}>
              <article className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {item.image ? (
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[2px] bg-bone-warm sm:w-[140px]">
                    <FadeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="flex aspect-square w-full shrink-0 items-center justify-center rounded-[2px] bg-bone-warm sm:w-[140px]"
                    aria-hidden
                  />
                )}
                <div className="min-w-0">
                  <h3 className="font-serif text-[22px] leading-snug tracking-tight text-charcoal">{item.name}</h3>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed text-concrete">{item.desc}</p>
                  <p className="mt-2 font-serif text-[20px] text-mustard">{item.price}</p>
                </div>
              </article>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
