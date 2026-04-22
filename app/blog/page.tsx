import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'

export const metadata: Metadata = {
  title: 'Blog — M.E.S.S.',
}

export default function BlogPage() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="px-6 pb-20 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-4xl border border-line/40 bg-bone-warm p-10 text-center md:p-16">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">BLOG</p>
          <h1 className="mt-4 font-serif text-[clamp(42px,7vw,82px)] leading-[0.98] tracking-tight">
            Σύντομα κοντά σας
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-[16px] leading-relaxed text-concrete">
            Ετοιμάζουμε ιστορίες από το M.E.S.S. για καφέ, γεύσεις και όσα συμβαίνουν στην κοινότητα.
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
