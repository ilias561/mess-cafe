import { menuData } from '@/lib/menu-data'

type DietBadge = 'vegan' | 'vegetarian' | 'gf'

/** Greek labels for the diet badges that actually appear in the menu data. */
const DIET_LABELS: Record<DietBadge, string> = {
  vegan: 'vegan',
  vegetarian: 'χορτοφαγικές',
  gf: 'χωρίς γλουτένη',
}

/** Which diet options are genuinely present in the menu (derived from item badges). */
function availableDiets(): string[] {
  const present = new Set<DietBadge>()
  for (const category of menuData) {
    for (const item of category.items) {
      for (const badge of item.badges ?? []) {
        if (badge === 'vegan' || badge === 'vegetarian' || badge === 'gf') {
          present.add(badge)
        }
      }
    }
  }
  return (['vegan', 'vegetarian', 'gf'] as const)
    .filter((badge) => present.has(badge))
    .map((badge) => DIET_LABELS[badge])
}

type QA = { question: string; answer: string }

/**
 * First-party FAQ entries. Every answer reflects facts shown elsewhere on the
 * site (hours + address in the footer/contact section, reservations page,
 * diet badges on the menu) — no invented information.
 */
function buildFaqEntries(): QA[] {
  const entries: QA[] = [
    {
      question: 'Ποιες ώρες είναι ανοιχτό το M.E.S.S.;',
      answer:
        'Είμαστε ανοιχτά Δευτέρα–Παρασκευή 08:00–23:00 και Σάββατο–Κυριακή 09:00–24:00.',
    },
    {
      question: 'Πού βρίσκεται το M.E.S.S.;',
      answer:
        'Στο ΚΕΠΑΒΙ, δίπλα στη λίμνη των Ιωαννίνων — Ναπολέοντος Ζέρβα 12, 45332 Ιωάννινα.',
    },
    {
      question: 'Μπορώ να κάνω κράτηση τραπεζιού;',
      answer:
        'Ναι, δεχόμαστε κρατήσεις. Μπορείς να κλείσεις τραπέζι μέσα από τη σελίδα κρατήσεων ή τηλεφωνικά.',
    },
  ]

  const diets = availableDiets()
  if (diets.length > 0) {
    const list =
      diets.length > 1
        ? `${diets.slice(0, -1).join(', ')} και ${diets[diets.length - 1]}`
        : diets[0]
    entries.push({
      question: 'Έχετε vegan, χορτοφαγικές ή χωρίς γλουτένη επιλογές;',
      answer: `Ναι. Στο μενού μας θα βρεις ${list} επιλογές, σημειωμένες με ειδικές ενδείξεις σε κάθε πιάτο.`,
    })
  }

  return entries
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: buildFaqEntries().map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  }
}
