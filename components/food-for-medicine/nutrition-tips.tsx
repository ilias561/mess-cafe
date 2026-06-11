'use client'

import { m } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import { EASE } from '@/lib/motion'

type NutritionTip = {
  title: string
  intro: string
  points: string[]
}

/** Copy from Apostolos' kitchen notes (2026-06-09), lightly edited for the site. */
const TIPS: NutritionTip[] = [
  {
    title: 'Το ρύζι που γίνεται φυτική ίνα',
    intro: 'Το ήξερες ότι το ρύζι μπορεί να μετατραπεί σε φυτική ίνα;',
    points: [
      'Πάρε το ρύζι που σου αρέσει και μούλιασέ το σε νερό.',
      'Μόλις το νερό θολώσει, στράγγισέ το και πρόσθεσέ το στην κατσαρόλα με φρέσκο νερό και μια κουταλιά της σούπας λάδι καρύδας.',
      'Το λάδι καρύδας αντιδρά με το ρύζι και το μετατρέπει από απλό υδατάνθρακα σε φυτικές ίνες.',
      'Θες να το κάνεις ακόμα πιο υγιεινό; Άσε το ρύζι να ξεκουραστεί ένα βράδυ στο ψυγείο — τώρα έχεις ρύζι που είναι και ανθεκτικό άμυλο (resistant starch).',
    ],
  },
  {
    title: 'Μαύρο κύμινο',
    intro:
      'Θα έχεις παρατηρήσει πως σε όλα τα πιάτα μας υπάρχουν μικροί μαύροι σπόροι. Είναι το μαύρο κύμινο, με ιδιότητες απίστευτα θεραπευτικές για το ανθρώπινο σώμα:',
    points: [
      'Είναι ένα από τα δυνατότερα φυσικά αντιφλεγμονώδη της φύσης.',
      'Έχει αντιπαρασιτικές ιδιότητες.',
      'Λειτουργεί ως φυσικό αντηλιακό — η κατανάλωσή του βοηθά το δέρμα να παράγει έλαια που δρουν ως προστασία από τον ήλιο.',
      'Και όλα αυτά από κάτι μικρά μαύρα σποράκια!',
    ],
  },
  {
    title: 'Ζυμωμένες τροφές',
    intro:
      'Μας αρέσει πάρα πολύ η χρήση των ζυμώσεων στην κουζίνα μας! Γι’ αυτό δημιουργούμε τα δικά μας τουρσιά και πίκλες, τα οποία:',
    points: [
      'Αποτελούν βόμβα πρεβιοτικών και ενζύμων για τον οργανισμό μας.',
      'Αυξάνουν τη θρεπτική αξία των λαχανικών.',
      'Δίνουν αυτή την ιδιαίτερη umami γεύση που αγαπάμε να γευόμαστε.',
      'Βοηθούν στη μεγαλύτερη συντήρηση των προϊόντων.',
      'Όλα φυσικά και αγνά!',
    ],
  },
]

/**
 * Editorial numbered tips — photo anchored left (sticky on desktop), numbered
 * list right, in the spirit of the "reasons why" reference layout.
 */
export default function NutritionTips() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-canopy-night lg:aspect-[3/4]">
          <FadeImage
            src="/images/nutrition-tips.jpg"
            alt="Φρέσκα πολύχρωμα λαχανικά σε προετοιμασία — λάχανο, καρότο, αγγούρι και αβοκάντο"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 420px, 100vw"
          />
        </div>
        <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-olive">
          Από την κουζίνα του M.E.S.S.
        </p>
      </m.div>

      <ol className="flex flex-col gap-10 md:gap-12">
        {TIPS.map((tip, i) => (
          <m.li
            key={tip.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6"
          >
            <span
              aria-hidden
              className="font-serif text-[clamp(24px,3vw,36px)] leading-none text-mustard/80"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-serif text-[clamp(20px,2.4vw,26px)] italic leading-snug tracking-tight text-charcoal">
                {tip.title}
              </h3>
              <p className="mt-2.5 max-w-[58ch] font-sans text-[15px] leading-relaxed text-concrete">
                {tip.intro}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {tip.points.map((point) => (
                  <li
                    key={point}
                    className="relative max-w-[58ch] pl-5 font-sans text-[14px] leading-relaxed text-charcoal/85"
                  >
                    <span
                      aria-hidden
                      className="absolute top-[0.62em] left-0 h-1.5 w-1.5 rounded-full bg-mustard"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              {i < TIPS.length - 1 && (
                <div className="mt-10 h-px w-full bg-line/40 md:mt-12" aria-hidden />
              )}
            </div>
          </m.li>
        ))}
      </ol>
    </div>
  )
}
