# Pass 2 Design System & Structural Engineering Specification
### Lapaas AI Product Engineering — Course Discovery & Readiness Assistant
**Design Pass:** Pass 2 (Structural Realignment & Pomelli Brand Token Conformance)  
**Author:** Aryan Kumar (Senior Product Designer & Front-End Engineer Persona)  
**Date:** October 2026  
**Implementation Source:** [`index.html`](index.html) | [`style.css`](style.css) | [`app.js`](app.js)

---

## 1. Brand Tokens & Color Palette

All colors are strictly derived from the official **Lapaas Brand Book (Pomelli)**. No arbitrary hex values, unapproved gradients, or generic browser colors are permitted.

```css
:root {
  /* Core Brand Tokens */
  --obsidian: #11110F;        /* Deep Primary Dark Surface & Text */
  --chartreuse: #A0E61C;      /* High-Energy Accent / Primary CTA */
  --chalk: #F3F3EF;           /* Light Section Background */
  --pure-white: #FFFFFF;      /* Panel Surface / Contrast Card */
  --surface-raised: #1A1A17;  /* Slightly Elevated Dark Surface */

  /* Derived Hairline & Muted Tokens */
  --muted-dark: rgba(243, 243, 239, 0.72);      /* Chalk at 72% opacity on dark */
  --muted-light: rgba(17, 17, 15, 0.70);        /* Obsidian at 70% opacity on light */
  --hairline-dark: rgba(243, 243, 239, 0.16);   /* 1px Chalk border on dark */
  --hairline-light: rgba(17, 17, 15, 0.14);     /* 1px Obsidian border on light */
}
```

---

## 2. Strict Typography System

### Font Families
- **Headings, Button Labels, Question Titles, Numerals:** `Plus Jakarta Sans` (Weights: 600 SemiBold, 700 Bold).
- **Body Text, Helpers, Form Inputs, Ledger Values:** `Inter` (Weights: 400 Regular, 500 Medium).

### Allowed Font Sizes
Strictly limited to the approved scale:
- `14px` — Ledger labels, source citations, footer copy, tab meta.
- `16px` — Primary button labels, option titles, helper text, input values, body paragraphs.
- `18px` — Masthead wordmark, hero subtext.
- `24px` — Section subtitles.
- `28px` — Rail title (`Course fit check`), question titles, result section headers.
- `clamp(2.25rem, 4.5vw, 3.75rem)` — Hero H1 headline.

### Typographic Rules
- **Letter Spacing:** `-0.01em` on `h1` and `h2` only; `0` everywhere else.
- **Text Wrapping:** `text-wrap: balance;` on headings; `text-wrap: pretty;` on paragraphs to guarantee zero orphan words.
- **Tabular Numerals:** `font-variant-numeric: tabular-nums;` enforced on prices (Rs 2,999), step counts (`Question 1 of 6`), and ledger numbers (`1.` through `6.`).

---

## 3. Spacing Scale & Container Architecture

- **Spacing Scale (8px Grid):** Exclusively derived from: `4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px`.
- **Global Container:** Exactly `1200px` max-width with `24px` gutters (`--gutter: 24px`), shared identically across Masthead, Hero, Tool Band, and Footer.
- **Border Radii:**
  - Interactive Controls & Cards: `4px` (`--radius-control: 4px`)
  - Tool Panel: `4px` (`--radius-panel: 4px`)
  - Sections: `0px` (Clean full-bleed edge-to-edge rules)

---

## 4. Vertical Height Budget & Above-the-Fold Geometry

To resolve Defect #1 (hero pushing tool off-screen on initial load at 1440×900), the vertical budget was strictly constrained:

| Element | Specification | Measured Rendered Height |
| :--- | :--- | :--- |
| **Masthead** | Official logo 80px + 5px clear space, 1px bottom hairline | **112.0px** (Target ≤ 112px) |
| **Hero Section** | 32px vertical padding, 12-column split (7 cols left / 5 cols right) | **436.4px** |
| **Combined Hero + Masthead** | Must be ≤ 560px at 1440×900 | **548.4px** (≤ 560px ✅) |
| **Tool Band Top Visibility** | 900px viewport minus 548.4px | **351.6px prominently visible on load without scrolling** ✅ |

---

## 5. Alignment Audit Matrix (1440px Viewport)

At 1440px, all left edges across the interface strictly adhere to four primary x-coordinates:

| Coordinate | Layout Boundary | Aligned Elements |
| :--- | :--- | :--- |
| **X = 137px** | **Container Content Edge / Rail Edge** | • Masthead Brand Block<br>• Hero H1, Subtext, CTA Flex Row<br>• Tool Rail Header & Title (`Course fit check`)<br>• Desktop Answers Ledger (All 6 rows)<br>• Site Footer Container |
| **X = 147px** | **Ledger Numeral Alignment** | • Numbered indicators (`1.` to `6.`) within all 6 ledger rows aligned vertically in a continuous column |
| **X = 529px** | **Panel Edge** | • Pure White Right Panel 1px border<br>• 56px Tab Bar border<br>• Sticky Bottom Input Row border<br>• Panel Footer Row border |
| **X = 562px** | **Panel Inner-Padding Edge** | • Active Tab "Fit check"<br>• Step Indicator ("Question 1 of 6")<br>• Detached 4px 6-segment Progress Bar<br>• Active Question Title & Helper<br>• Full-width Option Cards<br>• Result Assessment Row Labels<br>• Ask Tab Quick Question Cards & Thread<br>• 48px Input Field & Footer "Back" Button |

---

## 6. Interactive Control Standard (Strict 48px Height)

All controls maintain a strict 48px interactive height (tab row 56px) for optimal touch targets and visual harmony:

- `btn-primary` ("Start the 60-second check", "Enroll"): `height: 48px; min-height: 48px;`
- `link-secondary` ("Official course page (Rs 2,999)"): `height: 48px; min-height: 48px;`
- `masthead-link` ("Official course page"): `height: 48px; min-height: 48px;`
- `panel-tab-bar`: `height: 56px; min-height: 56px;` (Tabs: `height: 56px`)
- `ledger-row`: `height: 56px; min-height: 56px;` (Change buttons: `height: 48px`)
- `panel-footer-btn` ("Back", "Restart"): `height: 48px; min-height: 48px;`
- `quick-question-card` (Ask Tab): `height: 48px; min-height: 48px;`
- `quick-toggle-btn` ("Common questions"): `height: 48px; min-height: 48px;`
- `panel-input` & `panel-submit-btn`: `height: 48px; min-height: 48px;`
- `footer-links a`: `height: 48px; min-height: 48px;`

---

## 7. Multi-Breakpoint Responsive Behavior

1. **Desktop (1440px):**
   - 12-column layout (Hero: 7 cols left / 5 cols right; Tool band: 4 cols rail / 8 cols panel).
   - Sticky left rail (`position: sticky; top: 24px`) with real-time Answers Ledger.
2. **Laptop (1024px):**
   - 5 cols rail / 7 cols panel. Quick questions in single-column stack.
3. **Tablet (768px):**
   - Single-column stacked layout with 56px vertical padding.
   - Desktop ledger hidden; mobile `<details>` ledger placed cleanly above panel.
4. **Mobile (360px):**
   - Native collapsible `<details class="mobile-ledger">` titled `"Your answers (N of 6)"`.
   - Full-width option cards, tabs, and input field. Zero horizontal overflow.

---
*Certified for Lapaas AI Product Engineering by Aryan Kumar.*
