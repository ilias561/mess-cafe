/**
 * Keyless contact channels — both build a URL the visitor's own app handles,
 * so they work on a static export with zero server keys (no Web3Forms/relay):
 *
 *   • WhatsApp  → wa.me click-to-chat, pre-filled to the café's number
 *   • Email     → mailto: into the visitor's mail app, same pre-filled body
 *
 * WhatsApp is primary; the mailto is the fallback for visitors without WhatsApp
 * (you cannot detect WhatsApp from the web, so always offer both).
 */

/** Strip everything but digits — wa.me wants international format with no '+'. */
export function toPhoneDigits(value: string | undefined): string {
  return (value || '').replace(/[^\d]/g, '')
}

export function whatsappUrl(number: string, text: string): string {
  return `https://wa.me/${toPhoneDigits(number)}?text=${encodeURIComponent(text)}`
}

export function mailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
