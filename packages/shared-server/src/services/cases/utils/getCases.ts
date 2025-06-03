import { Filter, Sort } from "mongodb";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Intimal } from "@core/services/intimal";
import { Strings } from "@core/services/strings";
import { Database } from "#server/services/database";

export async function getCases({
  filter,
  searchText,
  priceIndex,
  sortIndex,
  minVolatility,
  maxVolatility,
  limit,
  page,
  withItems,
}: {
  filter: Filter<ChestDocument>;
  searchText?: string;
  priceIndex: number;
  sortIndex: number;
  minVolatility: number;
  maxVolatility: number;
  limit: number;
  page: number;
  withItems?: boolean;
}) {
  let sort: Sort = {};

  filter.kind = "case";
  filter.disabled = false;

  if (searchText) {
    filter.slug = { $regex: Strings.toSlug(searchText) };
  }

  filter.volatility = { $gte: minVolatility, $lte: maxVolatility };

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

  if (sortIndex === 0 || sortIndex === 1) {
    sort = { popularity: -1 };
  } else if (sortIndex === 2) {
    sort = { openCost: -1 };
  } else if (sortIndex === 3) {
    sort = { openCost: 1 };
  } else if (sortIndex === 4) {
    sort = { createDate: -1 };
  } else if (sortIndex === 5) {
    sort = { createDate: 1 };
  } else if (sortIndex === 6) {
    sort = { volatility: -1 };
  } else if (sortIndex === 7) {
    sort = { volatility: 1 };
  }

  const projection: Record<string, 1> = {
    slug: 1,
    displayName: 1,
    imageId: 1,
    openCost: 1,
    volatility: 1,
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

  return chests;
}
