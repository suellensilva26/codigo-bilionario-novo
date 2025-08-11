export const runtime = 'nodejs';

export default async function handler(req, res) {
  try {
    const key = process.env.STRIPESECRETKEY;
    if (!key) throw new Error('STRIPESECRETKEY missing');
    const r = await fetch('https://api.stripe.com/v1/balance', {
      headers: { Authorization: `Bearer ${key}` }
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}


