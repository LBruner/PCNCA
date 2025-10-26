import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(stripeSecret);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const rawSessionId = url.searchParams.get('session_id');
    const sessionId = rawSessionId && rawSessionId !== 'null' && rawSessionId !== 'undefined' ? rawSessionId : null;

    // If no session id provided (or it's the literal string 'null' from the client),
    // return a stable JSON shape the frontend expects instead of a 400.
    if (!sessionId) {
      return NextResponse.json({
        status: null,
        payment_intent_id: null,
        payment_status: null,
        payment_intent_status: null,
      });
    }

    // Try to retrieve as a payment_intent first
    try {
      const pi = await stripe.paymentIntents.retrieve(sessionId as string);
      return NextResponse.json({
        status: pi.status,
        payment_intent_id: pi.id,
        payment_status: pi.status,
        payment_intent_status: pi.status,
      });
    } catch (e) {
      // If not a payment intent, try to retrieve as a checkout session
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId as string, { expand: ['payment_intent'] });
      const pi = session.payment_intent as Stripe.PaymentIntent | null;
      return NextResponse.json({
        status: session.status,
        payment_intent_id: pi?.id ?? null,
        payment_status: (pi as any)?.status ?? null,
        payment_intent_status: (pi as any)?.status ?? null,
      });
    } catch (err: any) {
      console.error('session-status lookup failed', err?.message ?? err);
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }
  } catch (err: any) {
    console.error('session-status error', err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? 'unknown' }, { status: 500 });
  }
}
