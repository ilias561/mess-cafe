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

function resolveOgImageUrl(url: string): string {
  return url.startsWith('http') ? url : absoluteUrl(url)
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
  const ogImage = image ? buildOgImage(image) : undefined

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
