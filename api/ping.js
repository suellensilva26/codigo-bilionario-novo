export const runtime = 'nodejs';
export const preferredRegion = 'gru1';

export default function handler(_req, res) {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
}


