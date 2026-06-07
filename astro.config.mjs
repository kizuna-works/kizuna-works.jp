// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- lastmod resolution -----------------------------------------------------
// At build time we walk content collections and the plugins data file to map
// each public URL to its most recent meaningful change date. The `serialize`
// hook below attaches these as <lastmod> in sitemap-0.xml so Google can detect
// updated pages faster (especially for the news collection).

/** Parse the YAML frontmatter of an .md/.mdx file and return updatedDate ?? pubDate. */
function parseFrontmatterDate(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return null;
    const block = m[1];
    const updated = block.match(/^updatedDate:\s*([^\n]+)/m);
    const pub = block.match(/^pubDate:\s*([^\n]+)/m);
    const raw = (updated ?? pub)?.[1]?.trim();
    if (!raw) return null;
    // Strip surrounding quotes; keep just the YYYY-MM-DD portion if datetime.
    const cleaned = raw.replace(/^["']|["']$/g, '');
    const isoMatch = cleaned.match(/^\d{4}-\d{2}-\d{2}/);
    return isoMatch ? isoMatch[0] : null;
  } catch {
    return null;
  }
}

function buildContentDateMap(dirRel) {
  const dir = path.join(__dirname, dirRel);
  const map = {};
  for (const f of readdirSync(dir)) {
    if (!/\.(md|mdx)$/.test(f)) continue;
    const slug = f.replace(/\.(md|mdx)$/, '');
    const date = parseFrontmatterDate(path.join(dir, f));
    if (date) map[slug] = date;
  }
  return map;
}

const newsDates = buildContentDateMap('src/content/news');
const blogDates = buildContentDateMap('src/content/blog');

// plugins.ts: extract `slug: 'xxx', ... releaseDate: 'YYYY-MM-DD'` pairs.
function buildPluginDateMap() {
  const map = {};
  try {
    const file = readFileSync(path.join(__dirname, 'src/data/plugins.ts'), 'utf-8');
    const re = /slug:\s*'([^']+)'[\s\S]*?releaseDate:\s*'(\d{4}-\d{2}-\d{2})'/g;
    let m;
    while ((m = re.exec(file)) !== null) {
      map[m[1]] = m[2];
    }
  } catch {
    /* fall through with empty map */
  }
  return map;
}
const pluginDates = buildPluginDateMap();

// tools.ts: extract `file: 'xxx.html'` entries → standalone tool URLs for the sitemap.
function buildToolUrls() {
  try {
    const file = readFileSync(path.join(__dirname, 'src/data/tools.ts'), 'utf-8');
    const re = /file:\s*'([^']+\.html)'/g;
    const urls = [];
    let m;
    while ((m = re.exec(file)) !== null) {
      urls.push(`https://kizuna-works.jp/tools/${m[1]}`);
    }
    return urls;
  } catch {
    return [];
  }
}
const toolUrls = buildToolUrls();

function resolveLastmod(url) {
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return null;
  }
  let m;
  if ((m = pathname.match(/^\/news\/([^/]+)\/?$/))) return newsDates[m[1]] ?? null;
  if ((m = pathname.match(/^\/blog\/([^/]+)\/?$/))) return blogDates[m[1]] ?? null;
  if ((m = pathname.match(/^\/plugins\/([^/]+)\/?$/))) return pluginDates[m[1]] ?? null;
  return null;
}

export default defineConfig({
  site: 'https://kizuna-works.jp',
  integrations: [
    mdx(),
    sitemap({
      customPages: [...toolUrls],
      // Exclude supporter-only request form from sitemap (URL-only access for supporters)
      filter: (page) => !page.includes('/plugins/supporter/request/'),
      serialize(item) {
        const lastmod = resolveLastmod(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
