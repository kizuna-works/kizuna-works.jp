// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kizuna-works.jp',
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        'https://kizuna-works.jp/tools/stamp-maker.html',
        'https://kizuna-works.jp/tools/natsuin.html',
        'https://kizuna-works.jp/tools/musubi.html',
        'https://kizuna-works.jp/tools/KizunaTsumugi.html',
        'https://kizuna-works.jp/tools/masuku.html',
      ],
    }),
  ],
});
