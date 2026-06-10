import { z } from 'zod';

/**
 * lib/validations.ts
 * ─────────────────────────────────────────────────────────
 * Runtime Zod validation schemas for forms.
 * ─────────────────────────────────────────────────────────
 */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be under 100 characters')
    .trim(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be under 2000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
