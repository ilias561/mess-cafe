import type { Metadata } from 'next'
import Link from 'next/link'
import LegalDocumentLayout from '@/components/legal/legal-document-layout'
import { buildPageMetadata } from '@/lib/metadata'

const UPDATED = '15/05/2026'

export const metadata: Metadata = buildPageMetadata({
  title: 'Πολιτική Cookies — M.E.S.S.',
  description:
    'Πληροφορίες για cookies και παρόμοιες τεχνολογίες στον ιστότοπο του M.E.S.S.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <LegalDocumentLayout title="Πολιτική Cookies" updatedLabel={`Τελευταία ενημέρωση: ${UPDATED}`}>
      <p>
        Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στο πρόγραμμα περιήγησής σας όταν
        επισκέπτεστε έναν ιστότοπο. Χρησιμοποιούνται συνήθως για τη λειτουργία της σελίδας, τη
        βελτίωση της εμπειρίας ή — σε ορισμένες περιπτώσεις — για στατιστική ανάλυση.
      </p>

      <h2>Ποια cookies χρησιμοποιούμε</h2>
      <p>
        <strong>Αυτή τη στιγμή δεν χρησιμοποιούμε cookies καταγραφής ή διαφήμισης (tracking).</strong>{' '}
        Το Cloudflare Web Analytics είναι cookieless και δεν αποθηκεύει προσωπικά αναγνωριστικά στο
        πρόγραμμα περιήγησής σας. Αν προστεθεί άλλο εργαλείο ανάλυσης ή marketing στο μέλλον, η
        παρούσα σελίδα θα ενημερωθεί ανάλογα.
      </p>
      <p>
        Ο χάρτης Google Maps φορτώνεται μόνο μετά τη συγκατάθεσή σας στο footer και ενδέχεται να
        τοποθετήσει cookies τρίτων κατά τη φόρτωση.
      </p>

      <h2>Πώς να τα απενεργοποιήσετε</h2>
      <p>
        Μπορείτε να διαχειριστείτε ή να αποκλείσετε cookies από τις ρυθμίσεις του προγράμματος
        περιήγησής σας (Chrome, Safari, Firefox κ.λπ.). Η απενεργοποίηση ορισμένων cookies μπορεί
        να επηρεάσει τη λειτουργία τρίτων υπηρεσιών (π.χ. ενσωματωμένου χάρτη).
      </p>

      <h2>Επικοινωνία</h2>
      <p>
        Για ερωτήσεις σχετικά με την προστασία δεδομένων, δείτε την{' '}
        <Link href="/privacy">Πολιτική Απορρήτου</Link>.
      </p>
    </LegalDocumentLayout>
  )
}
