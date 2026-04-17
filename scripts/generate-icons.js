import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'icons')

const buildSVG = (size) => {
  const pad = Math.round(size * 0.12)
  const rectSize = size - pad * 2
  const rx = Math.round(size * 0.18)
  const fontSize = Math.round(size * 0.38)

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#09090f"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c6fff"/>
      <stop offset="100%" stop-color="#ff6b9d"/>
    </linearGradient>
  </defs>
  <rect x="${pad}" y="${pad}" width="${rectSize}" height="${rectSize}" rx="${rx}" ry="${rx}" fill="url(#g)"/>
  <text
    x="${size / 2}" y="${size / 2}"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900"
    font-size="${fontSize}"
    fill="white"
    letter-spacing="-${Math.round(size * 0.015)}"
  >BF</text>
</svg>`
}

async function generate() {
  await mkdir(outDir, { recursive: true })
  for (const size of [192, 512]) {
    const svg = Buffer.from(buildSVG(size))
    await sharp(svg).png().toFile(join(outDir, `icon-${size}.png`))
    console.log(`✓ icon-${size}.png`)
  }
  console.log('Icons generated in public/icons/')
}

generate().catch((err) => { console.error(err); process.exit(1) })
