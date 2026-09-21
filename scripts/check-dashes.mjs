// Fails the build if an em dash reaches the rendered site.
//
// Scans dist/ rather than src/ because that is what visitors and Google see:
// it catches literal em dashes, HTML entities, and "--" in Markdown, which
// Astro's smartypants turns into an em dash at render time.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const TEXT = /\.(html|xml|txt|svg|json|js|css|webmanifest)$|^_headers$|^_redirects$/;
const EM_DASH = /—|&mdash;|&#8212;|&#x2014;/gi;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (TEXT.test(name)) yield path;
  }
}

const hits = [];
for (const file of walk(DIST)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(EM_DASH)) {
      const start = Math.max(0, m.index - 50);
      const snippet = line.slice(start, m.index + 50).replace(/<[^>]*>/g, ' ').trim();
      hits.push(`  ${relative(DIST, file)}:${i + 1}  ...${snippet}...`);
    }
  });
}

if (hits.length) {
  console.error(`\nEm dash check failed: ${hits.length} found in the built site.\n`);
  console.error(hits.join('\n'));
  console.error('\nRewrite with a comma, colon, period, or parentheses. In Markdown, a double hyphen (--) also renders as an em dash.\n');
  process.exit(1);
}
console.log('Em dash check passed: none in the built site.');
