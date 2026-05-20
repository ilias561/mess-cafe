'use client'

import { Reveal } from '@/components/reveal'

/* ── MESS acronym: Modular · Events · Sustainable · Space ── */
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

export default function MessAcronym() {
  return (
    <section
      aria-label="M.E.S.S. — Modular, Events, Sustainable, Space"
      className="border-y border-charcoal/10 bg-gradient-to-b from-cream via-bone-warm to-bone-warm px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-center font-sans text-[11px] uppercase tracking-[0.22em] text-olive">
            Τι σημαίνει M.E.S.S.
          </p>
        </Reveal>

        <Reveal asGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
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
                  <p className="mt-3 font-serif text-[12px] italic text-concrete">
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
