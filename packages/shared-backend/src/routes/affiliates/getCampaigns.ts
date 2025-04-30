
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Database } from "@server/services/database";

// NOT IN USE (TO REMOVE)
export default Http.createApiRoute({
  type: "post",
  path: "/get-campaigns",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const {
      limit,
      page,
    } = req.body;
    const user = req.user;
    if (!user) {
      throw new HandledError("Target user not found.");
    }

    const campaigns = await Database.collection("user-campaigns")
      .find({ userId: user._id })
      .sort({ timestamp: -1 })
      .toArray();

    res.json({ campaigns: campaigns });
  },
});
