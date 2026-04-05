'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Eye, Users } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({ projects: 0, blog: 0, posts: 0, messages: 0 });

  useEffect(() => {
    const load = async () => {
      const [projectsRes, blogRes, postsRes, messagesRes] = await Promise.all([
        fetch('/api/projects', { cache: 'no-store' }),
        fetch('/api/blog?admin=1', { cache: 'no-store' }),
        fetch('/api/posts?admin=1', { cache: 'no-store' }),
        fetch('/api/messages', { cache: 'no-store' }),
      ]);

      const [projects, blog, posts, messages] = await Promise.all([
        projectsRes.ok ? projectsRes.json() : [],
        blogRes.ok ? blogRes.json() : [],
        postsRes.ok ? postsRes.json() : [],
        messagesRes.ok ? messagesRes.json() : [],
      ]);

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        blog: Array.isArray(blog) ? blog.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
      });
    };

    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Analytics</h2>

      {/* Coming soon */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: 'var(--text-300)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255,107,107,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <BarChart3 size={28} style={{ color: 'var(--coral)' }} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', marginBottom: '4px', margin: 0 }}>
            Analytics Coming Soon
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-300)', textAlign: 'center', maxWidth: '420px', marginTop: '8px' }}>
            We are working on bringing you detailed analytics about your
            portfolio visitors, page views, and engagement metrics.
          </p>
        </div>
      </div>

      {/* Chart placeholder cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Projects', icon: Eye, value: String(stats.projects) },
          { label: 'Blog Posts', icon: Users, value: String(stats.blog) },
          { label: 'Social Posts', icon: TrendingUp, value: String(stats.posts) },
          { label: 'Messages', icon: BarChart3, value: String(stats.messages) },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              style={{
                backgroundColor: 'var(--bg-700)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={18} style={{ color: 'var(--text-300)' }} />
              </div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-300)', margin: 0 }}>{item.value}</p>
                <p style={{ fontSize: '14px', color: 'var(--text-300)', margin: 0 }}>{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart placeholder */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-300)', marginBottom: '16px', margin: 0 }}>
          Visitor Trend (Last 30 days)
        </h3>
        <div style={{
          height: '192px',
          backgroundColor: 'var(--bg-800)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed var(--border)',
          marginTop: '16px',
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-300)', margin: 0 }}>Chart will render here</p>
        </div>
      </div>
    </div>
  );
}
