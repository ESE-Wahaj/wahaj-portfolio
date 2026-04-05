'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  published_at?: string;
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setPost(data.find((item) => item.slug === params.slug) || null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <section style={{ minHeight: '100vh', padding: '7rem 1.5rem', background: 'var(--bg-800)', color: 'var(--text-300)' }}>Loading post...</section>;
  }

  if (!post) {
    return (
      <section style={{ minHeight: '100vh', padding: '7rem 1.5rem', background: 'var(--bg-800)', color: 'var(--text-100)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem' }}>Post Not Found</h1>
          <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ minHeight: '100vh', background: 'var(--bg-800)', color: 'var(--text-100)', padding: '7rem 0' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <Link href="/blog" className="btn btn-outline" style={{ marginBottom: '1.5rem' }}>Back</Link>
        <h1 style={{ fontSize: '2.3rem', margin: '0 0 1rem', fontFamily: 'var(--font-heading)' }}>{post.title}</h1>
        <p style={{ color: 'var(--text-300)', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{post.content}</p>
      </div>
    </section>
  );
}
