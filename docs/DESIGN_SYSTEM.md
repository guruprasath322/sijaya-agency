# SIJAYA Agency design system

The interface combines warm ivory surfaces, navy typography, gold highlights, and restrained motion. The public website prioritizes choosing a supply service and contacting the agency. The operations workspace prioritizes readable records and accessible actions.

## Foundations

| Token | Value | Purpose |
| --- | --- | --- |
| Primary | `#102A43` | Headings, workspace sidebar, dark panels |
| Corporate | `#176B9B` | Links, primary actions, focus indicators |
| Accent | `#F59E0B` | Hero action and brand highlights; use navy text |
| Public surface | `#F7F6F2` | Hero, page introductions, alternating sections |
| Workspace surface | `#F4F7FA` | Operations background |
| Card | `#FFFFFF` | Forms, records, cards |
| Border | `#E2E8F0` | Quiet dividers and outlines |

Inter is the primary font; Noto Sans Tamil supports bilingual product and customer names. Font styles load once through the root layout, with system fallbacks. Body copy uses a generous line height. Display headings scale with breakpoints, and long headings balance automatically.

## Public pages

`components/layout/PublicLayout.tsx` owns the shared header, footer, skip target, section reveals, breadcrumbs, and optional page introduction. The homepage uses the same shell without an introductory banner.

- `.site-container`: centered 1280px maximum with 20px mobile, 32px tablet, and 40px desktop gutters.
- Header: fixed 80px height, active-route indication, desktop navigation at 1280px, expandable phone/tablet navigation below that width.
- Sections: 64px vertical padding on phones, 80px on tablets, 96px on desktops.
- Hero: staggered text, a locally optimized depot photograph, supplier badge, and three supply shortcuts.
- About: image-led story, supplier panel, and compact service commitments.
- Services: sticky introduction on desktop with stacked service panels.
- Products: bilingual cards, staggered entrances, and subtle cylinder hover movement. Product sizes remain unchanged.
- Safety: numbered guidance with a distinct agency contact panel.
- Contact: linked labels, browser autofill, readable fields, submission feedback, and contact alternatives.

Use one `h1` per screen and a logical `h2`/`h3` hierarchy. Prefer familiar, concise action labels.

## Workspace

`app/dashboard/layout.tsx` provides grouped navigation, the current-page breadcrumb, an account summary, and a sticky header. The desktop sidebar scrolls independently. The mobile sidebar is a native modal dialog, keeping background controls inert and supporting keyboard focus and Escape.

- Main content has 16px phone padding, 28px tablet padding, and 32–40px desktop padding.
- Four-column summary grids start at 1280px so the sidebar does not squeeze them on smaller desktops.
- Tables scroll horizontally inside their panels; they never widen the entire page.
- The weekly calendar uses a horizontal region on tablets and a vertical list on phones.
- Staff and driver screens share workspace typography, controls, and surfaces. Delivery cards expand into multiple columns when space permits.
- Existing customer and registration redirects to `/contact` remain unchanged.

## Controls

Use `.btn-primary`, `.btn-accent`, `.btn-outline`, and `.btn-ghost` consistently. Keep controls at least 44px high, preserve clear disabled states, and name icon-only buttons.

`.input-field` provides a 48px minimum height, a consistent border and focus treatment, and 16px mobile text to prevent browser zoom. Every input needs an associated label or accessible name. Preserve existing validation and API bindings.

`components/shared/Modal.tsx` uses native dialogs for focus containment, Escape/backdrop dismissal, focus restoration, background scroll locking, and internal scrolling on small screens. Keep existing form actions and cancel handlers inside this shell.

## Motion

Motion uses the existing Framer Motion dependency and CSS transitions:

- Hero: 800ms staggered entrances with a gentle image zoom and translation linked to scrolling.
- Sections: once-only 650ms opacity/24px entrances using `ScrollReveal`.
- Product, industry, and process cards: 60–80ms stagger increments.
- Buttons: subtle 2px hover lift and a restrained pressed state on pointer devices.
- Public introductions: 700ms entrance; workspace content: 350ms fade.
- Menus: short opacity and position entrance.

Scrolling stays native. Never transform the application root or put fixed navigation inside an animated container. Respect `prefers-reduced-motion` through `MotionConfig`, `useReducedMotion`, and CSS. Reduced-motion users receive immediately visible content and no parallax.

## Public submission boundary

Public supply requests submit directly to `https://api.web3forms.com/submit` using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Keep the existing payload, optional email, and honeypot. Do not call the Express supply-request creation endpoint or Prisma from the public form. Existing database-backed agency records remain available to staff through the API.

## Verification

The redesign was checked at 320, 390, 768, 1024, and 1440px across the 26 active public and operations screens, including horizontal-overflow and heading checks. Check menu dismissal, modal scrolling and focus, form labels, and the public submission destination when changing shared components. A local API/database is required to verify authenticated mutations end to end.
