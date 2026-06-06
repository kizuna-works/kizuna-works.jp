#!/usr/bin/env node
/**
 * バナー右側の「フラットイラスト」を SVG → PNG で生成する（外部AI不要・ブランド配色で自製）。
 * 出力: src/assets/og-art/<theme>.png（透過PNG）。バナーがテーマ別に自動合成する。
 * 使い方: node scripts/gen-og-art.mjs        （全テーマ生成）
 *         node scripts/gen-og-art.mjs document （指定テーマのみ）
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'src/assets/og-art');
const NAVY = '#1B3A6B', NAVY2 = '#234d8a', GREEN = '#2E8B2E', GREEN_D = '#236b23', WHITE = '#ffffff', LINE = '#cdd6e4', LINE2 = '#e3e9f2', PANEL = '#eef2f8';

// 共通：紺の円形バックドロップ＋装飾ドット
function backdrop() {
  return `
    <circle cx="300" cy="300" r="262" fill="${NAVY}"/>
    <circle cx="118" cy="150" r="10" fill="#ffffff" opacity="0.12"/>
    <circle cx="500" cy="430" r="14" fill="#ffffff" opacity="0.10"/>
    <circle cx="470" cy="150" r="7" fill="${GREEN}" opacity="0.55"/>`;
}

// 帳票・PDF出力テーマ：請求書カード＋チェックバッジ＋PDFファイル＋ミニチャート
function documentArt() {
  return `
  <svg width="1080" height="1080" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    ${backdrop()}
    <!-- 後ろのカード -->
    <rect x="206" y="168" width="196" height="252" rx="16" fill="${WHITE}" opacity="0.55"/>
    <!-- 請求書カード -->
    <rect x="196" y="186" width="208" height="266" rx="16" fill="${WHITE}"/>
    <path d="M196 202 a16 16 0 0 1 16 -16 h176 a16 16 0 0 1 16 16 v34 h-208 z" fill="${NAVY}"/>
    <rect x="196" y="240" width="208" height="6" fill="${GREEN}"/>
    <rect x="222" y="268" width="116" height="11" rx="5.5" fill="${LINE}"/>
    <rect x="222" y="292" width="156" height="11" rx="5.5" fill="${LINE2}"/>
    <rect x="222" y="316" width="92"  height="11" rx="5.5" fill="${LINE2}"/>
    <rect x="222" y="350" width="156" height="16" rx="4" fill="${PANEL}"/>
    <rect x="222" y="374" width="156" height="16" rx="4" fill="${PANEL}"/>
    <rect x="300" y="406" width="78" height="22" rx="6" fill="${GREEN}"/>
    <!-- PDFファイル（左下・前面） -->
    <path d="M150 372 h54 l22 22 v74 a8 8 0 0 1 -8 8 h-68 a8 8 0 0 1 -8 -8 v-88 a8 8 0 0 1 8 -8 z" fill="${GREEN}"/>
    <path d="M204 372 l22 22 h-22 z" fill="${GREEN_D}"/>
    <rect x="166" y="430" width="44" height="9" rx="4.5" fill="#ffffff" opacity="0.9"/>
    <rect x="166" y="446" width="34" height="9" rx="4.5" fill="#ffffff" opacity="0.7"/>
    <!-- ミニチャート（右下） -->
    <rect x="356" y="334" width="96" height="78" rx="12" fill="${WHITE}" stroke="${NAVY}" stroke-width="3"/>
    <rect x="372" y="378" width="13" height="20" rx="2" fill="${NAVY}"/>
    <rect x="394" y="366" width="13" height="32" rx="2" fill="${GREEN}"/>
    <rect x="416" y="354" width="13" height="44" rx="2" fill="${NAVY}"/>
    <!-- チェックバッジ（右上） -->
    <circle cx="404" cy="190" r="42" fill="${GREEN}" stroke="${WHITE}" stroke-width="6"/>
    <path d="M385 190 l13 14 l26 -30" fill="none" stroke="${WHITE}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

const ART = {
  document: documentArt,
};

async function render(name, svg) {
  fs.mkdirSync(OUT, { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, `${name}.png`));
  console.log('  生成:', `src/assets/og-art/${name}.png`);
}

const only = process.argv[2];
for (const [name, fn] of Object.entries(ART)) {
  if (only && name !== only) continue;
  await render(name, fn());
}
console.log('完了');
