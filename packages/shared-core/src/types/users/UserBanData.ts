import type { banReasons } from "#core/services/users/constants/banReasons";

export type UserBanReason = (typeof banReasons)[number];

export interface UserBanData {
  reason?: UserBanReason;
  startDate?: Date;
  endDate?: Date;
}
