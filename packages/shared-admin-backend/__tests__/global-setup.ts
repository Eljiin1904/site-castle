// test/global-setup.ts
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import fs from "fs/promises";
import path from "path";

async function sleep(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}
const GLOBAL_STATE_FILE = path.resolve(__dirname, "global-setup.json");
let teardownHappened = false;

export default async function () {
  const container = await new MongoDBContainer("mongo:8.0.5")
    .withStartupTimeout(6000)
    .withCommand(["--replSet", "rs0"])
    .start();

  const mongoUri = container.getConnectionString();
  console.log("Mongo ");
  console.log(mongoUri);
  // Save state for teardown or for setupFiles to read
  await fs.writeFile(GLOBAL_STATE_FILE, JSON.stringify({ mongoUri }), "utf-8");

  // Expose URI as env var
  process.env.MONGO_URI = mongoUri + "/?directConnection=true";

  // Store container instance for teardown
  (globalThis as any).__MONGO_CONTAINER__ = container;

  return async () => {
    if (teardownHappened) {
      throw new Error("teardown called twice");
    }
    teardownHappened = true;

    const container = (globalThis as any).__MONGO_CONTAINER__;
    if (container) {
      await container.stop();
    }

    await sleep(25);
  };
}
