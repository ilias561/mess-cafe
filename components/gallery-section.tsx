'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { duration, ease } from '@/lib/motion'
import { imagePlaceholder, images } from '@/lib/images'
import AmbientVideo from '@/components/ambient-video'
import { videoSrc as videoSrcUrl } from '@/lib/media'

type GalleryItem = {
  id: string
  src: string
  videoSrc?: string
  alt: string
  label: string
  caption: string
  gridArea: string
  priority: boolean
}

/* ── Curated editorial selection ── */
const galleryItems: GalleryItem[] = [
  {
    id: 'a',
    src: images.gallery1,
    videoSrc: videoSrcUrl('/videos/ai/0501.mp4'),
    alt: 'Κεντρικό σαλόνι του M.E.S.S. café',
    label: 'ΧΩΡΟΣ',
    caption: 'Κεντρικό σαλόνι, 1ος όροφος ΚΕΠΑΒΙ',
    gridArea: 'a',
    priority: true,
  },
  {
    id: 'b',
    src: images.gallery3,
    alt: 'Ζεστός φωτισμός και ατμόσφαιρα',
    label: 'ΑΤΜΟΣΦΑΙΡΑ',
    caption: 'Ζεστός φωτισμός το απόγευμα',
    gridArea: 'b',
    priority: false,
  },
  {
    id: 'c',
    src: images.gallery4,
    alt: 'Εσωτερικός χώρος και τραπεζαρία',
    label: 'ΕΣΩΤΕΡΙΚΟ',
    caption: 'Χώρος για κάθε ώρα της μέρας',
    gridArea: 'c',
    priority: false,
  },
  {
    id: 'd',
    src: images.menu3,
    alt: 'Specialty coffee και brunch',
    label: 'MENU',
    caption: 'Specialty coffee & brunch table',
    gridArea: 'd',
    priority: false,
  },
  {
    id: 'e',
    src: images.gallery5,
    alt: 'Brunch spread από ψηλά',
    label: 'FOOD',
    caption: 'Φρέσκα υλικά, κάθε μέρα',
    gridArea: 'e',
    priority: false,
  },
]

/* ── Single card ── */
function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem
  onClick: () => void
}) {
  return (
    <Reveal.Item
      style={{
        gridArea: item.gridArea,
        background: item.src ? undefined : imagePlaceholder(),
      }}
      className="group relative cursor-zoom-in overflow-hidden rounded-[2px] bg-bone-warm"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Άνοιγμα φωτογραφίας: ${item.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="absolute inset-0">
        {item.videoSrc ? (
          <AmbientVideo
            src={item.videoSrc}
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            ariaHidden
          />
        ) : (
          <FadeImage
            src={item.src}
            alt={item.alt}
            fill
            unoptimized
            priority={item.priority}
            loading={item.priority ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Hover overlay — desktop only */}
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block" />

      {/* Caption slides up on hover — desktop only */}
      <div className="absolute bottom-0 left-0 hidden translate-y-2 p-4 transition-transform duration-300 ease-out group-hover:translate-y-0 md:block">
        <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-white/60">
          {item.label}
        </p>
        <p className="mt-0.5 font-sans text-[13px] font-medium text-white">
          {item.caption}
        </p>
      </div>
    </Reveal.Item>
  )
}

/* ── Lightbox ── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof galleryItems
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[index]
  const containerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus close button on open; restore trigger element on close
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => { trigger?.focus() }
  }, [])

  // Keyboard: arrows + escape + tab trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') { onPrev(); return }
      if (e.key === 'ArrowRight') { onNext(); return }
      if (e.key === 'Tab' && containerRef.current) {
        const focusable = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
        )
        if (!focusable.length) return
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      key="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Φωτογραφία: ${item.caption}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: 'rgba(10,8,6,0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Κλείσιμο"
        className="ui-interactive absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/70 hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* Prev */}
      {items.length > 1 && (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Προηγούμενη φωτογραφία"
        className="ui-interactive absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/70 hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard md:left-8"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      )}

      {/* Next */}
      {items.length > 1 && (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Επόμενη φωτογραφία"
        className="ui-interactive absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/70 hover:border-mustard hover:text-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard md:right-8"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>
      )}

      {/* Image container */}
      <motion.div
        key={item.id}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: duration.fast, ease: ease.out }}
      >
        <motion.div
          className="relative max-h-[80vh] w-auto overflow-hidden rounded-[2px]"
          style={{ aspectRatio: '4/3', maxWidth: 'min(85vw, 1100px)' }}>
          <FadeImage
            src={item.src}
            alt={item.alt}
            fill
            unoptimized
            className="object-contain"
          />
        </motion.div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bone/40">
            {item.label}
          </p>
          <p className="mt-1 font-sans text-[14px] text-bone/70">{item.caption}</p>
          <p className="mt-2 font-sans text-[11px] text-bone/25">
            {index + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Section ── */
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = (i: number) => setLightboxIndex(i)
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length)),
    [],
  )
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryItems.length)),
    [],
  )

  return (
    <>
      <section id="gallery" className="scroll-mt-20 border-t border-line/30 bg-bone px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">

          {/* Heading */}
          <Reveal className="mb-12">
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
              ΧΩΡΟΣ & ΑΤΜΟΣΦΑΙΡΑ
            </p>
            <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-charcoal">
              Δύο επίπεδα.{' '}
              <span className="italic text-olive">Άπειρες γωνιές.</span>
            </h2>
          </Reveal>

          {/* Mobile / tablet: single-column stack */}
          <Reveal asGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {galleryItems.map((item, i) => (
              <Reveal.Item key={item.id}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Άνοιγμα φωτογραφίας: ${item.alt}`}
                  className={`${item.id === 'a' ? 'aspect-[3/4.12]' : 'aspect-[3/2]'} cursor-zoom-in overflow-hidden rounded-[2px] bg-bone-warm`}
                  style={!item.src ? { background: imagePlaceholder() } : undefined}
                  onClick={() => open(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i) } }}
                >
                  <div className="relative h-full w-full">
                    {item.videoSrc ? (
                      <AmbientVideo
                        src={item.videoSrc}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: '50% 30%' }}
                        ariaHidden
                      />
                    ) : (
                      <FadeImage
                        src={item.src}
                        alt={item.alt}
                        fill
                        unoptimized
                        loading={i === 0 ? 'eager' : 'lazy'}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                </div>
              </Reveal.Item>
            ))}
          </Reveal>

          {/* Desktop: editorial CSS grid */}
          <Reveal
            asGroup
            className="hidden h-[960px] gap-3 lg:grid lg:grid-cols-3"
            style={{
              gridTemplateAreas: '"a a b" "a a c" "d e c"',
              gridTemplateRows: '340px 340px 260px',
            }}
          >
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => open(i)}
              />
            ))}
          </Reveal>


        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
