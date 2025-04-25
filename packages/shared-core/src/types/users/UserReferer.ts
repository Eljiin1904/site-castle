import type { BasicUser } from "./BasicUser";

export type UserReferer = {
  kind: "none" | "campaign" | "promotion" | "sponsored" | "user";
} & (
  | {
      kind: "none";
    }
  | {
      kind: "campaign";
      id: string;
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
