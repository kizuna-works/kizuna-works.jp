# /libs/ — self-hosted preview libraries

These third-party JavaScript libraries are served from kizuna-works.jp (our own
origin) so plugins can load them at runtime **with Subresource Integrity (SRI)**
and **without depending on a third-party CDN**. They are used only by the
"添付ファイルプレビュー for kintone" (kw-file-preview) plugin, loaded lazily
(only when a file of that type is first previewed). File contents handled by the
plugin are never sent to any external server.

GitHub Pages serves these with `Access-Control-Allow-Origin: *`, so cross-origin
SRI loads (`crossorigin="anonymous"` + `integrity`) work from a customer's
kintone domain.

| Library | Version | License | Source (mirror of) |
|---|---|---|---|
| PDF.js (`pdfjs/`) | 3.11.174 | Apache-2.0 | cdnjs `pdf.js` |
| ExcelJS (`exceljs/`) | 4.4.0 | MIT | cdnjs `exceljs` |
| SheetJS / xlsx (`xlsx/`) | 0.18.5 | Apache-2.0 | cdnjs `xlsx` |
| JSZip (`jszip/`) | 3.10.1 | MIT / GPLv3 (dual) | cdnjs `jszip` |
| Chart.js (`chartjs/`) | 4.4.1 | MIT | cdnjs `Chart.js` |
| docx-preview (`docx-preview/`) | 0.3.5 | Apache-2.0 | jsDelivr `docx-preview` |
| mammoth (`mammoth/`) | 1.6.0 | BSD-2-Clause | cdnjs `mammoth` |
| crypto-js (`crypto-js/`) | 4.2.0 | MIT | cdnjs `crypto-js` |
| cfb (`cfb/`) | 1.2.2 | Apache-2.0 | npm `cfb` (SheetJS, `dist/cfb.min.js`) |
| ssf (`ssf/`) | 0.11.2 | Apache-2.0 | npm `ssf` (SheetJS number-format formatter) |

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
3. Update the URL **and** the SRI hash in the plugin's `desktop.js` `LIBS` table
   (SECRET/kintone_plugin_workspace/kw-file-preview/src/js-src/desktop.js) and rebuild.
4. Keep the old version directory until no released plugin references it.
