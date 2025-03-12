import { ChestDropDocument } from "@core/types/chests/ChestDropDocument";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";

export default () => System.tryCatch(main)();

async function main() {
  watch();
}

function watch() {
  const changeStream = Database.collection("chest-drops").watch([
    {
      $match: {
        operationType: "insert",
        "fullDocument.user.bot": { $exists: false },
      },
    },
  ]);

  changeStream.on("change", (e) => {
    if ("fullDocument" in e && e.fullDocument) {
      System.tryCatch(processDrop)(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    console.error(err.message);
    changeStream.removeAllListeners();
    watch();
  });
}

async function processDrop(drop: ChestDropDocument) {
  await Chests.reportDrop(drop);
}
