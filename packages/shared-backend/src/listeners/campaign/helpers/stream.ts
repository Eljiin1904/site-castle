import { Database } from "@server/services/database";

export const stream = Database.createStream({
  collection: "user-campaigns",
  maxLogSize: 0,
});