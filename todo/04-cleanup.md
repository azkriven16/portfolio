# 04 — Cleanup

- [x] **C1** Removed unused `framer-motion`. **`motion` stays:** it's a peer dependency of `lucide-animated`. (The first audit was wrong about this.)
- [x] **C2** Deleted unused `EarthIcon.tsx` (and the empty `icons/` folder).
- [x] **C3** Removed the `picsum.photos` image pattern from `next.config.ts`.
- [x] **C4** Deleted the five default create-next-app SVGs from `public/`.
- [x] **C5** `package.json` name is now `portfolio`.
- [x] **C6** Removed the stray `onMouseEnter={undefined}` in `blog/page.tsx`.
