#!/usr/bin/env node
/**
 * ブログ記事内の図解（オンブランド）を satori + sharp で生成するスクリプト。
 * 出力先: public/images/blog/<name>.png（記事から ![](...) で参照）
 *
 * 使い方: node scripts/gen-blog-figures.mjs
 * 図版を追加したいときは FIGURES に定義を足して再実行する。
 */
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const ROOT = process.cwd();
const FONT_700 = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/NotoSansJP-700.woff'));
const FONT_400 = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/NotoSansJP-400.woff'));
const OUT_DIR = path.join(ROOT, 'public/images/blog');

const C = { navy: '#1B3A6B', navyDeep: '#14315a', green: '#2E8B2E', ink: '#1f2a3a', gray: '#5a6b82', cardBg: '#f4f7fb', border: '#e2e8f0', white: '#ffffff' };

async function render(element, width, height, name) {
  const svg = await satori(element, {
    width, height,
    fonts: [
      { name: 'Noto Sans JP', data: FONT_700, weight: 700, style: 'normal' },
      { name: 'Noto Sans JP', data: FONT_400, weight: 400, style: 'normal' },
    ],
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, `${name}.png`));
  console.log('  生成:', `public/images/blog/${name}.png`, `(${width}x${height})`);
}

// 図1：3つの方法の全体像（横3カード）
function overviewMethods(methods) {
  const card = (m) => ({
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', flex: 1, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: '26px 24px', gap: '14px' },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 999, background: m.cost === '有料' ? C.green : C.navy, color: C.white, fontSize: 26, fontWeight: 700 }, children: m.n } },
              { type: 'div', props: { style: { display: 'flex', background: m.cost === '有料' ? C.navy : C.green, color: C.white, fontSize: 17, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }, children: m.cost } },
            ],
          },
        },
        { type: 'div', props: { style: { display: 'flex', fontSize: 26, fontWeight: 700, color: C.navy }, children: m.name } },
        { type: 'div', props: { style: { display: 'flex', fontSize: 18, fontWeight: 400, color: C.gray, lineHeight: 1.65 }, children: m.desc } },
      ],
    },
  });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 330, display: 'flex', flexDirection: 'row', gap: '24px', padding: '36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children: methods.map(card),
    },
  };
}

// 図2：横フロー（ステップ → ステップ）
function flow(steps) {
  const box = (label) => ({
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 196, height: 92, background: C.navy, color: C.white, borderRadius: 14, padding: '0 14px', fontSize: 19, fontWeight: 700, lineHeight: 1.4 },
      children: label,
    },
  });
  // 矢印は確実に描画できる ASCII の ">" を太字で（緑）
  const arrow = () => ({ type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, color: C.green, fontSize: 40, fontWeight: 700, paddingBottom: '4px' }, children: '>' } });
  const children = [];
  steps.forEach((s, i) => { children.push(box(s)); if (i < steps.length - 1) children.push(arrow()); });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 164, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children,
    },
  };
}

// 図3：縦の早見図（番号バッジ＋名称＋一言＋費用チップ）
// 既定は5行ぶんの高さ。行数が違う図では第2引数で高さを渡す。
function overview5(rows, h = 596) {
  const row = (r) => ({
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 22px' },
      children: [
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 999, background: r.paid ? C.green : C.navy, color: C.white, fontSize: 22, fontWeight: 700 }, children: r.n } },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' },
            children: [
              { type: 'div', props: { style: { display: 'flex', fontSize: 23, fontWeight: 700, color: C.navy }, children: r.name } },
              { type: 'div', props: { style: { display: 'flex', fontSize: 17, fontWeight: 400, color: C.gray, lineHeight: 1.5 }, children: r.desc } },
            ],
          },
        },
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 150, background: r.paid ? C.navy : C.green, color: C.white, fontSize: 18, fontWeight: 700, padding: '8px 16px', borderRadius: 999 }, children: r.tag } },
      ],
    },
  });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: h, display: 'flex', flexDirection: 'column', gap: '14px', padding: '36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children: rows.map(row),
    },
  };
}

// 図4：2枚パネルの対比（社内○ / 社外×）
function contrastPanel(left, right) {
  const panel = (p, ok) => ({
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', flex: 1, gap: '14px', background: C.cardBg, border: `2px solid ${ok ? C.green : '#d9627a'}`, borderRadius: 16, padding: '28px 26px' },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' },
            children: [
              { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 999, background: ok ? C.green : '#d9627a', color: C.white, fontSize: 22, fontWeight: 700 }, children: ok ? 'OK' : 'NG' } },
              { type: 'div', props: { style: { display: 'flex', fontSize: 24, fontWeight: 700, color: C.navy }, children: p.title } },
            ],
          },
        },
        { type: 'div', props: { style: { display: 'flex', fontSize: 19, fontWeight: 400, color: C.gray, lineHeight: 1.6 }, children: p.desc } },
      ],
    },
  });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 300, display: 'flex', flexDirection: 'row', gap: '24px', padding: '36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children: [panel(left, true), panel(right, false)],
    },
  };
}

// 図5：横フロー＋下部キャプション（色指定可）
function flowCaptioned(steps, color, caption) {
  const box = (label) => ({
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1, height: 96, background: color, color: C.white, borderRadius: 14, padding: '0 14px', fontSize: 19, fontWeight: 700, lineHeight: 1.4 },
      children: label,
    },
  });
  const arrow = () => ({ type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, color, fontSize: 40, fontWeight: 700, paddingBottom: '4px' }, children: '>' } });
  const rowChildren = [];
  steps.forEach((s, i) => { rowChildren.push(box(s)); if (i < steps.length - 1) rowChildren.push(arrow()); });
  return {
    type: 'div',
    props: {
      style: { width: 1000, height: 210, display: 'flex', flexDirection: 'column', gap: '18px', padding: '32px 36px', background: C.white, fontFamily: 'Noto Sans JP' },
      children: [
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }, children: rowChildren } },
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [
          { type: 'div', props: { style: { display: 'flex', width: 10, height: 26, background: color, borderRadius: 3 } } },
          { type: 'div', props: { style: { display: 'flex', fontSize: 18, fontWeight: 700, color: C.ink }, children: caption } },
        ] } },
      ],
    },
  };
}

const FIGURES = [
  {
    name: 'kintone-mail-soushin-hikaku-overview',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '標準の通知メール', desc: '社内ユーザーへ更新・期限を自動通知。外部宛には送れない。', tag: '無料', paid: false },
      { n: '2', name: 'メーラー起動方式', desc: 'レコードからお使いのメーラーを開く。1通ずつ・少人数一斉に。', tag: '無料', paid: false },
      { n: '3', name: 'サーバー直送（kMailer）', desc: '配信サーバーから直接送信。大量配信・自動/予約に強い。', tag: '月18,000円〜', paid: true },
      { n: '4', name: 'メール共有（メールワイズ）', desc: '受信メールをチームで共有・対応。問い合わせ管理向け。', tag: '月600円/人〜', paid: true },
      { n: '5', name: '自作（開発）', desc: 'JS＋外部API/GASで独自送信。自由だが開発・保守コスト。', tag: '開発要', paid: true },
    ]),
  },
  {
    name: 'kintone-mail-soushin-hikaku-standard',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '社内のkintoneユーザー', desc: '条件通知・リマインダーで、更新や期限を自動でメール通知できる。' },
      { title: '社外の取引先・顧客', desc: '標準の通知メールでは、レコードを差し込んだ本文を外部宛に送れない。' }
    ),
  },
  {
    name: 'kintone-mail-soushin-hikaku-server',
    w: 1000, h: 210,
    el: flowCaptioned(['kintoneのレコード', 'kMailer配信サーバー', '大量・自動で送信'], C.navy, '人を介さず、配信サーバーが直接メールを送信する'),
  },
  {
    name: 'kintone-mail-soushin-hikaku-mailwise',
    w: 1000, h: 210,
    el: flowCaptioned(['取引先からの受信', 'チームで共有・担当', '差し込んで返信'], C.green, '受信を含む双方向のやり取りを、チームで共有して管理する'),
  },
  {
    name: 'kintone-mail-soushin-hikaku-jisaku',
    w: 1000, h: 210,
    el: flowCaptioned(['JSカスタマイズ', '外部送信API・GAS', 'メール送信'], C.navy, '自由度は最も高いが、開発と保守のコストが継続的にかかる'),
  },
  {
    name: 'kintone-cyouhyou-pdf-output-overview',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '標準印刷でPDF', desc: 'レコード画面をそのままPDF保存。1件・社内確認に。', cost: '無料' },
      { n: '2', name: 'CSV＋Excel', desc: 'CSVを書き出しExcel帳票に反映。無料できれいに。', cost: '無料' },
      { n: '3', name: '帳票プラグイン', desc: 'PDF/Excelを一括・指定様式で。大量・継続に。', cost: '有料' },
    ]),
  },
  {
    name: 'kintone-cyouhyou-pdf-output-flow',
    w: 1000, h: 164,
    el: flow(['kintone一覧で絞り込み', 'CSVで書き出し', 'Excel帳票に反映', 'PDFで保存']),
  },
  {
    name: 'kintone-2026-06-update-overview',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: 'AI', name: 'kintone AI 正式提供', desc: '検索AI・アプリ作成AIなど6機能を正式リリース。今回の目玉。', cost: '目玉' },
      { n: '検', name: '検索の強化', desc: 'OR検索が追加。全体検索のREST APIも試行可能に。', cost: '新機能' },
      { n: 'API', name: '開発者向け拡張', desc: 'レコード削除イベントを追加。モバイル基盤も刷新。', cost: 'API' },
    ]),
  },
  {
    name: 'kintone-2026-06-update-ai-flow',
    w: 1000, h: 164,
    el: flow(['管理者が歯車からkintone AI管理', '機能全体を有効化', '使う機能を選択', 'ユーザーが利用開始']),
  },
  {
    name: 'kintone-muryou-plugin-osusume-map',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '一覧画面', desc: '検索・集計・列固定・一覧編集など。毎日眺める画面を見やすく速く。', tag: '無料8種', paid: false },
      { n: '2', name: 'レコード画面', desc: 'タブ整理・目次・変更履歴・付箋メモなど。長い詳細画面を快適に。', tag: '無料6種', paid: false },
      { n: '3', name: '入力支援', desc: '自動入力・条件分岐・サジェストなど。入力ミスと手戻りを防ぐ。', tag: '無料7種', paid: false },
      { n: '4', name: '装飾', desc: '背景色・罫線・テーマ統一。画面を整えて「使いにくい」を解消。', tag: '無料3種', paid: false },
      { n: '5', name: '出力・連携', desc: 'CSV出力・メール作成。kintoneの外へデータや連絡をスムーズに。', tag: '無料2種', paid: false },
    ]),
  },
  {
    name: 'kintone-muryou-plugin-osusume-contrast',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: 'kintone標準で十分なこと', desc: 'アプリ作成・一覧やグラフ表示・プロセス管理・通知など、業務の土台は標準機能で完結します。' },
      { title: 'あと一歩が欲しくなること', desc: '横スクロールでキー列が消える。添付の中身が一覧で見えない。入力順がバラバラ。毎日の小さなストレスが積もります。' }
    ),
  },
  {
    name: 'kintone-muryou-plugin-osusume-flow',
    w: 1000, h: 210,
    el: flowCaptioned(['困っている画面を1つ決める', '無料プラグインで試す', '効果を確認して横展開'], C.green, '無料だから、小さく試して効いた所だけ広げられる'),
  },
  {
    name: 'kintone-keisan-field-limit',
    w: 1000, h: 210,
    el: flowCaptioned(['4月にレコードを保存', '7月に一覧を開く', '経過日数は4月のまま'], C.navy, '計算は保存した瞬間だけ。開き直さない限り、経過日数や年齢は止まったまま'),
  },
  {
    name: 'kintone-keisan-field-methods',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '標準の工夫', desc: '定期的に開いて保存し直す。手間はかかるが費用ゼロ。少件数向け。', cost: '無料' },
      { n: '2', name: 'JavaScript', desc: '表示時に今日基準で計算。自由だが開発と保守のコストが続く。', cost: '開発要' },
      { n: '3', name: 'プラグイン', desc: '設定だけで今日基準を自動維持。コード不要で確実に運用できる。', cost: '有料' },
    ]),
  },
  {
    name: 'kintone-keisan-field-solution',
    w: 1000, h: 210,
    el: flowCaptioned(['基準日フィールド', '開くたびに今日で再計算', '一覧・詳細に最新の値'], C.green, '経過計算アシストなら、開くたびに今日基準へ自動で計算し直す'),
  },
  {
    name: 'kintone-record-copy-reuse-flow',
    w: 1000, h: 164,
    el: flow(['詳細画面を開く', 'レコードを再利用する', '値がコピーされた追加画面', '直して保存']),
  },
  {
    name: 'kintone-record-copy-reuse-problem',
    w: 1000, h: 210,
    el: flowCaptioned(['コピーできる項目を全部転記', 'いらない項目を手で消す', '消し忘れのリスク'], C.navy, '標準の再利用は、残したい項目も入れ直す項目も区別なくコピーする'),
  },
  {
    name: 'kintone-record-copy-reuse-solution',
    w: 1000, h: 210,
    el: flowCaptioned(['「残す」項目にチェック', '再利用画面を開く', 'チェック以外は自動で空欄'], C.green, 'レコード再利用コントロールなら、残す項目だけ引き継いで、あとは自動で空にする'),
  },
  {
    name: 'kintone-backup-overview',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: 'CSV書き出し（標準）', desc: 'レコードの値を手動で書き出す。添付ファイルやコメント・変更履歴は対象外。', tag: '無料', paid: false },
      { n: '2', name: 'テンプレート（標準）', desc: 'アプリの設定を保存する仕組み。中のレコード（データ）は含まれない。', tag: '無料', paid: false },
      { n: '3', name: 'アプリ・スペース復旧', desc: '削除から14日以内なら管理者が復旧できる可能性。1レコード単体は不可。', tag: '14日以内', paid: false },
      { n: '4', name: '専用サービス（kBackup等）', desc: '全データを自動でバックアップし添付も保全。特定時点の状態へ復元できる。', tag: '月1万円〜', paid: true },
      { n: '5', name: '削除レコード復元', desc: '削除の瞬間に内容と添付を退避し、履歴からワンクリックで戻す。誤削除に特化。', tag: '基本無料', paid: false },
    ]),
  },
  {
    name: 'kintone-backup-concept',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: 'サーバー障害・災害（サイボウズが保全）', desc: 'データはクラウドで厳重に管理される。ただし障害復旧用で、利用者が任意のタイミングで戻すことはできない。' },
      { title: '誤削除・誤上書き（利用者が備える）', desc: 'うっかり削除や上書きは、自分でバックアップを用意していない限り、元に戻せない。' }
    ),
  },
  {
    name: 'kintone-backup-csv-flow',
    w: 1000, h: 164,
    el: flow(['一覧で対象を絞り込み', 'CSVで書き出し', '保管場所に保存', '必要時にインポートで復元']),
  },
  {
    name: 'kintone-backup-recovery-flow',
    w: 1000, h: 210,
    el: flowCaptioned(['レコードを削除', '内容＋添付を自動で退避', '履歴からワンクリック復元'], C.green, '削除レコード復元なら、消した瞬間に内容と添付を退避し、あとから元の位置に戻せる'),
  },
  {
    name: 'kintone-tempu-file-limit',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '1ファイル1GBまで・件数は無制限', desc: '添付できる件数に上限はない。先に当たるのはディスク容量。', tag: '公式仕様', paid: false },
      { n: '2', name: '拡張子やサイズは制限できない', desc: '種類を問わず添付できる仕様。PDFだけに絞る設定はない。', tag: '標準では不可', paid: true },
      { n: '3', name: '一覧では中身が分からない', desc: '画像の小さなサムネイルのみ。PDFやExcelは有無も見えない。', tag: '標準では不可', paid: true },
      { n: '4', name: '一括ダウンロードができない', desc: '公式ヘルプが明言。1件ずつ落とすか、APIを使う。', tag: '標準では不可', paid: true },
      { n: '5', name: 'CSV書き出しに含まれない', desc: 'エクスポート対象外。CSVを保管しても中身は残らない。', tag: '標準では不可', paid: true },
    ]),
  },
  {
    name: 'kintone-tempu-file-download',
    w: 1000, h: 510,
    el: overview5([
      { n: '1', name: '1件ずつ手動', desc: '詳細画面でファイル名をクリック。数件なら結局これが最短。', tag: '無料', paid: false },
      { n: '2', name: 'プラグイン（添付ファイル出力）', desc: '一覧の絞り込み結果や選んだ行を、フォルダ分けしたZIPで取得。', tag: '無料', paid: false },
      { n: '3', name: 'cli-kintone', desc: 'サイボウズ公式のコマンドラインツール。全レコードの添付を一括取得。', tag: '無料', paid: false },
      { n: '4', name: 'バックアップサービス', desc: '添付まで自動で継続保全。復元も含めて任せたい場合の選択肢。', tag: '有料', paid: true },
    ], 510),
  },
  {
    name: 'kintone-bi-tool-dashboard-subtable',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '合計・平均・最大値・最小値', desc: '明細行の単位で計算される。全レコードの全行が対象。区分Aが1レコード（明細2行・数量10と20）なら、平均は30ではなく15（30÷2行）になる。' },
      { title: 'レコード数は行数にならない', desc: '明細行が何行あってもレコードは1件として数える。明細6行あってもレコード3件なら結果は3。行数を数える集計方法は標準にない。' }
    ),
  },
  {
    name: 'kintone-2026-08-update-overview',
    w: 1000, h: 596,
    el: overview5([
      { n: 'API', name: 'ルックアップでchangeが発生', desc: 'confirmed / recordId が追加。クリア連動が組めるように。', tag: '開発者', paid: false },
      { n: '状', name: '組織ごとの利用状況', desc: '利用が定着していない組織を特定できるようになる。', tag: 'システム管理者', paid: false },
      { n: 'ポ', name: 'ポータルが10枚まで', desc: '従来3枚から拡大。部門別・案件別に作り分けできる。', tag: 'ワイドコース', paid: true },
      { n: 'AI', name: 'スレッド要約AIがAndroidへ', desc: 'モバイルアプリで議論の要点を追える。iOSは今後。', tag: '全ユーザー', paid: false },
      { n: '基', name: 'モバイル基盤の刷新', desc: '検索・未処理・設定画面。見た目の変更はない。', tag: 'モバイル', paid: true },
    ]),
  },
  {
    name: 'kintone-2026-08-update-lookup',
    w: 1000, h: 210,
    el: flowCaptioned(['取得を確定', 'クリアした', 'フォーカスが外れた'], C.green, '8月9日から、この3つのタイミングでルックアップ自身の change が発火する'),
  },
  {
    name: 'kintone-tsuuchi-settei-overview',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: 'アプリの条件通知', desc: '追加・編集・コメント・ステータス更新を条件に通知。文面は固定。', tag: 'アプリの設定', paid: false },
      { n: '2', name: 'レコードの条件通知', desc: 'フィールドの値が条件を満たしたとき。通知文を自分で書ける。', tag: 'アプリの設定', paid: false },
      { n: '3', name: 'リマインダーの条件通知', desc: '日付を基準に何日前・何日後で通知。期限のリマインドに。', tag: 'アプリの設定', paid: false },
      { n: '4', name: 'コメントとメンション', desc: '@付きの書き込みで、指定した相手に自分宛として届く。', tag: 'レコード画面', paid: true },
      { n: '5', name: 'スペースとスレッド', desc: 'フォロー中のスレッドへの投稿を知らせる。設定は不要。', tag: 'スペース', paid: true },
    ]),
  },
  {
    name: 'kintone-tsuuchi-settei-reach',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '通知が届く操作', desc: '自分以外のユーザーが画面からレコードを追加・編集した。コメントを書き込んだ。プロセス管理のステータスを進めた。' },
      { title: '通知が届かない操作', desc: '自分自身が行った操作。レコードの条件通知はExcel・CSV読み込みでは対象外。動作テスト環境での操作。いずれも公式に明記された仕様。' }
    ),
  },
  {
    name: 'kintone-tsuuchi-settei-triage',
    w: 1000, h: 210,
    el: flowCaptioned(['ポータルに通知は出ているか', '出ていなければアプリ側', '出ていればメール側'], C.navy, 'ポータルに届いていなければ、メール通知も届かない。まずここで切り分ける'),
  },
  {
    name: 'kintone-tsuuchi-settei-steps',
    w: 1000, h: 210,
    el: flowCaptioned(['歯車からアプリの設定', '通知タブで種類を選ぶ', '条件と通知先を指定', 'アプリを更新'], C.green, '保存だけでは反映されない。最後の［アプリを更新］まで進めて完了'),
  },
  {
    name: 'kintone-tsuuchi-settei-limits',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '件名の形式は変えられない', desc: '［kintone］［アプリ名］…の形は固定。変えられるのは一部だけ。', tag: '標準では不可', paid: true },
      { n: '2', name: 'kintoneを見ない人に届かない', desc: '現場や社外の関係者は、ポータルもメールも開かないことが多い。', tag: '標準では不可', paid: true },
      { n: '3', name: '読まれたかが分からない', desc: '通知を送った側から、相手が見たかどうかを確認できない。', tag: '標準では不可', paid: true },
      { n: '4', name: '一括登録では通知されない', desc: 'CSV・Excel読み込みでの追加や更新は、条件を満たしても対象外。', tag: '公式仕様', paid: false },
      { n: '5', name: 'リマインダーは1回500件まで', desc: 'レコード番号が大きい順。501件以上は条件を分けて設定する。', tag: '公式仕様', paid: false },
    ]),
  },
  {
    name: 'kintone-tsuuchi-settei-chat',
    w: 1000, h: 210,
    el: flowCaptioned(['レコードを追加・更新', '設定した条件に合致', 'Teams・Slackへ自動投稿'], C.green, 'チャット通知なら、本文に項目を差し込んだ通知を普段使うチャットへ送れる'),
  },
  {
    name: 'kintone-tsuuchi-settei-measures',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '条件を絞る', desc: '本当に見るべき通知だけに限定。まず標準設定の見直しから。', cost: '無料' },
      { n: '2', name: 'チャットへ送る', desc: '普段開いているTeams・Slackへ。気づかれない問題を解消。', cost: '有料' },
      { n: '3', name: '既読を可視化', desc: '誰がいつ見たかを記録。送った側から確認できる。', cost: '有料' },
    ]),
  },
  {
    name: 'kintone-tempu-file-visible',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '開かずに分かる（プラグイン併用）', desc: '一覧に拡張子アイコンと件数バッジが並び、ファイル名クリックでその場にプレビューが開く。詳細画面を開く回数が減る。' },
      { title: '毎回開いて確認（標準のまま）', desc: '一覧に出るのは画像の小さなサムネイルだけ。PDFやExcelは詳細画面を開き、さらにダウンロードしないと中身が分からない。' }
    ),
  },
  {
    name: 'kintone-record-list-formats',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '表形式', desc: '項目を列で並べる標準の形式。並び替え・インライン編集ができる。', cost: '標準' },
      { n: '2', name: 'カレンダー形式', desc: '日付フィールドを基準にカレンダーへ配置。期限や予定の俯瞰に。', cost: '標準' },
      { n: '3', name: 'カスタマイズ', desc: 'HTMLとJSで自由に描画。作成にkintoneシステム管理権限が必要。', cost: '要権限' },
    ]),
  },
  {
    name: 'kintone-record-list-steps',
    w: 1000, h: 210,
    el: flowCaptioned(['歯車からアプリの設定', '一覧タブで追加', '表示項目・条件・ソート', 'アプリを更新'], C.navy, '［保存］だけでは反映されない。［アプリを更新］まで実行して初めて全員に見える'),
  },
  {
    name: 'kintone-record-list-solutions',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '人によって見える一覧を変える', desc: '一覧はそのまま残し、関係のない人の切替ドロップダウンからだけ外す。最初に開く一覧も担当ごとに指定できる。' },
      { title: '一覧を削除して減らす', desc: '使っている人がいるかもしれないので消せない。「消す／残す」の二択しかなく、結局放置される。全員に同じ一覧が並び続ける。' }
    ),
  },
  {
    name: 'kintone-table-tsukaikata-tsukaiwake',
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: 'テーブル', desc: '見積の明細のように、親と一緒に保存したい可変の行。1レコードの中に持つ。', cost: '同じレコード' },
      { n: '2', name: '別アプリ＋関連レコード', desc: '行を検索・集計・権限で分けたいとき。行を独立したレコードとして持つ。', cost: '別レコード' },
      { n: '3', name: '普通のフィールド', desc: '行数が2〜3で増えないなら、テーブルにせず並べたほうが扱いやすい。', cost: '行数が固定' },
    ]),
  },
  {
    name: 'kintone-table-tsukaikata-dekinaikoto',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '一覧に常に表示できない', desc: '［表示する］を押した1レコードぶんだけ開く。複数レコードは同時に見られない。', tag: '公式仕様', paid: false },
      { n: '2', name: '行の並べ替えができない', desc: 'できるのは行の追加と削除だけ。順番を直すには消して入れ直すしかない。', tag: '標準では不可', paid: true },
      { n: '3', name: 'テーブル内の項目でソート不可', desc: '一覧の並び替え条件にテーブル内のフィールドは指定できない。', tag: '公式仕様', paid: false },
      { n: '4', name: '計算式はSUMとCONTAINSだけ', desc: 'テーブル外の計算式から明細を参照するとき、この2つ以外の関数は使えない。', tag: '公式仕様', paid: false },
      { n: '5', name: '列ごとの権限が設定できない', desc: 'テーブル内のフィールドにフィールドのアクセス権は設定できない。', tag: '公式仕様', paid: false },
    ]),
  },
  {
    name: 'kintone-table-tsukaikata-sumif',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '全行の合計（SUM）', desc: 'テーブルの外に計算フィールドを置き、計算式に SUM(金額) と書けば明細の全行が合計される。ここまでは標準機能だけで完結する。' },
      { title: '条件付きの合計（SUMIF）', desc: 'kintone に SUMIF はない。テーブル内に IF(CONTAINS(区分,"請求"),金額,0) の計算列を1本足して、それを SUM する回避策が必要になる。' }
    ),
  },
  {
    name: 'kintone-table-tsukaikata-flow',
    w: 1000, h: 210,
    el: flowCaptioned(['テーブルにチェック列を1つ', '集計先の数値フィールド', 'プラグインで対応づけ', 'チェックした行だけ集計'], C.green, '作業用の計算列も関数式も足さずに、条件付きの合計を実データとして書き込める'),
  },
  {
    name: 'kintone-mail-soushin-hikaku-setup',
    w: 1000, h: 210,
    el: flowCaptioned(['共通管理', 'アカウント', '利用者設定', '管理者設定', 'kintone連携'], C.navy, '共通管理での許可とオプション側の利用者設定は別物。片方だけでは使えるようにならない'),
  },
  {
    name: 'kintone-shukei-flow',
    w: 1000, h: 164,
    el: flow(['一覧を絞り込む', '分類する項目を選ぶ', '集計方法を選ぶ', 'グラフの種類を選ぶ']),
  },
  {
    name: 'kintone-shukei-overview',
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: 'レコード一覧で合計を見る', desc: '一覧に合計行は出せない。数字を見るにはグラフ画面へ移動する。', tag: '標準では不可', paid: true },
      { n: '2', name: 'テーブル（明細）を集計する', desc: '標準グラフで集計できる。ただし合計・平均は明細行、レコード数はレコード単位。', tag: '標準で可能', paid: false },
      { n: '3', name: '関連レコード一覧を集計する', desc: 'データを保持していないため、集計・自動計算・CSV書き出しの対象外。', tag: '標準では不可', paid: true },
      { n: '4', name: '複数アプリを横断して集計する', desc: 'グラフは1アプリの中で完結する。別アプリの数字は合算できない。', tag: '標準では不可', paid: true },
      { n: '5', name: 'ポータルに集計を常設する', desc: 'ポータルに貼れるのはリンクまで。集計結果そのものは置けない。', tag: '標準では不可', paid: true },
    ]),
  },
  {
    name: 'kintone-shukei-contrast',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: 'テーブル（サブテーブル）', desc: '標準のグラフで集計できる。分類する項目にも集計対象にも選べる。合計・平均・最大・最小は明細行単位、レコード数はレコード単位で数えられる。' },
      { title: '関連レコード一覧', desc: '公式ヘルプに「集計、自動計算、アプリ内検索の操作の対象になりません」と明記。条件に合うレコードを映しているだけで、値を保持していないため。' }
    ),
  },
  {
    name: "kintone-nenrei-keisan-seconds",
    w: 1000, h: 210,
    el: flowCaptioned(["日付フィールド", "式の中では秒数", "60*60*24 で割る", "日数になる"], C.navy, "1日 = 86,400秒。日付どうしの引き算は秒で返ってくるので、割ってから使う"),
  },
  {
    name: "kintone-nenrei-keisan-twostep",
    w: 1000, h: 210,
    el: flowCaptioned(["1段目：年・月・日を取り出す", "それぞれ別の計算フィールドへ", "2段目：その6つを参照", "誕生日判定つきの年齢"], C.green, "DATE_FORMATは式の中で計算に使えない。いったんフィールドに出してから参照する"),
  },
  {
    name: "kintone-nenrei-keisan-three",
    w: 1000, h: 330,
    el: overviewMethods([
      { n: "1", name: "365.2425で割る", desc: "式は1本で済む。誕生日当日だけ1歳ずれる年がある（45件中2件）。", cost: "概算" },
      { n: "2", name: "DATE_FORMATを式に混ぜる", desc: "保存はできるが、値が空になる。計算にも比較にも使えない。", cost: "不可" },
      { n: "3", name: "2段構えにする", desc: "年・月・日を別フィールドに出して参照。45件すべて一致した。", cost: "厳密" },
    ]),
  },
  {
    name: "kintone-nenrei-keisan-limits",
    w: 1000, h: 596,
    el: overview5([
      { n: "1", name: "TODAY関数が無い", desc: "式に書くと「TODAY関数は使用できません」。NOW・YEARも同じ。", tag: "標準では不可", paid: true },
      { n: "2", name: "計算は保存した瞬間だけ", desc: "開き直しても再計算されない。昨日の数字がそのまま残る。", tag: "公式仕様", paid: false },
      { n: "3", name: "DATE_FORMATは式に混ぜられない", desc: "単独なら数字が出るが、引き算や比較の項にすると空になる。", tag: "実機で確認", paid: false },
      { n: "4", name: "空の日付は1970/1/1", desc: "退職日が空のまま引き算すると −16,161日のような値になる。", tag: "実機で確認", paid: false },
      { n: "5", name: "曜日・営業日は出せない", desc: "曜日を返す書式が無く、祝日も持っていないため近似しかできない。", tag: "標準では不可", paid: true },
    ]),
  },
  {
    name: "kintone-shonin-flow-plugin-hikaku-limits",
    w: 1000, h: 596,
    el: overview5([
      { n: "1", name: "一覧からまとめて承認できない", desc: "一覧のステータスはただの文字。1件ずつ開いて押すしかない。", tag: "標準では不可", paid: true },
      { n: "2", name: "代理承認ができない", desc: "作業者本人以外にはアクションが出ない。アプリ管理者でも押せない。", tag: "標準では不可", paid: true },
      { n: "3", name: "段階ごとの入力チェックができない", desc: "標準の必須は常に必須。「承認に回すときだけ必須」は組めない。", tag: "標準では不可", paid: true },
      { n: "4", name: "承認後の編集制限は組めるが手間", desc: "レコードのアクセス権の条件にステータスを指定すれば塞げる。アプリごとの保守は要る。", tag: "アクセス権で可能", paid: false },
      { n: "5", name: "承認依頼に気づかれない", desc: "通知はkintoneを開く人にしか届かず、件名の形式も変えられない。", tag: "標準では不可", paid: true },
    ]),
  },
  {
    name: "kintone-shonin-flow-plugin-hikaku-approach",
    w: 1000, h: 330,
    el: overviewMethods([
      { n: "1", name: "まとめて進める", desc: "一覧から複数レコードのステータスを一括で更新する。滞留も見える。", cost: "一括承認" },
      { n: "2", name: "手前で止める", desc: "承認の実行前に条件を判定し、足りない項目をその場で埋めさせる。", cost: "実行時チェック" },
      { n: "3", name: "後を固める", desc: "承認後は自動ロックし、誰がいつ何を変えたかを履歴に残す。", cost: "ロック・履歴" },
    ]),
  },
  {
    name: "kintone-shonin-flow-plugin-hikaku-contrast",
    w: 1000, h: 300,
    el: contrastPanel(
      { title: "一括承認を入れたあと", desc: "一覧で対象を絞り、現在のステータスごとにアクションを選んで一度に進める。次の作業者は遷移先の設定から自動で決まる。30件でも操作は数回。" },
      { title: "kintone標準のまま", desc: "レコードを開いてアクションを押し、一覧へ戻る。これを件数ぶん繰り返す。月末に30件たまっていれば、その往復を30回する。" }
    ),
  },
  {
    name: "kintone-shonin-flow-plugin-hikaku-caution",
    w: 1000, h: 210,
    el: flowCaptioned(["一覧で一括実行", "REST APIでステータス更新", "詳細画面のJSは動かない", "チェックが素通りする"], C.navy, "一括実行はサーバー側の更新なので、詳細画面に仕込んだJSカスタマイズの検証は走らない"),
  },
  {
    name: "kintone-ikkatsu-koushin-overview",
    w: 1000, h: 596,
    el: overview5([
      { n: '1', name: '一覧のインライン編集', desc: '一覧の上でその場で直せる。ただし1件ずつ。5〜10件までの手段。', tag: '標準', paid: false },
      { n: '2', name: 'CSVの再インポート', desc: '書き出して直して読み込む。更新キーでひも付け。数千件も可。', tag: '標準', paid: false },
      { n: '3', name: '一括更新プラグイン', desc: '絞り込んだ結果に同じ値をまとめて反映・クリア。数クリックで完了。', tag: '無料あり', paid: false },
      { n: '4', name: 'グリッド編集・貼り付け', desc: '一覧を表計算のように編集。レコードごとに違う値を入れられる。', tag: '無料あり', paid: false },
      { n: '5', name: 'JavaScriptで自作', desc: 'REST APIで更新。一度に100件まで・失敗時は丸ごとキャンセル。', tag: '開発要', paid: true },
    ]),
  },
  {
    name: "kintone-ikkatsu-koushin-inline-limit",
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '操作は1件ずつ', desc: '編集アイコンは行ごと。複数行をまとめて直す手段はない。', cost: '制約' },
      { n: '2', name: '型に制限がある', desc: '文字列・数値・選択系・日付・ユーザー選択など13種のみ。', cost: '制約' },
      { n: '3', name: '効かない場所がある', desc: 'テーブル内、ルックアップ設定や関連レコードの条件に使う項目。', cost: '制約' },
    ]),
  },
  {
    name: "kintone-ikkatsu-koushin-updatekey",
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '更新キーが一意', desc: 'レコード番号や受注番号のように、アプリ内で値が重複しない項目。ファイルの各行が1レコードに確実にひも付き、意図どおり上書きされる。' },
      { title: '更新キーが重複・空', desc: '同じ値のレコードが複数あると、行とレコードを1対1でひも付けられない。空欄の行も同じ。公式が「重複しない項目を」と案内する理由。' }
    ),
  },
  {
    name: "kintone-ikkatsu-koushin-api-limit",
    w: 1000, h: 210,
    el: flowCaptioned(['対象を100件ずつに分割', '1リクエストを送信', '1件でも失敗したら', 'その100件は丸ごと未反映'], C.navy, 'REST APIは一度に100件まで。途中で止まると「前半だけ更新済み」が残るので再実行できる作りにする'),
  },
  {
    name: "kintone-ikkatsu-koushin-csv-flow",
    w: 1000, h: 210,
    el: flowCaptioned(['一覧で対象を絞り込む', 'CSVを書き出す', '変えたい列だけ直す', '更新キーを指定して読み込む'], C.navy, '書き出したファイルを元に編集する。更新キーにはレコード番号が使える'),
  },
  {
    name: "kintone-ikkatsu-koushin-contrast",
    w: 1000, h: 300,
    el: contrastPanel(
      { title: 'プラグインを入れたあと', desc: '一覧で対象を絞り、値を選んで一度に反映。実行前に件数を確認でき、間違えても取り消せる。40件でも数クリック。' },
      { title: 'kintone標準のまま', desc: 'レコードを開いて値を直し、保存して一覧へ戻る。これを件数ぶん繰り返す。月末に40件たまっていれば、その往復を40回する。' }
    ),
  },
];

// The bundled Noto Sans JP WOFF is a subset without arrows and similar symbols;
// satori silently renders them as tofu boxes. Fail the build instead of shipping that.
const UNSUPPORTED = /[←-⇿⤀-⥿⇐-⇙➜➡]/;
for (const f of FIGURES) {
  const text = JSON.stringify(f.el);
  const hit = text.match(UNSUPPORTED);
  if (hit) {
    console.error(`図版 ${f.name} に、同梱フォントに無い文字「${hit[0]}」（U+${hit[0].codePointAt(0).toString(16).toUpperCase()}）が含まれています。豆腐（□）になるので、言葉に置き換えてください。`);
    process.exit(1);
  }
}

const only = process.argv[2];
for (const f of FIGURES) {
  if (only && !f.name.includes(only)) continue;
  await render(f.el, f.w, f.h, f.name);
}
console.log('完了');
