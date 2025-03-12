import { differenceInSeconds, minutesToMilliseconds } from "date-fns";
import { Utility } from "@core/services/utility";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Market } from "@server/services/market";
import { Ids } from "@server/services/ids";
import { Site } from "@server/services/site";

export default () => System.tryCatch(main)();

async function main() {
  await Database.collection("market-items").deleteMany();

  while (true) {
    await System.tryCatch(handleSync)();
    await Utility.wait(minutesToMilliseconds(1));
  }
}

async function handleSync() {
  const now = new Date();
  const writes = [];

  const { infos, currentMarket, newMarket } = await fetchData();

  for (const item of newMarket) {
    if (item.tokenValue < Market.minWithdraw) {
      continue;
    }

    const existing = currentMarket[item.provider + item.id];
    const info = infos[item.name];

    if (existing) {
      writes.push({
        updateOne: {
          filter: { _id: existing._id },
          update: {
            $set: {
              tokenValue: item.tokenValue,
              usdValue: item.usdValue,
              reference: item.reference,
              lastSyncDate: now,
            },
          },
        },
      });
    } else if (info) {
      writes.push({
        insertOne: {
          document: {
            _id: Ids.long(),
            marketHashName: info.marketHashName,
            slug: info.slug,
            type: info.type,
            subType: info.subType,
            wear: info.wear,
            edition: info.edition,
            baseName: info.baseName,
            styleName: info.styleName,
            symbol: info.symbol,
            provider: item.provider,
            externalId: item.id,
            tokenValue: item.tokenValue,
            usdValue: item.usdValue,
            reference: item.reference,
            lastSyncDate: now,
          },
        },
      });
    }
  }

  const batchSize = 100;
  const batchCount = Math.ceil(writes.length / batchSize);

  for (let i = 0; i < batchCount; i++) {
    const start = i * batchSize;
    const end = Math.min(start + batchSize, writes.length);
    const batch = writes.slice(start, end);

    await Database.collection("market-items").bulkWrite(batch, {
      ordered: false,
    });

    await Utility.wait(50);
  }

  await Database.collection("market-items").deleteMany({
    lastSyncDate: { $ne: now },
  });

  // TODO: Remove logging
  console.log(
    `Market synced in ${differenceInSeconds(Date.now(), now)} seconds.`,
  );

  await Site.setMeta({
    key: "market",
    value: {
      totalCount: newMarket.length,
      totalUsd: newMarket.reduce((acc, x) => (acc += x.usdValue), 0),
    },
  });
}

async function fetchData() {
  const infos = await Database.collection("items").find().toArray();

  const currentMarket = await Database.collection("market-items")
    .find({}, { projection: { _id: 1, provider: 1, externalId: 1 } })
    .toArray();

  const newMarket = await Market.getMarket();

  return {
    infos: Object.fromEntries(infos.map((x) => [x.marketHashName, x])),
    currentMarket: Object.fromEntries(
      currentMarket.map((x) => [x.provider + x.externalId, x]),
    ),
    newMarket,
  };
}
