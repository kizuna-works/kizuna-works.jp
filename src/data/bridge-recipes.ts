// KIZUNAブリッジ for kintone の「使い方の例」。
// 製品ページ（/plugins/bridge/）の代表例と、例の一覧ページ（/plugins/bridge/recipes/）の両方がここを読む。
//
// 載せてよいのは、実在の機能だけで組めるルールに限る（docs/kw-bridge_USAGE.md 5章・9章で確かめる）。
// とくに次は「できない」ので書かない：
//   - 削除のきっかけで他のアプリへ書く（削除する前は、止める・確認するだけ）
//   - 1件に決まらない相手との双方向の同期（相手が複数だと何もしない）
//   - 他のアプリの値と、このレコードのフィールドを比べる条件（他のアプリの条件は ある・ない・件数・合計）

export type BridgeSceneKey = 'stock' | 'billing' | 'project' | 'master' | 'check' | 'daily' | 'plugin';

export const bridgeScenes: { key: BridgeSceneKey; label: string }[] = [
  { key: 'stock', label: '在庫・受発注' },
  { key: 'billing', label: '請求・入金' },
  { key: 'project', label: '案件・集計' },
  { key: 'master', label: '顧客・マスタ' },
  { key: 'check', label: '入力チェック・承認' },
  { key: 'daily', label: '期日・入力の手間' },
  { key: 'plugin', label: '当社のプラグインと組み合わせる' },
];

export interface BridgeRecipe {
  /** Anchor on the recipes page (#id). Keep stable: it is shared by URL. */
  id: string;
  title: string;
  scenes: BridgeSceneKey[];
  /** Shown on the product page as well as the recipes page. */
  featured?: boolean;
  /** Apps involved, left to right. `both` draws a two-way arrow. */
  flow: { from: string; to?: string; both?: boolean };
  /** What people do by hand today. */
  now: string;
  trigger: string;
  condition: string;
  actions: string[];
  result: string;
  /** Plugin ids (plugins.ts) that this recipe uses together with the bridge. */
  partners?: string[];
}

export const bridgeRecipes: BridgeRecipe[] = [
  {
    id: 'stock-allocate',
    title: '受注を承認したら、在庫の数を減らす',
    scenes: ['stock'],
    featured: true,
    flow: { from: '受注', to: '在庫' },
    now: '受注が承認されるたびに在庫アプリを開き、商品ごとに数を手で引いている。',
    trigger: 'アクションを実行した後',
    condition: '実行したアクションが「承認する」',
    actions: [
      '他のアプリのレコードを更新する：在庫アプリで「商品コード」が明細の商品コードと同じレコードを探す',
      '「在庫数」から、明細の「数量」を引く（テーブルの行ごとに行う）',
    ],
    result: '承認と同時に、明細の商品ごとに在庫が減ります。［取消］のアクションで同じ数を足すルールも作っておけば、取り消したときに在庫が戻ります。',
  },
  {
    id: 'billing-create',
    title: '案件が「完了」になったら、請求のレコードを作る',
    scenes: ['billing', 'plugin'],
    featured: true,
    flow: { from: '案件', to: '請求' },
    now: '完了した案件を一覧で探し、請求アプリに顧客・金額・担当を写している。',
    trigger: 'アクションを実行した後',
    condition: '実行したアクションが「完了にする」',
    actions: [
      '他のアプリにレコードを作る：請求アプリに、顧客・金額・担当をコピーする',
      '［書き込み先のアプリの採番・文字列結合なども当てる］をオンにする',
    ],
    result: '完了にした時点で請求のレコードができ、請求アプリの条件分岐自動採番で請求番号も振られます。',
    partners: ['kw-conditional-numbering'],
  },
  {
    id: 'project-hours',
    title: '日報の工数を、案件ごとに合計する',
    scenes: ['project'],
    featured: true,
    flow: { from: '日報', to: '案件' },
    now: '月末に、日報を案件ごとに絞り込んで工数を集計し、案件に書き写している。',
    trigger: 'ボタンを押したとき（案件アプリの一覧の上）',
    condition: 'いつも',
    actions: [
      '他のアプリから値を取ってくる：日報アプリで「案件番号」が同じレコードを全件集計する',
      '「工数」の合計を、案件の「実績工数」に入れる',
    ],
    result: '案件の一覧でボタンを押すと、絞り込んだ案件（2,000件まで）の実績工数を日報から集計し直します。値がフィールドに残るので、グラフや絞り込みにも使えます。',
  },
  {
    id: 'master-sync',
    title: '本社と拠点の顧客情報を、どちらで直してもそろえる',
    scenes: ['master'],
    featured: true,
    flow: { from: '本社の顧客', to: '拠点の顧客', both: true },
    now: '顧客の移転や電話番号の変更を、本社と拠点のアプリでそれぞれ直している。',
    trigger: '保存した後',
    condition: 'いつも',
    actions: [
      '決めた項目を双方向にそろえる：拠点の顧客アプリと「顧客コード」でつなぐ',
      '住所・電話番号・担当者を、両方向でそろえる',
    ],
    result: 'どちらのアプリで直しても、もう片方の同じ顧客に反映します。両方で同時に直されたときは上書きせずに記録し、管理者がどちらを残すか選べます。',
  },
  {
    id: 'master-delete-guard',
    title: '受注のある顧客は、削除させない',
    scenes: ['master', 'check'],
    featured: true,
    flow: { from: '顧客', to: '受注' },
    now: '取引のある顧客を誤って削除し、受注からどの顧客か分からなくなった。',
    trigger: '削除する前',
    condition: '他のアプリのレコード：受注アプリに「顧客コード」が同じレコードがある',
    actions: ['エラーを出して止める：「この顧客には受注があるため削除できません」'],
    result: '受注のある顧客は削除できず、理由が画面に出ます。受注の無い顧客は、これまでどおり削除できます。',
  },
  {
    id: 'plugin-bulk-status',
    title: 'まとめて「完了」にした案件にも、請求のレコードを作る',
    scenes: ['billing', 'plugin'],
    featured: true,
    flow: { from: '案件', to: '請求' },
    now: '一覧でまとめてステータスを進めると、1件ずつ完了にしたときの処理が抜けてしまう。',
    trigger: 'かんたん一括更新・ステータス一括実行で変えたとき',
    condition: 'ステータスが「完了」',
    actions: ['他のアプリにレコードを作る：請求アプリに、顧客・金額・担当をコピーする'],
    result: 'ステータス一括実行でまとめて完了にしても、1件ずつ完了にしたときと同じように請求のレコードができます。',
    partners: ['kw-status-bulk-action', 'kw-bulk-update'],
  },
  {
    id: 'stock-ship-rows',
    title: '受注の明細1行ごとに、出荷のレコードを作る',
    scenes: ['stock', 'plugin'],
    flow: { from: '受注', to: '出荷' },
    now: '受注の明細を見ながら、出荷アプリに1行ずつ入力し直している。',
    trigger: '保存した後（新規作成の画面）',
    condition: 'いつも',
    actions: [
      '他のアプリにレコードを作る：出荷アプリに、明細の商品・数量・納期をコピーする（テーブルの行ごとに行う）',
      '［書き込み先のアプリのチャット通知も送る］をオンにする',
    ],
    result: '受注を登録すると、出荷のレコードが明細の行の数だけでき、出荷アプリのチャット通知のルールで倉庫のチャットに知らせが届きます。',
    partners: ['kw-chat-notify'],
  },
  {
    id: 'billing-payment',
    title: '入金を登録したら、請求の入金済額に足す',
    scenes: ['billing'],
    flow: { from: '入金', to: '請求' },
    now: '入金のたびに請求のレコードを探し、入金済の金額を電卓で足している。',
    trigger: '保存した後（新規作成の画面）',
    condition: 'いつも',
    actions: [
      '他のアプリのレコードを更新する：請求アプリで「請求番号」が同じレコードを探す',
      '「入金済額」に、入金の「入金額」を足す',
    ],
    result: '入金を登録するだけで、請求の入金済額が合います。新規作成の画面だけで動かすので、あとから入金のレコードを開いて保存しても、二重には足しません。',
  },
  {
    id: 'master-fetch',
    title: '顧客コードを入れたら、最新の住所と担当営業を取ってくる',
    scenes: ['master', 'daily'],
    flow: { from: '顧客', to: '見積' },
    now: 'ルックアップで写した住所が、顧客マスタを直しても古いまま残っている。',
    trigger: 'フィールドの値を変えたとき（顧客コード）',
    condition: 'いつも',
    actions: ['他のアプリから値を取ってくる：顧客アプリで「顧客コード」が同じレコードから、住所・担当営業を写す'],
    result: '顧客コードを入れた時点の最新の値が入ります。同じルールを「保存する前」にも置けば、保存のたびに顧客マスタの値に合わせ直せます。',
  },
  {
    id: 'check-confirm',
    title: '100万円を超える見積だけ、承認依頼の前に確かめる',
    scenes: ['check'],
    flow: { from: '見積' },
    now: '金額の大きい見積を、見直さないまま承認依頼に回してしまうことがある。',
    trigger: 'アクションを実行する前',
    condition: '実行したアクションが「承認依頼」、かつ「金額」が 1,000,000 より大きい',
    actions: ['確認してから進める：「100万円を超える見積です。承認依頼に進めますか？」'],
    result: '条件に合うときだけ確認の画面が出ます。［キャンセル］を押すと、承認依頼に進みません。',
  },
  {
    id: 'check-mobile-photo',
    title: 'スマホから報告するときは、写真の添付を必須にする',
    scenes: ['check'],
    flow: { from: '作業報告' },
    now: '現場からの報告に写真が付いておらず、あとで撮り直しを頼んでいる。',
    trigger: '保存する前',
    condition: '使っている端末がモバイル、かつ「写真」が空',
    actions: ['エラーを出して止める：「現場の写真を添付してください」（「写真」の下に出す）'],
    result: 'スマホからの報告だけ、写真が無いと保存できません。パソコンからの事務の入力は止めません。',
  },
  {
    id: 'daily-workday',
    title: '受付日から3営業日後を、回答期限に入れる',
    scenes: ['daily'],
    flow: { from: '問い合わせ' },
    now: '土日や会社の休みをカレンダーで数えて、期限を手で入れている。',
    trigger: '保存する前',
    condition: '「回答期限」が空',
    actions: ['値を入れる：「回答期限」に、式 営業日加算({受付日}, 3) の結果を入れる'],
    result: '土日と、不在カレンダーに登録した全社の休業日を飛ばして期限が入ります。カレンダービューの非稼働日マスタに登録した祝日も飛ばせます。',
    partners: ['kw-calendar-view'],
  },
  {
    id: 'daily-next',
    title: '保存したら、続けて次の新規作成の画面を開く',
    scenes: ['daily'],
    flow: { from: '日報' },
    now: '何件も続けて登録するとき、保存のたびに［＋］を押し直している。',
    trigger: '保存した後（新規作成の画面）',
    condition: 'いつも',
    actions: ['保存後に開く画面：新規作成の画面'],
    result: '保存すると、すぐ次の新規作成の画面が開きます。続けて入力するときの手間が減ります。',
  },
];

export const featuredBridgeRecipes = bridgeRecipes.filter((r) => r.featured);
