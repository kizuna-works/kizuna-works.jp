// Generates public/catalog.json — the product catalogue consumed by the
// "KW Plugin Updater for kintone" browser extension.
//
// The extension already fetches versions.json to tell users which of their
// installed plugins are out of date. This file powers its other two tabs:
//   - おすすめ: plugins the environment does NOT have, ranked by how well their
//     categories overlap with what is installed.
//   - 新着: plugins the environment does NOT have, released recently.
//
// Source of truth is src/data/plugins.ts, so nothing has to be maintained twice.
// Run automatically on `npm run build` (prebuild) or manually: `npm run gen:catalog`.

import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://kizuna-works.jp';

const { allPlugins } = await import('../src/data/plugins.ts');

// Install-count ranking snapshot (ordered array; position = rank). Used by the
// extension to break ties when several plugins match the environment equally
// well. Note its `pluginId` field is our internal id, not the 32-char kintone one.
const { default: installRanking } = await import('../src/data/install-ranking.json', {
  with: { type: 'json' },
});
const rankById = new Map(installRanking.ranking.map((r, i) => [r.pluginId, i + 1]));

// Most icons are named after the slug, but a few slugs carry the `kw-` prefix
// while their image does not. Fall back before giving up so a rename does not
// silently ship a card with no icon.
function resolveIcon(slug) {
  for (const base of [slug, slug.replace(/^kw-/, '')]) {
    if (existsSync(join(root, 'public/images', `${base}-icon.png`))) {
      return `${SITE}/images/${base}-icon.png`;
    }
  }
  console.warn(`[gen-catalog] no icon for ${slug} — card will render without one`);
  return null;
}

const entries = allPlugins
  .filter((p) => p.status === 'available')
  .map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    url: `${SITE}/plugins/${p.slug}/`,
    icon: resolveIcon(p.slug),
    categories: p.categories,
    tier: p.tier === 'premium' ? 'premium' : 'standard',
    releaseDate: p.releaseDate ?? null,
    rank: rankById.get(p.id) ?? null,
    summary: p.cardDescription,
  }))
  .sort((a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''));

const missingDate = entries.filter((e) => !e.releaseDate);
if (missingDate.length) {
  console.warn(
    `[gen-catalog] releaseDate missing for ${missingDate.length} plugin(s) — ` +
      'they can never appear in the 新着 tab: ' + missingDate.map((e) => e.id).join(', '),
  );
}

writeFileSync(
  join(root, 'public/catalog.json'),
  JSON.stringify({ plugins: entries }, null, 2) + '\n',
);
console.log(`[gen-catalog] wrote public/catalog.json (${entries.length} plugins)`);
