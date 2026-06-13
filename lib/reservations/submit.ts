import type { BookingFormValues } from '@/lib/reservations/schema'
import { mailtoUrl, whatsappUrl } from '@/lib/contact-links'

type BookingDetails = Omit<BookingFormValues, 'consent'>

/** Shared body for both channels so WhatsApp and the email fallback read alike. */
function buildMessage(v: BookingDetails): string {
  return [
    '🎉 Νέα κράτηση / αίτημα event από το website M.E.S.S.',
    '',
    `👤 Όνομα: ${v.name}`,
    `📞 Τηλέφωνο: ${v.phone}`,
    `📧 Email: ${v.email}`,
    `🎯 Είδος: ${v.eventType}`,
    `📅 Ημερομηνία: ${v.date}`,
    `👥 Άτομα: ${v.guests}`,
    ...(v.message ? ['', '📝 Σημείωση:', v.message] : []),
  ].join('\n')
}

/** wa.me link pre-filled to the café's WhatsApp number (the primary channel). */
export function bookingWhatsAppUrl(whatsappNumber: string, formData: BookingFormValues): string {
  const { consent: _consent, ...details } = formData
  return whatsappUrl(whatsappNumber, buildMessage(details))
}

/** mailto: into the visitor's own mail app — fallback for no-WhatsApp visitors. */
export function bookingMailtoUrl(email: string, formData: BookingFormValues): string {
  const { consent: _consent, ...details } = formData
  return mailtoUrl(email, `Νέα κράτηση event: ${details.eventType}`, buildMessage(details))
}
