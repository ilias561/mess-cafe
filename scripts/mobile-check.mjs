/**
 * Mobile smoke suite — runs the checks that caught (or should have caught)
 * every real-iPhone bug so far. Run against a URL serving the static build:
 *
 *   node scripts/mobile-check.mjs http://127.0.0.1:8750
 *   PW_ENGINE=webkit node scripts/mobile-check.mjs http://127.0.0.1:8750
 *
 * Engine: chromium (default, supports network throttling) or webkit (real
 * Safari engine — the only emulation that reproduces iOS scroll behavior).
 * Exits non-zero on any failure; prints one line per check.
 */
import { chromium, webkit, devices } from 'playwright'

const base = process.argv[2]
if (!base) {
  console.error('usage: node scripts/mobile-check.mjs <base-url>')
  process.exit(2)
}
const engineName = process.env.PW_ENGINE === 'webkit' ? 'webkit' : 'chromium'
const engine = engineName === 'webkit' ? webkit : chromium

const failures = []
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  [${engineName}] ${name}${detail ? ` — ${detail}` : ''}`)
  if (!ok) {
    failures.push(name)
    // GitHub annotation — readable via the public check-runs API even when
    // raw logs require admin rights
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::error title=mobile-check [${engineName}]::${name}${detail ? ` — ${detail}` : ''}`)
    }
  }
}

const browser = await engine.launch()
const ctx = await browser.newContext({
  ...devices['iPhone 13'],
  // webkit on linux can't run the device's defaultBrowserType
  defaultBrowserType: undefined,
})
const page = await ctx.newPage()

const pageErrors = []
const failedAssets = []
page.on('pageerror', (e) => pageErrors.push(e.message.split('\n')[0]))
page.on('response', (r) => {
  if (r.status() >= 400 && new URL(r.url()).origin === new URL(base).origin) {
    failedAssets.push(`${r.status()} ${new URL(r.url()).pathname}`)
  }
})

// Chromium only: approximate the user's real connection (~13 Mbps, 60ms RTT)
if (engineName === 'chromium') {
  const cdp = await ctx.newCDPSession(page)
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 60,
    downloadThroughput: (13e6 / 8),
    uploadThroughput: (3e6 / 8),
  })
}

await page.goto(base + '/', { waitUntil: 'load', timeout: 45000 })

// 1. loader clears quickly
const loaderGone = await page
  .waitForFunction(() => !document.querySelector('[class*="z-\\[200\\]"]'), null, { timeout: 5000 })
  .then(() => true)
  .catch(() => false)
check('loader gone within 5s of load', loaderGone)

// 2. desktop hero clip must not download on mobile
await page.waitForTimeout(1200)
const desktopClipBytes = await page.evaluate(() => {
  const v = [...document.querySelectorAll('video')].find((x) =>
    (x.currentSrc || x.src).includes('main-page-animation'),
  )
  return v ? v.readyState : -1
})
check('desktop hero clip not fetched on mobile', desktopClipBytes <= 0, `readyState=${desktopClipBytes}`)

// 3. scroll the whole page like a flick; no JS errors anywhere
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y <= height; y += 320) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(60)
}

// 4. phones render the sparse canopy + ghost layer ONLY (≤12 leaves, all
// painted at arrival) — not the full desktop border, and never zero
await page.evaluate(() => document.getElementById('philosophy')?.scrollIntoView())
await page.waitForTimeout(1500)
const leafStats = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img[src*="/decor/photo/"]')]
  return {
    count: imgs.length,
    loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
  }
})
check(
  'philosophy ghost leaves on mobile: sparse and painted',
  leafStats.count > 0 && leafStats.count <= 14 && leafStats.loaded === leafStats.count,
  `${leafStats.loaded}/${leafStats.count} leaves`,
)

// 5. ambient videos exist as <video> on mobile (poster-only regression guard)
const ambientVideos = await page.evaluate(
  () =>
    [...document.querySelectorAll('video')].filter((v) =>
      (v.currentSrc || v.src).match(/philosophy|editorial/),
    ).length,
)
check('ambient clips render as <video> on mobile', ambientVideos >= 1, `${ambientVideos} found`)

// 6. café grow completes WITHOUT further scrolling (time-based, not scrubbed)
const pinInfo = await page.evaluate(() => {
  const s = document.querySelector('.sticky.top-0.z-0')
  if (!s) return null
  return s.parentElement.getBoundingClientRect().top + window.scrollY
})
if (pinInfo == null) {
  check('café grow pin exists on mobile', false)
} else {
  const vh = await page.evaluate(() => window.innerHeight)
  await page.evaluate((y) => window.scrollTo(0, y), pinInfo + vh * 0.25)
  await page.waitForTimeout(2200) // grow is a 1s one-shot — must finish while parked
  const scale = await page.evaluate(() => {
    const el = document.querySelector('.sticky.top-0.z-0 > div')
    const t = getComputedStyle(el).transform
    return t === 'none' ? 1 : new DOMMatrix(t).a
  })
  check('café grow reaches full-bleed while parked', scale > 0.98, `scale=${scale.toFixed(2)}`)
}

// 7. every responsive image must fetch a variant matched to its PAINTED size.
// Undersized reads as pixelation on a 3× screen (the café grow photo and the
// philosophy tiles both shipped that way); oversized wastes the ~13 Mbps
// budget. For object-cover images the need is max(width, height × aspect) —
// a portrait screen crops a landscape photo by HEIGHT, and width-only math is
// exactly why the grow photo stayed soft even after its w1200 bump.
// settle pass first: park at the bottom so every lazy/IO-gated image below
// the grow pin has a currentSrc before auditing (the dish images at 0.49×
// slipped through an early audit exactly this way)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(1500)
const imgFit = await page.evaluate(() => {
  const bad = { undersized: [], oversized: [] }
  for (const img of document.querySelectorAll('img')) {
    const m = (img.currentSrc || '').match(/--w(\d+)\./)
    if (!m || !img.naturalWidth) continue
    const r = img.getBoundingClientRect()
    if (r.width < 10 || r.height < 10) continue
    const aspect = img.naturalWidth / img.naturalHeight
    const cover = getComputedStyle(img).objectFit === 'cover'
    const neededCss = cover ? Math.max(r.width, r.height * aspect) : r.width
    const needed = Math.round(neededCss * devicePixelRatio)
    const ratio = Number(m[1]) / needed
    const tag = `${img.currentSrc.split('/').pop()} ${m[1]}w for ${needed}px`
    // bar = 0.75: the philosophy tiles drew a real-iPhone pixelation report at
    // 0.75×, so anything below that is a regression. Rotated decor silhouettes
    // are exempt — rotation inflates the bounding rect, overstating need.
    if (ratio < 0.75 && !img.currentSrc.includes('/decor/photo/')) bad.undersized.push(tag)
    if (ratio > 1.8) bad.oversized.push(tag)
  }
  return bad
})
check(
  'no undersized (pixelated) image variants',
  imgFit.undersized.length === 0,
  imgFit.undersized.slice(0, 3).join(', '),
)
check(
  'no oversized image variants',
  imgFit.oversized.length === 0,
  imgFit.oversized.slice(0, 3).join(', '),
)

// 8. the page can never pan sideways (real-iPhone report on /workshops) —
// behavioral test: actively try to scroll the page horizontally
for (const path of ['/', '/workshops/']) {
  if (path !== '/') {
    await page.goto(base + path, { waitUntil: 'load', timeout: 45000 })
    await page.waitForTimeout(800)
  }
  const panned = await page.evaluate(async () => {
    const results = []
    const h = document.documentElement.scrollHeight
    for (const y of [0, h * 0.35, h * 0.7]) {
      window.scrollTo(120, y)
      await new Promise((r) => setTimeout(r, 50))
      if (window.scrollX > 0) results.push(`scrollX=${Math.round(window.scrollX)}@y=${Math.round(y)}`)
    }
    window.scrollTo(0, 0)
    return results
  })
  check(`no horizontal page pan on ${path}`, panned.length === 0, panned.join(', '))
}

// 9. error rollups
check('zero JS errors across the run', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '))
check('zero broken same-origin assets', failedAssets.length === 0, failedAssets.slice(0, 3).join(' | '))

await browser.close()
if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`)
  process.exit(1)
}
console.log('\nall mobile checks passed')
