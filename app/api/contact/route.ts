import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { sendMail } from '@/lib/mailer';
import {
  generateNotificationHTML,
  generateNotificationText,
  generateConfirmationHTML,
  generateConfirmationText,
} from '@/lib/email-templates';
import { siteConfig } from '@/config/site';

/**
 * app/api/contact/route.ts
 * ─────────────────────────────────────────────────────────
 * Contact form submission handler.
 * Validates with Zod, applies rate limiting, sends emails.
 * ─────────────────────────────────────────────────────────
 */

// In-memory rate limiting map (IP-address string mapping to timestamp array)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;
  
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= maxRequests) {
    return true;
  }

  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Parse body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // 2. Validate with Zod
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fields: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, subject, message } = result.data;

    // 3. Rate limiting (IP-based, in-memory)
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 4. Send notification email TO the developer (Hitarth)
    // replyTo is set to the visitor's email address so that clicking "Reply"
    // in the mail client replies directly to the visitor.
    try {
      await sendMail({
        to: siteConfig.email,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        html: generateNotificationHTML({ name, email, subject, message }),
        text: generateNotificationText({ name, email, subject, message }),
      });
    } catch (mailError) {
      console.error('[contact] Developer notification email dispatch failed:', mailError);
      return NextResponse.json(
        { error: 'Failed to dispatch email. Please try again later.' },
        { status: 500 }
      );
    }

    // 5. Send confirmation receipt TO the visitor
    // Best-effort send — we swallow any errors here so that a failure to send the visitor receipt
    // does not block returning a successful response (the developer was already notified).
    const firstName = name.split(' ')[0];
    await sendMail({
      to: email,
      subject: `Got your message, ${firstName}!`,
      html: generateConfirmationHTML({ name: firstName }),
      text: generateConfirmationText({ name: firstName }),
    }).catch((confirmError) => {
      console.warn('[contact] Visitor confirmation email dispatch failed (swallowed):', confirmError);
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[contact] Route handler exception:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
