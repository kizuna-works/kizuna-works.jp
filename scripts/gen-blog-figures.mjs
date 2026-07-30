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

// 図3：縦5行の早見図（番号バッジ＋名称＋一言＋費用チップ）
function overview5(rows) {
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
      style: { width: 1000, height: 596, display: 'flex', flexDirection: 'column', gap: '14px', padding: '36px', background: C.white, fontFamily: 'Noto Sans JP' },
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
    el: flow(['管理者が歯車→kintone AI管理', '機能全体を有効化', '使う機能を選択', 'ユーザーが利用開始']),
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
    w: 1000, h: 330,
    el: overviewMethods([
      { n: '1', name: '1件ずつ手動', desc: '詳細画面でファイル名をクリック。数件なら結局これが最短。', cost: '無料' },
      { n: '2', name: 'cli-kintone', desc: 'サイボウズ公式のコマンドラインツール。全レコードの添付を一括取得。', cost: '無料' },
      { n: '3', name: 'バックアップサービス', desc: '添付まで自動で継続保全。復元も含めて任せたい場合の選択肢。', cost: '有料' },
    ]),
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
    name: 'kintone-tempu-file-visible',
    w: 1000, h: 300,
    el: contrastPanel(
      { title: '開かずに分かる（プラグイン併用）', desc: '一覧に拡張子アイコンと件数バッジが並び、ファイル名クリックでその場にプレビューが開く。詳細画面を開く回数が減る。' },
      { title: '毎回開いて確認（標準のまま）', desc: '一覧に出るのは画像の小さなサムネイルだけ。PDFやExcelは詳細画面を開き、さらにダウンロードしないと中身が分からない。' }
    ),
  },
];

const only = process.argv[2];
for (const f of FIGURES) {
  if (only && !f.name.includes(only)) continue;
  await render(f.el, f.w, f.h, f.name);
}
console.log('完了');
