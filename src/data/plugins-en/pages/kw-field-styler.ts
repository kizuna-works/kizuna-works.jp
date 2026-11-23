import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Field Styler - Free kintone Field Styling Plugin | KIZUNA Works',
  metaDescription:
    'Field Styler is a free kintone plugin to style fields without code: colors, fonts, sizes, label colors, conditional styles by date or value, and input limits.',
  definition:
    'Field Styler is a free kintone plugin that styles fields without code: background and text colors, fonts, sizes and bold, field label colors, conditional styles based on values or dates, plus input limits and placeholders.',
  highlights: [
    '13 styling and input features, all set up without JavaScript',
    'Conditional colors with TODAY+N, "this month" and up to 10 conditions',
    'Applies to the record details, create, edit and print screens',
  ],
  problems: [
    {
      title: 'Important fields get lost on long forms',
      desc: 'Every field looks the same, so users miss the values that matter. Colors, bold text and larger fonts make key fields stand out.',
    },
    {
      title: 'Overdue items are hard to spot',
      desc: 'Checking each due date by eye is slow. Conditional styles color fields automatically by date, status or value.',
    },
    {
      title: 'Inconsistent input breaks reports and printouts',
      desc: 'Text that is too long or in the wrong character type causes problems later. Length limits, character type limits and line limits stop it at entry.',
    },
  ],
  features: [
    {
      title: 'Background and text colors',
      desc: 'Change a field\'s background and text color with a color picker, a color code or saved "My colors" in the color palette.',
    },
    {
      title: 'Fonts, sizes and bold',
      desc: 'Choose from 15 fonts (Japanese and Latin), set the font size in pixels and make text bold.',
    },
    {
      title: 'Conditional styles',
      desc: 'Change background color, text color and bold by value, with up to 10 conditions per field. Works with check box and multi-choice values too.',
    },
    {
      title: 'Date-based conditions',
      desc: 'Compare dates with TODAY, TODAY+7 or TODAY-3, or with THIS_MONTH, LAST_MONTH and NEXT_MONTH, which match the whole calendar month. Use another field as the basis, such as coloring the assignee by the deadline.',
    },
    {
      title: 'Field label styling',
      desc: 'Give field labels their own background color, text color and bold. Also works on group headings, table names and table column names.',
    },
    {
      title: 'Copy button',
      desc: 'Copy a field\'s value to the clipboard in one click, also on the record list.',
    },
    {
      title: 'Character limits',
      desc: 'Limit the number of characters that can be entered. Also works on columns in subtables, where rows over the limit show an error and saving is stopped.',
    },
    {
      title: 'Character type limits',
      desc: 'Allow only certain character types, chosen from 8 options such as half-width alphanumerics only. Also works on subtable columns.',
    },
    {
      title: 'Maximum lines',
      desc: 'Limit the number of lines in a multi-line text field. New lines are blocked at the limit, and pasted text over the limit is stopped on save.',
    },
    {
      title: 'Placeholders',
      desc: 'Show hint text in empty fields. Multi-line text placeholders can include line breaks.',
    },
    {
      title: 'Copy settings to other fields',
      desc: 'Copy one field\'s settings to several fields at once. Choose label styling, value styling or input limits, and only those items are overwritten.',
    },
    {
      title: 'Screen and print, with live preview',
      desc: 'Apply each setting to the screen, to print, or both, including kintone\'s print screen. The settings page previews the record details and create/edit screens as you work.',
    },
  ],
  screenshots: [
    {
      src: '/images/field-styler-after.png',
      alt: 'kintone record list after installing Field Styler, with fields shown in different background and text colors',
      width: 1920,
      height: 960,
      caption: 'Fields colored by Field Styler on the record list',
    },
    {
      src: '/images/field-styler-v2100-01.png',
      alt: 'Field Styler settings page with a preview of the record details and create/edit screens above the field editor',
      width: 1425,
      height: 946,
      caption: 'Settings page with live preview',
    },
  ],
  notes: [
    'Not supported on kintone mobile.',
    'Tested on the latest version of Google Chrome, which is recommended.',
    'Label styling changes background color, text color and bold only; the font and font size of labels do not change. Labels are not shown on the record list, so label styling does not apply there.',
    'Rich text, calculated, link, attachment, user/organization/group selection, related records, record number, group and table fields support label styling only.',
    'The settings screen is available in Japanese, English and Simplified Chinese.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'What are the 13 features of Field Styler?',
      a: 'Background color, font (15 fonts), text color, character limit, maximum lines, bold, conditional styles, font size, copy button, character type limit (8 types), placeholder, field label styling and copying settings to other fields. All are set up without code on standard kintone fields. Character limits, character type limits and maximum lines also work on subtable columns.',
    },
    {
      q: 'How is it different from kintone\'s built-in conditional formatting?',
      a: 'Built-in conditional formatting mainly colors rows on the record list. Field Styler styles individual fields on the record details and edit screens, including background color, text color, font and size. Conditions can use TODAY+N and {field code}+N, so one setting can color records against different deadlines.',
    },
    {
      q: 'Can I color field labels?',
      a: 'Yes. You can set a background color, text color and bold for field labels separately (the font and font size do not change). This works on regular fields as well as group headings, table names and table column names. It applies to the record details, edit and create screens; labels are not shown on the record list.',
    },
    {
      q: 'Can I copy settings to several fields at once?',
      a: 'Yes. Use Copy in the settings list to copy one setting to several fields. Choose which items to copy: label styling, value styling or input limits. If the target already has settings, only the chosen items are overwritten, and its conditional styles and placeholder are kept.',
    },
    {
      q: 'How many conditional styles can I set?',
      a: 'Up to 10 conditions per field. You can switch the field used for comparison, use TODAY+N date arithmetic, and compare with another field\'s value using {field code}+N.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
