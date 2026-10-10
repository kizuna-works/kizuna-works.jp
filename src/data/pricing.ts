/**
 * サポーターの料金とプランの表示（単一情報源）。
 *
 * 2026 年の料金改定：年間サポーターを「1 製品ごと（税抜 3,000 円）」から
 * 「ちょこっとプラグインすべて（税抜 7,500 円）」に変える。プレミアム年間サポーター（税抜 15,000 円）は変わらない。
 *
 * **PRICE_REVISION_LIVE を true にした日が改定日。** 予告はしない（予告すると改定前の 1 製品に駆け込みが出るため。
 * 2026-10-05 ユーザー判断）。それまでは false のまま＝今の表示と同じ。切り替えの日は、ライセンス GAS の
 * スクリプトのプロパティ INDIVIDUAL_PLAN_CLOSED=on と同時に行う（手順は SECRET の料金改定の手順書）。
 *
 * 料金はプラグイン（ad.js・supporterPerks.js）には書かない（plugin-lint の noprice）。HP だけがここから出す。
 */

/** 料金改定を公開したか（改定日に true にする） */
export const PRICE_REVISION_LIVE = true;

/** 改定日（トップページのお知らせに出す。PRICE_REVISION_LIVE を true にするときに入れる） */
export const PRICE_REVISION_DATE = '2026年10月11日';

/** 年間サポーター（改定後）＝ちょこっとプラグインすべて */
export const CHOKO_PLAN = {
  name: '年間サポーター',
  scope: 'ちょこっとプラグインすべて',
  priceExTax: 7500,
  priceInTax: 8250,
  monthlyInTax: 688,   // 8,250 ÷ 12 ＝ 687.5
};

/** 年間サポーター（改定前）＝1 製品 */
export const INDIVIDUAL_PLAN = {
  name: '年間サポーター',
  scope: '1プラグイン',
  priceExTax: 3000,
  priceInTax: 3300,
  monthlyInTax: 250,
};

/** プレミアム年間サポーター（改定の前後で同じ） */
export const PREMIUM_PLAN = {
  name: 'プレミアム年間サポーター',
  scope: '販売中の全プラグイン',
  priceExTax: 15000,
  priceInTax: 16500,
};

/** 今の年間サポーター（改定の前後で切り替わる） */
export const SUPPORTER_PLAN = PRICE_REVISION_LIVE ? CHOKO_PLAN : INDIVIDUAL_PLAN;

/** 年間サポーターの申込に使う planType（HP の申込フォーム → ライセンス GAS） */
export const SUPPORTER_PLAN_TYPE = PRICE_REVISION_LIVE ? 'chokotto' : 'individual';

export const yen = (n: number) => '¥' + n.toLocaleString('ja-JP');
