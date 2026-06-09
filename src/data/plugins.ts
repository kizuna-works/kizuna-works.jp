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
  /**
   * Public release date in ISO format (YYYY-MM-DD). Used as the tiebreaker for
   * /plugins/ranking/ when install counts are equal — older releases rank higher.
   * Should match the `pubDate` of the corresponding `plugin-*-release.md` news entry.
   */
  releaseDate?: string;
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
    releaseDate: '2026-04-16',
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
    releaseDate: '2026-04-18',
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
    releaseDate: '2026-04-18',
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
    releaseDate: '2026-04-18',
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
    releaseDate: '2026-05-03',
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
    releaseDate: '2026-05-03',
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
    releaseDate: '2026-04-18',
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
    releaseDate: '2026-05-16',
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
    releaseDate: '2026-05-18',
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
    releaseDate: '2026-05-22',
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
    releaseDate: '2026-05-23',
  },
  {
    id: 'kw-quick-history-view',
    name: 'クイック履歴ビュー for kintone',
    formName: 'クイック履歴ビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-history-view',
    description:
      'レコード保存のたびに「いつ・誰が・どのフィールドを・何から何に変えたか」を自動で記録し、レコード詳細画面に表形式で時系列表示する kintone プラグイン。GAS や外部サービス不要で kintone 完結。記録対象フィールドの選択、保存件数上限（5・10・20・30件）、ヘッダー色・行色・フォント・サイズの細かなカスタマイズに対応。プラグイン管理画面でリアルタイムプレビュー可能。',
    image: '/images/quick-history-view-banner.png',
    imageAlt:
      'クイック履歴ビュー for kintone プラグイン — レコードの変更前後をフィールド単位で自動記録し、詳細画面に時系列テーブルで表示',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード変更を自動でフィールド単位に記録し、詳細画面に表形式で時系列表示。GAS不要・kintone完結。',
    problemTitle: 'いつ誰が何を変えたか分からない',
    problemDesc: 'レコードの変更前後を自動で記録し、詳細画面で時系列の変更履歴テーブルとして見たい',
    releaseDate: '2026-05-24',
  },
  {
    id: 'kw-related-record-popup',
    name: '関連レコードポップアップ表示 for kintone',
    formName: '関連レコードポップアップ表示 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'related-record-popup',
    description:
      'レコード一覧画面の各行に表示したアイコンにホバーするだけで、関連レコード一覧をポップアップ表示する kintone プラグイン。詳細画面に遷移せず関連情報をその場で確認できます。複数の関連レコード一覧フィールドはタブで切り替え、件数が多ければ自動でページネーション。5 種類のアイコン・10 種類の淡色系背景・10 種類のアイコン色から組み合わせ可能で、行クリックで関連レコード詳細を別タブで開けます。',
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
  },
  {
    id: 'kw-summary-bar',
    name: '集計サマリーバー for kintone',
    formName: '集計サマリーバー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'summary-bar',
    description:
      'kintone レコード一覧画面のヘッダーに、合計・平均・最大・最小・件数の集計カードを並べて表示するプラグイン。絞り込みに連動して即時に再集計し、グラフ画面に移動せず「今この一覧の数字」をひと目で把握できます。v2.0.0 ではカードごとに別フィールドの条件で集計対象を絞り込めるようになり（例：商品＝商品Aの売上だけ合計／複数条件はAND・OR）、内訳カードを一覧に並べて比較できます。表示中／絞り込み全件のトグル切替、一覧ビューごとの別カード構成（最大10枚）、集計値による条件付き色分け（固定値・別フィールド比較）、段組み・配置・淡色テーマ8種に対応。GAS・外部サービス不要で kintone 完結。',
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
    releaseDate: '2026-05-30',
  },
  {
    id: 'kw-csv-export',
    name: 'かんたんCSV出力 for kintone',
    formName: 'かんたんCSV出力 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'csv-export',
    description:
      'kintone レコード一覧の絞り込み結果を、用途別テンプレート（出力する列・並び順・ヘッダー名・文字コード）でワンクリックCSV出力するプラグイン。「得意先提出用」「基幹システム取込用」などのフォーマットを名前付きで保存でき、クイックサーチ等の絞り込みにそのまま連動。UTF-8(BOM有/無)・Shift-JIS の文字コード選択で Excel の文字化けも防止。ファイル名は部品で組み立て、対象一覧の限定やボタン色のカスタマイズにも対応。GAS・外部サービス不要で kintone 完結。',
    image: '/images/csv-export-banner.png',
    imageAlt:
      'かんたんCSV出力 for kintone プラグイン — レコード一覧の絞り込み結果を用途別テンプレートでワンクリックCSV出力',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧の絞り込み結果を用途別テンプレートでワンクリックCSV出力。列・ヘッダー名・文字コードを保存、クイックサーチ連動。',
    problemTitle: 'いつものフォーマットでCSVを書き出したい',
    problemDesc: '毎回フィールドを選び直さず、絞り込んだ結果をテンプレートで一発出力したい',
    releaseDate: '2026-06-03',
  },
  {
    id: 'kw-quick-tab',
    name: 'クイックタブ for kintone',
    formName: 'クイックタブ for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-tab',
    description:
      '項目数の多い kintone のレコード詳細・作成・編集画面を、フォーム上のスペース要素を境界にタブへ自動分割して整理するプラグイン。フィールドの手動割当は不要で、スペースの位置だけで区切れます。全項目を一度に見る「すべて」タブ、保存時に未入力の必須項目があるタブを自動で開く追従機能、スクロールしてもタブバーを画面上部に固定する機能に対応。スタイル（形）20種×配色10種＋カスタムから見た目を選べます。GAS・外部サービス不要で kintone 完結。',
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
  },
  {
    id: 'kw-file-preview',
    name: '添付ファイルプレビュー for kintone',
    formName: '添付ファイルプレビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'file-preview',
    description:
      'kintone レコードに添付された画像・PDF・Excel・Word・テキストを、ダウンロードや画面遷移なしでその場のフルスクリーンモーダルでプレビューするプラグイン。一覧・詳細のファイル名クリックで起動し、同じ欄の複数ファイルを送りナビ・サムネイル・キーボードで連続閲覧。Excel は列幅・セル結合・色・罫線やグラフも再現、Word はページ体裁を再現します。ファイルの中身は外部送信せず kintone 完結。',
    image: '/images/file-preview-banner.png',
    imageAlt:
      '添付ファイルプレビュー for kintone プラグイン — 添付ファイル名のクリックで画像・PDF・Excel・Word・テキストを全画面モーダルでプレビュー',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '添付の画像・PDF・Excel・Word・テキストを、ファイル名クリックでその場プレビュー。送りナビ・Excel書式/グラフ再現・kintone完結。',
    problemTitle: '添付ファイルの中身を見るのにダウンロードや画面遷移が面倒',
    problemDesc: '一覧・詳細のファイル名クリックで、その場のモーダルで素早く中身を確認したい',
    releaseDate: '2026-06-05',
  },
  {
    id: 'kw-quick-toc',
    name: 'クイック目次 for kintone',
    formName: 'クイック目次 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-toc',
    description:
      'kintone のレコード詳細・編集・新規作成画面の左側に、セクション単位の目次サイドメニューを常時表示するプラグイン。項目クリックで該当セクション先頭へスムーズスクロールし、縦に長いレコードでも目的の場所へワンクリックで移動できます。セクションは label／field／group／subtable の4種別で定義（ジャンプ先を選ぶと表示名を自動反映）。目次最上部に単一選択フィールド（ドロップダウン／ラジオ／プロセス管理ステータス）の値を色分けバッジで表示でき、配色は kintone標準同期／プリセット10色／カスタムから選択。スクロール時はヘッダー直下に追従し、編集・新規画面でも動作。GAS・外部サービス不要で kintone 完結。',
    image: '/images/quick-toc-banner.png',
    imageAlt:
      'クイック目次 for kintone プラグイン — レコード画面の左側にセクション目次を常時表示し、項目クリックで該当セクションへジャンプ',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      'レコード画面の左に目次を常時表示。項目クリックで該当セクションへジャンプ。ステータスバッジ・配色テーマ対応、編集・新規でも動作。kintone完結。',
    problemTitle: '縦に長いレコードのスクロールが大変',
    problemDesc: '左の目次から目的のセクションへワンクリックで移動したい',
    releaseDate: '2026-06-05',
  },
  {
    id: 'kw-list-styler',
    name: '一覧スタイラー for kintone',
    formName: '一覧スタイラー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'list-styler',
    description:
      'kintone のレコード一覧画面を見やすく整えるプラグイン。横長一覧で左端の列（案件名・会社名などのキー列）を横スクロールに追従して固定（0〜3列）し、ヘッダーも追従。行の基本スタイル（ゼブラ＝奇数/偶数の2色指定・単色・なし、文字色）、行ホバーハイライト、行番号表示に対応。さらに条件付きで行の背景色・文字色・太字を変更でき、条件の対象は文字列・数値・日付（TODAY/TODAY±N）・選択肢（ドロップダウン等）・プロセス管理ステータス。複数条件は上が優先（ドラッグで並べ替え）。行のダブルクリック／シングルクリックでレコード詳細を同じウィンドウ／別タブで開く設定も可能。設定は「設定セット」で一覧ビューごとに適用でき、フィールドスタイラーとも共存します。GAS・外部サービス不要で kintone 完結。',
    image: '/images/list-styler-banner.png',
    imageAlt:
      '一覧スタイラー for kintone プラグイン — 横長のレコード一覧で左端の列を固定し、ゼブラ・行番号・条件付き行色分けで見やすく整える',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '横長一覧の左端列を固定し、ゼブラ2色・行番号・条件付き行色分け（背景/文字色/太字・TODAY/ステータス対応）で見やすく。行クリックで詳細も。kintone完結。',
    problemTitle: '横長の一覧が見づらい',
    problemDesc: '横スクロールでキー列が消える・行を見分けづらい・状態や期限を一目で把握したい',
    releaseDate: '2026-06-07',
  },
  {
    id: 'kw-input-assist',
    name: '入力アシスト for kintone',
    formName: '入力アシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'input-assist',
    description:
      'kintone の新規作成・編集画面で、入力してほしい順にフィールドを色で誘導する入力アシストプラグイン。指定した順に「待機（淡）／現在地（強調＋タグ）／入力済み（解除）」を色分けし、値が入ると現在地が次の未入力フィールドへ自動で進みます（自動スクロール・自動フォーカス対応）。さらに「未入力チェック」は標準必須のように保存をブロックせず、未入力があれば保存時に確認ダイアログ（未入力項目の一覧つき）を表示し、保存後の詳細画面でも未入力を表示。加えて「値の重複を禁止する」フィールドでは入力中に既存レコードとの重複をその場で警告します。配色は入力順ガイドと未入力チェックでそれぞれプリセット（同じ色は選べない排他）。新人やたまに使う担当者の入力ミス・入力漏れ・差し戻しを減らします。GAS・外部サービス不要で kintone 完結。',
    image: '/images/input-assist-banner.png',
    imageAlt:
      '入力アシスト for kintone プラグイン — 新規作成・編集画面で入力順をフィールドの色で誘導し、未入力チェックと入力中の重複チェックで入力漏れ・ミスを防ぐ',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '入力してほしい順にフィールドを色で誘導。未入力チェック（保存は止めず確認）と入力中の重複チェックで入力漏れ・ミスを防止。kintone完結。',
    problemTitle: '入力の順番・漏れで手戻りが起きる',
    problemDesc: '項目が多くどこから入れるか迷う・必須にすると保存が止まる・入力漏れや重複に保存後まで気づけない',
    releaseDate: '2026-06-08',
  },
  {
    id: 'kw-conditional-form',
    name: '条件分岐フォーム for kintone',
    formName: '条件分岐フォーム for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'conditional-form',
    description:
      '区分・ステータス・入力値などの条件に応じて、フォームのフィールドを動的に出し分けする kintone プラグイン。「条件（最大5件・AND/OR）→ 動作」をルールで設定し、フィールド／グループの表示・非表示、条件成立時のみの必須化、読み取り専用、値の自動入力（TODAY 対応）、選択肢の絞り込みをノーコードで実現します。1つのルールで複数の対象に動作を適用でき、同じ項目に複数の動作が当たっても安全則（非表示＞読み取り専用＞必須）で自動解決。アプリを分けずに1つのアプリで区分別フォームを切り替えたい運用に最適です。条件で表示された項目は枠線でハイライト、動的に必須化された項目には「必須」バッジを表示。GAS・外部サービス不要で kintone 完結。',
    image: '/images/conditional-form-banner.png',
    imageAlt:
      '条件分岐フォーム for kintone プラグイン — 区分・ステータス・入力値の条件でフィールドを表示/非表示・必須化・読み取り専用・自動入力・選択肢の絞り込みに切り替える動的フォーム制御',
    imageWidth: 1200,
    imageHeight: 675,
    status: 'available',
    price: 0,
    cardDescription:
      '区分・ステータス・入力値の条件で、フィールドを表示/非表示・必須化・読み取り専用・自動入力・選択肢の絞り込みに動的制御。1アプリで区分別フォームを実現。kintone完結。',
    problemTitle: '1アプリで入力項目を出し分けたい',
    problemDesc: '区分やステータスで見せる項目・必須・入れる値・選べる選択肢を変えたいが、標準ではできずアプリを分けがち',
    releaseDate: '2026-06-09',
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
