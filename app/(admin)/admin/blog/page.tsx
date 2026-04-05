'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Plus, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogForm {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  tags: string;
  is_published: boolean;
  is_featured: boolean;
}

const emptyForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: '',
  tags: '',
  is_published: false,
  is_featured: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function AdminBlogPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogForm[]>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog?admin=1', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load blog posts');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load blog posts');
      } finally {
        setListLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post: BlogForm) => {
    setEditingId(post.id || null);
    setForm({
      id: post.id,
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image_url: post.cover_image_url || '',
      tags: Array.isArray(post.tags) ? (post.tags as unknown as string[]).join(', ') : (post.tags as unknown as string) || '',
      is_published: Boolean(post.is_published),
      is_featured: Boolean(post.is_featured),
    });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog post');
      setPosts((prev) => prev.filter((item) => item.id !== id));
      toast.success('Blog post deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog post');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEditing = Boolean(editingId);
      const res = await fetch(isEditing ? `/api/blog/${editingId}` : '/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error('Failed to save blog post');

      const saved = await res.json();
      setPosts((prev) => (isEditing ? prev.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...prev]));
      toast.success(isEditing ? 'Blog post updated!' : 'Blog post created!');
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch {
      toast.error('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Blog Posts</h2>
        <button onClick={openCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} />
          New Blog Post
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Title</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Status</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Featured</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Tags</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listLoading && (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>Loading posts...</td>
                </tr>
              )}

              {!listLoading && posts.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>
                    <FileText size={32} style={{ display: 'inline-block', marginBottom: '8px', opacity: 0.4 }} />
                    <br />
                    No blog posts found
                  </td>
                </tr>
              )}

              {!listLoading && posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text-100)' }}>{post.title}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{post.is_published ? 'Published' : 'Draft'}</td>
                  <td style={{ padding: '12px 24px', color: post.is_featured ? 'var(--teal)' : 'var(--text-300)' }}>{post.is_featured ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{Array.isArray(post.tags) ? (post.tags as unknown as string[]).slice(0, 2).join(', ') : '-'}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => openEdit(post)}>Edit</button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Form Dialog */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>{editingId ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Title</label>
                  <input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} className="input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Excerpt</label>
                <input type="text" value={form.excerpt} onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))} className="input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Content</label>
                <textarea rows={8} value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} placeholder="Write your blog post content here..." className="input" style={{ resize: 'vertical' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-300)', marginTop: '4px' }}>Tiptap rich text editor coming soon</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Cover Image URL</label>
                <input type="url" value={form.cover_image_url} onChange={(e) => setForm((prev) => ({ ...prev, cover_image_url: e.target.value }))} className="input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} placeholder="React, Next.js, Tutorial" className="input" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))} style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Published</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((prev) => ({ ...prev, is_featured: e.target.checked }))} style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Featured</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Saving...' : editingId ? 'Update Post' : 'Save Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
