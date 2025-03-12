import { CreateCollectionOptions } from "mongodb";
import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { db } from "./db";
import { dbCollectionsMapping } from "../constants/dbNames";

export async function createCollection<K extends keyof DatabaseCollections>(
  collection: K,
  options: CreateCollectionOptions,
) {
  await db(dbCollectionsMapping[collection]).createCollection(
    collection,
    options,
  );
}
