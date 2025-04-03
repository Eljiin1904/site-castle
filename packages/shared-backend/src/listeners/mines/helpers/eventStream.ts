import { Database } from "@server/services/database";

export const eventStream = Database.createStream({
  collection: "mines-events",
  maxLogSize: 0,
});
