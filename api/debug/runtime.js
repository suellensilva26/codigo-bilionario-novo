export const runtime = 'nodejs';

export default function handler(req, res) {
  res.status(200).json({
    runtime: 'node',
    node: process.version,
    region: process.env.VERCEL_REGION || null,
  });
}


