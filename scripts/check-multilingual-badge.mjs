// Stops the build when the "多言語対応" badge disagrees with what the distributed plugin ships.
//
// Why
//   The badge on /plugins/ cards and product page heroes is driven by `multilingual: true`
//   in src/data/plugins.ts. That flag is set by hand, so a release that adds ja/en/zh
//   screens can ship without the badge (or a page can keep the badge after it is gone).
//
// How
//   For each plugin id, open the highest-version public/downloads/kw-<id>-vX.Y.Z.zip,
//   read the inner contents.zip file list, and treat the product as multilingual when it
//   ships its own message files (`js/<prefix>-i18n.desktop|mobile|config.js`). The shared
//   KIZUNA Pro sidebar file `js/i18n.js` alone does not count. Then compare with the flag.
//   Product pages must also render <MultilingualBadge>, otherwise the hero shows nothing.
//
// Usage
//   node scripts/check-multilingual-badge.mjs   # exit 1 on a mismatch (used by prebuild)

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const DOWNLOADS = 'public/downloads';
const PAGES = 'src/pages/plugins';
const I18N_FILE = /(^|\/)[a-z0-9]+-i18n\.(desktop|mobile|config)\.js$/;

// Minimal zip reader: list entry names, or return one entry's bytes.
function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = [];
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad central directory');
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    entries.push({ name, method, size, local });
    p += 46 + nameLen + extraLen + commentLen;
  }
  const data = (e) => {
    const start = e.local + 30 + buf.readUInt16LE(e.local + 26) + buf.readUInt16LE(e.local + 28);
    const raw = buf.subarray(start, start + e.size);
    return e.method === 0 ? raw : zlib.inflateRawSync(raw);
  };
  return { names: entries.map((e) => e.name), data: (name) => data(entries.find((e) => e.name === name)) };
}

const cmp = (a, b) => {
  const x = a.split('.').map(Number);
  const y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

const latest = {};
for (const file of fs.readdirSync(DOWNLOADS)) {
  const m = file.match(/^(kw-.+)-v(\d+\.\d+\.\d+)\.zip$/);
  if (m && (!latest[m[1]] || cmp(m[2], latest[m[1]]) > 0)) latest[m[1]] = m[2];
}

// One block per plugin entry in plugins.ts: id, slug, multilingual flag.
const source = fs.readFileSync('src/data/plugins.ts', 'utf8');
const products = [];
for (const m of source.matchAll(/^\s+id: '(kw-[^']+)',/gm)) {
  const end = source.indexOf('\n  },', m.index);
  const block = source.slice(m.index, end === -1 ? source.length : end);
  const slug = block.match(/slug: '([^']+)'/)?.[1];
  if (slug) products.push({ id: m[1], slug, flagged: /\n\s+multilingual: true,/.test(block) });
}

const errors = [];
for (const { id, slug, flagged } of products) {
  const version = latest[id];
  if (!version) continue;
  let ships = false;
  try {
    const outer = readZip(fs.readFileSync(path.join(DOWNLOADS, `${id}-v${version}.zip`)));
    const inner = outer.names.includes('contents.zip') ? readZip(outer.data('contents.zip')) : outer;
    ships = inner.names.some((n) => I18N_FILE.test(n));
  } catch (e) {
    errors.push(`${id} v${version}: zip を読めません (${e.message})`);
    continue;
  }
  if (ships && !flagged) {
    errors.push(`${id} v${version} は多言語対応の版を配布中ですが、plugins.ts に multilingual: true がありません`);
  }
  if (!ships && flagged) {
    errors.push(`${id} v${version} は多言語のファイルを含みませんが、plugins.ts に multilingual: true があります`);
  }
  const page = path.join(PAGES, slug, 'index.astro');
  if (flagged && fs.existsSync(page) && !fs.readFileSync(page, 'utf8').includes('<MultilingualBadge')) {
    errors.push(`${page} に <MultilingualBadge pluginId="${id}" /> がありません（製品ページにバッジが出ません）`);
  }
}

if (errors.length) {
  console.error('[check-multilingual-badge] NG:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`[check-multilingual-badge] OK: ${products.filter((p) => p.flagged).length} 製品に多言語対応バッジ`);
