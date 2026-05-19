import type { MenuItem } from '@/lib/menu-data'

/** Featured plates for the home gallery menu preview block. */
export const featuredMenuItems: (MenuItem & { cat: string })[] = [
  {
    cat: 'BRUNCH',
    name: 'Avocado Toast',
    desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
    price: '9€',
    image: '/images/menu/piata-0009.jpg',
  },
  {
    cat: 'BOWLS',
    name: 'Teriyaki Chicken Poke Bowl',
    desc: 'Άγριο ρύζι, κοτόπουλο τεριγιάκι, λαχανικά, αυγό ποσέ, σουσάμι.',
    price: '11€',
    image: '/images/menu/piata-0025.jpg',
  },
  {
    cat: 'TREATS',
    name: 'Chia Pudding',
    desc: 'Σπόροι chia, φυτικό γάλα, εποχιακά φρούτα.',
    price: '4€',
    image: '/images/menu/glyka-0002.jpg',
  },
]

/** Today's specials — extend with images as assets arrive. */
export const todaysSpecials: MenuItem[] = [
  {
    name: 'Avocado Toast',
    desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
    price: '9€',
    image: '/images/menu/piata-0009.jpg',
  },
  {
    name: 'Teriyaki Chicken Poke Bowl',
    desc: 'Άγριο ρύζι, κοτόπουλο τεριγιάκι, λαχανικά, αυγό ποσέ.',
    price: '11€',
    image: '/images/menu/piata-0025.jpg',
  },
  {
    name: 'Vegan Poke Bowl',
    desc: 'Άγριο ρύζι, γλυκοπατάτα, αράκας, ρόκα, φασόλια κόκκινα.',
    price: '8€',
    image: '/images/menu/piata-0028.jpg',
  },
]
