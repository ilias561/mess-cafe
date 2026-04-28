import Link from 'next/link'
import type { Event } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

type EventBookingCtaProps = {
  event: Event
}

function normalizeWhatsappPhone(value: string): string {
  return value.replace(/[^\d]/g, '')
}

export default function EventBookingCta({ event }: EventBookingCtaProps) {
  const settings = getSettings()
  const phone = normalizeWhatsappPhone(settings.whatsapp || settings.phone || '306900000000')
  const message = `Γεια σας! Θα ήθελα να κλείσω θέση για την εκδήλωση "${event.title}".`
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <section className="bg-olive px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">ΚΡΑΤΗΣΕΙΣ</p>
        <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(30px,4.2vw,52px)] leading-[1.05] tracking-[-0.02em] text-bone">
          Κλείσε τη θέση σου εγκαίρως.
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-[16px] leading-[1.7] text-bone/75 md:text-[17px]">
          Συμπλήρωσε τη φόρμα κράτησης για να σε εξυπηρετήσουμε γρήγορα ή στείλε μας απευθείας μήνυμα στο WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/reservations?event=${event.slug}`}
            className="rounded-full bg-mustard px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
          >
            Κράτησε θέση
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1EBE5A]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
