import { addMinutes } from "date-fns";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-inventory",
  restricted: true,
  secure: true,
  callback: async (req, res) => {
    const user = req.user;
    const steamId = user.steamId;
    const tradeUrl = user.meta.steamTradeUrl;

    if (!steamId) {
      throw new HandledError("Steam not linked.");
    }
    if (!tradeUrl) {
      throw new HandledError("Trade URL not set.");
    }

    let cache = await Database.collection("market-inventories").findOne({
      userId: user._id,
    });

    if (!cache) {
      const items = await Market.getInventory({ steamId, tradeUrl });

      cache = {
        _id: Ids.object(),
        timestamp: new Date(),
        userId: user._id,
        items,
        expires: addMinutes(Date.now(), 5),
      };

      await Database.collection("market-inventories").insertOne(cache);
    }

    res.json({
      inventoryId: cache._id,
      items: cache.items,
    });
  },
});
