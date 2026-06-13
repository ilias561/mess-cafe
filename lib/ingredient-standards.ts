export type IngredientStandard = {
  slug: string
  name: string
  better: string
}

export const ingredientStandards: IngredientStandard[] = [
  {
    slug: 'olive-oil',
    name: 'Εξτρα Παρθένο Ελαιόλαδο',
    better: 'Μαγειρεύουμε με ελαιόλαδο, βούτυρο και φυτικό λάδι καρύδας.',
  },
  {
    slug: 'sourdough',
    name: 'Ψωμί Προζυμιού',
    better:
      'Ψωμί αργής ωρίμανσης, ψημένο σε ξυλόφουρνο. Λέμε όχι στο βιομηχανικό ψωμί με βελτιωτικά.',
  },
  {
    // Image still keyed to the old slug so the card keeps rendering a photo until
    // the plant-milk shot lands — see note to user; swap /images/ingredients then.
    slug: 'free-range-eggs',
    name: 'Χειροποίητα Φυτικά Γάλατα',
    better:
      'Μαγειρεύουμε τον καρπό από τα κτήματά μας και φτιάχνουμε για εσάς φυτικά γάλατα χωρίς συντηρητικά — από τη φάρμα στο τραπέζι σας.',
  },
  {
    slug: 'no-frying',
    name: 'Χωρίς Τηγάνισμα',
    better: 'Ψήσιμο, ατμός και σχάρα αντί για deep frying που αλλοιώνει τα λιπαρά.',
  },
  {
    slug: 'natural-sweetness',
    name: 'Φυσική Γλυκύτητα',
    better: 'Μέλι, αγάβη και χουρμάδες στη θέση της ραφιναρισμένης ζάχαρης.',
  },
  {
    slug: 'whole-grains',
    name: 'Φυσικές Ζυμώσεις',
    better:
      'Τα πιάτα μας εμπλουτίζονται με χειροποίητες πίκλες και τουρσί, που τροφοδοτούν τον οργανισμό με ένζυμα και προβιοτικά.',
  },
]
