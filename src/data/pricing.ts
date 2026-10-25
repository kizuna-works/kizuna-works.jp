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
  scope: 'ちょこっと＆プレミアムプラグインすべて',
  priceExTax: 15000,
  priceInTax: 16500,
};

/**
 * KIZUNA Pro 拡張パック（プレミアム年間サポーターに追加するプラン。単品では売らない・年間サポーター（ちょこっと）には足せない）。
 * 途中追加（pro_add）は GAS が残り月数で 1 年分／月割りを決めるので、ここの金額は 1 年分。
 */
export const PRO_ADDON = {
  name: 'KIZUNA Pro 拡張パック',
  scope: 'KIZUNA Pro プラグインすべて',
  priceExTax: 10000,
  priceInTax: 11000,
};

/** KIZUNA Pro 年間サポーター＝プレミアム年間サポーター＋KIZUNA Pro 拡張パック（セット） */
export const PRO_SET_PLAN = {
  name: 'KIZUNA Pro 年間サポーター',
  scope: 'ちょこっと＆プレミアム＆KIZUNA Pro プラグインすべて',
  priceExTax: PREMIUM_PLAN.priceExTax + PRO_ADDON.priceExTax,   // 25,000
  priceInTax: PREMIUM_PLAN.priceInTax + PRO_ADDON.priceInTax,   // 27,500
  monthlyInTax: 2292,   // 27,500 / 12 = 2,291.7
};

/** 拡張パックの標準の説明文（HP・Square 共通。ブリッジ限定に読める書き方にしない） */
export const PRO_ADDON_DESCRIPTION =
  'プレミアム年間サポーターに追加していただくプランです。KIZUNA Works の上位版のプラグイン「KIZUNA Pro プラグイン」をすべてお使いいただけます。アプリをまたぐ作業もプラグインの連携も自動化する「KIZUNAブリッジ for kintone」をはじめ、今後リリースされる KIZUNA Pro プラグインも追加料金なしで順次ご利用いただけます。';

/** 今の年間サポーター（改定の前後で切り替わる） */
export const SUPPORTER_PLAN = PRICE_REVISION_LIVE ? CHOKO_PLAN : INDIVIDUAL_PLAN;

/** 年間サポーターの申込に使う planType（HP の申込フォーム → ライセンス GAS） */
export const SUPPORTER_PLAN_TYPE = PRICE_REVISION_LIVE ? 'chokotto' : 'individual';

export const yen = (n: number) => '¥' + n.toLocaleString('ja-JP');
