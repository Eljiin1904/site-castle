import { Users } from "@core/services/users";
import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { RaffleState } from "@core/types/rewards/RaffleState";
import { UserDocument } from "@core/types/users/UserDocument";

export function getRaffleState({
  raffle,
  user,
}: {
  raffle: RaffleDocument;
  user?: UserDocument | null;
}) {
  const state: RaffleState = {
    _id: raffle._id,
    displayName: raffle.displayName,
    items: raffle.items,
    startDate: raffle.startDate,
    endDate: raffle.endDate,
    round: raffle.round,
    statusDate: raffle.statusDate,
    leaders: raffle.leaders,
    winners: raffle.winners,
    ...(raffle.status === "pending"
      ? {
          status: raffle.status,
          eosBlockNum: raffle.eosBlockNum,
          eosCommitDate: raffle.eosCommitDate,
        }
      : raffle.status === "drawing"
        ? {
            status: raffle.status,
            eosBlockNum: raffle.eosBlockNum,
            eosCommitDate: raffle.eosCommitDate,
            eosBlockId: raffle.eosBlockId,
          }
        : raffle.status === "completed"
          ? {
              status: raffle.status,
              eosBlockNum: raffle.eosBlockNum,
              eosCommitDate: raffle.eosCommitDate,
              eosBlockId: raffle.eosBlockId,
            }
          : { status: raffle.status }),
  };

  if (user) {
    const index = raffle.reports.findIndex((x) => x.userId === user._id);

    if (index !== -1) {
      const report = raffle.reports[index];

      state.local = {
        user: Users.getBasicUser(user),
        rank: index + 1,
        ticketCount: report.ticketCount,
      };
    }
  }

  return state;
}
