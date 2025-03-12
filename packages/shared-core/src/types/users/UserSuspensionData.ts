import type { suspensionReasons } from "#core/services/users/constants/suspensionReasons";

export type UserSuspensionReason = (typeof suspensionReasons)[number];

export interface UserSuspensionData {
  reason?: UserSuspensionReason;
  startDate?: Date;
  endDate?: Date;
}
