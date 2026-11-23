import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Sheet Edit for kintone - Free Spreadsheet Plugin | KIZUNA Works',
  metaDescription: 'Free kintone plugin that turns a custom view into a spreadsheet grid. Edit cells in place, copy and paste, autofill, filter all records and export to Excel.',
  definition: 'Sheet Edit is a free kintone plugin that turns a record list custom view into a spreadsheet-like grid, so you can edit many records in place with copy and paste, range editing and autofill, then save them together.',
  highlights: [
    'Edit records in a spreadsheet grid, no record screens',
    'Copy and paste, range edit, autofill, undo and redo',
    'Filter all records, color rows and export to Excel',
  ],
  problems: [
    {
      title: 'Opening every record to fix one value',
      desc: 'To change a value you open each record, click edit and save, one by one. Sheet Edit lets you edit the cells directly on the list.',
    },
    {
      title: 'Exporting to a spreadsheet and importing back',
      desc: 'Bulk changes often mean exporting a CSV, editing it in a spreadsheet and importing it again. Sheet Edit gives you spreadsheet editing inside kintone.',
    },
    {
      title: 'Overwriting changes made by others',
      desc: 'When several people update the same records, changes can be lost. Sheet Edit checks the revision and warns instead of overwriting.',
    },
  ],
  features: [
    {
      title: 'Spreadsheet-style grid',
      desc: 'A custom view is drawn as a grid with row numbers, a sticky header and borders, plus active cell outline, row hover and zebra stripes. Freeze 0 to 5 columns from the left.',
    },
    {
      title: 'Edit cells by field type',
      desc: 'Edit text, numbers, date, time and date-time pickers, drop-downs, radio buttons, multi-choice and check boxes right in the cell. Press Tab to confirm and move down the same column.',
    },
    {
      title: 'Three ways to save',
      desc: 'Save automatically when you move to another row, with the Save button, or with Ctrl+S. Records are saved one by one, so only the rows that fail are left to fix.',
    },
    {
      title: 'Range edit, copy and paste, autofill',
      desc: 'Select cells in a column with Shift and apply one value to all of them. Use Ctrl+C / Ctrl+V with the system clipboard, and drag the fill handle to copy down or continue a series (numbers, dates, times, zero-padded codes such as A-001).',
    },
    {
      title: 'Undo and redo',
      desc: 'Ctrl+Z / Ctrl+Y undo and redo up to 300 operations. Autofill and range edits are undone as one operation.',
    },
    {
      title: 'Conflict detection',
      desc: 'If someone else updated a record after you loaded it, the plugin warns instead of overwriting. Failed rows and cells are highlighted with the reason, and your input is kept.',
    },
    {
      title: 'Over 10,000 records',
      desc: 'Records are loaded in blocks of 1,000, split into sheet tabs of 100 or 200 rows, so lists with more than 10,000 records keep working.',
    },
    {
      title: 'Filter and sort all records',
      desc: 'Column menus filter all records, not just the loaded block: keyword search for text, multiple choices including blank, number ranges, and date ranges with Today, This week, This month and more. Filter by subtable columns and by the logged-in user, including the process management assignee.',
    },
    {
      title: 'Opens where you left off',
      desc: 'After viewing a record or reloading, the list opens with the same filter, sort and scroll position (for 12 hours).',
    },
    {
      title: 'Column width, wrapping and a second subtable',
      desc: 'Set the width and wrapping per column. Show columns from a second subtable side by side, aligned by row number (view only).',
    },
    {
      title: 'Conditional colors and locks',
      desc: 'Color rows or chosen fields by field, operator and value conditions, including TODAY and THIS_MONTH style dates. Make matching rows or cells read-only. Changes apply as soon as the field is edited.',
    },
    {
      title: 'Excel export and themes',
      desc: 'Export all filtered records with the shown columns to an xlsx file, generated in the browser with no data sent outside. Choose from 4 tab shapes and preset or custom colors.',
    },
  ],
  screenshots: [
    {
      src: '/images/sheet-edit-after-01.png',
      alt: 'kintone record list custom view shown as a spreadsheet-like grid with row numbers, a sticky header and sheet tabs',
      width: 1925,
      height: 682,
      caption: 'A custom view becomes a spreadsheet grid.',
    },
    {
      src: '/images/sheet-edit-after-02.png',
      alt: 'Editing a cell directly in the Sheet Edit grid, with an input box open in the cell',
      width: 1925,
      height: 682,
    },
    {
      src: '/images/sheet-edit-after-03.png',
      alt: 'Several cells in one column selected in the Sheet Edit grid, ready to be edited together',
      width: 1925,
      height: 682,
      caption: 'Select a range and change it in one go.',
    },
  ],
  notes: [
    'Works only on record list views in custom view format (desktop). Paste <div class="kw-sheet-edit-root"></div> into the HTML of the target view. It does not work on table or calendar views, record screens or kintone mobile.',
    'Some fields can be shown but not edited: record number, Created by, Updated by, Created datetime, Updated datetime, status, calculated, lookup, related records, user/department/group selection, attachment, rich text and fields set to prohibit duplicate values. The same applies inside subtables.',
    'One subtable per view can be expanded. Subtable columns cannot be sorted from the header. Adding or deleting subtable rows and copying and pasting a multi-cell range are not supported; use kintone\'s standard screens to add or delete rows.',
    'Excel export uses the SheetJS xlsx library (Apache-2.0), bundled in the plugin. Nothing is loaded from an external CDN or sent to an external service.',
    'Some display details such as the sticky header and borders may look slightly different depending on browser zoom and high-DPI settings.',
    'We recommend the latest version of Google Chrome.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'Can I edit the kintone record list directly, like in Excel?',
      a: 'Yes. Sheet Edit for kintone replaces a record list custom view with an Excel-like grid where you can edit and save the shown fields in place. Without opening each record, you can update many records with copy and paste, range editing and autofill, and export the result to Excel (xlsx).',
    },
    {
      q: 'Which screens does it work on? Does it work on a normal list?',
      a: 'It works only on record list views in custom view format (desktop). In the app settings, set the target view to custom view format and paste <div class="kw-sheet-edit-root"></div> into its HTML. That view then becomes the grid. It does not work on table or calendar views, record screens or the mobile version.',
    },
    {
      q: 'When are my edits saved?',
      a: 'Choose the save mode: automatic (when you move to another row) or Save button. In both modes you can save everything with Ctrl+S (Cmd+S). Records are saved one at a time, so if some rows fail, the rows that succeeded stay saved.',
    },
    {
      q: 'Can I edit every field?',
      a: 'You can edit shown fields such as text, number, date, time, date and time, drop-down, radio button, multi-choice and check box. Record number, Created by, Updated by, Created datetime, Updated datetime, status, calculated, lookup, related records, user/department/group selection, attachment, rich text, subtable and fields set to prohibit duplicate values can be shown but not edited. Administrators can turn editing on or off for each shown field.',
    },
    {
      q: 'Will I overwrite someone else\'s changes?',
      a: 'The plugin checks the record revision when saving. If someone updated the record after you opened it, it warns you instead of overwriting (reload to get the latest). Rows and cells that failed are highlighted in red with the reason in a tooltip, and your input is kept.',
    },
    {
      q: 'Is any data sent to external services when exporting to Excel?',
      a: 'No. The Excel export button writes all filtered records with the shown columns to an xlsx file (with a record number column first). The file is generated entirely in the browser. The xlsx library (SheetJS, Apache-2.0) is bundled in the plugin and nothing is loaded from an external CDN.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
