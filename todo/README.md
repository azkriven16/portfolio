# Portfolio audit — tracker

Source of truth is the checkbox in each file. Update it when an item lands.

- `[ ]` open  `[~]` in progress  `[x]` done  `[?]` blocked, needs an answer from Euger

| File | Scope |
| --- | --- |
| [01-broken.md](01-broken.md) | Bugs and dead ends visitors can hit today |
| [02-not-real.md](02-not-real.md) | Things that claim to work but don't, or contradict each other |
| [03-missing.md](03-missing.md) | SEO, accessibility, tooling, features that don't exist yet |
| [04-cleanup.md](04-cleanup.md) | Dead code, unused deps, leftovers |
| [05-features.md](05-features.md) | Suggested features and follow-ups |

Audit date: 2026-09-19. Verified with `tsc --noEmit`, `next build`, and a `curl` sweep of every route.

## Status (updated 2026-09-25)

01–04 are done except **B9** (Vercel previews fail, deferred). What's left is optional:

| Item | State | Note |
| --- | --- | --- |
| B9 Vercel previews | open | Needs old Neon `preview/*` branches deleted (steps in 01) |
| F14 PWA manifest | open | Suggest skipping |
| M10, F12 content | Euger | Review side-project wording; add hardware to `/uses` |
