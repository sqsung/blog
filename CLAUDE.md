# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (Turbopack).
- `npm run build` — runs `index-blogs` first, then `next build`. **Always run `index-blogs` (or a full build) after editing MDX posts**, otherwise dev/prod won't see the new content.
- `npm run index-blogs` — regenerate `src/contents/generated/_blog-index.json` and per-post compiled JSON in `src/contents/generated/compiled/`.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- `npm start` — serve the production build.

TypeScript path alias: `@/*` → `src/*`. The index-generator script uses a separate `tsconfig.scripts.json`.

## Architecture

This is a Next.js 15 (App Router, React 19) personal blog. Posts are authored as MDX in `src/contents/*.mdx` and served from a **pre-compiled index** rather than parsed/serialized at request time.

### Build-time MDX compilation

`src/scripts/build-index.ts` runs during `npm run build`:

1. Reads every `.mdx` file in `src/contents/`.
2. Skips any whose frontmatter has `isPublished: false`.
3. Calls `next-mdx-remote/serialize` with `rehype-highlight` and writes each compiled post to `src/contents/generated/compiled/<postId>.json`.
4. Builds `src/contents/generated/_blog-index.json` containing `sortedPosts`, `tagToId`, `tagCounts`, `idToPost`, and counts. Tags are normalized to uppercase. Posts are sorted by `createdAt` desc.

The `generated/` directory is the single source of truth the running app reads from. Never edit files there by hand — regenerate them via `npm run index-blogs`.

### Runtime data access

`src/backend/posts.server.ts` is the only module that touches post data. It imports `_blog-index.json` as a static JSON import (bundled at build time) for metadata/tag lookups, and reads per-post compiled JSON from disk via `fs/promises` inside `getPostById`. Pagination uses `POSTS_PER_PAGE` from `src/constants/`.

### MDX frontmatter contract

Every post must supply: `title`, `summary`, `tags` (string array), `createdAt` (ISO date), `isPublished` (boolean). The `id` is derived from the filename (without `.mdx`). See `src/types/blog.types.ts`.

### App Router layout

Routes live in `src/app/`: `post/[id]`, `posts/[page]` (paginated list), `tagged/[tag]`, `tags`, `about`. Root layout wires `ThemeProvider` (`next-themes`), Header, Footer, and Inter + Source Code Pro fonts. Tailwind v4 via `@tailwindcss/postcss`.
