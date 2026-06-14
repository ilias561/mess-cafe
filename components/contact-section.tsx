'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { contactMailtoUrl, contactWhatsAppUrl } from '@/lib/contact/submit'
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants'
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

type SentState = { wa: string; mail: string; channel: 'whatsapp' | 'email' }

export default function ContactSection({ settings }: ContactSectionProps) {
  const [sent, setSent] = useState<SentState | null>(null)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState('')

  const addressLine = settings
    ? `${settings.addressLine1} · ${settings.addressLine2}`
    : 'ΚΕΠΑΒΙ · Ιωάννινα' // TODO: source from settings when prop omitted
  const hoursLine = settings ? formatHours(settings) : 'Δευτ–Κυρ · 08:00–22:00' // TODO: source from settings
  const phoneLine = settings?.phone ?? '+30 694 661 4169' // TODO: source from settings
  const whatsappNumber = settings?.whatsapp || WHATSAPP_NUMBER
  const contactEmail = settings?.email || CONTACT_EMAIL

  // Both channels are keyless — each builds a URL the visitor's own app opens
  // (no server, no Web3Forms): WhatsApp is primary, mailto is the fallback for
  // visitors without WhatsApp.
  const openChannel = (form: HTMLFormElement, channel: 'whatsapp' | 'email') => {
    setConsentError('')
    // The email button is type="button", so native required-field validation
    // doesn't fire on click — run it ourselves (no-op on the WhatsApp submit,
    // which already passed native validation).
    if (!form.reportValidity()) return
    if (!consent) {
      setConsentError('Απαιτείται η συγκατάθεσή σας.')
      return
    }
    const fd = new FormData(form)
    if (String(fd.get('_gotcha') || '').trim()) return // honeypot
    const values = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
    }
    const wa = contactWhatsAppUrl(whatsappNumber, values)
    const mail = contactMailtoUrl(contactEmail, values)
    setSent({ wa, mail, channel })
    if (channel === 'whatsapp') {
      window.open(wa, '_blank', 'noopener,noreferrer')
    } else {
      // mailto: would leave a blank tab via window.open — navigate the current
      // document instead (the page doesn't unload, the mail app takes focus).
      window.location.assign(mail)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    openChannel(event.currentTarget, 'whatsapp')
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
                  className="block font-serif text-[clamp(26px,4.5vw,56px)] leading-[1.05] tracking-tight"
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
            {sent ? (
              <div className="rounded-[2px] bg-mustard/8 p-8 ring-1 ring-mustard/40">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-mustard/80">
                  ΣΧΕΔΟΝ ΕΤΟΙΜΟ
                </p>
                <h3 className="mt-3 font-serif text-[clamp(20px,3vw,34px)] leading-[1.1] text-charcoal">
                  {sent.channel === 'whatsapp'
                    ? 'Άνοιξε το WhatsApp και πάτησε «Αποστολή».'
                    : 'Άνοιξε η εφαρμογή email — πάτησε «Αποστολή».'}
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-charcoal/70">
                  Δεν άνοιξε;{' '}
                  <a className="ui-link" href={sent.wa} target="_blank" rel="noopener noreferrer">
                    Στείλε στο WhatsApp
                  </a>{' '}
                  ή{' '}
                  <a className="ui-link" href={sent.mail}>
                    στείλε email
                  </a>
                  .
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
                <div className="md:col-span-2 flex flex-col items-start gap-3">
                  <button
                    type="submit"
                    className="ui-interactive inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark hover:bg-amber md:w-auto"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-ink-dark" aria-hidden>
                      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .17 5.3.17 11.84c0 2.09.55 4.14 1.58 5.95L0 24l6.38-1.67a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.89-5.31 11.9-11.85a11.8 11.8 0 0 0-3.45-8.45Zm-8.46 18.3h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.79.99 1.01-3.69-.24-.38a9.84 9.84 0 0 1-1.52-5.26c0-5.44 4.45-9.87 9.93-9.87 2.65 0 5.13 1.03 7 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.46 9.87-9.9 9.88Zm5.42-7.42c-.3-.15-1.79-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.25-.6-.5-.52-.68-.53l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.79-.73 2.04-1.44.25-.71.25-1.31.17-1.44-.08-.13-.28-.2-.58-.35Z" />
                    </svg>
                    Στείλε μέσω WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={(event) => openChannel(event.currentTarget.form as HTMLFormElement, 'email')}
                    className="ui-link font-sans text-[13px] text-charcoal/70"
                  >
                    Δεν έχεις WhatsApp; Στείλε μας email
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
