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

/** An external communication beyond the common license check. */
export interface ExtraComm {
  /** Short label, e.g. "郵便番号 → 住所変換". */
  label: string;
  /** What is sent and to where, in plain Japanese. */
  detail: string;
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

export interface SecurityProfile {
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
  'kw-address-assist': {
    extraComm: [
      {
        label: '郵便番号 → 住所変換',
        detail:
          '入力された郵便番号のみを zipcloud（zipcloud.ibsnet.co.jp）へ送信して住所を取得します。氏名・会社名などレコードの他の値は送信しません。Google マップ連携はリンク URL を組み立てるだけで、データの送信はありません。',
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
