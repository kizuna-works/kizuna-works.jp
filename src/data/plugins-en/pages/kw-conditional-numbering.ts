import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Conditional Auto Numbering - Free kintone Plugin | KIZUNA Works',
  metaDescription:
    'Conditional Auto Numbering is a free kintone plugin that assigns numbers by rules: prefixes per department, sub-numbers per product, date resets and more.',
  definition:
    'Conditional Auto Numbering is a free kintone plugin that assigns sequential numbers such as AD-00001 automatically, switching the format by field values, with sub-numbers per product ID, date-based resets and bulk numbering after CSV import.',
  highlights: [
    '18 formats built from date, text and sequence parts',
    'Different prefixes and counters per department, category or other field value',
    'Bulk numbering, duplicate repair and a preview of the next number',
  ],
  problems: [
    {
      title: 'The record number is not the number you need',
      desc: 'kintone\'s record number is a plain sequence. Business numbers often need a prefix, a date or separate counters per department.',
    },
    {
      title: 'Manual numbering causes gaps and duplicates',
      desc: 'Typing the next number by hand leads to mistakes. Numbers are assigned on save, and issued numbers are never rewritten.',
    },
    {
      title: 'Imported records have no number',
      desc: 'Records added by CSV import stay empty. One button numbers them all, following the same rules.',
    },
  ],
  features: [
    {
      title: '18 formats',
      desc: 'Combine up to 3 parts (date, text and sequence) into a number. Choose the separator (hyphen, underscore or none) and the sequence length (1 to 10 digits).',
    },
    {
      title: 'Conditional numbering',
      desc: 'Switch the text part by field values such as department or person (for example AD-00001 for division A and BD-00001 for division B), with a separate counter per condition if you like.',
    },
    {
      title: 'Sub-numbers',
      desc: 'Number from 001 for each value of a field such as a product ID: PRD-00001-001, PRD-00001-002, and PRD-00002-001 for the next product. Saving stays fast as records grow.',
    },
    {
      title: 'Up to 3 numbering fields',
      desc: 'Number up to 3 fields in one app, each with its own rule.',
    },
    {
      title: 'Reset by year, month or day',
      desc: 'With a date in the format, restart the sequence at 1 when the year, month or day changes.',
    },
    {
      title: 'Choose when to number',
      desc: 'Number on save, or only when conditions are met: a field has a value, a field is one of chosen values, or the status is one of chosen statuses. Also numbers on inline edit in the record list and on process management actions.',
    },
    {
      title: 'Base date for the date part',
      desc: 'Build the date part (YY, YYMM, YYMMDD) from the save date or from a date, datetime, created or updated field. Resets follow that date, so you can issue next year\'s numbers in advance.',
    },
    {
      title: 'Bulk numbering after CSV import',
      desc: 'Number every record with an empty numbering field from the settings page in one click, sub-numbers included, with progress shown by count.',
    },
    {
      title: 'Duplicate check and repair',
      desc: 'Find records with duplicate numbers, keep one and renumber only the sequence part of the others to unused numbers. Preview before running, and export to CSV.',
    },
    {
      title: 'Next number preview',
      desc: 'See the next number for each condition, counted from existing records, so you can check where numbering continues after migrating from another system.',
    },
    {
      title: 'Number across all records with an API token',
      desc: 'By default the next number is the highest number the saving user can see + 1. Optionally use a view-only API token so the whole app is counted, regardless of record permissions.',
    },
    {
      title: 'Safety checks',
      desc: 'Stops saving when the value a sub-number depends on is empty, and warns in the settings if the numbering field is not set to prohibit duplicates or some users cannot edit it.',
    },
  ],
  screenshots: [
    {
      src: '/images/conditional-numbering-config-01.png',
      alt: 'Conditional Auto Numbering settings page with a rule list and live preview on the left and format settings for date, sequence and conditional text in the center',
      width: 1400,
      height: 1253,
      caption: 'Settings page with live preview of the number',
    },
    {
      src: '/images/blog/conditional-numbering-setting-condition.png',
      alt: 'Conditional numbering settings where each field value has its own text and its own sequence',
      width: 1190,
      height: 452,
      caption: 'Different text and counters per field value',
    },
  ],
  notes: [
    'The numbering field cannot be edited on the record create and edit screens or by inline edit in the record list. Issued numbers are never rewritten.',
    'For datetime fields used as the base date, the date is taken in Japan time (JST).',
    'On the app\'s test environment screen, the same number is assigned every time, because the plugin can only count records in the live app.',
    'Tested on the latest version of Google Chrome, which is recommended.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'How is it different from kintone\'s record number?',
      a: 'kintone\'s record number is a plain sequence and cannot switch numbering by conditions. This plugin switches numbering rules by field values such as department, person or status, and lets you set the format in detail, including text parts, digits and dates.',
    },
    {
      q: 'Can it number records after a CSV import?',
      a: 'Yes. After importing many records by CSV, you can number them all at once from the settings page, following your conditional rules.',
    },
    {
      q: 'Can issued numbers change when I change the conditions?',
      a: 'No. Issued numbers are kept. Rules apply only to new records and records that have no number yet; existing numbers are never overwritten.',
    },
    {
      q: 'Can I add sub-numbers per product ID, like PRD-00001-001 and PRD-00001-002?',
      a: 'Yes. Set the counting method to sub-numbers and build the format from text (the product ID field value) plus a sequence. Each product ID is numbered from 001. Product IDs fetched by a lookup can be used too.',
    },
    {
      q: 'Can numbering continue from records migrated from another system?',
      a: 'Yes. Put the migrated records in the app and numbering continues from the highest number, because each number is the highest existing number + 1. You can check where it continues in the next number preview on the settings page (shown when the sequence runs through the whole app, not for sub-numbers).',
    },
    {
      q: 'Can I number by a chosen date instead of the save date?',
      a: 'Yes. Choose a date, datetime, created or updated field as the base date for the date part. The YY, YYMM or YYMMDD part and the yearly, monthly or daily reset follow that date. If the base date is empty, saving is stopped and the user is asked to enter it.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
