'use client';

/**
 * components/sections/ContactSection.tsx
 * ─────────────────────────────────────────────────────────
 * Full-viewport dark section: centred large Syne headline,
 * huge italic Cormorant Garamond email link, social row,
 * and the existing form restyled with new design tokens.
 * Keeps all existing form logic intact.
 * ─────────────────────────────────────────────────────────
 */

import { useState, type ReactElement, type FocusEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Send, Loader2, RefreshCw, X } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { siteConfig } from '@/config/site';
import { contactFormSchema, type ContactFormData, type ContactFormErrors } from '@/lib/validations';
import { motion } from 'framer-motion';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-bg-3)',
  border: '1px solid var(--color-border)',
  borderRadius: '6px',
  padding: '0.85rem 1rem',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  fontWeight: 300,
  color: 'var(--color-text-1)',
  outline: 'none',
  transition: 'border-color var(--dur-base) var(--ease-out-expo)',
  boxSizing: 'border-box' as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-micro)',
  letterSpacing: 'var(--tracking-wider)',
  textTransform: 'uppercase' as const,
  color: 'var(--color-text-3)',
  display: 'block',
  marginBottom: '0.5rem',
};

export function ContactSection(): ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof ContactFormData;
    const fieldSchema = contactFormSchema.shape[key];
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({ ...prev, [key]: result.error.issues[0].message }));
    } else {
      setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name as keyof ContactFormData]; return next; });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[fieldName]) fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      setStatus('error');
      setErrorMessage('Please fix the validation errors above.');
      return;
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 422 && data.fields) { setErrors(data.fields); throw new Error('Validation failed on server.'); }
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err: unknown) {
      const error = err as Error;
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Radial amber gradient */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(232,201,122,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
        <SectionLabel number="07" label="Contact" />

        {/* Large headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-xl)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-text-1)',
              lineHeight: 1.1,
              marginBottom: '2rem',
            }}
          >
            Let&rsquo;s build something<br />
            <span style={{ color: 'var(--color-text-2)' }}>remarkable.</span>
          </h2>

          {/* Email link */}
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor="link"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--color-text-1)',
              letterSpacing: 'var(--tracking-snug)',
              display: 'inline-block',
              position: 'relative',
              transition: 'color var(--dur-base) var(--ease-out-expo)',
              textDecoration: 'none',
              marginBottom: '1.5rem',
            }}
            className="link-underline"
          >
            {siteConfig.email}
          </a>

          {/* Social row */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { label: 'GitHub',   href: siteConfig.social.github },
              { label: 'LinkedIn', href: siteConfig.social.linkedin },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  transition: 'color var(--dur-base) var(--ease-out-expo), transform var(--dur-base) var(--ease-out-expo)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'var(--color-accent)';
                  el.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'var(--color-text-3)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '560px' }}
        >
          {status === 'success' ? (
            <div style={{
              background: 'var(--color-bg-3)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '3rem',
              textAlign: 'center',
            }}>
              <CheckCircle2 size={40} color="#5A9E6F" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: 'var(--color-text-1)',
                letterSpacing: 'var(--tracking-snug)',
                marginBottom: '0.5rem',
              }}>
                Message sent.
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-2)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                I&apos;ve received your message and will reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-magnetic"
                style={{ fontSize: '0.65rem' }}
              >
                <span>Send another</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Error banner */}
              {status === 'error' && errorMessage && (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  background: 'rgba(184, 85, 85, 0.08)',
                  border: '1px solid rgba(184, 85, 85, 0.2)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  position: 'relative',
                }}>
                  <AlertCircle size={14} color="var(--color-error)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'var(--color-error)', flex: 1 }}>
                    {errorMessage}
                  </span>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', position: 'absolute', right: '0.75rem', top: '0.75rem' }}
                    aria-label="Dismiss error"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="form-name" style={labelStyle}>Your Name</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  required
                  style={{ ...inputStyle, borderColor: errors.name ? 'var(--color-error)' : 'var(--color-border)' }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.name ? 'var(--color-error)' : 'var(--color-accent)'; }}
                  onBlurCapture={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.name ? 'var(--color-error)' : 'var(--color-border)'; }}
                />
                {errors.name && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-error)', marginTop: '0.3rem', letterSpacing: 'var(--tracking-wide)' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="form-email" style={labelStyle}>Email Address</label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  required
                  style={{ ...inputStyle, borderColor: errors.email ? 'var(--color-error)' : 'var(--color-border)' }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.email ? 'var(--color-error)' : 'var(--color-accent)'; }}
                  onBlurCapture={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.email ? 'var(--color-error)' : 'var(--color-border)'; }}
                />
                {errors.email && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-error)', marginTop: '0.3rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="form-subject" style={labelStyle}>Subject</label>
                <input
                  id="form-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  required
                  style={{ ...inputStyle, borderColor: errors.subject ? 'var(--color-error)' : 'var(--color-border)' }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.subject ? 'var(--color-error)' : 'var(--color-accent)'; }}
                  onBlurCapture={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = errors.subject ? 'var(--color-error)' : 'var(--color-border)'; }}
                />
              </div>

              {/* Message */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="form-message" style={labelStyle}>Message</label>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: formData.message.length > 2000 ? 'var(--color-error)' : 'var(--color-text-3)' }}>
                    {formData.message.length} / 2000
                  </span>
                </div>
                <textarea
                  id="form-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, team, or opportunity..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  required
                  style={{ ...inputStyle, resize: 'none', borderColor: errors.message ? 'var(--color-error)' : 'var(--color-border)' }}
                  onFocus={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = errors.message ? 'var(--color-error)' : 'var(--color-accent)'; }}
                  onBlurCapture={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = errors.message ? 'var(--color-error)' : 'var(--color-border)'; }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={status === 'loading' ? '' : 'btn-magnetic btn-filled'}
                style={{
                  width: '100%',
                  padding: '0.85rem 2rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  cursor: status === 'loading' ? 'not-allowed' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  ...(status === 'loading' ? {
                    background: 'var(--color-bg-4)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-3)',
                  } : {}),
                }}
              >
                <span>
                  {status === 'loading' ? (
                    <><Loader2 size={14} style={{ display: 'inline', animation: 'spin 1s linear infinite' }} /> Sending…</>
                  ) : status === 'error' ? (
                    <><RefreshCw size={14} style={{ display: 'inline' }} /> Try Again</>
                  ) : (
                    <><Send size={14} style={{ display: 'inline' }} /> Send Message</>
                  )}
                </span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
