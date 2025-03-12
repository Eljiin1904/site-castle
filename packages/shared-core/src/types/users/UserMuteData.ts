import type { muteReasons } from "#core/services/users/constants/muteReasons";

export type UserMuteReason = (typeof muteReasons)[number];

export interface UserMuteData {
  reason?: UserMuteReason;
  startDate?: Date;
  endDate?: Date;
}
