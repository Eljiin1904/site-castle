import { Database } from "@server/services/database";

export const messageStream = Database.createStream({
  collection: "chat-messages",
  maxLogSize: 0,
  sort: { timestamp: -1 },
});
