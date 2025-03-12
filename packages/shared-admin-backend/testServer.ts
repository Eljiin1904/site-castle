// testServer.js (MongoDB setup using MongoMemoryServer and native MongoDB driver)

// import { MongoMemoryServer } from "mongodb-memory-server";
// import { MongoClient } from "mongodb";

// let mongoServer;
// let client;
// let db;

// export const setupMongoServer = async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   client = new MongoClient(uri);
//   await client.connect();

//   db = client.db("testdb");
// };

// export const stopMongoServer = async () => {
//   await client.close();
//   await mongoServer.stop();
// };

// export const getDb = () => db;
