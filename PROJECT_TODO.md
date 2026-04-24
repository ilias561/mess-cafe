# M.E.S.S. — Complete Project TODO

Last updated: 23 April 2026. Status: ~75% of functional MVP complete, deploy in progress.

This is the full checklist to take the project from "running on localhost" → "live site client can run for years." Use it as your reference document during the client meeting today.

---

## 1 · TECHNICAL — WHAT WE FINISH (no client input needed)

### 1.1 Launch basics (in progress right now)
- [ ] Cloudflare Pages build succeeds → `mess-cafe.pages.dev` live
- [ ] OAuth worker deployed (Cloudflare Worker for Decap GitHub login)
- [ ] GitHub OAuth App registered
- [ ] `public/admin/config.yml` wired to real worker URL
- [ ] Client can log into `/admin/` and publish a test post end-to-end
- [ ] Custom domain (`messcafe.gr` or whatever) connected to Pages
- [ ] Cloudflare Email Routing: `info@messcafe.gr` → client's personal Gmail
- [ ] HTTPS / SSL verified on custom domain
- [ ] `www.` → root redirect configured

### 1.2 SEO foundation
- [ ] `app/sitemap.ts` generates sitemap.xml at build
- [ ] `app/robots.ts` generates robots.txt
- [ ] JSON-LD schema on homepage: `LocalBusiness` + `Restaurant`
- [ ] JSON-LD schema on each event page: `Event`
- [ ] JSON-LD schema on each blog post: `Article`
- [ ] OpenGraph images (dynamic via @vercel/og OR static per post)
- [ ] Canonical URLs on every page
- [ ] `og:locale` = `el_GR` everywhere (already partially done)
- [ ] Google Search Console + Bing Webmaster verified
- [ ] Google Business Profile claim / update

### 1.3 Accessibility + performance pass
- [ ] Lighthouse score 90+ on all pages (desktop + mobile)
- [ ] All images have meaningful alt text (not decorative "image of...")
- [ ] Focus rings visible on every interactive element
- [ ] Color contrast check (olive text on bone may be borderline)
- [ ] Keyboard navigation works (tab through every page)
- [ ] Skip-to-content link in nav
- [ ] aria-labels on icon-only buttons (WhatsApp float, share icons)
- [ ] Forms have proper labels + error messages
- [ ] Greek screen-reader test (with NVDA or Mac VoiceOver)

### 1.4 Analytics + monitoring
- [ ] Cloudflare Web Analytics enabled (free, no cookie banner needed)
- [ ] Error tracking: Sentry free tier OR Cloudflare Logpush
- [ ] Uptime monitor: UptimeRobot free tier → alerts if site down

### 1.5 Forms end-to-end test
- [ ] Reservations form submits → lands in client's Gmail
- [ ] Reservations form submits → WhatsApp notification reaches client
- [ ] Footer contact form submits → lands in Gmail
- [ ] Test all forms from real phone (not just desktop)
- [ ] Test WhatsApp float button opens chat correctly

### 1.6 Legal / compliance
- [ ] Privacy policy page (Greek, simple, cover form data + analytics)
- [ ] Cookie policy if using any tracking cookies (Cloudflare Analytics cookieless → may skip)
- [ ] GDPR consent checkbox on contact/reservations forms
- [ ] "Πολιτική Απορρήτου" link in footer

---

## 2 · CONTENT — WHAT CLIENT MUST PROVIDE (all mockup right now)

### 2.1 Photos — biggest gap
Every photo on site is stock right now. Need real photos of:

**Interior**
- [ ] Wide shot of space (two angles: day, evening)
- [ ] Bar / espresso station close-up
- [ ] Seating areas (bench, table, window seat)
- [ ] Art on walls / vibe details
- [ ] Evening atmosphere with lights on

**Drinks**
- [ ] Espresso shot close-up
- [ ] Latte art top-down
- [ ] Filter coffee / pour-over
- [ ] Cold brew / iced options
- [ ] Specialty drink (signature item)

**Food**
- [ ] Each menu item photographed individually (top-down, natural light)
- [ ] Brunch spread / hero plate
- [ ] Pastry close-ups
- [ ] Seasonal / special items

**People**
- [ ] Portrait of each team member (barista, chef, owner)
- [ ] Candid: barista making coffee
- [ ] Candid: chef plating
- [ ] Group photo of team

**Events (past + future)**
- [ ] Open mic / music night crowd shots
- [ ] Workshop in progress
- [ ] Any press moment or notable night

**Exterior / brand**
- [ ] Storefront day
- [ ] Storefront evening with signage lit
- [ ] Logo / signage detail
- [ ] Chalkboard with specials

**Minimum before launch: 15 photos.** Ideal: 40-50.

Ask client today:
- Can you shoot these yourself with phone? (iPhone 12+ or any recent phone = fine)
- Or need to hire photographer? (€200-400 for half-day in Ioannina)
- Do you have existing photos from Instagram we can use?

### 2.2 Real copy — all placeholder Greek right now

**Homepage**
- [ ] Hero headline (1 line, what the café is)
- [ ] Hero subhead (1-2 sentences)
- [ ] Philosophy / about intro (100 words)
- [ ] Any signature quote / mantra

**Menu page**
- [ ] Every drink: name, price, 1-sentence description
- [ ] Every food item: name, price, ingredients, story
- [ ] Categories (Specialty, Filter, Food, Dessert, etc.)
- [ ] Allergen info if applicable

**About / Philosophy page**
- [ ] Origin story (300-500 words): why MESS? what's the name?
- [ ] What's special about the coffee sourcing
- [ ] What's special about the food philosophy
- [ ] What role does café play in Ioannina community
- [ ] Founders' bio paragraph

**Events** (currently 4 mockup events)
- [ ] Real list of past events (last 3-6 months)
- [ ] Real list of upcoming events (next 3 months minimum)
- [ ] For each: title, date, time, capacity, price, description, photo

**Blog** (currently 5 mockup posts)
- [ ] Topics client wants to write about (coffee education, events recap, community)
- [ ] Who writes? Client? Owner? Ghostwrite from me/you?
- [ ] Publishing cadence (weekly? monthly?)
- [ ] Tone / voice guide (Greek café-casual? Academic? Playful?)

### 2.3 Real info — currently all placeholder

- [ ] Real street address + postal code
- [ ] Real phone number (landline AND mobile for WhatsApp — can be same)
- [ ] Real WhatsApp Business number (recommend separate from personal)
- [ ] Real email (`info@messcafe.gr` will be routed via Cloudflare)
- [ ] Real hours — weekdays, weekend, holidays
- [ ] Exact hours for Christmas / Easter / summer vacation (seasonal)
- [ ] Instagram handle (actual URL)
- [ ] Facebook page (if any)
- [ ] TikTok / YouTube (if any)
- [ ] Google Maps link / exact coordinates

### 2.4 Brand assets
- [ ] Logo vector file (SVG or AI source, NOT a PNG)
- [ ] Logo variants: full wordmark, icon-only, monochrome
- [ ] Favicon (16x16 + 32x32 + Apple touch icon)
- [ ] Brand color confirmation (is mustard #e8b547 final? or client wants different?)
- [ ] Typography choice confirmation (Fraunces + Inter — client happy?)

---

## 3 · DESIGN / FUNCTIONAL UPGRADES (from proposition — optional tier)

These are not required for launch. Propose to client as v2 work (€€ extra) OR do for free if you want portfolio glory.

### 3.1 High-impact, low-effort
- [ ] **Team / Οι άνθρωποι page** — 3-5 profiles with portraits + bios (needs content 2.2)
- [ ] **"Σήμερα στο M.E.S.S." homepage module** — today's special, next event, open/closed (CMS-editable daily)
- [ ] **Menu as editorial** — each signature item has photo + story, not just price list
- [ ] **Newsletter signup** — Buttondown free tier, footer + blog post inserts
- [ ] **Related posts by tag** (not just category)
- [ ] **Reading progress bar** on long blog posts
- [ ] **English `/en/` toggle** for 3 core pages (Ioannina has tourists)

### 3.2 Signature moves (awards-level polish)
- [ ] **Dark evening theme** — auto-swaps after 7pm to charcoal/mustard
- [ ] **Sound signature hero** — click for 10sec café ambient audio
- [ ] **Custom cursor on hover** — menu item, image, CTA variations
- [ ] **Scroll-linked color wash** — bone → bone-warm as you scroll
- [ ] **Handwritten specials module** — client snaps chalkboard photo, auto-appears
- [ ] **Custom Mapbox map** replacing generic Google embed
- [ ] **Instagram feed embed** on gallery page

### 3.3 Content tools for growth
- [ ] **Press / Reviews page** — collect media mentions over time
- [ ] **Community photo submission** — user uploads via Instagram tag → embed
- [ ] **Event RSVP email capture** — free, builds email list
- [ ] **Loyalty preview page** — "coming soon" for future punch-card system

---

## 4 · CMS + CLIENT HANDOVER

- [ ] Client walkthrough of `/admin/` (15-min screen share)
- [ ] Test together: client adds 1 new event, publishes, sees it live
- [ ] Test together: client adds 1 blog post with photo
- [ ] Test together: client updates hours from settings
- [ ] Written handover PDF in simple Greek (1-2 pages)
- [ ] Video recording of common tasks (can be screen-capture with voice)
- [ ] Client has own admin access (no shared passwords)
- [ ] Backup strategy explained: "every edit auto-saved in GitHub, reversible forever"
- [ ] Support agreement signed (see section 6)

---

## 5 · MEETING TODAY — QUESTIONS TO ASK CLIENT

Print this section or have it open on your phone.

### Domain + Email
- Do you own `messcafe.gr` already? Where is it registered (GoDaddy, Papaki, other)?
- If yes, give me access / transfer to Cloudflare OR give me DNS access
- If no, budget ~€15/year for domain — I can buy it for you or you buy and share

### Photos
- How many real photos of interior / drinks / food do you have right now?
- Can you send them via WhatsApp by end of week?
- If you don't have enough, do you want to hire local photographer? (€200-400 half-day)
- Can you start posting more to Instagram so we build a library?

### Content — copy
- Who writes the blog posts — you, a team member, or do you want me to ghostwrite from a voice memo?
- How often should new posts go up — weekly? bi-weekly? monthly?
- Same questions for events: how far in advance do you know the calendar?

### Content — specifics needed THIS WEEK
- Real menu (every item, price, short description) — PDF or photo of menu book
- Team members: 3-5 names, roles, 2-sentence bios, can we photograph this week?
- Next 3 months of events with dates/times/prices
- Real hours of operation
- Real phone number (personal vs WhatsApp Business)
- Real email (should I set up `info@messcafe.gr` for you?)
- Instagram handle
- Google Maps link

### Legal / business
- Does the café have a VAT number / company registration for invoicing?
- GDPR: are you OK with me adding a simple privacy policy?

### Expectations
- When do you want to go live? (realistic target 2-3 weeks from today)
- After launch, who maintains it? You via CMS? Or do you want me on retainer (€50-100/month)?
- Do you want English version for tourists? (adds 1-2 days work)
- Do you want newsletter? (needs growth commitment from you)

### The €€ question
- Confirm final invoice: **€1,400-1,500 for complete website** (quote your real number)
- What's included: design, development, CMS, hosting setup, domain connect, email routing, 15-min training, 1 week post-launch bugfix support
- What's NOT included: new photos (photographer = separate), ongoing content writing, new features after launch (those billed separately at your hourly rate)

---

## 6 · BUSINESS / CONTRACT TERMS

Things to lock in writing with client (even email confirmation is enough for freelance):

- [ ] **Deliverables**: list from this TODO = what's in scope
- [ ] **Hosting cost**: ~€0/month on Cloudflare free tier, but client pays if upgrade needed
- [ ] **Domain**: €15/year, who pays (recommend client pays directly in their name)
- [ ] **Code ownership**: client owns final code, but you own reusable design system / components for future clients
- [ ] **Support terms**: e.g. "1 week post-launch bugfix included, then €40/hour billed in 30-min blocks"
- [ ] **Monthly retainer offer**: optional — "€60/month = 1 hour support + minor updates, unused time doesn't roll over"
- [ ] **Content responsibility**: client provides all photos + copy. You can ghostwrite at hourly rate if they want.
- [ ] **Payment schedule**: 50% upfront / 50% on launch (standard) OR 30% upfront / 40% on staging / 30% on launch

---

## 7 · LAUNCH SEQUENCE (the real order)

Once all above are addressed, ship in this order:

1. Finish Phase 5 (deploy + OAuth) — this week
2. Connect domain + email (Phase 6-7) — when client provides domain access
3. Replace mockup photos with real photos — as they come in
4. Replace mockup copy with real copy — as client provides
5. SEO foundation pass (schema, sitemap, OG)
6. Performance + a11y pass
7. Analytics + monitoring live
8. Client walkthrough + handover
9. Soft launch: announce to client's friends/family only, 1 week bug hunt
10. Public launch: Instagram post, local press outreach, Google Business update

---

## 8 · PROGRESS TRACKER

- [x] Phase 1: blog (index + post detail + seed posts)
- [x] Phase 2: events (index + detail + seed events + homepage module)
- [x] Phase 3: reservations + WhatsApp float
- [x] Phase 4: CMS wiring (Decap + content migration)
- [ ] Phase 5: deploy (Cloudflare Pages + OAuth worker) ← **IN PROGRESS**
- [ ] Phase 6: custom domain + email routing
- [ ] Phase 7: SEO + a11y + perf pass
- [ ] Phase 8: client walkthrough + handover
- [ ] Launch

After Phase 5-8 done = **MVP launched**. After sections 3.1-3.2 done = **signature site**.
