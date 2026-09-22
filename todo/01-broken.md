# 01 — Broken

- [x] **B1** `/projects` returned 500 in dev (`<Link><a>`). Rebuilt in the site's style, with metadata. Verified 200.
- [x] **B2** Resume added by Euger as `public/euger_bonete_resume_dev.pdf`. Navbar (mobile + desktop) and ⌘K palette now point at it and open in a new tab. Verified 200 `application/pdf`.
- [x] **B3** Email changed from `eugerbone@email.com` to `eugerbone@gmail.com` (confirmed by Euger) in `Bio.tsx`, `Contact.tsx`, `CommandPalette.tsx`.
- [x] **B4** No dead links left in `Bio.tsx`. BSIT and Rocketshyft are plain text; Digipay links to https://digipay.ph/.
- [x] **B5** No visible Blog/Guestbook links at 768–1023px. First fix (four flat links) crowded the navbar at every width. Replaced with a shadcn-style Navigation Menu: **Work** (Projects, Experience, Contact) and **Explore** (Blog, Guestbook), opening on hover, click or keyboard. Verified in a real browser at 1905px and 800px, dark and light.
- [x] **B6** Blog rendered Markdown literally. Added `InlineMarkdown` (code spans + links). Verified `useChat` now renders as `<code>`.
- [x] **B7** (found during fixes) Light theme had `--c-text-4: #bbbbb` (5-digit, invalid hex). Fixed to `#bbbbbb`.
