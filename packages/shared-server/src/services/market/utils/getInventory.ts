import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";
import { Items } from "@core/services/items";
import { System } from "#server/services/system";
import { Database } from "#server/services/database";
import { Site } from "#server/services/site";
import { managers } from "../constants/managers";

export async function getInventory({
  steamId,
  tradeUrl,
}: {
  steamId: string;
  tradeUrl: string;
}) {
  const settings = await Site.settings.cache();

  const options = { steamId, tradeUrl };

  const getters = managers.map(async (provider) => {
    if (!settings[`${provider.name}Enabled`]) {
      return { items: [] };
    }

    try {
      return await provider.manager.getInventory(options);
    } catch (err) {
      System.handleError(err);
      return { items: [] };
    }
  });

  const results = await Promise.all(getters);

  const inventories = results.map((x, i) => ({
    provider: managers[i].name,
    items: x.items,
  }));

  const itemNames = new Set<string>();

  for (const inventory of inventories) {
    for (const item of inventory.items) {
      itemNames.add(item.name);
    }
  }

  const documents = await Database.collection("items")
    .find({ marketHashName: { $in: [...itemNames.values()] } })
    .toArray();

  const assetMap: Record<string, MarketInventoryItem> = {};

  for (const inventory of inventories) {
    for (const item of inventory.items) {
      const document = documents.find((x) => x.marketHashName === item.name);

      if (!document) {
        continue;
      }

      if (!assetMap[item.assetId]) {
        assetMap[item.assetId] = {
          ...Items.getBasicItem(document),
          marketHashName: item.name,
          assetId: item.assetId,
          prices: [],
          bestPrice: 0,
        };
      }

      assetMap[item.assetId].prices.push({
        provider: inventory.provider,
        tokenValue: item.tokenValue,
        usdValue: item.usdValue,
        reference: item.reference,
      });
    }
  }

  const items = Object.values(assetMap);

  for (const item of items) {
    item.prices.sort((a, b) => b.tokenValue - a.tokenValue);
    item.bestPrice = item.prices[0]?.tokenValue || 0;
  }

  return items;
}
