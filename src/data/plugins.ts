// Single source of truth for kintone plugins.
// Add a new entry here and the plugins index grid, supporter form, and JSON-LD update automatically.

import type { PluginCategory } from './pluginCategories';

export type PluginStatus = 'available' | 'coming-soon';

export interface Plugin {
  /** Plugin ID matching GAS license master (e.g., 'field-styler'). */
  id: string;
  /**
   * The 32-char plugin ID kintone assigns, derived deterministically from the
   * plugin's `private.ppk` and fixed for the life of the plugin. Emitted into
   * `versions.json` so the KW Plugin Updater browser extension can match the
   * plugins installed in a kintone environment against our catalogue.
   *
   * Held here as static data on purpose: the ppk files live in the untracked
   * `SECRET/` directory, so deriving this at build time would fail in CI.
   * Regenerate with the snippet in the extension's design doc (§9.1).
   */
  pluginId?: string;
  /** Display name shown on the grid card heading. */
  name: string;
  /**
   * Value sent in the supporter application form's `pluginName` field
   * (and shown as the select option label). GAS maps this back to `id`.
   */
  formName: string;
  /** English/sub heading shown under `name` on the grid card. */
  subtitle: string;
  /** URL slug. Page lives at `/plugins/<slug>/`. */
  slug: string;
  /** Short description shown on the grid card. */
  description: string;
  /**
   * Purpose categories, 1-3 of them. List the plugin's main purpose first; the
   * order is authoring intent only, since every chip renders identically in its
   * own category colour. All of them are matched by the filter bar on /plugins/.
   * See `pluginCategories.ts` for the list and the assignment rule.
   */
  categories: [PluginCategory, ...PluginCategory[]];
  /** Card image (absolute path under /public). */
  image: string;
  /** Optional WebP version of the card image; when set the grid serves it via <picture> (PNG stays the fallback). */
  imageWebp?: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  status: PluginStatus;
  /**
   * Distribution tier. 'standard' (default) = 無料の「ちょこっとプラグイン」。
   * 'premium' = プレミアムプラグイン（単品販売なし／プレミアム年間サポーターに含む）。
   * Premium plugins live in the separate `premiumPlugins` array so existing
   * consumers of `plugins` (homepage showcase, supporter individual select, etc.)
   * are unaffected.
   */
  tier?: 'standard' | 'premium';
  /** Numeric price in JPY for the free badge row. Omit for coming-soon / premium. */
  price?: number;
  /**
   * Short, punchy description for the homepage compact showcase card.
   * Keep to ~50–80 Japanese characters; avoid SEO keyword stuffing.
   */
  cardDescription: string;
  /**
   * Problem statement title shown in bold on the 課題リスト.
   * Phrase as the user's pain (not the solution).
   */
  problemTitle: string;
  /** Problem detail rendered after the em dash on the same item. */
  problemDesc: string;
  /**
   * Picks the entry for the homepage 課題セクション, which shows representative
   * pains only — the full set for every product lives on /plugins/problems/, so
   * that section stops growing with the lineup (it had reached 53 items / 27
   * rows before the split).
   *
   * Keep it at ~9 entries, three per filter-bar group (入力・制御／画面／
   * データ・運用) so the grid reads across all three, and prefer ちょこっと
   * products: the section closes with 「すべて無料のプラグインで解決できます」.
   */
  problemFeatured?: boolean;
  /**
   * Public release date in ISO format (YYYY-MM-DD). Used as the tiebreaker for
   * /plugins/ranking/ when install counts are equal — older releases rank higher.
   * Should match the `pubDate` of the corresponding `plugin-*-release.md` news entry.
   */
  releaseDate?: string;
  /**
   * Plugin version whose feature set `description` / `cardDescription` (and the
   * product page hero copy) already describe. `scripts/check-plugin-summaries.mjs`
   * compares its major.minor with `softwareVersion` in the product page JSON-LD and
   * reports a mismatch, so a feature-adding release cannot ship with a stale summary.
   * Bump it (only) after rewriting the summaries. Patch releases do not need a bump.
   */
  summaryVersion?: string;
}

export const plugins: Plugin[] = [
  {
    id: 'kw-field-styler',
    pluginId: 'ipchbdojeajjialmgeebicbdnbfecljh',
    name: 'フィールドスタイラー for kintone',
    formName: 'フィールドスタイラー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'field-styler',
    categories: ['装飾・配色', '表示・編集制御'],
    description:
      '背景色・文字色・フォント・フィールド幅・条件付きスタイル・入力制御など全10機能を、JavaScriptなしのノーコードで設定できるプラグイン。サブテーブル（明細）内のフィールドにも対応し、TODAY基準の日付やステータスなど最大10件の条件で、重要な値を自動で目立たせます。',
    image: '/images/field-styler-banner.png',
    imageWebp: '/images/field-styler-banner.webp',
    imageAlt:
      'フィールドスタイラー for kintone バナー — kintoneのフィールドを見やすく、わかりやすく',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '背景色・文字色・条件付きスタイルなど10機能をノーコード設定。サブテーブル（明細）内のフィールドにも対応。',
    problemTitle: 'フィールドの色分けや条件付き書式',
    problemDesc: 'JavaScript なしでノーコードに実現したい',
    problemFeatured: true,
    releaseDate: '2026-04-16',
    summaryVersion: '2.3.1',
  },
  {
    id: 'kw-conditional-numbering',
    pluginId: 'fjahacomgeimpbmoaophfgmhielmfblp',
    name: '条件分岐自動採番 for kintone',
    formName: '条件分岐自動採番 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'kw-conditional-numbering',
    categories: ['自動入力', '一括処理', '入力チェック'],
    description:
      '部署・担当者・ステータスなどフィールドの値に応じて、採番ルールを自動で切り替えるプラグイン。1つのアプリで最大3フィールドを同時採番でき、18種類の書式・条件別の連番管理、CSVインポート後の一括採番、重複した番号の検出と振り直しにも対応します。',
    image: '/images/conditional-numbering-banner.png',
    imageAlt:
      '条件分岐自動採番プラグイン — フィールドの条件に応じて採番ルールを自動切替',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '部署・担当者・ステータス等の条件に応じて採番ルールを自動切替。最大3フィールドの同時採番・CSV一括採番・重複番号の振り直しに対応。',
    problemTitle: '採番ルールを条件で自動切替',
    problemDesc: 'CSVインポート後の一括採番にも対応したい',
    releaseDate: '2026-04-18',
    summaryVersion: '2.1.1',
  },
  {
    id: 'kw-form-deco',
    pluginId: 'mjilkibkkpekdmdoebgbnailkkphaaeo',
    name: 'FormDeco for kintone',
    formName: 'FormDeco for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'form-deco',
    categories: ['装飾・配色'],
    description:
      'レコード詳細画面の罫線（区切り線）スタイルと、スペースフィールドの装飾（背景色・テキスト・画像）をノーコードで設定するプラグイン。フォーム上の項目の区切りや見出しを分かりやすく整え、入力画面の見た目と使いやすさを高めます。',
    image: '/images/form-deco-banner.png',
    imageAlt:
      'FormDecoプラグイン — 罫線とスペースフィールドの装飾サンプル',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード詳細画面の罫線とスペースフィールドの装飾をノーコードでカスタマイズ。',
    problemTitle: 'レコード詳細画面の見た目を整えたい',
    problemDesc: '罫線やスペース要素を JavaScript なしで装飾したい',
    releaseDate: '2026-04-18',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-lookup-suggest',
    pluginId: 'lepnkidknipkkicliackimcjphfnicaj',
    name: 'ルックアップサジェスト for kintone',
    formName: 'ルックアップサジェスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'lookup-suggest',
    categories: ['自動入力'],
    description:
      'ルックアップに、入力中の候補をその場で表示するライブサジェスト機能を追加するプラグイン。別画面に切り替える手間がなくなり、複数フィールドの横断検索で同名顧客の取り違えも防げます。「ABC-123」のように品番を途中まで入れた状態でも絞り込めます。候補は入力欄直下かスペースに表示。サブテーブル内・スマホ対応。',
    image: '/images/lookup-suggest-banner.png',
    imageAlt:
      'ルックアップサジェストプラグイン — 入力中に候補リストを表示し、画面遷移なしで取得完結',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'ルックアップへの入力中に候補を表示。画面遷移なしで取得まで完結。品番を途中まで入れた状態でも絞り込める。サブテーブル内・スマホ対応、フォーム編集不要。',
    problemTitle: 'ルックアップ入力を高速化',
    problemDesc: '入力中に候補表示でクリック数を減らしたい',
    problemFeatured: true,
    releaseDate: '2026-04-18',
    summaryVersion: '2.3.0',
  },
  {
    id: 'kw-quick-search',
    pluginId: 'pijepbcgdjdeaidfoompdabcfnpcapnl',
    name: 'クイックサーチ for kintone',
    formName: 'クイックサーチ for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-search',
    categories: ['検索・閲覧'],
    description:
      '一覧画面のフィルター/ソートアイコン横にインライン検索バーを追加するプラグイン。AND/OR切替・複数キーワードで複数フィールドを横断検索でき、本日・今週・今月などの期間ボタンや日付範囲指定での絞り込み（任意設定）にも対応します。',
    image: '/images/quick-search-banner.png',
    imageAlt:
      'クイックサーチプラグイン — 一覧画面のツールバー横にインライン検索バーを設置し、複数キーワードでレコードを素早く絞り込み',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧画面にインライン検索バーを設置。AND/OR切替・複数キーワードの横断検索と、本日・今週・今月などの期間絞り込みに対応。',
    problemTitle: '複数フィールドを横断検索',
    problemDesc: '標準の絞り込みパネルでは操作が面倒',
    releaseDate: '2026-05-03',
    summaryVersion: '1.2.3',
  },
  {
    id: 'kw-file-icon-marker',
    pluginId: 'klagkokfidjdnmkigkflfimijfjnfhja',
    name: '添付ファイルアイコン表示 for kintone',
    formName: '添付ファイルアイコン表示 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'file-icon-marker',
    categories: ['検索・閲覧', '一覧表示'],
    description:
      '一覧画面で添付ファイルの有無・種別・件数をアイコンで可視化するプラグイン。PDF/Excel/画像など28種類の拡張子別アイコンと件数バッジを表示し、レコード詳細を開かずに、どんなファイルが付いているかをひと目で把握できます。',
    image: '/images/file-icon-marker-banner.png',
    imageAlt:
      '添付ファイルアイコン表示プラグイン — 一覧画面に拡張子別アイコンと件数バッジを表示し、添付ファイルの有無と種類をひと目で判別',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧画面で添付ファイルの有無・種別・件数をアイコンで可視化。28種の拡張子別アイコン＋件数バッジ。',
    problemTitle: '添付ファイルの中身が一覧で分からない',
    problemDesc: '詳細画面を毎回開いて確認している',
    releaseDate: '2026-05-03',
    summaryVersion: '1.0.4',
  },
  {
    id: 'kw-quick-side-view',
    pluginId: 'bjbbhhmdogglkcijefmglmkdjmajlglb',
    name: 'クイックサイドビュー for kintone',
    formName: 'クイックサイドビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-side-view',
    categories: ['検索・閲覧', '一覧表示'],
    description:
      '一覧画面で行をクリックすると右側にサイドバーが開き、レコードの詳細を表示するプラグイン。詳細画面へ遷移せず一覧のビューを保ったまま、最大5件を並べて閲覧・編集でき、レコード同士の比較や並行作業がスムーズになります。',
    image: '/images/quick-side-view-banner.png',
    imageAlt:
      'クイックサイドビュープラグイン — 一覧画面で行をクリックすると右側サイドバーが開き、最大5件のレコードを並べて閲覧・編集',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧で行クリック→右側サイドバーで最大5件のレコードを並列表示・編集。詳細遷移なしで比較・並行編集。',
    problemTitle: '詳細画面と一覧の往復が多い',
    problemDesc: '内容確認のたびに開いて戻るのが面倒・複数レコードの比較もしづらい',
    releaseDate: '2026-04-18',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-record-lock',
    pluginId: 'maeelgojcoehjhfflbghhfkfbgkaljmb',
    name: 'レコードロック for kintone',
    formName: 'レコードロック for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'record-lock',
    categories: ['表示・編集制御'],
    description:
      'ステータス・日付・特定フィールドの値などの複数条件（AND/OR）を満たすと、レコードを自動でロックして編集を制限するプラグイン。除外ユーザーも設定でき、承認後・受注後のレコードを後から書き換えられないように保護できます。',
    image: '/images/record-lock-banner.png',
    imageAlt:
      'レコードロックプラグイン — 条件を満たすkintoneレコードを自動ロックして編集を制限',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '条件を満たすレコードを自動ロック。ステータス・期日切れ・特定値などで編集制限。管理者は除外設定で編集可能。',
    problemTitle: '受注済みレコードの編集を防ぎたい',
    problemDesc: 'ステータスや日付などの条件で自動ロック、管理者のみ編集できるようにしたい',
    releaseDate: '2026-05-16',
    summaryVersion: '1.0.4',
  },
  {
    id: 'kw-field-comment',
    pluginId: 'oenlpfgidpcoicjkfpoehcamkdoijjkc',
    name: 'フィールドコメント for kintone',
    formName: 'フィールドコメント for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'field-comment',
    categories: ['入力チェック', '画面レイアウト'],
    description:
      'フィールド名の横にヘルプアイコンや常時表示のコメントを追加するプラグイン。アイコン＋ホバー／アイコン＋クリック／常時表示の3モードから選べ、詳細だけでなく編集・新規作成画面でも表示。入力ルールをその場で伝えて入力ミスや問い合わせを減らします。',
    image: '/images/field-comment-banner.png',
    imageAlt:
      'フィールドコメントプラグイン — kintoneのフィールド名横にヘルプアイコンや常時表示コメントを追加。ホバー・クリック・常時表示の3モード対応',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'フィールド名横にヘルプアイコンや常時表示コメントを追加。3モード（ホバー/クリック/常時）で、編集・新規作成画面でもルールを伝達。',
    problemTitle: 'フィールドに入力ルールを表示したい',
    problemDesc: 'フォーム上のラベルだけでは伝わらないヘルプや注意書きを簡単に出したい',
    releaseDate: '2026-05-18',
    summaryVersion: '1.1.2',
  },
  {
    id: 'kw-theme-styler',
    pluginId: 'plgngjmfdelienlgcbmmhblipieglacn',
    name: 'テーマスタイラー for kintone',
    formName: 'テーマスタイラー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'theme-styler',
    categories: ['装飾・配色', '一覧表示'],
    description:
      'アプリのテーマカラーをヘッダー・行・罫線・フォーム背景まで一括で着色。色はアプリ名／レコード詳細画面／明細ヘッダーと場所ごとに指定でき、変わる場所は設定画面のプレビューで確認できます。タイトル帯には関連アプリ・社内ポータル・外部サイトへのリンクを集約。',
    image: '/images/theme-styler-banner.png',
    imageAlt:
      'テーマスタイラープラグイン — kintone アプリにテーマカラーと、関連アプリ・社内ポータル・外部サイトへのクイックリンクをまとめて配置',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'アプリ上部に関連アプリ・社内ポータル・外部サイトへのクイックリンクを集約。テーマ色は1色で統一、アプリ名・詳細画面・明細ヘッダーは場所ごとに指定も。',
    problemTitle: '関連アプリ・マニュアル・外部サイトへの行き来が面倒',
    problemDesc: 'タイトル帯にテキストとボタンで最大6個のリンクを集約してワンクリック遷移できるようにしたい',
    releaseDate: '2026-05-22',
    summaryVersion: '1.2.0',
  },
  {
    id: 'kw-address-assist',
    pluginId: 'lipbgmdjanokobonljglfahpfgfodcop',
    name: '住所アシスト for kintone',
    formName: '住所アシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'address-assist',
    categories: ['自動入力'],
    description:
      '郵便番号から住所、住所から郵便番号を双方向で自動入力し、Googleマップのプレビューをレコード詳細に埋め込み、住所のワンクリックコピーまで行うプラグイン。請求先・配送先など複数の住所セットやサブテーブル（明細）の行ごとの入力にも対応します。',
    image: '/images/address-assist-banner.png',
    imageAlt:
      '住所アシスト for kintone プラグイン — 郵便番号入力で住所自動入力＋レコード詳細画面に Google マップを直接プレビュー表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '郵便番号 ⇔ 住所を双方向で自動入力 ＋ レコード詳細画面に地図プレビュー直接表示 ＋ ワンクリックコピー。複数の住所セット・サブテーブル対応。',
    problemTitle: '住所入力と地図確認の往復が面倒',
    problemDesc: '郵便番号入力で住所を自動入力し、レコードを開いた瞬間に地図プレビューまで一気に見たい',
    releaseDate: '2026-05-23',
    summaryVersion: '1.2.1',
  },
  {
    id: 'kw-quick-history-view',
    pluginId: 'dpafdongccmbjebcdndfhdeeejhhiodg',
    name: 'クイック履歴ビュー for kintone',
    formName: 'クイック履歴ビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-history-view',
    categories: ['履歴・復元'],
    description:
      'レコード保存のたびに、いつ・誰が・どのフィールドを何から何に変えたかを自動で記録し、詳細画面に時系列の表形式で表示するプラグイン。記録対象のフィールド、1レコードあたりの保存件数の上限、表示の色・サイズも設定できます。',
    image: '/images/quick-history-view-banner.png',
    imageAlt:
      'クイック履歴ビュー for kintone プラグイン — レコードの変更前後をフィールド単位で自動記録し、詳細画面に時系列テーブルで表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード変更を自動でフィールド単位に記録し、詳細画面に表形式で時系列表示。記録対象フィールドや表示の色・サイズも設定可能。',
    problemTitle: 'いつ誰が何を変えたか分からない',
    problemDesc: 'レコードの変更前後を自動で記録し、詳細画面で時系列の変更履歴テーブルとして見たい',
    releaseDate: '2026-05-24',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-related-record-popup',
    pluginId: 'dailocfmjmnjmobgchjpefnjeaalkmdh',
    name: '関連レコードポップアップ表示 for kintone',
    formName: '関連レコードポップアップ表示 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'related-record-popup',
    categories: ['検索・閲覧', '一覧表示'],
    description:
      '一覧画面の各行に置いたアイコンにホバーするだけで、関連レコード一覧をポップアップ表示するプラグイン。詳細画面へ遷移せず関連情報をその場で確認でき、複数の関連一覧はタブで切り替え、件数が多い場合は自動でページネーションされます。',
    image: '/images/related-record-popup-banner.png',
    imageAlt:
      '関連レコードポップアップ表示 for kintone プラグイン — 一覧画面のアイコンにホバーすると関連レコード一覧をポップアップ表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧画面のアイコンにホバーするだけで関連レコードをポップアップ表示。タブ切替・ページネーション対応。',
    problemTitle: '関連レコード確認のたびに詳細を開きたくない',
    problemDesc: '一覧画面のままホバーで関連レコードを素早く確認したい',
    releaseDate: '2026-05-29',
    summaryVersion: '1.0.4',
  },
  {
    id: 'kw-summary-bar',
    pluginId: 'hinppcebblkimejognfkibmkgpgnfkdc',
    name: '集計サマリーバー for kintone',
    formName: '集計サマリーバー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'summary-bar',
    categories: ['集計・計算', '一覧表示'],
    description:
      '一覧画面のヘッダーに、合計・平均・最大・最小・件数の集計カードを並べて表示するプラグイン。絞り込みに連動して即時に再集計し、グラフ画面に移動せず数字を確認できます。カードごとの条件集計（相対期間・ユーザー／組織指定も可）や、集計値による条件付きの色分けにも対応。',
    image: '/images/summary-bar-banner.png',
    imageAlt:
      '集計サマリーバー for kintone プラグイン — レコード一覧のヘッダーに合計・平均・件数などの集計カードを並べて表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧ヘッダーに合計・平均・件数などの集計カードを表示。絞り込み連動で即時再集計、カードごとの絞り込み集計・条件付き色分け・段組み対応。',
    problemTitle: '絞り込んだ一覧の合計や件数をすぐ見たい',
    problemDesc: 'グラフ画面に移動せず、一覧の上でそのまま集計を確認したい',
    problemFeatured: true,
    releaseDate: '2026-05-30',
    summaryVersion: '2.2.0',
  },
  {
    id: 'kw-csv-export',
    pluginId: 'gpaobgkbgmcminhdgobmkbagigjaniac',
    name: 'かんたんCSV出力 for kintone',
    formName: 'かんたんCSV出力 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'csv-export',
    categories: ['出力・帳票'],
    description:
      '絞り込み結果を用途別テンプレート（列・並び順・ヘッダー名・文字コード・絞り込み条件）でワンクリックCSV出力。1テンプレート最大500列・サブテーブル明細の行展開に対応し、先頭行の項目名は出力の有無を選択可。Shift-JIS/UTF-8でExcelの文字化けも防ぎます。',
    image: '/images/csv-export-banner.png',
    imageAlt:
      'かんたんCSV出力 for kintone プラグイン — レコード一覧の絞り込み結果を用途別テンプレートでワンクリックCSV出力',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧の絞り込み結果を用途別テンプレートでワンクリックCSV出力。列・ヘッダー名・文字コード・絞り込み条件を保存、項目名行のオン/オフも選べます。',
    problemTitle: 'いつものフォーマットでCSVを書き出したい',
    problemDesc: '毎回フィールドを選び直さず、絞り込んだ結果をテンプレートで一発出力したい',
    problemFeatured: true,
    releaseDate: '2026-06-03',
    summaryVersion: '1.4.0',
  },
  {
    id: 'kw-quick-tab',
    pluginId: 'igbhhoaagcgmedbjefcofckpgdgdjiac',
    name: 'クイックタブ for kintone',
    formName: 'クイックタブ for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-tab',
    categories: ['画面レイアウト'],
    description:
      '項目数の多いレコードの詳細・作成・編集画面を、フォーム上のスペース要素を境界にしてタブへ自動分割するプラグイン。フィールドの手動割当は不要で、全項目を見る「すべて」タブ、必須エラー時のタブ自動追従、タブバーの固定にも対応します。',
    image: '/images/quick-tab-banner.png',
    imageAlt:
      'クイックタブ for kintone プラグイン — レコード画面のフィールドをスペース要素を境界にタブへ自動分割して整理',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード詳細/編集のフィールドをスペース境界でタブに自動整理。「すべて」タブ・必須エラー追従・スクロール固定・スタイル20種。',
    problemTitle: '項目が多くてレコード画面のスクロールが長い',
    problemDesc: 'フィールドを手動で割り当てず、タブでスッキリ整理して目的の項目に素早くたどり着きたい',
    releaseDate: '2026-06-05',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-file-preview',
    pluginId: 'bdlbnngfgnimdkemgabmlnngplbcegoa',
    name: '添付ファイルプレビュー for kintone',
    formName: '添付ファイルプレビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'file-preview',
    categories: ['検索・閲覧'],
    description:
      '添付された画像・PDF・Excel・Word・PowerPoint・テキストを、ダウンロードや画面遷移なしで、その場のフルスクリーンモーダルでプレビューするプラグイン。サブテーブル内や関連レコード一覧に表示した参照先アプリの添付にも対応し、同じ欄の複数ファイルを連続で閲覧できます。パスワード付きのPDF・Excel・Wordもブラウザ内で復号して表示でき、ExcelはExcel風グリッドの高精細表示にも切り替えられます。',
    image: '/images/file-preview-banner.png',
    imageAlt:
      '添付ファイルプレビュー for kintone プラグイン — 添付ファイル名のクリックで画像・PDF・Excel・Word・テキストを全画面モーダルでプレビュー',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '添付の画像・PDF・Excel・Word・PowerPoint・テキストを、ファイル名クリックでその場プレビュー。サブテーブル内・関連レコード一覧・パスワード付き・Excel高精細表示に対応。',
    problemTitle: '添付ファイルの中身を見るのにダウンロードや画面遷移が面倒',
    problemDesc: '一覧・詳細・関連レコード一覧のファイル名クリックで、その場のモーダルで素早く中身を確認したい',
    releaseDate: '2026-06-05',
    summaryVersion: '2.3.0',
  },
  {
    id: 'kw-quick-toc',
    pluginId: 'geilcniligalcmgbobkjebffkdgjcjmh',
    name: 'クイック目次 for kintone',
    formName: 'クイック目次 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-toc',
    categories: ['画面レイアウト'],
    description:
      'レコードの詳細・編集・新規作成画面の左側に、セクション単位の目次サイドメニューを常時表示するプラグイン。項目クリックで該当セクションへ移動でき、フォームのスペースパーツをジャンプ先や見出しとして使える設定、ステータスの色分けバッジ、ヘッダー追従にも対応します。',
    image: '/images/quick-toc-banner.png',
    imageAlt:
      'クイック目次 for kintone プラグイン — レコード画面の左側にセクション目次を常時表示し、項目クリックで該当セクションへジャンプ',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード画面の左に目次を常時表示。項目クリックでジャンプ、スペースパーツを見出しに、ステータスバッジ・配色テーマ対応。編集・新規でも動作。',
    problemTitle: '縦に長いレコードのスクロールが大変',
    problemDesc: '左の目次から目的のセクションへワンクリックで移動したい',
    releaseDate: '2026-06-05',
    summaryVersion: '1.2.1',
  },
  {
    id: 'kw-list-styler',
    pluginId: 'mlcnodejgponlkpfmmgpkfiagpkfhgij',
    name: '一覧スタイラー for kintone',
    formName: '一覧スタイラー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'list-styler',
    categories: ['一覧表示'],
    description:
      'テーブル（サブテーブル）の明細を一覧の行として全レコード分まとめて表示できるプラグイン。横長の一覧では左端のキー列を固定（0〜3列）し、ゼブラ・行番号・行ホバーで見やすく整え、日付（TODAY基準）・選択肢・ステータスなどの条件で行の背景色・文字色・太字も変更できます。',
    image: '/images/list-styler-banner.png',
    imageAlt:
      '一覧スタイラー for kintone プラグイン — 横長のレコード一覧で左端の列を固定し、ゼブラ・行番号・条件付き行色分けで見やすく整える',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'テーブルの明細を一覧の行としてまとめて表示。左端列の固定・ゼブラ2色・行番号・条件付き行色分け（TODAY/ステータス対応）で横長一覧も見やすく。',
    problemTitle: '横長の一覧が見づらい',
    problemDesc: '横スクロールでキー列が消える・行を見分けづらい・状態や期限を一目で把握したい',
    problemFeatured: true,
    releaseDate: '2026-06-07',
    summaryVersion: '1.1.0',
  },
  {
    id: 'kw-input-assist',
    pluginId: 'gpchcdgbjjbonekcognaeieeabfndeon',
    name: '入力アシスト for kintone',
    formName: '入力アシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'input-assist',
    categories: ['自動入力', '入力チェック'],
    description:
      '過去に入力した値やほかのアプリの値を候補表示して選ぶだけで入力できるプラグイン。サブテーブル内も対応し、よく使う順に並べて表示。入力順を色で誘導する入力順ガイド、保存を止めない未入力チェック、入力中の重複チェックで入力の手間とミスを減らします。',
    image: '/images/input-assist-banner.png',
    imageAlt:
      '入力アシスト for kintone プラグイン — 過去の入力値やほかのアプリの値を候補表示して入力でき、入力順ガイド・未入力チェック・入力中の重複チェックで入力の手間とミスを防ぐ',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '過去の入力値やほかのアプリの値を候補表示して入力（サブテーブル内も対応）。入力順ガイド・未入力チェック・重複チェックも。',
    problemTitle: '同じ値の打ち直しと入力漏れで手戻りが起きる',
    problemDesc: '過去に入れた値を毎回手入力して表記もばらつく・項目が多くどこから入れるか迷う・入力漏れや重複に保存後まで気づけない',
    releaseDate: '2026-06-08',
    summaryVersion: '2.0.1',
  },
  {
    id: 'kw-conditional-form',
    pluginId: 'njedbadpjojklmcimokndljdeilbpepg',
    name: '条件分岐フォーム for kintone',
    formName: '条件分岐フォーム for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'conditional-form',
    categories: ['表示・編集制御', '自動入力'],
    description:
      '区分・ステータス・入力値や対象ユーザーの条件で、フィールドの表示/非表示・必須化・読み取り専用・自動入力・選択肢の絞り込みを切り替え。自動入力はほかの項目の値のコピーにも対応。保存・承認・削除の前に止める・確認することもできます。',
    image: '/images/conditional-form-banner.png',
    imageAlt:
      '条件分岐フォーム for kintone プラグイン — 区分・ステータス・入力値の条件でフィールドを表示/非表示・必須化・読み取り専用・自動入力・選択肢の絞り込みに切り替える動的フォーム制御',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '条件でフィールドを表示/非表示・必須化・読み取り専用・自動入力・選択肢の絞り込みに制御。自動入力はほかの項目の値のコピーにも対応。保存・承認・削除の前に止める・確認することもできます。',
    problemTitle: '1アプリで入力項目を出し分けたい',
    problemDesc: '区分やステータスで見せる項目・必須・入れる値・選べる選択肢を変えたいが、標準ではできずアプリを分けがち',
    releaseDate: '2026-06-09',
    summaryVersion: '2.4.0',
  },
  {
    id: 'kw-sheet-edit',
    pluginId: 'knamdadkimkldneeklpabmlgeehmgpde',
    name: 'シート編集 for kintone',
    formName: 'シート編集 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'sheet-edit',
    categories: ['一括処理', '一覧表示', '出力・帳票'],
    description:
      '一覧（カスタマイズビュー）を表計算風グリッドに置き換え、表示中フィールドをその場で直接編集・保存できます。サブテーブル（明細）の行展開・行ごとの編集にも対応。コピペ・範囲一括編集・連番オートフィル・競合検知・Excel出力まで一覧上で完結。',
    image: '/images/sheet-edit-banner.png',
    imageAlt:
      'シート編集 for kintone プラグイン — レコード一覧（カスタマイズビュー）を表計算風グリッドに置き換え、表示中フィールドをその場で直接編集・保存できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧を表計算風グリッドに置き換え、その場で直接編集・保存。サブテーブル明細の展開編集・範囲一括編集・連番オートフィル・Excel出力まで一覧上で完結。',
    problemTitle: '一覧のまま複数レコードを直接編集したい',
    problemDesc: '1件ずつ詳細画面を開く往復が多い・Excel 感覚で一覧上のまま連続して値を更新したい・連番や日付を1件ずつ手で入れている',
    releaseDate: '2026-06-12',
    summaryVersion: '1.5.0',
  },
  {
    id: 'kw-sticky-board',
    pluginId: 'cmbgkloakciopfbbgnbelnkcphhbibbb',
    name: '付箋ボード for kintone',
    formName: '付箋ボード for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'sticky-board',
    categories: ['情報共有', '一覧表示'],
    description:
      'レコード詳細にカテゴリ付きの付箋メモを自由な位置で貼り付け、一覧の上部でカテゴリ別の未対応件数を集計表示するプラグイン。付箋から対象レコードへジャンプやその場で対応済みにでき、通知やコメントでは埋もれる申し送りを見える化します。',
    image: '/images/sticky-board-banner.png',
    imageAlt:
      '付箋ボード for kintone プラグイン — レコード詳細にカテゴリ付き付箋を自由配置し、一覧上部でカテゴリ別の未対応件数を集計表示',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード詳細にカテゴリ付き付箋を自由配置、一覧上部で未対応件数を集計表示。付箋からレコードへジャンプ・その場で対応済み。個人付箋は作成者のみ秘匿。「通知とコメントの中間」。',
    problemTitle: '申し送り・気づきが埋もれず、一覧で気づきたい',
    problemDesc: 'コメントは埋もれて一覧では気づけない・どのレコードのどの未対応が残っているか俯瞰できない',
    releaseDate: '2026-06-14',
    summaryVersion: '1.0.2',
  },
  {
    id: 'kw-mail-assist',
    pluginId: 'fkdedmcmckedbglcibhckofcmkfgjfnn',
    name: 'メールアシスト for kintone',
    formName: 'メールアシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'mail-assist',
    categories: ['通知・メール'],
    description:
      'レコードの値（会社名・担当者名・メールアドレスなど）を差し込んで件名・本文・宛先を組み立て、ワンクリックでメーラー（既定/Gmail/Outlook/Yahoo!）を起動するプラグイン。詳細から個別に、一覧の絞り込み結果からBCCで一斉送信もできます。',
    image: '/images/mail-assist-banner.png',
    imageAlt:
      'メールアシスト for kintone プラグイン — レコードの値を差し込んで件名・本文・宛先を組み立て、ワンクリックでメーラーを起動。詳細から個別に、一覧から BCC 一斉に送信',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード値を差し込んで件名・本文・宛先を組み立て、ワンクリックでメーラー起動。詳細＝個別／一覧＝BCC一斉。条件でテンプレ出し分け・送信履歴も記録。',
    problemTitle: 'レコードから定型メールを毎回手作業で作っている',
    problemDesc: '宛先・会社名・担当者名をメーラーにコピペし、定型文を打ち直している・同じ案内を全員に送るのが手間',
    releaseDate: '2026-06-26',
    summaryVersion: '1.1.3',
  },
  {
    id: 'kw-comment-control',
    pluginId: 'lhgfciapegnoldcgglceadhllljckbmp',
    name: 'コメントコントロール for kintone',
    formName: 'コメントコントロール for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'comment-control',
    categories: ['情報共有', '一覧表示'],
    description:
      'レコード詳細・編集でコメント／変更履歴サイドバーを閉じた状態で開いて画面を広く使い、一覧では各レコードのコメント件数を色分けバッジで表示するプラグイン。バッジのホバーでコメントを全文プレビュー（ページ送り対応）でき、自分宛メンションの強調表示も任意で有効にできます。',
    image: '/images/comment-control-banner.png',
    imageAlt:
      'コメントコントロール for kintone プラグイン — 詳細・編集でコメントサイドバーを閉じて開き、一覧ではコメント件数バッジを色分け。自分宛メンションを強調し、ホバーでコメントを全文プレビュー',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '詳細・編集でコメント欄を閉じて開き画面を広く。一覧は件数バッジを色分けし、ホバーで全文プレビュー（ページ送り対応）。自分宛メンションの強調は任意設定。',
    problemTitle: 'コメント欄が毎回開いて画面が狭い・自分宛の見落としが起きる',
    problemDesc: '詳細を開くたびコメント欄が場所を取り、一覧ではどれにコメントが付いているか・自分宛があるか分からず毎回開いて確認している',
    releaseDate: '2026-06-27',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-user-autofill',
    pluginId: 'hbehnimgcahjolboiddemedifnkhmnla',
    name: 'ユーザーオートフィル for kintone',
    formName: 'ユーザーオートフィル for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'user-autofill',
    categories: ['自動入力'],
    description:
      'ユーザー選択フィールドで選んだ人（新規作成時は自分）の組織・グループ・役職・メール・社員番号などを対応フィールドへ自動転記するプラグイン。組織・グループは組織選択／グループ選択フィールドへ選択値でセット。さらにユーザー情報をスペースにプロフィールカード／承認欄の捺印として表示できます。',
    image: '/images/user-autofill-banner.png',
    imageAlt:
      'ユーザーオートフィル for kintone プラグイン — ユーザー選択で選んだ人の組織・役職・社員番号などを自動転記し、プロフィールカードや承認欄の捺印として表示',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'ユーザー選択で選んだ人の組織・役職・社員番号などを自動転記（組織/グループは選択値セット）。プロフィールカードや承認欄の捺印表示も。',
    problemTitle: '担当者の部署・連絡先を毎回手入力・承認欄を手書きしている',
    problemDesc: '日報や申請で報告者＝自分の部署・役職・連絡先を毎回調べて入力し、組織は文字列でばらつき、承認欄は手書きやハンコで運用している',
    releaseDate: '2026-06-29',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-bulk-update',
    pluginId: 'fbinihdnlbcjllmcpbbgapompicbjenc',
    name: 'かんたん一括更新 for kintone',
    formName: 'かんたん一括更新 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'bulk-update',
    categories: ['一括処理', '履歴・復元'],
    description:
      '標準のレコード一覧で絞り込んだ結果に、フィールドを1つ選んで値を一括更新・一括クリアできるプラグイン。数値は加算・減算にも対応し、クイックサーチ等の絞り込みに連動。実行直後のUndoに加え、変更前後を保管アプリに記録して設定画面の履歴からいつでも元に戻せます。',
    image: '/images/bulk-update-banner.png',
    imageAlt:
      'かんたん一括更新 for kintone プラグイン — 標準のレコード一覧で絞り込んだ結果にフィールドを1つ選んで値を一括更新・一括クリア。数値は加算・減算、実行直後のUndoと履歴からの復元に対応',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '絞り込んだ一覧の1フィールドをまとめて更新・クリア。数値は加算/減算、クイックサーチ連動・1万件超対応。Undoと履歴からの復元付き。',
    problemTitle: '複数レコードの同じ項目を1件ずつ詳細画面で直している',
    problemDesc: 'ステータス・担当者・金額などを絞り込んだ何十件にまとめて反映したいのに、1件ずつ開いて編集・保存を繰り返していて時間がかかる',
    problemFeatured: true,
    releaseDate: '2026-07-03',
    summaryVersion: '1.0.2',
  },
  {
    id: 'kw-excel-paste',
    pluginId: 'ceoonbcoilajpkghgpimcjhfdpljldbg',
    name: 'エクセル一括貼り付け for kintone',
    formName: 'エクセル一括貼り付け for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'excel-paste',
    categories: ['一括処理', '自動入力'],
    description:
      'Excel等の表データを貼り付けるだけで一括入力できるプラグイン。作成・編集画面ではサブテーブルへ複数行をまとめて流し込み（複数のテーブルもテーブルごとの設定で対応）、一覧画面では貼り付けだけで複数レコードを一括作成。プレビューで列の対応を確認でき、見出し行を含めれば自動マッピング。',
    image: '/images/excel-paste-banner.png',
    imageAlt:
      'エクセル一括貼り付け for kintone プラグイン — Excelの表データを貼り付けてサブテーブルへ複数行、一覧から複数レコードを一括入力。プレビューで列とフィールドを対応、見出し行は自動マッピング',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'Excelの表を貼り付けるだけで一括入力。複数のサブテーブルへ複数行、一覧から複数レコードをまとめて作成。プレビュー＋見出し自動マッピング。',
    problemTitle: 'Excelの表をkintoneに1行ずつ手入力している',
    problemDesc: '見積・注文などの明細をExcelで先に作ってからkintoneへ転記していて、サブテーブルや複数レコードの入力に毎回手間がかかる',
    releaseDate: '2026-07-05',
    summaryVersion: '1.1.2',
  },
  {
    id: 'kw-ambiguous-match',
    pluginId: 'cibfmffpmecmpcfhijdcbngejhgohgfn',
    name: 'あいまい照合 for kintone',
    formName: 'あいまい照合 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'ambiguous-match',
    categories: ['入力チェック'],
    description:
      '会社名・顧客名の入力中に、表記ゆれ（株式会社⇔（株）⇔㈱・全角半角・旧字体など）を吸収して似た既存レコードをその場でフローティング表示するプラグイン。標準の「値の重複を禁止する」（完全一致）では気づけない二重登録を保存前に確認でき、参照項目の併記・候補クリックで別タブ表示にも対応。',
    image: '/images/ambiguous-match-banner.png',
    imageAlt:
      'あいまい照合 for kintone プラグイン — 会社名の入力中に表記ゆれ（株式会社⇔（株）⇔㈱等）を吸収して類似する既存レコードをフィールド直下に表示し、二重登録を保存前に防ぐ',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '入力中に表記ゆれを吸収して似た既存レコードを表示。株式会社⇔（株）等の二重登録に保存前に気づける。',
    problemTitle: '同じ取引先が別表記で二重登録される',
    problemDesc: '「株式会社◯◯」と「◯◯（株）」のような表記ゆれで、標準の重複禁止（完全一致）では防げない重複登録が起きている',
    releaseDate: '2026-07-06',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-status-bulk-action',
    pluginId: 'blbeilamoocikkaogkjkmiodgbfejooh',
    name: 'ステータス一括実行 for kintone',
    formName: 'ステータス一括実行 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'status-bulk-action',
    categories: ['一括処理', '一覧表示'],
    description:
      'プロセス管理のステータス・作業者を、標準のレコード一覧からまとめて一括実行できるプラグイン。対象を現在ステータスごとにグループ分けしてアクションを選ぶだけで、まとめて次に進められます。次の作業者は遷移先の設定（選択／全員／作成者／フィールド指定など）に応じて自動判定。独自条件を満たさないレコードは事前に除外し、現在ステータスの滞留日数も一覧に色で可視化します。',
    image: '/images/status-bulk-action-banner.png',
    imageAlt:
      'ステータス一括実行 for kintone プラグイン — プロセス管理のステータス・作業者を標準のレコード一覧からまとめて一括実行。現在ステータスごとにグループ分けしてアクション選択、次の作業者は自動判定、滞留日数を色で可視化',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'プロセス管理のステータス・作業者を一覧からまとめて実行。現在ステータスごとにグループ分けしてアクション選択、作業者は自動判定、滞留日数を色で可視化。',
    problemTitle: '承認待ちのステータスを1件ずつ手作業で進めている',
    problemDesc: 'プロセス管理の承認・差し戻しを何十件も1レコードずつ開いて操作していて時間がかかる。承認待ちの放置にも気づきにくい',
    releaseDate: '2026-07-11',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-accordion-tab',
    pluginId: 'edjjkigdcdchnodnfpepngiacodgpkea',
    name: 'アコーディオンタブ for kintone',
    formName: 'アコーディオンタブ for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'accordion-tab',
    categories: ['画面レイアウト', '表示・編集制御'],
    description:
      'レコードの長いフォームを、スペース要素を見出しに自動でセクション分割してアコーディオン開閉。既定で折りたたみ必要な節だけ開いて入力。未入力・入力状況バッジ、スティッキー見出しに加え、セクションごとの閲覧制限（ユーザー・組織・グループ）・パスワード表示制御にも対応。',
    image: '/images/accordion-tab-banner.png',
    imageAlt:
      'アコーディオンタブ for kintone プラグイン — 長いレコードフォームをスペース要素を見出しに自動セクション分割してアコーディオン開閉。既定で折りたたみ、必要な節だけ開いて入力。未入力・入力状況バッジ、スティッキー見出し、スライド開閉に対応',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '長いフォームをスペース見出しで折りたたみ整理。必要な節だけ開いて入力でき、セクションごとの閲覧制限・パスワード表示制御にも対応。',
    problemTitle: 'フォームが縦に長く、目的の項目を探すのが大変',
    problemDesc: '項目数の多いアプリで、入力・確認したい箇所までスクロールで探すのに時間がかかり、フォーム全体の把握もしにくい',
    problemFeatured: true,
    releaseDate: '2026-07-13',
    summaryVersion: '2.0.2',
  },
  {
    id: 'kw-elapsed-assist',
    pluginId: 'bdgmcdbdcnapokflohnhnkonchflogam',
    name: '経過計算アシスト for kintone',
    formName: '経過計算アシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'elapsed-assist',
    categories: ['集計・計算', '自動入力'],
    description:
      '基準日フィールドから経過日数・経過年数・年齢・残日数・在籍期間（◯年◯ヶ月）など9パターンを自動計算するプラグイン。一覧・詳細を開くたびに「今日」時点の値を再計算して表示し、保存時には実フィールドへ書き込むので並び替え・絞り込み・集計にも使えます。',
    image: '/images/elapsed-assist-banner.png',
    imageAlt:
      '経過計算アシスト for kintone プラグイン — 基準日フィールドから経過日数・年齢・在籍期間などを自動計算し、一覧・詳細を開くたびに今日時点の値を表示、保存時に実フィールドへ書き込む',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '基準日から経過日数・年齢・在籍期間などを自動計算。開くたびに今日の値を再計算表示し、保存時に実フィールドへ書込。並び替え・集計にも使える。',
    problemTitle: '経過日数や年齢が、開いた日によって古いまま',
    problemDesc: '契約日や生年月日からの経過日数・年齢が、標準の計算では今日に追従せず古い値のまま。並び替えや集計にも使いたい',
    releaseDate: '2026-07-17',
    summaryVersion: '1.0.5',
  },
  {
    id: 'kw-reuse-control',
    pluginId: 'kkceikbkapbhdldeeabdnjejenelmdig',
    name: 'レコード再利用コントロール for kintone',
    formName: 'レコード再利用コントロール for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'reuse-control',
    categories: ['自動入力', '表示・編集制御'],
    description:
      'kintone の「レコードを再利用する」で、フィールドごと・サブテーブルの列ごとに『残す（コピーする）』項目を選べるプラグイン。設定した項目だけを引き継ぎ、それ以外は再利用画面を開くと同時に自動で空欄化。ルックアップの入れ替えや、空にした表の初期値クリアにも対応します。',
    image: '/images/reuse-control-banner.png',
    imageWebp: '/images/reuse-control-banner.webp',
    imageAlt:
      'レコード再利用コントロール for kintone プラグイン — 再利用時に「残す」項目だけを引き継ぎ、それ以外を自動で空欄化。フィールド単位・サブテーブルの列単位で選べる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '再利用で「残す」項目だけを引き継ぎ、あとは自動で空欄に。不要な項目を毎回手で消す手間をなくします。',
    problemTitle: '再利用のたびに不要な項目を手で消している',
    problemDesc: '似た案件をテンプレとして再利用したいのに、標準では全項目がコピーされ、要らない項目を毎回手作業で消している',
    releaseDate: '2026-07-20',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-record-recovery',
    pluginId: 'lmlcjppmjnjmedhohmldoaffiknahokl',
    name: '削除レコード復元 for kintone',
    formName: '削除レコード復元 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'record-recovery',
    categories: ['履歴・復元'],
    description:
      '削除したレコードを内容ごと元に戻せる kintone プラグイン。削除の直前に添付ファイルまで保管アプリへ自動バックアップし、一覧画面や設定画面の履歴からワンクリックで復元できます。削除の成否に連動する二段階コミットで、バックアップだけが残る不整合を防ぎます。',
    image: '/images/record-recovery-banner.png',
    imageWebp: '/images/record-recovery-banner.webp',
    imageAlt:
      '削除レコード復元 for kintone プラグイン — 削除の直前に内容と添付ファイルを保管アプリへ自動バックアップし、一覧画面や設定画面の履歴からワンクリックで復元できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'うっかり削除したレコードを元に戻せる。削除直前に添付ごと保管アプリへ自動バックアップし、履歴からワンクリックで復元。',
    problemTitle: '誤って削除したレコードが元に戻せない',
    problemDesc: 'kintone には削除レコードを復元する標準機能がなく、うっかり消すと内容も添付ファイルも失われてしまう',
    problemFeatured: true,
    releaseDate: '2026-07-24',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-read-check',
    pluginId: 'khnleckinnefnkeadfpdncnnahpdapkn',
    name: '既読チェック for kintone',
    formName: '既読チェック for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'read-check',
    categories: ['情報共有'],
    description:
      'レコードを開いた人を自動で記録できる kintone プラグイン。詳細画面を開くだけでログインユーザーを既読記録し、右サイドバーの「既読」タブ（コメント・変更履歴の並び）から誰が・いつ・何回読んだかを一覧表示。編集回数も別集計。レコード本体は汚さず保管アプリに分離。',
    image: '/images/read-check-banner.png',
    imageWebp: '/images/read-check-banner.webp',
    imageAlt:
      '既読チェック for kintone プラグイン — レコード詳細画面を開いた人を自動で既読記録し、右サイドバーの「既読」タブから誰が・いつ・何回読んだかを一覧表示できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '通達や回覧を誰が読んだか自動で記録。詳細画面を開くだけで既読を残し、サイドバーの「既読」タブで一覧表示。',
    problemTitle: '誰がレコードを読んだのか分からない',
    problemDesc: '通達や回覧レコードを作っても、標準では閲覧記録が残らず、読んだかどうかを一人ずつ聞いて回っている',
    releaseDate: '2026-07-25',
    summaryVersion: '1.0.2',
  },
  {
    id: 'kw-text-join',
    pluginId: 'kepofamplmoaicbelfanckelbdbobeck',
    name: '文字列結合 for kintone',
    formName: '文字列結合 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'text-join',
    categories: ['自動入力', '入力チェック', '一括処理'],
    description:
      '計算フィールドでは扱えないドロップダウン・ユーザー選択・日付なども含めて、複数フィールドの値を書式を整えたうえで1つの文字列フィールドへ自動入力するプラグイン。テーブル明細を1行にまとめる集約結合、結合結果の重複チェック、既存レコードへの一括反映にも対応します。',
    image: '/images/text-join-banner.png',
    imageAlt:
      '文字列結合 for kintone プラグイン — ドロップダウン・ユーザー選択・日付なども含めた複数フィールドの値を書式を整えて1つの文字列フィールドへ自動入力し、テーブル明細の集約や重複チェックにも対応する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '複数フィールドの値を書式を整えて1つの文字列へ自動入力。明細の集約結合、重複チェック、既存レコードへの一括反映まで。',
    problemTitle: '計算フィールドでは結合できない項目がある',
    problemDesc:
      'ドロップダウンやユーザー選択、日付は計算式で連結できない。自動計算にすると「値の重複を禁止する」も選べず、複合キーとして使えない',
    releaseDate: '2026-08-02',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-view-control',
    pluginId: 'jdmigbhjdejldnieeagmdeibjkamkjfe',
    name: '一覧コントロール for kintone',
    formName: '一覧コントロール for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'view-control',
    categories: ['一覧表示', '表示・編集制御'],
    description:
      'レコード一覧・グラフの表示／非表示を、ユーザー・組織・グループ単位で出し分けるプラグイン。増えすぎた一覧切替から関係のない一覧を隠し、対象者ごとに「最初に開く」一覧も指定できます。直リンクのガード、マトリクスプレビュー、モバイル対応。',
    image: '/images/view-control-banner.png',
    imageAlt:
      '一覧コントロール for kintone プラグイン — レコード一覧とグラフの表示／非表示をユーザー・組織・グループ単位で出し分け、対象者ごとに最初に開く一覧も指定できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧・グラフを担当者ごとに出し分け。関係のない一覧を切替から隠し、最初に開く一覧も指定。公式API制御でモバイルも対応。',
    problemTitle: '一覧が増えすぎて目的の一覧が探せない',
    problemDesc:
      '部署別・担当別に一覧を作った結果、切替ドロップダウンが20件超。kintone では一覧にアクセス権を設定できず、既定の一覧もアプリに1つしか決められない',
    releaseDate: '2026-08-04',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-table-assist',
    pluginId: 'mjjohecgmgfgnhbmflhilolnhfjnimbk',
    name: 'テーブルアシスト for kintone',
    formName: 'テーブルアシスト for kintone',
    slug: 'table-assist',
    categories: ['集計・計算'],
    description:
      'テーブルの行をドラッグ&ドロップと↑↓ボタンで並べ替え、値ごと複製、選んだ行をまとめて移動・削除できるプラグイン。さらにチェックを入れた行だけを合計・平均・件数・最大・最小で集計して数値フィールドへ自動入力します。列見出しソート・ヘッダー固定・行番号・既存レコードへの一括反映にも対応。',
    image: '/images/table-assist-banner.png',
    imageAlt:
      'テーブルアシスト for kintone プラグイン — テーブルの行を並べ替え・複製・一括操作できるようにし、チェックを入れた行だけを集計して数値フィールドへ自動入力する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      'チェックした行だけ、合計する。明細の行を並べ替え・複製・まとめて操作でき、選んだ行だけの合計・平均・件数を数値フィールドへ自動入力。作業用の計算列は不要です。',
    problemTitle: '「選んだ行だけ」の合計が出せない',
    problemDesc:
      'kintone に SUMIF はなく、回避策は作業用の計算列を1本足して IF(CONTAINS(…)) を合計すること。その列は非表示にできず CSV にも出る。行の並べ替えもできない',
    releaseDate: '2026-08-06',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-file-export',
    pluginId: 'ldngaocacpegobfboelbbpijfplidolf',
    name: '添付ファイル出力 for kintone',
    formName: '添付ファイル出力 for kintone',
    slug: 'file-export',
    categories: ['出力・帳票'],
    description:
      'レコード一覧の絞り込み結果・表示中の行・選択した行の添付ファイルを、フォルダ階層とファイル名を指定した ZIP でまとめてダウンロードするプラグイン。種別フィルタ・事前見積り・自動分割・中止・失敗一覧に対応し、テーブル内の添付の出力や実行者の限定もできます。',
    image: '/images/file-export-banner.png',
    imageAlt:
      '添付ファイル出力 for kintone プラグイン — レコード一覧の添付ファイルを、取引先別・月別などのフォルダに分けた ZIP でまとめてダウンロードする',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      '解いたら、そのまま使える形で。添付ファイルを取引先別・月別などのフォルダに分けた ZIP で一括ダウンロード。事前見積り・自動分割・中止に対応します。',
    problemTitle: '添付ファイルをまとめて取り出せない',
    problemDesc:
      'kintone に一括ダウンロードの機能はなく、レコードを開いて 1 件ずつ落とすしかない。ZIP に固めるだけの方法では、解いたあとに取引先別・月別へ振り分け直す手間が残る',
    releaseDate: '2026-08-08',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-after-save',
    pluginId: 'fklodgifdfbgampadilgcbaobdjhiben',
    name: '保存後ナビ for kintone',
    formName: '保存後ナビ for kintone',
    slug: 'after-save',
    categories: ['表示・編集制御'],
    description:
      'レコードを保存した直後に開く画面を、詳細画面・レコード追加画面・一覧・指定した一覧・別アプリの追加画面・固定URLから指定できるプラグイン。新規作成後と編集後を別々に設定でき、実行ユーザーやレコードの値で遷移先を出し分けられます。連続登録の件数表示つき。',
    image: '/images/after-save-banner.png',
    imageWebp: '/images/after-save-banner.webp',
    imageAlt:
      '保存後ナビ for kintone プラグイン — レコードを保存した直後に開く画面を、レコード追加画面・一覧・別アプリの追加画面などから指定して切り替える',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      '保存したら、そのまま次の入力へ。保存後に開く画面を6種から指定でき、実行ユーザーやレコードの値で行き先を出し分け。連続登録の件数も表示します。',
    problemTitle: '保存のたびに詳細画面へ飛ばされる',
    problemDesc:
      '連続入力なのに毎回「戻る→追加」の2手が要る。追加権限だけのユーザーは保存できているのに詳細画面を開けずエラー画面に着き、現場からは不具合として報告される',
    releaseDate: '2026-08-11',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-lottery-roulette',
    pluginId: 'fjobdfdhjnkpeibbeafammgpbanphhfl',
    name: '抽選ルーレット for kintone',
    formName: '抽選ルーレット for kintone',
    slug: 'lottery-roulette',
    categories: ['自動入力', '一括処理'],
    description:
      '担当者・当番・区分の割り当てを、完全ランダム／順番／件数平準化／重み付きの4方式で自動決定するプラグイン。いま抱えている件数を数えて最も少ない人へ配り、メンバーごとの重みも設定可能。ルーレット演出9種類で決定の瞬間を可視化し、一覧からまとめて配布もできます。',
    image: '/images/lottery-roulette-banner.png',
    imageWebp: '/images/lottery-roulette-banner.webp',
    imageAlt:
      '抽選ルーレット for kintone プラグイン — 担当者・当番・区分の割り当てを4方式で公平に自動決定し、ルーレット演出つきで確定する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      'kintone に、遊び心を。担当・当番・区分を4方式で公平に自動決定。件数を数えて少ない人へ配り、演出9種類で決定の瞬間を見せられます。',
    problemTitle: '担当者や当番を決めるのに毎回気を遣う',
    problemDesc:
      '手が空いている人に頼むつもりが結局いつも同じ人に偏る。順番も誰が最後だったか台帳を見ないと分からず、決め方が不透明だと納得も得にくい',
    releaseDate: '2026-08-11',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-autosave-assist',
    pluginId: 'ommlnedeokgjkgicidendgplmcjfcbfm',
    name: '自動保存アシスト for kintone',
    formName: '自動保存アシスト for kintone',
    slug: 'autosave-assist',
    categories: ['入力保護', '一覧表示'],
    description:
      'レコードの追加・編集画面を開いたまま操作が途切れた状態が続いたら、入力途中の内容を自動で保存するプラグイン。放置と判断するまでの時間は5〜60分から選べ、保存後は詳細画面へ移るかその場で編集を続けるかを指定。放置で保存されたレコードは一覧で色とバッジで見分けられます。',
    image: '/images/autosave-assist-banner.png',
    imageWebp: '/images/autosave-assist-banner.webp',
    imageAlt:
      '自動保存アシスト for kintone バナー — レコードの入力途中、離席してももう内容は消えません。放置を検知して自動で保存、一覧でひと目にわかるバッジ表示、新規作成・編集どちらにも対応',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      '離席で入力が消える前に、自動で保存。操作が途切れて設定時間が過ぎたら保存し、放置で保存されたレコードは一覧で色とバッジで分かります。',
    problemTitle: '入力途中で離席して、書いた内容が消える',
    problemDesc:
      '電話や来客で席を立った間にセッションが切れ、長い対応記録がまるごと消える。書き直しになるうえ、編集中のまま放置されたレコードにも気づけない',
    problemFeatured: true,
    releaseDate: '2026-08-14',
    summaryVersion: '1.0.0',
  },
  {
    id: 'kw-link-assist',
    pluginId: 'djaebfadlhobkdppfnbbhmanhjamghgk',
    name: 'リンクアシスト for kintone',
    formName: 'リンクアシスト for kintone',
    slug: 'link-assist',
    categories: ['入力チェック', '一覧表示'],
    description:
      '保存時にURLの追跡パラメータ（utm_source等）を除き、http/https・www有無・末尾スラッシュ・クエリ順序をそろえて重複登録を防ぎます。日本語URLはエンコードでリンクを機能させ、メール・電話・長いURLもリンクにします。',
    image: '/images/link-assist-banner.png',
    imageWebp: '/images/link-assist-banner.webp',
    imageAlt:
      'リンクアシスト for kintone バナー — 汚れたURLも、壊れたリンクも、まるごとキレイに。追跡パラメータ除去・URL正規化、日本語URLもちゃんとリンクに、800文字超の長いURLもリンクに',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    cardDescription:
      '汚れたURLも、壊れたリンクも自動でキレイに。追跡パラメータを除いて表記ゆれをそろえ、日本語URL・長いURL・メール・電話をクリックできるリンクにします。',
    problemTitle: 'URLが広告のゴミだらけで、同じページが重複登録される',
    problemDesc:
      '広告メールから貼ったURLに utm_source が付いたまま残り、http/https や www の違いだけで同じページが別レコードになる。日本語や長すぎるURLはクリックしても違う場所に飛ぶ',
    releaseDate: '2026-08-15',
    summaryVersion: '1.0.0',
  },
];

/**
 * プレミアムプラグイン（単品販売なし／プレミアム年間サポーターに含む）。
 * `plugins`（無料のちょこっとプラグイン）とは分離して管理し、プラグイン一覧ページの
 * 「プレミアムプラグイン」セクションでのみ表示する。今後ここに追加していく。
 */
export const premiumPlugins: Plugin[] = [
  {
    id: 'kw-report-designer',
    pluginId: 'cckpmebgmbdippgiicgldindkjlhhbci',
    name: '帳票デザイナー for kintone',
    formName: '帳票デザイナー for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'report-designer',
    categories: ['出力・帳票'],
    description:
      'お手持ちのPDFや白紙の用紙に、レコード値・サブテーブル明細・固定テキスト・ロゴ・印影をドラッグ配置して帳票化。1件印刷、一覧から最大100件のまとめ印刷に加え、絞り込んだ最大500件を1枚の一覧表にする一覧帳票、印刷PDFの添付自動保存に対応します。',
    image: '/images/report-designer-banner.png',
    imageAlt:
      '帳票デザイナー for kintone プラグイン — 手持ちの PDF を背景に kintone のデータをドラッグ配置して請求書・見積書などの帳票を印刷・PDF 保存',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '手持ちの PDF や白紙の用紙に kintone のデータをドラッグ配置して帳票化。1 件印刷・まとめ印刷・一覧帳票・集計表紙・PDF 自動保存に対応。',
    problemTitle: '既存の PDF 帳票に kintone のデータを流し込みたい／一覧を表にして配りたい',
    problemDesc: '請求書・見積書を作り直さず 1 件ずつ印刷したい。絞り込んだ一覧を売上一覧・案件一覧のような 1 枚の表にして印刷したい',
    releaseDate: '2026-06-20',
    summaryVersion: '1.1.0',
  },
  {
    id: 'kw-dashboard',
    pluginId: 'fdodfjefljonnenalifbgepbldmogoll',
    name: 'ダッシュボード for kintone',
    formName: 'ダッシュボード for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'dashboard',
    categories: ['集計・計算', '一覧表示'],
    description:
      'グラフ・数値カード・クロス集計表を1枚に集約し、一覧のカスタマイズビューに常設の集計ダッシュボードを描画。期間セレクタで全ウィジェットを連動再集計し、アプリ横断集計・集計キャッシュに対応。ポータルには別々のボードのグラフを横並びに配置できます。',
    image: '/images/dashboard-banner.png',
    imageAlt:
      'ダッシュボード for kintone プラグイン — レコード一覧のカスタマイズビューにグラフ・数値カード・クロス集計表を1枚に集約した集計ダッシュボード',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'グラフ・数値カード・クロス集計を1枚に集約。期間連動再集計・アプリ横断・集計キャッシュ対応。ポータルには複数ボードのグラフを横並び常設。',
    problemTitle: '見たい数字が複数画面に散らばっている',
    problemDesc: '標準グラフは1グラフ1画面。複数指標・複数アプリの数字を1枚で一望し、ポータルに常設したい',
    releaseDate: '2026-06-27',
    summaryVersion: '1.1.2',
  },
  {
    id: 'kw-attribute-filter',
    pluginId: 'eecphkkockjmkkimmgogjgjnlgagahgl',
    name: '属性制御フィルター for kintone',
    formName: '属性制御フィルター for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'attribute-filter',
    categories: ['表示・編集制御'],
    description:
      'ユーザー選択・組織選択・グループ選択フィールドの候補を、役職・所属組織・他フィールドの値・プロセス管理のステータスに応じて自動で絞り込むプラグイン。申請先や承認者の部署外への誤選択を防ぎ、キーワードサジェストで素早く選べます。サブテーブルにも対応。',
    image: '/images/attribute-filter-banner.png',
    imageAlt:
      '属性制御フィルター for kintone プラグイン — ユーザー選択・組織選択・グループ選択の候補を役職や所属・申請種別などの条件で自動的に絞り込み、誤選択を防ぐ',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'ユーザー・組織・グループ選択の候補を、役職や申請種別などの条件で自動的に絞り込み。部署外への誤選択を防ぎ、キーワードで素早く選択。',
    problemTitle: '担当者や申請先を、部署外まで含めた全員から選ばせたくない',
    problemDesc: '申請先組織や承認者を、役職・所属・申請種別に応じた候補だけに絞り、誤選択を防ぎたい',
    releaseDate: '2026-07-01',
    summaryVersion: '1.0.2',
  },
  {
    id: 'kw-lookup-sync',
    pluginId: 'ajmelgjgifcehodoklimhbalkjdndjdd',
    name: 'ルックアップ自動同期 for kintone',
    formName: 'ルックアップ自動同期 for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'lookup-sync',
    categories: ['自動入力', '一括処理'],
    description:
      'ルックアップ元（マスター）の更新を、コピー済みの参照先レコードへ自動で追従。会社名など重複しうるキーにも2つの同期方式で対応し、対象は自動スキャンで検出。サブテーブル・既存データの全件同期・クリア時の戻し確認にも対応します。',
    image: '/images/lookup-sync-banner.png',
    imageAlt:
      'ルックアップ自動同期 for kintone プラグイン — マスターのレコードを更新すると、その値をルックアップでコピーした参照先アプリの既存レコードを自動で追従更新する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'マスターを更新すると、その値をルックアップでコピーした参照先レコードを自動で最新化。重複しうるキーにも2方式で対応、自動スキャン検出・サブテーブル・クリア時の戻し確認。',
    problemTitle: 'マスターを直しても、コピー済みの値が古いまま',
    problemDesc: '会社名や単価を直しても、過去にルックアップした参照先レコードは古いまま。まとめて最新化したい',
    releaseDate: '2026-07-04',
    summaryVersion: '2.2.0',
  },
  {
    id: 'kw-related-enhancer',
    pluginId: 'omdiblonbpnnkdlolocbmildpnljcocc',
    name: '関連レコード拡張 for kintone',
    formName: '関連レコード拡張 for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'related-enhancer',
    categories: ['集計・計算', '検索・閲覧'],
    description:
      'レコード詳細の関連レコード一覧を、集計・見た目・検索/ソートでまとめて強化するプラグイン。カーソルAPIで参照先を全件取得し、合計・平均・件数などの集計カード（条件付き・複数条件の並列・閾値で色分け）を一覧の上に表示。非表示フィールドやサブテーブル内の展開集計、集計結果の書き込み保存にも対応します。',
    image: '/images/related-enhancer-banner.png',
    imageAlt:
      '関連レコード拡張 for kintone プラグイン — レコード詳細の関連レコード一覧に合計・平均・件数などの集計カードを表示し、見た目・検索/ソートを強化する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '関連レコード一覧に合計・平均・件数の集計カードを表示。非表示フィールド・サブテーブルの集計、書き込み保存、見た目・検索/ソートに対応。',
    problemTitle: '関連レコード一覧が「見るだけ」で集計できない',
    problemDesc: '関連レコードの合計・件数を別アプリやExcelで二度手間で出している。表示外の項目やサブテーブルも集計したい',
    releaseDate: '2026-07-11',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-card-board',
    pluginId: 'haefkbnglnmpoajgkipohcdjlfkkmooa',
    name: 'カードボード for kintone',
    formName: 'カードボード for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'card-board',
    categories: ['一覧表示', '集計・計算'],
    description:
      'レコード一覧を「状態カード（上部）＋詳細カード（下部）」の2段カンバンに切替表示するプラグイン。詳細カードを状態カードへドラッグ&ドロップしてステータス・選択肢・文字列の値を変更でき、状態別の件数・集計値を全幅で俯瞰。連動（カンバン）/個別（ギャラリー）モード・添付サムネイル・ライブプレビュー付き設定に対応します。',
    image: '/images/card-board-banner.png',
    imageAlt:
      'カードボード for kintone プラグイン — レコード一覧を状態カード＋詳細カードの2段カンバンに切替え、ドラッグ&ドロップでステータスを変更し、状態別の件数・集計を俯瞰する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '一覧を「状態カード＋詳細カード」の2段カンバンに切替。D&Dでステータス・選択肢・文字列を変更、状態別の件数・集計を俯瞰。連動/個別モード・添付サムネ対応。',
    problemTitle: '表の一覧では状態別の進捗が掴めない',
    problemDesc: '状態別の件数や合計が一目で分からず、ステータス変更も1件ずつ手作業。ドラッグで動かせるボードにしたい',
    releaseDate: '2026-07-19',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-chat-notify',
    pluginId: 'cfammdmfpjcmjlfhpofpllgkbkcihjmf',
    name: 'チャット通知 for kintone',
    formName: 'チャット通知 for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'chat-notify',
    categories: ['通知・メール'],
    description:
      'レコードの追加・更新・削除・ステータス変更・手動送信・一括通知をきっかけに、Slack / Microsoft Teams / Google Chat へ自動でメッセージを送るプラグイン。中継サーバー不要で kintone から Webhook へ直接送信します。最大5件の条件と変更検知で通知先を絞り込み、差し込みテンプレートで本文を組み立て、送信履歴と失敗時のベル通知にも対応します。',
    image: '/images/chat-notify-banner.png',
    imageAlt:
      'チャット通知 for kintone プラグイン — レコードの追加・更新・ステータス変更をきっかけに Slack・Microsoft Teams・Google Chat へ自動通知',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'レコードの追加・更新・削除・ステータス変更を Slack / Teams / Google Chat へ自動通知。中継サーバー不要、条件で絞り込み、差し込みテンプレートで本文を自由に。',
    problemTitle: 'kintone を開くまで、更新に気づけない',
    problemDesc: '大事なレコードが登録されても担当者が気づかず対応が遅れる。かといって全部通知すると誰も読まなくなる',
    releaseDate: '2026-07-29',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-sidebar-enhancer',
    pluginId: 'fohbimdpjdledfljmghngkbimikfgnkk',
    name: 'サイドバー拡張 for kintone',
    formName: 'サイドバー拡張 for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'sidebar-enhancer',
    categories: ['画面レイアウト'],
    description:
      'レコード詳細画面の右サイドバー（コメント・変更履歴の隣）に独自タブを5つ増設できるプラグイン。値を引き継いで他アプリへレコード追加、URLや地図を画面を離れずプレビュー、プロセス管理のステータス履歴と滞留日数、ステータス別チェックリスト、アプリガイドを常設。フォームのレイアウトは一切変更しません。',
    image: '/images/sidebar-enhancer-banner.png',
    imageWebp: '/images/sidebar-enhancer-banner.webp',
    imageAlt:
      'サイドバー拡張 for kintone プラグイン — レコード詳細画面の右サイドバーにレコード追加・リンク・進捗（プロセス管理）・確認・ガイドの5タブを増設し、フォームのレイアウトは変えずに機能を追加できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '右サイドバーに5つのタブを増設。他アプリへのレコード追加・URLと地図のプレビュー・プロセス管理のステータス履歴と滞留日数・チェックリスト・ガイドを、フォームを変えずに追加できます。',
    problemTitle: 'レコードを開いたまま、次の作業ができない',
    problemDesc: '関連レコードの登録や地図の確認で別タブへ離脱し、戻ると一覧の位置を見失う。かといってフォームに項目は増やしたくない',
    releaseDate: '2026-07-30',
    summaryVersion: '1.0.3',
  },
  {
    id: 'kw-input-template',
    pluginId: 'npnalkmflfpgbbhdlhhlcdigoojpocjg',
    name: '入力テンプレート for kintone',
    formName: '入力テンプレート for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'input-template',
    categories: ['自動入力'],
    description:
      'あらかじめ登録した「値のセット（テンプレート）」を選ぶだけで、複数フィールドとテーブル明細をまとめて入力できるプラグイン。管理者が設定画面で作る共通テンプレートと、各ユーザーがレコード詳細画面から必要な項目だけ選んで作る個人テンプレートの2階層に対応。フォームは変更せず保管アプリへ分離するため登録数の上限もありません。',
    image: '/images/input-template-banner.png',
    imageAlt:
      '入力テンプレート for kintone プラグイン — 登録した値のセットを選ぶだけで複数フィールドとテーブル明細をまとめて入力し、共通テンプレートと個人テンプレートの2階層で管理する',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '登録した値のセットを選ぶだけで複数フィールドとテーブル明細を一括入力。管理者が配る共通テンプレートと、現場が自分で作る個人テンプレートの2階層。PC・モバイル対応。',
    problemTitle: '毎回おなじ内容を打ち直している',
    problemDesc: '標準の初期値は1パターンだけ。レコード再利用は元レコード探しと不要項目の消去が要り、定型の明細行も毎回手で足している',
    releaseDate: '2026-08-02',
    summaryVersion: '1.0.1',
  },
  {
    id: 'kw-barcode-assist',
    pluginId: 'bahfobplbiddbjfgdifnpglofgelkgep',
    name: 'バーコードアシスト for kintone',
    formName: 'バーコードアシスト for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'barcode-assist',
    categories: ['自動入力', '検索・閲覧', '出力・帳票'],
    description:
      'スマホやPCのカメラでバーコード・QRを読み取り、レコードへ入力／該当レコードを開く／予定と実績の照合まで行うプラグイン。マスターに無いコードは警告。値からコードを生成してA4ラベル面付け印刷もでき、4機能は個別にオン／オフ。',
    image: '/images/barcode-assist-banner.png',
    imageWebp: '/images/barcode-assist-banner.webp',
    imageAlt:
      'バーコードアシスト for kintone バナー — かざすだけで、台帳がそろう。スマホのカメラで読む・探す、予定と実績を照合、コード生成からA4ラベル印刷まで',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'スマホのカメラでバーコード・QRを読み取り、レコードへ入力／検索／予定と実績の照合。マスターに無いコードは警告。値からコードを作ってA4ラベル印刷まで。',
    problemTitle: '現物とレコードの突き合わせが手打ち',
    problemDesc: '棚卸や検品で型番を目視で読んで手入力しており、桁ずれや入力漏れが起きる。ラベルの発行も別ソフトで二重管理になっている',
    releaseDate: '2026-08-10',
    summaryVersion: '1.1.0',
  },
];

/**
 * 全プラグイン（ちょこっと＋プレミアム）。トップページのショーケース・件数、
 * ランキングのアイコン/説明の引き当てなど「全部まとめて」扱う箇所で使う。
 * 個別販売の選択肢（サポーター個別プラン）など、ちょこっと限定の箇所は `plugins` を使う。
 */
export const allPlugins: Plugin[] = [...plugins, ...premiumPlugins];

export const pluginsItemListJsonLd = [...plugins, ...premiumPlugins].map((p, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  item: {
    '@type': 'SoftwareApplication',
    name: p.name,
    url: `https://kizuna-works.jp/plugins/${p.slug}/`,
    description: p.description,
  },
}));
