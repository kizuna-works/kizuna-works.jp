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
    definition: 'レコードを表形式で一覧表示する画面。アプリを開いたときの起点になる画面で、フィルター・ソート・絞り込みを行ってから個別レコードを開いていく。表示するフィールドや並び順は「ビュー」で制御する。',
    relatedTerms: ['detail-view', 'view'],
    relatedPlugins: ['quick-search', 'quick-side-view', 'file-icon-marker'],
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
    definition: '1 つのレコードの中に複数行のデータを持てるフィールド。見積書の明細・タスクのチェックリストなど「子要素のリスト」を表現する。サブテーブル内のフィールドは一覧の絞り込み条件にも使えるが、同じ行で複数条件を組み合わせて判定するような検索や集計には制約がある。',
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
    definition: 'レコードの 1 項目。文字列・数値・日付・ルックアップなど 20 種類以上の型があり、用途に応じて選択する。フォーム編集画面でドラッグ＆ドロップ配置する。',
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
  // ----- 選択肢系フィールド -----
  {
    id: 'radio-button',
    term: 'ラジオボタン',
    reading: 'らじおぼたん',
    category: 'field',
    definition: '複数の選択肢から 1 つだけを選ぶフィールド。選択肢が 3〜5 個程度で、必ず 1 つ選ぶ必要がある項目（性別・優先度・対応区分など）に使う。`like` 演算子は使えず、`in` 演算子で絞り込む。',
    relatedTerms: ['drop-down', 'check-box'],
    relatedPlugins: ['quick-search', 'field-styler'],
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
    relatedPlugins: ['quick-search', 'field-styler'],
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
    relatedPlugins: ['file-icon-marker'],
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
    relatedPlugins: ['kw-conditional-numbering'],
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
