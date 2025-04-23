import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Transactions } from "@server/services/transactions";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Users } from "@server/services/users";
import { Affiliates } from "@server/services/affiliates";
import { Rewards } from "@server/services/rewards";
import { CustomerIO } from "@server/services/customer-io";

export default () => System.tryCatch(main)();

async function main() {
  watch();
}

function watch() {
  const changeStream = Database.collection("transactions").watch(
    [
      {
        $match: {
          operationType: "update",
          "updateDescription.updatedFields.status": "completed",
        },
      },
    ],
    {
      fullDocument: "updateLookup",
    },
  );

  changeStream.on("change", (e) => {
    if (e.operationType === "update" && e.fullDocument) {
      processTransaction(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    System.handleError(err);
    changeStream.removeAllListeners();
    watch();
  });
}

function processTransaction(tx: TransactionDocument) {
  System.tryCatch(Transactions.reportTransaction)(tx);
  System.tryCatch(Users.reportTransaction)(tx);
  // System.tryCatch(Affiliates.afterTransaction)(tx);
  System.tryCatch(Affiliates.afterCampaignTransaction)(tx);
  System.tryCatch(Rewards.afterTransaction)(tx);
  System.tryCatch(CustomerIO.afterTransaction)(tx);
}
