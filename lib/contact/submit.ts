import { mailtoUrl, whatsappUrl } from '@/lib/contact-links'

export type ContactFormValues = {
  name: string
  email: string
  message: string
}

/** Shared body for both channels so WhatsApp and the email fallback read alike. */
function buildMessage(v: ContactFormValues): string {
  return [
    '💬 Νέο μήνυμα από το website M.E.S.S.',
    '',
    `👤 Όνομα: ${v.name}`,
    `📧 Email: ${v.email}`,
    '',
    '📝 Μήνυμα:',
    v.message,
  ].join('\n')
}

/** wa.me link pre-filled to the café's WhatsApp number (the primary channel). */
export function contactWhatsAppUrl(whatsappNumber: string, v: ContactFormValues): string {
  return whatsappUrl(whatsappNumber, buildMessage(v))
}

/** mailto: into the visitor's own mail app — fallback for no-WhatsApp visitors. */
export function contactMailtoUrl(email: string, v: ContactFormValues): string {
  return mailtoUrl(email, `Νέο μήνυμα από ${v.name}`, buildMessage(v))
}
