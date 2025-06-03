import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = "development";
const DB_URI = process.env.DB_URI || "mongodb://localhost:27778/?directConnection=true";

const TOTAL_RECORDS = 20_000_000;
const BATCH_SIZE = 10_000;
const CONCURRENCY = 4;
const COLLECTION_NAME = "crash-records";

export interface CrashRecordDocument {
  uuid: string;
  index: number;
  timestamp: Date;
}

async function insertCrashRecords() {
  const client = new MongoClient(DB_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection<CrashRecordDocument>(COLLECTION_NAME);

    // Remove Previous Collection
    await collection.drop().catch((err) => {
      console.error(err);
    });

    // Create Index for easy retreival
    await collection.createIndex({ uuid: 1 }, { unique: true });
    await collection.createIndex({ index: 1 }, { unique: true });

    const timestamp = new Date();

    // Split into Batches for insertion
    const totalBatches = Math.ceil(TOTAL_RECORDS / BATCH_SIZE);
    const batchIndexes = Array.from({ length: totalBatches }, (_, i) => i);

    console.log(`Inserting ${TOTAL_RECORDS.toLocaleString()} documents...`);

    const start = Date.now();

    for (let i = 0; i < totalBatches; i += CONCURRENCY) {
      const parallelBatches = batchIndexes.slice(i, i + CONCURRENCY);

      await Promise.all(
        parallelBatches.map(async (batchNum) => {
          const startIndex = batchNum * BATCH_SIZE;
          const count = Math.min(BATCH_SIZE, TOTAL_RECORDS - startIndex);

          const batch: CrashRecordDocument[] = Array.from({ length: count }, (_, j) => ({
            uuid: uuidv4(),
            index: startIndex + j,
            timestamp,
          }));

          await collection.insertMany(batch);

          if ((startIndex + count) % 100_000 === 0) {
            console.log(`$Inserted ${startIndex + count} / ${TOTAL_RECORDS}`);
          }
        }),
      );
    }
  } catch (err) {
    console.error("Error during insertion: ", err);
  } finally {
    await client.close();
  }
}

insertCrashRecords();
