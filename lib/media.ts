/**
 * Video / frame URLs must point at R2 in production: `public/videos/` is gitignored
 * and not present on Cloudflare Pages, so same-origin `/videos/...` would 404.
 *
 * `NEXT_PUBLIC_VIDEO_BASE_URL` wins when set (local .env.local or Pages env).
 * On Cloudflare Pages builds, `CF_PAGES=1` and the var is often unset — use the
 * public R2.dev host for this project (override via env if the bucket URL changes).
 */
const R2_PUBLIC_DEV_HOST = 'https://pub-12b72636ade74f3aa8f7f8c3c51f5086.r2.dev'

function mediaBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VIDEO_BASE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  if (process.env.CF_PAGES === '1') return R2_PUBLIC_DEV_HOST.replace(/\/+$/, '')
  return ''
}

const BASE = mediaBaseUrl()
const CACHE_BUST = 'v=20260514'

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
