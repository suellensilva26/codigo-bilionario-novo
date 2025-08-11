const path = require('node:path');
const dotenv = require('dotenv');
// Carrega .env.local a partir da raiz do projeto (um nível acima de /server)
const envPath = path.resolve(__dirname, '..', '.env.local');
dotenv.config({ path: envPath, override: true });
if (!process.env.STRIPESECRETKEY && !process.env.STRIPE_SECRET_KEY) {
  console.warn(`[server] Aviso: STRIPESECRETKEY não encontrada após carregar ${envPath}`);
} else {
  const mask = (s) => (s ? `${s.slice(0,10)}...(${s.length})` : '');
  console.log('[server] Stripe key detectada:', mask(process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY));
}

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
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASSWORD;
let mongoClient;

function buildMongoClient() {
  if (mongoUser && mongoPass && mongoUri) {
    const uriNoAuth = mongoUri.replace(/(^mongodb:\/\/)(?:.*?@)/, '$1');
    return new MongoClient(uriNoAuth, {
      serverSelectionTimeoutMS: 8000,
      auth: { username: mongoUser, password: mongoPass },
      authSource: 'admin',
    });
  }
  return new MongoClient(mongoUri, { serverSelectionTimeoutMS: 8000 });
}

async function getMongoClient() {
  if (!mongoClient) {
    mongoClient = buildMongoClient();
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
const stripeSecretKey = process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SK || process.env.STRIPE_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
// Debug opcional: indicar no log se a STRIPE foi carregada
if (!stripeSecretKey) {
  console.warn('[server] STRIPESECRETKEY/STRIPE_SECRET_KEY não detectada no ambiente');
}

app.get('/api/check/stripe', async (_req, res) => {
  try {
    const liveKey = process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SK || process.env.STRIPE_KEY;
    if (!liveKey) throw new Error('STRIPESECRETKEY ausente');
    const liveStripe = new Stripe(liveKey);
    const balance = await liveStripe.balance.retrieve();
    res.json({ ok: true, balance });
  } catch (e) {
    console.error('Stripe check error:', e);
    res.status(500).json({ ok: false, error: e.message || String(e) });
  }
});

app.get('/api/health', (_req, res) => {
  const hasStripeNow = Boolean(process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SK || process.env.STRIPE_KEY);
  res.json({ ok: true, env: { hasMongoUri: Boolean(mongoUri), hasStripe: hasStripeNow } });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://127.0.0.1:${PORT}`);
});


