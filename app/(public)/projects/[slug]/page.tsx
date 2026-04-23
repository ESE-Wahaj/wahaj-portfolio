'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Project = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description?: string;
  technologies?: string[];
  status?: 'in_progress' | 'completed' | 'archived';
  github_url?: string;
  live_url?: string;
  thumbnail_url?: string;
  screenshots?: string[];
};

function statusLabel(status?: string) {
  if (status === 'completed') return 'Completed';
  if (status === 'archived') return 'Archived';
  return 'In Progress';
}

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const project = useMemo(() => projects.find((p) => p.slug === params.slug), [projects, params.slug]);
  const relatedProjects = useMemo(() => projects.filter((p) => p.slug !== params.slug).slice(0, 3), [projects, params.slug]);

  if (loading) {
    return <section style={{ minHeight: '100vh', background: 'var(--bg-800)', color: 'var(--text-300)', padding: '7rem 1.5rem' }}>Loading project...</section>;
  }

  if (!project) {
    return (
      <section style={{ minHeight: '100vh', background: 'var(--bg-800)', color: 'var(--text-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>Project Not Found</h1>
          <Link href="/projects" className="btn btn-primary">Back to Projects</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ minHeight: '100vh', background: 'var(--bg-800)', color: 'var(--text-100)', padding: '7rem 0 4rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-400)', fontSize: '0.9rem' }}>
          <Link href="/" style={{ color: 'var(--text-400)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/projects" style={{ color: 'var(--text-400)', textDecoration: 'none' }}>Projects</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-100)' }}>{project.title}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '2.3rem', fontFamily: 'var(--font-heading)' }}>{project.title}</h1>
            <span className={project.status === 'completed' ? 'badge-teal' : 'badge-gold'}>{statusLabel(project.status)}</span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1.2rem' }}>
            <Image src={project.thumbnail_url || '/images/project-placeholder.png'} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>

          <p style={{ color: 'var(--text-200)', lineHeight: 1.8 }}>{project.long_description || project.short_description}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {(project.technologies || []).map((tech) => (
              <span key={tech} className="badge badge-teal">{tech}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>}
            {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-teal">Live Demo</a>}
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.2rem' }}>Screenshots</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
              }}>
                {project.screenshots.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      aspectRatio: '9/16',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {relatedProjects.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>More Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
              {relatedProjects.map((item) => (
                <Link key={item.id} href={`/projects/${item.slug}`} className="card" style={{ textDecoration: 'none', padding: '1rem' }}>
                  <p style={{ margin: 0, color: 'var(--text-100)', fontWeight: 600 }}>{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
