'use client'

import { m, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/split-text'
import { VIEWPORT_ONCE, blurIn, slowReveal } from '@/lib/motion'

export default function HeroCaption() {
  const reduce = useReducedMotion()

  return (
    <div className="border-y border-line/25 bg-bone px-6 py-4 md:px-12 md:py-6">
      <div className="mx-auto max-w-[760px] text-center">
        <SplitText
          as="p"
          text="Ένας πολυχώρος μπροστά στη λίμνη των Ιωαννίνων —"
          className="font-serif text-[14px] italic leading-relaxed text-charcoal/70"
        />
        {reduce ? (
          <p className="mt-1 font-serif text-[14px] italic leading-relaxed text-charcoal/70">
            υγιεινό lifestyle, κοινότητα, ευεξία.
          </p>
        ) : (
          <m.p
            className="mt-1 font-serif text-[14px] italic leading-relaxed text-charcoal/70"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={blurIn}
            transition={slowReveal}
          >
            υγιεινό lifestyle, κοινότητα, ευεξία.
          </m.p>
        )}
      </div>
    </div>
  )
}
