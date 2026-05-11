# Cursor prompt — Make `ActionsHeroHeader` feel alive

You are editing **only** `components/events/actions-hero-header.tsx`. You may add one helper component file under `components/events/` if useful. You may add **one** new color token to `app/globals.css`. Do not touch any other file.

## Goal
The hero is technically clean but visually static. Make it feel alive without changing copy, layout grid, or core type scale. Two principles:
- **Texture:** grain, hand-drawn marks, slightly imperfect alignment — like printed matter, not a screen.
- **Motion:** always-on micro-motion + the page responds to the user (pointer-reactive). Not just fade-in-on-load.

## Hard constraints
- Keep all existing Greek copy and the current word-reveal headline animation intact.
- Honor `useReducedMotion` for every motion addition. Static fallbacks must look intentional.
- Reuse `fadeUp`, `fadeUpDelayed`, `ease`, `duration`, `VIEWPORT_ONCE` from `@/lib/motion`.
- Use existing tokens: `bone`, `bone-warm`, `charcoal`, `concrete`, `line`, `mustard`, `terracotta`, `olive`. Add one new token in `globals.css`: `--color-forest: #2d5a27;` plus a `--forest: #2d5a27;` alias under `:root` to match the file's pattern.
- Mobile (<md): hide the corner sticker, disable pointer-lean. Keep grain, scribble, bobs, marquees.

## The six moves

### 1. Grain overlay (always on)
Absolutely positioned inside the section, `pointer-events-none`, `inset-0`. An SVG using `<feTurbulence baseFrequency="0.9" numOctaves="2">` → `<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0">` for monochrome noise. Apply `mix-blend-multiply`, opacity 0.06. Plus a corner bleed: a radial-gradient div at top-right, ~520px square, `var(--color-forest)` at 4% → transparent.

### 2. Hand-drawn scribble under "καφέ"
The headline is `'Περισσότερο από έναν καφέ.'`. Find the word "καφέ" specifically (last word, strip the period when rendering — keep the period as its own span outside the underlined word). Wrap that word's existing `<motion.span>` in a relative container with an absolutely-positioned SVG underline beneath it (`bottom: -6px`, width matches word, height ~18px, viewBox e.g. `0 0 130 18`, `preserveAspectRatio="none"`).

Suggested wobbly path:
```
M 2 12 C 12 8, 28 14, 52 10 S 92 16, 108 9 C 118 6, 124 14, 130 12
```
Stroke: `var(--color-forest)`, stroke-width 3, `strokeLinecap="round"`, `strokeLinejoin="round"`, fill none. Animate `pathLength` from 0 → 1 via framer-motion. Trigger: `whileInView` with `VIEWPORT_ONCE`. Duration 1.2s, ease `ease.outStrong`. Delay = (existing headline word count × 0.05) + 0.25 — so it draws just after "καφέ" lands.

Reduced motion: render with `pathLength={1}`.

### 3. Pointer-reactive headline lean
Wrap the `<h1>` in a `<motion.div>`. Track cursor over the **section** (not the h1):
- `useMotionValue` for `mouseX`/`mouseY`, normalized to [-0.5, 0.5] relative to section center.
- `useSpring` to dampen: stiffness 50, damping 20, mass 1.
- `useTransform` to map to `rotateY` (max ±2°) and `rotateX` (max ±1°, inverted Y).
- Apply via `style={{ rotateX, rotateY }}` on the wrapper. Set `style={{ transformPerspective: 800 }}` on the parent.
- Reset to 0 on `onMouseLeave`.
- Disable on touch devices: gate with `window.matchMedia('(hover: hover)')` inside `useEffect`, or simply hide effect when `prefersReducedMotion`.
- Reduced motion: disable entirely.

### 4. Eyebrow as a rubber stamp
Wrap the existing eyebrow `<motion.p>` content in a span: dashed 1px border in `concrete/40`, `px-2.5 py-1`, `rounded-[2px]`, rotated `-1.5deg`, `inline-block`. The original fade-up stays on the outer `motion.p`.

### 5. Second counter-marquee
Below the existing marquee, add a second one:
- Content: `Φαγητό · Αλληλεγγύη · Κοινότητα` repeated, mustard-colored `·` separators.
- `text-[10px]`, `text-charcoal/55`, same uppercase/tracking treatment.
- Scrolls **opposite direction** from the first. Add `.marquee-track-reverse` to `globals.css` if needed (mirror of existing `.marquee-track` keyframes).
- Duration ~1.4× the first marquee's.
- Both marquees: `animation-play-state: paused` on group hover. Wrap both in a `group` div with `hover:[&_.marquee-track]:[animation-play-state:paused]` etc.
- Reduced motion: render statically.

### 6. Floating sticker + breathing pill
- **Sticker:** Small rotated badge at top-right of the inner content container. `md+` only (`hidden md:inline-flex`). Mustard background, charcoal text, `text-[10px]`, `uppercase`, `tracking-wider`, `px-2.5 py-1`, `rounded-full`, rotated `-8deg`. Content: `ΑΠΟ 2024`. Float with `animate={{ y: [0, -2, 0] }}`, `transition={{ duration: 4, repeat: Infinity, ease: ease.inOut }}`.
- **Pill bob:** Wrap the existing "Επόμενη: ..." Link in a `motion.div` with `animate={{ y: [0, -1.5, 0] }}`, `transition={{ duration: 5, repeat: Infinity, ease: ease.inOut }}`. The 4s vs 5s mismatch is intentional — they breathe at different rhythms.
- Both gated by `useReducedMotion`.

## Acceptance criteria
- `pnpm dev` renders with no errors and no new console warnings.
- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`: all bobs, marquees, pointer-lean, and scribble-draw become static. Grain, corner bleed, stamp, and sticker remain as static decoration.
- Mobile (375px): sticker hidden, no pointer-lean, no layout shift, marquees still scroll.
- The existing word-reveal headline animation still fires on load. Scribble draws ~0.25s after "καφέ" finishes.
- No layout shift from any added element — everything is `absolute` over the section or inline within existing flow.

## Don't
- Don't add npm dependencies.
- Don't refactor unrelated components.
- Don't change copy.
- Don't make the page louder. *Alive*, not *busy* — every motion should feel slower than your first instinct.
