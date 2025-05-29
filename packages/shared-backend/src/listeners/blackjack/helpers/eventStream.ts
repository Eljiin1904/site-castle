import { Database } from "@server/services/database";

export const eventStream = Database.createStream({
  collection: "blackjack-events",
  maxLogSize: 0,
});
