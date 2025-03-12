import type { BasicUser } from "./BasicUser";

export type UserReferer = {
  kind: "none" | "promotion" | "sponsored" | "user";
} & (
  | {
      kind: "none";
    }
  | {
      kind: "promotion";
      id: string;
    }
  | {
      kind: "user";
      user: BasicUser;
    }
  | {
      kind: "sponsored";
      user: BasicUser;
    }
);
