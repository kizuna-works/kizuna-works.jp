import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Lookup Suggest - Free kintone Lookup Autocomplete | KIZUNA Works',
  metaDescription:
    'Lookup Suggest is a free kintone plugin that shows lookup candidates as you type. Pick one with a click or the arrow and Enter keys, in subtables and on mobile.',
  definition:
    'Lookup Suggest is a free kintone plugin that shows matching lookup candidates as you type, so you can pick one with a click or the keyboard and fetch the values without opening the lookup dialog.',
  highlights: [
    'Candidates appear under the lookup field as you type',
    'Choose with a click, or with the arrow keys and Enter',
    'Works in subtables (desktop) and on the kintone mobile create and edit screens',
  ],
  problems: [
    {
      title: 'The lookup dialog slows down data entry',
      desc: 'With a standard lookup you click Lookup, wait for a dialog and pick a record. Lookup Suggest shows candidates while you type.',
    },
    {
      title: 'You have to know the exact code',
      desc: 'Search part of a code, a name, a phone number or other fields of the source app, and see the matches right away.',
    },
    {
      title: 'Similar names lead to the wrong record',
      desc: 'Show extra fields such as phone number or address next to each candidate so you can tell records with the same name apart.',
    },
  ],
  features: [
    {
      title: 'Live suggestions',
      desc: 'Candidates appear right under the lookup field as you type, with a 300 ms delay to keep API requests low.',
    },
    {
      title: 'Fetch without leaving the record',
      desc: 'Click a candidate to set the value and fetch the copied fields, using kintone\'s own lookup in the background.',
    },
    {
      title: 'Keyboard selection',
      desc: 'Move through candidates with the up and down arrow keys, confirm with Enter and clear the selection with Esc, in regular lookups and in subtables.',
    },
    {
      title: 'Partial codes match',
      desc: 'Codes with hyphens such as ABC-12345 narrow down from ABC-123, and codes without separators such as AB123 match from AB1. Large masters are loaded in batches of up to 10,000 records.',
    },
    {
      title: 'Search more than text',
      desc: 'Choice fields match options containing the text, numbers and dates match the exact value, and user, organization and group fields match part of the name or the login name.',
    },
    {
      title: 'Extra fields in the list',
      desc: 'Show any source app fields next to each candidate, such as phone, address or customer number. By default the list follows the fields and order set in kintone\'s lookup settings.',
    },
    {
      title: 'Subtable lookups',
      desc: 'Suggestions work in lookups inside subtables. The list floats under the cell, the chosen row is filled, and new rows are picked up automatically (desktop).',
    },
    {
      title: 'Mobile support',
      desc: 'Works on the kintone mobile create and edit screens with large rows. Tap a candidate to fetch it, and the keyboard closes automatically (regular lookup fields).',
    },
    {
      title: 'Two display modes',
      desc: 'Per lookup, show the list floating under the field (no form changes needed) or inside a space field so it does not cover other fields.',
    },
    {
      title: 'Up to 500 candidates',
      desc: 'Set how many candidates to show, from 1 to 500 (default 10). The count of matches stays visible at the bottom of the list.',
    },
    {
      title: 'Numbers and dates formatted as in the source',
      desc: 'Thousands separators, decimal places and units follow the source field settings, and datetimes use the user\'s time zone. Only the display changes; copied values stay raw.',
    },
    {
      title: 'Help when nothing is fetched',
      desc: 'When several source records contain the chosen value in their name and kintone cannot fetch one, a message under the field explains why.',
    },
  ],
  screenshots: [
    {
      src: '/images/lookup-suggest-display-floating.png',
      alt: 'kintone record create screen where typing in the customer lookup shows a list of candidates floating right under the field',
      width: 1260,
      height: 1090,
      caption: 'Candidates appear under the lookup field as you type',
    },
    {
      src: '/images/lookup-suggest-subtable-01.png',
      alt: 'Quote line subtable where typing part of a product code shows matching products under the cell',
      width: 1255,
      height: 291,
      caption: 'Suggestions inside a subtable',
    },
    {
      src: '/images/lookup-suggest-mobile-01.png',
      alt: 'kintone mobile record create screen with lookup candidates showing company name, address and industry',
      width: 780,
      height: 1400,
      caption: 'On kintone mobile',
    },
  ],
  notes: [
    'Candidates are searched from 2 characters, because kintone\'s keyword search does not match a single character.',
    'Time, datetime and attachment fields can be shown in the list but cannot be searched.',
    'User, organization and group fields match up to 50 people or organizations per field. In environments with more than 5,000 users, later users cannot be found by name. In guest spaces, only space members are searched.',
    'Suggestions inside subtables work on desktop only.',
    'Suggestions are not triggered during IME composition (for Japanese and similar input); the search runs after the text is confirmed.',
    'Tested on the latest version of Google Chrome, which is recommended.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'How is it different from a standard kintone lookup?',
      a: 'With a standard lookup you click Lookup and pick a record on a separate screen. This plugin shows candidates under the field while you type, and clicking one completes the lookup without leaving the record.',
    },
    {
      q: 'How many characters do I need to type?',
      a: 'At least 2. kintone\'s keyword search does not match a single character, so candidates appear from the second character.',
    },
    {
      q: 'Can the candidates follow the order set in kintone\'s lookup settings?',
      a: 'Yes. With "Follow kintone\'s lookup settings" (the default), candidates show the same fields in the same order as the lookup\'s "Fields shown in the lookup picker" setting, with the first field in bold. Changes in kintone apply when the record screen is reopened. You can also choose the fields and order yourself.',
    },
    {
      q: 'Can I search choice, user or organization fields?',
      a: 'Yes. Choice fields (drop-down, radio button, check box, multi-choice) match options containing the text. Numbers, record numbers, numeric calculated fields and dates match the exact value. User, organization and group fields (including created by, updated by and assignee) match part of the name or the login name. Time, datetime and attachment fields are not searched.',
    },
    {
      q: 'Can I choose candidates with the keyboard only?',
      a: 'Yes. Use the up and down arrow keys to move and Enter to confirm. Esc clears the selection. This works in regular lookup fields and inside subtables. When no candidate is selected, Enter behaves as usual in kintone, and keys used during IME composition go to the IME.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
