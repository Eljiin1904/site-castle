import { beforeAll, afterAll } from "vitest";
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import { MongoClient } from "mongodb";

import config, { initConfig } from "../src/config";
import { Database } from "@server/services/database";
import { initHttp } from "../src/app/initHttp";
import { initSockets } from "../src/app/initSockets";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

let mongoContainer: StartedMongoDBContainer;
let mongoUri: string;
let client: MongoClient;

beforeAll(async () => {
  console.log("Starting MongoDB container");

  // Start MongoDB container with replica set enabled
  // picked a specific version because the lightweight mongo:latest excludes mongosh
  mongoContainer = await new MongoDBContainer("mongo:8.0.5")
    .withStartupTimeout(6000)
    .withCommand(["--replSet", "rs0"])
    .start();

  // sleep for 1 second1 to ensure Mongo is started before initiating replica set
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await mongoContainer.exec('mongosh --quiet --eval "rs.initiate();"');
  console.log("MongoDB replica set initiated");

  mongoUri = mongoContainer.getConnectionString();
  console.log("MongoDB URL: " + mongoUri);

  client = new MongoClient(mongoUri + "/?directConnection=true");
  await client.connect();
  console.log("MongoDB client connected");

  // Store globally for tests
  process.env.DB_URI = mongoUri + "?directConnection=true";

  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

  const { port } = config;

  logger.info("Starting site backend...");

  await initConfig();

  logger.info("Initialized config.");

  await Database.manager.init();

  logger.info("Initialized database.");

  const httpServer = initHttp();

  logger.info("Initialized http.");

  initSockets(httpServer);

  logger.info("Initialized sockets.");

  httpServer.listen(port, () => logger.info(`Site backend listening on port ${port}.`));
}, 30_000);

afterAll(async () => {
  console.log("shutting down MongoDB containers");
  await client.close();
  await mongoContainer.stop();
});

export { client, mongoUri };
