'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-800)' }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area offset by sidebar width on desktop */}
      <div
        className="admin-main"
        style={{
          marginLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AdminHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        <main
          className="admin-content"
          style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: 'var(--bg-800)',
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .admin-main {
            margin-left: 0 !important;
          }
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 1024px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
