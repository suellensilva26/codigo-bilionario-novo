const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { MongoClient } = require('mongodb');
const Stripe = require('stripe');

const green = (m) => console.log(`\x1b[32m${m}\x1b[0m`);
const red = (m) => console.log(`\x1b[31m${m}\x1b[0m`);

async function checkMongo() {
  const uri = process.env.MONGODB_URI;
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASSWORD;
  let client;
  try {
    if (!uri) throw new Error('MONGODB_URI ausente');
    // Se USER/PASSWORD presentes, usar auth separado (Caminho B)
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
    await db.collection('healthchecks').insertOne({ ok: true, at: new Date() });
    green('MongoDB: OK ✅');
  } catch (e) {
    red(`MongoDB: ERRO ❌ (${e.message})`);
    throw e;
  } finally {
    if (client) await client.close().catch(() => {});
  }
}

async function checkStripe() {
  try {
    const key = process.env.STRIPESECRETKEY || process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SK || process.env.STRIPE_KEY;
    if (!key) throw new Error('STRIPESECRETKEY ausente');
    const stripe = new Stripe(key);
    const balance = await stripe.balance.retrieve();
    green(`Stripe: OK ✅ (available=${balance.available?.[0]?.amount ?? 0})`);
  } catch (e) {
    red(`Stripe: ERRO ❌ (${e.message})`);
    throw e;
  }
}

async function checkFirebaseOptional() {
  try {
    const pid = process.env.FIREBASEPROJECTID;
    if (!pid || !globalThis.fetch) throw new Error('skip');
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    green('Firebase: OK ✅');
  } catch (e) {
    if (e.message !== 'skip') {
      red(`Firebase: ERRO ❌ (${e.message})`);
      throw e;
    } else {
      console.log('Firebase: (pulado)');
    }
  }
}

(async () => {
  let allOk = true;
  try { await checkMongo(); } catch { allOk = false; }
  try { await checkStripe(); } catch { allOk = false; }
  try { await checkFirebaseOptional(); } catch { allOk = false; }

  console.log('\nResultado Final:', allOk ? '🎉 Tudo certo!' : '⚠️ Alguns testes falharam');
})();


