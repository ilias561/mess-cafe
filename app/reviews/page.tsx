import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import { buildPageMetadata } from '@/lib/metadata'
import { reviews } from '@/lib/reviews-data'
import ReviewsGrid from '@/components/reviews/reviews-grid'

export const metadata: Metadata = buildPageMetadata({
  title: 'Όσοι μας γνώρισαν — M.E.S.S.',
  description: 'Όλες οι αξιολογήσεις από επισκέπτες που γνώρισαν το M.E.S.S. στα Ιωάννινα.',
  path: '/reviews',
})

export default function ReviewsPage() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="px-6 pt-36 pb-16 md:px-12 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΚΟΙΝΟΤΗΤΑ</p>
          <h1 className="mt-5 font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            Όσοι μας γνώρισαν
          </h1>
          <p className="mt-6 max-w-[60ch] font-sans text-[16px] leading-relaxed text-concrete">
            Λέξεις από ανθρώπους που πέρασαν από τον χώρο μας — καφέ, brunch, δράσεις και στιγμές μπροστά στη λίμνη.
          </p>
        </div>
      </section>
      <ReviewsGrid reviews={reviews} />
      <FooterSection />
    </main>
  )
}
