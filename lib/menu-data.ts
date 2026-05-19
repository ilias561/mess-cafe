export type MenuItem = {
  name: string
  desc: string
  price: string
  badges?: ('vegan' | 'vegetarian' | 'gf' | 'signature')[]
  image?: string
  video?: string
  /** Optional 64×64 ingredient thumbnail beside list-layout descriptions */
  ingredientsImage?: string
}

export type MenuCategory = {
  id: string
  title: string
  titleGr: string
  items: MenuItem[]
}

export function getCategoryLayout(category: MenuCategory): 'visual' | 'list' {
  const withMedia = category.items.filter((i) => i.image || i.video).length
  return withMedia >= Math.ceil(category.items.length / 2) ? 'visual' : 'list'
}

export const menuData: MenuCategory[] = [
  {
    id: 'brunch',
    title: 'BREAKFAST & BRUNCH',
    titleGr: 'Πρωινό & Brunch',
    items: [
      {
        name: 'Spread Mix',
        desc: 'Επιλογή από spreads και ψωμί της ημέρας.',
        price: '6.5€',
        image: '/images/menu/piata-0013.jpg',
      },
      {
        name: 'Classic Omelette',
        desc: '3 υλικά της επιλογής σας.',
        price: '6.5€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0016.jpg',
      },
      {
        name: 'Scrambled Eggs',
        desc: '3 υλικά της επιλογής σας.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0018.jpg',
      },
      {
        name: 'Grilled Cheese with Mushrooms',
        desc: 'Προζυμένιο ψωμί, parmigiana, σέβρ, γρούγιερ, μανιτάρια πλευρώτους. Συνοδεύεται με chutney μάνγκο.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0020.jpg',
      },
      {
        name: 'Avocado Toast',
        desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
        price: '9€',
        badges: ['vegetarian', 'signature'],
        image: '/images/menu/piata-0009.jpg',
      },
      {
        name: 'Apaki On Toast',
        desc: 'Προζυμένιο ψωμί, apaki, αυγό, ντοματίνια, ρόκα.',
        price: '10€',
        image: '/images/menu/piata-0015.jpg',
      },
    ],
  },
  {
    id: 'bowls',
    title: 'BOWLS',
    titleGr: 'Μπολ',
    items: [
      {
        name: 'Vegan Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, γλυκοπατάτα, αράκας, καλαμπόκι, ρόκα, φασόλια κόκκινα, φρέσκο κρεμμύδι, σπόροι από μαύρο κύμινο.',
        price: '8€',
        badges: ['vegan'],
        image: '/images/menu/piata-0028.jpg',
      },
      {
        name: 'Breakfast Bowl',
        desc: 'Αυγό ποσέ, μπέικον, αβοκάντο, μανιτάρια, ντοματίνια, ρόκα, προζυμένιο ψωμί με μυρωδικά.',
        price: '9€',
        badges: ['signature'],
        image: '/images/menu/piata-0022.jpg',
      },
      {
        name: 'Teriyaki Chicken Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, κοτόπουλο τεριγιάκι, καρότο, λάχανο κόκκινο, κρεμμύδι, ραπανάκι, κολοκύθι, αυγό ποσέ, άσπρο και μαύρο σουσάμι.',
        price: '11€',
        badges: ['signature'],
        image: '/images/menu/piata-0025.jpg',
      },
      {
        name: 'Chicken Pineapple Poke Bowl',
        desc: 'Κοτόπουλο, ανανάς, ρύζι, λαχανικά, σως τροπική.',
        price: '12€',
        image: '/images/menu/piata-0031.jpg',
      },
      {
        name: 'Noodles with Shrimps Poke Bowl',
        desc: 'Noodles, γαρίδες, λαχανικά, σως πικάντικη.',
        price: '9€',
      },
    ],
  },
  {
    id: 'salads',
    title: 'SALADS',
    titleGr: 'Σαλάτες',
    items: [
      {
        name: 'Dakos Salad',
        desc: 'Ντομάτα, φέτα, ελιές, παξιμάδι, ρίγανη, ελαιόλαδο.',
        price: '8€',
        badges: ['vegetarian'],
      },
      {
        name: 'Caesar Salad',
        desc: 'Iceberg, κρουτόν από ρεβύθια, κοτόπουλο sous vide, παρμεζάνα, MJ dressing.',
        price: '10€',
      },
    ],
  },
  {
    id: 'wraps',
    title: 'WRAPS',
    titleGr: 'Wraps',
    items: [
      {
        name: 'Sweet Chilly Chicken Wrap',
        desc: 'Κοτόπουλο σε σως sweet chilli, τορτίγια, λαχανικά.',
        price: '7€',
      },
      {
        name: 'Garden Burger',
        desc: 'Μπιφτέκι λαχανικών με ρόκα, ντομάτα, σπιτική σος.',
        price: '9€',
        badges: ['vegan'],
      },
      {
        name: 'Beef Tagliata',
        desc: 'Μοσχαρίσιο tagliata, ρόκα, παρμεζάνα, balsamic, λάδι τρούφα.',
        price: '14€',
        badges: ['signature'],
      },
    ],
  },
  {
    id: 'coffee',
    title: 'COFFEE & TEA',
    titleGr: 'Καφές & Τσάι',
    items: [
      { name: 'Espresso', desc: 'Specialty single origin.', price: '2.5€' },
      { name: 'Double Espresso', desc: 'Specialty single origin.', price: '3.8€' },
      { name: 'Macchiato', desc: 'Espresso με αφρό γάλακτος.', price: '3€' },
      { name: 'Double Macchiato', desc: 'Διπλό espresso με αφρό γάλακτος.', price: '4€' },
      { name: 'Cappuccino', desc: 'Espresso, ζεστό γάλα, βελούδινος αφρός.', price: '3.8€' },
      { name: 'Latte / Iced Latte', desc: 'Espresso με γάλα — ζεστό ή παγωμένο.', price: '4.5€' },
      { name: 'Freddo Espresso', desc: 'Παγωμένο espresso.', price: '3.6€' },
      { name: 'Freddo Cappuccino', desc: 'Freddo espresso με παγωμένο αφρό γάλακτος.', price: '4.3€' },
      { name: 'Raw Organic Cocoa', desc: 'Οργανικό κακάο χωρίς πρόσθετα.', price: '4€' },
      { name: 'Aztec Cocoa', desc: 'Με κανέλα, μέλι και μπαχαρικά.', price: '5€' },
      { name: 'Σοκολάτα (Ζεστή / Κρύα)', desc: 'Με γάλα της επιλογής σας.', price: '4.5€' },
      { name: 'Matcha Latte', desc: 'Matcha με γάλα της επιλογής σας.', price: '4€' },
      { name: 'Matcha', desc: 'Παραδοσιακό matcha.', price: '4.5€' },
      { name: 'Τσάι (Κρύο / Ζεστό)', desc: 'Τσάι σπιτικό, πράσινο, μαύρο.', price: '3.8€' },
    ],
  },
  {
    id: 'smoothies',
    title: 'SMOOTHIES, JUICES & SOFT DRINKS',
    titleGr: 'Smoothies & Χυμοί',
    items: [
      {
        name: 'Blueberry Smoothie',
        desc: 'Blueberries, χειροποίητο γάλα αμυγδάλου, μπανάνα, μέλι.',
        price: '6€',
        badges: ['vegetarian'],
        video: '/images/menu/drink-pink-low.mp4',
      },
      {
        name: 'Mango Chilli Smoothie',
        desc: 'Μάνγκο, τσίλι flakes, αγαύη, χειροποίητο γάλα καρυδιών και βρώμης, λάιμ.',
        price: '6€',
        badges: ['vegan', 'signature'],
        video: '/images/menu/drink-yellow-lemon.mp4',
      },
      {
        name: 'Fresh O.J.',
        desc: 'Φρεσοστυμμένος χυμός πορτοκαλιού.',
        price: '5€',
        video: '/images/menu/drink-lillet-spritz.mp4',
      },
      {
        name: 'Homemade Pink Lemonade',
        desc: 'Σπιτική ροζ λεμονάδα.',
        price: '4€',
        video: '/images/menu/drink-lillet-strawberry.mp4',
      },
      {
        name: 'Natural Pink Lemonade',
        desc: 'Φυσική ροζ λεμονάδα.',
        price: '4.5€',
        video: '/images/menu/drink-white-lemon.mp4',
      },
      {
        name: 'Mixed Juice',
        desc: 'Μείγμα εποχιακών φρούτων.',
        price: '6€',
        video: '/images/menu/drink-red-low.mp4',
      },
      {
        name: 'Kombucha',
        desc: 'Ζυμωμένο τσάι, ελαφρύ και δροσιστικό.',
        price: '4€',
        video: '/images/menu/drink-cucumber-herbs.mp4',
      },
    ],
  },
  {
    id: 'treats',
    title: 'HEALTHY TREATS & SNACKS',
    titleGr: 'Γλυκά & Snacks',
    items: [
      { name: 'Banana Bread', desc: 'Χειροποίητο με ελάχιστη ζάχαρη.', price: '2.5€', badges: ['vegetarian'], image: '/images/menu/glyka-0001.jpg' },
      { name: 'Chia Pudding', desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.', price: '4€', badges: ['vegan'], image: '/images/menu/glyka-0002.jpg' },
      { name: 'Βάσικο Cheesecake', desc: 'Χωρίς ψήσιμο, ελαφρύ και δροσιστικό.', price: '4€', badges: ['vegetarian'], image: '/images/menu/glyka-0003.jpg' },
      { name: 'Chocolate Cake', desc: 'Με γλυκοπατάτα, χουρμάδες, χωρίς ζάχαρη.', price: '3.5€', badges: ['vegan'], image: '/images/menu/glyka-0004.jpg' },
    ],
  },
]

export const extras = {
  vegExtras: {
    label: 'EXTRAS',
    price: '+0.70€',
    items: 'Φέτα, κρεμμύδι, σοταρισμένα ντοματίνια, σοταρισμένα μανιτάρια, μπέικον, σκόρδο, πράσινη πιπεριά, μαγιονέζα, σχοινόπρασο.',
  },
  proteinExtras: {
    label: 'EXTRAS',
    price: '+2€',
    items: 'Κοτόπουλο ελεύθερης βοσκής, σολομός, μοσχάρι.',
  },
  fruitExtras: {
    label: 'ΦΡΟΥΤΑ & ΞΗΡΟΙ ΚΑΡΠΟΙ',
    price: '+0.70€',
    items: 'Ανανάς, βερίκοκο, χουρμάδες, σταφίδες, κράνμπερι, δαμάσκηνα, σύκα, goji berries, αμύγδαλα, καρύδια, granola.',
  },
}
