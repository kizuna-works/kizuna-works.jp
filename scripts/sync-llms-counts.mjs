// Keeps public/llms.txt in sync with the product data (src/data/*.ts).
//
// llms.txt is the AI-search-facing summary of the site (ChatGPT / Perplexity /
// AI Overviews read it first), so a stale product count there is answered back
// to users verbatim. It went unnoticed at "全 24 種類" while the site had 43
// plugins, which is what this script prevents.
//
// Three jobs:
//   1. Rewrite the product counts in llms.txt from plugins.ts (the numbers are
//      derived, never hand-typed).
//   2. Fail the build when a plugin / extension / tool exists in the data but is
//      not linked from llms.txt (or vice versa) — a count alone is not enough,
//      the entry itself has to be there.
//   3. Fail the build when a plugin is listed under the wrong section heading.
//      Being present is not enough: a free (ちょこっと) plugin sitting under
//      「## プレミアムプラグイン」tells an AI reader it is paid-only. Four of them
//      had drifted there unnoticed (found 2026-08-11) because new entries get
//      appended to the end of the file rather than into their section.
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
const knownPluginPages = new Set([
  ...pluginSlugs,
  'ranking',
  'supporter',
  'premium-trial',
  'update',
  'problems',
]);
const stale = [...linked.plugins].filter((s) => !knownPluginPages.has(s)).map((s) => `/plugins/${s}/`);

if (missing.length || stale.length) {
  const lines = ['public/llms.txt is out of sync with src/data/*.ts:'];
  if (missing.length) lines.push(`  missing entries: ${missing.join(', ')}`);
  if (stale.length) lines.push(`  entries for unknown products: ${stale.join(', ')}`);
  lines.push('  Add or remove the entry in public/llms.txt, then rebuild.');
  console.error(lines.join('\n'));
  process.exit(1);
}

// --- section membership: a free plugin must not sit under the premium heading ---
// Only the product entry lines inside the two plugin sections are checked. Links
// from elsewhere (the category index at the top, prose) are legitimate and ignored.
const sections = [];
after.split('\n').forEach((line, i) => {
  const h = /^##\s+(.*\S)\s*$/.exec(line);
  if (h) sections.push({ title: h[1], start: i });
});
sections.forEach((s, i) => {
  s.end = i + 1 < sections.length ? sections[i + 1].start : Infinity;
});

const findSection = (pred, label) => {
  const hit = sections.find((s) => pred(s.title));
  if (!hit) {
    throw new Error(
      `public/llms.txt: the ${label} heading was not found — update this script if the headings were renamed.`
    );
  }
  return hit;
};
const chokottoSection = findSection((t) => t.includes('ちょこっと'), 'ちょこっと plugins');
const premiumSection = findSection((t) => /^プレミアムプラグイン$/.test(t), 'premium plugins');

const lines = after.split('\n');
const entryRe = /^-\s+\[[^\]]*\]\(https:\/\/kizuna-works\.jp\/plugins\/([a-z0-9-]+)\/\)/;
/** slug -> tiers it is listed under (a slug in both sections yields two) */
const listedIn = new Map();
[
  { section: chokottoSection, tier: 'chokotto' },
  { section: premiumSection, tier: 'premium' },
].forEach(({ section, tier }) => {
  for (let i = section.start + 1; i < Math.min(section.end, lines.length); i++) {
    const m = entryRe.exec(lines[i]);
    if (!m || !knownPluginPages.has(m[1])) continue;
    if (!listedIn.has(m[1])) listedIn.set(m[1], []);
    listedIn.get(m[1]).push(tier);
  }
});

const expectedTier = new Map([
  ...chokottoSlugs.map((s) => [s, 'chokotto']),
  ...premiumSlugs.map((s) => [s, 'premium']),
]);
const label = { chokotto: 'ちょこっと', premium: 'プレミアム' };

const misplaced = [];
const duplicated = [];
for (const [slug, tiers] of listedIn) {
  if (tiers.length > 1) {
    duplicated.push(`/plugins/${slug}/`);
    continue;
  }
  const want = expectedTier.get(slug);
  if (want && tiers[0] !== want) {
    misplaced.push(`/plugins/${slug}/ (${label[want]} but listed under ${label[tiers[0]]})`);
  }
}
// A product with no entry in either section is already reported as `missing` above.

if (misplaced.length || duplicated.length) {
  const out = ['public/llms.txt: plugins are listed under the wrong heading:'];
  if (misplaced.length) out.push(`  misplaced: ${misplaced.join(', ')}`);
  if (duplicated.length) out.push(`  listed in both sections: ${duplicated.join(', ')}`);
  out.push('  Move the entry into its own section in public/llms.txt, then rebuild.');
  out.push('  (New entries are easy to append to the end of the file by mistake.)');
  console.error(out.join('\n'));
  process.exit(1);
}

console.log(
  `llms.txt: ${counts.total} plugins (${counts.chokotto} chokotto / ${counts.premium} premium), ` +
    `${extensionSlugs.length} extensions, ${toolFiles.length} tools — ` +
    (after === before ? 'counts already up to date' : 'counts updated') +
    `, sections OK`
);
