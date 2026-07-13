// Single source of truth for the kintone glossary page.
// Add an entry here and the page, search, filter, and DefinedTermSet JSON-LD
// all pick it up automatically.

export type TermCategory = 'basic' | 'field' | 'layout' | 'feature' | 'operation' | 'api' | 'community';

export interface Term {
  /** URL-safe stable id used for anchor links (#<id>). */
  id: string;
  /** Display term name in Japanese. */
  term: string;
  /** Hiragana reading. Used for 五十音 grouping and sort. */
  reading: string;
  category: TermCategory;
  /** 1–3 sentences. ~100–250 Japanese characters. */
  definition: string;
  /** Related term ids in this glossary (renders as #anchor links). */
  relatedTerms?: string[];
  /** Plugin slugs from src/data/plugins.ts (renders as /plugins/<slug>/ links). */
  relatedPlugins?: string[];
  /** Blog post ids (file basenames in src/content/blog/) for cross-linking. */
  relatedBlog?: string[];
  /**
   * When true, a dedicated long-tail landing page is generated at
   * /glossary/<id>/ targeting "kintone <term>とは". Only set on terms with
   * enough demand and substantive content (longDescription/useCases/faq) to
   * avoid thin pages.
   */
  hasPage?: boolean;
  /** Extra explanatory paragraphs shown on the dedicated page (after definition). */
  longDescription?: string[];
  /** Concrete usage examples shown as a bullet list on the dedicated page. */
  useCases?: string[];
  /** FAQ entries (renders FAQPage JSON-LD + accordion on the dedicated page). */
  faq?: { q: string; a: string }[];
}

export const categoryLabels: Record<TermCategory, string> = {
  basic: '基本',
  field: 'フィールド',
  layout: 'レイアウト要素',
  feature: '機能',
  operation: '運用',
  api: 'API・カスタマイズ',
  community: '周辺・コミュニティ',
};

export const glossary: Term[] = [
  // ----- 基本 -----
  {
    id: 'app',
    term: 'アプリ',
    reading: 'あぷり',
    category: 'basic',
    definition: 'kintone でデータを管理する単位。レコードとフィールドで構成され、業務（顧客管理・案件管理・問い合わせ管理など）ごとに作成する。スペース内に配置することも、独立して持つこともできる。',
    relatedTerms: ['record', 'field', 'space'],
    relatedBlog: ['kintone-excel-iko-steps'],
  },
  {
    id: 'access-permission',
    term: 'アクセス権',
    reading: 'あくせすけん',
    category: 'operation',
    definition: 'アプリ・レコード・フィールドの参照／追加／編集／削除をユーザー・組織・グループ単位で制御する設定。3 階層（アプリ・レコード・フィールド）あり、組み合わせで柔軟な権限管理ができる。',
    relatedTerms: ['app'],
  },
  {
    id: 'list-view',
    term: '一覧画面',
    reading: 'いちらんがめん',
    category: 'feature',
    definition: 'レコードを表形式で一覧表示する画面。アプリを開いたときの起点になる画面で、フィルター・ソート・絞り込みを行ってから個別レコードを開いていく。表示するフィールドや並び順は「ビュー」で制御する。',
    relatedTerms: ['detail-view', 'view'],
    relatedPlugins: ['quick-search', 'quick-side-view', 'list-styler', 'file-icon-marker', 'summary-bar', 'csv-export'],
    relatedBlog: ['kintone-kensaku-plugin-hikaku', 'kintone-quick-side-view-plugin-hikaku', 'kintone-list-styler-plugin-hikaku'],
    hasPage: true,
    longDescription: [
      '一覧画面は、アプリを開いたときの起点になる、レコードを表形式で並べる画面です。ビューを切り替えてフィルター・ソート・絞り込みを行い、目的のレコードを見つけて詳細画面へ進みます。どのフィールドをどの順番で表示するかは「ビュー」の設定で制御します。',
      'レコードが増えると、一覧は「探しにくい・横に長い・中身が見えない」といった課題が出てきます。上部に検索窓を足す、詳細を開かずに横でプレビューする、列を固定して横スクロールを楽にする、添付ファイルの有無をアイコンで可視化する、絞り込み結果をCSVで書き出す——といった改善は、いずれもプラグインで手軽に実現できます。',
    ],
    useCases: [
      '「未対応のみ」「今月分」などの条件をビューとして保存し、ワンクリックで切り替える',
      '一覧上部の検索窓でテキスト・選択肢を横断的に絞り込む',
      '絞り込んだ結果をそのままCSV出力して帳票や報告の元データにする',
    ],
    faq: [
      { q: '一覧画面とビューの違いは？', a: '一覧画面はレコードを表示する画面そのもので、ビューはその「表示形式とフィルター条件のセット」です。複数のビューを保存して切り替えながら一覧画面を使います。' },
      { q: '一覧が横に長くて見づらい', a: '一覧スタイラー for kintone で列固定や行の色分けを行うと、横長の一覧でも見やすくなります。' },
      { q: '一覧から詳細をいちいち開くのが手間', a: 'クイックサイドビュー for kintone を使うと、一覧の横にレコードの中身をプレビュー表示でき、画面遷移を減らせます。' },
    ],
  },
  {
    id: 'webhook',
    term: 'Webhook',
    reading: 'うぇぶふっく',
    category: 'api',
    definition: 'レコード追加・編集・削除・ステータス変更・コメント書き込みなどのイベントを、指定した URL に HTTP POST で通知する kintone の機能。Slack 通知・他システム連携の起点として使われる。',
    relatedTerms: ['rest-api'],
  },
  {
    id: 'category',
    term: 'カテゴリー',
    reading: 'かてごりー',
    category: 'feature',
    definition: 'レコードを階層的に分類できる機能。例：「営業部 > 一課」のような階層タグを付けて絞り込みに使う。通常フィールドとは別の管理になっており、アプリ設定で有効化することで利用できる。',
    relatedTerms: ['status'],
    relatedBlog: ['kintone-category'],
    relatedPlugins: ['list-styler'],
    hasPage: true,
    longDescription: [
      'カテゴリーは、レコードに「営業部 > 一課」のような階層タグを付けて分類し、一覧画面の左側に表示されるツリーからワンクリックで絞り込めるようにする機能です。フォームに置く通常のフィールドとは別枠で管理され、アプリの設定画面で「カテゴリー」を有効化してから使います。',
      '有効化したら、まず分類のツリー（階層構造）を作り、次に各レコードをそのカテゴリーへ割り当てます。割り当ては一覧画面でレコードを選んでまとめて設定することもできます。設定後は、一覧左のツリーから項目を選ぶだけで該当レコードだけを表示でき、漏斗アイコンから条件を組み立てる「絞り込み」より手数が少なく済みます。',
      'ただしカテゴリーには、最大5階層・合計1,000個まで・名称は64文字までといった制限があり、カテゴリー名での検索や、カテゴリーを軸にした集計は標準ではできません。分類の切り口が複数ある場合や、集計・検索まで求める場合は、選択肢フィールド＋保存した一覧（絞り込み）や、一覧を強化するプラグインと使い分けるのが実務的です。',
    ],
    useCases: [
      '「営業部 > 一課 / 二課」のような組織階層でレコードを分類し、部署ごとに素早く絞り込む',
      '「商品 > 大分類 > 中分類」のように商品や在庫を階層で整理する',
      '一覧画面の左ツリーから、対象のカテゴリーをクリックしてワンタッチで表示を切り替える',
    ],
    faq: [
      {
        q: 'kintoneのカテゴリー機能とは何ですか？',
        a: 'レコードを「営業部 > 一課」のように階層で分類し、一覧左のツリーから絞り込めるようにする機能です。通常フィールドとは別に、アプリ設定で有効化して使います。',
      },
      {
        q: 'カテゴリーと絞り込み（保存した一覧）はどう違いますか？',
        a: 'カテゴリーは事前に作ったツリーをクリックするだけで絞り込める簡便さが利点です。絞り込み（保存した一覧）はフィールドの条件を自由に組み合わせられる反面、条件設定の手数がかかります。分類軸が固定ならカテゴリー、複雑・可変な条件なら保存した一覧が向きます。',
      },
      {
        q: 'カテゴリーは何階層まで、いくつまで作れますか？',
        a: '最大5階層・合計1,000個まで、名称は64文字までという制限があります。カテゴリー名での検索やカテゴリー軸の集計は標準ではできない点にも注意してください。',
      },
      {
        q: 'カテゴリーとステータス（プロセス管理）の違いは？',
        a: 'カテゴリーは「分類」のための機能で、ステータス（プロセス管理）は「業務の進行状態」を管理する機能です。分類はカテゴリーや選択肢フィールド、進捗管理はプロセス管理、と役割で使い分けます。',
      },
    ],
  },
  {
    id: 'custom-view',
    term: 'カスタマイズビュー',
    reading: 'かすたまいずびゅー',
    category: 'feature',
    definition: 'HTML と JavaScript で自由に作れる一覧形式のビュー。カンバン・独自集計・ガントチャートなど標準ビューでは作れない表示を実装できるが、開発リソースが必要。',
    relatedTerms: ['view'],
    relatedPlugins: ['sheet-edit'],
    relatedBlog: ['kintone-list-styler-plugin-hikaku'],
    hasPage: true,
    longDescription: [
      'カスタマイズビューは、一覧画面の表示を HTML と JavaScript で自作できる「ビュー」の一種です。標準の表・カレンダーでは表現できないカンバンボード、ガントチャート、独自レイアウトの集計表などを実装できます。アプリ設定で「カスタマイズ」を選び、表示用の HTML 要素を用意して JavaScript で描画します。',
      '自由度が高い反面、表示も操作も自前で実装するため開発リソースが必要で、保守コストもかかります。「表形式のまま、その場でセル編集したい」「Excelのように扱いたい」といったよくある要望であれば、ゼロから組まずにプラグインで実現したほうが速く、メンテナンスも楽になります。',
    ],
    useCases: [
      '案件をステータス別のカンバンボードで表示して進捗を可視化する',
      'スケジュールをガントチャート風に並べて期間を俯瞰する',
      '一覧をExcelライクな編集グリッドにして、その場で複数レコードを編集する',
    ],
    faq: [
      { q: 'カスタマイズビューにプログラミングは必要ですか？', a: 'はい。表示内容を HTML と JavaScript で実装するため、開発の知識が必要です。要件が定番のものなら、プラグインで代替できないか先に検討すると効率的です。' },
      { q: '一覧でそのまま編集できるようにしたい', a: 'カスタマイズビューを自作しなくても、シート編集 for kintone を使えば一覧を表計算風グリッドにして、その場でセル編集できます。' },
      { q: '標準ビューとの違いは？', a: '標準ビュー（表・カレンダー）は設定だけで使えますが表現は固定です。カスタマイズビューは自由に作れる代わりに実装が必要です。' },
    ],
  },
  {
    id: 'related-records',
    term: '関連レコード一覧',
    reading: 'かんれんれこーどいちらん',
    category: 'field',
    definition: '別アプリのレコードを条件指定で参照表示するフィールド。1 対多の関連表示に使う（例：顧客アプリに「過去の問い合わせ一覧」を表示）。値はコピーされず参照のみのため、参照先が更新されると表示も自動で追随する。',
    relatedTerms: ['lookup', 'subtable'],
    relatedPlugins: ['related-record-popup'],
    relatedBlog: ['kintone-related-record-list'],
    hasPage: true,
    longDescription: [
      '関連レコード一覧は、キーとなるフィールドの一致条件をもとに、別アプリのレコードを「その都度参照して表示」する仕組みです。値を自分のレコードへコピーしないため、参照先が更新されれば表示も自動で最新になります。顧客と問い合わせ、案件と対応履歴のような「1対多」の関係を可視化するのに向いています。',
      '注意点として、表示はあくまで参照のため、関連レコード一覧の値で自アプリを絞り込んだり集計したりはできません。また帳票出力などでは「最大500件まで」といった件数制限に当たることがあります。一覧をその場でさっと開いて確認したい場合は、ポップアップ表示プラグインを併用すると画面遷移なしで確認できます。',
    ],
    useCases: [
      '顧客アプリの詳細画面に、その顧客の過去の問い合わせ・取引履歴を一覧表示する',
      '案件アプリに、ひも付く見積・請求レコードをまとめて表示する',
      '社員アプリに、その人が担当するタスクの一覧を表示する',
    ],
    faq: [
      { q: '関連レコード一覧とルックアップはどう使い分けますか？', a: '値を自分のレコードに取り込みたい（入力省力化・集計対象にしたい）ならルックアップ、最新の一覧を「見せるだけ」でよいなら関連レコード一覧が適しています。' },
      { q: '関連レコード一覧の値で絞り込みや集計はできますか？', a: 'できません。参照表示のみで自アプリのデータとしては保持されないため、絞り込み・集計の対象にはなりません。集計したい場合はルックアップで値を取り込む設計を検討します。' },
      { q: '一覧をいちいち開かずに中身を確認したい', a: '関連レコードポップアップ表示 for kintone を使うと、画面遷移せずにその場で関連レコードの内容を確認できます。' },
    ],
  },
  {
    id: 'calc',
    term: '計算フィールド',
    reading: 'けいさん',
    category: 'field',
    definition: '他のフィールドの値から自動計算される読み取り専用フィールド。数式（例：`単価 * 数量`）を設定し、レコード保存時に再計算される。ユーザーが直接編集することはできない。',
    relatedTerms: ['number'],
    relatedPlugins: ['summary-bar'],
    hasPage: true,
    longDescription: [
      '計算フィールドは、他のフィールドを参照した数式の結果を自動で表示するフィールドです。`単価 * 数量` のような四則演算のほか、`IF` による条件分岐、日付の差分計算、文字列の結合なども行えます。値はレコード保存時に再計算されるため、人手による転記ミスや計算ミスをなくせます。',
      '注意したいのは、計算フィールドは読み取り専用で直接編集できない点と、サブテーブルをまたいだ集計や、レコードを横断した合計には向かない点です。一覧画面で複数レコードの合計や平均をその場で見たい場合は、集計に特化したプラグインを併用すると、計算フィールドだけでは難しい「一覧での即時集計」が実現できます。',
    ],
    useCases: [
      '見積アプリで「単価 × 数量」「小計 × 税率」を自動計算する',
      '契約アプリで契約日から更新期限日（◯日後）を自動算出する',
      'ステータスや区分に応じて IF で表示ラベルを出し分ける',
    ],
    faq: [
      { q: '計算フィールドの値を手で修正できますか？', a: 'できません。計算フィールドは数式の結果を表示する読み取り専用フィールドです。手入力したい値は通常の数値・文字列フィールドで持ちます。' },
      { q: '一覧で複数レコードの合計を出したい', a: '計算フィールドは1レコード内の計算が基本です。一覧の絞り込み結果に対する合計・件数・平均をその場で表示したい場合は、集計サマリーバー for kintone のような集計プラグインが向いています。' },
      { q: 'サブテーブルの行を合計できますか？', a: 'サブテーブル内の数値列の合計は計算フィールドで取得できます。ただしサブテーブルをまたいだ複雑な集計には制約があります。' },
    ],
  },
  {
    id: 'guest-space',
    term: 'ゲストスペース',
    reading: 'げすとすぺーす',
    category: 'basic',
    definition: '社外のユーザー（ゲストユーザー）と限定的に共有できるスペース。取引先・顧客との情報共有や、外部協力者とのプロジェクト管理に使う。URL 構造が `/k/guest/<sId>/<appId>/` と通常スペースと異なるため、JavaScript カスタマイズでは URL パースに注意が必要。',
    relatedTerms: ['space'],
  },
  {
    id: 'cybozu-com',
    term: 'cybozu.com',
    reading: 'さいぼうずどっとこむ',
    category: 'basic',
    definition: 'サイボウズが提供するクラウドサービス共通基盤。kintone・Garoon・サイボウズ Office などが cybozu.com 上で動作する。kintone の URL は `https://<サブドメイン>.cybozu.com/k/` の形式。',
    relatedTerms: ['app'],
  },
  {
    id: 'subtable',
    term: 'サブテーブル',
    reading: 'さぶてーぶる',
    category: 'field',
    definition: '1 つのレコードの中に複数行のデータを持てるフィールド。見積書の明細・タスクのチェックリストなど「子要素のリスト」を表現する。サブテーブル内のフィールドは一覧の絞り込み条件にも使えるが、同じ行で複数条件を組み合わせて判定するような検索や集計には制約がある。',
    relatedTerms: ['related-records'],
    relatedPlugins: ['quick-toc'],
    hasPage: true,
    longDescription: [
      'サブテーブルは、1件のレコードの中に「行を追加できる小さな表」を埋め込めるフィールドです。見積書の明細行、作業報告の項目リストのように、件数が決まっていない子要素をまとめて1レコードで管理できます。行は何行でも追加・削除でき、各列には文字列・数値・日付などのフィールドを配置できます。',
      '便利な反面、検索・集計には制約があります。サブテーブル内の値で一覧を絞り込むことはできますが、「同じ行で複数条件をAND判定する」ような検索は意図どおりにならないことがあります。また別アプリの明細を参照したい場合はサブテーブルではなく関連レコード一覧が適しています。明細を別レコードとして持つか、サブテーブルで持つかは、集計・検索の要件から逆算して決めるのがコツです。',
    ],
    useCases: [
      '見積・請求アプリで、商品ごとの明細行（品名・単価・数量・金額）を持たせる',
      '日報アプリで、その日の作業項目を複数行で記録する',
      '点検アプリで、チェック項目とその結果を行単位で残す',
    ],
    faq: [
      { q: 'サブテーブルと関連レコード一覧はどう違いますか？', a: 'サブテーブルは同じレコード内に明細を持ちます。関連レコード一覧は別アプリのレコードを参照表示します。明細をそのレコード固有のデータとして持つならサブテーブル、別アプリで管理するデータを見せるなら関連レコード一覧です。' },
      { q: 'サブテーブルの行数に上限はありますか？', a: '実用上は多数の行を追加できますが、行数が極端に多いと表示や保存が重くなります。大量明細は別アプリ＋関連レコードでの管理も検討してください。' },
      { q: 'サブテーブル内の値で集計できますか？', a: '行ごとの合計など基本的な集計は計算フィールドで可能ですが、複雑な横断集計には制約があります。集計要件が強い場合は設計段階で持ち方を見直しましょう。' },
    ],
  },
  {
    id: 'javascript-api',
    term: 'JavaScript API',
    reading: 'じゃばすくりぷとえーぴーあい',
    category: 'api',
    definition: 'kintone 画面に独自のロジック・UI を組み込むためのクライアントサイド API。`kintone.events.on()` でフォーム保存前イベントに処理を挟んだり、`kintone.api()` から REST API を呼んだりできる。プラグインや JS カスタマイズの土台。',
    relatedTerms: ['rest-api', 'plugin'],
  },
  {
    id: 'detail-view',
    term: '詳細画面',
    reading: 'しょうさいがめん',
    category: 'feature',
    definition: '個別レコードの全フィールドを表示する画面。一覧画面から行頭のアイコンクリックで遷移する。コメント欄・プロセス管理・関連レコードの確認もこの画面で行う。',
    relatedTerms: ['list-view'],
    relatedPlugins: ['quick-toc', 'quick-tab', 'form-deco', 'field-comment'],
    relatedBlog: ['kintone-tsukainikunai-genin', 'kintone-design-plugin-osusume'],
    hasPage: true,
    longDescription: [
      '詳細画面は、1件のレコードの全フィールドを表示・編集する画面です。一覧画面で行頭のアイコンをクリックすると遷移し、ここでコメントのやり取り、プロセス管理のアクション、関連レコード一覧の確認を行います。日々の入力・確認作業の中心になる画面です。',
      'フィールド数が多いアプリでは、詳細画面が縦に長くなって目的の項目を探しづらくなりがちです。タブで切り替える、目次を付ける、罫線やスペースで見やすく整える、コメントを項目の近くに置く——といった工夫で使い勝手が大きく変わります。これらは標準設定とプラグインの組み合わせで実現できます。',
    ],
    useCases: [
      '顧客レコードを開いて基本情報・対応履歴・コメントをまとめて確認する',
      'プロセス管理のアクションボタンで承認・差し戻しを行う',
      '長いフォームをタブや目次で区切り、目的の項目に素早く移動する',
    ],
    faq: [
      { q: '詳細画面と編集画面は同じものですか？', a: '詳細画面は表示が中心で、そこから編集モードに切り替えると編集画面になります。JavaScript カスタマイズでは、`getFieldElement` が使えるのは詳細・印刷画面のみといった違いがあるため区別が重要です。' },
      { q: '項目が多くて詳細画面が見づらい', a: 'クイック目次 for kintone やクイックタブ for kintone で目次・タブ化すると、長いフォームでも目的の項目に素早くたどり着けます。' },
      { q: '詳細画面の見た目を整えたい', a: 'FormDeco for kintone で罫線やスペースを装飾すると、セクションの区切りが分かりやすくなります。' },
    ],
  },
  {
    id: 'process-management',
    term: 'プロセス管理',
    reading: 'ぷろせすかんり',
    category: 'feature',
    definition: 'kintone 標準のワークフロー機能。ステータスを使った承認フローや作業フロー（未対応→対応中→完了 など）を、コーディングなしで設定できる。各ステータスに作業者・アクションボタンを定義する。',
    relatedTerms: ['status'],
    relatedPlugins: ['quick-toc', 'record-lock'],
    hasPage: true,
    longDescription: [
      'プロセス管理は、レコードを「未対応 → 対応中 → 完了」のような状態（ステータス）に沿って進める、kintone 標準のワークフロー機能です。各ステータスに「次に進めるアクション（ボタン）」と「次の作業者」を定義することで、申請・承認や対応フローをノーコードで構築できます。誰のボールなのかが可視化され、対応漏れを防げます。',
      'ステータスや作業者はシステムフィールドとして自動で追加され、一覧の絞り込みや通知の条件にも使えます。運用では、ステータスが特定段階のレコードを誤って編集されないようロックしたい、長いフォームの中で今のステータスを見失わないようにしたい、といったニーズが出てきます。これらはプラグインで補えます。',
    ],
    useCases: [
      '稟議・申請アプリで「申請 → 一次承認 → 最終承認 → 完了」の承認フローを組む',
      '問い合わせ対応アプリで「受付 → 対応中 → 完了」の進捗を管理する',
      '受注アプリで「見積 → 受注 → 出荷 → 請求」と案件を前進させる',
    ],
    faq: [
      { q: 'プロセス管理にプログラミングは必要ですか？', a: '不要です。アプリ設定の「プロセス管理」でステータス・アクション・作業者を定義するだけで、ノーコードでワークフローを構築できます。' },
      { q: '承認済みのレコードを編集されないようにできますか？', a: '標準ではステータスによる編集制御は限定的です。特定ステータスのレコードを読み取り専用にしたい場合は、レコードロック for kintone のようなプラグインで制御できます。' },
      { q: 'ステータスで一覧を絞り込めますか？', a: 'できます。ステータスはフィールドとして扱えるため、「未対応のみ」などのビューや通知条件に利用できます。' },
    ],
  },
  {
    id: 'number',
    term: '数値',
    reading: 'すうち',
    category: 'field',
    definition: '数値を入力するフィールド。整数と小数を扱える。集計対象やグラフ表示に使えるが、`like` 演算子は使えないため部分一致検索は不可。',
    relatedTerms: ['calc'],
    relatedPlugins: ['summary-bar'],
  },
  {
    id: 'space',
    term: 'スペース',
    reading: 'すぺーす',
    category: 'basic',
    definition: '複数のアプリ・スレッド・タスクを業務単位でまとめる場所。「営業部スペース」「プロジェクト A スペース」のように部署・案件ごとに作成し、関連メンバーで情報を共有する。',
    relatedTerms: ['guest-space', 'app'],
  },
  {
    id: 'status',
    term: 'ステータス',
    reading: 'すてーたす',
    category: 'field',
    definition: 'プロセス管理で使われる状態フィールド。「未対応・対応中・完了」など、ワークフローの段階を表す。プロセス管理を有効化すると自動的に追加され、通常のフィールドとは別管理。',
    relatedTerms: ['process-management', 'category'],
    relatedPlugins: ['quick-toc', 'record-lock'],
  },
  {
    id: 'plugin',
    term: 'プラグイン',
    reading: 'ぷらぐいん',
    category: 'api',
    definition: 'kintone アプリに機能を追加するパッケージ。zip ファイル形式で配布され、システム管理画面からインストール後、各アプリに追加して使う。設定画面で動作をノーコードで調整できるのが特徴。',
    relatedTerms: ['plugin-id', 'kizuna-chokotto'],
    relatedPlugins: ['field-styler', 'lookup-suggest', 'quick-search'],
    relatedBlog: ['kintone-design-plugin-osusume', 'kintone-tsukainikunai-genin'],
    hasPage: true,
    longDescription: [
      'プラグインは、kintone アプリに機能を後付けできるパッケージです。zip ファイルとして配布され、システム管理画面から読み込んだあと、各アプリに追加して使います。最大の利点は、JavaScript を書かなくても設定画面の操作だけで動作を調整できること。標準機能では届かない「あと一歩」をノーコードで補えます。',
      '導入は「①zipをシステム管理に読み込む → ②対象アプリの設定でプラグインを追加 → ③設定画面で動作を指定 → ④アプリを更新」の流れが基本です。検索・一覧の見やすさ・入力補助・帳票・デザインなど、用途ごとに多くのプラグインが提供されています。まずは無料のプラグインで効果を試し、必要に応じて有料製品を検討するのが失敗の少ない進め方です。',
    ],
    useCases: [
      '一覧の検索・絞り込みを強化して目的のレコードを早く見つける',
      'フォームの見た目を整えて入力ミスや迷いを減らす',
      'ルックアップや入力補助で日々のデータ入力を省力化する',
    ],
    faq: [
      { q: 'プラグインの導入にプログラミングは必要ですか？', a: '不要です。zip を読み込んでアプリに追加し、設定画面で動作を指定するだけで使えます。多くのプラグインはノーコードで完結します。' },
      { q: '無料で使えるプラグインはありますか？', a: 'あります。KIZUNA Works では検索・デザイン・入力補助・採番など多数のプラグインを無料で配布しています。[プラグイン一覧](/plugins/)からご確認ください。' },
      { q: 'プラグインを更新するときの注意点は？', a: '同じ秘密鍵（private.ppk）から作られた同一プラグインIDで更新する必要があります。鍵が変わるとIDが変わり、別プラグイン扱いになるため注意します。' },
    ],
  },
  {
    id: 'plugin-id',
    term: 'プラグインID',
    reading: 'ぷらぐいんあいでぃー',
    category: 'api',
    definition: 'プラグインを一意に識別する文字列。秘密鍵（private.ppk）から決定論的に生成され、同じ秘密鍵を使えばビルドのたびに同じ ID になる。プラグイン更新時は秘密鍵を変えないことが重要。',
    relatedTerms: ['plugin'],
  },
  {
    id: 'kizuna-chokotto',
    term: 'ちょこっとプラグイン',
    reading: 'ちょこっとぷらぐいん',
    category: 'community',
    definition: 'KIZUNA Works が提供する無料 kintone プラグインシリーズ。フィールドスタイラー・条件分岐自動採番・クイックサイドビューなど「ちょっと便利」な機能を完全無料で配布。年間サポーターライセンスで開発を応援できる。',
    relatedTerms: ['plugin'],
    relatedPlugins: ['field-styler', 'quick-side-view'],
  },
  {
    id: 'datetime',
    term: '日時',
    reading: 'にちじ',
    category: 'field',
    definition: '年月日と時刻を入力するフィールド。タイムスタンプ的な記録に使う。秒は持たず分単位での記録となる。',
    relatedTerms: ['date'],
  },
  {
    id: 'no-code',
    term: 'ノーコード／ローコード',
    reading: 'のーこーどろーこーど',
    category: 'community',
    definition: 'プログラミングなしで業務システムを構築する開発手法。kintone は代表的なノーコード／ローコードプラットフォームで、ドラッグ＆ドロップでアプリを作成できる。本格的なカスタマイズは JavaScript／プラグインで補完する。',
    relatedTerms: ['plugin'],
    relatedBlog: ['kintone-teichaku-shinai-riyu'],
  },
  {
    id: 'date',
    term: '日付',
    reading: 'ひづけ',
    category: 'field',
    definition: '年月日を入力するフィールド。YYYY-MM-DD 形式でデータ保存され、カレンダービューでの表示にも使える。「期限日」「契約日」「対応予定日」などに利用。',
    relatedTerms: ['datetime'],
  },
  {
    id: 'view',
    term: 'ビュー',
    reading: 'びゅー',
    category: 'feature',
    definition: '一覧画面の表示形式とフィルター条件をまとめたもの。「未対応のみ表示」「今月分」など複数のビューを保存して切り替えて使う。LIST（標準の表）・カレンダー・カスタマイズの 3 形式がある。',
    relatedTerms: ['list-view', 'custom-view'],
  },
  {
    id: 'field',
    term: 'フィールド',
    reading: 'ふぃーるど',
    category: 'basic',
    definition: 'レコードの 1 項目。文字列・数値・日付・ルックアップなど 20 種類以上の型があり、用途に応じて選択する。フォーム編集画面でドラッグ＆ドロップ配置する。',
    relatedTerms: ['lookup', 'subtable', 'calc'],
    relatedPlugins: ['field-styler'],
    relatedBlog: ['kintone-field-styler-plugin-guide'],
    hasPage: true,
    longDescription: [
      'フィールドは、レコードを構成する1つひとつの入力項目です。文字列・数値・日付・ドロップダウン・ルックアップ・添付ファイルなど20種類以上の型があり、扱いたいデータに合わせて選びます。フォーム編集画面でドラッグ＆ドロップして配置し、各フィールドには重複を許さない「フィールドコード」が割り当てられます。',
      'フィールドの型選びは後からの検索・集計・連携に直結します。たとえば部分一致検索したい項目は文字列系（`like` 演算子が使える型）にする、選択肢で絞り込みたい項目はドロップダウンにする、といった設計が重要です。見た目の面では、重要な項目を色分けして目立たせたり、入力ルールを補助したりといった調整をプラグインで行えます。',
    ],
    useCases: [
      '会社名・氏名は文字列(1行)、金額は数値、対応区分はドロップダウンと型を使い分ける',
      'マスタから値を取り込みたい項目はルックアップにして入力を省力化する',
      '必須項目や警告対象のフィールドを色分けして入力ミスを減らす',
    ],
    faq: [
      { q: 'フィールドの型は後から変更できますか？', a: '型によっては変更できない、または制限があります（例：文字列から数値など）。データが入った後の変更は慎重に。設計段階で検索・集計の要件から型を決めるのが安全です。' },
      { q: 'どの型が部分一致検索に使えますか？', a: '文字列(1行)・文字列(複数行)・リッチエディター・リンクなどが `like` 演算子による部分一致に対応します。数値や選択肢系は部分一致では検索できません。' },
      { q: '特定のフィールドを目立たせたい', a: 'フィールドスタイラー for kintone で背景色・文字色・条件付きスタイルを設定すると、重要な項目をノーコードで強調できます。' },
    ],
  },
  {
    id: 'portal',
    term: 'ポータル',
    reading: 'ぽーたる',
    category: 'basic',
    definition: 'kintone にログイン後、最初に表示される画面。お知らせ・通知・アプリ一覧などを集約表示する。組織のトップページ的な役割を持つ。',
    relatedTerms: ['space', 'app'],
  },
  {
    id: 'single-line-text',
    term: '文字列(1行)',
    reading: 'もじれついちぎょう',
    category: 'field',
    definition: '1 行のテキストを入力するフィールド。最も基本的なフィールドで、会社名・氏名・タイトルなどに使う。`like` 演算子で部分一致検索が可能。',
    relatedTerms: ['multi-line-text', 'rich-text', 'lookup'],
    relatedPlugins: ['quick-search'],
  },
  {
    id: 'multi-line-text',
    term: '文字列(複数行)',
    reading: 'もじれつふくすうぎょう',
    category: 'field',
    definition: '改行を含む長文を入力できるフィールド。備考・対応内容・議事録などの記録に使う。リッチエディターほどの装飾は不要だが、改行を保持したい場合に最適。',
    relatedTerms: ['single-line-text', 'rich-text'],
  },
  {
    id: 'record',
    term: 'レコード',
    reading: 'れこーど',
    category: 'basic',
    definition: 'アプリの 1 件のデータ。Excel で言う 1 行に相当し、複数のフィールドの値を持つ。レコード一覧画面で一覧表示し、詳細画面で個別表示する。',
    relatedTerms: ['app', 'field'],
    relatedPlugins: ['quick-side-view', 'quick-toc'],
    relatedBlog: ['kintone-tsukainikunai-genin'],
  },
  {
    id: 'rich-text',
    term: 'リッチエディター',
    reading: 'りっちえでぃたー',
    category: 'field',
    definition: '太字・色・箇条書き・リンクなどの書式付きテキストを入力できるフィールド。HTML 形式で保存される。装飾の自由度は高いが、検索やデータ集計には向かない。',
    relatedTerms: ['multi-line-text'],
  },
  {
    id: 'lookup',
    term: 'ルックアップ',
    reading: 'るっくあっぷ',
    category: 'field',
    definition: '別のアプリのレコードを参照して値をコピーするフィールド機能。マスタアプリから商品名・顧客情報を引っ張ってきて入力の手間を減らし、データの一貫性を保つ。form/fields API では type が `SINGLE_LINE_TEXT` などとして返るが `lookup` プロパティの有無で判定できる。',
    relatedTerms: ['related-records', 'field'],
    relatedPlugins: ['lookup-suggest'],
    relatedBlog: ['kintone-2026-04-update'],
    hasPage: true,
    longDescription: [
      'ルックアップを使うと、商品マスタや顧客マスタといった「正となるアプリ」から、商品名・単価・住所などの値を取得して現在のレコードにコピーできます。毎回同じ情報を手入力する必要がなくなり、表記ゆれや入力ミスを防げるのが最大のメリットです。',
      'コピー元のキー（商品コードなど）を入力して取得すると、関連づけた複数フィールドへ一度に値が転記されます。コピーされた値は取得した時点のスナップショットで、後からマスタ側を変更しても自動では追随しません。最新化したい場合は取得をやり直します。この点が、常に参照先を映す「関連レコード一覧」との大きな違いです。',
    ],
    useCases: [
      '受注アプリで商品コードを入力し、商品名・単価・税区分をマスタから自動取得する',
      '問い合わせアプリで顧客IDを入力し、会社名・担当者・電話番号を取得する',
      '案件アプリで取引先名を入力し、住所などの基本情報を取得して入力を省力化する',
    ],
    faq: [
      { q: 'ルックアップと関連レコード一覧の違いは？', a: 'ルックアップは取得した時点の値を自分のレコードに「コピー」します。関連レコード一覧は参照先を「その都度表示」するだけで値は保持しません。入力を省力化したいならルックアップ、最新の一覧を見せたいなら関連レコード一覧が向いています。' },
      { q: 'マスタを更新したらルックアップの値も変わりますか？', a: 'いいえ。コピー済みの値は自動では変わりません。最新の値にしたい場合は、対象レコードでルックアップの取得をやり直す必要があります。' },
      { q: '入力候補をもっと探しやすくできますか？', a: '標準のルックアップは候補を探しづらいことがあります。入力途中から候補を絞り込めるルックアップサジェスト for kintone を使うと、選択が速くなります。' },
    ],
  },
  {
    id: 'rest-api',
    term: 'REST API',
    reading: 'れすとえーぴーあい',
    category: 'api',
    definition: 'kintone が提供する HTTP ベースの API。`GET /k/v1/records` でレコード取得、`POST /k/v1/record` で追加など。外部システム連携や一括処理の起点になる。API トークン認証または BASIC 認証で利用する。',
    relatedTerms: ['javascript-api', 'webhook'],
  },
  // ----- 選択肢系フィールド -----
  {
    id: 'radio-button',
    term: 'ラジオボタン',
    reading: 'らじおぼたん',
    category: 'field',
    definition: '複数の選択肢から 1 つだけを選ぶフィールド。選択肢が 3〜5 個程度で、必ず 1 つ選ぶ必要がある項目（性別・優先度・対応区分など）に使う。`like` 演算子は使えず、`in` 演算子で絞り込む。',
    relatedTerms: ['drop-down', 'check-box'],
    relatedPlugins: ['quick-search', 'field-styler', 'quick-toc'],
  },
  {
    id: 'check-box',
    term: 'チェックボックス',
    reading: 'ちぇっくぼっくす',
    category: 'field',
    definition: '複数の選択肢から 0 個以上を選べるフィールド。「該当する項目をすべて選択」のような用途（保有資格・興味分野など）に使う。値は配列として保存され、`in` 演算子で「含むかどうか」の絞り込みが可能。',
    relatedTerms: ['multi-select', 'radio-button'],
    relatedPlugins: ['quick-search'],
  },
  {
    id: 'drop-down',
    term: 'ドロップダウン',
    reading: 'どろっぷだうん',
    category: 'field',
    definition: '複数の選択肢から 1 つを選ぶプルダウン形式のフィールド。選択肢が多い場合や画面スペースを節約したい場合にラジオボタンよりも便利。`in` 演算子で絞り込む。',
    relatedTerms: ['radio-button', 'multi-select'],
    relatedPlugins: ['quick-search', 'field-styler', 'quick-toc'],
  },
  {
    id: 'multi-select',
    term: '複数選択',
    reading: 'ふくすうせんたく',
    category: 'field',
    definition: '複数の選択肢から複数を選べるドロップダウン形式のフィールド。チェックボックスより選択肢が多い場合に向き、タグ付け・カテゴリ複数指定などに使う。`in` 演算子で絞り込む。',
    relatedTerms: ['check-box', 'drop-down'],
    relatedPlugins: ['quick-search'],
  },
  // ----- 時刻系 -----
  {
    id: 'time',
    term: '時刻',
    reading: 'じこく',
    category: 'field',
    definition: '時刻（時：分）を入力するフィールド。開始時刻・終了時刻など、日付とは独立した時刻管理に使う。秒は持たず HH:MM 形式で保存される。',
    relatedTerms: ['date', 'datetime'],
  },
  // ----- ファイル・リンク系 -----
  {
    id: 'file',
    term: '添付ファイル',
    reading: 'てんぷふぁいる',
    category: 'field',
    definition: 'PDF・画像・Excel などのファイルをアップロード添付できるフィールド。1 つのフィールドに複数ファイルをまとめて持てる。一覧画面では標準ではファイルの中身が見えないため、添付の有無や種別を可視化するプラグインを併用すると便利。',
    relatedTerms: ['record'],
    relatedPlugins: ['file-icon-marker', 'file-preview'],
    hasPage: true,
    longDescription: [
      '添付ファイルフィールドは、PDF・画像・Excel・Word などのファイルをレコードに添付できるフィールドです。1つのフィールドに複数ファイルをまとめて持てるため、見積書・契約書・現場写真などの関連資料をレコードと一緒に管理できます。',
      '標準では、一覧画面で「ファイルが付いているか」「何のファイルか」がひと目で分かりません。確認のたびに詳細画面を開く必要があり、件数が多いと手間です。添付の有無や種別をアイコンで可視化したり、開かずに中身をプレビューできるようにするプラグインを併用すると、確認作業が大幅に速くなります。',
    ],
    useCases: [
      '案件レコードに見積書・発注書などの関連ファイルをまとめて添付する',
      '現場報告アプリに作業前後の写真を添付して記録する',
      '一覧でファイルの有無・種別をアイコン表示して、開かずに把握する',
    ],
    faq: [
      { q: '1つのフィールドに複数ファイルを添付できますか？', a: 'できます。1つの添付ファイルフィールドに複数のファイルをまとめて持てます。' },
      { q: '一覧でどのレコードにファイルが付いているか分かりますか？', a: '標準では分かりにくいです。添付ファイルアイコン表示 for kintone を使うと、一覧でファイルの有無・種別をアイコンで可視化できます。' },
      { q: '添付ファイルを開かずに中身を確認したい', a: '添付ファイルプレビュー for kintone を使うと、ダウンロードせずに画像やPDFなどの中身をその場でプレビューできます。' },
    ],
  },
  {
    id: 'link',
    term: 'リンク',
    reading: 'りんく',
    category: 'field',
    definition: 'URL・電話番号・メールアドレスを入力するフィールド。値の形式に応じて自動的にハイパーリンク化される（ブラウザで開く／電話発信／メーラーで作成）。`like` 演算子で部分一致検索が可能。',
    relatedTerms: ['single-line-text'],
    relatedPlugins: ['quick-search'],
  },
  // ----- 人物選択系 -----
  {
    id: 'user-select',
    term: 'ユーザー選択',
    reading: 'ゆーざーせんたく',
    category: 'field',
    definition: 'cybozu.com に登録されているユーザーから選ぶフィールド。担当者・承認者・対応者などの指定に使う。値は `[{code, name}]` 形式の配列。CSV インポートでは値が反映されない仕様に注意。',
    relatedTerms: ['organization-select', 'group-select'],
  },
  {
    id: 'organization-select',
    term: '組織選択',
    reading: 'そしきせんたく',
    category: 'field',
    definition: 'cybozu.com に登録されている組織から選ぶフィールド。担当部署・関連組織などの指定に使う。値は `[{code, name}]` 形式の配列。CSV インポートでは値が反映されない仕様に注意。',
    relatedTerms: ['user-select', 'group-select'],
  },
  {
    id: 'group-select',
    term: 'グループ選択',
    reading: 'ぐるーぷせんたく',
    category: 'field',
    definition: 'cybozu.com に登録されているグループ（業務役割）から選ぶフィールド。プロジェクトメンバーやワークフロー対象グループの指定に使う。値は `[{code, name}]` 形式の配列。CSV インポートでは値が反映されない仕様に注意。',
    relatedTerms: ['user-select', 'organization-select'],
  },
  // ----- システムフィールド -----
  {
    id: 'record-number',
    term: 'レコード番号',
    reading: 'れこーどばんごう',
    category: 'field',
    definition: 'レコードに自動採番される一意の番号。アプリ作成時に自動的に追加されるシステムフィールドで、ユーザーが値を変更することはできない。プレフィックスや初期値などの採番ルールはアプリ設定でカスタマイズ可能。',
    relatedTerms: ['record'],
    relatedPlugins: ['kw-conditional-numbering'],
    relatedBlog: ['kintone-jido-saiban'],
    hasPage: true,
    longDescription: [
      'レコード番号は、レコードが追加されるたびに1ずつ増える一意の連番で、アプリ作成時に自動で用意されるシステムフィールドです。プレフィックス（例：`A-`）や開始番号はアプリ設定で指定できますが、基本は「アプリ内で1本のシンプルな連番」として動作します。',
      'そのため「区分ごとに連番を分ける」「日付や接頭辞を組み合わせる」「年度・月でリセットする」といった業務寄りの採番要件には、標準のレコード番号だけでは対応できません。こうした採番コードを作りたい場合は、計算フィールドの工夫か、条件分岐に対応した採番プラグインの導入が現実的です。',
    ],
    useCases: [
      '問い合わせ番号・申請番号など、アプリ内で重複しない通し番号として使う',
      '開始番号を既存システムに合わせて「10001」から振り直す',
      'プレフィックス付き（例：`REQ-1`）の簡易的な番号として表示する',
    ],
    faq: [
      { q: 'レコード番号は後から変更できますか？', a: 'できません。レコード番号はシステムが自動採番する読み取り専用の値で、手動での変更はできません。' },
      { q: '「区分ごとに連番を分ける」ことはできますか？', a: '標準のレコード番号ではできません。区分ごとの独立連番や日付＋接頭辞＋連番の組み立ては、条件分岐自動採番 for kintone のような採番プラグインで実現できます。詳しくは「[kintoneで自動採番する方法](/blog/kintone-jido-saiban/)」をご覧ください。' },
      { q: '年度や月でリセットできますか？', a: '標準機能ではできません。リセット周期（年・月・日）を指定した採番は採番プラグインが必要です。' },
    ],
  },
  {
    id: 'creator',
    term: '作成者',
    reading: 'さくせいしゃ',
    category: 'field',
    definition: 'レコードを作成したユーザーを記録するシステムフィールド。レコード作成時に自動セットされ、後から変更することはできない。`code`（cybozu.com ログイン名）と `name`（表示名）を持つ。',
    relatedTerms: ['created-time', 'modifier'],
  },
  {
    id: 'created-time',
    term: '作成日時',
    reading: 'さくせいにちじ',
    category: 'field',
    definition: 'レコードが最初に作成された日時を記録するシステムフィールド。レコード作成時に自動セットされ、後から変更することはできない。タイムゾーン情報付きの ISO 8601 形式で保存される。',
    relatedTerms: ['creator', 'updated-time'],
  },
  {
    id: 'modifier',
    term: '更新者',
    reading: 'こうしんしゃ',
    category: 'field',
    definition: 'レコードを最後に更新したユーザーを記録するシステムフィールド。レコード保存時に自動更新される。`code` と `name` を持つ。',
    relatedTerms: ['creator', 'updated-time'],
  },
  {
    id: 'updated-time',
    term: '更新日時',
    reading: 'こうしんにちじ',
    category: 'field',
    definition: 'レコードが最後に更新された日時を記録するシステムフィールド。レコード保存時に自動更新される。タイムゾーン情報付きの ISO 8601 形式で保存される。',
    relatedTerms: ['modifier', 'created-time'],
  },
  {
    id: 'status-assignee',
    term: '作業者',
    reading: 'さぎょうしゃ',
    category: 'field',
    definition: 'プロセス管理で現在対応中のユーザーを表すフィールド。ステータスの遷移時に作業者が変更される設定にできる。複数の作業者を割り当てたり、OR／AND 条件で対応者を絞り込んだりが可能。',
    relatedTerms: ['status', 'process-management'],
  },
  // ----- レイアウト要素 -----
  {
    id: 'spacer',
    term: 'スペース要素',
    reading: 'すぺーすようそ',
    category: 'layout',
    definition: 'フォーム編集画面でドラッグして配置できるレイアウト要素（スペースフィールドとも呼ぶ）。値は持たないが「要素ID」を設定することで、JavaScript カスタマイズやプラグインから差し込み対象として参照できる。ルックアップサジェストのようにスペース上に独自 UI を描画するプラグインで頻繁に利用される。',
    relatedTerms: ['field', 'label-element', 'hr-line'],
    relatedPlugins: ['lookup-suggest', 'form-deco', 'quick-tab'],
    relatedBlog: ['kintone-design-plugin-osusume'],
  },
  {
    id: 'label-element',
    term: 'ラベル',
    reading: 'らべる',
    category: 'layout',
    definition: 'フォームに表示する固定テキストのレイアウト要素。「セクションの説明」「注意書き」など、レコードのデータとは独立した説明文を画面上に表示する。値を持たないため、レコードに保存されることはない。',
    relatedTerms: ['spacer', 'hr-line'],
    relatedPlugins: ['quick-toc', 'form-deco'],
    relatedBlog: ['kintone-design-plugin-osusume'],
  },
  {
    id: 'hr-line',
    term: '罫線',
    reading: 'けいせん',
    category: 'layout',
    definition: 'フォーム上の区切り線を表すレイアウト要素。フィールド間にセクションの境界線を引いて視覚的にグループ化する目的で使う。値を持たない。標準では細い灰色の横線だが、装飾プラグインでスタイルを変更できる。',
    relatedTerms: ['spacer', 'group-element'],
    relatedPlugins: ['form-deco'],
  },
  {
    id: 'group-element',
    term: 'グループ要素',
    reading: 'ぐるーぷようそ',
    category: 'layout',
    definition: '複数のフィールドをまとめて折りたたみ可能なグループにできるレイアウト要素。長いフォームを「基本情報」「詳細情報」のようにセクションに分けて開閉できる。値を持たない（「グループ選択」フィールドとは別物なので注意）。',
    relatedTerms: ['group-select', 'hr-line', 'label-element'],
    relatedPlugins: ['quick-toc'],
  },
  {
    id: 'kintone-hive',
    term: 'kintone hive',
    reading: 'きんとーんはいぶ',
    category: 'community',
    definition: 'サイボウズ主催のユーザー事例発表イベント。各地区での予選を勝ち抜いたユーザー企業が日本各地で事例を発表し、年に一度のファイナルで頂点が決まる。グランプリ受賞者は kintone AWARD として表彰され、kintone コミュニティの一大イベントとなっている。',
    relatedTerms: [],
  },
];

const rowMatchers: Array<[string, string]> = [
  ['あ', 'あいうえお'],
  ['か', 'かきくけこがぎぐげご'],
  ['さ', 'さしすせそざじずぜぞ'],
  ['た', 'たちつてとだぢづでど'],
  ['な', 'なにぬねの'],
  ['は', 'はひふへほばびぶべぼぱぴぷぺぽ'],
  ['ま', 'まみむめも'],
  ['や', 'やゆよ'],
  ['ら', 'らりるれろ'],
  ['わ', 'わをん'],
];

export function getGojuonRow(reading: string): string {
  if (!reading) return '英数';
  const first = reading.charAt(0);
  for (const [row, chars] of rowMatchers) {
    if (chars.includes(first)) return row;
  }
  return '英数';
}

export const rowOrder = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', '英数'];
