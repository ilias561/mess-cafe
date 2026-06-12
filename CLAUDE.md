# M.E.S.S. Café — working rules

Static Next.js export (`output: "export"`) on Cloudflare Pages.

## Deploys are MANUAL

- `git push` does **not** deploy. Production only updates via `npm run cf:deploy`.
- When replacing any file under `public/videos/`, bump `CACHE_BUST` in `lib/media.ts`.
- Before deploying: `npm run check:mobile` (see Verification below).

## Mobile rules (<768px) — every one of these exists because it broke on a real iPhone

1. **Never scroll-scrub animations on phones.** iOS delivers scroll events to JS
   behind the compositor's actual scrolling, so anything mapped to scroll
   progress lags or appears stuck (emulators do NOT reproduce this).
   Use IntersectionObserver-triggered, time-based animations instead
   (see `expand-cover-reveal.tsx` mobile branch for the pattern).
2. **Transforms and opacity only.** No per-frame `clip-path`, `filter`,
   `border-radius`, or layout animation on phones — they re-rasterize the layer
   every frame. A changing border-radius is OK as a single style flip.
3. **No full-section animated layers** (section-sized overlays/gradients with
   animated opacity re-composite the whole section on iOS).
4. **Use `svh` (not `vh`) for pinned/sticky heights** — `vh` jumps when the
   Safari URL bar collapses.
5. **Lenis stays off touch devices** (`hover: none`); all scroll helpers must
   keep their native fallbacks (`lib/lenis.ts#scrollToId`).
6. **Image bytes:** 3× iPhones multiply `sizes` by DPR — `100vw` fetches
   w1200/w1500 variants. Cap `sizes` so phones get ≤ w768 (~65vw at 100vw-wide).
   `<video poster>` can't use srcset → posters need dedicated ≤ ~200KB files.
7. **Media fetch order:** images pre-fetch ~1.5 viewports ahead (built into
   `FadeImage` and `scroll-leaves`); videos on phones fetch only when actually
   on screen (`ambient-video.tsx`) so they don't starve image downloads.

## Media budgets (the user's connection is ~13 Mbps)

- Ambient/section clips ≤ ~1.5MB; the long philosophy clip ≤ ~3MB.
- Encode: `ffmpeg -c:v libx264 -preset slow -crf 25..28 -pix_fmt yuv420p
  -movflags +faststart -an` (strip audio — everything plays muted).
- Decorative images: w480 variants; check `du` before committing media.

## Verification — emulation lied to us before; trust this order

1. `npm run check:mobile` — builds nothing; serves `out/` and runs the smoke
   suite (`scripts/mobile-check.mjs`) in Chromium mobile emulation with
   throttled network. Run `npm run build` first.
2. GitHub Actions runs the same suite in **real WebKit** (Safari engine) on
   every push — check the run before/after deploying.
3. Chromium emulation passing is NOT proof for scroll/GPU behavior. If a
   change touches scroll-linked or animated code paths, the WebKit CI run is
   the minimum bar, and a real-device check is the gold standard.

## Design constraints (user decisions — do not revisit)

- Keep the existing layout/structure; polish, perf, a11y, SEO only.
- No prices in the menu UI (data stays in `lib/menu-data`, unrendered).
- Desktop keeps the cinematic effects; phones get the cheap equivalents,
  not removals (poster-only "videos" on phones read as broken).
