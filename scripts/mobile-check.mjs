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

// 7. no oversized image variants fetched on a 3x phone — except the café
// grow photo (about-2): it paints full-screen on ~1170 device px, where
// w1200 is the CORRECT variant, not a leak (it was visibly pixelated at w768)
const fatImages = await page.evaluate(() =>
  [...document.querySelectorAll('img')]
    .map((i) => i.currentSrc)
    .filter((s) => /--w(1200|1500|1600|2000)\./.test(s))
    .filter((s) => !/\/about-2--/.test(s))
    .map((s) => s.split('/').pop()),
)
check('no w1200+ image variants on mobile', fatImages.length === 0, fatImages.slice(0, 3).join(', '))

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
