import config, { initConfig } from "./config";
import { Database } from "@server/services/database";
import { initHttp } from "./app/initHttp";
import { initSockets } from "./app/initSockets";
import { initTestAdmin } from "./app/initTestAdmin";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import { RedisService } from "@server/services/redis/RedisService";

main();

async function main() {
  const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_ADMIN_BACKEND });

  const { port, env } = config;

  logger.info("Starting admin backend...");

  await initConfig();

  logger.info("Initialized config.");

  await Database.manager.init();

  if (env == "development" || env == "devcloud" || env == "staging") {
    logger.info("Creating Admin");
    try {
      await initTestAdmin();
      logger.info("Created Test Admin -> testAdmin@pidwin.com");
    } catch {
      logger.error("Unable to create Test Admin");
    }
  }

  logger.info("Initialized database.");

  logger.info("Initializing Redis.");

  await RedisService.initialize();

  const httpServer = await initHttp();

  logger.info("Initialized http.");

  initSockets(httpServer);

  logger.info("Initialized sockets.");

  httpServer.listen(port, () => console.log(`Admin backend listening on port ${port}.`));
}
