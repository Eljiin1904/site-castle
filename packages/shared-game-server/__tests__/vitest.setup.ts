import { beforeAll, afterAll } from "vitest";
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import * as Managers from "../src/managers";

import { MongoClient } from "mongodb";
import { Database } from "@server/services/database";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import http from "http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { initConfig } from "#app/config";

let mongoUri: string;
let client: MongoClient;
let httpServer: http.Server;
getServerLogger;
beforeAll(async () => {
  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

  logger.info("Starting site backend...");

  // secrets override needed for integration testing
  const configOverrides: Record<string, string> = {
    hcaptchaSecret: "0x0000000000000000000000000000000000000000",
  };

  await initConfig();

  logger.info("Initialized config.");

  await Database.manager.init();
  Managers.caseBattles();
  Managers.chestGames();
  Managers.chatRain();
  // Managers.double();
  Managers.dice();
  Managers.limbo();
  Managers.mines();
  Managers.blackjack();
  Managers.races();
  Managers.raffles();
  // Managers.crash();

  console.log("Initialized managers.");

  console.log("Game server running.");
}, 30_000);

export { client, mongoUri };
