# M.E.S.S. Café — working rules

Static Next.js export (`output: "export"`) on Cloudflare Pages.

## Deploys are AUTOMATIC on push (since 2026-06-12)

- The repo is git-connected to Cloudflare Pages: **every push to `main`
  deploys production** (Cloudflare builds it; a "Cloudflare Pages" check
  appears on the commit). `npm run cf:deploy` still works for a manual
  direct-upload deploy.
- Therefore: never push a commit you wouldn't put in front of a customer,
  and treat a red WebKit CI run on `main` as a production incident.
- When replacing any file under `public/videos/`, bump `CACHE_BUST` in `lib/media.ts`.
- Before pushing: `npm run check:mobile` (see Verification below).

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
6. **Image bytes — match the variant to PAINTED device px** (smoke check 7
   enforces both directions). 3× iPhones multiply `sizes` by DPR, so `100vw`
   on a small image overfetches — but blanket caps backfire: the old "≤w768
   on phones" rule pixelated the philosophy tiles AND the café grow photo on
   real iPhones. For `object-cover` the need is max(width, height × aspect);
   a landscape photo covering a portrait screen is HEIGHT-driven — express
   `sizes` in vh there, or art-direct a portrait source (see
   expand-cover-reveal). `<video poster>` can't use srcset → posters need
   dedicated ≤ ~200KB files.
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
2. **Real WebKit locally** (pushes deploy prod now, so verify BEFORE pushing —
   playwright's WebKit needs Ubuntu libs this Arch host doesn't have; run it
   in a container with the host's downloaded browsers mounted in):

   ```sh
   docker run -d --name mess-webkit --network=host \
     -v "$PWD":/work -v ~/.cache/ms-playwright:/ms-pw \
     -e PLAYWRIGHT_BROWSERS_PATH=/ms-pw -w /work ubuntu:24.04 sleep 7200
   docker exec mess-webkit bash -c 'apt-get update -qq && \
     apt-get install -y -qq curl ca-certificates && \
     curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
     apt-get install -y -qq nodejs && npx playwright install-deps webkit'
   docker exec -e PW_ENGINE=webkit mess-webkit \
     node scripts/mobile-check.mjs http://127.0.0.1:8750
   ```

   (Don't bother with `mcr.microsoft.com/playwright` — its registry kept
   resetting the 1.5GB layer on this connection, 2026-06-12.)
3. GitHub Actions runs the same suite in real WebKit on every push; failures
   land as check-run annotations readable via the public API.
4. Chromium emulation passing is NOT proof for scroll/GPU behavior. If a
   change touches scroll-linked or animated code paths, real WebKit is the
   minimum bar, and a real-device check is the gold standard.
5. Headless-WebKit facts learned the hard way (probe, 2026-06-12): its rAF
   can tick ~2×/s — anything driven by a JS rAF loop (framer's `animate()`)
   stalls there, and on real iPhones the same loop starves mid-scroll. Its
   IntersectionObservers can fire once at observe-time and never again.
   One-shot effects must run on WAAPI (`element.animate`) with multiple
   independent triggers (geometry check + scroll listener + IO).

## Design constraints (user decisions — do not revisit)

- Keep the existing layout/structure; polish, perf, a11y, SEO only.
- No prices in the menu UI (data stays in `lib/menu-data`, unrendered).
- Desktop keeps the cinematic effects; phones get the cheap equivalents,
  not removals (poster-only "videos" on phones read as broken).
