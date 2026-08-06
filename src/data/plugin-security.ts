// Single source of truth for per-plugin security / data-handling facts.
// Backed by the source audit recorded in
// SECRET/kintone_plugin_release/SECURITY_AUDIT.md (audited 2026-06-04).
//
// Most plugins share the same profile: the only outbound communication is the
// license check (plugin ID + domain name, relayed via kintone.proxy), no record
// data ever leaves kintone, no runtime CDN is loaded, and settings are stored in
// kintone's encrypted config area. Plugins that talk to an extra endpoint or
// bundle a third-party library declare it here as an override.

import { plugins, premiumPlugins } from './plugins';

/** A communication beyond the common license check. */
export interface ExtraComm {
  /** Short label, e.g. "郵便番号 → 住所変換". */
  label: string;
  /** What is sent and to where, in plain Japanese. */
  detail: string;
  /**
   * Where the request actually goes.
   *
   * 'external' — leaves the customer's kintone domain and reaches a third-party
   *   host (zipcloud, an admin-chosen site in an iframe, a chat webhook). Only
   *   these may be listed under the "外部通信" item, and their presence rewrites
   *   the "業務データを外部に送信しません" claim, which would otherwise be false.
   * 'internal' — stays inside the customer's own kintone domain (the kintone
   *   REST API, cybozu.com common administration API). This is NOT external
   *   communication, so listing it under "外部通信はライセンス認証のみ" both
   *   contradicted that heading and made the plugin look worse than it is.
   *
   * Defaults to 'internal', which is the common case.
   */
  scope?: 'external' | 'internal';
}

/** A third-party library bundled inside the plugin package. */
export interface BundledLib {
  name: string;
  version: string;
  license: string;
  purpose: string;
}

/**
 * A library loaded at runtime from our own origin (kizuna-works.jp) with SRI.
 * Used by plugins (e.g. kw-file-preview) that need heavy viewers loaded only on
 * demand. This is NOT a third-party CDN dependency — it is self-hosted and
 * integrity-pinned, and no file/business data is sent when loading it.
 */
export interface RuntimeLib {
  name: string;
  version: string;
  license: string;
  purpose: string;
}

/**
 * Declared when a plugin's very purpose is to send record values to a service
 * outside kintone (e.g. kw-chat-notify posting to Slack / Teams / Google Chat).
 *
 * For such a plugin the two shared claims — "レコード等の業務データを外部に送信
 * しません" and "外部通信はライセンス認証のみ" — are simply untrue, so the box
 * must not print them. Setting this replaces both with an honest description of
 * what leaves kintone, where it goes, and what the user controls.
 */
export interface OutboundData {
  /** Headline shown in place of the "送信しません" claim. */
  title: string;
  /** What is sent, to where, and triggered by what. */
  detail: string;
  /** How the administrator limits or stops it. */
  control: string;
}

export interface SecurityProfile {
  /**
   * Set only for plugins that intentionally send business data out of kintone.
   * Replaces the default "外部に送信しません" / "外部通信はライセンス認証のみ"
   * claims, which would otherwise be false.
   */
  outbound?: OutboundData;
  /** Extra outbound communications on top of the shared license check. */
  extraComm?: ExtraComm[];
  /** Third-party libraries bundled in the package (none for most plugins). */
  libs?: BundledLib[];
  /**
   * Libraries loaded at runtime from our own origin with SRI (no third-party
   * CDN). When set, the 安心ボックス shows the honest self-hosted variant
   * instead of the "実行時に外部ライブラリを読み込みません" claim.
   */
  runtimeLibs?: RuntimeLib[];
}

/**
 * Per-plugin overrides keyed by plugin ID (matches `plugins.ts` `id`).
 * Plugins not listed here use the shared default profile (license check only,
 * no extra communication, no third-party libraries).
 */
export const securityProfiles: Record<string, SecurityProfile> = {
  // 唯一、業務データを意図的に社外へ出すプラグイン。共通の「外部に送信しません」
  // は成り立たないため outbound で置き換える。
  'kw-chat-notify': {
    outbound: {
      title: '設定した本文を、指定のチャットへ送信します',
      detail:
        'このプラグインは「kintone の内容をチャットに届ける」ことが目的のため、業務データが kintone の外に出ます。送信先は、管理者ご自身が登録した Webhook URL（Slack / Microsoft Teams / Google Chat）だけです。送られるのは、通知ルールの本文テンプレートに書いた内容（差し込んだフィールドの値・レコードURL・操作者名など）と、その送信結果です。当社のサーバーを経由せず、kintone から各サービスへ直接送信します（中継サーバーはありません）。テンプレートに書いていないフィールドは送信されません。',
      control:
        '何を送るかは本文テンプレートで、いつ送るかはトリガーと条件（最大5件）で管理者が決められます。ルールを無効にすれば送信は止まります。送信の成否は同じスペース内の保管アプリに記録され、失敗時は kintone のベル通知でお知らせします。',
    },
    extraComm: [
      {
        label: 'チャットサービスへの通知送信（Slack / Microsoft Teams / Google Chat）',
        scope: 'external',
        detail:
          '管理者が登録した Webhook URL へ、通知本文を JSON で POST します。通信は kintone のプロキシ（kintone.plugin.app.proxy）を経由し、当社サーバーは介在しません。送信先・送信内容・送信条件はすべて管理者の設定次第です。',
      },
      {
        label: '送信履歴の記録（自ドメイン内）',
        detail:
          '送信結果を記録するため、同じスペース内に自動生成した保管アプリへ kintone REST API（/k/v1/record・/k/v1/records）でレコードを追加します。エラー通知のため /k/v1/app/notifications/perRecord も更新します。いずれも自ドメイン内で完結し、外部へは送信しません。記録モードを「記録しない」にすれば記録も行いません。',
      },
    ],
  },
  'kw-address-assist': {
    extraComm: [
      {
        label: '郵便番号 → 住所変換',
        scope: 'external',
        detail:
          '入力された郵便番号のみを zipcloud（zipcloud.ibsnet.co.jp）へ送信して住所を取得します。氏名・会社名などレコードの他の値は送信しません。Google マップ連携はリンク URL を組み立てるだけで、データの送信はありません。',
      },
      {
        label: '住所 → 郵便番号の逆引き用データの取得（当社サーバーからのダウンロードのみ）',
        scope: 'external',
        detail:
          '逆引きの取得ボタンを押したときだけ、日本郵便の公開データを加工した郵便番号ファイル（都道府県ごとに1ファイル・約200KB）を当社サーバー（kizuna-works.jp）から取得します。これは「ダウンロード」であり、住所や郵便番号などレコードの値を送信することは一切ありません。照合はすべてブラウザ内で行われます。取得したファイルは画面内でキャッシュし、同じ都道府県を繰り返し取得することはありません。逆引きを使わない場合、この通信は発生しません。',
      },
    ],
  },
  'kw-csv-export': {
    libs: [
      {
        name: 'encoding-japanese',
        version: '2.2.0',
        license: 'MIT',
        purpose: 'CSV の文字コード変換（Shift-JIS など）。実行時に外部から読み込まず、パッケージに同梱しています。',
      },
    ],
  },
  'kw-file-preview': {
    runtimeLibs: [
      { name: 'PDF.js', version: '3.11.174', license: 'Apache-2.0', purpose: 'PDF の描画' },
      { name: 'ExcelJS', version: '4.4.0', license: 'MIT', purpose: 'Excel(xlsx) の読み込み・書式再現' },
      { name: 'SheetJS (xlsx)', version: '0.18.5', license: 'Apache-2.0', purpose: 'Excel の予備表示（値のみ）' },
      { name: 'JSZip', version: '3.10.1', license: 'MIT/GPLv3', purpose: 'xlsx 解析・グラフ抽出' },
      { name: 'Chart.js', version: '4.4.1', license: 'MIT', purpose: 'Excel グラフの再現描画' },
      { name: 'SSF', version: '0.11.2', license: 'Apache-2.0', purpose: 'Excel 数値書式（¥・％・日付等）の適用' },
      { name: 'docx-preview', version: '0.3.5', license: 'Apache-2.0', purpose: 'Word(docx) のページ再現表示' },
      { name: 'mammoth', version: '1.6.0', license: 'BSD-2-Clause', purpose: 'Word の予備表示' },
      { name: 'crypto-js', version: '4.2.0', license: 'MIT', purpose: 'パスワード付き Office のブラウザ内復号（鍵導出・AES）' },
      { name: 'cfb', version: '1.2.2', license: 'Apache-2.0', purpose: 'パスワード付き Office の複合ファイル解析' },
      { name: 'React / ReactDOM', version: '18.3.1', license: 'MIT', purpose: 'Excel 高精細表示の実行基盤（切替時のみ読込）' },
      { name: 'Fortune-sheet', version: '1.0.4', license: 'MIT', purpose: 'Excel 高精細表示（Excel 風グリッド描画）' },
      { name: 'LuckyExcel', version: '1.0.1', license: 'MIT', purpose: 'Excel 高精細表示用のデータ変換' },
    ],
  },
  'kw-sheet-edit': {
    libs: [
      {
        name: 'SheetJS (xlsx, mini)',
        version: '0.20.3',
        license: 'Apache-2.0',
        purpose: 'Excel(xlsx) 出力ファイルのブラウザ内生成。実行時に外部から読み込まず、パッケージに同梱しています。',
      },
    ],
  },
  'kw-report-designer': {
    runtimeLibs: [
      { name: 'PDF.js', version: '3.11.174', license: 'Apache-2.0', purpose: '設定画面での背景 PDF の読み込み・画像化' },
      { name: 'html2canvas', version: '1.4.1', license: 'MIT', purpose: 'PDF 自動保存時に帳票をブラウザ内で画像化' },
      { name: 'pdf-lib', version: '1.17.1', license: 'MIT', purpose: 'PDF 自動保存時に PDF ファイルをブラウザ内で生成' },
    ],
  },
  'kw-dashboard': {
    runtimeLibs: [
      { name: 'Chart.js', version: '4.4.1', license: 'MIT', purpose: 'グラフ（棒・折れ線・円・レーダー等）の描画。グラフを表示するときだけ読み込みます' },
    ],
  },
  'kw-bulk-update': {
    extraComm: [
      {
        label: 'ユーザー／組織／グループ候補の取得',
        detail:
          'ユーザー選択・組織選択・グループ選択フィールドを一括更新するときや、実行権限（グループ所属）を判定するときに、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/users・/v1/organizations・/v1/groups 等）を呼び出して候補を取得します。呼び出しはすべて自ドメイン内で完結し、外部の第三者へは送信しません。レコードの取得・更新・履歴からの復元もすべて自ドメインの kintone REST API で行い、変更前後のスナップショットは同一スペース内に自動生成する保管アプリ（kintoneアプリ）に保存します。',
      },
    ],
  },
  'kw-excel-paste': {
    extraComm: [
      {
        label: 'ユーザー／グループ候補の取得・実行権限の判定',
        detail:
          'モードB（一覧からの一括作成）で「実行できるユーザー」を「指定ユーザー・グループ」に設定した場合に、候補の取得や所属判定のため、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/users・/v1/groups・/v1/group/users 等）を呼び出します。呼び出しはすべて自ドメイン内で完結し、外部の第三者へは送信しません。貼り付けたデータの解析はブラウザ内で行い、サブテーブルへの反映（JS API）とレコードの作成（kintone REST API /k/v1/records）はすべて自ドメイン内で完結します。CSV読み込み機能は使用しません。',
      },
    ],
  },
  'kw-ambiguous-match': {
    extraComm: [
      {
        label: '既存レコードの照合取得（自ドメイン内）',
        detail:
          '入力中の照合のため、対象アプリの既存レコードを自ドメインの kintone REST API（カーソルAPI：/k/v1/records/cursor・/k/v1/records、設定画面のフィールド一覧は /k/v1/app/form/fields）で取得します。取得するのは照合に使うフィールドのみ（対象フィールド・参照フィールド）で、すべて自ドメイン内で完結し、外部の第三者へは送信しません。取得したレコードは画面表示中にブラウザのメモリ上で保持して類似度を計算するだけで、外部保存・外部送信は行いません。レコードの作成・更新・削除は一切行いません（候補の提示のみ）。表記ゆれの正規化は照合の内部比較にのみ使用し、入力値・保存値は変更しません。',
      },
    ],
  },
  'kw-related-enhancer': {
    extraComm: [
      {
        label: '関連レコードの集計取得・集計結果の書き込み（自ドメイン内）',
        detail:
          '集計のため、参照先アプリのレコードを自ドメインの kintone REST API（カーソルAPI：/k/v1/records/cursor、フィールド一覧は /k/v1/app/form/fields）で取得します。取得は閲覧しているユーザー自身のセッション権限で行い（APIトークンの発行・保管はありません）、すべて自ドメイン内で完結し、外部の第三者へは送信しません。取得したデータはブラウザのメモリ上で集計・表示するだけで、外部保存・外部送信は行いません。「集計結果の書き込み保存」を有効にした場合のみ、集計した数値を自アプリの数値フィールドへ /k/v1/record（PUT・自ドメイン）で書き込みます（書き込むのは集計値のみ）。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  'kw-status-bulk-action': {
    extraComm: [
      {
        label: '実行権限の判定・次の作業者候補の取得（自ドメイン内）',
        detail:
          '実行権限（ユーザー／組織／グループ所属）の判定や、次の作業者候補（グループ・組織のメンバー）の解決のため、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/users・/v1/group/users・/v1/organization/users・/v1/user/groups・/v1/user/organizations）を呼び出します。呼び出しはすべて自ドメイン内で完結し、外部の第三者へは送信しません。プロセス管理設定の取得（/k/v1/app/status.json）、レコードの取得・ステータス変更（/k/v1/records・/k/v1/records/status.json）もすべて自ドメインの kintone REST API で行います。滞留日数の可視化を使う場合のみ、設定画面のボタン操作で対象アプリに非表示の日時フィールドを1つ追加します（そのステータスになった時刻だけを記録・外部送信なし）。',
      },
    ],
  },

  'kw-card-board': {
    extraComm: [
      {
        label: '次の作業者候補の取得・添付サムネイルの取得（自ドメイン内）',
        detail:
          'ドラッグ&ドロップでプロセス管理ステータスを変更する際、次の作業者候補（グループ・組織のメンバー）の解決のため、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/user/groups・/v1/user/organizations・/v1/group/users・/v1/organization/users）を呼び出します。詳細カードのサムネイル表示のため、添付ファイル（/k/v1/file.json）を取得します。レコードの取得・値の変更（/k/v1/records・/k/v1/record・/k/v1/record/status）、プロセス管理設定の取得（/k/v1/app/status.json）もすべて自ドメインの kintone REST API で行います。呼び出しはすべて自ドメイン内で完結し、外部の第三者へは送信しません。対象アプリのフォーム定義（フィールド）は変更しません。',
      },
    ],
  },
  'kw-accordion-tab': {
    extraComm: [
      {
        label: '見出しバッジ算出のためのフォーム情報取得（自ドメイン内・読み取りのみ）',
        detail:
          '見出しの「未入力の必須項目数」「入力状況」バッジを算出するために、ご利用中の kintone ドメイン内のフォーム情報API（/k/v1/app/form/fields・/k/v1/app/form/layout）を読み取ります。呼び出しはすべて自ドメイン内で完結し、外部の第三者へは送信しません。各セクションの入力状況の判定に使うレコード値は画面上の値（kintone.app.record.get）から取得し、送信は行いません。対象アプリのフォーム定義・レコードデータを変更することはありません。',
      },
    ],
  },
  'kw-elapsed-assist': {
    extraComm: [
      {
        label: '一括再計算・管理用フィールドの追加（自ドメイン内）',
        detail:
          '一覧・詳細のその場再計算と保存時の書き込みは、kintone が画面に渡すデータだけで行い、追加の通信は発生しません。「一括再計算」ボタンを押したときだけ、対象レコードの取得・書き込みを自ドメインの kintone REST API（/k/v1/records の GET／PUT）で行います。カウント停止条件や最終更新日時を使う場合は、設定画面のボタン操作で対象アプリに非表示の日時フィールドを追加します（/k/v1/preview/app/form/fields・/k/v1/preview/app/deploy）。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  // The URL-preview tab renders a site the administrator chose, so the viewer's
  // browser talks to that third party directly. That is worth stating plainly
  // even though the plugin itself sends nothing outside kintone.
  'kw-sidebar-enhancer': {
    extraComm: [
      {
        label: '指定された URL の埋め込み表示（管理者が選んだサイトへ、閲覧者のブラウザから直接接続）',
        scope: 'external',
        detail:
          '「リンク」タブは、管理者が指定したフィールドに入っている URL を iframe で表示します。この読み込みは閲覧者のブラウザから当該サイトへ直接行われるため、そのサイトには通常のアクセスと同じ情報（IPアドレス・リファラ等）が渡ります。当社のサーバーは経由しません。Google マップの共有URLは埋め込み形式（output=embed）へURLを書き換えてから表示しますが、書き換えはブラウザ内で行い、住所などの値を当社や第三者へ送信することはありません。表示するフィールドは管理者が指定したものだけで、機能を無効にすれば読み込みは行われません。',
      },
      {
        label: 'レコード追加・チェック状態の保存・ステータス一覧の取得（自ドメイン内）',
        detail:
          '「追加」タブの追加先スキーマ取得と登録は、自ドメインの kintone REST API（/k/v1/preview/app/form/fields・/k/v1/app/form/layout・/k/v1/record の POST・/k/v1/file の GET／POST）で行います。表示できるアプリの判定に /k/v1/apps、書き込み可否の判定に /k/v1/app/acl・/k/v1/field/acl を参照します（アプリ管理権限がない場合は取得できないため、その際は kintone 自身の判定に委ねます）。「確認」タブのチェック状態は、同一スペース内に自動生成する「チェックリスト管理」保管アプリへ /k/v1/records の GET／POST／PUT で保存し、保管アプリの生成・不足項目の追加・アクセス権設定は preview/app 系 API で行います。「進捗」タブが使うプロセス管理のステータス一覧は kintone.app.getStatus()（レコード画面）と /k/v1/preview/app/status（設定画面）から取得し、ステータスの変更履歴はレコード内の専用フィールドに保存します（外部には出しません）。設定画面のユーザー・組織・グループ候補の取得は、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/users・/v1/organizations・/v1/groups）を呼び出します。レコード画面では、実行権限や対象ユーザーに組織・グループを指定している場合にかぎり、ログインユーザー自身の所属（/v1/user/organizations・/v1/user/groups）を確認します（ユーザー指定のみ・未指定の場合は呼び出しません）。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  'kw-view-control': {
    extraComm: [
      {
        label: '所属情報・一覧定義の取得（自ドメイン内）',
        detail:
          'レコード一覧・グラフの表示制御は、ブラウザ内の判定だけで行います。ご利用中の kintone ドメイン内の API を呼び出すのは次の場合だけです。①対象者に組織・グループを指定している場合、ログインユーザー自身の所属を確認します（cybozu.com 共通管理API の /v1/user/organizations・/v1/user/groups）。ログインしてから最初の 1 回だけで、以降はブラウザ内（sessionStorage）に保持した情報で判定します。対象者をユーザー指定だけにしている場合は呼び出しません。②「アプリ管理者は制御対象外にする」を ON にした場合のみ、管理者かどうかの判定に /k/v1/app/acl を 1 回参照します（結果もセッション内に保持します）。③設定画面で一覧・グラフの定義（/k/v1/app/views・/k/v1/app/reports）と、対象者候補のユーザー・組織・グループ（/v1/users・/v1/organizations・/v1/groups）を取得します。レコードの値は一切読み取らず、アプリのフォーム定義（フィールドの追加・変更・削除）も行いません。表示制御は kintone 公式の JS API（showViewSelectorItems／showReportSelectorItems）で行い、一覧切替の DOM は操作しません。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  'kw-text-join': {
    extraComm: [
      {
        label: '重複チェックの照会・一括反映（自ドメイン内）',
        detail:
          'レコード画面の表示中と入力中は通信しません。結合に必要なフィールド情報（数値の単位・選択肢の並び順・テーブル内の項目の種類）は設定を保存したときに取り込んでおくため、レコードを開くたびに問い合わせる必要がないからです。自ドメインの kintone REST API を使うのは次の場合だけです。①「結合結果の重複チェック」を有効にしたルールで保存したとき、同じ値のレコードがあるかを照会します（/k/v1/records の GET・取得するのはレコードIDのみ・最大5件）。②設定画面でフィールド一覧を取得するとき（/k/v1/preview/app/form/fields）と、ライブプレビューを「実データ」にしたとき最新レコードを1件取得するとき（/k/v1/records の GET）。③設定画面で「一括反映」を実行したとき、対象レコードの取得と書き込みを行います（/k/v1/records/cursor・/k/v1/records の PUT）。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。アプリのフォーム定義（フィールドの追加・変更・削除）は一切行いません。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  'kw-table-assist': {
    extraComm: [
      {
        label: '設定画面のフィールド取得・一括反映（自ドメイン内）',
        detail:
          'レコード画面では通信を一切行いません。行の並べ替え・複製・一括操作・集計は kintone の画面内の仕組み（record.get / record.set）だけで行い、テーブルの列構成や書き込み先の桁数・単位などの情報は、設定を保存したときに取り込んでおくためです。自ドメインの kintone REST API を使うのは次の場合だけです。①設定画面でテーブル・フィールドの一覧と並び順を取得するとき（/k/v1/preview/app/form/fields・/preview/app/form/layout）。②設定画面で「一括反映」を実行したとき、対象レコードの取得と集計値の書き込みを行うとき（/k/v1/records/cursor・/k/v1/records の PUT）。③一括反映の実行権限を判定するときと、実行できるユーザーを指定するときに、ご利用中の kintone ドメイン内の共通管理API（/v1/users・/v1/organizations・/v1/groups・/v1/group/users・/v1/organization/users）。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。アプリのフォーム定義（フィールドの追加・変更・削除）は一切行わず、チェック用の列を自動生成することもしません。レコードに書き込むのは、利用者の操作による「テーブルの行の並び順・行の追加（複製）・行の削除」と、設定で指定した数値フィールドへの集計値だけです。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
  'kw-read-check': {
    extraComm: [
      {
        label: '既読／編集ログの記録・管理者候補の取得（自ドメイン内）',
        detail:
          '既読・編集の記録と一覧表示は、同一スペース内に自動生成する「既読チェック管理」保管アプリ（kintoneアプリ）に対する自ドメインの kintone REST API（/k/v1/records の GET／POST／PUT）で行います。保管アプリの自動生成・不足項目の追加・アクセス権設定は preview/app 系 API（/k/v1/preview/app・/preview/app/form/fields・/preview/app/settings・/preview/app/acl・/preview/record/acl・/preview/app/deploy）で行います。設定画面の「既読ログ管理者」候補の取得のみ、ご利用中の kintone ドメイン内の cybozu.com 共通管理API（/v1/users・/v1/organizations・/v1/groups）を呼び出します。ログインユーザーの取得は kintone.getLoginUser()（通信なし）です。いずれもご利用中の kintone ドメイン内で完結し、外部の第三者へは送信しません。記録するのは「誰が・いつ・何回、閲覧／編集したか」のみで、レコードの入力値は保存しません。第三者CDN・外部サーバーは利用しません。',
      },
    ],
  },
};

/**
 * Returns the security profile for a plugin, validating the ID against the
 * canonical plugin list. Throws on an unknown ID so a typo fails the build.
 */
export function getSecurityProfile(pluginId: string): SecurityProfile {
  const known = [...plugins, ...premiumPlugins].some((p) => p.id === pluginId);
  if (!known) {
    throw new Error(`getSecurityProfile: unknown pluginId "${pluginId}"`);
  }
  return securityProfiles[pluginId] ?? {};
}
