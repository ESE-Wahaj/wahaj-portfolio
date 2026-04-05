'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  published_at?: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load blog posts');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posts.filter((p) => {
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, search]);

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(14, 10, 8, 0.88), rgba(14, 10, 8, 0.92)), url('/images/blog-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
        padding: '6rem 0',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <div className="section-label">BLOG</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>Thoughts & Insights</h2>
        </motion.div>

        <div style={{ marginBottom: '2rem', maxWidth: '28rem' }}>
          <input className="input" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-300)' }}>Loading posts...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-300)' }}>No blog posts found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filtered.map((post) => (
              <article key={post.id} className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-100)', fontSize: '1.1rem', fontWeight: 700 }}>{post.title}</h3>
                <p style={{ color: 'var(--text-300)', fontSize: '0.9rem' }}>{post.excerpt || post.content.slice(0, 140) + '...'}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="badge badge-coral">{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 10px' }}>Read More</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
