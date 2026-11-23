import type { PluginEnPage } from '../../plugins-en';

const page: PluginEnPage = {
  metaTitle: 'Conditional Form - Free kintone Form Rules Plugin | KIZUNA Works',
  metaDescription:
    'Conditional Form is a free kintone plugin to show, hide, require, lock and auto-fill fields by conditions, and stop or confirm saves, actions and deletes.',
  definition:
    'Conditional Form is a free kintone plugin that shows, hides, requires, locks or fills fields by conditions on values, status or user, and can stop or confirm saving, process management actions and deleting.',
  highlights: [
    'Form rules: show/hide, required, read-only, set values and filter choices',
    'Checks on save, action and delete: stop, confirm or ask for input',
    'Same settings work on desktop and kintone mobile, with no JavaScript',
  ],
  problems: [
    {
      title: 'One form has to serve many cases',
      desc: 'Fields that only matter for some categories clutter the form. Show them only when the condition is met.',
    },
    {
      title: 'Required fields depend on the situation',
      desc: 'kintone\'s required setting is all or nothing. Make a field required only when another value calls for it.',
    },
    {
      title: 'Records move on before they are complete',
      desc: 'Stop an approval when a field is empty, ask for a comment when sending back, or block deleting approved records.',
    },
  ],
  features: [
    {
      title: 'Show or hide',
      desc: 'Show or hide fields, groups, subtables, related records, subtable columns, and labels, borders and spaces that have an element ID. Fields set to "show" stay hidden until the condition is met.',
    },
    {
      title: 'Conditional required',
      desc: 'Make optional fields required only when the condition is met, with a "Required" badge next to the label. Fields inside subtables can be required per row.',
    },
    {
      title: 'Read-only and set values',
      desc: 'Lock fields, set fixed values (including TODAY, TODAY+7 and TODAY-3 for dates), clear them, or copy another field\'s value, either when the condition is met or when the screen opens.',
    },
    {
      title: 'Filter choices',
      desc: 'Limit the options shown in drop-down, multi-choice, check box and radio button fields. Values already selected are kept.',
    },
    {
      title: 'Rich conditions',
      desc: 'Use choice values, process management status, text, numbers, dates (TODAY+N) and lookup values. Up to 20 conditions per rule joined with AND or OR, including "is any of" and "is none of" in one line.',
    },
    {
      title: 'Rules per user',
      desc: 'Apply rules only to chosen users, organizations or groups, or exclude some, for example to hide fields from everyone except administrators.',
    },
    {
      title: 'Checks on save, action and delete',
      desc: 'Before saving a new or edited record, running a process management action or deleting, stop the operation, ask for confirmation, ask for missing input, or make fields required.',
    },
    {
      title: 'Ask for input before an action',
      desc: 'Before a process management action, fill empty fields in a small input dialog. The values are saved and the status changes in one step.',
    },
    {
      title: 'Hide action buttons',
      desc: 'While a condition is met, hide the process management action button itself instead of showing an error after it is clicked. Conditions can include the action name and the next status.',
    },
    {
      title: 'Input format checks',
      desc: 'Check text, link and date fields, including subtable fields row by row: alphanumerics only, digits only, starts or ends with, length, regular expressions, or first or last day of the month. Errors appear under the field and saving is stopped.',
    },
    {
      title: 'Print screen and groups',
      desc: 'Apply show/hide to kintone\'s print screen, also per user who prints. Open or close groups when a condition is met.',
    },
    {
      title: 'Safe and easy to manage',
      desc: 'Conflicts resolve by safety order (hidden, then read-only, then required). Drag to reorder rules, duplicate them, pause any rule, and get warnings for conditions that are always or never true.',
    },
  ],
  screenshots: [
    {
      src: '/images/conditional-form-require-02.png',
      alt: 'kintone edit screen where the expected order date shows a red Required badge because the probability is 100%',
      width: 861,
      height: 462,
      caption: 'A field becomes required when the condition is met',
    },
    {
      src: '/images/conditional-form-filter-02.png',
      alt: 'kintone edit screen where the deal phase drop-down is limited to three options because the probability is 80%',
      width: 853,
      height: 675,
      caption: 'Drop-down options filtered by another field',
    },
    {
      src: '/images/conditional-form-v380-01.png',
      alt: 'Conditional Form settings page where the hide action can target subtable columns listed after their table',
      width: 1400,
      height: 802,
      caption: 'Choosing subtable columns to hide',
    },
  ],
  notes: [
    'Works on the record create, edit and details screens (desktop and mobile) and on the print screen (desktop only). Required, read-only, set values and filter choices work on the create and edit screens only; on the details and print screens only show/hide applies.',
    'Not supported in calendar views or custom views.',
    'On mobile, blocking deletes from the record list is not available, because kintone mobile has no matching mechanism. When a delete or action is stopped on the details screen, the reason is shown in a dialog.',
    'Fields inside subtables can be used as conditions only in checks on save, action and delete, not in form rules. Setting values, read-only and filtering choices cannot target fields inside subtables.',
    'Hiding a field only hides it; its value is kept and saved, and still appears in CSV exports.',
    'Fields that are required in kintone\'s own settings cannot be made optional by a condition.',
    'Process management status conditions use the status at the time the screen is opened.',
    'Checks on save, action and delete apply to operations on screen. They do not apply to REST API calls, CSV import or bulk processing by other plugins.',
    'The print screen setting affects kintone\'s standard record print screen only, not external reporting services or report plugins.',
    'Labels, borders and spaces can be targeted only if they have an element ID in the form settings.',
    'Tested on the latest version of Google Chrome, which is recommended.',
    'This plugin is developed independently by KIZUNA Works and is not provided or guaranteed by Cybozu, Inc. kintone is a registered trademark of Cybozu, Inc.',
  ],
  faqs: [
    {
      q: 'What is the difference between form rules and checks?',
      a: 'Form rules change the state of the screen while it is open: show/hide, required, read-only, values and choices. Checks run at the moment of saving, running a process management action or deleting, and stop the operation, show a confirmation dialog or ask for the missing input. Because they work at different times, they are on separate tabs in the settings.',
    },
    {
      q: 'What should I write as the condition of a check?',
      a: 'Write the situation you want to stop. For example, to stop an application without a use date, the condition is "Use date is empty" (not "is not empty"). When the condition is met, the chosen action (stop, confirm or ask for input) runs; otherwise nothing happens.',
    },
    {
      q: 'Can checks stop operations from the REST API or CSV import?',
      a: 'No. Checks guard operations on screen. They do not apply to saves, status changes or deletes made through the REST API, CSV import or bulk processing by other plugins. To control permissions themselves, use kintone\'s access settings as well.',
    },
    {
      q: 'A field set to "show" is visible before the condition is met. Why?',
      a: 'Fields set to "show" are hidden automatically while the condition is not met and appear only when it is. If one is always visible, check that the condition\'s field, operator and value are correct and that the rule\'s screens include the screen you are viewing. Fields you always want visible should not be targets of a rule.',
    },
    {
      q: 'What happens when several rules target the same field?',
      a: 'They are resolved by a safety order: hidden, then read-only, then required, then set value and filter choices. A hidden field, for example, is released from required and read-only so the record can still be saved. Between the same kind of action, the rule higher in the list wins, and rules can be reordered by dragging.',
    },
    {
      q: 'Can I make a field that is required in kintone optional by a condition?',
      a: 'No. The plugin only adds required status to optional fields when a condition is met. Fields set as required in kintone stay required, because kintone\'s own validation takes priority.',
    },
  ],
  dateModified: '2026-11-23',
};

export default page;
