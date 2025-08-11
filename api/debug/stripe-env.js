export const runtime = 'nodejs';

export default function handler(req, res) {
  const k = process.env.STRIPESECRETKEY || '';
  res.status(200).json({
    hasKey: Boolean(k),
    prefix: k ? k.slice(0, 12) : null,
    suffix: k ? k.slice(-4) : null,
  });
}


