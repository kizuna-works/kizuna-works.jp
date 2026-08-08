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

/**
 * Blog posts whose frontmatter sets `noindex: true`. They render a robots noindex
 * tag (see BlogPost.astro) and are dropped from the sitemap here, so the two never
 * disagree. Reading the frontmatter keeps this list from drifting as posts change.
 */
function buildNoindexBlogPaths() {
  const dir = path.join(__dirname, 'src/content/blog');
  const paths = [];
  for (const f of readdirSync(dir)) {
    if (!/\.(md|mdx)$/.test(f)) continue;
    try {
      const m = readFileSync(path.join(dir, f), 'utf-8').match(/^---\n([\s\S]*?)\n---/);
      if (m && /^noindex:\s*true\s*$/m.test(m[1])) {
        paths.push(`/blog/${f.replace(/\.(md|mdx)$/, '')}/`);
      }
    } catch {
      /* unreadable file: leave it in the sitemap rather than guess */
    }
  }
  return paths;
}
const noindexBlogPaths = buildNoindexBlogPaths();

/**
 * Glossary terms carrying `supersededBy` in glossary.ts. Those pages render a
 * robots noindex tag (see glossary/[id]/index.astro) because a blog post ranks
 * better for the same queries, so they must leave the sitemap too. Parsed from
 * the source so the two lists cannot drift apart.
 */
function buildSupersededGlossaryPaths() {
  try {
    const src = readFileSync(path.join(__dirname, 'src/data/glossary.ts'), 'utf-8');
    return src
      .split(/\n  \{\n/)
      .slice(1)
      .filter((b) => /supersededBy: \{/.test(b))
      .map((b) => b.match(/\n?\s*id: '([a-z0-9-]+)'/))
      .filter(Boolean)
      .map((m) => `/glossary/${m[1]}/`);
  } catch {
    /* unreadable: leave them in the sitemap rather than guess */
    return [];
  }
}
const supersededGlossaryPaths = buildSupersededGlossaryPaths();

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
      // Exclude from sitemap:
      // - supporter-only request form (URL-only access for supporters)
      // - blog announcement news pages (noindex; they duplicate the blog article)
      // - blog posts with `noindex: true` in frontmatter
      // - glossary terms with `supersededBy` (a blog post owns those queries)
      filter: (page) =>
        !page.includes('/plugins/supporter/request/') &&
        !page.includes('/news/blog-') &&
        !noindexBlogPaths.some((p) => page.endsWith(p)) &&
        !supersededGlossaryPaths.some((p) => page.endsWith(p)),
      serialize(item) {
        const lastmod = resolveLastmod(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
