import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";

export default Http.createApiRoute({
  type: "post",
  path: "/get-active-race",
  secure: false,
  body: Validation.object({
    slug: Validation.string().required("Slug is required."),
  }),
  callback: async (req, res) => {
    const { slug } = req.body;
    const race = await Rewards.getActiveRace(slug);
    if (!race) {
      throw new HandledError("No active race found.");
    }

    const state = Rewards.getRaceState({ race, user: req.user });

    res.json({ state });
  },
});
