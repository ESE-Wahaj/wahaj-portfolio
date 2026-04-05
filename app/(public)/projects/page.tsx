'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PublicProject {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  technologies?: string[];
  status?: 'in_progress' | 'completed' | 'archived';
  is_featured?: boolean;
  github_url?: string;
  live_url?: string;
  thumbnail_url?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = useMemo(() => {
    return ['All'];
  }, []);

  const getStatusLabel = (status: PublicProject['status']) => {
    if (status === 'completed') return 'Completed';
    if (status === 'archived') return 'Archived';
    return 'In Progress';
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeFilter === 'All';
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.short_description.toLowerCase().includes(search.toLowerCase()) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeFilter, search]);

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(14, 10, 8, 0.88), rgba(14, 10, 8, 0.92)), url('/images/projects-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
        padding: '6rem 0',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">PROJECTS</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>
            My <span className="gradient-text-coral">Work</span>
          </h2>
        </motion.div>

        {/* Search & Filters */}
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ borderRadius: '9999px' }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeFilter === filter ? 'var(--coral)' : 'transparent',
                  color: activeFilter === filter ? '#fff' : 'var(--text-300)',
                  border:
                    activeFilter === filter
                      ? '1px solid var(--coral)'
                      : '1px solid var(--border-warm)',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filtered.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                    <Image
                      src={project.thumbnail_url || '/images/project-placeholder.png'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    {/* Status & Featured */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span
                          className={`badge ${
                            project.status === 'completed' ? 'badge-teal' : 'badge-gold'
                          }`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                        {project.is_featured && (
                          <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            &#9733; Featured
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-400)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        Project
                      </span>
                    </div>

                    {/* Title & Description */}
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--text-100)',
                          fontFamily: 'var(--font-heading)',
                          transition: 'color 0.2s',
                        }}
                      >
                        {project.title}
                      </h3>
                    </Link>
                    <p style={{ color: 'var(--text-300)', fontSize: '0.875rem', flex: 1 }}>
                      {project.short_description}
                    </p>

                    {/* Technologies */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {(project.technologies || []).map((tech) => (
                        <span key={tech} className="badge badge-teal">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                        >
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-teal"
                          style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: 'var(--text-400)', fontSize: '1rem' }}>Loading projects...</p>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--text-400)', fontSize: '1.125rem' }}>
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
