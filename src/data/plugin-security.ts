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
      { name: 'docx-preview', version: '0.3.5', license: 'Apache-2.0', purpose: 'Word(docx) のページ再現表示' },
      { name: 'mammoth', version: '1.6.0', license: 'BSD-2-Clause', purpose: 'Word の予備表示' },
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
