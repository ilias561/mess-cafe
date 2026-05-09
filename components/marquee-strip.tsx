'use client'

import { Reveal } from '@/components/reveal'

const segments = [
  'SPECIALTY COFFEE',
  'BRUNCH',
  'VEGAN OPTIONS',
  'ACAI BOWLS',
  'MATCHA',
  'POKE BOWLS',
  'LAKE VIEW',
  'ΚΕΠΑΒΙ 211',
]

function Strip({ stripId }: { stripId: string }) {
  return (
    <div className="flex shrink-0 items-center gap-6 whitespace-nowrap px-3">
      {segments.map((label, i) => (
        <span key={`${stripId}-${label}-${i}`} className="flex items-center gap-6">
          {i > 0 ? <span className="font-serif text-[28px] italic leading-none text-mustard">•</span> : null}
          <span className="font-serif text-[28px] italic leading-none text-bone">{label}</span>
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <section
      aria-hidden
      className="flex h-[80px] items-center overflow-hidden border-y border-olive-deep bg-olive text-bone"
    >
      <Reveal className="flex min-h-0 min-w-0 flex-1 items-center overflow-hidden">
        <div className="marquee-track flex w-max">
          <Strip stripId="a" />
          <Strip stripId="b" />
        </div>
      </Reveal>
    </section>
  )
}
