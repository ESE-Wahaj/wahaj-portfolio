'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/blog': 'Blog Posts',
  '/admin/posts': 'Social Posts',
  '/admin/experience': 'Experience',
  '/admin/gallery': 'Gallery',
  '/admin/categories': 'Categories',
  '/admin/comments': 'Comments',
  '/admin/messages': 'Messages',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
};

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const title = pageTitles[pathname] || 'Admin';

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out');
      router.replace('/admin/login');
      router.refresh();
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 24px',
        backgroundColor: 'var(--bg-800)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Left: hamburger + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onMenuToggle}
          className="admin-menu-btn"
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            color: 'var(--text-300)',
            transition: 'background 0.2s',
          }}
        >
          <Menu size={20} />
        </button>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-100)',
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right: avatar + sign out */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--coral), var(--gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          WN
        </div>
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'var(--text-300)',
            cursor: 'pointer',
            transition: 'color 0.2s, background 0.2s',
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
