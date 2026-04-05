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
