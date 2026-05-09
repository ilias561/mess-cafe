import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const FRAME_COUNT = 30
const QUALITY = Number(process.env.MOBILE_FRAME_QUALITY ?? '75')
const MAX_DIMENSION = 720
const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, 'public', 'videos', 'frames-mobile')

const CANDIDATE_SOURCES = [
  path.join(ROOT, 'public', 'videos', 'hero-source.mp4'),
  path.join(ROOT, 'public', 'videos', 'main-page-animation.mp4'),
  path.join(ROOT, 'main page animation.mp4'),
  path.join(ROOT, '12345.mp4'),
]

function pickSource(explicitSource) {
  if (explicitSource) {
    const resolved = path.resolve(ROOT, explicitSource)
    if (!fs.existsSync(resolved)) throw new Error(`Source video not found: ${resolved}`)
    return resolved
  }

  const found = CANDIDATE_SOURCES.find((p) => fs.existsSync(p))
  if (!found) {
    throw new Error(
      `No source video found. Checked:\n${CANDIDATE_SOURCES.map((p) => `- ${p}`).join('\n')}`
    )
  }
  return found
}

function getDurationSeconds(sourcePath) {
  const out = execFileSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      sourcePath,
    ],
    { encoding: 'utf8' }
  ).trim()

  const duration = Number(out)
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`Unable to read a valid duration for: ${sourcePath}`)
  }
  return duration
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)} MB`
}

function ensureCleanOutputDir() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  for (const entry of fs.readdirSync(OUTPUT_DIR)) {
    if (entry.endsWith('.webp')) {
      fs.rmSync(path.join(OUTPUT_DIR, entry), { force: true })
    }
  }
}

function buildFrames(sourcePath) {
  const duration = getDurationSeconds(sourcePath)
  const fps = FRAME_COUNT / duration
  const outputPattern = path.join(OUTPUT_DIR, 'frame-%03d.webp')
  const vf = `fps=${fps.toFixed(6)},scale='if(gt(iw,ih),${MAX_DIMENSION},-2)':'if(gt(iw,ih),-2,${MAX_DIMENSION})'`

  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      sourcePath,
      '-vf',
      vf,
      '-c:v',
      'libwebp',
      '-frames:v',
      String(FRAME_COUNT),
      '-q:v',
      String(QUALITY),
      '-compression_level',
      '6',
      outputPattern,
    ],
    { stdio: 'inherit' }
  )
}

function summarize() {
  const files = fs
    .readdirSync(OUTPUT_DIR)
    .filter((f) => /^frame-\d{3}\.webp$/.test(f))
    .sort()
  const totalBytes = files.reduce((sum, file) => {
    return sum + fs.statSync(path.join(OUTPUT_DIR, file)).size
  }, 0)

  console.log(`Generated ${files.length} WebP frames in ${OUTPUT_DIR}`)
  console.log(`Total bytes: ${totalBytes} (${formatBytes(totalBytes)})`)
}

function main() {
  const explicitSource = process.argv[2]
  const sourcePath = pickSource(explicitSource)
  console.log(`Using source: ${sourcePath}`)
  console.log(`Target: ${FRAME_COUNT} frames, quality=${QUALITY}, max-dimension=${MAX_DIMENSION}`)
  ensureCleanOutputDir()
  buildFrames(sourcePath)
  summarize()
}

main()
