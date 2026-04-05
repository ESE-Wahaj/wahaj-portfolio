'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Mail,
  Plus,
  Upload,
  Activity,
} from 'lucide-react';

const quickActions = [
  { label: 'New Project', href: '/admin/projects', icon: Plus },
  { label: 'New Blog Post', href: '/admin/blog', icon: Plus },
  { label: 'New Post', href: '/admin/posts', icon: Plus },
  { label: 'Upload Image', href: '/admin/gallery', icon: Upload },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { label: 'Total Projects', icon: FolderKanban, value: '0', color: 'var(--coral)' },
    { label: 'Blog Posts', icon: FileText, value: '0', color: 'var(--gold)' },
    { label: 'Social Posts', icon: MessageSquare, value: '0', color: 'var(--teal)' },
    { label: 'Messages', icon: Mail, value: '0', color: '#a78bfa' },
  ]);

  useEffect(() => {
    const loadStats = async () => {
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

      setStats([
        { label: 'Total Projects', icon: FolderKanban, value: String(Array.isArray(projects) ? projects.length : 0), color: 'var(--coral)' },
        { label: 'Blog Posts', icon: FileText, value: String(Array.isArray(blog) ? blog.length : 0), color: 'var(--gold)' },
        { label: 'Social Posts', icon: MessageSquare, value: String(Array.isArray(posts) ? posts.length : 0), color: 'var(--teal)' },
        { label: 'Messages', icon: Mail, value: String(Array.isArray(messages) ? messages.length : 0), color: '#a78bfa' },
      ]);
    };

    loadStats();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: 'var(--bg-700)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderLeft: `3px solid ${stat.color}`,
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${stat.color}15`,
                }}
              >
                <Icon size={22} style={{ color: stat.color }} />
              </div>
              <div>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-100)', margin: 0 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-300)', margin: 0 }}>
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-300)', marginTop: '-16px' }}>Live data from Supabase</p>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
          }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="btn btn-outline"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px',
                  textDecoration: 'none',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,107,107,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--coral)' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-200)' }}>
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', marginBottom: '16px' }}>
          Recent Activity
        </h2>
        <div
          style={{
            backgroundColor: 'var(--bg-700)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 0',
              color: 'var(--text-300)',
            }}
          >
            <Activity size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No recent activity</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>
              Activity will appear here once Supabase is connected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
