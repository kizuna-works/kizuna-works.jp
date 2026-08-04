// Finish a Gemini-generated blog banner: crop the safety border, resize to
// 1200x630, and composite the KIZUNA Works logo plate at the bottom right.
//
// Why the crop: Gemini stamps an unremovable sparkle watermark in the
// bottom-right corner at a FIXED pixel size, so we generate at 1600x1030 with a
// ~200px empty border on all four sides and cut that border off. Trimming the
// same amount from every side keeps the 1200x630 aspect ratio and re-centres the
// composition. See the "Gemini watermark crop rule" note.
//
// Why we do not let Gemini draw the logo: generated logos are never faithful.
// Instead we lift the real plate out of an already-published banner at runtime,
// so there is no separate asset file to keep in sync.
//
// Usage:
//   node scripts/finish-blog-banner.mjs <input> <slug> [--margin 200]
// Example:
//   node scripts/finish-blog-banner.mjs ~/Downloads/gemini.png kintone-record-list

import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require_ = createRequire(import.meta.url);
const sharp = require_('sharp');

const OUT_W = 1200;
const OUT_H = 630;
// Position and size of the logo plate inside a finished 1200x630 banner,
// measured from public/images/blog/kintone-tsuuchi-settei.png.
const PLATE = { left: 949, top: 526, width: 225, height: 83 };
const PLATE_SOURCE = 'public/images/blog/kintone-tsuuchi-settei.png';

const [input, slug] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const marginArg = process.argv.find((a) => a.startsWith('--margin'));
const margin = marginArg ? Number(marginArg.split('=')[1] ?? process.argv[process.argv.indexOf(marginArg) + 1]) : 200;

if (!input || !slug) {
  console.error('使い方: node scripts/finish-blog-banner.mjs <生成画像のパス> <スラッグ> [--margin 200]');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error(`入力が見つかりません: ${input}`);
  process.exit(1);
}

const meta = await sharp(input).metadata();
console.log(`入力: ${path.basename(input)}  ${meta.width}x${meta.height}`);

if (meta.width - margin * 2 <= 0 || meta.height - margin * 2 <= 0) {
  console.error(`margin ${margin}px が大きすぎます（入力 ${meta.width}x${meta.height}）`);
  process.exit(1);
}

const cropped = {
  left: margin,
  top: margin,
  width: meta.width - margin * 2,
  height: meta.height - margin * 2,
};
console.log(`四辺 ${margin}px をトリミング → ${cropped.width}x${cropped.height}`);
if (cropped.width !== OUT_W || cropped.height !== OUT_H) {
  console.log(`  ※ ${OUT_W}x${OUT_H} と一致しないためリサイズします（生成は ${OUT_W + margin * 2}x${OUT_H + margin * 2} が理想）`);
}

const plate = await sharp(PLATE_SOURCE).extract(PLATE).png().toBuffer();

const outPath = `public/images/blog/${slug}.png`;
await sharp(input)
  .extract(cropped)
  .resize(OUT_W, OUT_H, { fit: 'fill' })
  .composite([{ input: plate, left: PLATE.left, top: PLATE.top }])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

const out = await sharp(outPath).metadata();
const kb = Math.round(fs.statSync(outPath).size / 1024);
console.log(`生成: ${outPath}  ${out.width}x${out.height}  ${kb}KB`);
console.log('次の手順: node scripts/gen-image-derivatives.mjs で .webp を作り、npm run build で反映');
