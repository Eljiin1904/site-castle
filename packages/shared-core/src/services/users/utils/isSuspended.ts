import { isFuture } from "date-fns";
import { UserSuspensionData } from "#core/types/users/UserSuspensionData";

export function isSuspended(data: UserSuspensionData) {
  return data.endDate && isFuture(data.endDate);
}
