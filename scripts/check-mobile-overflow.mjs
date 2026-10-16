#!/usr/bin/env node
/**
 * check-mobile-overflow.mjs — モバイル幅で画面からはみ出す要素がないかを全ページ検査する
 *
 * なぜ必要か：
 *   global.css の `body { overflow-x: clip }` は、はみ出した部分を「切り落とす」。
 *   横スクロールバーは出ないので documentElement.scrollWidth は 375 のまま変わらず、
 *   目視でも「右端が少し欠けている」程度にしか見えない。2026-10-16、/plugins/ の
 *   「無料でどこまで使えるのか」（<details>）を開くと中の表（min-width:560px）に押されて
 *   枠が 593px に広がり、右側が切れていたのに誰も気づかなかった（flex アイテムの
 *   min-width:auto が原因。修正は min-width:0）。
 *
 * 何を見るか：
 *   dist/ の全 HTML を 375px のモバイル表示で開き、<details> をすべて開いた状態で、
 *   右端（または左端）が画面外に出ている要素を探す。次のものははみ出しとみなさない：
 *     - 画面内に収まった overflow:auto/hidden の枠の中にあるもの（表の横スクロール等）
 *     - position:fixed の要素とその中身（画面外に待機するドロワー等）
 *     - display:none / visibility:hidden / 大きさ 0 のもの
 *
 * 実行：
 *   `npm run build` のあと postbuild で自動実行される（GitHub Actions でも走る）。
 *   単体では `npm run check:mobile`（dist/ が必要）。
 *   はみ出しがあれば終了コード 1 でビルドを中止する。
 *   Chrome が見つからない場合、ローカルでは警告して通す。CI（env.CI）では失敗にする
 *   ──検査が黙って抜けたまま公開されるのを防ぐため。
 *
 * 環境変数：
 *   CHROME_PATH       Chrome の実行ファイル（未指定なら既定の場所を探す）
 *   MOBILE_CHECK_ONLY 検査するパスをカンマ区切りで限定（例：/plugins/,/blog/）
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const VIEWPORT = { width: 375, height: 812, deviceScaleFactor: 1, isMobile: true, hasTouch: true };
const CONCURRENCY = 6;
const IS_CI = !!process.env.CI;

// GitHub Actions ではエラーを注釈（::error::）でも出す。注釈は認証なしの
// check-runs API で読めるので、ログを開けない環境からでも原因が分かる。
const annotate = (msg) => {
  if (process.env.GITHUB_ACTIONS) console.log(`::error title=check-mobile-overflow::${String(msg).replace(/\r?\n/g, '%0A')}`);
};
process.on('uncaughtException', (e) => { annotate(e.stack || e); console.error(e); process.exit(1); });
process.on('unhandledRejection', (e) => { annotate((e && e.stack) || e); console.error(e); process.exit(1); });

const skip = (msg) => {
  if (IS_CI) {
    annotate(msg);
    console.error(`[check-mobile-overflow] NG: ${msg}`);
    process.exit(1);
  }
  console.warn(`[check-mobile-overflow] 検査をスキップ: ${msg}`);
  process.exit(0);
};

if (!fs.existsSync(DIST)) skip('dist/ がありません（先に npm run build）');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chromePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chromePath) skip('Chrome が見つかりません（CHROME_PATH で指定できます）');

let puppeteer;
try {
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  skip('puppeteer-core がありません（npm install）');
}

// ---- dist/ を配信する簡易サーバー -------------------------------------------
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
};
const server = http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(req.url.split('?')[0]); } catch { p = '/'; }
  let f = path.join(DIST, p);
  if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;

// ---- 対象ページ --------------------------------------------------------------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) {
      out.push('/' + path.relative(DIST, p).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1'));
    }
  }
  return out;
}
let pages = walk(DIST).filter((u) => !/^\/(_astro|downloads)\//.test(u));
if (process.env.MOBILE_CHECK_ONLY) {
  const only = process.env.MOBILE_CHECK_ONLY.split(',').map((s) => s.trim()).filter(Boolean);
  pages = pages.filter((u) => only.some((o) => u.startsWith(o)));
}

// ---- ページ内で実行する測定 ---------------------------------------------------
async function measure() {
  // astro.config の redirects が出すページ（meta refresh だけで body が無い）は測る対象がない
  if (!document.body) return { vw: 0, hits: [] };
  document.querySelectorAll('details').forEach((d) => { d.open = true; });
  // rAF は使わない：並列で開く裏のタブでは rAF が止まり、検査が永久に終わらない。
  // getBoundingClientRect() が同期でレイアウトを確定させるので、少し待つだけで足りる。
  await new Promise((r) => setTimeout(r, 50));
  const vw = document.documentElement.clientWidth;
  const TOL = 1;

  const inFixed = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      if (getComputedStyle(a).position === 'fixed') return true;
    }
    return false;
  };
  // 画面内に収まった「はみ出しを切る枠」の中にあれば、その枠がスクロール／クリップしている
  const clippedByAncestor = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const ox = getComputedStyle(a).overflowX;
      if (ox !== 'visible') {
        const r = a.getBoundingClientRect();
        if (r.right <= vw + TOL && r.left >= -TOL) return true;
      }
    }
    return false;
  };
  const describe = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      s += '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
    }
    return s;
  };

  const found = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right <= vw + TOL && r.left >= -TOL) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (inFixed(el) || clippedByAncestor(el)) continue;
    if (found.some((f) => f.el.contains(el))) continue; // 一番外側だけ報告する
    found.push({ el, sel: describe(el), left: Math.round(r.left), width: Math.round(r.width), right: Math.round(r.right) });
  }
  return { vw, hits: found.slice(0, 5).map(({ el, ...rest }) => rest) };
}

// ---- 実行 ---------------------------------------------------------------------
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-first-run', '--no-default-browser-check', ...(process.platform === 'linux' ? ['--no-sandbox'] : [])],
});

// どこかで固まってもビルドを止め続けないための上限
const withTimeout = (p, ms) => Promise.race([
  p,
  new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout ${ms}ms`)), ms)),
]);

const failures = [];
const errors = [];
let cursor = 0;

async function worker() {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.setRequestInterception(true);
  // 外部（GA・CDN 等）は遮断して結果を安定させる。Web フォントだけは文字幅に効くので通す。
  page.on('request', (req) => {
    const u = req.url();
    if (u.startsWith(ORIGIN) || u.startsWith('data:') ||
        u.startsWith('https://fonts.googleapis.com/') || u.startsWith('https://fonts.gstatic.com/')) {
      req.continue();
    } else {
      req.abort();
    }
  });
  while (cursor < pages.length) {
    const u = pages[cursor++];
    let last;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await page.goto(ORIGIN + u, { waitUntil: 'load', timeout: 30000 });
        await withTimeout(page.evaluate(() => document.fonts && document.fonts.ready), 5000).catch(() => {});
        const res = await withTimeout(page.evaluate(measure), 30000);
        if (res.hits.length) failures.push({ url: u, hits: res.hits });
        last = null;
        break;
      } catch (e) {
        last = e; // ページ内のリダイレクト等で文脈が壊れたら 1 回だけ測り直す
      }
    }
    if (last) errors.push({ url: u, error: String(last.message || last).slice(0, 160) });
  }
  await page.close();
}

const started = Date.now();
try {
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, pages.length) }, worker));
  // NG のページは 1 タブで測り直し、2 回とも NG のものだけ残す。フォントの読み込み
  // タイミング等による一過性の NG でデプロイが止まるのを防ぐ（本物のはみ出しは再現する）。
  if (failures.length) {
    const firstPass = failures.splice(0);
    pages = firstPass.map((f) => f.url);
    cursor = 0;
    await worker();
    const flaky = firstPass.filter((f) => !failures.some((g) => g.url === f.url));
    if (flaky.length) console.warn(`[check-mobile-overflow] 測り直しで解消（一過性）: ${flaky.map((f) => f.url).join(', ')}`);
  }
} finally {
  await browser.close();
  server.close();
}
const secs = ((Date.now() - started) / 1000).toFixed(1);

if (errors.length) {
  console.warn(`[check-mobile-overflow] 測定できなかったページ ${errors.length} 件（はみ出し判定からは除外）:`);
  for (const e of errors) console.warn(`  ${e.url} — ${e.error}`);
}

if (failures.length) {
  console.error(`\n[check-mobile-overflow] NG: ${VIEWPORT.width}px 幅で画面からはみ出す要素があります（${failures.length} ページ）`);
  for (const f of failures) {
    annotate(`${f.url} — ` + f.hits.map((h) => `${h.sel} left=${h.left} width=${h.width} right=${h.right}`).join(' / '));
    console.error(`  ${f.url}`);
    for (const h of f.hits) console.error(`    ${h.sel}  left=${h.left} width=${h.width} right=${h.right}`);
  }
  console.error(
    '\n  よくある原因：flex/grid の子が min-width:auto のまま、中の表・<pre>・nowrap 文字列に押されて広がる。' +
    '\n  対策：その子に min-width:0 を付け、表などは overflow-x:auto の枠に入れる。詳細は .claude/docs/mobile-guard.md' +
    '\n  （<details> は開いた状態で測っています）\n'
  );
  process.exit(1);
}

console.log(`[check-mobile-overflow] OK: ${pages.length} ページ・${VIEWPORT.width}px 幅ではみ出しなし（${secs}秒）`);
