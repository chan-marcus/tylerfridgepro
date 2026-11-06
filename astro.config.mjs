import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { typesetDist } from './scripts/typeset.mjs';

// Binds proper nouns and fixes straggler words in the built HTML
// (see scripts/typeset.mjs).
const typeset = {
  name: 'typeset',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const n = typesetDist(fileURLToPath(dir));
      logger.info(`Typeset running text in ${n} pages`);
    }
  }
};

export default defineConfig({
  site: 'https://tylerfridgepro.com',
  integrations: [sitemap(), typeset],
  build: { inlineStylesheets: 'always' }
});
