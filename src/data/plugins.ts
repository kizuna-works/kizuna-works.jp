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
  /** Functional category shown as a colored chip on the grid card. */
  category: '一覧' | 'レコード画面' | '入力支援' | '装飾' | '出力・連携';
  /** Card image (absolute path under /public). */
  image: string;
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
    category: '装飾',
    description:
      '背景色・文字色・フォント・フィールド幅・条件付きスタイル・入力制御など全10機能を、JavaScriptなしのノーコードで設定できるプラグイン。一覧・詳細の視認性を高め、ステータスや金額など重要な値を条件に応じて自動で目立たせます。',
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
    category: '入力支援',
    description:
      '部署・担当者・ステータスなどフィールドの値に応じて、採番ルールを自動で切り替えるプラグイン。18種類の書式や条件別の連番管理に対応し、レコード保存時はもちろん、CSVインポート後の既存レコードにも一括で採番できます。',
    image: '/images/conditional-numbering-banner.png',
    imageAlt:
      '条件分岐自動採番プラグイン — フィールドの条件に応じて採番ルールを自動切替',
    imageWidth: 1200,
    imageHeight: 630,
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
    category: '装飾',
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
  },
  {
    id: 'kw-lookup-suggest',
    name: 'ルックアップサジェスト for kintone',
    formName: 'ルックアップサジェスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'lookup-suggest',
    category: '入力支援',
    description:
      'ルックアップに、入力中の候補をその場で表示するライブサジェスト機能を追加するプラグイン。参照ボタンで別画面に切り替える手間がなくなり、電話番号・住所など複数フィールドの横断検索で、同名顧客の取り違えも防げます。',
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
    category: '一覧',
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
    category: '一覧',
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
  },
  {
    id: 'kw-quick-side-view',
    name: 'クイックサイドビュー for kintone',
    formName: 'クイックサイドビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'quick-side-view',
    category: '一覧',
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
  },
  {
    id: 'kw-record-lock',
    name: 'レコードロック for kintone',
    formName: 'レコードロック for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'record-lock',
    category: 'レコード画面',
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
  },
  {
    id: 'kw-field-comment',
    name: 'フィールドコメント for kintone',
    formName: 'フィールドコメント for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'field-comment',
    category: '入力支援',
    description:
      'フィールド名の横にヘルプアイコンや常時表示のコメントを追加するプラグイン。アイコン＋ホバー／アイコン＋クリック／常時表示の3モードから選べ、入力ルールや業務上の注意点をその場で伝えて、入力ミスや問い合わせを減らします。',
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
    category: '装飾',
    description:
      'アプリのテーマカラーをヘッダー・行・罫線・フォーム背景まで一括で着色しつつ、タイトル帯に関連アプリ・社内ポータル・マニュアル・外部サイトへのクイックリンクを集約するプラグイン。アプリを業務のハブとして使えるようにします。',
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
    category: '入力支援',
    description:
      '郵便番号を入れるだけで住所を自動入力し、Googleマップのプレビューをレコード詳細に埋め込み、住所のワンクリックコピーまで行うプラグイン。一体形式・分割形式の両方に対応しAPIキーも不要。開いた瞬間に地図が見えて業務がはかどります。',
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
    category: 'レコード画面',
    description:
      'レコード保存のたびに、いつ・誰が・どのフィールドを何から何に変えたかを自動で記録し、詳細画面に時系列の表形式で表示するプラグイン。GASや外部サービスは不要で、記録対象フィールドや保存件数の上限、表示の色・サイズも設定できます。',
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
    category: '一覧',
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
  },
  {
    id: 'kw-summary-bar',
    name: '集計サマリーバー for kintone',
    formName: '集計サマリーバー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'summary-bar',
    category: '一覧',
    description:
      '一覧画面のヘッダーに、合計・平均・最大・最小・件数の集計カードを並べて表示するプラグイン。絞り込みに連動して即時に再集計し、グラフ画面に移動せず数字を確認できます。カードごとの条件集計や、集計値による条件付きの色分けにも対応。',
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
    category: '出力・連携',
    description:
      '絞り込み結果を用途別テンプレート（列・並び順・ヘッダー名・文字コード）でワンクリックCSV出力。サブテーブル明細の行展開（kintone標準の「*」区切り列つき）にも対応し、Shift-JIS/UTF-8でExcelの文字化けも防ぎます。',
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
    category: 'レコード画面',
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
  },
  {
    id: 'kw-file-preview',
    name: '添付ファイルプレビュー for kintone',
    formName: '添付ファイルプレビュー for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'file-preview',
    category: 'レコード画面',
    description:
      '添付された画像・PDF・Excel・Word・テキストを、ダウンロードや画面遷移なしで、その場のフルスクリーンモーダルでプレビューするプラグイン。同じ欄の複数ファイルを連続で閲覧でき、Excelの書式やグラフ、Wordのページ体裁も再現します。',
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
    category: 'レコード画面',
    description:
      'レコードの詳細・編集・新規作成画面の左側に、セクション単位の目次サイドメニューを常時表示するプラグイン。項目クリックで該当セクションへワンクリックで移動でき、ステータスの色分けバッジ表示やスクロール時のヘッダー追従にも対応します。',
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
    category: '一覧',
    description:
      '横長の一覧で左端のキー列を固定（0〜3列）し、ゼブラ・行番号・行ホバーで見やすく整えるプラグイン。さらに日付（TODAY基準）・選択肢・プロセス管理ステータスなどの条件で、行の背景色・文字色・太字を変更でき、優先順位も指定できます。',
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
    category: '入力支援',
    description:
      '新規作成・編集画面で、入力してほしい順にフィールドを色で誘導するプラグイン。値が入ると現在地が次の未入力へ自動で進み、未入力チェック（保存時に確認）と入力中の重複チェックで、新人やたまに使う担当者の入力漏れ・ミスを減らします。',
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
    category: '入力支援',
    description:
      '区分・ステータス・入力値などの条件に応じて、フィールドの表示/非表示・必須化・読み取り専用・値の自動入力・選択肢の絞り込みを切り替えるプラグイン。条件→動作をルールで設定し、アプリを分けずに1つのアプリで区分別フォームを実現します。',
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
  {
    id: 'kw-sheet-edit',
    name: 'シート編集 for kintone',
    formName: 'シート編集 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'sheet-edit',
    category: '一覧',
    description:
      '一覧（カスタマイズビュー）を表計算ソフトのようなグリッドに置き換え、表示中フィールドをその場で直接編集・保存できるプラグイン。サブテーブル（明細）の行展開・行ごとの編集にも対応。コピペ・範囲一括編集・オートフィル・競合検知・Excel出力まで一覧上で完結します。',
    image: '/images/sheet-edit-banner.png',
    imageAlt:
      'シート編集 for kintone プラグイン — レコード一覧（カスタマイズビュー）を表計算風グリッドに置き換え、表示中フィールドをその場で直接編集・保存できる',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '一覧（カスタマイズビュー）を表計算風グリッドに置き換え、その場で直接編集・保存。範囲一括編集・オートフィル・型別フィルタ・Excel出力まで一覧上で完結。kintone完結。',
    problemTitle: '一覧のまま複数レコードを直接編集したい',
    problemDesc: '1件ずつ詳細画面を開く往復が多い・Excel 感覚で一覧上のまま連続して値を更新したい',
    releaseDate: '2026-06-12',
  },
  {
    id: 'kw-sticky-board',
    name: '付箋ボード for kintone',
    formName: '付箋ボード for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'sticky-board',
    category: 'レコード画面',
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
      'レコード詳細にカテゴリ付き付箋を自由配置、一覧上部で未対応件数を集計表示。付箋からレコードへジャンプ・その場で対応済み。個人付箋は作成者のみ秘匿。「通知とコメントの中間」。kintone完結。',
    problemTitle: '申し送り・気づきが埋もれず、一覧で気づきたい',
    problemDesc: 'コメントは埋もれて一覧では気づけない・どのレコードのどの未対応が残っているか俯瞰できない',
    releaseDate: '2026-06-14',
  },
  {
    id: 'kw-mail-assist',
    name: 'メールアシスト for kintone',
    formName: 'メールアシスト for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'mail-assist',
    category: '出力・連携',
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
      'レコード値を差し込んで件名・本文・宛先を組み立て、ワンクリックでメーラー起動。詳細＝個別／一覧＝BCC一斉。条件でテンプレ出し分け・送信履歴も記録。外部サーバー不要で kintone完結。',
    problemTitle: 'レコードから定型メールを毎回手作業で作っている',
    problemDesc: '宛先・会社名・担当者名をメーラーにコピペし、定型文を打ち直している・同じ案内を全員に送るのが手間',
    releaseDate: '2026-06-26',
  },
  {
    id: 'kw-comment-control',
    name: 'コメントコントロール for kintone',
    formName: 'コメントコントロール for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'comment-control',
    category: '一覧',
    description:
      'レコード詳細・編集でコメント／変更履歴サイドバーを閉じた状態で開いて画面を広く使い、一覧では各レコードのコメント件数を色分けバッジで表示するプラグイン。自分宛メンションは強調色で見逃しを防ぎ、バッジのホバーでコメントを全文プレビュー（ページ送り対応）できます。',
    image: '/images/comment-control-banner.png',
    imageAlt:
      'コメントコントロール for kintone プラグイン — 詳細・編集でコメントサイドバーを閉じて開き、一覧ではコメント件数バッジを色分け。自分宛メンションを強調し、ホバーでコメントを全文プレビュー',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      '詳細・編集でコメント欄を閉じて開き画面を広く。一覧は件数バッジを色分けし、自分宛メンションを強調＋ホバーで全文プレビュー。ページ送り対応・kintone完結。',
    problemTitle: 'コメント欄が毎回開いて画面が狭い・自分宛の見落としが起きる',
    problemDesc: '詳細を開くたびコメント欄が場所を取り、一覧ではどれにコメントが付いているか・自分宛があるか分からず毎回開いて確認している',
    releaseDate: '2026-06-27',
  },
  {
    id: 'kw-user-autofill',
    name: 'ユーザーオートフィル for kintone',
    formName: 'ユーザーオートフィル for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'user-autofill',
    category: '入力支援',
    description:
      'ユーザー選択フィールドで選んだ人（新規作成時は自分）の組織・グループ・役職・メール・社員番号などを対応フィールドへ自動転記するプラグイン。組織・グループは組織選択／グループ選択フィールドへ選択値でセット。さらにユーザー情報をスペースにプロフィールカード／承認欄の捺印として表示でき、すべて kintone 内で完結します。',
    image: '/images/user-autofill-banner.png',
    imageAlt:
      'ユーザーオートフィル for kintone プラグイン — ユーザー選択で選んだ人の組織・役職・社員番号などを自動転記し、プロフィールカードや承認欄の捺印として表示',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    price: 0,
    cardDescription:
      'ユーザー選択で選んだ人の組織・役職・社員番号などを自動転記（組織/グループは選択値セット）。プロフィールカードや承認欄の捺印表示も。kintone完結。',
    problemTitle: '担当者の部署・連絡先を毎回手入力・承認欄を手書きしている',
    problemDesc: '日報や申請で報告者＝自分の部署・役職・連絡先を毎回調べて入力し、組織は文字列でばらつき、承認欄は手書きやハンコで運用している',
    releaseDate: '2026-06-29',
  },
  {
    id: 'kw-bulk-update',
    name: 'かんたん一括更新 for kintone',
    formName: 'かんたん一括更新 for kintone',
    subtitle: 'kintone プラグイン',
    slug: 'bulk-update',
    category: '一覧',
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
      '絞り込んだ一覧の1フィールドをまとめて更新・クリア。数値は加算/減算、クイックサーチ連動・1万件超対応。Undoと履歴からの復元付き・kintone完結。',
    problemTitle: '複数レコードの同じ項目を1件ずつ詳細画面で直している',
    problemDesc: 'ステータス・担当者・金額などを絞り込んだ何十件にまとめて反映したいのに、1件ずつ開いて編集・保存を繰り返していて時間がかかる',
    releaseDate: '2026-07-03',
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
    name: '帳票デザイナー for kintone',
    formName: '帳票デザイナー for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'report-designer',
    category: '出力・連携',
    description:
      'お手持ちのPDF（請求書・見積書・納品書）を背景に、レコード値・サブテーブル明細・固定テキスト・ロゴ・印影をドラッグで配置して帳票化するプラグイン。1件印刷、一覧から最大100件のまとめ印刷、印刷したPDFの添付自動保存に対応します。',
    image: '/images/report-designer-banner.png',
    imageAlt:
      '帳票デザイナー for kintone プラグイン — 手持ちの PDF を背景に kintone のデータをドラッグ配置して請求書・見積書などの帳票を印刷・PDF 保存',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      '手持ちの PDF を背景に kintone のデータをドラッグ配置して帳票化。1 件印刷・一覧まとめ印刷・集計表紙・PDF 自動保存に対応。kintone 完結。',
    problemTitle: '既存の PDF 帳票に kintone のデータを流し込みたい',
    problemDesc: '請求書・見積書を作り直さず、1 件ずつ・一覧から複数まとめて印刷／PDF 保存したい',
    releaseDate: '2026-06-20',
  },
  {
    id: 'kw-dashboard',
    name: 'ダッシュボード for kintone',
    formName: 'ダッシュボード for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'dashboard',
    category: '一覧',
    description:
      'グラフ・数値カード・クロス集計表を1枚に集約し、一覧のカスタマイズビューに常設の集計ダッシュボードを描画。期間セレクタで全ウィジェットを連動再集計し、アプリ横断集計・ポータル常設・集計キャッシュに対応します。kintone 完結で外部送信しません。',
    image: '/images/dashboard-banner.png',
    imageAlt:
      'ダッシュボード for kintone プラグイン — レコード一覧のカスタマイズビューにグラフ・数値カード・クロス集計表を1枚に集約した集計ダッシュボード',
    imageWidth: 1200,
    imageHeight: 630,
    status: 'available',
    tier: 'premium',
    cardDescription:
      'グラフ・数値カード・クロス集計を1枚に集約。期間連動再集計・アプリ横断・ポータル常設・集計キャッシュに対応。kintone 完結。',
    problemTitle: '見たい数字が複数画面に散らばっている',
    problemDesc: '標準グラフは1グラフ1画面。複数指標・複数アプリの数字を1枚で一望し、ポータルに常設したい',
    releaseDate: '2026-06-27',
  },
  {
    id: 'kw-attribute-filter',
    name: '属性制御フィルター for kintone',
    formName: '属性制御フィルター for kintone',
    subtitle: 'プレミアムプラグイン',
    slug: 'attribute-filter',
    category: '入力支援',
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
      'ユーザー・組織・グループ選択の候補を、役職や申請種別などの条件で自動的に絞り込み。部署外への誤選択を防ぎ、キーワードで素早く選択。kintone 完結。',
    problemTitle: '担当者や申請先を、部署外まで含めた全員から選ばせたくない',
    problemDesc: '申請先組織や承認者を、役職・所属・申請種別に応じた候補だけに絞り、誤選択を防ぎたい',
    releaseDate: '2026-07-01',
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
