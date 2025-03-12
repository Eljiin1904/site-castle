import { minutesToMilliseconds } from "date-fns";
import { Utility } from "@core/services/utility";
import { System } from "@server/services/system";
import config from "#app/config";
import { crawlUsers } from "./helpers/crawlUsers";
import { crawlLinked } from "./helpers/crawlLinked";
import { crawlActivePlayers } from "./helpers/crawlActivePlayers";
import { crawlActiveHighRollers } from "./helpers/crawlActiveHighRollers";

export default () => System.tryCatch(main)();

async function main() {
  await System.tryCatch(crawlLinked)();
  await System.tryCatch(crawlActivePlayers)();
  await System.tryCatch(crawlActiveHighRollers)();
  await System.tryCatch(crawlUsers)();

  if (config.env !== "production") {
    await Utility.wait(minutesToMilliseconds(1));
  }

  await main();
}
