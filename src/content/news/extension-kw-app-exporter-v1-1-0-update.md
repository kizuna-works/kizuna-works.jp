---
title: "Chrome 拡張機能「KW App Exporter for kintone」を v1.1.0 にアップデートしました"
description: "フィールド構成のエクスポートで GROUP（グループ）配下フィールドの親子関係を反映。HTML／Markdown は階層表示、Excel は「親テーブル/グループ」列に対応し、フォーム構造を保ったままドキュメント化できるようになりました。"
pubDate: 2026-06-03
category: update
ogImage: "/images/extensions/kw-app-exporter-banner.png"
---

Chrome 拡張機能「KW App Exporter for kintone」を **v1.1.0** にアップデートしました。フィールド構成のエクスポートで、GROUP（グループ）配下のフィールドがどのグループに属しているかを出力結果から判別できるようになりました。これまで対応済みだったテーブル（SUBTABLE）と同じ表示形式に統一されています。

## v1.1.0 で新しくできるようになったこと

- **フィールド構成出力**：GROUP 配下のフィールドを親グループ行の下に `└` インデント表示（テーブル / SUBTABLE と同じ形式に統一）
- **HTML / Markdown エクスポート**：グループ配下フィールドを階層構造で表現し、フォーム構成をそのまま表現
- **Excel エクスポート**：「フィールド構成」シートの「親テーブル」列を「親テーブル/グループ」列にリネーム。グループ配下フィールドには親グループのフィールドコードが入る
- **グループ所属の自動解決**：フィールド構成の取得時に内部でレイアウト情報を自動参照し、所属グループを正確に判定（出力項目は増えません）

## 既存ユーザーへの影響

これまで通り 8 カテゴリの設定情報を HTML / JSON / Excel / Markdown 形式で一括エクスポートできます。Chrome ウェブストア経由で自動的に v1.1.0 へ更新されます。

[KW App Exporter for kintone ページを見る →](/extensions/kw-app-exporter-for-kintone/)
