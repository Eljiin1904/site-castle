import { Http } from "#app/services/http";
import { Economy } from "@server/services/economy";

export default Http.createApiRoute({
  type: "post",
  path: "/get-tip-usage",
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    const tipUsage = await Economy.getTipUsage({ user });

    res.json({ tipUsage });
  },
});
