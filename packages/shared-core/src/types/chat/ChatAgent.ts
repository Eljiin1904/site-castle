import type { BasicUser } from "../users/BasicUser";

export type ChatAgent = "user" | "system";

export type ChatAgentData =
  | {
      agent: "user";
      user: BasicUser;
    }
  | {
      agent: "system";
    };
