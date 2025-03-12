import { Database } from "@server/services/database";
import { Market } from "@server/services/market";

export async function checkItems() {
  const items = await Market.getMarket();

  const nope = [];

  for (const item of items) {
    const document = await Database.collection("items").findOne({
      marketHashName: item.name,
    });

    if (!document) {
      nope.push(item.name);
      //console.log(item.name);
    }
  }

  console.log(nope.length + " / " + items.length);
}
