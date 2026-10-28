// Stops the build when a product page puts a multi-column list inside its UPDATE box.
//
// Why
//   On 2026-10-28 the KIZUNA Pro pages (file-pro / search-pro / lookup-pro) showed their
//   update items in the two-column feature list (.kbp-list). Items of different length
//   left a large blank area beside the long one, and the items did not read as separate
//   entries. Update items are read top to bottom, so they use the one-column .update-list.
//
// How
//   For each src/pages/**/*.astro, collect the class names whose CSS in the same file
//   lays children out in two or more columns (grid-template-columns: repeat(N, ...) with
//   N >= 2, or two explicit tracks, or `columns: N`). Then look inside every
//   class="update-box" block for a <ul>/<ol> that uses one of those classes.
//
// Usage
//   node scripts/check-update-box.mjs        # exit 1 on a violation (used by prebuild)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/pages');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

function multiColumnClasses(src) {
  const set = new Set();
  const css = (src.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('\n');
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const body = m[2];
    const g = /grid-template-columns\s*:\s*([^;]+)/.exec(body);
    let multi = false;
    if (g) {
      const v = g[1].trim();
      const rep = /repeat\(\s*(\d+)/.exec(v);
      if (rep) multi = Number(rep[1]) >= 2 || /auto-(fill|fit)/.test(v);
      else if (/auto-(fill|fit)/.test(v)) multi = true;
      else multi = v.replace(/\([^)]*\)/g, 'x').split(/\s+/).filter(Boolean).length >= 2;
    }
    if (/(^|[;\s])columns\s*:\s*[2-9]/.test(body) || /column-count\s*:\s*[2-9]/.test(body)) multi = true;
    if (!multi) continue;
    // Selectors inside @media blocks that reset to one column are not collected here,
    // because only rules that set multiple columns are considered.
    for (const sel of m[1].split(',')) {
      const last = sel.trim().split(/\s+/).pop() || '';
      const c = /^\.([\w-]+)$/.exec(last);
      if (c) set.add(c[1]);
    }
  }
  return set;
}

function updateBlocks(src) {
  const blocks = [];
  const re = /<div class="update-box[^"]*">/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    // Walk div nesting to find the matching close tag.
    let depth = 0, i = m.index;
    const tag = /<\/?div\b[^>]*>/g;
    tag.lastIndex = i;
    let t;
    while ((t = tag.exec(src)) !== null) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (depth === 0) { blocks.push({ start: m.index, text: src.slice(m.index, tag.lastIndex) }); break; }
    }
  }
  return blocks;
}

const problems = [];
for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes('update-box')) continue;
  const multi = multiColumnClasses(src);
  if (!multi.size) continue;
  for (const b of updateBlocks(src)) {
    // Lists only: a screenshot grid (div) side by side is fine.
    const re = /<(ul|ol)\s+class="([^"]+)"/g;
    let m;
    while ((m = re.exec(b.text)) !== null) {
      const hit = m[2].split(/\s+/).find((c) => multi.has(c));
      if (!hit) continue;
      const line = src.slice(0, b.start + m.index).split('\n').length;
      problems.push(`${path.relative(process.cwd(), file)}:${line}  .${hit}`);
    }
  }
}

if (problems.length) {
  console.error('[check-update-box] NG: アップデート情報（.update-box）の中に、複数列のリストがあります。');
  console.error('  長さの違う項目が横に並んで余白ができ、項目の区切りも見えなくなります（2026-10-28）。');
  console.error('  1 列の .update-list（項目ごとに罫線・見出しを独立行）を使ってください。見本: src/pages/plugins/file-pro/index.astro');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log('[check-update-box] OK — アップデート情報に複数列のリストはありません');
