'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { EASE } from '@/lib/motion'
import type { Settings } from '@/lib/settings'

type FooterSectionClientProps = {
  settings: Settings
  variant?: 'full' | 'minimal'
}

const footerHeading = 'Σε περιμένουμε.'
const footerWords = footerHeading.split(' ')
const mapEmbedSrc = 'https://www.google.com/maps?q=Archbishop+Makariou+11+45221+Ioannina+Greece&output=embed'

export default function FooterSectionClient({ settings }: FooterSectionClientProps) {
  const primaryPhoneHref = settings.phone.replace(/\s+/g, '')

  return (
    <footer id="footer" className="bg-charcoal px-6 pt-24 pb-0 text-bone md:px-12">
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
            className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
          >
            {settings.phone} — Κάλεσέ μας
          </a>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">ADDRESS</p>
            <p className="font-sans text-sm leading-relaxed text-bone/70">{settings.addressLine1}<br />{settings.addressLine2}</p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">HOURS</p>
            <p className="font-sans text-sm leading-relaxed text-bone/70">
              {settings.hours.map((slot) => (
                <span key={slot.day}>{slot.day}: {slot.open} — {slot.close}<br /></span>
              ))}
            </p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">PHONE</p>
            <a href={`tel:${primaryPhoneHref}`} className="font-sans text-sm text-bone/70 transition-colors hover:text-mustard">{settings.phone}</a>
            <p className="mt-2 font-sans text-sm text-bone/70">{settings.email}</p>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px]">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">INSTAGRAM</p>
            {settings.instagram ? (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-bone/70 transition-colors hover:text-mustard"
              >
                {settings.instagram.replace('https://', '')}
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>

        <motion.div
          className="relative mt-16 h-[360px] w-full overflow-hidden rounded-2xl border border-bone/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <iframe
            title="M.E.S.S. — χάρτης τοποθεσίας"
            src={mapEmbedSrc}
            className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 border-t border-bone/10 py-8 text-[11px] text-bone/40 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="font-sans">© 2026 M.E.S.S.</p>
          <p className="font-sans">Designed with ♥ in Ioannina</p>
        </motion.div>
      </div>
    </footer>
  )
}
