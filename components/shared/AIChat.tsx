'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Wahaj's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again!',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm currently offline. Please email contactwahajnaveed@gmail.com instead!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, var(--coral), var(--gold))',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        aria-label="Chat with AI"
      >
        {open ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '1.5rem',
              zIndex: 50,
              width: '360px',
              maxWidth: 'calc(100vw - 48px)',
              height: '480px',
              background: 'var(--bg-700)',
              borderRadius: '1rem',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--coral), var(--gold))',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={16} style={{ color: '#fff' }} />
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                  Ask about Wahaj
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>
                  AI-powered assistant
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '9999px',
                        background: 'rgba(var(--coral-rgb, 255, 107, 107), 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.25rem',
                      }}
                    >
                      <Bot size={14} style={{ color: 'var(--coral)' }} />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      ...(msg.role === 'user'
                        ? {
                            background: 'var(--coral)',
                            color: '#fff',
                            borderBottomRightRadius: '0.25rem',
                          }
                        : {
                            background: 'var(--bg-600, #2a1f0f)',
                            color: 'var(--text-200)',
                            borderBottomLeftRadius: '0.25rem',
                          }),
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '9999px',
                        background: 'rgba(78, 205, 196, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.25rem',
                      }}
                    >
                      <User size={14} style={{ color: 'var(--teal)' }} />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '9999px',
                      background: 'rgba(var(--coral-rgb, 255, 107, 107), 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={14} style={{ color: 'var(--coral)' }} />
                  </div>
                  <div
                    style={{
                      background: 'var(--bg-600, #2a1f0f)',
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      borderBottomLeftRadius: '0.25rem',
                      display: 'flex',
                      gap: '0.25rem',
                    }}
                  >
                    <span
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        background: 'var(--text-300)',
                        borderRadius: '9999px',
                        animation: 'bounce 1s infinite',
                        animationDelay: '0ms',
                      }}
                    />
                    <span
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        background: 'var(--text-300)',
                        borderRadius: '9999px',
                        animation: 'bounce 1s infinite',
                        animationDelay: '150ms',
                      }}
                    />
                    <span
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        background: 'var(--text-300)',
                        borderRadius: '9999px',
                        animation: 'bounce 1s infinite',
                        animationDelay: '300ms',
                      }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '0.75rem',
                borderTop: '1px solid var(--border-warm)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about skills, projects..."
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.75rem',
                    background: 'var(--bg-800)',
                    border: '1px solid var(--border-warm)',
                    color: 'var(--text-100)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    background: 'var(--coral)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !input.trim() || loading ? 0.5 : 1,
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
