export type IngredientStandard = {
  slug: string
  name: string
  better: string
}

export const ingredientStandards: IngredientStandard[] = [
  {
    slug: 'olive-oil',
    name: 'Εξτρα Παρθένο Ελαιόλαδο',
    better: 'Μαγειρεύουμε με ελαιόλαδο και φυσικά λίπη — ποτέ ραφιναρισμένα σπορέλαια.',
  },
  {
    slug: 'sourdough',
    name: 'Ψωμί Προζυμιού',
    better: 'Αργή, φυσική ωρίμανση αντί για βιομηχανικό ψωμί με βελτιωτικά.',
  },
  {
    slug: 'free-range-eggs',
    name: 'Αυγά Ελευθέρας Βοσκής',
    better: 'Από κότες ελευθέρας βοσκής, με πλουσιότερο προφίλ θρεπτικών.',
  },
  {
    slug: 'no-frying',
    name: 'Χωρίς Τηγάνισμα',
    better: 'Ψήσιμο, ατμός και σχάρα αντί για deep frying που αλλοιώνει τα λιπαρά.',
  },
  {
    slug: 'natural-sweetness',
    name: 'Φυσική Γλυκύτητα',
    better: 'Χουρμάδες, μέλι και φρούτα στη θέση της ραφιναρισμένης ζάχαρης.',
  },
  {
    slug: 'whole-grains',
    name: 'Ολικής & Υπερτροφές',
    better: 'Quinoa, άγριο ρύζι και σπόροι αντί για επεξεργασμένους υδατάνθρακες.',
  },
]
