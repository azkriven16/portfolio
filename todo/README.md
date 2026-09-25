# Portfolio audit — tracker

Source of truth is the checkbox in each file. Update it when an item lands.

- `[ ]` open  `[~]` in progress  `[x]` done  `[-]` skipped  `[?]` blocked, needs an answer from Euger

| File | Scope |
| --- | --- |
| [01-broken.md](01-broken.md) | Bugs and dead ends visitors can hit today |
| [02-not-real.md](02-not-real.md) | Things that claim to work but don't, or contradict each other |
| [03-missing.md](03-missing.md) | SEO, accessibility, tooling, features that don't exist yet |
| [04-cleanup.md](04-cleanup.md) | Dead code, unused deps, leftovers |
| [05-features.md](05-features.md) | Suggested features and follow-ups |

Audit date: 2026-09-19. Verified with `tsc --noEmit`, `next build`, and a `curl` sweep of every route.

## Status (updated 2026-09-25)

Everything is done except one optional content check:

| Item | State | Note |
| --- | --- | --- |
| M10 side-project wording | Euger | Review which projects to feature and the copy in `src/data/side-projects.ts` |

Skipped by decision: F14 (PWA manifest).
