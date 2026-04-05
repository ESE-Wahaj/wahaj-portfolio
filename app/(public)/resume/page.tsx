'use client';

import { motion } from 'framer-motion';

const skills: Record<string, { name: string; level: number }[]> = {
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
  'ML / Data': [
    { name: 'Scikit-learn', level: 78 },
    { name: 'NLP', level: 72 },
  ],
  DevOps: [
    { name: 'Docker', level: 75 },
    { name: 'Git/GitHub', level: 90 },
    { name: 'Linux', level: 72 },
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
    points: [
      'Built a complete business website with product catalog and quote system',
      'Developed admin dashboard for managing products and customer inquiries',
      'Implemented responsive design and SEO optimization',
    ],
  },
  {
    title: 'Frontend Developer Trainee',
    company: 'CapregSoft',
    period: 'Aug 2024 - Mar 2025',
    points: [
      'Developed full-stack web applications using React and Node.js',
      'Collaborated with cross-functional teams using agile methodologies',
      'Contributed to code reviews and testing processes',
    ],
  },
  {
    title: 'Sports Secretary',
    company: 'COMSATS University',
    period: '2023 - 2024',
    points: [
      'Organized and led university-wide sports events and competitions',
      'Managed budgets and coordinated with multiple departments',
      'Led inter-university competition teams',
    ],
  },
];

const education = [
  {
    degree: 'BS Software Engineering',
    institution: 'COMSATS University Islamabad, Wah Campus',
    period: '2022 - 2026',
    details: 'CGPA: 3.62 | Focus: Software Engineering, Machine Learning, Full-Stack Development',
  },
];

const certifications = [
  {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta via Coursera',
    year: 'Apr 2024',
  },
  {
    title: "Prime Minister's Laptop Award",
    issuer: 'Government of Pakistan',
    year: '2023',
  },
];

export default function ResumePage() {
  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          background: 'var(--bg-800)',
          color: 'var(--text-100)',
          padding: '6rem 0',
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            <div className="section-label">RESUME</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>
              My Resume
            </h2>
          </motion.div>

          {/* Download Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <a href="/resume.pdf" download="Wahaj-Naveed-Resume.pdf" className="btn btn-primary">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </a>
          </div>

          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-400)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              marginBottom: '3rem',
            }}
          >
            This page is print-friendly. Use Ctrl+P / Cmd+P to print or save as PDF.
          </p>

          {/* Resume Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Header Card */}
            <div className="card" style={{ textAlign: 'center' }}>
              <h2
                className="gradient-text-coral"
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '0.5rem',
                }}
              >
                Wahaj Naveed
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--teal)', fontWeight: 500, marginBottom: '1rem' }}>
                Full Stack Developer &amp; ML Enthusiast
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-300)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Wah, Pakistan</span>
                <span>&#8226;</span>
                <span>wahaj@example.com</span>
                <span>&#8226;</span>
                <span>+92 300 1234567</span>
                <span>&#8226;</span>
                <span>github.com/ESE-wahaj</span>
              </div>
            </div>

            {/* Skills with proficiency bars */}
            <div className="card">
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-100)',
                  fontFamily: 'var(--font-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--coral), var(--teal))',
                  }}
                />
                Skills
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '2rem',
                }}
              >
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {category}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {items.map((skill) => (
                        <div key={skill.name}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.8rem',
                              marginBottom: '0.25rem',
                            }}
                          >
                            <span style={{ color: 'var(--text-200)' }}>{skill.name}</span>
                            <span style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>
                              {skill.level}%
                            </span>
                          </div>
                          <div
                            style={{
                              height: '0.375rem',
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
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="card">
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-100)',
                  fontFamily: 'var(--font-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--coral), var(--teal))',
                  }}
                />
                Experience
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {experience.map((exp) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.25rem',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-100)' }}>
                        {exp.title}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--teal)',
                          fontWeight: 500,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p style={{ color: 'var(--coral)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                      {exp.company}
                    </p>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {exp.points.map((point, i) => (
                        <li
                          key={i}
                          style={{
                            color: 'var(--text-300)',
                            fontSize: '0.875rem',
                            listStyleType: 'disc',
                          }}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card">
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-100)',
                  fontFamily: 'var(--font-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--coral), var(--teal))',
                  }}
                />
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.institution}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '0.25rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-100)' }}>
                      {edu.degree}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--teal)',
                        fontWeight: 500,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p style={{ color: 'var(--coral)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    {edu.institution}
                  </p>
                  <p style={{ color: 'var(--text-300)', fontSize: '0.875rem' }}>{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Certifications & Awards */}
            <div className="card">
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-100)',
                  fontFamily: 'var(--font-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--coral), var(--teal))',
                  }}
                />
                Certifications &amp; Awards
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '0.25rem',
                    }}
                  >
                    <div>
                      <h4 style={{ color: 'var(--text-100)', fontWeight: 500 }}>{cert.title}</h4>
                      <p style={{ color: 'var(--text-300)', fontSize: '0.875rem' }}>{cert.issuer}</p>
                    </div>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--gold)',
                        fontWeight: 500,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          body {
            background: #fff !important;
            color: #000 !important;
          }
          .card {
            background: #fff !important;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
            break-inside: avoid;
          }
          .section-label {
            color: #333 !important;
          }
          .section-label::before {
            color: #666 !important;
          }
          .gradient-text-coral {
            -webkit-text-fill-color: #333 !important;
            color: #333 !important;
          }
          .btn, .section-label, nav {
            display: none !important;
          }
          section {
            padding: 0 !important;
          }
          h2, h3, h4 {
            color: #000 !important;
          }
          p, li, span {
            color: #333 !important;
          }
        }
      `}</style>
    </>
  );
}
