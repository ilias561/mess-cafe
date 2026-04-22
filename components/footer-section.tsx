'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { EASE } from '@/lib/motion'

const footerHeading = 'Σε περιμένουμε.'
const footerWords = footerHeading.split(' ')

const mapEmbedSrc =
  'https://www.google.com/maps?q=Archbishop+Makariou+11+45221+Ioannina+Greece&output=embed'

export default function FooterSection() {
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
          OPEN DAILY · 08:00 — 22:00
        </motion.p>

        {/* Full-width heading */}
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
            href="tel:+306945777808"
            className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all hover:-translate-y-0.5 hover:bg-amber"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.5">
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h.879a1 1 0 0 1 .958.713l.72 2.16a1 1 0 0 1-.34 1.084L5.5 6.5c.9 1.8 2.2 3.1 4 4l1.042-1.218a1 1 0 0 1 1.084-.34l2.16.72A1 1 0 0 1 14.5 10.62v.879A1.5 1.5 0 0 1 13 13C7.477 13 3 8.523 3 3.5Z" strokeLinejoin="round" />
            </svg>
            694 577 7808 — Κάλεσέ μας
          </a>
        </motion.div>

        {/* Contact info — horizontal row */}
        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              key: 'address',
              label: 'ADDRESS',
              content: (
                <p className="font-sans text-sm leading-relaxed text-bone/70">
                  ΚΕΠΑΒΙ, 1ος Όροφος #211<br />
                  Αρχ. Μακαρίου 11<br />
                  Ιωάννινα 45221
                </p>
              ),
            },
            {
              key: 'hours',
              label: 'HOURS',
              content: (
                <p className="font-sans text-sm leading-relaxed text-bone/70">
                  Κάθε μέρα<br />
                  08:00 — 22:00
                </p>
              ),
            },
            {
              key: 'phone',
              label: 'PHONE',
              content: (
                <a
                  href="tel:+306945777808"
                  className="font-sans text-sm text-bone/70 transition-colors hover:text-mustard"
                >
                  694 577 7808
                </a>
              ),
            },
            {
              key: 'instagram',
              label: 'INSTAGRAM',
              content: (
                <a
                  href="https://www.instagram.com/m.e.s.s._ioannina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-bone/70 transition-colors hover:text-mustard"
                >
                  @m.e.s.s._ioannina
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.5} />
                </a>
              ),
            },
          ].map((block, i) => (
            <motion.div
              key={block.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur-[2px] transition-colors hover:border-mustard/40 hover:bg-bone/[0.07]"
            >
              <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">
                {block.label}
              </p>
              {block.content}
            </motion.div>
          ))}
        </div>

        {/* Map */}
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 via-charcoal/5 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-[30%] flex justify-center">
            <svg viewBox="0 0 48 56" fill="none" className="h-12 w-10" aria-hidden>
              <path
                d="M24 4C14.059 4 6 12.059 6 22c0 14 18 34 18 34s18-20 18-34C42 12.059 33.941 4 24 4Z"
                stroke="#E8B547" strokeWidth="2" fill="#E8B547" fillOpacity="0.2"
              />
              <circle cx="24" cy="22" r="5" fill="#E8B547" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-4 bottom-4 rounded-full border border-bone/20 bg-charcoal/55 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-bone/90">
            ΚΕΠΑΒΙ · #211
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col gap-3 border-t border-bone/10 py-8 text-[11px] text-bone/40 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="font-sans">© 2026 M.E.S.S.</p>
          <p className="font-sans">
            Designed with ♥ in Ioannina ·{' '}
            <a
              href="https://merakidigital.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-bone/70"
            >
              Meraki Digital
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
