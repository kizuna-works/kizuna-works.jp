// Keeps public/llms.txt in sync with the product data (src/data/*.ts).
//
// llms.txt is the AI-search-facing summary of the site (ChatGPT / Perplexity /
// AI Overviews read it first), so a stale product count there is answered back
// to users verbatim. It went unnoticed at "全 24 種類" while the site had 43
// plugins, which is what this script prevents.
//
// Two jobs:
//   1. Rewrite the product counts in llms.txt from plugins.ts (the numbers are
//      derived, never hand-typed).
//   2. Fail the build when a plugin / extension / tool exists in the data but is
//      not linked from llms.txt (or vice versa) — a count alone is not enough,
//      the entry itself has to be there.
//
// Run automatically on `npm run build` (prebuild) or manually: `npm run sync:llms`.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const LLMS_PATH = join(root, 'public/llms.txt');

const read = (rel) => readFileSync(join(root, rel), 'utf8');
const matchAll = (src, re) => [...src.matchAll(re)].map((m) => m[1]);

// --- counts and slugs from plugins.ts (regex, no TS import needed) ---
const pluginsTs = read('src/data/plugins.ts');
const premiumStart = pluginsTs.indexOf('export const premiumPlugins');
if (premiumStart === -1) {
  throw new Error('plugins.ts: `export const premiumPlugins` not found — update this script.');
}
const slugRe = /^\s+slug:\s*'([^']+)'/gm;
const chokottoSlugs = matchAll(pluginsTs.slice(0, premiumStart), slugRe);
const premiumSlugs = matchAll(pluginsTs.slice(premiumStart), slugRe);
const pluginSlugs = [...chokottoSlugs, ...premiumSlugs];

const counts = {
  chokotto: chokottoSlugs.length,
  premium: premiumSlugs.length,
  total: pluginSlugs.length,
};
if (counts.total === 0) {
  throw new Error('plugins.ts: no slugs parsed — the entry shape probably changed.');
}

// --- rewrite the counts in llms.txt ---
const before = read('public/llms.txt');
const after = before
  // 「ちょこっとプラグイン 35 製品」/「ちょこっとプラグイン」シリーズ 35 製品」
  .replace(/(ちょこっとプラグイン(?:」シリーズ|シリーズ)?\s*)\d+(\s*製品)/g, `$1${counts.chokotto}$2`)
  // 「プレミアムプラグイン 8 製品」
  .replace(/(プレミアムプラグイン\s*)\d+(\s*製品)/g, `$1${counts.premium}$2`)
  // 「プラグイン全 43 製品」— run last so the two above cannot be clobbered
  .replace(/(プラグイン全\s*)\d+(\s*製品)/g, `$1${counts.total}$2`);

if (after !== before) {
  writeFileSync(LLMS_PATH, after);
}

// --- completeness: every product must be linked from llms.txt ---
const linked = {
  // /plugins/ranking/ etc. are section links, not products — filtered by the data check below.
  plugins: new Set(matchAll(after, /kizuna-works\.jp\/plugins\/([a-z0-9-]+)\//g)),
  extensions: new Set(matchAll(after, /kizuna-works\.jp\/extensions\/([a-z0-9-]+)\//g)),
  tools: new Set(matchAll(after, /kizuna-works\.jp\/tools\/([A-Za-z0-9._-]+\.html)/g)),
};

const extensionSlugs = matchAll(read('src/data/extensions.ts'), /^\s+slug:\s*'([^']+)'/gm);
const toolFiles = matchAll(read('src/data/tools.ts'), /^\s+file:\s*'([^']+)'/gm);

const missing = [
  ...pluginSlugs.filter((s) => !linked.plugins.has(s)).map((s) => `/plugins/${s}/`),
  ...extensionSlugs.filter((s) => !linked.extensions.has(s)).map((s) => `/extensions/${s}/`),
  ...toolFiles.filter((f) => !linked.tools.has(f)).map((f) => `/tools/${f}`),
];

// Links to products that no longer exist in the data (renamed or removed slugs).
const knownPluginPages = new Set([...pluginSlugs, 'ranking', 'supporter', 'premium-trial']);
const stale = [...linked.plugins].filter((s) => !knownPluginPages.has(s)).map((s) => `/plugins/${s}/`);

if (missing.length || stale.length) {
  const lines = ['public/llms.txt is out of sync with src/data/*.ts:'];
  if (missing.length) lines.push(`  missing entries: ${missing.join(', ')}`);
  if (stale.length) lines.push(`  entries for unknown products: ${stale.join(', ')}`);
  lines.push('  Add or remove the entry in public/llms.txt, then rebuild.');
  console.error(lines.join('\n'));
  process.exit(1);
}

console.log(
  `llms.txt: ${counts.total} plugins (${counts.chokotto} chokotto / ${counts.premium} premium), ` +
    `${extensionSlugs.length} extensions, ${toolFiles.length} tools — ` +
    (after === before ? 'counts already up to date' : 'counts updated')
);
