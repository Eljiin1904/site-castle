import { Database } from "@server/services/database";
import { initConfig } from "./config";

const map: Record<string, () => Promise<void>> = {};

main();

async function main() {
  const scriptName = process.argv[2];
  const scriptFunc = map[scriptName];

  console.log(`Starting ${scriptName}.ts...`);

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  await scriptFunc();

  console.log("Completed script.");

  process.exit();
}
