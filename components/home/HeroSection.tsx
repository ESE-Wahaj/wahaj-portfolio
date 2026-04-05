'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown, MapPin, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

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
      <div className="blob blob-teal" style={{ width: 400, height: 400, bottom: '-5%', right: '-5%', animationDelay: '-3s' }} />
      <div className="blob blob-gold" style={{ width: 300, height: 300, top: '40%', left: '30%', animationDelay: '-6s' }} />

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

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ maxWidth: 520, marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-200)' }}
            >
              Software Engineering student at <span style={{ color: 'var(--gold)' }}>COMSATS University</span> building
              production-grade web applications. Passionate about turning complex ideas into clean,
              scalable solutions with <span style={{ color: 'var(--coral)' }}>React, Next.js</span>, and Python.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
            >
              <Link href="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link href="/resume" className="btn btn-outline">
                <Download size={16} />
                Download CV
              </Link>
            </motion.div>

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

            <div className="profile-frame" style={{ width: 320, height: 320 }}>
              <Image
                src="/wahaj.jpg"
                alt="Wahaj Naveed"
                width={320}
                height={320}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
            </div>

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
              <span style={{ fontSize: '1.2rem' }}>&#11088;</span>
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
