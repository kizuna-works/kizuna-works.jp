# SITE_STRUCTURE.md — KIZUNA Works サイト構成ガイド

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| サイト名 | KIZUNA Works |
| ドメイン | kizuna-works.jp |
| リポジトリ | kizuna-works/kizuna-works.jp |
| ローカルパス | `C:\kizuna-works.jp` |
| ホスティング | GitHub Pages |
| フレームワーク | Astro 6.1.7（静的サイト出力） |
| ビルド出力 | `dist/`（GitHub Pages で公開） |
| 説明 | kintoneプラグイン・無料Webツール・業務効率化サービスを提供するサイト |

---

## 2. ディレクトリ構成

```
c:\kizuna-works.jp\
├── src/                        # Astro ソースコード（編集対象）
│   ├── consts.ts               # サイト全体の定数定義（サイトタイトルなど）
│   ├── content.config.ts       # Astro コンテンツコレクションの型定義
│   ├── assets/                 # Astro が処理する静的アセット
│   │   ├── blog-placeholder-1.jpg
│   │   ├── blog-placeholder-2.jpg
│   │   ├── blog-placeholder-3.jpg
│   │   ├── blog-placeholder-4.jpg
│   │   ├── blog-placeholder-5.jpg
│   │   ├── blog-placeholder-about.jpg
│   │   └── fonts/              # フォントファイル（Atkinson Hyperlegible）
│   │       ├── atkinson-bold.woff
│   │       └── atkinson-regular.woff
│   ├── components/             # 再利用可能なAstroコンポーネント
│   │   ├── BlogCard.astro      # ブログ記事カード（ホームページ・ブログ一覧で使用）
│   │   ├── RelatedPosts.astro  # ブログ記事末尾の関連記事自動表示（タグ重複数でスコアリング・上位3件）
│   │   ├── SupporterCTA.astro  # サポーターライセンス案内ページへの誘導カード（pluginIdでURL自動付与）
│   │   └── SupporterForm.astro # サポーターライセンス申込フォーム（URL ?plugin=<id> で自動選択対応）
│   ├── data/                   # ビルド時参照される TS データ
│   │   ├── plugins.ts          # プラグイン一覧の単一情報源（グリッド・フォーム・JSON-LDの元）
│   │   └── glossary.ts         # kintone 用語集の単一情報源（/glossary/ ページと DefinedTermSet JSON-LD を生成）
│   ├── layouts/                # 共通レイアウトコンポーネント
│   │   ├── Layout.astro        # 全ページ共通レイアウト（GA4・AdSense・Noto Sans JP・ヘッダー・フッター）
│   │   └── BlogPost.astro      # ブログ記事専用レイアウト
│   ├── pages/                  # ページファイル（URLに対応）
│   │   ├── index.astro         # トップページ（/）
│   │   ├── contact.astro       # お問い合わせページ（/contact/）― Google Forms リンク
│   │   ├── privacy.astro       # プライバシーポリシー（/privacy/）
│   │   ├── refund.astro        # 返金ポリシー（/refund/）
│   │   ├── terms.astro         # 利用規約（/terms/）
│   │   ├── tokushoho.astro     # 特定商取引法に基づく表記（/tokushoho/）
│   │   ├── rss.xml.js          # RSSフィード生成（/rss.xml）
│   │   ├── blog/
│   │   │   ├── index.astro     # ブログ一覧ページ（/blog/）― note.com RSS + コンテンツコレクション
│   │   │   └── [...slug].astro # ブログ記事動的ルート（/blog/[記事スラッグ]/）
│   │   ├── plugins/
│   │   │   ├── index.astro     # プラグイン一覧ページ（/plugins/）
│   │   │   ├── supporter/
│   │   │   │   └── index.astro # 年間サポーターライセンス案内＆申込フォーム（/plugins/supporter/）
│   │   │   ├── field-styler/
│   │   │   │   └── index.astro # フィールドスタイラー製品ページ（/plugins/field-styler/）
│   │   │   ├── kw-conditional-numbering/
│   │   │   │   └── index.astro # 条件分岐自動採番プラグイン製品ページ（/plugins/kw-conditional-numbering/）
│   │   │   ├── form-deco/
│   │   │   │   └── index.astro # FormDecoプラグイン製品ページ（/plugins/form-deco/）
│   │   │   ├── lookup-suggest/
│   │   │   │   └── index.astro # ルックアップサジェストプラグイン製品ページ（/plugins/lookup-suggest/）
│   │   │   ├── quick-search/
│   │   │   │   └── index.astro # クイックサーチプラグイン製品ページ（/plugins/quick-search/）
│   │   │   ├── file-icon-marker/
│   │   │   │   └── index.astro # 添付ファイルアイコン表示プラグイン製品ページ（/plugins/file-icon-marker/）
│   │   │   └── quick-side-view/
│   │   │       └── index.astro # クイックサイドビュープラグイン製品ページ（/plugins/quick-side-view/）
│   │   ├── tools/
│   │   │   └── index.astro     # 無料ツール一覧ページ（/tools/）
│   │   ├── extensions/
│   │   │   ├── index.astro     # Chrome 拡張機能一覧ページ（/extensions/）
│   │   │   ├── kw-field-viewer-for-kintone/
│   │   │   │   ├── index.astro          # KW Field Viewer for kintone ランディングページ（/extensions/kw-field-viewer-for-kintone/）
│   │   │   │   └── privacy/
│   │   │   │       └── index.astro      # KW Field Viewer for kintone プライバシーポリシー（/extensions/kw-field-viewer-for-kintone/privacy/）
│   │   │   └── kw-app-exporter-for-kintone/
│   │   │       ├── index.astro          # KW App Exporter for kintone ランディングページ（/extensions/kw-app-exporter-for-kintone/）
│   │   │       └── privacy/
│   │   │           └── index.astro      # KW App Exporter for kintone プライバシーポリシー（/extensions/kw-app-exporter-for-kintone/privacy/）
│   │   ├── glossary/
│   │   │   └── index.astro     # kintone 用語集（/glossary/）— カテゴリ・五十音順、JSで検索/絞り込み、DefinedTermSet JSON-LD 付き
│   │   └── sitemap/
│   │       └── index.astro     # サイトマップ（/sitemap/）— 全ページ一覧。plugins.ts と blog コレクションから自動生成、フッターからリンク
│   ├── content/
│   │   ├── config.ts           # コンテンツコレクションのスキーマ定義（blog コレクション）
│   │   └── blog/               # ブログ記事 Markdown/MDX ファイル置き場
│   │       ├── kintone-teichaku-shinai-riyu.md      # 「kintoneが定着しない本当の理由」記事
│   │       ├── conditional-numbering-plugin.md      # 「条件分岐自動採番プラグインの機能と設定ガイド」記事
│   │       ├── kintone-2026-update.md               # 「2026年最新版 kintoneの注目アップデート＆AI活用術」記事
│   │       ├── kintone-cyouhyou-plugin-hikaku.md    # 「kintone帳票出力プラグイン徹底比較」記事
│   │       ├── kintone-2026-04-update.md            # 「2026年4月最新 kintoneアップデート総まとめ」記事
│   │       ├── kintone-design-plugin-osusume.md     # 「kintone デザイン変更プラグイン特集」記事
│   │       ├── kintone-kensaku-plugin-hikaku.md     # 「kintoneの検索・絞り込みを改善するプラグイン比較【2026年版】」記事
│   │       └── kintone-quick-side-view-plugin-hikaku.md # 「kintone一覧でレコードを閲覧・編集できるプラグイン比較」記事
│   └── styles/
│       └── global.css          # グローバルCSS（最小リセット・スティッキーフッター用）
│
├── public/                     # そのまま公開される静的ファイル（Astro が処理しない）
│   ├── images/                 # サイト全体で使用する画像ファイル
│   │   ├── logo.png                        # ヘッダー用ロゴ（カラー）
│   │   ├── logo-white.png                  # フッター用ロゴ（白）
│   │   ├── favicon.png                     # ファビコン
│   │   ├── ogp.png                         # OGP（SNSシェア用）デフォルトサムネイル
│   │   ├── hero-bg.png / hero-bg.webp      # トップページ ヒーロー背景
│   │   ├── blog-bg.png / blog-bg.webp      # ブログページ 背景
│   │   ├── tools-bg.png / tools-bg.webp    # ツールページ 背景
│   │   ├── plugins-bg.png / plugins-bg.webp # プラグインページ 背景
│   │   ├── contact-bg.png / contact-bg.webp # お問い合わせページ 背景
│   │   ├── stamp-maker-preview.png         # inkan（電子印鑑メーカー）プレビュー画像
│   │   ├── natsuin-preview.png             # Natsuin（PDF捺印ツール）プレビュー画像
│   │   ├── musubi-preview.png              # Musubi（PDF結合・分割ツール）プレビュー画像
│   │   ├── conditional-numbering-icon.png  # 条件分岐自動採番プラグイン アイコン
│   │   ├── conditional-numbering-banner.png # 条件分岐自動採番プラグイン バナー
│   │   ├── form-deco-icon.png              # FormDecoプラグイン アイコン
│   │   ├── form-deco-banner.png            # FormDecoプラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── lookup-suggest-icon.png         # ルックアップサジェストプラグイン アイコン
│   │   ├── lookup-suggest-banner.png       # ルックアップサジェストプラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── lookup-suggest-config-01.png    # ルックアップサジェストプラグイン 設定画面スクショ① — ルックアップフィールド選択ドロップダウン
│   │   ├── lookup-suggest-config-02.png    # ルックアップサジェストプラグイン 設定画面スクショ② — サジェスト一覧に表示するフィールドのチップ選択UI
│   │   ├── lookup-suggest-action-01.png    # ルックアップサジェストプラグイン 動作画面スクショ① — レコード画面のヒントバナー表示状態（入力前）
│   │   ├── lookup-suggest-action-02.png    # ルックアップサジェストプラグイン 動作画面スクショ② — 「株式」入力中に8件の候補が会社名・電話番号付きで表示
│   │   ├── lookup-suggest-action-03.png    # ルックアップサジェストプラグイン 動作画面スクショ③ — 電話番号「03」で検索し電話番号始まりの3社がヒット（追加検索フィールドの活用例）
│   │   ├── quick-search-icon.png           # クイックサーチプラグイン アイコン（200×200）
│   │   ├── quick-search-banner.png         # クイックサーチプラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── quick-search-action-01.png      # クイックサーチプラグイン 動作画面スクショ① — 検索バー全景（プレースホルダー表示）
│   │   ├── quick-search-action-02.png      # クイックサーチプラグイン 動作画面スクショ② — AND モードで複数キーワード検索
│   │   ├── quick-search-action-03.png      # クイックサーチプラグイン 動作画面スクショ③ — OR モードで横断検索
│   │   ├── quick-search-config-01.png      # クイックサーチプラグイン 設定画面スクショ① — 検索対象フィールドのチップ式選択
│   │   ├── quick-search-config-02.png      # クイックサーチプラグイン 設定画面スクショ② — 表示ビュー・プレースホルダー設定
│   │   ├── quick-search-config-03.png      # クイックサーチプラグイン 設定画面スクショ③ — ボタンカラー設定 + プレビュー
│   │   ├── file-icon-marker-icon.png       # 添付ファイルアイコン表示プラグイン アイコン（200×200）
│   │   ├── file-icon-marker-banner.png     # 添付ファイルアイコン表示プラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── file-icon-marker-before.png     # 添付ファイルアイコン表示プラグイン 導入前スクショ — 標準一覧画面では添付有無不可視
│   │   ├── file-icon-marker-after-01.png   # 添付ファイルアイコン表示プラグイン 動作画面スクショ① — 拡張子別アイコン+件数バッジ表示
│   │   ├── file-icon-marker-after-02.png   # 添付ファイルアイコン表示プラグイン 動作画面スクショ② — hoverツールチップでファイル名表示
│   │   ├── file-icon-marker-config-01.png  # 添付ファイルアイコン表示プラグイン 設定画面スクショ① — 基本設定（対象フィールド・位置・種別判定・件数バッジ）
│   │   ├── file-icon-marker-config-02.png  # 添付ファイルアイコン表示プラグイン 設定画面スクショ② — ツールチップ配色（背景色・文字色・ライブプレビュー）
│   │   ├── file-icon-marker-config-03.png  # 添付ファイルアイコン表示プラグイン 設定画面スクショ③ — アイコンマッピング設定（28種プリセット先頭）
│   │   ├── file-icon-marker-config-04.png  # 添付ファイルアイコン表示プラグイン 設定画面スクショ④ — アイコンマッピング設定（画像/動画/音声/コード系）
│   │   ├── file-icon-marker-config-05.png  # 添付ファイルアイコン表示プラグイン 設定画面スクショ⑤ — アイコンマッピング末尾＋既定行＋行追加/既定値に戻すボタン
│   │   ├── quick-side-view-icon.png        # クイックサイドビュープラグイン アイコン（200×200）
│   │   ├── quick-side-view-banner.png      # クイックサイドビュープラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── quick-side-view-before.png      # クイックサイドビュープラグイン 導入前スクショ — kintone標準のレコード一覧画面（行クリックで詳細画面に遷移する状態）
│   │   ├── quick-side-view-action-01.png   # クイックサイドビュープラグイン 動作画面スクショ① — 1レコードだけクリックしてサイドバーに表示している状態（編集可フィールドのインライン編集UIと「未保存」状態の確認に使用）
│   │   ├── quick-side-view-action-02.png   # クイックサイドビュープラグイン 動作画面スクショ② — 2件のレコードを横並びで開いて比較している状態（カスタマーサクセス管理アプリ提案 vs 社内ポータル刷新PJ）
│   │   ├── quick-side-view-action-03.png   # クイックサイドビュープラグイン 動作画面スクショ③ — 2件のレコードを縦積みレイアウトで開いている状態（カスタマーサクセス管理アプリ提案 + 販売管理システムリプレース提案）
│   │   ├── quick-side-view-config-01.png   # クイックサイドビュープラグイン 設定画面スクショ① — レイアウト（横並び/縦積み）・最大同時表示パネル数（1〜5）・パネルタイトル用フィールド の上部 3 セクション
│   │   ├── quick-side-view-config-02.png   # クイックサイドビュープラグイン 設定画面スクショ② — 表示・編集フィールド設定テーブル（ドラッグハンドル/表示チェック/読取専用・編集可ラジオ・USER_SELECT が「読取専用」固定の例・表示 ON のフィールドが自動で上に集約されている状態）
│   │   ├── field-styler-icon.png           # フィールドスタイラープラグイン アイコン（200×200・56×56から拡大）
│   │   ├── field-styler-before.png         # フィールドスタイラー 導入前スクリーンショット
│   │   ├── field-styler-after.png          # フィールドスタイラー 導入後スクリーンショット
│   │   ├── field-styler-bg.png / field-styler-bg.webp # フィールドスタイラーページ 背景
│   │   ├── field-styler-config-list.png    # フィールドスタイラー 設定一覧画面
│   │   ├── field-styler-config-detail.png  # フィールドスタイラー 設定詳細画面
│   │   └── blog/                           # ブログ記事用画像
│   │       ├── kintone-teichaku-shinai-riyu.png         # 「kintoneが定着しない」記事 OGP・サムネイル
│   │       ├── kintone-shortcut-keys.png                # kintoneショートカットキー一覧画像
│   │       ├── conditional-numbering-plugin.png         # 採番プラグイン記事 OGP・サムネイル（1200×630px）
│   │       ├── conditional-numbering-setting-format.png # 採番プラグイン フォーマット設定画面スクショ
│   │       ├── conditional-numbering-setting-condition.png # 採番プラグイン 条件分岐設定画面スクショ
│   │       ├── conditional-numbering-setting-counter.png   # 採番プラグイン 連番管理画面スクショ
│   │       ├── form-deco-setting-border.png                # FormDecoプラグイン 罫線スタイル設定画面スクショ
│   │       ├── form-deco-setting-space-text.png            # FormDecoプラグイン スペース設定（テキストモード）スクショ
│   │       ├── form-deco-setting-space-image.png           # FormDecoプラグイン スペース設定（画像モード）スクショ
│   │       ├── form-deco-after-text.png                    # FormDecoプラグイン 適用後のレコード詳細画面（罫線・テキスト装飾Afterサンプル）
│   │       ├── form-deco-after-image.png                   # FormDecoプラグイン 適用後のレコード詳細画面（罫線・画像表示Afterサンプル）
│   │       ├── kintone-2026-update.png                  # 「2026年最新版 kintoneアップデート」記事 OGP・サムネイル
│   │       ├── kintone-cyouhyou-plugin-hikaku.png       # 「kintone帳票出力プラグイン徹底比較」記事 OGP・サムネイル
│   │       ├── kintone-2026-04-update.png               # 「2026年4月最新 kintoneアップデート総まとめ」記事 OGP・サムネイル
│   │       ├── kintone-2026-04-lookup-setting.png       # 「2026年4月最新」記事 ルックアップの1文字検索設定画面スクショ
│   │       ├── kintone-design-plugin-osusume.png        # 「kintone デザイン変更プラグイン特集」記事 OGP・サムネイル
│   │       ├── kintone-design-plugin-osusume-before-after.png # 同記事 フィールドスタイラー導入前後の比較画像
│   │       ├── kintone-design-plugin-osusume-color-rule.png   # 同記事 60:30:10配色ルール図解
│   │       ├── kintone-design-plugin-osusume-install.png      # 同記事 フィールドスタイラー設定画面スクショ
│   │       ├── kintone-kensaku-plugin-hikaku.png        # 「kintone検索・絞り込みプラグイン比較」記事 OGP・サムネイル
│   │       └── kintone-quick-side-view-plugin-hikaku.png # 「kintone一覧でレコードを閲覧・編集できるプラグイン比較」記事 OGP・サムネイル
│   ├── downloads/
│   │   ├── .gitkeep                                    # ディレクトリをGit管理するための空ファイル
│   │   ├── kw-conditional-numbering-v1.1.0.zip         # 条件分岐自動採番プラグイン配布ファイル（手動配置）
│   │   ├── kw-field-styler-v1.1.0.zip                  # フィールドスタイラープラグイン配布ファイル v1.1.0（旧版・互換のため残置）
│   │   ├── kw-field-styler-v1.2.0.zip                  # フィールドスタイラープラグイン配布ファイル v1.2.0（最新・ダウンロードボタンの参照先）
│   │   ├── kw-form-deco-v1.0.0.zip                     # FormDecoプラグイン配布ファイル（手動配置）
│   │   ├── kw-lookup-suggest-v1.0.0.zip                # ルックアップサジェストプラグイン配布ファイル（手動配置）
│   │   ├── kw-quick-search-v1.0.0.zip                  # クイックサーチプラグイン配布ファイル（手動配置）
│   │   ├── kw-file-icon-marker-v1.0.0.zip              # 添付ファイルアイコン表示プラグイン配布ファイル（手動配置）
│   │   └── kw-quick-side-view-v1.0.0.zip               # クイックサイドビュープラグイン配布ファイル（手動配置）
│   ├── sitemap.xml             # 旧URL互換用sitemapindex（@astrojs/sitemap生成のsitemap-0.xmlを参照）
│   ├── tools/
│   │   ├── stamp-maker.html    # inkan（電子印鑑メーカー）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── natsuin.html        # Natsuin（PDF電子印鑑・署名ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── musubi.html         # Musubi（PDF結合・分割ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── KizunaTsumugi.html  # KIZUNA Tsumugi（QRコードジェネレーター）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── masuku.html         # Masuku（画像・PDFマスキングツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   └── Shuku.html          # Shuku（画像変換・圧縮・リサイズツール）スタンドアロンHTMLアプリ（Astro管理外）
│   ├── contact.html            # 旧URL（/contact.html）→ /contact/ への meta refresh リダイレクト（noindex）
│   ├── privacy.html            # 旧URL（/privacy.html）→ /privacy/ への meta refresh リダイレクト（noindex）
│   ├── terms.html              # 旧URL（/terms.html）→ /terms/ への meta refresh リダイレクト（noindex）
│   ├── refund.html             # 旧URL（/refund.html）→ /refund/ への meta refresh リダイレクト（noindex）
│   ├── tokushoho.html          # 旧URL（/tokushoho.html）→ /tokushoho/ への meta refresh リダイレクト（noindex）
│   ├── CNAME                   # GitHub Pages カスタムドメイン設定（kizuna-works.jp）
│   └── robots.txt              # 検索エンジンクローラー制御
│
├── dist/                       # ビルド出力ディレクトリ（npm run build の成果物、Git管理対象）
│
├── .astro/                     # Astro 内部キャッシュ・型定義（自動生成、編集不要）
├── .claude/                    # Claude Code 設定ファイル
├── .vscode/                    # VSCode 設定（extensions.json・launch.json）
│
├── astro.config.mjs            # Astro 設定ファイル（サイトURL・インテグレーション設定）
├── package.json                # npm パッケージ定義・スクリプト
├── package-lock.json           # npm 依存関係ロックファイル
├── tsconfig.json               # TypeScript 設定
├── CLAUDE.md                   # Claude Code 向けプロジェクトガイド（AI作業指示書）
├── README.md                   # プロジェクト README
├── SITE_STRUCTURE.md           # このファイル — サイト構成ガイド
└── sitemap.xml                 # サイトマップ（ビルド時に自動生成）
```

---

## 3. 特に重要なファイルの補足説明

### `src/layouts/Layout.astro`
全ページが継承する基底レイアウト。以下が含まれる：
- Google Analytics 4（`G-Q1B44N0922`）トラッキングスクリプト
- Google AdSense（`ca-pub-2096869114957752`）スクリプト
- Noto Sans JP（Google Fonts）読み込み
- サイト共通ヘッダー（スティッキー、ナビゲーション）
- サイト共通フッター（Navy背景、白ロゴ）
- `<Fragment slot="head">` — ページ固有のメタタグ・JSON-LD・canonical を注入するスロット

### `src/pages/blog/index.astro`
ブログ一覧ページ。2系統の記事ソースを統合して表示する：
1. `src/content/blog/` — Astro コンテンツコレクション（Markdown/MDX）
2. note.com RSS フィード — rss2json API 経由でクライアントサイド取得

### `public/tools/stamp-maker.html`
inkan（電子印鑑メーカー）のスタンドアロン HTML アプリ。  
**Astro コンポーネントには変換しない**。`public/` に直置きして `/tools/stamp-maker.html` としてそのまま配信。

### `src/pages/plugins/field-styler/index.astro`
kintone プラグイン「フィールドスタイラー」の製品ページ。  
販売開始時に Stripe Payment Link を追加する。

### `src/pages/extensions/`
KIZUNA Works が公開する Chrome 拡張機能のページ群。
拡張機能の本体ソースは `C:\kizuna-works.jp\SECRET\Chrome_extension_workspace\` 内で管理し、リリース ZIP は `SECRET\Chrome_extension_release\` に配置する（Git 管理外）。

### `astro.config.mjs`
`site: 'https://kizuna-works.jp'` が設定されており、サイトマップ・canonical URL の生成に使用される。

---

## 4. 今後追加予定のファイル・ディレクトリ

| パス | 内容 | 優先度 |
|------|------|--------|
| `src/content/blog/*.md` | ブログ記事（Markdown形式）― 随時追加 | 高 |
| `public/images/ogp.png` | OGP画像の更新 | 中 |
| `src/pages/plugins/<新プラグイン>/index.astro` | 新規プラグイン製品ページ | 新プラグイン追加時 |
| `src/pages/tools/<新ツール>/index.astro` | 新規ツールページ（必要な場合） | 新ツール追加時 |
| `src/pages/extensions/<新拡張機能>/index.astro` | 新規 Chrome 拡張機能のランディングページ | 新拡張機能追加時 |
| `src/pages/extensions/<新拡張機能>/privacy/index.astro` | 新規 Chrome 拡張機能のプライバシーポリシー（Chrome Web Store 公開には必須） | 新拡張機能追加時 |

### 新規ファイル追加時のチェックリスト

**ブログ記事を追加する場合：**
1. `src/content/blog/` に Markdown ファイルを作成
2. 必要なフロントマター（`title`, `description`, `pubDate`）を記載

**新規プラグインを追加する場合：**
1. `src/pages/plugins/<プラグイン名>/index.astro` を作成
2. `src/pages/plugins/index.astro` のグリッドに追加
3. `src/pages/plugins/index.astro` の JSON-LD `ItemList` を更新

**新規ツールを追加する場合：**
1. `src/pages/tools/index.astro` のグリッドに追加
2. `src/pages/tools/index.astro` の JSON-LD `ItemList` を更新

**新規 Chrome 拡張機能を追加する場合：**
1. 拡張機能本体は `SECRET\Chrome_extension_workspace\<拡張機能名>\` 内で開発
2. リリース ZIP は `SECRET\Chrome_extension_release\<拡張機能名>-v<バージョン>.zip` に配置
3. `src/pages/extensions/<拡張機能名>/index.astro` を作成（ランディングページ）
4. `src/pages/extensions/<拡張機能名>/privacy/index.astro` を作成（プライバシーポリシー・**Chrome Web Store 公開には必須**）
5. `src/pages/extensions/index.astro` のグリッドと JSON-LD `ItemList` を更新
6. Chrome Web Store の `homepage_url` に上記ランディングページ URL を指定
