'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    icon: '🏆',
    title: 'PM Laptop Award',
    description:
      'Received a laptop under the Prime Minister Laptop Scheme in recognition of outstanding academic performance and dedication to studies.',
  },
  {
    icon: '💼',
    title: 'CapregSoft Internship',
    description:
      'Completed a hands-on software engineering internship at CapregSoft, working on real-world projects with modern tech stacks and agile workflows.',
  },
  {
    icon: '🎓',
    title: 'Meta Front-End Certification',
    description:
      'Earned the Meta Front-End Developer Professional Certificate, mastering React, responsive design, and modern front-end development practices.',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      style={{
        background: 'var(--bg-800)',
        padding: '6rem 1rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <span className="section-label">ACHIEVEMENTS</span>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-100)',
            marginBottom: '1rem',
          }}
        >
          Milestones &{' '}
          <span className="gradient-text-coral">Recognition</span>
        </h2>

        <p
          style={{
            color: 'var(--text-300)',
            marginBottom: '4rem',
            maxWidth: '32rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          Key highlights from my academic and professional journey
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            margin: '0 -1rem',
            padding: '0 1rem 1rem',
          }}
        >
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              style={{ flexShrink: 0, width: '20rem' }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  height: '100%',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-100)',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-200)',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
