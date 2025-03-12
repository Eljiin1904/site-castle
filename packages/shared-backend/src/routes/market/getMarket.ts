import { Filter, Sort } from "mongodb";
import { subMinutes } from "date-fns";
import { MarketItemDocument } from "@core/types/market/MarketItemDocument";
import { Items } from "@core/services/items";
import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
import { Database } from "@server/services/database";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-market",
  secure: false,
  body: Validation.object({
    searchText: Validation.string(),
    minPrice: Validation.number().required(),
    maxPrice: Validation.number().required(),
    subType: Validation.string().oneOf(Items.subTypes),
    wear: Validation.string().oneOf(Items.wears),
    provider: Validation.string().oneOf(Market.providers),
    sortIndex: Validation.index("Sort Index", 3),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, minPrice, maxPrice, subType, wear, provider, sortIndex, limit, page } =
      req.body;

    const filter: Filter<MarketItemDocument> = {};
    let sort: Sort = {};

    filter.lastSyncDate = { $gt: subMinutes(Date.now(), 15) };
    filter.tokenValue = { $gte: minPrice, $lte: maxPrice };

    if (searchText) {
      filter.slug = { $regex: Strings.toSlug(searchText) };
    }

    if (subType) {
      filter.subType = subType;
    }

    if (wear) {
      filter.wear = wear;
    }

    if (provider) {
      filter.provider = provider;
    }

    if (sortIndex === 0) {
      sort = { tokenValue: -1 };
    } else if (sortIndex === 1) {
      sort = { tokenValue: 1 };
    } else if (sortIndex === 2) {
      sort = { baseName: 1 };
    } else if (sortIndex === 3) {
      sort = { baseName: -1 };
    }

    const items = await Database.collection("market-items")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ items });
  },
});
