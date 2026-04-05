'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Save, Globe, Mail, Server, Key, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsForm {
  site_title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string;
  smtp_host: string;
  smtp_port: string;
  smtp_user: string;
  smtp_pass: string;
  openai_api_key: string;
  maintenance_mode: boolean;
}

const defaultSettings: SettingsForm = {
  site_title: '',
  tagline: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  github_url: '',
  linkedin_url: '',
  instagram_url: '',
  smtp_host: '',
  smtp_port: '',
  smtp_user: '',
  smtp_pass: '',
  openai_api_key: '',
  maintenance_mode: false,
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-700)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-200)',
  marginBottom: '4px',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load settings');

        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          site_title: data.site_title || prev.site_title,
          tagline: data.tagline || data.site_tagline || prev.tagline,
          bio: data.bio || prev.bio,
          email: data.email || data.site_email || prev.email,
          phone: data.phone || data.site_phone || prev.phone,
          location: data.location || data.site_location || prev.location,
          github_url: data.github_url || prev.github_url,
          linkedin_url: data.linkedin_url || prev.linkedin_url,
          instagram_url: data.instagram_url || prev.instagram_url,
          smtp_host: data.smtp_host || prev.smtp_host,
          smtp_port: data.smtp_port || prev.smtp_port,
          smtp_user: data.smtp_user || prev.smtp_user,
          smtp_pass: data.smtp_pass || prev.smtp_pass,
          openai_api_key: data.openai_api_key || prev.openai_api_key,
          maintenance_mode: data.maintenance_mode === 'true' || data.maintenance_mode === true,
        }));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load settings');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      toast.success('Settings saved!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Settings</h2>

      {initialLoading && (
        <p style={{ color: 'var(--text-300)', margin: 0 }}>Loading saved settings...</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* General */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Globe size={18} style={{ color: 'var(--coral)' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>General</h3>
          </div>

          <div>
            <label style={labelStyle}>Site Title</label>
            <input type="text" value={form.site_title} onChange={(e) => setForm((prev) => ({ ...prev, site_title: e.target.value }))} placeholder="Wahaj Noor" className="input" />
          </div>

          <div>
            <label style={labelStyle}>Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm((prev) => ({ ...prev, tagline: e.target.value }))} placeholder="Full-Stack Developer & Designer" className="input" />
          </div>

          <div>
            <label style={labelStyle}>Bio</label>
            <textarea rows={3} value={form.bio} onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))} className="input" style={{ resize: 'vertical' }} />
          </div>
        </div>

        {/* Contact Info */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Mail size={18} style={{ color: 'var(--coral)' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Contact Info</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="input" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="text" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="input" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Location</label>
            <input type="text" value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} placeholder="City, Country" className="input" />
          </div>
        </div>

        {/* Social Links */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Globe size={18} style={{ color: 'var(--coral)' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Social Links</h3>
          </div>

          <div>
            <label style={labelStyle}>GitHub URL</label>
            <input type="url" value={form.github_url} onChange={(e) => setForm((prev) => ({ ...prev, github_url: e.target.value }))} placeholder="https://github.com/username" className="input" />
          </div>

          <div>
            <label style={labelStyle}>LinkedIn URL</label>
            <input type="url" value={form.linkedin_url} onChange={(e) => setForm((prev) => ({ ...prev, linkedin_url: e.target.value }))} placeholder="https://linkedin.com/in/username" className="input" />
          </div>

          <div>
            <label style={labelStyle}>Instagram URL</label>
            <input type="url" value={form.instagram_url} onChange={(e) => setForm((prev) => ({ ...prev, instagram_url: e.target.value }))} placeholder="https://instagram.com/username" className="input" />
          </div>
        </div>

        {/* SMTP Settings */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Server size={18} style={{ color: 'var(--coral)' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>SMTP Settings</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Host</label>
              <input type="text" value={form.smtp_host} onChange={(e) => setForm((prev) => ({ ...prev, smtp_host: e.target.value }))} placeholder="smtp.example.com" className="input" />
            </div>
            <div>
              <label style={labelStyle}>Port</label>
              <input type="text" value={form.smtp_port} onChange={(e) => setForm((prev) => ({ ...prev, smtp_port: e.target.value }))} placeholder="587" className="input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Username</label>
              <input type="text" value={form.smtp_user} onChange={(e) => setForm((prev) => ({ ...prev, smtp_user: e.target.value }))} className="input" />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" value={form.smtp_pass} onChange={(e) => setForm((prev) => ({ ...prev, smtp_pass: e.target.value }))} className="input" />
            </div>
          </div>
        </div>

        {/* API Keys & Maintenance */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Key size={18} style={{ color: 'var(--coral)' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>API Keys</h3>
          </div>

          <div>
            <label style={labelStyle}>OpenAI API Key</label>
            <input type="password" value={form.openai_api_key} onChange={(e) => setForm((prev) => ({ ...prev, openai_api_key: e.target.value }))} placeholder="sk-..." className="input" />
          </div>

          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
            <div style={sectionHeaderStyle}>
              <Shield size={18} style={{ color: 'var(--coral)' }} />
              <h3 style={{ fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Maintenance</h3>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.maintenance_mode}
                onChange={(e) => setForm((prev) => ({ ...prev, maintenance_mode: e.target.checked }))}
                style={{ accentColor: 'var(--coral)', width: '16px', height: '16px' }}
              />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-200)' }}>
                  Maintenance Mode
                </span>
                <p style={{ fontSize: '12px', color: 'var(--text-300)', margin: 0 }}>
                  When enabled, the public site will show a maintenance page
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: loading ? 0.6 : 1 }}
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
