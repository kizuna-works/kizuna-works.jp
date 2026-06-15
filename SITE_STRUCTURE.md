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
│   │   ├── SupporterForm.astro # サポーターライセンス申込フォーム（URL ?plugin=<id> で自動選択対応）
│   │   └── SecurityBox.astro   # プラグイン詳細ページの「安心ボックス」（外部通信・ライブラリ・秘匿情報を要約。plugin-security.ts 駆動）
│   ├── data/                   # ビルド時参照される TS データ
│   │   ├── plugins.ts          # プラグイン一覧の単一情報源（グリッド・フォーム・JSON-LDの元）
│   │   ├── glossary.ts         # kintone 用語集の単一情報源（/glossary/ 一覧と DefinedTermSet JSON-LD を生成）。hasPage/longDescription/useCases/faq を持つ語は /glossary/<id>/ の個別ページも生成
│   │   └── plugin-security.ts  # プラグインごとのセキュリティ事実（外部通信・同梱ライブラリ）の単一情報源。SecurityBox が参照
│   ├── layouts/                # 共通レイアウトコンポーネント
│   │   ├── Layout.astro        # 全ページ共通レイアウト（GA4・AdSense・Noto Sans JP・ヘッダー・フッター）
│   │   └── BlogPost.astro      # ブログ記事専用レイアウト
│   ├── pages/                  # ページファイル（URLに対応）
│   │   ├── index.astro         # トップページ（/）
│   │   ├── about.astro         # 運営者情報ページ（/about/）― KIZUNA Works の事業紹介（kintone・Google Workspace・AIによるDX/業務効率化/自動化支援）・支援領域・提供コンテンツ・運営方針・お問い合わせ。フッターからリンク（AdSense E-E-A-T / 信頼性向上用）
│   │   ├── contact.astro       # お問い合わせページ（/contact/）― Google Forms リンク
│   │   ├── privacy.astro       # プライバシーポリシー（/privacy/）
│   │   ├── refund.astro        # 返金ポリシー（/refund/）
│   │   ├── terms.astro         # 利用規約（/terms/）
│   │   ├── tokushoho.astro     # 特定商取引法に基づく表記（/tokushoho/）
│   │   ├── security/
│   │   │   └── index.astro     # セキュリティ・データの取り扱い（/security/）— 全プラグイン共通のセキュリティ方針・外部通信内訳・F12検証手順・FAQ。フッターからリンク
│   │   ├── rss.xml.js          # RSSフィード生成（/rss.xml）
│   │   ├── blog/
│   │   │   ├── index.astro     # ブログ一覧ページ（/blog/）― note.com RSS + コンテンツコレクション
│   │   │   └── [...slug].astro # ブログ記事動的ルート（/blog/[記事スラッグ]/）
│   │   ├── news/
│   │   │   ├── index.astro     # お知らせ一覧ページ（/news/）― 新着リリース・障害情報・サイト更新
│   │   │   ├── [...slug].astro # お知らせ個別ページ動的ルート（externalUrl 未指定エントリのみ生成）
│   │   │   └── rss.xml.ts      # お知らせ RSS フィード（/news/rss.xml）
│   │   ├── plugins/
│   │   │   ├── index.astro     # プラグイン一覧ページ（/plugins/）
│   │   │   ├── ranking/
│   │   │   │   └── index.astro # プラグイン ダウンロードランキング全件ページ（/plugins/ranking/）― GAS から全件取得し順位付け表示。同数時はリリース日が古い方を上位
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
│   │   │   ├── quick-side-view/
│   │   │   │   └── index.astro # クイックサイドビュープラグイン製品ページ（/plugins/quick-side-view/）
│   │   │   ├── record-lock/
│   │   │   │   └── index.astro # レコードロックプラグイン製品ページ（/plugins/record-lock/）
│   │   │   ├── field-comment/
│   │   │   │   └── index.astro # フィールドコメントプラグイン製品ページ（/plugins/field-comment/）
│   │   │   ├── theme-styler/
│   │   │   │   └── index.astro # テーマスタイラープラグイン製品ページ（/plugins/theme-styler/）
│   │   │   ├── address-assist/
│   │   │   │   └── index.astro # 住所アシストプラグイン製品ページ（/plugins/address-assist/）— 郵便番号→住所自動入力＋レコード詳細画面に Google マップ直接プレビュー（差別化）
│   │   │   ├── quick-history-view/
│   │   │   │   └── index.astro # クイック履歴ビュープラグイン製品ページ（/plugins/quick-history-view/）— レコード変更履歴を自動記録し詳細画面に時系列テーブル表示・kintone 完結
│   │   │   ├── related-record-popup/
│   │   │   │   └── index.astro # 関連レコードポップアップ表示プラグイン製品ページ（/plugins/related-record-popup/）— 一覧画面のアイコンにホバーで関連レコード一覧をポップアップ表示・タブ切替・ページネーション対応
│   │   │   ├── summary-bar/
│   │   │   │   └── index.astro # 集計サマリーバープラグイン製品ページ（/plugins/summary-bar/）— 一覧ヘッダーに合計・平均・件数等の集計カードを表示・絞り込み連動再集計・条件付き色分け・段組み対応
│   │   │   ├── csv-export/
│   │   │   │   └── index.astro # かんたんCSV出力プラグイン製品ページ（/plugins/csv-export/）— 一覧の絞り込み結果を用途別テンプレート（列・ヘッダー名・文字コード）でワンクリックCSV出力・クイックサーチ連動・Shift-JIS/UTF-8(BOM)対応
│   │   │   ├── quick-tab/
│   │   │   │   └── index.astro # クイックタブプラグイン製品ページ（/plugins/quick-tab/）— レコード詳細/作成/編集のフィールドをスペース要素を境界にタブ自動分割・「すべて」タブ・必須エラー追従・スクロール固定・スタイル20種×配色（スクショはクリックで拡大オーバーレイ）
│   │   │   ├── file-preview/
│   │   │   │   └── index.astro # 添付ファイルプレビュープラグイン製品ページ（/plugins/file-preview/）— 添付の画像/PDF/Excel/Word/テキストを一覧・詳細のファイル名クリックで全画面モーダル表示・送りナビ・Excel書式/グラフ再現・文字コード自動判定。表示ライブラリは自社配信(/libs/)からSRI付き遅延読込
│   │   │   ├── quick-toc/
│   │   │   │   └── index.astro # クイック目次プラグイン製品ページ（/plugins/quick-toc/）— レコード詳細/編集/新規の左側にセクション目次を常時表示・項目クリックで該当セクションへジャンプ・ステータスバッジ（DropDown/Radio/プロセス管理）・配色3モード・ヘッダー追従・kintone完結（スクショはクリックで拡大オーバーレイ）
│   │   │   ├── list-styler/
│   │   │   │   └── index.astro # 一覧スタイラープラグイン製品ページ（/plugins/list-styler/）— 一覧の左端列固定（0〜3）＋基本行スタイル（ゼブラ2色/単色/文字色）＋行ホバー＋行番号＋条件付き行スタイル（背景/文字色/太字・日付TODAY/選択肢/ステータス・優先ドラッグ）＋行クリックで詳細を開く・設定セット方式・kintone完結。旧 kw-fixed-columns（列固定ビュー）から改称
│   │   │   ├── input-assist/
│   │   │   │   └── index.astro # 入力アシストプラグイン製品ページ（/plugins/input-assist/）— 新規作成/編集で入力順ガイド（待機/現在地/入力済みを色分け・値が入ると次へ自動前進・ラベル横にタグ・自動スクロール/フォーカス）＋未入力チェック（保存は止めず保存時に確認・詳細画面でも未入力表示）＋入力中の重複チェック（「値の重複を禁止する」フィールドを自動対象）。配色はガイド/未入力チェックで別プリセット・kintone完結
│   │   │   ├── conditional-form/
│   │   │   │   └── index.astro # 条件分岐フォームプラグイン製品ページ（/plugins/conditional-form/）— 区分・ステータス・入力値などの条件（最大5件・AND/OR）でフィールド/グループを表示/非表示・必須化・読み取り専用・値の自動セット（TODAY対応）・選択肢の絞り込みに切替。1ルール複数動作＋優先順位ドラッグ＋安全則（非表示＞読取＞必須）＋ハイライト/必須バッジ・新規/編集/詳細をルール単位で指定・kintone完結
│   │   │   ├── sheet-edit/
│   │   │   │   └── index.astro # シート編集プラグイン製品ページ（/plugins/sheet-edit/）— レコード一覧（カスタマイズビュー）を表計算風グリッドに置換し表示中フィールドをその場編集。型別セル編集／保存3経路（自動=行コミット・ボタン・Ctrl+S）／単一セルコピペ・範囲一括編集・縦オートフィル／Undo・Redo（操作グループ単位）／revision競合検知＋行×セル失敗ハイライト／シートタブ式ページネーション（カーソルAPIで1万件超）／型別フィルタ（選択肢複数チェック・数値範囲・部分一致）＋複数列AND・並べ替え／カラー・タブ形状カスタム／Excel出力（表示列そのまま・絞り込み後全件・SheetJS同梱）・kintone完結
│   │   │   └── sticky-board/
│   │   │       └── index.astro # 付箋ボードプラグイン製品ページ（/plugins/sticky-board/）— レコード詳細にカテゴリ付き付箋をクリックで自由配置（移動/リサイズ/本文編集・タイトル濃色/本文薄色・パステル10色＋カスタム）＋一覧上部に公開/個人で分けた未対応件数バー＋カード展開（レコードへ別タブ・対応済み/未対応に戻す・作成者/対応者と日時）。個人付箋はレコードACLで作成者のみ秘匿。対応済みの自動削除（既定30日・公開は全員ぶん）。保管アプリを設定画面からワンクリック自動生成。スクショはライトボックスで拡大・kintone完結
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
│   │   │   ├── index.astro     # kintone 用語集（/glossary/）— カテゴリ・五十音順、JSで検索/絞り込み、DefinedTermSet JSON-LD 付き。hasPage の用語名は個別ページへリンク
│   │   │   └── [id]/index.astro # 用語の個別ページ（/glossary/<id>/）— hasPage:true の語のみ生成。定義＋詳しく＋使いどころ＋FAQ＋関連リンク、DefinedTerm/FAQPage/BreadcrumbList JSON-LD 付き（長尾「kintone ○○とは」狙い）
│   │   └── sitemap/
│   │       └── index.astro     # サイトマップ（/sitemap/）— 全ページ一覧。plugins.ts と blog コレクションから自動生成、フッターからリンク
│   ├── content/
│   │   ├── config.ts           # コンテンツコレクションのスキーマ定義（blog / news コレクション）
│   │   ├── news/               # お知らせエントリ Markdown 置き場（category: release/update/incident/notice）
│   │   └── blog/               # ブログ記事 Markdown/MDX ファイル置き場
│   │       ├── kintone-teichaku-shinai-riyu.md      # 「kintoneが定着しない本当の理由」記事
│   │       ├── conditional-numbering-plugin.md      # 「条件分岐自動採番プラグインの機能と設定ガイド」記事
│   │       ├── kintone-2026-update.md               # 「2026年最新版 kintoneの注目アップデート＆AI活用術」記事
│   │       ├── kintone-cyouhyou-plugin-hikaku.md    # 「kintone帳票出力プラグイン徹底比較」記事
│   │       ├── kintone-2026-04-update.md            # 「2026年4月最新 kintoneアップデート総まとめ」記事
│   │       ├── kintone-design-plugin-osusume.md     # 「kintone デザイン変更プラグイン特集」記事
│   │       ├── kintone-kensaku-plugin-hikaku.md     # 「kintoneの検索・絞り込みを改善するプラグイン比較【2026年版】」記事
│   │       ├── kintone-quick-side-view-plugin-hikaku.md # 「kintone一覧でレコードを閲覧・編集できるプラグイン比較」記事
│   │       └── kintone-lookup-plugin-hikaku.md      # 「【2026年最新】kintoneルックアップを快適にするプラグイン比較」記事（入力サジェスト/自動取得/先更新/編集絞り込みの4アプローチ比較）
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
│   │   ├── field-comment-icon.png          # フィールドコメントプラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── field-comment-banner.png        # フィールドコメントプラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── field-comment-before.png        # フィールドコメントプラグイン 導入前スクショ — 案件情報セクション（案件名・会社名）フィールドにコメント表示なし
│   │   ├── field-comment-after-01.png      # フィールドコメントプラグイン 動作画面スクショ① — 案件名にチェックアイコン（hover/click用）と会社名に常時コメント表示の組み合わせ
│   │   ├── field-comment-after-02.png      # フィールドコメントプラグイン 動作画面スクショ② — 案件名のアイコンにマウスを乗せてポップアップ「必ず入力して下さい」が開いた状態（hoverモード）
│   │   ├── field-comment-config-01.png     # フィールドコメントプラグイン 設定画面スクショ① — カード形式の設定UI全体（対象フィールド/対象画面/表示方法3択/コメントテキスト/背景色・文字色・フォントサイズ/プリセット5種/アイコン図形・マーク/図形色・マーク色/プレビュー）
│   │   ├── theme-styler-icon.png           # テーマスタイラー for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── theme-styler-banner.png         # テーマスタイラー for kintone バナー（1200×675・OGP/グリッド共用）
│   │   ├── address-assist-icon.png         # 住所アシスト for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── address-assist-banner.png       # 住所アシスト for kintone バナー（1200×675・OGP/グリッド共用）
│   │   ├── address-assist-after-01.png     # 住所アシスト 動作画面スクショ① — レコード詳細画面に Google マップが直接埋め込み表示された状態（最大の差別化機能）
│   │   ├── address-assist-after-02.png     # 住所アシスト 動作画面スクショ② — 新規追加で郵便番号 188-0014 を入力した直後に都道府県・市区町村・町名・住所・Google マップ URL が自動入力された状態
│   │   ├── address-assist-after-03.png     # 住所アシスト 動作画面スクショ③ — 結合住所に番地「5-8-2」を追記した瞬間に Google マップ URL と地図プレビューが番地込みで再生成された状態
│   │   ├── address-assist-config-01.png    # 住所アシスト 設定画面スクショ① — 基本設定（郵便番号フィールド・住所形式・郵便番号自動整形 ON/OFF）
│   │   ├── address-assist-config-02.png    # 住所アシスト 設定画面スクショ② — 分割形式の設定（都道府県・市区町村・町名・結合住所）＋ Google Maps URL 設定
│   │   ├── address-assist-config-03.png    # 住所アシスト 設定画面スクショ③ — 住所コピーボタン設定 ＋ 地図プレビュー設定（スペースフィールド指定）
│   │   ├── quick-history-view-icon.png     # クイック履歴ビュー for kintone プラグイン アイコン（ヒーロー画像用・kintone プラグイン本体と同じアイコン）
│   │   ├── quick-history-view-banner.png   # クイック履歴ビュー for kintone バナー（1200×675・OGP/グリッド共用）
│   │   ├── quick-history-view-setup-01.png # クイック履歴ビュー 事前準備スクショ① — 履歴 JSON 保存用「文字列(複数行)」フィールドをフォームに配置
│   │   ├── quick-history-view-setup-02.png # クイック履歴ビュー 事前準備スクショ② — 表示先「スペース」要素を配置し要素ID（例: history）を指定
│   │   ├── quick-history-view-config-01.png # クイック履歴ビュー 設定画面スクショ① — 基本設定タブ（履歴保存フィールド／表示先スペース／保存件数上限）
│   │   ├── quick-history-view-config-02.png # クイック履歴ビュー 設定画面スクショ② — 基本設定タブ 履歴記録の対象フィールド転送リスト（対象11件／除外6件）
│   │   ├── quick-history-view-config-03.png # クイック履歴ビュー 設定画面スクショ③ — 表示設定タブ テーブルの色設定（5色）＋フォント種類・サイズ
│   │   ├── quick-history-view-config-04.png # クイック履歴ビュー 設定画面スクショ④ — 表示設定タブ ライブプレビュー（実際の設定が反映されたサンプルテーブル）
│   │   ├── quick-history-view-action-01.png # クイック履歴ビュー 動作画面スクショ① — レコード詳細画面に変更履歴テーブルが時系列降順で表示されている状態（締切日・確度・商談フェーズの3変更）
│   │   ├── related-record-popup-icon.png    # 関連レコードポップアップ表示 for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── related-record-popup-banner.png  # 関連レコードポップアップ表示 for kintone バナー（1200×675・OGP/グリッド共用）
│   │   ├── related-record-popup-action-01.png # 関連レコードポップアップ表示 動作画面スクショ① — レコード一覧画面で行のアイコンにホバーし、「活動履歴(3) / 関連レコード一覧(5)」タブ付きポップアップが表示された状態（活動履歴タブが選択され、対応日付・対応者・対応種別・内容・添付ファイルの5カラムで3件表示）
│   │   ├── related-record-popup-config-01.png # 関連レコードポップアップ表示 設定画面スクショ① — 基本設定タブ上部（表示する関連レコード一覧のチェックリスト・並び替え注意書きボックス・1ページあたりの表示件数 5件/10件/20件/30件/50件 ラジオ）
│   │   ├── related-record-popup-config-02.png # 関連レコードポップアップ表示 設定画面スクショ② — 基本設定タブ下部（トリガーアイコンの配置 2択／トリガーアイコンの種類 5タイル[矢印・リスト・プレビュー選択中・リンク・情報]／トリガーアイコンの色プリセット10色+カラーピッカー）
│   │   ├── related-record-popup-config-03.png # 関連レコードポップアップ表示 設定画面スクショ③ — 表示設定タブ（ポップアップの背景色 淡色系10色＋カラーピッカー、文字色 4色＋カラーピッカー、ライブプレビュー：ペールシアン背景で「発注履歴(3)/クレーム(1)」タブ付きサンプルテーブル）
│   │   ├── summary-bar-icon.png            # 集計サマリーバー for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── summary-bar-banner.png          # 集計サマリーバー for kintone バナー（1200×675・OGP/グリッド共用）
│   │   ├── summary-bar-before.png          # 集計サマリーバー 導入前スクショ — 一覧ヘッダーに集計表示がない状態
│   │   ├── summary-bar-action-01.png       # 集計サマリーバー 導入後スクショ① — 一覧ヘッダーに件数・発注予定金額(合計/平均)・発注金額(合計/平均/最大)・利益率(平均)の集計カードと表示中/全件トグルを表示
│   │   ├── summary-bar-action-02.png       # 集計サマリーバー 動作スクショ② — カードを2段で表示
│   │   ├── summary-bar-action-03.png       # 集計サマリーバー 動作スクショ③ — 2段・中央寄せ配置
│   │   ├── summary-bar-action-04.png       # 集計サマリーバー 動作スクショ④ — 2段・左寄せ配置
│   │   ├── summary-bar-config-01.png       # 集計サマリーバー 設定画面スクショ① — 基本設定タブ（対象一覧・デフォルト集計範囲・集計範囲トグル表示）
│   │   ├── summary-bar-config-02.png       # 集計サマリーバー 設定画面スクショ② — 基本設定タブ下部（数値表示・カードの配置・集計値の文字位置・カードテーマ）
│   │   ├── summary-bar-config-03.png       # 集計サマリーバー 設定画面スクショ③ — カード設定タブ（集計方法・ラベル・プレフィックス/サフィックス・表示段）
│   │   ├── summary-bar-config-04.png       # 集計サマリーバー 設定画面スクショ④ — 値による条件付き色分け（別フィールド比較）
│   │   ├── csv-export-icon.png             # かんたんCSV出力 for kintone プラグイン アイコン（ヒーロー画像用）
│   │   ├── csv-export-banner.png           # かんたんCSV出力 for kintone バナー（1200×675・OGP/グリッド/news共用）
│   │   ├── csv-export-action-01.png        # かんたんCSV出力 動作スクショ① — 一覧ツールバーに緑の「CSV出力」ボタンを設置
│   │   ├── csv-export-action-02.png        # かんたんCSV出力 動作スクショ② — テンプレート選択ダイアログ
│   │   ├── csv-export-action-03.png        # かんたんCSV出力 動作スクショ③ — 出力したCSVをExcelで開いた例（文字化けなし）
│   │   ├── csv-export-config-01.png        # かんたんCSV出力 設定画面スクショ① — テンプレート作成前（全体設定・CSV出力ボタンの色10色プリセット）
│   │   ├── csv-export-config-02.png        # かんたんCSV出力 設定画面スクショ② — テンプレート作成（対象一覧の限定・出力する列）
│   │   ├── csv-export-config-03.png        # かんたんCSV出力 設定画面スクショ③ — 出力する列・ヘッダー名・値の整形・文字コード/区切り/改行
│   │   ├── csv-export-config-04.png        # かんたんCSV出力 設定画面スクショ④ — ファイル名ビルダー（部品＋ライブプレビュー）
│   │   ├── quick-tab-icon.png              # クイックタブ for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── quick-tab-banner.png            # クイックタブ for kintone バナー（1200×675・OGP/グリッド/news共用）
│   │   ├── quick-tab-before.png            # クイックタブ 導入前スクショ — 従業員情報フォームが縦に長く並ぶ状態
│   │   ├── quick-tab-action-01.png         # クイックタブ 動作スクショ① — タブバー設置・「すべて」タブで全項目表示
│   │   ├── quick-tab-action-02.png         # クイックタブ 動作スクショ② — 「基本情報」タブで該当区切りのみ表示
│   │   ├── quick-tab-action-03.png         # クイックタブ 動作スクショ③ — 「業務情報」タブへ切替
│   │   ├── quick-tab-action-04.png         # クイックタブ 動作スクショ④ — 「給与情報」タブ（テーブルを含む区切り）
│   │   ├── quick-tab-action-05.png         # クイックタブ 動作スクショ⑤ — 任意位置に設置・上部は共通エリア（顧客レコード例）
│   │   ├── quick-tab-action-06.png         # クイックタブ 動作スクショ⑥ — スクロール固定でタブバーが画面上部に貼り付き
│   │   ├── quick-tab-setup-01.png          # クイックタブ 事前準備スクショ — フォーム設定でスペースに要素IDを付与
│   │   ├── quick-tab-config-01.png         # クイックタブ 設定画面スクショ① — タブバー設置スペース＋タブ（区間）定義
│   │   ├── quick-tab-config-02.png         # クイックタブ 設定画面スクショ② — 「すべて」タブ・タブバーの幅/配置・スクロール固定
│   │   ├── quick-tab-config-03.png         # クイックタブ 設定画面スクショ③ — デザイン（スタイル×配色＋プレビュー）・初期表示タブ
│   │   ├── file-preview-icon.png           # 添付ファイルプレビュー for kintone プラグイン アイコン（200×200・ヒーロー画像用）
│   │   ├── file-preview-banner.png         # 添付ファイルプレビュー for kintone バナー（1200×675・OGP/グリッド/news共用）
│   │   ├── file-preview-list.png           # 添付ファイルプレビュー 共通一覧スクショ — 添付列にファイル名リンクがある一覧
│   │   ├── file-preview-before.png         # 添付ファイルプレビュー Before — プラグインなしでクリック→即ダウンロード
│   │   ├── file-preview-after.png          # 添付ファイルプレビュー After — クリックで PDF を全画面モーダルプレビュー
│   │   ├── file-preview-action-01.png      # 添付ファイルプレビュー 動作① — Word(docx)表示＋サムネイルで複数ファイル切替
│   │   ├── file-preview-action-02.png      # 添付ファイルプレビュー 動作② — Excel(xlsx)の書式・結合・罫線を再現
│   │   ├── file-preview-action-03.png      # 添付ファイルプレビュー 動作③ — Excelのグラフをデータから再現＋シート切替
│   │   ├── file-preview-config-01.png      # 添付ファイルプレビュー 設定① — 対象フィールド・上限しきい値
│   │   ├── file-preview-config-02.png      # 添付ファイルプレビュー 設定② — 対象画面・操作・モーダルサイズ・テーマ色
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
│   │       ├── kintone-quick-side-view-plugin-hikaku.png # 「kintone一覧でレコードを閲覧・編集できるプラグイン比較」記事 OGP・サムネイル
│   │       └── kintone-lookup-plugin-hikaku.png         # 「kintoneルックアップを快適にするプラグイン比較」記事 OGP・サムネイル
│   ├── downloads/
│   │   ├── .gitkeep                                    # ディレクトリをGit管理するための空ファイル
│   │   ├── kw-conditional-numbering-v1.1.1.zip         # 条件分岐自動採番プラグイン配布ファイル（手動配置）
│   │   ├── kw-field-styler-v1.1.0.zip                  # フィールドスタイラープラグイン配布ファイル v1.1.0（旧版・互換のため残置）
│   │   ├── kw-field-styler-v1.2.0.zip                  # フィールドスタイラープラグイン配布ファイル v1.2.0（旧版・互換のため残置）
│   │   ├── kw-field-styler-v2.0.0.zip                  # フィールドスタイラープラグイン配布ファイル v2.0.0（最新・ダウンロードボタンの参照先）
│   │   ├── kw-form-deco-v1.0.1.zip                     # FormDecoプラグイン配布ファイル（手動配置）
│   │   ├── kw-lookup-suggest-v1.0.1.zip                # ルックアップサジェストプラグイン配布ファイル（手動配置）
│   │   ├── kw-quick-search-v1.0.0.zip                  # クイックサーチプラグイン配布ファイル（手動配置）
│   │   ├── kw-file-icon-marker-v1.0.1.zip              # 添付ファイルアイコン表示プラグイン配布ファイル（手動配置）
│   │   ├── kw-quick-side-view-v1.0.1.zip               # クイックサイドビュープラグイン配布ファイル（手動配置）
│   │   ├── kw-record-lock-v1.0.1.zip                   # レコードロックプラグイン配布ファイル（手動配置）
│   │   ├── kw-field-comment-v1.0.1.zip                 # フィールドコメントプラグイン配布ファイル（手動配置）
│   │   ├── kw-theme-styler-v1.0.1.zip                  # テーマスタイラー for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-address-assist-v1.0.1.zip                # 住所アシスト for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-quick-history-view-v1.0.1.zip            # クイック履歴ビュー for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-related-record-popup-v1.0.1.zip          # 関連レコードポップアップ表示 for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-summary-bar-v1.0.0.zip                    # 集計サマリーバー for kintone プラグイン配布ファイル（旧版）
│   │   ├── kw-summary-bar-v2.0.0.zip                    # 集計サマリーバー for kintone プラグイン配布ファイル（旧版・カードごとの絞り込み集計）
│   │   ├── kw-summary-bar-v2.1.0.zip                    # 集計サマリーバー for kintone プラグイン配布ファイル（最新版・相対期間/ユーザー組織グループ選択の絞り込み追加）
│   │   ├── kw-csv-export-v1.0.1.zip                     # かんたんCSV出力 for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-quick-tab-v1.0.1.zip                      # クイックタブ for kintone プラグイン配布ファイル（手動配置）
│   │   ├── kw-file-preview-v1.0.1.zip                   # 添付ファイルプレビュー for kintone プラグイン配布ファイル（手動配置）
│   │   └── kw-input-assist-v1.0.1.zip                   # 入力アシスト for kintone プラグイン配布ファイル（手動配置）
│   ├── libs/                   # プラグインが実行時にSRI付きで読み込む自社配信ライブラリ（第三者CDN不使用）。現状 kw-file-preview のみ使用
│   │   ├── README.md           # 収録ライブラリ・バージョン・ライセンス・更新手順
│   │   ├── pdfjs/3.11.174/     # PDF.js（pdf.min.js / pdf.worker.min.js）— PDF描画
│   │   ├── exceljs/4.4.0/      # ExcelJS（exceljs.min.js）— Excel読み込み・書式再現
│   │   ├── xlsx/0.18.5/        # SheetJS（xlsx.full.min.js）— Excel予備表示
│   │   ├── jszip/3.10.1/       # JSZip（jszip.min.js）— xlsx解析・グラフ抽出
│   │   ├── chartjs/4.4.1/      # Chart.js（chart.umd.min.js）— Excelグラフ再現描画
│   │   ├── docx-preview/0.3.5/ # docx-preview（docx-preview.min.js）— Word表示
│   │   └── mammoth/1.6.0/      # mammoth（mammoth.browser.min.js）— Word予備表示
│   ├── sitemap.xml             # 旧URL互換用sitemapindex（@astrojs/sitemap生成のsitemap-0.xmlを参照）
│   ├── tools/
│   │   ├── stamp-maker.html    # inkan（電子印鑑メーカー）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── natsuin.html        # Natsuin（PDF電子印鑑・署名ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── musubi.html         # Musubi（PDF結合・分割ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── KizunaTsumugi.html  # KIZUNA Tsumugi（QRコードジェネレーター）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── masuku.html         # Masuku（画像・PDFマスキングツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Shuku.html          # Shuku（画像変換・圧縮・リサイズツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Utsushi.html        # Utsushi（PDF→HTML変換ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Shirushi.html       # Shirushi（kintoneアプリアイコン作成ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   └── Obi.html            # Obi（kintoneカバー画像作成ツール）スタンドアロンHTMLアプリ（Astro管理外）
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
3. **`src/content/news/` にも `category: release` のお知らせエントリを追加**（同じコミットに含める）

**お知らせ（トピックス）を追加する場合：
1. `src/content/news/` に Markdown ファイルを作成（スラッグ = ファイル名、日付なし）
2. フロントマター: `title` / `description` / `pubDate` / `category`（`release` | `update` | `incident` | `notice`） / `externalUrl`（任意）
3. `externalUrl` を指定すると一覧から外部リンクへ飛ぶ（個別ページは生成されない）
4. `externalUrl` 未指定の場合は本文を Markdown で記述し、`/news/<slug>/` で個別ページが自動生成される
5. トップページの「お知らせ」セクションに最新 3 件が自動表示され、`/news/rss.xml` にも自動反映される

**新規プラグインを追加する場合：**
1. `src/pages/plugins/<プラグイン名>/index.astro` を作成
2. `src/pages/plugins/index.astro` のグリッドに追加
3. `src/pages/plugins/index.astro` の JSON-LD `ItemList` を更新
4. **`src/content/news/` に `category: release` のお知らせエントリを追加**（同じコミットに含める）

**既存プラグイン/ツール/拡張機能のバージョンアップ・機能追加を行う場合：**
1. 該当ページのバージョン表記・dateModified・配布 ZIP を更新
2. **`src/content/news/` に `category: update` のお知らせエントリを追加**（同じコミットに含める）

**新規ツールを追加する場合：**
1. `src/pages/tools/index.astro` のグリッドに追加
2. `src/pages/tools/index.astro` の JSON-LD `ItemList` を更新
3. **`src/content/news/` に `category: release` のお知らせエントリを追加**（同じコミットに含める）

**新規 Chrome 拡張機能を追加する場合：**
1. 拡張機能本体は `SECRET\Chrome_extension_workspace\<拡張機能名>\` 内で開発
2. リリース ZIP は `SECRET\Chrome_extension_release\<拡張機能名>-v<バージョン>.zip` に配置
3. `src/pages/extensions/<拡張機能名>/index.astro` を作成（ランディングページ）
4. `src/pages/extensions/<拡張機能名>/privacy/index.astro` を作成（プライバシーポリシー・**Chrome Web Store 公開には必須**）
5. `src/pages/extensions/index.astro` のグリッドと JSON-LD `ItemList` を更新
6. Chrome Web Store の `homepage_url` に上記ランディングページ URL を指定
7. **`src/content/news/` に `category: release` のお知らせエントリを追加**（同じコミットに含める）
