'use client'

import { useState } from 'react'
import { Copy, Facebook, Instagram } from 'lucide-react'

type ShareRowProps = {
  url: string
}

export default function ShareRow({ url }: ShareRowProps) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="mx-auto mt-12 flex max-w-[72ch] justify-end gap-5 border-t border-line/30 pt-6 font-sans text-[12px] text-concrete">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-olive"
        aria-label="Κοινοποίηση στο Facebook"
      >
        <Facebook className="h-3.5 w-3.5" />
        Facebook
      </a>
      <a
        href="https://www.instagram.com/m.e.s.s._ioannina/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-olive"
        aria-label="Instagram M.E.S.S."
      >
        <Instagram className="h-3.5 w-3.5" />
        Instagram
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        }}
        className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-olive"
        aria-label="Αντιγραφή συνδέσμου άρθρου"
      >
        <Copy className="h-3.5 w-3.5" />
        {copied ? 'Αντιγράφηκε' : 'Αντιγραφή συνδέσμου'}
      </button>
    </div>
  )
}
