// インストール数ランキングのスナップショットを生成する（prebuild で実行）
//
// なぜスナップショットにしたか（2026-08-04）
// ------------------------------------------------------------------
// 以前は各ページのフロントマターから毎回 GAS を fetch していた。GAS の
// action=ranking は「使用ドメイン台帳」と「プラグインマスタ」を全読みするため
// 実測 5〜24 秒かかり、タイムアウトすると **plugins.ts の並び順が「本物の
// ランキング」として公開される** 状態だった（トップの Top3 は先頭3件、
// /plugins/ranking/ はリリース日順）。しかもサイトのビルドは GitHub Actions で
// 毎日 06:00 JST にも走るため、誰も見ていないところで架空の順位が公開され得た。
//
// そこで取得をここに一本化し、次の性質を持たせた。
//   - 成功したときだけ `src/data/install-ranking.json` を上書きする
//   - 失敗したらコミット済みのスナップショット（＝直近の実データ）をそのまま使う
//   - スナップショットが1つも無い状態で失敗したときだけビルドを止める
// ページ側は fetch せずこの JSON を import するだけなので、
// **架空の順位が公開されることが構造的に起こらない**。
//
// limit=all の先頭3件は既定（Top3）レスポンスと一致することを実測で確認済みなので、
// 取得は 1 回だけで両方の用途（トップの Top3 / ランキング全件）を賄える。
// これによりトップとランキングページで順位が食い違う可能性も消える。

import fs from 'node:fs';
import path from 'node:path';

const GAS_URL =
  'https://script.google.com/macros/s/AKfycbzqMJ9CTBR0qC5F9yF5a4W3uPGhq105cft0ONflVGJcdsNsS-eg82U_Th5_qRZnIm6B_A/exec?action=ranking&limit=all';

const OUT_PATH = path.join(process.cwd(), 'src', 'data', 'install-ranking.json');

const TIMEOUT_MS = 30_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2_000;
// 全件モードはマスタ登録の全プラグインを返す（2026-08-04 時点で 46 件）。
// 部分的・壊れた応答を「正常」と誤認しないための下限。
const MIN_EXPECTED = 20;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isValidEntry(e) {
  return (
    e && typeof e.pluginId === 'string' && e.pluginId.trim() !== '' &&
    typeof e.name === 'string' && e.name.trim() !== ''
  );
}

async function fetchRanking() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const res = await fetch(GAS_URL, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = data?.topPlugins;
      if (!Array.isArray(list)) throw new Error('topPlugins が配列でない');
      if (list.length < MIN_EXPECTED) throw new Error(`件数が少なすぎる (${list.length} < ${MIN_EXPECTED})`);
      if (!list.every(isValidEntry)) throw new Error('pluginId / name が欠けた要素がある');
      return list.map((e) => ({
        pluginId: e.pluginId.trim(),
        name: e.name.trim(),
        pageUrl: typeof e.pageUrl === 'string' ? e.pageUrl : '',
      }));
    } catch (e) {
      console.warn(`[install-ranking] 取得失敗 ${attempt}/${MAX_ATTEMPTS}: ${e.message}`);
      if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS);
    }
  }
  return null;
}

const ranking = await fetchRanking();

if (ranking) {
  const payload = {
    // 「いつ時点の順位か」を JSON-LD の dateModified などに使う
    fetchedAt: new Date().toISOString(),
    ranking,
  };
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[install-ranking] 更新: ${ranking.length} 件 → ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`[install-ranking] 上位3件: ${ranking.slice(0, 3).map((p) => p.pluginId).join(', ')}`);
} else if (fs.existsSync(OUT_PATH)) {
  const prev = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
  console.warn(
    `[install-ranking] 取得できなかったため既存スナップショットを使用します` +
    `（${prev.fetchedAt} 取得・${prev.ranking?.length ?? 0} 件）。順位は更新されません。`
  );
} else {
  console.error('[install-ranking] 取得に失敗し、スナップショットもありません。');
  console.error('[install-ranking] 架空の順位を公開しないため、ビルドを中止します。');
  process.exit(1);
}
