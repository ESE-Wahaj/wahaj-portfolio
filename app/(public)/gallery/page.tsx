'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type GalleryItem = {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(14, 10, 8, 0.88), rgba(14, 10, 8, 0.92)), url('/images/gallery-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
        padding: '6rem 0',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <div className="section-label">GALLERY</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>Photo Gallery</h2>
        </motion.div>

        {loading ? (
          <p style={{ color: 'var(--text-300)' }}>Loading gallery...</p>
        ) : items.length === 0 ? (
          <p style={{ color: 'var(--text-300)' }}>No gallery images yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.id} className="card" style={{ padding: '0.5rem' }}>
                <Image src={item.image_url} alt={item.title || 'Gallery image'} width={400} height={180} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ padding: '8px 4px 4px' }}>
                  <p style={{ margin: 0, color: 'var(--text-100)', fontSize: '14px', fontWeight: 600 }}>{item.title || 'Untitled'}</p>
                  {item.description && <p style={{ margin: '4px 0 0', color: 'var(--text-300)', fontSize: '12px' }}>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
