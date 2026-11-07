// Removes old plugin ZIPs from dist/downloads after the build (public/downloads is left untouched).
//
// Why (2026-11-07): the Pages artifact had grown to ~440MB and actions/deploy-pages hit its
// 10-minute cap (the maximum it allows), so two deploys in a row failed. Old version ZIPs
// were ~101MB of 556 files that no page links to.
//
// Kept in dist:
//   - the newest KEEP versions of each kw-* id (by semver, same rule as gen-versions.mjs).
//     Two, not one: KIZUNA Bridge's updater fetches /downloads/<id>-v<latest>.zip using a
//     versions.json it may have cached for up to 6 hours, so the previous latest must stay
//     reachable for a while after a release.
//   - any ZIP whose path or file name appears in a built text file (HTML/JS/JSON/XML/TXT).
//   - anything that does not match kw-<id>-vX.Y.Z.zip.
// public/downloads stays the source of truth for "is this version published"
// (gen-versions, check-plugin-release, check-multilingual-badge read it, not dist).
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEEP = 2;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const dl = join(dist, 'downloads');

function cmpVersion(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

let files;
try {
  files = readdirSync(dl);
} catch {
  console.log('[prune-old-downloads] dist/downloads not found — skipped');
  process.exit(0);
}

const byId = new Map();
for (const file of files) {
  const m = file.match(/^(kw-.+)-v(\d+\.\d+\.\d+)\.zip$/);
  if (!m) continue;
  if (!byId.has(m[1])) byId.set(m[1], []);
  byId.get(m[1]).push({ file, version: m[2] });
}

// Collect text from built files so a ZIP linked from any page is never removed.
let corpus = '';
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (p !== dl) walk(p); continue; }
    if (/\.(html|js|mjs|json|xml|txt|webmanifest)$/i.test(e.name)) corpus += readFileSync(p, 'utf8');
  }
})(dist);

let removed = 0;
let bytes = 0;
for (const list of byId.values()) {
  list.sort((a, b) => cmpVersion(b.version, a.version));
  for (const { file } of list.slice(KEEP)) {
    if (corpus.includes(file)) continue;
    const p = join(dl, file);
    bytes += statSync(p).size;
    unlinkSync(p);
    removed++;
  }
}
console.log(`[prune-old-downloads] removed ${removed} old ZIPs from dist (${(bytes / 1048576).toFixed(0)}MB); kept newest ${KEEP} per plugin and every linked ZIP`);
