import { Database } from "@server/services/database";

export const ticketStream = Database.createStream({
  collection: "limbo-tickets",
  maxLogSize: 0,
});
