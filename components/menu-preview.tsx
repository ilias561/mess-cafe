'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { EASE, fadeUpSoft } from '@/lib/motion'
import { images } from '@/lib/images'

const items = [
  {
    cat: 'BRUNCH',
    catId: 'brunch',
    name: 'Avocado Toast',
    desc: 'Προζυμένιο ψωμί, guacamole, φέτα, ντοματίνια, αυγό ποσέ.',
    price: '9€',
    img: 'menu3' as const,
  },
  {
    cat: 'BOWLS',
    catId: 'bowls',
    name: 'Acai Bowl',
    desc: '100% açaí, πράσινο μήλο, flakes καρύδας, granola, banana.',
    price: '12€',
    img: 'menu2' as const,
  },
  {
    cat: 'SALADS',
    catId: 'salads',
    name: 'Superfood Salad',
    desc: 'Τρίχρωμη κινόα, παντζάρι, φακές, cranberry, dressing εσπεριδοειδών.',
    price: '11€',
    img: 'menu4' as const,
  },
  {
    cat: 'COFFEE',
    catId: 'coffee',
    name: 'Freddo Cappuccino',
    desc: 'Freddo espresso με παγωμένο αφρό γάλακτος.',
    price: '4.3€',
    img: 'menu5' as const,
  },
  {
    cat: 'SMOOTHIES',
    catId: 'smoothies',
    name: 'Mango Chilli Smoothie',
    desc: 'Μάνγκο, τσίλι flakes, αγαύη, χειροποίητο γάλα καρυδιών.',
    price: '6€',
    img: 'menu6' as const,
  },
  {
    cat: 'TREATS',
    catId: 'treats',
    name: 'Chocolate Cake',
    desc: 'Με γλυκοπατάτα, χουρμάδες — χωρίς ζάχαρη.',
    price: '3.5€',
    img: 'menu7' as const,
  },
]

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
}

const lineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
}

export default function MenuPreview() {
  return (
    <section id="menu" className="scroll-mt-28 bg-bone-warm px-6 py-32 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div {...fadeUpSoft}>
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">MENU HIGHLIGHTS</p>
            <h2 className="font-serif text-[clamp(40px,5vw,56px)] leading-[1.02] tracking-tight text-charcoal">
              Αγαπημένα μας.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          >
            <Link
              href="/menu"
              className="font-sans text-sm font-medium text-olive underline decoration-line underline-offset-[6px] transition-opacity hover:opacity-70"
            >
              Όλο το menu →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE, delay: index * 0.06 }}
            >
              <Link href={`/menu#${item.catId}`} className="block w-full text-inherit no-underline">
                <motion.article
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group w-full"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-bone">
                    <Image
                      src={images[item.img]}
                      alt={item.name}
                      width={640}
                      height={800}
                      unoptimized
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex w-full items-center justify-between">
                      <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{item.cat}</p>
                      <p className="shrink-0 font-serif text-[18px] text-mustard">{item.price}</p>
                    </div>
                    <div className="relative mt-1 inline-block max-w-full">
                      <h3 className="font-serif text-[22px] leading-snug tracking-tight text-charcoal">{item.name}</h3>
                      <motion.span
                        variants={lineVariants}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-olive"
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 font-sans text-[13px] leading-relaxed text-concrete">{item.desc}</p>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
