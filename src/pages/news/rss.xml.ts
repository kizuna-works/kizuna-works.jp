import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

const categoryLabels: Record<string, string> = {
  release: '新着リリース',
  update: 'アップデート',
  incident: '障害情報',
  notice: 'お知らせ',
};

export async function GET(context: APIContext) {
  const items = (await getCollection('news')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: 'KIZUNA Works お知らせ',
    description:
      'KIZUNA Worksの新着リリース・サイトアップデート・kintone関連の障害情報など、最新のお知らせ。',
    site: context.site ?? 'https://kizuna-works.jp',
    items: items.map((item) => ({
      title: item.data.title,
      pubDate: item.data.pubDate,
      description: item.data.description,
      link: item.data.externalUrl ?? `/news/${item.id}/`,
      categories: [categoryLabels[item.data.category]],
    })),
    customData: '<language>ja</language>',
  });
}
