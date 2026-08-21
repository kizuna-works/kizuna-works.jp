# /libs/ — self-hosted plugin libraries

These third-party JavaScript libraries are served from kizuna-works.jp (our own
origin) so plugins can load them at runtime **with Subresource Integrity (SRI)**
and **without depending on a third-party CDN**. They are loaded lazily (only
when the feature that needs them is first used). Data handled by the plugins is
never sent to any external server.

Consumers:

| Library group | Plugin |
|---|---|
| pdfjs / exceljs / xlsx (0.18.5) / jszip / chartjs / docx-preview / mammoth / crypto-js / cfb / ssf / react / react-dom / fortune-sheet / luckyexcel | 添付ファイルプレビュー (kw-file-preview) |
| xlsx (0.20.3 mini) | シート編集 (kw-sheet-edit) |
| jszip | 添付ファイル出力 (kw-file-export) |
| zxing / bwip-js | バーコードアシスト (kw-barcode-assist) |
| pdfjs / pdf-lib / fontkit / fonts (Noto Sans JP, Noto Serif JP) | PDF編集アシスト (kw-pdf-edit) |
| pdf-lib / html2canvas | 帳票デザイナー (kw-report-designer) |

GitHub Pages serves these with `Access-Control-Allow-Origin: *`, so cross-origin
SRI loads (`crossorigin="anonymous"` + `integrity`) work from a customer's
kintone domain.

| Library | Version | License | Source (mirror of) |
|---|---|---|---|
| PDF.js (`pdfjs/`) | 3.11.174 | Apache-2.0 | cdnjs `pdf.js` |
| ExcelJS (`exceljs/`) | 4.4.0 | MIT | cdnjs `exceljs` |
| SheetJS / xlsx (`xlsx/`) | 0.18.5 (full) | Apache-2.0 | cdnjs `xlsx` |
| SheetJS / xlsx mini (`xlsx/`) | 0.20.3 (mini) | Apache-2.0 | sheetjs.com `xlsx.mini.min.js` |
| JSZip (`jszip/`) | 3.10.1 | MIT / GPLv3 (dual) | cdnjs `jszip` |
| Chart.js (`chartjs/`) | 4.4.1 | MIT | cdnjs `Chart.js` |
| docx-preview (`docx-preview/`) | 0.3.5 | Apache-2.0 | jsDelivr `docx-preview` |
| mammoth (`mammoth/`) | 1.6.0 | BSD-2-Clause | cdnjs `mammoth` |
| crypto-js (`crypto-js/`) | 4.2.0 | MIT | cdnjs `crypto-js` |
| cfb (`cfb/`) | 1.2.2 | Apache-2.0 | npm `cfb` (SheetJS, `dist/cfb.min.js`) |
| ssf (`ssf/`) | 0.11.2 | Apache-2.0 | npm `ssf` (SheetJS number-format formatter) |
| React (`react/`) | 18.3.1 | MIT | npm `react` (`umd/react.production.min.js`) |
| ReactDOM (`react-dom/`) | 18.3.1 | MIT | npm `react-dom` (`umd/react-dom.production.min.js`) |
| Fortune-sheet (`fortune-sheet/`) | 1.0.4 | MIT | npm `@fortune-sheet/react` (`dist/index.umd.min.{js,css}`) |
| LuckyExcel (`luckyexcel/`) | 1.0.1 | MIT | npm `luckyexcel` (`dist/luckyexcel.umd.js`) |
| ZXing for JS (`zxing/`) | 0.21.3 | MIT | npm `@zxing/library` (`umd/index.min.js`) |
| bwip-js (`bwip-js/`) | 4.11.2 | MIT | npm `bwip-js` (`dist/bwip-js-min.js`) |
| pdf-lib (`pdf-lib/`) | 1.17.1 | MIT | cdnjs `pdf-lib` |
| html2canvas (`html2canvas/`) | 1.4.1 | MIT | cdnjs `html2canvas` |
| @pdf-lib/fontkit (`fontkit/`) | 1.1.1 | MIT | npm `@pdf-lib/fontkit` (`dist/fontkit.umd.min.js`) |
| Noto Sans JP / Noto Serif JP (`fonts/noto-jp/`) | 1.0 (see below) | SIL OFL 1.1 | google/fonts `NotoSansJP[wght].ttf` / `NotoSerifJP[wght].ttf` |

Each library retains its original copyright and license headers within the
minified file. These are unmodified redistributions of the published builds.

## Updating

When bumping a version:
1. Download the new build, place it under `libs/<lib>/<version>/`.
2. Recompute the SRI hash:
   ```python
   import urllib.request, hashlib, base64
   data = open('<file>.js','rb').read()
   print('sha384-' + base64.b64encode(hashlib.sha384(data).digest()).decode())
   ```
3. Update the URL **and** the SRI hash in the consuming plugin and rebuild:
   - kw-file-preview … `src/js-src/desktop.js` の `LIBS` テーブル
   - kw-file-export … `src/js-src/desktop.js` の `JSZIP_URL` / `JSZIP_SRI`
   - kw-barcode-assist … `src/js-src/libLoader.js` の `LIBS` テーブル
   - kw-sheet-edit … `src/js-src/desktop.js` の `XLSX_URL` / `XLSX_SRI`
4. Keep the old version directory until no released plugin references it.

## Current SRI hashes (sha384)

| File | Hash |
|---|---|
| `zxing/0.21.3/index.min.js` | `sha384-BzBxP10ZE72aitqj5UMmUsbKFliP/DZqA8Wq+BNNhlIJDGoEd1tpkMYXOg9+n6sB` |
| `bwip-js/4.11.2/bwip-js-min.js` | `sha384-VbQbJ4aJ4PLsY0NaBjZInaxwnzZX4fLCh/6qwqxtAMRGEpnY11GEhgxaJNFtQvBu` |
| `xlsx/0.20.3/xlsx.mini.min.js` | `sha384-NG/W3xvO3ynQEcDQYIOcZTXRtwUs83cLv1FIl9PuqWPDuNhsMRF6wutlNLFwlb71` |

## fonts/noto-jp/1.0/ — Japanese fonts for PDF text embedding

Consumed by **kw-pdf-edit** (F-05 text insertion). Loaded lazily — only when the
user first picks the text tool — and embedded into the output PDF with
`embedFont(bytes, { subset: true })`.

| File | Family | Charset | Glyphs | Size |
|---|---|--:|--:|--:|
| `noto-sans-jp-std.ttf` | Noto Sans JP | standard | 5,440 | 1.4 MB |
| `noto-sans-jp-full.ttf` | Noto Sans JP | full | 17,083 | 5.2 MB |
| `noto-serif-jp-std.ttf` | Noto Serif JP | standard | 5,440 | 2.0 MB |
| `noto-serif-jp-full.ttf` | Noto Serif JP | full | 17,082 | 7.3 MB |

License: SIL Open Font License 1.1 (`OFL.txt` is co-hosted in the same folder).

### Why TTF and not WOFF2

WOFF2 would transfer smaller, but **pdf-lib's subsetter does not work on a
WOFF2-decoded font**. Measured with the same "承認済 2026年8月21日 ABC" string:

| Source | `subset: true` output |
|---|--:|
| TTF | **3.6 KB** |
| WOFF2 | 83 KB |

The font is fetched once per browser and cached; a generated PDF that is 80 KB
heavier is paid on *every* save and lands in the customer's kintone storage. So
TTF wins. Do not "optimise" these to WOFF2.

### How these were built

The upstream files are variable fonts (`NotoSansJP[wght].ttf` = 9.6 MB,
`NotoSerifJP[wght].ttf` = 13.6 MB). They are pinned to wght=400 and
character-subset with harfbuzz (npm `subset-font`):

```js
const subsetFont = require('subset-font');
await subsetFont(variableFontBuffer, charactersToKeep, {
  targetFormat: 'truetype',
  variationAxes: { wght: 400 }        // instancing; outlines really are Regular
});
```

The **standard** charset is ASCII + Latin-1 + kana + CJK punctuation + fullwidth
forms + enclosed/squared forms + box drawing + arrows/math + Greek + Cyrillic +
**JIS X 0208 level-1 kanji** (ku 16–47, derived by converting each ku-ten cell
through Shift_JIS). The **full** charset is every codepoint the upstream font
covers.

One gotcha: harfbuzz instancing updates `OS/2.usWeightClass` but **leaves the
`name` table alone**, so the files still announced themselves as
"Noto Sans JP Thin" (the variable font's default instance) and PDFs listed the
embedded font under that name. The name records were rewritten in place — each
record carries its own (offset, length) into the string storage, so a *shorter*
replacement needs no table to move — and the `name` table checksum plus
`head.checkSumAdjustment` were recomputed.

Verify after any rebuild:

```js
const f = require('@pdf-lib/fontkit').create(fs.readFileSync(file));
f.familyName;                 // "Noto Sans JP"    (not "... Thin")
f.postscriptName;             // "NotoSansJP"
f['OS/2'].usWeightClass;      // 400
```

### SRI

These are fetched with `fetch()` (pdf-lib needs an ArrayBuffer), so a
`<script integrity>` attribute cannot be used. `kw-pdf-edit`'s
`src/js-src/fontLoader.js` holds the SHA-384 of each file and verifies it with
`crypto.subtle.digest` after download. **Recompute and update those constants
whenever a font file changes.**
