import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Strings } from "@core/services/strings";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-cases",
  secure: false,
  body: Validation.object({
    searchText: Validation.string(),
    priceIndex: Validation.index("Price Index", 6),
    sortIndex: Validation.index("Sort Index", 4),
    limit: Validation.limit(),
    page: Validation.page(),
    withItems: Validation.boolean(),
  }),
  callback: async (req, res) => {
    const { searchText, priceIndex, sortIndex, limit, page, withItems } = req.body;

    const filter: Filter<ChestDocument> = {};
    let sort: Sort = {};

    filter.kind = "case";
    filter.disabled = false;

    if (searchText) {
      filter.slug = { $regex: Strings.toSlug(searchText) };
    }

    if (priceIndex === 0) {
      // all prices
    } else if (priceIndex === 1) {
      filter.openCost = {
        $lte: Intimal.fromDecimal(10),
      };
    } else if (priceIndex === 2) {
      filter.openCost = {
        $gte: Intimal.fromDecimal(10),
        $lte: Intimal.fromDecimal(25),
      };
    } else if (priceIndex === 3) {
      filter.openCost = {
        $gte: Intimal.fromDecimal(25),
        $lte: Intimal.fromDecimal(50),
      };
    } else if (priceIndex === 4) {
      filter.openCost = {
        $gte: Intimal.fromDecimal(50),
        $lte: Intimal.fromDecimal(100),
      };
    } else if (priceIndex === 5) {
      filter.openCost = {
        $gte: Intimal.fromDecimal(100),
        $lte: Intimal.fromDecimal(250),
      };
    } else if (priceIndex === 6) {
      filter.openCost = {
        $gte: Intimal.fromDecimal(250),
      };
    }

    if (sortIndex === 0) {
      sort = { popularity: -1 };
    } else if (sortIndex === 1) {
      sort = { openCost: -1 };
    } else if (sortIndex === 2) {
      sort = { openCost: 1 };
    } else if (sortIndex === 3) {
      sort = { createDate: -1 };
    } else if (sortIndex === 4) {
      sort = { createDate: 1 };
    }

    const projection: Record<string, 1> = {
      slug: 1,
      displayName: 1,
      imageId: 1,
      openCost: 1,
    };

    if (withItems) {
      projection.items = 1;
    }

    const chests = await Database.collection("chests")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
        projection,
      })
      .toArray();

    res.json({ chests });
  },
});
