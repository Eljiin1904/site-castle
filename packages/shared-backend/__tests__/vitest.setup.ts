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

  await initSiteGames();

  logger.info("Initialized database.");

  httpServer = await initHttp();

  logger.info("Initialized http.");

  initSockets(httpServer);

  logger.info("Initialized sockets.");

  const settings = [
    { _id: "doubleEnabled", value: true },
    { _id: "diceEnabled", value: true },
    { _id: "limboEnabled", value: true },
    { _id: "minesEnabled", value: true },
    { _id: "doubleXpRate", value: 1 },
    { _id: "affiliatesEnabled", value: true },
    { _id: "betHighrollerThreshold", value: 100 },
    { _id: "chatEnabled", value: true },
    { _id: "rainEnabled", value: true },
    { _id: "blackjackEnabled", value: true },
  ];

  const now = new Date();

  await Promise.all(
    settings.map((setting) =>
      Database.collection("site-settings").updateOne(
        { _id: setting._id as any },
        {
          $set: {
            value: setting.value,
            lastUpdateDate: now,
          },
        },
        { upsert: true },
      ),
    ),
  );

  new Promise((resolve, reject) => {
    httpServer.listen(port, () => {
      logger.info(`Site backend listening on port ${port}.`);
      resolve(httpServer);
    });
  });
  // httpServer.on("error", (err) => {
  //   if (err.name === "Error") {
  //     console.warn(`Port ${port} already in use. Skipping server start.`);
  //   }
  // });
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
