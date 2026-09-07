#!/usr/bin/env node
/*
 * check-external-links.mjs — 相互リンクの維持ゲート
 *
 * 他社と交わした「相互リンクを掲載する」という約束を、うっかり消してしまわないための
 * 機械的な見張り。約束したリンクが記事から消えていたら npm run build を失敗させる。
 *
 * なぜ必要か：
 *   相互リンクは、相手が自社サイトに当社リンクを載せてくれている見返りなので、こちらが
 *   黙って外すと約束違反になる。しかも本文のわずか1行なので、記事のリライト・体裁の
 *   作り直し・コンフリクトの解決といった「別の作業のついで」に消えても誰も気づかない。
 *   人の記憶とドキュメントだけでは守れないため、ビルドを止める形にした。
 *
 * どこで効くか：
 *   npm run prebuild（＝npm run build）に入れてあるので、ローカルでも GitHub Actions でも
 *   走る。約束のリンクを消したままコミットすると Actions のデプロイが失敗して公開されない。
 *   SECRET/ にも git にも依存しないので、どの環境でも同じ判定になる。
 *
 * 解除したいとき（＝相手との約束を終える／相手が先に外した）：
 *   1. 先方に連絡して合意する（黙って外さない）
 *   2. この COMMITMENTS 配列から該当エントリを削除する
 *   3. 記事本文のリンクを外す
 *   4. SECRET/site-spec.md の §9 と CLAUDE.md の該当節にも経緯を残す
 *   順番を守れば記録が残る。配列を消さずに本文だけ消すとビルドが止まるので気づける。
 */
import fs from 'node:fs';
import path from 'node:path';

/**
 * 維持する相互リンク。
 * anchorMustContain は「掲載テキストとして先方に約束した文言」。表示の都合で改行タグや
 * span を挟んでも判定できるように分割して持つ。
 */
const COMMITMENTS = [
  {
    partner: '株式会社コムデック（コムデックラボ）',
    agreedOn: '2026-09-07',
    contact: '中川裕貴 <y.nakagawa@comdec.jp>',
    // 当社が出す側（これが消えると約束違反）
    file: 'src/content/blog/kintone-shukei.md',
    url: 'https://www.comdec.jp/comdeclab/kintone-rra/',
    anchorMustContain: [
      'kintoneの関連レコードの数値を自動集計する方法は？',
      'プラグイン・カスタマイズでkintoneをさらに便利に',
    ],
    // 先方が出す側（見返り。当社では強制できないので参考情報）
    theirSourcePage: 'https://www.comdec.jp/comdeclab/kintone-notificationcustomize-01/',
    theirLinkTarget: 'https://kizuna-works.jp/blog/kintone-tsuuchi-settei/',
    note: '掲載位置・リンク先・掲載テキストはすべて先方の指定どおり。dofollow（rel を付けない）で合意。',
  },
];

const problems = [];

for (const c of COMMITMENTS) {
  const abs = path.join(process.cwd(), c.file);
  if (!fs.existsSync(abs)) {
    problems.push(c.partner + ': 掲載元のファイルが見つからない → ' + c.file + '（移動・改名したならこのスクリプトの file も直す）');
    continue;
  }
  const src = fs.readFileSync(abs, 'utf8');

  const at = src.indexOf(c.url);
  if (at < 0) {
    problems.push(c.partner + ': リンク先 URL が本文から消えている → ' + c.url + '（' + c.file + '）');
    continue;
  }

  // URL を囲んでいる <a ...> ... </a> を素朴に切り出す（正規表現を使わない）
  const open = src.lastIndexOf('<a', at);
  const openEnd = src.indexOf('>', at);
  const close = src.indexOf('</a>', openEnd);
  if (open < 0 || openEnd < 0 || close < 0) {
    problems.push(c.partner + ': URL はあるが <a> タグとして書かれていない → ' + c.file);
    continue;
  }
  const openTag = src.slice(open, openEnd + 1).toLowerCase();
  const text = src.slice(openEnd + 1, close).replace(/<[^>]*>/g, '');

  if (openTag.includes('nofollow') || openTag.includes('sponsored') || openTag.includes('"ugc"')) {
    problems.push(c.partner + ': リンクに rel="nofollow"/"sponsored" が付いている（dofollow で合意済み） → ' + c.file);
  }
  for (const frag of c.anchorMustContain) {
    if (!text.includes(frag)) {
      problems.push(c.partner + ': 約束した掲載テキストが変わっている（「' + frag + '」が無い） → ' + c.file);
    }
  }
}

if (problems.length > 0) {
  console.error('');
  console.error('[check-external-links] 相互リンクの約束が守られていません。ビルドを中止します。');
  console.error('');
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  console.error('  相互リンクは、相手が自社サイトに当社リンクを載せてくれている見返りです。');
  console.error('  意図せず消した場合は元に戻してください。');
  console.error('  意図して解除する場合は、先に先方と合意し、scripts/check-external-links.mjs の');
  console.error('  COMMITMENTS からエントリを削除してから本文を直してください。');
  console.error('');
  process.exit(1);
}

console.log('[check-external-links] 相互リンク ' + COMMITMENTS.length + ' 件は正常に掲載されています');
