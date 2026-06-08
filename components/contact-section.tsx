'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { submitContact } from '@/lib/contact/submit'
import { Reveal } from '@/components/reveal'
import ScrollDrift from '@/components/scroll-drift'
import SplitText from '@/components/split-text'
import {
  AnaglyphHeading,
  Eyebrow,
  HairlineRule,
  MicroEyebrow,
  NumberedCaption,
} from '@/components/decor/ornaments'
import type { Settings } from '@/lib/settings'

const INPUT_BASE =
  'ui-field w-full min-h-[44px] rounded-[2px] border border-charcoal/20 bg-white/[0.04] backdrop-blur-[2px] px-4 py-3.5 font-sans text-[16px] md:text-[15px] text-charcoal placeholder:text-charcoal/55 focus:outline-none'

type ContactSectionProps = {
  settings?: Settings
}

function formatHours(settings: Settings): string {
  const first = settings.hours[0]
  const last = settings.hours[settings.hours.length - 1]
  if (!first) return 'Δευτ–Κυρ · 08:00–22:00'
  if (settings.hours.length === 1) {
    return `${first.day} · ${first.open}–${first.close}`
  }
  return `${first.day}–${last?.day ?? first.day} · ${first.open}–${last?.close ?? first.close}`
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState('')

  const addressLine = settings
    ? `${settings.addressLine1} · ${settings.addressLine2}`
    : 'ΚΕΠΑΒΙ · Ιωάννινα' // TODO: source from settings when prop omitted
  const hoursLine = settings ? formatHours(settings) : 'Δευτ–Κυρ · 08:00–22:00' // TODO: source from settings
  const phoneLine = settings?.phone ?? '+30 6945 777808' // TODO: source from settings

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    setErrorMsg('')
    setConsentError('')
    if (!consent) {
      setConsentError('Απαιτείται η συγκατάθεσή σας.')
      return
    }
    setSending(true)
    const form = event.currentTarget
    const fd = new FormData(form)

    if (String(fd.get('_gotcha') || '').trim()) {
      setSending(false)
      return
    }

    try {
      const result = await submitContact({
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        message: String(fd.get('message') || ''),
      })
      if (!result.ok) {
        setStatus('error')
        setErrorMsg(result.message || 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.')
      } else {
        setStatus('success')
        form.reset()
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 relative bg-forest px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-5">
          <Reveal direction="up" className="lg:col-span-2">
            <Eyebrow tone="light">ΕΠΙΚΟΙΝΩΝΙΑ</Eyebrow>
            <ScrollDrift distance={12}>
              <AnaglyphHeading as="h2" tone="dark" className="mt-4">
                <SplitText
                  as="span"
                  text="Πες μας τι σκέφτεσαι."
                  className="block font-serif text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-tight"
                />
              </AnaglyphHeading>
            </ScrollDrift>
            <p className="mt-5 font-serif text-[15px] italic leading-relaxed text-charcoal/70">
              Ερωτήσεις, συνεργασίες, παρατηρήσεις — όλα καλοδεχούμενα. Απαντάμε μέσα σε 24 ώρες.
            </p>
          </Reveal>

          <Reveal direction="up" className="lg:col-span-1">
            <NumberedCaption index="15" label="Πληροφορίες" className="mt-0" />
            <MicroEyebrow className="mt-6 text-mustard/80">Διεύθυνση</MicroEyebrow>
            <p className="mt-2 font-serif text-[15px] italic text-charcoal">{addressLine}</p>
            <HairlineRule origin="left" className="my-4 w-12" />
            <MicroEyebrow className="text-mustard/80">Ώρες</MicroEyebrow>
            <p className="mt-2 font-serif text-[15px] italic text-charcoal">{hoursLine}</p>
            <HairlineRule origin="left" className="my-4 w-12" />
            <MicroEyebrow className="text-mustard/80">Τηλέφωνο</MicroEyebrow>
            <a
              href={`tel:${phoneLine.replace(/\s+/g, '')}`}
              className="mt-2 inline-flex min-h-[44px] items-center font-sans text-[14px] text-charcoal md:min-h-0"
            >
              {phoneLine}
            </a>
          </Reveal>

          <Reveal direction="up" className="lg:col-span-2" aria-live="polite">
            {status === 'success' ? (
              <div className="rounded-[2px] bg-mustard/8 p-8 ring-1 ring-mustard/40">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-mustard/80">
                  ΕΥΧΑΡΙΣΤΟΥΜΕ
                </p>
                <h3 className="mt-3 font-serif text-[clamp(24px,3vw,34px)] leading-[1.1] text-charcoal">
                  Λάβαμε το μήνυμά σου!
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-charcoal/70">
                  Θα επικοινωνήσουμε μαζί σου σύντομα.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal/70">
                    Όνομα
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Όνομα"
                    className={INPUT_BASE}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal/70">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className={INPUT_BASE}
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="contact-message" className="font-sans text-[11px] uppercase tracking-[0.16em] text-charcoal/70">
                    Μήνυμα
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Μήνυμα"
                    className={`${INPUT_BASE} resize-none`}
                  />
                </div>
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                {status === 'error' && (
                  <p className="font-sans text-[12px] text-red-300 md:col-span-2">{errorMsg}</p>
                )}
                <div className="md:col-span-2">
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          if (e.target.checked) setConsentError('')
                        }}
                        className="h-5 w-5 shrink-0 rounded border-charcoal/30 text-mustard focus:ring-mustard"
                      />
                    </span>
                    <span className="font-sans text-[13px] leading-relaxed text-charcoal/70">
                      Έχω διαβάσει την{' '}
                      <Link
                        href="/privacy"
                        className="ui-link"
                      >
                        Πολιτική Απορρήτου
                      </Link>{' '}
                      και συμφωνώ με την επεξεργασία των στοιχείων μου για την επικοινωνία μαζί μου.
                    </span>
                  </label>
                  {consentError ? (
                    <p role="alert" className="mt-2 font-sans text-[12px] text-amber-400">
                      {consentError}
                    </p>
                  ) : null}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="ui-interactive inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark hover:bg-amber disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                  >
                    {sending ? 'Αποστολή...' : 'Στείλε μήνυμα'}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
