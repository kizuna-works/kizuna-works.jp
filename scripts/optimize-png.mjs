#!/usr/bin/env node
/**
 * public/images の PNG を「画質を変えずに」圧縮し直す（ロスレス）。
 *
 * なぜ（2026-11-10）：公開物（約440MB）の6割が PNG（263MB）で、actions/deploy-pages の
 * 完了待ち（上限10分）が打ち切られてデプロイが失敗することがあった。WebP がある PNG も、
 * WebP 非対応のブラウザ向けと og:image 用に残すので消せない。そこで中身だけ小さくする。
 *
 * 安全のための決まり：
 *   - 書き換えるのは、再圧縮後の画素が元と 1 画素も違わないことを確かめたものだけ。
 *   - 3% 以上小さくならないものは書き換えない（何度流しても同じ結果になる）。
 *   - 16bit の PNG・ICC プロファイル付きの PNG は対象外（色の扱いが変わり得るため）。
 *
 * 使い方:
 *   node scripts/optimize-png.mjs                 public/images の全 PNG
 *   node scripts/optimize-png.mjs <path> ...      指定したファイルだけ
 *   node scripts/optimize-png.mjs --dry-run       書き換えずに削減量だけ表示
 * gen-image-derivatives.mjs も、新しく WebP を作った PNG にはこれを使う。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MIN_GAIN = 0.03;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.png$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function rawOf(buf) {
  return sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

/** 1 ファイルを再圧縮する。戻り値 { status, before, after } */
export async function optimizePng(file, { dryRun = false } = {}) {
  const before = fs.readFileSync(file);
  const meta = await sharp(before).metadata();
  if (meta.depth !== 'uchar') return { status: 'skip-depth', before: before.length, after: before.length };
  if (meta.hasProfile) return { status: 'skip-icc', before: before.length, after: before.length };
  const out = await sharp(before)
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10, palette: false })
    .toBuffer();
  if (out.length > before.length * (1 - MIN_GAIN)) {
    return { status: 'skip-gain', before: before.length, after: before.length };
  }
  const [a, b] = await Promise.all([rawOf(before), rawOf(out)]);
  const same = a.info.width === b.info.width && a.info.height === b.info.height
    && a.info.channels === b.info.channels && a.data.equals(b.data);
  if (!same) return { status: 'skip-pixels', before: before.length, after: before.length };
  if (!dryRun) fs.writeFileSync(file, out);
  return { status: 'done', before: before.length, after: out.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const given = args.filter((a) => !a.startsWith('--'));
  const files = given.length ? given : walk(path.join(process.cwd(), 'public', 'images'));
  const count = {};
  let before = 0;
  let after = 0;
  let i = 0;
  async function worker() {
    while (i < files.length) {
      const f = files[i++];
      try {
        const r = await optimizePng(f, { dryRun });
        count[r.status] = (count[r.status] || 0) + 1;
        before += r.before;
        after += r.after;
        if (r.status === 'skip-pixels') console.warn('  画素が変わるため見送り:', f);
      } catch (e) {
        count.error = (count.error || 0) + 1;
        console.warn('  読めない PNG:', f, e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  const mb = (n) => (n / 1048576).toFixed(1);
  console.log(`[optimize-png] ${files.length} 件 ${JSON.stringify(count)}${dryRun ? '（--dry-run）' : ''}`);
  console.log(`  ${mb(before)}MB → ${mb(after)}MB（${mb(before - after)}MB 減）`);
}
