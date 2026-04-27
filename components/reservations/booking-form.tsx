'use client'

import { type BaseSyntheticEvent, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { bookingFormSchema, type BookingFormValues } from '@/lib/reservations/schema'
import { submitBooking } from '@/lib/reservations/submit'

type FormStatus = 'idle' | 'success' | 'error'
type BookingEvent = { slug: string; title: string; date: string }
type BookingFormProps = { events: BookingEvent[] }

const INPUT_CLASSNAME =
  'w-full rounded-[2px] border border-line/50 bg-bone px-4 py-3 font-sans text-[15px] text-charcoal transition-colors focus:border-olive focus:outline-2 focus:outline-mustard focus:outline-offset-2'

function todayDateString() {
  return new Date().toISOString().split('T')[0]
}

export default function BookingForm({ events }: BookingFormProps) {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitError, setSubmitError] = useState<string>('')
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
    })
  }, [defaultDate, defaultEventSlug, defaultEventTitle, reset])

  const onSubmit = async (values: BookingFormValues, event?: BaseSyntheticEvent) => {
    setStatus('idle')
    setSubmitError('')

    const formElement = event?.target as HTMLFormElement | undefined
    const gotcha = formElement ? String(new FormData(formElement).get('_gotcha') || '').trim() : ''
    if (gotcha) {
      return
    }

    const result = await submitBooking(values)
    if (!result.ok) {
      setStatus('error')
      setSubmitError(result.message || 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.')
      return
    }

    setStatus('success')
    reset({
      name: '',
      email: '',
      phone: '',
      eventType: defaultEventTitle || '',
      date: defaultDate || '',
      guests: 1,
      message: '',
      eventSlug: defaultEventSlug || '',
    })
  }

  return (
    <div aria-live="polite">
      {status === 'success' ? (
        <div className="border border-line/30 bg-bone-warm p-8">
          <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Ευχαριστούμε!
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-[1.7] text-concrete">Θα επικοινωνήσουμε μαζί σου σύντομα.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Ονοματεπώνυμο
            </label>
            <input id="name" type="text" autoComplete="name" aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} className={INPUT_CLASSNAME} />
            {errors.name ? <p id="name-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.name.message}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Email
            </label>
            <input id="email" type="email" autoComplete="email" aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} className={INPUT_CLASSNAME} />
            {errors.email ? <p id="email-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Τηλέφωνο
            </label>
            <input id="phone" type="tel" autoComplete="tel" aria-describedby={errors.phone ? 'phone-error' : undefined} {...register('phone')} className={INPUT_CLASSNAME} />
            {errors.phone ? <p id="phone-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.phone.message}</p> : null}
          </div>

          <div>
            <label
              htmlFor="eventType"
              className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive"
            >
              Είδος εκδήλωσης
            </label>
            <select id="eventType" {...register('eventType')} disabled={eventLocked} aria-describedby={errors.eventType ? 'eventType-error' : undefined} className={`${INPUT_CLASSNAME} appearance-none`}>
              {!eventLocked ? <option value="">Επίλεξε είδος</option> : null}
              <option value="Workshop">Workshop</option>
              <option value="Live μουσική">Live μουσική</option>
              <option value="Ιδιωτικό event">Ιδιωτικό event</option>
              <option value="Παρουσίαση βιβλίου">Παρουσίαση βιβλίου</option>
              <option value="Άλλο">Άλλο</option>
              {eventLocked && defaultEventTitle ? <option value={defaultEventTitle}>{defaultEventTitle}</option> : null}
            </select>
            {errors.eventType ? <p id="eventType-error" role="alert" className="mt-2 font-sans text-[12px] text-concrete">{errors.eventType.message}</p> : null}
          </div>

          <div>
            <label htmlFor="date" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Ημερομηνία
            </label>
            <input id="date" type="date" min={minDate} {...register('date')} className={INPUT_CLASSNAME} />
            {errors.date ? <p className="mt-2 font-sans text-[12px] text-concrete">{errors.date.message}</p> : null}
          </div>

          <div>
            <label htmlFor="guests" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
              Αριθμός ατόμων
            </label>
            <input id="guests" type="number" min={1} max={200} {...register('guests')} className={INPUT_CLASSNAME} />
            {errors.guests ? <p className="mt-2 font-sans text-[12px] text-concrete">{errors.guests.message}</p> : null}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-olive"
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

          {status === 'error' ? (
            <div className="rounded-[2px] border border-line/40 bg-bone-warm p-4">
              <p className="font-sans text-[12px] text-concrete">{submitError}</p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setSubmitError('')
                }}
                className="mt-3 font-sans text-[12px] uppercase tracking-[0.14em] text-charcoal underline decoration-mustard underline-offset-[4px]"
              >
                Δοκίμασε ξανά
              </button>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-mustard px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Αποστολή...' : 'Στείλε κράτηση'}
          </button>
        </form>
      )}
    </div>
  )
}
