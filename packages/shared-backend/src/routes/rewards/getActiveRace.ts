import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-active-race",
  secure: false,
  callback: async (req, res) => {
    const race = await Rewards.getActiveRace();

    if (!race) {
      throw new HandledError("No active race found.");
    }

    const state = await Rewards.getRaceState({ race, user: req.user });

    res.json({ state });
  },
});
