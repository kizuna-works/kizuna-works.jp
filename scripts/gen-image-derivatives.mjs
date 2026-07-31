#!/usr/bin/env node
/**
 * ビルド済み HTML が実際に参照している PNG について、配信用の派生画像を作る。
 *
 *   - <base>.webp      … 同寸法の WebP（Picture.astro が <source> で優先配信する）
 *   - <base>-800.webp  … 幅1000px超の画像だけ。カード表示（実寸400px前後）用の縮小版
 *
 * 参照されていない PNG は対象外（public/images には未使用の素材も多いため）。
 * 元の PNG は変更しない。og:image は PNG のまま使うので消さないこと。
 *
 * 使い方: npm run build してから node scripts/gen-image-derivatives.mjs
 *         引数に文字列を渡すと、その語を含むパスだけに絞れる。
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const SMALL_WIDTH = 800;
const SMALL_THRESHOLD = 1000;

if (!fs.existsSync(DIST)) {
  console.error('dist/ がありません。先に npm run build を実行してください。');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// dist の全 HTML から /images/**.png の参照を集める
const referenced = new Set();
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/["'(](\/images\/[^"')\s]+?\.png)["')\s]/g)) {
    referenced.add(m[1]);
  }
}

const only = process.argv[2];
const targets = [...referenced].filter((p) => !only || p.includes(only)).sort();

let madeWebp = 0;
let madeSmall = 0;
let savedWebp = 0;
let skipped = 0;

for (const rel of targets) {
  const src = path.join(PUBLIC, rel);
  if (!fs.existsSync(src)) {
    console.warn('  参照先が見つかりません:', rel);
    continue;
  }
  const base = src.replace(/\.png$/i, '');
  const meta = await sharp(src).metadata();

  // 同寸法の WebP
  const webp = `${base}.webp`;
  if (!fs.existsSync(webp)) {
    await sharp(src).webp({ quality: 82 }).toFile(webp);
    savedWebp += fs.statSync(src).size - fs.statSync(webp).size;
    madeWebp++;
  } else {
    skipped++;
  }

  // カード用の縮小版。カードのサムネに使う2系統（プラグイン等のバナーと記事バナー）だけに限る。
  // 詳細ページのスクリーンショットは800pxより大きく表示されるので対象外にする。
  const isCardThumb =
    /-(banner|preview)\.png$/i.test(rel) || rel.startsWith('/images/blog/');
  if (isCardThumb && meta.width > SMALL_THRESHOLD) {
    const small = `${base}-${SMALL_WIDTH}.webp`;
    if (!fs.existsSync(small)) {
      await sharp(src).resize({ width: SMALL_WIDTH }).webp({ quality: 80 }).toFile(small);
      madeSmall++;
    }
  }
}

console.log(`参照PNG ${targets.length} 件`);
console.log(`  .webp 新規生成: ${madeWebp} 件（既存スキップ ${skipped} 件）`);
console.log(`  -${SMALL_WIDTH}.webp 新規生成: ${madeSmall} 件`);
console.log(`  WebP 化による削減: ${Math.round(savedWebp / 1024 / 1024 * 10) / 10} MB 相当`);
