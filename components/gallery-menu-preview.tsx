'use client'

import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { featuredMenuItems } from '@/lib/menu-featured'

const PHILOSOPHY_COPY =
  'Μέσα από χρόνια μελέτης για την κατανόηση του ανθρώπινου σώματος, καταλήξαμε σε μια φιλοσοφία μαγειρέματος όπου το φαγητό κατέχει θέση φαρμάκου για τον ανθρώπινο οργανισμό. Δουλεύουμε αποκλειστικά με φρέσκα υλικά, τοπικά προϊόντα, και χρησιμοποιούμε μόνο ελαιόλαδο, βούτυρο και λάδι καρύδας. Το ψωμί μας είναι προζυμένιο αργής ωρίμανσης και ψήνεται σε παραδοσιακό ξυλόφουρνο.'

export default function GalleryMenuPreview() {
  return (
    <section id="menu-preview" className="scroll-mt-28 border-t border-line/30 bg-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[68ch]">
          <p className="font-serif text-[clamp(22px,3vw,32px)] leading-snug tracking-tight text-charcoal/90">
            {PHILOSOPHY_COPY}
          </p>
          <Link
            href="/menu"
            className="ui-interactive mt-8 inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:bg-amber hover:shadow-lg"
          >
            Δείτε το menu μας
          </Link>
        </Reveal>

        <Reveal asGroup className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {featuredMenuItems.map((item) => (
            <Reveal.Item key={item.name}>
              <article className="group">
                {item.image ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm">
                    <FadeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                ) : null}
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{item.cat}</p>
                <h3 className="mt-1 font-serif text-[26px] leading-snug tracking-tight text-charcoal">{item.name}</h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-concrete">{item.desc}</p>
                <p className="mt-2 font-serif text-[20px] text-mustard">{item.price}</p>
              </article>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
