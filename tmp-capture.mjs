import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'

async function capture(name, path, action) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } })
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })
  if (action) await action(page)
  await page.screenshot({ path: name, fullPage: true })
  await browser.close()
}

await capture('1-loading-curtain-mid.png', '/', async (page) => {
  await page.waitForTimeout(320)
})

await capture('2-hero-video-playing.png', '/', async (page) => {
  await page.waitForTimeout(2650)
})

await capture('3-hero-photo-after-video.png', '/', async (page) => {
  await page.waitForTimeout(13500)
})

await capture('4-newsletter-popup-filled.png', '/', async (page) => {
  await page.waitForTimeout(46200)
  await page.fill('input[type="email"]', 'demo@mess-cafe.gr')
  await page.check('input[type="checkbox"]')
  await page.waitForTimeout(350)
})

await capture('5-mask-reveal-mid.png', '/', async (page) => {
  await page.waitForTimeout(2600)
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'auto' }))
  await page.waitForTimeout(120)
})
