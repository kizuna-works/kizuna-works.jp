// Single source of truth for per-plugin security / data-handling facts.
// Backed by the source audit recorded in
// SECRET/kintone_plugin_release/SECURITY_AUDIT.md (audited 2026-06-04).
//
// Most plugins share the same profile: the only outbound communication is the
// license check (plugin ID + domain name, relayed via kintone.proxy), no record
// data ever leaves kintone, no runtime CDN is loaded, and settings are stored in
// kintone's encrypted config area. Plugins that talk to an extra endpoint or
// bundle a third-party library declare it here as an override.

import { plugins } from './plugins';

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

export interface SecurityProfile {
  /** Extra outbound communications on top of the shared license check. */
  extraComm?: ExtraComm[];
  /** Third-party libraries bundled in the package (none for most plugins). */
  libs?: BundledLib[];
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
};

/**
 * Returns the security profile for a plugin, validating the ID against the
 * canonical plugin list. Throws on an unknown ID so a typo fails the build.
 */
export function getSecurityProfile(pluginId: string): SecurityProfile {
  if (!plugins.some((p) => p.id === pluginId)) {
    throw new Error(`getSecurityProfile: unknown pluginId "${pluginId}"`);
  }
  return securityProfiles[pluginId] ?? {};
}
