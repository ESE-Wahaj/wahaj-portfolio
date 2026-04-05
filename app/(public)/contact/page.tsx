'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ESE-wahaj',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/wahajnaveed',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/wahajnaveed',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/wahajnaveed',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          style: {
            background: 'var(--bg-700)',
            color: 'var(--text-100)',
            border: '1px solid var(--border-warm)',
          },
          iconTheme: { primary: '#2DD4BF', secondary: '#fff' },
        });
        reset();
      } else {
        toast.error('Failed to send message. Please try again.', {
          style: {
            background: 'var(--bg-700)',
            color: 'var(--text-100)',
            border: '1px solid var(--border-warm)',
          },
        });
      }
    } catch {
      toast.error('Something went wrong. Please try again later.', {
        style: {
          background: 'var(--bg-700)',
          color: 'var(--text-100)',
          border: '1px solid var(--border-warm)',
        },
      });
    }
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(12, 9, 8, 0.9), rgba(12, 9, 8, 0.94)), url('/images/contact-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--text-100)',
        padding: '6rem 0',
      }}
    >
      <Toaster position="top-right" />
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">CONTACT</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-100)', fontSize: '2.5rem' }}>
            Get In <span className="gradient-text-coral">Touch</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '2rem',
          }}
        >
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-100)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '0.25rem',
                }}
              >
                Wahaj Naveed
              </h3>
              <p style={{ color: 'var(--teal)', fontWeight: 500 }}>Full Stack Developer</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'rgba(255,107,74,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--coral)',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Email
                  </p>
                  <p style={{ color: 'var(--text-200)' }}>wahaj@example.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'rgba(45,212,191,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--teal)',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Phone
                  </p>
                  <p style={{ color: 'var(--text-200)' }}>+92 300 1234567</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'rgba(245,158,11,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Location
                  </p>
                  <p style={{ color: 'var(--text-200)' }}>Wah, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-400)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '1rem',
                }}
              >
                Social
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: 'var(--bg-900)',
                      border: '1px solid var(--border-warm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-300)',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="name"
                    style={{ fontSize: '0.875rem', color: 'var(--text-300)', fontFamily: 'var(--font-body)' }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    className="input"
                  />
                  {errors.name && (
                    <p style={{ color: 'var(--coral)', fontSize: '0.75rem' }}>{errors.name.message}</p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="email"
                    style={{ fontSize: '0.875rem', color: 'var(--text-300)', fontFamily: 'var(--font-body)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className="input"
                  />
                  {errors.email && (
                    <p style={{ color: 'var(--coral)', fontSize: '0.75rem' }}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="subject"
                  style={{ fontSize: '0.875rem', color: 'var(--text-300)', fontFamily: 'var(--font-body)' }}
                >
                  Subject
                </label>
                <select id="subject" {...register('subject')} className="input">
                  <option value="" style={{ background: 'var(--bg-700)' }}>Select a subject</option>
                  <option value="project" style={{ background: 'var(--bg-700)' }}>Project Inquiry</option>
                  <option value="freelance" style={{ background: 'var(--bg-700)' }}>Freelance Opportunity</option>
                  <option value="collaboration" style={{ background: 'var(--bg-700)' }}>Collaboration</option>
                  <option value="general" style={{ background: 'var(--bg-700)' }}>General Question</option>
                  <option value="other" style={{ background: 'var(--bg-700)' }}>Other</option>
                </select>
                {errors.subject && (
                  <p style={{ color: 'var(--coral)', fontSize: '0.75rem' }}>{errors.subject.message}</p>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="message"
                  style={{ fontSize: '0.875rem', color: 'var(--text-300)', fontFamily: 'var(--font-body)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  placeholder="Tell me about your project or just say hello..."
                  className="input"
                  style={{ resize: 'vertical', minHeight: '140px' }}
                />
                {errors.message && (
                  <p style={{ color: 'var(--coral)', fontSize: '0.75rem' }}>{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1rem',
                  fontSize: '1rem',
                  opacity: isSubmitting ? 0.5 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 3fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
