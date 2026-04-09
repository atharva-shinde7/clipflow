# ClipFlow — Premium Creative Agency Website

A production-ready Next.js 14 website for a video editing & content creation brand.
Dark, cinematic, fully animated. Built to be modular — swap content for any business.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework & SSR |
| React 18 | UI components |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | All animations |
| Lenis | Smooth inertia scrolling |
| TypeScript | Type safety |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Project Structure

```
clipflow/
├── app/
│   ├── globals.css          ← Global styles, CSS variables, cursor
│   ├── layout.tsx           ← Root layout, metadata, providers
│   └── page.tsx             ← Main page (assembles all sections)
│
├── components/
│   ├── providers/
│   │   └── LenisProvider.tsx  ← Smooth scroll + GSAP ticker sync
│   ├── cursor/
│   │   └── Cursor.tsx         ← Custom circular cursor
│   ├── navbar/
│   │   └── Navbar.tsx         ← Sticky nav, blur on scroll, mobile menu
│   ├── hero/
│   │   └── Hero.tsx           ← Full-viewport hero, GSAP entrance
│   ├── services/
│   │   └── Services.tsx       ← Service cards, scroll reveal
│   ├── portfolio/
│   │   └── Portfolio.tsx      ← Project grid, hover reveals
│   ├── stats/
│   │   └── Stats.tsx          ← Animated counters (GSAP)
│   ├── process/
│   │   └── Process.tsx        ← Timeline steps, scrub animation
│   ├── testimonials/
│   │   └── Testimonials.tsx   ← Dual infinite slider
│   ├── cta/
│   │   └── CTA.tsx            ← Call to action section
│   └── footer/
│       └── Footer.tsx         ← Footer with nav + socials
│
├── public/                  ← Static assets (add images here)
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## Customising Content

Every section has a clearly labelled content object at the top of the file:

```tsx
// In Hero.tsx
const HERO = {
  headline: ['WE CRAFT', 'EDITS THAT', 'CAPTURE'],
  // ← Change any of these strings
}

// In Services.tsx
const SERVICES = [
  { title: 'YouTube Editing', ... },
  // ← Add / remove / rename services
]
```

To adapt for a different business (AI agency, developer portfolio, etc.):
1. Change the content objects in each component
2. Update metadata in `app/layout.tsx`
3. Swap color accents in `app/globals.css` (`--accent`, `--accent-2`)

---

## Animation Architecture

### Lenis + GSAP Integration (`LenisProvider.tsx`)

```
Lenis RAF loop → drives scroll position
         ↓
gsap.ticker.add() → syncs GSAP ticker with Lenis
         ↓
lenis.on('scroll', ScrollTrigger.update) → keeps ScrollTrigger accurate
```

This three-way sync is critical. Without it, ScrollTrigger fires at the
native scroll position instead of the smoothed Lenis position.

### Animation Patterns Used

| Pattern | Where | How |
|---------|-------|-----|
| Hero entrance | `Hero.tsx` | GSAP timeline, staggered `y + opacity` |
| Section reveals | All sections | `ScrollTrigger` + `fromTo` |
| Number counters | `Stats.tsx` | GSAP tween on plain object, `onUpdate` writes to DOM |
| Timeline scrub | `Process.tsx` | `ScrollTrigger` with `scrub: 0.5` |
| Infinite slider | `Testimonials.tsx` | GSAP `repeat: -1` with `modifiers.x` |
| Cursor tracking | `Cursor.tsx` | `gsap.quickTo()` for lag-free tracking |
| Parallax | `CTA.tsx` | `ScrollTrigger` with `scrub: true` |

### Performance Notes

- All GSAP contexts use `ctx.revert()` on unmount (prevents memory leaks)
- `ScrollTrigger.create()` with `once: true` for counters (fires once only)
- `will-change: transform` on slider tracks (GPU compositing)
- `passive: true` on scroll event listeners
- Images use Next.js `<Image>` with lazy loading

---

## Color System

Edit in `app/globals.css`:

```css
:root {
  --accent: #c8f65d;   ← Primary accent (lime green)
  --accent-2: #7df9ff; ← Secondary accent (cyan)
  --bg: #080808;       ← Background
  --surface: #111111;  ← Card surfaces
  --muted: #555555;    ← Muted text
}
```

---

## Adding Real Portfolio Images

In `Portfolio.tsx`, replace the colored placeholder cards:

```tsx
import Image from 'next/image'

// Inside ProjectCard:
<Image
  src="/projects/your-image.jpg"
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Place images in `/public/projects/`.

---

## Deployment

```bash
# Vercel (recommended)
npm install -g vercel
vercel

# Or build for any host
npm run build
npm start
```

---

## License

MIT — use freely for client projects.
