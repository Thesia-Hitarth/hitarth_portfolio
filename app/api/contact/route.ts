/**
 * app/api/contact/route.ts
 * ─────────────────────────────────────────────────────────
 * Contact form API route — shell with TODO (Phase 4).
 * Will send email via Resend when implemented.
 * ─────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server';

// TODO Phase 4: Install Resend and implement email sending
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// TODO Phase 4: Define a Zod schema for the request body
// const contactSchema = z.object({
//   name: z.string().min(2).max(100),
//   email: z.string().email(),
//   message: z.string().min(10).max(2000),
// });

export async function POST(_request: NextRequest): Promise<NextResponse> {
  // TODO Phase 4: Parse and validate request body with Zod
  // const body = await request.json();
  // const result = contactSchema.safeParse(body);
  // if (!result.success) {
  //   return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
  // }
  // const { name, email, message } = result.data;

  // TODO Phase 4: Send email via Resend
  // await resend.emails.send({ ... });

  return NextResponse.json(
    { message: 'Contact form not yet implemented. Coming in Phase 4.' },
    { status: 501 }
  );
}
