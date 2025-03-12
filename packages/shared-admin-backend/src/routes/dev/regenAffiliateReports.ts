import { Database } from "@server/services/database";
import { Affiliates } from "@server/services/affiliates";
import { HandledError } from "@server/services/errors";
import { Site } from "@server/services/site";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/regen-affiliate-reports",
  callback: async (req, res) => {
    const settings = await Site.settings.cache();

    if (!settings.maintenance) {
      throw new HandledError("Site must be in maintenance mode.");
    }

    res.json({});

    console.log("Starting regen..");

    await Database.collection("affiliate-reports").deleteMany({});

    console.log("Deleted old reports.");

    const txs = Database.collection("transactions").find(
      { status: "completed", affiliate: { $ne: null } },
      { sort: { timestamp: 1 } },
    );

    const promises = [];

    for await (const tx of txs) {
      promises.push(Affiliates.reportTransaction(tx));

      if (promises.length >= 100) {
        await Promise.all(promises);
        promises.length = 0;
      }
    }

    await Promise.all(promises);

    console.log("Reports regenerated.");
  },
});
