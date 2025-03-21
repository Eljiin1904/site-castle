import config, { initConfig } from "./config";
import { Database } from "@server/services/database";
import { initHttp } from "./app/initHttp";
import { initSockets } from "./app/initSockets";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { initSiteGames } from "./app/initGames";

main();

async function main() {
  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

  const { port } = config;

  logger.info("Starting site backend...");

  await initConfig();

  logger.info("Initialized config.");

  await Database.manager.init();

  logger.info("Initialized database.");

  //  Initialize Site Games
  await initSiteGames();

  const httpServer = initHttp();

  logger.info("Initialized http.");

  initSockets(httpServer);

  logger.info("Initialized sockets.");

  httpServer.listen(port, () => logger.info(`Site backend listening on port ${port}.`));
}
