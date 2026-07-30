import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			/**
			 * REQUIRED. Path under /public to the article's banner
			 * (e.g. "/images/blog/kintone-tempu-file.png", 1200x630).
			 * Doubles as the og:image, the article header image, and the card
			 * thumbnail in listings / related posts.
			 *
			 * Banners are produced per article by hand (Gemini) — the build-time
			 * auto-generator was removed on 2026-07-30 because all 32 posts already
			 * shipped a hand-made banner, so it rendered 64 unused images per build.
			 * Required on purpose: forgetting it must fail the build rather than
			 * silently fall back to a generic image.
			 */
			ogImage: z.string(),
			author: z.string().optional(),
			tags: z.array(z.string()).optional(),
			// Auto table-of-contents from H2 headings. Shown by default on long posts;
			// set false to suppress (e.g. a post with its own custom in-body TOC).
			toc: z.boolean().optional(),
			// Keep the post out of the search index (robots noindex + excluded from the
			// sitemap in astro.config.mjs). For posts that exist as documentation for
			// current users but target a phrase with no search demand, so Google would
			// leave them "crawled - currently not indexed" anyway.
			noindex: z.boolean().optional(),
		}),
});

const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum(['release', 'update', 'incident', 'notice']),
		externalUrl: z.string().url().optional(),
		/**
		 * Path under /public for the OGP image (e.g. "/images/field-styler-after.png").
		 * Falls back to the site-wide default when omitted. Use the plugin / extension /
		 * blog banner that the news entry refers to so SNS shares get a relevant thumb.
		 */
		ogImage: z.string().optional(),
	}),
});

export const collections = { blog, news };
