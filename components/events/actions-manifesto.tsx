import SectionReveal from '@/components/section-reveal'

export default function ActionsManifesto() {
  return (
    <section className="bg-bone px-8 py-14">
      <SectionReveal>
        <div className="mx-auto max-w-[30em] text-center">
          <blockquote className="font-serif italic text-[clamp(20px,2.6vw,26px)] leading-[1.4] text-charcoal">
            &ldquo;Ένα café είναι ένα δωμάτιο της πόλης. Το ανοίγουμε όταν έχουμε κάτι να πούμε — και όταν έχουμε κάτι να ακούσουμε.&rdquo;
          </blockquote>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            — Η ΟΜΑΔΑ ΤΟΥ M.E.S.S.
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}
