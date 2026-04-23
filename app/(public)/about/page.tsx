'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories: Record<string, { name: string; level: number }[]> = {
  Frontend: [
    { name: 'React.js', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 92 },
  ],
  Backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Python', level: 85 },
    { name: 'Flask', level: 80 },
    { name: 'PostgreSQL', level: 78 },
    { name: 'MongoDB', level: 75 },
  ],
  ML: [
    { name: 'Scikit-learn', level: 78 },
    { name: 'NLP', level: 72 },
  ],
  DevOps: [
    { name: 'Docker', level: 75 },
    { name: 'Git/GitHub', level: 90 },
    { name: 'Linux', level: 72 },
  ],
  Mobile: [
    { name: 'Flutter', level: 80 },
    { name: 'Dart', level: 78 },
  ],
  Tools: [
    { name: 'C++', level: 75 },
    { name: 'SQL', level: 80 },
    { name: 'Figma', level: 78 },
  ],
};

const experience = [
  {
    title: 'Full Stack Developer (Freelance)',
    company: 'Glass & Doors UK',
    period: '2024 - Present',
    description:
      'Built a complete business website with product catalog, quote system, and admin dashboard using Next.js and Tailwind CSS.',
  },
  {
    title: 'Frontend Developer Trainee',
    company: 'CapregSoft',
    period: 'Aug 2024 - Mar 2025',
    description:
      'Worked on full-stack web applications, collaborated with teams using agile methodologies, and gained hands-on experience with React and Node.js.',
  },
  {
    title: 'Meta Front-End Developer Certificate',
    company: 'Meta via Coursera',
    period: 'Apr 2024',
    description:
      'Completed the professional certificate covering React, JavaScript, UX/UI principles, and version control.',
  },
  {
    title: 'Sports Secretary',
    company: 'COMSATS Sports Society',
    period: '2023 - 2024',
    description:
      'Led and organized university sports events, managed teams, and coordinated inter-university competitions.',
  },
  {
    title: 'BS Software Engineering',
    company: 'COMSATS University Islamabad, Wah Campus',
    period: '2022 - 2026',
    description:
      'Pursuing a degree in Software Engineering with a current CGPA of 3.62, focusing on full-stack development and machine learning.',
  },
];

const funFacts = [
  { emoji: '\u{1F3AE}', fact: 'Avid gamer who loves strategy and FPS titles' },
  { emoji: '\u2615', fact: 'Fueled by coffee \u2014 3+ cups a day minimum' },
  { emoji: '\u{1F3CF}', fact: 'Cricket enthusiast and university sports secretary' },
  { emoji: '\u{1F4DA}', fact: 'Always reading about the latest in AI and tech' },
  { emoji: '\u{1F30D}', fact: 'Dream: build tech that impacts millions of lives' },
];

const learningNow = ['Supabase', 'AI/LLM', 'Cloud Deployment'];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(16, 12, 9, 0.9), rgba(16, 12, 9, 0.94)), url('/images/about-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
      }}
    >
      {/* Hero */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7rem 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,107,74,0.28), rgba(10, 8, 6, 0.66)), url('/images/about-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: 700,
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-100)',
          }}
        >
          About <span className="gradient-text-coral">Me</span>
        </motion.h1>
      </div>

      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem 6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '7rem',
        }}
      >
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">MY STORY</div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-100)',
              fontSize: '2rem',
              marginBottom: '1.5rem',
            }}
          >
            The Journey So Far
          </h2>
          <div
            style={{
              maxWidth: '48rem',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              color: 'var(--text-200)',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            <p>
              Hi, I&apos;m{' '}
              <span style={{ color: 'var(--coral)', fontWeight: 600 }}>Wahaj Naveed</span>, a
              Software Engineering student at COMSATS University Islamabad (Wah Campus) with a CGPA
              of 3.62. Based in Wah, Pakistan, my journey into the world of programming started with
              sheer curiosity — tinkering with HTML pages in high school and wondering how websites
              really worked behind the scenes.
            </p>
            <p>
              What began as curiosity quickly turned into passion. I dove headfirst into JavaScript,
              then React, then the entire full-stack ecosystem. Building things from scratch, seeing
              ideas transform into working products — that feeling never gets old. From crafting
              pixel-perfect UIs to designing robust APIs, every layer of the stack fascinates me.
            </p>
            <p>
              Beyond web development, I also build cross-platform mobile applications with Flutter
              and Dart. I&apos;ve also developed a strong interest in machine learning and
              artificial intelligence. Working with Python, Scikit-learn, and NLP has opened my eyes
              to the incredible potential of data-driven solutions. I love exploring how ML can be
              woven into web and mobile applications to create smarter, more personalized experiences.
            </p>
            <p>
              Today, I balance my studies with freelance projects, open-source contributions, and
              continuous learning. My core stack revolves around React, Next.js, Flutter, Python, and ML
              tools. Whether it&apos;s a client project, a hackathon, or a personal experiment, I
              approach every challenge with the same energy and determination to build something
              meaningful.
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">SKILLS</div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-100)',
              fontSize: '2rem',
              marginBottom: '2rem',
            }}
          >
            What I Work With
          </h2>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {Object.keys(skillCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background:
                    activeCategory === cat ? 'var(--coral)' : 'transparent',
                  color:
                    activeCategory === cat ? '#fff' : 'var(--text-300)',
                  border:
                    activeCategory === cat
                      ? '1px solid var(--coral)'
                      : '1px solid var(--border-warm)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ maxWidth: '40rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {skillCategories[activeCategory].map((skill, idx) => (
                <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-100)', fontWeight: 500 }}>{skill.name}</span>
                    <span style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                  </div>
                  <div
                    style={{
                      height: '0.625rem',
                      background: 'var(--bg-900)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        borderRadius: '9999px',
                        background: 'linear-gradient(90deg, var(--coral), var(--teal))',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">EXPERIENCE</div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-100)',
              fontSize: '2rem',
              marginBottom: '2rem',
            }}
          >
            Where I&apos;ve Been
          </h2>
          <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', paddingLeft: '3rem' }}>
            <div className="timeline-line" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  <div
                    className="timeline-dot"
                    style={{
                      position: 'absolute',
                      left: '-2.35rem',
                      top: '0.5rem',
                    }}
                  />
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--gold)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 500,
                      }}
                    >
                      {exp.period}
                    </span>
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--text-100)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p style={{ color: 'var(--teal)', fontSize: '0.875rem', fontWeight: 500 }}>
                      {exp.company}
                    </p>
                    <p style={{ color: 'var(--text-300)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What I'm Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">LEARNING</div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-100)',
              fontSize: '2rem',
              marginBottom: '2rem',
            }}
          >
            What I&apos;m Exploring
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {learningNow.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                className="badge badge-teal"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">FUN FACTS</div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-100)',
              fontSize: '2rem',
              marginBottom: '2rem',
            }}
          >
            Beyond the Code
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
              maxWidth: '56rem',
              margin: '0 auto',
            }}
          >
            {funFacts.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card"
                style={{ textAlign: 'center', padding: '1.5rem' }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>
                  {item.emoji}
                </span>
                <p style={{ color: 'var(--text-200)', fontSize: '0.875rem' }}>{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
