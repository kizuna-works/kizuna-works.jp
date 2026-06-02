---
title: "Chrome 拡張機能「KW Field Viewer for kintone」を v2.2.0 にアップデートしました"
description: "GROUP フィールド配下の親子関係を CSV／JSON／Markdown／HTML エクスポートに反映。グループ内フィールドはインデント表示され、フォームの階層構造を保ったままドキュメント化できるようになりました。"
pubDate: 2026-06-03
category: update
ogImage: "/images/extensions/kw-field-viewer-banner.png"
---

Chrome 拡張機能「KW Field Viewer for kintone」を **v2.2.0** にアップデートしました。GROUP（グループ）フィールド配下のフィールドが、どのグループに属しているかをエクスポート結果から判別できるようになりました。

## v2.2.0 で新しくできるようになったこと

- **CSV エクスポート**：「親グループ」列を追加。グループ配下のフィールドには所属する GROUP のフィールドコードが入る
- **JSON エクスポート**：各フィールドオブジェクトに `parentGroup` プロパティを追加。API 連携用途でも階層情報を保持
- **Markdown エクスポート**：グループ配下のフィールド名に `└ ` プレフィックスを付与し、フォーム構造をそのまま表現
- **HTML エクスポート**：グループ配下のフィールド行をインデント表示。視覚的にフォーム階層が一目で分かるレイアウトに

## 既存ユーザーへの影響

これまで通りオーバーレイ表示・一括コピー・各エクスポート機能はすべて動作します。Chrome ウェブストア経由で自動的に v2.2.0 へ更新されます。

[KW Field Viewer for kintone ページを見る →](/extensions/kw-field-viewer-for-kintone/)
