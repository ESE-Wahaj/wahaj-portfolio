'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { X, Image as ImageIcon, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface GalleryForm {
  id?: string;
  file: File | null;
  title: string;
  description: string;
  category: string;
}

const emptyForm: GalleryForm = {
  file: null,
  title: '',
  description: '',
  category: '',
};

export default function AdminGalleryPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Array<{ id: string; title?: string; description?: string; image_url: string }>>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load gallery');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load gallery');
      } finally {
        setListLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete image');
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Image deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete image');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.file) {
      toast.error('Please select a file');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload image');
      const saved = await res.json();
      setItems((prev) => [saved, ...prev]);
      toast.success('Image uploaded!');
      setForm(emptyForm);
      setShowForm(false);
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Gallery</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} />
          Upload Images
        </button>
      </div>

      {/* Gallery grid */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        {listLoading ? (
          <p style={{ color: 'var(--text-300)', margin: 0 }}>Loading gallery...</p>
        ) : items.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: 'var(--text-300)' }}>
            <ImageIcon size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No images yet</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Upload images to populate your gallery</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'var(--bg-800)' }}>
                <Image src={item.image_url} alt={item.title || 'Gallery image'} width={300} height={120} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div style={{ padding: '10px' }}>
                  <p style={{ margin: 0, color: 'var(--text-100)', fontSize: '13px', fontWeight: 600 }}>{item.title || 'Untitled'}</p>
                  <button className="btn btn-outline" style={{ marginTop: '8px', padding: '5px 8px', fontSize: '12px' }} onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Form Dialog */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Upload Image</h3>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); }} style={{ padding: '4px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-300)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="input"
                  style={{ padding: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Title</label>
                <input type="text" required value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className="input" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="input" style={{ resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '4px' }}>Category</label>
                <input type="text" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} placeholder="e.g. screenshots, designs, photos" className="input" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); }} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
