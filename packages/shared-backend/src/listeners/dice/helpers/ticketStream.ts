import { Database } from "@server/services/database";

export const ticketStream = Database.createStream({
  collection: "dice-tickets",
  maxLogSize: 0,
});
