import fs from "fs";
import { Intimal } from "@core/services/intimal";
import { Database } from "@server/services/database";

interface ChestReport {
  _id: string;
  chestName: string;
  chestCost: number;
  soloCount: number;
  battleCount: number;
}

export async function chestReport() {
  const txs = await Database.collection("chest-drops")
    .aggregate<ChestReport>([
      {
        $match: {
          "user.bot": { $exists: false },
          "user.tags": { $ne: "cheeky" },
        },
      },
      {
        $group: {
          _id: "$chest.id",
          chestName: {
            $first: "$chest.displayName",
          },
          chestCost: {
            $first: "$chest.openCost",
          },
          soloCount: {
            $sum: {
              $cond: {
                if: { $eq: ["$source", "game"] },
                then: 1,
                else: 0,
              },
            },
          },
          battleCount: {
            $sum: {
              $cond: {
                if: { $eq: ["$source", "battle"] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ])
    .toArray();

  const shorts = txs.map((x) => ({
    caseName: x.chestName,
    casePrice: Intimal.toDecimal(x.chestCost),
    soloCount: x.soloCount,
    battleCount: x.battleCount,
  }));

  fs.writeFileSync("./src/output/chest-report.csv", jsonToCsv(shorts));
}

function jsonToCsv(items: any[]) {
  const header = Object.keys(items[0] as Record<string, any>);
  const headerString = header.join(",");
  // handle null or undefined values here
  const replacer = (key: any, value: any) => value ?? "";
  const rowItems = items.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(","),
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join("\r\n");
  return csv;
}
