const BASE = process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? ''
const CACHE_BUST = 'v=20260512'

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
