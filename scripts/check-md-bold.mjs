// 日本語 Markdown で **強調** が閉じられず、アスタリスクが本文にそのまま出る事故を防ぐ。
//
// CommonMark は閉じ側の ** を「右フランキング」でないと閉じ記号として扱わない。
//   ・直前が空白 → 閉じられない
//   ・直前が句読点（） 」 。 、 など）で、直後が「空白でも句読点でもない」→ 閉じられない
// 日本語は **「〜」**が… のように閉じ括弧の直後で閉じたくなるため、ここに落ちやすい。
// 2026-09-10 に 38 ファイル・56 箇所が本文に ** を出したまま公開されていた。
//
// 直すときは範囲を変えずに済む <strong>…</strong> へ置き換える（scripts/fix-md-bold.mjs）。
//
// 使い方:
//   node scripts/check-md-bold.mjs            … src/content を検査（prebuild で実行）
//   node scripts/check-md-bold.mjs --dist     … ビルド結果の HTML に ** が残っていないか
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const useDist = args.includes('--dist');

const PUNCT = /[!-/:-@[-`{-~、。〈-】〔-〟！-／：-＠［-｀｛-･・]/;
const SPACE = /\s/;

function openingWorks(line, startIdx) {
  const before = line[startIdx - 1];
  const after = line[startIdx + 2];
  if (after === undefined || SPACE.test(after)) return false;
  if (!PUNCT.test(after)) return true;
  if (before === undefined) return true;
  return SPACE.test(before) || PUNCT.test(before);
}

function closingWorks(line, endIdx) {
  const before = line[endIdx - 1];
  const after = line[endIdx + 2];
  if (before === undefined || SPACE.test(before)) return false;
  if (!PUNCT.test(before)) return true;
  if (after === undefined) return true;
  return SPACE.test(after) || PUNCT.test(after);
}

function brokenInLine(line) {
  if (line.indexOf('**') === -1) return [];
  const pos = [];
  for (let i = 0; i + 1 < line.length; i++) {
    if (line[i] === '*' && line[i + 1] === '*') {
      if (line[i + 2] === '*' || line[i - 1] === '*') { i++; continue; }
      pos.push(i);
      i++;
    }
  }
  const out = [];
  for (let i = 0; i + 1 < pos.length; i += 2) {
    if (!openingWorks(line, pos[i]) || !closingWorks(line, pos[i + 1])) out.push(line.slice(pos[i], pos[i + 1] + 2));
  }
  return out;
}

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.test(e.name)) out.push(p);
  }
  return out;
}

const hits = [];

if (useDist) {
  for (const f of walk('dist', /\.html$/)) {
    const html = fs.readFileSync(f, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ');
    const m = html.replace(/<[^>]*>/g, ' ').match(/\*\*[^*\n]{1,80}\*\*/g);
    if (m) hits.push({ file: f.split(path.sep).join('/'), items: [...new Set(m)] });
  }
} else {
  for (const f of walk('src/content', /\.mdx?$/)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    const items = [];
    let inFence = false;
    lines.forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return; }
      if (inFence) return;
      brokenInLine(line).forEach((b) => items.push((i + 1) + '行目: ' + b));
    });
    if (items.length) hits.push({ file: f.split(path.sep).join('/'), items });
  }
}

if (hits.length === 0) {
  console.log('[check-md-bold] OK — 閉じられない ** はありません');
  process.exit(0);
}

const total = hits.reduce((n, h) => n + h.items.length, 0);
console.error('[check-md-bold] ' + total + ' 箇所の ** が強調にならず、そのまま表示されます');
for (const h of hits) {
  console.error('  ' + h.file);
  for (const it of h.items) console.error('    ' + it.replace(/\s+/g, ' ').slice(0, 110));
}
console.error('  直し方: node scripts/fix-md-bold.mjs --write（<strong> に置き換えます）');
process.exit(1);
