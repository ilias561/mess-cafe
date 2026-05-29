'use client'

import dynamic from 'next/dynamic'

const NewsletterPopup = dynamic(() => import('@/components/newsletter-popup'), { ssr: false })
const ReviewOverlay = dynamic(() => import('@/components/review-overlay'), { ssr: false })

export default function DeferredOverlays() {
  return (
    <>
      <NewsletterPopup />
      <ReviewOverlay />
    </>
  )
}
