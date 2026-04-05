'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
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
            <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              Hire Me
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-100)', cursor: 'pointer', padding: '0.5rem' }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

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
