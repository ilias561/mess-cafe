'use client'

import { FadeImage } from '@/components/fade-image'
import { Reveal } from '@/components/reveal'

const mainMessBullets = ['Coffee', 'Brunch', 'Specialising', 'Social space / networking'] as const

const coworkingBullets = [
  'Recreational mess',
  'Workshop',
  'Healthy kiosk',
  'Merchandise',
] as const

export default function WelcomeSection() {
  return (
    <section id="welcome" className="scroll-mt-28 border-t border-line/30 bg-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 max-w-[720px]">
          <h2 className="font-serif text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight text-charcoal">
            Καλώς ήρθατε στο M.E.S.S.
          </h2>
          <p className="mt-6 font-serif text-[18px] italic leading-relaxed text-charcoal/80 md:text-[20px]">
            Ένας πολυχώρος μπροστά στη λίμνη των Ιωαννίνων, με σκοπό το υγιεινό lifestyle, τη δημιουργία
            δικτύου μέσω workshops και κοινωνικών δράσεων.
          </p>
        </Reveal>

        <Reveal asGroup className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_minmax(200px,280px)_1fr] lg:gap-8">
          <Reveal.Item>
            <h3 className="font-serif text-[24px] tracking-tight text-charcoal">Main M.E.S.S.</h3>
            <p className="mt-2 font-serif text-[15px] italic text-olive">ο χώρος παρασκευής των πιάτων και του καφέ μας</p>
            <ul className="mt-6 space-y-3 font-sans text-[15px] leading-relaxed text-charcoal/80">
              {mainMessBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mustard" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal.Item>

          <Reveal.Item className="mx-auto w-full max-w-[280px]">
            {/* TODO(user): replace with final corridor illustration at public/images/corridor-placeholder.jpg */}
            <div className="relative aspect-[3/5] w-full overflow-hidden rounded-[2px] bg-bone-warm">
              <FadeImage
                src="/images/corridor-placeholder.jpg"
                alt="Ο διάδρομος — ο χώρος ανάμεσα στους δύο χώρους του M.E.S.S."
                fill
                unoptimized
                loading="lazy"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center font-serif text-[14px] italic text-charcoal/70">ο διάδρομος</p>
          </Reveal.Item>

          <Reveal.Item>
            <h3 className="font-serif text-[24px] tracking-tight text-charcoal">Coworking</h3>
            <p className="mt-2 font-serif text-[15px] italic text-olive">ο χώρος coworking</p>
            <ul className="mt-6 space-y-3 font-sans text-[15px] leading-relaxed text-charcoal/80">
              {coworkingBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mustard" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal.Item>
        </Reveal>
      </div>
    </section>
  )
}
