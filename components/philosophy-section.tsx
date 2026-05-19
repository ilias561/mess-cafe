'use client'

import { Reveal } from '@/components/reveal'

const philosophyGoals = [
  'Να επικεντρωθεί στην υγεία.',
  'Να δημιουργήσει κοινότητα.',
  'Να μαζέψει ανθρώπους ίδιας φιλοσοφίας — έναν χώρο που δρα ως μαγνήτης για ανθρώπους της ίδιας νοοτροπίας.',
] as const

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="scroll-mt-28 border-t border-line/30 bg-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[720px]">
          <h2 className="font-serif text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-tight text-charcoal">
            Ποιοι είμαστε & η φιλοσοφία μας
          </h2>
          <p className="mt-6 font-serif text-[18px] italic leading-relaxed text-charcoal/80 md:text-[20px]">
            Φύση, ευεξία, χαλάρωση. Στις εγκαταστάσεις του ΚΕΠΑΒΙ δημιουργήσαμε μια μικρή όαση, που σκοπό
            έχει:
          </p>
        </Reveal>

        <Reveal asGroup className="mt-12 flex max-w-[720px] flex-col gap-0">
          {philosophyGoals.map((goal, index) => (
            <Reveal.Item key={goal}>
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
    </section>
  )
}
