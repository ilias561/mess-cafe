import WhatsAppFloatClient from '@/components/whatsapp-float-client'
import { getSettings } from '@/lib/settings'

function normalizeWhatsappPhone(value: string): string {
  return value.replace(/[^\d]/g, '')
}

export default function WhatsAppFloat() {
  const settings = getSettings()
  const whatsappNumber = normalizeWhatsappPhone(settings.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '306900000000')
  return <WhatsAppFloatClient whatsappNumber={whatsappNumber} />
}
