import SectionReveal from '@/components/section-reveal'

export default function ActionsManifesto() {
  return (
    <section className="bg-bone px-6 py-6 md:px-8 md:py-10">
      <SectionReveal>
        <div className="mx-auto max-w-[30em] text-center">
          <div
            className="mx-auto mb-5 flex w-max items-center gap-2 md:mb-6"
            aria-hidden
          >
            <span className="block h-px w-9 bg-terracotta/55" />
            <span className="block h-[5px] w-[5px] rounded-full bg-olive" />
            <span className="block h-px w-9 bg-terracotta/55" />
          </div>
          <blockquote className="font-serif italic text-[clamp(17px,2.6vw,26px)] leading-[1.35] text-charcoal md:border-l-2 md:border-terracotta/30 md:pl-6 md:text-left">
            &ldquo;Οι δράσεις μας δεν είναι event marketing. Είναι ο τρόπος που το M.E.S.S. στέκεται δίπλα στην πόλη — με καθαρό φαγητό, με μπαζάρ για όσους έχουν ανάγκη, με ανοιχτές πόρτες για κάθε ηλικία.&rdquo;
          </blockquote>
          <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-olive md:mt-6">
            #KEEPRISING · Η ΟΜΑΔΑ ΤΟΥ M.E.S.S.
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}
