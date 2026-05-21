'use client'

import { FadeImage } from '@/components/fade-image'
import AmbientVideo from '@/components/ambient-video'
import { Reveal } from '@/components/reveal'
import { videoSrc } from '@/lib/media'
import { images } from '@/lib/images'

const philosophyGoals = [
  'Να επικεντρωθεί στην υγεία.',
  'Να δημιουργήσει κοινότητα.',
  'Να μαζέψει ανθρώπους ίδιας φιλοσοφίας — έναν χώρο που δρα ως μαγνήτης για ανθρώπους της ίδιας νοοτροπίας.',
] as const

const aboutEditorialVideos = [
  videoSrc('/videos/about-editorial-1.mp4'),
  videoSrc('/videos/about-editorial-2.mp4'),
] as const

/* ── Scrolling photos ── */
const aboutImages = [
  {
    key: 'aboutBar',
    src: images.aboutBar,
    alt: 'Μπαρ specialty coffee και περιοχή σερβιρίσματος',
    aspect: 'aspect-[3/2]',
    caption: 'ΤΟ BAR',
  },
  {
    key: 'aboutStairs',
    src: images.aboutStairs,
    alt: 'Σκάλα προς τον μεζονέτα με καθίσματα εργασίας',
    aspect: 'aspect-square',
    caption: 'ΣΚΑΛΑ ΠΡΟΣ ΜΕΖΟΝΙ',
  },
  {
    key: 'aboutPlants',
    src: images.aboutPlants,
    alt: 'Πυκνή βλάστηση σε μπετόνινο τοίχο',
    aspect: 'aspect-[4/5]',
    caption: 'ΦΥΤΑ & ΦΩΣ',
  },
  {
    key: 'new1',
    src: images.new1,
    alt: 'Εσωτερικός χώρος του καφέ με φυσικό φως',
    aspect: 'aspect-[3/2]',
    caption: 'Ο ΧΩΡΟΣ ΜΑΣ',
  },
  {
    key: 'new2',
    src: images.new2,
    alt: 'Λεπτομέρεια διακόσμησης και υλικών στον χώρο',
    aspect: 'aspect-[4/5]',
    caption: 'ΛΕΠΤΟΜΕΡΕΙΕΣ',
  },
] as const

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="scroll-mt-28 overflow-x-clip border-t border-line/30 bg-bone px-6 py-24 md:px-12 md:py-32"
    >
      <Reveal className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">

        {/* ── LEFT: sticky text column ── */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <h2 className="font-serif text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-tight text-charcoal">
              Ποιοι είμαστε & η φιλοσοφία μας
            </h2>
            <p className="mt-6 font-serif text-[18px] italic leading-relaxed text-charcoal/80 md:text-[20px]">
              Φύση, ευεξία, χαλάρωση. Στις εγκαταστάσεις του ΚΕΠΑΒΙ δημιουργήσαμε μια μικρή όαση, που σκοπό
              έχει:
            </p>

            <Reveal asGroup id="goals" className="mt-12 flex scroll-mt-28 flex-col gap-0">
              {philosophyGoals.map((goal, index) => (
                <Reveal.Item key={goal} direction="left">
                  <div className="flex gap-6 border-t border-charcoal/10 py-6 first:border-t-0 first:pt-0">
                    <span className="shrink-0 font-serif text-[clamp(28px,4vw,40px)] leading-none tracking-tight text-mustard/80">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <p className="font-serif text-[20px] leading-snug tracking-tight text-charcoal md:text-[22px]">
                      {goal}
                    </p>
                  </div>
                </Reveal.Item>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ── RIGHT: scrolling photos column ── */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {aboutImages.map((img, i) => (
            <Reveal key={img.key} direction={i % 2 === 0 ? 'right' : 'left'}>
              <div className={`relative w-full overflow-hidden ${img.aspect}`}>
                <FadeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-olive">
                {img.caption}
              </p>
            </Reveal>
          ))}

          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-bone-warm">
              <AmbientVideo
                srcs={[...aboutEditorialVideos]}
                poster={images.aboutPlants}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: '50% 30%' }}
                ariaLabel="Βίντεο από τον χώρο του M.E.S.S. — πλάνα διαδόχως"
              />
            </div>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-olive">
              ΣΤΙΓΜΕΣ
            </p>
          </div>
        </div>

      </Reveal>
    </section>
  )
}
