export const runtime = 'nodejs';
export const preferredRegion = 'gru1'; // opcional (São Paulo)

export default async function handler(req, res) {
  try {
    const key = process.env.STRIPESECRETKEY;
    if (!key || !key.startsWith('sk_')) {
      throw new Error('STRIPESECRETKEY missing or invalid');
    }

    // Chama a API da Stripe direto (sem SDK)
    const r = await fetch('https://api.stripe.com/v1/balance', {
      headers: { Authorization: `Bearer ${key}` }
    });

    const text = await r.text();
    if (!r.ok) {
      return res.status(r.status).json({ ok: false, error: `Stripe HTTP ${r.status}: ${text}` });
    }

    let balance;
    try { balance = JSON.parse(text); }
    catch { return res.status(500).json({ ok: false, error: `Stripe returned non-JSON: ${text}` }); }

    return res.status(200).json({ ok: true, source: 'fetch', balance });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e?.message || String(e),
      diag: {
        node: process.version,
        region: process.env.VERCEL_REGION || null,
        hasKey: !!process.env.STRIPESECRETKEY
      }
    });
  }
}
