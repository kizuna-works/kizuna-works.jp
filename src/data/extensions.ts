// Single source of truth for Chrome extensions.
// Add a new entry here and the extensions index grid, home page hero stats / showcase, and JSON-LD update automatically.

export type ExtensionStatus = 'available' | 'coming-soon';

export interface Extension {
  /** URL slug. Page lives at `/extensions/<slug>/`. */
  slug: string;
  /** Display name. */
  name: string;
  /** Long description for the extensions index detail card. */
  description: string;
  /** Short description for the home page mini card. */
  shortDescription: string;
  /** Banner image (absolute path under /public). 1200x675 recommended. */
  bannerImage: string;
  bannerAlt: string;
  /** Square icon image (absolute path under /public). */
  iconImage: string;
  iconAlt: string;
  /** Chrome Web Store URL. */
  chromeWebStoreUrl: string;
  status: ExtensionStatus;
}

export const extensions: Extension[] = [
  {
    slug: 'kw-plugin-updater-for-kintone',
    name: 'KW Plugin Updater for kintone',
    description:
      'kintone に導入済みの KIZUNA Works プラグインの版を照合し、更新できるものをツールバーのバッジ・通知・プラグイン管理画面の印で知らせる Chrome 拡張機能。最新版 ZIP のダウンロードまで一直線に繋がり、未導入のおすすめ・新着プラグインも確認できます。',
    shortDescription:
      '導入済みプラグインの更新をバッジと通知でお知らせ。管理画面にも印が付きます。',
    bannerImage: '/images/extensions/kw-plugin-updater-banner.png',
    bannerAlt: 'KW Plugin Updater for kintone のバナー画像',
    iconImage: '/images/extensions/kw-plugin-updater-icon.png',
    iconAlt: 'KW Plugin Updater for kintone アイコン',
    // 審査提出前のため未確定。公開後に Chrome ウェブストアの URL を入れる。
    chromeWebStoreUrl: '',
    status: 'coming-soon',
  },
  {
    slug: 'kw-field-viewer-for-kintone',
    name: 'KW Field Viewer for kintone',
    description:
      'kintone アプリのフィールドコード・フィールドタイプを画面上にオーバーレイ表示する Chrome 拡張機能。CSV / JSON / Markdown / HTML 形式でのエクスポートにも対応。',
    shortDescription:
      'フィールドコードをページ上にオーバーレイ表示。CSV/JSON/Markdown/HTML 出力対応。',
    bannerImage: '/images/extensions/kw-field-viewer-banner.png',
    bannerAlt: 'KW Field Viewer for kintone のバナー画像',
    iconImage: '/images/extensions/kw-field-viewer-icon.png',
    iconAlt: 'KW Field Viewer for kintone アイコン',
    chromeWebStoreUrl:
      'https://chromewebstore.google.com/detail/kw-field-viewer-for-kinto/fcnbfaedmhllphnbpmngfblfogdjcfaj',
    status: 'available',
  },
  {
    slug: 'kw-app-exporter-for-kintone',
    name: 'KW App Exporter for kintone',
    description:
      'kintone アプリの設定情報（フィールド構成・レイアウト・一覧・権限・プロセス管理）を HTML / JSON / Excel / Markdown 形式で一括エクスポートできる Chrome 拡張機能。アプリ引き継ぎ・差分比較を効率化。',
    shortDescription:
      'アプリの設定情報を HTML/JSON/Excel/Markdown 形式で一括エクスポート。',
    bannerImage: '/images/extensions/kw-app-exporter-banner.png',
    bannerAlt: 'KW App Exporter for kintone のバナー画像',
    iconImage: '/images/extensions/kw-app-exporter-icon.png',
    iconAlt: 'KW App Exporter for kintone アイコン',
    chromeWebStoreUrl:
      'https://chromewebstore.google.com/detail/kw-app-exporter-for-kinto/kojeebklgjlejjpfadmaaobdmbmjcfld',
    status: 'available',
  },
];
