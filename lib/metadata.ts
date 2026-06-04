import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/site-url'

export type OgImageInput = {
  url: string
  alt: string
  width?: number
  height?: number
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: OgImageInput
}

export const DEFAULT_OG_IMAGE: OgImageInput = {
  url: '/images/og-image.jpg',
  alt: 'M.E.S.S. Café — Ιωάννινα',
  width: 1200,
  height: 630,
}

/** Always returns an absolute https:// URL for Open Graph images. */
export function resolveOgImageUrl(url: string): string {
  const trimmed = url?.trim() || DEFAULT_OG_IMAGE.url
  if (trimmed.startsWith('https://')) return trimmed
  if (trimmed.startsWith('http://')) {
    return `https://${trimmed.slice('http://'.length)}`
  }
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const resolved = absoluteUrl(path)
  if (!resolved.startsWith('https://')) {
    return absoluteUrl(DEFAULT_OG_IMAGE.url)
  }
  return resolved
}

export function buildOgImage({ url, alt, width, height }: OgImageInput) {
  const resolved = resolveOgImageUrl(url)
  return {
    url: resolved,
    alt,
    ...(width && height ? { width, height } : {}),
  }
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = buildOgImage(image ?? DEFAULT_OG_IMAGE)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type,
      locale: 'el_GR',
      url,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  }
}
