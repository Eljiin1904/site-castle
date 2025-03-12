import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { db } from "./db";
import { dbCollectionsMapping } from "../constants/dbNames";

export async function hasCollection<K extends keyof DatabaseCollections>(
  collection: K,
) {
  const collections = await db(dbCollectionsMapping[collection])
    .listCollections({}, { nameOnly: true })
    .toArray();
  return collections.some((x) => x.name === collection);
}
