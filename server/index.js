const dotenv = require(dotenv);
dotenv.config({ path: .env.local });

const express = require(express);
const cors = require(cors);
const { MongoClient } = require(mongodb);
const Stripe = require(stripe);

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Mongo ----------
const mongoUri = process.env.MONGODB_URI;
const mongoClient = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 8000 });

async function getDb() {
  if (!mongoClient.topology || !(mongoClient.topology.isConnected && mongoClient.topology.isConnected())) {
    await mongoClient.connect();
  }
  return mongoClient.db(codigobilionario);
}

app.get(/api/check/mongo, async (_req, res) => {
  try {
    const db = await getDb();
    const col = db.collection(healthchecks);
    const doc = { ok: true, at: new Date() };
    const { insertedId } = await col.insertOne(doc);
    const back = await col.findOne({ _id: insertedId });
    await col.deleteOne({ _id: insertedId });
    res.json({ ok: true, doc: back });
  } catch (e) {
    console.error(Mongo
