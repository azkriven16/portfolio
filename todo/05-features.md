# 05 — Feature audit & suggestions

Audit date: 2026-09-23. Read through routes, data, and components as they stand on `main` after the guestbook/Neon merge. These are suggestions, not started — nothing here is `[x]` yet. Priority is my read of impact vs. effort; you know the actual goals better.

## Urgent — do this before the guestbook gets linked anywhere public

- [x] **F1** Guestbook now has a honeypot field (`GuestbookForm.tsx`, hidden `website` input — real visitors never see it, bots that fill every field trip it and get a fake success) plus a server-side rate limit (`src/lib/db.ts`: `guestbook_rate_limits` table, 30s minimum gap per IP, keyed off `x-forwarded-for`/`x-real-ip` in `actions.ts`). Verified the rate-limit logic directly against the live Neon table. **Still true:** this is IP-based, so it won't stop a distributed/rotating-IP bot — if that ever happens, add Cloudflare Turnstile or Vercel's firewall on top.

## High impact, low effort

- [x] **F2** Added `@vercel/analytics` + `@vercel/speed-insights`, dropped into `layout.tsx`. Visitor counts and Core Web Vitals will show up in the Vercel dashboard once this deploys — no dashboard toggle needed on the free tier.
- [ ] **F3** No `opengraph-image` (already flagged as M8) — link previews on Discord/Twitter/Slack/iMessage show text only. `next/og`'s `ImageResponse` can generate one per route (home, each project, each blog post) without needing a design tool.
- [x] **F4** Added a `Person`/`WebSite` JSON-LD block in `layout.tsx` (job title, description, `sameAs` linking GitHub/LinkedIn). Verified it renders in page source.
- [x] **F5** Added `/feed.xml` (`src/app/feed.xml/route.ts`, a Route Handler, `force-static`) covering all posts sorted by date. Linked via `alternates.types` on `/blog`'s metadata and a visible "RSS" link next to the Blog heading. Verified the XML is well-formed and all four posts appear.

## Guestbook follow-ups (now that it's real)

- [x] **F6** Added pagination: `getGuestbookEntries` now takes `limit`/`offset` (`GUESTBOOK_PAGE_SIZE = 20`), the page reads `?page=` from `searchParams` and shows "N messages — page X of Y" plus newer/older links once there's more than one page. Verified the LIMIT/OFFSET query against the live DB and that both `/guestbook` and `/guestbook?page=2` render.
- [x] **F7** Documented the moderation path in README (Neon console steps + a raw `DELETE` query) rather than building an admin UI — didn't want to add a second, unauthenticated-by-default surface without a real auth decision first. If this becomes a frequent need, a password-gated `/guestbook/admin` is the next step.

## Blog

- [~] **F8** Added fenced-code-block support: `src/lib/markdown.ts` (`parseBlocks`) splits post content into paragraphs and ` ```lang ` blocks before `InlineMarkdown` ever sees it, so a fenced block no longer gets mangled by paragraph-splitting or the inline-code regex; `CodeBlock.tsx` renders it with the language label, monospace, preserved whitespace, horizontal scroll. Verified against a sample block (paragraphs/code/lang all split correctly) and confirmed the build/existing posts are unaffected (none currently use fences). **Remaining:** this is layout only, no actual syntax coloring — that needs a highlighter (e.g. Shiki) and is worth doing once you actually write a code-heavy post.
- [x] **F9** Added a `readingTime()` helper (`src/data/posts.ts`, ~200wpm) shown on both `/blog` and each post page next to the date. Tags/categories/search still not done — only worth it once there are more than ~6 posts.

## Projects

- [ ] **F10** No screenshots on any project (already tracked as N6). Worth doing alongside F3 (OG images) since both need real images per project.
- [ ] **F11** No tech-stack badges/filtering on `/projects` — you list stack in the bullets/prose, but a visitor scanning for "does this person know Supabase" has to read every card.

## Nice-to-have / lower priority

- [ ] **F12** A `/uses` or `/now` page — common in dev portfolios, cheap to build (static data, same shape as `side-projects.ts`), gives returning visitors and recruiters something to check back on.
- [ ] **F13** `FixedChrome`'s GitHub widget only shows today's push count — could expand into a small contribution heatmap (GitHub's public events API supports this) for more visual signal than a single number.
- [ ] **F14** No PWA manifest (`manifest.ts`) — low value for a portfolio, skip unless you specifically want "Add to Home Screen".
- [ ] **F15** Contact is mailto-only (tracked as M8). A real form needs a mail-sending service (Resend, or Cloudflare Email Service since you already use Cloudflare skills) plus the same spam concerns as F1 — bundle this with F1's rate-limiting work if you do it.
