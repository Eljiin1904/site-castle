import config, { initConfig } from "./config";
import { Database } from "@server/services/database";
import { initHttp } from "./app/initHttp";
import { initSockets } from "./app/initSockets";
import { initTestAdmin } from "./app/initTestAdmin";

main();

async function main() {
  const { port, env } = config;

  console.log("Starting admin backend...");

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  const httpServer = initHttp();

  console.log("Initialized http.");

  initSockets(httpServer);

  if (env == "development" || env == "devcloud") {
    console.log("Creating Admin: tester@pidwin.com");
    await initTestAdmin();
  }

  console.log("Initialized sockets.");

  httpServer.listen(port, () => console.log(`Admin backend listening on port ${port}.`));
}
