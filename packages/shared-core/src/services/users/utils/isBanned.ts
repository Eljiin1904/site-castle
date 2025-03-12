import { isFuture } from "date-fns";
import { UserBanData } from "#core/types/users/UserBanData";

export function isBanned(data: UserBanData) {
  return data.endDate && isFuture(data.endDate);
}
