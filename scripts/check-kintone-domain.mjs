/**
 * public/js/kintone-domain.js（申込フォーム・確認ページのドメインの整え方）を、
 * scripts/kintone-domain-vectors.json（入力と結果の例）で確かめる。
 * GAS 側（normalizeApplicationDomain）も同じ例の一覧で確かめる（試験環境の台本で）。
 *   node scripts/check-kintone-domain.mjs
 */
import fs from 'node:fs';
import vm from 'node:vm';
// ブラウザと同じく window に載せる形で読み込む
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(new URL('../public/js/kintone-domain.js', import.meta.url), 'utf8'), ctx);
const { normalizeKintoneDomain } = ctx.window.KZ;
const vectors = JSON.parse(fs.readFileSync(new URL('./kintone-domain-vectors.json', import.meta.url), 'utf8'));
let ng = 0;
for (const v of vectors) {
  const r = normalizeKintoneDomain(v.input);
  const ok = r.domain === v.domain && r.completed === v.completed && r.valid === v.valid;
  if (!ok) { ng++; console.log('NG', JSON.stringify(v.input), '→', JSON.stringify(r), '期待', JSON.stringify(v)); }
}
console.log('[check-kintone-domain] ' + (ng ? 'NG ' + ng + ' 件 / ' : 'OK — ') + vectors.length + ' 例');
process.exit(ng ? 1 : 0);
