import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyparser from "body-parser";
import cors from "cors";

dotenv.config();

console.log(process.env.MONGO_URI);
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const app = express();
app.use(bodyparser.json());
const port = process.env.PORT || 3000;
app.use(cors());

client.connect();

// Get the all Passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save passwords
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});
// Delete passwords
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
