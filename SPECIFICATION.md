# Lattelix Portfolio - Technical Specification

## Overview

Single-page portfolio website for **Lattelix**, a Frontend Developer. Dark-mode-only, minimalist high-tech aesthetic with scroll-driven animations and a yellow accent color on a near-black background.

**Live domain:** `lattelix.ru`

---

## Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)              |
| Language       | TypeScript 5.7                                  |
| UI Library     | React 19.2                                      |
| Styling        | Tailwind CSS 3.4 + CSS design tokens            |
| Components     | shadcn/ui (Badge, Button, etc.)                 |
| Animations     | Framer Motion 11                                |
| Icons          | Lucide React                                    |
| Fonts          | Geist Sans + Geist Mono (via `next/font/google`)|
| Package Manager| pnpm                                            |

---

## Design System

### Color Palette

All colors are defined as HSL design tokens in `app/globals.css` and consumed via `hsl(var(--token))` in `tailwind.config.ts`. There is no light mode; the app is permanently dark.

| Token           | HSL Value             | Usage                        |
| --------------- | --------------------- | ---------------------------- |
| `--background`  | `240 10% 3.9%`       | Page background (~#09090b)   |
| `--foreground`  | `0 0% 98%`           | Primary text (~#fafafa)      |
| `--primary`     | `47.9 95.8% 53.1%`   | Yellow accent (~#eab308)     |
| `--card`        | `240 6% 6%`          | Card surfaces                |
| `--secondary`   | `240 4% 12%`         | Subtle backgrounds           |
| `--muted-foreground` | `240 5% 64.9%`  | Secondary text               |
| `--border`      | `240 4% 16%`         | Borders and dividers         |

### Typography

- **Headings:** Geist Sans (`font-sans`) - bold weights, tight tracking
- **Code/Labels:** Geist Mono (`font-mono`) - section labels, status badges, footer
- **Body:** Geist Sans - `leading-relaxed` for comfortable reading
- Font variables are set on `<html>` via `--font-geist-sans` and `--font-geist-mono`

### Border Radius

`--radius: 0.75rem` with derived `md` and `sm` variants.

---

## Page Structure

The app is a single-page layout defined in `app/page.tsx`. All sections are imported as separate client components and rendered in this order:

```
<main>
  <Header />           -- Sticky glassmorphism navigation
  <HeroSection />      -- Full-screen hero with portrait
  <BentoExperience />  -- Bento grid experience cards
  <ProjectShowroom />  -- Featured project cards
  <TechMarquee />      -- Infinite scrolling tech stack
  <ContactFooter />    -- Contact info and social links
</main>
```

---

## Component Specification

### 1. Header (`components/header.tsx`)

- **Type:** Client component (`"use client"`)
- **Behavior:** Fixed to top (`fixed top-0 z-50`). Transparent on load, transitions to glassmorphism (`bg-background/60 backdrop-blur-xl`) on scroll (threshold: 20px).
- **Navigation links:** Experience, Projects, Tech Stack, Contact (smooth scroll via `href="#section-id"`)
- **CTA:** "Download CV" button with yellow primary styling
- **Mobile:** Hamburger menu with animated dropdown (`AnimatePresence` + `motion.div`)
- **Entrance animation:** Slides down from `-100` to `0` on mount

### 2. Hero Section (`components/hero-section.tsx`)

- **Layout:** Two-column grid (`lg:grid-cols-2`). Text left, portrait right.
- **Background:** Subtle mesh gradient blobs (`bg-primary/5 blur-3xl`)
- **Content:**
  - "Available for hire" status badge with pulsing green dot
  - Headline: "Building **High-Performance** Interfaces with Next.js" (primary color on accent words)
  - Subtitle: 4+ years experience description
  - Two CTAs: "View Projects" (primary fill) and "Get in Touch" (outline)
- **Portrait:** `next/image` with `fill` + `object-cover`, rounded with decorative offset border elements
- **Animations:** Staggered `fadeUp` variants (0.15s delay between elements), portrait scales in

### 3. Bento Experience (`components/bento-experience.tsx`)

- **Layout:** 3-column bento grid (`grid md:grid-cols-3`). Cards span 1 or 2 columns via `md:col-span-*`.
- **Section label:** `// Experience` in mono font + primary color
- **Cards (4 total):**
  | Card | Role | Highlight | Span |
  |------|------|-----------|------|
  | Royal House | Frontend Developer | -40% Loading Time | 2 cols |
  | Kelsoft | Full-Stack Developer | Big Data & TypeScript | 1 col |
  | School 21 | Software Engineering Student | C/C++ & Algorithms | 1 col |
  | Army (VCS) | Military Service | Discipline & Communication | 2 cols |
- **Card design:** `bg-card` with `border-border`, hover effect transitions to `border-primary/30` with subtle inner glow (`bg-primary/5 blur-xl`)
- **Each card has:** Icon (Lucide), title, role, highlight badge (`bg-primary/10 text-primary`), description
- **Animations:** Scroll-triggered via `useInView`, staggered card reveal (0.12s delay)

### 4. Project Showroom (`components/project-showroom.tsx`)

- **Layout:** 2-column grid (`md:grid-cols-2`)
- **Section label:** `// Projects` in mono font + primary color
- **Projects (2 total):**
  | Project | Tags |
  |---------|------|
  | Royal Hotel | Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL |
  | Blanchard | React, Framer Motion, GSAP, Sanity CMS, Styled Components |
- **Card design:** `bg-card` with border. On hover: scales to `1.02`, border turns `primary/40`, subtle inner glow shadow
- **Each card has:** Title, GitHub + External Link icons, description, technology badges (`Badge` component with `variant="secondary"`)
- **Animations:** Scroll-triggered, staggered (0.2s delay)

### 5. Tech Marquee (`components/tech-marquee.tsx`)

- **Layout:** Full-width overflow hidden with edge fade gradients
- **Section label:** `// Tech Stack` in mono font + primary color
- **Two rows:**
  - Row 1: Scrolls left (`animate-marquee`, 30s loop)
  - Row 2: Scrolls right (`animate-marquee-reverse`, 35s loop, reversed order)
- **Each row is duplicated** for seamless infinite loop (`aria-hidden` on duplicate)
- **Tech items (10):** React, Next.js, TypeScript, Node.js, Docker, Redux, Tailwind, Git, PostgreSQL, GraphQL
- **Card design:** Compact pill with mono icon + name, `border-border bg-card`, hover to `border-primary/30`
- **Animations:** Fade in on scroll via `useInView`

### 6. Contact Footer (`components/contact-footer.tsx`)

- **Layout:** Centered column with `border-t border-border`
- **Content:**
  - "Available for new opportunities" badge with pulsing emerald dot
  - Headline: "Let's Build Something **Together**" (primary on accent)
  - Subtitle + email link (`hello@lattelix.dev`)
  - Social icons: Telegram, GitHub, LinkedIn (square icon buttons with hover to primary)
- **Bottom bar:** Logo + year on left, "Crafted with..." on right, separated by `border-t`
- **Animation:** Fade-up on scroll via `useInView`

---

## Tailwind Configuration

### Custom Keyframes

```
marquee:         translateX(0) -> translateX(-100%)  @ 30s linear infinite
marquee-reverse: translateX(-100%) -> translateX(0)  @ 35s linear infinite
```

### Font Families

```
sans: var(--font-geist-sans), system-ui, sans-serif
mono: var(--font-geist-mono), monospace
```

---

## File Structure

```
app/
  globals.css          -- Design tokens, scrollbar styles, smooth scroll
  layout.tsx           -- Root layout with Geist fonts, metadata, viewport
  page.tsx             -- Single page assembling all sections

components/
  header.tsx           -- Sticky glassmorphism header
  hero-section.tsx     -- Hero with portrait and CTAs
  bento-experience.tsx -- Bento grid experience cards
  project-showroom.tsx -- Featured project cards
  tech-marquee.tsx     -- Infinite scrolling tech badges
  contact-footer.tsx   -- Contact info and social links
  ui/                  -- shadcn/ui primitives (badge, button, etc.)

public/
  images/
    portrait.jpg       -- Developer portrait photo

tailwind.config.ts     -- Extended theme with tokens, fonts, keyframes
```

---

## Animation Pattern

All section animations follow a consistent pattern:

1. `useRef` + `useInView(ref, { once: true, margin: "-50px" to "-100px" })` for scroll triggering
2. Section header fades up: `initial={{ opacity: 0, y: 20 }}` -> `animate={{ opacity: 1, y: 0 }}`
3. Cards use staggered variants with `custom={index}` for sequential reveal
4. Easing curve: `[0.22, 1, 0.36, 1]` (custom bezier for smooth deceleration)

---

## SEO & Accessibility

- **Metadata:** Title "Lattelix | Frontend Developer Portfolio", description about Next.js and UX
- **Viewport:** `themeColor: '#09090b'`, `userScalable: true`
- **Semantic HTML:** `<main>`, `<nav>`, `<section>`, `<footer>` with proper `id` attributes
- **ARIA:** `aria-label` on icon-only links, `aria-hidden` on decorative/duplicate marquee elements
- **Images:** `alt` text on portrait, `priority` loading, responsive `sizes` attribute
- **Keyboard:** All interactive elements are focusable, mobile menu togglable
- **Smooth scroll:** `html { scroll-behavior: smooth }` for anchor navigation
