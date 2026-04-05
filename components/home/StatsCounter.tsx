'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 62, suffix: '/4.0', label: 'CGPA', color: 'var(--coral)', prefix: '3.' },
  { value: 10, suffix: '+', label: 'Projects Built', color: 'var(--teal)', prefix: '' },
  { value: 2, suffix: '+', label: 'Internships', color: 'var(--gold)', prefix: '' },
  { value: 98, suffix: '/100', label: 'Lighthouse Score', color: 'var(--purple)', prefix: '' },
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
        <div className="grid-4">
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
    </section>
  );
}
