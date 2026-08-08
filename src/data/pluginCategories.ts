// Purpose-based categories shown as chips on plugin cards and used by the
// filter bar on /plugins/. A plugin carries 1-3 of these. Every chip renders the
// same way, coloured by its category — the array order records which category is
// the plugin's main purpose but carries no visual weight.
//
// Rule for assigning a category: only when the plugin ships it as an
// independent feature listed under "主な機能" on its product page. Side effects
// ("...も防げます") do not earn a category — over-tagging makes the filter useless.

export type PluginCategory =
  | '自動入力'
  | '入力チェック'
  | '表示・編集制御'
  | '一括処理'
  | '一覧表示'
  | '画面レイアウト'
  | '装飾・配色'
  | '検索・閲覧'
  | '集計・計算'
  | '出力・帳票'
  | '通知・メール'
  | '情報共有'
  | '履歴・復元';

export interface PluginCategoryMeta {
  /** ASCII slug used in the `?cat=` query string and future category pages. */
  slug: string;
  /** One-line caption shown under the chip row while the category is selected. */
  description: string;
}

export const pluginCategoryMeta: Record<PluginCategory, PluginCategoryMeta> = {
  自動入力: {
    slug: 'auto-input',
    description: '採番・住所・ユーザー情報・過去の値・テンプレートを自動で埋める',
  },
  入力チェック: {
    slug: 'input-check',
    description: '表記ゆれの重複・入力漏れを見つける。入力ルールをその場で伝える',
  },
  '表示・編集制御': {
    slug: 'display-control',
    description: '条件やユーザーに応じて、見せる項目・選べる候補・編集の可否を変える',
  },
  一括処理: {
    slug: 'bulk',
    description: '複数レコードをまとめて登録・更新する',
  },
  一覧表示: {
    slug: 'list-view',
    description: 'レコード一覧を見やすくする。列の固定・色分け・一覧の出し分け',
  },
  画面レイアウト: {
    slug: 'layout',
    description: '縦に長い追加・編集画面をタブ／目次／アコーディオンで分ける',
  },
  '装飾・配色': {
    slug: 'design',
    description: '色・罫線・テーマカラーで見た目を整える',
  },
  '検索・閲覧': {
    slug: 'search',
    description: '探す。レコードを開かずに中身を見る',
  },
  '集計・計算': {
    slug: 'aggregate',
    description: '標準のグラフや計算フィールドでは出せない合計・件数・経過日数を出す',
  },
  '出力・帳票': {
    slug: 'export',
    description: 'データを書き出す・印刷する。CSV・Excel・PDF 帳票',
  },
  '通知・メール': {
    slug: 'notify',
    description: '更新を知らせる。Slack / Microsoft Teams / Google Chat・メール',
  },
  情報共有: {
    slug: 'share',
    description: '申し送りや気づきをチームで共有する。読んだかどうかも分かる',
  },
  '履歴・復元': {
    slug: 'history',
    description: 'いつ誰が変えたかを残す。消したレコードを戻す',
  },
};

/** Chip row grouping. Order here is the order rendered in the filter bar. */
export const pluginCategoryGroups: { label: string; categories: PluginCategory[] }[] = [
  {
    label: '入力・制御',
    categories: ['自動入力', '入力チェック', '表示・編集制御', '一括処理'],
  },
  {
    label: '画面',
    categories: ['一覧表示', '画面レイアウト', '装飾・配色', '検索・閲覧'],
  },
  {
    label: 'データ・運用',
    categories: ['集計・計算', '出力・帳票', '通知・メール', '情報共有', '履歴・復元'],
  },
];

export const pluginCategories: PluginCategory[] = pluginCategoryGroups.flatMap(
  (g) => g.categories
);

/** Reverse lookup for `?cat=` parsing. */
export const pluginCategoryBySlug = new Map<string, PluginCategory>(
  pluginCategories.map((c) => [pluginCategoryMeta[c].slug, c])
);
