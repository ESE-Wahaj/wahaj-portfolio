'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Briefcase,
  Image,
  Tag,
  MessageCircle,
  Mail,
  Settings,
  ArrowLeft,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Posts', href: '/admin/posts', icon: MessageSquare },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Comments', href: '/admin/comments', icon: MessageCircle },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          height: '100%',
          width: '260px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-900)',
          borderRight: '1px solid var(--border)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--coral), var(--gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            WN
          </div>
          <span
            style={{
              color: 'var(--text-100)',
              fontWeight: 600,
              fontSize: '18px',
              letterSpacing: '-0.02em',
            }}
          >
            WN Admin
          </span>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`admin-nav-item${active ? ' active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  backgroundColor: active ? 'rgba(255,107,107,0.12)' : 'transparent',
                  color: active ? 'var(--coral)' : 'var(--text-300)',
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div
          style={{
            padding: '16px 12px 20px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Link
            href="/"
            className="admin-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              color: 'var(--text-300)',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
