const BASE = process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? ''

export function videoSrc(path: string): string {
  return `${BASE}${path}`
}
