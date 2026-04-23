'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const skills = ['React', 'Next.js', 'TypeScript', 'Flutter', 'Python', 'Node.js', 'Tailwind'];

export default function AboutSnippet() {
  return (
    <section
      style={{
        background: 'var(--bg-800)',
        padding: '6rem 1rem',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">ABOUT ME</span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--text-100)',
              marginBottom: '1rem',
            }}
          >
            A Glimpse Into My{' '}
            <span className="gradient-text-coral">World</span>
          </h2>
        </motion.div>

        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              color: 'var(--text-200)',
              fontSize: '1.125rem',
              lineHeight: 1.75,
              fontFamily: 'var(--font-body)',
            }}
          >
            I&apos;m Wahaj Naveed, a Software Engineering student at COMSATS University
            with a passion for building impactful digital experiences. My journey in tech
            spans full-stack web development and machine learning, where I love turning
            complex problems into elegant, user-friendly solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'var(--text-200)',
              fontSize: '1.125rem',
              lineHeight: 1.75,
              fontFamily: 'var(--font-body)',
            }}
          >
            From crafting responsive front-end interfaces with React and Next.js to
            building cross-platform mobile apps with Flutter and designing robust back-end
            systems with Node.js and Python, I thrive on learning new technologies and
            pushing the boundaries of what&apos;s possible. My goal is to merge software
            engineering best practices with cutting-edge ML techniques to create truly
            intelligent applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem' }}
          >
            {skills.map((skill) => (
              <span key={skill} className="badge-teal">
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: '1.5rem' }}
          >
            <Link href="/about" className="btn btn-outline">
              Read More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
