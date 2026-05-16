# M.E.S.S. — Launch Checklist

Single source of truth for what's left before the site goes live. Update by flipping `[ ]` to `[x]`.

**Status legend (Blocked by):**
- 🤖 `Cursor` — code work, no external input needed
- 👤 `Client` — needs info / asset from the café owner
- 🔧 `Dashboard` — manual click-work in Cloudflare / Google / GitHub / etc.
- 🧪 `Live site` — needs a deployed environment to test
- 🧑‍💻 `Ilias` — your own decision / sign-off

---

## A · Code polish (🤖 Cursor — runnable now)

- [x] Re-encode menu drink videos at higher quality (540 → 720px, CRF 26)
  - **Done when:** `public/images/menu/drink-*.mp4` files are 600–900 KB each, look sharp in the menu gallery layout
- [x] OpenGraph image per top-level route (`/menu`, `/reservations`, `/actions`, `/blog`)
  - **Done when:** `<head>` of each route includes an `og:image` pointing at a representative photo from that section
- [x] Verify Menu/MenuSection/MenuItem JSON-LD covers every item with price + description
  - **Done when:** Google Rich Results Test passes on `/menu`
- [x] Build `/thank-you` page for post-form submission redirect
  - **Done when:** reservation form `onSuccess` routes user to `/thank-you` with a confirmation message
- [x] Verify `not-found.tsx` catches unknown routes (visit `/asdfasdf` locally)
  - **Done when:** unknown routes render the branded 404, not Next's default — file at `app/not-found.tsx`; manual check: `npm run dev` → `/asdfasdf`
- [x] Add `HANDOFF.md` — short Greek-language doc explaining `/admin/`, content editing, and backup
  - **Done when:** file exists with sections on logging in, adding events/posts, changing hours
- [x] Audit all images for `loading="lazy"` and `decoding="async"`
  - **Done when:** every `<img>` outside the initial viewport is lazy-loaded
- [x] Cache headers — add `public/_headers` if needed for long-cache on `/videos/` and `/images/`
  - **Done when:** browser Cache-Control on a video is at least 1 day

---

## B · Code blocked on client info (👤 Client)

Each line is a placeholder waiting for a real value. Grep the repo for `[ΣΥΜΠΛΗΡΩΣΕ` to find them.

- [ ] **Legal entity block** — επωνυμία, διεύθυνση, ΑΦΜ, email υπεύθυνου επεξεργασίας
  - **Goes in:** `app/privacy/page.tsx` ~line 26
  - **Done when:** placeholder is replaced with real values
- [ ] **GDPR rights-request email**
  - **Goes in:** `app/privacy/page.tsx` ~line 96
- [ ] **Terms-of-use contact email**
  - **Goes in:** `app/terms/page.tsx` ~line 43
- [ ] **Instagram + Facebook URLs**
  - **Goes in:** `app/layout.tsx` JSON-LD `sameAs` array (~lines 110–113)
- [ ] **Real address + phone + email** throughout the site
  - **Goes in:** `lib/constants.ts`, `app/layout.tsx` JSON-LD, contact section, footer
- [ ] **Real opening hours** including seasonal variations (summer, Christmas, Easter)
  - **Goes in:** `lib/hours.ts` and JSON-LD `openingHoursSpecification`
- [ ] **Real menu copy** — verify every item, price, ingredients, allergens
  - **Goes in:** `lib/menu-data.ts`
- [ ] **Logo SVG vector file** (not PNG)
  - **Goes in:** `public/logo.svg`, replace placeholder in `components/navigation.tsx`
- [ ] **Real photos** for every section currently using stock
  - Minimum 15 before launch, ideally 40+
  - Categories needed: interior (2–3), drinks (5+), food per menu item, team portraits (3–5), exterior day/evening, events
- [ ] **Origin story / philosophy copy** (300–500 words for About section)
- [ ] **Hero headline + subhead** finalized in Greek

---

## C · External setup (🔧 Dashboard)

- [ ] **Buy domain** (≈ €10–25/yr)
  - Cheapest: Cloudflare Registrar `.com` ($9.77/yr)
  - Brand-correct: `.gr` via Papaki or Pointer.gr
- [ ] **Connect domain to Cloudflare Pages**
  - **Done when:** `https://yourdomain` serves the site with valid SSL
- [ ] **`www` → root redirect**
- [ ] **R2 custom domain** (e.g., `cdn.yourdomain`) for media — replaces same-origin serve when ready
  - **Done when:** R2 bucket has a custom domain; `NEXT_PUBLIC_VIDEO_BASE_URL` is set in Pages env to that URL
- [ ] **Cloudflare Web Analytics token** → `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` in Pages env
  - **Done when:** analytics dashboard shows pageviews from the live site
- [ ] **GitHub OAuth App** for Decap CMS
  - **Done when:** Client ID + Secret exist
- [ ] **Decap OAuth Cloudflare Worker** deployed and registered
  - **Done when:** client can log into `/admin/` via GitHub
  - **Note:** this is the biggest external task remaining; budget 1–2 hours
- [ ] **Cloudflare Email Routing** — `info@yourdomain` → client's Gmail
  - **Done when:** test email to `info@…` arrives in personal inbox
- [ ] **Google Search Console** — verify ownership via TXT DNS record
  - **Done when:** site shows "verified" in GSC
- [ ] **Bing Webmaster Tools** — same as above for Bing
- [ ] **Google Business Profile** — claim or update with new hours, website link, photos
- [ ] **Sentry** free tier (optional but recommended)
  - **Done when:** DSN exists; client errors visible in Sentry dashboard
- [ ] **UptimeRobot** monitor pointing at production URL (free)
  - **Done when:** alert email arrives if site goes down

---

## D · Post-deploy testing (🧪 Live site)

- [ ] **Lighthouse 90+ on every route** (mobile + desktop, run from `dash.cloudflare.com` or browser DevTools)
- [ ] **Reservation form end-to-end** from a real phone
  - **Done when:** form submission lands in Gmail AND WhatsApp notification arrives
- [ ] **WhatsApp float button** opens the correct chat thread
- [ ] **Greek screen-reader pass** with NVDA (Windows) or VoiceOver (macOS)
- [ ] **Keyboard-only navigation** — tab through every page, every interactive element should focus visibly
- [ ] **iOS Safari + Android Chrome** real-device check on hero video playback, form submission
- [ ] **GDPR consent checkbox** prevents form submit when unchecked

---

## E · Hosting / handover (🧑‍💻 Ilias)

- [ ] **Decide hosting fee** with client (€30–80/month is normal for managed)
- [ ] **Written agreement** covering: deliverables, support window, ownership, transition terms
- [ ] **Backup strategy documented** — code in GitHub + content auto-saved via Decap = reversible forever
- [ ] **Client walkthrough of `/admin/`** — 15-min screen share; record it
- [ ] **Test-publish together** — client adds 1 event and 1 blog post live
- [ ] **Hand-off PDF** in plain Greek (1–2 pages)
- [ ] **First invoice issued + paid**

---

## F · Nice-to-have / v2 (post-launch, billable separately)

- [ ] Team/people page (3–5 portraits + bios)
- [ ] English `/en/` toggle for tourists
- [ ] Newsletter signup (Buttondown or Brevo)
- [ ] Press / Reviews page
- [ ] Custom Mapbox map replacing Google embed
- [ ] Instagram feed embed on gallery
- [ ] Dark evening theme that auto-swaps after 7 pm
- [ ] Sound signature on hero (10-sec ambient audio on click)
- [ ] "Σήμερα στο M.E.S.S." daily module on homepage

---

## Currently shipped (for reference)

- [x] Menu page redesign — visual vs list layouts, signature treatment
- [x] Menu drink videos re-encoded (24 MB → 2 MB total)
- [x] Anchor nav sticky gap fixed (top-16 alignment)
- [x] Hero videos served same-origin from Pages (no R2 throttling)
- [x] Hero preload="auto" — eliminates 2×-playback stutter
- [x] Sitemap, robots, legal pages (privacy/cookies/terms) scaffolded
- [x] GDPR consent checkbox on reservation form
- [x] Per-page canonical URLs + per-page metadata
- [x] CafeOrCoffeeShop JSON-LD on every route
- [x] Branded 404 page
- [x] Alt-text audit across 30+ files
- [x] Cloudflare Web Analytics scaffolded (needs token)
- [x] `?review=1` photo numbering overlay for client feedback
