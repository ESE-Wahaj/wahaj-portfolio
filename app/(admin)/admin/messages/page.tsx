'use client';

import { useState, useEffect } from 'react';
import { Mail, MailOpen, Circle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load messages');
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: true }),
      });
      if (!res.ok) throw new Error();
      setMessages((prev) => prev.map((item) => (item.id === id ? { ...item, is_read: true } : item)));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setMessages((prev) => prev.filter((item) => item.id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-100)', margin: 0 }}>Messages</h2>
        <span style={{ fontSize: '14px', color: 'var(--text-300)' }}>
          {messages.filter((m) => !m.is_read).length} unread
        </span>
      </div>

      {/* Inbox list */}
      <div style={{ backgroundColor: 'var(--bg-700)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '32px', color: 'var(--text-300)' }}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: 'var(--text-300)' }}>
            <Mail size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No messages yet</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Messages from your contact form will appear here</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => toggleExpand(msg.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 24px',
                  border: 'none',
                  backgroundColor: !msg.is_read ? 'rgba(255,107,107,0.03)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Read indicator */}
                  <div style={{ flexShrink: 0 }}>
                    {msg.is_read ? (
                      <MailOpen size={18} style={{ color: 'var(--text-300)' }} />
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ color: 'var(--coral)' }} />
                        <Circle
                          size={8}
                          fill="var(--coral)"
                          style={{ position: 'absolute', top: '-2px', right: '-2px', color: 'var(--coral)' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                      <p style={{
                        fontSize: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        margin: 0,
                        fontWeight: !msg.is_read ? 600 : 500,
                        color: !msg.is_read ? 'var(--text-100)' : 'var(--text-200)',
                      }}>
                        {msg.name}
                      </p>
                      <span style={{ fontSize: '12px', color: 'var(--text-300)', flexShrink: 0 }}>
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-300)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      {msg.email}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginTop: '2px',
                      margin: 0,
                      color: !msg.is_read ? 'var(--text-200)' : 'var(--text-300)',
                    }}>
                      {msg.subject || 'General Inquiry'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Expanded message */}
              {expandedId === msg.id && (
                <div style={{ padding: '0 24px 16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ backgroundColor: 'var(--bg-800)', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-100)', margin: 0 }}>
                          {msg.name}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-300)', margin: 0 }}>{msg.email}</p>
                      </div>
                      {!msg.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="btn btn-primary"
                          style={{ padding: '4px 12px', fontSize: '12px' }}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-200)', marginBottom: '8px', margin: 0 }}>
                      {msg.subject || 'General Inquiry'}
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--text-200)', whiteSpace: 'pre-wrap', margin: 0, marginTop: '8px' }}>
                      {msg.message}
                    </p>
                    <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => handleDelete(msg.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
