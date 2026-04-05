'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Post = {
  id: string;
  content: string;
  tags?: string[];
  created_at?: string;
  likes_count?: number;
  image_url?: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(14, 10, 8, 0.88), rgba(14, 10, 8, 0.92)), url('/images/posts-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
        padding: '6rem 0',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <div className="section-label">POSTS</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>My Feed</h2>
        </motion.div>

        {loading ? (
          <p style={{ color: 'var(--text-300)' }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: 'var(--text-300)' }}>No posts available.</p>
        ) : (
          <div style={{ columns: 2, columnGap: '1.25rem' }}>
            {posts.map((post, idx) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
                <div className="card" style={{ padding: '0.75rem' }}>
                  <div style={{ position: 'relative', width: '100%', height: '160px', marginBottom: '0.8rem', borderRadius: '10px', overflow: 'hidden' }}>
                    <Image
                      src={post.image_url || '/images/post-default.png'}
                      alt="Post image"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p style={{ color: 'var(--text-200)', lineHeight: 1.7, marginBottom: '0.8rem' }}>{post.content}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    {(post.tags || []).slice(0, 5).map((tag) => (
                      <span key={tag} className="badge badge-coral">#{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-400)', fontSize: '12px' }}>
                    <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                    <span>{post.likes_count || 0} likes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          div[style*='columns: 2'] {
            columns: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
