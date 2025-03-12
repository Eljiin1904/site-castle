import axios from "axios";
import sharp from "sharp";
import { Strings } from "@core/services/strings";
import { ItemRarity } from "@core/types/items/ItemRarity";
import { ItemEdition } from "@core/types/items/ItemEdition";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Cloud } from "@server/services/cloud";

export async function syncItems() {
  const items = (Database as any).collection("items-raw").find();

  let counter = 0;

  for await (const item of items) {
    if (!["Skin", "Sticker"].includes(item.category.name)) {
      continue;
    }

    if (item.paintkits.length <= 1) {
      await handleIteration(item);
    } else {
      await handleIteration(item);
      for (const paint of item.paintkits) {
        await handleIteration(item, paint);
      }
    }

    counter++;

    if (counter % 100 === 0) {
      console.log(`Progress: ${counter}`);
    }
  }
}

async function handleIteration(
  item: ItemData,
  paint?: {
    name: string;
    phase: string;
  },
) {
  let marketHashName = item.market_hash_name;

  if (paint) {
    marketHashName += ` - ${paint.phase}`;
  }

  const existing = await Database.collection("items").findOne({
    marketHashName,
  });

  if (existing) {
    const old = existing as unknown as {
      lootValue: number;
      lootRarity: ItemRarity;
      lootCount: number;
    };

    await Database.collection("items").replaceOne(
      {
        _id: existing._id,
      },
      {
        marketHashName: existing.marketHashName,
        slug: existing.slug,
        type: existing.type,
        subType: existing.subType,
        baseName: existing.baseName,
        styleName: existing.styleName,
        wear: existing.wear,
        symbol: existing.symbol,
        edition: existing.edition,
        loot: {
          tokenValue: old.lootValue,
          rarity: old.lootRarity,
          count: old.lootCount,
        },
      },
    );
  } else {
    const slug = Strings.toSlug(marketHashName);

    await fetchImage({
      slug,
      url: item.image_url_steam,
    });

    let subType: ItemSubType;
    if (item.type.name === "Machinegun") {
      subType = "LMG";
    } else {
      subType = item.type.name as any;
    }

    let edition: ItemEdition;
    if (item.souvenir) {
      edition = "Souvenir";
    } else if (item.stattrak) {
      edition = "StatTrak™";
    } else {
      edition = "Standard";
    }

    let baseName: string = "";
    let styleName: string = "";
    let symbol: string | null = null;

    if (item.weapon?.name) {
      baseName = item.weapon.name;
      styleName = item.paintkits[0]?.name;

      if (paint?.phase) {
        styleName += " " + paint.phase;
      }

      symbol = getWearSymbol(item.exterior?.name as any);

      if (marketHashName.startsWith("★")) {
        baseName = "★ " + baseName;
      }
    } else if (marketHashName.startsWith("Sticker | ")) {
      const match = marketHashName.match(/\(([^)]+)\)/);

      symbol = match ? match[1] : null;

      baseName = marketHashName;
      baseName = baseName.replace("Sticker | ", "");

      if (symbol) {
        baseName = baseName.replace(` (${symbol})`, "");
      }

      styleName = "Sticker";
    } else {
      console.log(item.type.name + ": " + marketHashName);
      return;
    }

    await Database.collection("items").insertOne({
      _id: Ids.long(),
      marketHashName,
      slug,
      type: item.category.name as any,
      subType,
      edition,
      wear: item.exterior?.name as any,
      baseName,
      styleName,
      symbol,
      loot: null,
    });
  }
}

async function fetchImage({ slug, url }: { slug: string; url: string }) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const body = await sharp(Buffer.from(res.data, "binary")).png().toBuffer();

  await Cloud.uploadObject({
    key: `items/${slug}.png`,
    body,
    contentType: "image/png",
  });
}

function getWearSymbol(wear: string | undefined) {
  switch (wear) {
    case "Factory New":
      return "FN";
    case "Minimal Wear":
      return "MW";
    case "Field-Tested":
      return "FT";
    case "Well-Worn":
      return "WW";
    case "Battle-Scarred":
      return "BS";
    default:
      return null;
  }
}

type ItemData = {
  market_hash_name: string;
  image_url: string;
  image_url_steam: string;
  stattrak: boolean;
  souvenir: boolean;
  type: {
    name: string;
  };
  category: {
    name: string;
  };
  exterior: {
    name: string;
  };
  tint: {
    name: string;
  };
  weapon: {
    name: string;
  };
  tournament: {
    name: string;
  };
  team: {
    name: string;
  };
  player: {
    name: string;
  };
  rarity: {
    name: string;
  };
  paintkits: Array<{
    name: string;
    phase: string;
  }>;
  containers: Array<{
    name: string;
  }>;
  collections: Array<{
    name: string;
  }>;
};
