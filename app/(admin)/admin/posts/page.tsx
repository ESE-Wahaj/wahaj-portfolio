'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

interface PostRecord {
  id: string;
  content: string;
  post_type: 'text' | 'image' | 'carousel' | 'gif';
  tags?: string[];
  pinned: boolean;
  is_published: boolean;
}

interface PostForm {
  content: string;
  post_type: 'text' | 'image' | 'carousel' | 'gif';
  tags: string;
  pinned: boolean;
  is_published: boolean;
}

const emptyForm: PostForm = {
  content: '',
  post_type: 'text',
  tags: '',
  pinned: false,
  is_published: true,
};

export default function AdminPostsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?admin=1', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load posts');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load posts');
      } finally {
        setListLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post: PostRecord) => {
    setEditingId(post.id);
    setForm({
      content: post.content || '',
      post_type: post.post_type || 'text',
      tags: (post.tags || []).join(', '),
      pinned: Boolean(post.pinned),
      is_published: Boolean(post.is_published),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prev) => prev.filter((item) => item.id !== id));
      toast.success('Post deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEditing = Boolean(editingId);
      const res = await fetch(isEditing ? `/api/posts/${editingId}` : '/api/posts', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to save post');
      }

      const saved = await res.json();
      setPosts((prev) => (isEditing ? prev.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...prev]));
      toast.success(isEditing ? 'Post updated!' : 'Post created!');
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Social Posts</h2>
        <button onClick={openCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} />
          New Post
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        {listLoading ? (
          <p style={{ color: 'var(--text-300)', margin: 0 }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: 'var(--text-300)' }}>
            <MessageSquare size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No posts yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {posts.map((post) => (
              <div key={post.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
                <p style={{ color: 'var(--text-100)', margin: '0 0 8px', whiteSpace: 'pre-wrap' }}>{post.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '8px', color: 'var(--text-300)', fontSize: '12px' }}>
                    <span>{post.post_type}</span>
                    <span>{post.is_published ? 'Published' : 'Draft'}</span>
                    <span>{post.pinned ? 'Pinned' : 'Not pinned'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => openEdit(post)}>Edit</button>
                    <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>{editingId ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Content</label>
                <textarea rows={5} required value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} placeholder="What's on your mind?" className="input" style={{ resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Post Type</label>
                <select value={form.post_type} onChange={(e) => setForm((prev) => ({ ...prev, post_type: e.target.value as PostForm['post_type'] }))} className="input">
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="carousel">Carousel</option>
                  <option value="gif">Gif</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} placeholder="dev, coding, life" className="input" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.pinned} onChange={(e) => setForm((prev) => ({ ...prev, pinned: e.target.checked }))} style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Pinned</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))} style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Published</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
