import { minutesToMilliseconds, subMinutes } from "date-fns";
import { Utility } from "@core/services/utility";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Slack } from "@server/services/slack";
import { Cryptos } from "@server/services/cryptos";
import config from "#app/config";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(15));

async function main() {
  System.tryCatch(handlePendingWithdraws)();
  System.tryCatch(handleGasStation)();
  System.tryCatch(handleHotWallet)();
}

async function handlePendingWithdraws() {
  const count = await Database.collection("transactions").countDocuments({
    kind: "withdraw-crypto",
    status: "pending",
    timestamp: { $lt: subMinutes(Date.now(), 30) },
  });

  if (count > 0) {
    await Slack.ping(
      `:warning: We have had \`${count}\` crypto withdraw(s) pending for more than 30 minutes.`,
    );
  }
}

async function handleGasStation() {
  if (config.env !== "production") {
    return;
  }

  const vault = await Cryptos.fireblocks().getVaultAccountById(
    config.fireblocksGasStationId,
  );

  for (const asset of vault.assets || []) {
    const crypto = Cryptos.infos.find(
      (x) => x.assetId === asset.id && ["ETH", "TRX"].includes(x.kind),
    );

    if (!crypto) {
      continue;
    }

    const usdRate = await Cryptos.getRate(crypto.symbol);
    const balance = Number.parseFloat(asset.available || "0") * usdRate;
    const minBalance = 1000;

    if (balance < minBalance) {
      await Slack.ping(
        `:warning: Gas Station \`${crypto.kind.replace(
          "_",
          " ",
        )}\` balance is below \`$${minBalance.toLocaleString()}\`.`,
      );

      await Utility.wait(5000); // lets not spam if multiple are low
    }
  }
}

async function handleHotWallet() {
  if (config.env !== "production") {
    return;
  }

  const vault = await Cryptos.fireblocks().getVaultAccountById(
    config.fireblocksWithdrawId,
  );

  for (const asset of vault.assets || []) {
    const crypto = Cryptos.infos.find(
      (x) => x.assetId === asset.id && x.canWithdraw,
    );

    if (!crypto) {
      continue;
    }

    const usdRate = await Cryptos.getRate(crypto.symbol);
    const balance = Number.parseFloat(asset.available || "0") * usdRate;
    const minBalance = 5000;

    if (balance < minBalance) {
      await Slack.ping(
        `:warning: Withdraw vault \`${crypto.kind.replace(
          "_",
          " ",
        )}\` balance is below \`$${minBalance.toLocaleString()}\`.`,
      );

      await Utility.wait(5000); // lets not spam if multiple are low
    }
  }
}
