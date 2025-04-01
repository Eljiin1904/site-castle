import { Database } from "@server/services/database";

export const jackPotStream = Database.createStream({
  collection: "site-jackpot",
  maxLogSize: 100,
  sort: { timestamp: -1 },
});
