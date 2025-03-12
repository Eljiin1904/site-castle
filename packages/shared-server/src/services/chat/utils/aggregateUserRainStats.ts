import { subDays } from "date-fns";
import { ChatRainTicketStats } from "@core/types/chat/ChatRainTicketDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Users } from "#server/services/users";

export async function aggregateUserRainStats({
  user,
}: {
  user: UserDocument;
}): Promise<ChatRainTicketStats> {
  const level = Users.getLevel(user.xp);
  const kycTier = user.kyc.tier;

  const r7 = await Users.aggregateReport({
    userId: user._id,
    minDate: subDays(Date.now(), 7),
    maxDate: new Date(),
  });

  const xpGained = r7.xpGained;

  const r30 = await Users.aggregateReport({
    userId: user._id,
    minDate: subDays(Date.now(), 30),
    maxDate: new Date(),
  });

  const depositAmount = r30.depositAmount;
  const wagerAmount = r30.wagerAmount;

  return { level, kycTier, xpGained, depositAmount, wagerAmount };
}
