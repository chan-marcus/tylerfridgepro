# Tyler Fridge Pro

Static Astro lead-gen site for a commercial refrigeration business in Tyler, TX.

## Writing rules (all site copy, especially blog posts)

- **No em dashes, ever.** Use a comma, colon, period, or parentheses instead.
  A double hyphen (`--`) in Markdown also renders as an em dash, so avoid it too.
  `npm run build` runs `scripts/check-dashes.mjs` on the built site and fails
  if one appears, which also blocks the Cloudflare deploy.
- No fabricated ratings, review counts, customer counts, or credentials.
- Commercial equipment only. The business does not repair household refrigerators.
- Keep factual claims general unless sourced. No invented statistics.

## Blog posts

- Posts live in `src/content/blog/*.md`. Frontmatter is exactly `title`, `description`, `date`.
- Titles start with the target keyword, roughly 60 characters or less before the brand suffix.
- Descriptions around 150 to 160 characters.
- Mention Tyler or East Texas, and link to the relevant `/services/<slug>/` pages.
- Each post gets an SVG in `public/blog/`, 1200x630, dark theme (`#0B1520` ground,
  `#4FD1E9` accent), with descriptive `aria-label` and alt text. If the diagram
  numbers items, the numbering and wording must match the article.
- Do not date posts in the future.

## Data files

`src/data/services.ts` must stay apostrophe-free (strings are single-quoted).
