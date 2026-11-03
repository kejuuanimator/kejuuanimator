# Design System & Visual Specification

> **Project:** Juna — 3D Animator & LRC Portfolio  
> **Aesthetic Direction:** High-End Monochrome (Black & Pure White) with Frosted Chrome Glassmorphism  
> **Core Theme:** Deep Obsidian / Pure Black (#000000), Solid Brilliant White (#ffffff), Razor-Sharp Borders, Zero Blue Tones

---

## 1. Visual Philosophy & Identity

The design system has evolved into an uncompromising, luxury **Monochrome Dark Mode** (Black & White):
1. **Elimination of Blues:** All colored blue tones, royal blue meshes, and saturated color casts are completely eliminated. The entire interface is grounded in absolute pure black (`#000000`) and deep obsidian surfaces.
2. **Brilliant Pure White Typography:** All major headings, titles, and row animations are solid, opaque, brilliant white (`#ffffff` / `-webkit-text-fill-color: #ffffff`). No color gradients or blue shadows on typography.
3. **Reflective Chrome Glassmorphism:** Cards and dialogs utilize dark glass (`rgba(14, 14, 14, 0.75)`) bounded by crisp white borders (`rgba(255, 255, 255, 0.16)` to `0.65`) and specular white top-rim reflections (`inset 0 1px 0 rgba(255, 255, 255, 0.22)`).
4. **Solid White & Inversion Controls:** Primary interactive elements (action buttons, filter toggles, play badges) are pure solid white with deep black text/icons, inverting with luminous white glows on hover.

---

## 2. Color Palette & Token Architecture

All colors are centralized as CSS custom variables in `css/style.css`:

| Token | Value | Visual Purpose |
| :--- | :--- | :--- |
| `--bg-deep` | `#000000` | Absolute deep black canvas |
| `--bg-base` | `#060606` | Base surface layer |
| `--bg-surface` | `#0c0c0c` | Mid-depth obsidian layer |
| `--bg-elevated` | `#141414` | Elevated component surface |
| `--fg` | `#ffffff` | Solid pure white for headers, titles & primary buttons |
| `--fg-ice` | `#f4f4f4` | Crisp light text for lead descriptions |
| `--fg-soft` | `#cccccc` | Soft neutral silver for secondary descriptions |
| `--mute` | `#888888` | Muted silver for metadata & timestamps |
| `--card-bg` | `rgba(14, 14, 14, 0.75)` | Translucent obsidian glass panel |
| `--card-hover` | `rgba(22, 22, 22, 0.88)` | Elevated hover surface state |
| `--card-border` | `rgba(255, 255, 255, 0.16)` | Razor-sharp translucent white border |
| `--card-border-hover` | `rgba(255, 255, 255, 0.65)` | Brilliant white illuminated border |
| `--primary` | `#ffffff` | Solid white button fill & active indicator |
| `--primary-fg` | `#000000` | High-contrast black text on solid white buttons |
| `--white-glow` | `rgba(255, 255, 255, 0.5)` | White luminous hover drop-shadow |
| `--blender-icon` | `assets/images/profile/blender-logo.jpeg` | Blender brand badge replacing all green status dots across all pages |

---

## 3. Typography & Hero Statement

* **Main Hero Statement:**
  ```text
  My Perspective.
  My Creativity.
  My World in 3D.
  ```
* **Color Rule:** Solid, brilliant white (`#ffffff`) across all lines without any color wash or gradient masking.
* **Display Font Family:** `"Bricolage Grotesque", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
* **Weights:**
  - Hero Display: `clamp(2.4rem, 5.2vw, 4.6rem)`, Weight `800`, Line-height `1.05`, Letter-spacing `-0.045em`.
  - Section Headings (`h2`): `clamp(2.2rem, 5.5vw, 4.2rem)`, Weight `800`, Letter-spacing `-0.04em`.
  - Card Titles (`h3`): `1.15rem – 1.3rem`, Weight `700`, Letter-spacing `-0.02em`.

---

## 4. Component Standards

### 4.1. Navigation
* **Desktop & Mobile:** Floating black glass (`rgba(4, 4, 4, 0.88)` with `backdrop-filter: blur(20px)` and white bottom border).
* **Mark:** Solid white 32x32px square with deep black vector glyph.
* **WhatsApp Button:** Solid white pill button (`background: #ffffff; color: #000000; font-weight: 700;`).

### 4.2. Action Buttons
* **Solid Primary (`.btn.solid` / `.btn-glow`):**
  - Normal: Solid white background (`#ffffff`), solid black text (`#000000`), border `1px solid #ffffff`.
  - Hover: Soft grey `#e4e4e4` with high-intensity white halo shadow `0 0 26px rgba(255, 255, 255, 0.7)`.
* **Glass Secondary (`.btn.btn-glass`):**
  - Normal: Translucent black glass (`rgba(255, 255, 255, 0.08)`), white border, white text.
  - Hover: Inverts to solid white background with black text.

### 4.3. Media Previews & Video Cards
* **Media Container:** Solid black base frame (`#000000`) with subtle white hairline boundary.
* **Play Button Badge:** Circular solid white badge (`#ffffff`) with deep black play triangle (`#000000`), scaling up to 1.18x on card hover.

### 4.4. Filter Pills & Dialog Modal
* **Filter Pills:** Inactive pills are obsidian glass with white borders; active pills are solid white with black text and inverted count bubbles.
* **Dialog Modal (`.project-dialog`):** Deep black glass modal with sticky topbar, white close pill, and high-contrast toggle between `Final render` and `Viewport`.
