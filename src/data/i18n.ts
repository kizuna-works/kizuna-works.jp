// Japanese <-> English page pairs.
//
// The English site lives under /en/ and covers only part of the Japanese site (no blog,
// no news, no purchase forms). Layout.astro looks the current path up here to emit
// hreflang links, the language switch in the header, and the "available in English"
// banner — so a Japanese page never has to be edited to gain its English counterpart.
//
// Add a pair here when an English page is added. Paths are site-relative with a
// trailing slash, exactly as the pages are served.

import { pluginsEn } from './plugins-en';
import { plugins, premiumPlugins } from './plugins';

export type Lang = 'ja' | 'en';

export const SITE = 'https://kizuna-works.jp';

/** Static page pairs: Japanese path -> English path. */
const STATIC_PAIRS: Record<string, string> = {
  '/': '/en/',
  '/plugins/': '/en/plugins/',
  '/about/': '/en/about/',
  '/security/': '/en/security/',
  '/contact/': '/en/contact/',
  '/privacy/': '/en/privacy/',
  '/terms/': '/en/terms/',
  '/refund/': '/en/refund/',
};

const allPlugins = [...plugins, ...premiumPlugins];

function buildPairs(): Map<string, string> {
  const pairs = new Map<string, string>(Object.entries(STATIC_PAIRS));
  for (const p of allPlugins) {
    const en = pluginsEn[p.id];
    if (en?.page) pairs.set(`/plugins/${p.slug}/`, `/en/plugins/${p.slug}/`);
  }
  return pairs;
}

const JA_TO_EN = buildPairs();
const EN_TO_JA = new Map([...JA_TO_EN].map(([ja, en]) => [en, ja]));

function normalize(pathname: string): string {
  let p = pathname.replace(/index\.html$/, '');
  if (!p.endsWith('/')) p += '/';
  return p;
}

/**
 * The Japanese/English pair the given path belongs to, or null when the page exists
 * in one language only. Works from either side.
 */
export function langPair(pathname: string): { ja: string; en: string } | null {
  const p = normalize(pathname);
  if (JA_TO_EN.has(p)) return { ja: p, en: JA_TO_EN.get(p)! };
  if (EN_TO_JA.has(p)) return { ja: EN_TO_JA.get(p)!, en: p };
  return null;
}

/** Whether the product with this id has its own English page. */
export function hasEnPluginPage(id: string): boolean {
  return Boolean(pluginsEn[id]?.page);
}
