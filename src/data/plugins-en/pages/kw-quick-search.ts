import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Quick Search for kintone - Free Search Bar Plugin | KIZUNA Works',
  metaDescription: 'Free kintone plugin that adds a search bar to the record list. AND/OR keywords across fields, exact phrases, date ranges, users, related records and file names.',
  definition: 'Quick Search is a free kintone plugin that adds a search bar next to the filter and sort icons of the record list, so you can filter the list by keywords across many fields at once without leaving it.',
  highlights: [
    'One search bar right on the record list',
    'AND/OR keywords across text, choice, user and file fields',
    'One-click date ranges such as this week or last month',
  ],
  problems: [
    {
      title: 'Filtering by several fields takes too many clicks',
      desc: 'To narrow the list without leaving it, you have to set filter conditions field by field. Quick Search filters with one keyword box.',
    },
    {
      title: 'The standard keyword search leaves the list',
      desc: "kintone's app search covers text fields only and shows results on a separate search results screen. Quick Search filters the record list in place and also searches choice fields.",
    },
    {
      title: 'You know a name, not the field it is in',
      desc: 'A name may be in a text field, a drop-down, a related records list or an attached file name. Quick Search looks in all the fields you choose at once.',
    },
  ],
  features: [
    {
      title: 'Search bar on the record list',
      desc: 'The search bar sits right of the filter and sort icons. A "?" button at its right end shows how to write searches; you can hide it in the settings.',
    },
    {
      title: 'AND / OR toggle and multiple keywords',
      desc: 'Separate keywords with spaces. AND finds records that contain every keyword; OR finds records that contain any of them. The mode stays as you left it after clearing.',
    },
    {
      title: 'Phrases and exact match',
      desc: 'Wrap words in double quotes to search them as one phrase. Put "=" before a word to match the whole value exactly (single-line text, link, related records items and choices).',
    },
    {
      title: 'Search across field types',
      desc: 'Text, rich text, link, lookup, drop-down, radio button, check box and multi-choice fields are searched with one keyword. Typing part of a choice finds the matching choice.',
    },
    {
      title: 'Related records content',
      desc: 'Add the fields shown in a related records list as search targets. Records whose related records contain the keyword are found, and the related records filter is respected.',
    },
    {
      title: 'User, department and group fields',
      desc: 'Search user, department and group selection fields, Created by and Updated by by partial match on the name or code. Use "=" for an exact match. Departments include their child departments.',
    },
    {
      title: 'Attachment file names',
      desc: 'Choose attachment fields to find records by part of a file name. Text inside PDFs and other files whose text can be read also matches. Exact match with "=" does not apply.',
    },
    {
      title: 'Date range filter',
      desc: 'Filter by today, yesterday, this week, last week, this month, last month, this year or last year in one click, or set a start and end date. Order the date fields in the settings; the top one is selected first.',
    },
    {
      title: 'Three search buttons',
      desc: 'Search keeps the current view filter, Search All ignores it, and Clear returns the list to its original state.',
    },
    {
      title: 'Fields you cannot view are skipped',
      desc: 'Fields hidden by field permissions or by access to the related app are removed from the search for that user, and the reason is shown next to the search bar.',
    },
    {
      title: 'Protection from too many conditions',
      desc: 'Before a long AND search grows too large for kintone to show the list, the plugin asks you to reduce keywords. With many target fields, it leaves out fields that do not contain the keyword (same result, 2 API calls for that search only).',
    },
    {
      title: 'Views, size, colors and languages',
      desc: "Choose which views show the search bar, the box width and height (small, medium, large) and the button colors. The bar and settings follow the user's kintone language: Japanese, English or Simplified Chinese.",
    },
  ],
  screenshots: [
    {
      src: '/images/quick-search-action-01.png',
      alt: 'kintone record list with the Quick Search bar next to the filter and sort icons: AND/OR toggle, keyword box and search buttons',
      width: 1310,
      height: 525,
      caption: 'The search bar sits right on the record list.',
    },
    {
      src: '/images/quick-search-action-02.png',
      alt: 'Quick Search in AND mode with two keywords, narrowing the record list to the 2 records that contain both',
      width: 1313,
      height: 337,
    },
    {
      src: '/images/quick-search-period-filter.png',
      alt: 'The Period drop-down of the search bar with the target date field and one-click ranges such as today, this week and this month',
      width: 660,
      height: 463,
      caption: 'Filter by a date range in one click.',
    },
  ],
  notes: [
    'Works on record list views in table format only. The search bar is not shown on calendar views or custom views.',
    'The date range filter works with date, date and time, Created datetime and Updated datetime fields (not time fields). Each list uses one date field at a time, switched among the candidates chosen in the settings.',
    'We recommend the latest version of Google Chrome.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: "How is this different from kintone's standard filter?",
      a: "kintone's keyword search (app search) also covers several fields, but only text fields such as single-line text, multi-line text, rich text and link, and it shows results on a search results screen rather than the record list. To filter the list itself you must set conditions field by field. Quick Search puts a search bar next to the list toolbar and filters the list in place with one keyword, across text fields and choice fields such as drop-downs and check boxes.",
    },
    {
      q: 'Can I switch between AND and OR search?',
      a: 'Yes. Use the toggle on the search bar. Enter several keywords separated by spaces: AND mode finds records that contain all keywords, OR mode finds records that contain any of them.',
    },
    {
      q: 'Can I choose which fields are searched?',
      a: 'Yes, in the plugin settings. You can choose text fields (single-line text, multi-line text, rich text, link, lookup), choice fields (drop-down, radio button, check box, multi-choice), user and department fields (user selection, department selection, group selection, Created by, Updated by) and the fields shown in related records lists.',
    },
    {
      q: 'Can I search by user or department names?',
      a: 'Yes. When you choose user, department or group selection fields, Created by or Updated by as targets, the keyword is matched partially against the name or code, and records that include a matching user, department or group are found. Put "=" before the word for an exact match. Departments include their child departments. If a user cannot view a field, or the user, department or group list cannot be loaded, that field is left out and the search continues with the other fields.',
    },
    {
      q: 'Can I search the contents of related records?',
      a: 'Yes. Choose text or choice fields set in "Fields to display" of a related records list as targets, and records whose related records contain the keyword are found. For example, in a customer app you can enter a deal name or sales rep to find the customers that have them. The related records filter is applied. If a user cannot view the related app or those fields, they are removed from the search automatically and this is shown next to the search bar.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
