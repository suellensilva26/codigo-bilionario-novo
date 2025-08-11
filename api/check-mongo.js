export const runtime = 'nodejs';
export const preferredRegion = 'gru1';
import { MongoClient } from 'mongodb';

export default async function handler(_req, res) {
  const uri = process.env.MONGODB_URI;
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASSWORD;
  let client;
  try {
    if (!uri) throw new Error('MONGODB_URI ausente');
    if (user && pass) {
      const uriNoAuth = uri.replace(/(^mongodb:\/\/)(?:.*?@)/, '$1');
      client = new MongoClient(uriNoAuth, {
        serverSelectionTimeoutMS: 8000,
        auth: { username: user, password: pass },
        authSource: 'admin',
      });
    } else {
      client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    }
    await client.connect();
    const db = client.db('codigobilionario');
    const col = db.collection('healthchecks');
    const doc = { ok: true, at: new Date() };
    const { insertedId } = await col.insertOne(doc);
    const back = await col.findOne({ _id: insertedId });
    await col.deleteOne({ _id: insertedId });
    res.status(200).json({ ok: true, doc: back });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || String(e) });
  } finally {
    if (client) await client.close().catch(() => {});
  }
}


