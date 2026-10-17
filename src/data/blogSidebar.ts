// Blog article sidebar settings.
//
// 「人気の記事」は Search Console のクリック数（直近3か月）上位から手で選んでいる。
// 自動集計にしないのは、ビルドに GSC の認証を持ち込まないため（SECRET/ は CI に無い）。
// 見直しの目安：月に1回、SECRET/gsc/out/pages.csv の /blog/ 上位と入れ替える。
// 最終見直し：2026-10-17（期間 2026-07-16〜10-14）
//
// プラグインのランキングは src/data/install-ranking.json（prebuild で自動更新）から出すので、ここでは持たない。
export const popularPostSlugs: string[] = [
  'kintone-design-plugin-osusume',
  'kintone-henkou-rireki',
  'kintone-list-styler-plugin-hikaku',
  'kintone-category',
  'kintone-custom-view',
  // 6本目は、上の5本のどれかを開いているときの繰り上げ用（本人の記事は出さないため）。
  // 6位の kintone-2026-08-update は時期が過ぎると古くなるので、7位を採用。
  'kintone-kensaku-plugin-hikaku',
];
