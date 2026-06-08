/** Lightweight coordination between fixed bottom-right overlays (newsletter, WhatsApp). */
export const NEWSLETTER_OPEN_EVENT = 'mess:newsletter-open'
export const NEWSLETTER_CLOSE_EVENT = 'mess:newsletter-close'

export function dispatchNewsletterOpen() {
  window.dispatchEvent(new Event(NEWSLETTER_OPEN_EVENT))
}

export function dispatchNewsletterClose() {
  window.dispatchEvent(new Event(NEWSLETTER_CLOSE_EVENT))
}
