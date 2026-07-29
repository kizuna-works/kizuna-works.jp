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
│   │   ├── TrialForm.astro     # プレミアム無料体験の申込フォーム（会社名/メール/ドメインのみ・planType='trial' でGASへ送信）
│   │   ├── TrialBanner.astro   # プレミアム無料体験LPへの誘導バナー（サポーターページ・プラグイン一覧で使用）
│   │   ├── SecurityBox.astro   # プラグイン詳細ページの「安心ボックス」（外部通信・ライブラリ・秘匿情報を要約。plugin-security.ts 駆動）
│   │   └── ShareButtons.astro  # SNS共有ボタン（X/LINE/はてブは静的intentリンク・URLコピー/OS共有シートのみJS）。全プラグイン個別ページ末尾に設置。title="〇〇 for kintone"・URLはAstro.urlから自動導出
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
│   │   │   ├── premium-trial/
│   │   │   │   └── index.astro # プレミアム年間サポーター 30日間無料体験 LP（/plugins/premium-trial/）― 全プラグイン（ちょこっと＋プレミアム）が広告なし・全機能。カード不要・自動課金なし。TrialForm＋FAQPage JSON-LD。hero背景=premium-trial-bg.webp。件数はplugins.tsから動的
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
│   │   │   │   └── index.astro # 添付ファイルプレビュープラグイン製品ページ（/plugins/file-preview/）— 添付の画像/PDF/Excel/Word/PowerPoint/テキストを一覧・詳細のファイル名クリックで全画面モーダル表示・送りナビ・Excel書式/グラフ再現・文字コード自動判定。PowerPoint(pptx)対応(v2.2.0)。表示ライブラリは自社配信(/libs/)からSRI付き遅延読込
│   │   │   ├── quick-toc/
│   │   │   │   └── index.astro # クイック目次プラグイン製品ページ（/plugins/quick-toc/）— レコード詳細/編集/新規の左側にセクション目次を常時表示・項目クリックで該当セクションへジャンプ・ステータスバッジ（DropDown/Radio/プロセス管理）・配色3モード・ヘッダー追従・kintone完結（スクショはクリックで拡大オーバーレイ）
│   │   │   ├── list-styler/
│   │   │   │   └── index.astro # 一覧スタイラープラグイン製品ページ（/plugins/list-styler/）— 一覧の左端列固定（0〜3）＋基本行スタイル（ゼブラ2色/単色/文字色）＋行ホバー＋行番号＋条件付き行スタイル（背景/文字色/太字・日付TODAY/選択肢/ステータス・優先ドラッグ）＋行クリックで詳細を開く・設定セット方式・kintone完結。旧 kw-fixed-columns（列固定ビュー）から改称
│   │   │   ├── input-assist/
│   │   │   │   └── index.astro # 入力アシストプラグイン製品ページ（/plugins/input-assist/）— 新規作成/編集で入力順ガイド（待機/現在地/入力済みを色分け・値が入ると次へ自動前進・ラベル横にタグ・自動スクロール/フォーカス）＋未入力チェック（保存は止めず保存時に確認・詳細画面でも未入力表示）＋入力中の重複チェック（「値の重複を禁止する」フィールドを自動対象）。配色はガイド/未入力チェックで別プリセット・kintone完結
│   │   │   ├── conditional-form/
│   │   │   │   └── index.astro # 条件分岐フォームプラグイン製品ページ（/plugins/conditional-form/）— 区分・ステータス・入力値などの条件（最大5件・AND/OR）でフィールド/グループを表示/非表示・必須化・読み取り専用・値の自動セット（TODAY対応）・選択肢の絞り込みに切替。1ルール複数動作＋優先順位ドラッグ＋安全則（非表示＞読取＞必須）＋ハイライト/必須バッジ・新規/編集/詳細をルール単位で指定・kintone完結。v2.1.0＝「が次のいずれかに一致する／いずれにも一致しない」で複数値を条件1行指定・恒真/矛盾条件の警告＋保存ブロック・設定画面のルール折りたたみ（UPDATEボックス）
│   │   │   ├── sheet-edit/
│   │   │   │   └── index.astro # シート編集プラグイン製品ページ（/plugins/sheet-edit/）— レコード一覧（カスタマイズビュー）を表計算風グリッドに置換し表示中フィールドをその場編集。v1.1.0でサブテーブル（明細）の行展開・行ごと編集に対応（明細外セルは結合/空欄を選択）。型別セル編集／保存3経路（自動=行コミット・ボタン・Ctrl+S）／単一セルコピペ・範囲一括編集・縦オートフィル／Undo・Redo（操作グループ単位）／revision競合検知＋行×セル失敗ハイライト／シートタブ式ページネーション（カーソルAPIで1万件超）／型別フィルタ（選択肢複数チェック・数値範囲・部分一致）＋複数列AND・並べ替え／カラー・タブ形状カスタム／Excel出力（表示列そのまま・絞り込み後全件・SheetJS同梱）・kintone完結。v1.4.0で組織/ユーザー/グループ選択の絞り込みを名前検索・複数選択の選択式に＋設定セットの複製・アコーディオン表示を追加
│   │   │   ├── sticky-board/
│   │   │   │   └── index.astro # 付箋ボードプラグイン製品ページ（/plugins/sticky-board/）— レコード詳細にカテゴリ付き付箋をクリックで自由配置（移動/リサイズ/本文編集・タイトル濃色/本文薄色・パステル10色＋カスタム）＋一覧上部に公開/個人で分けた未対応件数バー＋カード展開（レコードへ別タブ・対応済み/未対応に戻す・作成者/対応者と日時）。個人付箋はレコードACLで作成者のみ秘匿。対応済みの自動削除（既定30日・公開は全員ぶん）。保管アプリを設定画面からワンクリック自動生成。スクショはライトボックスで拡大・kintone完結
│   │   │   ├── comment-control/
│   │   │   │   └── index.astro # コメントコントロールプラグイン製品ページ（/plugins/comment-control/）— 詳細・編集でコメント／変更履歴サイドバーを閉じた状態で開く（常に閉じる／条件付き開閉＝コメントあり・自分宛のみ・チラつき防止）。一覧はkintone標準のコメント件数バッジにホバーで新しい順ツールチップ全文表示（10件超はページ送り・自分宛行ハイライト・アイコン右側表示）。コメント取得はホバー時のみでAPIを節約（v1.0.2）、自分宛メンションの一覧色分けは任意オプション（初期オフ・コメント有り行のみ最大20件取得）。自分宛アクセント色プリセット8色＋ピック・ツールチップ配色テーマ（ダーク/ライト/ネイビー/カスタム）。スクショはライトボックスで拡大・kintone完結
│   │   │   ├── mail-assist/
│   │   │   │   └── index.astro # メールアシストプラグイン製品ページ（/plugins/mail-assist/）— レコード値を差し込んで件名・本文・宛先を組み立て、ワンクリックでメーラー（既定メーラー/Gmail/Outlook（個人・法人 Microsoft 365）/Yahoo!）を起動。詳細＝個別／一覧＝絞り込み結果をBCC一斉（最大宛先件数で分割）。宛先は文字列/リンク/ユーザー選択＋直接入力。テンプレごとの表示・送信条件（最大5件AND/OR）で出し分け、メーラーは都度選択/管理者固定。送信履歴を保管アプリに記録＋詳細画面表示。テンプレ・履歴の保管アプリを同一スペースに自動生成。実送信はメーラー委譲で外部サーバー不要・kintone完結。スクショはライトボックスで拡大
│   │   │   ├── user-autofill/
│   │   │   │   └── index.astro # ユーザーオートフィルプラグイン製品ページ（/plugins/user-autofill/）— ユーザー選択で選んだ人（新規時は自分）の組織・グループ・役職・メール・社員番号等を対応フィールドへ自動転記（組織/グループは選択値セット・除外グループ・上書きポリシー）。＋ユーザー情報をスペースに表示＝プロフィールカード（フィールドごと複数・画像/所属親階層/配色/フォント/形状）と捺印モード（申請者・承認者等のフィールド名を横並び＋姓を朱印の決裁欄・漢字縦書き）。転記と表示は2タブで独立。取得はJS API優先でkintone完結。スクショはライトボックスで拡大
│   │   │   ├── bulk-update/
│   │   │   │   └── index.astro # かんたん一括更新プラグイン製品ページ（/plugins/bulk-update/）— 標準の一覧で絞り込んだ結果にフィールド1つを選んで値を一括更新・一括クリア。数値は値の設定/加算/減算、クイックサーチ連動・カーソル方式で1万件超対応。実行前に対象件数表示・実行直後のUndo（1回）＋変更前後を保管アプリに記録し設定画面の履歴一覧から実行前の値へ一括復元（上書き/削除スキップ・レコードごとの変更前→後表示）。実行権限（全員/管理者/指定）・確認文言・ボタンの形/アイコン/色（プリセット＋カスタム・ライブプレビュー）。プロセス管理ステータス/サブテーブル/モバイル/ゲストは非対応。候補取得のみcybozu.com共通管理API（自ドメイン内）・kintone完結。スクショはライトボックスで拡大
│   │   │   ├── status-bulk-action/
│   │   │   │   └── index.astro # ステータス一括実行プラグイン製品ページ（/plugins/status-bulk-action/）— プロセス管理のステータス・作業者を標準の一覧からまとめて一括実行。対象を現在ステータスごとにグループ分けしてアクション選択→カーソル取得＋PUT records/status 100件バッチ（件数上限なし）。次の作業者は遷移先設定で自動判定（選択:候補限定／全員・うち一人:指定不要／作成者・フィールド指定:レコード別自動）。独自条件（型別・最大5件・AND/OR・サブテーブル集計）で対象外を除外し理由表示。滞留日数を一覧に色で可視化（起算フィールド自動追加）。ボタン表示条件/見た目/実行権限。モバイルは一括実行対応（列注入はPCのみ）。スクショはライトボックスで拡大。候補取得のみcybozu.com共通管理API（自ドメイン内）・kintone完結・ゲスト対応
│   │   │   ├── read-check/
│   │   │   │   └── index.astro # 既読チェックプラグイン製品ページ（/plugins/read-check/）— レコード詳細画面を開いた人を自動で既読記録し、右サイドバーの「既読」タブ（コメント・変更履歴の並び）から誰が・いつ・何回読んだかを一覧表示。編集回数・最終編集日時は既読と別集計（詳細=既読/編集画面の表示・保存・キャンセルは既読に非カウント）。既読ログはレコード本体を汚さず同一スペースに自動生成する保管アプリ「既読チェック管理」へ分離、レコードACLで閲覧=全員/編集・削除=管理者。ヒーロー＋課題＋Before/After(既読表示前後の2枚)＋できること＋設定画面1枚＋既読/編集カウント仕様＋手順＋料金(基本無料/年間¥3,300)＋FAQ＋SecurityBox＋ShareButtons。基本無料・kintone完結・ゲスト対応・PC版のみ（モバイル非対応）
│   │   │   ├── record-recovery/
│   │   │   │   └── index.astro # 削除レコード復元プラグイン製品ページ（/plugins/record-recovery/）— 削除したレコードを内容（添付ファイル含む）ごと元に戻せる。削除直前に保管アプリへ自動バックアップし、削除の成否に連動する二段階コミット（pending→confirmed）で不整合防止。一覧の「削除履歴」ボタン／設定画面の履歴タブからワンクリック復元（新規レコードとして再作成）。保管アプリはスペース内でワンクリック自動生成・複数アプリ共有、レコードACLで管理者=全件/一般=自分の削除分のみ、保持期間/件数で自動整理。ヒーロー＋課題＋復元フロー(一覧ボタン/復元モーダル)＋できること＋設定画面2枚＋復元時の注意(モバイル非保護・巨大レコードは削除中止の警告ボックス)＋手順＋料金(基本無料/年間¥3,300)＋FAQ＋SecurityBox＋ShareButtons。基本無料・kintone完結・ゲスト対応・PC版のみ
│   │   │   ├── elapsed-assist/
│   │   │   │   └── index.astro # 経過計算アシストプラグイン製品ページ（/plugins/elapsed-assist/）— 基準日フィールドから経過日数/月数/年数・年齢・期間「◯年◯ヶ月」・残日数・次回記念日までの日数・稼働日ベース・学年の9パターンを自動計算。一覧・詳細を開くたびに「今日」で再計算表示（追加API通信なし）、保存時に実フィールドへ書込（並び替え/絞り込み/集計に利用可）。カウント停止条件（フィールド値/日付有無/ステータス・最大5件AND/OR）で値を固定、一覧の一括再計算ボタンで既存レコードを一斉更新。出力先は数値/文字列でパターン別に絞込。kintone完結・カスタマイズビュー/モバイル/サブテーブル非対応。スクショはライトボックスで拡大
│   │   │   ├── accordion-tab/
│   │   │   │   └── index.astro # アコーディオンタブプラグイン製品ページ（/plugins/accordion-tab/）— 縦に長いレコードフォームを、フォームのスペース要素を見出しに自動でセクション分割しアコーディオン開閉。フィールド割当不要・詳細/作成/編集画面対応。既定は折りたたみで全体像把握→必要な節だけ開いて入力。見出しに未入力必須項目数バッジ・入力状況（入力済み/全項目）バッジを表示（両方同時可・リアルタイム更新）。すべて開く/閉じる、1つだけ開くシングルモード、スティッキー見出し、スライド開閉、開閉状態の記憶、見出しの形16種類/配色/間隔カスタマイズ。バッジ算出のフォーム情報読み取りは自ドメイン内のみ・kintone完結。スクショはライトボックスで拡大
│   │   │   ├── report-designer/
│   │   │   │   └── index.astro # 【プレミアムプラグイン】帳票デザイナー製品ページ（/plugins/report-designer/）— 手持ちPDFを背景に kintone データ（フィールド/固定テキスト/画像（ロゴ・印影）/サブテーブル明細）をドラッグ配置して帳票化。自動繰り返し＋自動改ページ＋要素ごとの表示ページ／日付自動入力・表示条件・PDF保存先・集計表紙／1件印刷＋一覧まとめ印刷（最大100件）＋PDF自動保存。設定ガイドをアコーディオン組込。単品販売なし＝プレミアム年間サポーターに含む（CTAは /plugins/supporter/?plan=all）。kintone完結
│   │   │   ├── dashboard/
│   │   │   │   ├── index.astro # 【プレミアムプラグイン】ダッシュボード製品ページ（/plugins/dashboard/）— グラフ/数値カード/クロス集計表を1枚に集約し一覧のカスタマイズビューに常設の集計ダッシュボードを描画。期間連動再集計・ドリルダウン・配色・ライブプレビュー／有償＝アプリ横断集計・ポータルiframe埋め込み・集計キャッシュ。設定レシピ集への導線あり。単品販売なし＝プレミアム年間サポーターに含む。kintone完結（グラフはChart.js自社配信/SRI）
│   │   │   │   └── recipes/
│   │   │   │       └── index.astro # ダッシュボード設定レシピ集（/plugins/dashboard/recipes/）— ウィジェット種別ごとに「目的→設定手順→完成イメージ」を掲載。アコーディオン＋種別/目的タグ/検索フィルタ。データは src/data/recipes.ts、画像は /images/dashboard/recipes/。第1バッチ22レシピ（順次拡張）
│   │   │   ├── attribute-filter/
│   │   │   │   └── index.astro # 【プレミアムプラグイン】属性制御フィルター製品ページ（/plugins/attribute-filter/）— ユーザー/組織/グループ選択の候補を役職・所属・他フィールド値・ステータスで自動絞り込み。標準表示 vs 絞り込みのBefore/After、設定画面（組織/ユーザー/グループ条件）スクショ、主な機能、無料/プレミアム比較、インストール手順、SecurityBox。単品販売なし＝プレミアム年間サポーターに含む（CTAは /plugins/supporter/?plan=all）。スクショはライトボックスで拡大。kintone完結・ゲスト対応
│   │   │   ├── card-board/
│   │   │   │   └── index.astro # 【プレミアムプラグイン】カードボード製品ページ（/plugins/card-board/）— 一覧を「状態カード＋詳細カード」の2段カンバンに切替＝D&Dでステータス/選択肢/文字列を変更・状態別の件数/集計を俯瞰・連動(カンバン)/個別(ギャラリー)モード・添付サムネ・レーン区切り線・初期に開く状態・絞り込み/並び順を反映。ヒーロー＋実画面(営業/不動産/カタログ)＋2モード＋主な機能＋設定画面＋無料/プレミアム比較(無料1ビュー)＋手順＋FAQ＋SecurityBox＋ShareButtons。単品販売なし＝プレミアム年間サポーターに含む（CTAは /plugins/supporter/?plan=all）。kintone完結
│   │   │   ├── related-enhancer/
│   │   │   │   └── index.astro # 【プレミアムプラグイン】関連レコード拡張製品ページ（/plugins/related-enhancer/）— レコード詳細の関連レコード一覧をカーソルAPI全件取得で集計（合計/平均/件数・条件AND/OR・複数並列・閾値色分け）＋非表示フィールド集計/サブテーブル展開集計/集計結果の書き込み保存＋見た目（ゼブラ/列幅クリップ/列表示非表示/ヘッダー色）＋検索/ソート/列フィルタ＋横断ボード。無料/プレミアム比較（無料1対象・F-04/05/06はプレミアム限定）、インストール手順、FAQ、SecurityBox。単品販売なし＝プレミアム年間サポーターに含む（CTAは /plugins/supporter/?plan=all）。モバイルは集計カード閲覧のみ。kintone完結
│   │   │   ├── lookup-sync/
│   │   │   │   └── index.astro # 【プレミアムプラグイン】ルックアップ自動同期製品ページ（/plugins/lookup-sync/）— マスター更新で参照先アプリのルックアップコピー値を自動追従更新。マスター→参照先の連動（商品マスター/在庫管理）、主な機能（スキャン自動検出・サブテーブル対応・自動/手動モード・今すぐ全件同期・キー変更追従）、無料/プレミアム比較、インストール手順、SecurityBox。単品販売なし＝プレミアム年間サポーターに含む（CTAは /plugins/supporter/?plan=all）。スクショはライトボックスで拡大。kintone完結・ゲスト対応。v2.0.2＝重複しうるキー（重複禁止なし）対応：標準ルックアップの弱点解説＋比較表、3方式（推奨=一意キー化／方式1=表示のみ／方式2=デタッチ自動同期・同名でもレコード番号で照合・入力補完PC/モバイル）、方式2導入手順4ステップ、FAQ14問
│   │   │   ├── excel-paste/
│   │   │   │   └── index.astro # エクセル一括貼り付け製品ページ（/plugins/excel-paste/）— Excel等の表データを貼り付けて一括入力。モードA=作成/編集の対象サブテーブルにCtrl+Vで複数行流し込み（既存行 追加/置換）、モードB=一覧「貼り付けで新規作成」ボタンから複数レコードを一括作成（POST/records・最大件数/実行権限・ボタン形色・既定オフ）。貼付前プレビュー＋列⇄フィールド手動マッピング＋見出し行の自動マッピング、型変換/エラー検出（数値/実在日/選択肢）、重複行のみ失敗・必須未割当警告・空セルは空欄。スクショはライトボックスで拡大。CSV不要・kintone完結・ゲスト対応。【v1.1.0】複数サブテーブル対応（テーブルごとにカードで設定・貼付先を自動判別）のUPDATEボックス＋設定スクショ（excel-paste-config-multi）を掲載
│   │   │   └── ambiguous-match/
│   │   │       └── index.astro # あいまい照合製品ページ（/plugins/ambiguous-match/）— 会社名等の入力中に表記ゆれ（法人格 株式会社⇔㈱⇔（株）・全角半角・大文字小文字・記号・かな・長音・旧字体異体字・小書きヶ）を吸収して類似する既存レコードをフィールド直下にフローティング表示。標準の「値の重複を禁止する」（完全一致）では気づけない二重登録を保存前に確認。正規化ルールはフィールドごと自由選択、類似度しきい値、2文字部分一致、参照フィールド併記、候補クリックで別タブ、重複禁止未設定フィールドに併用推奨アラート。保存はブロックせず候補提示のみ。スクショはライトボックスで拡大。kintone完結・ゲスト対応
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
│   │       ├── conditional-numbering-plugin.md      # 「条件分岐自動採番プラグインの機能と設定ガイド」記事（frontmatter `noindex: true`＝導入済ユーザー向けマニュアルのため検索インデックス対象外・sitemapからも除外）
│   │       ├── kintone-2026-update.md               # 「2026年最新版 kintoneの注目アップデート＆AI活用術」記事
│   │       ├── kintone-cyouhyou-plugin-hikaku.md    # 「kintone帳票出力プラグイン徹底比較」記事
│   │       ├── kintone-cyouhyou-sonomama.md         # 「kintoneの帳票を今の書式のまま出力する方法」記事（背景PDF方式の帳票化how-to）
│   │       ├── kintone-2026-04-update.md            # 「2026年4月最新 kintoneアップデート総まとめ」記事
│   │       ├── kintone-design-plugin-osusume.md     # 「kintone デザイン変更プラグイン特集」記事
│   │       ├── kintone-muryou-plugin-osusume.md     # 「kintone無料プラグイン特集｜おすすめと選び方をカテゴリ別に解説」記事（5カテゴリ別・無料他社比較・クリック目次）
│   │       ├── kintone-category.md                  # 「kintoneカテゴリー機能｜設定・使い方と絞り込み・選択肢との違い」記事（実機スクショ3枚・比較表）
│   │       ├── kintone-kensaku-plugin-hikaku.md     # 「kintoneの検索・絞り込みを改善するプラグイン比較【2026年版】」記事
│   │       ├── kintone-quick-side-view-plugin-hikaku.md # 「kintone一覧でレコードを閲覧・編集できるプラグイン比較」記事
│   │       ├── kintone-lookup-plugin-hikaku.md      # 「【2026年最新】kintoneルックアップを快適にするプラグイン比較」記事（入力サジェスト/自動取得/先更新/編集絞り込みの4アプローチ比較）
│   │       ├── kintone-backup.md                    # 「kintoneのバックアップはどうする？標準の限界とプラグイン・サービス比較」記事（標準/kBackup/削除レコード復元・図解4＋実機/プラグインスクショ・Gemini製ヒーローバナー kintone-backup.png）
│   │       └── kintone-henkou-rireki.md             # 「kintone変更履歴完全ガイド｜確認方法・監査ログとの違い・「誰が見たか」の残し方」記事（変更履歴/ステータスの履歴/監査ログの3種類・欠番・保存期間・非表示・CSV不可・既読チェック紹介／図解 kintone-rireki-3types.svg・Gemini製ヒーローバナー kintone-henkou-rireki.png）
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
│   │   ├── lookup-suggest-subtable-01.png  # ルックアップサジェスト v2.0.0 — 見積明細サブテーブルで商品コード一部「BP」入力→フローティング候補表示
│   │   ├── lookup-suggest-subtable-02.png  # ルックアップサジェスト v2.0.0 — 候補選択でその行に商品名・規格・単価が自動コピー（取得完了）＋次行でメーカー名「三菱」検索
│   │   ├── lookup-suggest-subtable-03.png  # ルックアップサジェスト v2.0.0 — メーカー名「コクヨ」で横断検索しコクヨ製5商品を候補表示（コード不要）
│   │   ├── lookup-suggest-mobile-01.png    # ルックアップサジェスト v2.1.0 — モバイル追加画面で「株式」入力→会社名・住所・業種付きの候補一覧（webp併置）
│   │   ├── lookup-suggest-mobile-01.webp   # 同上 WebP 版（<picture> の source 用）
│   │   ├── lookup-suggest-mobile-02.png    # ルックアップサジェスト v2.1.0 — モバイルで住所の一部「日本橋」から該当社を横断検索（webp併置）
│   │   ├── lookup-suggest-mobile-02.webp   # 同上 WebP 版（<picture> の source 用）
│   │   ├── lookup-suggest-mobile-03.png    # ルックアップサジェスト v2.1.0 — モバイルで候補タップ後、顧客名＋コピー先の顧客No.が自動入力された状態（webp併置）
│   │   ├── lookup-suggest-mobile-03.webp   # 同上 WebP 版（<picture> の source 用）
│   │   ├── quick-search-icon.png           # クイックサーチプラグイン アイコン（200×200）
│   │   ├── quick-search-banner.png         # クイックサーチプラグイン バナー（1200×675・OGP/グリッド共用）
│   │   ├── quick-search-action-01.png      # クイックサーチプラグイン 動作画面スクショ① — 検索バー全景（プレースホルダー表示）
│   │   ├── quick-search-action-02.png      # クイックサーチプラグイン 動作画面スクショ② — AND モードで複数キーワード検索
│   │   ├── quick-search-action-03.png      # クイックサーチプラグイン 動作画面スクショ③ — OR モードで横断検索
│   │   ├── quick-search-config-01.png      # クイックサーチプラグイン 設定画面スクショ① — 検索対象フィールドのチップ式選択
│   │   ├── quick-search-config-02.png      # クイックサーチプラグイン 設定画面スクショ② — 表示ビュー・プレースホルダー設定
│   │   ├── quick-search-config-03.png      # クイックサーチプラグイン 設定画面スクショ③ — ボタンカラー設定 + プレビュー
│   │   ├── quick-search-period-filter.png  # クイックサーチ v1.2.0 スクショ — 一覧の「期間▾」ドロップダウン（対象フィールド選択＋プリセット＋範囲指定・製品ページUPDATEボックス用）
│   │   ├── quick-search-period-config.png  # クイックサーチ v1.2.0 スクショ — 設定画面の期間フィルタ設定（製品ページUPDATEボックス用）
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
│   │   ├── field-comment-config-01.png     # フィールドコメントプラグイン 設定画面スクショ①（v1.1.0）— 背景色/文字色/アイコンの色をカラーピッカー＋#カラーコード入力で指定、プリセット6種、10種アイコンギャラリー（情報/ヘルプ/注意/警告/ヒント/コメント/確認/重要/ピン/ブックマーク）
│   │   ├── read-check-icon.png             # 既読チェック for kintone プラグイン アイコン（ヒーロー画像用・200×200）
│   │   ├── read-check-banner.png/.webp     # 既読チェック for kintone バナー（1200×630・OGP/グリッド共用）※ユーザー用意
│   │   ├── read-check-before.png/.webp     # 既読チェック スクショ Before — サイドバーはコメント・変更履歴のみで既読不明
│   │   ├── read-check-after.png/.webp      # 既読チェック スクショ After — 「既読」タブに既読者一覧（氏名/初回/最終/既読回数/編集回数）
│   │   ├── read-check-config-01.png/.webp  # 既読チェック 設定画面スクショ — 保管アプリ自動作成＋既読ログ管理者
│   │   ├── record-recovery-icon.png        # 削除レコード復元 for kintone プラグイン アイコン（ヒーロー画像用）
│   │   ├── record-recovery-banner.png      # 削除レコード復元 for kintone バナー（1200×630・OGP/グリッド共用）※ユーザー用意
│   │   ├── record-recovery-list.png        # 削除レコード復元 スクショ — 一覧画面ツールバーの「削除履歴」ボタン＋顧客リスト
│   │   ├── record-recovery-modal.png       # 削除レコード復元 スクショ — 復元モーダル（削除済みレコード一覧・プレビュー項目・添付件数・復元ボタン）
│   │   ├── record-recovery-config-01.png   # 削除レコード復元 設定画面スクショ① — 保管アプリ自動作成・作成済み状態・バックアップ管理者
│   │   ├── record-recovery-config-02.png   # 削除レコード復元 設定画面スクショ② — 削除履歴ボタン表示・許可対象・色/大きさ/配置
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
│   │   ├── address-assist-subtable-01.png  # 住所アシスト v1.1.0 スクショ — 配送先管理アプリの編集画面でサブテーブル各行の郵便番号→住所が自動入力された状態（製品ページ UPDATEボックス用）
│   │   ├── address-assist-subtable-02.png  # 住所アシスト v1.1.0 スクショ — 設定画面で「対象」にサブテーブルを選択した状態（製品ページ UPDATEボックス用）
│   │   ├── sheet-edit-subtable-merge.png   # シート編集 v1.1.0 スクショ — サブテーブル行展開グリッド（明細外セルを縦結合する結合モード・製品ページ UPDATEボックス用）
│   │   ├── sheet-edit-subtable-blank.png   # シート編集 v1.1.0 スクショ — サブテーブル行展開グリッド（明細外セルを先頭行のみ表示する空欄モード・製品ページ UPDATEボックス用）
│   │   ├── sheet-edit-config-04.png        # シート編集 v1.2.1 スクショ — 設定画面「レコード番号クリックで詳細を開く」トグル（製品ページ UPDATEボックス用）
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
│   │   ├── csv-export-config-05.png        # かんたんCSV出力 設定画面スクショ⑤ — 絞り込み条件（v1.1.0・受注予定日=今月／確度=100%・80%のAND・日付の相対期間）
│   │   ├── csv-export-config-06.png/.webp  # かんたんCSV出力 設定画面スクショ⑥ — サブテーブル明細の行展開設定（v1.2.0・明細列＋親列・明細展開オプション・必須の先頭区切り記号「*」）
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
│   │   ├── card-board-banner.png           # カードボード for kintone 見出しバナー（OGP/グリッド/製品ページ共用・1200×630）
│   │   ├── card-board-icon.png             # カードボード for kintone アイコン（200×200・ヒーロー用）
│   │   ├── card-board-{board,dnd,realestate,catalog,individual,lanegrid}.png / .webp # カードボード製品ページ用スクショ（実機・PNG＋WebP。individual=不動産の個別モードギャラリー）
│   │   ├── card-board-config-{1,2,3,4}.png / .webp # カードボード設定画面スクショ（①基本設定/②状態カード/③詳細カード/④カラーのタブ別・実機・PNG＋WebP）
│   │   ├── related-enhancer-banner.png     # 関連レコード拡張 for kintone 見出しバナー（OGP/グリッド/製品ページ共用・1200×630）
│   │   ├── report-designer-banner.png      # 帳票デザイナー for kintone 見出しバナー（OGP/グリッド/製品ページ共用）
│   │   ├── report-designer-icon.png        # 帳票デザイナー for kintone アイコン
│   │   ├── report-designer-output-01.png   # 帳票デザイナー 出力例① 見積書（ダミーデータ・ヒーロー/完成イメージ）
│   │   ├── report-designer-output-02.png   # 帳票デザイナー 出力例② 請求書（ダミーデータ）
│   │   ├── report-designer-config-01.png   # 帳票デザイナー 設定画面全体（STEP1〜4）
│   │   ├── report-designer-config-02.png   # 帳票デザイナー テンプレート編集画面（背景PDFに項目配置）
│   │   ├── report-designer-action-01.png   # 帳票デザイナー 動作① レコード詳細の帳票バー（1件印刷）
│   │   ├── report-designer-action-02.png   # 帳票デザイナー 動作② レコード一覧のまとめ印刷バー
│   │   ├── user-autofill-banner.png        # ユーザーオートフィル for kintone 見出しバナー（OGP/グリッド/news共用・1200×630）
│   │   ├── user-autofill-icon.png          # ユーザーオートフィル for kintone アイコン（200×200・ヒーロー用）
│   │   ├── user-autofill-org-transcription.png # ユーザーオートフィル 機能スクショ（申請者→申請部署/役職/社員番号の自動転記）
│   │   ├── user-autofill-profile-card.png  # ユーザーオートフィル 機能スクショ（プロフィールカード）
│   │   ├── user-autofill-stamp.png         # ユーザーオートフィル 機能スクショ（捺印モード＝承認欄の決裁欄）
│   │   ├── user-autofill-config-01.png ～ -config-04.png # ユーザーオートフィル 設定画面スクショ（①基本設定/②転記マッピング/③カード/④捺印）
│   │   ├── dashboard-banner.png            # ダッシュボード for kintone 見出しバナー（OGP/グリッド共用・1200×630）
│   │   ├── dashboard-icon.png              # ダッシュボード for kintone アイコン
│   │   ├── dashboard-overview.png/.webp    # ダッシュボード 完成イメージ①（成績ダッシュボードの全景・製品ページ）
│   │   ├── dashboard-overview-yojitsu.png/.webp # ダッシュボード 完成イメージ②（アプリ横断集計＝予実管理ダッシュボードの全景・製品ページ）
│   │   ├── dashboard-portal-layout.png/.webp # ダッシュボード v1.1.0 ポータルレイアウト構成画面（製品ページUPDATEボックス・お知らせOGP・1100×634）
│   │   ├── dashboard/recipes/<id>.png/.webp # ダッシュボード設定レシピ集の完成イメージ（種別ごと・第1バッチ22対）
│   │   ├── attribute-filter-banner.png      # 属性制御フィルター for kintone 見出しバナー（OGP/グリッド共用・1200×630）
│   │   ├── attribute-filter-icon.png        # 属性制御フィルター for kintone アイコン（hero・200×200）
│   │   ├── attribute-filter-before-user.png/.webp # Before：標準ユーザー選択で全員が候補に出る（製品ページBefore/After）
│   │   ├── attribute-filter-after-user.png/.webp  # After：役職「課長」に絞り込まれた候補（製品ページBefore/After）
│   │   ├── attribute-filter-before-org.png/.webp  # Before：標準の組織選択ダイアログ（全組織）
│   │   ├── attribute-filter-after-org.png/.webp   # After：申請種別で申請先組織がシステム開発部だけに絞られる
│   │   ├── attribute-filter-config-org.png/.webp  # 設定画面：組織条件（親子ツリー＋申請種別条件）
│   │   ├── attribute-filter-config-user.png/.webp # 設定画面：ユーザー条件（指定した役職＝課長）
│   │   ├── attribute-filter-config-group.png/.webp # 設定画面：グループ条件（指定したグループ）
│   │   ├── lookup-sync-banner.png/.webp      # ルックアップ自動同期 for kintone 見出しバナー（OGP/グリッド共用・1200×630）
│   │   ├── lookup-sync-icon.png              # ルックアップ自動同期 for kintone アイコン（hero・200×200）
│   │   ├── lookup-sync-master.png/.webp      # マスター（商品マスター一覧・120件）製品ページ「マスター→参照先」①
│   │   ├── lookup-sync-inventory.png/.webp   # 参照先（在庫管理一覧・600件・コピー値が自動最新）製品ページ「マスター→参照先」②
│   │   ├── lookup-sync-config.png/.webp      # 設定画面：スキャン検出＋2対象（在庫管理/発注管理サブテーブル）＋コピー項目＋同期モード
│   │   ├── lookup-sync-subtable.png/.webp    # 発注管理レコード詳細：明細サブテーブルのルックアップコピー値
│   │   ├── lookup-sync-popup.png/.webp       # 同期の確認ポップアップ（自動＝完了5件／手動＝待機中）
│   │   ├── lookup-sync-v2-dialog.png/.webp       # v2.0.2：同名候補ダイアログ（非一意キーで1件に定まらない＝標準ルックアップの弱点）
│   │   ├── lookup-sync-v2-method-select.png/.webp # v2.0.2：方式選択（推奨=一意キー化／方式1=表示のみ／方式2=デタッチ自動同期）
│   │   ├── lookup-sync-v2-method2-config.png/.webp # v2.0.2：方式2の設定（マスター→参照先マッピング＋自動デタッチ＆照合キー）
│   │   ├── lookup-sync-v2-method2-autofill.png/.webp # v2.0.2：方式2の入力補完（同名から選んだ1件で型番・単価を自動補完）
│   │   ├── lookup-sync-v2-method1-popup.png/.webp # v2.0.2：方式1の更新通知ポップアップ（詳細画面・保存済み値のまま）
│   │   ├── lookup-sync-v2-detach-done.png/.webp   # v2.0.2：方式2 導入手順の「設定済み」状態（照合キー＝レコード番号）
│   │   ├── field-styler-icon.png           # フィールドスタイラープラグイン アイコン（200×200・56×56から拡大）
│   │   ├── field-styler-before.png         # フィールドスタイラー 導入前スクリーンショット
│   │   ├── field-styler-after.png          # フィールドスタイラー 導入後スクリーンショット
│   │   ├── field-styler-subtable-01.png    # フィールドスタイラー v2.2.0 — 受注明細サブテーブルを条件で色分け（ステータス別・期限切れ・高額行強調）
│   │   ├── field-styler-subtable-02.png    # フィールドスタイラー v2.2.0 — サブテーブル列の条件付き設定画面（ノーコード）
│   │   ├── field-styler-conditional-color.png # フィールドスタイラー v2.3.0 — 条件付きスタイルの背景色・文字色「変更しない」トグル設定画面
│   │   ├── field-styler-bg.png / field-styler-bg.webp # フィールドスタイラーページ 背景
│   │   ├── field-styler-config-list.png    # フィールドスタイラー 設定一覧画面
│   │   ├── field-styler-config-detail.png  # フィールドスタイラー 設定詳細画面
│   │   └── blog/                           # ブログ記事用画像
│   │       ├── kintone-teichaku-shinai-riyu.png         # 「kintoneが定着しない」記事 OGP・サムネイル
│   │       ├── kintone-muryou-plugin-osusume.png        # 「kintone無料プラグイン特集」記事 OGP・ヘッダー画像（Gemini生成・1200×630px）
│   │       ├── kintone-category.png                     # 「kintoneカテゴリー機能」記事 OGP・ヘッダー画像（Gemini生成・1200×630px）
│   │       ├── kintone-category-settings.png            # カテゴリー記事 実機スクショ：カテゴリー設定画面（階層ツリー）
│   │       ├── kintone-category-list.png                # カテゴリー記事 実機スクショ：一覧のカテゴリーペイン（全レコード）
│   │       ├── kintone-category-list-filter.png         # カテゴリー記事 実機スクショ：カテゴリーで絞り込んだ一覧
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
│   │       ├── kintone-cyouhyou-sonomama.png            # 「kintoneの帳票を今の書式のまま出力する方法」記事 OGP・サムネイル（Gemini生成）
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
│   │   ├── kw-field-styler-v2.1.2.zip                  # フィールドスタイラー for kintone 配布ファイル（旧版・手動配置）
│   │   ├── kw-field-styler-v2.3.0.zip                  # フィールドスタイラー for kintone 配布ファイル（最新・手動配置・v2.3.0 で条件付きスタイルの色を任意指定可）
│   │   ├── kw-field-styler-v2.2.0.zip                  # フィールドスタイラー for kintone 配布ファイル（v2.2.0 でサブテーブル対応）
│   │   ├── kw-conditional-numbering-v2.0.0.zip         # 条件分岐自動採番 for kintone 配布ファイル（最新・手動配置・v2.0.0 複数フィールド採番）
│   │   ├── kw-conditional-numbering-v1.1.2.zip         # 条件分岐自動採番 for kintone 配布ファイル（旧版）
│   │   ├── kw-form-deco-v1.0.2.zip                     # FormDeco for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-lookup-suggest-v1.0.2.zip                # ルックアップサジェスト for kintone 配布ファイル（旧版・手動配置）
│   │   ├── kw-lookup-suggest-v2.0.0.zip                # ルックアップサジェスト for kintone 配布ファイル（旧版・手動配置・v2.0.0 でサブテーブル内ルックアップ対応）
│   │   ├── kw-lookup-suggest-v2.1.0.zip                # ルックアップサジェスト for kintone 配布ファイル（最新・手動配置・v2.1.0 でモバイル版 kintone 対応＝通常ルックアップのみ）
│   │   ├── kw-quick-side-view-v1.0.2.zip               # クイックサイドビュー for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-quick-search-v1.1.2.zip                  # クイックサーチ for kintone 配布ファイル（手動配置・v1.1.2 でゲストスペース対応）
│   │   ├── kw-quick-search-v1.2.0.zip                  # クイックサーチ for kintone 配布ファイル（手動配置・v1.2.0＝期間フィルタ追加）
│   │   ├── kw-file-icon-marker-v1.0.3.zip              # 添付ファイルアイコン表示 for kintone 配布ファイル（手動配置・v1.0.3 で設定画面 全幅化/サイドバー250px/拡大縮小時の操作性改善）
│   │   ├── kw-record-lock-v1.0.3.zip                   # レコードロック for kintone 配布ファイル（手動配置・v1.0.3 で設定画面 サイドバー250px/条件表の拡大縮小時 操作性改善）
│   │   ├── kw-field-comment-v1.0.0.zip                 # フィールドコメント for kintone 配布ファイル（旧版）
│   │   ├── kw-field-comment-v1.0.1.zip                 # フィールドコメント for kintone 配布ファイル（旧版）
│   │   ├── kw-field-comment-v1.0.2.zip                 # フィールドコメント for kintone 配布ファイル（v1.0.2・ゲストスペース対応）
│   │   ├── kw-field-comment-v1.1.0.zip                 # フィールドコメント for kintone 配布ファイル（手動配置・v1.1.0 編集/新規画面対応＋アイコン10種＋カラーコード入力＋設定アコーディオン化）
│   │   ├── kw-field-comment-v1.1.1.zip                 # フィールドコメント for kintone 配布ファイル（手動配置・v1.1.1 フィールド名非表示フィールドのコメント誤付着を修正＋入力欄直上に表示＋ラベル改称後も追従）
│   │   ├── kw-read-check-v1.0.0.zip                   # 既読チェック for kintone 配布ファイル（手動配置・v1.0.0 初版）
│   │   ├── kw-record-recovery-v1.0.0.zip              # 削除レコード復元 for kintone 配布ファイル（手動配置・v1.0.0 初版）
│   │   ├── kw-theme-styler-v1.1.0.zip                  # テーマスタイラー for kintone 配布ファイル（手動配置・v1.1.0 詳細画面/明細ヘッダーの個別カラー指定＋設定画面v2レイアウト刷新）
│   │   ├── kw-address-assist-v1.1.0.zip                # 住所アシスト for kintone 配布ファイル（手動配置・v1.1.0 でサブテーブル対応）
│   │   ├── kw-address-assist-v1.0.2.zip                # 住所アシスト for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-quick-history-view-v1.0.2.zip            # クイック履歴ビュー for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-related-record-popup-v1.0.3.zip          # 関連レコードポップアップ表示 for kintone 配布ファイル（手動配置・v1.0.3：ページ送りでポップアップが閉じる不具合の修正＋コメント系プラグインとのアイコン競合の自動回避）
│   │   ├── kw-summary-bar-v2.1.1.zip                   # 集計サマリーバー for kintone 配布ファイル（手動配置・v2.1.1 でゲストスペース対応）
│   │   ├── kw-csv-export-v1.1.1.zip                    # かんたんCSV出力 for kintone 配布ファイル（手動配置・v1.1.1 でゲストスペース対応）
│   │   ├── kw-csv-export-v1.2.0.zip                    # かんたんCSV出力 for kintone 配布ファイル（手動配置・v1.2.0 サブテーブル展開＋区切り記号列）
│   │   ├── kw-quick-tab-v1.0.2.zip                     # クイックタブ for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-file-preview-v1.0.2.zip                  # 添付ファイルプレビュー for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-quick-toc-v1.2.0.zip                     # クイック目次 for kintone 配布ファイル（手動配置・v1.2.0 スペース対応/見出し表示/ステータスバッジ文字列1行）
│   │   ├── kw-elapsed-assist-v1.0.2.zip                # 経過計算アシスト for kintone 配布ファイル（手動配置・v1.0.2 初版：基準日から9パターン自動計算＋その場再計算＋保存書込＋停止条件＋一括再計算）
│   │   ├── kw-list-styler-v1.0.2.zip                   # 一覧スタイラー for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-input-assist-v1.0.2.zip                  # 入力アシスト for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-conditional-form-v1.0.2.zip              # 条件分岐フォーム for kintone 配布ファイル（手動配置・v1.0.2 でゲストスペース対応）
│   │   ├── kw-conditional-form-v2.0.0.zip              # 条件分岐フォーム for kintone 配布ファイル（手動配置・v2.0.0＝対象ユーザー条件）
│   │   ├── kw-conditional-form-v2.1.0.zip              # 条件分岐フォーム for kintone 配布ファイル（手動配置・v2.1.0＝いずれかに一致/いずれにも一致しない演算子・AND/OR誤設定ブロック・設定画面のルール折りたたみ）
│   │   ├── kw-sheet-edit-v1.0.1.zip                    # シート編集 for kintone 配布ファイル（手動配置・v1.0.1 でゲストスペース対応）
│   │   ├── kw-sheet-edit-v1.1.0.zip                    # シート編集 for kintone 配布ファイル（手動配置・v1.1.0＝サブテーブル対応）
│   │   ├── kw-sheet-edit-v1.3.0.zip                    # シート編集 for kintone 配布ファイル（手動配置・v1.3.0＝「値が空」の絞り込み＋番号クリックで詳細＋数値をフィールド設定どおり表示）
│   │   ├── kw-sheet-edit-v1.4.0.zip                    # シート編集 for kintone 配布ファイル（手動配置・v1.4.0＝組織/ユーザー/グループの絞り込みを選択式に＋設定セットの複製・アコーディオン表示）
│   │   ├── kw-sticky-board-v1.0.1.zip                  # 付箋ボード for kintone 配布ファイル（手動配置・v1.0.1 でゲストスペース対応）
│   │   ├── kw-mail-assist-v1.0.1.zip                   # メールアシスト for kintone 配布ファイル（手動配置・v1.0.1＝法人Outlook対応）
│   │   ├── kw-mail-assist-v1.1.0.zip                   # メールアシスト for kintone 配布ファイル（手動配置・v1.1.0＝表示条件に複数値OR演算子追加・編集画面幅拡大）
│   │   ├── kw-comment-control-v1.0.1.zip               # コメントコントロール for kintone 配布ファイル（手動配置・v1.0.1＝閉じたコメント欄を手動で開けない不具合を修正）
│   │   ├── kw-comment-control-v1.0.2.zip               # コメントコントロール for kintone 配布ファイル（手動配置・v1.0.2＝APIリクエスト節約。一覧バッジのコメント取得をホバー時のみに変更・自分宛メンションの一覧色分けは任意オプション化）
│   │   ├── kw-dashboard-v1.1.0.zip                      # ダッシュボード for kintone 配布ファイル（手動配置・プレミアムプラグイン第2弾・無料/プレミアム共通zip・v1.1.0=ポータルレイアウト構成）
│   │   ├── kw-attribute-filter-v1.0.0.zip               # 属性制御フィルター for kintone 配布ファイル（手動配置・プレミアムプラグイン・無料/プレミアム共通zip・無料=1フィールド全機能）
│   │   ├── kw-lookup-sync-v1.0.0.zip                     # ルックアップ自動同期 for kintone 配布ファイル（手動配置・プレミアムプラグイン・無料/プレミアム共通zip・無料=参照先1組で全機能）
│   │   ├── kw-lookup-sync-v2.0.2.zip                     # ルックアップ自動同期 for kintone v2.0.2 配布ファイル（重複しうるキー対応＝方式1/方式2・入力補完・PC/モバイル）
│   │   ├── kw-lookup-sync-v2.1.1.zip                     # ルックアップ自動同期 for kintone v2.1.1 配布ファイル（全件同期を自己修復型に＝キー未設定でも名前一致で同期・前後空白正規化・要確認内訳CSV出力。最新版）
│   │   ├── kw-card-board-v1.0.0.zip                     # カードボード for kintone 配布ファイル（手動配置・プレミアムプラグイン第6弾・無料/プレミアム共通zip・無料=1ビューで全機能・複数ビューはプレミアム）
│   │   ├── kw-related-enhancer-v1.0.0.zip               # 関連レコード拡張 for kintone 配布ファイル（手動配置・プレミアムプラグイン第5弾・無料/プレミアム共通zip・無料=1対象で集計/見た目/検索・F-04/05/06はプレミアム限定）
│   │   └── kw-user-autofill-v1.0.0.zip                  # ユーザーオートフィル for kintone 配布ファイル（手動配置・v1.0.0＝属性自動転記＋プロフィールカード／捺印モード）
│   ├── libs/                   # プラグインが実行時にSRI付きで読み込む自社配信ライブラリ（第三者CDN不使用）。現状 kw-file-preview のみ使用
│   │   ├── README.md           # 収録ライブラリ・バージョン・ライセンス・更新手順
│   │   ├── pdfjs/3.11.174/     # PDF.js（pdf.min.js / pdf.worker.min.js）— PDF描画
│   │   ├── exceljs/4.4.0/      # ExcelJS（exceljs.min.js）— Excel読み込み・書式再現
│   │   ├── xlsx/0.18.5/        # SheetJS（xlsx.full.min.js）— Excel予備表示
│   │   ├── jszip/3.10.1/       # JSZip（jszip.min.js）— xlsx解析・グラフ抽出
│   │   ├── chartjs/4.4.1/      # Chart.js（chart.umd.min.js）— Excelグラフ再現描画
│   │   ├── docx-preview/0.3.5/ # docx-preview（docx-preview.min.js）— Word表示
│   │   ├── mammoth/1.6.0/      # mammoth（mammoth.browser.min.js）— Word予備表示
│   │   ├── crypto-js/4.2.0/    # crypto-js（crypto-js.min.js）— パスワード付きOffice復号（ECMA-376 Agile：鍵導出・AES-CBC）
│   │   ├── cfb/1.2.2/          # cfb（cfb.min.js・SheetJS）— パスワード付きOfficeのCFB/OLE2複合ファイル解析
│   │   ├── ssf/0.11.2/         # ssf（ssf.min.js・SheetJS）— Excel数値書式（#,##0・日付・¥・%）の適用
│   │   ├── react/18.3.1/       # React（react.production.min.js）— Fortune-sheet（Excel高精細表示）の実行基盤
│   │   ├── react-dom/18.3.1/   # ReactDOM（react-dom.production.min.js）— 同上
│   │   ├── fortune-sheet/1.0.4/ # Fortune-sheet（fortune-sheet.umd.min.js/.css）— ExcelをExcel風グリッドで高精細表示
│   │   └── luckyexcel/1.0.1/   # LuckyExcel（luckyexcel.umd.js）— xlsx→スプレッドシートデータ変換
│   ├── sitemap.xml             # 旧URL互換用sitemapindex（@astrojs/sitemap生成のsitemap-0.xmlを参照）
│   ├── tools/
│   │   ├── stamp-maker.html    # inkan（電子印鑑メーカー）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── natsuin.html        # Natsuin（PDF電子印鑑・署名ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── musubi.html         # Musubi（PDF結合・分割ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── KizunaTsumugi.html  # KIZUNA Tsumugi（QRコードジェネレーター）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── masuku.html         # Masuku（画像・PDFマスキングツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Shuku.html          # Shuku（画像変換・圧縮・リサイズツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Utsushi.html        # Utsushi（PDF→HTML変換ツール）スタンドアロンHTMLアプリ（Astro管理外）
│   │   ├── Tsukuroi.html       # Tsukuroi（AI物体除去ツール／MI-GAN・onnxruntime-web・ブラウザ完結）スタンドアロンHTMLアプリ（Astro管理外）
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
