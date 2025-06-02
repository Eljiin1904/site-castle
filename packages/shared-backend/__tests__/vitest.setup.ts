import { beforeAll, afterAll } from "vitest";
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import { MongoClient } from "mongodb";

import config, { initConfig } from "../src/config";
import { Database } from "@server/services/database";
import { initHttp } from "../src/app/initHttp";
import { initSockets } from "../src/app/initSockets";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { initSiteGames } from "#app/app/initGames";
import http from "http";

let mongoUri: string;
let client: MongoClient;
let httpServer: http.Server;

beforeAll(async () => {
  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

  const { port } = config;

  logger.info("Starting site backend...");

  // secrets override needed for integration testing
  const configOverrides: Record<string, string> = {
    hcaptchaSecret: "0x0000000000000000000000000000000000000000",
  };

  await initConfig(configOverrides);

  logger.info("Initialized config.");

  await Database.manager.init();

  Database.createCollection("user-sessions", {});

  await initSiteGames();

  logger.info("Initialized database.");

  httpServer = initHttp();

  logger.info("Initialized http.");

  initSockets(httpServer);

  logger.info("Initialized sockets.");
  const enableExist = await Database.collection("site-settings").findOne({
    _id: "doubleEnabled",
    value: true,
  });
  if (!enableExist) {
    await Database.collection("site-settings").insertMany([
      {
        _id: "doubleEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "diceEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "limboEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "minesEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "doubleXpRate",
        value: 1,
        lastUpdateDate: new Date(),
      },
      {
        _id: "affiliatesEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "betHighrollerThreshold",
        value: 100,
        lastUpdateDate: new Date(),
      },
      {
        _id: "chatEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
      {
        _id: "rainEnabled",
        value: true,
        lastUpdateDate: new Date(),
      },
    ]);
  }

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
    //   await new Promise<void>((resolve, reject) => {
    //     httpServer.close((err: any) => {
    //       if (err) reject(err);
    //       else resolve();
    //     });
    //   });
  }
});

export { client, mongoUri };
