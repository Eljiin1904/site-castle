import { AdventTicketDocument } from "@core/types/rewards/AdventTicketDocument";
import { HolidayInitialState } from "@core/types/rewards/HolidayInitialState";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Rewards } from "@server/services/rewards";
import { Site } from "#app/services/site";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "holiday-join",
  secure: false,
  callback: async (io, socket) => {
    socket.join("holiday");

    const { holiday } = await Site.meta.cache();

    if (!holiday) {
      throw new HandledError("No active holiday.");
    }

    let user: UserDocument | null = null;

    if (socket.data.isAuthenticated) {
      user = await Database.collection("users").findOne({
        _id: socket.data.userId,
      });
    }

    const race = await Rewards.getHolidayRace();

    if (!race) {
      throw new HandledError("No race found.");
    }

    const raceState = Rewards.getRaceState({ race, user });

    const raffles = await Rewards.getHolidayRaffles();

    const raffleStates = raffles.map((raffle) =>
      Rewards.getRaffleState({ raffle, user }),
    );

    let adventTickets: AdventTicketDocument[] = [];

    if (user) {
      adventTickets = await Database.collection("advent-tickets")
        .find({
          userId: user._id,
          holidayId: holiday.id,
        })
        .toArray();
    }

    const state: HolidayInitialState = {
      event: holiday,
      race: raceState,
      raffles: raffleStates,
      adventTickets,
    };

    socket.emit("holiday-init", state);
  },
});
