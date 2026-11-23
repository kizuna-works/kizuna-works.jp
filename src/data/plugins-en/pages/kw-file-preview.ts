import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'File Preview - Free kintone Attachment Preview | KIZUNA Works',
  metaDescription:
    'File Preview is a free kintone plugin that previews attached images, PDF, Excel, Word, PowerPoint and text files in place, with zoom and print. No download.',
  definition:
    'File Preview is a free kintone plugin that opens attached images, PDF, Excel, Word, PowerPoint and text files in a preview window when you click the file name, with no download and no page change.',
  highlights: [
    'Click a file name on the record list or record details screen to preview it',
    'Excel formatting and charts, Word page layout and PowerPoint slides are rendered',
    'File contents stay in your browser and are never sent outside kintone',
  ],
  problems: [
    {
      title: 'Every attachment means another download',
      desc: 'To check a file you download it, open it and delete it later. File Preview shows it on the spot.',
    },
    {
      title: 'Checking files on the list takes many clicks',
      desc: 'Opening each record to reach its attachment is slow. Previews open straight from the record list.',
    },
    {
      title: 'Several files in one field are tedious to compare',
      desc: 'Browse every file in the same attachment field with Previous/Next, thumbnails or the arrow keys.',
    },
  ],
  features: [
    {
      title: 'Password-protected files',
      desc: 'Password-protected PDF, Excel and Word files are decrypted and shown inside the browser. Nothing is sent outside.',
    },
    {
      title: 'Preview by clicking the file name',
      desc: 'On the record list and record details screen, clicking an attachment\'s file name opens it in a preview window.',
    },
    {
      title: 'Rendering per file type',
      desc: 'Images fit to the screen, PDFs are drawn page by page, Excel keeps column widths, merged cells, colors, fonts and borders and redraws charts, Word keeps the page layout, PowerPoint shows each slide, and text/CSV encoding is detected automatically.',
    },
    {
      title: 'Attachments in related records and subtables',
      desc: 'Preview attachments of the source app shown in a related records field, with no plugin needed in that app. Attachments inside subtables can be previewed on the record details screen.',
    },
    {
      title: 'Browse several files in a row',
      desc: 'Move through files in the same field with Previous/Next, the thumbnail strip or the left and right arrow keys. You can switch the arrow keys to page turning and use Shift + arrow keys for files.',
    },
    {
      title: 'Large, medium and small window',
      desc: 'Large is full screen. Medium and small float over the record screen without darkening it, so you can keep scrolling and working behind them, and they can be dragged.',
    },
    {
      title: 'Zoom PDFs and images',
      desc: 'Zoom from 25% to 400% with the toolbar, Ctrl + mouse wheel or Ctrl + plus/minus/0, or fit to width. PDFs are redrawn at each zoom level so small text stays sharp.',
    },
    {
      title: 'Print PDFs and images',
      desc: 'Print from the toolbar. PDFs print as the original file with all pages, and the toolbar shows the current page number. You can choose which users, organizations or groups see the Print button.',
    },
    {
      title: 'Open in a new tab',
      desc: 'Open PDFs, images and text files in a new browser tab, for example to search a PDF with Ctrl + F. You can also make a file name click open a new tab instead of the preview.',
    },
    {
      title: 'Large file guard and download',
      desc: 'Files above a size you set ask for confirmation before opening. The current file can be downloaded from the preview.',
    },
    {
      title: 'Works with other KIZUNA Works plugins',
      desc: 'With PDF Edit Assist in the same app, an Edit button lets you add stamps, handwriting, text and shapes to the PDF you are viewing. Card Board cards can also open previews.',
    },
  ],
  screenshots: [
    {
      src: '/images/file-preview-after.png',
      alt: 'kintone record list where clicking an attachment file name opens a PDF contract in a full-screen preview',
      width: 1909,
      height: 873,
      caption: 'Click a file name on the record list to preview the PDF',
    },
    {
      src: '/images/file-preview-action-02.png',
      alt: 'Excel invoice previewed in kintone with merged cells, background colors, borders and number formats kept',
      width: 1106,
      height: 780,
      caption: 'Excel formatting is reproduced',
    },
    {
      src: '/images/file-preview-action-01.png',
      alt: 'Word application form previewed with its page layout, with thumbnails of other attached files at the bottom',
      width: 1108,
      height: 780,
      caption: 'Word layout and thumbnails of the other files',
    },
  ],
  notes: [
    'Works on the record list and record details screen (desktop). Not supported in calendar views, custom views or kintone mobile.',
    'The preview opens from the file name link. Clicking an image thumbnail opens kintone\'s standard preview; to use this plugin for images too, turn off thumbnail display under App Settings > Advanced Settings.',
    'Supported formats: images (jpg, jpeg, png, gif, webp, svg, bmp), PDF, Excel (xlsx), Word (docx), PowerPoint (pptx) and text (txt, csv, json, md, log). Older formats (xls, doc, ppt), zip and others download as usual.',
    'Office files are shown as an approximation for quick checks. Fonts, layout and some elements (decorative shapes, embedded objects, photos and other images) may look different or not appear.',
    'Excel charts are redrawn from the sheet data, so colors and details may differ. Images, shapes and conditional formatting in Excel are not reproduced.',
    'PDFs show the first 50 pages; download the file to see the rest.',
    'Viewer libraries for PDF, Excel and Word are loaded from kizuna-works.jp with SRI on first use. File contents are never sent outside. Strict network or CSP restrictions may block these formats; images and text need no library.',
    'Recommended browsers: the latest Google Chrome or Microsoft Edge.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'Which file formats can be previewed?',
      a: 'Images (jpg, jpeg, png, gif, webp, svg, bmp), PDF, Excel (xlsx), Word (docx), PowerPoint (pptx) and text (txt, csv, json, md, log). Excel keeps column widths, merged cells, colors, fonts, borders, alignment and charts, Word keeps the page layout, and PowerPoint shows each slide. Older formats (xls, doc, ppt) and zip are not supported and download as usual when clicked.',
    },
    {
      q: 'Are attachment contents sent outside kintone?',
      a: 'No. Files are fetched from kintone and shown only in your browser. Only the viewer libraries needed for PDF, Excel and Word are loaded from our server (kizuna-works.jp) with SRI, the first time that format is opened. No third-party CDN is used. Images and text need no library.',
    },
    {
      q: 'Can I open large files?',
      a: 'Yes. Files that may take time to display ask for confirmation first. The threshold can be changed in the plugin settings (default 20 MB, 0 for no limit). PDFs show the first 50 pages; download the file to see the rest.',
    },
    {
      q: 'Can I print the PDF or image I am previewing?',
      a: 'Yes. While previewing a PDF or image, Print in the toolbar opens the browser\'s print dialog. PDFs print as the original file with all pages, and you choose the page range in the print dialog. Password-protected PDFs print the pages shown (up to the first 50). Excel, Word, PowerPoint and text files cannot be printed.',
    },
    {
      q: 'Can I keep working on the record while the preview is open?',
      a: 'Yes. With the medium or small size, the preview floats over the record screen and the background is not darkened, so you can scroll and work behind it. Drag the empty part of the toolbar to move it. Large is full screen, and on screens 640 px wide or less every size is full screen.',
    },
    {
      q: 'Does it work on mobile or in calendar views?',
      a: 'It works on the record list and record details screen (desktop). It does not work on kintone mobile or in calendar and custom views. Attachments inside subtables can be previewed on the record details screen, not on the record list.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
