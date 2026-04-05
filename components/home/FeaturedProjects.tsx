'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  short_description: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
  status?: string;
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data.slice(0, 3));
      }
    };

    fetchProjects();
  }, []);

  return (
    <section style={{ background: 'var(--bg-800)', padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <span className="section-label">FEATURED WORK</span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-100)', marginBottom: '1rem' }}>
          Selected <span className="gradient-text-coral">Projects</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-100)', fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
                  <span className={project.status === 'completed' ? 'badge-teal' : 'badge-gold'}>{project.status === 'completed' ? 'Live' : 'In Progress'}</span>
                </div>

                <p style={{ color: 'var(--text-200)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem', flex: 1, fontFamily: 'var(--font-body)' }}>{project.short_description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(project.technologies || []).slice(0, 6).map((tech) => (
                    <span key={tech} className="badge-teal">{tech}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                      <FaGithub size={16} /> GitHub
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/projects" className="btn btn-outline">View All Projects</Link>
        </div>
      </div>
    </section>
  );
}
