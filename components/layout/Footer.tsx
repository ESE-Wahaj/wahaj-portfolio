'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--bg-900)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>
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
                >{icon}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Navigate</h4>
            {['/', '/about', '/projects', '/blog', '/posts', '/gallery', '/contact'].map((href, i) => (
              <Link key={href} href={href}
                style={{ display: 'block', color: 'var(--text-300)', fontSize: '0.9rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
              >
                {['Home','About','Projects','Blog','Posts','Gallery','Contact'][i]}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--teal)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Featured</h4>
            {['ClarityWorks','JAAW','Glass & Doors UK','Airport Taxihub'].map(name => (
              <Link key={name} href="/projects"
                style={{ display: 'block', color: 'var(--text-300)', fontSize: '0.9rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
              >{name}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</h4>
            {[
              { icon: <Mail size={14}/>, text: 'contactwahajnaveed@gmail.com', href: 'mailto:contactwahajnaveed@gmail.com' },
              { icon: <Phone size={14}/>, text: '+92 313 5347070', href: 'tel:+923135347070' },
              { icon: <MapPin size={14}/>, text: 'Wah, Islamabad, Pakistan', href: '#' },
            ].map(({ icon, text, href }) => (
              <a key={text} href={href}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-300)', fontSize: '0.85rem', marginBottom: '0.75rem', transition: 'color 0.2s' }}
              >
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{icon}</span>
                {text}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-400)', fontSize: '0.8rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
            &copy; {year} M. Wahaj Naveed. Designed & Built with care
          </p>
          <p style={{ color: 'var(--text-400)', fontSize: '0.8rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
            Next.js &middot; Supabase &middot; Framer Motion
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
