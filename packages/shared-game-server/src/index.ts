import { initConfig } from "./config";
import { Database } from "@server/services/database";
import * as Managers from "./managers";

main();

async function main() {
  console.log("Starting game server...");

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  Managers.caseBattles();
  Managers.chestGames();
  Managers.chatRain();
  Managers.double();
  Managers.dice();
  Managers.limbo();
  Managers.mines();
  Managers.races();
  Managers.raffles();
  Managers.crash();

  console.log("Initialized managers.");

  console.log("Game server running.");
}
