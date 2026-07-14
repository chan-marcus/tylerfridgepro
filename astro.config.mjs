import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tylerfridgepro.com',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' }
});
