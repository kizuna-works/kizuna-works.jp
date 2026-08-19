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
