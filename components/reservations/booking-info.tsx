import type { Settings } from '@/lib/settings'

function normalizeWhatsappPhone(value: string): string {
  return value.replace(/[^\d]/g, '')
}

type BookingInfoProps = {
  settings: Settings
}

export default function BookingInfo({ settings }: BookingInfoProps) {
  const whatsappNumber = normalizeWhatsappPhone(settings.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '306900000000')
  const whatsappMessage = 'Γεια σας! Θα ήθελα να κλείσω εκδήλωση στο M.E.S.S.'
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <aside className="border border-line/30 bg-bone-warm p-8">
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΠΛΗΡΟΦΟΡΙΕΣ</p>
      <p className="mt-5 font-sans text-[16px] leading-[1.7] text-concrete">
        Αναλαμβάνουμε workshops, ιδιωτικά events, live μουσικές βραδιές και παρουσιάσεις βιβλίων στον χώρο του
        M.E.S.S.
      </p>

      <ul className="mt-6 list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.7] text-charcoal marker:text-mustard">
        <li>Σχεδιασμός διάταξης και βασικού flow εκδήλωσης</li>
        <li>Προτάσεις για coffee service και menu</li>
        <li>Απάντηση εντός 24-48 ωρών για διαθεσιμότητα</li>
      </ul>

      <div className="mt-8 border-t border-line/40 pt-8">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1EBE5A]"
        >
          Στείλε μας WhatsApp
        </a>
        <p className="mt-4 text-center font-sans text-[13px] text-concrete">Ή τηλεφώνησε: {settings.phone}</p>
      </div>
    </aside>
  )
}
