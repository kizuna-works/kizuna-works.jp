#!/usr/bin/env node
/**
 * プラグイン製品バナー（1200x630）を生成する。
 *
 * 既存バナー（card-board / record-recovery など）と同じ意匠に揃える：
 *   ティールの斜めグラデ ＋ 左上の金色ストライプ ＋ 右下の金色ハニカム
 *   ＋ プラグインアイコン ＋ キャッチコピー ＋ 製品名 ＋ 3点訴求 ＋ KIZUNA ロゴ
 *
 * 使い方:
 *   node scripts/gen-plugin-banner.mjs chat-notify
 *
 * 新しいプラグインを足すときは BANNERS に定義を追加する。
 * アイコンは public/images/<slug>-icon.png を使う（無ければ iconSrc を指定）。
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'images');

const W = 1200, H = 630;
const FONT = "'Noto Sans JP', 'Yu Gothic UI', 'Yu Gothic', Meiryo, sans-serif";
const CYAN = '#3fd8e8';
const GOLD = '#c9a961';

/** 定義。iconSide は 'left' | 'right'（既存バナーも左右どちらもある）。 */
const BANNERS = {
  'chat-notify': {
    iconSrc: 'SECRET/kintone_plugin_workspace/kw-chat-notify/kw-chat-notify_icon_512.png',
    iconSide: 'left',
    catch: ['気づかれない更新を、', 'なくす。'],
    name: 'チャット通知 for kintone',
    // [前半(白), 強調(シアン), 後半(白)]
    bullets: [
      ['', 'Slack・Teams・Google Chat', ''],
      ['条件で絞って', '自動通知', ''],
      ['中継サーバー', '不要', '']
    ]
  }
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * 左上の金色ストライプ。
 * transform の rotate だと画面外へ逃げやすいので、平行四辺形を直接描いて
 * 左上の三角形にクリップする。
 */
function stripes() {
  const SHIFT = 430;   // 下辺を右へずらす量＝傾き
  let s = '';
  for (let i = 0; i < 8; i++) {
    const top = -300 + i * 58;
    const w = 18;
    s += `<polygon points="${top},-10 ${top + w},-10 ${top + w + SHIFT},640 ${top + SHIFT},640" ` +
      `fill="${GOLD}" opacity="${(0.6 - i * 0.055).toFixed(2)}"/>`;
  }
  return `<clipPath id="tl"><polygon points="0,0 620,0 0,620"/></clipPath>` +
    `<g clip-path="url(#tl)">${s}</g>`;
}

/** 右下の金色ハニカム */
function honeycomb() {
  const hex = (cx, cy, r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 180 * (60 * i - 30);
      pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(' ')}" fill="none" stroke="${GOLD}" stroke-width="2.4" opacity="0.5"/>`;
  };
  let s = '';
  const r = 46, dx = r * Math.sqrt(3), dy = r * 1.5;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cx = 900 + col * dx + (row % 2 ? dx / 2 : 0);
      const cy = 380 + row * dy;
      if (cx < W + 60 && cy < H + 60) s += hex(cx, cy, r);
    }
  }
  return `<g>${s}</g>`;
}

async function build(slug) {
  const cfg = BANNERS[slug];
  if (!cfg) throw new Error('定義がありません: ' + slug);

  const iconSize = 330;
  const iconX = cfg.iconSide === 'left' ? 96 : W - iconSize - 96;
  const iconY = (H - iconSize) / 2;
  const textX = cfg.iconSide === 'left' ? 470 : 72;

  // --- テキスト ---
  let y = 132;
  let text = '';
  cfg.catch.forEach(line => {
    text += `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="52" font-weight="900" fill="#ffffff">${esc(line)}</text>`;
    y += 64;
  });
  y += 22;
  text += `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="50" font-weight="900" fill="${CYAN}">${esc(cfg.name)}</text>`;
  y += 62;
  cfg.bullets.forEach(([a, hi, b]) => {
    text += `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="33" font-weight="700" fill="#ffffff">` +
      `<tspan fill="${CYAN}">・</tspan>${esc(a)}<tspan fill="${CYAN}">${esc(hi)}</tspan>${esc(b)}</text>`;
    y += 48;
  });

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#093c4f"/>
      <stop offset="55%" stop-color="#155c69"/>
      <stop offset="100%" stop-color="#35bab6"/>
    </linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${stripes()}
  ${honeycomb()}
  ${text}
</svg>`;

  const base = await sharp(Buffer.from(svg)).png().toBuffer();

  // --- アイコン（角丸＋影）---
  const iconPath = path.join(ROOT, cfg.iconSrc);
  const iconRaw = await sharp(iconPath).resize(iconSize, iconSize, { fit: 'cover' }).png().toBuffer();
  const mask = Buffer.from(
    `<svg width="${iconSize}" height="${iconSize}"><rect width="${iconSize}" height="${iconSize}" rx="72" fill="#fff"/></svg>`
  );
  const icon = await sharp(iconRaw)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png().toBuffer();

  // --- KIZUNA ロゴ（白背景の角丸に載せる）---
  const logoBoxW = 232, logoBoxH = 92;
  const logoImg = await sharp(path.join(ROOT, 'public/images/logo.png'))
    .resize({ width: logoBoxW - 28, height: logoBoxH - 24, fit: 'inside' }).png().toBuffer();
  const logoMeta = await sharp(logoImg).metadata();
  const logoBox = await sharp({
    create: { width: logoBoxW, height: logoBoxH, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([{
      input: logoImg,
      left: Math.round((logoBoxW - logoMeta.width) / 2),
      top: Math.round((logoBoxH - logoMeta.height) / 2)
    }])
    .png().toBuffer();

  const out = path.join(OUT, slug + '-banner.png');
  await sharp(base)
    .composite([
      { input: icon, left: iconX, top: Math.round(iconY) },
      { input: logoBox, left: W - logoBoxW - 40, top: H - logoBoxH - 34 }
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);

  // アイコン（200x200・ランキング/ヒーロー用）も併せて出す
  const iconOut = path.join(OUT, slug + '-icon.png');
  await sharp(iconPath).resize(200, 200, { fit: 'cover' }).png().toFile(iconOut);

  const m = await sharp(out).metadata();
  console.log(`✓ ${slug}-banner.png  ${m.width}×${m.height}`);
  console.log(`✓ ${slug}-icon.png    200×200`);
}

const slug = process.argv[2];
if (!slug) {
  console.log('使い方: node scripts/gen-plugin-banner.mjs <slug>');
  console.log('定義済み: ' + Object.keys(BANNERS).join(', '));
  process.exit(1);
}
await build(slug);
