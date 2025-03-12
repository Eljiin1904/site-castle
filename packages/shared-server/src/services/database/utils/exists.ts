import { CollationOptions, Filter } from "mongodb";
import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { db } from "./db";
import { dbCollectionsMapping } from "../constants/dbNames";

export async function exists<K extends keyof DatabaseCollections>(
  collection: K,
  filter: Omit<Filter<K>, "_id">,
  options?: {
    collation?: CollationOptions;
  },
) {
  const count = await db(dbCollectionsMapping[collection])
    .collection(collection)
    .countDocuments(filter, {
      limit: 1,
      ...options,
    });
  return count !== 0;
}
