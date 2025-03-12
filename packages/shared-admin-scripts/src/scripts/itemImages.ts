import axios from "axios";
import sharp from "sharp";
import { ItemDocument } from "@core/types/items/ItemDocument";
import { Database } from "@server/services/database";
import { Cloud } from "@server/services/cloud";
import existingJson from "#app/input/items.json";

export async function itemImages() {
  const existingItems = existingJson as ItemDocument[];

  let matchCount = 0;

  for (const item of existingItems) {
    const hashName = item.marketHashName.replace(/ - .+$/, "");

    const match = (await (Database as any).collection("items-raw").findOne({
      market_hash_name: hashName,
    })) as ItemData | null;

    if (!match) {
      continue;
    }

    matchCount++;

    if (matchCount % 100 === 0) {
      console.log(matchCount);
    }

    await fetchImage({
      slug: item.slug,
      url: match.image_url_steam,
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
