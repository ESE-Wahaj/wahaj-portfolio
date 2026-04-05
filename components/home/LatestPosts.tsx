'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  published_at?: string;
};

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/blog', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data.slice(0, 3));
      }
    };

    fetchPosts();
  }, []);

  return (
    <section style={{ background: 'var(--bg-900)', padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <span className="section-label">LATEST</span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-100)', marginBottom: '1rem' }}>
          Recent <span className="gradient-text-coral">Updates</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {posts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%', padding: '1.5rem', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span className="badge-coral">Blog</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-400)' }}>
                      <Calendar size={12} />
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-100)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-200)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{post.excerpt || 'Read this article to learn more.'}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/blog" className="btn btn-outline">View All Posts</Link>
        </div>
      </div>
    </section>
  );
}
