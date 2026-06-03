import { FadeImage } from '@/components/fade-image'
import SectionReveal from '@/components/section-reveal'
import { VENUE_SPACES } from '@/lib/workshops/venue-spaces'

export default function VenueSpacesSection() {
  return (
    <section className="border-t border-line/30 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">ΟΙ ΧΩΡΟΙ ΜΑΣ</p>
          <h2 className="mt-5 font-serif text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Δύο αίθουσες &amp; ένα πατάρι
          </h2>
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete">
            Κάθε χώρος έχει τη δική του χρήση — οι χωρητικότητες και οι τελικές φωτογραφίες θα ενημερωθούν σύντομα.
          </p>
        </SectionReveal>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {VENUE_SPACES.map((space) => (
            <li
              key={space.id}
              className="ui-card-elevated overflow-hidden rounded-[2px] border border-line/30 bg-bone-warm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <FadeImage
                  src={space.imageSrc}
                  alt={space.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-[clamp(22px,2.4vw,28px)] leading-tight tracking-[-0.01em] text-charcoal">
                  {space.name}
                </h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-concrete">{space.description}</p>
                <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.14em] text-olive">
                  Χωρητικότητα · {/* TODO(owner): real capacity per space */}σύντομα
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
