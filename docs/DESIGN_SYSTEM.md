# SIJAYA Agency — Design System

## Brand Identity

**Platform Name:** SIJAYA Agency  
**Business:** SIJAYA Agency — LPG Gas Distribution

---

## Colour Palette

```
Primary Navy:      #102A43   — headings, sidebar, primary text
Corporate Blue:    #176B9B   — links, interactive elements, primary buttons
Accent Orange:     #F59E0B   — CTAs, highlights, accent elements
Background:        #F8FAFC   — main page background
White:             #FFFFFF   — cards, panels
Primary Text:      #102A43
Secondary Text:    #64748B   — labels, captions
Border:            #E2E8F0   — card borders, dividers
Success:           #16A34A
Warning:           #D97706
Error:             #DC2626
Info:              #0891B2
```

### CSS Variables (globals.css)

```css
:root {
  --color-primary:       #102A43;
  --color-corporate:     #176B9B;
  --color-accent:        #F59E0B;
  --color-bg:            #F8FAFC;
  --color-white:         #FFFFFF;
  --color-text-primary:  #102A43;
  --color-text-secondary:#64748B;
  --color-border:        #E2E8F0;
  --color-success:       #16A34A;
  --color-warning:       #D97706;
  --color-error:         #DC2626;
  
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  
  --shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  --transition:  all 150ms ease;
}
```

---

## Typography

**Primary Font:** Inter (Latin and numerals)  
**Tamil Font:** Noto Sans Tamil (Google Fonts)

### Scale

| Name    | Size   | Weight | Use                  |
|---------|--------|--------|----------------------|
| Display | 56px   | 700    | Hero headline        |
| H1      | 40px   | 700    | Page titles          |
| H2      | 32px   | 600    | Section headings     |
| H3      | 24px   | 600    | Card headings        |
| H4      | 20px   | 600    | Subheadings          |
| Body    | 16px   | 400    | Default text         |
| Small   | 14px   | 400    | Labels, captions     |
| XSmall  | 12px   | 400    | Badges, annotations  |

---

## Spacing System (Tailwind)

Use Tailwind's default 4-point scale:
- `p-4` = 16px, `p-8` = 32px, `p-12` = 48px, `p-16` = 64px
- Section padding: `py-20 px-4 md:px-8`
- Card padding: `p-6`
- Tight sections: `p-4`

---

## Component Library

Built on **shadcn/ui** with SIJAYA Agency design tokens.

### Buttons

```
Primary:   bg-[#176B9B] text-white hover:bg-[#102A43]
Secondary: border border-[#176B9B] text-[#176B9B] hover:bg-blue-50
Accent:    bg-[#F59E0B] text-white hover:bg-[#D97706]
Danger:    bg-[#DC2626] text-white
Ghost:     transparent hover:bg-slate-100
```

### Status Badges

```
pending:          bg-yellow-100 text-yellow-800
confirmed:        bg-blue-100 text-blue-800
delivered:        bg-green-100 text-green-800
failed/cancelled: bg-red-100 text-red-800
in-progress:      bg-purple-100 text-purple-800
```

### Cards

```
bg-white rounded-xl border border-slate-200 shadow-sm p-6
hover: shadow-md transition-shadow duration-200
```

---

## Navigation

### Public Nav
- Height: 64px
- Sticky with blur backdrop on scroll
- Logo left, links centre-right, CTA rightmost

### Dashboard Sidebar
- Width: 260px (desktop), collapsible to 64px
- Background: #102A43 (dark navy)
- Active item: bg-[#176B9B] text-white
- Inactive: text-slate-300 hover:bg-[#1a3a57]

---

## Logo

SVG wordmark: "SIJAYA Agency" in bold sans-serif + flame/drop icon  
Files: `/public/logo.svg`, `/public/logo-white.svg`, `/public/logo-mark.svg`

---

## Page Layouts

### Public Website
- Max width: 1280px
- Hero: full-viewport-height
- Sections: `py-20`
- Grid: 12-column, responsive

### Dashboard
- Sidebar + main content
- Main content max: none (fills remaining width)
- Top nav: 64px fixed
- Content padding: `p-6 md:p-8`

---

## Icon System

**Library:** Lucide React  
Standard icon sizes: 16px (inline), 20px (buttons), 24px (nav)

---

## Animation

**Library:** Motion for React (`framer-motion`)

Standard transitions:
```
entrance:   { opacity: 0, y: 20 } → { opacity: 1, y: 0 }, duration: 0.4
stagger:    each child delayed by 0.1s
hover:      scale: 1.02, duration: 0.15
page:       fade, duration: 0.3
```

Do not animate decoratively. Every animation must aid comprehension.

---

## Accessibility

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- All interactive elements keyboard accessible
- Focus rings visible
- ARIA labels on icon-only buttons
- Skip-to-content link
- Alt text on all images

