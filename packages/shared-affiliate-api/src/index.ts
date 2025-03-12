import config, { initConfig } from "./config";
import { Database } from "@server/services/database";
import { initHttp } from "./app/initHttp";

main();

async function main() {
  const { port } = config;

  console.log("Starting ipn server...");

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  const httpServer = initHttp();

  console.log("Initialized http.");

  httpServer.listen(port, () =>
    console.log(`Affiliate API listening on port ${port}.`),
  );
}
