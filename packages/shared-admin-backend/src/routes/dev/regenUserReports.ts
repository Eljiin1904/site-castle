import { Database } from "@server/services/database";
import { Users } from "@server/services/users";
import { HandledError } from "@server/services/errors";
import { Site } from "@server/services/site";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/regen-user-reports",
  callback: async (req, res) => {
    const settings = await Site.settings.cache();

    if (!settings.maintenance) {
      throw new HandledError("Site must be in maintenance mode.");
    }

    res.json({});

    console.log("Starting regen..");

    await Database.collection("user-reports").deleteMany({});

    console.log("Deleted old reports.");

    const txs = Database.collection("transactions").find(
      { status: "completed" },
      { sort: { timestamp: 1 } },
    );

    const promises = [];

    for await (const tx of txs) {
      promises.push(Users.reportTransaction(tx));

      if (promises.length >= 100) {
        await Promise.all(promises);
        promises.length = 0;
      }
    }

    await Promise.all(promises);

    console.log("Reports regenerated.");
  },
});
