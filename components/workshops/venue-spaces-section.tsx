import MaskRevealBlock from '@/components/mask-reveal-block'
import SectionReveal from '@/components/section-reveal'
import VenueTile from '@/components/workshops/venue-tile'
import { VENUE_SPACES } from '@/lib/workshops/venue-spaces'

export default function VenueSpacesSection() {
  return (
    <section className="border-t border-line/30 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">ΟΙ ΧΩΡΟΙ ΜΑΣ</p>
          <h2 className="mt-5 font-serif text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Δύο αίθουσες, ένα πατάρι &amp; ο διάδρομος ανάμεσά τους
          </h2>
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete">
            Κάθε χώρος έχει τη δική του χρήση — οι χωρητικότητες και οι τελικές φωτογραφίες θα ενημερωθούν σύντομα.
          </p>
        </SectionReveal>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          {VENUE_SPACES.map((space) =>
            space.kind === 'room' ? (
              <article key={space.id}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                  {space.images.map((image, index) => (
                    <MaskRevealBlock key={image.src} direction={index === 0 ? 'left' : 'up'} delay={index * 0.15}>
                      <VenueTile
                        src={image.src}
                        alt={image.alt}
                        aspect="aspect-[3/2]"
                        sizes="(max-width: 640px) 100vw, 670px"
                      />
                    </MaskRevealBlock>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-serif text-[clamp(24px,2.6vw,32px)] leading-tight tracking-[-0.01em] text-charcoal">
                    {space.name}
                  </h3>
                  <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-olive">
                    Χωρητικότητα · {/* TODO(owner): real capacity per space */}σύντομα
                  </p>
                </div>
                <p className="mt-2 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete">
                  {space.description}
                </p>
              </article>
            ) : (
              <article key={space.id} className="md:px-[10%]">
                <MaskRevealBlock direction="up">
                  <VenueTile
                    src={space.images[0].src}
                    alt={space.images[0].alt}
                    aspect="aspect-[16/9] md:aspect-[21/9]"
                    sizes="(max-width: 768px) 100vw, 1120px"
                  />
                </MaskRevealBlock>
                <p className="mx-auto mt-5 max-w-[52ch] text-center font-serif text-[clamp(15px,1.3vw,18px)] italic leading-[1.55] text-charcoal/70">
                  {space.description}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
