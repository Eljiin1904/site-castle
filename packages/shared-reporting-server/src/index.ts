import { initConfig } from "./config";
import { Database } from "@server/services/database";
import * as Managers from "./managers";

main();

async function main() {
  console.log("Starting master server...");

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  Managers.caseBattles();
  Managers.chestPopularity();
  Managers.chestReports();
  Managers.cryptoAlerts();
  Managers.cryptoRates();
  Managers.cryptoSweeps();
  Managers.databaseIndexes();
  Managers.syncMarketItems();
  Managers.syncMarketWithdraws();
  Managers.marketAlerts();
  Managers.siteActive();
  Managers.siteHoliday();
  Managers.siteRace();
  Managers.siteStats();
  Managers.siteSettings();
  Managers.selfExclude();
  Managers.transactions();

  console.log("Initialized managers.");

  console.log("Master server running.");
}
