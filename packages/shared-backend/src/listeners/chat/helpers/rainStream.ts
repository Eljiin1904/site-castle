import { Database } from "@server/services/database";

export const rainStream = Database.createStream({
  collection: "chat-rains",
  maxLogSize: 1,
  sort: { endDate: -1 },
});
