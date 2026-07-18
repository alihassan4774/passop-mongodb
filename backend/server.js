import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyparser from "body-parser";
import cors from "cors";

dotenv.config();

const url = process.env.MONGO_URI;
// Connection pooling ke liye client ko function se bahar rakhein
const client = new MongoClient(url); 
const dbName = "passop";

const app = express();
app.use(bodyparser.json());
app.use(cors());

// Database connection helper function
async function connectDB() {
  // Agar client pehle se connect nahi hai toh hi connect karein
  await client.connect();
  return client.db(dbName);
}

// GET Route
app.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST Route
app.post("/", async (req, res) => {
  try {
    const password = req.body;
    const db = await connectDB();
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Route
app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    const db = await connectDB();
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vercel serverless ke liye app export karna zaroori hota hai
export default app;

// Local testing ke liye port listen chalega
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});