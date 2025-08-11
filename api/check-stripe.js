export const runtime = 'nodejs';

export default async function handler(request) {
  try {
    const key = process.env.STRIPESECRETKEY || '';
    if (!key || !key.startsWith('sk_')) throw new Error('STRIPESECRETKEY missing or invalid');

    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
    const balance = await stripe.balance.retrieve();

    return new Response(JSON.stringify({ ok: true, source: 'sdk', balance }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: e?.message || String(e),
        diag: {
          node: process.version,
          region: process.env.VERCEL_REGION || null,
          hasKey: Boolean(process.env.STRIPESECRETKEY),
          keyPrefix: process.env.STRIPESECRETKEY ? process.env.STRIPESECRETKEY.slice(0, 10) : null,
        },
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
import Stripe from 'stripe';

export default async function handler(_req, res) {
  try {
    const key = process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SK || process.env.STRIPE_KEY;
    if (!key) throw new Error('STRIPESECRETKEY ausente');
    const stripe = new Stripe(key);
    const balance = await stripe.balance.retrieve();
    res.status(200).json({ ok: true, balance });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || String(e) });
  }
}


