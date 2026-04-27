'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const PERMALINK =
  'https://www.instagram.com/p/DUkqlkkjEFU/?utm_source=ig_embed&utm_campaign=loading'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export default function InstagramPostEmbed() {
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.instgrm?.Embeds?.process()
    })
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <div className="flex w-full justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={PERMALINK}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      >
        <a
          href={PERMALINK}
          target="_blank"
          rel="noopener noreferrer"
          className="sr-only"
        >
          Δες την ανάρτηση στο Instagram — M.E.S.S.
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.instgrm?.Embeds?.process()
        }}
      />
    </div>
  )
}
