'use client';

/**
 * components/sections/ContactSection.tsx
 * ─────────────────────────────────────────────────────────
 * Contact section containing contact info cards and an
 * interactive message form posting to /api/contact.
 * ─────────────────────────────────────────────────────────
 */

import { useState, type ReactElement, type FocusEvent, type FormEvent } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  RefreshCw,
  X
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/config/site';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { contactFormSchema, type ContactFormData, type ContactFormErrors } from '@/lib/validations';
import { cn } from '@/lib/utils';

export function ContactSection(): ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Validate a single field on blur
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof ContactFormData;

    // Run safeParse on the specific field schema by picking it
    const fieldSchema = contactFormSchema.shape[key];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [key]: result.error.issues[0].message,
      }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If there is an existing error, clear it as the user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
  };

  // Submit contact form to Next API endpoint
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validate entire form state with Zod
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus('error');
      setErrorMessage('Please fix the validation errors in the form fields.');
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
        if (response.status === 422 && data.fields) {
          setErrors(data.fields);
          throw new Error('Validation failed on server-side criteria.');
        }
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      // Clear form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err: any) {
      console.error('[contact] Form submission error: ', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to dispatch message. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 bg-muted/10 border-t border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="contact-heading"
          label="07 / Contact"
          title="Let's work together"
          subtitle="I'm currently open to full-time roles and freelance projects. Have something in mind? Send a message — I reply within 24 hours."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          {/* LEFT COLUMN: Contact Details & Status Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Availability Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Available for work
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                Open to full-time roles in India (On-site, Hybrid, or Remote mode)
              </p>
            </div>

            {/* Core Info Block */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                Contact Details
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:underline"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-muted-foreground py-1">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>{siteConfig.location}</span>
                </div>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:underline"
                >
                  <LinkedinIcon size={16} className="text-primary shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:underline"
                >
                  <GithubIcon size={16} className="text-primary shrink-0" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Quick response note */}
            <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-4 border border-border/40">
              <Clock size={14} className="text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">
                Typical response time: <span className="font-semibold text-foreground">within 24 hours</span>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Submission Area */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              {status === 'success' ? (
                // Success State Confirmation Banner
                <div
                  className={cn(
                    'rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center shadow-sm',
                    'animate-in fade-in zoom-in duration-300'
                  )}
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out. I have received your message and will read through it and reply within 24 hours.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors focus:outline-none"
                    >
                      Connect on LinkedIn
                    </a>
                    <button
                      onClick={() => setStatus('idle')}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity focus:outline-none"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                // Interactive Form UI
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Error Banner */}
                  {status === 'error' && errorMessage && (
                    <div className="relative flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2 duration-200">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <div className="flex-1 pr-6">{errorMessage}</div>
                      <button
                        type="button"
                        onClick={() => setErrorMessage('')}
                        className="absolute right-2 top-2 text-red-400 hover:text-red-600 cursor-pointer"
                        aria-label="Dismiss error"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-sm font-semibold text-foreground">
                      Your Name
                    </label>
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
                      className={cn(
                        'w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all',
                        'focus:border-primary focus:ring-2 focus:ring-primary/20',
                        errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      )}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </label>
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
                      className={cn(
                        'w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all',
                        'focus:border-primary focus:ring-2 focus:ring-primary/20',
                        errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="text-sm font-semibold text-foreground">
                      Subject
                    </label>
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
                      className={cn(
                        'w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all',
                        'focus:border-primary focus:ring-2 focus:ring-primary/20',
                        errors.subject && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      )}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <AlertCircle size={12} />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="form-message" className="text-sm font-semibold text-foreground">
                        Message
                      </label>
                      <span
                        className={cn(
                          'text-[10px] font-mono text-muted-foreground',
                          formData.message.length > 2000 && 'text-red-500 font-bold'
                        )}
                      >
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
                      className={cn(
                        'w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all resize-none',
                        'focus:border-primary focus:ring-2 focus:ring-primary/20',
                        errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-in fade-in duration-150">
                        <AlertCircle size={12} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm select-none',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      status === 'loading'
                        ? 'bg-muted border border-border text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <RefreshCw size={16} />
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
