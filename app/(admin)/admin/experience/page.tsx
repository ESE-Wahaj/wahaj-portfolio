'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Plus, X, Briefcase, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExperienceForm {
  id?: string;
  company: string;
  role: string;
  company_url: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  type: string;
  description: string[];
  technologies: string;
}

const emptyForm: ExperienceForm = {
  company: '',
  role: '',
  company_url: '',
  start_date: '',
  end_date: '',
  is_current: false,
  type: 'work',
  description: [''],
  technologies: '',
};

export default function AdminExperiencePage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ExperienceForm[]>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/experience', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load experience');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load experience');
      } finally {
        setListLoading(false);
      }
    };

    fetchItems();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item: ExperienceForm) => {
    setEditingId(item.id || null);
    setForm({
      id: item.id,
      company: item.company || '',
      role: item.role || '',
      company_url: item.company_url || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      is_current: Boolean(item.is_current),
      type: item.type || 'work',
      description: item.description?.length ? item.description : [''],
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this experience entry?')) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete experience');
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Experience deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete experience');
    }
  };

  const addBullet = () => {
    setForm((prev) => ({ ...prev, description: [...prev.description, ''] }));
  };

  const removeBullet = (index: number) => {
    setForm((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const updateBullet = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      description: prev.description.map((b, i) => (i === index ? value : b)),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEditing = Boolean(editingId);
      const res = await fetch(isEditing ? `/api/experience/${editingId}` : '/api/experience', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          description: form.description.filter(Boolean),
          technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error('Failed to save experience');

      const saved = await res.json();
      setItems((prev) => (isEditing ? prev.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...prev]));
      toast.success(isEditing ? 'Experience updated!' : 'Experience added!');
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch {
      toast.error('Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Experience</h2>
        <button onClick={openCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {/* Timeline list */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        {listLoading ? (
          <p style={{ color: 'var(--text-300)', margin: 0 }}>Loading experience...</p>
        ) : items.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: 'var(--text-300)' }}>
            <Briefcase size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No experience entries yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ margin: 0, color: 'var(--text-100)', fontWeight: 600 }}>{item.role}</p>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-300)', fontSize: '13px' }}>{item.company}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => openEdit(item)}>Edit</button>
                    <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Form Dialog */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>{editingId ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Company</label>
                  <input type="text" required value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))} className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Role</label>
                  <input type="text" required value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} className="input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Company URL</label>
                <input type="url" value={form.company_url} onChange={(e) => setForm((prev) => ({ ...prev, company_url: e.target.value }))} className="input" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Start Date</label>
                  <input type="date" required value={form.start_date} onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))} className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>End Date</label>
                  <input type="date" value={form.end_date} disabled={form.is_current} onChange={(e) => setForm((prev) => ({ ...prev, end_date: e.target.value }))} className="input" style={{ opacity: form.is_current ? 0.5 : 1 }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.is_current} onChange={(e) => setForm((prev) => ({ ...prev, is_current: e.target.checked, end_date: e.target.checked ? '' : prev.end_date }))} style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Currently here</span>
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Type</label>
                <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} className="input">
                  <option value="work">Work</option>
                  <option value="internship">Internship</option>
                  <option value="education">Education</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="award">Award</option>
                </select>
              </div>

              {/* Dynamic bullet points */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-200)' }}>Description Bullet Points</label>
                  <button type="button" onClick={addBullet} style={{ fontSize: '12px', color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    + Add bullet
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {form.description.map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--text-300)', fontSize: '14px' }}>&#x2022;</span>
                      <input type="text" value={bullet} onChange={(e) => updateBullet(i, e.target.value)} placeholder="Describe what you did..." className="input" style={{ flex: 1 }} />
                      {form.description.length > 1 && (
                        <button type="button" onClick={() => removeBullet(i)} style={{ padding: '4px', color: 'var(--text-300)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Technologies (comma-separated)</label>
                <input type="text" value={form.technologies} onChange={(e) => setForm((prev) => ({ ...prev, technologies: e.target.value }))} placeholder="React, TypeScript, Node.js" className="input" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Saving...' : editingId ? 'Update Experience' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
