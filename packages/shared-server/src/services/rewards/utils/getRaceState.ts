import { Users } from "@core/services/users";
import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { RaceState } from "@core/types/rewards/RaceState";
import { UserDocument } from "@core/types/users/UserDocument";

export function getRaceState({
  race,
  user,
}: {
  race: RaceDocument;
  user?: UserDocument | null;
}) {
  const state: RaceState = {
    _id: race._id,
    kind: race.kind,
    displayName: race.displayName,
    totalPayout: race.totalPayout,
    leaders: race.leaders,
    lastReportDate: race.lastReportDate,
    startDate: race.startDate,
    endDate: race.endDate,
  };

  if (user) {
    const index = race.reports.findIndex((x) => x.userId === user._id);

    if (index !== -1) {
      const report = race.reports[index];

      state.local = {
        user: Users.getBasicUser(user),
        rank: index + 1,
        wagerAmount: report.wagerAmount,
        xpGained: report.xpGained,
        prizeAmount: 0,
      };
    }
  }

  return state;
}
