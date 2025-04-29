import { Database } from "@server/services/database";

export const ticketStream = Database.createStream({
  collection: "user-campaigns",
  maxLogSize: 0,
});
