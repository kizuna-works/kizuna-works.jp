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
			ogImage: z.string().optional(),
			author: z.string().optional(),
			tags: z.array(z.string()).optional(),
			// Auto table-of-contents from H2 headings. Shown by default on long posts;
			// set false to suppress (e.g. a post with its own custom in-body TOC).
			toc: z.boolean().optional(),
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
