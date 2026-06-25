import type { ContactFormData } from './validations';
import { siteConfig } from '@/config/site';
import { getAbsoluteUrl } from '@/lib/utils';

/**
 * lib/email-templates.ts
 * ─────────────────────────────────────────────────────────
 * Email HTML & Text templates for contact form.
 * Uses inline styling only for wide client compatibility.
 * ─────────────────────────────────────────────────────────
 */

const PRIMARY_COLOR = '#6366f1'; // Premium Indigo

export function generateNotificationHTML({ name, email, subject, message }: ContactFormData): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
      <!-- Header Bar -->
      <div style="background-color: ${PRIMARY_COLOR}; padding: 24px 32px; border-radius: 12px 12px 0 0; text-align: left;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.025em;">
          New message from your portfolio
        </h2>
      </div>

      <!-- Body Container -->
      <div style="background-color: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Info Rows -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px;">From</div>
          <div style="font-size: 15px; color: #111827; font-weight: 500;">${name}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px;">Email Address</div>
          <div style="font-size: 15px;">
            <a href="mailto:${email}" style="color: ${PRIMARY_COLOR}; text-decoration: none; font-weight: 500;">${email}</a>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px;">Subject</div>
          <div style="font-size: 15px; color: #111827; font-weight: 500;">${subject}</div>
        </div>

        <!-- Divider -->
        <div style="border-top: 1px solid #e5e7eb; margin: 24px 0;"></div>

        <!-- Message Box -->
        <div>
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 8px;">Message</div>
          <div style="font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; background-color: #f9fafb; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb; font-family: inherit;">${message}</div>
        </div>

      </div>

      <!-- Footer -->
      <div style="margin-top: 32px; font-size: 12px; color: #9ca3af; text-align: center; font-weight: 500;">
        Sent from <a href="${siteConfig.url}" style="color: #6b7280; text-decoration: underline;">${siteConfig.url.replace(/^https?:\/\//, '')}</a>
      </div>
    </div>
  `;
}

export function generateNotificationText({ name, email, subject, message }: ContactFormData): string {
  return `
New portfolio message
────────────────────────────────────────
From:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}

────────────────────────────────────────
Sent from ${siteConfig.url.replace(/^https?:\/\//, '')}
  `.trim();
}

export function generateConfirmationHTML({ name }: { name: string }): string {
  const firstName = name.split(' ')[0];
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
      <!-- Header Bar -->
      <div style="background-color: ${PRIMARY_COLOR}; opacity: 0.95; padding: 24px 32px; border-radius: 12px 12px 0 0; text-align: left;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.025em;">
          Message received!
        </h2>
      </div>

      <!-- Body Container -->
      <div style="background-color: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <p style="font-size: 16px; color: #111827; font-weight: 600; margin-top: 0; margin-bottom: 12px;">
          Hey ${firstName},
        </p>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 24px;">
          Thanks for reaching out! I have successfully received your message and will read through it as soon as possible. You can expect a response from my end within 24 to 48 hours.
        </p>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
          In the meantime, feel free to explore my full project catalog:
        </p>

        <!-- CTA Button -->
        <div style="margin-bottom: 32px;">
          <a href="${getAbsoluteUrl('/projects')}" style="background-color: ${PRIMARY_COLOR}; color: #ffffff; padding: 12px 24px; border-radius: 8px; display: inline-block; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);">
            View Projects Portfolio →
          </a>
        </div>

        <!-- Divider -->
        <div style="border-top: 1px solid #e5e7eb; margin: 24px 0;"></div>

        <!-- Signature -->
        <div style="font-size: 13px; color: #6b7280; line-height: 1.5;">
          Best regards,<br>
          <strong style="color: #111827;">Hitarth Thesia</strong><br>
          <span style="font-size: 12px;">Software Developer</span><br>
          <a href="${siteConfig.social.linkedin}" style="color: ${PRIMARY_COLOR}; text-decoration: none; font-size: 12px; font-weight: 500;">Connect on LinkedIn</a>
        </div>

      </div>

      <!-- Footer -->
      <div style="margin-top: 32px; font-size: 12px; color: #9ca3af; text-align: center;">
        This is an automated confirmation of receipt. Please do not reply directly to this mail.
      </div>
    </div>
  `;
}

export function generateConfirmationText({ name }: { name: string }): string {
  const firstName = name.split(' ')[0];
  return `
Hi ${firstName},

Thanks for reaching out! I have successfully received your message and will get back to you within 24 to 48 hours.

In the meantime, feel free to view my projects here: ${getAbsoluteUrl('/projects')}

— Hitarth Thesia
Software Developer
LinkedIn: ${siteConfig.social.linkedin}
  `.trim();
}
