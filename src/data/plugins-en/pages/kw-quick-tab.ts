import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Quick Tab for kintone - Free Form Tabs Plugin | KIZUNA Works',
  metaDescription: 'Free kintone plugin that splits long record forms into tabs using space fields as boundaries. All tab, sticky tab bar, conditional tabs and 20 tab styles.',
  definition: 'Quick Tab is a free kintone plugin that splits long record forms into tabs automatically, using space fields as boundaries, so users see one section at a time instead of scrolling through every field.',
  highlights: [
    'Tabs from space fields, no field-by-field setup',
    'All tab, sticky tab bar and required-field error jump',
    'Hide tabs by field values or by user',
  ],
  problems: [
    {
      title: 'Long forms mean endless scrolling',
      desc: 'Apps with many fields make users scroll up and down to find the field they need. Quick Tab shows one section at a time.',
    },
    {
      title: 'Hard to see where a section starts',
      desc: 'Basic data, work details and history all run together on one long form. Tabs give each section a clear name.',
    },
    {
      title: 'Not everyone needs every section',
      desc: 'Some sections are only for certain people or certain cases. Hide tabs by field values or show them only to chosen users.',
    },
  ],
  features: [
    {
      title: 'Tabs split at space fields',
      desc: 'Place space fields on the form as boundaries. The fields from one boundary to the next become one tab, so there is no need to assign fields one by one.',
    },
    {
      title: '"All" tab',
      desc: 'Add an "All" tab that shows every field at once. You can rename it, change its position or turn it off.',
    },
    {
      title: 'Common area and footer',
      desc: 'Fields above the tab bar and above the first boundary are always shown. Optionally choose a space field from which the fields below are shown on every tab, such as updated date or notes.',
    },
    {
      title: 'Jumps to required-field errors',
      desc: 'If a required field on a hidden tab is empty when saving, that tab opens automatically. kintone\'s standard required check still works because hidden fields stay on the page.',
    },
    {
      title: 'Initial tab and keeping your tab',
      desc: 'Choose the tab that opens first, including "All". When you switch between the record details and edit screens of the same record, the tab you had open stays open (can be turned off).',
    },
    {
      title: 'Hide tabs by conditions',
      desc: 'Hide a tab based on field values, with up to 5 conditions combined with all or any. On create and edit screens, tabs appear and disappear as soon as the values change.',
    },
    {
      title: 'Tabs for chosen users',
      desc: 'Set which users, departments and groups can see each tab. Others do not see the tab button or its fields, even on the "All" tab. This controls display only and is not an access permission.',
    },
    {
      title: 'Initial tab per person',
      desc: 'Choose the tab that opens first for each user, department or group. Rows are checked from the top, and the tab of the first matching row opens. Everyone else gets the normal initial tab.',
    },
    {
      title: 'Combined tabs',
      desc: 'Show the fields of several tabs together as a single tab, in the order of the form. Compare sections that are far apart while you fill them in. Combined tabs can also be limited to chosen users.',
    },
    {
      title: '20 styles x 10 color sets',
      desc: 'Choose from 20 shapes such as rounded tabs, underline, pills, segments, buttons, steps and gradients, and 10 color sets or custom colors. Set font size and bold, and check them in the live preview.',
    },
    {
      title: 'Width, alignment and sticky tab bar',
      desc: 'Make the tab bar full width or fit to the tabs, align it left, center or right, and keep it fixed at the top while scrolling, adjusted so it does not cover the comments and history panel.',
    },
    {
      title: 'Works inside kintone',
      desc: 'No GAS, database or external service. Just upload the plugin.',
    },
  ],
  screenshots: [
    {
      src: '/images/quick-tab-action-01.png',
      alt: 'kintone record details screen with a tab bar at the top: All, Basic info, Work info and more',
      width: 658,
      height: 684,
      caption: 'A long form split into tabs.',
    },
    {
      src: '/images/quick-tab-action-02.png',
      alt: 'The Basic info tab selected, showing only the basic information fields such as employee number, name and address',
      width: 660,
      height: 519,
    },
    {
      src: '/images/quick-tab-update-v140-01.png',
      alt: 'Quick Tab settings screen: the Conditions panel of a tab with the users who can view it, one user and one department selected',
      width: 1280,
      height: 900,
      caption: 'Show a tab only to chosen users.',
    },
  ],
  notes: [
    'Works only on the record details, create and edit screens (desktop). It does not work on record lists, calendar views, custom views or kintone mobile.',
    'Space fields used for the tab bar and boundaries need an element ID in the form settings. Space fields without an element ID are not listed in the settings.',
    'The tab bar uses the width of its space field. If the space is narrow, tabs wrap and stack; allow about 100px per tab (for 4-character tab names at 14px).',
    'Fields above the first boundary are always shown (common area) and are not put into tabs.',
    'Boundary space fields cannot be placed inside a subtable, but a tab can contain a subtable.',
    'Group fields are not supported.',
    'We recommend the latest version of Google Chrome or Microsoft Edge.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'Do I need to assign fields to tabs one by one?',
      a: 'No. Space fields placed on the form act as boundaries, and the fields from one boundary to the next become one tab automatically. To add a tab, place a space field where you want to split and give it an element ID.',
    },
    {
      q: 'What do I need to prepare?',
      a: 'In the form settings, place space fields and give each an element ID: one for the tab bar and one boundary per tab. In the plugin settings, choose the tab bar space and each boundary space with its tab name. Space fields without an element ID are not listed.',
    },
    {
      q: 'Can I see all fields at once?',
      a: 'Yes. An "All" tab that shows every field can be added automatically (on/off, rename and position can be changed). Fields placed above the tab bar or above the first boundary form a common area that is shown on every tab.',
    },
    {
      q: 'Will I save a record with an empty required field on a hidden tab?',
      a: 'If a required field on a hidden tab is empty when saving, that tab opens automatically to let you know. Fields hidden by tabs still exist on the page, so kintone\'s standard required check keeps working.',
    },
    {
      q: 'The tabs stack vertically instead of lining up. Why?',
      a: 'The tab bar uses the width of the tab bar space field set on the form. If the space is narrow, the tabs wrap to that width and look stacked (the tabs still work). Drag the bottom-right corner of the space in the form settings to widen it, and give the tab bar space its own row. Allow about 100px per tab for 4-character tab names at 14px. If you cannot widen it further, shorten tab names, lower the font size in the settings or reduce the number of tabs.',
    },
    {
      q: 'Does the tab bar disappear when I scroll?',
      a: 'Turn on the option to keep the tab bar fixed at the top. The tab bar then stays just below the kintone header while you scroll down the record, and its width is adjusted automatically so it does not cover the comments and history panel.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
