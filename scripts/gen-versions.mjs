// Generates public/versions.json from the distributed plugin ZIPs.
//
// Single source of truth = public/downloads/kw-<id>-vX.Y.Z.zip (added every release).
// For each plugin id we take the highest version present, and map id -> page slug
// via src/data/plugins.ts so the sidebar can link to the product page.
//
// The common plugin sidebar fetches this file (via kintone.proxy) to tell users
// when a newer version of the installed plugin is available.
//
// Run automatically on `npm run build` (prebuild) or manually: `npm run gen:versions`.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://kizuna-works.jp';

// --- id -> slug map from plugins.ts (regex, no TS import needed) ---
const pluginsTs = readFileSync(join(root, 'src/data/plugins.ts'), 'utf8');
const ids = [...pluginsTs.matchAll(/^\s+id:\s*'([^']+)'/gm)].map((m) => m[1]);
const slugs = [...pluginsTs.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map((m) => m[1]);
if (ids.length !== slugs.length) {
  throw new Error(`plugins.ts id/slug count mismatch: ${ids.length} ids vs ${slugs.length} slugs`);
}
const idToSlug = new Map(ids.map((id, i) => [id, slugs[i]]));

// --- scan distributed zips for the latest version per plugin id ---
function cmpVersion(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

const latest = {}; // id -> version
for (const file of readdirSync(join(root, 'public/downloads'))) {
  const m = file.match(/^(kw-.+)-v(\d+\.\d+\.\d+)\.zip$/);
  if (!m) continue;
  const [, id, version] = m;
  if (!latest[id] || cmpVersion(version, latest[id]) > 0) latest[id] = version;
}

// --- build versions.json ---
const out = {};
for (const [id, version] of Object.entries(latest).sort()) {
  const slug = idToSlug.get(id);
  if (!slug) {
    console.warn(`[gen-versions] no slug for ${id} (not in plugins.ts) — skipped`);
    continue;
  }
  out[id] = { version, url: `${SITE}/plugins/${slug}/` };
}

writeFileSync(join(root, 'public/versions.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`[gen-versions] wrote public/versions.json (${Object.keys(out).length} plugins)`);
