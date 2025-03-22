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

  if (env == "development" || env == "devcloud") {
    console.log("Creating Admin");
    await Database.createCollection("user-sessions", {});
    await initTestAdmin();
  }

  console.log("Initialized database.");

  const httpServer = initHttp();

  console.log("Initialized http.");

  initSockets(httpServer);

  console.log("Initialized sockets.");

  httpServer.listen(port, () => console.log(`Admin backend listening on port ${port}.`));
}
