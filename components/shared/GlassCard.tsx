'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', hover = true, style }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`card-glass ${className}`}
      style={{
        background: 'rgba(36, 26, 12, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-warm)',
        borderRadius: '1.25rem',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
