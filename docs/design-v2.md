# Portfolio — Apple-Quality Design Plan (v2)

> Goal: Make every section feel like an Apple product launch page — cinematic scroll animations,
> large expressive typography, deliberate whitespace, immersive section transitions, and
> micro-interactions that feel alive.

---

## Reference Targets

- apple.com/iphone (scroll-pinned feature reveals, text that animates in/out with scroll)
- apple.com/macbook-pro (parallax product visuals, sticky text, gradient backgrounds)
- linear.app (smooth dark sections, floating UI mockups, feature cards)
- vercel.com (gradient mesh, clean type, animated logos)
- stripe.com (gradient backgrounds that shift, bold section headers)

---

## New Libraries Needed

| Library | Purpose |
|---|---|
| `framer-motion` (already installed) | Scroll-linked animations via `useScroll` + `useTransform` |
| `@react-spring/web` | Spring-physics micro-interactions (magnetic hover, button press) |
| No extra needed for gradients | Pure CSS + Tailwind |

Actually we can do everything with just `framer-motion` — it covers scroll animations, spring physics, layout animations, and gesture interactions.

---

## Typography System Upgrade

### Current problem
- Headings are standard weight and size, no character
- No expressive display type

### New system
```
Display (Hero name):   Clamp 64px → 96px, weight 800, tracking -0.04em, leading 0.9
Section headings:      48–64px, weight 700, tracking -0.03em
Sub-headings:          20–24px, weight 500, tracking -0.01em
Body:                  16–18px, weight 400, line-height 1.7
Labels / mono:         11–12px, uppercase, letter-spacing 0.12em
```

Use CSS `clamp()` for fluid type that scales between viewport widths:
```css
--text-display: clamp(3.5rem, 8vw, 6rem);
--text-heading: clamp(2rem, 5vw, 3.5rem);
```

---

## Color & Visual System Upgrade

### Palette
```
Background:       #ffffff (pure white)
Surface dark:     #0a0a0a (near-black, for alternating dark sections)
Text on white:    #0a0a0a
Text on dark:     #f5f5f7  ← Apple's exact off-white
Accent:           oklch(52% 0.22 262)  ← indigo/blue
Accent warm:      oklch(65% 0.18 30)   ← amber, for contrast
Gradient A:       oklch(60% 0.22 262)  ← blue
Gradient B:       oklch(55% 0.2 300)   ← purple
```

### Background treatments per section
| Section   | Background |
|---|---|
| Hero      | White + subtle dot grid + floating gradient orbs (blue + purple) |
| Projects  | White → very light grey at bottom |
| Experience| Near-black (#0a0a0a) with glowing cards — **dark section** |
| Contact   | White with large gradient mesh at bottom |

The dark Experience section creates a dramatic contrast flip, exactly like Apple's product pages alternating between white and black sections.

---

## Section-by-Section Design Plan

### 1. Navbar
**Current**: Basic links
**New**:
- Blur backdrop on scroll (already have) — increase blur to `backdrop-blur-xl`
- "EB" monogram logo with a subtle gradient fill (blue→purple)
- Nav links get an animated underline that slides in from the left
- Add a `Resume` CTA button (ghost style) on the right
- On mobile: hamburger menu with a slide-down panel (framer-motion `AnimatePresence`)

### 2. Hero — "Cinematic Intro"
**Current**: Basic text stagger
**New full treatment**:

**Layout**: Full viewport height, vertically centred, text left-aligned

**Background**:
- Large gradient orb (blue/indigo, 600px) top-right, blurred 80px, opacity 30%, animated with `animate-float`
- Second gradient orb (purple, 400px) bottom-left, blurred 60px, opacity 20%
- Dot grid overlay at 50% opacity

**Text animations** (staggered, spring easing):
1. "Hi, I'm" label slides up with delay 0
2. Name (`Euger Bonete Jr`) — each **word** animates in separately with `staggerChildren: 0.08`
3. "Full-Stack Developer" title fades + slides up
4. Tagline fades up
5. CTA buttons scale in from 0.95 → 1

**Name treatment**:
- `Euger` in text-primary
- `Bonete Jr` — gradient text (blue → purple), rendered as inline `<span>` with `background-clip: text`
- Font size: `clamp(3.5rem, 8vw, 6.5rem)`, weight 800, tracking -0.04em

**CTA buttons**:
- Primary: solid indigo with `box-shadow: 0 0 0 0px accent/0` that expands on hover → glow effect
- Secondary: transparent with border, icon appears on hover with slide-in from left

**Scroll indicator**:
- Animated line that grows downward (framer-motion height animation)
- "scroll" text in mono, rotated 90deg on the side

**Scroll-out effect**: As user scrolls down, Hero content scales down slightly (0.95) and fades using `useScroll` + `useTransform`

---

### 3. Projects — "Scroll Reveal Grid"
**Current**: Static card grid
**New**:

**Section header**: Large "02" numeral in background (400px, 5% opacity) behind the heading — purely decorative

**Cards**: Complete redesign
- Featured card spans full width, taller (min-height 280px)
- Non-featured: equal height cards
- On hover:
  - Card lifts: `translateY(-8px)`, shadow deepens
  - Top border animates from accent → gradient
  - Folder icon rotates open slightly (15deg)
  - Shine effect: a diagonal light sweep across the card using a pseudo-element
- Card background: white with very subtle gradient from top-left corner
- Tech tags: monospace pill shape with accent tint on hover

**Scroll animation**:
- Cards enter viewport: each card slides up + fades in, staggered by 0.12s
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`

---

### 4. Experience — "Dark Section" ← BIG CHANGE
**Current**: Light grey background, plain cards
**New**:

**Background**: `#0a0a0a` (near-black) — full contrast flip

**Cards**:
- Dark glass cards: `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `backdrop-blur`
- On hover: border brightens to `rgba(255,255,255,0.16)`, subtle glow appears beneath card
- Text: white primary, `#a1a1aa` secondary
- Date badge: dark pill, accent text

**Layout**: Cards animate in from left with `x: -24` → `x: 0`

**Decorative elements**:
- A faint grid (lighter dot grid on dark bg) at very low opacity
- Gradient glow at the top of the section (accent colour, blurred, 20% opacity) as a "light source"

**Section number**: Large "03" at bottom-right of section in white at 4% opacity

---

### 5. Contact — "Grand Finale"
**Current**: Small text block, email button
**New**:

**Layout**: Centred, full viewport height section — the "grand statement"

**Heading**: Very large display text, 3–4 lines
```
Let's build
something great
together.
```
Each line animates in separately (staggerChildren)

**Background**: Large gradient mesh, centred radial gradient (blue → purple → transparent)

**Email**: Large, styled as a display link — not a button
```
→ you@email.com
```
Animated arrow that moves right on hover, underline that sweeps in

**Social icons**: Row of icon buttons, each has a magnetic hover effect

**"Currently available" badge**: Green pulsing dot + text, lives above the heading

---

## Animation Architecture

### Scroll-linked (framer-motion `useScroll` + `useTransform`)
```
Hero → scale + opacity fade as user scrolls past
Section headings → blur + opacity reveal as they enter viewport
```

### Viewport-triggered (framer-motion `whileInView`)
```
All cards, text blocks, and decorative elements
Once: true (don't re-animate on scroll back up)
margin: "-60px" (trigger slightly before fully in view)
```

### Gesture-based
```
Card hover: spring physics translateY, shadow
Button hover: scale 1 → 1.02, shadow expands
Magnetic effect on social icons: cursor position tracking
```

### Stagger patterns
```
Section text: staggerChildren 0.08s, delayChildren 0.05s
Card grid: staggerChildren 0.1s
Bullet points: staggerChildren 0.05s
```

---

## Implementation Order

1. **Update `globals.css`**: Add fluid type scale (`clamp`), CSS custom properties for dark section, keyframe animations
2. **Hero**: Rebuild with word-by-word name animation, gradient orbs, scroll-out effect
3. **Navbar**: Add mobile menu, resume button, better logo treatment
4. **Projects**: Card shine effect, gradient border, large background numeral
5. **Experience**: Convert to dark section — full background flip, glass cards
6. **Contact**: Large centred display layout, animated email link, magnetic socials
7. **page.tsx**: Add `useScroll` scroll-out wrapper for Hero

---

## Files to Create / Modify

| File | Change |
|---|---|
| `src/app/globals.css` | Full rewrite — fluid type, dark section vars, new keyframes |
| `src/app/page.tsx` | Add scroll container ref for Hero parallax |
| `src/components/ui/Navbar.tsx` | Mobile menu, resume btn, logo gradient |
| `src/components/sections/Hero.tsx` | Full rebuild — word anim, orbs, scroll-out |
| `src/components/sections/Projects.tsx` | Card shine, bg numeral, gradient border |
| `src/components/sections/Experience.tsx` | Dark section, glass cards |
| `src/components/sections/Contact.tsx` | Centred display layout, magnetic socials |
| `src/components/ui/MagneticIcon.tsx` | New: magnetic hover wrapper component |
| `src/hooks/useMousePosition.ts` | New: tracks cursor for magnetic effects |
