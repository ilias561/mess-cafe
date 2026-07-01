export type Nutrition = {
  calories: number
  protein: number
  carbs: number
  fat: number
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
        nutrition: { calories: 834.4, protein: 27.2, carbs: 95, fat: 41.4 },
        benefit: 'Φυτικές ίνες, ιχνοστοιχεία και ω-3 λιπαρά.',
      },
      {
        name: 'Avocado on Toast',
        desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
        price: '9€',
        badges: ['vegetarian', 'signature'],
        image: '/images/menu/piata-0009.jpg',
        nutrition: { calories: 966, protein: 39.9, carbs: 83.1, fat: 52.9 },
        benefit:
          'Το πιο ολοκληρωμένο πιάτο μας! Πρωτεΐνη, καλά λιπαρά, ω-3 και ιχνοστοιχεία, συνοδευμένα με πολλή γεύση.',
      },
      {
        name: 'Classic Omelette',
        desc: '3 υλικά της επιλογής σας.',
        price: '6.5€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0016.jpg',
        nutrition: { calories: 250, protein: 18.8, carbs: 1, fat: 17.2 },
        benefit:
          'Το αυγό θεωρείται η πιο θρεπτική τροφή για τον άνθρωπο — εμείς το κάνουμε και νόστιμο.',
      },
      {
        name: 'Scrambled Eggs',
        desc: 'Αυγά χτυπημένα με γιαούρτι, μαύρο κύμινο και ηλιέλαιο.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0013.jpg',
        nutrition: { calories: 451, protein: 25.4, carbs: 38.1, fat: 19.7 },
        benefit: 'Πρωτεϊνική βόμβα για το ξεκίνημα της μέρας σου.',
      },
      {
        name: 'Apaki On Toast',
        desc: 'Ψωμί με μασκαρπόνε, αυγό, απάκι, ντοματίνια, προσούτο.',
        price: '10€',
        image: '/images/menu/apaki-on-toast.jpg',
        nutrition: { calories: 937, protein: 52, carbs: 70.3, fat: 47.6 },
        benefit:
          'Για όσους πεινάνε και το εννοούν — μια ολοκληρωμένη λύση που θα σε κρατήσει όλη μέρα.',
      },
      {
        name: 'Grilled Cheese with Mushrooms',
        desc: 'Προζυμένιο ψωμί, μιξ από παλαιωμένες γραβιέρες, μανιτάρια πλευρώτους. Συνοδεύεται με chutney μάνγκο.',
        price: '7€',
        badges: ['vegetarian'],
        image: '/images/menu/piata-0015.jpg',
        nutrition: { calories: 752.2, protein: 36.4, carbs: 80.7, fat: 30.8 },
        benefit:
          'Οι παλαιωμένες γραβιέρες αποτελούν βασική πηγή προβιοτικών και ενζύμων — το πεπτικό σου θα το ευγνωμονεί.',
      },
      {
        name: 'All Red On Toast',
        desc: 'Προζυμένιο ψωμί, mousse γαλοτύρι, chutney τομάτας με φράουλα, γλασαρισμένο apaki κοτόπουλου, λάδι βασιλικού και κρέμα βαλσάμικου.',
        price: '9€',
        image: '/images/menu/all-red-on-toast.jpg',
        nutrition: { calories: 694.6, protein: 38.6, carbs: 97.8, fat: 15.7 },
        benefit:
          'Αντιοξειδωτικά από την τομάτα και τη φράουλα, με πρωτεΐνη από το κοτόπουλο — γεύση και ισορροπία.',
      },
      {
        name: 'Kayannas On Toast',
        desc: 'Προζυμένιο ψωμί, σάλτσα kayanna με αυγά, φέτα και ζουμερό λουκάνικο μαύρου χοίρου με λευκή τρούφα.',
        price: '10€',
        nutrition: { calories: 1137, protein: 53.9, carbs: 76.2, fat: 66.8 },
        benefit:
          'Πλήρης πρωτεΐνη από αυγά και λουκάνικο μαύρου χοίρου, για ένα χορταστικό ξεκίνημα.',
      },
    ],
  },
  {
    id: 'bowls',
    title: 'BOWLS & LUNCH',
    titleGr: 'Μπολ & Lunch',
    layout: 'card',
    items: [
      {
        name: 'Vegan Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, γλυκοπατάτα, αράκας, καλαμπόκι, ρόκα, φασόλια κόκκινα, φρέσκο κρεμμύδι, σπόροι από μαύρο κύμινο.',
        price: '8€',
        badges: ['vegan'],
        image: '/images/menu/piata-0028.jpg',
        nutrition: { calories: 424.4, protein: 13.7, carbs: 58.7, fat: 16 },
        benefit:
          'Το άγριο ρύζι, τα φασόλια και η γλυκοπατάτα παρέχουν φυτικές ίνες, φυτική πρωτεΐνη και αντιφλεγμονώδη συστατικά.',
      },
      {
        name: 'Breakfast Bowl',
        desc: 'Αυγό ποσέ, μπέικον, αβοκάντο, μανιτάρια, ντοματίνια, ρόκα, προζυμένιο ψωμί με μυρωδικά.',
        price: '9€',
        badges: ['signature'],
        image: '/images/menu/piata-0020.jpg',
        nutrition: { calories: 889.4, protein: 47.5, carbs: 41.4, fat: 60 },
        benefit:
          'Ο συνδυασμός αυγού, αβοκάντο και μανιταριών προσφέρει πρωτεΐνη, υγιή λιπαρά και βιταμίνες του συμπλέγματος Β.',
      },
      {
        name: 'Teriyaki Chicken Poke Bowl',
        desc: 'Άγριο ρύζι τηγανισμένο σε λάδι καρύδας, κοτόπουλο τεριγιάκι, καρότο, λάχανο κόκκινο, κρεμμύδι, ραπανάκι, κολοκύθι, αυγό ποσέ, άσπρο και μαύρο σουσάμι.',
        price: '11€',
        badges: ['signature'],
        image: '/images/menu/piata-0022.jpg',
        nutrition: { calories: 662.4, protein: 64.5, carbs: 58.1, fat: 17.9 },
        benefit:
          'Το κοτόπουλο τεριγιάκι με άγριο ρύζι και λαχανικά προσφέρουν πλήρη πρωτεΐνη, αντιοξειδωτικά και ενέργεια για όλη την ημέρα.',
      },
      {
        name: 'Chicken Pineapple Poke Bowl',
        desc: 'Κοτόπουλο, ανανάς, ρύζι, λαχανικά, σως τροπική.',
        price: '12€',
        image: '/images/menu/piata-0025.jpg',
        nutrition: { calories: 728.9, protein: 63.7, carbs: 67.1, fat: 23 },
        benefit:
          'Ο ανανάς περιέχει βρομελαΐνη που βοηθά την πέψη, ενώ το κοτόπουλο και το ρύζι δίνουν ισορροπημένη ενέργεια.',
      },
      {
        name: 'Noodles with Shrimps Poke Bowl',
        desc: 'Noodles, γαρίδες, λαχανικά, σως πικάντικη.',
        price: '9€',
        benefit:
          'Οι γαρίδες είναι χαμηλές σε θερμίδες και πλούσιες σε ιώδιο και ψευδάργυρο που υποστηρίζουν τον μεταβολισμό.',
      },
      {
        name: 'Yogurt Bowl',
        desc: 'Bowl γιαουρτιού με τα υλικά της επιλογής σας.',
        price: '6€',
        badges: ['vegetarian'],
        image: '/images/menu/yogurt-bowl.jpg',
        benefit:
          'Το γιαούρτι προσφέρει προβιοτικά και πρωτεΐνη υψηλής ποιότητας για ένα ελαφρύ, χορταστικό ξεκίνημα.',
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
        name: 'Caesar Salad',
        desc: 'Iceberg, κρουτόν από ρεβύθια, κοτόπουλο sous vide, παρμεζάνα, MJ dressing.',
        price: '10€',
        nutrition: { calories: 712.1, protein: 78, carbs: 17.1, fat: 35.2 },
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
        nutrition: { calories: 821.1, protein: 67.2, carbs: 81.7, fat: 23.2 },
        benefit: 'Το κοτόπουλο με λαχανικά σε τορτίγια δίνει ισορροπημένη αναλογία μακροθρεπτικών για σταθερή ενέργεια.',
      },
      {
        name: 'Beef Tagliata',
        desc: 'Μοσχαρίσιο tagliata, ρόκα, παρμεζάνα, balsamic, λάδι τρούφα.',
        price: '14€',
        badges: ['signature'],
        nutrition: { calories: 838.5, protein: 45.2, carbs: 26.2, fat: 59.5 },
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
        benefit: 'Η χειροποίητη μπανανόπιτα με ελάχιστη ζάχαρη παρέχει κάλιο, φυσικά σάκχαρα και ίνες για σταθερή ενέργεια.',
      },
      {
        name: 'Chia Pudding',
        desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.',
        price: '4€',
        badges: ['vegan'],
        benefit:
          'Οι σπόροι chia είναι πλούσιοι σε ωμέγα-3 λιπαρά οξέα, ασβέστιο και ίνες που προάγουν κορεσμό και υγεία εντέρου.',
      },
      {
        name: 'Βάσικο Cheesecake',
        desc: 'Χωρίς ψήσιμο, ελαφρύ και δροσιστικό.',
        price: '4€',
        badges: ['vegetarian'],
        image: '/images/menu/glyka-0001.jpg',
        benefit:
          'Το no-bake cheesecake διατηρεί τα ενεργά έλαια και τα θρεπτικά συστατικά της βάσης του, προσφέροντας γλυκιά απόλαυση με ελαφρύ προφίλ.',
      },
      {
        name: 'Chocolate Cake',
        desc: 'Με γλυκοπατάτα, χουρμάδες, χωρίς ζάχαρη.',
        price: '3.5€',
        badges: ['vegan'],
        image: '/images/menu/glyka-0005.jpg',
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
      },
      {
        name: 'Double Espresso',
        desc: 'Specialty single origin.',
        price: '3.8€',
      },
      {
        name: 'Macchiato',
        desc: 'Espresso με αφρό γάλακτος.',
        price: '3€',
      },
      {
        name: 'Double Macchiato',
        desc: 'Διπλό espresso με αφρό γάλακτος.',
        price: '4€',
      },
      {
        name: 'Cappuccino',
        desc: 'Espresso, ζεστό γάλα, βελούδινος αφρός.',
        price: '3.8€',
        benefit:
          'Το espresso αυξάνει την εγρήγορση και τον μεταβολισμό, ενώ το γάλα προσθέτει ασβέστιο για υγιή οστά.',
      },
      {
        name: 'Latte / Iced Latte',
        desc: 'Espresso με γάλα — ζεστό ή παγωμένο.',
        price: '4.5€',
        benefit:
          'Ο συνδυασμός espresso και γάλακτος παρέχει ασβέστιο, πρωτεΐνη και καφεΐνη για ήπια, παρατεταμένη εγρήγορση.',
      },
      {
        name: 'Freddo Espresso',
        desc: 'Παγωμένο espresso.',
        price: '3.6€',
      },
      {
        name: 'Freddo Cappuccino',
        desc: 'Freddo espresso με παγωμένο αφρό γάλακτος.',
        price: '4.3€',
        benefit:
          'Παγωμένο espresso με αφρό γάλακτος — η δροσερή εκδοχή που συνδυάζει ασβέστιο και καφεΐνη για ευεξία και συγκέντρωση.',
      },
      {
        name: 'Raw Organic Cocoa',
        desc: 'Οργανικό κακάο χωρίς πρόσθετα.',
        price: '4€',
        benefit:
          'Το ωμό βιολογικό κακάο είναι πλούσιο σε μαγνήσιο και φλαβονοειδή που προστατεύουν την καρδιά και ανεβάζουν τη διάθεση.',
      },
      {
        name: 'Aztec Cocoa',
        desc: 'Με κανέλα, μέλι και μπαχαρικά.',
        price: '5€',
        benefit:
          'Η κανέλα και τα μπαχαρικά αυτού του ζεστού ρόφηματος βοηθούν στη ρύθμιση του σακχάρου και έχουν αντιφλεγμονώδεις ιδιότητες.',
      },
      {
        name: 'Σοκολάτα (Ζεστή / Κρύα)',
        desc: 'Με γάλα της επιλογής σας.',
        price: '4.5€',
        benefit: 'Η σοκολάτα με γάλα παρέχει ασβέστιο, μαγνήσιο και θεοβρωμίνη για ήπια τόνωση και αίσθηση ευεξίας.',
      },
      {
        name: 'Matcha Latte',
        desc: 'Matcha με γάλα της επιλογής σας.',
        price: '4€',
        benefit:
          'Το matcha με γάλα συνδυάζει L-theanine και καφεΐνη για ήρεμη εγρήγορση, αντιοξειδωτικά και ενίσχυση της συγκέντρωσης.',
      },
      {
        name: 'Matcha',
        desc: 'Παραδοσιακό matcha.',
        price: '4.5€',
        benefit:
          'Το παραδοσιακό matcha είναι εξαιρετικά πλούσιο σε EGCG αντιοξειδωτικά που προστατεύουν τα κύτταρα και ενισχύουν τον μεταβολισμό.',
      },
      {
        name: 'Τσάι (Κρύο / Ζεστό)',
        desc: 'Τσάι σπιτικό, πράσινο, μαύρο.',
        price: '3.8€',
        benefit:
          'Το πράσινο και μαύρο τσάι περιέχουν πολυφαινόλες και αντιοξειδωτικά που υποστηρίζουν την υγεία της καρδιάς και του ανοσοποιητικού.',
      },
    ],
  },
  {
    id: 'cocktails',
    title: 'COCKTAILS',
    titleGr: 'Cocktails',
    layout: 'grid',
    hideNutrition: true,
    items: [
      {
        name: 'Aperol Spritz',
        desc: 'Aperol, Prosecco, σόδα.',
        price: '9€',
        image: '/images/menu/kokteil-aperol.jpg',
      },
      {
        name: 'Negroni',
        desc: 'Gin, Campari, Vermouth Rosso.',
        price: '9€',
        image: '/images/menu/kokteil-negroni.jpg',
      },
      {
        name: 'Paloma',
        desc: 'Tequila Blanco, χυμός λάιμ, agave, pink soda.',
        price: '9€',
        image: '/images/menu/kokteil-paloma.jpg',
      },
      {
        name: 'Orange Spritz',
        desc: 'Bacardi spiced, pineapple soda, χυμός λάιμ, κουρκουμάς & κανέλα.',
        price: '10€',
        badges: ['signature'],
        video: '/images/menu/drink-yellow-lemon.mp4',
      },
      {
        name: 'Pink Spritz',
        desc: 'Lillet pink, Campari, Prosecco, pink soda.',
        price: '10€',
        badges: ['signature'],
        image: '/images/menu/kokteil-pink.jpg',
      },
      {
        name: 'Yellow Spritz',
        desc: 'Limoncello, Prosecco, Aegean tonic.',
        price: '10€',
        badges: ['signature'],
        image: '/images/menu/kokteil-0003.jpg',
      },
      {
        name: 'Red Spritz',
        desc: 'Λικέρ φράουλας, gin, pink soda, φύλλα βασιλικού, φράουλες.',
        price: '10€',
        badges: ['signature'],
        image: '/images/menu/kokteil-0006.jpg',
      },
      {
        name: 'Green Spritz',
        desc: 'Gin, cucumber cordial, σόδα.',
        price: '10€',
        badges: ['signature'],
        image: '/images/menu/kokteil-0005.jpg',
      },
      {
        name: 'Japan Delight',
        desc: 'Mocktail — Yuzu purée, red tea, σόδα.',
        price: '8€',
        image: '/images/menu/kokteil-0007.jpg',
      },
      {
        name: 'Purple Spritz',
        desc: 'Mocktail — μαρμελάδα blueberry, χυμός λάιμ, ginger beer.',
        price: '8€',
        image: '/images/menu/kokteil-0008.jpg',
      },
    ],
  },
  {
    id: 'smoothies',
    title: 'SMOOTHIES, JUICES & SOFT DRINKS',
    titleGr: 'Smoothies & Χυμοί',
    layout: 'list',
    hideNutrition: true,
    items: [
      {
        name: 'Blueberry Smoothie',
        desc: 'Blueberries, χειροποίητο γάλα αμυγδάλου, μπανάνα, μέλι.',
        price: '6€',
        badges: ['vegetarian'],
        benefit:
          'Τα blueberries και η μπανάνα παρέχουν ανθοκυανίνες, κάλιο και φυσικά σάκχαρα για ενέργεια και προστασία του εγκεφάλου.',
      },
      {
        name: 'Mango Chilli Smoothie',
        desc: 'Μάνγκο, τσίλι flakes, αγαύη, χειροποίητο γάλα καρυδιών και βρώμης, λάιμ.',
        price: '6€',
        badges: ['vegan', 'signature'],
        benefit:
          'Το μάνγκο με τσίλι και λάιμ ενισχύει τον μεταβολισμό, παρέχει βιταμίνη C και αντιοξειδωτικά για ανοσοποιητική θωράκιση.',
      },
      {
        name: 'Fresh O.J.',
        desc: 'Φρεσκοστυμμένος χυμός πορτοκαλιού.',
        price: '5€',
        benefit:
          'Ο φρεσκοστυμμένος χυμός πορτοκαλιού είναι πλούσιος σε βιταμίνη C και βιοφλαβονοειδή που ενισχύουν το ανοσοποιητικό.',
      },
      {
        name: 'Homemade Pink Lemonade',
        desc: 'Σπιτική ροζ λεμονάδα.',
        price: '4€',
        benefit: 'Η σπιτική λεμονάδα με λεμόνι παρέχει βιταμίνη C και αλκαλοποιεί τον οργανισμό για φρεσκάδα και ενυδάτωση.',
      },
      {
        name: 'Natural Pink Lemonade',
        desc: 'Φυσική ροζ λεμονάδα.',
        price: '4.5€',
        benefit:
          'Η φυσική ροζ λεμονάδα χωρίς τεχνητά πρόσθετα προσφέρει βιταμίνη C και αντιοξειδωτικά ανθοκυανίνης για ενυδάτωση.',
      },
      {
        name: 'Mixed Juice',
        desc: 'Μείγμα εποχιακών φρούτων.',
        price: '6€',
        benefit:
          'Ο χυμός εποχιακών φρούτων προσφέρει ποικιλία βιταμινών, μετάλλων και αντιοξειδωτικών για ολιστική θρέψη.',
      },
      {
        name: 'Kombucha',
        desc: 'Ζυμωμένο τσάι, ελαφρύ και δροσιστικό.',
        price: '4€',
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
