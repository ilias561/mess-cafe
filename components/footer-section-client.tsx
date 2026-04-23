'use client'

import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { submitContact } from '@/lib/contact/submit'
import { EASE } from '@/lib/motion'
import type { Settings } from '@/lib/settings'

type FooterSectionClientProps = {
  settings: Settings
  variant: 'full' | 'minimal'
}

const footerHeading = 'Σε περιμένουμε.'
const footerWords = footerHeading.split(' ')
const mapEmbedSrc = 'https://www.google.com/maps?q=Archbishop+Makariou+11+45221+Ioannina+Greece&output=embed'

export default function FooterSectionClient({ settings, variant }: FooterSectionClientProps) {
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [contactError, setContactError] = useState('')
  const [sendingContact, setSendingContact] = useState(false)

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactStatus('idle')
    setContactError('')
    setSendingContact(true)
    const form = event.currentTarget
    const formData = new FormData(form)

    const gotcha = String(formData.get('_gotcha') || '').trim()
    if (gotcha) {
      setSendingContact(false)
      return
    }

    try {
      const result = await submitContact({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        message: String(formData.get('message') || ''),
      })

      if (!result.ok) {
        setContactStatus('error')
        setContactError(result.message || 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.')
      } else {
        setContactStatus('success')
        form.reset()
      }
    } finally {
      setSendingContact(false)
    }
  }

  const primaryPhoneHref = settings.phone.replace(/\s+/g, '')
  const whatsappNumber = settings.whatsapp.replace(/[^\d]/g, '')

  return (
    <footer id="contact" className="scroll-mt-28 bg-charcoal px-6 pt-24 pb-0 text-bone md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="mb-6 inline-flex rounded-full border border-bone/15 bg-bone/5 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/90"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          OPEN DAILY · {settings.hours.map((slot) => `${slot.day} ${slot.open}—${slot.close}`).join(' · ')}
        </motion.p>

        <h2 className="font-serif leading-[1.1] tracking-normal [text-rendering:optimizeLegibility] text-[clamp(56px,9vw,140px)] text-bone">
          {footerWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.85, ease: EASE }}
              >
                {word}
                {i < footerWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <a
            href={`tel:${primaryPhoneHref}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all hover:-translate-y-0.5 hover:bg-amber"
          >
            {settings.phone} — Κάλεσέ μας
          </a>
        </motion.div>

        {variant === 'full' && (
          <motion.div
            className="mt-12 border border-bone/15 bg-bone/5 p-6 backdrop-blur-[2px] md:p-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            aria-live="polite"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/85">ΕΠΙΚΟΙΝΩΝΙΑ</p>
            {contactStatus === 'success' ? (
              <div className="mt-4">
                <h3 className="font-serif text-[clamp(24px,3vw,34px)] leading-[1.1] text-bone">Ευχαριστούμε!</h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-bone/70">
                  Λάβαμε το μήνυμά σου και θα επικοινωνήσουμε σύντομα.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
                <input name="name" required placeholder="Όνομα" className="w-full rounded-[2px] border border-bone/25 bg-transparent px-4 py-3 font-sans text-[15px] text-bone placeholder:text-bone/35" />
                <input name="email" type="email" required placeholder="Email" className="w-full rounded-[2px] border border-bone/25 bg-transparent px-4 py-3 font-sans text-[15px] text-bone placeholder:text-bone/35" />
                <textarea name="message" rows={4} required placeholder="Μήνυμα" className="w-full rounded-[2px] border border-bone/25 bg-transparent px-4 py-3 font-sans text-[15px] text-bone placeholder:text-bone/35 md:col-span-2" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                {contactStatus === 'error' ? <p className="md:col-span-2 font-sans text-[12px] text-bone/65">{contactError}</p> : null}
                <button type="submit" disabled={sendingContact} className="rounded-full bg-mustard px-8 py-3.5 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-amber disabled:opacity-70">
                  {sendingContact ? 'Αποστολή...' : 'Στείλε μήνυμα'}
                </button>
              </form>
            )}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-bone/30 px-6 py-3 font-sans text-[13px] uppercase tracking-[0.16em] text-bone/85 transition-colors hover:border-mustard hover:text-mustard"
            >
              Send us a message on WhatsApp
            </a>
          </motion.div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">ADDRESS</p>
            <p className="font-sans text-sm leading-relaxed text-bone/70">{settings.addressLine1}<br />{settings.addressLine2}</p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">HOURS</p>
            <p className="font-sans text-sm leading-relaxed text-bone/70">{settings.hours.map((slot) => (<span key={slot.day}>{slot.day}: {slot.open} — {slot.close}<br /></span>))}</p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">PHONE</p>
            <a href={`tel:${primaryPhoneHref}`} className="font-sans text-sm text-bone/70 transition-colors hover:text-mustard">{settings.phone}</a>
            <p className="mt-2 font-sans text-sm text-bone/70">{settings.email}</p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">INSTAGRAM</p>
            {settings.instagram ? (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-sans text-sm text-bone/70 transition-colors hover:text-mustard">
                {settings.instagram.replace('https://', '')}
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>

        <motion.div className="relative mt-16 h-[360px] w-full overflow-hidden rounded-2xl border border-bone/10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, ease: EASE }}>
          <iframe title="M.E.S.S. — χάρτης τοποθεσίας" src={mapEmbedSrc} className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>

        <motion.div className="flex flex-col gap-3 border-t border-bone/10 py-8 text-[11px] text-bone/40 sm:flex-row sm:items-center sm:justify-between" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.55, ease: EASE }}>
          <p className="font-sans">© 2026 M.E.S.S.</p>
          <p className="font-sans">Designed with ♥ in Ioannina</p>
        </motion.div>
      </div>
    </footer>
  )
}
