# WAHAJ PORTFOLIO — COMPLETE REDESIGN & FIX PROMPT
# =====================================================
# RUN WITH: claude --dangerously-skip-permissions
# THEN PASTE THIS ENTIRE PROMPT — NO YES CLICKS NEEDED
# =====================================================

## 🔴 EXECUTION RULES — READ FIRST
You are in fully autonomous mode. Rules:
- Complete EVERYTHING without pausing for confirmation
- Never ask "should I proceed?" — just do it
- Use multiple parallel agents/subagents for speed
- If a file has an error, fix it and continue
- Make ALL decisions autonomously
- At the end run: npx next build 2>&1 | tail -30

---

## 🎯 MISSION
Completely redesign the existing portfolio website. The current design is broken:
- Too much white, washed out, unpleasant
- Grey text is unreadable
- Not responsive on mobile
- Fonts are generic and boring
- Many UI components look broken
- Gradients are too light and bland

Replace it with a **RICH, DARK-WARM, EDITORIAL design** — think luxury magazine meets tech portfolio. Deep warm backgrounds, cream/gold text, coral accents. NOT pure black — warm dark tones. Like aged parchment meets modern tech.

---

## 🎨 NEW DESIGN SYSTEM — REPLACE globals.css ENTIRELY

Overwrite `app/globals.css` with this complete stylesheet:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* ── DARK WARM BACKGROUNDS ── */
  --bg-900: #0F0A05;          /* deepest warm black */
  --bg-800: #1A1208;          /* primary dark bg */
  --bg-700: #241A0C;          /* card backgrounds */
  --bg-600: #2E220F;          /* elevated cards */
  --bg-500: #3D2E16;          /* hover states */

  /* ── CREAM / GOLD TEXT ── */
  --text-100: #F5EDD6;        /* primary text — warm cream (highly readable) */
  --text-200: #E8D5A3;        /* secondary text — golden cream */
  --text-300: #C9A96E;        /* muted text — warm gold */
  --text-400: #9A7A4A;        /* very muted */

  /* ── ACCENT COLORS ── */
  --coral:    #FF6B4A;        /* primary CTA — deep coral/orange */
  --coral-lt: #FF8B6A;        /* lighter coral for hover */
  --coral-dk: #D94F30;        /* darker coral for pressed */
  --teal:     #2DD4BF;        /* secondary accent — vivid teal */
  --teal-lt:  #5EEAD4;
  --gold:     #F59E0B;        /* highlight gold */
  --gold-lt:  #FCD34D;
  --purple:   #A78BFA;        /* subtle purple */
  --green:    #34D399;        /* success */

  /* ── BORDERS ── */
  --border:      rgba(245, 237, 214, 0.08);
  --border-warm: rgba(245, 237, 214, 0.15);
  --border-glow: rgba(255, 107, 74, 0.3);

  /* ── SHADOWS ── */
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
  --shadow-md:  0 8px 32px rgba(0,0,0,0.5);
  --shadow-lg:  0 20px 60px rgba(0,0,0,0.6);
  --shadow-coral: 0 8px 32px rgba(255,107,74,0.25);
  --shadow-teal:  0 8px 32px rgba(45,212,191,0.2);

  /* ── TYPOGRAPHY ── */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* ── RADIUS ── */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  32px;
  --radius-full: 9999px;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-800);
  color: var(--text-100);
  line-height: 1.7;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-900); }
::-webkit-scrollbar-thumb { background: var(--coral); border-radius: 3px; }

/* ── SELECTION ── */
::selection { background: rgba(255,107,74,0.3); color: var(--text-100); }

/* ── TYPOGRAPHY SCALE ── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text-100);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 900; }
h2 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; }
h3 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; }
h4 { font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 600; }

p { color: var(--text-200); font-size: 1rem; line-height: 1.8; }

a {
  color: var(--coral);
  text-decoration: none;
  transition: color 0.2s ease;
}
a:hover { color: var(--coral-lt); }

code {
  font-family: var(--font-mono);
  background: var(--bg-700);
  color: var(--teal);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
}

pre {
  font-family: var(--font-mono);
  background: var(--bg-700);
  border: 1px solid var(--border-warm);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  overflow-x: auto;
}

img { max-width: 100%; height: auto; display: block; }

/* ── UTILITY CLASSES ── */
.font-heading { font-family: var(--font-heading); }
.font-mono    { font-family: var(--font-mono); }
.text-cream   { color: var(--text-100); }
.text-gold    { color: var(--text-200); }
.text-muted   { color: var(--text-300); }
.text-coral   { color: var(--coral); }
.text-teal    { color: var(--teal); }

/* ── GRADIENT TEXT ── */
.gradient-text {
  background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 50%, var(--teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-coral {
  background: linear-gradient(135deg, var(--coral) 0%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── CARDS ── */
.card {
  background: var(--bg-700);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all 0.3s ease;
}
.card:hover {
  border-color: var(--border-glow);
  transform: translateY(-4px);
  box-shadow: var(--shadow-coral);
}

.card-glass {
  background: rgba(36, 26, 12, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-warm);
  border-radius: var(--radius-lg);
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: var(--coral);
  color: #fff;
  box-shadow: var(--shadow-coral);
}
.btn-primary:hover {
  background: var(--coral-lt);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255,107,74,0.4);
  color: #fff;
}

.btn-outline {
  background: transparent;
  color: var(--text-100);
  border: 1px solid var(--border-warm);
}
.btn-outline:hover {
  border-color: var(--coral);
  color: var(--coral);
  background: rgba(255,107,74,0.08);
  transform: translateY(-2px);
}

.btn-teal {
  background: var(--teal);
  color: var(--bg-900);
  font-weight: 700;
}
.btn-teal:hover {
  background: var(--teal-lt);
  transform: translateY(-2px);
  color: var(--bg-900);
  box-shadow: var(--shadow-teal);
}

/* ── SECTION ── */
.section {
  padding: 6rem 0;
  position: relative;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--coral);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.section-label::before {
  content: '//';
  color: var(--teal);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── DIVIDER ── */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-warm), transparent);
  margin: 4rem 0;
}

/* ── BADGE / TAG ── */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
}
.badge-coral { background: rgba(255,107,74,0.15); color: var(--coral); border: 1px solid rgba(255,107,74,0.3); }
.badge-teal  { background: rgba(45,212,191,0.15); color: var(--teal);  border: 1px solid rgba(45,212,191,0.3); }
.badge-gold  { background: rgba(245,158,11,0.15); color: var(--gold);  border: 1px solid rgba(245,158,11,0.3); }
.badge-purple{ background: rgba(167,139,250,0.15);color: var(--purple);border: 1px solid rgba(167,139,250,0.3);}

/* ── NOISE TEXTURE OVERLAY ── */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* ── ANIMATED BACKGROUND BLOBS ── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: blobFloat 8s ease-in-out infinite alternate;
  pointer-events: none;
}
.blob-coral { background: radial-gradient(circle, var(--coral), transparent 70%); }
.blob-teal  { background: radial-gradient(circle, var(--teal), transparent 70%); }
.blob-gold  { background: radial-gradient(circle, var(--gold), transparent 70%); }

@keyframes blobFloat {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -20px) scale(1.05); }
  66%  { transform: translate(-20px, 15px) scale(0.95); }
  100% { transform: translate(10px, -30px) scale(1.08); }
}

/* ── FLOATING ANIMATION ── */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-16px); }
}
.float { animation: float 4s ease-in-out infinite; }

/* ── SKILL BUBBLES ── */
.skill-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  font-weight: 700;
  font-size: 0.7rem;
  text-align: center;
  font-family: var(--font-mono);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
}
.skill-bubble:hover {
  transform: scale(1.18) translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  z-index: 10;
}

/* ── TIMELINE ── */
.timeline-line {
  position: absolute;
  left: 1.25rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--coral), var(--teal));
}
.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--coral);
  border: 2px solid var(--bg-800);
  box-shadow: 0 0 0 4px rgba(255,107,74,0.2);
  flex-shrink: 0;
}

/* ── NAVBAR ── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(26, 18, 8, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}

/* ── FORM INPUTS ── */
.input {
  width: 100%;
  background: var(--bg-700);
  border: 1px solid var(--border-warm);
  border-radius: var(--radius-md);
  padding: 0.875rem 1.25rem;
  color: var(--text-100);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
}
.input::placeholder { color: var(--text-400); }
.input:focus {
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(255,107,74,0.15);
}

textarea.input { resize: vertical; min-height: 140px; }

/* ── RESPONSIVE GRID ── */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  h1 { font-size: clamp(2rem, 8vw, 3rem); }
  h2 { font-size: clamp(1.75rem, 6vw, 2.5rem); }
  .section { padding: 4rem 0; }
  .container { padding: 0 1rem; }
}

/* ── TIPTAP EDITOR ── */
.ProseMirror {
  outline: none;
  min-height: 300px;
  color: var(--text-100);
}
.ProseMirror h1, .ProseMirror h2, .ProseMirror h3 { color: var(--text-100); margin: 1.5em 0 0.5em; }
.ProseMirror p { color: var(--text-200); margin-bottom: 1em; }
.ProseMirror blockquote { border-left: 3px solid var(--coral); padding-left: 1rem; color: var(--text-300); }
.ProseMirror code { background: var(--bg-700); color: var(--teal); }
.ProseMirror a { color: var(--coral); }
.ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; color: var(--text-200); }
.ProseMirror li { margin-bottom: 0.5rem; }

/* ── ADMIN ── */
.admin-sidebar {
  width: 260px;
  background: var(--bg-900);
  border-right: 1px solid var(--border);
  min-height: 100vh;
  flex-shrink: 0;
}
.admin-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  color: var(--text-300);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin: 0.15rem 0.5rem;
}
.admin-nav-item:hover, .admin-nav-item.active {
  background: rgba(255,107,74,0.12);
  color: var(--coral);
}

/* ── SCROLLBAR IN ADMIN ── */
.admin-content {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-800);
  padding: 2rem;
}

/* ── CUSTOM CURSOR ── */
.custom-cursor {
  width: 12px;
  height: 12px;
  background: var(--coral);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease;
  mix-blend-mode: normal;
}
.custom-cursor.hovering {
  width: 36px;
  height: 36px;
  background: rgba(255,107,74,0.3);
  border: 2px solid var(--coral);
}
.custom-cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255,107,74,0.4);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.08s linear;
}

/* ── LIGHTBOX / MODAL ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ── PROGRESS BAR (blog reading) ── */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--coral), var(--gold), var(--teal));
  z-index: 101;
  transition: width 0.1s linear;
}

/* ── HERO PROFILE FRAME ── */
.profile-frame {
  position: relative;
  width: 340px;
  height: 340px;
  border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
  overflow: hidden;
  animation: morphShape 8s ease-in-out infinite;
  flex-shrink: 0;
}
.profile-frame::before {
  content: '';
  position: absolute;
  inset: -3px;
  background: linear-gradient(135deg, var(--coral), var(--gold), var(--teal), var(--coral));
  border-radius: inherit;
  animation: rotateBorder 4s linear infinite;
  z-index: -1;
}
@keyframes morphShape {
  0%,100% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; }
  25%  { border-radius: 55% 45% 40% 60% / 55% 35% 65% 45%; }
  50%  { border-radius: 45% 55% 55% 45% / 60% 50% 50% 40%; }
  75%  { border-radius: 60% 40% 45% 55% / 45% 60% 40% 55%; }
}
@keyframes rotateBorder {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .profile-frame { width: 220px; height: 220px; }
  .admin-sidebar { display: none; }
}
```

---

## 🔧 STEP 1 — Update tailwind.config.ts

Overwrite `tailwind.config.ts` completely:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#0F0A05',
          800: '#1A1208',
          700: '#241A0C',
          600: '#2E220F',
          500: '#3D2E16',
        },
        cream:  '#F5EDD6',
        gold:   '#E8D5A3',
        muted:  '#C9A96E',
        coral:  '#FF6B4A',
        teal:   '#2DD4BF',
        amber:  '#F59E0B',
        purple: '#A78BFA',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'blob':        'blobFloat 8s ease-in-out infinite alternate',
        'morph':       'morphShape 8s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🔧 STEP 2 — Rewrite Navbar (components/layout/Navbar.tsx)

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/posts', label: 'Posts' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ background: scrolled ? undefined : 'transparent' }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, var(--coral), var(--gold))',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900, fontSize: '1.1rem', color: '#fff',
              boxShadow: 'var(--shadow-coral)',
            }}>W</div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700, fontSize: '1.15rem',
              color: 'var(--text-100)',
              letterSpacing: '-0.01em',
            }}>Wahaj<span style={{ color: 'var(--coral)' }}>.</span></span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: pathname === link.href ? 'var(--coral)' : 'var(--text-200)',
                  background: pathname === link.href ? 'rgba(255,107,74,0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden-mobile">
            <a href="https://github.com/ESE-wahaj" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-300)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--coral)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-300)')}>
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/muhammadwahajnaveed" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-300)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-300)')}>
              <FaLinkedin size={18} />
            </a>
            <a href="/resume" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-100)', cursor: 'pointer', padding: '0.5rem' }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
              background: 'rgba(15,10,5,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem', fontWeight: 700,
                    color: pathname === link.href ? 'var(--coral)' : 'var(--text-100)',
                    padding: '0.5rem 2rem',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <a href="https://github.com/ESE-wahaj" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-300)' }}><FaGithub size={24} /></a>
              <a href="https://linkedin.com/in/muhammadwahajnaveed" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-300)' }}><FaLinkedin size={24} /></a>
              <a href="mailto:contactwahajnaveed@gmail.com"
                style={{ color: 'var(--text-300)' }}><Mail size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
```

---

## 🔧 STEP 3 — Rewrite HeroSection (components/home/HeroSection.tsx)

```tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, MapPin, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const roles = [
  'Full-Stack Developer',
  'ML Enthusiast',
  'Problem Solver',
  'React Developer',
  'Open Source Builder',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-900)',
      paddingTop: '5rem',
    }}>
      {/* Animated background blobs */}
      <div className="blob blob-coral" style={{ width: 500, height: 500, top: '-10%', left: '-10%', animationDelay: '0s' }} />
      <div className="blob blob-teal"  style={{ width: 400, height: 400, bottom: '-5%', right: '-5%', animationDelay: '-3s' }} />
      <div className="blob blob-gold"  style={{ width: 300, height: 300, top: '40%', left: '30%', animationDelay: '-6s' }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4rem',
          flexWrap: 'wrap',
        }}>
          {/* Left: Text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
              <MapPin size={14} color="var(--coral)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-300)', letterSpacing: '0.08em' }}>
                Wah, Pakistan — Available for opportunities
              </span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', display: 'inline-block' }} />
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)', fontSize: '1rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                Hi, I&apos;m
              </p>
              <h1 style={{ marginBottom: '0.25rem', lineHeight: 1.1 }}>
                M. Wahaj
                <br />
                <span className="gradient-text-coral">Naveed</span>
                <span style={{ color: 'var(--coral)' }}>.</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ marginBottom: '1.5rem', height: '2.5rem', display: 'flex', alignItems: 'center' }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: 'var(--teal)',
                fontWeight: 500,
              }}>
                {displayed}
                <span style={{ borderRight: '2px solid var(--coral)', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ maxWidth: 520, marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-200)' }}
            >
              Software Engineering student at <span style={{ color: 'var(--gold)' }}>COMSATS University</span> building
              production-grade web applications. Passionate about turning complex ideas into clean,
              scalable solutions with <span style={{ color: 'var(--coral)' }}>React, Next.js</span>, and Python.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
            >
              <Link href="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <a href="/Wahaj_CV_2026.pdf" download className="btn btn-outline">
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}
            >
              {[
                { icon: <FaGithub size={20} />, href: 'https://github.com/ESE-wahaj', label: 'GitHub' },
                { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/muhammadwahajnaveed', label: 'LinkedIn' },
                { icon: <FaInstagram size={20} />, href: 'https://instagram.com/wahajnaveed', label: 'Instagram' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-700)',
                    border: '1px solid var(--border-warm)',
                    color: 'var(--text-300)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--coral)';
                    e.currentTarget.style.color = 'var(--coral)';
                    e.currentTarget.style.background = 'rgba(255,107,74,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-warm)';
                    e.currentTarget.style.color = 'var(--text-300)';
                    e.currentTarget.style.background = 'var(--bg-700)';
                  }}
                >
                  {icon}
                </a>
              ))}
              <div style={{ height: 1, flex: 1, maxWidth: 80, background: 'var(--border-warm)' }} />
              <a href="mailto:contactwahajnaveed@gmail.com"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-300)', letterSpacing: '0.03em' }}>
                contactwahajnaveed@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="float"
            style={{ position: 'relative', flexShrink: 0 }}
          >
            {/* Decorative ring */}
            <div style={{
              position: 'absolute', inset: -20,
              borderRadius: '50%',
              border: '1px dashed rgba(255,107,74,0.3)',
              animation: 'spin 20s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: -40,
              borderRadius: '50%',
              border: '1px dashed rgba(45,212,191,0.2)',
              animation: 'spin 30s linear infinite reverse',
            }} />

            {/* Profile frame */}
            <div className="profile-frame" style={{ width: 320, height: 320 }}>
              {/* 
                ===================================================
                IMAGE PLACEMENT: Replace the gradient below with:
                <Image src="/wahaj.jpg" alt="M. Wahaj Naveed" fill style={{ objectFit: 'cover' }} />
                Put your photo at: public/wahaj.jpg
                ===================================================
              */}
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, var(--bg-600) 0%, var(--bg-700) 100%)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.5rem',
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--coral), var(--gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 900,
                  fontSize: '2rem', color: '#fff',
                }}>W</div>
                <p style={{ color: 'var(--text-300)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  // add wahaj.jpg
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              style={{
                position: 'absolute', top: '5%', right: '-15%',
                background: 'var(--bg-700)', border: '1px solid var(--border-warm)',
                borderRadius: 'var(--radius-md)', padding: '0.6rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>⭐</span>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-300)', fontFamily: 'var(--font-mono)', margin: 0 }}>PM Award</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold)', margin: 0 }}>Recipient</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              style={{
                position: 'absolute', bottom: '10%', left: '-20%',
                background: 'var(--bg-700)', border: '1px solid var(--border-warm)',
                borderRadius: 'var(--radius-md)', padding: '0.6rem 1rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <p style={{ fontSize: '0.7rem', color: 'var(--text-300)', fontFamily: 'var(--font-mono)', margin: 0 }}>CGPA</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--coral)', margin: 0 }}>3.62 / 4.0</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', color: 'var(--text-400)' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .profile-frame { width: 220px !important; height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## 🔧 STEP 4 — Rewrite SkillBubbles (components/home/SkillBubbles.tsx)

```tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const skills = [
  { name: 'React',      color: '#61DAFB', bg: '#1a3a4a', size: 110, delay: 0 },
  { name: 'Next.js',    color: '#FFFFFF', bg: '#1a1a1a', size: 95,  delay: 0.1 },
  { name: 'TypeScript', color: '#3178C6', bg: '#1a2d4a', size: 100, delay: 0.2 },
  { name: 'Python',     color: '#FFD43B', bg: '#3a2e00', size: 95,  delay: 0.3 },
  { name: 'Node.js',    color: '#68A063', bg: '#1a2e1a', size: 85,  delay: 0.4 },
  { name: 'Flask',      color: '#EEEEEE', bg: '#2a2a2a', size: 75,  delay: 0.5 },
  { name: 'PostgreSQL', color: '#336791', bg: '#0d1f33', size: 90,  delay: 0.6 },
  { name: 'Docker',     color: '#2496ED', bg: '#0d2640', size: 80,  delay: 0.7 },
  { name: 'Tailwind',   color: '#06B6D4', bg: '#022b33', size: 80,  delay: 0.8 },
  { name: 'Git',        color: '#F05032', bg: '#3a1208', size: 75,  delay: 0.9 },
  { name: 'MongoDB',    color: '#47A248', bg: '#0d2e0d', size: 75,  delay: 1.0 },
  { name: 'Scikit',     color: '#F7931E', bg: '#3a2800', size: 70,  delay: 1.1 },
  { name: 'Figma',      color: '#F24E1E', bg: '#3a1200', size: 70,  delay: 1.2 },
  { name: 'C++',        color: '#00599C', bg: '#001a33', size: 72,  delay: 1.3 },
];

const floatVariants = [
  { y: [0, -18, 0], duration: 3.5 },
  { y: [0, 14, 0],  duration: 4.2 },
  { y: [0, -12, 0], duration: 5 },
  { y: [0, 20, 0],  duration: 3.8 },
  { y: [0, -16, 0], duration: 4.5 },
];

export default function SkillBubbles() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{ background: 'var(--bg-900)', padding: '6rem 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Skills & Technologies</p>
          <h2>My <span className="gradient-text">Tech Stack</span></h2>
          <p style={{ maxWidth: 480, margin: '1rem auto 0', color: 'var(--text-300)' }}>
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Bubbles grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          {skills.map((skill, i) => {
            const fv = floatVariants[i % floatVariants.length];
            const isHovered = hovered === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: skill.delay, type: 'spring', stiffness: 120 }}
              >
                <motion.div
                  animate={{ y: fv.y }}
                  transition={{ duration: fv.duration, repeat: Infinity, ease: 'easeInOut' }}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: skill.size,
                    height: skill.size,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${skill.color}22, ${skill.bg} 70%)`,
                    border: `2px solid ${isHovered ? skill.color : skill.color + '44'}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isHovered ? 'scale(1.2) translateY(-8px)' : 'scale(1)',
                    boxShadow: isHovered
                      ? `0 16px 48px ${skill.color}40, inset 0 1px 0 rgba(255,255,255,0.15)`
                      : `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
                    position: 'relative',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: skill.size > 90 ? '0.75rem' : '0.65rem',
                    fontWeight: 700,
                    color: skill.color,
                    textAlign: 'center',
                    padding: '0 8px',
                    lineHeight: 1.3,
                  }}>
                    {skill.name}
                  </span>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        position: 'absolute', bottom: '110%',
                        background: 'var(--bg-600)',
                        border: `1px solid ${skill.color}44`,
                        borderRadius: 8, padding: '0.4rem 0.8rem',
                        fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                        color: skill.color, whiteSpace: 'nowrap',
                        boxShadow: 'var(--shadow-md)',
                        pointerEvents: 'none',
                      }}
                    >
                      {skill.name}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## 🔧 STEP 5 — Rewrite StatsCounter (components/home/StatsCounter.tsx)

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 362, suffix: '/4.0', label: 'CGPA', color: 'var(--coral)', prefix: '3.' },
  { value: 10,  suffix: '+',    label: 'Projects Built', color: 'var(--teal)', prefix: '' },
  { value: 2,   suffix: '+',    label: 'Internships', color: 'var(--gold)', prefix: '' },
  { value: 98,  suffix: '/100', label: 'Lighthouse Score', color: 'var(--purple)', prefix: '' },
];

function Counter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsCounter() {
  return (
    <section style={{ background: 'var(--bg-800)', padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: stat.color,
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {stat.prefix}<Counter value={stat.value} />{stat.suffix}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-300)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## 🔧 STEP 6 — Rewrite Footer (components/layout/Footer.tsx)

```tsx
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--bg-900)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--coral), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#fff',
              }}>W</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-100)' }}>
                Wahaj<span style={{ color: 'var(--coral)' }}>.</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-300)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 260, marginBottom: '1.5rem' }}>
              Software Engineer & Full-Stack Developer building production-grade web applications from Wah, Pakistan.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <FaGithub size={18}/>, href: 'https://github.com/ESE-wahaj' },
                { icon: <FaLinkedin size={18}/>, href: 'https://linkedin.com/in/muhammadwahajnaveed' },
                { icon: <FaInstagram size={18}/>, href: 'https://instagram.com/wahajnaveed' },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: 'var(--bg-700)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-300)', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-300)'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Navigate</h4>
            {['/', '/about', '/projects', '/blog', '/posts', '/gallery', '/contact'].map((href, i) => (
              <Link key={href} href={href}
                style={{ display: 'block', color: 'var(--text-300)', fontSize: '0.9rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--coral)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-300)')}
              >
                {['Home','About','Projects','Blog','Posts','Gallery','Contact'][i]}
              </Link>
            ))}
          </div>

          {/* Work */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--teal)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Featured</h4>
            {['ClarityWorks','JAAW','Glass & Doors UK','Airport Taxihub'].map(name => (
              <Link key={name} href="/projects"
                style={{ display: 'block', color: 'var(--text-300)', fontSize: '0.9rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-300)')}
              >{name}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</h4>
            {[
              { icon: <Mail size={14}/>, text: 'contactwahajnaveed@gmail.com', href: 'mailto:contactwahajnaveed@gmail.com' },
              { icon: <Phone size={14}/>, text: '+92 313 5347070', href: 'tel:+923135347070' },
              { icon: <MapPin size={14}/>, text: 'Wah, Islamabad, Pakistan', href: '#' },
            ].map(({ icon, text, href }) => (
              <a key={text} href={href}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-300)', fontSize: '0.85rem', marginBottom: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-300)')}
              >
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{icon}</span>
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-400)', fontSize: '0.8rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
            © {year} M. Wahaj Naveed. Designed & Built with ❤️
          </p>
          <p style={{ color: 'var(--text-400)', fontSize: '0.8rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
            Next.js · Supabase · Framer Motion
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
```

---

## 🔧 STEP 7 — After rewriting all above files, use agents to fix remaining pages

Use parallel agents to update each remaining page to use the new design system:

### Agent 1 — Fix About Page
Rewrite `app/(public)/about/page.tsx` to use dark warm design:
- Background: `var(--bg-800)`
- All text uses `var(--text-100)`, `var(--text-200)`, `var(--text-300)` 
- Cards use `var(--bg-700)` with `var(--border)` borders
- Remove ALL white backgrounds, ALL grey text colors
- Section labels use `section-label` class
- Buttons use `btn btn-primary` or `btn btn-outline` classes

### Agent 2 — Fix Projects Page
Rewrite `app/(public)/projects/page.tsx`:
- Dark card design: `background: var(--bg-700)`, border on hover glows coral
- Tech badges use `badge-teal` or `badge-coral` classes
- Filter pills: active = coral background, inactive = transparent with border
- Remove all white/grey backgrounds

### Agent 3 — Fix Contact Page
Rewrite `app/(public)/contact/page.tsx`:
- Form inputs use `.input` class (already defined in globals.css)
- Background `var(--bg-800)` throughout
- Labels: `color: var(--text-200)`, `font-size: 0.85rem`
- Submit button: `btn btn-primary`

### Agent 4 — Fix Admin Panel
Update `app/(admin)/admin/layout.tsx` and all admin pages:
- Sidebar uses `.admin-sidebar` class
- Nav items use `.admin-nav-item` class  
- Content area: `background: var(--bg-800)`
- All stat cards: `background: var(--bg-700)`, coral/teal/gold accent colors

### Agent 5 — Fix Blog, Posts, Gallery pages
Update all remaining pages to use dark warm theme consistently.

---

## 🔧 STEP 8 — Fix SectionHeading component

Overwrite `components/shared/SectionHeading.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

interface Props {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, highlight, description, center }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '3.5rem', textAlign: center ? 'center' : 'left' }}
    >
      <p className="section-label" style={{ justifyContent: center ? 'center' : 'flex-start' }}>
        {label}
      </p>
      <h2 style={{ marginBottom: description ? '1rem' : 0 }}>
        {title}{' '}
        {highlight && <span className="gradient-text-coral">{highlight}</span>}
      </h2>
      {description && (
        <p style={{ maxWidth: 560, margin: center ? '0 auto' : '0', color: 'var(--text-300)', fontSize: '1.05rem' }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
```

---

## 🖼️ IMAGE PLACEMENT GUIDE

After build is complete, tell the user exactly where to place images:

```
📁 public/
  ├── wahaj.jpg          ← YOUR PROFILE PHOTO (the formal suit photo)
  │                         Recommended: 400×400px, square, cropped tight
  │
  ├── images/
  │   ├── projects/
  │   │   ├── clarityworks.jpg      ← Screenshot of ClarityWorks live site
  │   │   ├── glass-doors.jpg       ← Screenshot of glassanddoors.vercel.app
  │   │   ├── jaaw.jpg             ← Screenshot of jaaw.netlify.app
  │   │   ├── airport-taxi.jpg     ← Screenshot of the taxi booking site
  │   │   └── (other projects).jpg
  │   │
  │   ├── blog/
  │   │   └── (blog post cover images go here)
  │   │
  │   └── gallery/
  │       └── (your personal photos go here)
```

### AI Image Prompts (generate these and place in public/images/):

**Hero background (no image needed — CSS animated blobs)**

**About page illustration** → `public/images/about-bg.jpg`:
> "Cinematic photo of a South Asian software engineer working late at night, multiple monitors with warm amber desk lamp, cozy dark room, golden hour mood, warm tones, 8K, photorealistic, shallow depth of field"

**Blog hero** → `public/images/blog-hero.jpg`:
> "Abstract dark background with glowing golden and coral code symbols floating in deep space, warm amber light rays, elegant editorial photography style, 4K ultra-wide"

**Contact page** → `public/images/contact-bg.jpg`:
> "Abstract dark warm illustration of interconnected glowing lines and nodes on near-black background, warm coral and amber accent colors, tech aesthetic, 4K"

**404 page** → `public/images/404.jpg`:
> "Minimalist illustration of a lost astronaut in deep dark space holding a broken compass, warm golden spacesuit, subtle coral stars, near-black background, flat illustration style"

---

## 🔧 STEP 9 — Final build and verification

After all agents complete:

```bash
# Fix any TypeScript errors
npx tsc --noEmit 2>&1 | head -30

# Build
npx next build 2>&1 | tail -40
```

If there are TypeScript errors, fix them automatically — common fixes:
- Add `'use client'` directive to any component using hooks
- Fix missing imports
- Fix `React.MouseEvent` type annotations in onMouseEnter/onMouseLeave handlers in regular HTML (use inline functions with proper typing or cast with `as any` for speed)

---

## ✅ EXPECTED RESULT

When done, the site should have:
- **Rich dark-warm aesthetic**: deep brown-black backgrounds, cream/gold text, coral accents
- **Fully readable text**: cream (#F5EDD6) on dark backgrounds, never grey-on-white
- **Professional typography**: Playfair Display headings, Plus Jakarta Sans body
- **Responsive**: works perfectly on 320px mobile to 1440px desktop
- **Animated**: floating blobs, typewriter, skill bubbles, scroll reveals
- **No white washed pages** anywhere

Print completion summary when done.
