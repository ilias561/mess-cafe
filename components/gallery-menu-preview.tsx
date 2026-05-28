'use client'

import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import ScrollDrift from '@/components/scroll-drift'
import MaskRevealBlock from '@/components/mask-reveal-block'
import { featuredMenuItems } from '@/lib/menu-featured'

const PHILOSOPHY_LEAD =
  'Μέσα από χρόνια μελέτης για την κατανόηση του ανθρώπινου σώματος, καταλήξαμε σε μια φιλοσοφία μαγειρέματος όπου το φαγητό κατέχει θέση φαρμάκου για τον ανθρώπινο οργανισμό.'
const PHILOSOPHY_BODY =
  'Δουλεύουμε αποκλειστικά με φρέσκα υλικά, τοπικά προϊόντα, και χρησιμοποιούμε μόνο ελαιόλαδο, βούτυρο και λάδι καρύδας. Το ψωμί μας είναι προζυμένιο αργής ωρίμανσης και ψήνεται σε παραδοσιακό ξυλόφουρνο.'

export default function GalleryMenuPreview() {
  return (
    <section id="menu-preview" className="scroll-mt-28 overflow-x-clip border-t border-line/30 bg-bone px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* LEFT: eyebrow + heading */}
          <Reveal direction="left" className="md:col-span-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-olive">
              ΦΑΓΗΤΟ ΩΣ ΦΑΡΜΑΚΟ
            </p>
            <ScrollDrift distance={26}>
              <h2 className="mt-3 font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-charcoal">
                Η φιλοσοφία του μενού μας.
              </h2>
            </ScrollDrift>
          </Reveal>

          {/* RIGHT: lead + body + CTA */}
          <Reveal direction="right" className="md:col-span-7 md:pt-1.5">
            <p className="font-serif text-[clamp(17px,1.5vw,20px)] leading-relaxed tracking-tight text-charcoal">
              {PHILOSOPHY_LEAD}
            </p>
            <p className="mt-4 font-sans text-[clamp(16px,1.3vw,19px)] leading-relaxed text-charcoal/80">
              {PHILOSOPHY_BODY}
            </p>
            <Link
              href="/food-for-medicine#menu"
              className="ui-interactive mt-8 inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark hover:bg-amber hover:shadow-lg"
            >
              Δείτε το menu μας
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 h-px w-full max-w-[120px] bg-terracotta/40" aria-hidden />

        <Reveal asGroup gap={0.06} className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {featuredMenuItems.map((item, index) => (
            <Reveal.Item key={item.name} direction="left">
              <article className={`group ${index === 1 ? 'md:mt-12' : ''}`}>
                {item.image ? (
                  <MaskRevealBlock direction="left" className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-bone-warm sm:aspect-[3/2] md:aspect-[4/5]">
                    <FadeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </MaskRevealBlock>
                ) : null}
                <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{item.cat}</p>
                <div className="mt-2 border-t border-line pt-3">
                  <h3 className="font-serif text-[clamp(22px,2.2vw,26px)] leading-snug tracking-tight text-charcoal">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-concrete">{item.desc}</p>
              </article>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
