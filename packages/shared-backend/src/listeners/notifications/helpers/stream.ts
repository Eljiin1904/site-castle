import { Database } from "@server/services/database";

export const stream = Database.createStream({
  collection: "notifications",
  maxLogSize: 0,
});