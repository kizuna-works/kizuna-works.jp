# CLAUDE.md — KIZUNA Works Project Guide

## Project Overview

| Item | Details |
|------|---------|
| Site name | KIZUNA Works |
| Domain | kizuna-works.jp |
| Repository | kizuna-works/kizuna-works.jp |
| Local path | `C:\kizuna-works.jp`（作業ディレクトリ） |
| Contact | info@kizuna-works.jp |
| X (Twitter) | @KIZUNA_works_DX |
| Description | kintoneプラグイン・無料Webツール・業務効率化サービスを提供するサイト |

---

## Tech Stack

| Item | Details |
|------|---------|
| Framework | Astro 6.1.7 (static output) |
| Hosting | GitHub Pages |
| Integrations | `@astrojs/mdx`, `@astrojs/sitemap` |
| Config | `astro.config.mjs` — `site: 'https://kizuna-works.jp'` |
| Dev server | `npm run dev` |
| Build | `npm run build` → `dist/` |

---

## Brand Guidelines

### Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| Navy (primary) | `#1B3A6B` | Headings, buttons, header border |
| Green (accent) | `#2E8B2E` | Badges, underlines, hover states |
| Background | `#F0F4F8` | Page background |
| White | `#FFFFFF` | Cards, content areas |
| Text main | `#333333` | Body text |
| Text muted | `#64748b` | Secondary text |

### Typography
- **Font:** Noto Sans JP (Google Fonts)
- Loaded globally in `src/layouts/Layout.astro`

### Header / Footer
- **Header:** sticky, bottom border in navy
- **Footer:** navy background, white logo

---

## Coding Rules

- **CSS comments must be in English only** — Japanese in CSS comments is prohibited
- **Do not display the representative's name anywhere on the site**
- **HTML output must be complete single-file** — no partial snippets
- **Responsive design is required** for all pages
- **SEO / meta description / OGP must be implemented** on every page

---

## External Services

| Service | Status | ID / Key |
|---------|--------|----------|
| Google Analytics (GA4) | 設置済み | `G-Q1B44N0922` |
| Google AdSense | 審査中 | `ca-pub-2096869114957752` |
| Square 決済リンク | 決済用 | 商品ページごとに設定 |
| Google Search Console | 設定済み | — |

Scripts for GA4 and AdSense must use `<script is:inline>` in `Layout.astro` `<head>` to prevent Astro bundler processing.

---

## Project Structure

```
src/
  layouts/
    Layout.astro       # Shared layout: GA4, AdSense, Noto Sans JP, header, footer
    BlogPost.astro     # Blog post layout
  pages/
    index.astro        # Homepage
    contact.astro      # Contact (Google Forms link)
    privacy.astro      # Privacy policy
    terms.astro        # Terms of service
    tokushoho.astro    # 特定商取引法に基づく表記
    refund.astro       # Refund policy
    blog/
      index.astro      # Blog index (note.com RSS + content collection)
      [...slug].astro  # Blog post dynamic route
    tools/
      index.astro      # Tools index
    plugins/
      index.astro      # Plugins index
      field-styler/
        index.astro    # Field Styler product page
  content/
    blog/              # Markdown/MDX blog posts (add files here)
  styles/
    global.css         # Minimal reset + body flex for sticky footer
public/
  images/              # All site images (PNG)
  tools/
    stamp-maker.html   # Standalone HTML app — do NOT convert to Astro
  CNAME                # kizuna-works.jp
  robots.txt
```

---

## CSS Conventions

- **Page-specific CSS:** Use `<style is:global>` inside each page file
  - Reason: avoids Astro scoping issues with element selectors (`body`, `h1`, etc.)
- **Layout CSS (header/footer):** Scoped `<style>` in `Layout.astro`
- **No Japanese in CSS comments**

### Named Slot in Layout.astro

```astro
<Fragment slot="head">
  <!-- JSON-LD structured data, canonical link, page-specific meta -->
</Fragment>
```

---

## Common Work Patterns

### Adding a Blog Post

1. Create a Markdown file in `src/content/blog/`
2. Place images in `public/images/blog/`
3. Include the following frontmatter:

```md
---
title: "記事タイトル"
description: "記事の説明文"
pubDate: 2025-01-01
author: "KIZUNA Works"
tags: ["タグ1", "タグ2"]
ogImage: "/images/blog/article-slug.png"  # optional — OGP・サムネイル・記事ヘッダー画像
---
```

**画像の保存ルール:**
- 保存場所: `public/images/blog/`
- frontmatterでは `ogImage: "/images/blog/ファイル名.png"` で参照
- 本文中のインライン画像も `![alt](/images/blog/ファイル名.png)` で参照
- `heroImage: image()` は使用しない（他ページからURL参照できないため）

### Updating a Page

- Edit the relevant `.astro` file under `src/pages/`
- Shared layout: `src/layouts/Layout.astro`
- Run `npm run dev` to preview locally

### Deploy to GitHub Pages

```bash
npm run build
git add .
git commit -m "コミットメッセージ"
git push
```

---

## Sales & Payment

| Item | Details |
|------|---------|
| Payment processor | Square 決済リンク（月額0円・手数料3.6%） |
| Sales format | 年額サブスクリプション（¥5,000/年） |
| Sales funnel | GitHub Pages → Square 決済リンク → 購入完了 |
| Other channels | STORES・BOOTH・Mercari・coconala 併用 |
| Products | kintoneプラグイン・GASデジタル商品・HTMLアプリ等 |

---

## Products

### kintone Plugins

| Plugin | URL | Status |
|--------|-----|--------|
| フィールドスタイラー (Field Styler) | `/plugins/field-styler/` | 近日販売開始予定 |

**Field Styler pricing:**
- Monthly: ¥1,000 / month
- Annual: ¥10,000 / year（2ヶ月分お得）
- Trial: 30日間無料

**Adding a new plugin:**  
Create a page under `plugins/` and update both the grid in `plugins/index.astro` and the `ItemList` in its JSON-LD.

### Free Web Tools

| Tool | URL | Status |
|------|-----|--------|
| inkan（電子印鑑メーカー） | `/tools/stamp-maker.html` | 公開中（無料） |

**Adding a new tool:**  
Update the grid in `tools/index.astro` and its JSON-LD `ItemList`.

---

## Blog

- Astro content collection: `src/content/blog/` (Markdown / MDX)
- Also fetches note.com RSS feed via rss2json API (client-side `<script is:inline>`)
  - rss2json API key: `ov8zqmcpon2nfe5tptbfyvolvr71cgkudmabt2ja`
- No posts yet — shows "準備中" placeholder until posts are added

---

## Security Notes

### CDN ライブラリの SRI（Subresource Integrity）管理

`public/tools/natsuin.html` と `public/tools/musubi.html` の外部CDNスクリプトには SRI ハッシュ（sha384）が設定されている。**ライブラリのバージョンを更新した場合は必ず SRI ハッシュも再計算して更新すること。**

**対象ファイルと現在のバージョン：**

| ライブラリ | バージョン | 使用ファイル |
|---|---|---|
| pdf.js | 4.4.168 | natsuin.html |
| pdf-lib | 1.17.1 | natsuin.html / musubi.html |
| Sortable | 1.15.2 | musubi.html |
| jszip | 3.10.1 | musubi.html |

**SRI ハッシュの再計算コマンド（Python）：**

```python
import urllib.request, hashlib, base64
url = 'https://cdnjs.cloudflare.com/ajax/libs/<library>/<version>/<file>.js'
data = urllib.request.urlopen(url).read()
print('sha384-' + base64.b64encode(hashlib.sha384(data).digest()).decode())
```

---

- **`.git/config` には GitHub トークンが平文で保存されている** — 絶対にコミット・共有しない
- `.git/` ディレクトリは Git 管理外のため、通常のコミット操作では漏洩しない
- `.gitignore` に `.git/config` を記載する必要はないが、`C:\kizuna-works.jp\.git\config` を直接共有しないよう注意
- **トークンの有効期限：90日**（期限切れ時は GitHub で新しい PAT を発行して再設定）
- **スコープ：** `repo` + `workflow` の両方が必要
- トークン再設定コマンド：
  ```bash
  cd C:\kizuna-works.jp
  git remote set-url origin https://kizuna-works:<新TOKEN>@github.com/kizuna-works/kizuna-works.jp.git
  ```

---

## サイト更新時のルール

- ページの追加・削除・移動を行った場合は、必ず `SITE_STRUCTURE.md` も更新する
- 新しいファイルを追加した場合は、`SITE_STRUCTURE.md` にパスと役割の説明を追記する
- ファイルを削除・移動した場合は、`SITE_STRUCTURE.md` の該当箇所を修正する
- `SITE_STRUCTURE.md` の更新はサイト更新と同じコミットに含める

---

## モバイル表示の鉄則（壊さないための前提知識）

> **最重要：** これは過去に発生した不具合の再発防止ルール。新規ページ・新規記事・新規コンポーネントの追加時、コミット前に必ず確認すること。

### 既知の地雷：フレックス子要素の min-content オーバーフロー

`body` は `display: flex; flex-direction: column`（[src/styles/global.css](src/styles/global.css)）。フレックス子要素はデフォルト `min-width: auto` ＝ コンテンツの最小幅まで広がる仕様のため、内部に **min-content がビューポートを超える要素**（5列以上の比較表・`<pre>` コードブロック・`white-space: nowrap` の長文・固定幅 div など）があると `<main>` がビューポート外まで広がり、ヘッダーと本文の左右位置がずれる。

**対策（既に global.css に実装済・絶対に削除しない）：**
```css
body { overflow-x: clip; }
body > *:not(header):not(footer) { flex: 1; min-width: 0; width: 100%; }
```

### 新規ページ作成時のモバイル必須チェック

- [ ] 5列以上のテーブルを置く場合、`overflow-x: auto` のラッパー or `display: block` で内部スクロールできること（ブログは `BlogPost.astro` で対応済み）
- [ ] `<img>` には `max-width: 100%; height: auto` が効くこと（global.css でグローバル適用済）
- [ ] `<pre>` には `overflow-x: auto` が効くこと（`BlogPost.astro` で対応済）
- [ ] **Layout.astro を継承しないスタンドアロン HTML（`public/tools/*.html`）を新規追加する場合は、ヘッダー幅とコンテンツ幅が一致するよう独自 CSS で `overflow-x: clip` 相当を仕込むこと**
- [ ] ビルド後、Chrome DevTools のレスポンシブモードで **375px 幅** にして横スクロールバーが出ないことを確認

### コミット前の自動検証コマンド

新規ブログ記事・新規ページ追加後：
```bash
npm run build
# 最新ファイルの dist/<page>/index.html を確認し、以下を grep
grep -E "blog-prose table|blog-prose img|min-width:0|overflow-x:clip" dist/blog/<slug>/index.html
```
↑ 全部ヒットしなければ何かが壊れている。

---

## コンテンツ追加・更新時のお知らせ（/news/）自動投入ルール

> **重要：** 公開向けコンテンツの追加・更新時は、指示がなくても `src/content/news/` にお知らせエントリを必ず追加すること（2026-05-18 ユーザー指示）。

### お知らせを追加する対象（指示なしで自動投入）

| 対象 | カテゴリ | タイトル例 |
|---|---|---|
| 新プラグイン公開 | `release` | "kintone プラグイン「〇〇」v1.0.0 を公開しました" |
| 新無料ツール公開 | `release` | "無料 Web ツール「〇〇」を公開しました" |
| 新 Chrome 拡張機能公開 | `release` | "Chrome 拡張機能「〇〇」を Chrome Web Store で公開しました" |
| ブログ記事公開 | `release` | "ブログ記事「〇〇」を公開しました" |
| 既存プラグイン/ツール/拡張のバージョンアップ・機能追加 | `update` | "プラグイン「〇〇」を v1.1.0 にアップデートしました" |
| サイト全体のデザイン刷新・大型機能追加 | `update` | "〇〇機能を追加しました" |
| kintone / Cybozu 関連の外部障害情報 | `incident` | （Cybozu 公式情報の URL を `externalUrl` に指定） |
| メンテ予告・価格改定・運営からの告知 | `notice` | "〇〇のお知らせ" |

### お知らせを追加しない（コミット前に判断）

- タイポ修正・リンク修正・SEO 微調整
- 内部リファクタリング・ビルド設定変更
- 用語集に用語を 1〜2 個追加するだけ（カテゴリ新設・大量追加なら `update` で追加）

### 投入手順

1. `src/content/news/<slug>.md` を作成（スラッグは日付なし・kebab-case）
2. frontmatter は最小：`title` / `description`（120 字程度） / `pubDate`（追加日） / `category` / `externalUrl?` / **`ogImage?`**
3. **`ogImage` は必ず検討する**（SNS シェア時のサムネに直結）。対応する画像が `public/` 配下に存在すれば必ず指定する。マッピング：
   - プラグインリリース・アップデート → `/images/<plugin-slug>-banner.png`（例：`/images/field-styler-after.png` / `/images/form-deco-banner.png`）
   - 拡張機能リリース・アップデート → `/images/extensions/<ext-slug>-banner.png`
   - ブログ記事公開のお知らせ → 対応ブログ記事の `ogImage` と同じ画像（`/images/blog/<slug>.png`）
   - 無料ツールリリース → `/images/<tool>-preview.png`（存在する場合のみ）
   - 障害情報・kintone アップデート系で対応画像がない場合は省略（サイト共通 ogp.png にフォールバック）
4. `externalUrl` を指定すると個別ページは生成されず、一覧から外部リンクへ直接飛ぶ（障害情報など外部 URL が一次情報のケース向け）
5. `externalUrl` 未指定の場合は本文 Markdown を書く。本文末尾に該当ページへの内部リンク（`[〇〇プラグインページを見る →](/plugins/〇〇/)` など）を必ず置く
6. ビルドで `/news/index.html` `/news/<slug>/index.html`（個別ページ型のみ）`/news/rss.xml` が更新されることを確認

### 追加時のチェック

- [ ] `pubDate` は ISO 形式の日付（`2026-05-18`）
- [ ] `category` は `release` / `update` / `incident` / `notice` のいずれか
- [ ] `description` は LLMO 観点で 40〜140 字、結論ファースト
- [ ] **`ogImage` を検討した（対応画像が public/ 配下に存在すれば必ず指定）**
- [ ] 該当コンテンツのコミットと同じコミットに含める（別コミットにしない）

---

## プラグイン／ツール／拡張のアップデート公開時の「個別ページへのアップデート情報」

> **重要：** kintone プラグイン等のバージョンアップ・機能追加を公開するとき、`/news/` へのお知らせ追加（上記ルール）は従来どおり行う。**加えて、該当の個別ページ（`src/pages/plugins/<slug>/index.astro` 等）にアップデート情報を掲載するかどうかは、毎回ユーザーに確認すること**（指示なしで勝手に追加しない）。お知らせ一覧は流れていくため製品ページにも載せたいが、**軽微な修正（タイポ・リンク修正・内部改修など）はアップデート情報として載せないことがある**ため、要否はユーザーが都度判断する（2026-06-17 ユーザー指示）。

例：「この内容、製品ページにもアップデート情報として載せますか？」と一言確認し、「載せる」場合のみ下記の作り方で追加する。

### 個別ページのアップデート情報の作り方（summary-bar / csv-export 方式に統一）

- hero（タイトル）直下に `<section>` で **UPDATE ハイライトボックス**を置く：`.update-box`（緑の左ボーダー）＋ `.update-tag`「UPDATE」＋ `.update-title`（`vX.Y.Z：…` 見出し）＋ `.update-desc`（説明）＋スクショ＋ `.update-note`（補足・上書きアップロード手順）。CSS は summary-bar / csv-export に実装済みなので流用する。
- 主役の新機能を前面に。副次的な改善も本文で触れるが、**「おまけ」等のカジュアルな表現は避け、課題提示型で書く**。検証アプリ固有のフィールド名（商品コード等）は使わず汎用語にする。
- スクショは **`.update-shot`（max-width 640px・中央寄せ）＋ `img.zoomable`** でライトボックス拡大に対応（`#<prefix>-lightbox` の暗転オーバーレイ＋×＋背景クリック/Escで閉じる。conditional-form 等と同方式）。画像下に「画像をクリックすると拡大表示します」。
- 画像は `public/images/<slug>-config-0N.png` など連番で追加し、**SITE_STRUCTURE.md にも追記**。
- hero の `softwareVersion` / `dateModified` / `downloadUrl` / hero-version / DLボタン / GA計測の版表記、`<head>` JSON-LD、「主な機能」「featureList」も更新する。
- 配布 zip ファイル名を据え置く場合は、kintone 再アップロード用に **manifest の version 整数だけ繰り上げる**（ファイル名・表示バージョンは変えない運用も可）。

---

## ページ追加・更新時のSEO + LLMO（AI検索）チェックリスト

> **重要：** 無料ツール・ブログ・プラグインのページを追加・更新する際は、コミット前に必ず **SEO 対策と LLMO 対策の両方を同時に**実行すること。指示がない場合でも自動的に適用すること（2026-05-17 ユーザー指示）。

### 【LLMO 共通必須項目】全ページに適用

ChatGPT / Perplexity / Google AI Overviews / Claude などの生成 AI に引用・参照されるための施策。SEO チェックリスト（下記）と**同時に**確認すること。

- [ ] **結論ファースト**：hero または本文冒頭で「これは何か」を 40〜60 字の定義文（"X は kintone の Y を Z できる プラグイン です" 型）で明示
- [ ] **ファクト密度**：本文中に具体的な数値・統計・固有名詞・出典 URL を含める（特にブログ記事）
- [ ] **構造化データに `dateModified` 追加**：SoftwareApplication / Service / Article 等の JSON-LD に `"dateModified": "YYYY-MM-DD"` を含める（コンテンツ更新時は値を更新）
- [ ] **エンティティ明示**：自社ブランド名（KIZUNA Works）・プラグイン名・ツール名を本文中で繰り返し使用
- [ ] **FAQ がある場合は `FAQPage` を追加**：本文内容と完全一致させること（Google ガイドライン）
- [ ] **手順説明がある場合は `HowTo` を追加**
- [ ] **新ページの場合は `public/llms.txt` を更新**：該当カテゴリにエントリ追加
- [ ] **SSR テキスト確認**：本文が静的 HTML に含まれていること（client-side fetch 任せにしない）

> AI クローラー（GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot / Google-Extended 等）の許可は `public/robots.txt` で全許可済み。新規ページでブロックしないこと。

---

### 【共通】全ページ必須項目（Astro `.astro` ページ）

#### Layout コンポーネントの props
- `title`: ページタイトル（日本語・キーワード含む・30〜60文字）
- `description`: meta description（日本語・120〜140文字・キーワード含む）
- `canonical`: 正式URL（例：`https://kizuna-works.jp/tools/new-tool/`）
- `ogTitle`: OGタイトル（titleと同じでOK）
- `ogDescription`: OG説明文（descriptionと同じ文字数・内容）
- `ogUrl`: 正式URL（canonicalと同じ）
- `ogType`: `"website"`（"product"は非標準のため使用禁止）
- `ogImage`: OGP画像URL（デフォルト：`https://kizuna-works.jp/images/ogp.png`）

#### JSON-LD（`<Fragment slot="head">` 内に `<script is:inline type="application/ld+json">` で記述）
- 全ページ: `WebPage` スキーマ
- ツール一覧・プラグイン一覧: `ItemList` スキーマ（各アイテムに `SoftwareApplication`）
- 個別ツール・プラグインページ: `SoftwareApplication` スキーマ（`offers.price: "0"` または価格）
- ブログ記事: `BlogPosting` スキーマ（`[...slug].astro` が自動生成するため追加不要）

#### コンテンツ
- `<h1>` タグが必ず1つ存在すること
- 全 `<img>` に具体的な日本語 `alt` テキストを設定（装飾のみ `alt=""` 許可）
- 新規ページは必ずヘッダーナビ・フッター・または関連ページからリンクを張る

#### SITE_STRUCTURE.md の更新
- 新規ファイルを追加したら `SITE_STRUCTURE.md` にパスと役割を記載する

---

### 【ブログ記事】`src/content/blog/*.md` を追加・更新する場合

frontmatter の必須項目：

```md
---
title: "記事タイトル（日本語・30〜60文字・キーワード含む）"
description: "記事の説明文（120〜140文字・キーワード含む）"
pubDate: YYYY-MM-DD
author: "KIZUNA Works"
tags: ["タグ1", "タグ2"]
ogImage: "/images/blog/article-slug.png"
---
```

チェック項目：
- [ ] `title` が30〜60文字でキーワードを含む
- [ ] `description` が120〜140文字でキーワードを含む
- [ ] `pubDate` が正しい日付
- [ ] `ogImage` の画像ファイルが `public/images/blog/` に存在する
- [ ] 記事内の `<img>` / `![]()` に alt テキストがある
- [ ] 関連するプラグイン・ツールページへの内部リンクを含める
- [ ] 本文内の `**太字**` 記法は正しくレンダリングされるか確認

---

### 【無料ツール】`public/tools/*.html` を追加・更新する場合

staticHTMLファイルのため、Layout.astro は使用しない。以下を `<head>` 内に直接記述すること。

#### `<head>` 必須項目（テンプレート）

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="ツールの説明（120〜140文字・キーワード含む）">
<link rel="canonical" href="https://kizuna-works.jp/tools/tool-name.html">
<meta property="og:title" content="ToolName（ツール説明）| KIZUNA Works">
<meta property="og:description" content="ツールの説明（120〜140文字）">
<meta property="og:url" content="https://kizuna-works.jp/tools/tool-name.html">
<meta property="og:type" content="website">
<meta property="og:image" content="https://kizuna-works.jp/images/ogp.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@KIZUNA_works_DX">
<link rel="icon" type="image/png" href="/images/favicon.png">
<title>ToolName（ツール説明）| KIZUNA Works</title>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://kizuna-works.jp/tools/tool-name.html",
      "url": "https://kizuna-works.jp/tools/tool-name.html",
      "name": "ToolName（ツール説明）| KIZUNA Works",
      "description": "...",
      "isPartOf": { "@type": "WebSite", "name": "KIZUNA Works", "url": "https://kizuna-works.jp/" }
    },
    {
      "@type": "SoftwareApplication",
      "name": "ToolName（ツール説明）",
      "url": "https://kizuna-works.jp/tools/tool-name.html",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "WebBrowser",
      "dateModified": "YYYY-MM-DD",
      "description": "...",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" }
    }
  ]
}
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q1B44N0922"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Q1B44N0922');
</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2096869114957752" crossorigin="anonymous"></script>
```

#### `<body>` 内の必須項目

```html
<!-- サイトヘッダー（共通） -->
<header class="site-header">
  <div class="site-header-inner">
    <a href="/" class="site-header-logo">
      <img src="/images/logo.png" alt="KIZUNA Works">
    </a>
    <nav class="site-header-nav">
      <a href="/tools/" class="site-nav-btn">無料ツール</a>
      <a href="/plugins/" class="site-nav-btn">プラグイン</a>
      <a href="/extensions/" class="site-nav-btn">拡張機能</a>
      <a href="/blog/" class="site-nav-btn">ブログ</a>
      <a href="/glossary/" class="site-nav-btn">用語集</a>
      <a href="/contact/" class="site-nav-btn">お問い合わせ</a>
    </nav>
  </div>
</header>

<!-- 視覚的に非表示のh1（SEO用）-->
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">ToolName（ツール説明）| KIZUNA Works</h1>
```

#### 追加後の作業
- [ ] `astro.config.mjs` の `sitemap.customPages` にURLを追加する
- [ ] `tools/index.astro` のグリッドに新ツールのカードを追加する
- [ ] `tools/index.astro` の JSON-LD `ItemList` に新ツールを追加する
- [ ] `SITE_STRUCTURE.md` に追記する
- [ ] （人間側）Google Search Console でインデックス申請を行う

---

### 【プラグイン】`src/pages/plugins/*/index.astro` を追加・更新する場合

#### Layout props
- `title`: `"プラグイン名 - kintoneプラグイン | KIZUNA Works"`（40〜65文字）
- `description`: 120〜140文字、「kintone」「プラグイン」「ノーコード」等のキーワードを含む
- `canonical` / `ogUrl`: `https://kizuna-works.jp/plugins/plugin-name/`
- `ogImage`: プラグイン専用画像があれば指定、なければ `/images/ogp.png`

#### JSON-LD（`<Fragment slot="head">` 内）

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://kizuna-works.jp/plugins/plugin-name/",
      "url": "https://kizuna-works.jp/plugins/plugin-name/",
      "name": "...",
      "description": "..."
    },
    {
      "@type": "SoftwareApplication",
      "name": "プラグイン名",
      "url": "https://kizuna-works.jp/plugins/plugin-name/",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "kintone",
      "dateModified": "YYYY-MM-DD",
      "description": "...",
      "offers": [
        { "@type": "Offer", "name": "月額プラン", "price": "1000", "priceCurrency": "JPY", "billingIncrement": "P1M" },
        { "@type": "Offer", "name": "年額プラン", "price": "10000", "priceCurrency": "JPY", "billingIncrement": "P1Y" }
      ]
    }
  ]
}
```

#### 追加後の作業
- [ ] `plugins/index.astro` のグリッドに新プラグインのカードを追加する
- [ ] `plugins/index.astro` の JSON-LD `ItemList` に新プラグインを追加する
- [ ] `SITE_STRUCTURE.md` に追記する

#### プラグイン一覧カードの説明文・カテゴリ（必須・既存と統一）
`src/data/plugins.ts` の新エントリは、一覧カードの体裁を既存25件と揃えること（2026-06-26 ユーザー指示）。

- **`description`（一覧カード本文）**：機能ファーストで主要機能＋特徴を盛り込み、**5行相当・約110〜120字（実績105〜126字）に統一**する。短すぎ（機能を紹介しきれない）も長すぎ（高さが崩れる）もNG。`.plugin-desc` は5行クランプ＋`min-height`で高さを均一化済みなので、字数を上記レンジに収める。
- **`category`（必須フィールド）**：`'一覧' | 'レコード画面' | '入力支援' | '装飾' | '出力・連携'` から1つ。カード上部に色分けチップ表示（CSSは `.plugin-cat[data-cat="…"]` に実装済）。機能の主目的で選ぶ（例：一覧画面の拡張=一覧／詳細・編集画面の拡張=レコード画面／入力フォーム支援=入力支援／見た目の装飾=装飾／CSV・帳票・メール等=出力・連携）。
- `cardDescription`（トップページ用・〜50〜80字）は従来どおり別途記載。`description` とは用途が違うので使い回さない。

#### インストール手順リスト（`.steps-list`）の `<li>` は必ず `<span>` でラップする（必須）
プラグイン詳細ページの「インストール手順」`<ol class="steps-list">` の各項目は、**`<li><span>…手順文…</span></li>` の形で本文を `<span>` 1個に包むこと**（2026-06-26 ユーザー指示）。

- 理由：`.steps-list li` は `display:flex; gap:20px`。`<span>` で包まずに `<li>本文<strong>強調</strong>本文</li>` と書くと、**テキストノードと `<strong>`/`<code>` がそれぞれ別の flex アイテムに分割され**、手順文が不自然に複数列へ折り返して崩れる（番号バッジ＋本文の2カラムにならない）。
- `<span>` で1アイテムにまとめると、番号バッジ＋本文の正しい2カラム表示になる（機能リスト `.feature-list li>span` と同じ方式）。
- 過去事例：全プラグインページ24枚がこの崩れを起こしており一括修正した（2026-06-26）。新規ページ作成・既存編集時は最初から `<li><span>` で書く。

---

### 旧チェックリスト（参考：共通 SEO 要素一覧）

#### frontmatterの必須項目
- title: ページタイトル（日本語・キーワード含む・30文字前後）
- description: meta description（日本語・120〜140文字・キーワード含む）
- canonical: 正式URL（例：https://kizuna-works.jp/[ページ名]/）
- ogTitle: OGタイトル（titleと同じでOK）
- ogDescription: OG説明文（descriptionと同じでOK）
- ogUrl: 正式URL（canonicalと同じでOK）
- ogType: "website"（製品ページも"website"を使用。"product"は非標準のため使用禁止）
- ogImage: OGP画像URL（デフォルト：https://kizuna-works.jp/images/ogp.png）

#### JSON-LDの設定
- 全ページにWebPageスキーマを追加する
- ツール一覧・プラグイン一覧にはItemListスキーマを追加する
- 製品ページにはSoftwareApplicationスキーマを追加する
- `<script>`タグには必ず`is:inline`ディレクティブを付与する

#### 画像のaltテキスト
- 全ての`<img>`タグにalt属性を設定する
- alt属性はページの内容・画像の内容を具体的に日本語で説明する
- 空のalt属性（`alt=""`）は装飾画像のみ許可

#### 内部リンク
- 新規ページは必ずヘッダー・フッター・または関連ページからリンクを張る
- 孤立ページ（どこからもリンクされないページ）を作らない

#### staticHTMLファイル（public/tools/配下）を追加する場合
- `astro.config.mjs` の sitemap customPages に追加する
- Search Consoleでインデックス申請を行う（人間側の作業）

#### SITE_STRUCTURE.mdの更新
- 新規ファイルを `SITE_STRUCTURE.md` に追加する
- ファイルのパスと役割を日本語で記載する

---

## Notes for Future Work

- [ ] フィールドスタイラーの販売開始時に Square 決済リンクを `/plugins/field-styler/` に追加する
- [ ] ブログ記事を `src/content/blog/` に追加する（Markdown形式）
- [ ] OGP画像（`/images/ogp.png`）を更新する
- [ ] `stamp-maker.html` はスタンドアロンHTMLのため、Astroコンポーネントには変換しない
- [ ] 新プラグイン追加時は `plugins/index.astro` のグリッドとJSON-LDも更新する
- [ ] 新ツール追加時は `tools/index.astro` のグリッドとJSON-LDも更新する
