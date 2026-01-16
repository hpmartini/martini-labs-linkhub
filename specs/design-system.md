# Schwälmer Softwarehaus Design System

Extracted from: https://www.schwaelmer-softwarehaus.de/
Date: 2026-01-15

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Teal (Primary) | `#2F4F4F` | `47, 79, 79` | Primary buttons, CTAs, section labels, active states |
| Teal Light | `rgba(47, 79, 79, 0.1)` | - | Hover backgrounds, EOAD circles |
| Teal Hover | `#1E293B` | `30, 41, 59` | Primary button hover state |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Burgundy | `#A63333` | `166, 51, 51` | Highlighted text, links, submit buttons |
| Burgundy Dark | `#9A3412` | `154, 52, 18` | Tagline badge text |
| Burgundy Hover | `#B91C1C` | `185, 28, 28` | Link hover states |

### Background Colors

| Name | Hex | Usage |
|------|-----|-------|
| Page Background | `#FAFAF9` | Main page background |
| Card Background | `#FFFFFF` | Cards, modals, inputs |
| Dark Section | `#0F172A` | Quote sections, dark backgrounds |
| Muted | `#F1F5F9` | Alternative section backgrounds |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#0F172A` | Headlines (h1, h2) |
| Secondary | `#1E293B` | Body text, h3 |
| Muted | `#475569` | Secondary text, nav links |
| Light | `#64748B` | Captions, labels, footer |
| On Dark | `#FFFFFF` | Text on dark backgrounds |

### Accent Colors (Tagline Badge)

| Name | Hex | Usage |
|------|-----|-------|
| Badge Background | `#FFEDD5` | Tagline badge background |
| Badge Border | `#FED7AA` | Tagline badge border |
| Badge Text | `#9A3412` | Tagline badge text |

---

## Typography

**Font Family:** Inter, sans-serif

### Type Scale

| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| H1 | 60px | 800 (extrabold) | 60px | `#0F172A` |
| H2 | 36px | 700 (bold) | 1.2 | `#0F172A` |
| H3 | 20px | 700 (bold) | 1.3 | `#1E293B` |
| H4 (Label) | 12px | 600 (semibold) | - | `#64748B` |
| Body | 16px | 400 (normal) | 1.6 | `#1E293B` |
| Small | 14px | 400 (normal) | 1.5 | `#64748B` |
| Caption | 12px | 500 (medium) | - | `#64748B` |

### Special Typography

- **Highlighted Text:** Color `#A63333` with underline
- **Section Labels:** Uppercase, letter-spacing `0.1em`, color `#2F4F4F`
- **Category Labels (H4):** Uppercase, letter-spacing `0.05em`, color `#64748B`

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Minimal gaps |
| sm | 8px | Icon margins, small gaps |
| md | 16px | Standard gaps |
| lg | 24px | Section content spacing |
| xl | 32px | Between major elements |
| 2xl | 48px | Section padding (mobile) |
| 3xl | 64px | Section padding |
| 4xl | 80px | Large section padding |
| 5xl | 96px | Hero sections |

**Container Max Width:** 1280px

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Small elements |
| md | 8px | Inputs, nav buttons |
| lg | 12px | Cards, primary buttons |
| xl | 16px | Large cards |
| full | 9999px | Badges, pills |

---

## Shadows

| Name | Value | Usage |
|------|-------|-------|
| Card Shadow | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Cards, blog cards |
| Button Shadow | `0 10px 15px -3px rgba(47,79,79,0.2), 0 4px 6px -4px rgba(47,79,79,0.2)` | Primary buttons only |
| Card Hover | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Card hover state |

---

## Components

### Primary Button (CTA)

```css
background: #2F4F4F;
color: #FFFFFF;
border-radius: 12px;
padding: 16px 32px;
font-weight: 600;
box-shadow: 0 10px 15px -3px rgba(47,79,79,0.2);
transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
background: #1E293B;
transform: translateY(-4px);
```

**Tailwind:** `bg-[#2F4F4F] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all`

### Secondary Button

```css
background: #FFFFFF;
color: #334155;
border: 2px solid #E2E8F0;
border-radius: 12px;
padding: 16px 32px;
font-weight: 600;

/* Hover */
border-color: #CBD5E1;
```

**Tailwind:** `bg-white text-slate-600 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 hover:border-slate-300 transition-all`

### Industry Pill Button

```css
background: #FFFFFF;
color: #334155;
border: 2px solid #E2E8F0;
border-radius: 9999px;
padding: 10px 24px;
font-weight: 600;

/* Active State */
background: rgba(47, 79, 79, 0.1);
color: #2F4F4F;
border-color: transparent;
```

### Card

```css
background: #FFFFFF;
border-radius: 12px;
box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
padding: 24px;
transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
transform: translateY(-2px);
```

**Tailwind:** `bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`

### Tagline Badge

```css
background: #FFEDD5;
color: #9A3412;
border: 1px solid #FED7AA;
border-radius: 9999px;
padding: 6px 16px;
font-size: 14px;
font-weight: 600;
```

**Tailwind:** `bg-orange-100 text-orange-800 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-semibold`

### Form Input

```css
background: #FFFFFF;
border: 1px solid #CBD5E1;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #1E293B;

/* Focus */
border-color: rgba(47, 79, 79, 0.5);
outline: none;
```

### Section Label

```css
color: #2F4F4F;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
```

**Tailwind:** `text-[#2F4F4F] text-xs font-semibold tracking-wider uppercase`

### EOAD Method Circle

```css
background: rgba(47, 79, 79, 0.1);
color: #2F4F4F;
width: 48px;
height: 48px;
border-radius: 50%;
font-size: 20px;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
```

---

## Animations & Transitions

### Default Transition
```css
transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Slow Transition (Cards)
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects

| Element | Effect |
|---------|--------|
| Primary Button | Lift up 4px (`translateY(-4px)`) |
| Cards | Lift up 2px, increase shadow |
| Links | Color transition |
| Nav Links | Color transition |

### Scroll Animations

Elements fade in and slide up when entering viewport:
```css
/* Initial state */
opacity: 0;
transform: translateY(20px);

/* Animated state */
opacity: 1;
transform: translateY(0);
transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## DO NOT Rules

1. **DO NOT** apply card shadow to text elements
2. **DO NOT** use teal (`#2F4F4F`) for body text - only for buttons and accents
3. **DO NOT** use burgundy (`#A63333`) for backgrounds - only for text highlights and links
4. **DO NOT** apply button padding to inline links
5. **DO NOT** use full border-radius (`9999px`) on cards - only on badges and pills
6. **DO NOT** apply dark section background (`#0F172A`) to cards
7. **DO NOT** use tagline badge styles for regular text
8. **DO NOT** apply hover transform to text elements
9. **DO NOT** use uppercase text-transform for body copy
10. **DO NOT** apply letter-spacing to paragraph text
11. **DO NOT** use the tagline orange (`#FFEDD5`) as a primary color - only for badges
12. **DO NOT** mix font weights randomly - follow the typography hierarchy
13. **DO NOT** apply card shadows to buttons - buttons have their own shadow
14. **DO NOT** use border-radius on sections - only on cards, buttons, and inputs

---

## Color Application Guide

### Teal (#2F4F4F) - Use For:
- Primary CTA buttons
- Section labels (uppercase text)
- Check icons
- Active pill indicators
- EOAD method circles
- Focus ring on inputs

### Teal (#2F4F4F) - DO NOT Use For:
- Body text
- Headlines
- Card backgrounds
- Borders

### Burgundy (#A63333) - Use For:
- Highlighted text in headlines
- "Read more" / "Lesen" links
- Submit buttons (contact form)
- Link hover states

### Burgundy (#A63333) - DO NOT Use For:
- Backgrounds
- Card shadows
- Borders
- Body text

---

## Quick Reference (Tailwind)

```javascript
// colors
primary: '#2F4F4F',      // teal
secondary: '#A63333',    // burgundy
background: '#FAFAF9',   // page
card: '#FFFFFF',
dark: '#0F172A',
textPrimary: '#0F172A',
textBody: '#1E293B',
textMuted: '#475569',

// common classes
button-primary: 'bg-[#2F4F4F] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all'
button-secondary: 'bg-white text-slate-600 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 hover:border-slate-300 transition-all'
card: 'bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300'
badge: 'bg-orange-100 text-orange-800 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-semibold'
section-label: 'text-[#2F4F4F] text-xs font-semibold tracking-wider uppercase'
```
