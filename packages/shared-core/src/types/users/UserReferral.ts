import type { BasicUser } from "./BasicUser";

export type UserReferral = BasicUser & {
  timestamp: Date;
};
