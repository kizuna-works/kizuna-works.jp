/**
 * Generate unified extension banners for KIZUNA Works.
 *
 * Produces 1200x675 PNG banners that share an identical background
 * (navy gradient + subtle code-themed decoration + brand accent bar)
 * while differing only in foreground content (title, subtitle, icon, theme art).
 *
 * Run: node scripts/generate-extension-banners.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'images', 'extensions');

const W = 1200;
const H = 675;

// Shared SVG <defs> + background layer (identical across all banners).
const sharedBackground = `
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B3A6B"/>
      <stop offset="100%" stop-color="#2A5298"/>
    </linearGradient>
    <linearGradient id="accentBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1B3A6B"/>
      <stop offset="100%" stop-color="#2E8B2E"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#ffffff" opacity="0.07"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Base gradient -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Subtle dot pattern -->
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Scattered code-themed motifs (low opacity) -->
  <g opacity="0.08" font-family="Consolas, 'Courier New', monospace" font-size="22" fill="#ffffff">
    <text x="70" y="120">&lt;/&gt;</text>
    <text x="1080" y="100">{ }</text>
    <text x="60" y="600">JSON</text>
    <text x="1060" y="610">[ ]</text>
    <text x="950" y="170">HTML</text>
    <text x="120" y="380">app.json</text>
    <text x="1000" y="500">fields</text>
    <text x="60" y="240">// kintone</text>
  </g>

  <!-- Puzzle-piece dots for a kintone-extension feel -->
  <g opacity="0.06" fill="#ffffff">
    <circle cx="180" cy="500" r="3"/>
    <circle cx="200" cy="500" r="3"/>
    <circle cx="220" cy="500" r="3"/>
    <circle cx="1020" cy="340" r="3"/>
    <circle cx="1040" cy="340" r="3"/>
    <circle cx="1060" cy="340" r="3"/>
  </g>

  <!-- Top brand accent bar -->
  <rect x="0" y="0" width="${W}" height="6" fill="url(#accentBar)"/>
  <!-- Bottom brand accent bar -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accentBar)"/>
`;

// "KIZUNA Works 提供" pill (shared)
const brandPill = (x, y) => `
  <g transform="translate(${x},${y})">
    <rect x="0" y="0" width="180" height="36" rx="18" fill="#2E8B2E"/>
    <text x="90" y="24" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">KIZUNA Works 提供</text>
  </g>
`;

// "Chrome 拡張機能" chip (shared)
const categoryChip = (x, y) => `
  <g transform="translate(${x},${y})">
    <rect x="0" y="0" width="170" height="34" rx="17" fill="#2E8B2E"/>
    <text x="85" y="23" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Chrome 拡張機能</text>
  </g>
`;

const fontFamily = `'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif`;

// Per-banner foreground definitions.
// `iconFile` is a PNG that will be composited on top of the rendered SVG.
const banners = [
  {
    out: 'kw-field-viewer-banner.png',
    iconFile: 'kw-field-viewer-icon.png',
    iconSize: 240,
    iconX: 860,
    iconY: 217,
    foreground: `
      ${categoryChip(60, 60)}

      <text x="60" y="220" font-family="${fontFamily}" font-size="64" font-weight="900" fill="#ffffff">フィールドコードを</text>
      <text x="60" y="300" font-family="${fontFamily}" font-size="64" font-weight="900" fill="#ffffff">一瞬で<tspan fill="#7ED957">可視化</tspan></text>

      <text x="60" y="395" font-family="${fontFamily}" font-size="38" font-weight="700" fill="#ffffff">KW Field Viewer</text>
      <text x="60" y="438" font-family="${fontFamily}" font-size="26" font-weight="500" fill="#ffffff" opacity="0.9">for kintone</text>

      <text x="60" y="525" font-family="${fontFamily}" font-size="20" font-weight="500" fill="#ffffff" opacity="0.85">kintone 開発を効率化する開発者向けツール</text>

      ${brandPill(60, 560)}

      <!-- Floating field-code badges (right side decoration) -->
      <g filter="url(#softShadow)">
        <g transform="translate(720,470)">
          <rect width="180" height="36" rx="6" fill="#2E8B2E"/>
          <text x="14" y="24" font-family="Consolas, 'Courier New', monospace" font-size="16" font-weight="700" fill="#ffffff">customer_name</text>
        </g>
        <g transform="translate(920,520)">
          <rect width="150" height="36" rx="6" fill="#1B3A6B" stroke="#7ED957" stroke-width="2"/>
          <text x="14" y="24" font-family="Consolas, 'Courier New', monospace" font-size="16" font-weight="700" fill="#ffffff">order_id</text>
        </g>
        <g transform="translate(760,575)">
          <rect width="170" height="36" rx="6" fill="#2E8B2E"/>
          <text x="14" y="24" font-family="Consolas, 'Courier New', monospace" font-size="16" font-weight="700" fill="#ffffff">amount_total</text>
        </g>
      </g>
    `,
  },
  {
    out: 'kw-app-exporter-banner.png',
    iconFile: 'kw-app-exporter-icon.png',
    iconSize: 240,
    iconX: 860,
    iconY: 217,
    foreground: `
      ${categoryChip(60, 60)}

      <text x="60" y="220" font-family="${fontFamily}" font-size="64" font-weight="900" fill="#ffffff">アプリ設定を</text>
      <text x="60" y="300" font-family="${fontFamily}" font-size="64" font-weight="900" fill="#ffffff">一括<tspan fill="#7ED957">エクスポート</tspan></text>

      <text x="60" y="395" font-family="${fontFamily}" font-size="38" font-weight="700" fill="#ffffff">KW App Exporter</text>
      <text x="60" y="438" font-family="${fontFamily}" font-size="26" font-weight="500" fill="#ffffff" opacity="0.9">for kintone</text>

      <text x="60" y="525" font-family="${fontFamily}" font-size="20" font-weight="500" fill="#ffffff" opacity="0.85">HTML / JSON / Excel / Markdown で書き出す管理者向けツール</text>

      ${brandPill(60, 560)}

      <!-- Floating format badges (right side decoration) -->
      <g filter="url(#softShadow)">
        <g transform="translate(720,470)">
          <rect width="86" height="36" rx="6" fill="#2E8B2E"/>
          <text x="43" y="24" font-family="Consolas, monospace" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">HTML</text>
        </g>
        <g transform="translate(816,470)">
          <rect width="86" height="36" rx="6" fill="#1B3A6B" stroke="#7ED957" stroke-width="2"/>
          <text x="43" y="24" font-family="Consolas, monospace" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">JSON</text>
        </g>
        <g transform="translate(912,470)">
          <rect width="86" height="36" rx="6" fill="#2E8B2E"/>
          <text x="43" y="24" font-family="Consolas, monospace" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Excel</text>
        </g>
        <g transform="translate(770,520)">
          <rect width="180" height="36" rx="6" fill="#1B3A6B" stroke="#7ED957" stroke-width="2"/>
          <text x="90" y="24" font-family="Consolas, monospace" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Markdown</text>
        </g>
      </g>
    `,
  },
];

async function build() {
  await fs.mkdir(OUT, { recursive: true });

  for (const b of banners) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${sharedBackground}
  ${b.foreground}
</svg>`;

    const iconPath = path.join(OUT, b.iconFile);
    const iconBuffer = await sharp(iconPath)
      .resize(b.iconSize, b.iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    const outPath = path.join(OUT, b.out);
    await sharp(Buffer.from(svg))
      .composite([{ input: iconBuffer, left: b.iconX, top: b.iconY }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    console.log(`generated ${b.out}`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
