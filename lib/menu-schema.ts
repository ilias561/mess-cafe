import { menuData, type MenuItem } from '@/lib/menu-data'
import { absoluteUrl } from '@/lib/site-url'

type DietBadge = NonNullable<MenuItem['badges']>[number]

const DIET_BY_BADGE: Partial<Record<DietBadge, string>> = {
  vegan: 'VeganDiet',
  vegetarian: 'VegetarianDiet',
  gf: 'GlutenFreeDiet',
}

function suitableForDiet(badges?: MenuItem['badges']): string[] | undefined {
  if (!badges?.length) return undefined
  const diets = badges
    .map((badge) => DIET_BY_BADGE[badge])
    .filter((diet): diet is string => Boolean(diet))
  return diets.length > 0 ? diets : undefined
}

export function buildMenuJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Μενού M.E.S.S.',
    url: absoluteUrl('/menu'),
    hasMenuSection: menuData.map((category) => ({
      '@type': 'MenuSection',
      name: category.titleGr,
      description: category.title,
      hasMenuItem: category.items.map((item) => {
        const diets = suitableForDiet(item.badges)
        return {
          '@type': 'MenuItem',
          name: item.name,
          description: item.desc,
          offers: {
            '@type': 'Offer',
            price: item.price.replace(/€/g, '').trim(),
            priceCurrency: 'EUR',
          },
          ...(diets ? { suitableForDiet: diets } : {}),
        }
      }),
    })),
  }
}
