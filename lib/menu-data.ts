export type MenuItem = {
  name: string
  desc: string
  price: string
  badges?: ('vegan' | 'vegetarian' | 'gf' | 'signature')[]
}

export type MenuCategory = {
  id: string
  title: string
  titleGr: string
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: 'brunch',
    title: 'BREAKFAST & BRUNCH',
    titleGr: 'Πρωινό & Brunch',
    items: [
      { name: 'Classic Omelette', desc: '3 υλικά της επιλογής σας.', price: '7€', badges: ['vegetarian'] },
      { name: 'Egg White Omelette', desc: '3 υλικά της επιλογής σας.', price: '7€', badges: ['vegetarian'] },
      { name: 'Scrambled Eggs', desc: '3 υλικά της επιλογής σας.', price: '7€', badges: ['vegetarian'] },
      { name: 'Avocado Toast', desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.', price: '9€', badges: ['vegetarian', 'signature'] },
      { name: 'Grilled Cheese with Mushrooms', desc: 'Προζυμένιο ψωμί, parmigiana, σέβρ (κατσικίσιο τυρί με πιπέρι), γρούγιερ, μανιτάρια πλευρώτους. Συνοδεύεται με chutney μάνγκο.', price: '7€', badges: ['vegetarian'] },
    ],
  },
  {
    id: 'bowls',
    title: 'BOWLS',
    titleGr: 'Μπολ',
    items: [
      { name: 'Breakfast Bowl', desc: 'Αυγό ποσέ, μπέικον, αβοκάντο, μανιτάρια, ντοματίνια, ρόκα, προζυμένιο ψωμί με μυρωδικά.', price: '9€', badges: ['signature'] },
      { name: 'Teriyaki Chicken Poke Bowl', desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, κοτόπουλο τεριγιάκι, καρότο, λάχανο κόκκινο, κρεμμύδι, ραπανάκι, κολοκύθι, αυγό ποσέ, άσπρο και μαύρο σουσάμι.', price: '10€', badges: ['signature'] },
      { name: 'Vegan Poke Bowl', desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, γλυκοπατάτα, αράκας, καλαμπόκι, ρόκα, φασόλια κόκκινα, φρέσκο κρεμμύδι, σπόροι από μαύρο κύμινο.', price: '8€', badges: ['vegan'] },
      { name: 'Beef Poke Bowl', desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, μοσχάρι sous vide, γλυκοπατάτα, sriracha sauce, ραπανάκι, κόκκινο λάχανο, καρότο, αράκας, αυγό ποσέ.', price: '12€' },
      { name: 'Yogurt Bowl', desc: 'Βάση από γιαούρτι, κανέλα Κεϋλάνης, καρύδια και μέλι. Έξτρα υλικά της επιλογής σας.', price: '5€', badges: ['vegetarian'] },
      { name: 'Acai Bowl', desc: '100% açaí, πράσινο μήλο, flakes καρύδας, granola, banana, χειροποίητο γάλα αμυγδάλου.', price: '12€', badges: ['vegan', 'signature'] },
    ],
  },
  {
    id: 'salads',
    title: 'SALADS',
    titleGr: 'Σαλάτες',
    items: [
      { name: 'Caesar Salad', desc: 'Iceberg, κρουτόν από ρεβύθια, κοτόπουλο sous vide, παρμεζάνα, MJ dressing.', price: '10€' },
      { name: 'Broccoli Salad', desc: 'Ψητό μπρόκολο και κουνουπίδι, καβουρδισμένο κουκουνάρι, μανιτάρια πλευρώτους, σταφίδα, dressing από ταχίνι και φρέσκα μυρωδικά.', price: '9.5€', badges: ['vegan'] },
      { name: 'Superfood Salad', desc: 'Τρίχρωμη κινόα μαγειρεμένη σε ζωμό λαχανικών, παντζάρι, φακές, φασόλια, cranberry, παξιμάδι χαρουπιού, δαμάσκηνα, dressing εσπεριδοειδών.', price: '11€', badges: ['vegan'] },
      { name: 'Sweet Potato Salad', desc: 'Γλυκοπατάτα, κρεμμύδι κόκκινο, ρεβύθια, ρόκα, φινόκιο, ραδίκι.', price: '10€', badges: ['vegan'] },
    ],
  },
  {
    id: 'coffee',
    title: 'COFFEE & TEA',
    titleGr: 'Καφές & Τσάι',
    items: [
      { name: 'Espresso', desc: 'Specialty single origin.', price: '2.5€' },
      { name: 'Double Espresso', desc: 'Specialty single origin.', price: '3.8€' },
      { name: 'Macchiato', desc: 'Espresso με αφρό γάλακτος.', price: '4.3€' },
      { name: 'Cappuccino', desc: 'Espresso, ζεστό γάλα, βελούδινος αφρός.', price: '3.8€' },
      { name: 'Double Cappuccino', desc: 'Διπλό espresso, ζεστό γάλα, αφρός.', price: '4.3€' },
      { name: 'Freddo Espresso', desc: 'Παγωμένο espresso.', price: '3.8€' },
      { name: 'Freddo Cappuccino', desc: 'Freddo espresso με παγωμένο αφρό γάλακτος.', price: '4.3€' },
      { name: 'Raw Organic Cacao', desc: 'Οργανικό κακάο χωρίς πρόσθετα.', price: '4€' },
      { name: 'Raw Organic Cacao Premium', desc: 'Με μέλι, μαύρο πιπέρι και έλαιο πορτοκαλιού.', price: '5€' },
      { name: 'Σοκολάτα (Ζεστή / Κρύα)', desc: 'Με γάλα της επιλογής σας.', price: '4.5€' },
      { name: 'Τσάι (Κρύο / Ζεστό)', desc: 'Τσάι σπιτικό, πράσινο, μαύρο.', price: '3.8€' },
    ],
  },
  {
    id: 'smoothies',
    title: 'SMOOTHIES',
    titleGr: 'Smoothies',
    items: [
      { name: 'Blueberry Smoothie', desc: 'Blueberries, χειροποίητο γάλα αμυγδάλου, μπανάνα, μέλι.', price: '6€', badges: ['vegetarian'] },
      { name: 'Mango Chilli Smoothie', desc: 'Μάνγκο, τσίλι flakes, αγαύη, χειροποίητο γάλα καρυδιών και βρώμης, λάιμ.', price: '6€', badges: ['vegan', 'signature'] },
      { name: 'Acai Smoothie', desc: '100% açaí, μπανάνα, χειροποίητο γάλα σπόρων, αγαύη, μήλο.', price: '9€', badges: ['vegan'] },
      { name: 'Protein Smoothie', desc: 'Whey protein, μέλι, μπανάνα, βιολογικό κακάο, γάλα της επιλογής σας.', price: '7€' },
    ],
  },
  {
    id: 'treats',
    title: 'HEALTHY TREATS & SNACKS',
    titleGr: 'Γλυκά & Snacks',
    items: [
      { name: 'Banana Bread', desc: 'Χειροποίητο με ελάχιστη ζάχαρη.', price: '2.5€', badges: ['vegetarian'] },
      { name: 'Chia Pudding', desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.', price: '4€', badges: ['vegan'] },
      { name: 'Βάσικο Cheesecake', desc: 'Χωρίς ψήσιμο, ελαφρύ και δροσιστικό.', price: '4€', badges: ['vegetarian'] },
      { name: 'Chocolate Cake', desc: 'Με γλυκοπατάτα, χουρμάδες, χωρίς ζάχαρη.', price: '3.5€', badges: ['vegan'] },
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
