import nodemailer from 'nodemailer';

/**
 * lib/mailer.ts
 * ─────────────────────────────────────────────────────────
 * Nodemailer SMTP Transporter configuration.
 * Connects directly to smtp.gmail.com:587 (TLS).
 * ─────────────────────────────────────────────────────────
 */

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn(
    '[mailer] WARNING: GMAIL_USER or GMAIL_APP_PASSWORD environment variables are not defined. ' +
    'Contact form submissions will fail to send emails.'
  );
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true, // enforce valid TLS certificate verification
  },
});

// Verify connection configuration on startup (development only to prevent serverless cold-start latency)
if (process.env.NODE_ENV === 'development') {
  transporter.verify((error) => {
    if (error) {
      console.error('[mailer] SMTP connection verification failed:', error);
    } else {
      console.log('[mailer] Gmail SMTP ready ✓');
    }
  });
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendMail(options: MailOptions): Promise<void> {
  await transporter.sendMail({
    from: `"Portfolio" <${process.env.GMAIL_USER || 'no-reply@gmail.com'}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });
}
