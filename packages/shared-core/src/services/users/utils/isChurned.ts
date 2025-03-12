import { differenceInDays } from "date-fns";
import { UserDocument } from "#core/types/users/UserDocument";

export function isChurned(user: UserDocument) {
  const depositDate = user.meta.lastDepositDate;
  return (
    depositDate !== undefined && differenceInDays(Date.now(), depositDate) >= 30
  );
}
