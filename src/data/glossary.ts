// Single source of truth for the kintone glossary page.
// Add an entry here and the page, search, filter, and DefinedTermSet JSON-LD
// all pick it up automatically.

export type TermCategory = 'basic' | 'field' | 'feature' | 'operation' | 'api' | 'community';

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
}

export const categoryLabels: Record<TermCategory, string> = {
  basic: '基本',
  field: 'フィールド',
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
    definition: 'レコードを表形式で一覧表示する画面。フィルター・ソート・絞り込みの起点で、kintone 利用時に最も滞在時間が長い画面。表示するフィールドや並び順は「ビュー」で制御する。',
    relatedTerms: ['detail-view', 'view'],
    relatedPlugins: ['quick-search', 'quick-side-view', 'file-icon-marker'],
  },
  {
    id: 'webhook',
    term: 'Webhook',
    reading: 'うぇぶふっく',
    category: 'api',
    definition: 'レコード追加・編集・削除・ステータス変更などのイベントを、指定した URL に HTTP POST で通知する kintone の機能。Slack 通知・他システム連携の起点として使われる。',
    relatedTerms: ['rest-api'],
  },
  {
    id: 'category',
    term: 'カテゴリー',
    reading: 'かてごりー',
    category: 'field',
    definition: 'レコードを階層的に分類できる機能。例：「営業部 > 一課」のような階層タグを付けて絞り込みに使う。通常フィールドとは別の管理になっており、有効化することで利用できる。',
    relatedTerms: ['status'],
  },
  {
    id: 'custom-view',
    term: 'カスタマイズビュー',
    reading: 'かすたまいずびゅー',
    category: 'feature',
    definition: 'HTML と JavaScript で自由に作れる一覧形式のビュー。カンバン・独自集計・ガントチャートなど標準ビューでは作れない表示を実装できるが、開発リソースが必要。',
    relatedTerms: ['view'],
  },
  {
    id: 'related-records',
    term: '関連レコード一覧',
    reading: 'かんれんれこーどいちらん',
    category: 'field',
    definition: '別アプリのレコードを条件指定で参照表示するフィールド。1 対多の関連表示に使う（例：顧客アプリに「過去の問い合わせ一覧」を表示）。値はコピーされず参照のみのため、参照先が更新されると表示も自動で追随する。',
    relatedTerms: ['lookup', 'subtable'],
  },
  {
    id: 'calc',
    term: '計算フィールド',
    reading: 'けいさん',
    category: 'field',
    definition: '他のフィールドの値から自動計算される読み取り専用フィールド。数式（例：`単価 * 数量`）を設定し、レコード保存時に再計算される。ユーザーが直接編集することはできない。',
    relatedTerms: ['number'],
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
    definition: '1 つのレコードの中に複数行のデータを持てるフィールド。見積書の明細・タスクのチェックリストなど「子要素のリスト」を表現する。集計や検索では制約があり、サブテーブル内の値だけを条件にした絞り込みはできない。',
    relatedTerms: ['related-records'],
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
    relatedPlugins: ['form-deco'],
  },
  {
    id: 'process-management',
    term: 'プロセス管理',
    reading: 'ぷろせすかんり',
    category: 'feature',
    definition: 'kintone 標準のワークフロー機能。ステータスを使った承認フローや作業フロー（未対応→対応中→完了 など）を、コーディングなしで設定できる。各ステータスに作業者・アクションボタンを定義する。',
    relatedTerms: ['status'],
  },
  {
    id: 'number',
    term: '数値',
    reading: 'すうち',
    category: 'field',
    definition: '数値を入力するフィールド。整数と小数を扱える。集計対象やグラフ表示に使えるが、`like` 演算子は使えないため部分一致検索は不可。',
    relatedTerms: ['calc'],
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
  },
  {
    id: 'plugin',
    term: 'プラグイン',
    reading: 'ぷらぐいん',
    category: 'api',
    definition: 'kintone アプリに機能を追加するパッケージ。zip ファイル形式で配布され、システム管理画面からインストール後、各アプリに追加して使う。設定画面で動作をノーコードで調整できるのが特徴。',
    relatedTerms: ['plugin-id', 'kizuna-chokotto'],
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
    definition: 'レコードの 1 項目。文字列・数値・日付・ルックアップなど数十種類の型があり、用途に応じて選択する。フォーム編集画面でドラッグ＆ドロップ配置する。',
    relatedTerms: ['lookup', 'subtable', 'calc'],
    relatedPlugins: ['field-styler'],
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
    relatedPlugins: ['quick-side-view'],
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
  },
  {
    id: 'rest-api',
    term: 'REST API',
    reading: 'れすとえーぴーあい',
    category: 'api',
    definition: 'kintone が提供する HTTP ベースの API。`GET /k/v1/records` でレコード取得、`POST /k/v1/record` で追加など。外部システム連携や一括処理の起点になる。API トークン認証または BASIC 認証で利用する。',
    relatedTerms: ['javascript-api', 'webhook'],
  },
  {
    id: 'kintone-hive',
    term: 'kintone hive',
    reading: 'きんとーんはいぶ',
    category: 'community',
    definition: 'サイボウズ主催のユーザー事例発表イベント。各社の kintone 活用事例が発表され、優秀事例は kintone AWARD として表彰される。kintone コミュニティの一大イベント。',
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
