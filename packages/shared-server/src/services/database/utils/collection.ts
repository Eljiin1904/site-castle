import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { db } from "./db";
import { dbCollectionsMapping } from "../constants/dbNames";

export function collection<K extends keyof DatabaseCollections>(key: K) {
  return db(dbCollectionsMapping[key]).collection<DatabaseCollections[K]>(key);
}
