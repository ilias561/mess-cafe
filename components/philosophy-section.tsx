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

const philosophyVideo = videoSrc('/videos/mess-philosophy.mp4')

/* ── Scrolling photos ── */
const aboutImages = [
  {
    key: 'aboutBar',
    src: images.aboutBar,
    alt: 'Μπαρ specialty coffee και περιοχή σερβιρίσματος',
    aspect: 'aspect-[3/2]',
  },
  {
    key: 'aboutStairs',
    src: images.aboutStairs,
    alt: 'Σκάλα προς τον μεζονέτα με καθίσματα εργασίας',
    aspect: 'aspect-square',
  },
  {
    key: 'aboutPlants',
    src: images.aboutPlants,
    alt: 'Πυκνή βλάστηση σε μπετόνινο τοίχο',
    aspect: 'aspect-[4/5]',
  },
  {
    key: 'new1',
    src: images.new1,
    alt: 'Εσωτερικός χώρος του καφέ με φυσικό φως',
    aspect: 'aspect-[3/2]',
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

            <Reveal asGroup className="mt-12 flex flex-col gap-0">
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

        {/* ── RIGHT: photo carousel (mobile) / compact grid (desktop) ── */}
        <div className="md:col-span-7">

          {/* ── MOBILE: photos stacked one below the other (hidden on md+) ── */}
          <div className="flex flex-col gap-8 md:hidden">
            {aboutImages.map((img) => (
              <Reveal key={img.key} direction="up">
                <div className={`relative ${img.aspect} w-full overflow-hidden`}>
                  <FadeImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}

            {/* Portrait space video — shown in full (9:16), centered and capped so it stays modest */}
            <Reveal direction="up">
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2px] bg-bone-warm">
                <AmbientVideo
                  src={philosophyVideo}
                  poster={images.messPhilosophyPoster}
                  className="absolute inset-0 h-full w-full object-cover"
                  ariaLabel="Βίντεο από τον χώρο του M.E.S.S."
                />
              </div>
            </Reveal>

            {/* Video closes the sequence */}
            <Reveal direction="up">
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-bone-warm">
                <AmbientVideo
                  srcs={[...aboutEditorialVideos]}
                  poster={images.aboutInterior}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                  ariaLabel="Βίντεο από τον χώρο του M.E.S.S. — πλάνα διαδόχως"
                />
              </div>
            </Reveal>
          </div>

          {/* ── DESKTOP: portrait video beside a 2×2 photo grid (shown on md+) ── */}
          <div className="hidden md:flex md:flex-col md:gap-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Portrait space video — full 9:16, no crop */}
              <Reveal direction="right" className="col-span-5">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2px] bg-bone-warm">
                  <AmbientVideo
                    src={philosophyVideo}
                    poster={images.messPhilosophyPoster}
                    className="absolute inset-0 h-full w-full object-cover"
                    ariaLabel="Βίντεο από τον χώρο του M.E.S.S."
                  />
                </div>
              </Reveal>

              {/* 2×2 photo grid */}
              <div className="col-span-7 grid grid-cols-2 content-start gap-4">
                {aboutImages.map((img, i) => (
                  <Reveal key={img.key} direction={i % 2 === 0 ? 'up' : 'left'}>
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <FadeImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 1400px) 17vw, 240px"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Video spans full width below the grid */}
            <Reveal direction="right">
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-bone-warm">
                <AmbientVideo
                  srcs={[...aboutEditorialVideos]}
                  poster={images.aboutInterior}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                  ariaLabel="Βίντεο από τον χώρο του M.E.S.S. — πλάνα διαδόχως"
                />
              </div>
            </Reveal>
          </div>

        </div>

      </Reveal>
    </section>
  )
}
