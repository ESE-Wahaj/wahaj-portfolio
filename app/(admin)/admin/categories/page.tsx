'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryForm {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  type: string;
  description: string;
}

const emptyForm: CategoryForm = {
  name: '',
  slug: '',
  icon: '',
  color: '#FF6B6B',
  type: 'project',
  description: '',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function AdminCategoriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryForm[]>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load categories');
      } finally {
        setListLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNameChange = (value: string) => {
    setForm((prev) => ({ ...prev, name: value, slug: slugify(value) }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (category: CategoryForm) => {
    setEditingId(category.id || null);
    setForm({
      id: category.id,
      name: category.name || '',
      slug: category.slug || '',
      icon: category.icon || '',
      color: category.color || '#FF6B6B',
      type: category.type || 'project',
      description: category.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this category?')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');
      setCategories((prev) => prev.filter((item) => item.id !== id));
      toast.success('Category deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete category');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEditing = Boolean(editingId);
      const res = await fetch(isEditing ? `/api/categories/${editingId}` : '/api/categories', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save category');

      const saved = await res.json();
      setCategories((prev) => (isEditing ? prev.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...prev]));
      toast.success(isEditing ? 'Category updated!' : 'Category created!');
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch {
      toast.error('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Categories</h2>
        <button onClick={openCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Name</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Slug</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Icon</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Color</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Type</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listLoading && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>Loading categories...</td>
                </tr>
              )}

              {!listLoading && categories.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>
                    <Tag size={32} style={{ display: 'inline-block', marginBottom: '8px', opacity: 0.4 }} />
                    <br />
                    No categories found
                  </td>
                </tr>
              )}

              {!listLoading && categories.map((category) => (
                <tr key={category.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text-100)' }}>{category.name}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{category.slug}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{category.icon || '-'}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span style={{ display: 'inline-flex', width: '16px', height: '16px', borderRadius: '999px', backgroundColor: category.color || '#FF6B6B', border: '1px solid var(--border)' }} />
                  </td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{category.type}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => openEdit(category)}>Edit</button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(category.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Dialog */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>{editingId ? 'Edit Category' : 'New Category'}</h3>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Name</label>
                  <input type="text" required value={form.name} onChange={(e) => handleNameChange(e.target.value)} className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} className="input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Icon</label>
                  <input type="text" value={form.icon} onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))} placeholder="e.g. code, palette, globe" className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Color</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="text" value={form.color} onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))} placeholder="#FF6B6B" className="input" style={{ flex: 1 }} />
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', flexShrink: 0, backgroundColor: form.color }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Type</label>
                <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} className="input">
                  <option value="project">Project</option>
                  <option value="blog">Blog</option>
                  <option value="gallery">Gallery</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="input" style={{ resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Saving...' : editingId ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
