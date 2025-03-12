import { minutesToMilliseconds } from "date-fns";
import { System } from "@server/services/system";
import config from "#app/config";
import { sweepUtxoOmnibus } from "./helpers/sweepUtxoOmnibus";
import { sweepAccountOmnibus } from "./helpers/sweepAccountOmnibus";
import { sweepAccountVaults } from "./helpers/sweepAccountVaults";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(5));

async function main() {
  if (!["staging", "production"].includes(config.env)) {
    return;
  }

  await System.tryCatch(sweepUtxoOmnibus)();
  await System.tryCatch(sweepAccountVaults)();
  await System.tryCatch(sweepAccountOmnibus)();
}
