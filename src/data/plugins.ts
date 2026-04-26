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
    id: 'field-styler',
    name: 'フィールドスタイラー',
    formName: 'フィールドスタイラープラグイン',
    subtitle: 'Field Styler',
    slug: 'field-styler',
    description:
      'kintoneフィールドの背景色・文字色・フォント・条件付きスタイルなど、10種類のカスタマイズをノーコードで実現。',
    image: '/images/field-styler-after.png',
    imageAlt:
      'フィールドスタイラー導入後の一覧画面 — 背景色・文字色・条件付きスタイルで視認性が向上',
    imageWidth: 1920,
    imageHeight: 960,
    status: 'coming-soon',
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
