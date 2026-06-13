'use client'

import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { ClimateShell } from '@/components/decor/climate-shell'
import { AnaglyphHeading, Eyebrow } from '@/components/decor/ornaments'

const PHILOSOPHY_LEAD =
  'Το φαγητό για εμάς δεν είναι μόνο απόλαυση· είναι κινητήρια δύναμη για το σώμα και το πνεύμα. Έχοντας μελετήσει τις διατροφικές συνήθειες προηγούμενων γενεών, καθώς και επιστημονικά αποδεδειγμένες μελέτες για τις πρώτες ύλες της διατροφής, καταλήξαμε σε ένα μενού όπου κάθε υλικό βοηθά στην καλύτερη λειτουργία του εγκεφάλου, των οργάνων και του σώματος γενικότερα.'
const PHILOSOPHY_BODY =
  'Σε εμάς μπορείτε να φάτε γνωρίζοντας πως οι πρώτες ύλες μας είναι καθαρές: φρέσκα τοπικά υλικά, παρθένο ελαιόλαδο, βούτυρο και λάδι καρύδας, καθώς και ψωμί αργής ωρίμανσης ψημένο σε ξυλόφουρνο.'

const FOREST = '#2d5a27'
const MUSTARD_FIELD = '#e8b547'

const MENU_ANAGLYPH_SHADOW =
  'motion-safe:md:[text-shadow:1.5px_0_0_rgba(217,138,95,0.35),-1.5px_0_0_rgba(45,90,39,0.30)]'

export default function GalleryMenuPreview() {
  return (
    <ClimateShell
      id="menu-preview"
      bgEnter={FOREST}
      bgPeak={MUSTARD_FIELD}
      bgExit={FOREST}
      particles="shimmer"
      particleCount={10}
      ringClassName="ring-ink-dark/20"
      vignetteAlpha={0.35}
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center text-ink-dark">
        <Reveal>
          <Eyebrow
            tone="light"
            className="justify-center [&_span:first-child]:bg-ink-dark/40 [&_span:last-child]:text-ink-dark"
          >
            ΦΑΓΗΤΟ ΩΣ ΦΑΡΜΑΚΟ
          </Eyebrow>

          <AnaglyphHeading
            as="h2"
            tone="dark"
            className={`mt-4 text-ink-dark ${MENU_ANAGLYPH_SHADOW}`}
          >
            Η φιλοσοφία του μενού μας.
          </AnaglyphHeading>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="mt-7 font-serif text-[clamp(17px,1.5vw,20px)] leading-relaxed tracking-tight text-ink-dark/85">
            {PHILOSOPHY_LEAD}
          </p>
          <p className="mt-4 font-sans text-[clamp(15px,1.2vw,17px)] leading-relaxed text-ink-dark/65">
            {PHILOSOPHY_BODY}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <Link
            href="/food-for-medicine"
            className="ui-link group mt-9 inline-flex items-center gap-3 font-serif text-[clamp(22px,2.4vw,30px)] italic text-forest"
          >
            Το μενού μας
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </ClimateShell>
  )
}
