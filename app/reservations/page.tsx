import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookingForm from '@/components/reservations/booking-form'
import BookingInfo from '@/components/reservations/booking-info'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
import SectionReveal from '@/components/section-reveal'
import { getAllEvents } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Κράτηση για event — M.E.S.S.',
}

export default function ReservationsPage() {
  const settings = getSettings()
  const events = getAllEvents().map((event) => ({ slug: event.slug, title: event.title, date: event.date }))

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="px-6 pt-36 md:px-12 md:pt-44">
        <SectionReveal className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">EVENT BOOKING</p>
          <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(44px,6.5vw,96px)] leading-[0.98] tracking-[-0.02em] text-charcoal md:max-w-[16ch]">
            Κλείσε την εκδήλωσή σου.
          </h1>
          <p className="mt-8 max-w-[72ch] font-sans text-[16px] leading-[1.7] text-concrete md:text-[17px]">
            Συμπλήρωσε τη φόρμα για να οργανώσουμε μαζί workshop, μουσική βραδιά, ιδιωτικό event ή παρουσίαση.
          </p>
        </SectionReveal>
      </section>

      <section className="px-6 pb-24 pt-14 md:px-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-[1fr_1fr] md:gap-16">
          <Suspense fallback={<div className="h-[420px] border border-line/30 bg-bone-warm p-8" />}>
            <BookingForm events={events} />
          </Suspense>
          <BookingInfo settings={settings} />
        </div>
      </section>

      <PreFooterCta
        variant="olive"
        eyebrow="ΕΧΕΙΣ ΕΡΩΤΗΣΕΙΣ;"
        heading="Μίλα μας απευθείας."
        body="Το WhatsApp είναι το πιο γρήγορο. Απαντάμε συνήθως σε λίγα λεπτά, κατά τις ώρες λειτουργίας του καταστήματος."
        primaryLabel="WhatsApp"
        primaryHref={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
        secondaryLabel="Τηλέφωνο"
        secondaryHref={`tel:${settings.phone.replace(/\s+/g, '')}`}
      />
      <FooterSection variant="minimal" />
    </main>
  )
}
