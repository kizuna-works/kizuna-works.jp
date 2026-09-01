#!/usr/bin/env node
/*
 * check-plugin-release.mjs — 公開ゲート
 *
 * public/downloads/ に「まだコミットしていない」プラグインの配布 zip があるとき、
 * その版のテスト実施記録が無ければ npm run build を失敗させる。
 *
 *   記録の場所: SECRET/kintone_plugin_release/<name>_release/docs/<name>_TEST_v<版>.md
 *   合格の条件: ファイルが存在し、本文に「判定: 合格」がある
 *
 * なぜ「未コミットの zip」を対象にするのか：
 *   公開＝コミットして push なので、その直前だけが唯一の関門になる。過去に公開済みの
 *   版まで遡って記録を求めると、導入した瞬間に 57 製品ぶんが赤くなって外されてしまう。
 *   新しく置いた zip だけを見れば、これから公開するものだけを確実に止められる。
 *
 * SECRET/ が無い環境（GitHub Actions）と git が使えない環境では何もしない。
 * デプロイを壊さないため。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DOWNLOADS = 'public/downloads';
const RELEASE_DIR = path.join(ROOT, 'SECRET', 'kintone_plugin_release');
const SPEC = 'SECRET/kintone_plugin_workspace/_test/共通テスト仕様書.md';

function skip(reason) {
  console.log('[check-plugin-release] スキップ（' + reason + '）');
  process.exit(0);
}

if (!fs.existsSync(RELEASE_DIR)) skip('SECRET/kintone_plugin_release が無い環境');

let status = '';
try {
  status = execSync('git status --porcelain -- ' + DOWNLOADS, { cwd: ROOT, encoding: 'utf8' });
} catch {
  skip('git が使えない環境');
}

// 未追跡(??)／追加(A) の zip だけを対象にする。既にコミット済み＝公開済み。
const newZips = status.split('\n')
  .map(l => l.trim())
  .filter(l => /^(\?\?|A)\s/.test(l))
  .map(l => l.replace(/^(\?\?|A)\s+/, '').replace(/^"|"$/g, ''))
  .filter(f => /\.zip$/i.test(f));

if (newZips.length === 0) {
  console.log('[check-plugin-release] 新しい配布 zip なし — OK');
  process.exit(0);
}

const problems = [];
const passed = [];

for (const rel of newZips) {
  const base = path.basename(rel, '.zip');                 // kw-quick-tab-v1.0.5
  const m = base.match(/^(kw-[a-z0-9-]+)-v(\d+\.\d+\.\d+)$/);
  if (!m) { problems.push({ zip: rel, why: 'ファイル名が kw-<name>-v<X.Y.Z>.zip の形になっていない' }); continue; }
  const [, name, version] = m;

  const docDir = path.join(RELEASE_DIR, name + '_release', 'docs');
  const record = path.join(docDir, name + '_TEST_v' + version + '.md');

  if (!fs.existsSync(record)) {
    problems.push({ zip: rel, name, version, record: path.relative(ROOT, record),
                    why: 'テスト実施記録がありません' });
    continue;
  }
  const body = fs.readFileSync(record, 'utf8');
  if (!/判定:\s*合格/.test(body)) {
    problems.push({ zip: rel, name, version, record: path.relative(ROOT, record),
                    why: '記録に「判定: 合格」がありません（未完了か不合格）' });
    continue;
  }
  passed.push(name + ' v' + version);
}

if (problems.length === 0) {
  console.log('[check-plugin-release] OK — ' + passed.join(' / ') + ' のテスト記録を確認しました。');
  process.exit(0);
}

console.error('');
console.error('[check-plugin-release] ERROR: テスト実施記録が無い配布 zip があります。');
console.error('');
for (const p of problems) {
  console.error('  ' + p.zip);
  console.error('    ' + p.why);
  if (p.record) console.error('    必要なファイル: ' + p.record.split(path.sep).join('/'));
}
console.error('');
console.error('  ' + SPEC + ' の「実施記録のテンプレート」をコピーして作成してください。');
console.error('  テストを実施していない版を公開しないための関門です。');
console.error('');
process.exit(1);
