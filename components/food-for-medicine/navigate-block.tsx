'use client'
import { scrollToId } from '@/lib/lenis'

export default function NavigateBlock() {
  return (
    <section
      aria-label="Πλοήγηση στη σελίδα"
      className="border-y border-line/40 bg-bone-warm/50 px-6 py-14 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center font-sans text-[11px] uppercase tracking-[0.22em] text-olive">
          Επιλογές
        </p>
        <h2 className="mt-4 text-center font-serif text-[clamp(28px,3.6vw,42px)] leading-[1.1] tracking-tight text-charcoal">
          Τι θέλεις να δεις;
        </h2>
        <div className="mx-auto mt-10 grid max-w-[860px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('menu')
            }}
            className="group flex flex-col items-start gap-3 border-t border-charcoal/20 pt-8"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">01.</span>
            <span className="font-serif text-[clamp(22px,2.4vw,28px)] leading-tight tracking-tight text-charcoal">
              Δες το Μενού
            </span>
            <span className="font-sans text-[14px] leading-relaxed text-concrete">
              Όλα τα πιάτα και ροφήματα — με τα υλικά και την ιστορία τους.
            </span>
            <span className="mt-2 inline-flex items-center gap-1 font-sans text-[12px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors group-hover:text-mustard">
              Προς το μενού
              <span className="transition-transform group-hover:translate-x-[2px]">→</span>
            </span>
          </a>
          <a
            href="#recipes"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('recipes')
            }}
            className="group flex flex-col items-start gap-3 border-t border-charcoal/20 pt-8"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">02.</span>
            <span className="font-serif text-[clamp(22px,2.4vw,28px)] leading-tight tracking-tight text-charcoal">
              Συνταγές & Tips
            </span>
            <span className="font-sans text-[14px] leading-relaxed text-concrete">
              Κόλπα κουζίνας και συνταγές M.E.S.S. για να τα φτιάξεις στο σπίτι.
            </span>
            <span className="mt-2 inline-flex items-center gap-1 font-sans text-[12px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors group-hover:text-mustard">
              Προς συνταγές
              <span className="transition-transform group-hover:translate-x-[2px]">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
