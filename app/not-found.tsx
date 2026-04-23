import Link from 'next/link'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'

export default function NotFound() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-[900px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">404</p>
          <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-[-0.02em] text-charcoal">
            Δεν βρήκαμε τη σελίδα.
          </h1>
          <p className="mt-8 max-w-[62ch] font-sans text-[16px] leading-[1.7] text-concrete md:text-[17px]">
            Η διαδρομή που ζήτησες δεν υπάρχει ή μετακινήθηκε. Επέστρεψε στην αρχική για να συνεχίσεις.
          </p>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-mustard px-8 py-4 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-amber"
            >
              Επιστροφή στην αρχική
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
