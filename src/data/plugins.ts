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
  /**
   * Short, punchy description for the homepage compact showcase card.
   * Keep to ~50–80 Japanese characters; avoid SEO keyword stuffing.
   */
  cardDescription: string;
  /**
   * Problem statement title shown in bold on the homepage 課題リスト.
   * Phrase as the user's pain (not the solution).
   */
  problemTitle: string;
  /** Problem detail rendered after the em dash on the same item. */
  problemDesc: string;
}

export const plugins: Plugin[] = [
  {
    id: 'kw-field-styler',
    name: 'フィールドスタイラー for kintone',
    formName: 'フィールドスタイラー for kintone',
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
    cardDescription:
      '背景色・文字色・条件付きスタイルなど10機能をノーコード設定。kintoneの視認性を大幅向上。',
    problemTitle: 'フィールドの色分けや条件付き書式',
    problemDesc: 'JavaScript なしでノーコードに実現したい',
  },
  {
    id: 'kw-conditional-numbering',
    name: '条件分岐自動採番 for kintone',
    formName: '条件分岐自動採番 for kintone',
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
    cardDescription:
      '部署・担当者・ステータス等の条件に応じて採番ルールを自動切替。CSV一括採番にも対応。',
    problemTitle: '採番ルールを条件で自動切替',
    problemDesc: 'CSVインポート後の一括採番にも対応したい',
  },
  {
    id: 'kw-form-deco',
    name: 'FormDeco for kintone',
    formName: 'FormDeco for kintone',
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
    cardDescription:
      'レコード詳細画面の罫線とスペースフィールドの装飾をノーコードでカスタマイズ。',
    problemTitle: 'レコード詳細画面の見た目を整えたい',
    problemDesc: '罫線やスペース要素を JavaScript なしで装飾したい',
  },
  {
    id: 'kw-lookup-suggest',
    name: 'ルックアップサジェスト for kintone',
    formName: 'ルックアップサジェスト for kintone',
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
    cardDescription:
      'ルックアップフィールドへの入力中に候補を直下表示。画面遷移なしで取得まで完結。',
    problemTitle: 'ルックアップ入力を高速化',
    problemDesc: '入力中に候補表示でクリック数を減らしたい',
  },
  {
    id: 'kw-quick-search',
    name: 'クイックサーチ for kintone',
    formName: 'クイックサーチ for kintone',
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
    cardDescription:
      '一覧画面にインライン検索バーを設置。AND/OR切替・複数キーワード対応で横断検索を高速化。',
    problemTitle: '複数フィールドを横断検索',
    problemDesc: '標準の絞り込みパネルでは操作が面倒',
  },
  {
    id: 'kw-file-icon-marker',
    name: '添付ファイルアイコン表示 for kintone',
    formName: '添付ファイルアイコン表示 for kintone',
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
    cardDescription:
      '一覧画面で添付ファイルの有無・種別・件数をアイコンで可視化。28種の拡張子別アイコン＋件数バッジ。',
    problemTitle: '添付ファイルの中身が一覧で分からない',
    problemDesc: '詳細画面を毎回開いて確認している',
  },
  {
    id: 'kw-quick-side-view',
    name: 'クイックサイドビュー for kintone',
    formName: 'クイックサイドビュー for kintone',
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
    cardDescription:
      '一覧で行クリック→右側サイドバーで最大5件のレコードを並列表示・編集。詳細遷移なしで比較・並行編集。',
    problemTitle: '詳細画面と一覧の往復が多い',
    problemDesc: '内容確認のたびに開いて戻るのが面倒・複数レコードの比較もしづらい',
  },
  {
    id: 'kw-record-lock',
    name: 'レコードロック for kintone',
    formName: 'レコードロック for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'record-lock',
    description:
      'kintoneレコードを条件で自動ロックして編集を制限。ステータス・日付・フィールド値などの複数条件（AND/OR）と除外ユーザー設定で、特定の人だけが編集できる運用を実現します。',
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
  },
  {
    id: 'kw-field-comment',
    name: 'フィールドコメント for kintone',
    formName: 'フィールドコメント for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'field-comment',
    description:
      'kintoneのフィールド名横にヘルプアイコンや常時表示コメントを追加。「アイコン＋ホバー」「アイコン＋クリック」「アイコンなし常時表示」の3モードで、入力ルールや業務ルールを担当者にひと目で伝えられます。',
    image: '/images/field-comment-banner.png',
    imageAlt:
      'フィールドコメントプラグイン — kintoneのフィールド名横にヘルプアイコンや常時表示コメントを追加。ホバー・クリック・常時表示の3モード対応',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'フィールド名横にヘルプアイコンや常時表示コメントを追加。3モード（ホバー/クリック/常時）でルールを担当者に伝達。',
    problemTitle: 'フィールドに入力ルールを表示したい',
    problemDesc: 'フォーム上のラベルだけでは伝わらないヘルプや注意書きを簡単に出したい',
  },
  {
    id: 'kw-theme-styler',
    name: 'テーマスタイラー for kintone',
    formName: 'テーマスタイラー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'theme-styler',
    description:
      'kintoneアプリのテーマカラーを1色で統一しつつ、タイトル帯に関連 kintone アプリ・社内ポータル・マニュアル・外部 Web サイトへのクイックリンク（テキスト＋最大5個のボタン）を集約。アプリを業務ハブとして使えるようにする無料プラグイン。10種の日本語フォント、50種ボタンスタイル、テーマカラーの一括着色（ヘッダー・行・罫線・フォーム背景）に対応。',
    image: '/images/theme-styler-banner.png',
    imageAlt:
      'テーマスタイラープラグイン — kintone アプリにテーマカラーと、関連アプリ・社内ポータル・外部サイトへのクイックリンクをまとめて配置',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'アプリ上部に関連アプリ・社内ポータル・外部サイトへのクイックリンクを集約。テーマ色も1色で統一。',
    problemTitle: '関連アプリ・マニュアル・外部サイトへの行き来が面倒',
    problemDesc: 'タイトル帯にテキストとボタンで最大6個のリンクを集約してワンクリック遷移できるようにしたい',
  },
  {
    id: 'kw-address-assist',
    name: '住所アシスト for kintone',
    formName: '住所アシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'address-assist',
    description:
      '郵便番号を入れるだけで住所を自動入力し、Google マップ URL の自動生成・レコード詳細画面への地図プレビュー埋め込み・住所のワンクリックコピーまで一気通貫で行う kintone プラグイン。レコードを開いた瞬間に地図が見える「業務効率の段違いさ」が他社プラグインとの最大の差別化ポイント。一体形式・分割形式の両方対応、郵便番号の自動整形、API キー不要。',
    image: '/images/address-assist-banner.png',
    imageAlt:
      '住所アシスト for kintone プラグイン — 郵便番号入力で住所自動入力＋レコード詳細画面に Google マップを直接プレビュー表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '郵便番号 → 住所自動入力 ＋ Google マップ URL 生成 ＋ レコード詳細画面に地図プレビュー直接表示 ＋ ワンクリックコピー。',
    problemTitle: '住所入力と地図確認の往復が面倒',
    problemDesc: '郵便番号入力で住所を自動入力し、レコードを開いた瞬間に地図プレビューまで一気に見たい',
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
