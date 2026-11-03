# System Architecture & Technical Specification

> **Project:** Juna — 3D Animator & LRC Portfolio  
> **Repository:** Portfolio Workspace  
> **Target Environment:** Modern Web Browsers & Static Hosting (Vercel / GitHub Pages)

---

## 1. High-Level Overview

This portfolio is an ultra-fast, dependency-free static web application engineered with semantic HTML5, modern vanilla CSS3 (Custom Properties, CSS Grid, Flexbox, 3D Transforms, Glassmorphism), and vanilla JavaScript. It requires no Node.js runtime, build toolchain, or external frontend framework, ensuring instantaneous load times, zero build overhead, and maximum durability.

```
                    ┌─────────────────────────┐
                    │       User / Browser    │
                    └────────────┬────────────┘
                                 │
           ┌─────────────────────┴─────────────────────┐
           ▼                                           ▼
   index.html (Home)                         all-project.html (Archive)
   ├─ Intro Sigil Modal                      ├─ Dynamic Category Filter
   ├─ Glassmorphic Nav & Brand               ├─ Gallery & List View Toggle
   ├─ Dual-column Dynamic Hero (Monochrome)  ├─ Full Video Modal (<dialog>)
   │  ├─ Title: "My Perspective. My Creativity. My World in 3D."
   │  ├─ Personal Narrative Card             │  └─ Final / Viewport Toggle
   │  └─ Floating Video Preview Widget       └─ Vercel Route Rewrite (/all-project)
   ├─ Selected Work (Inline MP4)
   ├─ Experience & Services Matrix
   └─ Contact & WhatsApp CTA
           │                                           │
           └─────────────────────┬─────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     Shared Assets       │
                    │  css/style.css          │
                    │  css/projects.css       │
                    │  js/main.js             │
                    │  js/projects.js         │
                    │  assets/videos/*.mp4    │
                    │  assets/favicon.svg     │
                    └─────────────────────────┘
```

---

## 2. Directory & File Structure

```text
portfolio/
├── .vscode/
│   └── settings.json           # Editor and workspace settings
├── assets/
│   ├── favicon.svg             # Dynamic brand SVG favicon (Electric Cyan / Royal Blue)
│   ├── images/                 # Static graphical elements & profile imagery
│   │   ├── profile/
│   │   └── projects/
│   └── videos/                 # 3D animation renders and viewport captures
│       ├── azalea kompor.mp4
│       ├── head turn.mp4
│       ├── kuda render.mp4
│       ├── nenek render.mp4
│       ├── nenek render viewport.mp4
│       ├── red shoes.mp4
│       ├── spiderman render.mp4
│       ├── spiderman render viewport.mp4
│       ├── Trex render.mp4
│       └── trex render viewport.mp4
├── css/
│   ├── style.css               # Core styling, variables, glassmorphism, hero & sections
│   └── projects.css            # Project archive, gallery grid, list view, <dialog> modal
├── js/
│   ├── main.js                 # Intro sigil particle engine, scroll observer, 3D mouse tilt
│   └── projects.js             # Filter state machine, view switcher, <dialog> controller
├── all-project.html            # Complete project archive page
├── index.html                  # Main portfolio entry page
├── architecture.md             # Technical architecture manual (this file)
├── design.md                   # Visual identity, tokens, and component guidelines
├── README.md                   # Local setup and quick reference
└── vercel.json                 # Static routing & clean URL rewrites
```

---

## 3. Core Functional Modules

### 3.1. Intro Sigil Experience (`js/main.js` & `#intro`)
* **Purpose:** Provides a cinematic entry portal using SVG geometry and interactive particle physics.
* **State Persistence:** Stores `portfolioIntroCompleted = 'true'` in `window.sessionStorage`. If the user has already unlocked or visited during the session, the intro screen is immediately pruned from the DOM on load to prevent friction.
* **Particle Mechanics:**
  - Ambient motes with variable drift and opacity.
  - Periodic comets crossing the canvas with trailing gradient tails.
  - Radial spark burst triggered on center seal click or `Enter`/`Space` keypress.
* **Accessibility:** Honors `prefers-reduced-motion: reduce` by bypassing all particle generation and animating transitions instantaneously.

### 3.2. Dynamic Dual-Column Hero
* **Left Card:** High-contrast frosted glass card featuring bold headline typography, animated entrance reveals (`@keyframes rise`), status indicator, and CTA pill buttons.
* **Right Card:** Picture-in-picture floating glass video card displaying a live looping preview of Juna's highlight animation (`Trex render.mp4`), mirroring modern cinematic sport/portfolio dashboards.
* **3D Depth:** Subtle interactive mouse-tilt parallax on geometric orbital rings and crystals via CSS `perspective` and `transform-style: preserve-3d`.

### 3.3. Project Archive & Filtering (`all-project.html` & `js/projects.js`)
* **Data-Driven Architecture:** HTML elements act as declarative databases via `data-*` attributes:
  - `data-title`: Project name.
  - `data-category`: Category (`Character Animation`, `Creature Animation`, `Product Animation`).
  - `data-status`: Current status (`completed`, `upcoming`).
  - `data-video`: Path to final rendered MP4.
  - `data-video-viewport`: Path to viewport/rig capture MP4 (optional).
  - `data-role`: Production focus (e.g., Character Animation, LRC).
* **View Switching:** Supports both visual grid (2-column 16:10 video cards) and compact tabular list view via a persistent floating dock.
* **Native `<dialog>` Modal:**
  - Native HTML5 `<dialog>` element with custom backdrop blur.
  - Automatic dual-toggle button (`Final render` vs `Viewport`) displayed only when both video streams exist on the active project card.
  - Automatic focus trap and body scroll locking (`overscroll-behavior: none`).

---

## 4. Performance & Media Strategy

1. **Zero External Dependencies:** No React, jQuery, Tailwind runtime, or CDN font kits beyond Google's Bricolage Grotesque font.
2. **Video Asset Optimization:**
   - Preload behavior set to `preload="metadata"` to avoid downloading full MP4 files simultaneously.
   - `IntersectionObserver` in both `main.js` and `projects.js` actively pauses videos when outside the viewport or when the dialog modal is opened, saving CPU and GPU decoding bandwidth.
   - Inline playback configured with `muted loop playsinline autoplay`.
3. **Hardware-Accelerated Styling:** CSS transitions and animations rely strictly on `transform`, `opacity`, and `filter` to leverage GPU compositing layers.

---

## 5. Deployment & Routing (`vercel.json`)

Vercel configuration ensures clean, modern URLs:
```json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/all-project", "destination": "/all-project.html" }
  ]
}
```
* Accessing `/` serves `index.html`.
* Accessing `/all-project` cleanly routes to `all-project.html` without trailing `.html` extensions in the browser bar.
