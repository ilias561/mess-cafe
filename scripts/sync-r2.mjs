/**
 * Syncs public/videos/ to Cloudflare R2.
 * Skips files already uploaded with the same size.
 *
 * Required in .env.local:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(join(ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {
    // .env.local is optional — env vars may be set in the shell
  }
}
loadEnv()

const ACCOUNT_ID  = process.env.R2_ACCOUNT_ID
const ACCESS_KEY  = process.env.R2_ACCESS_KEY_ID
const SECRET_KEY  = process.env.R2_SECRET_ACCESS_KEY
const BUCKET      = process.env.R2_BUCKET_NAME

if (!ACCOUNT_ID || !ACCESS_KEY || !SECRET_KEY || !BUCKET) {
  console.error('Missing R2 env vars. Add R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME to .env.local')
  process.exit(1)
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
})

const CONTENT_TYPES = {
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, files)
    else files.push(full)
  }
  return files
}

async function alreadyUploaded(key, localSize) {
  try {
    const res = await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
    return res.ContentLength === localSize
  } catch {
    return false
  }
}

async function main() {
  const videosDir = join(ROOT, 'public', 'videos')
  const files = walk(videosDir)
  console.log(`Found ${files.length} files to sync → ${BUCKET}\n`)

  let uploaded = 0, skipped = 0

  for (const file of files) {
    const rel  = relative(join(ROOT, 'public'), file).replace(/\\/g, '/')
    const ext  = '.' + file.split('.').pop().toLowerCase()
    const size = statSync(file).size

    if (await alreadyUploaded(rel, size)) {
      console.log(`  skip  ${rel}`)
      skipped++
      continue
    }

    const body = readFileSync(file)
    await client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: rel,
      Body: body,
      ContentType: CONTENT_TYPES[ext] ?? 'application/octet-stream',
      ContentLength: size,
    }))
    console.log(`  up    ${rel}  (${(size / 1024).toFixed(0)} KB)`)
    uploaded++
  }

  console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped.`)
}

main().catch(err => { console.error(err); process.exit(1) })
