import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import BookingForm from '@/components/reservations/booking-form'
import { Suspense } from 'react'
import EventsGrid from '@/components/events/events-grid'
import { buildPageMetadata } from '@/lib/metadata'
import { getPastEvents, getUpcomingEvents } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = buildPageMetadata({
  title: 'Workshops & Events — M.E.S.S.',
  description:
    'Workshops, events και κρατήσεις χώρου στο M.E.S.S. — δύο αίθουσες και πατάρι στο ΚΕΠΑΒΙ, Ιωάννινα.',
  path: '/workshops',
})

export default function WorkshopsPage() {
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const settings = getSettings()
  const bookingEvents = [...upcomingEvents, ...pastEvents].map((event) => ({
    slug: event.slug,
    title: event.title,
    date: event.date,
  }))

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <section className="px-6 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            Workshops &amp; Events
          </h1>
          <p className="mt-8 max-w-[72ch] font-serif text-[18px] italic leading-relaxed text-charcoal/80 md:text-[20px]">
            Έχοντας 2 ξεχωριστές αίθουσες και ένα πατάρι, δημιουργείται η δυνατότητα να γίνονται διάφορα workshops
            και events, τα οποία ενημερώνονται μέσα από τη σελίδα μας στο Instagram. Μπορείτε επίσης να κλείσετε τον
            δικό σας χώρο για τα events σας.
          </p>
        </div>
      </section>

      <EventsGrid upcomingEvents={upcomingEvents} pastEvents={pastEvents} />

      <section className="border-t border-line/30 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] tracking-tight text-charcoal">Κλείσε τον χώρο σου</h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-concrete">
            Συμπλήρωσε τη φόρμα για να οργανώσουμε μαζί το workshop ή το event σου.
          </p>
          <div className="mt-10">
            <Suspense fallback={<div className="h-[420px] border border-line/30 bg-bone-warm p-8" />}>
              <BookingForm events={bookingEvents} showEventKindSelect />
            </Suspense>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
