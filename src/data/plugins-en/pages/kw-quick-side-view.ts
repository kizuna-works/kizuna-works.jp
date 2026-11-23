import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Quick Side View for kintone - Free Side Panel | KIZUNA Works',
  metaDescription: 'Free kintone plugin: click a row in the record list to open the record in a side panel. View and edit up to 5 records side by side without leaving the list.',
  definition: 'Quick Side View is a free kintone plugin that opens a record in a side panel when you click its row in the record list, so you can view, compare and edit up to 5 records without leaving the list.',
  highlights: [
    'Click a row to open the record beside the list',
    'Up to 5 records side by side or stacked',
    'Edit and save in the panel, one or all at once',
  ],
  problems: [
    {
      title: 'Going back and forth to the record details',
      desc: 'Checking a record means opening its details screen and returning to the list each time. Quick Side View shows it next to the list.',
    },
    {
      title: 'Comparing records is tedious',
      desc: 'Comparing several records means switching between tabs or screens. Open up to 5 records in panels and look at them together.',
    },
    {
      title: 'Small edits take many steps',
      desc: 'Fixing one value means opening the record, editing and saving. Edit fields right in the side panel.',
    },
  ],
  features: [
    {
      title: 'Click a row to open the side panel',
      desc: 'Click a row in the record list and a side panel opens on the right with the record\'s fields. No need to go to the record details screen.',
    },
    {
      title: 'Up to 5 records at once',
      desc: 'Click more rows and the records open as panels side by side. Clicking a 6th row closes the oldest panel and adds the new record.',
    },
    {
      title: 'Side by side or stacked layout',
      desc: 'Use side by side to compare records, or stacked to focus on editing.',
    },
    {
      title: 'Edit in place, save one or all',
      desc: 'Edit editable fields directly in the panel. Save each panel with its Save button, or save every panel with Save All at the top.',
    },
    {
      title: 'Control fields one by one',
      desc: 'In the settings, set each field to shown or hidden and read-only or editable, and drag to change the order.',
    },
    {
      title: 'Custom panel heading',
      desc: 'Use any field, such as company name or subject, as the panel heading. Click the heading to open the record details in a new tab.',
    },
    {
      title: 'Detects updates by others',
      desc: 'If an open record is edited elsewhere, a banner appears within about a minute while the tab is visible; click Reload to refresh. If you save before the banner appears, other users\' changes are not overwritten and you are told.',
    },
    {
      title: 'Confirm before closing unsaved work',
      desc: 'Closing a panel or leaving the page with unsaved edits asks for confirmation.',
    },
    {
      title: 'Adjustable panel width',
      desc: 'Drag the left edge of the side panel to change its width. The width is saved in the browser for next time.',
    },
    {
      title: 'Does not get in the way of the list',
      desc: 'Edit and delete icons, user icons and buttons placed by other plugins still work. The panel does not cover the buttons above the list or the paging, and wide lists can scroll to the last column.',
    },
    {
      title: 'Works with List Styler subtable rows',
      desc: 'With List Styler showing subtable rows, click a row or one of its subtable rows to open that record on the right.',
    },
  ],
  screenshots: [
    {
      src: '/images/quick-side-view-action-01.png',
      alt: 'kintone record list with a side panel open on the right showing the clicked record\'s fields',
      width: 1888,
      height: 812,
      caption: 'Click a row to open the record beside the list.',
    },
    {
      src: '/images/quick-side-view-action-02.png',
      alt: 'Two records shown side by side in the side panel for comparison',
      width: 1889,
      height: 798,
    },
    {
      src: '/images/quick-side-view-config-02.png',
      alt: 'Quick Side View settings: field table with a show check box and read-only or editable option for each field',
      width: 826,
      height: 741,
      caption: 'Choose which fields to show and edit.',
    },
  ],
  notes: [
    'Works only on record list views in table format. It does not work on calendar views, custom views or kintone mobile.',
    'Attachment, subtable, related records, category and status cannot be edited. User, department and group selection and date and time fields are shown read-only.',
    'We recommend the latest version of Google Chrome.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'How many records can I open in the side panel from the record list?',
      a: 'Up to 5 records can be open side by side at the same time. This helps when you want to compare several records or edit them in parallel.',
    },
    {
      q: 'Are edits made in the side panel saved to kintone?',
      a: 'Yes. Edit in the side panel and click Save, and the record is updated through the kintone API just like a normal edit, without opening the record details screen. If someone else updated the record after you opened it, saving stops and you are told, so their changes are not overwritten.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
