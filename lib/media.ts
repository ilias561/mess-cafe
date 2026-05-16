/**
 * Video / frame URLs.
 *
 * Default: same-origin — videos are committed to `public/videos/` and served by
 * Cloudflare Pages directly. This avoids R2 public-dev URL rate limits and keeps
 * the site working without any CDN configuration.
 *
 * `NEXT_PUBLIC_VIDEO_BASE_URL` can override with a CDN host (e.g. a future
 * R2 custom domain like `https://cdn.messcafe.gr`) when ready.
 */
function mediaBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VIDEO_BASE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  return ''
}

const BASE = mediaBaseUrl()
const CACHE_BUST = 'v=20260515'

export function videoSrc(path: string): string {
  return `${BASE}${path}?${CACHE_BUST}`
}

type FrameSrcOptions = {
  mobile?: boolean
}

export function frameSrc(index: number, opts: FrameSrcOptions = {}): string {
  if (opts.mobile) {
    const frameNum = String(index + 1).padStart(3, '0')
    return videoSrc(`/videos/frames-mobile/frame-${frameNum}.webp`)
  }

  const frameNum = String(index + 1).padStart(4, '0')
  return videoSrc(`/videos/frames/frame-${frameNum}.jpg`)
}
