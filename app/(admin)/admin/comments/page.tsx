'use client';

import { useState, useEffect } from 'react';
import {
  MessageCircle,
  Check,
  Flag,
  Trash2,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

type PostTypeFilter = 'all' | 'blog' | 'project' | 'post';

interface AdminComment {
  id: string;
  author_name?: string;
  post_type: string;
  content: string;
  created_at: string;
  is_approved: boolean;
  is_flagged: boolean;
}

export default function AdminCommentsPage() {
  const [filter, setFilter] = useState<PostTypeFilter>('all');
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comments?admin=1', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load comments');
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const visibleComments = comments.filter((item) => filter === 'all' || item.post_type === filter);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved: true, is_flagged: false }),
      });
      if (!res.ok) throw new Error();
      setComments((prev) => prev.map((item) => (item.id === id ? { ...item, is_approved: true, is_flagged: false } : item)));
      toast.success('Comment approved');
    } catch {
      toast.error('Failed to approve comment');
    }
  };

  const handleFlag = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_flagged: true, is_approved: false }),
      });
      if (!res.ok) throw new Error();
      setComments((prev) => prev.map((item) => (item.id === id ? { ...item, is_flagged: true, is_approved: false } : item)));
      toast.success('Comment flagged');
    } catch {
      toast.error('Failed to flag comment');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setComments((prev) => prev.filter((item) => item.id !== id));
      toast.success('Comment deleted');
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Comments</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-300)' }} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as PostTypeFilter)}
            className="input"
            style={{ width: 'auto', padding: '8px 12px' }}
          >
            <option value="all">All Types</option>
            <option value="blog">Blog</option>
            <option value="project">Project</option>
            <option value="post">Post</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Author</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Post Type</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Content</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Date</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Status</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', color: 'var(--text-300)' }}>Loading comments...</td>
                </tr>
              )}

              {!loading && visibleComments.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>
                    <MessageCircle size={32} style={{ display: 'inline-block', marginBottom: '8px', opacity: 0.4 }} />
                    <br />
                    No comments found.
                  </td>
                </tr>
              )}

              {!loading && visibleComments.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text-100)' }}>{item.author_name || 'Anonymous'}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span className="badge-teal">{item.post_type}</span>
                  </td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-200)', maxWidth: '300px' }}>{item.content}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span className={item.is_approved ? 'badge-teal' : item.is_flagged ? 'badge-coral' : 'badge-gold'}>
                      {item.is_approved ? 'Approved' : item.is_flagged ? 'Flagged' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => handleApprove(item.id)} title="Approve" style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--teal)' }}>
                        <Check size={16} />
                      </button>
                      <button onClick={() => handleFlag(item.id)} title="Flag" style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--gold)' }}>
                        <Flag size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} title="Delete" style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--coral)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
