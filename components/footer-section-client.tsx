'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FadeImage } from '@/components/fade-image'
import { Reveal } from '@/components/reveal'
import { duration, ease, VIEWPORT_ONCE } from '@/lib/motion'
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
  const [mapConsent, setMapConsent] = useState(false)

  return (
    <footer id="footer" className="bg-charcoal px-6 pt-24 pb-0 text-bone md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="mb-6 inline-flex rounded-full border border-bone/15 bg-bone/5 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/90">
            OPEN DAILY · {settings.hours.map((slot) => `${slot.day} ${slot.open}—${slot.close}`).join(' · ')}
          </p>

          <h2 className="font-serif leading-[1.1] tracking-normal [text-rendering:optimizeLegibility] text-[clamp(56px,9vw,140px)] text-bone">
            {footerWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ delay: i * 0.1, duration: duration.slow, ease: ease.out }}
                >
                  {word}
                  {i < footerWords.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="mt-8">
            <a
              href={`tel:${primaryPhoneHref}`}
              className="ui-interactive inline-flex items-center gap-2.5 rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:shadow-lg hover:bg-amber"
            >
              {settings.phone} — Κάλεσέ μας
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-0 border-t border-bone/10 pt-0 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-t border-mustard/25 pt-6 px-0 pr-6">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">ADDRESS</p>
            <p className="font-sans text-sm leading-relaxed text-bone">{settings.addressLine1}<br />{settings.addressLine2}</p>
          </div>
          <div className="border-t border-mustard/25 pt-6 px-0 pr-6">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">HOURS</p>
            <p className="font-sans text-sm leading-relaxed text-bone">
              {settings.hours.map((slot) => (
                <span key={slot.day}>{slot.day}: {slot.open} — {slot.close}<br /></span>
              ))}
            </p>
          </div>
          <div className="border-t border-mustard/25 pt-6 px-0 pr-6">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">PHONE</p>
            <a
              href={`tel:${primaryPhoneHref}`}
              className="ui-link font-sans text-sm text-bone underline-offset-4 hover:text-mustard hover:underline"
            >
              {settings.phone}
            </a>
            <p className="mt-2 font-sans text-sm text-bone">{settings.email}</p>
          </div>
          <div className="border-t border-mustard/25 pt-6 px-0">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">INSTAGRAM</p>
            {settings.instagram ? (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-link inline-flex items-center gap-1.5 font-sans text-sm text-bone underline-offset-4 hover:text-mustard hover:underline"
              >
                {settings.instagram.replace('https://', '')}
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
              </a>
            ) : null}
          </div>
        </div>

        <Reveal
          id="map"
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]"
        >
          {/* Street-view video thumbnail — links to Google Maps video */}
          <a
            href="https://www.google.com/maps/place/M.E.S.S./@39.6624739,20.8602479,3a,75y,90t/data=!3m8!1e5!3m6!1sCIHM0ogKEICAgMDohajpTw!2e10!3e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGiYrFrT8ZbNAp3Z8_vhvLZR3byorPn3yDkWB4zC3fVxpW2Un6WoNIiPxBWywq6qV-nMQqE9R6Gm27PvvwiPFcObQw_5Mfx37QC67ZqO4q0-O8AwPggDTwk0E5dJ2ELg4q-KK4X%3Dw203-h114-k-no!7i960!8i540!4m11!1m2!2m1!1zzpnPic6szr3Ovc65zr3OsSBtZXNz!3m7!1s0x135be9a182aaef6f:0x8faae1439da23f07!8m2!3d39.6624739!4d20.8602479!10e5!15sChXOmc-JzqzOvc69zrnOvc6xIG1lc3NaFyIVzrnPic6szr3Ovc65zr3OsSBtZXNzkgELY29mZmVlX3Nob3DgAQA!16s%2Fg%2F11wvls4by2?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[360px] overflow-hidden rounded-2xl border border-mustard/20 block"
            aria-label="Δες το M.E.S.S. σε Street View"
          >
            {/* Thumbnail image from Google Maps */}
            <FadeImage
              src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGiYrFrT8ZbNAp3Z8_vhvLZR3byorPn3yDkWB4zC3fVxpW2Un6WoNIiPxBWywq6qV-nMQqE9R6Gm27PvvwiPFcObQw_5Mfx37QC67ZqO4q0-O8AwPggDTwk0E5dJ2ELg4q-KK4X=w960-h540-k-no"
              alt="Άποψη Street View της εισόδου του M.E.S.S."
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-charcoal/20 transition-opacity duration-300 group-hover:bg-charcoal/5" />
            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bone/20 backdrop-blur-sm ring-2 ring-bone/40 transition-transform duration-300 group-hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-bone" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-bone/80">Street View</p>
              <p className="mt-1 font-sans text-[10px] text-bone/50">Δες πώς θα μας βρεις</p>
            </div>
          </a>

          {/* Map — consent gate (GDPR: Google Maps sets cookies on load) */}
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-mustard/20">
            {mapConsent ? (
              <iframe
                title="M.E.S.S. — χάρτης τοποθεσίας"
                src={mapEmbedSrc}
                className="absolute inset-0 h-full w-full border-0 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 bg-olive-deep/80 px-6 text-center">
                <svg className="h-8 w-8 text-mustard/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="max-w-[28ch] font-sans text-[13px] leading-relaxed text-bone/70">
                  Ο χάρτης χρησιμοποιεί cookies τρίτων (Google Maps). Κάνε κλικ για φόρτωση.
                </p>
                <button
                  type="button"
                  onClick={() => setMapConsent(true)}
                  className="ui-interactive rounded-full border border-mustard/40 bg-mustard/10 px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.18em] text-bone/80 hover:border-mustard hover:bg-mustard/20 hover:text-bone"
                >
                  Φόρτωση χάρτη
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="border-t border-bone/10 py-6">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-[12px] text-concrete"
            aria-label="Νομικές πληροφορίες"
          >
            <Link href="/privacy" className="ui-link hover:text-bone">
              Πολιτική Απορρήτου
            </Link>
            <span aria-hidden className="text-bone/30">
              ·
            </span>
            <Link href="/cookies" className="ui-link hover:text-bone">
              Πολιτική Cookies
            </Link>
            <span aria-hidden className="text-bone/30">
              ·
            </span>
            <Link href="/terms" className="ui-link hover:text-bone">
              Όροι Χρήσης
            </Link>
          </nav>
        </Reveal>

        <Reveal className="flex flex-col gap-3 border-t border-bone/10 py-8 text-[11px] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans">© 2026 M.E.S.S.</p>
          <p className="font-sans">Designed with ♥ in Ioannina</p>
        </Reveal>
      </div>
    </footer>
  )
}
