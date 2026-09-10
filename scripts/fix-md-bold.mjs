// 日本語 Markdown で **強調** が閉じられず ** が本文に出てしまう箇所を直す。
//
// CommonMark では、閉じ側の ** は「右フランキング」でないと閉じ記号にならない。
//   ・直前が空白 → 不可
//   ・直前が句読点（）」。、など）で、直後が「空白でも句読点でもない」→ 不可
// 日本語は **「〜」**が… のように閉じ括弧の直後で閉じたくなるので、ここに落ちる。
//
// 直し方は **…** を <strong>…</strong> に置き換える。強調する範囲を 1 文字も
// 変えずに済み、意味を書き換えずに表示だけ直せるため。
//
// 使い方: node scripts/fix-md-bold.mjs [--write] [対象ディレクトリ...]
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const write = args.includes('--write');
const dirs = args.filter((a) => a !== '--write');
const targets = dirs.length ? dirs : ['src/content'];

// 句読点とみなす文字（ASCII の記号＋日本語でよく使う約物）
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
  // endIdx = 閉じ ** の開始位置
  const before = line[endIdx - 1];
  const after = line[endIdx + 2];
  if (before === undefined || SPACE.test(before)) return false;
  if (!PUNCT.test(before)) return true;
  // 直前が句読点のときは、直後が空白か句読点なら閉じられる
  if (after === undefined) return true;
  return SPACE.test(after) || PUNCT.test(after);
}

function fixLine(line) {
  if (line.indexOf('**') === -1) return { line, n: 0 };
  // 位置を集める（*** は触らない）
  const pos = [];
  for (let i = 0; i + 1 < line.length; i++) {
    if (line[i] === '*' && line[i + 1] === '*') {
      if (line[i + 2] === '*' || line[i - 1] === '*') { i++; continue; }
      pos.push(i);
      i++;
    }
  }
  if (pos.length < 2) return { line, n: 0 };

  // 素直に前から対にする（開き→閉じ）
  const pairs = [];
  for (let i = 0; i + 1 < pos.length; i += 2) pairs.push([pos[i], pos[i + 1]]);

  // 閉じられない対だけ <strong> に置き換える（後ろから置換して位置をずらさない）
  const broken = pairs.filter(([s2, e]) => !openingWorks(line, s2) || !closingWorks(line, e));
  if (broken.length === 0) return { line, n: 0 };

  let out = line;
  for (let i = broken.length - 1; i >= 0; i--) {
    const [s, e] = broken[i];
    const inner = out.slice(s + 2, e);
    out = out.slice(0, s) + '<strong>' + inner + '</strong>' + out.slice(e + 2);
  }
  return { line: out, n: broken.length };
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e.name)) out.push(p);
  }
  return out;
}

let files = 0;
let total = 0;
for (const t of targets) {
  for (const f of walk(t)) {
    const src = fs.readFileSync(f, 'utf8');
    const lines = src.split('\n');
    let n = 0;
    let inFence = false;
    for (let i = 0; i < lines.length; i++) {
      if (/^\s*(```|~~~)/.test(lines[i])) { inFence = !inFence; continue; }
      if (inFence) continue;              // コードブロックの中は触らない
      const r = fixLine(lines[i]);
      if (r.n) { lines[i] = r.line; n += r.n; }
    }
    if (n) {
      files++;
      total += n;
      console.log((write ? '修正 ' : '検出 ') + f.split(path.sep).join('/') + ' — ' + n + ' 箇所');
      if (write) fs.writeFileSync(f, lines.join('\n'), 'utf8');
    }
  }
}
console.log((write ? '書き換え' : '検出') + ': ' + files + ' ファイル / ' + total + ' 箇所');
