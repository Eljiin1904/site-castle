import { beforeAll, afterAll } from "vitest";
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import { MongoClient } from "mongodb";

import config, { initConfig } from "../src/config";
import { Database } from "@server/services/database";
import { initHttp } from "../src/app/initHttp";

import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
// import { initSiteGames } from "#app/app/initGames";
import http from "http";
import { initTestAdmin } from "#app/app/initTestAdmin";
import { initSockets } from "#app/app/initSockets";
import { initTestAdmin } from "#app/app/initTestAdmin";

let mongoUri: string;
let client: MongoClient;
let httpServer: http.Server;

beforeAll(async () => {
  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

  const { port, env } = config;

  logger.info("Starting admin backend...");

  // secrets override needed for integration testing
  const configOverrides: Record<string, string> = {
    hcaptchaSecret: "0x0000000000000000000000000000000000000000",
  };

  await initConfig(configOverrides);

  logger.info("Initialized config.");

  await Database.manager.init();

  // Database.createCollection("user-sessions", {});

  // await initSiteGames();

  if (env == "development" || env == "devcloud") {
    console.log("Creating Admin");
    await initTestAdmin();
  }
  //
  logger.info("Initialized database.");

  httpServer = await initHttp();

  logger.info("Initialized http.");

  // initSockets(httpServer);

  logger.info("Initialized sockets.");

  new Promise((resolve, reject) => {
    httpServer.listen(port, () => {
      logger.info(`Site backend listening on port ${port}.`);
      resolve(httpServer);
    });
  });
  httpServer.on("error", (err) => {
    if (err.name === "Error") {
      console.warn(`Port ${port} already in use. Skipping server start.`);
    }
  });
}, 30_000);

afterAll(async () => {
  console.log("shutting down MongoDB containers");
  if (httpServer) {
    await httpServer.close();
  }
});

export { client, mongoUri };
