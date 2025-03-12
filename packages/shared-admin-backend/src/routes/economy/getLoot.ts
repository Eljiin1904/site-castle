import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { Items } from "@core/services/items";
import { ItemDocument } from "@core/types/items/ItemDocument";
import { Strings } from "@core/services/strings";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-loot",
  body: Validation.object({
    searchText: Validation.string(),
    minValue: Validation.number().required("Min value is required."),
    maxValue: Validation.number().required("Max value is required."),
    sortIndex: Validation.index("Sort Index", 1),
    rarities: Validation.array()
      .required()
      .of(Validation.string().required().oneOf(Items.rarities)),
    subTypes: Validation.array()
      .required()
      .of(Validation.string().required().oneOf(Items.subTypes)),
    wears: Validation.array().required().of(Validation.string().required().oneOf(Items.wears)),
    editions: Validation.array()
      .required()
      .of(Validation.string().required().oneOf(Items.editions)),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, minValue, maxValue, sortIndex } = req.body;
    const { rarities, subTypes, wears, editions, limit, page } = req.body;

    const filter: Filter<ItemDocument> = {};
    let sort: Sort = {};

    filter.$and = [];

    if (searchText) {
      filter.$and.push({ slug: { $regex: Strings.toSlug(searchText) } });
    }

    filter.$and.push({
      "loot.tokenValue": { $exists: true, $gte: minValue, $lte: maxValue },
    });

    filter.$and.push({ "loot.rarity": { $in: rarities } });
    filter.$and.push({ subType: { $in: subTypes } });
    filter.$and.push({
      $or: [{ wear: { $in: wears } }, { wear: { $exists: false } }],
    });
    filter.$and.push({ edition: { $in: editions } });

    if (sortIndex === 0) {
      sort = { "loot.tokenValue": 1 };
    } else if (sortIndex === 1) {
      sort = { "loot.tokenValue": -1 };
    }

    const documents = await Database.collection("items")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    const items = documents.map((x) => Items.getLoot(x));

    res.json({ items });
  },
});
