// Removes images that nothing refers to from dist/images after the build
// (public/images is left untouched).
//
// Why (2026-11-10): actions/deploy-pages waits at most 10 minutes and large artifacts
// sometimes hit that cap ("Timeout reached"). public/images also holds source material
// and screenshots of older versions that no page shows any more.
//
// An image is KEPT when any of these is true (deliberately conservative):
//   - its path (/images/...) appears in a built text file (HTML/CSS/JS/JSON/XML/TXT/MD)
//   - its stem (path without .png/.webp/-800.webp) appears there — siblings of a used
//     image (the WebP of a used PNG, and vice versa) stay together
//   - its file name stem appears anywhere in the built text — catches paths that are
//     assembled at runtime, e.g. '/images/dashboard/recipes/' + id + '.png'
//   - it is on EXTERNAL_KEEP: referenced from outside the site (kintone plugins, mail)
// Set DIST to prune a build written somewhere else (default: ./dist).
import { readdirSync, readFileSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = process.env.DIST || join(root, 'dist');
const imagesDir = join(dist, 'images');

// Loaded by the kintone plugins (ad banner, config sidebar) and by mails, not by pages.
const EXTERNAL_KEEP = [/^\/images\/logo/, /^\/images\/ogp/, /^\/images\/ads\//, /favicon/i];

if (!existsSync(imagesDir)) {
  console.log('[prune-unused-images] dist/images not found — skipped');
  process.exit(0);
}

const images = [];
const texts = [];
let htmlCount = 0;
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (p.startsWith(imagesDir + sep)) { images.push(p); continue; }
    if (/\.(html|css|js|mjs|json|xml|txt|md|webmanifest)$/i.test(e.name)) {
      texts.push(p);
      if (e.name.endsWith('.html')) htmlCount++;
    }
  }
})(dist);

// A partial build must never delete images that a missing page would have used.
if (htmlCount < 300) {
  console.log(`[prune-unused-images] only ${htmlCount} HTML files in dist — looks partial, skipped`);
  process.exit(0);
}

let corpus = '';
for (const t of texts) corpus += readFileSync(t, 'utf8') + '\n';

let removed = 0;
let bytes = 0;
for (const p of images) {
  const rel = '/' + relative(dist, p).split(sep).join('/');
  if (EXTERNAL_KEEP.some((re) => re.test(rel))) continue;
  const stem = rel.replace(/(-800)?\.(png|webp|jpe?g|gif|svg|avif)$/i, '');
  if (corpus.includes(rel) || corpus.includes(stem)) continue;
  if (corpus.includes(basename(stem))) continue;
  bytes += statSync(p).size;
  unlinkSync(p);
  removed++;
}
console.log(`[prune-unused-images] removed ${removed} unreferenced images from dist (${(bytes / 1048576).toFixed(1)}MB) of ${images.length}`);
