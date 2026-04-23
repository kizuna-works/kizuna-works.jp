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
│   │   └── BlogCard.astro      # ブログ記事カード（ホームページ・ブログ一覧で使用）
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
│   │   │   ├── field-styler/
│   │   │   │   └── index.astro # フィールドスタイラー製品ページ（/plugins/field-styler/）
│   │   │   └── kw-conditional-numbering/
│   │   │       └── index.astro # 条件分岐自動採番プラグイン製品ページ（/plugins/kw-conditional-numbering/）
│   │   └── tools/
│   │       └── index.astro     # 無料ツール一覧ページ（/tools/）
│   ├── content/
│   │   ├── config.ts           # コンテンツコレクションのスキーマ定義（blog コレクション）
│   │   └── blog/               # ブログ記事 Markdown/MDX ファイル置き場
│   │       ├── kintone-teichaku-shinai-riyu.md      # 「kintoneが定着しない本当の理由」記事
│   │       ├── conditional-numbering-plugin.md      # 「条件分岐自動採番プラグインの機能と設定ガイド」記事
│   │       ├── kintone-2026-update.md               # 「2026年最新版 kintoneの注目アップデート＆AI活用術」記事
│   │       ├── kintone-cyouhyou-plugin-hikaku.md    # 「kintone帳票出力プラグイン徹底比較」記事
│   │       └── kintone-2026-04-update.md            # 「2026年4月最新 kintoneアップデート総まとめ」記事
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
│   │       ├── kintone-2026-update.png                  # 「2026年最新版 kintoneアップデート」記事 OGP・サムネイル
│   │       ├── kintone-cyouhyou-plugin-hikaku.png       # 「kintone帳票出力プラグイン徹底比較」記事 OGP・サムネイル
│   │       ├── kintone-2026-04-update.png               # 「2026年4月最新 kintoneアップデート総まとめ」記事 OGP・サムネイル
│   │       └── kintone-2026-04-lookup-setting.png       # 「2026年4月最新」記事 ルックアップの1文字検索設定画面スクショ
│   ├── downloads/
│   │   ├── .gitkeep                                    # ディレクトリをGit管理するための空ファイル
│   │   └── kw-conditional-numbering-v1.0.0.zip         # 条件分岐自動採番プラグイン配布ファイル（手動配置）
│   ├── tools/
│   │   ├── stamp-maker.html    # inkan（電子印鑑メーカー）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── natsuin.html        # Natsuin（PDF電子印鑑・署名ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── musubi.html         # Musubi（PDF結合・分割ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── KizunaTsumugi.html  # KIZUNA Tsumugi（QRコードジェネレーター）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── masuku.html         # Masuku（画像・PDFマスキングツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   └── Shuku.html          # Shuku（画像変換・圧縮・リサイズツール）スタンドアロンHTMLアプリ（Astro管理外）
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
