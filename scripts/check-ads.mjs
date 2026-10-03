#!/usr/bin/env node
/**
 * check-ads.mjs — プラグイン内バナーの掲載データ（public/ads/ads.json）の点検
 *
 * 各プラグインの共通 ad.js（v2）は https://kizuna-works.jp/ads/ads.json を読んで、無料プランの利用者に
 * バナーを出す。ad.js は不正なデータを黙って捨てて内蔵バナーに戻すので、書き間違いに気づきにくい。
 * ここで ad.js と同じ基準を先に当て、1件でも外れたらビルドを止める。
 *
 *   node scripts/check-ads.mjs        （npm run prebuild から呼ばれる）
 *
 * 基準は SECRET/kintone_plugin_workspace/_shared/ad.js の validBanner() と揃えること。
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const FILE = path.join(ROOT, 'public', 'ads', 'ads.json');
const IMAGE_PREFIX = 'https://kizuna-works.jp/ads/';
// 帯の高さは 60px 固定。画像は表示 1200×60 の2倍で作る（高解像度の画面でもぼやけないように）
const IMAGE_W = 2400, IMAGE_H = 120, IMAGE_MAX_BYTES = 200 * 1024;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warns = [];
function err(id, msg) { errors.push((id ? '[' + id + '] ' : '') + msg); }

let data;
try { data = JSON.parse(fs.readFileSync(FILE, 'utf8')); }
catch (e) { console.error('check-ads: public/ads/ads.json が読めないか、JSON として不正です: ' + e.message); process.exit(1); }

if (data.schema !== 1) err('', 'schema は 1 にしてください（ad.js v2 は schema 1 だけを読みます）');
// 一覧を開いている最中に中身を切り替える形（自動で送る）は採らない（2026-10-03 決定）。
// 広告が複数あるときは、一覧画面を開くたびに次の1件になる。
if (data.rotation !== undefined) err('', 'rotation は使えません（表示中に広告を切り替える形は採らない）。広告が複数あれば、一覧画面を開くたびに順に替わります');
if (!Array.isArray(data.banners)) err('', 'banners は配列にしてください');

const pluginIds = new Set();
try {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'plugins.ts'), 'utf8');
  for (const m of src.matchAll(/\bid: '(kw-[^']+)'/g)) pluginIds.add(m[1]);
} catch { /* plugins.ts が読めなければ対象プラグインの照合は省く */ }

const seen = new Set();
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
for (const b of data.banners || []) {
  const id = b && b.id;
  if (!id || typeof id !== 'string') { err('', 'id の無い広告があります'); continue; }
  if (seen.has(id)) err(id, 'id が重複しています'); seen.add(id);
  if (b.type !== undefined && ['default', 'image', 'text'].indexOf(b.type) < 0) err(id, 'type は "default"（今のバナー）・"image"・"text" のどれか');
  if (b.type === 'default') {
    // 今のバナー（ロゴ・プラグイン一覧・無料ツール）を順番に入れるための1件。リンクや画像は持たない
    if (b.start && !DATE.test(b.start)) err(id, 'start は YYYY-MM-DD');
    if (b.end && !DATE.test(b.end)) err(id, 'end は YYYY-MM-DD');
    for (const p of b.plugins || []) if (pluginIds.size && !pluginIds.has(p)) err(id, 'plugins の「' + p + '」は plugins.ts にありません');
    continue;
  }
  if (typeof b.link !== 'string' || !/^https:\/\/[^\s"'<>]+$/.test(b.link)) err(id, 'link は https:// で始まる URL にしてください');
  // 広告はすべてクリック計測の中継ページ /go/<id>/ を通る（src/pages/go/[id].astro がビルド時に作る）
  else if (!/^[A-Za-z0-9_-]+$/.test(id)) err(id, '広告の id は、英数字・ハイフン・アンダーバーだけにしてください（中継ページ /go/' + id + '/ の URL に使います）');
  if (b.start && !DATE.test(b.start)) err(id, 'start は YYYY-MM-DD');
  if (b.end && !DATE.test(b.end)) err(id, 'end は YYYY-MM-DD');
  if (b.start && b.end && b.start > b.end) err(id, 'start が end より後です');
  if (b.end && b.end < today) warns.push('[' + id + '] 掲載期間が終わっています（' + b.end + '）。不要なら消してください');
  if (b.bg && !/^#[0-9a-fA-F]{6}$/.test(b.bg)) err(id, 'bg は #RRGGBB');
  if (b.label && String(b.label).length > 8) err(id, 'label は 8 文字以内（「PR」「提携」など）');
  // 他社サイトへの広告には札（「PR」「提携」など）を必須にする（2026-10-03 決定）。自社サイトへの宣伝は札なしでよい
  if (typeof b.link === 'string' && /^https:\/\//.test(b.link) && !b.link.startsWith('https://kizuna-works.jp/') && !String(b.label || '').trim())
    err(id, '他社サイトへの広告には label（「PR」または「提携」など）を付けてください。宣伝であることが分かるようにするためです');
  if (b.plugins && !Array.isArray(b.plugins)) err(id, 'plugins は配列（空なら全プラグイン）');
  for (const p of b.plugins || []) if (pluginIds.size && !pluginIds.has(p)) err(id, 'plugins の「' + p + '」は plugins.ts にありません');
  if (b.type === 'text') {
    if (!b.text) err(id, 'text 型には text が必要です');
    if (b.text && b.text.length > 60) err(id, 'text は 60 文字以内');
    if (b.sub && b.sub.length > 80) err(id, 'sub は 80 文字以内');
  } else {
    if (typeof b.image !== 'string' || b.image.indexOf(IMAGE_PREFIX) !== 0) { err(id, 'image は ' + IMAGE_PREFIX + ' 配下の URL にしてください（他のサイトの画像は表示されません）'); continue; }
    if (!b.alt) err(id, 'alt（画像の説明）を書いてください');
    // 狭い画面では画像の代わりに文字版を出す（2026-10-03 案）ので、画像の広告にも text を必須にする
    if (!b.text) err(id, '画像の広告にも text（狭い画面で代わりに出す短い文字・60字以内）を書いてください');
    const local = path.join(ROOT, 'public', 'ads', b.image.slice(IMAGE_PREFIX.length));
    if (!fs.existsSync(local)) { err(id, '画像ファイルがありません: public/ads/' + b.image.slice(IMAGE_PREFIX.length)); continue; }
    const size = fs.statSync(local).size;
    if (size > IMAGE_MAX_BYTES) err(id, '画像が大きすぎます（' + Math.round(size / 1024) + 'KB）。200KB 以内にしてください');
    try {
      const meta = await sharp(local).metadata();
      if (meta.width !== IMAGE_W || meta.height !== IMAGE_H) err(id, '画像は ' + IMAGE_W + '×' + IMAGE_H + ' にしてください（今は ' + meta.width + '×' + meta.height + '）');
      else {
        // 画像の左右の端（各 8px）は bg と同じ単色にする（2026-10-03 案）。帯の余白と画像の境目を見えなくするため
        const bg = (b.bg && /^#[0-9a-fA-F]{6}$/.test(b.bg) ? b.bg : '#1B3A6B').slice(1);
        const want = [0, 2, 4].map((k) => parseInt(bg.slice(k, k + 2), 16));
        const { data, info } = await sharp(local).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        let worst = 0;
        for (let y = 0; y < info.height; y += 4) {
          for (const x of [0, 4, 7, info.width - 8, info.width - 5, info.width - 1]) {
            const p = (y * info.width + x) * info.channels;
            worst = Math.max(worst, Math.abs(data[p] - want[0]), Math.abs(data[p + 1] - want[1]), Math.abs(data[p + 2] - want[2]));
          }
        }
        if (worst > 24) err(id, '画像の左右の端（各 8px）を bg の色（#' + bg + '）と同じ単色にしてください（いちばん離れた色の差：' + worst + '）。帯の余白との境目が見えてしまいます');
      }
    } catch (e) { err(id, '画像を読めません: ' + e.message); }
  }
}

for (const w of warns) console.warn('  check-ads: ' + w);
if (errors.length) {
  console.error('check-ads: public/ads/ads.json に ' + errors.length + ' 件の問題があります。');
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('check-ads: OK（広告 ' + (data.banners || []).length + ' 件）');
