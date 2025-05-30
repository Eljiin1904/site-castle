import { Database } from "@server/services/database";

export const multiplierStream = Database.createStream({
  collection: "crash-multipliers",
  maxLogSize: 101,
  sort: { timestamp: -1 },
});