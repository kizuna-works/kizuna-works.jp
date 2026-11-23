import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Theme Styler for kintone - Free App Theme Plugin | KIZUNA Works',
  metaDescription: 'Free kintone plugin to color a whole app from one theme color and add a title band with up to 5 link buttons to related apps, your portal and external sites.',
  definition: 'Theme Styler is a free kintone plugin that colors a whole app from one theme color and adds a title band with text and up to 5 link buttons to related kintone apps, internal portals, manuals and external sites.',
  highlights: [
    'One theme color for header, rows, borders and forms',
    'Up to 5 link buttons in the title band, 50 styles',
    'Live preview that highlights what each setting changes',
  ],
  problems: [
    {
      title: 'Moving between related apps takes several clicks',
      desc: 'Going from one app to a related app or an internal site means going back to the portal or a bookmark. Theme Styler puts links right in the app\'s title band.',
    },
    {
      title: 'Manuals and rules are hard to find',
      desc: 'Links to procedures, rules or forms are scattered. Place them as buttons at the top of the app so everyone sees them.',
    },
    {
      title: 'Every app looks the same',
      desc: 'With the default look it is hard to tell apps apart. Give each app its own theme color in one step.',
    },
  ],
  features: [
    {
      title: 'Theme color for the whole app',
      desc: 'Pick one of 12 presets or any color. The title band, list header, rows, borders and form background are colored with matching shades.',
    },
    {
      title: 'Colors by area',
      desc: 'Set background and text colors separately for the app name and list header, the record details, edit and create screens, and subtable header rows, each as automatic or custom. On record screens the field label color changes, not the values.',
    },
    {
      title: 'Groups and subtable names match the theme',
      desc: 'Group frames and subtable name bands use the form background color, and their text uses the field label color. Printing uses the same colors.',
    },
    {
      title: 'Screen, print or both',
      desc: 'Choose whether the theme and title band apply to the screen and print, the screen only or print only. kintone\'s print screen is supported.',
    },
    {
      title: 'Title band with text and links',
      desc: 'Add text and buttons that link to kintone apps, internal portals, manuals or external sites. Open each link in the same tab or a new tab.',
    },
    {
      title: 'Up to 5 custom buttons, 50 styles',
      desc: 'Place up to 5 buttons side by side with their own label, URL and style. Choose from 50 styles in 5 categories and adjust background, text and border color and size.',
    },
    {
      title: 'Independent positions',
      desc: 'Place the text and the buttons left, center or right independently, and set their order when they share a position. Left sits right after the app name without overlapping it.',
    },
    {
      title: '10 Japanese fonts',
      desc: 'Choose from 10 fonts such as Noto Sans, Noto Serif, Meiryo and Yu Gothic for the app name, title band text and buttons.',
    },
    {
      title: 'Live preview with highlight',
      desc: 'A mini kintone preview of the record list and record details stays fixed on the left of the settings. Hover a setting and the area it changes is outlined.',
    },
    {
      title: 'Color palette and languages',
      desc: 'Every color field has a palette with color code input, My Colors and recent colors, shared with other KIZUNA Works plugins. The settings screen follows the user\'s kintone language: Japanese, English or Simplified Chinese.',
    },
  ],
  screenshots: [
    {
      src: '/images/theme-styler-after.png',
      alt: 'kintone app with a cyan theme color and link buttons for related apps added to the title band',
      width: 1894,
      height: 715,
      caption: 'Theme color and link buttons in the title band.',
    },
    {
      src: '/images/theme-styler-after-02.png',
      alt: 'Title band with a text link in the center and two buttons on the right',
      width: 1894,
      height: 735,
    },
    {
      src: '/images/theme-styler-config-preview.png',
      alt: 'Theme Styler settings screen: hovering the field label text color setting outlines only the field labels in the live preview',
      width: 1300,
      height: 495,
      caption: 'See what each setting changes before saving.',
    },
  ],
  notes: [
    'kintone mobile is not supported.',
    'If kintone updates change its screen structure, the title band customization may not apply correctly. Update to the latest version in that case.',
    'We recommend the latest version of Google Chrome.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'How is this different from other plugins that change kintone theme colors?',
      a: 'Besides coloring the whole app at once, it can gather text and up to 5 link buttons (50 styles) in the title band. Quick links to related kintone apps, internal portals, manuals and external websites sit in one app, so the app works as a hub for the job.',
    },
    {
      q: 'Can I change the font?',
      a: 'Yes. Choose from 10 Japanese fonts, including serif, sans-serif and rounded styles, per app.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
