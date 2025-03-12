import { Validation } from "@core/services/validation";
import { Rewards } from "@server/services/rewards";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-advent-info",
  secure: true,
  body: Validation.object({}),
  callback: async (req, res) => {
    const user = req.user;

    const info = await Rewards.getAdventInfo({ user });

    res.json({ info });
  },
});
