export const runtime = 'nodejs';

export default async function handler(req, res) {
  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPESECRETKEY, { apiVersion: '2024-06-20' });
    const balance = await stripe.balance.retrieve();
    res.status(200).json({ ok: true, balance });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
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


