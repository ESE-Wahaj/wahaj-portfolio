'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          "linear-gradient(rgba(10, 8, 6, 0.78), rgba(10, 8, 6, 0.84)), url('/images/404.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '0 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <div
          className="blob blob-coral"
          style={{
            width: '18rem',
            height: '18rem',
            top: '25%',
            left: '25%',
            position: 'absolute',
          }}
        />
        <div
          className="blob blob-teal"
          style={{
            width: '18rem',
            height: '18rem',
            bottom: '25%',
            right: '25%',
            position: 'absolute',
          }}
        />
        <div
          className="blob blob-gold"
          style={{
            width: '18rem',
            height: '18rem',
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '32rem',
        }}
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="gradient-text"
          style={{
            fontSize: 'clamp(8rem, 25vw, 12.5rem)',
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'var(--font-heading)',
          }}
        >
          404
        </motion.h1>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-100)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: 'var(--text-300)',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Oops! Looks like this page got lost in space.
          Let&apos;s get you back to familiar ground.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
