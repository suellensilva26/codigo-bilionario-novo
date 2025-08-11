const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ---------- Mongo ----------
const mongoUri = process.env.MONGODB_URI;
let mongoClient;

async function getMongoClient() {
  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 8000 });
  }
  if (!mongoClient.topology || !mongoClient.topology.isConnected()) {
    await mongoClient.connect();
  }
  return mongoClient;
}

app.get('/api/check/mongo', async (_req, res) => {
  try {
    if (!mongoUri) throw new Error('MONGODB_URI ausente');
    const client = await getMongoClient();
    const db = client.db('codigobilionario');
    const col = db.collection('healthchecks');
    const doc = { ok: true, at: new Date() };
    const { insertedId } = await col.insertOne(doc);
    const back = await col.findOne({ _id: insertedId });
    await col.deleteOne({ _id: insertedId });
    res.json({ ok: true, doc: back });
  } catch (e) {
    console.error('Mongo check error:', e);
    res.status(500).json({ ok: false, error: e.message || String(e) });
  }
});

// ---------- Stripe ----------
const stripeSecretKey = process.env.STRIPESECRETKEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

app.get('/api/check/stripe', async (_req, res) => {
  try {
    if (!stripe) throw new Error('STRIPESECRETKEY ausente');
    const balance = await stripe.balance.retrieve();
    res.json({ ok: true, balance });
  } catch (e) {
    console.error('Stripe check error:', e);
    res.status(500).json({ ok: false, error: e.message || String(e) });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: { hasMongoUri: Boolean(mongoUri), hasStripe: Boolean(stripeSecretKey) } });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://127.0.0.1:${PORT}`);
});


