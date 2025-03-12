import { isFuture } from "date-fns";
import { UserMuteData } from "#core/types/users/UserMuteData";

export function isMuted(data: UserMuteData) {
  return data.endDate && isFuture(data.endDate);
}
