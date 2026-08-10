/**
 * Generate every favicon asset from the master logo in src/assets/.
 *
 * Google picks the search-result icon by crawling the site's favicon, and it
 * only accepts a square icon whose size is a multiple of 48px. It also falls
 * back to /favicon.ico at the site root, so that file must carry the brand mark
 * too — an Astro-template leftover there is what used to show up in search.
 *
 * Usage: node scripts/gen-favicon.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = 'src/assets/KIZUNA-Worksロゴデータlogo.png';

// The master art is a wide mark centred on a square white canvas with a lot of
// empty space. Crop to the ink, then re-pad so the mark fills a fixed share of
// the icon — otherwise it shrinks to nothing at 16px.
const INK = { left: 173, top: 531, width: 1703, height: 990 };
const MARK_WIDTH_RATIO = 0.88; // mark width relative to the icon edge
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

async function buildSquare(size) {
  const markW = Math.round(size * MARK_WIDTH_RATIO);
  const markH = Math.round((markW * INK.height) / INK.width);
  const mark = await sharp(SRC)
    .extract(INK)
    .resize(markW, markH, { fit: 'fill' })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: mark,
        left: Math.round((size - markW) / 2),
        top: Math.round((size - markH) / 2),
      },
    ])
    .png()
    .toBuffer();
}

/** Pack PNG buffers into a multi-size .ico (PNG-embedded, supported everywhere). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, data } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    dir.push(e);
  }
  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)]);
}

const outputs = [
  // Multiple of 48 — Google's requirement for the search-result favicon.
  { path: 'public/images/favicon.png', size: 192 },
  // iOS home screen / share sheet.
  { path: 'public/images/apple-touch-icon.png', size: 180 },
];

for (const { path, size } of outputs) {
  writeFileSync(path, await buildSquare(size));
  console.log(`${path} (${size}x${size})`);
}

const icoSizes = [16, 32, 48];
const icoEntries = [];
for (const size of icoSizes) icoEntries.push({ size, data: await buildSquare(size) });
writeFileSync('public/favicon.ico', buildIco(icoEntries));
console.log(`public/favicon.ico (${icoSizes.join(', ')})`);
