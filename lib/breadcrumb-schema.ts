import { pageUrl } from '@/lib/site-url'

export type BreadcrumbItem = {
  name: string
  /** Site-relative path, e.g. "/food-for-medicine". */
  path: string
}

/**
 * Schema.org BreadcrumbList for a page's ancestry trail. `item` URLs are emitted
 * as trailing-slash page URLs so they match the canonical URLs Next produces.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  }
}
