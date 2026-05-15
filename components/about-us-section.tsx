'use client'

import { FadeImage } from '@/components/fade-image'
import Link from 'next/link'
import MaskReveal from '@/components/mask-reveal'
import AmbientVideo from '@/components/ambient-video'
import { Reveal } from '@/components/reveal'
import { videoSrc } from '@/lib/media'
import { images } from '@/lib/images'

const aboutEditorialVideos = [
  videoSrc('/videos/about-editorial-1.mp4'),
  videoSrc('/videos/about-editorial-2.mp4'),
] as const

/* ── Scrolling photos ── */
const aboutImages = [
  {
    key: 'aboutBar',
    src: images.aboutBar,
    alt: 'Coffee bar and service area',
    aspect: 'aspect-[3/2]',
    caption: 'ΤΟ BAR',
  },
  {
    key: 'aboutStairs',
    src: images.aboutStairs,
    alt: 'Stairs and workspace seating',
    aspect: 'aspect-square',
    caption: 'ΣΚΑΛΑ ΠΡΟΣ ΜΕΖΟΝΙ',
  },
  {
    key: 'aboutPlants',
    src: images.aboutPlants,
    alt: 'Dense plants against concrete',
    aspect: 'aspect-[4/5]',
    caption: 'ΦΥΤΑ & ΦΩΣ',
  },
  {
    key: 'new1',
    src: images.new1,
    alt: 'Νέα φωτογραφία χώρου 1',
    aspect: 'aspect-[3/2]',
    caption: 'Ο ΧΩΡΟΣ ΜΑΣ',
  },
  {
    key: 'new2',
    src: images.new2,
    alt: 'Νέα φωτογραφία χώρου 2',
    aspect: 'aspect-[4/5]',
    caption: 'ΛΕΠΤΟΜΕΡΕΙΕΣ',
  },
] as const

/* ── Stats ── */
const stats = [
  {
    id: 'rating',
    renderValue: () => <span>4.8★</span>,
    label: '165 κριτικές Google',
  },
  {
    id: 'hours',
    renderValue: () => <>08—23</>,
    label: 'ΔΕΥ–ΠΑΡ / ΣΑΒ–ΚΥΡ 09–24',
  },
  {
    id: 'location',
    renderValue: () => <>Ιωάννινα</>,
    label: 'ΚΕΠΑΒΙ · 1ος όροφος',
  },
] as const

/* ── MESS pillar cards (correct acronym: Modular · Events · Sustainable · Space) ── */
const messPillars = [
  {
    letter: 'M.',
    word: 'Modular',
    body: 'Τα πάντα κινούνται. Η κίνηση είναι η βασικότερη αρχή της ζωής.',
    footnote: 'τα πάντα ρεί — Ηράκλειτος',
  },
  {
    letter: 'E.',
    word: 'Events',
    body: 'Ο χώρος μετασχηματίζεται. Από καφέ, σε workshop, σε σκηνή για events. Κάθε μέρα μπορεί να πάρει άλλο σχήμα.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Sustainable',
    body: 'Επιλογές που σέβονται το σώμα, τον άνθρωπο, τη λίμνη.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Space',
    body: '1ος όροφος, ΚΕΠΑΒΙ. Ιωάννινα. Μπροστά στη λίμνη.',
    footnote: undefined,
  },
]

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="scroll-mt-28 border-t border-line/30 bg-cream px-6 py-24 md:px-12 md:py-32"
    >
      <Reveal className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">

        {/* ── LEFT: sticky text column ── */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">

            <p className="mb-6 font-sans text-[11px] uppercase tracking-[0.22em] text-olive">
              ΠΟΙΟΙ ΕΙΜΑΣΤΕ · #KEEPRISING
            </p>

            <MaskReveal className="mb-8" delay={0.06}>
              <h2 className="font-serif text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-tight text-balance text-charcoal">
                Δεν είναι καφέ. Είναι μια ιδέα.
              </h2>
            </MaskReveal>

            {/* Body paragraphs */}
            <div className="flex flex-col gap-6 md:gap-5">
              {[
                'Το M.E.S.S. γεννήθηκε από την ανάγκη για έναν πιο ήσυχο ρυθμό ζωής — σε μια καθημερινότητα που πιέζει. Ένας χώρος που αγκαλιάζει την πόλη χωρίς να την ακολουθεί βιαστικά.',
                'Χτίζουμε κοινότητα — κάτι που, στις μέρες μας, φθίνει. Ενότητα, δημιουργικότητα, ευεξία. Αρμονικά δεμένα στον ίδιο χώρο.',
              ].map((text, i) => (
                <div key={i}>
                  <p className="max-w-md font-sans text-[17px] leading-relaxed text-charcoal/80">
                    {text}
                  </p>
                  {i === 0 && (
                    <div className="relative my-2 aspect-[3/2] w-full overflow-hidden md:hidden">
                      <FadeImage
                        src={images.aboutBar}
                        alt="Coffee bar and service area"
                        fill
                        unoptimized
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <Reveal asGroup className="mt-16 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <Reveal.Item key={stat.id} className="min-w-0">
                  <p className="font-serif text-[clamp(30px,6vw,42px)] leading-none tracking-tight text-charcoal">
                    {stat.renderValue()}
                  </p>
                  <p className="mt-2 font-sans text-[11px] uppercase leading-snug tracking-[0.16em] text-olive sm:text-[12px]">
                    {stat.label}
                  </p>
                </Reveal.Item>
              ))}
            </Reveal>

            {/* Δες το μενού → */}
            <div className="mt-10">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-charcoal transition-colors hover:text-mustard"
              >
                Δες το μενού
                <span
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>

        {/* ── RIGHT: scrolling photos column ── */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {aboutImages.map((img) => (
            <div key={img.key} className={img.key === 'aboutBar' ? 'hidden md:block' : ''}>
              <div className={`relative w-full overflow-hidden ${img.aspect}`}>
                <FadeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-olive">
                {img.caption}
              </p>
            </div>
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

      {/* ── MESS pillar cards ── */}
      <div className="mx-auto max-w-[1400px] mt-24">
        {/* Terracotta divider */}
        <div className="flex justify-center">
          <div className="h-px w-[60px] bg-terracotta/50" />
        </div>

        <Reveal asGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {messPillars.map((pillar, idx) => (
            <Reveal.Item
              key={`${pillar.letter}-${pillar.word}-${idx}`}
              className="flex flex-col gap-4 rounded-[3px] border border-line/40 bg-bone-warm p-6 shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md"
            >
              <p
                className="font-serif leading-none tracking-tight text-mustard"
                style={{ fontSize: 'clamp(48px,7vw,72px)' }}
                aria-hidden
              >
                {pillar.letter}
              </p>
              <div>
                <p className="font-serif text-[24px] leading-snug tracking-tight text-charcoal">
                  {pillar.word}
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-concrete">
                  {pillar.body}
                </p>
                {pillar.footnote && (
                  <p className="mt-3 font-serif text-[12px] italic text-concrete/60">
                    {pillar.footnote}
                  </p>
                )}
              </div>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>

    </section>
  )
}
