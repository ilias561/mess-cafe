'use client'

import { type BaseSyntheticEvent, type MouseEvent, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { bookingFormSchema, type BookingFormValues } from '@/lib/reservations/schema'
import { bookingMailtoUrl, bookingWhatsAppUrl } from '@/lib/reservations/submit'
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants'

type SentState = { wa: string; mail: string; channel: 'whatsapp' | 'email' }
type BookingEvent = { slug: string; title: string; date: string }
type BookingFormProps = {
  events: BookingEvent[]
  /** Workshops page: fixed select options for event kind */
  showEventKindSelect?: boolean
}

const EVENT_KIND_OPTIONS = [
  'Workshop',
  'Παρουσίαση',
  'Live μουσική',
  'Ιδιωτικό event',
  'Άλλο',
] as const

const INPUT_CLASSNAME =
  'ui-field w-full min-h-[44px] rounded-[2px] border border-charcoal/25 bg-charcoal px-4 py-3 font-sans text-[16px] md:text-[15px] text-ink-dark placeholder:text-ink-dark/55 disabled:cursor-not-allowed disabled:opacity-60'

function todayDateString() {
  return new Date().toISOString().split('T')[0]
}

export default function BookingForm({ events, showEventKindSelect = false }: BookingFormProps) {
  const searchParams = useSearchParams()
  const [sent, setSent] = useState<SentState | null>(null)
  const minDate = useMemo(() => todayDateString(), [])
  const selectedEvent = useMemo(() => {
    const eventSlug = searchParams.get('event')
    if (!eventSlug) return undefined
    return events.find((item) => item.slug === eventSlug) || events.find((item) => item.slug.startsWith(eventSlug))
  }, [events, searchParams])
  const defaultEventTitle = selectedEvent?.title
  const defaultEventSlug = selectedEvent?.slug
  const defaultDate = selectedEvent ? new Date(selectedEvent.date).toISOString().split('T')[0] : undefined
  const eventLocked = Boolean(defaultEventSlug && defaultEventTitle)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    trigger,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: defaultEventTitle || '',
      date: defaultDate || '',
      guests: 1,
      message: '',
      eventSlug: defaultEventSlug || '',
      consent: undefined,
    },
  })

  useEffect(() => {
    reset({
      name: '',
      email: '',
      phone: '',
      eventType: defaultEventTitle || '',
      date: defaultDate || '',
      guests: 1,
      message: '',
      eventSlug: defaultEventSlug || '',
      consent: undefined,
    })
  }, [defaultDate, defaultEventSlug, defaultEventTitle, reset])

  // Both channels are keyless — each builds a URL the visitor's own app opens
  // (no server, no Web3Forms): WhatsApp is primary, mailto is the fallback for
  // visitors without WhatsApp.
  const openChannel = (values: BookingFormValues, channel: 'whatsapp' | 'email') => {
    const wa = bookingWhatsAppUrl(WHATSAPP_NUMBER, values)
    const mail = bookingMailtoUrl(CONTACT_EMAIL, values)
    setSent({ wa, mail, channel })
    reset({
      name: '',
      email: '',
      phone: '',
      eventType: defaultEventTitle || '',
      date: defaultDate || '',
      guests: 1,
      message: '',
      eventSlug: defaultEventSlug || '',
      consent: undefined,
    })
    if (channel === 'whatsapp') {
      window.open(wa, '_blank', 'noopener,noreferrer')
    } else {
      // mailto: would leave a blank tab via window.open — navigate the current
      // document instead (the page doesn't unload, the mail app takes focus).
      window.location.assign(mail)
    }
  }

  // WhatsApp = the form submit; react-hook-form has already validated the schema
  // (incl. consent) by the time this runs.
  const onSubmit = (values: BookingFormValues, event?: BaseSyntheticEvent) => {
    const formElement = event?.target as HTMLFormElement | undefined
    const gotcha = formElement ? String(new FormData(formElement).get('_gotcha') || '').trim() : ''
    if (gotcha) return // honeypot
    openChannel(values, 'whatsapp')
  }

  // Email fallback = a type="button", so validate the schema manually first.
  const onEmail = async (event: MouseEvent<HTMLButtonElement>) => {
    const formElement = event.currentTarget.form
    const gotcha = formElement ? String(new FormData(formElement).get('_gotcha') || '').trim() : ''
    if (gotcha) return
    if (!(await trigger())) return
    openChannel(getValues(), 'email')
  }

  return (
    <div aria-live="polite">
      {sent ? (
        <div className="border border-line/30 bg-bone-warm p-8">
          <h2 className="font-serif text-[clamp(26px,4vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Σχεδόν έτοιμο!
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-[1.7] text-concrete">
            {sent.channel === 'whatsapp'
              ? 'Άνοιξε το WhatsApp και πάτησε «Αποστολή» για να μας στείλεις το αίτημά σου.'
              : 'Άνοιξε η εφαρμογή email σου — πάτησε «Αποστολή» για να μας στείλεις το αίτημά σου.'}
          </p>
          <p className="mt-4 font-sans text-[14px] leading-[1.7] text-concrete">
            Δεν άνοιξε;{' '}
            <a className="ui-link text-charcoal" href={sent.wa} target="_blank" rel="noopener noreferrer">
              Στείλε στο WhatsApp
            </a>{' '}
            ή{' '}
            <a className="ui-link text-charcoal" href={sent.mail}>
              στείλε email
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal">
              Ονοματεπώνυμο
            </label>
            <input id="name" type="text" autoComplete="name" aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} className={INPUT_CLASSNAME} />
            {errors.name ? <p id="name-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.name.message}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal">
              Email
            </label>
            <input id="email" type="email" autoComplete="email" aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} className={INPUT_CLASSNAME} />
            {errors.email ? <p id="email-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal">
              Τηλέφωνο
            </label>
            <input id="phone" type="tel" autoComplete="tel" aria-describedby={errors.phone ? 'phone-error' : undefined} {...register('phone')} className={INPUT_CLASSNAME} />
            {errors.phone ? <p id="phone-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.phone.message}</p> : null}
          </div>

          <div>
            <label
              htmlFor="eventType"
              className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal"
            >
              Είδος εκδήλωσης
            </label>
            <select id="eventType" {...register('eventType')} disabled={eventLocked && !showEventKindSelect} aria-describedby={errors.eventType ? 'eventType-error' : undefined} className={`${INPUT_CLASSNAME} appearance-none`}>
              {!eventLocked || showEventKindSelect ? <option value="">Επίλεξε είδος εκδήλωσης</option> : null}
              {showEventKindSelect
                ? EVENT_KIND_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))
                : (
                  <>
                    <option value="Workshop">Workshop</option>
                    <option value="Live μουσική">Live μουσική</option>
                    <option value="Ιδιωτικό event">Ιδιωτικό event</option>
                    <option value="Παρουσίαση βιβλίου">Παρουσίαση βιβλίου</option>
                    <option value="Άλλο">Άλλο</option>
                  </>
                )}
              {eventLocked && defaultEventTitle && !showEventKindSelect ? (
                <option value={defaultEventTitle}>{defaultEventTitle}</option>
              ) : null}
            </select>
            {errors.eventType ? <p id="eventType-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.eventType.message}</p> : null}
          </div>

          <div>
            <label htmlFor="date" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal">
              Ημερομηνία
            </label>
            <input id="date" type="date" min={minDate} {...register('date')} className={INPUT_CLASSNAME} />
            {errors.date ? <p className="mt-2 font-sans text-[12px] text-concrete">{errors.date.message}</p> : null}
          </div>

          <div>
            <label htmlFor="guests" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal">
              Αριθμός ατόμων
            </label>
            <input id="guests" type="number" min={1} max={200} {...register('guests')} className={INPUT_CLASSNAME} />
            {errors.guests ? <p className="mt-2 font-sans text-[12px] text-concrete">{errors.guests.message}</p> : null}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal"
            >
              Μήνυμα
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              placeholder="Πες μας περισσότερα για την εκδήλωση"
              className={INPUT_CLASSNAME}
            />
          </div>

          <input type="hidden" {...register('eventSlug')} />
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label htmlFor="consent" className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center">
                <input
                  id="consent"
                  type="checkbox"
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  aria-invalid={errors.consent ? true : undefined}
                  {...register('consent')}
                  className="ui-field h-5 w-5 shrink-0 rounded border-charcoal/30 bg-charcoal text-mustard"
                />
              </span>
              <span className="font-sans text-[13px] leading-relaxed text-concrete">
                Έχω διαβάσει την{' '}
                <Link href="/privacy" className="ui-link text-charcoal">
                  Πολιτική Απορρήτου
                </Link>{' '}
                και συμφωνώ με την επεξεργασία των στοιχείων μου για τη διαχείριση της κράτησης.
              </span>
            </label>
            {errors.consent ? (
              <p id="consent-error" role="alert" className="mt-2 font-sans text-[12px] text-amber-600">
                {errors.consent.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="ui-interactive inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark hover:bg-amber disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-ink-dark" aria-hidden>
                <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .17 5.3.17 11.84c0 2.09.55 4.14 1.58 5.95L0 24l6.38-1.67a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.89-5.31 11.9-11.85a11.8 11.8 0 0 0-3.45-8.45Zm-8.46 18.3h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.79.99 1.01-3.69-.24-.38a9.84 9.84 0 0 1-1.52-5.26c0-5.44 4.45-9.87 9.93-9.87 2.65 0 5.13 1.03 7 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.46 9.87-9.9 9.88Zm5.42-7.42c-.3-.15-1.79-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.25-.6-.5-.52-.68-.53l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.79-.73 2.04-1.44.25-.71.25-1.31.17-1.44-.08-.13-.28-.2-.58-.35Z" />
              </svg>
              Στείλε μέσω WhatsApp
            </button>
            <button
              type="button"
              onClick={onEmail}
              className="ui-link font-sans text-[13px] text-charcoal/80"
            >
              Δεν έχεις WhatsApp; Στείλε μας email
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
