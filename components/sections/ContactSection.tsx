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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBlock: 'var(--space-section)',
      }}
    >
      {/* Radial accent gradient */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(0,0,0,0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
        <SectionLabel number="07" label="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" style={{ marginTop: '3rem' }}>
          
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              {/* Large headline */}
              <h2
                id="contact-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                  color: 'var(--color-text-1)',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                }}
              >
                Let&rsquo;s build something<br />
                <span style={{ color: 'var(--color-text-2)' }}>remarkable.</span>
              </h2>

              {/* Email link */}
              <a
                href="mailto:hitarththesia123@gmail.com"
                data-cursor="link"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  color: 'var(--color-text-1)',
                  letterSpacing: 'var(--tracking-snug)',
                  display: 'inline-block',
                  position: 'relative',
                  textDecoration: 'underline',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '6px',
                  transition: 'color var(--dur-base) var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-1)'; }}
              >
                hitarththesia123@gmail.com
              </a>
            </div>

            {/* Current Status Card */}
            <div style={{
              background: 'var(--color-bg-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {/* Pulsing Green dot */}
                <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                  <span style={{
                    position: 'absolute',
                    display: 'inline-flex',
                    height: '100%', width: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success)',
                    opacity: 0.75,
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }} />
                  <span style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: '50%',
                    height: '8px', width: '8px',
                    backgroundColor: 'var(--color-success)',
                  }} />
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wider)',
                  color: 'var(--color-text-3)',
                }}>
                  Current status
                </span>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 'var(--text-md)',
                color: 'var(--color-text-1)',
                marginBottom: '0.5rem',
              }}>
                Available for work
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: 300,
                color: 'var(--color-text-2)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}>
                Open to full-time roles in India — on-site, hybrid, or remote. Also available for short-term freelance projects.
              </p>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-text-3)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
              }}>
                Typical response: within 24 hours
              </div>
            </div>

            {/* Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', value: 'hitarththesia123@gmail.com', href: 'mailto:hitarththesia123@gmail.com' },
                { label: 'Location', value: 'Ahmedabad, Gujarat, India' },
                { label: 'LinkedIn', value: 'hitarth-thesia ↗', href: siteConfig.social.linkedin },
                { label: 'GitHub', value: 'Thesia-Hitarth ↗', href: siteConfig.social.github },
              ].map(({ label, value, href }) => (
                <div key={label} style={{
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '1rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                    letterSpacing: 'var(--tracking-wider)',
                    flexShrink: 0,
                  }}>
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      data-cursor="link"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize: '0.88rem',
                        color: 'var(--color-text-1)',
                        textDecoration: 'none',
                        transition: 'color var(--dur-base) var(--ease-out-expo), transform var(--dur-base) var(--ease-out-expo)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-1)';
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      fontSize: '0.88rem',
                      color: 'var(--color-text-1)',
                      textAlign: 'right',
                    }}>
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Open to Pills */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                textTransform: 'uppercase',
                color: 'var(--color-text-3)',
                letterSpacing: 'var(--tracking-wider)',
                display: 'block',
                marginBottom: '0.75rem',
              }}>
                Open to
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  'Full-time roles',
                  'Freelance',
                  'Contract',
                  'Remote / Hybrid',
                  'On-site (India)',
                ].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-2)',
                    background: 'var(--color-bg-3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '100px',
                    padding: '0.35rem 0.8rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              background: 'var(--color-bg-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}>
              {status === 'success' ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem 0',
                }}>
                  <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
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
                      background: 'rgba(220, 38, 38, 0.05)',
                      border: '1px solid rgba(220, 38, 38, 0.15)',
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
                      style={{ ...inputStyle, background: 'var(--color-bg)', borderColor: errors.name ? 'var(--color-error)' : 'var(--color-border)' }}
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
                      style={{ ...inputStyle, background: 'var(--color-bg)', borderColor: errors.email ? 'var(--color-error)' : 'var(--color-border)' }}
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
                      style={{ ...inputStyle, background: 'var(--color-bg)', borderColor: errors.subject ? 'var(--color-error)' : 'var(--color-border)' }}
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
                      style={{ ...inputStyle, background: 'var(--color-bg)', resize: 'none', borderColor: errors.message ? 'var(--color-error)' : 'var(--color-border)' }}
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
            </div>

            {/* Prefer another channel section */}
            <div style={{
              background: 'var(--color-bg-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--color-text-2)',
              }}>
                Prefer another channel? Connect on social.
              </span>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: siteConfig.social.github },
                  { label: 'LinkedIn', href: siteConfig.social.linkedin },
                  { label: 'Email me', href: 'mailto:hitarththesia123@gmail.com' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    data-cursor="link"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-1)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-wide)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      transition: 'color var(--dur-base) var(--ease-out-expo)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-1)'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
