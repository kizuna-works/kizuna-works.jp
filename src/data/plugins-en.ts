// English names and copy for the kintone plugins (the /en/ site).
//
// Keyed by the plugin `id` in plugins.ts, which stays the single source for slugs,
// images, tiers and status. Every published plugin needs an entry here (the English
// catalogue lists them all); only entries with `page` get their own English product
// page under /en/plugins/<slug>/ — the others link to the Japanese page.
//
// Product pages are kept in ./plugins-en/pages/<id>.ts so each can be written and
// reviewed on its own. Write for readers who use kintone in English: plain words,
// kintone's own English UI terms (record list, record details, field, subtable,
// process management, lookup, related records, space field), no Japanese-only idioms.

import fieldStyler from './plugins-en/pages/kw-field-styler';
import filePreview from './plugins-en/pages/kw-file-preview';
import conditionalNumbering from './plugins-en/pages/kw-conditional-numbering';
import lookupSuggest from './plugins-en/pages/kw-lookup-suggest';
import conditionalForm from './plugins-en/pages/kw-conditional-form';
import quickSearch from './plugins-en/pages/kw-quick-search';
import sheetEdit from './plugins-en/pages/kw-sheet-edit';
import themeStyler from './plugins-en/pages/kw-theme-styler';
import quickSideView from './plugins-en/pages/kw-quick-side-view';
import quickTab from './plugins-en/pages/kw-quick-tab';

export interface PluginEnScreenshot {
  /** Existing image under /public (the screens show the Japanese UI). */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface PluginEnPage {
  /** <title>, 50-65 characters, ends with " | KIZUNA Works". */
  metaTitle: string;
  /** meta description, 120-160 characters. */
  metaDescription: string;
  /** Hero definition sentence: "<Name> is a free kintone plugin that ...". 25-45 words. */
  definition: string;
  /** Three short benefit bullets shown under the hero. */
  highlights: [string, string, string];
  /** Problems the plugin solves, phrased as the user's pain. 3 items. */
  problems: { title: string; desc: string }[];
  /** Main features. 6-12 items. */
  features: { title: string; desc: string }[];
  /** 1-3 screenshots reused from the Japanese page. */
  screenshots: PluginEnScreenshot[];
  /** Limitations and notes (screens it runs on, browser, etc.). */
  notes: string[];
  /** Optional FAQ; rendered as FAQPage JSON-LD too, so keep it identical to the text. */
  faqs?: { q: string; a: string }[];
  /** YYYY-MM-DD of the last content change on this English page. */
  dateModified: string;
}

export interface PluginEn {
  /** English product name, "<Name> for kintone". */
  name: string;
  /** One or two sentences for the catalogue card. Lead with what it does. */
  summary: string;
  page?: PluginEnPage;
}

export const pluginsEn: Record<string, PluginEn> = {
  // ---- Free plugins -------------------------------------------------------
  'kw-field-styler': {
    name: 'Field Styler for kintone',
    summary: 'Style fields without code: background and text colors, fonts, sizes, label colors and conditional styles (up to 10 conditions, including "this month"), on detail, create, edit and print screens.',
    page: fieldStyler,
  },
  'kw-conditional-numbering': {
    name: 'Conditional Auto Numbering for kintone',
    summary: 'Assign sequential numbers that switch rules by field values such as department or category. Sub-numbers per product ID, up to 3 numbers at once, bulk numbering after CSV import and duplicate repair.',
    page: conditionalNumbering,
  },
  'kw-form-deco': {
    name: 'FormDeco for kintone',
    summary: 'Decorate the record form without code: border styles, and space fields as headings, text, images, callouts and link buttons. Collapsible headings, sticky headings and page breaks for printing.',
  },
  'kw-lookup-suggest': {
    name: 'Lookup Suggest for kintone',
    summary: 'Show lookup candidates live as you type and pick one with the arrow and Enter keys, without opening the lookup dialog. Searches several fields at once and works inside subtables and on mobile.',
    page: lookupSuggest,
  },
  'kw-quick-search': {
    name: 'Quick Search for kintone',
    summary: 'Add a search bar to the record list. AND/OR keyword search across fields, exact phrases, date ranges, user and organization fields, related records and attachment file names.',
    page: quickSearch,
  },
  'kw-file-icon-marker': {
    name: 'Attachment Icons for kintone',
    summary: 'Show whether each record has attachments, their file types and how many, as icons in the record list. 28 file-type icons with count badges.',
  },
  'kw-quick-side-view': {
    name: 'Quick Side View for kintone',
    summary: 'Click a row in the record list to open the record in a side panel. View and edit up to 5 records side by side without leaving the list.',
    page: quickSideView,
  },
  'kw-record-lock': {
    name: 'Record Lock for kintone',
    summary: 'Lock records automatically by status, date or field values. Lock the whole record or chosen fields, set different rules per status, and exempt chosen users.',
  },
  'kw-field-comment': {
    name: 'Field Comment for kintone',
    summary: 'Add help icons or always-visible comments next to field labels, group headings and form labels. Hover, click or always-on display, also on create and edit screens.',
  },
  'kw-theme-styler': {
    name: 'Theme Styler for kintone',
    summary: 'Color the whole app at once: header, rows, borders and form background. Add a title band with links to related apps, your portal or external sites.',
    page: themeStyler,
  },
  'kw-address-assist': {
    name: 'Address Assist for kintone',
    summary: 'Fill in addresses from Japanese postal codes and the other way round, embed a Google Maps preview and copy addresses in one click. Designed for Japanese addresses.',
  },
  'kw-quick-history-view': {
    name: 'Quick History View for kintone',
    summary: 'Record who changed which field, from what to what and when, on every save, and show it as a timeline table on the record details screen.',
  },
  'kw-related-record-popup': {
    name: 'Related Records Popup for kintone',
    summary: 'Hover an icon on a list row to see its related records in a popup, without opening the record. Tabs for several related-records fields and automatic paging.',
  },
  'kw-summary-bar': {
    name: 'Summary Bar for kintone',
    summary: 'Show sum, average, max, min and count cards above the record list. Recalculates as you filter, totals hours and minutes, and colors cards by value.',
  },
  'kw-csv-export': {
    name: 'Easy CSV Export for kintone',
    summary: 'Export the filtered list to CSV in one click with saved templates for columns, header names, encoding and conditions. Subtable rows, related records and up to 500 columns.',
  },
  'kw-quick-tab': {
    name: 'Quick Tab for kintone',
    summary: 'Split long record forms into tabs automatically, using space fields as boundaries. An "All" tab, required-field error jump, sticky tab bar and per-tab visibility rules.',
    page: quickTab,
  },
  'kw-file-preview': {
    name: 'File Preview for kintone',
    summary: 'Preview attached images, PDF, Excel, Word, PowerPoint and text files full-screen without downloading. Zoom, print, browse several files in a row, and open password-protected files in the browser.',
    page: filePreview,
  },
  'kw-quick-toc': {
    name: 'Quick Table of Contents for kintone',
    summary: 'Show a table-of-contents side menu on record screens. Jump to a section in one click or show only that section, with conditions per status or field value.',
  },
  'kw-list-styler': {
    name: 'List Styler for kintone',
    summary: 'Show subtable rows as rows of the record list, freeze key columns, add zebra stripes, row numbers and hover, and color rows by date, choice or empty-value conditions.',
  },
  'kw-input-assist': {
    name: 'Input Assist for kintone',
    summary: 'Pick values from past entries or other apps, clean up pasted values with per-field dictionaries, open narrow fields in a large editor, guide input order and check duplicates before saving.',
  },
  'kw-conditional-form': {
    name: 'Conditional Form for kintone',
    summary: 'Show, hide, require, lock, auto-fill and filter fields by conditions on values, status or user. Validate formats, and stop or confirm before save, approve or delete.',
    page: conditionalForm,
  },
  'kw-sheet-edit': {
    name: 'Sheet Edit for kintone',
    summary: 'Turn a custom view into a spreadsheet-style grid and edit records in place. Copy and paste, range edit, autofill, subtable rows, conditional colors, frozen columns and Excel export.',
    page: sheetEdit,
  },
  'kw-sticky-board': {
    name: 'Sticky Board for kintone',
    summary: 'Pin sticky notes on records, address them to people and get "Got it" replies back. Category counts above the list and note marks on each row keep hand-overs from getting lost.',
  },
  'kw-mail-assist': {
    name: 'Mail Assist for kintone',
    summary: 'Build the subject, body and recipients from record values and open your mail client in one click. Templates, several recipient fields, subtable values and BCC.',
  },
  'kw-comment-control': {
    name: 'Comment Control for kintone',
    summary: 'Open records with the comment sidebar collapsed for more space, and show color-coded comment count badges in the record list with full-text previews.',
  },
  'kw-user-autofill': {
    name: 'User Autofill for kintone',
    summary: 'Copy the selected user\'s organization, title, email and other profile data into fields automatically. Show profile cards and approval stamps that also print.',
  },
  'kw-bulk-update': {
    name: 'Easy Bulk Update for kintone',
    summary: 'Update or clear one field across every record in the filtered list. Add or subtract numbers, undo right away, and roll back later from the change history.',
  },
  'kw-excel-paste': {
    name: 'Excel Paste for kintone',
    summary: 'Paste a table from Excel to fill many subtable rows or create many records at once. Preview the values first; header rows are matched to fields automatically.',
  },
  'kw-ambiguous-match': {
    name: 'Fuzzy Match for kintone',
    summary: 'While you type a company or customer name, show similar existing records despite spelling variations, so duplicates are caught before saving. Tuned for Japanese name variants.',
  },
  'kw-status-bulk-action': {
    name: 'Status Bulk Action for kintone',
    summary: 'Run process management actions on many records at once from the record list. Groups records by status, sets the next assignee automatically and skips records that fail your conditions.',
  },
  'kw-accordion-tab': {
    name: 'Accordion Tab for kintone',
    summary: 'Split long record forms into collapsible sections using space fields as headings. Completion badges, sticky headings and per-user or password-protected sections.',
  },
  'kw-elapsed-assist': {
    name: 'Elapsed Time Assist for kintone',
    summary: 'Calculate elapsed days, years, age, days remaining and tenure from a date field, refreshed to today on every view, and add durations to a start date or time.',
  },
  'kw-reuse-control': {
    name: 'Reuse Control for kintone',
    summary: 'Choose which fields and subtable columns are kept when a record is reused; everything else is cleared. Different patterns per user, organization or group.',
  },
  'kw-record-recovery': {
    name: 'Record Recovery for kintone',
    summary: 'Back up a record, attachments included, just before it is deleted, and restore it later from the record list or the settings in one click.',
  },
  'kw-read-check': {
    name: 'Read Check for kintone',
    summary: 'Log who opened each record automatically and show who read it, when and how many times in a sidebar tab. Logs are kept in a separate app.',
  },
  'kw-text-join': {
    name: 'Text Join for kintone',
    summary: 'Join values from several fields, including drop-downs, users and dates, into one text field with formatting. Subtable rows, conditional rules and duplicate checks.',
  },
  'kw-view-control': {
    name: 'View Control for kintone',
    summary: 'Show or hide record list views and graphs per user, organization or group, choose which view opens first, and guard direct links to hidden views.',
  },
  'kw-table-assist': {
    name: 'Table Assist for kintone',
    summary: 'Reorder subtable rows by drag and drop, duplicate and move rows, total only the ticked rows into a number field, and page or filter long tables.',
  },
  'kw-file-export': {
    name: 'Attachment Export for kintone',
    summary: 'Download the attachments of filtered or selected records as one ZIP with your own folder structure and file names. Type filter, size estimate and automatic splitting.',
  },
  'kw-after-save': {
    name: 'After-Save Navigation for kintone',
    summary: 'Choose where kintone goes after saving: the record, a new record form, a list view, another app or a URL. Separate settings for create and edit, and per user or value.',
  },
  'kw-lottery-roulette': {
    name: 'Lottery Roulette for kintone',
    summary: 'Assign people or categories automatically: random, round-robin, load-balanced or weighted, with a roulette animation. Assign many records at once from the list.',
  },
  'kw-autosave-assist': {
    name: 'Autosave Assist for kintone',
    summary: 'Save a record automatically when the create or edit screen is left idle, so input is never lost. Autosaved records are marked in the list.',
  },
  'kw-link-assist': {
    name: 'Link Assist for kintone',
    summary: 'Clean URLs on save: remove tracking parameters and normalize scheme, www, trailing slash and query order to prevent duplicates. Turns mail and phone values into links.',
  },
  'kw-clip-assist': {
    name: 'Copy Assist for kintone',
    summary: 'Copy selected rows, the current page or every filtered record, or a field, a whole record or a subtable, to the clipboard. Numbers and dates paste correctly into Excel.',
  },
  'kw-split-view': {
    name: 'Split View for kintone',
    summary: 'Split record screens into two independently scrolling panes at two space fields, so distant fields can be compared side by side. Width is remembered per user.',
  },
  'kw-table-preview': {
    name: 'Table Preview for kintone',
    summary: 'Add a column to the record list that shows each record\'s subtable row count and totals as a badge. Hover to see the rows, and edit them in place.',
  },
  'kw-image-compress': {
    name: 'Image Compress for kintone',
    summary: 'Compress attached images automatically right after saving, including photos in subtables. Choose a preset or a size limit, and compress existing records in bulk.',
  },
  'kw-footprint': {
    name: 'Footprint for kintone',
    summary: 'Show who viewed and who edited each record as marks in a list column and next to fields. See who has not looked yet and filter to those records.',
  },
  'kw-date-assist': {
    name: 'Date Input Assist for kintone',
    summary: 'Speed up date and time entry: quick-pick buttons such as "end of last month", business-day aware calendars and shorthand like +3. Works in subtables and on mobile.',
  },
  'kw-my-shortcut': {
    name: 'My Shortcut for kintone',
    summary: 'Register values you type often to your own shortcut keys, then fill a field by pressing the key. Personal and shared entries, up to 5,000 characters each.',
  },

  // ---- KIZUNA Pro ------------------------------------------------------------
  'kw-bridge': {
    name: 'KIZUNA Bridge for kintone',
    summary: 'Automate work across apps with rules: create and update records in other apps, advance statuses and fill subtable rows on save or at the press of a button, and connect KIZUNA Works plugins.',
  },
  'kw-search-pro': {
    name: 'Search Pro for kintone',
    summary: 'Search, filters, summary cards and CSV export in one plugin, linked by one set of conditions. Saved conditions and bulk actions on the results.',
  },
  'kw-lookup-pro': {
    name: 'Lookup Pro for kintone',
    summary: 'Live suggestions, candidate filtering, registering new master records in place, free lookups and master sync in one plugin with one settings screen.',
  },
  'kw-file-pro': {
    name: 'File Pro for kintone',
    summary: 'Attachment preview, list icons, ZIP export, image compression and PDF editing in one plugin, plus storage reports, attachment search and download restrictions.',
  },
  'kw-design-pro': {
    name: 'Design Pro for kintone',
    summary: 'Six design plugins in one: field styles, form decoration, themes, comment control, user autofill and printable reports, plus display patterns and print layouts.',
  },
  'kw-portal-pro': {
    name: 'Portal Pro for kintone',
    summary: 'Build the kintone portal and space portals from widgets by drag and drop: app lists, notices, record lists, charts, cards, calendars and quick entry forms.',
  },

  // ---- Premium plugins -------------------------------------------------------
  'kw-report-designer': {
    name: 'Report Designer for kintone',
    summary: 'Place record values and subtable rows on your own PDF or a blank page to create printable forms and reports. Shapes, tables, check marks and stamps.',
  },
  'kw-dashboard': {
    name: 'Dashboard for kintone',
    summary: 'Charts, number cards and cross tabs on one always-on dashboard in a custom view. A shared period selector, cross-app totals and custom fiscal periods.',
  },
  'kw-attribute-filter': {
    name: 'Attribute Filter for kintone',
    summary: 'Narrow user, organization and group choices by the person\'s organization, title, other field values or status, and block values outside the list on save.',
  },
  'kw-lookup-sync': {
    name: 'Lookup Sync for kintone',
    summary: 'Push changes in master records to the lookup copies in other apps automatically. Target apps and fields are found by scanning.',
  },
  'kw-related-enhancer': {
    name: 'Related Records Enhancer for kintone',
    summary: 'Add totals, styling, search and grouping to related-records lists, aggregate subtable rows from other apps, and write the totals back to fields.',
  },
  'kw-card-board': {
    name: 'Card Board for kintone',
    summary: 'Show the record list as a two-tier kanban board and drag cards to change status, choices or text values. Totals per lane and attachment thumbnails.',
  },
  'kw-chat-notify': {
    name: 'Chat Notify for kintone',
    summary: 'Send record events (create, update, delete, status change) to Slack, Microsoft Teams, Google Chat, LINE WORKS or Chatwork with templates and conditions.',
  },
  'kw-sidebar-enhancer': {
    name: 'Sidebar Enhancer for kintone',
    summary: 'Add tabs to the record sidebar: create records in other apps, preview URLs and maps, status history with days in status, checklists and an app guide.',
  },
  'kw-input-template': {
    name: 'Input Template for kintone',
    summary: 'Fill several fields and subtable rows at once by picking a saved set of values. Shared templates from admins and personal templates for each user.',
  },
  'kw-barcode-assist': {
    name: 'Barcode Assist for kintone',
    summary: 'Scan barcodes and QR codes with a phone camera or a scanner to fill fields, find records and check planned against actual, and print A4 label sheets.',
  },
  'kw-pdf-edit': {
    name: 'PDF Edit Assist for kintone',
    summary: 'Add stamps, handwriting, text, shapes and arrows to attached PDFs and save them. A mobile signing mode, true redaction and version history.',
  },
  'kw-calendar-view': {
    name: 'Calendar View for kintone',
    summary: 'Show records on year, month, week, day and list calendars and on timelines per person or room. Drag to reschedule, find free time, warn on double booking, and switch time zones.',
  },
  'kw-drive-connect': {
    name: 'Google Drive Connect for kintone',
    summary: 'Move attachments to Google Drive and keep only the link in kintone. Per-record folders, no double transfers, and optional deletion to save storage.',
  },
  'kw-lookup-filter': {
    name: 'Lookup Filter for kintone',
    summary: 'Turn the lookup dialog into a searchable screen and narrow candidates by values on the record you are editing. Handles masters with tens of thousands of records.',
  },
  'kw-form-connect': {
    name: 'Google Forms Connect for kintone',
    summary: 'Import Google Forms responses into a kintone app through the response spreadsheet. Map columns to fields in a table, with no script and no duplicates.',
  },
  'kw-lookup-add': {
    name: 'Lookup Add for kintone',
    summary: 'Register a master record that is missing from the lookup without leaving the record you are typing, then fetch it right away. Shows similar records first.',
  },
  'kw-annotation': {
    name: 'Annotation Assist for kintone',
    summary: 'Pin notes where kintone cannot place a label, such as next to a button or at the top of the screen. Place them by dragging, and show them by status or viewer.',
  },
  'kw-sheets-sync': {
    name: 'Spreadsheet Sync for kintone',
    summary: 'Two-way sync between Google Sheets and kintone. Rows entered in the sheet become records, and kintone edits are written back to the same row.',
  },
  'kw-quick-filter': {
    name: 'Quick Filter for kintone',
    summary: 'Put filter boxes above the record list and filter by picking values with counts. Works with subtable values, lookups, related records and date ranges.',
  },
  'kw-horizontal-sheet': {
    name: 'Horizontal Sheet for kintone',
    summary: 'A custom view that lays records out as columns under up to three header levels, with in-place editing, aggregate columns and conditional formatting.',
  },
  'kw-free-lookup': {
    name: 'Free Lookup for kintone',
    summary: 'Add Fetch and Clear buttons to a text field and copy values from records in another app, without a lookup field. Switch source apps and fetch per subtable row.',
  },
  'kw-box-connect': {
    name: 'Box Connect for kintone',
    summary: 'Move attachments to Box and keep only the link in kintone. Per-record folders, shared links, bulk transfer from the list and adding files to Box directly.',
  },
  'kw-record-acl-assist': {
    name: 'Record Permission Assist for kintone',
    summary: 'Fill the fields used by record permissions from the record\'s own values on every save, including parent organizations and mapped values.',
  },
};
