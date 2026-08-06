// Guards against shipping a plugin whose card / hero summaries describe an older
// feature set than the version actually published on its product page.
//
// How it works
//   - `summaryVersion` in src/data/plugins.ts records the version the summaries
//     (description / cardDescription / product page hero copy) were written for.
//   - `softwareVersion` in the product page JSON-LD is the published version.
//   - Only major.minor is compared: patch releases are bugfix-only by our versioning
//     rule, so they never require a summary rewrite. A minor/major bump does.
//
// Usage
//   node scripts/check-plugin-summaries.mjs           # warn only (used by prebuild)
//   node scripts/check-plugin-summaries.mjs --strict   # exit 1 on mismatch (release gate)

import fs from 'node:fs';
import path from 'node:path';

const DATA = 'src/data/plugins.ts';
const PAGES = 'src/pages/plugins';
const strict = process.argv.includes('--strict');

const source = fs.readFileSync(DATA, 'utf8');

// Split the data file into one block per plugin entry, keyed by slug.
const entries = [];
const slugRe = /slug: '([^']+)',/g;
let match;
while ((match = slugRe.exec(source)) !== null) {
  const start = match.index;
  const end = source.indexOf('\n  },', start);
  entries.push({
    slug: match[1],
    block: source.slice(start, end === -1 ? source.length : end),
  });
}

const readPageVersion = (slug) => {
  const file = path.join(PAGES, slug, 'index.astro');
  if (!fs.existsSync(file)) return null;
  const found = fs.readFileSync(file, 'utf8').match(/"softwareVersion":\s*"([^"]+)"/);
  return found ? found[1] : null;
};

const minor = (version) => version.split('.').slice(0, 2).join('.');

const problems = [];
for (const { slug, block } of entries) {
  const pageVersion = readPageVersion(slug);
  const summaryVersion = (block.match(/summaryVersion: '([^']+)'/) || [])[1];

  if (!pageVersion) {
    problems.push({ slug, kind: 'no-page-version', detail: `${PAGES}/${slug}/index.astro に softwareVersion がありません` });
    continue;
  }
  if (!summaryVersion) {
    problems.push({ slug, kind: 'no-summary-version', detail: `summaryVersion 未設定（公開版 v${pageVersion}）` });
    continue;
  }
  if (minor(summaryVersion) !== minor(pageVersion)) {
    problems.push({
      slug,
      kind: 'stale',
      detail: `公開版 v${pageVersion} / 要約は v${summaryVersion} 時点`,
    });
  }
}

if (problems.length === 0) {
  console.log(`[check-plugin-summaries] OK — ${entries.length} プラグインの要約が公開版に追いついています。`);
  process.exit(0);
}

const label = strict ? 'ERROR' : 'WARN';
console.log(`\n[check-plugin-summaries] ${label} — 要約の見直しが必要なプラグイン ${problems.length} 件\n`);
for (const p of problems) {
  console.log(`  ・${p.slug.padEnd(26)} ${p.detail}`);
}
console.log(`
  対応手順（機能追加のあった版では必須）:
    1) 製品ページの hero（リード文）に新機能を反映
    2) src/data/plugins.ts の description（一覧カード）を反映
    3) src/data/plugins.ts の cardDescription（ランキング・トップ等）を反映
    4) 製品ページの description / ogDescription / JSON-LD の description を揃える
    5) 反映後に summaryVersion を公開版と同じにする
  バグ修正だけの版なら summaryVersion を公開版に合わせるだけで解消します。
`);

process.exit(strict ? 1 : 0);
