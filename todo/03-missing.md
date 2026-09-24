# 03 — Missing

- [x] **M1** Added `metadataBase`, OpenGraph + Twitter metadata (in `layout.tsx`) and `robots.ts`. Generated `opengraph-image`s were added later in F3.
- [x] **M2** Project pages now have `generateMetadata` and `generateStaticParams` (5 pages prerendered).
- [x] **M3** Sitemap includes `/projects/*`; URL constants live in `src/lib/site.ts`. Real domain confirmed by Euger: `https://euger.vercel.app` (now the default in `src/lib/site.ts`).
- [x] **M4** Theme flash fixed with a pre-paint script in `layout.tsx`; `ThemeProvider` syncs from it. Default stays dark (dark-first design), so `prefers-color-scheme` is deliberately not used.
- [x] **M5** `prefers-reduced-motion` CSS added. Grain no longer redraws every frame when static (it was re-rendering at 60fps even with `animated={false}`).
- [x] **M6** Palette now has `role="dialog"`/`aria-modal`/labels and restores focus on close. Shortcut hint is platform-aware, navbar logo uses `Link`. Tab/Shift+Tab now cycle inside the palette, and the highlighted result follows keyboard focus. Every element whose styles or icon animations changed only on hover now also changes on focus: navbar icons (on keyboard focus only, so a tapped theme toggle doesn't stay lit), search button, project links, contact/bio links, form buttons, footer and 404 links, and the blog/guestbook Tailwind links. Verified in headless Chromium: 18 Tabs never left the palette, and the header icons pick up their hover colors when tabbed to.
- [~] **M7** No ESLint config, no lint script, no CI build/typecheck. Needs `eslint` + `eslint-config-next` (flat config; `next lint` is gone) and a workflow step. **In PR #19** (`chore/eslint-ci`); its CI run passed. **Remaining:** merge.
- [x] **M8** No contact form, no analytics, no `opengraph-image`. All three shipped: contact form (F15), Vercel Analytics + Speed Insights (F2), `opengraph-image` (F3).
- [ ] **M9** Contrast: dark-theme `--c-text-3` (`#666` on `#111`, about 3.3:1) and `--c-text-4` are below WCAG AA for small text. Visual decision.
- [x] **M10** `/side-projects` page added (Explore menu, ⌘K palette, sitemap). Six repos from github.com/azkriven16, copy taken from their READMEs. Demos for Animinji, eugui and ChatApp returned 404, so those link to code only. **Euger to review** which projects to feature and the wording (`src/data/side-projects.ts`).
