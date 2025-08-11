export const runtime = 'nodejs';
export const config = { runtime: 'nodejs' };
export const preferredRegion = 'gru1';

export default async function handler(req, res) {
  try {
    const key = process.env.STRIPESECRETKEY || '';
    if (!key || !key.startsWith('sk_')) throw new Error('STRIPESECRETKEY missing or invalid');

    const r = await fetch('https://api.stripe.com/v1/balance', {
      headers: { Authorization: `Bearer ${key}` },
    });
    const text = await r.text();

    // Resposta usando Node http.ServerResponse (sem Express)
    res.statusCode = r.status;
    res.setHeader('content-type', 'application/json');
    res.end(text);
  } catch (e) {
    const body = JSON.stringify({ ok: false, error: e?.message || String(e) });
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(body);
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


