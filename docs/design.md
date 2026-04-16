# Portfolio — Design System

## Aesthetic
Minimal / Clean — whitespace-heavy, typography-first, subtle interactions.

## Color Palette
| Token | Value | Usage |
|---|---|---|
| `background` | `#ffffff` | Page background |
| `surface` | `#f9f9f9` | Cards, subtle section backgrounds |
| `border` | `#e5e5e5` | Dividers, card borders |
| `text-primary` | `#111111` | Headings, body copy |
| `text-secondary` | `#555555` | Subheadings, metadata |
| `text-muted` | `#999999` | Captions, labels |
| `accent` | `#2563eb` | Links, CTA buttons, highlights (blue-600) |
| `accent-hover` | `#1d4ed8` | Hover state for accent (blue-700) |

> Accent color TBD — blue is a safe default, can swap to a personal preference.

## Typography
| Role | Font | Size | Weight |
|---|---|---|---|
| Display (hero name) | Geist / Inter | 4xl–6xl | 700 |
| Section headings | Geist / Inter | 2xl–3xl | 600 |
| Body | Geist / Inter | base (16px) | 400 |
| Labels / tags | Geist Mono | sm | 500 |
| Code snippets | Geist Mono | sm | 400 |

## Spacing Scale
Using Tailwind's default spacing. Key layout values:
- Section padding: `py-20` (80px top/bottom)
- Container max-width: `max-w-4xl` centered with `mx-auto px-6`
- Card gap: `gap-6`

## Animations
- Scroll-triggered fade-in + slide-up via Framer Motion (`initial: { opacity: 0, y: 20 }`)
- Hover transitions: `duration-150 ease-in-out` on interactive elements
- No heavy or distracting animations — subtle and purposeful only

## Responsive Breakpoints
| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | 375px | Single column, stacked |
| Tablet | 768px | Some two-column grids |
| Desktop | 1280px | Full layout |

## Component Patterns
- Cards: white bg, `border border-[#e5e5e5]`, `rounded-xl`, subtle shadow on hover
- Buttons: filled (accent bg) and ghost (border only) variants
- Tags: `bg-[#f9f9f9] border rounded-full px-3 py-1 text-sm font-mono`
