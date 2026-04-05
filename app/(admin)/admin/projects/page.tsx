'use client';

import { useState, FormEvent, useEffect } from 'react';
import {
  Plus,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  github_url?: string;
  live_url?: string;
  thumbnail_url?: string;
  technologies?: string[];
  status?: 'in_progress' | 'completed' | 'archived';
  is_featured?: boolean;
}

interface ProjectForm {
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  github_url: string;
  live_url: string;
  technologies: string;
  status: 'in_progress' | 'completed' | 'archived';
  is_featured: boolean;
  thumbnail_url: string;
}

const emptyForm: ProjectForm = {
  title: '',
  slug: '',
  short_description: '',
  long_description: '',
  github_url: '',
  live_url: '',
  technologies: '',
  status: 'in_progress',
  is_featured: false,
  thumbnail_url: '',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function AdminProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (!res.ok) {
          const payload = await res.json().catch(() => null);
          throw new Error(payload?.error || 'Failed to load projects');
        }

        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load projects');
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusLabel = (status: ProjectRow['status']) => {
    if (status === 'completed') return 'Completed';
    if (status === 'archived') return 'Archived';
    return 'In Progress';
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }));
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (project: ProjectRow) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      slug: project.slug || '',
      short_description: project.short_description || '',
      long_description: project.long_description || '',
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      technologies: (project.technologies || []).join(', '),
      status: project.status || 'in_progress',
      is_featured: Boolean(project.is_featured),
      thumbnail_url: project.thumbnail_url || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to delete project');
      }

      setProjects((prev) => prev.filter((item) => item.id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete project');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEditing = Boolean(editingId);
      const res = await fetch(isEditing ? `/api/projects/${editingId}` : '/api/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to create project');
      }

      const savedProject = await res.json();
      setProjects((prev) => {
        if (isEditing) {
          return prev.map((item) => (item.id === savedProject.id ? savedProject : item));
        }

        return [savedProject, ...prev];
      });

      toast.success(isEditing ? 'Project updated!' : 'Project created!');
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Projects</h2>
        <button
          onClick={openCreateForm}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          Add New Project
        </button>
      </div>

      {/* Data table */}
      <div
        style={{
          backgroundColor: 'var(--bg-700)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Title</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Status</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Featured</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Technologies</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-300)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsLoading && (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>
                    Loading projects...
                  </td>
                </tr>
              )}

              {!projectsLoading && projects.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-300)' }}>
                    No projects yet. Add your first project.
                  </td>
                </tr>
              )}

              {!projectsLoading && projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text-100)', fontWeight: 500 }}>{project.title}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>{getStatusLabel(project.status)}</td>
                  <td style={{ padding: '12px 24px', color: project.is_featured ? 'var(--teal)' : 'var(--text-300)' }}>
                    {project.is_featured ? 'Yes' : 'No'}
                  </td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-300)' }}>
                    {(project.technologies || []).slice(0, 3).join(', ') || '-'}
                  </td>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => openEditForm(project)}>
                        Edit
                      </button>
                      <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleDelete(project.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dialog */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-700)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '640px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>
                {editingId ? 'Edit Project' : 'New Project'}
              </h3>
              <button
                onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }}
                style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}
              >
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Short Description</label>
                <input type="text" value={form.short_description} onChange={(e) => setForm((prev) => ({ ...prev, short_description: e.target.value }))} className="input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Long Description</label>
                <textarea rows={4} value={form.long_description} onChange={(e) => setForm((prev) => ({ ...prev, long_description: e.target.value }))} className="input" style={{ resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>GitHub URL</label>
                  <input type="url" value={form.github_url} onChange={(e) => setForm((prev) => ({ ...prev, github_url: e.target.value }))} className="input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Live URL</label>
                  <input type="url" value={form.live_url} onChange={(e) => setForm((prev) => ({ ...prev, live_url: e.target.value }))} className="input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Technologies (comma-separated)</label>
                <input type="text" value={form.technologies} onChange={(e) => setForm((prev) => ({ ...prev, technologies: e.target.value }))} placeholder="React, TypeScript, Tailwind CSS" className="input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Thumbnail URL</label>
                <input type="url" value={form.thumbnail_url} onChange={(e) => setForm((prev) => ({ ...prev, thumbnail_url: e.target.value }))} className="input" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProjectForm['status'] }))} className="input">
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '4px' }}>
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm((prev) => ({ ...prev, is_featured: e.target.checked }))}
                    style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--text-200)' }}>Featured</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null); }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Saving...' : editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
