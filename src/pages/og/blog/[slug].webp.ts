// ブログ各記事の自動バナーを WebP でも生成する静的エンドポイント（ページ表示の軽量化用）。
// URL: /og/blog/<slug>.webp  ／ og:image 用の PNG は [slug].png.ts のまま維持。
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
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
  const webp = await sharp(png).webp({ quality: 82 }).toBuffer();
  return new Response(new Uint8Array(webp), {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
