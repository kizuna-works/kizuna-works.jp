#!/usr/bin/env node
/**
 * Generate the tools-card / OGP preview image for Tsukuroi (AI object removal tool).
 * Pure SVG -> PNG (brand colors, no external AI). Output: public/images/tsukuroi-preview.png (1280x800).
 * Usage: node scripts/gen-tsukuroi-preview.mjs
 */
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public/images/tsukuroi-preview.png');
const NAVY = '#1B3A6B', NAVY2 = '#2a4f8a', GREEN = '#2E8B2E', WHITE = '#ffffff';
const JP = "'Yu Gothic','Hiragino Kaku Gothic ProN','Noto Sans JP','Meiryo',sans-serif";

function badge(x, label) {
  const w = 26 + label.length * 26;
  return `
    <g transform="translate(${x},612)">
      <rect x="0" y="0" width="${w}" height="50" rx="25" fill="#ffffff" opacity="0.14"/>
      <rect x="0" y="0" width="${w}" height="50" rx="25" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.5"/>
      <text x="${w / 2}" y="33" font-family="${JP}" font-size="24" font-weight="700" fill="#ffffff" text-anchor="middle">${label}</text>
    </g>`;
}

function star(cx, cy, r, fill, op) {
  return `<path d="M${cx} ${cy - r} L${cx + r * 0.28} ${cy - r * 0.28} L${cx + r} ${cy} L${cx + r * 0.28} ${cy + r * 0.28} L${cx} ${cy + r} L${cx - r * 0.28} ${cy + r * 0.28} L${cx - r} ${cy} L${cx - r * 0.28} ${cy - r * 0.28} Z" fill="${fill}" opacity="${op}"/>`;
}

const svg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY2}"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfe3ff"/>
      <stop offset="1" stop-color="#eaf6ff"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${GREEN}"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="800" fill="url(#bg)"/>
  <!-- decorative dots -->
  <circle cx="120" cy="120" r="10" fill="#ffffff" opacity="0.10"/>
  <circle cx="1180" cy="700" r="16" fill="#ffffff" opacity="0.08"/>
  <circle cx="150" cy="690" r="7" fill="${GREEN}" opacity="0.5"/>
  <rect x="0" y="794" width="1280" height="6" fill="url(#accent)"/>

  <!-- Left text block -->
  <text x="80" y="210" font-family="${JP}" font-size="28" font-weight="700" fill="#9ed99e" letter-spacing="2">KIZUNA Works ／ 無料Webツール</text>
  <text x="76" y="330" font-family="'Segoe UI',${JP}" font-size="118" font-weight="800" fill="#ffffff" letter-spacing="1">Tsukuroi</text>
  <text x="82" y="392" font-family="${JP}" font-size="40" font-weight="700" fill="#ffd98a">繕い — AI物体除去ツール</text>
  <text x="82" y="476" font-family="${JP}" font-size="36" font-weight="700" fill="#ffffff">消したい場所を選ぶだけ。</text>
  <text x="82" y="528" font-family="${JP}" font-size="36" font-weight="700" fill="#ffffff">AIが自然に繕います。</text>
  ${badge(82, '完全無料')}
  ${badge(82 + 160, '登録不要')}
  ${badge(82 + 160 + 160, 'AI物体除去')}
  <text x="82" y="726" font-family="${JP}" font-size="24" font-weight="500" fill="#cdd6e4">ブラウザ完結 ／ 画像はサーバーに送信されません</text>

  <!-- Right illustration: a framed photo with an object being removed -->
  <g transform="translate(720,150)">
    <rect x="-12" y="22" width="468" height="468" rx="26" fill="#000000" opacity="0.18"/>
    <rect x="0" y="0" width="456" height="456" rx="22" fill="#ffffff"/>
    <clipPath id="ph"><rect x="18" y="18" width="420" height="420" rx="12"/></clipPath>
    <g clip-path="url(#ph)">
      <rect x="18" y="18" width="420" height="300" fill="url(#sky)"/>
      <circle cx="120" cy="110" r="46" fill="#ffe08a"/>
      <path d="M18 318 q120 -90 230 -30 q120 60 190 10 v160 h-420 z" fill="#7bc47f"/>
      <path d="M18 360 q150 -50 250 0 q120 50 170 6 v110 h-420 z" fill="#5aa85f"/>
      <!-- unwanted object (silhouette) inside selection -->
      <g>
        <rect x="250" y="250" width="26" height="110" rx="10" fill="#3a3f47"/>
        <circle cx="263" cy="238" r="20" fill="#3a3f47"/>
      </g>
      <!-- red selection -->
      <ellipse cx="263" cy="300" rx="74" ry="92" fill="#ff2d2d" opacity="0.22"/>
      <ellipse cx="263" cy="300" rx="74" ry="92" fill="none" stroke="#ff2d2d" stroke-width="4" stroke-dasharray="10 8"/>
    </g>
    <!-- sparkles (AI) -->
    ${star(360, 150, 18, '#ffffff', 0.95)}
    ${star(392, 192, 11, '#ffd98a', 0.95)}
    ${star(338, 116, 8, '#ffffff', 0.8)}
    <!-- magic wand -->
    <g transform="rotate(38 360 360)">
      <rect x="352" y="300" width="16" height="150" rx="8" fill="${NAVY}"/>
      <rect x="352" y="300" width="16" height="40" rx="8" fill="${GREEN}"/>
    </g>
    ${star(372, 286, 22, '#ffd24d', 1)}
    <!-- AI chip -->
    <g transform="translate(20,398)">
      <rect x="0" y="0" width="92" height="44" rx="22" fill="${GREEN}"/>
      <text x="46" y="30" font-family="'Segoe UI',${JP}" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">AI</text>
    </g>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('wrote', OUT);
