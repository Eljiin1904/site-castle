import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-active-races",
  secure: false,
  callback: async (req, res) => {
    const races = await Rewards.getActiveRaces();

    if (!races) {
      throw new HandledError("No active races found.");
    }

    const state = races.map(race =>  Rewards.getRaceState({ race, user: req.user }));

    res.json({ state });
  },
});
