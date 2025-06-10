import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { createHash } from "crypto";
dotenv.config();

const DB_NAME = "development";
const DB_URI = process.env.DB_URI || "mongodb://localhost:27778/?directConnection=true";

const TOTAL_RECORDS = 20_000_000;
const TOTAL_IN_BATCH = 10_000; // Number of records to insert in each batch
const COLLECTION_NAME = "crash-records";

// This function hashes the server seed using SHA-256 and returns a new hash.
function hashServerSeed(prevSeed: string) {
  return createHash("sha256").update(prevSeed).digest("hex");
}

export interface CrashRecordDocument {
  hash: string;
  index: number;
  used: boolean; // Indicates whether the record has been used
  timestamp: Date;
};

async function insertCrashRecords() {
  const client = new MongoClient(DB_URI);
  let initialHash = createHash("sha256").update(uuidv4()).digest("hex"); // Generate an initial SHA-256 hash value
  let index = 1; // Start index for the batch
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection<CrashRecordDocument>(COLLECTION_NAME);

    // If there are existing records, get the last hash to continue the chain
    const lastRecord = await collection.findOne({}, { sort: { index: -1 } });
    if (lastRecord) {
      console.log(`Last record found with hash: ${lastRecord.hash}`);
      // Use the last record's hash as the starting point for the next batch
      initialHash = lastRecord.hash;
      index = lastRecord.index + 1; // Start from the next index

    } else {
      console.log("No existing records found, starting with a new initial hash.");
      await collection.createIndex({ hash: 1 }, { unique: true });
      await collection.createIndex({ index: 1 }, { unique: true });
    }
    // Uncomment the following line to drop the collection if you want to start fresh
    // await collection.drop().catch((err) => {
    //   console.error(err);
    // });

    // Create Index for easy retrieval
    console.log(`Inserting ${TOTAL_RECORDS.toLocaleString()} documents...`);

    const start = Date.now();
   
    let hashBatch:CrashRecordDocument[] = [];
    for (let i = index, j = 0; i < TOTAL_RECORDS; i += 1, j += 1) {
      const hash = hashServerSeed(initialHash);
      hashBatch.push({
        hash,
        index: i,
        used: false, // Mark as unused initially
        timestamp: new Date(), // Increment timestamp by 1 second for each record
      });
      initialHash = hash; // Update the initial hash for the next record
      if (j >= TOTAL_IN_BATCH) {
        await collection.insertMany(hashBatch);
        hashBatch = []; // Reset the batch
        j = 0; // Reset the counter
      }
    }
    
    console.log(`Inserted ${TOTAL_RECORDS.toLocaleString()} documents in ${((Date.now() - start) / 1000).toFixed(2)} seconds.`);
  } catch (err) {
    console.error("Error during insertion: ", err);
  } finally {
    await client.close();
  }
}

insertCrashRecords();
