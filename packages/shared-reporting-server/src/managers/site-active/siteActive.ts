import { subMinutes } from "date-fns";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Site } from "@server/services/site";

export default () => setInterval(System.tryCatch(main), 5000);

async function main() {
  const activeCount = await Database.collection("users").countDocuments({
    "meta.activeDate": { $gt: subMinutes(Date.now(), 60) },
  });

  await Site.setMeta({
    key: "activeCount",
    value: activeCount,
  });
}
