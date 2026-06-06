// ブログ各記事の OGP バナーをビルド時に PNG 生成する静的エンドポイント。
// URL: /og/blog/<slug>.png
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderBanner } from '../../../lib/og-banner';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: any };
  const png = await renderBanner({
    title: post.data.title,
    tags: post.data.tags ?? [],
    slug: post.id,
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
