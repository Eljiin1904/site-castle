import { Database } from "@server/services/database";

export const stream = Database.createStream({
  collection: "case-battles",
  maxLogSize: 50,
  sort: { createDate: -1 },
});
