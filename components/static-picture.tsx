import type { ImgHTMLAttributes } from 'react'
import { getImageManifestEntry } from '@/lib/image-manifest'

type StaticPictureProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

/**
 * Plain-`<img>` semantics, but served from the build-time AVIF/WebP variants
 * when the manifest has them (falls back to the original otherwise). Server-safe:
 * no client JS, no fade — a drop-in for spots where FadeImage's animation is
 * not wanted.
 */
export default function StaticPicture({ src, alt, sizes, ...img }: StaticPictureProps) {
  const entry = getImageManifestEntry(src)

  if (!entry) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} sizes={sizes} {...img} />
  }

  return (
    <picture>
      <source type="image/avif" srcSet={entry.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={entry.webpSrcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={entry.width}
        height={entry.height}
        sizes={sizes}
        {...img}
      />
    </picture>
  )
}
