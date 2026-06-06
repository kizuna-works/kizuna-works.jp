#!/usr/bin/env node
/**
 * ブログ記事内の図解（オンブランド）を satori + sharp で生成するスクリプト。
 * 出力先: public/images/blog/<name>.png（記事から ![](...) で参照）
 *
 * 使い方: node scripts/gen-blog-figures.mjs
 * 図版を追加したいときは FIGURES に定義を足して再実行する。
 */
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const ROOT = process.cwd();
const FONT_700 = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/NotoSansJP-700.woff'));
const FONT_400 = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/NotoSansJP-400.woff'));
const OUT_DIR = path.join(ROOT, 'public/images/blog');

const C = { navy: '#1B3A6B', navyDeep: '#14315a', green: '#2E8B2E', ink: '#1f2a3a', gray: '#5a6b82', cardBg: '#f4f7fb', border: '#e2e8f0', white: '#ffffff' };

async function render(element, width, height, name) {
  const svg = await satori(element, {
    width, height,
    fonts: [
      { name: 'Noto Sans JP', data: FONT_700, weight: 700, style: 'normal' },
      { name: 'Noto Sans JP', data: FONT_400, weight: 400, style: 'normal' },
    ],
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, `${name}.png`));
  console.log('  生成:', `public/images/blog/${name}.png`, `(${width}x${height})`);
}

// 図1：3つの方法の全体像（横3カード）
function overviewMethods(methods) {
  const card = (m) => ({
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', flex: 1, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: '26px 24px', gap: '14px' },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 999, background: m.cost === '有料' ? C.green : C.navy, color: C.white, fontSize: 26, fontWeight: 700 }, children: m.n } },
              { type: 'div', props: { style: { display: 'flex', background: m.cost === '有料' ? C.navy : C.green, color: C.white, fontSize: 17, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }, children: m.cost } },
            ],
          },
        },
        { type: 'div', props: { style: { display: 'flex', fontSize: 26, fontWeight: 700, color: C.navy }, children: m.name } },
        { type: 'div', props: { style: { display: 'flex', fontSize: 18, fontWeight: 400, color: C.gray, lineHeight: 1.65 }, children: m.desc } },
      ],
    },
  });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 330, display: 'flex', flexDirection: 'row', gap: '24px', padding: '36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children: methods.map(card),
    },
  };
}

// 図2：横フロー（ステップ → ステップ）
function flow(steps) {
  const box = (label) => ({
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 196, height: 92, background: C.navy, color: C.white, borderRadius: 14, padding: '0 14px', fontSize: 19, fontWeight: 700, lineHeight: 1.4 },
      children: label,
    },
  });
  // 矢印は確実に描画できる ASCII の ">" を太字で（緑）
  const arrow = () => ({ type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, color: C.green, fontSize: 40, fontWeight: 700, paddingBottom: '4px' }, children: '>' } });
  const children = [];
  steps.forEach((s, i) => { children.push(box(s)); if (i < steps.length - 1) children.push(arrow()); });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 164, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children,
    },
  };
}

const FIGURES = [
  {
    name: 'kintone-cyouhyou-pdf-output-overview',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '標準印刷でPDF', desc: 'レコード画面をそのままPDF保存。1件・社内確認に。', cost: '無料' },
      { n: '2', name: 'CSV＋Excel', desc: 'CSVを書き出しExcel帳票に反映。無料できれいに。', cost: '無料' },
      { n: '3', name: '帳票プラグイン', desc: 'PDF/Excelを一括・指定様式で。大量・継続に。', cost: '有料' },
    ]),
  },
  {
    name: 'kintone-cyouhyou-pdf-output-flow',
    w: 1000, h: 164,
    el: flow(['kintone一覧で絞り込み', 'CSVで書き出し', 'Excel帳票に反映', 'PDFで保存']),
  },
];

const only = process.argv[2];
for (const f of FIGURES) {
  if (only && !f.name.includes(only)) continue;
  await render(f.el, f.w, f.h, f.name);
}
console.log('完了');
