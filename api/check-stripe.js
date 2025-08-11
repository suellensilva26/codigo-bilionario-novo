export const runtime = 'nodejs';
export const preferredRegion = 'gru1';

import Stripe from 'stripe';

export default async function handler(req, res) {
  try {
    const key = process.env.STRIPESECRETKEY;
    if (!key) throw new Error('STRIPESECRETKEY missing (not set for this environment)');
    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
    const balance = await stripe.balance.retrieve();
    return res.status(200).json({ ok: true, balance });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
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


