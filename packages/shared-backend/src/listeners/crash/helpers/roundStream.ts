import { Database } from "@server/services/database";

export const roundStream = Database.createStream({
  collection: "crash-rounds",
  maxLogSize: 101,
  sort: { timestamp: -1 },
});
