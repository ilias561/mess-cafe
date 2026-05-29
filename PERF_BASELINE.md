# Performance & visual polish — baseline (PART 0)

Captured on branch `perf-visual-upgrade` before PROMPT-005 optimization work.

| Field | Value |
|-------|-------|
| Date | 2026-05-29 |
| Git commit | `312e4bf` |
| Node | v26.1.0 |
| npm | 11.14.1 |
| Next.js | 16.2.0 (Turbopack) |
| Build command | `npm run build` |
| Deploy target | Cloudflare Pages (`output: 'export'` → `out/`) |

## Build result

- **Status:** success (static export, 21 routes)
- **Total `out/` size:** **108 MB**
- **`out/_next/`:** (bundled JS/CSS/fonts/media; largest single asset below)
- **`public/images` (source):** **32 MB** (117 raster files)
- **`public/videos` (source):** **71 MB** (not in `out/` unless copied at build; served from `public/`)

## JavaScript bundles (`out/_next/static/chunks/*.js`)

| File | Size |
|------|------|
| `0vkgb7xyv-nko.js` | 222 KB |
| `0khj6cstkjd0_.js` | 139 KB |
| `0if2ott4se3x8.js` | 138 KB |
| `03~yq9q893hmn.js` | 110 KB |
| `0_q5-lene~wt9.js` | 96 KB |
| `0qpcgwte.qira.js` | 68 KB |
| `0d3shmwh5_nmn.js` | 54 KB |
| `02i7dfk78~t~2.js` | 52 KB |

**Aggregate JS (all chunks):** ~1,145 KB  
**Aggregate CSS (all chunks):** ~165 KB  
**Aggregate woff2 (`out/_next/static/media`):** ~468 KB

> Chunk hashes change per build; compare **aggregate totals** and relative ranking in PART 10.

## Heaviest static assets in `out/_next/static` (any type)

| Size | Path |
|------|------|
| 354 KB | `media/about-3.*.jpg` (optimized copy of source) |
| 227 KB | `chunks/0vkgb7xyv-nko.js` |
| 165 KB | `chunks/06w2n6gv7uk1d.css` |
| 142 KB | `chunks/0khj6cstkjd0_.js` |
| 140 KB | `chunks/0if2ott4se3x8.js` |
| 121 KB | `media/b67966e0b83b2cd0-s.p.*.woff2` |
| 112 KB | `chunks/03~yq9q893hmn.js` |
| 106 KB | `media/5307092570128b5a-s.p.*.woff2` |

## Top 15 heaviest source images (`public/images`)

| Bytes | Human | Path |
|-------|-------|------|
| 735,211 | 718 KB | `public/images/111/mess-internal-0007.jpg` |
| 730,801 | 714 KB | `public/images/111/mess-internal-0006.jpg` |
| 686,377 | 671 KB | `public/images/raw/gallery-hero-still.png` |
| 656,737 | 642 KB | `public/images/111/mess-internal-0016.jpg` |
| 620,029 | 606 KB | `public/images/111/mess-internal-0034.jpg` |
| 611,696 | 598 KB | `public/images/111/mess-internal-0030.jpg` |
| 485,586 | 474 KB | `public/images/decor/photo/fern.png` |
| 464,035 | 453 KB | `public/images/hero-interior.jpg` |
| 464,035 | 453 KB | `public/images/about-1.jpg` |
| 460,205 | 450 KB | `public/images/gallery-3.jpg` |
| 458,321 | 448 KB | `public/images/gallery-2.jpg` |
| 429,104 | 419 KB | `public/images/mess-logo-interior.jpg.jpg` |
| 422,521 | 413 KB | `public/images/decor/photo/monstera-2.png` |
| 380,644 | 372 KB | `public/images/about-4.jpg` |
| 367,673 | 359 KB | `public/images/gallery-8.jpg` |

**Note:** No AVIF/WebP variants or LQIP manifest at baseline. `next.config.mjs` has `images.unoptimized: true` — optimization is a PART 6 build-time `sharp` pipeline.

## Fonts (pre–PART 7 snapshot)

From `app/layout.tsx` at baseline:

- **Inter:** `subsets: ['latin', 'greek']`, `display: 'swap'`
- **Fraunces:** `subsets: ['latin', 'latin-ext']` only — **no `greek` subset** (PART 7 candidate)

## Lighthouse / Core Web Vitals

- **Lighthouse CLI:** not installed (`which lighthouse` → not found; `npx lighthouse` not run to avoid one-off install in baseline commit).
- **Core Web Vitals:** cannot be auto-measured in this environment. PART 10 will document expected wins and rely on build metrics + manual visual regression unless Lighthouse is added locally.

## Config flags relevant to later parts

- `output: 'export'`, `trailingSlash: true`
- `images.unoptimized: true` → use build-time `sharp`, not `next/image` optimization
- `experimental.optimizePackageImports`: `lucide-react`, `framer-motion`, `date-fns`, `recharts`
- `public/_headers` and `public/_redirects` exist (augment only in PART 9)

## PART 10 comparison checklist

Fill in after PROMPT-005 completes:

| Metric | Baseline | After | Δ |
|--------|----------|-------|---|
| `out/` total | 108 MB | | |
| JS chunks total | ~1,145 KB | | |
| CSS total | ~165 KB | | |
| woff2 total | ~468 KB | | |
| `public/images` source | 32 MB | | |
| Lighthouse Perf `/` (mobile) | N/A | | |
| Lighthouse Perf `/food-for-medicine` (mobile) | N/A | | |
| Visual regression | — | pass / fail | |

## Visual regression notes (PART 10)

_To be completed after full pass on `/`, `/food-for-medicine`, `/actions`, an event page @ 375px + ≥1024px, and `prefers-reduced-motion: reduce`._
