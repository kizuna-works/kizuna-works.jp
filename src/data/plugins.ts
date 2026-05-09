// Single source of truth for kintone plugins.
// Add a new entry here and the plugins index grid, supporter form, and JSON-LD update automatically.

export type PluginStatus = 'available' | 'coming-soon';

export interface Plugin {
  /** Plugin ID matching GAS license master (e.g., 'field-styler'). */
  id: string;
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
  /** Card image (absolute path under /public). */
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  status: PluginStatus;
  /** Numeric price in JPY for the free badge row. Omit for coming-soon. */
  price?: number;
}

export const plugins: Plugin[] = [
  {
    id: 'kw-field-styler',
    name: 'フィールドスタイラー',
    formName: 'フィールドスタイラープラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'field-styler',
    description:
      'kintoneフィールドの背景色・文字色・フォント・条件付きスタイルなど、10種類のカスタマイズをノーコードで実現。',
    image: '/images/field-styler-after.png',
    imageAlt:
      'フィールドスタイラー導入後の一覧画面 — 背景色・文字色・条件付きスタイルで視認性が向上',
    imageWidth: 1920,
    imageHeight: 960,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-conditional-numbering',
    name: '条件分岐自動採番',
    formName: '条件分岐自動採番プラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'kw-conditional-numbering',
    description:
      '条件分岐で採番ルールを自動切替。CSVインポート後の一括採番にも対応。',
    image: '/images/conditional-numbering-banner.png',
    imageAlt:
      '条件分岐自動採番プラグイン — フィールドの条件に応じて採番ルールを自動切替',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-form-deco',
    name: 'FormDeco',
    formName: 'FormDecoプラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'form-deco',
    description:
      'kintoneレコード詳細画面の罫線（区切り線）スタイルとスペースフィールドの装飾（テキスト・画像）をノーコードでカスタマイズ。',
    image: '/images/form-deco-banner.png',
    imageAlt:
      'FormDecoプラグイン — 罫線とスペースフィールドの装飾サンプル',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-lookup-suggest',
    name: 'ルックアップサジェスト',
    formName: 'ルックアップサジェストプラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'lookup-suggest',
    description:
      'kintoneのルックアップフィールドにライブサジェスト機能を追加。入力中に参照先候補を直下に表示し、画面遷移なしでルックアップ取得を完結。',
    image: '/images/lookup-suggest-banner.png',
    imageAlt:
      'ルックアップサジェストプラグイン — 入力中に候補リストを表示し、画面遷移なしで取得完結',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-quick-search',
    name: 'クイックサーチ',
    formName: 'クイックサーチプラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'quick-search',
    description:
      'kintone一覧画面のフィルター/ソートアイコン横にインライン検索バーを追加。AND/OR切替・複数キーワード対応で、テキスト系・選択肢系フィールドを横断検索できます。',
    image: '/images/quick-search-banner.png',
    imageAlt:
      'クイックサーチプラグイン — 一覧画面のツールバー横にインライン検索バーを設置し、複数キーワードでレコードを素早く絞り込み',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-file-icon-marker',
    name: '添付ファイルアイコン表示',
    formName: '添付ファイルアイコン表示プラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'file-icon-marker',
    description:
      'kintone一覧画面で、添付ファイルの有無・種別・件数をアイコンで可視化。PDF/Excel/画像など28種類の拡張子別アイコンと件数バッジで、詳細を開かずにひと目で把握できます。',
    image: '/images/file-icon-marker-banner.png',
    imageAlt:
      '添付ファイルアイコン表示プラグイン — 一覧画面に拡張子別アイコンと件数バッジを表示し、添付ファイルの有無と種類をひと目で判別',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
  {
    id: 'kw-quick-side-view',
    name: 'クイックサイドビュー',
    formName: 'クイックサイドビュープラグイン',
    subtitle: 'kintone プラグイン',
    slug: 'quick-side-view',
    description:
      'kintone一覧画面で行をクリックするとサイドバーが開き、最大5件のレコードを並べて閲覧・編集。詳細画面に遷移せずに比較・並行編集ができます。',
    image: '/images/quick-side-view-banner.png',
    imageAlt:
      'クイックサイドビュープラグイン — 一覧画面で行をクリックすると右側サイドバーが開き、最大5件のレコードを並べて閲覧・編集',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
  },
];

export const pluginsItemListJsonLd = plugins.map((p, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  item: {
    '@type': 'SoftwareApplication',
    name: p.name,
    url: `https://kizuna-works.jp/plugins/${p.slug}/`,
    description: p.description,
  },
}));
