'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const skills = [
  { name: 'React', color: '#61DAFB', bg: '#1a3a4a', size: 110, delay: 0 },
  { name: 'Next.js', color: '#FFFFFF', bg: '#1a1a1a', size: 95, delay: 0.1 },
  { name: 'TypeScript', color: '#3178C6', bg: '#1a2d4a', size: 100, delay: 0.2 },
  { name: 'Python', color: '#FFD43B', bg: '#3a2e00', size: 95, delay: 0.3 },
  { name: 'Node.js', color: '#68A063', bg: '#1a2e1a', size: 85, delay: 0.4 },
  { name: 'Flask', color: '#EEEEEE', bg: '#2a2a2a', size: 75, delay: 0.5 },
  { name: 'PostgreSQL', color: '#336791', bg: '#0d1f33', size: 90, delay: 0.6 },
  { name: 'Docker', color: '#2496ED', bg: '#0d2640', size: 80, delay: 0.7 },
  { name: 'Tailwind', color: '#06B6D4', bg: '#022b33', size: 80, delay: 0.8 },
  { name: 'Git', color: '#F05032', bg: '#3a1208', size: 75, delay: 0.9 },
  { name: 'MongoDB', color: '#47A248', bg: '#0d2e0d', size: 75, delay: 1.0 },
  { name: 'Scikit', color: '#F7931E', bg: '#3a2800', size: 70, delay: 1.1 },
  { name: 'Figma', color: '#F24E1E', bg: '#3a1200', size: 70, delay: 1.2 },
  { name: 'C++', color: '#00599C', bg: '#001a33', size: 72, delay: 1.3 },
];

const floatVariants = [
  { y: [0, -18, 0], duration: 3.5 },
  { y: [0, 14, 0], duration: 4.2 },
  { y: [0, -12, 0], duration: 5 },
  { y: [0, 20, 0], duration: 3.8 },
  { y: [0, -16, 0], duration: 4.5 },
];

export default function SkillBubbles() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{ background: 'var(--bg-900)', padding: '6rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Skills & Technologies</p>
          <h2>My <span className="gradient-text">Tech Stack</span></h2>
          <p style={{ maxWidth: 480, margin: '1rem auto 0', color: 'var(--text-300)' }}>
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

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
