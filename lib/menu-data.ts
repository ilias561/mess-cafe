export type Nutrition = {
  calories: number
  protein: number
  carbs: number
  fat: number
  sugar: number
  fiber: number
}

export type MenuItem = {
  name: string
  desc: string
  price?: string
  badges?: ('vegan' | 'vegetarian' | 'gf' | 'signature')[]
  nutrition?: Nutrition
  benefit?: string
  image?: string
  video?: string
  cutout?: string // transparent-bg PNG; when set, item renders as a floating product card
  ingredientsImage?: string
}

export type MenuLayout = 'feature' | 'grid' | 'list' | 'card'

export type MenuCategory = {
  id: string
  title: string
  titleGr: string
  layout?: MenuLayout
  hideNutrition?: boolean
  items: MenuItem[]
}

export function getCategoryLayout(category: MenuCategory): 'visual' | 'list' {
  const withMedia = category.items.filter((i) => i.image || i.video).length
  return withMedia >= Math.ceil(category.items.length / 2) ? 'visual' : 'list'
}

export const menuData: MenuCategory[] = [
  {
    id: 'brunch',
    title: 'BREAKFAST',
    titleGr: 'Πρωινό',
    layout: 'feature',
    items: [
      {
        name: 'Spread Mix',
        desc: 'Δύο φέτες προζυμένιου ψωμιού — μία με γουακαμόλε, μία με φυστικοβούτυρο. Απόλυτη ισορροπία μεταξύ αλμυρού και γλυκού.',
        price: '6.5€',
        image: '/images/menu/piata-0018.jpg',
        nutrition: { calories: 280, protein: 7, carbs: 38, fat: 11, sugar: 5, fiber: 3 },
        benefit: 'Φυτικές ίνες, ιχνοστοιχεία και ω-3 λιπαρά.',
      },
      {
        name: 'Classic Omelette',
        desc: '3 υλικά της επιλογής σας.',
        price: '6.5€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0016.jpg',
        nutrition: { calories: 320, protein: 18, carbs: 6, fat: 24, sugar: 2, fiber: 1 },
        benefit:
          'Το αυγό θεωρείται η πιο θρεπτική τροφή για τον άνθρωπο — εμείς το κάνουμε και νόστιμο.',
      },
      {
        name: 'Scrambled Eggs',
        desc: 'Αυγά χτυπημένα με γιαούρτι, μαύρο κύμινο και ηλιέλαιο.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0013.jpg',
        nutrition: { calories: 340, protein: 19, carbs: 7, fat: 26, sugar: 2, fiber: 1 },
        benefit: 'Πρωτεϊνική βόμβα για το ξεκίνημα της μέρας σου.',
      },
      {
        name: 'Grilled Cheese with Mushrooms',
        desc: 'Προζυμένιο ψωμί, μιξ από παλαιωμένες γραβιέρες, μανιτάρια πλευρώτους. Συνοδεύεται με chutney μάνγκο.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0015.jpg',
        nutrition: { calories: 480, protein: 22, carbs: 36, fat: 28, sugar: 8, fiber: 3 },
        benefit:
          'Οι παλαιωμένες γραβιέρες αποτελούν βασική πηγή προβιοτικών και ενζύμων — το πεπτικό σου θα το ευγνωμονεί.',
      },
      {
        name: 'Avocado Toast',
        desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
        price: '9€',
        badges: ['vegetarian', 'signature'],
        image: '/images/menu/piata-0009.jpg',
        nutrition: { calories: 420, protein: 14, carbs: 38, fat: 24, sugar: 4, fiber: 9 },
        benefit:
          'Το πιο ολοκληρωμένο πιάτο μας! Πρωτεΐνη, καλά λιπαρά, ω-3 και ιχνοστοιχεία, συνοδευμένα με πολλή γεύση.',
      },
      {
        name: 'Apaki On Toast',
        desc: 'Ψωμί με μασκαρπόνε, αυγό, απάκι, ντοματίνια, προσούτο.',
        price: '10€',
        image: '/images/menu/piata-0028.jpg',
        nutrition: { calories: 390, protein: 22, carbs: 34, fat: 18, sugar: 4, fiber: 3 },
        benefit:
          'Για όσους πεινάνε και το εννοούν — μια ολοκληρωμένη λύση που θα σε κρατήσει όλη μέρα.',
      },
      {
        name: 'All Red On Toast',
        desc: 'Προζυμένιο ψωμί, mousse γαλοτύρι, chutney τομάτας με φράουλα, γλασαρισμένο apaki κοτόπουλου, λάδι βασιλικού και κρέμα βαλσάμικου.',
        price: '9€',
        nutrition: { calories: 410, protein: 20, carbs: 36, fat: 19, sugar: 9, fiber: 3 },
        benefit:
          'Αντιοξειδωτικά από την τομάτα και τη φράουλα, με πρωτεΐνη από το κοτόπουλο — γεύση και ισορροπία.',
      },
      {
        name: 'Kayannas On Toast',
        desc: 'Προζυμένιο ψωμί, σάλτσα kayanna με αυγά, φέτα και ζουμερό λουκάνικο μαύρου χοίρου με λευκή τρούφα.',
        price: '10€',
        nutrition: { calories: 470, protein: 24, carbs: 32, fat: 27, sugar: 3, fiber: 2 },
        benefit:
          'Πλήρης πρωτεΐνη από αυγά και λουκάνικο μαύρου χοίρου, για ένα χορταστικό ξεκίνημα.',
      },
    ],
  },
  {
    id: 'bowls',
    title: 'BOWLS',
    titleGr: 'Μπολ',
    layout: 'card',
    items: [
      {
        name: 'Vegan Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, γλυκοπατάτα, αράκας, καλαμπόκι, ρόκα, φασόλια κόκκινα, φρέσκο κρεμμύδι, σπόροι από μαύρο κύμινο.',
        price: '8€',
        badges: ['vegan'],
        image: '/images/menu-vegan-poke.jpg',
        nutrition: { calories: 430, protein: 12, carbs: 68, fat: 13, sugar: 9, fiber: 11 },
        benefit:
          'Το άγριο ρύζι, τα φασόλια και η γλυκοπατάτα παρέχουν φυτικές ίνες, φυτική πρωτεΐνη και αντιφλεγμονώδη συστατικά.',
      },
      {
        name: 'Breakfast Bowl',
        desc: 'Αυγό ποσέ, μπέικον, αβοκάντο, μανιτάρια, ντοματίνια, ρόκα, προζυμένιο ψωμί με μυρωδικά.',
        price: '9€',
        badges: ['signature'],
        image: '/images/menu/piata-0020.jpg',
        nutrition: { calories: 520, protein: 26, carbs: 32, fat: 31, sugar: 4, fiber: 5 },
        benefit:
          'Ο συνδυασμός αυγού, αβοκάντο και μανιταριών προσφέρει πρωτεΐνη, υγιή λιπαρά και βιταμίνες του συμπλέγματος Β.',
      },
      {
        name: 'Teriyaki Chicken Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, κοτόπουλο τεριγιάκι, καρότο, λάχανο κόκκινο, κρεμμύδι, ραπανάκι, κολοκύθι, αυγό ποσέ, άσπρο και μαύρο σουσάμι.',
        price: '11€',
        badges: ['signature'],
        image: '/images/menu/piata-0022.jpg',
        nutrition: { calories: 580, protein: 36, carbs: 58, fat: 18, sugar: 10, fiber: 6 },
        benefit:
          'Το κοτόπουλο τεριγιάκι με άγριο ρύζι και λαχανικά προσφέρουν πλήρη πρωτεΐνη, αντιοξειδωτικά και ενέργεια για όλη την ημέρα.',
      },
      {
        name: 'Chicken Pineapple Poke Bowl',
        desc: 'Κοτόπουλο, ανανάς, ρύζι, λαχανικά, σως τροπική.',
        price: '12€',
        image: '/images/menu/piata-0025.jpg',
        nutrition: { calories: 540, protein: 32, carbs: 62, fat: 14, sugar: 16, fiber: 5 },
        benefit:
          'Ο ανανάς περιέχει βρομελαΐνη που βοηθά την πέψη, ενώ το κοτόπουλο και το ρύζι δίνουν ισορροπημένη ενέργεια.',
      },
      {
        name: 'Noodles with Shrimps Poke Bowl',
        desc: 'Noodles, γαρίδες, λαχανικά, σως πικάντικη.',
        price: '9€',
        nutrition: { calories: 490, protein: 28, carbs: 60, fat: 13, sugar: 7, fiber: 4 },
        benefit:
          'Οι γαρίδες είναι χαμηλές σε θερμίδες και πλούσιες σε ιώδιο και ψευδάργυρο που υποστηρίζουν τον μεταβολισμό.',
      },
    ],
  },
  {
    id: 'salads',
    title: 'SALADS',
    titleGr: 'Σαλάτες',
    layout: 'feature',
    items: [
      {
        name: 'Dakos Salad',
        desc: 'Ντομάτα, φέτα, ελιές, παξιμάδι, ρίγανη, ελαιόλαδο.',
        price: '8€',
        badges: ['vegetarian'],
        nutrition: { calories: 320, protein: 9, carbs: 34, fat: 17, sugar: 6, fiber: 5 },
        benefit:
          'Το ελαιόλαδο, η φέτα και οι ελιές αποτελούν τον πυρήνα της μεσογειακής διατροφής για υγεία καρδιάς και μακροζωία.',
      },
      {
        name: 'Caesar Salad',
        desc: 'Iceberg, κρουτόν από ρεβύθια, κοτόπουλο sous vide, παρμεζάνα, MJ dressing.',
        price: '10€',
        nutrition: { calories: 440, protein: 32, carbs: 22, fat: 24, sugar: 4, fiber: 4 },
        benefit:
          'Τα κρουτόν ρεβυθιών προσθέτουν φυτική πρωτεΐνη και ίνες, ενώ το κοτόπουλο sous vide διατηρεί τα θρεπτικά συστατικά του.',
      },
    ],
  },
  {
    id: 'wraps',
    title: 'WRAPS',
    titleGr: 'Wraps',
    layout: 'feature',
    items: [
      {
        name: 'Sweet Chilly Chicken Wrap',
        desc: 'Κοτόπουλο σε σως sweet chilli, τορτίγια, λαχανικά.',
        price: '7€',
        nutrition: { calories: 460, protein: 28, carbs: 52, fat: 14, sugar: 9, fiber: 4 },
        benefit: 'Το κοτόπουλο με λαχανικά σε τορτίγια δίνει ισορροπημένη αναλογία μακροθρεπτικών για σταθερή ενέργεια.',
      },
      {
        name: 'Garden Burger',
        desc: 'Μπιφτέκι λαχανικών με ρόκα, ντομάτα, σπιτική σος.',
        price: '9€',
        badges: ['vegan'],
        nutrition: { calories: 410, protein: 16, carbs: 48, fat: 18, sugar: 7, fiber: 8 },
        benefit:
          'Το vegan μπιφτέκι λαχανικών με ρόκα και ντομάτα παρέχει φυτικές ίνες, φυτοχημικά και αντιοξειδωτικά χωρίς κορεσμένα λιπαρά.',
      },
      {
        name: 'Beef Tagliata',
        desc: 'Μοσχαρίσιο tagliata, ρόκα, παρμεζάνα, balsamic, λάδι τρούφα.',
        price: '14€',
        badges: ['signature'],
        nutrition: { calories: 520, protein: 38, carbs: 12, fat: 34, sugar: 3, fiber: 2 },
        benefit:
          'Η μοσχαρίσια tagliata με λάδι τρούφας και παρμεζάνα παρέχει πλούσια πρωτεΐνη, σίδηρο και Β12 για ενέργεια και μυϊκή ανάπλαση.',
      },
    ],
  },
  {
    id: 'treats',
    title: 'HEALTHY TREATS & SNACKS',
    titleGr: 'Γλυκά & Snacks',
    layout: 'grid',
    items: [
      {
        name: 'Banana Bread',
        desc: 'Χειροποίητο με ελάχιστη ζάχαρη.',
        price: '2.5€',
        badges: ['vegetarian'],
        image: '/images/menu/glyka-0006.jpg',
        nutrition: { calories: 210, protein: 4, carbs: 36, fat: 7, sugar: 14, fiber: 2 },
        benefit: 'Η χειροποίητη μπανανόπιτα με ελάχιστη ζάχαρη παρέχει κάλιο, φυσικά σάκχαρα και ίνες για σταθερή ενέργεια.',
      },
      {
        name: 'Chia Pudding',
        desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.',
        price: '4€',
        badges: ['vegan'],
        nutrition: { calories: 260, protein: 7, carbs: 32, fat: 12, sugar: 14, fiber: 10 },
        benefit:
          'Οι σπόροι chia είναι πλούσιοι σε ωμέγα-3 λιπαρά οξέα, ασβέστιο και ίνες που προάγουν κορεσμό και υγεία εντέρου.',
      },
      {
        name: 'Βάσικο Cheesecake',
        desc: 'Χωρίς ψήσιμο, ελαφρύ και δροσιστικό.',
        price: '4€',
        badges: ['vegetarian'],
        image: '/images/menu/glyka-0001.jpg',
        nutrition: { calories: 310, protein: 6, carbs: 28, fat: 19, sugar: 18, fiber: 1 },
        benefit:
          'Το no-bake cheesecake διατηρεί τα ενεργά έλαια και τα θρεπτικά συστατικά της βάσης του, προσφέροντας γλυκιά απόλαυση με ελαφρύ προφίλ.',
      },
      {
        name: 'Chocolate Cake',
        desc: 'Με γλυκοπατάτα, χουρμάδες, χωρίς ζάχαρη.',
        price: '3.5€',
        badges: ['vegan'],
        image: '/images/menu/glyka-0005.jpg',
        nutrition: { calories: 290, protein: 5, carbs: 48, fat: 10, sugar: 22, fiber: 6 },
        benefit:
          'Η γλυκοπατάτα και οι χουρμάδες αντικαθιστούν τη ζάχαρη προσφέροντας φυτικές ίνες, β-καροτίνη και φυσική γλυκύτητα.',
      },
    ],
  },
  {
    id: 'coffee',
    title: 'COFFEE & TEA',
    titleGr: 'Καφές & Τσάι',
    layout: 'list',
    hideNutrition: true,
    items: [
      {
        name: 'Espresso',
        desc: 'Specialty single origin.',
        price: '2.5€',
        nutrition: { calories: 2, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 },
      },
      {
        name: 'Double Espresso',
        desc: 'Specialty single origin.',
        price: '3.8€',
        nutrition: { calories: 5, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 },
      },
      {
        name: 'Macchiato',
        desc: 'Espresso με αφρό γάλακτος.',
        price: '3€',
        nutrition: { calories: 15, protein: 1, carbs: 1, fat: 1, sugar: 1, fiber: 0 },
      },
      {
        name: 'Double Macchiato',
        desc: 'Διπλό espresso με αφρό γάλακτος.',
        price: '4€',
        nutrition: { calories: 25, protein: 1, carbs: 2, fat: 1, sugar: 1, fiber: 0 },
      },
      {
        name: 'Cappuccino',
        desc: 'Espresso, ζεστό γάλα, βελούδινος αφρός.',
        price: '3.8€',
        nutrition: { calories: 90, protein: 5, carbs: 9, fat: 4, sugar: 8, fiber: 0 },
        benefit:
          'Το espresso αυξάνει την εγρήγορση και τον μεταβολισμό, ενώ το γάλα προσθέτει ασβέστιο για υγιή οστά.',
      },
      {
        name: 'Latte / Iced Latte',
        desc: 'Espresso με γάλα — ζεστό ή παγωμένο.',
        price: '4.5€',
        nutrition: { calories: 150, protein: 8, carbs: 15, fat: 6, sugar: 13, fiber: 0 },
        benefit:
          'Ο συνδυασμός espresso και γάλακτος παρέχει ασβέστιο, πρωτεΐνη και καφεΐνη για ήπια, παρατεταμένη εγρήγορση.',
      },
      {
        name: 'Freddo Espresso',
        desc: 'Παγωμένο espresso.',
        price: '3.6€',
        nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0, sugar: 0, fiber: 0 },
      },
      {
        name: 'Freddo Cappuccino',
        desc: 'Freddo espresso με παγωμένο αφρό γάλακτος.',
        price: '4.3€',
        nutrition: { calories: 70, protein: 4, carbs: 7, fat: 3, sugar: 6, fiber: 0 },
        benefit:
          'Παγωμένο espresso με αφρό γάλακτος — η δροσερή εκδοχή που συνδυάζει ασβέστιο και καφεΐνη για ευεξία και συγκέντρωση.',
      },
      {
        name: 'Raw Organic Cocoa',
        desc: 'Οργανικό κακάο χωρίς πρόσθετα.',
        price: '4€',
        nutrition: { calories: 80, protein: 3, carbs: 12, fat: 3, sugar: 6, fiber: 3 },
        benefit:
          'Το ωμό βιολογικό κακάο είναι πλούσιο σε μαγνήσιο και φλαβονοειδή που προστατεύουν την καρδιά και ανεβάζουν τη διάθεση.',
      },
      {
        name: 'Aztec Cocoa',
        desc: 'Με κανέλα, μέλι και μπαχαρικά.',
        price: '5€',
        nutrition: { calories: 140, protein: 3, carbs: 22, fat: 4, sugar: 16, fiber: 3 },
        benefit:
          'Η κανέλα και τα μπαχαρικά αυτού του ζεστού ρόφηματος βοηθούν στη ρύθμιση του σακχάρου και έχουν αντιφλεγμονώδεις ιδιότητες.',
      },
      {
        name: 'Σοκολάτα (Ζεστή / Κρύα)',
        desc: 'Με γάλα της επιλογής σας.',
        price: '4.5€',
        nutrition: { calories: 220, protein: 7, carbs: 32, fat: 8, sugar: 28, fiber: 2 },
        benefit: 'Η σοκολάτα με γάλα παρέχει ασβέστιο, μαγνήσιο και θεοβρωμίνη για ήπια τόνωση και αίσθηση ευεξίας.',
      },
      {
        name: 'Matcha Latte',
        desc: 'Matcha με γάλα της επιλογής σας.',
        price: '4€',
        nutrition: { calories: 130, protein: 6, carbs: 16, fat: 4, sugar: 12, fiber: 1 },
        benefit:
          'Το matcha με γάλα συνδυάζει L-theanine και καφεΐνη για ήρεμη εγρήγορση, αντιοξειδωτικά και ενίσχυση της συγκέντρωσης.',
      },
      {
        name: 'Matcha',
        desc: 'Παραδοσιακό matcha.',
        price: '4.5€',
        nutrition: { calories: 35, protein: 2, carbs: 5, fat: 0, sugar: 1, fiber: 1 },
        benefit:
          'Το παραδοσιακό matcha είναι εξαιρετικά πλούσιο σε EGCG αντιοξειδωτικά που προστατεύουν τα κύτταρα και ενισχύουν τον μεταβολισμό.',
      },
      {
        name: 'Τσάι (Κρύο / Ζεστό)',
        desc: 'Τσάι σπιτικό, πράσινο, μαύρο.',
        price: '3.8€',
        nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0, sugar: 0, fiber: 0 },
        benefit:
          'Το πράσινο και μαύρο τσάι περιέχουν πολυφαινόλες και αντιοξειδωτικά που υποστηρίζουν την υγεία της καρδιάς και του ανοσοποιητικού.',
      },
    ],
  },
  {
    id: 'smoothies',
    title: 'SMOOTHIES, JUICES & SOFT DRINKS',
    titleGr: 'Smoothies & Χυμοί',
    layout: 'grid',
    hideNutrition: true,
    items: [
      {
        name: 'Blueberry Smoothie',
        desc: 'Blueberries, χειροποίητο γάλα αμυγδάλου, μπανάνα, μέλι.',
        price: '6€',
        badges: ['vegetarian'],
        image: '/images/menu/kokteil-0008.jpg',
        nutrition: { calories: 240, protein: 4, carbs: 44, fat: 7, sugar: 30, fiber: 5 },
        benefit:
          'Τα blueberries και η μπανάνα παρέχουν ανθοκυανίνες, κάλιο και φυσικά σάκχαρα για ενέργεια και προστασία του εγκεφάλου.',
      },
      {
        name: 'Mango Chilli Smoothie',
        desc: 'Μάνγκο, τσίλι flakes, αγαύη, χειροποίητο γάλα καρυδιών και βρώμης, λάιμ.',
        price: '6€',
        badges: ['vegan', 'signature'],
        video: '/images/menu/drink-yellow-lemon.mp4',
        nutrition: { calories: 220, protein: 3, carbs: 42, fat: 6, sugar: 32, fiber: 4 },
        benefit:
          'Το μάνγκο με τσίλι και λάιμ ενισχύει τον μεταβολισμό, παρέχει βιταμίνη C και αντιοξειδωτικά για ανοσοποιητική θωράκιση.',
      },
      {
        name: 'Fresh O.J.',
        desc: 'Φρεσκοστυμμένος χυμός πορτοκαλιού.',
        price: '5€',
        image: '/images/menu/kokteil-0007.jpg',
        nutrition: { calories: 120, protein: 2, carbs: 28, fat: 0, sugar: 22, fiber: 1 },
        benefit:
          'Ο φρεσκοστυμμένος χυμός πορτοκαλιού είναι πλούσιος σε βιταμίνη C και βιοφλαβονοειδή που ενισχύουν το ανοσοποιητικό.',
      },
      {
        name: 'Homemade Pink Lemonade',
        desc: 'Σπιτική ροζ λεμονάδα.',
        price: '4€',
        image: '/images/menu/kokteil-0006.jpg',
        nutrition: { calories: 110, protein: 0, carbs: 28, fat: 0, sugar: 26, fiber: 0 },
        benefit: 'Η σπιτική λεμονάδα με λεμόνι παρέχει βιταμίνη C και αλκαλοποιεί τον οργανισμό για φρεσκάδα και ενυδάτωση.',
      },
      {
        name: 'Natural Pink Lemonade',
        desc: 'Φυσική ροζ λεμονάδα.',
        price: '4.5€',
        image: '/images/menu/kokteil-0001.jpg',
        nutrition: { calories: 100, protein: 0, carbs: 25, fat: 0, sugar: 23, fiber: 0 },
        benefit:
          'Η φυσική ροζ λεμονάδα χωρίς τεχνητά πρόσθετα προσφέρει βιταμίνη C και αντιοξειδωτικά ανθοκυανίνης για ενυδάτωση.',
      },
      {
        name: 'Mixed Juice',
        desc: 'Μείγμα εποχιακών φρούτων.',
        price: '6€',
        image: '/images/menu/kokteil-0003.jpg',
        nutrition: { calories: 140, protein: 1, carbs: 34, fat: 0, sugar: 28, fiber: 2 },
        benefit:
          'Ο χυμός εποχιακών φρούτων προσφέρει ποικιλία βιταμινών, μετάλλων και αντιοξειδωτικών για ολιστική θρέψη.',
      },
      {
        name: 'Kombucha',
        desc: 'Ζυμωμένο τσάι, ελαφρύ και δροσιστικό.',
        price: '4€',
        image: '/images/menu/kokteil-0005.jpg',
        nutrition: { calories: 40, protein: 0, carbs: 9, fat: 0, sugar: 6, fiber: 0 },
        benefit:
          'Το kombucha περιέχει ζωντανά προβιοτικά, οργανικά οξέα και αντιοξειδωτικά που υποστηρίζουν την υγεία του εντέρου και της πέψης.',
      },
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
