import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'

export const metadata: Metadata = {
  title: 'Ευχαριστούμε — M.E.S.S.',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="flex min-h-[70vh] items-center px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px] text-center md:text-left">
          <h1 className="font-serif text-[clamp(48px,8vw,96px)] leading-[0.98] tracking-[-0.03em] text-charcoal">
            Ευχαριστούμε!
          </h1>
          <p className="mx-auto mt-6 max-w-[48ch] font-sans text-[16px] leading-relaxed text-concrete md:mx-0 md:text-[17px]">
            Λάβαμε την κράτησή σας. Θα επικοινωνήσουμε μαζί σας σύντομα.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/"
              className="ui-interactive rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:bg-amber hover:shadow-lg"
            >
              Επιστροφή στην αρχική
            </Link>
            <Link
              href="/menu"
              className="ui-interactive rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:bg-amber hover:shadow-lg"
            >
              Δες το μενού
            </Link>
          </div>
        </div>
      </section>
      <FooterSection variant="minimal" />
    </main>
  )
}
