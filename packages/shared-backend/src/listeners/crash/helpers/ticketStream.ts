import { Database } from "@server/services/database";

export const ticketStream = Database.createStream({
  collection: "crash-tickets",
  maxLogSize: 100,
  sort: { timestamp: -1 },
});
