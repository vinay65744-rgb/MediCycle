const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let database;

async function connectDatabase() {
  if (database) {
    return database;
  }

  await client.connect();

  database = client.db(process.env.DB_NAME || "medicycle");

  console.log("MongoDB connected successfully");

  return database;
}

function getDatabase() {
  if (!database) {
    throw new Error("Database has not been connected yet.");
  }

  return database;
}

module.exports = {
  connectDatabase,
  getDatabase,
};