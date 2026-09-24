# 05 — Feature audit & suggestions

Audit date: 2026-09-23. Read through routes, data, and components as they stand on `main` after the guestbook/Neon merge. These are suggestions, not started — nothing here is `[x]` yet. Priority is my read of impact vs. effort; you know the actual goals better.

## Urgent — do this before the guestbook gets linked anywhere public

- [x] **F1** Guestbook now has a honeypot field (`GuestbookForm.tsx`, hidden `website` input — real visitors never see it, bots that fill every field trip it and get a fake success) plus a server-side rate limit (`src/lib/db.ts`: `guestbook_rate_limits` table, 30s minimum gap per IP, keyed off `x-forwarded-for`/`x-real-ip` in `actions.ts`). Verified the rate-limit logic directly against the live Neon table. **Still true:** this is IP-based, so it won't stop a distributed/rotating-IP bot — if that ever happens, add Cloudflare Turnstile or Vercel's firewall on top.

## High impact, low effort

- [x] **F2** Added `@vercel/analytics` + `@vercel/speed-insights`, dropped into `layout.tsx`. Visitor counts and Core Web Vitals will show up in the Vercel dashboard once this deploys — no dashboard toggle needed on the free tier.
- [x] **F3** Added generated `opengraph-image` (via `next/og`'s `ImageResponse`) to home, `/projects`, each project detail page, `/blog`, each post, and `/side-projects` — a shared dark-theme card (`src/lib/og.tsx`) with eyebrow/title/subtitle, matching the site's actual colors. All per-slug images are statically prerendered (`generateStaticParams` on each `opengraph-image.tsx`, confirmed in the build output as SSG, not on-demand). Verified visually — both the home and project images render correctly and read as intentional design, not a placeholder.
- [x] **F4** Added a `Person`/`WebSite` JSON-LD block in `layout.tsx` (job title, description, `sameAs` linking GitHub/LinkedIn). Verified it renders in page source.
- [x] **F5** Added `/feed.xml` (`src/app/feed.xml/route.ts`, a Route Handler, `force-static`) covering all posts sorted by date. Linked via `alternates.types` on `/blog`'s metadata and a visible "RSS" link next to the Blog heading. Verified the XML is well-formed and all four posts appear.

## Guestbook follow-ups (now that it's real)

- [x] **F6** Added pagination: `getGuestbookEntries` now takes `limit`/`offset` (`GUESTBOOK_PAGE_SIZE = 20`), the page reads `?page=` from `searchParams` and shows "N messages — page X of Y" plus newer/older links once there's more than one page. Verified the LIMIT/OFFSET query against the live DB and that both `/guestbook` and `/guestbook?page=2` render.
- [x] **F7** Documented the moderation path in README (Neon console steps + a raw `DELETE` query) rather than building an admin UI — didn't want to add a second, unauthenticated-by-default surface without a real auth decision first. If this becomes a frequent need, a password-gated `/guestbook/admin` is the next step.

## Blog

- [~] **F8** Added fenced-code-block support: `src/lib/markdown.ts` (`parseBlocks`) splits post content into paragraphs and ` ```lang ` blocks before `InlineMarkdown` ever sees it, so a fenced block no longer gets mangled by paragraph-splitting or the inline-code regex; `CodeBlock.tsx` renders it with the language label, monospace, preserved whitespace, horizontal scroll. Verified against a sample block (paragraphs/code/lang all split correctly) and confirmed the build/existing posts are unaffected (none currently use fences). **Remaining:** this is layout only, no actual syntax coloring — that needs a highlighter (e.g. Shiki) and is worth doing once you actually write a code-heavy post.
- [x] **F9** Added a `readingTime()` helper (`src/data/posts.ts`, ~200wpm) shown on both `/blog` and each post page next to the date. Tags/categories/search still not done — only worth it once there are more than ~6 posts.

## Projects

- [x] **F10** Done as N6: screenshots on every project detail page. The `/projects` list now shows each one as a thumbnail too, to the left of the text from 640px up and full width above it on phones. Decorative `alt=""`, because the title sits right next to it. Also: `.post-link` now highlights on keyboard focus as well as hover, and the Explore menu description mentions Side Projects and Uses.
- [~] **F11** Added tech-stack pill tags under each card on `/projects` (extracted a shared `TechTags.tsx`, also now used on the detail page instead of its old inline-duplicated version). Verified they render (`Next.js`/`Supabase`/`Cloudflare` all found in the list page HTML) and the full build succeeds. **Remaining:** no actual *filtering* — visitors can now scan for "Supabase" but can't click a tag to filter the list. Worth adding once there are enough projects that scanning stops being enough (currently only 5).

## Nice-to-have / lower priority

- [x] **F12** Added `/uses` (`src/data/uses.ts`, same shape as `side-projects.ts`): editor & terminal, stack, services, and this site's fonts and icons. Linked from the Explore menu, the ⌘K palette and the sitemap, with its own OG image. Every entry is verifiable from this repo, the client projects or the dev machine (VS Code, WSL 2 on Ubuntu). **Euger to add:** hardware and personal apps. They're left out rather than shown as placeholders.
- [ ] **F13** `FixedChrome`'s GitHub widget only shows today's push count — could expand into a small contribution heatmap (GitHub's public events API supports this) for more visual signal than a single number.
- [ ] **F14** No PWA manifest (`manifest.ts`) — low value for a portfolio, skip unless you specifically want "Add to Home Screen".
- [x] **F15** Added a real contact form (`ContactForm.tsx` + `contact-actions.ts`) below the existing mailto/GitHub/LinkedIn links, sending via Resend. Reuses F1's anti-spam pattern (honeypot + rate limit) — and in the process, generalized the guestbook's rate limit into a shared `rate_limits` table (`scope`, `identifier`) in `src/lib/db.ts` instead of two near-identical tables. Verified: `tsc` clean, full build succeeds, the generalized rate-limit table round-tripped against live Neon, form confirmed rendering on the homepage, and a real send through `RESEND_API_KEY` was confirmed delivered.
