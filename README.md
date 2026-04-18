# sqsung blog

A personal blog — "things I've learned here and there." Posts are written as MDX files checked into the repo; there is no CMS, no database, and no runtime content fetching. The site is fully static aside from the MDX renderer running on the server.

Live title: **sqsung**. Author: Kyusung Sohn.

---

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict), path alias `@/*` → `src/*`
- **MDX** via `@next/mdx` + `next-mdx-remote` (v6)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) with `prettier-plugin-tailwindcss`
- **next-themes** for light/dark mode
- **rehype-highlight** + `highlight.js/styles/github-dark.css` for code blocks
- **framer-motion**, **@heroicons/react** for UI
- Dev server uses Turbopack

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000 (Turbopack)

npm run build        # runs index-blogs, then next build
npm start            # serve the production build

npm run index-blogs  # regenerate the MDX index (see below)
npm run lint         # ESLint (flat config, eslint-config-next)
```

---

## The one thing that's non-obvious: posts are pre-compiled at build time

This is the single architectural decision that matters, so future-me: **read this section first.**

MDX is not parsed at request time. Instead, a script crunches every `.mdx` file during `npm run build` and writes the results to `src/contents/generated/`. The running app only reads those generated artifacts.

### The pipeline

1. Author writes `src/contents/<slug>.mdx` with frontmatter (see contract below).
2. `npm run index-blogs` (run automatically by `npm run build`) executes `src/scripts/build-index.ts`, which:
   - Reads every `.mdx` in `src/contents/`
   - Skips posts whose frontmatter has `isPublished: false`
   - Calls `next-mdx-remote/serialize` with `rehype-highlight` on each post
   - Writes each compiled post as JSON to `src/contents/generated/compiled/<slug>.json`
   - Writes a master index to `src/contents/generated/_blog-index.json` with:
     - `sortedPosts` — post metadata sorted by `createdAt` desc
     - `tagToId` / `tagCounts` — tag → post-id lookup (tags are uppercased)
     - `idToPost` — post-id → metadata lookup
     - `totalPosts`, `totalTags`, `lastBuilt`
3. `src/backend/posts.server.ts` is the only module that reads these artifacts. It imports `_blog-index.json` as a static JSON import (bundled) and reads per-post JSON from disk with `fs/promises` inside `getPostById`.

### Why this matters (to future-me who forgot)

- **Editing an MDX file and reloading the dev server isn't enough.** Run `npm run index-blogs` — otherwise the app still reads the old compiled JSON. (If something looks stale, this is almost always why.)
- **Never hand-edit anything under `src/contents/generated/`.** Regenerate it.
- **`isPublished: false` posts never reach the app**, not even as drafts — they get filtered during indexing.

### Frontmatter contract (see `src/types/blog.types.ts`)

```yaml
---
title: "Post title"
summary: "One-sentence description"
tags: ["Frontend", "Nextjs"]   # uppercased by the indexer
createdAt: "2025-06-30"        # ISO date, used for sort order
isPublished: true
---
```

The post `id` is the filename without `.mdx` (e.g. `2025-06-30-on-demand-revalidation`). Date-prefixed slugs are the convention, but only `createdAt` actually drives ordering.

---

## Directory layout

```
src/
├─ app/                          # Next.js App Router
│  ├─ layout.tsx                 # ThemeProvider, Inter + Source Code Pro fonts, Header/Footer shell
│  ├─ page.tsx                   # Landing — latest posts + "See All"
│  ├─ post/[id]/                 # Single post (MDXRemote renders compiled JSON)
│  ├─ posts/[page]/              # Paginated post list
│  ├─ tagged/[tag]/[page]/       # Posts filtered by tag, paginated
│  ├─ tags/                      # All tags with counts
│  ├─ about/
│  └─ globals.css
├─ backend/
│  └─ posts.server.ts            # ONLY place that reads generated/*. All data access goes through here.
├─ components/
│  ├─ blog/                      # BlogCard, BlogList, BlogContentRenderer, Tag, PaginationButtons, …
│  ├─ common/                    # Header, Footer, ThemeToggler, BackButton, Loader, …
│  └─ about/
├─ constants/
│  ├─ posts.constant.ts          # POSTS_PER_PAGE = 5, POST_TTL
│  └─ routes.constant.ts         # ROUTES helpers — use these instead of hardcoding paths
├─ contents/
│  ├─ *.mdx                      # Post sources — edit these
│  ├─ bio/                       # About-page content
│  └─ generated/                 # BUILD OUTPUT. Do not edit. Regenerate with `npm run index-blogs`.
│     ├─ _blog-index.json
│     └─ compiled/<slug>.json
├─ lib/
│  └─ ThemeProvider.tsx          # next-themes wrapper
├─ scripts/
│  └─ build-index.ts             # The indexer. Run via `npm run index-blogs`.
├─ types/                        # BlogMetadata, BlogIndex, Blog
└─ utils/
```

Public assets (images, diagrams, favicons) live in `public/`.

TypeScript has two configs: `tsconfig.json` for the app, and `tsconfig.scripts.json` for the indexer (it runs via `ts-node`, which needs a CommonJS-ish setup distinct from Next's bundler config).

---

## How a request flows

**Landing page (`/`):**
`app/page.tsx` → `getAllPosts(1)` → slices `blogIndex.sortedPosts` → renders `<BlogList>`.

**Single post (`/post/[id]`):**
`app/post/[id]/page.tsx` → `getPostMetadataById(id)` for `generateMetadata` (title, OG tags) → `getPostById(id)` reads `src/contents/generated/compiled/<id>.json` from disk → passes `mdxSource` to `<BlogContentRenderer>` → client-side `<MDXRemote>` renders it with `next/image` injected as the `Image` component.

**Tag pages (`/tagged/[tag]/[page]`):**
`getPostsByTag(tag, page)` uppercases the tag, looks up IDs in `tagToId`, resolves via `idToPost`, slices by `POSTS_PER_PAGE`.

**Tags index (`/tags`):**
`getTags()` returns `tagCounts` directly.

Pagination is uniform: `POSTS_PER_PAGE = 5` (`src/constants/posts.constant.ts`). Routes are always constructed via the `ROUTES` helpers in `src/constants/routes.constant.ts` — don't hardcode paths, and note that `ROUTES.tagged` lowercases the tag for the URL while the index stores tags uppercased.

---

## Adding a new post (the actual checklist)

1. Create `src/contents/YYYY-MM-DD-slug.mdx`.
2. Fill in the frontmatter (all five fields are required).
3. If you reference images, drop them in `public/` and use Next's `<Image>` (already wired into `MDXRemote`).
4. Run `npm run index-blogs` (or just `npm run build`).
5. `npm run dev` to preview.
6. Commit both the `.mdx` and the regenerated `src/contents/generated/**` — the app needs the generated files at runtime.

To unpublish without deleting: set `isPublished: false` and re-run `index-blogs`.

---

## Styling notes

- Tailwind v4 is PostCSS-only — no `tailwind.config.js` needed (there's a minimal `tailwind.config.ts` present but most config lives in `globals.css`).
- Theme switching (`next-themes`) uses `suppressHydrationWarning` on `<html>` in the root layout; don't remove it or you'll get the dark-mode flash warning.
- `blog-post` is the class hook for MDX-rendered content styles; the rest of the UI uses Tailwind utilities directly.
- Code blocks are themed by importing `highlight.js/styles/github-dark.css` in the post page. Highlighting itself runs at build time (`rehype-highlight` in the indexer), not at render.

---

## Deployment

Vercel. `npm run build` produces a fully static site plus the server components needed to render MDX. No env vars, no external services.

---

## Quick reference: "where do I change…?"

| I want to… | Edit |
| --- | --- |
| Write a new post | `src/contents/*.mdx`, then `npm run index-blogs` |
| Change posts-per-page | `src/constants/posts.constant.ts` |
| Change a route path | `src/constants/routes.constant.ts` |
| Tweak post metadata fields | `src/types/blog.types.ts` + `src/scripts/build-index.ts` + `src/backend/posts.server.ts` |
| Change MDX components (e.g. custom `<Callout>`) | `src/components/blog/BlogContentRenderer.tsx` (the `components` prop) |
| Change the code-highlight theme | Swap the `highlight.js/styles/*.css` import in `src/app/post/[id]/page.tsx` |
| Change rehype/remark plugins | `src/scripts/build-index.ts` (the `serialize` call) — then re-index |
| Header / Footer / theme toggle | `src/components/common/` |
