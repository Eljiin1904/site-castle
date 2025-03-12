import { afterAll, beforeAll } from "vitest";
import { setupMongoServer, stopMongoServer } from "./testServer";
beforeAll(async () => {
  await setupMongoServer();
});

afterAll(async () => {
  await stopMongoServer();
});
