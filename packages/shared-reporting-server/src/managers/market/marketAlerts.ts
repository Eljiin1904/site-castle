import { minutesToMilliseconds, subMinutes } from "date-fns";
import { Utility } from "@core/services/utility";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Slack } from "@server/services/slack";
import { Market } from "@server/services/market";
import config from "#app/config";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(15));

async function main() {
  System.tryCatch(handlePendingWithdraws)();
  System.tryCatch(handleBalances)();
}

async function handlePendingWithdraws() {
  const count = await Database.collection("transactions").countDocuments({
    kind: "withdraw-skin",
    status: "pending",
    timestamp: { $lt: subMinutes(Date.now(), 30) },
  });

  if (count > 0) {
    await Slack.ping(
      `:warning: We have had \`${count}\` skin withdraw(s) pending for more than 30 minutes.`,
    );
  }
}

async function handleBalances() {
  if (config.env !== "production") {
    return;
  }

  const balances = await Market.getBalances();

  for (const { provider, balance } of balances) {
    const minBalance = 5000;

    if (balance < minBalance) {
      await Slack.ping(
        `:warning: Skin balance \`${provider}\` is below \`$${minBalance.toLocaleString()}\`.`,
      );

      await Utility.wait(5000); // lets not spam if multiple are low
    }
  }
}
